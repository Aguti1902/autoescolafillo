import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function SectionHeading({
  eyebrow,
  title,
  text,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow && (
        <p className={`text-xs font-semibold uppercase tracking-[0.32em] ${light ? "text-sky" : "text-navy-mid"}`}>
          {eyebrow}
        </p>
      )}
      <h2
        className={`mt-3 font-display text-4xl leading-[1.05] tracking-tight md:text-6xl ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {text && (
        <p className={`mt-5 text-lg leading-relaxed ${light ? "text-white/70" : "text-muted"}`}>
          {text}
        </p>
      )}
    </div>
  );
}

export function CTAButton({
  href,
  children,
  variant = "navy",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "navy" | "ghost" | "light" | "sky";
}) {
  const styles =
    variant === "navy"
      ? "bg-navy text-white hover:bg-navy-mid"
      : variant === "sky"
        ? "bg-sky text-navy-deep hover:bg-white"
        : variant === "light"
          ? "bg-white text-navy hover:bg-fog"
          : "border border-white/35 text-white hover:bg-white/10";

  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${styles}`}
    >
      {children}
      <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}

export function PageHero({
  title,
  breadcrumb,
  image,
}: {
  title: string;
  breadcrumb: string;
  image: string;
}) {
  return (
    <section className="relative isolate min-h-[48vh] overflow-hidden bg-navy-deep">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-navy-deep/90 via-navy/75 to-navy/55" />
      <div className="absolute inset-0 horizon-lines opacity-30" />
      <div className="relative mx-auto flex min-h-[48vh] max-w-[1400px] flex-col justify-end px-5 pb-14 pt-36 md:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky">
          Inicio · {breadcrumb}
        </p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl tracking-tight text-white md:text-7xl">
          {title}
        </h1>
      </div>
    </section>
  );
}

export function LegalContent({ title, body }: { title: string; body: string }) {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16 md:px-8">
      <h1 className="font-display text-4xl tracking-tight text-ink md:text-5xl">{title}</h1>
      <div className="mt-8 space-y-4 whitespace-pre-wrap text-muted leading-relaxed">{body}</div>
    </article>
  );
}
