import { NextResponse } from "next/server";
import { answerChat } from "@/lib/chat";
import { trackChatMessage } from "@/lib/stats";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = Array.isArray(body.messages) ? body.messages : [];
    const reply = await answerChat(messages);
    await trackChatMessage();
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: "No se pudo responder" }, { status: 500 });
  }
}
