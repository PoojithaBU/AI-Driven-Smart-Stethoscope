import { useState, useEffect, useRef } from "react";

export default function App() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const API_KEY = "AIzaSyCJNE-YZoyPC7h6BPUQo005O_no4bVn0GM";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: input }] }],
          }),
        }
      );

      const data = await response.json();
      const botReply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't understand that.";

      const botMessage = { sender: "bot", text: botReply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error communicating with Gemini API:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Oops! Cannot reach Gemini right now." },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open ? (
        <div className="w-[500px] h-[620px] flex flex-col rounded-3xl shadow-2xl backdrop-blur-lg bg-white/90 border border-gray-200 p-5">
          {/* Header */}
          <div className="flex justify-between items-center mb-4 bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-2xl shadow-md text-white">
            <h3 className="font-bold text-lg">🌟 OxyGenie Chatbot</h3>
            <button
              onClick={() => setOpen(false)}
              className="hover:text-red-300 font-bold text-xl"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-gray-100">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[75%] px-5 py-3 rounded-2xl shadow-md text-lg ${
                  msg.sender === "user"
                    ? "bg-indigo-500 text-white self-end ml-auto rounded-br-none"
                    : "bg-gray-100 text-gray-800 self-start mr-auto rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="mt-4 flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 p-4 rounded-l-2xl border text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              onClick={sendMessage}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 rounded-r-2xl font-bold text-lg transition-transform transform hover:scale-105"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full px-5 py-3 font-semibold shadow-2xl transition-transform transform hover:scale-110"
        >
          💬 Chat
        </button>
      )}
    </div>
  );
}
