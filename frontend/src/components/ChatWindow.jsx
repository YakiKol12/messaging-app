import MessageBubble from "./MessageBubble";

export default function ChatWindow({ messages = [], currentUser }) {
  if (!Array.isArray(messages)) {
    console.error("messages is not an array:", messages);
    return <div>No messages</div>;
  }

  return (
    <div className="flex flex-col gap-2 overflow-y-auto h-full p-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`w-full flex ${msg.userId === currentUser ? "justify-end" : "justify-start"}`}
        >
          <MessageBubble
            userId={msg.userId}
            text={msg.text}
            timestamp={new Date(msg.sentAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            isOwn={msg.userId === currentUser}
          />
        </div>
      ))}
    </div>
  );
}
