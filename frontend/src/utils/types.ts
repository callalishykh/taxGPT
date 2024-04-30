interface IMessage {
  id: string;
  chat: string;
  user_prompt: string;
  ai_response: string;
  created_at: Date;
}

interface IChat {
  id: number;
  user: number;
  document_file: string;
}

export type { IMessage, IChat };
