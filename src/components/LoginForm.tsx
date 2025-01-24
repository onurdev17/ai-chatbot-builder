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
    // Her durumda hata göster
    setError("Invalid credentials - Nimblic authentication failed");
    setTimeout(() => setError(null), 3000); // 3 saniye sonra hata mesajını kaldır
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-4">
      {/* <div className="animate-float animation-delay-3000 absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" /> */}
      {/* <div className="animate-float absolute -left-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" /> */}
      {/* Orijinal arkaplan efektleri */}

      {/* Orijinal form konteynırı */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-slate-900/50 to-black/50 p-8 shadow-2xl shadow-cyan-500/20 backdrop-blur-2xl"
      >
        {/* Hata mesajı (orijinal tasarım ile uyumlu) */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-xl border border-cyan-500/50 bg-cyan-900/20 p-4 text-center text-cyan-300 backdrop-blur-sm"
          >
            ⚠️ {error}
          </motion.div>
        )}

        {/* Orijinal logo/header */}
        <div className="mb-12 flex flex-col items-center">
          <div className="relative mb-4 h-24 w-24">
            <Logo />
          </div>
        </div>

        {/* Orijinal form elemanları */}
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
                  setError(null); // Hata mesajını temizle
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
                  setError(null); // Hata mesajını temizle
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

        {/* Orijinal ekstra bağlantılar
        <div className="mt-6 flex justify-center space-x-4 text-sm">
          <a href="#" className="text-cyan-400/80 hover:text-cyan-300">
            Quantum Recovery
          </a>
          <span className="text-cyan-400/40">•</span>
          <a href="#" className="text-cyan-400/80 hover:text-cyan-300">
            Create NeuroAccount
          </a>
        </div> */}
      </motion.div>
    </div>
  );
}
