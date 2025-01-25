"use client";

import { Button } from "@/components/ui/button";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
  ChatBubbleAction,
} from "@/components/ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { Mic, CornerDownLeft, CopyIcon, RefreshCcw, Volume2, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeDisplayBlock from "@/components/code-display-block";
import type { Chatbot, Message } from "@/lib/types";
import { clearLocalStorage, getFromLocalStorage, saveToLocalStorage } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";

// const ChatAiIcons = [
//   {
//     icon: CopyIcon,
//     label: "Copy",
//   },
//   {
//     icon: RefreshCcw,
//     label: "Refresh",
//   },
//   {
//     icon: Volume2,
//     label: "Volume",
//   },
// ];

export default function ChatBox({ token }: { token: string }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>();
  const [error, setError] = useState<string>();
  const [chatbot, setChatbot] = useState<Chatbot>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [image, setImage] = useState<string>();
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(false);

  const messagesRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const initializeChat = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/chatbot", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            chatbotToken: token,
          }),
        });

        const chatbotData = await res.json();
        const { chatbot } = chatbotData;
        setChatbot(chatbot);

        const storedMessages = getFromLocalStorage(`chat-${token}`);

        if (storedMessages && storedMessages.length > 0) {
          setMessages(storedMessages);
        } else if (chatbot?.bot_introduce) {
          setMessages([
            {
              content: chatbot.bot_introduce,
              createdAt: new Date(),
              id: Math.random().toString(36).substring(2, 10),
              role: "assistant",
            },
          ]);
        }
      } catch (error) {
        setError("Failed to initialize chat");
        console.error("Chat initialization error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeChat();
  }, [token]);

  useEffect(() => {
    const getImage = async () => {
      const res = await fetch("/api/chatbot/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: chatbot?.name,
          scope: chatbot?.scope,
          token,
        }),
      });

      const data = await res.json();

      const { imgUrl } = data;

      setImage(imgUrl);
    };

    if (chatbot && !chatbot.img_url) {
      setIsImageLoading(true);
      getImage();
      setIsImageLoading(false);
    }
  }, [chatbot, token]);

  useEffect(() => {
    if (messages.length > 0) {
      saveToLocalStorage(`chat-${token}`, messages);
    }
  }, [messages, token]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  const clearChat = () => {
    clearLocalStorage(`chat-${token}`);
    if (chatbot?.bot_introduce) {
      setMessages([
        {
          content: chatbot.bot_introduce,
          createdAt: new Date(),
          id: Math.random().toString(36).substring(2, 10),
          role: "assistant",
        },
      ]);
    } else {
      setMessages([]);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsGenerating(true);

    if (!input) return;

    const newMessage = {
      content: input,
      createdAt: new Date(),
      id: Math.random().toString(36).substring(2, 10),
      role: "user",
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput("");

    handleSubmit(input);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (isGenerating || !input) return;
      setIsGenerating(true);
      onSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  const handleSubmit = async (input: string) => {
    const res = await fetch("/api/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: input,
        chatbotToken: token,
        chatHistory: getFromLocalStorage(`chat-${token}`),
      }),
    });

    const data = await res.json();

    if (data.error) {
      setError("An error occurred");
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          content: data.response,
          createdAt: new Date(),
          id: Math.random().toString(36).substring(2, 10),
          role: "assistant",
        },
      ]);
    }
    setIsGenerating(false);
  };

  const renderChatAvatar = (role: string) => {
    if (role === "user") {
      return <ChatBubbleAvatar src="" fallback="👨🏽" className="bg-blue-500" />;
    }

    if (isImageLoading) {
      return (
        <ChatBubbleAvatar
          src=""
          fallback="⏳" // Using an hourglass emoji as loading indicator
          className="bg-gradient-to-br from-purple-500/50 to-blue-600/50" // Reduced opacity to indicate loading
        />
      );
    }

    return (
      <ChatBubbleAvatar
        src={image || chatbot?.img_url || ""}
        fallback="❓"
        className="bg-gradient-to-br from-purple-500 to-blue-600"
      />
    );
  };

  useEffect(() => {
    const checkMobile = () => {
      const isMobile = window.matchMedia("(max-width: 640px)").matches;
      setIsMobile(isMobile);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // hide scroll
  useEffect(() => {
    const handleMobileView = () => {
      if (window.innerWidth < 640) {
        document.body.style.overflow = "hidden";
        document.body.style.height = "100dvh";
      } else {
        document.body.style.overflow = "";
        document.body.style.height = "";
      }
    };

    // Run on mount
    handleMobileView();

    // Run on resize
    window.addEventListener("resize", handleMobileView);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleMobileView);
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, []);

  // mobile
  return isMobile ? (
    <div className="fixed inset-0 flex flex-col bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Header */}
      <div className="flex justify-between border-b border-white/10 p-4 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          {chatbot ? (
            <>
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-4xl">
                  {chatbot.img_url || image ? (
                    <Image
                      src={image || (chatbot.img_url as string)}
                      alt="bot image"
                      fill
                      className="rounded-lg"
                    />
                  ) : (
                    <p>❓</p>
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-slate-900 bg-green-500" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-white">{chatbot.name}</p>
                <p className="text-xs font-medium text-blue-400">Online</p>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-6">
              <Skeleton className="h-12 w-12 rounded-xl" />
              <div className="flex flex-col gap-3">
                <Skeleton className="h-6 w-[125px]" />
                <Skeleton className="h-3 w-[75px]" />
              </div>
            </div>
          )}
        </div>
        <Button
          className="text-slate-400 hover:bg-white/5 hover:text-white"
          variant="ghost"
          size="icon"
          onClick={clearChat}
        >
          <Trash2 className="size-4" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-2 py-4 sm:px-4" ref={messagesRef}>
        <ChatMessageList>
          {error && error}
          {messages &&
            messages.map((message, index) => (
              <ChatBubble
                key={index}
                variant={message.role == "user" ? "sent" : "received"}
                className="last:mb-4"
              >
                {renderChatAvatar(message.role)}
                <ChatBubbleMessage
                  className={` ${
                    message.role == "user"
                      ? "bg-gradient-to-r from-blue-500/20 to-blue-600/20"
                      : "bg-gradient-to-br from-purple-500/20 to-blue-500/20"
                  } border border-white/10 text-white backdrop-blur-sm`}
                >
                  {message.content &&
                    message.content.split("```").map((part: string, index: number) => {
                      if (index % 2 === 0) {
                        return (
                          <Markdown key={index} remarkPlugins={[remarkGfm]}>
                            {part}
                          </Markdown>
                        );
                      } else {
                        return (
                          <pre className="whitespace-pre-wrap pt-2" key={index}>
                            <CodeDisplayBlock code={part} lang="" />
                          </pre>
                        );
                      }
                    })}
                </ChatBubbleMessage>
              </ChatBubble>
            ))}

          {/* Loading */}
          {isGenerating && (
            <ChatBubble variant="received">
              <ChatBubbleAvatar
                src={image || chatbot?.img_url || ""}
                fallback=""
                className="bg-gradient-to-br from-purple-500 to-blue-600"
              />
              <ChatBubbleMessage
                isLoading
                className="border border-white/10 bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm"
              />
            </ChatBubble>
          )}
        </ChatMessageList>
      </div>

      {/* Input Form */}
      <div className="w-full p-2 sm:p-4">
        <form
          ref={formRef}
          onSubmit={onSubmit}
          className="w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl"
        >
          <ChatInput
            value={input}
            onKeyDown={onKeyDown}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="w-full rounded-xl border-0 bg-transparent text-white shadow-none placeholder:text-slate-400 focus-visible:ring-0"
            maxLength={255}
          />
          <div className="flex items-center p-3 pt-0">
            <Button
              disabled={!input || isGenerating}
              type="submit"
              size="sm"
              className="ml-auto gap-1.5 border-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
            >
              Send Message
              <CornerDownLeft className="size-3.5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <div className="relative mx-auto flex h-full w-full max-w-3xl flex-col items-center overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 opacity-85">
      {/* Dekoratif Arka Plan */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)]" />
      <div className="absolute left-0 right-0 top-0 h-20 bg-gradient-to-b from-blue-500/10 to-transparent" />

      {/* Header */}
      <div className="relative flex w-full justify-between border-b border-white/10 backdrop-blur-xl">
        <div className="flex gap-4 p-8">
          {chatbot ? (
            <>
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-4xl">
                  {chatbot.img_url || image ? (
                    <Image
                      src={image || (chatbot.img_url as string)}
                      alt="bot image"
                      fill
                      className="rounded-lg"
                    />
                  ) : (
                    <p>❓</p>
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-slate-900 bg-green-500" />
              </div>
              <div>
                <p className="mb-2 text-2xl font-semibold text-white">{chatbot.name}</p>
                <p className="text-xs font-medium text-blue-400">Online</p>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-6">
              <Skeleton className="h-12 w-12 rounded-xl" />
              <div className="flex flex-col gap-3">
                <Skeleton className="h-6 w-[125px]" />
                <Skeleton className="h-3 w-[75px]" />
              </div>
            </div>
          )}
        </div>
        <Button
          className="z-10 m-8 text-slate-400 hover:bg-white/5 hover:text-white"
          variant="ghost"
          size="icon"
          onClick={clearChat}
        >
          <Trash2 className="size-4" />
        </Button>
      </div>

      {/* Messages */}
      <div className="relative w-full flex-1 overflow-y-auto py-10">
        <ChatMessageList>
          {error && error}
          {messages &&
            messages.map((message, index) => (
              <ChatBubble key={index} variant={message.role == "user" ? "sent" : "received"}>
                {renderChatAvatar(message.role)}
                <ChatBubbleMessage
                  className={` ${
                    message.role == "user"
                      ? "bg-gradient-to-r from-blue-500/20 to-blue-600/20"
                      : "bg-gradient-to-br from-purple-500/20 to-blue-500/20"
                  } border border-white/10 text-white backdrop-blur-sm`}
                >
                  {message.content &&
                    message.content.split("```").map((part: string, index: number) => {
                      if (index % 2 === 0) {
                        return (
                          <Markdown key={index} remarkPlugins={[remarkGfm]}>
                            {part}
                          </Markdown>
                        );
                      } else {
                        return (
                          <pre className="whitespace-pre-wrap pt-2" key={index}>
                            <CodeDisplayBlock code={part} lang="" />
                          </pre>
                        );
                      }
                    })}

                  {/* {message.role === "assistant" && messages.length - 1 === index && (
                    <div className="flex items-center mt-1.5 gap-1">
                      {!isGenerating && (
                        <>
                          {ChatAiIcons.map((icon, iconIndex) => {
                            const Icon = icon.icon;
                            return (
                              <ChatBubbleAction
                                variant="outline"
                                className="size-5 hover:bg-white/10 text-slate-400 hover:text-white"
                                key={iconIndex}
                                icon={<Icon className="size-3" />}
                              />
                            );
                          })}
                        </>
                      )}
                    </div>
                  )} */}
                </ChatBubbleMessage>
              </ChatBubble>
            ))}

          {/* Loading */}
          {isGenerating && (
            <ChatBubble variant="received">
              <ChatBubbleAvatar
                src={image || chatbot?.img_url || ""}
                fallback=""
                className="bg-gradient-to-br from-purple-500 to-blue-600"
              />
              <ChatBubbleMessage
                isLoading
                className="border border-white/10 bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm"
              />
            </ChatBubble>
          )}
        </ChatMessageList>
      </div>

      {/* Input Form */}
      <div className="sticky bottom-0 w-full bg-transparent px-3 pb-4 sm:px-6">
        <form
          ref={formRef}
          onSubmit={onSubmit}
          className="relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl"
        >
          <ChatInput
            value={input}
            onKeyDown={onKeyDown}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="rounded-xl border-0 bg-transparent text-white shadow-none placeholder:text-slate-400 focus-visible:ring-0"
            maxLength={255}
          />
          <div className="flex items-center p-3 pt-0">
            <Button
              disabled={!input || isGenerating}
              type="submit"
              size="sm"
              className="ml-auto gap-1.5 border-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
            >
              Send Message
              <CornerDownLeft className="size-3.5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
