import Link from "next/link";
import { requireAdmin } from "@/lib/require-admin";
import { getLeads, getSiteData, getStats } from "@/lib/data";

export default async function AdminDashboard() {
  await requireAdmin();
  const [stats, leads, site] = await Promise.all([getStats(), getLeads(), getSiteData()]);
  const totalViews = Object.values(stats.pageViews).reduce((a, b) => a + b, 0);
  const nuevos = leads.filter((l) => l.status === "nuevo").length;

  const cards = [
    { label: "Visitas totales", value: totalViews },
    { label: "Leads totales", value: leads.length },
    { label: "Leads nuevos", value: nuevos },
    { label: "Mensajes chat IA", value: stats.chatMessages || 0 },
  ];

  return (
    <div>
      <h1 className="font-display text-4xl text-navy">Dashboard</h1>
      <p className="mt-2 text-muted">
        Resumen de {site.site.name} · {site.site.address}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-navy/10 bg-white p-5 shadow-sm">
            <p className="text-sm text-muted">{c.label}</p>
            <p className="mt-2 font-display text-4xl text-navy">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-navy/10 bg-white p-5 shadow-sm">
          <h2 className="font-display text-2xl text-navy">Tarifas actuales</h2>
          <ul className="mt-4 space-y-2 text-ink/75">
            <li>Coche pack destacado: {site.tariffs.coche.featured.price}€</li>
            <li>Moto A1/A2: {site.tariffs.moto.price}€</li>
            <li>Ciclomotor AM: {site.tariffs.am.price}€</li>
          </ul>
          <Link href="/admin/tarifas" className="mt-4 inline-block font-semibold text-navy hover:text-navy-mid">
            Gestionar tarifas →
          </Link>
        </div>
        <div className="rounded-2xl border border-navy/10 bg-white p-5 shadow-sm">
          <h2 className="font-display text-2xl text-navy">Últimos leads</h2>
          <ul className="mt-4 space-y-3">
            {leads.slice(0, 5).map((l) => (
              <li key={l.id} className="flex items-center justify-between gap-3 text-sm">
                <span>
                  {l.name} · {l.service || "Sin servicio"}
                </span>
                <span className="capitalize text-muted">{l.status}</span>
              </li>
            ))}
            {leads.length === 0 && <li className="text-muted">Aún no hay leads.</li>}
          </ul>
          <div className="mt-4 flex flex-wrap gap-4">
            <Link href="/admin/leads" className="font-semibold text-navy hover:text-navy-mid">
              Ver todos →
            </Link>
            <Link href="/admin/informes" className="font-semibold text-navy hover:text-navy-mid">
              Generar informe IA →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
