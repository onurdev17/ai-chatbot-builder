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
    if (inputValue === undefined) return;

    const updatedConfig = {
      ...config,
      [currentQuestion!.sum]: inputValue,
    };

    setConfig(updatedConfig);

    if (currentQuestion?.id === 5) {
      handleSubmit(updatedConfig);
    } else {
    }
    // eslint-disable-next-line
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

    return;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleClick(e);
    }
  };

  useEffect(() => {
    setCurrentQId(1);

    // eslint-disable-next-line
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mx-auto w-[70rem] px-1 pt-20 sm:px-2 lg:px-4"
    >
      <div className="relative">
        <MessageBubble
          className="absolute left-0 top-2 z-10"
          message={
            currentQuestion?.question ? (
              currentQuestion?.question
            ) : (
              <p>
                Sit back and relax while we set everything up for you. <MiniSpinner />{" "}
              </p>
            )
          }
        />
        <div className="relative rounded-2xl bg-gradient-to-br from-slate-900/90 to-black/90 shadow-2xl shadow-cyan-500/20">
          <div className="relative overflow-hidden rounded-xl border border-cyan-500/20 bg-gradient-to-br from-slate-900/50 to-black/50 backdrop-blur-2xl">
            <div className="relative h-[30rem] w-full pt-6 md:h-[35rem] md:pt-8 lg:h-[36rem] lg:pt-10">
              {/* Köşe efektleri boyutları küçültüldü */}
              <div className="absolute left-0 top-0 h-6 w-6 rounded-tl-lg border-l-2 border-t-2 border-cyan-500/50 bg-cyan-500/10 md:h-8 md:w-8" />
              <div className="absolute right-0 top-0 h-6 w-6 rounded-tr-lg border-r-2 border-t-2 border-purple-500/50 bg-purple-500/10 md:h-8 md:w-8" />
              <div className="absolute bottom-0 left-0 h-6 w-6 rounded-bl-lg border-b-2 border-l-2 border-cyan-500/50 bg-cyan-500/10 md:h-8 md:w-8" />
              <div className="absolute bottom-0 right-0 h-6 w-6 rounded-br-lg border-b-2 border-r-2 border-purple-500/50 bg-purple-500/10 md:h-8 md:w-8" />
              {/* Işık efektleri boyutları ayarlandı */}
              <div className="absolute -left-20 -top-20 h-32 w-32 rounded-full bg-cyan-500/10 blur-xl md:h-48 md:w-48 md:blur-3xl" />
              <div className="absolute -bottom-20 -right-20 h-32 w-32 rounded-full bg-purple-500/10 blur-xl md:h-48 md:w-48 md:blur-3xl" />
              {/* Spline container responsive hale getirildi */}
              <div className="relative z-30 h-full w-full">
                <Spline
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="h-full w-full scale-[0.8] md:scale-100"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.05),transparent)]" />
              </div>
            </div>

            {/* Input alanı responsive ayarları */}
            <div className="border-t border-cyan-500/20 p-3 md:p-4">
              <div className="relative">
                <div className="rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 p-[1px] shadow-inner shadow-cyan-500/30 md:p-[2px]">
                  <div className="relative flex items-center rounded-lg bg-slate-900/50 backdrop-blur-lg">
                    <div className="absolute -left-1 top-1/2 h-4 w-[1px] -translate-y-1/2 bg-gradient-to-b from-cyan-400 to-transparent md:h-6 md:w-[2px]" />

                    <input
                      type="text"
                      className="flex-1 bg-transparent px-4 py-3 text-xs text-cyan-100 placeholder-cyan-300/50 focus:outline-none md:px-6 md:py-4 md:text-sm"
                      placeholder="Enter your AI vision..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      disabled={isCreating}
                    />

                    <button
                      onClick={handleClick}
                      className="mr-2 transform rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 p-2 shadow-lg shadow-cyan-500/30 transition-all hover:scale-105 hover:shadow-cyan-500/50 md:mr-3 md:p-2.5"
                    >
                      {isCreating ? (
                        <MiniSpinner />
                      ) : (
                        <>
                          <IoSendOutline className="h-4 w-4 text-slate-900 md:h-5 md:w-5" />
                          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.3),transparent)]" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Alt çizgi efekti */}
                <div className="absolute -bottom-1 left-1/2 h-[1px] w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent blur-sm md:-bottom-2 md:h-[2px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Model;
