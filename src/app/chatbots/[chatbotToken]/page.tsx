import ChatBox from "@/components/ChatBox";

function ChatbotPage({ params }: { params: { chatbotToken: string } }) {
  return (
    <div className="mx-auto w-full">
      <div className="mx-auto h-full w-[60rem] sm:h-[700px]">
        <ChatBox token={params.chatbotToken} />
      </div>
    </div>
  );
}

export default ChatbotPage;
