import React from 'react';
import { 
  Users, 
  Briefcase, 
  AlertOctagon, 
  FileWarning, 
  CalendarClock, 
  X,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Building2,
  FileSearch,
  AlertTriangle,
  CalendarDays,
  BookOpen,
  Landmark,
  FileSignature
} from 'lucide-react';
import { DEMO_CAPABILITIES } from '../data/demoData';
import { CapabilityItem } from '../types';

interface RightPanelProps {
  onSelectCapability: (cap: CapabilityItem) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const RightPanel: React.FC<RightPanelProps> = ({
  onSelectCapability,
  isOpenMobile,
  onCloseMobile,
}) => {
  const getCapabilityIcon = (iconName: string) => {
    switch (iconName) {
      case 'CalendarClock': return <CalendarClock className="w-4 h-4 text-teal-400" />;
      case 'Building2': return <Building2 className="w-4 h-4 text-emerald-400" />;
      case 'FileSearch': return <FileSearch className="w-4 h-4 text-cyan-400" />;
      case 'AlertTriangle': return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case 'CalendarDays': return <CalendarDays className="w-4 h-4 text-blue-400" />;
      case 'BookOpen': return <BookOpen className="w-4 h-4 text-indigo-400" />;
      case 'Landmark': return <Landmark className="w-4 h-4 text-purple-400" />;
      case 'Users': return <Users className="w-4 h-4 text-rose-400" />;
      case 'FileSignature': return <FileSignature className="w-4 h-4 text-teal-300" />;
      default: return <Sparkles className="w-4 h-4 text-teal-400" />;
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Right Panel Container */}
      <aside
        className={`${
          isOpenMobile
            ? 'fixed top-0 bottom-0 right-0 z-50 w-80 flex shadow-2xl'
            : 'hidden lg:flex lg:static w-80'
        } bg-[#0E1420] border-l border-[#1E293B] flex-col justify-between flex-shrink-0 transition-all duration-200`}
      >
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-sm text-slate-100 tracking-wider">BİAJAN</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                  Canlı Bağlam
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">Ofis Operasyon Durumu</p>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              title="Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Context Metrics Blocks */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span className="uppercase tracking-wider text-[11px] text-slate-400">Ofis Metrikleri</span>
              <span className="text-[10px] text-teal-400 bg-teal-500/10 px-1.5 py-0.5 rounded">Demo Data</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {/* Mükellefler */}
              <div className="bg-[#141C2B] p-2.5 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-colors">
                <div className="flex items-center space-x-1.5 text-slate-400 mb-1">
                  <Users className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-[11px] font-medium">Mükellefler</span>
                </div>
                <div className="text-lg font-bold text-white flex items-baseline space-x-1">
                  <span>42</span>
                  <span className="text-[11px] font-normal text-emerald-400">aktif</span>
                </div>
              </div>

              {/* Açık İşler */}
              <div className="bg-[#141C2B] p-2.5 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-colors">
                <div className="flex items-center space-x-1.5 text-slate-400 mb-1">
                  <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="text-[11px] font-medium">Açık İşler</span>
                </div>
                <div className="text-lg font-bold text-white">18</div>
              </div>

              {/* Kritik Risk */}
              <div className="bg-[#141C2B] p-2.5 rounded-xl border border-amber-900/30 hover:border-amber-700/50 transition-colors">
                <div className="flex items-center space-x-1.5 text-amber-400 mb-1">
                  <AlertOctagon className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[11px] font-medium">Kritik Risk</span>
                </div>
                <div className="text-lg font-bold text-amber-400">4</div>
              </div>

              {/* Eksik Belgeler */}
              <div className="bg-[#141C2B] p-2.5 rounded-xl border border-rose-900/30 hover:border-rose-700/50 transition-colors">
                <div className="flex items-center space-x-1.5 text-rose-400 mb-1">
                  <FileWarning className="w-3.5 h-3.5 text-rose-400" />
                  <span className="text-[11px] font-medium">Eksik Belgeler</span>
                </div>
                <div className="text-lg font-bold text-rose-400">13</div>
              </div>
            </div>

            {/* Yaklaşan Tarihler (Full width) */}
            <div className="bg-[#141C2B] p-2.5 rounded-xl border border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-slate-300">
                <div className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400">
                  <CalendarClock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-200">Yaklaşan Tarihler</div>
                  <div className="text-[10px] text-slate-400">GİB & SGK yasal son günler</div>
                </div>
              </div>
              <div className="text-base font-bold text-teal-400 px-2.5 py-0.5 rounded-lg bg-teal-500/10 border border-teal-500/20">
                7
              </div>
            </div>
          </div>

          {/* BİAJAN Capabilities Section */}
          <div className="space-y-2.5 pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <h3 className="text-xs font-semibold text-slate-200 tracking-wide uppercase">
                  BİAJAN Yetenekleri
                </h3>
              </div>
              <span className="text-[10px] text-slate-400">Tıkla & Dene</span>
            </div>

            <div className="space-y-1.5">
              {DEMO_CAPABILITIES.map((cap) => (
                <button
                  key={cap.id}
                  onClick={() => {
                    onSelectCapability(cap);
                    onCloseMobile();
                  }}
                  className="w-full flex items-start space-x-2.5 p-2 rounded-xl bg-[#121824]/80 hover:bg-[#1A2335] border border-slate-800/70 hover:border-teal-500/40 text-left transition-all duration-150 group"
                >
                  <div className="p-1.5 rounded-lg bg-slate-800/60 group-hover:bg-slate-800 mt-0.5 flex-shrink-0">
                    {getCapabilityIcon(cap.icon)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-200 group-hover:text-teal-300 transition-colors">
                        {cap.title}
                      </span>
                      {cap.badge && (
                        <span className="text-[9px] px-1 py-0.2 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20 font-medium">
                          {cap.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {cap.description}
                    </p>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-400 transition-colors mt-2" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-[#1E293B] bg-[#0A0F18]/80 text-[10px] text-slate-400 text-center">
          <p>Mali Müşavir İşletim Sistemi • Standalone Demo</p>
        </div>
      </aside>
    </>
  );
};
