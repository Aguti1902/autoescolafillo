"use client";

import { useEffect, useState } from "react";

/** Widget: progreso hacia el carnet */
export function LicensePathWidget({ className = "" }: { className?: string }) {
  const steps = ["Matrícula", "Teórica", "Prácticas", "Examen"];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % (steps.length + 1));
    }, 900);
    return () => window.clearInterval(id);
  }, [steps.length]);

  return (
    <div
      className={`rounded-[2rem] border border-navy/10 bg-white p-6 shadow-[0_20px_60px_rgba(0,40,104,0.06)] md:p-8 ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-navy-mid">Tu camino</p>
          <h3 className="mt-1 font-display text-3xl text-navy">Progreso al carnet</h3>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          · En vivo
        </span>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        {steps.map((step, i) => {
          const done = i < active;
          return (
            <div
              key={step}
              className={`rounded-2xl border p-4 transition duration-500 ${
                done ? "border-navy/25 bg-white" : "border-navy/10 bg-[#f5f8fc]"
              }`}
            >
              <p className="font-display text-2xl text-navy">0{i + 1}</p>
              <p className="mt-1 text-sm text-muted">{step}</p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-navy/10">
                <div
                  className="h-full rounded-full bg-navy transition-all duration-700"
                  style={{ width: done ? "100%" : `${(i + 1) * 18}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          { label: "Años formando", value: "+60" },
          { label: "Permisos", value: "B · A · AM" },
          { label: "Trato", value: "Personal" },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl bg-navy px-4 py-4 text-white">
            <p className="text-xs uppercase tracking-[0.18em] text-sky/80">{item.label}</p>
            <p className="mt-1 font-display text-2xl">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Checklist examen: se marca solo, uno a uno */
export function ExamReadyWidget({ className = "" }: { className?: string }) {
  const items = [
    "Teórica al día",
    "Prácticas consolidadas",
    "Maniobras listas",
    "Fecha de examen",
  ];
  const [checked, setChecked] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setChecked((prev) => {
        if (prev >= items.length) return 0;
        return prev + 1;
      });
    }, 850);
    return () => window.clearInterval(id);
  }, [items.length]);

  const lightPhase = checked === 0 ? 0 : checked < items.length ? 1 : 2;

  return (
    <div
      className={`rounded-[2rem] border border-navy/10 bg-white p-6 shadow-[0_20px_60px_rgba(0,40,104,0.06)] ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-navy-mid">Checklist</p>
          <h3 className="mt-1 font-display text-3xl text-navy">¿Listo para el examen?</h3>
        </div>
        <div className="flex flex-col gap-1.5 rounded-2xl bg-[#eef4fb] p-3">
          <span
            className={`h-3 w-3 rounded-full bg-[#ff5a5a] transition duration-500 ${
              lightPhase === 0 ? "opacity-100 scale-110" : "opacity-35"
            }`}
          />
          <span
            className={`h-3 w-3 rounded-full bg-[#f0b429] transition duration-500 ${
              lightPhase === 1 ? "opacity-100 scale-110" : "opacity-35"
            }`}
          />
          <span
            className={`h-3 w-3 rounded-full bg-[#3ddc97] transition duration-500 ${
              lightPhase === 2
                ? "opacity-100 scale-110 shadow-[0_0_12px_rgba(61,220,151,0.7)]"
                : "opacity-35"
            }`}
          />
        </div>
      </div>
      <ul className="mt-6 space-y-3">
        {items.map((item, i) => {
          const done = i < checked;
          return (
            <li
              key={item}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition duration-500 ${
                done ? "border-emerald-200 bg-emerald-50/60" : "border-navy/10"
              }`}
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full border-2 text-xs transition duration-500 ${
                  done
                    ? "border-emerald-500 bg-emerald-500 text-white"
                    : "border-navy/20 text-transparent"
                }`}
              >
                ✓
              </span>
              <span
                className={`text-sm font-medium transition ${
                  done ? "text-ink" : "text-ink/80"
                }`}
              >
                {item}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
