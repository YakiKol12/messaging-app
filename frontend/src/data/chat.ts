const BASE_URL = 'http://localhost:3000/chat';

import {Message} from '../model/message'

// 1. Send a message
export const sendMessage = async (chatId, messageData) => {
  const res = await fetch(`${BASE_URL}/${chatId}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(messageData),
  });
  return res.json();
};

// 2. Get chat history
export const getMessages = async (chatId: string): Promise<Message[]> => {
  const res = await fetch(`${BASE_URL}/${chatId}/getHistory`);
  const data = await res.json();

  // ✅ Ensure it is actually a Message[]
  if (!Array.isArray(data)) {
    throw new Error("Expected an array of messages");
  }

  // ✅ Optionally parse `sentAt` into Date objects
  return data.map((msg: any) => ({
    ...msg,
    sentAt: new Date(msg.sentAt),
  })) as Message[];
};

// 3. Delete a message
export const deleteMessage = async (chatId, messageId) => {
  const res = await fetch(`${BASE_URL}/${chatId}/deleteMessage/${messageId}`, {
    method: 'DELETE',
  });
  return res.json();
};

// 4. Update a message
export const updateMessage = async (chatId, messageId, updatedText) => {
  const res = await fetch(`${BASE_URL}/${chatId}/updateMessage/${messageId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: updatedText }),
  });
  return res.json();
};

export const chatAPI = {
  sendMessage,
  getMessages,
  deleteMessage,
  updateMessage,
};