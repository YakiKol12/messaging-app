export default function ChatHeader({ title, onBack }) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-500 border-b">
      <button onClick={onBack} className="text-white">Back</button>
      <h1 className="text-lg font-semibold">{title}</h1>
      <div className="w-8" /> {/* Placeholder for alignment */}
    </div>
  );

}