import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const MessageBubble = ({
  className,
  message,
}: {
  className?: string;
  message: string | React.ReactNode;
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={cn(className, "flex w-full max-w-96 justify-center px-4")}>
      {/* Desktop Version */}
      <div className="group relative hidden h-20 max-w-[80%] md:block">
        <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-slate-900/90 to-black/90 p-[2px] shadow-[0_0_30px_-10px_rgba(34,211,238,0.3)]">
          <div className="relative rounded-2xl bg-gradient-to-br from-slate-900/50 to-black/50 p-4 backdrop-blur-3xl">
            {/* Hover Effects */}
            <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.1),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Dots */}
            {mounted && (
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute h-1 w-1 rounded-full bg-cyan-400/30"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animation: `float ${3 + i}s infinite linear`,
                    }}
                  />
                ))}
              </div>
            )}

            <div className="relative z-10">
              <p className="bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]">
                {message}
              </p>
            </div>
          </div>
        </div>

        <div className="absolute -inset-4 -z-10 rounded-2xl bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.1),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      <div className="group relative h-20 max-w-[90%] md:hidden">
        <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-slate-900/90 to-black/90 p-[2px] shadow-[0_0_30px_-10px_rgba(34,211,238,0.3)]">
          <div className="relative rounded-2xl bg-gradient-to-br from-slate-900/50 to-black/50 p-4 backdrop-blur-3xl">
            <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.1),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {mounted && (
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute h-1 w-1 rounded-full bg-cyan-400/30"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animation: `float ${3 + i}s infinite linear`,
                    }}
                  />
                ))}
              </div>
            )}

            <div className="relative z-10">
              <p className="bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]">
                {message}
              </p>
            </div>
          </div>
        </div>

        <div className="absolute -inset-4 -z-10 rounded-2xl bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.1),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
    </div>
  );
};

export default MessageBubble;
