import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

import { ADAMYA_SYSTEM_PROMPT } from "@/lib/chatbot-context";

const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY_MESSAGES = 8;

export async function POST(req: Request) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return new NextResponse(
        "Chatbot is not configured yet (missing ANTHROPIC_API_KEY).",
        { status: 500 }
      );
    }

    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return new NextResponse("Bad request", { status: 400 });
    }

    // Keep only the most recent turns and guard against overly long input.
    const trimmedHistory: { role: "user" | "assistant"; content: string }[] =
      messages
        .slice(-MAX_HISTORY_MESSAGES)
        .map((m: { role: string; content: string }) => ({
          role:
            m.role === "assistant"
              ? ("assistant" as const)
              : ("user" as const),
          content: String(m.content ?? "").slice(0, MAX_MESSAGE_LENGTH),
        }));

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      system: ADAMYA_SYSTEM_PROMPT,
      messages: trimmedHistory,
    });

    const textBlock = response.content.find((block) => block.type === "text");
    const reply =
      textBlock && "text" in textBlock
        ? textBlock.text
        : "Sorry, I couldn't generate a response. Try asking again.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.log("[CHAT_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
