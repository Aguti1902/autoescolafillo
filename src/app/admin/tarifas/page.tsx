"use client";

import { useEffect, useState } from "react";

type Tariffs = {
  coche: {
    featured: { name: string; price: number; features: string[] };
    packs: { id: string; name: string; price: number | null; description: string }[];
  };
  moto: { price: number; oldPrice: number; label: string; features: string[] };
  am: { price: number; oldPrice: number; label: string; features: string[] };
};

export default function TarifasAdminPage() {
  const [tariffs, setTariffs] = useState<Tariffs | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/tariffs")
      .then((r) => r.json())
      .then(setTariffs);
  }, []);

  async function save() {
    if (!tariffs) return;
    setSaving(true);
    const res = await fetch("/api/tariffs", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tariffs),
    });
    setSaving(false);
    setMsg(res.ok ? "Tarifas actualizadas. Ya se ven en la web." : "Error al guardar");
  }

  if (!tariffs) return <p className="text-muted">Cargando tarifas…</p>;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-navy">Tarifas</h1>
          <p className="mt-2 text-muted">Sube o baja precios; se reflejan al instante en la web</p>
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-mid disabled:opacity-60"
        >
          {saving ? "Guardando…" : "Guardar cambios"}
        </button>
      </div>
      {msg && <p className="mt-3 text-sm text-navy">{msg}</p>}

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-navy/10 bg-white p-5">
          <h2 className="font-display text-2xl text-navy">Coche (B)</h2>
          <label className="mt-4 block text-sm text-muted">Pack destacado (€)</label>
          <input
            type="number"
            value={tariffs.coche.featured.price}
            onChange={(e) =>
              setTariffs({
                ...tariffs,
                coche: {
                  ...tariffs.coche,
                  featured: { ...tariffs.coche.featured, price: Number(e.target.value) },
                },
              })
            }
            className="mt-1 w-full rounded-xl border border-navy/10 bg-fog/50 px-3 py-2"
          />
          {tariffs.coche.packs.map((pack, i) => (
            <div key={pack.id} className="mt-4">
              <label className="text-sm text-muted">{pack.name} precio</label>
              <input
                type="number"
                value={pack.price ?? ""}
                placeholder="Consultar"
                onChange={(e) => {
                  const packs = [...tariffs.coche.packs];
                  packs[i] = {
                    ...pack,
                    price: e.target.value === "" ? null : Number(e.target.value),
                    name: e.target.value ? `Pack ${e.target.value}€` : "Consultar",
                  };
                  setTariffs({ ...tariffs, coche: { ...tariffs.coche, packs } });
                }}
                className="mt-1 w-full rounded-xl border border-navy/10 bg-fog/50 px-3 py-2"
              />
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-navy/10 bg-white p-5">
          <h2 className="font-display text-2xl text-navy">Moto A1/A2</h2>
          <label className="mt-4 block text-sm text-muted">Precio actual (€)</label>
          <input
            type="number"
            value={tariffs.moto.price}
            onChange={(e) =>
              setTariffs({ ...tariffs, moto: { ...tariffs.moto, price: Number(e.target.value) } })
            }
            className="mt-1 w-full rounded-xl border border-navy/10 bg-fog/50 px-3 py-2"
          />
          <label className="mt-4 block text-sm text-muted">Precio anterior (€)</label>
          <input
            type="number"
            value={tariffs.moto.oldPrice}
            onChange={(e) =>
              setTariffs({
                ...tariffs,
                moto: { ...tariffs.moto, oldPrice: Number(e.target.value) },
              })
            }
            className="mt-1 w-full rounded-xl border border-navy/10 bg-fog/50 px-3 py-2"
          />
        </div>

        <div className="rounded-2xl border border-navy/10 bg-white p-5">
          <h2 className="font-display text-2xl text-navy">Ciclomotor AM</h2>
          <label className="mt-4 block text-sm text-muted">Precio actual (€)</label>
          <input
            type="number"
            value={tariffs.am.price}
            onChange={(e) =>
              setTariffs({ ...tariffs, am: { ...tariffs.am, price: Number(e.target.value) } })
            }
            className="mt-1 w-full rounded-xl border border-navy/10 bg-fog/50 px-3 py-2"
          />
          <label className="mt-4 block text-sm text-muted">Precio anterior (€)</label>
          <input
            type="number"
            value={tariffs.am.oldPrice}
            onChange={(e) =>
              setTariffs({ ...tariffs, am: { ...tariffs.am, oldPrice: Number(e.target.value) } })
            }
            className="mt-1 w-full rounded-xl border border-navy/10 bg-fog/50 px-3 py-2"
          />
        </div>
      </div>
    </div>
  );
}
