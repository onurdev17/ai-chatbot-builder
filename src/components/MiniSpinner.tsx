"use client";

import { motion } from "framer-motion";

const MiniSpinner = ({ color = "#00f7ff" }) => {
  return (
    <motion.div
      animate={{
        rotate: 360,
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="relative h-full min-h-5 w-full min-w-5"
    >
      <div
        className="absolute inset-0 rounded-full border-2 border-transparent border-t-current"
        style={{ borderTopColor: color }}
      />

      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-white/10 to-transparent" />

      <div
        className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-current"
        style={{ backgroundColor: color }}
      />
    </motion.div>
  );
};

export default MiniSpinner;
