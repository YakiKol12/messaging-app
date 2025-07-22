import { useState, useEffect } from "react";
import ChatListItem from "../../components/ChatListItem";

import ChatListController from "./controller/ChatListController";

export default function ChatList() {
    const [chatListController] = useState(() => new ChatListController());
    const [chats, setChats] = useState([]);

  useEffect(() => {
    chatListController.init().then(() => {
      console.log("Controller chats:", chatListController.chats);
      setChats(chatListController.chats);
    });
  }, [chatListController]);

  const handleSelectChat = (chat) => {
    console.log("Selected chat:", chat);
  };

  return (
    <div>
      {chats.map((chat) => (
        <div key={chat.id}>
          <ChatListItem
            chat={chat}
            onSelect={handleSelectChat} 
          />
        </div>  
      ))}
    </div>
  );
}
