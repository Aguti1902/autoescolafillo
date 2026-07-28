import { NextResponse } from "next/server";
import { getLeads, getStats } from "@/lib/data";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const [stats, leads] = await Promise.all([getStats(), getLeads()]);
  const last7 = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const key = d.toISOString().slice(0, 10);
    return { date: key, views: stats.daily[key] || 0 };
  });

  return NextResponse.json({
    stats,
    last7,
    leadsTotal: leads.length,
    leadsNuevos: leads.filter((l) => l.status === "nuevo").length,
    leadsByStatus: {
      nuevo: leads.filter((l) => l.status === "nuevo").length,
      contactado: leads.filter((l) => l.status === "contactado").length,
      matriculado: leads.filter((l) => l.status === "matriculado").length,
      descartado: leads.filter((l) => l.status === "descartado").length,
    },
  });
}
