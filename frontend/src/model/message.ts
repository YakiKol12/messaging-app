// message.ts
export interface Message {
  id: string;
  userId: string;
  chatId: string;
  text: string;
  sentAt: Date;
}