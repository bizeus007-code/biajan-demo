import React, { useEffect, useState } from 'react';
import { Mic, X, Check, Volume2 } from 'lucide-react';

interface VoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitTranscription: (text: string) => void;
}

export const VoiceModal: React.FC<VoiceModalProps> = ({
  isOpen,
  onClose,
  onSubmitTranscription,
}) => {
  const [transcription, setTranscription] = useState('');
  const [phase, setPhase] = useState<'listening' | 'transcribing' | 'ready'>('listening');

  useEffect(() => {
    if (!isOpen) {
      setTranscription('');
      setPhase('listening');
      return;
    }

    // Stage 1: Listening
    setPhase('listening');
    setTranscription('');

    // Stage 2: Typing out simulated voice input
    const sampleVoicePrompt = "Ahmet Market'in eksik evraklarını çıkar ve KDV risklerini tara.";
    let currentIndex = 0;

    const timer1 = setTimeout(() => {
      setPhase('transcribing');
      const interval = setInterval(() => {
        if (currentIndex < sampleVoicePrompt.length) {
          setTranscription(sampleVoicePrompt.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(interval);
          setPhase('ready');
        }
      }, 45);

      return () => clearInterval(interval);
    }, 1200);

    return () => {
      clearTimeout(timer1);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-md bg-[#0F1624] border border-teal-500/40 rounded-3xl shadow-2xl p-6 text-center text-slate-100 relative overflow-hidden glow-voice">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-teal-500/20 blur-2xl pointer-events-none rounded-full" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Main Mic Circle with Pulsing Wave */}
        <div className="my-6 relative flex items-center justify-center">
          <div className="absolute w-24 h-24 rounded-full bg-teal-500/20 animate-ping opacity-75" />
          <div className="absolute w-28 h-28 rounded-full border border-teal-500/30 animate-pulse-slow" />
          
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-teal-500/40 text-white">
            <Mic className="w-8 h-8 animate-bounce" />
          </div>
        </div>

        {/* Status text */}
        <div className="space-y-1 mb-4">
          <div className="flex items-center justify-center space-x-2 text-teal-400 font-semibold text-sm">
            <Volume2 className="w-4 h-4 animate-pulse" />
            <span>
              {phase === 'listening' && 'Dinleniyor...'}
              {phase === 'transcribing' && 'Ses Algılandı • Çözümleniyor...'}
              {phase === 'ready' && 'İş Emri Algılandı!'}
            </span>
          </div>
          <p className="text-xs text-slate-400">
            SMMM sesli asistanı devrede. Doğal dilde iş emrinizi ifade edin.
          </p>
        </div>

        {/* Equalizer Waveform Bars */}
        <div className="flex items-center justify-center space-x-1.5 h-10 mb-5">
          <div className="w-1.5 bg-teal-400 rounded-full h-4 animate-wave-1" />
          <div className="w-1.5 bg-teal-300 rounded-full h-8 animate-wave-2" />
          <div className="w-1.5 bg-emerald-400 rounded-full h-6 animate-wave-3" />
          <div className="w-1.5 bg-teal-400 rounded-full h-9 animate-wave-4" />
          <div className="w-1.5 bg-teal-300 rounded-full h-5 animate-wave-5" />
          <div className="w-1.5 bg-emerald-400 rounded-full h-7 animate-wave-2" />
          <div className="w-1.5 bg-teal-400 rounded-full h-4 animate-wave-1" />
        </div>

        {/* Transcription Output Area */}
        <div className="min-h-[60px] bg-[#162032] border border-slate-700/60 rounded-2xl p-3.5 mb-5 flex items-center justify-center">
          {transcription ? (
            <p className="text-sm font-medium text-slate-100 italic">
              "{transcription}"
            </p>
          ) : (
            <p className="text-xs text-slate-500 animate-pulse">
              Konuşun... (örnek: "Ahmet Market'in eksik evraklarını çıkar...")
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors"
          >
            İptal
          </button>
          
          <button
            onClick={() => {
              const textToSend = transcription || "Ahmet Market'in eksik evraklarını çıkar";
              onSubmitTranscription(textToSend);
              onClose();
            }}
            className="flex items-center space-x-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-xs font-medium text-white shadow-lg shadow-teal-900/40 transition-all active:scale-95"
          >
            <Check className="w-4 h-4" />
            <span>İş Emrini Gönder</span>
          </button>
        </div>

        <div className="mt-4 text-[10px] text-slate-500">
          Demo Ses Modülü • Frontend Simülasyonu
        </div>
      </div>
    </div>
  );
};
