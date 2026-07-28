"use client";

import { FormEvent, useState } from "react";

const services = ["Permiso B", "Permiso A1/A2", "Permiso AM"];

export function LeadForm({
  source = "contacto",
  compact = false,
}: {
  source?: string;
  compact?: boolean;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone"),
      service: form.get("service"),
      message: form.get("message"),
      source,
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("ok");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  const field =
    "rounded-2xl border border-navy/10 bg-fog/60 px-4 py-3 outline-none ring-navy focus:ring-2";

  return (
    <form onSubmit={onSubmit} className={`grid gap-4 ${compact ? "" : "md:grid-cols-2"}`}>
      <input required name="name" placeholder="Nombre" className={field} />
      <input required type="email" name="email" placeholder="Email" className={field} />
      <input name="phone" placeholder="Teléfono" className={field} />
      <select name="service" defaultValue="" className={field}>
        <option value="" disabled>
          Selecciona un servicio
        </option>
        {services.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <textarea
        name="message"
        placeholder="Mensaje"
        rows={compact ? 3 : 4}
        className={`${compact ? "" : "md:col-span-2"} ${field}`}
      />
      <label className={`${compact ? "" : "md:col-span-2"} flex items-start gap-2 text-sm text-muted`}>
        <input required type="checkbox" className="mt-1 accent-[#002868]" />
        Acepto los términos y condiciones
      </label>
      <button
        disabled={status === "loading"}
        className={`${compact ? "" : "md:col-span-2"} rounded-full bg-navy px-6 py-3 font-semibold text-white transition hover:bg-navy-mid disabled:opacity-60`}
      >
        {status === "loading" ? "Enviando..." : "ENVIAR"}
      </button>
      {status === "ok" && (
        <p className={`${compact ? "" : "md:col-span-2"} text-sm text-emerald-700`}>
          ¡Mensaje enviado! Te contactaremos pronto.
        </p>
      )}
      {status === "error" && (
        <p className={`${compact ? "" : "md:col-span-2"} text-sm text-red-600`}>
          Ha ocurrido un error. Inténtalo de nuevo o llámanos.
        </p>
      )}
    </form>
  );
}
