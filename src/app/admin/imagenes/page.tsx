"use client";

import { FormEvent, useEffect, useState } from "react";

type MediaItem = { id: string; url: string; label: string; slot?: string };

const slots = [
  { value: "", label: "Sin asignar (galería)" },
  { value: "hero", label: "Hero inicio" },
  { value: "permisoB", label: "Permiso B" },
  { value: "permisoMoto", label: "Permiso moto" },
  { value: "permisoAm", label: "Permiso AM" },
  { value: "nosotros", label: "Nosotros" },
  { value: "practica", label: "Práctica" },
  { value: "equipo", label: "Equipo" },
  { value: "motoHero", label: "Hero moto" },
  { value: "oficina", label: "Oficina / contacto" },
  { value: "cocheRed", label: "Coche rojo" },
];

export default function ImagenesAdminPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [msg, setMsg] = useState("");
  const [uploading, setUploading] = useState(false);

  async function load() {
    const res = await fetch("/api/media");
    if (res.ok) setMedia(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function onUpload(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUploading(true);
    setMsg("");
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/media", { method: "POST", body: form });
    setUploading(false);
    if (!res.ok) {
      setMsg("Error al subir la imagen");
      return;
    }
    setMsg("Imagen subida correctamente");
    e.currentTarget.reset();
    load();
  }

  async function assignSlot(id: string, url: string, slot: string) {
    await fetch("/api/media", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, url, slot }),
    });
    setMsg(`Asignada a ${slot || "galería"}`);
    load();
  }

  async function remove(id: string) {
    if (!confirm("¿Eliminar esta imagen del listado?")) return;
    await fetch(`/api/media?id=${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <h1 className="font-display text-4xl text-navy">Imágenes</h1>
      <p className="mt-2 text-muted">Sube fotos y asígnalas a secciones de la web</p>

      <form
        onSubmit={onUpload}
        className="mt-8 grid gap-3 rounded-2xl border border-navy/10 bg-white p-5 md:grid-cols-4"
      >
        <input
          required
          type="file"
          name="file"
          accept="image/*"
          className="md:col-span-2 rounded-xl border border-navy/10 bg-fog/50 px-3 py-2 file:mr-3 file:rounded-lg file:border-0 file:bg-navy-mid file:px-3 file:py-1 file:text-white"
        />
        <input
          name="label"
          placeholder="Nombre / etiqueta"
          className="rounded-xl border border-navy/10 bg-fog/50 px-3 py-2"
        />
        <select name="slot" className="rounded-xl border border-navy/10 bg-fog/50 px-3 py-2">
          {slots.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <button
          disabled={uploading}
          className="rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-mid disabled:opacity-60 md:col-span-4 md:w-fit"
        >
          {uploading ? "Subiendo…" : "Subir imagen"}
        </button>
      </form>
      {msg && <p className="mt-3 text-sm text-navy">{msg}</p>}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {media.map((item) => (
          <article key={item.id} className="overflow-hidden rounded-2xl border border-navy/10 bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.url} alt={item.label} className="aspect-video w-full object-cover" />
            <div className="space-y-3 p-4">
              <p className="font-medium">{item.label}</p>
              <p className="text-xs text-muted">{item.url}</p>
              <select
                value={item.slot || ""}
                onChange={(e) => assignSlot(item.id, item.url, e.target.value)}
                className="w-full rounded-xl border border-navy/10 bg-fog/50 px-3 py-2 text-sm"
              >
                {slots.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
              <button onClick={() => remove(item.id)} className="text-sm text-navy">
                Eliminar
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
