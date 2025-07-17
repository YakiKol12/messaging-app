import { useState, useEffect } from "react";
import ChatHeader from "../../components/ChatHeader";
import ChatWindow from "../../components/ChatWindow";
import MessageInput from "../../components/MessageInput";

import ChatPageController from "./controller/ChatPageController"; 

export default function ChatPage() {
  const currentUser = "9e7c8d6e-4191-43e1-bdac-968099c142ae";
  const [chatController] = useState(() => new ChatPageController());
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    chatController.init().then(() => {
      console.log("Controller messages:", chatController.messages);
      console.log(Array.isArray(chatController.messages))
      setMessages(chatController.messages);
    });
  }, [chatController]);

  return (
    <div className="flex flex-col h-screen">
      <ChatHeader title="Chat" onBack={() => {}} />
      <ChatWindow messages={messages} currentUser={currentUser} />
      {/* <MessageInput onSend={handleSend} /> */}
    </div>
  );
}
