"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiHome, FiMessageSquare, FiUser } from "react-icons/fi";
import { usePathname } from "next/navigation"; // Yeni eklenen import

function Navbar() {
  const pathname = usePathname(); // Aktif route'u al
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { scrollY } = useScroll();

  const tabs = [
    { name: "Home", url: "/", icon: <FiHome /> },
    { name: "Chatbots", url: "/chatbots", icon: <FiMessageSquare /> },
    { name: "Sign in", url: "/sign-in", icon: <FiUser /> },
  ];

  useMotionValueEvent(scrollY, "change", (latest) => {
    const current = latest;
    const threshold = 30;
    const scrollDirection = current > lastScrollY ? "down" : "up";

    if (current > threshold && scrollDirection === "down") {
      setIsVisible(false);
    } else if (scrollDirection === "up" || current <= threshold) {
      setIsVisible(true);
    }

    setLastScrollY(current);
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const navbarVariants = {
    visible: { y: 0, opacity: 1 },
    hidden: { y: isMobile ? 100 : -100, opacity: 0 },
  };

  return (
    <motion.header
      variants={navbarVariants}
      animate={isVisible ? "visible" : "hidden"}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="fixed left-1/2 top-2 z-50 h-16 !-translate-x-1/2 transform sm:top-10"
    >
      <motion.nav
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className={`flex rounded-xl bg-white/5 backdrop-blur-lg`}
      >
        <div className="flex items-center gap-1 p-1.5">
          {tabs.map((tab) => {
            const isActive = pathname === tab.url;
            return (
              <Link
                key={tab.name}
                href={tab.url}
                className={`relative flex items-center rounded-lg px-4 py-2.5 transition-colors ${
                  isActive ? "text-white" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span className="ml-2 hidden text-sm sm:block">{tab.name}</span>

                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-blue-500/30 to-purple-500/30"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}

                {isActive && (
                  <div className="absolute -bottom-[11px] h-[3px] w-6 rounded-t-full bg-blue-400" />
                )}
              </Link>
            );
          })}
        </div>
      </motion.nav>
    </motion.header>
  );
}

export default Navbar;
