import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/Sections";
import { NasticSponsorSection } from "@/components/sections/NasticSponsorSection";
import { LeadForm } from "@/components/forms/LeadForm";
import { getSiteData } from "@/lib/data";

export const metadata: Metadata = { title: "Nosotros" };

export default async function NosotrosPage() {
  const { nosotros, images, site, home } = await getSiteData();

  return (
    <>
      <PageHero title="Nosotros" breadcrumb="Nosotros" image={images.nosotros} />
      <section className="bg-paper py-20">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-navy-mid">
              {nosotros.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-5xl tracking-tight md:text-6xl">
              {nosotros.title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">{nosotros.intro}</p>
            <p className="mt-5 text-muted">{nosotros.family}</p>
            <blockquote className="mt-10 border-l-4 border-navy pl-5 text-2xl italic text-ink/80">
              «{nosotros.quote}»
            </blockquote>
          </div>
          <div className="relative min-h-[460px] overflow-hidden rounded-[2rem]">
            <Image src={images.equipo} alt="Equipo Filló" fill className="object-cover" />
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-navy/90 p-5 text-white backdrop-blur">
              <p className="font-display text-4xl text-sky">
                +{site.studentsApproved.toLocaleString("es-ES")}
              </p>
              <p className="text-sm text-white/65">Alumnos aprobados</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-fog py-20">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 md:grid-cols-2 md:px-8">
          <article className="rounded-[2rem] bg-white p-8">
            <h2 className="font-display text-4xl">{nosotros.teoriaTitle}</h2>
            <p className="mt-4 leading-relaxed text-muted">{nosotros.teoriaText}</p>
          </article>
          <article className="rounded-[2rem] bg-white p-8">
            <h2 className="font-display text-4xl">{nosotros.practicaTitle}</h2>
            <p className="mt-4 leading-relaxed text-muted">{nosotros.practicaText}</p>
          </article>
        </div>
      </section>

      <section className="bg-navy-deep py-20 text-white">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {home.pillars.map((p, i) => (
              <div key={p.title} className="border-t border-sky/50 pt-6">
                <p className="font-display text-3xl text-sky">0{i + 1}</p>
                <h3 className="mt-3 font-display text-2xl">{p.title}</h3>
                <p className="mt-2 text-white/65">{p.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 max-w-3xl">
            <h2 className="font-display text-5xl">{nosotros.closingTitle}</h2>
            <p className="mt-4 text-lg text-white/70">{nosotros.closingText}</p>
          </div>
        </div>
      </section>

      <NasticSponsorSection />

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-navy-mid">
              {home.contactEyebrow}
            </p>
            <h2 className="mt-3 font-display text-5xl tracking-tight text-navy">
              {home.contactTitle}
            </h2>
            <p className="mt-5 text-lg text-muted">{home.contactText}</p>
            <div className="mt-8 space-y-3 text-ink/80">
              <p className="text-xl font-medium">{site.address}</p>
              <p>
                <a href={`tel:${site.phone}`} className="font-display text-2xl text-navy hover:text-navy-mid">
                  {site.phoneDisplay}
                </a>
              </p>
              <p>
                <a href={`mailto:${site.email}`} className="hover:text-navy">
                  {site.email}
                </a>
              </p>
              <p className="pt-2 text-sm text-muted">{site.hours}</p>
            </div>
          </div>
          <div className="rounded-[2rem] border border-navy/10 bg-fog/40 p-6 md:p-8">
            <LeadForm source="nosotros" />
          </div>
        </div>
      </section>
    </>
  );
}
