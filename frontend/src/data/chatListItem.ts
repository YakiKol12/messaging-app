const BASE_URL = 'http://localhost:3000/chats';

import { Chat } from '../model/chat';

export const getChats = async (userId: string): Promise<Chat[]> => {
  const res = await fetch(`${BASE_URL}/all/${userId}`);
  const data = await res.json();

  // ✅ Ensure it is actually a Chat[]
  if (!Array.isArray(data)) {
    throw new Error("Expected an array of chats");
  }

  return data.map((chat: any) => ({
    ...chat,
    lastMessageAt: chat.lastMessageAt ? new Date(chat.lastMessageAt) : null,
  })) as Chat[];
}