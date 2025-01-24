"use client";

import { Copy, Check, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const WalletCode = ({ address }: { address: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const shortAddress = `${address.slice(0, 4)}...${address.slice(-4)}`;

  const copyToClipboard = (e: React.MouseEvent) => {
    e.stopPropagation(); // Event bubbling'i engelle
    navigator.clipboard.writeText(address);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute right-4 top-4 z-50"
    >
      <div
        className="group relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Ana Container */}
        <motion.div
          className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#729efa]/30 bg-[#080f1f] px-3 py-2 shadow-lg shadow-[#729efa]/10 backdrop-blur-sm"
          whileHover={{ scale: 1.02 }}
          onClick={copyToClipboard} // Ana containera tıklanabilirlik ekle
        >
          <Wallet className="h-4 w-4 text-[#729efa]" />
          <span className="font-mono text-sm text-[#9ab4ff]">{shortAddress}</span>
          <div className="relative h-5 w-5">
            {isCopied ? (
              <Check className="absolute inset-0 h-4 w-4 text-green-400" />
            ) : (
              <Copy className="absolute inset-0 h-4 w-4 text-[#729efa]/80 hover:text-[#729efa]" />
            )}
          </div>
        </motion.div>

        {/* Hover Durumunda Tam Adres */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute right-0 top-full mt-2 rounded-lg border border-[#729efa]/20 bg-[#080f1f]/95 p-3 shadow-xl backdrop-blur-sm"
          >
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm text-[#9ab4ff]">{address}</span>
              <Copy
                className="h-4 w-4 cursor-pointer text-[#729efa]/80 hover:text-[#729efa]"
                onClick={copyToClipboard}
              />
            </div>
            <div className="absolute -top-[6px] right-3 h-3 w-3 rotate-45 transform border-l border-t border-[#729efa]/30 bg-[#080f1f]/95" />
          </motion.div>
        )}

        {/* Aktif Durum Işığı */}
        <div className="pointer-events-none absolute -inset-[1px] rounded-lg bg-gradient-to-r from-[#729efa]/20 to-[#a17efa]/20 opacity-0 transition-opacity group-hover:opacity-30" />
      </div>
    </motion.div>
  );
};

export default WalletCode;
