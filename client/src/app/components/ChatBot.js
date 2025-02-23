// components/ChatBot.js
'use client';
import { useState } from "react";
import { MessageSquare } from "lucide-react";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false); // Toggle chat window
  const [messages, setMessages] = useState([]); // Store chat messages
  const [inputValue, setInputValue] = useState(""); // Store user input

  // Toggle chat window visibility
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Handle sending a message
  const handleSendMessage = () => {
    if (inputValue.trim() === "") return; // Ignore empty messages

    // Add user message to the chat
    setMessages([...messages, { text: inputValue, sender: "user" }]);

    // Simulate a bot response (replace this with an API call to your chatbot service)
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Hello! How can I assist you today?", sender: "bot" },
      ]);
    }, 1000);

    // Clear the input field
    setInputValue("");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <div className="w-80 h-96 bg-white shadow-lg rounded-lg flex flex-col">
          {/* Chat Header */}
          <div className="bg-gray-900 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="text-lg font-semibold">Chat<span className="text-amber-500">Bot</span></h3>
            <button onClick={toggleChat} className="text-white hover:text-gray-300">
              ✕
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block p-2 rounded-lg ${
                    message.sender === "user"
                      ? "bg-gray-500 text-white"
                      : "bg-amber-500 text-gray-800"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none"
              />
              <button
                onClick={handleSendMessage}
                className="bg-amber-500 text-black p-2 rounded-r-lg hover:bg-amber-600"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-600"
        >
          <MessageSquare size={30} color="#fb8500" />
        </button>
      )}
    </div>
  );
};

export default ChatBot;