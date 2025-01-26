"use client";

import { useState, useEffect, useCallback } from "react";
import { FiTwitter } from "react-icons/fi";
import { PiTelegramLogo, PiX } from "react-icons/pi";
import { IoIosMenu } from "react-icons/io";
import { ImCoinDollar } from "react-icons/im";
import { motion, AnimatePresence } from "framer-motion";

// Sabit sosyal ikon verileri
const socialItems = [
  {
    icon: <PiTelegramLogo className="h-5 w-5 text-blue-300" />,
    href: "https://t.me/yourchannel",
    delay: 0.15,
    key: "telegram",
  },
  {
    icon: <FiTwitter className="h-5 w-5 text-blue-300" />,
    href: "https://twitter.com/yourprofile",
    delay: 0.45,
    key: "twitter",
  },
];

const Socials = () => {
  const [walletAddress] = useState("Available soon");
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

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    setIsOpen(false);
  }, [walletAddress]);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <div className={`${isMobile ? "fixed" : "absolute"} right-4 top-4 z-50`}>
      {/* Desktop Social Icons */}
      <div className="hidden items-center gap-3 md:flex">
        {socialItems.map((item) => (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: item.delay,
              type: "spring",
              stiffness: 100,
            }}
            whileHover={{ scale: 1.15, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="relative rounded-xl border border-indigo-500/30 bg-gradient-to-r from-blue-500/30 to-purple-500/30 p-4 backdrop-blur-xl transition-all hover:border-indigo-400 hover:ring-1 hover:ring-indigo-400/30"
          >
            <a
              className="absolute inset-0 flex items-center justify-center"
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.icon}
            </a>
          </motion.div>
        ))}

        {/* Contract Button - Animasyonu bağımsız */}
        <motion.div
          key="contract"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
          whileHover={{ scale: 1.15, y: -3 }}
          whileTap={{ scale: 0.95 }}
          className="relative rounded-xl border border-indigo-500/30 bg-gradient-to-r from-blue-500/30 to-purple-500/30 p-2 p-4 backdrop-blur-xl transition-all hover:border-indigo-400 hover:ring-1 hover:ring-indigo-400/30"
        >
          <button
            className="absolute inset-0 flex items-center justify-center"
            onClick={copyToClipboard}
          >
            <ImCoinDollar className={`h-5 w-5 ${copied ? "text-green-400" : "text-blue-300"}`} />
          </button>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      {isMobile && (
        <>
          <motion.button
            whileHover={{ rotate: 90 }}
            onClick={toggleMenu}
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 p-2 text-gray-400 backdrop-blur-lg transition-all hover:border-cyan-400 hover:text-cyan-400 md:hidden"
          >
            {isOpen ? <PiX className="h-6 w-6" /> : <IoIosMenu className="h-6 w-6" />}
          </motion.button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="fixed inset-0 z-40 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 backdrop-blur-2xl md:hidden"
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
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Copy Notification */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 z-[999] -translate-x-1/2"
          >
            <div className="rounded-lg bg-gray-800/90 px-4 py-2.5 text-center text-sm ring-1 ring-gray-700/80 backdrop-blur-lg">
              ✅ Contract address copied!
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Socials;
