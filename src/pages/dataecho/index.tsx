import React, { useEffect, useRef, useState } from "react";

interface Message {
  text: string;
  sender: string;
}

function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (input !== '') {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
    }
  };

  // 添加机器人回复
  useEffect(() => {
    if (messages.length && messages[messages.length - 1].sender !== "bot") {
      setTimeout(() => {
        setMessages([...messages, { text: "这是机器人的回复", sender: "bot" }]);
      }, 1000);
    }
  }, [messages]);

  // 滚动到底部
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="w-full max-w-2xl mx-auto p-4 max-h-max flex flex-col justify-between">
      <div className="overflow-y-auto max-h-[calc(100vh-16rem)] pb-14 pr-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex items-start mb-4 ${message.sender === "user" ? "justify-end" : ""}`}>
            {message.sender === "bot" && 
              <img 
                className="h-6 w-6 rounded-xl object-cover mr-2" 
                src="https://ui-avatars.com/api/?name=Bot" 
                alt="Bot Avatar" 
              />
            }
            <div className={`p-2 rounded ${message.sender === "user" ? "bg-blue-400 text-white" : "bg-gray-200"}`}>
              {message.text}
            </div>
            {message.sender === "user" && 
              <img 
                className="h-6 w-6 rounded-xl object-cover ml-2" 
                src="https://ui-avatars.com/api/?name=Zisu" 
                alt="User Avatar" 
              />
            }
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="fixed bottom-0 w-full max-w-2xl mx-auto mb-4 flex p-4 bg-white border-t border-gray-200">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow mr-2 py-2 px-4 rounded border border-gray-300"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />
        <button onClick={handleSend} className="py-2 px-4 rounded bg-blue-500 text-white">
          发送
        </button>
      </div>
    </div>
  );
}

export default Chat;
