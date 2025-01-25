"use client";

import { motion } from "framer-motion";
import { Lock, Mail } from "lucide-react";
import { useState } from "react";
import Logo from "./Logo";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("Invalid credentials - Nimblic authentication failed");
    setTimeout(() => setError(null), 3000);
  };

  return (
    <div className="relative flex h-[60vh] items-end justify-center overflow-hidden p-4 sm:min-h-screen sm:items-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md rounded-xl border-0 p-6 sm:rounded-2xl sm:border sm:border-cyan-500/30 sm:bg-gradient-to-br sm:from-slate-900/50 sm:to-black/50 sm:shadow-2xl sm:shadow-cyan-500/20 sm:backdrop-blur-2xl"
      >
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-xl border border-cyan-500/50 bg-cyan-900/20 p-4 text-center text-cyan-300 backdrop-blur-sm"
          >
            ⚠️ {error}
          </motion.div>
        )}

        {/* Logo'yu mobile'da gizle */}
        <div className="mb-12 hidden flex-col items-center max-sm:mb-8 sm:flex">
          <div className="relative mb-4 h-24 w-24">
            <Logo />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div className="group relative">
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-cyan-500/30 to-purple-500/30 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100" />
            <div className="relative flex items-center rounded-xl border border-cyan-500/30 bg-slate-900/50 backdrop-blur-lg">
              <Mail className="ml-4 size-5 text-cyan-400" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                }}
                className="w-full bg-transparent px-4 py-3 text-cyan-100 placeholder-cyan-400/50 focus:outline-none"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="group relative">
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-cyan-500/30 to-purple-500/30 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100" />
            <div className="relative flex items-center rounded-xl border border-cyan-500/30 bg-slate-900/50 backdrop-blur-lg">
              <Lock className="ml-4 size-5 text-cyan-400" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
                className="w-full bg-transparent px-4 py-3 text-cyan-100 placeholder-cyan-400/50 focus:outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all hover:shadow-purple-500/40"
          >
            Sign in
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
