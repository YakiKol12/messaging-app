
export default function MessageBubble({ sender, text, timestamp, isOwn }) {
  return (
    <div className={`p-2 my-1 rounded-md max-w-xs ${isOwn ? "bg-blue-200 self-end" : "bg-gray-200 self-start"}`}>
      <div className="text-sm font-semibold">{sender}</div>
      <div>{text}</div>
      <div className="text-xs text-gray-500">{timestamp}</div>
    </div>
  );
}
