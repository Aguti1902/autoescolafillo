import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/ui/Sections";
import { LeadForm } from "@/components/forms/LeadForm";
import { getSiteData } from "@/lib/data";

export const metadata: Metadata = { title: "Permisos" };

export default async function PermisosPage() {
  const data = await getSiteData();
  const { permisos, images, home, site, tariffs } = data;

  const meta: Record<string, { price: string; points: string[]; image: string }> = {
    b: {
      price: `desde ${tariffs.coche.packs[0].price}€`,
      points: ["Packs desde 5 prácticas", "Mismo profesor y vehículo", "Teórica desde los 17 años"],
      image: images.permisoB as string,
    },
    a: {
      price: `${tariffs.moto.price}€`,
      points: ["Sin esperas", "Teórico ágil", "Profesor especialista en moto"],
      image: images.permisoMoto as string,
    },
    am: {
      price: `${tariffs.am.price}€`,
      points: ["Desde 15 años", "El más rápido", "Circuito cerrado"],
      image: images.permisoAm as string,
    },
  };

  return (
    <>
      <PageHero title="Permisos" breadcrumb="Permisos" image={images.permisoB} />

      <section className="bg-paper py-20">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-navy-mid">
            {permisos.eyebrow}
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-5xl tracking-tight text-ink md:text-6xl">
            {permisos.title}
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-muted">{permisos.text}</p>

          <div className="mt-14 grid gap-8">
            {permisos.items.map((item, i) => {
              const info = meta[item.id];
              return (
                <article
                  key={item.id}
                  className={`grid overflow-hidden rounded-[2rem] border border-navy/10 bg-white lg:grid-cols-[1.1fr_0.9fr] ${
                    i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative min-h-[320px]">
                    <Image
                      src={info.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-8 md:p-12">
                    <p className="text-xs uppercase tracking-[0.28em] text-navy-mid">{info.price}</p>
                    <h3 className="mt-3 font-display text-4xl md:text-5xl">{item.title}</h3>
                    <p className="mt-4 text-muted">{item.description}</p>
                    <ul className="mt-6 space-y-2">
                      {info.points.map((p) => (
                        <li key={p} className="text-sm font-medium text-navy/80">
                          → {p}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={item.href}
                      className="mt-8 inline-flex items-center gap-2 font-semibold text-navy"
                    >
                      {item.cta} <ArrowUpRight size={18} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-navy py-20 text-white">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 md:grid-cols-2 md:items-center md:px-8">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-sky">¿No sabes cuál elegir?</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Te orientamos en 5 minutos</h2>
            <p className="mt-4 text-white/70">
              Cuéntanos tu edad, disponibilidad y si quieres coche o moto. Te recomendamos el
              permiso y el pack más sensato para ti.
            </p>
            <Link
              href="/contacto"
              className="mt-8 inline-flex rounded-full bg-sky px-6 py-3 text-sm font-semibold text-navy-deep"
            >
              Pedir orientación
            </Link>
          </div>
          <div className="relative min-h-[280px] overflow-hidden rounded-[2rem]">
            <Image src={images.oficina} alt="Oficina Autoescola Filló" fill className="object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-fog py-20">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 md:grid-cols-2 md:px-8">
          <div>
            <h2 className="font-display text-4xl">{home.contactTitle}</h2>
            <p className="mt-4 text-muted">{home.contactText}</p>
            <div className="mt-6 space-y-2 text-ink/75">
              <p>{site.address}</p>
              <p>{site.phoneDisplay}</p>
              <p>{site.email}</p>
            </div>
          </div>
          <div className="rounded-[2rem] bg-white p-6 md:p-8">
            <LeadForm source="permisos" />
          </div>
        </div>
      </section>
    </>
  );
}
