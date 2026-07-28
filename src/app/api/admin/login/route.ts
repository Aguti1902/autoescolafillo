import { NextResponse } from "next/server";
import { createSession, getAdminPassword } from "@/lib/auth";

export async function POST(req: Request) {
  const body = await req.json();
  const password = String(body.password || "");
  if (password !== getAdminPassword()) {
    return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 });
  }
  await createSession();
  return NextResponse.json({ ok: true });
}
