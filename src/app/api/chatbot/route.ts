import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import db from "@/services/supabase";
import { nanoid } from "nanoid";
import { revalidateTag } from "next/cache";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);

type ChatbotConfig = {
  name: string;
  purpose: string;
  scope: string;
  style: string;
  languages: string;
  first: string;
};

type ChatHistory = {
  content: string;
  created: Date;
  id: string;
  role: string;
};

type RequestData = {
  chatbotToken?: string;
  config?: ChatbotConfig;
  message?: string;
  chatHistory?: ChatHistory[];
};

export async function POST(req: Request) {
  try {
    const userResData: RequestData = await req.json();

    const { chatbotToken, config, message, chatHistory } = userResData;

    let chatbot = null;

    // fetch exists one or create
    if (chatbotToken) {
      const { data: existingChatbot, error } = await db
        .from("chatbots")
        .select("*")
        .eq("token", chatbotToken)
        .single();

      if (error || !existingChatbot) {
        return NextResponse.json({ error: "Chatbot not found" }, { status: 400 });
      }

      chatbot = existingChatbot;
    } else if (config) {
      // eslint-disable-next-line
      const { first, ...rest } = config;
      const updatedConfig = {
        ...rest,
        token: nanoid(6),
        bot_introduce: "",
      };

      const { data: newChatbot, error } = await db
        .from("chatbots")
        .insert([updatedConfig])
        .select()
        .single();

      if (error || !newChatbot) {
        return NextResponse.json({ error: "Failed to create chatbot" }, { status: 500 });
      }

      chatbot = newChatbot;

      revalidateTag("chatbots");
    } else {
      return NextResponse.json(
        { error: "Either chatbotToken or config is required" },
        { status: 400 },
      );
    }

    // create a chatbot with config
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const historyToSend = [
      {
        role: "user",
        parts: [
          {
            text: `You are a chatbot with the following configuration:
          - Name: ${chatbot.name}
          - Purpose: ${chatbot.purpose}
          - Scope: ${chatbot.scope}
          - Communication Style: ${chatbot.style}
          - Supported Languages: ${chatbot.languages}
          
          Please respond according to this configuration. Remember these details for our conversation. And keep your responses concise and to the point, ideally within maximum four sentences. Respond only with the necessary information.`,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: `I understand. I am ${chatbot.name}, and I will communicate according to the specified configuration. I will maintain the defined purpose, scope, style, and language preferences throughout our interaction.`,
          },
        ],
      },
    ];

    if (chatHistory && chatHistory.length > 0) {
      chatHistory.forEach((h) => {
        if (h.role === "user") {
          historyToSend[0].parts.push({
            text: h.content,
          });
        } else {
          historyToSend[1].parts.push({
            text: h.content,
          });
        }
      });
    }

    const chat = model.startChat({ history: historyToSend });

    let result;
    let response;
    let chatbotData;

    if (!chatbotToken || message) {
      // generate response
      result = await chat.sendMessage(message as string);
      response = result.response.text();

      // update chatbot
      const { data, error: updateError } = await db
        .from("chatbots")
        .update({
          last_used_at: new Date().toISOString(),
          total_messages: chatbot.total_messages + 1,
          bot_introduce: config ? response : chatbot.bot_introduce,
        })
        .eq("id", chatbot.id)
        .select();

      chatbotData = data;

      if (updateError) {
        throw new Error(`Database update failed: ${updateError.message}`);
      }
    }

    return NextResponse.json({
      response: response,
      chatbot: chatbotData ? chatbotData : chatbot,
    });
    // // eslint-disable-next-line
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}

// all chatbots
export async function GET() {
  try {
    const { data: chatbots, error } = await db
      .from("chatbots")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json({ chatbots });
  } catch (error) {
    console.error("Failed to fetch chatbots:", error);
    return NextResponse.json({ error: "Failed to fetch chatbots" }, { status: 500 });
  }
}
