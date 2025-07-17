import { useState } from "react";

export default function MessageInput({ onSend }) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (value.trim()) {
      onSend(value);
      setValue("");
    }
  };

  return (
    <div className="flex gap-2 p-2 border-t">
      <input
        className="flex-1 border rounded px-2"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type a message..."
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}
