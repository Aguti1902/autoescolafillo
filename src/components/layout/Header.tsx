"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { VacationBanner } from "@/components/layout/VacationBanner";

const permisoItems = [
  { href: "/permisos", label: "Todos los permisos" },
  { href: "/carnet-de-coche-b", label: "Carnet de coche (B)" },
  { href: "/carnet-de-moto-a1-a2", label: "Carnet de moto (A1/A2)" },
  { href: "/carnet-de-ciclomotor-am", label: "Ciclomotor (AM)" },
];

const links = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/alumnos", label: "Alumnos" },
  { href: "/preguntas-frecuentes", label: "FAQ" },
  { href: "/contacto", label: "Contacto" },
];

export function Header({ phoneDisplay }: { phoneDisplay: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [permisosOpen, setPermisosOpen] = useState(false);
  const [mobilePermisosOpen, setMobilePermisosOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isPermisosActive =
    pathname === "/permisos" ||
    pathname.startsWith("/carnet-de-");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setPermisosOpen(false);
    setMobilePermisosOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setPermisosOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-400 ${
        scrolled || open
          ? "border-b border-navy/10 bg-white/95 shadow-[0_8px_30px_rgba(0,40,104,0.06)] backdrop-blur-xl"
          : "bg-white/80 backdrop-blur-md"
      }`}
    >
      <VacationBanner />
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-3 md:px-8">
        <Link href="/" className="relative block h-10 w-[168px] md:h-12 md:w-[200px]">
          <Image
            src="/logo.png"
            alt="Autoescola Filló"
            fill
            priority
            className="object-contain object-left"
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          <Link
            href="/"
            className={`text-[13px] font-semibold uppercase tracking-[0.18em] transition ${
              pathname === "/" ? "text-navy" : "text-navy/55 hover:text-navy"
            }`}
          >
            Inicio
          </Link>

          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setPermisosOpen(true)}
            onMouseLeave={() => setPermisosOpen(false)}
          >
            <button
              type="button"
              onClick={() => setPermisosOpen((v) => !v)}
              className={`inline-flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.18em] transition ${
                isPermisosActive ? "text-navy" : "text-navy/55 hover:text-navy"
              }`}
              aria-expanded={permisosOpen}
              aria-haspopup="true"
            >
              Permisos
              <ChevronDown
                size={14}
                className={`transition duration-200 ${permisosOpen ? "rotate-180" : ""}`}
              />
            </button>

            <div
              className={`absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-3 transition ${
                permisosOpen
                  ? "pointer-events-auto opacity-100"
                  : "pointer-events-none opacity-0"
              }`}
            >
              <div className="overflow-hidden rounded-2xl border border-navy/10 bg-white py-2 shadow-[0_20px_50px_rgba(0,40,104,0.12)]">
                {permisoItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-5 py-2.5 text-sm transition hover:bg-[#eef4fb] hover:text-navy ${
                      pathname === item.href
                        ? "font-semibold text-navy"
                        : "text-navy/70"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {links
            .filter((l) => l.href !== "/")
            .map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] font-semibold uppercase tracking-[0.18em] transition ${
                  pathname === link.href ? "text-navy" : "text-navy/55 hover:text-navy"
                }`}
              >
                {link.label}
              </Link>
            ))}

          <a
            href={`tel:${phoneDisplay.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy-mid"
          >
            <Phone size={15} />
            {phoneDisplay}
          </a>
        </nav>

        <button
          className="rounded-full border border-navy/20 p-2 text-navy lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menú"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-navy/10 bg-white px-5 py-6 lg:hidden">
          <div className="flex flex-col gap-4">
            <Link href="/" className="font-display text-3xl text-navy">
              Inicio
            </Link>

            <div>
              <button
                type="button"
                onClick={() => setMobilePermisosOpen((v) => !v)}
                className="flex w-full items-center justify-between font-display text-3xl text-navy"
                aria-expanded={mobilePermisosOpen}
              >
                Permisos
                <ChevronDown
                  size={22}
                  className={`transition ${mobilePermisosOpen ? "rotate-180" : ""}`}
                />
              </button>
              {mobilePermisosOpen && (
                <div className="mt-3 flex flex-col gap-2 border-l-2 border-navy/15 pl-4">
                  {permisoItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-lg text-navy/75"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {links
              .filter((l) => l.href !== "/")
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-display text-3xl text-navy"
                >
                  {link.label}
                </Link>
              ))}

            <a
              href={`tel:${phoneDisplay.replace(/\s/g, "")}`}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-navy px-4 py-3 font-semibold text-white"
            >
              <Phone size={16} />
              {phoneDisplay}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
