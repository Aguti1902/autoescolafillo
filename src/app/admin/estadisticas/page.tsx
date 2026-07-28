"use client";

import { useEffect, useState } from "react";

type StatsPayload = {
  stats: {
    pageViews: Record<string, number>;
    chatMessages: number;
  };
  last7: { date: string; views: number }[];
  leadsTotal: number;
  leadsNuevos: number;
  leadsByStatus: Record<string, number>;
};

export default function EstadisticasPage() {
  const [data, setData] = useState<StatsPayload | null>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then(setData)
      .catch(() => undefined);
  }, []);

  if (!data) {
    return <p className="text-muted">Cargando estadísticas…</p>;
  }

  const max = Math.max(...data.last7.map((d) => d.views), 1);
  const pages = Object.entries(data.stats.pageViews).sort((a, b) => b[1] - a[1]);

  return (
    <div>
      <h1 className="font-display text-4xl text-navy">Estadísticas</h1>
      <p className="mt-2 text-muted">Visitas, leads y uso del chat de IA</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-navy/10 bg-white p-5">
          <p className="text-sm text-muted">Leads totales</p>
          <p className="font-display text-4xl text-navy">{data.leadsTotal}</p>
        </div>
        <div className="rounded-2xl border border-navy/10 bg-white p-5">
          <p className="text-sm text-muted">Leads nuevos</p>
          <p className="font-display text-4xl text-navy">{data.leadsNuevos}</p>
        </div>
        <div className="rounded-2xl border border-navy/10 bg-white p-5">
          <p className="text-sm text-muted">Mensajes chat</p>
          <p className="font-display text-4xl text-navy">{data.stats.chatMessages}</p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-navy/10 bg-white p-5">
        <h2 className="font-display text-2xl text-navy">Visitas últimos 7 días</h2>
        <div className="mt-6 flex h-48 items-end gap-3">
          {data.last7.map((d) => (
            <div key={d.date} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-t-lg bg-navy-mid"
                style={{ height: `${(d.views / max) * 100}%`, minHeight: d.views ? 8 : 2 }}
              />
              <span className="text-[10px] text-muted">{d.date.slice(5)}</span>
              <span className="text-xs text-ink/70">{d.views}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-navy/10 bg-white p-5">
          <h2 className="font-display text-2xl text-navy">Páginas más vistas</h2>
          <ul className="mt-4 space-y-2">
            {pages.map(([path, views]) => (
              <li key={path} className="flex justify-between text-sm">
                <span className="text-ink/70">{path}</span>
                <span className="text-navy">{views}</span>
              </li>
            ))}
            {pages.length === 0 && <li className="text-muted">Sin datos todavía.</li>}
          </ul>
        </div>
        <div className="rounded-2xl border border-navy/10 bg-white p-5">
          <h2 className="font-display text-2xl text-navy">Leads por estado</h2>
          <ul className="mt-4 space-y-2">
            {Object.entries(data.leadsByStatus).map(([status, n]) => (
              <li key={status} className="flex justify-between text-sm capitalize">
                <span className="text-ink/70">{status}</span>
                <span className="text-navy">{n}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
