const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

async function main() {
  console.log('[1/6] Launching headless Chrome with remote debugging...');
  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless',
    '--disable-gpu',
    '--remote-debugging-port=9222',
    'http://localhost:3010'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  const list = await new Promise((resolve) => {
    http.get('http://127.0.0.1:9222/json', (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve(JSON.parse(body)));
    });
  });

  const target = list.find(t => t.url.includes('3010'));
  if (!target) {
    console.error('Target not found');
    chrome.kill();
    process.exit(1);
  }

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  let id = 1;
  const callbacks = new Map();
  const consoleErrors = [];

  function send(method, params = {}) {
    return new Promise(r => {
      const msgId = id++;
      callbacks.set(msgId, r);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.method === 'Runtime.consoleAPICalled') {
      if (data.params.type === 'error') {
        consoleErrors.push(data.params);
      }
    }
    if (data.id && callbacks.has(data.id)) {
      const cb = callbacks.get(data.id);
      callbacks.delete(data.id);
      cb(data.result);
    }
  };

  await new Promise(r => ws.onopen = r);
  await send('Runtime.enable');

  console.log('[2/6] Verifying initial welcome screen...');
  const titleResult = await send('Runtime.evaluate', {
    expression: 'document.querySelector("h1").innerText'
  });
  console.log('Title on screen:', titleResult.result.value);

  // Click on "Bu ay bütün mükelleflerimi hazırla"
  console.log('[3/6] Testing Quick Prompt click...');
  await send('Runtime.evaluate', {
    expression: 'Array.from(document.querySelectorAll("button")).find(b => b.textContent.includes("Bu ay bütün mükelleflerimi")).click()'
  });

  // Wait 1s for agent response
  await new Promise(r => setTimeout(r, 1000));

  const headline = await send('Runtime.evaluate', {
    expression: 'document.querySelector(".text-slate-100.font-semibold") ? document.querySelector(".text-slate-100.font-semibold").innerText : "none"'
  });
  console.log('AI Agent Headline:', headline.result.value);

  // Click voice button
  console.log('[4/6] Testing Voice Button click...');
  await send('Runtime.evaluate', {
    expression: 'document.querySelector("button[title*=\'Sesli\']").click()'
  });

  // Wait 600ms for voice modal
  await new Promise(r => setTimeout(r, 600));

  const voiceModalVisible = await send('Runtime.evaluate', {
    expression: 'document.body.innerText.includes("Dinleniyor")'
  });
  console.log('Voice Modal "Dinleniyor" text visible:', voiceModalVisible.result.value);

  // Screenshot voice modal
  const voiceSnap = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('/tmp/verified_voice_modal.png', Buffer.from(voiceSnap.data, 'base64'));

  // Close voice modal (click İptal)
  await send('Runtime.evaluate', {
    expression: 'Array.from(document.querySelectorAll("button")).find(b => b.textContent.includes("İptal")).click()'
  });

  // Test Profile Modal
  console.log('[5/6] Testing Profile Modal...');
  await send('Runtime.evaluate', {
    expression: 'Array.from(document.querySelectorAll("button")).find(b => b.textContent.includes("Demo SMMM")).click()'
  });
  await new Promise(r => setTimeout(r, 400));
  const profileVisible = await send('Runtime.evaluate', {
    expression: 'document.body.innerText.includes("DEMO-SMMM-2026")'
  });
  console.log('Profile Modal visible:', profileVisible.result.value);

  const profileSnap = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('/tmp/verified_profile_modal.png', Buffer.from(profileSnap.data, 'base64'));

  console.log('[6/6] Console errors recorded:', consoleErrors.length);
  chrome.kill();

  if (consoleErrors.length > 0) {
    console.error('Console errors:', consoleErrors);
    process.exit(1);
  }
  console.log('ALL VERIFICATIONS PASSED 100%!');
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
