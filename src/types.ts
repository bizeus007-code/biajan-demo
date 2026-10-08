export interface MessageAction {
  label: string;
  actionId: string;
  icon?: string;
  completed?: boolean;
}

export interface WorkSummaryItem {
  count: number;
  label: string;
  severity: 'critical' | 'warning' | 'info' | 'normal';
}

export interface PipelineStep {
  label: string;
  status: 'pending' | 'processing' | 'completed';
}

export interface StructuredAiResponse {
  summaryTitle: string;
  headline: string;
  pipeline: PipelineStep[];
  workItems: WorkSummaryItem[];
  detailedItems?: {
    id: string;
    title: string;
    description: string;
    tag: string;
    status: string;
  }[];
  nextSteps: MessageAction[];
  conclusionNote: string;
  isDemoData: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'biajan';
  timestamp: string;
  text?: string;
  structured?: StructuredAiResponse;
}

export interface Conversation {
  id: string;
  title: string;
  date: string;
  messages: ChatMessage[];
}

export interface CapabilityItem {
  id: string;
  title: string;
  icon: string;
  description: string;
  samplePrompt: string;
  badge?: string;
}
