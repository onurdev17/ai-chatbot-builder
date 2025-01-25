"use client";

import { useQuestion } from "@/context/QuestionContext";
import Spline from "@splinetool/react-spline";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoSendOutline } from "react-icons/io5";
import MessageBubble from "./ModelBubble";
import { motion } from "framer-motion";
import MiniSpinner from "./MiniSpinner";

type ChatbotCreate = {
  name: string;
  purpose: string;
  scope: string;
  style: string;
  languages: string;
};

function Model() {
  const [inputValue, setInputValue] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const { currentQuestion, setCurrentQId } = useQuestion();
  const [config, setConfig] = useState<ChatbotCreate>({
    name: "",
    purpose: "",
    scope: "",
    style: "",
    languages: "",
  });

  const router = useRouter();

  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue) return;

    const updatedConfig = {
      ...config,
      [currentQuestion!.sum]: inputValue,
    };

    setConfig(updatedConfig);

    if (currentQuestion?.id === 5) {
      handleSubmit(updatedConfig);
    }

    // @ts-ignore
    setCurrentQId((prev) => prev + 1);
    setInputValue("");
  };

  const handleSubmit = async (config: ChatbotCreate) => {
    setIsCreating(true);
    const res = await fetch("/api/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        config,
        message:
          "Introduce yourself, talk about your purpose and scope. Do it in the third-person singular.",
      }),
    });
    const data = await res.json();
    router.push(`/chatbots/${data.chatbot[0].token}`);
    setIsCreating(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleClick(e);
  };

  useEffect(() => {
    setCurrentQId(1);
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mx-auto w-full max-w-[70rem] px-4 pt-8 sm:px-6 lg:px-8"
    >
      {/* Desktop View  */}
      <div className="hidden sm:block">
        <div className="relative">
          <MessageBubble
            className="absolute left-44 top-2 z-10 -translate-x-1/2 transform"
            message={
              currentQuestion?.question || (
                <p>
                  Sit back and relax while we set everything up for you. <MiniSpinner />
                </p>
              )
            }
          />

          <div className="relative rounded-2xl bg-gradient-to-br from-slate-900/90 to-black/90 shadow-2xl shadow-cyan-500/20">
            <div className="relative overflow-hidden rounded-xl border border-cyan-500/20 bg-gradient-to-br from-slate-900/50 to-black/50 backdrop-blur-2xl">
              <div className="flex flex-col sm:flex-row">
                {/* Spline Model */}
                <div className="relative h-[30rem] sm:w-2/3">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.05),transparent)]" />
                  <Spline
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="h-full w-full scale-[0.8] sm:scale-100"
                  />
                </div>

                {/* Input Area */}
                <div className="w-full border-t border-cyan-500/20 p-4 sm:w-1/3 sm:border-l sm:border-t-0">
                  <div className="relative flex h-full flex-col">
                    <div className="flex min-w-full flex-1">
                      <div className="flex min-h-96 w-full flex-col rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 p-[1px] shadow-inner shadow-cyan-500/30">
                        <div className="flex-[90%] space-y-2 border-b border-cyan-500/20 p-4">
                          <h3 className="mb-2 text-sm font-semibold text-cyan-300">
                            Configuration
                          </h3>
                          <div className="grid grid-cols-1 gap-2">
                            {Object.entries(config).map(
                              ([key, value]) =>
                                value && (
                                  <div key={key} className="text-sm text-cyan-100">
                                    <span className="font-medium capitalize">{key}:</span>
                                    <span className="ml-2 truncate text-cyan-300">{value}</span>
                                  </div>
                                ),
                            )}
                          </div>
                        </div>
                        <div className="relative flex flex-[10%] items-center rounded-lg bg-slate-900/50 backdrop-blur-lg">
                          <input
                            type="text"
                            className="flex-1 bg-transparent px-4 py-3 text-sm text-cyan-100 placeholder-cyan-300/50 focus:outline-none"
                            placeholder="Enter your AI vision..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={isCreating}
                          />
                          <button
                            onClick={handleClick}
                            className="absolute right-0 m-2 transform rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 p-2 shadow-lg shadow-cyan-500/30 transition-all hover:scale-105 hover:shadow-cyan-500/50"
                          >
                            {isCreating ? (
                              <MiniSpinner />
                            ) : (
                              <IoSendOutline className="h-4 w-4 text-slate-900" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="sm:hidden">
        {/* Arkaplan Robot */}
        <div className="fixed inset-0 z-0">
          <Spline
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-transparent to-black/90" />
        </div>

        <MessageBubble
          className="fixed bottom-24 left-1/2 z-10 w-[90%] -translate-x-1/2 transform"
          message={
            currentQuestion?.question || (
              <p className="text-center">
                Sit back and relax while we set everything up for you. <MiniSpinner />
              </p>
            )
          }
        />

        {/* Konfigürasyon Listesi */}
        <div className="fixed inset-x-0 top-24 z-20 mx-4 max-h-[60vh] overflow-y-auto rounded-xl bg-slate-800/90 p-4 backdrop-blur-xl">
          <h3 className="mb-4 text-lg font-semibold text-cyan-300">Configuration</h3>
          <div className="space-y-3">
            {Object.entries(config).map(
              ([key, value]) =>
                value && (
                  <div key={key} className="text-sm text-cyan-100">
                    <span className="font-medium capitalize">{key}:</span>
                    <span className="ml-2 block truncate text-cyan-300">{value}</span>
                  </div>
                ),
            )}
          </div>
        </div>

        {/* Mobile Input */}
        <div className="fixed bottom-0 left-0 z-30 w-full border-t border-cyan-500/20 bg-slate-900/95 backdrop-blur-xl">
          <div className="p-3">
            <div className="relative flex items-center rounded-lg bg-slate-800/80">
              <input
                type="text"
                className="flex-1 bg-transparent px-4 py-4 text-base text-cyan-100 placeholder-cyan-300/50 focus:outline-none"
                placeholder="Enter your AI vision..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isCreating}
              />
              <button
                onClick={handleClick}
                className="m-2 transform rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 p-2 shadow-lg shadow-cyan-500/30 transition-all hover:scale-105 hover:shadow-cyan-500/50"
              >
                {isCreating ? (
                  <MiniSpinner />
                ) : (
                  <IoSendOutline className="h-5 w-5 text-slate-900" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Model;
