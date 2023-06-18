import { userState } from "@/store/globalState";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";

interface Message {
    text: string;
    sender: string;
    type?: 'loading' | 'normal'; // 添加新的类型
}

function Chat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const bottomRef = useRef<HTMLDivElement>(null);
    const [user, setUser] = useRecoilState(userState);

    const handleSend = () => {
        if (input !== '') {
            setMessages([...messages, { text: input, sender: "user" }]);
            setInput("");
        }
    };

    // 添加机器人回复
    useEffect(() => {
        if (messages.length && messages[messages.length - 1].sender !== "bot") {
            setMessages([...messages, { text: '', sender: 'bot', type: 'loading' }]); // 添加 loading 状态的消息
            setTimeout(() => {
                setMessages((currentMessages) => {
                    let newMessages = [...currentMessages];
                    if(newMessages[newMessages.length - 1].type === 'loading') {
                      newMessages.pop(); // 移除loading消息
                      newMessages.push({ text: "我看了一下Dune的分析面板，当前ETH的质押率19.43%", sender: "bot",type:"normal" }); // 添加机器人的回复
                    }
                    return newMessages;
                  });
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
                                src="https://ui-avatars.com/api/?name=DataECHO"
                                alt="Bot Avatar"
                            />
                        }
                        <div className={`p-2 rounded ${message.sender === "user" ? "bg-blue-400 text-white" : "bg-gray-200"}`}>
                            {message.type === 'loading' ? <div>...</div> : message.text}
                        </div>
                        {message.sender === "user" &&
                            <img
                                className="h-6 w-6 rounded-xl object-cover ml-2"
                                src={`https://ui-avatars.com/api/?name=${user?.user.firstName}+${user?.user.lastName}`}
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
