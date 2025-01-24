import { cn } from "@/lib/utils";

const MessageBubble = ({
  className,
  message,
}: {
  className?: string;
  message: string | React.ReactNode;
}) => {
  return (
    <div className={cn(className, "mb-4 flex w-full justify-center px-4")}>
      <div className="group relative max-w-[80%]">
        {/* Ana Container */}
        <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-slate-900/90 to-black/90 p-[2px] shadow-[0_0_30px_-10px_rgba(34,211,238,0.3)]">
          <div className="relative rounded-2xl bg-gradient-to-br from-slate-900/50 to-black/50 p-4 backdrop-blur-3xl">
            {/* Hover efektleri */}
            <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.1),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Yüzen noktalar efekti */}
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

            {/* Ana metin alanı */}
            <div className="relative z-10">
              {/* Holografik metin efekti */}
              <p className="bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]">
                {message}
              </p>
            </div>

            {/* Dinamik sınır animasyonu */}
            <div className="before:animate-border-rotate absolute inset-0 rounded-2xl border-2 border-transparent [mask:linear-gradient(black,transparent)] before:absolute before:inset-0 before:rounded-2xl before:bg-[conic-gradient(rgba(168,85,247,0.5),transparent_150%)]" />
          </div>
        </div>

        {/* Yansıma efekti */}
        <div className="absolute -inset-4 -z-10 rounded-2xl bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.1),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
    </div>
  );
};

export default MessageBubble;
