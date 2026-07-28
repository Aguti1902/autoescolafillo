import { NextResponse } from "next/server";
import { trackPageView } from "@/lib/stats";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const pathname = String(body.pathname || "/");
  await trackPageView(pathname);
  return NextResponse.json({ ok: true });
}
