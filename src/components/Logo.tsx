"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import logoimg from "../../public/logo.png";
import Link from "next/link";

function Logo() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="h-full w-full"
    >
      <Link href={"/"} className="block h-full w-full">
        <Image
          src={logoimg}
          alt="logo"
          fill
          className="pointer-events-none object-contain"
          style={{ position: "absolute", top: 0, left: 0 }}
        />
      </Link>
    </motion.div>
  );
}

export default Logo;
