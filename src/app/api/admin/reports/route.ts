import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { generateAdminReport } from "@/lib/admin-reports";

export async function POST(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const question = String(body.question || "").trim();
    if (!question) {
      return NextResponse.json({ error: "Escribe qué informe quieres" }, { status: 400 });
    }
    const report = await generateAdminReport(question);
    return NextResponse.json({ report });
  } catch {
    return NextResponse.json({ error: "No se pudo generar el informe" }, { status: 500 });
  }
}
