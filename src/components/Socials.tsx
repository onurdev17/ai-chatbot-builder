"use client";

import { useState, useEffect } from "react";
import { FiTwitter } from "react-icons/fi";
import { PiTelegramLogo, PiX } from "react-icons/pi";
import { IoIosMenu } from "react-icons/io";
import { ImCoinDollar } from "react-icons/im";
import { motion, AnimatePresence } from "framer-motion";

const Socials = () => {
  const [walletAddress] = useState("0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b");
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    setIsOpen(false);
  };

  const toggleMenu = () => setIsOpen((prev) => !prev);

  // Desktop View Components
  const DesktopSocials = () => (
    <div className="hidden items-center gap-3 md:flex">
      {[
        {
          icon: <PiTelegramLogo className="h-5 w-5 text-blue-300" />,
          href: "https://t.me/yourchannel",
        },
        {
          icon: (
            <ImCoinDollar className={`h-5 w-5 ${copied ? "text-green-400" : "text-blue-300"}`} />
          ),
          action: copyToClipboard,
        },
        {
          icon: <FiTwitter className="h-5 w-5 text-blue-300" />,
          href: "https://twitter.com/yourprofile",
        },
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: index * 0.15,
            type: "spring",
            stiffness: 100,
          }}
          whileHover={{ scale: 1.15, y: -3 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-xl border border-indigo-500/30 bg-gradient-to-br from-indigo-900/80 to-indigo-800/20 p-2 backdrop-blur-xl transition-all hover:border-indigo-400 hover:ring-1 hover:ring-indigo-400/30"
        >
          {item.href ? (
            <a href={item.href} target="_blank" rel="noopener noreferrer" className="block">
              {item.icon}
            </a>
          ) : (
            <button onClick={item.action} className="block">
              {item.icon}
            </button>
          )}
        </motion.div>
      ))}
    </div>
  );

  // Mobile View Components
  const MobileMenu = () => (
    <div className="relative z-50 flex h-full flex-col items-center justify-center px-4 [&>:not(:last-child)]:border-b [&>:not(:last-child)]:border-gray-700/50 [&>:not(:last-child)]:pb-4">
      <motion.a
        whileHover={{ scale: 1.02 }}
        href="https://t.me/yourchannel"
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full max-w-md items-center justify-center gap-3 bg-transparent py-4 backdrop-blur-lg"
      >
        <PiTelegramLogo className="h-8 w-8 text-cyan-400" />
        <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-2xl font-bold uppercase tracking-widest text-transparent">
          Telegram
        </span>
      </motion.a>

      <motion.a
        whileHover={{ scale: 1.02 }}
        href="https://twitter.com/yourprofile"
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full max-w-md items-center justify-center gap-3 bg-transparent py-4 backdrop-blur-lg"
      >
        <FiTwitter className="h-8 w-8 text-sky-400" />
        <span className="bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-2xl font-bold uppercase tracking-widest text-transparent">
          Twitter
        </span>
      </motion.a>

      <motion.button
        whileHover={{ scale: 1.02 }}
        onClick={copyToClipboard}
        className="flex w-full max-w-md items-center justify-center gap-3 bg-transparent py-4 backdrop-blur-lg"
      >
        <ImCoinDollar className="h-8 w-8 text-purple-400" />
        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-2xl font-bold uppercase tracking-widest text-transparent">
          {copied ? "Copied!" : "Contract"}
        </span>
      </motion.button>
    </div>
  );

  const CopyNotification = () => (
    <AnimatePresence>
      {copied && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-8 left-1/2 z-[999] -translate-x-1/2"
        >
          <div className="rounded-lg bg-gray-800/90 px-4 py-2.5 text-sm ring-1 ring-gray-700/80 backdrop-blur-lg">
            ✅ Contract address copied!
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (!isMounted) return null;

  return (
    <div className={`${isMobile ? "fixed" : "absolute"} right-4 top-4 z-50`}>
      <DesktopSocials />
      <CopyNotification />

      {isMobile && (
        <>
          <motion.button
            whileHover={{ rotate: 90 }}
            onClick={toggleMenu}
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 p-2 text-gray-400 backdrop-blur-lg transition-all hover:border-cyan-400 hover:text-cyan-400 md:hidden"
          >
            {isOpen ? (
              <PiX className="h-6 w-6 text-current" />
            ) : (
              <IoIosMenu className="h-6 w-6 text-current" />
            )}
          </motion.button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                key="mobile-menu"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="fixed inset-0 z-40 h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 backdrop-blur-2xl md:hidden"
                onClick={(e) => e.target === e.currentTarget && toggleMenu()}
              >
                <div className="absolute right-6 top-6 z-[60]">
                  <PiX
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMenu();
                    }}
                    className="h-10 w-10 cursor-pointer rounded-full border-2 border-gray-700 p-2 text-gray-400 transition-all hover:border-cyan-400 hover:text-cyan-400"
                  />
                </div>

                <MobileMenu />

                <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute h-1 w-1 animate-pulse rounded-full bg-cyan-400"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default Socials;
