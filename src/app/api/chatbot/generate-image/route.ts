import { generateImage } from "@/services/imageGenerateService";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, scope, token } = await req.json();

    if (!token) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const imgUrl = await generateImage({ name, scope, token });

    return NextResponse.json({ imgUrl });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
