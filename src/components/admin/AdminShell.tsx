"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  FileText,
  ImageIcon,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Sparkles,
  Tags,
} from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/estadisticas", label: "Estadísticas", icon: BarChart3 },
  { href: "/admin/informes", label: "Informes IA", icon: Sparkles },
  { href: "/admin/leads", label: "Leads", icon: MessageSquare },
  { href: "/admin/tarifas", label: "Tarifas", icon: Tags },
  { href: "/admin/textos", label: "Textos", icon: FileText },
  { href: "/admin/imagenes", label: "Imágenes", icon: ImageIcon },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-ink lg:flex">
      <aside className="z-30 border-b border-navy/10 bg-white lg:sticky lg:top-0 lg:h-screen lg:w-[260px] lg:shrink-0 lg:overflow-y-auto lg:border-b-0 lg:border-r lg:border-navy/10">
        <div className="px-5 py-6">
          <div className="relative h-10 w-[170px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Autoescola Filló" className="h-full w-full object-contain object-left" />
          </div>
          <p className="mt-2 text-xs text-muted">Panel de gestión web</p>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-4 lg:flex-col">
          {links.map((link) => {
            const active = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm whitespace-nowrap transition ${
                  active
                    ? "bg-navy text-white"
                    : "text-navy/65 hover:bg-fog hover:text-navy"
                }`}
              >
                <Icon size={16} />
                {link.label}
              </Link>
            );
          })}
          <button
            onClick={logout}
            className="mt-2 flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-muted hover:bg-fog hover:text-navy"
          >
            <LogOut size={16} />
            Salir
          </button>
        </nav>
      </aside>
      <div className="min-w-0 flex-1 p-5 md:p-8">{children}</div>
    </div>
  );
}
