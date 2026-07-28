import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h2.5l.5-3H14V9z" />
    </svg>
  );
}

export function Footer({
  address,
  email,
  phoneDisplay,
  facebook,
  instagram,
}: {
  address: string;
  email: string;
  phoneDisplay: string;
  facebook: string;
  instagram: string;
}) {
  return (
    <footer className="relative overflow-hidden bg-navy-deep text-white">
      <div className="pointer-events-none absolute inset-0 horizon-lines" />
      <div className="relative mx-auto grid max-w-[1400px] gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div>
          <p className="font-display text-3xl tracking-tight">
            Autoescola <span className="text-sky">Filló</span>
          </p>
          <p className="mt-5 max-w-md text-white/65">
            Formación vial en Tarragona desde 1963. Tres generaciones. Un mismo
            compromiso: que conduzcas con seguridad.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={instagram}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 p-2.5 hover:bg-white/10"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
            <a
              href={facebook}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 p-2.5 hover:bg-white/10"
              aria-label="Facebook"
            >
              <FacebookIcon />
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-sky">Explorar</p>
          <div className="mt-4 flex flex-col gap-2 text-white/75">
            <Link href="/">Inicio</Link>
            <Link href="/permisos">Permisos</Link>
            <Link href="/carnet-de-coche-b">Carnet de coche</Link>
            <Link href="/carnet-de-moto-a1-a2">Carnet de moto</Link>
            <Link href="/carnet-de-ciclomotor-am">Ciclomotor AM</Link>
            <Link href="/alumnos">Alumnos · Aula virtual</Link>
            <a href="https://gimnasticdetarragona.cat/" target="_blank" rel="noreferrer">
              Col·laborador oficial Nàstic
            </a>
            <Link href="/nosotros">Nosotros</Link>
            <Link href="/contacto">Contacto</Link>
            <Link href="/preguntas-frecuentes">Preguntas frecuentes</Link>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-sky">Legal</p>
          <div className="mt-4 flex flex-col gap-2 text-white/75">
            <Link href="/politica-de-privacidad">Política de privacidad</Link>
            <Link href="/aviso-legal">Aviso legal</Link>
            <Link href="/politica-de-cookies">Política de cookies</Link>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-5 py-6 text-sm text-white/55 md:flex-row md:items-center md:justify-between md:px-8">
          <div className="flex flex-col gap-2 md:flex-row md:gap-6">
            <span className="inline-flex items-center gap-2">
              <MapPin size={14} /> {address}
            </span>
            <a className="inline-flex items-center gap-2 hover:text-white" href={`mailto:${email}`}>
              <Mail size={14} /> {email}
            </a>
            <a
              className="inline-flex items-center gap-2 hover:text-white"
              href={`tel:${phoneDisplay.replace(/\s/g, "")}`}
            >
              <Phone size={14} /> {phoneDisplay}
            </a>
          </div>
          <p>© {new Date().getFullYear()} Autoescola Filló. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
