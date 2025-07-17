export default function MessageBubble({ userId, text, timestamp, isOwn }) {
  return (
    <div
      className={`p-3 rounded-lg max-w-xs ${
        isOwn ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
      }`}
    >
      <div className="text-xs font-semibold break-all">{userId}</div>
      <div className="mt-1">{text}</div>
      <div className="text-xs text-gray-300 mt-1 text-right">{timestamp}</div>
    </div>
  );
}
