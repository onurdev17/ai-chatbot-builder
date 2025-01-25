// app/chatbots/page.tsx
import ChatbotList from "@/components/ChatbotList";
import { ChatbotListSkeleton } from "@/components/ChatbotListSkeleton";
import { Suspense } from "react";

async function ChatbotsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const page = Number(searchParams.page) || 1;

  return (
    <div className="mb-0 flex min-h-screen w-full flex-col items-start gap-6">
      <Suspense fallback={<ChatbotListSkeleton />}>
        <ChatbotList page={page as number} />
      </Suspense>
    </div>
  );
}

export default ChatbotsPage;
