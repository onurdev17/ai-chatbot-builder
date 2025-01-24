export type Message = {
  content: string;
  createdAt: Date;
  id: string;
  role: string;
};

export type Chatbot = {
  id: number;
  created_at: Date;
  name: string | null;
  purpose: string | null;
  scope: string | null;
  img_url: string | null;
  style: string | null;
  languages: string | null;
  total_messages: number;
  last_used_at: Date;
  token: string | null;
  bot_introduce: string | null;
};
