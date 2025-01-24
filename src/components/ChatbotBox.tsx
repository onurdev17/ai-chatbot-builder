import { Chatbot } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

const ChatbotBox = ({ chatbot }: { chatbot: Chatbot }) => {
  return (
    <Link
      href={`chatbots/${chatbot.token}`}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-purple-900/30 to-blue-900/30 p-8 opacity-90 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-purple-400/40 hover:opacity-100 hover:shadow-purple-500/30"
    >
      <div className="absolute -left-20 -top-20 h-48 w-48 animate-pulse rounded-full bg-purple-600/20 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-48 w-48 animate-pulse rounded-full bg-blue-600/20 blur-3xl" />

      <div className="relative z-10 mx-auto h-32 w-32">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500 to-blue-400 opacity-80 blur-lg" />
        <Image
          src={chatbot.img_url || ""}
          alt={chatbot.name || ""}
          fill
          className="relative z-20 rounded-full border-2 border-white/20 object-cover"
        />
        <div className="absolute bottom-1 right-1 z-30 h-3 w-3 rounded-full bg-green-400 ring-2 ring-white/50" />
      </div>

      <div className="mt-4 space-y-3 text-center">
        <h2 className="text-xl font-bold text-white transition-all group-hover:text-purple-300">
          {chatbot.name}
        </h2>
        <p className="line-clamp-3 text-sm text-gray-300">{chatbot.bot_introduce}</p>
      </div>

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(200px_circle_at_var(--x)_var(--y),rgba(124,58,237,0.4),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </Link>
  );
};

export default ChatbotBox;
