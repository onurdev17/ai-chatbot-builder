"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiCode } from "react-icons/fi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="border-t border-white/10 bg-gradient-to-b from-slate-900/50 to-transparent"
    >
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Branding Section */}
          <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-2">
            <FiCode className="h-8 w-8 text-purple-400" />
            <span className="text-xl font-semibold text-white">Nimblic</span>
            <div className="h-px flex-1 bg-gradient-to-r from-purple-500/30 to-transparent" />
          </motion.div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-purple-300">Navigation</h3>
            <ul className="space-y-2">
              {["Home", "Chatbots", "Docs", "Pricing"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-slate-300 transition-colors hover:text-purple-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-purple-300">Legal</h3>
            <ul className="space-y-2">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-slate-300 transition-colors hover:text-purple-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-purple-300">Connect</h3>
            <div className="flex gap-4">
              {[{ icon: <RiMoneyDollarCircleLine />, label: "GitHub" }].map((social) => (
                <motion.a
                  key={social.label}
                  href="#"
                  whileHover={{ y: -2 }}
                  className="flex items-center gap-2 text-slate-300 transition-colors hover:text-purple-200"
                >
                  <span className="text-xl">{social.icon}</span>
                  <span className="hidden sm:inline">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 border-t border-white/5 pt-6 text-center">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} Nimblic. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
