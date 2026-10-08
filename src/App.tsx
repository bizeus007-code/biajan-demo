import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { MainChat } from './components/MainChat';
import { RightPanel } from './components/RightPanel';
import { VoiceModal } from './components/VoiceModal';
import { ProfileModal, SettingsModal, AboutModal } from './components/Modals';
import { 
  INITIAL_CONVERSATIONS, 
  RESPONSE_ALL_CLIENTS, 
  RESPONSE_AHMET_MARKET, 
  RESPONSE_RISKS, 
  RESPONSE_URGENT_JOBS,
  RESPONSE_NEW_COMPANY 
} from './data/demoData';
import { Conversation, ChatMessage, CapabilityItem, StructuredAiResponse } from './types';

export const App: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  // Default to empty new chat so the user immediately sees the Welcome hero & 4 quick command chips!
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [currentMessages, setCurrentMessages] = useState<ChatMessage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Mobile drawer states
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState(false);
  const [isRightPanelOpenMobile, setIsRightPanelOpenMobile] = useState(false);

  // Modals
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Switch conversation
  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
    const conv = conversations.find((c) => c.id === id);
    if (conv) {
      setCurrentMessages(conv.messages);
    }
  };

  // Start fresh new chat
  const handleNewChat = () => {
    setActiveConversationId(null);
    setCurrentMessages([]);
  };

  // Helper to match appropriate demo response based on user input
  const resolveDemoResponse = (prompt: string): StructuredAiResponse => {
    const lower = prompt.toLowerCase();

    if (lower.includes('ahmet') || lower.includes('evrak') || lower.includes('belge')) {
      return RESPONSE_AHMET_MARKET;
    }
    if (lower.includes('risk') || lower.includes('beyanname öncesi') || lower.includes('nakit')) {
      return RESPONSE_RISKS;
    }
    if (lower.includes('hafta') || lower.includes('gecik') || lower.includes('acil') || lower.includes('kritik')) {
      return RESPONSE_URGENT_JOBS;
    }
    if (lower.includes('şirket') || lower.includes('kuruluş') || lower.includes('mersis')) {
      return RESPONSE_NEW_COMPANY;
    }
    // Default to Portföy taraması (Bu ay bütün mükelleflerimi hazırla)
    return RESPONSE_ALL_CLIENTS;
  };

  // Send a message
  const handleSendMessage = (text: string) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      text,
    };

    const newMessages = [...currentMessages, userMsg];
    setCurrentMessages(newMessages);
    setIsGenerating(true);

    // Simulate agent reasoning & synthesis pipeline
    setTimeout(() => {
      const responseData = resolveDemoResponse(text);
      const biajanMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'biajan',
        timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
        structured: responseData,
      };

      const updatedMessages = [...newMessages, biajanMsg];
      setCurrentMessages(updatedMessages);
      setIsGenerating(false);

      // If active conversation exists, update it, otherwise create a new conversation in sidebar
      if (activeConversationId) {
        setConversations((prev) =>
          prev.map((c) => (c.id === activeConversationId ? { ...c, messages: updatedMessages } : c))
        );
      } else {
        const newConvId = `conv-${Date.now()}`;
        const newConv: Conversation = {
          id: newConvId,
          title: text.length > 32 ? text.slice(0, 32) + '...' : text,
          date: 'Şimdi',
          messages: updatedMessages,
        };
        setConversations((prev) => [newConv, ...prev]);
        setActiveConversationId(newConvId);
      }
    }, 600);
  };

  // Select capability from Right Panel
  const handleSelectCapability = (cap: CapabilityItem) => {
    handleSendMessage(cap.samplePrompt);
  };

  return (
    <div className="flex h-screen w-full max-w-full overflow-hidden bg-[#0B0F17] font-sans antialiased text-slate-100">
      {/* 1. Sol Panel (Sidebar) */}
      <Sidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={handleSelectConversation}
        onNewChat={handleNewChat}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        isOpenMobile={isSidebarOpenMobile}
        onCloseMobile={() => setIsSidebarOpenMobile(false)}
      />

      {/* 2. Ana Chat Alanı */}
      <MainChat
        messages={currentMessages}
        onSendMessage={handleSendMessage}
        onOpenVoice={() => setIsVoiceOpen(true)}
        onToggleSidebar={() => setIsSidebarOpenMobile((prev) => !prev)}
        onToggleRightPanel={() => setIsRightPanelOpenMobile((prev) => !prev)}
        isGenerating={isGenerating}
      />

      {/* 3. Sağ Panel (Bağlam & Yetenekler) */}
      <RightPanel
        onSelectCapability={handleSelectCapability}
        isOpenMobile={isRightPanelOpenMobile}
        onCloseMobile={() => setIsRightPanelOpenMobile(false)}
      />

      {/* Voice Interaction Modal */}
      <VoiceModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        onSubmitTranscription={(text) => handleSendMessage(text)}
      />

      {/* Modals */}
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </div>
  );
};

export default App;
