import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy } from "lucide-react";

const CopyableIdentifier = () => {
  const [copied, setCopied] = useState(false);
  const identifier = "8Gge4Es5VxoaWGBiG5KkaHWmQGqscG1Vb8yhU7Nupump";

  const handleCopy = () => {
    navigator.clipboard.writeText(identifier);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative flex items-center justify-center">
      <div className="mr-2 text-xs text-gray-500 truncate max-w-[180px]">CA: {identifier}</div>
      <button onClick={handleCopy} className="text-gray-400 transition-colors hover:text-gray-200">
        <Copy size={16} />
      </button>

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
    </div>
  );
};

export default CopyableIdentifier;
