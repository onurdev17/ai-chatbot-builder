import { Chatbot } from "@/lib/types";
import db from "./supabase";
import { unstable_cache } from "next/cache";

type GetChatbots = {
  chatbotsData: Chatbot[] | [];
  error: string;
  totalItems: number;
};

export const getChatbots = unstable_cache(
  async function getChatbots({
    currentPage,
    ITEMS_PER_PAGE,
  }: {
    currentPage: number;
    ITEMS_PER_PAGE: number;
  }): Promise<GetChatbots> {
    const start = currentPage * ITEMS_PER_PAGE - ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE - 1;

    try {
      const {
        data: chatbotsData,
        count,
        error,
      } = await db.from("chatbots").select("*", { count: "exact" }).range(start, end);

      if (error) {
        throw new Error(error.message);
      }

      return { chatbotsData, error: "", totalItems: count as number };
    } catch (err) {
      console.error("Error fetching chatbots:", err);

      return {
        chatbotsData: [],
        error: "An unexpected error occurred while fetching chatbots.",
        totalItems: 0,
      };
    }
  },
  ["chatbot-list"],
  {
    revalidate: 60,
    tags: ["chatbots"],
  },
);
