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
    setIsMobile(window.innerWidth <= 768);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    if (isMobile) setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const SocialLinks = () => (
    <>
      <a
        href="https://t.me/yourchannel"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 rounded-lg bg-gray-800/50 p-2 backdrop-blur-sm transition-all duration-300 hover:bg-gray-700/50 hover:text-cyan-400"
        aria-label="Telegram"
      >
        <PiTelegramLogo className="h-4 w-4" />
        {!isMobile && (
          <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
            Telegram
          </span>
        )}
      </a>

      <div
        onClick={copyToClipboard}
        className="group relative flex cursor-pointer items-center gap-2 rounded-lg bg-gray-800/50 p-2 backdrop-blur-sm transition-all duration-300 hover:bg-gray-700/50 hover:text-purple-400"
      >
        <ImCoinDollar className="h-4 w-4" />
        <span
          className={`absolute -bottom-7 left-1/2 -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs text-white ${
            copied ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          } w-max transition-opacity`}
        >
          {copied ? "Copied!" : `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
        </span>
      </div>

      <a
        href="https://twitter.com/yourprofile"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 rounded-lg bg-gray-800/50 p-2 backdrop-blur-sm transition-all duration-300 hover:bg-gray-700/50 hover:text-sky-400"
        aria-label="Twitter"
      >
        <FiTwitter className="h-4 w-4" />
        {!isMobile && (
          <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
            Twitter
          </span>
        )}
      </a>
    </>
  );

  if (!isMounted) return null;

  return (
    <div className="fixed right-4 top-4 z-50">
      {isMobile ? (
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="rounded-lg bg-gray-800/50 p-2 backdrop-blur-sm transition-all duration-300 hover:bg-gray-700/50"
          >
            {isOpen ? <PiX className="h-5 w-5" /> : <IoIosMenu className="h-5 w-5" />}
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 top-full mt-2 flex flex-col gap-2 rounded-lg bg-gray-800/95 p-2 backdrop-blur-sm"
              >
                <SocialLinks />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <SocialLinks />
        </div>
      )}
    </div>
  );
};

export default Socials;
