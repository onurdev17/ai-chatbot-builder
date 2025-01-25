"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function Safari({ imageSrc }: { imageSrc: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const rotateX = useTransform(scrollY, [0, 600], [50, 0], { clamp: true });

  return (
    <section
      ref={containerRef}
      className="mt-32 h-[65vh] w-full overflow-hidden py-20 sm:h-[100vh]"
    >
      <motion.div
        initial={{ opacity: 0, bottom: -200 }}
        animate={{ opacity: 1, bottom: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{
          rotateX,
          transformPerspective: 1000,
          transformOrigin: "top center",
        }}
        className="relative mx-auto w-[60%] sm:max-w-[710px]"
      >
        {/* Cihaz Çerçevesi */}
        <div className="absolute inset-0 z-20">
          {/* Üst Işık Efekti */}
          <div className="absolute -top-1 left-1/2 h-4 w-3/4 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-400/20 blur-xl" />

          {/* Cihaz Kenarlıkları */}
          <div className="absolute inset-0 rounded-[2.5rem] border-2 border-white/10" />
          <div className="absolute inset-[2px] rounded-[2rem] border-2 border-white/5" />

          {/* Browser Çubuğu */}
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

        {/* Holografik Efekt */}
        <div className="absolute inset-0 z-10 rounded-3xl bg-[radial-gradient(circle_at_center,rgba(96,165,250,0.1),transparent)]" />

        {/* İçerik Container */}
        <div className="relative z-0 mx-4 overflow-hidden rounded-[2rem] shadow-2xl">
          <div className="relative pt-[91.55%]">
            <div className="absolute inset-0">
              <Image
                src={imageSrc}
                alt="application usage component"
                fill
                sizes="(max-width: 768px) 100vw, 710px"
                className="object-contain pb-4 pt-14" // Değişiklik burada
              />
            </div>
          </div>
        </div>

        {/* Alt Yansıma Efekti */}
        <div className="absolute -bottom-24 left-0 right-0 h-24 scale-y-[-1] opacity-40 blur-lg">
          <div className="h-full w-full bg-[linear-gradient(0deg,transparent,rgba(255,255,255,0.3))]" />
        </div>
      </motion.div>
    </section>
  );
}

export default Safari;
