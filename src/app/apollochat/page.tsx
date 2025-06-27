"use client";
import React, { useEffect, useState, useRef } from "react";
import { PaperAirplaneIcon, SparklesIcon } from "@heroicons/react/24/solid";
import ReactMarkdown from "react-markdown";
import { useApolloChatMutation } from "@/redux/features/apollochat/apollochatApiSlice";

// DEFINE TYPES
// =================================
// Defines the structure for a single chat message
type Message = {
  type: "user" | "ai";
  content: string;
};

// Defines the props for our ChatMessage sub-component
type ChatMessageProps = {
  message: Message;
  isLoading?: boolean;
};

// A single chat message component for better organization
// =================================
const ChatMessage = ({ message, isLoading = false }: ChatMessageProps) => {
  const isUser = message.type === "user";

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="chat-bubble max-w-lg rounded-xl bg-primary text-primary-content shadow-sm">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3">
      {/* AI Avatar */}
      <div className="flex-shrink-0 rounded-full bg-secondary p-2 text-secondary-content shadow-sm">
        <SparklesIcon className="h-5 w-5" />
      </div>
      <div className="chat-bubble max-w-lg rounded-xl border border-gray-200 bg-white text-base-content shadow-sm">
        {isLoading ? (
          <span className="loading loading-dots loading-md"></span>
        ) : (
          <ReactMarkdown className="prose">
            {message.content || "I'm sorry, I don't understand."}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
};

// The main chat component
// =================================
const ChatPromptForm = () => {
  const [prompt, setPrompt] = useState("");
  // Explicitly type the messages state with our Message type
  const [messages, setMessages] = useState<Message[]>([]);
  const [addPrompt, { isLoading }] = useApolloChatMutation();
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleSendMessage = async (currentPrompt: string) => {
    if (currentPrompt.trim() === "") return;

    const userMessage: Message = { type: "user", content: currentPrompt };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt(""); // Clear input immediately

    try {
      // Show loading indicator immediately after sending message
      setMessages((prev) => [...prev, { type: "ai", content: "" }]);
      const res = await addPrompt({ prompt: currentPrompt }).unwrap();
      const aiMessage: Message = { type: "ai", content: res.response };
      setMessages((prev) => [...prev.slice(0, -1), aiMessage]);
    } catch (error) {
      console.error("ApolloChat Error:", error);
      const errorMessage: Message = {
        type: "ai",
        content: "Oops! Something went wrong on my end.",
      };
      setMessages((prev) => [...prev.slice(0, -1), errorMessage]);
    }
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    handleSendMessage(prompt);
  };

  const starterPrompts = [
    "What are the school hours?",
    "Tell me about the curriculum.",
    "How do I apply?",
  ];

  return (
    <div className="flex h-[calc(100vh-0px)] flex-col overflow-hidden rounded-t-2xl bg-base-100/80 pt-24 shadow-2xl backdrop-blur-sm lg:h-[calc(100vh-0px)]">
      {/* Chat Messages Area */}
      <div className="flex-grow overflow-y-auto p-4 md:p-6">
        <div className="mx-auto max-w-3xl space-y-6">
          {messages.length === 0 ? (
            <div className="pt-16 text-center">
              <div className="mb-4 inline-block rounded-full bg-secondary/50 p-4">
                <SparklesIcon className="h-10 w-10 text-secondary-content" />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-base-content">
                What can I help with today?
              </h2>
              <p className="mb-6 text-base-content/70">
                Ask me anything, or try one of these common questions.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {starterPrompts.map((p) => (
                  <button
                    key={p}
                    onClick={() => handleSendMessage(p)}
                    className="rounded-full border border-gray-200 bg-white px-4 py-2 transition-colors hover:bg-secondary/20"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, index) => (
              <ChatMessage
                key={index}
                message={msg}
                isLoading={
                  isLoading &&
                  msg.type === "ai" &&
                  index === messages.length - 1
                }
              />
            ))
          )}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Input Form Area */}
      <div className="border-t border-gray-200 bg-base-100/70 p-4">
        <form
          onSubmit={handleSubmit}
          className="relative mx-auto w-full max-w-3xl"
        >
          <div className="flex items-center rounded-full border border-gray-200 bg-white p-2 shadow-sm">
            <input
              value={prompt}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPrompt(e.target.value)
              }
              className="w-full bg-transparent px-4 text-base focus:outline-none"
              placeholder="Ask me anything..."
              disabled={isLoading}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  handleSubmit(e);
                }
              }}
            />
            <button
              type="submit"
              className="rounded-full bg-accent p-2 text-accent-content shadow-md transition-colors hover:bg-teal-600 disabled:cursor-not-allowed disabled:bg-gray-300"
              disabled={isLoading || prompt.trim().length < 1}
              aria-label="Send message"
            >
              <PaperAirplaneIcon className="h-6 w-6" />
            </button>
          </div>
        </form>
        <p className="mt-3 text-center text-xs text-base-content/50">
          ApolloChat is experimental, so mistakes are possible.
        </p>
      </div>
    </div>
  );
};

export default ChatPromptForm;
