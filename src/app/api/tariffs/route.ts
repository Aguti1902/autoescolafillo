import { NextResponse } from "next/server";
import { getSiteData, saveSiteData } from "@/lib/data";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  const data = await getSiteData();
  return NextResponse.json(data.tariffs);
}

export async function PUT(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const tariffs = await req.json();
  const data = await getSiteData();
  data.tariffs = tariffs;
  await saveSiteData(data);
  return NextResponse.json({ ok: true, tariffs });
}
