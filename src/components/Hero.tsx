"use client";
import React from "react";
import Heading from "./Heading";
import TypographyMuted from "./MutedText";
import { Button } from "./ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-end px-4">
      <div className="relative z-10 flex flex-col items-center space-y-8">
        {/* Title with subtle shadow */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Heading className="text-center text-5xl font-bold text-white drop-shadow-2xl md:text-6xl">
            AI-Powered Personalized
            <span className="block h-14 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Chatbot
            </span>
          </Heading>
        </motion.div>

        {/* Subtitle with animated border */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="relative max-w-2xl text-center"
        >
          <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-50 blur-xl" />
          <TypographyMuted className="text-md relative leading-8 text-gray-300/90 md:text-lg">
            Build intelligent chatbots that understand context, adapt to user behavior, and
            integrate seamlessly with your existing ecosystem.
          </TypographyMuted>
        </motion.div>

        {/* Glowing button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Button
            asChild
            className="w-64 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all hover:shadow-purple-500/40"
          >
            <Link href="/create-chatbot">
              <span className="relative z-10 font-semibold text-white">Get Started</span>

              {/* Subtle hover effect */}
              {/* <div className="absolute inset-0 -left-full h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all group-hover:left-full" /> */}
            </Link>
          </Button>
        </motion.div>

        {/* Animated dots pattern */}
        <motion.div
          className="absolute -bottom-20 -z-10 h-24 w-full bg-[radial-gradient(circle,#4F46E5_1px,transparent_1px)] bg-[size:16px_16px] opacity-10"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>
    </div>
  );
}
