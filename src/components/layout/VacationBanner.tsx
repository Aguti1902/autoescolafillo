"use client";

import { useEffect, useState } from "react";
import { Sun, X } from "lucide-react";

const STORAGE_KEY = "fillo-vacaciones-2026-dismissed";
const VACATION_END = new Date("2026-08-20T23:59:59");

export function VacationBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (new Date() > VACATION_END) return;
    if (window.localStorage.getItem(STORAGE_KEY) === "1") return;
    setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div className="relative bg-sky px-4 py-2.5 text-navy-deep md:px-6">
      <div className="mx-auto flex max-w-[1400px] items-center justify-center gap-3 pr-8 text-center md:gap-4">
        <Sun size={18} className="hidden shrink-0 sm:block" aria-hidden />
        <p className="text-[13px] font-semibold leading-snug md:text-sm">
          Del <span className="underline decoration-navy-deep/30 underline-offset-2">29 de julio</span> al{" "}
          <span className="underline decoration-navy-deep/30 underline-offset-2">20 de agosto</span> estaremos
          de vacaciones. ¡Felices vacaciones!
        </p>
      </div>
      <button
        type="button"
        onClick={() => {
          window.localStorage.setItem(STORAGE_KEY, "1");
          setVisible(false);
        }}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-navy-deep/70 transition hover:bg-navy-deep/10 hover:text-navy-deep"
        aria-label="Cerrar aviso de vacaciones"
      >
        <X size={16} />
      </button>
    </div>
  );
}
