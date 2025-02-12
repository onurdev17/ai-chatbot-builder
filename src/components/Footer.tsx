"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FiCode, FiTwitter } from "react-icons/fi";
import { PiTelegramLogo } from "react-icons/pi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { useState } from "react";
import { getWalletCode } from "@/lib/constants";

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const walletAddress = getWalletCode();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const CopyNotification = () => (
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
  );

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="border-t border-white/10 bg-gradient-to-b from-slate-900/50 to-transparent"
    >
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-2">
            <FiCode className="h-8 w-8 text-purple-400" />
            <span className="text-xl font-semibold text-white">Nimblic</span>
            <div className="h-px flex-1 bg-gradient-to-r from-purple-500/30 to-transparent" />
          </motion.div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-purple-300">Navigation</h3>
            <ul className="space-y-2">
              {[
                { text: "Home", link: "/" },
                { text: "Chatbots", link: "/chatbots" },
              ].map((item) => (
                <li key={item.text}>
                  <Link
                    href={item.link}
                    className="text-slate-300 transition-colors hover:text-purple-200"
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-purple-300">Social Media</h3>
            <div className="flex gap-4">
              {[
                {
                  icon: <FiTwitter />,
                  label: "Twitter",
                  href: "https://x.com/NimblicAiSol",
                },
                {
                  icon: <PiTelegramLogo />,
                  label: "Telegram",
                  href: "https://t.me/nimblicai",
                },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="flex items-center gap-2 text-slate-300 transition-colors hover:text-purple-200"
                >
                  <span className="text-xl">{social.icon}</span>
                  <span className="hidden sm:inline">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Contract Address Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-purple-300">Wallet</h3>
            <motion.div
              whileHover={{ y: -2 }}
              className="flex cursor-pointer items-center gap-2 text-slate-300 transition-colors hover:text-purple-200"
              onClick={copyToClipboard}
            >
              <RiMoneyDollarCircleLine className="text-xl" />
              <span>Contract Address</span>
            </motion.div>
          </div>

          <div className="mt-8 border-t border-white/5 pt-6 text-center">
            <p className="text-sm text-slate-400">
              © {new Date().getFullYear()} Nimblic. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      <CopyNotification />
    </motion.footer>
  );
}
