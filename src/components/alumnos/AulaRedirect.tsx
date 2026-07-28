"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function AulaRedirect({ url }: { url: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const duration = 2200;

    const tick = window.setInterval(() => {
      const elapsed = Date.now() - start;
      const next = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(next);
      if (next >= 100) window.clearInterval(tick);
    }, 40);

    const redirect = window.setTimeout(() => {
      window.location.href = url;
    }, duration);

    return () => {
      window.clearInterval(tick);
      window.clearTimeout(redirect);
    };
  }, [url]);

  return (
    <div className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-navy-deep px-6 text-center text-white">
      <div className="absolute inset-0 mesh-blue opacity-40" />
      <div className="absolute inset-0 horizon-lines opacity-30" />

      <div className="relative flex flex-col items-center">
        <div className="relative mb-8 h-16 w-[240px] animate-pulse md:h-20 md:w-[300px]">
          <Image
            src="/logo.png"
            alt="Autoescola Filló"
            fill
            priority
            className="object-contain brightness-0 invert"
          />
        </div>

        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky">
          Alumnos
        </p>
        <h1 className="mt-4 max-w-md font-display text-3xl tracking-tight md:text-4xl">
          Redirigiendo a tu aula virtual…
        </h1>
        <p className="mt-3 max-w-sm text-sm text-white/60">
          Te estamos llevando a tuautoescuela.es para que entres a estudiar.
        </p>

        <div className="mt-10 h-1.5 w-56 overflow-hidden rounded-full bg-white/15 md:w-72">
          <div
            className="h-full rounded-full bg-sky transition-[width] duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <a
          href={url}
          className="mt-8 text-sm text-sky/90 underline-offset-4 hover:underline"
        >
          Si no redirige, haz clic aquí
        </a>
      </div>
    </div>
  );
}
