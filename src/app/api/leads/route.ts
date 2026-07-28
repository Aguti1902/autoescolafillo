import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getLeads, saveLeads, type Lead } from "@/lib/data";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const leads = await getLeads();
  return NextResponse.json(leads);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    if (!name || !email) {
      return NextResponse.json({ error: "Nombre y email son obligatorios" }, { status: 400 });
    }

    const lead: Lead = {
      id: randomUUID(),
      name,
      email,
      phone: body.phone ? String(body.phone) : "",
      service: body.service ? String(body.service) : "",
      message: body.message ? String(body.message) : "",
      source: body.source ? String(body.source) : "web",
      status: "nuevo",
      createdAt: new Date().toISOString(),
    };

    const leads = await getLeads();
    leads.unshift(lead);
    await saveLeads(leads);
    return NextResponse.json({ ok: true, lead });
  } catch {
    return NextResponse.json({ error: "Error al guardar" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const body = await req.json();
  const leads = await getLeads();
  const idx = leads.findIndex((l) => l.id === body.id);
  if (idx < 0) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  leads[idx] = { ...leads[idx], ...body };
  await saveLeads(leads);
  return NextResponse.json(leads[idx]);
}

export async function DELETE(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const leads = await getLeads();
  await saveLeads(leads.filter((l) => l.id !== id));
  return NextResponse.json({ ok: true });
}
