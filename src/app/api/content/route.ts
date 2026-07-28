import { NextResponse } from "next/server";
import { getSiteData, saveSiteData } from "@/lib/data";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  const data = await getSiteData();
  return NextResponse.json(data);
}

export async function PUT(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const body = await req.json();
  await saveSiteData(body);
  return NextResponse.json({ ok: true });
}
