// components/SkeletonChatbotBox.tsx
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonChatbotBox = () => {
  return (
    <div className="flex cursor-pointer flex-col items-center gap-6 overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-purple-900/30 to-blue-900/30 p-8 opacity-90 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-purple-400/40 hover:opacity-100 hover:shadow-purple-500/30">
      <Skeleton className="h-32 w-32 rounded-full bg-slate-600" />
      <Skeleton className="h-6 w-20 bg-slate-700" />
      <div className="h-16 w-[22rem] px-6">
        <Skeleton className="h-full w-full bg-slate-700" />
      </div>
    </div>
  );
};

export function ChatbotListSkeleton() {
  return (
    <div className="mx-auto mt-36 max-w-7xl p-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <SkeletonChatbotBox key={i} />
        ))}
      </div>
    </div>
  );
}
