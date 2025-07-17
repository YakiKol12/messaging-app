// Chat list component to display a list of chats as a sidebar on the left side of the screen
import React from "react";

export default function ChatsList({ chats = [], onSelectChat }) {
  if (!Array.isArray(chats)) {
    console.error("chats is not an array:", chats);
    return <div>No chats available</div>;
  }

  return (
    <div className="flex flex-col p-4">
      {chats.map((chat) => (
        <div
          key={chat.id}
          className="p-2 hover:bg-gray-200 cursor-pointer"
          onClick={() => onSelectChat(chat)}
        >
          {chat.title}
        </div>
      ))}
    </div>
  );
}
