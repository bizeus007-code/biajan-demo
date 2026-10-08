import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Mic, 
  Sparkles, 
  Menu, 
  SlidersHorizontal, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';
import { ChatMessage, StructuredAiResponse } from '../types';
import { QUICK_PROMPTS } from '../data/demoData';

interface MainChatProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onOpenVoice: () => void;
  onToggleSidebar: () => void;
  onToggleRightPanel: () => void;
  isGenerating?: boolean;
}

export const MainChat: React.FC<MainChatProps> = ({
  messages,
  onSendMessage,
  onOpenVoice,
  onToggleSidebar,
  onToggleRightPanel,
  isGenerating = false,
}) => {
  const [inputText, setInputText] = useState('');
  const [actionNotifs, setActionNotifs] = useState<{ [key: string]: string }>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleActionClick = (actionId: string) => {
    setActionNotifs((prev) => ({
      ...prev,
      [actionId]: '✓ Demo işlem akışı simüle edildi',
    }));
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'warning':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'info':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      default:
        return 'bg-slate-700/40 text-slate-300 border-slate-700/60';
    }
  };

  return (
    <div className="flex-1 min-w-0 w-full flex flex-col h-full bg-[#0B0F17] relative overflow-hidden">
      {/* Top Header Bar */}
      <header className="h-14 border-b border-[#1E293B] bg-[#0E1420]/90 backdrop-blur-md flex items-center justify-between px-3 sm:px-4 z-20 flex-shrink-0">
        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden flex-shrink-0"
            title="Sohbetler Menüsü"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-2 min-w-0">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
            <div className="truncate">
              <span className="font-semibold text-sm text-slate-200">BİAJAN</span>
              <span className="hidden sm:inline-block ml-1.5 text-xs text-slate-400 font-normal">
                AI Çalışma Alanı • SMMM Asistanı
              </span>
            </div>
          </div>
        </div>

        {/* Development Banner (Requirement 9) */}
        <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] mx-2">
          <span className="font-bold tracking-wide">ACTIVE DEVELOPMENT</span>
          <span className="text-amber-400/80">•</span>
          <span className="text-amber-200/90 truncate max-w-xs">
            BİAJAN geliştirme aşamasındadır. Çok yakında kullanıma sunulacaktır.
          </span>
        </div>

        {/* Right Panel Toggle Button (Always visible on mobile) */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <button
            onClick={onToggleRightPanel}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 lg:hidden active:scale-95 transition-all"
            title="Ofis Durumu ve Yetenekler"
          >
            <SlidersHorizontal className="w-4 h-4 text-teal-400" />
            <span className="text-xs font-medium">Bağlam</span>
          </button>
        </div>
      </header>

      {/* Mobile-only development notice */}
      <div className="md:hidden bg-amber-500/10 border-b border-amber-500/20 px-3 py-1 text-center text-[10px] text-amber-300">
        <span className="font-bold">ACTIVE DEVELOPMENT:</span> BİAJAN geliştirme aşamasındadır.
      </div>

      {/* Main Chat Scroll Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {messages.length === 0 ? (
          /* Empty / Welcome State (Requirement 4) */
          <div className="max-w-3xl mx-auto h-full flex flex-col justify-center items-center text-center px-2 py-8 animate-fadeIn">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-500 flex items-center justify-center shadow-xl shadow-teal-500/20 mb-6">
              <Sparkles className="w-8 h-8 text-white" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Merhaba, ben BİAJAN.
            </h1>
            <p className="text-base sm:text-lg text-slate-300 mt-2 font-normal max-w-lg">
              SMMM ofisinizde hangi işi hazırlamamı istersiniz?
            </p>
            <p className="text-xs text-slate-400 mt-1 max-w-md">
              Mükellef taraması yapabilir, eksik evrakları listeleyebilir, beyanname öncesi riskleri analiz edebilirim.
            </p>

            {/* Quick Command Chips (Requirement 4) */}
            <div className="mt-8 w-full max-w-xl grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left">
              {QUICK_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => onSendMessage(prompt)}
                  className="p-3.5 rounded-2xl bg-[#131B2A] hover:bg-[#1C273C] border border-slate-800 hover:border-teal-500/40 text-slate-200 text-xs font-medium transition-all duration-200 flex items-center justify-between group shadow-sm hover:shadow-md"
                >
                  <span className="group-hover:text-teal-300 transition-colors pr-2">
                    {prompt}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-400 transform group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                </button>
              ))}
            </div>

            <div className="mt-8 flex items-center space-x-2 text-[11px] text-slate-400 bg-slate-900/60 px-3 py-1.5 rounded-full border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              <span>Demo Modu • Tıklanabilir Yapay Zeka Ön Yüzü</span>
            </div>
          </div>
        ) : (
          /* Active Chat Messages Stream */
          <div className="max-w-3xl mx-auto space-y-6 pb-24">
            {messages.map((message) => {
              if (message.sender === 'user') {
                return (
                  <div key={message.id} className="flex justify-end animate-fadeIn">
                    <div className="max-w-[85%] sm:max-w-[75%] rounded-2xl rounded-tr-sm bg-gradient-to-r from-teal-600 to-teal-500 text-white px-4 py-3 shadow-md shadow-teal-950/20">
                      <p className="text-sm font-normal leading-relaxed whitespace-pre-wrap">
                        {message.text}
                      </p>
                      <div className="text-[10px] text-teal-100/70 text-right mt-1">
                        {message.timestamp}
                      </div>
                    </div>
                  </div>
                );
              }

              /* BIAJAN Agent Response */
              const res: StructuredAiResponse | undefined = message.structured;
              return (
                <div key={message.id} className="flex flex-col space-y-3 animate-fadeIn">
                  {/* Agent Header */}
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-teal-500 to-emerald-500 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-teal-500/20">
                      B
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-xs text-teal-300">BİAJAN</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20 font-medium">
                          Otonom SMMM Ajanı
                        </span>
                        {res?.isDemoData && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-medium">
                            Demo Data
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Main Structured Card */}
                  {res ? (
                    <div className="rounded-2xl bg-[#121A28] border border-slate-800 p-4 sm:p-5 space-y-4 shadow-xl">
                      {/* Headline / Initial Statement */}
                      {res.headline && (
                        <div className="text-sm sm:text-base font-semibold text-slate-100">
                          {res.headline}
                        </div>
                      )}

                      {/* Process Execution Pipeline (Requirement 8) */}
                      {res.pipeline && (
                        <div className="bg-[#0C121D] p-3 rounded-xl border border-slate-800/80">
                          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                            <span>Ajan İşlem Hattı</span>
                            <span className="text-teal-400">Canlı Analiz</span>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {res.pipeline.map((step, sIdx) => (
                              <div
                                key={sIdx}
                                className="flex items-center space-x-1.5 bg-[#141C2B] p-2 rounded-lg border border-slate-800"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                                <span className="text-[10px] font-medium text-slate-300 truncate">
                                  {step.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Work Items Summary (Requirement 6) */}
                      {res.workItems && (
                        <div className="space-y-2">
                          <div className="text-xs font-semibold text-slate-200">
                            Hazırlanan Çalışma Özeti:
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {res.workItems.map((item, idx) => (
                              <div
                                key={idx}
                                className={`flex items-center justify-between p-2.5 rounded-xl border ${getSeverityBadge(
                                  item.severity
                                )}`}
                              >
                                <span className="text-xs font-medium">{item.label}</span>
                                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-black/20">
                                  {item.count}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Detailed Items */}
                      {res.detailedItems && res.detailedItems.length > 0 && (
                        <div className="space-y-2 pt-1">
                          <div className="text-xs font-semibold text-slate-300">
                            Öncelikli Detaylar:
                          </div>
                          <div className="space-y-1.5">
                            {res.detailedItems.map((det) => (
                              <div
                                key={det.id}
                                className="p-3 rounded-xl bg-[#162134]/70 border border-slate-800/80 space-y-1"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-medium text-slate-200">
                                    {det.title}
                                  </span>
                                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-teal-300 font-medium">
                                    {det.status}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-400">
                                  {det.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Suggested Next Steps (Requirement 6) */}
                      {res.nextSteps && (
                        <div className="space-y-2 pt-2 border-t border-slate-800/80">
                          <div className="text-xs font-semibold text-teal-400">
                            Önerilen Sonraki Adımlar:
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {res.nextSteps.map((action) => {
                              const notif = actionNotifs[action.actionId];
                              return (
                                <button
                                  key={action.actionId}
                                  onClick={() => handleActionClick(action.actionId)}
                                  className={`px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center space-x-1.5 ${
                                    notif
                                      ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                                      : 'bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 text-teal-200 active:scale-95'
                                  }`}
                                >
                                  <span>{notif || action.label}</span>
                                  {!notif && <ArrowRight className="w-3.5 h-3.5 text-teal-400" />}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Conclusion UI note (Requirement 6) */}
                      {res.conclusionNote && (
                        <div className="p-3 rounded-xl bg-teal-950/30 border border-teal-500/30 flex items-center justify-between text-xs text-teal-300">
                          <div className="flex items-center space-x-2">
                            <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
                            <span className="font-medium">{res.conclusionNote}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {message.timestamp}
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Simple text response if any */
                    <div className="rounded-2xl bg-[#121A28] border border-slate-800 p-4 text-sm text-slate-200">
                      {message.text}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Live Typing / Generating Animation */}
            {isGenerating && (
              <div className="flex items-center space-x-2 p-3 bg-[#121A28] rounded-xl border border-slate-800 w-48 animate-pulse">
                <Sparkles className="w-4 h-4 text-teal-400 animate-spin" />
                <span className="text-xs text-slate-300 font-medium">BİAJAN çalışıyor...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Composer Bottom Area (Requirement 5) */}
      <div className="p-3 sm:p-4 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/95 to-transparent z-10 flex-shrink-0">
        <div className="max-w-3xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="relative bg-[#141C2B] border border-slate-700/80 rounded-2xl sm:rounded-3xl shadow-2xl p-2 sm:p-2.5 flex items-end space-x-2 focus-within:border-teal-500/70 focus-within:ring-2 focus-within:ring-teal-500/20 transition-all glow-subtle"
          >
            {/* Textarea */}
            <textarea
              ref={inputRef}
              rows={1}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="BİAJAN'a bir şey sor veya bir iş ver..."
              className="flex-1 bg-transparent text-slate-100 placeholder-slate-400 text-sm sm:text-base resize-none focus:outline-none py-2 px-3 max-h-32 min-h-[40px] leading-relaxed"
            />

            {/* Right Buttons: Voice + Send */}
            <div className="flex items-center space-x-1.5 pb-1 pr-1 flex-shrink-0">
              {/* Voice Button (Prominent as required) */}
              <button
                type="button"
                onClick={onOpenVoice}
                className="p-2 sm:p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-400 hover:text-teal-300 border border-slate-700 transition-all duration-150 active:scale-95 group relative"
                title="Sesli Komut Ver"
              >
                <Mic className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                <span className="sr-only">Sesli Komut</span>
              </button>

              {/* Send Button */}
              <button
                type="submit"
                disabled={!inputText.trim()}
                className={`p-2 sm:p-2.5 rounded-xl transition-all duration-150 flex items-center justify-center ${
                  inputText.trim()
                    ? 'bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white shadow-lg shadow-teal-900/40 active:scale-95'
                    : 'bg-slate-800 text-slate-400 cursor-not-allowed'
                }`}
                title="Gönder"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="sr-only">Gönder</span>
              </button>
            </div>
          </form>

          {/* Bottom Micro Copy */}
          <div className="flex items-center justify-between px-2 sm:px-3 mt-2 text-[10px] text-slate-400 min-w-0">
            <span className="truncate pr-2">BİAJAN Otonom SMMM Ajanı • Standalone Demo</span>
            <span className="hidden sm:inline flex-shrink-0">Enter ile gönder • Shift+Enter yeni satır</span>
          </div>
        </div>
      </div>
    </div>
  );
};
