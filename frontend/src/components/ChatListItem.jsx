export default function ChatListItem({ chat, onSelect }) {
  const handleClick = () => {
    onSelect(chat);
  };

  return (
    <div
      className="p-4 cursor-pointer hover:bg-gray-100"
      onClick={handleClick}
    >
      <div className="text-lg text-black font-semibold">{chat.title}</div>
      <div className="text-sm text-gray-500">{chat.lastMessageText}</div>
      <div className="text-xs text-gray-400">
        {new Date(chat.lastMessageAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </div>
  );
  
}