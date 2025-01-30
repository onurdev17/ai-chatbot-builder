import { getChatbots } from "@/services/chatbotService";
import ChatbotBox from "./ChatbotBox";
import CustomPagination from "./CustomPagination";
import Heading from "./Heading";

const ITEMS_PER_PAGE = 9;

async function ChatbotList({ page: currentPage }: { page: number }) {
  const { chatbotsData: chatbots, totalItems } = await getChatbots({ currentPage, ITEMS_PER_PAGE });

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  return (
    <div className="mx-auto pt-44 flex w-full max-w-7xl flex-col gap-4 p-6">
      <div className="sm:flex flex-col justify-center text-center mb-20">
        <Heading variant="secondary">All chatbots</Heading>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {chatbots.map((chatbot) => (
          <ChatbotBox key={chatbot.id} chatbot={chatbot} />
        ))}
      </div>
      <CustomPagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}

export default ChatbotList;
