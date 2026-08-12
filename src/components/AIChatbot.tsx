import React, { useState, useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";
import { MessageSquare, X, Send, Sparkles, RefreshCw } from "lucide-react";

export const AIChatbot: React.FC = () => {
  const { chatbotMessages, chatbotTyping, sendChatbotMessage, clearChatHistory } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatbotMessages, chatbotTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      sendChatbotMessage(inputVal.trim());
      setInputVal("");
    }
  };

  const handleQuickReply = (text: string) => {
    sendChatbotMessage(text);
  };

  const quickReplies = [
    "I loved Inception.",
    "Watching with friends.",
    "Recommend underrated gem.",
    "I don't want horror.",
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Expanded Chat Window */}
      {isOpen && (
        <div className="w-[320px] sm:w-[360px] h-[480px] rounded-2xl border border-white/10 bg-cinema-deep/95 shadow-2xl backdrop-blur-xl flex flex-col mb-4 overflow-hidden animate-slide-up">
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-cinema-purple/30 to-cinema-blue/30 border-b border-white/5">
            <div className="flex items-center space-x-2 text-slate-100">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-cinema-purple text-white">
                <Sparkles className="h-4.5 w-4.5 animate-pulse" />
              </div>
              <div>
                <h4 className="text-xs font-bold tracking-wide">AI Movie Concierge</h4>
                <span className="text-[9px] text-cinema-blue font-medium">Ready to recommend</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={clearChatHistory}
                className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
                title="Reset Chat"
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatbotMessages.map((msg) => {
              const isBot = msg.sender === "concierge";
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col max-w-[85%] ${isBot ? "self-start items-start" : "self-end items-end ml-auto"}`}
                >
                  <div
                    className={`rounded-2xl px-3.5 py-2.5 text-xs ${
                      isBot
                        ? "bg-white/5 border border-white/5 text-slate-200 rounded-tl-sm"
                        : "bg-cinema-purple text-white rounded-tr-sm shadow-md"
                    }`}
                  >
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                  <span className="text-[9px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {chatbotTyping && (
              <div className="flex items-center space-x-2 bg-white/5 border border-white/5 rounded-2xl rounded-tl-sm px-3.5 py-2.5 max-w-[70%]">
                <span className="text-xs text-cinema-blue font-medium animate-pulse">Concierge is matching...</span>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="px-4 py-2 border-t border-white/5 bg-cinema-void/30 flex flex-wrap gap-1.5 justify-center">
            {quickReplies.map((qr, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickReply(qr)}
                className="rounded-full border border-white/5 bg-white/5 px-2.5 py-0.5 text-[10px] text-slate-400 hover:bg-cinema-purple/10 hover:border-cinema-purple/30 hover:text-cinema-purple-light transition-all"
              >
                {qr}
              </button>
            ))}
          </div>

          {/* Chat Input Form */}
          <form onSubmit={handleSend} className="p-3 border-t border-white/5 bg-cinema-void/50 flex space-x-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask for details or filter movies..."
              className="flex-1 rounded-xl border border-white/10 bg-cinema-deep px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-cinema-blue"
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="flex h-8.5 w-8.5 items-center justify-center rounded-xl bg-gradient-to-r from-cinema-purple to-cinema-blue text-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>

        </div>
      )}

      {/* Floating Trigger Bubble */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-cinema-purple to-cinema-blue text-white shadow-lg shadow-cinema-purple/45 hover:-translate-y-0.5 hover:shadow-cinema-purple/60 transition-all border border-white/10 hover:border-white/20 animate-glow-slow active:scale-95"
        title="Open AI Concierge Chat"
      >
        <MessageSquare className="h-6 w-6" />
      </button>

    </div>
  );
};
