"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Heading from "./Heading";
import TypographyMuted from "./MutedText";

const DesktopImg = "/desktop-safari.png";
const MobileImg = "/mobile-safari.png";

function Safari() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const rotateX = useTransform(scrollY, [0, 600], [50, 0], { clamp: true });
  const mobileRotateX = useTransform(scrollY, [0, 600], [30, 0], { clamp: true });

  return (
    <section
      ref={containerRef}
      className="mt-32 h-[153dvh] w-full overflow-hidden py-20 sm:h-[115vh]"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="mb-20 text-center"
      >
        <Heading variant="secondary">The Future of Conversation</Heading>
        <TypographyMuted className="text-md relative leading-8 text-gray-300/90 md:text-lg mt-4 px-4">
          AI-driven chats that feel like real interactions—today and tomorrow.
        </TypographyMuted>
      </motion.div>

      {/* Desktop */}
      <motion.div
        className="relative mx-auto hidden w-[70%] sm:block sm:max-w-[710px]"
        initial={{ opacity: 0, bottom: -200 }}
        animate={{ opacity: 1, bottom: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{
          rotateX,
          transformPerspective: 1000,
          transformOrigin: "top center",
        }}
      >
        <div className="absolute inset-0 z-20">
          <div className="absolute -top-1 left-1/2 h-4 w-3/4 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-400/20 blur-xl" />
          <div className="absolute inset-0 rounded-[2.5rem] border-2 border-white/10" />
          <div className="absolute inset-[2px] rounded-[2rem] border-2 border-white/5" />
          <div className="absolute left-4 right-4 top-4 flex items-center gap-2 px-4">
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
            </div>
            <div className="h-6 flex-1 rounded-full bg-slate-900/80 backdrop-blur-lg">
              <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-cyan-400/30 to-purple-400/30" />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 z-10 rounded-3xl bg-[radial-gradient(circle_at_center,rgba(96,165,250,0.1),transparent)]" />
        <div className="relative z-0 mx-4 overflow-hidden rounded-[2rem] shadow-2xl">
          <div className="relative pt-[91.55%]">
            <div className="absolute inset-0">
              <Image
                src={DesktopImg}
                alt="application usage desktop view"
                fill
                sizes="(max-width: 768px) 100vw, 710px"
                className="object-contain pb-4 pt-14"
              />
            </div>
          </div>
        </div>
        <div className="absolute -bottom-24 left-0 right-0 h-24 scale-y-[-1] opacity-40 blur-lg">
          <div className="h-full w-full bg-[linear-gradient(0deg,transparent,rgba(255,255,255,0.3))]" />
        </div>
      </motion.div>

      {/* Mobile */}
      <motion.div
        className="relative mx-auto block w-[80%] max-w-[400px] sm:hidden"
        initial={{ opacity: 0, bottom: -200 }}
        animate={{ opacity: 1, bottom: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{
          rotateX: mobileRotateX,
          transformPerspective: 1000,
          transformOrigin: "top center",
        }}
      >
        <div className="absolute inset-0 z-20">
          <div className="absolute left-1/2 top-2 h-6 w-1/2 -translate-x-1/2 rounded-b-xl bg-black" />

          <div className="absolute inset-0 rounded-[2.5rem] border-2 border-white/10" />
          <div className="absolute inset-[2px] rounded-[2rem] border-2 border-white/5" />
        </div>

        <div className="absolute inset-0 z-10 rounded-3xl bg-[radial-gradient(circle_at_center,rgba(96,165,250,0.1),transparent)]" />

        <div className="relative z-0 mx-4 overflow-hidden rounded-[2rem] shadow-2xl">
          <div className="relative pt-[250%]">
            <div className="absolute inset-0">
              <Image
                src={MobileImg}
                alt="application usage mobile view"
                fill
                sizes="(max-width: 768px) 400px"
                className="object-contain pb-10 pt-10"
              />
            </div>
          </div>
        </div>

        <div className="absolute -bottom-24 left-0 right-0 h-24 scale-y-[-1] opacity-40 blur-lg">
          <div className="h-full w-full bg-[linear-gradient(0deg,transparent,rgba(255,255,255,0.3))]" />
        </div>
      </motion.div>
    </section>
  );
}

export default Safari;
