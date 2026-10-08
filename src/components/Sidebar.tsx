import React from 'react';
import { 
  Plus, 
  MessageSquare, 
  User, 
  Settings, 
  Info, 
  Sparkles, 
  X,
  Layers
} from 'lucide-react';
import { Conversation } from '../types';

interface SidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
  onOpenProfile: () => void;
  onOpenSettings: () => void;
  onOpenAbout: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
  onOpenProfile,
  onOpenSettings,
  onOpenAbout,
  isOpenMobile,
  onCloseMobile,
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`${
          isOpenMobile
            ? 'fixed top-0 bottom-0 left-0 z-50 w-72 flex shadow-2xl'
            : 'hidden lg:flex lg:static w-72'
        } bg-[#0E1420] border-r border-[#1E293B] flex-col justify-between flex-shrink-0 transition-all duration-200`}
      >
        {/* Top Header */}
        <div className="p-4 border-b border-[#1E293B]/70">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
                <Layers className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-bold text-base tracking-wider text-slate-100 font-sans">BİAJAN</span>
                  <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">
                    SMMM OS
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">Otonom Mali Müşavir Ajanı</p>
              </div>
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

          {/* New Chat Button */}
          <button
            onClick={() => {
              onNewChat();
              onCloseMobile();
            }}
            className="w-full flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-medium text-sm shadow-md shadow-teal-900/30 transition-all duration-200 active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Yeni Sohbet</span>
          </button>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="flex items-center justify-between px-2 mb-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Demo Sohbetler
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
              Demo
            </span>
          </div>

          {conversations.map((conv) => {
            const isActive = conv.id === activeConversationId;
            return (
              <button
                key={conv.id}
                onClick={() => {
                  onSelectConversation(conv.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-start space-x-2.5 p-2.5 rounded-xl text-left text-xs transition-all duration-150 group ${
                  isActive
                    ? 'bg-teal-500/15 text-teal-200 font-medium border border-teal-500/30'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <MessageSquare className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                  isActive ? 'text-teal-400' : 'text-slate-400 group-hover:text-slate-300'
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="truncate font-medium leading-tight">
                    {conv.title}
                  </div>
                  <div className="flex items-center space-x-1.5 mt-1 text-[10px] text-slate-400">
                    <span>{conv.date}</span>
                    <span>•</span>
                    <span>{conv.messages.length} mesaj</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Actions Section */}
        <div className="p-3 border-t border-[#1E293B] space-y-1 bg-[#0A0F18]/80">
          <button
            onClick={onOpenProfile}
            className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs text-slate-300 hover:bg-slate-800/70 hover:text-white transition-colors"
          >
            <User className="w-4 h-4 text-slate-400" />
            <div className="text-left flex-1">
              <p className="font-medium text-slate-200">Demo SMMM</p>
              <p className="text-[10px] text-slate-400">Demo SMMM Ofisi</p>
            </div>
          </button>

          <button
            onClick={onOpenSettings}
            className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs text-slate-300 hover:bg-slate-800/70 hover:text-white transition-colors"
          >
            <Settings className="w-4 h-4 text-slate-400" />
            <span>Ayarlar & Kurallar</span>
          </button>

          <button
            onClick={onOpenAbout}
            className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs text-slate-300 hover:bg-slate-800/70 hover:text-white transition-colors"
          >
            <Info className="w-4 h-4 text-teal-400" />
            <span>BİAJAN Hakkında</span>
          </button>

          <div className="pt-2 px-1 text-[10px] text-slate-400 text-center flex items-center justify-center space-x-1">
            <Sparkles className="w-3 h-3 text-teal-400" />
            <span>Mali Müşavirler İçin AI Ajanı</span>
          </div>
        </div>
      </aside>
    </>
  );
};
