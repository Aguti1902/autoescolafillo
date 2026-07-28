"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const password = new FormData(e.currentTarget).get("password");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (!res.ok) {
      setError("Contraseña incorrecta");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f7fb] px-5">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-3xl border border-navy/10 bg-white p-8 shadow-[0_30px_80px_rgba(0,40,104,0.08)]"
      >
        <div className="relative mb-2 h-12 w-[220px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Autoescola Filló" className="h-full w-full object-contain object-left" />
        </div>
        <p className="mt-2 text-muted">Acceso al panel de administración</p>
        <input
          type="password"
          name="password"
          required
          placeholder="Contraseña"
          className="mt-8 w-full rounded-xl border border-navy/15 bg-fog/50 px-4 py-3 text-ink outline-none focus:border-navy focus:ring-2 focus:ring-navy/20"
        />
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        <button
          disabled={loading}
          className="mt-5 w-full rounded-full bg-navy py-3 font-semibold text-white hover:bg-navy-mid disabled:opacity-60"
        >
          {loading ? "Entrando…" : "Entrar"}
        </button>
        <p className="mt-4 text-xs text-muted">Por defecto: fillo2026 (cámbiala en .env.local)</p>
      </form>
    </div>
  );
}
