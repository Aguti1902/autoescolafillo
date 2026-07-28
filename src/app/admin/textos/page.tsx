"use client";

import { useEffect, useState } from "react";

export default function TextosAdminPage() {
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then(setData);
  }, []);

  function setPath(path: string[], value: string) {
    if (!data) return;
    const clone = structuredClone(data) as Record<string, unknown>;
    let cursor: Record<string, unknown> = clone;
    for (let i = 0; i < path.length - 1; i++) {
      cursor = cursor[path[i]] as Record<string, unknown>;
    }
    cursor[path[path.length - 1]] = value;
    setData(clone);
  }

  async function save() {
    if (!data) return;
    setSaving(true);
    const res = await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setMsg(res.ok ? "Textos guardados correctamente." : "Error al guardar");
  }

  if (!data) return <p className="text-muted">Cargando textos…</p>;

  const home = data.home as Record<string, string>;
  const site = data.site as Record<string, string | number>;
  const nosotros = data.nosotros as Record<string, string>;
  const contacto = data.contacto as Record<string, string>;
  const carnetB = data.carnetB as Record<string, string>;
  const carnetMoto = data.carnetMoto as Record<string, string>;
  const carnetAm = data.carnetAm as Record<string, string>;

  const fields: { label: string; path: string[]; value: string; rows?: number }[] = [
    { label: "Nombre web", path: ["site", "name"], value: String(site.name) },
    { label: "Teléfono mostrado", path: ["site", "phoneDisplay"], value: String(site.phoneDisplay) },
    { label: "Email", path: ["site", "email"], value: String(site.email) },
    { label: "Dirección", path: ["site", "address"], value: String(site.address), rows: 2 },
    { label: "Horario", path: ["site", "hours"], value: String(site.hours), rows: 2 },
    { label: "Hero título", path: ["home", "heroTitle"], value: home.heroTitle },
    { label: "Hero texto", path: ["home", "heroText"], value: home.heroText, rows: 3 },
    { label: "Sobre nosotros (home)", path: ["home", "aboutText"], value: home.aboutText, rows: 4 },
    { label: "Servicios texto", path: ["home", "servicesText"], value: home.servicesText, rows: 3 },
    { label: "Nosotros intro", path: ["nosotros", "intro"], value: nosotros.intro, rows: 4 },
    { label: "Nosotros cita", path: ["nosotros", "quote"], value: nosotros.quote, rows: 3 },
    { label: "Contacto título", path: ["contacto", "title"], value: contacto.title },
    { label: "Contacto texto", path: ["contacto", "text"], value: contacto.text, rows: 3 },
    { label: "Carnet B headline", path: ["carnetB", "headline"], value: carnetB.headline },
    { label: "Carnet B texto", path: ["carnetB", "text"], value: carnetB.text, rows: 4 },
    { label: "Carnet moto headline", path: ["carnetMoto", "headline"], value: carnetMoto.headline },
    { label: "Carnet moto texto", path: ["carnetMoto", "text"], value: carnetMoto.text, rows: 4 },
    { label: "Carnet AM texto", path: ["carnetAm", "text"], value: carnetAm.text, rows: 4 },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-navy">Textos</h1>
          <p className="mt-2 text-muted">Edita los textos principales de la web</p>
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-mid disabled:opacity-60"
        >
          {saving ? "Guardando…" : "Guardar textos"}
        </button>
      </div>
      {msg && <p className="mt-3 text-sm text-navy">{msg}</p>}

      <div className="mt-8 grid gap-4">
        {fields.map((field) => (
          <label key={field.path.join(".")} className="block rounded-2xl border border-navy/10 bg-white p-4">
            <span className="text-sm text-muted">{field.label}</span>
            {field.rows ? (
              <textarea
                rows={field.rows}
                value={field.value}
                onChange={(e) => setPath(field.path, e.target.value)}
                className="mt-2 w-full rounded-xl border border-navy/10 bg-fog/50 px-3 py-2"
              />
            ) : (
              <input
                value={field.value}
                onChange={(e) => setPath(field.path, e.target.value)}
                className="mt-2 w-full rounded-xl border border-navy/10 bg-fog/50 px-3 py-2"
              />
            )}
          </label>
        ))}
      </div>
    </div>
  );
}
