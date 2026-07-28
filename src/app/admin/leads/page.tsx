"use client";

import { useEffect, useState } from "react";

type Lead = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message?: string;
  source: string;
  status: string;
  createdAt: string;
};

const statuses = ["nuevo", "contactado", "matriculado", "descartado"];

export default function LeadsAdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);

  async function load() {
    const res = await fetch("/api/leads");
    if (res.ok) setLeads(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function updateStatus(id: string, status: string) {
    await fetch("/api/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    load();
  }

  async function remove(id: string) {
    if (!confirm("¿Eliminar este lead?")) return;
    await fetch(`/api/leads?id=${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <h1 className="font-display text-4xl text-navy">Leads</h1>
      <p className="mt-2 text-muted">Consultas del formulario y seguimiento comercial</p>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-navy/10 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-fog text-muted">
            <tr>
              <th className="px-4 py-3">Fecha</th>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Contacto</th>
              <th className="px-4 py-3">Servicio</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <tr key={l.id} className="border-t border-navy/10 align-top">
                <td className="px-4 py-3 text-muted">
                  {new Date(l.createdAt).toLocaleString("es-ES")}
                </td>
                <td className="px-4 py-3">
                  <p>{l.name}</p>
                  <p className="text-xs text-muted">{l.source}</p>
                  {l.message && <p className="mt-1 max-w-xs text-muted">{l.message}</p>}
                </td>
                <td className="px-4 py-3">
                  <p>{l.email}</p>
                  <p className="text-muted">{l.phone}</p>
                </td>
                <td className="px-4 py-3">{l.service || "—"}</td>
                <td className="px-4 py-3">
                  <select
                    value={l.status}
                    onChange={(e) => updateStatus(l.id, e.target.value)}
                    className="rounded-lg border border-navy/10 bg-white px-2 py-1"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => remove(l.id)} className="text-navy hover:underline">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {leads.length === 0 && (
          <p className="p-6 text-muted">No hay leads todavía. Llegarán desde los formularios.</p>
        )}
      </div>
    </div>
  );
}
