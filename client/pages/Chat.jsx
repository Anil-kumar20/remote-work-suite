import React, { useState } from "react";

const dummyMessages = [
  { id: 1, user: "Alice", message: "Hello!" },
  { id: 2, user: "Bob", message: "Hey, how are you?" },
];

const Chat = () => {
  const [messages, setMessages] = useState(dummyMessages);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { id: Date.now(), user: "You", message: newMessage }]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      <h1 className="text-2xl font-bold">Chat</h1>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 rounded-lg shadow space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 rounded-lg ${
              msg.user === "You" ? "bg-blue-500 text-white self-end" : "bg-gray-200 self-start"
            }`}
          >
            <strong>{msg.user}:</strong> {msg.message}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 p-2 border rounded-lg"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
