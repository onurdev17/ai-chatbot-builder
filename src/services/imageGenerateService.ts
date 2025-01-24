import fetch from "node-fetch";
import db from "./supabase";

const apiKey = process.env.NEXT_PUBLIC_LEONARDO_API_KEY;

export const generateImage = async ({
  name,
  scope,
  token,
}: {
  name: string;
  scope: string;
  token: string;
}) => {
  try {
    const prompt = `A highly detailed cartoon-style illustration featuring ${name}, a character designed specifically to answer questions about ${scope}. This character has realistic facial features with smooth, exaggerated cartoon shading. ${name} is dressed in modern casual attire, standing in a dynamic pose that reflects their expertise in ${scope}. The background is softly blurred to highlight ${name}, with vibrant and slightly whimsical colors enhancing the atmosphere.`;

    const generateResponse = await fetch("https://cloud.leonardo.ai/api/rest/v1/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: prompt,
        modelId: "b2614463-296c-462a-9586-aafdb8f00e36",
        num_images: 1,
        width: 512,
        height: 512,
        // alchemy: true,
        // photoReal: true,
        guidance_scale: 7,
      }),
    });

    if (!generateResponse.ok) {
      const errorBody = await generateResponse.text();
      console.error("API Error Details:", errorBody);
      throw new Error(`Leonardo API error: ${generateResponse.statusText}`);
    }

    const generateData = await generateResponse.json();
    // eslint-disable-next-line
    // @ts-ignore
    const generationId = generateData.sdGenerationJob.generationId;

    await new Promise((resolve) => setTimeout(resolve, 25000));

    const statusResponse = await fetch(
      `https://cloud.leonardo.ai/api/rest/v1/generations/${generationId}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );

    if (!statusResponse.ok) {
      throw new Error(`Status check failed: ${statusResponse.statusText}`);
    }

    const result = await statusResponse.json();

    // eslint-disable-next-line
    // @ts-ignore
    if (result.generations_by_pk.status !== "COMPLETE") {
      throw new Error("Image generation failed");
    }

    // eslint-disable-next-line
    // @ts-ignore
    const imageUrl = result.generations_by_pk.generated_images[0].url;
    const imageResponse = await fetch(imageUrl);
    const imageBuffer = await imageResponse.buffer();

    const imgName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.jpeg`;
    const { error: uploadError } = await db.storage
      .from("chatbot_avatars")
      .upload(imgName, imageBuffer, {
        contentType: "image/jpeg",
        upsert: false,
      });

    if (uploadError) {
      throw new Error(`Supabase upload failed: ${uploadError.message}`);
    }

    const supabaseUrl = `https://cwsxpgwvvnfzugcsrvyv.supabase.co/storage/v1/object/public/chatbot_avatars/${imgName}`;

    const { data, error: updateError } = await db
      .from("chatbots")
      .update({ img_url: supabaseUrl })
      .eq("token", token)
      .select()
      .single();

    if (updateError) {
      throw new Error(`Database update failed: ${updateError.message}`);
    }

    return data.img_url as string;
  } catch (error) {
    console.error("Error in generateImage:", error);
    throw new Error(`Image processing failed: ${(error as Error).message}`);
  }
};
