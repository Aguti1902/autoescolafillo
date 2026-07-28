"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { CTAButton } from "@/components/ui/Sections";
import { LeadForm } from "@/components/forms/LeadForm";
import { ExamReadyWidget, LicensePathWidget } from "@/components/illustrations/AutoScenes";
import { NasticSponsorSection } from "@/components/sections/NasticSponsorSection";
import type { SiteData } from "@/lib/data";
import { ArrowUpRight, ExternalLink } from "lucide-react";

export function HomePage({ data }: { data: SiteData }) {
  const { site, home, images, permisos, tariffs } = data;
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.35]);

  return (
    <>
      {/* HERO — blue cinematic; logo only in white header */}
      <section ref={heroRef} className="relative isolate min-h-[100svh] overflow-hidden bg-navy-deep">
        <motion.div style={{ y }} className="absolute inset-0">
          <Image
            src={images.cocheRed}
            alt="Conducción con Autoescola Filló"
            fill
            priority
            className="object-cover object-[center_30%]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/75 via-navy/55 to-navy-deep" />
        <div className="absolute inset-0 mesh-blue opacity-35 mix-blend-soft-light" />
        <div className="absolute inset-0 horizon-lines opacity-25" />

        <motion.div
          style={{ opacity }}
          className="relative mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-center px-5 pb-16 pt-28 md:px-8 md:pb-20"
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-xs font-semibold uppercase tracking-[0.4em] text-sky"
          >
            Desde {site.founded}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.05 }}
            className="mt-5 max-w-5xl font-display text-5xl leading-[0.95] tracking-tight text-white md:text-7xl lg:text-[6.5rem]"
          >
            Autoescola Filló
            <br />
            <span className="text-sky">TARRAGONA</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.18 }}
            className="mt-7 max-w-xl text-lg text-white/75 md:text-xl"
          >
            {home.heroText}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <CTAButton href="/contacto" variant="sky">
              {home.heroCta}
            </CTAButton>
            <CTAButton href="/permisos" variant="ghost">
              Ver permisos
            </CTAButton>
          </motion.div>
        </motion.div>
      </section>

      {/* RIBBON — not the old 3-pillar cards */}
      <section className="overflow-hidden bg-navy py-5 text-white">
        <div className="animate-drift flex w-max gap-16 whitespace-nowrap px-8 text-sm uppercase tracking-[0.25em] text-white/80">
          {[
            `+${site.yearsExperience} años`,
            `+${site.studentsApproved.toLocaleString("es-ES")} aprobados`,
            "Permiso B",
            "Permiso A1/A2",
            "Permiso AM",
            "Misma profe de principio a fin",
            "Aula virtual",
            "Rambla Nova, Tarragona",
          ]
            .concat([
              `+${site.yearsExperience} años`,
              `+${site.studentsApproved.toLocaleString("es-ES")} aprobados`,
              "Permiso B",
              "Permiso A1/A2",
              "Permiso AM",
            ])
            .map((item, i) => (
              <span key={`${item}-${i}`} className="inline-flex items-center gap-16">
                {item}
                <span className="text-sky">◆</span>
              </span>
            ))}
        </div>
      </section>

      <NasticSponsorSection />

      {/* IMMERSIVE PERMISOS — full-bleed panels, not 3 equal cards */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-navy-mid">
                Tu próximo carnet
              </p>
              <h2 className="mt-3 max-w-2xl font-display text-5xl tracking-tight text-ink md:text-6xl">
                Tres caminos. Una autoescuela.
              </h2>
            </div>
            <p className="max-w-md text-muted">{home.servicesText}</p>
          </div>
        </div>

        <div className="flex flex-col">
          {permisos.items.map((item, i) => {
            const img = images[item.imageKey as keyof typeof images] as string;
            const priceHint =
              item.id === "b"
                ? `desde ${tariffs.coche.packs[0].price}€`
                : item.id === "a"
                  ? `${tariffs.moto.price}€`
                  : `${tariffs.am.price}€`;
            return (
              <Link
                key={item.id}
                href={item.href}
                className="group relative isolate min-h-[70vh] overflow-hidden border-t border-white/10"
              >
                <Image
                  src={img}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-[1.2s] group-hover:scale-[1.04]"
                />
                <div
                  className={`absolute inset-0 ${
                    i % 2 === 0
                      ? "bg-gradient-to-r from-navy-deep via-navy-deep/80 to-transparent"
                      : "bg-gradient-to-l from-navy-deep via-navy-deep/80 to-transparent"
                  }`}
                />
                <div
                  className={`relative mx-auto flex min-h-[70vh] max-w-[1400px] items-end px-5 py-16 md:items-center md:px-8 ${
                    i % 2 === 0 ? "justify-start" : "justify-end"
                  }`}
                >
                  <div className="max-w-lg text-white">
                    <p className="text-xs uppercase tracking-[0.3em] text-sky">{priceHint}</p>
                    <h3 className="mt-3 font-display text-6xl tracking-tight md:text-8xl">{item.title}</h3>
                    <p className="mt-4 text-lg text-white/70">{item.description}</p>
                    <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-sky transition group-hover:gap-3">
                      {item.cta} <ArrowUpRight size={18} />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* LEGACY — cinematic split, not Elementor about clone */}
      <section className="relative overflow-hidden bg-fog py-24 md:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-0 px-5 md:grid-cols-12 md:px-8">
          <div className="md:col-span-5 md:pr-10">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-navy-mid">
              {home.aboutEyebrow}
            </p>
            <h2 className="mt-4 font-display text-5xl tracking-tight text-ink md:text-6xl">
              Desde {site.founded}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">{home.aboutText}</p>
            <p className="mt-6 border-l-4 border-navy pl-5 text-xl italic text-ink/80">
              {home.aboutQuote}
            </p>
            <div className="mt-10">
              <CTAButton href="/nosotros" variant="navy">
                Saber más
              </CTAButton>
            </div>
          </div>
          <div className="relative mt-12 min-h-[480px] md:col-span-7 md:mt-0">
            <div className="absolute inset-0 overflow-hidden rounded-[2rem] md:rounded-[2.5rem]">
              <Image src={images.nosotros} alt="Historia Filló" fill className="object-cover" />
            </div>
            <div className="absolute -bottom-6 left-6 right-6 rounded-3xl bg-navy p-6 text-white shadow-2xl shadow-navy/30 md:left-auto md:right-10 md:w-72">
              <p className="font-display text-5xl text-sky">
                +{site.studentsApproved.toLocaleString("es-ES")}
              </p>
              <p className="mt-1 text-sm text-white/65">Alumnos aprobados</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY FILLÓ — editorial list, not icon boxes */}
      <section className="bg-navy-deep py-24 text-white">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <h2 className="max-w-2xl font-display text-5xl tracking-tight md:text-6xl">
            Por qué confían en nosotros
          </h2>
          <div className="mt-14 divide-y divide-white/10">
            {home.pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="grid gap-4 py-8 md:grid-cols-[120px_1fr_1.4fr] md:items-baseline"
              >
                <span className="font-display text-4xl text-sky">0{i + 1}</span>
                <h3 className="font-display text-3xl">{pillar.title}</h3>
                <p className="text-lg text-white/65">{pillar.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESO */}
      <section className="bg-paper py-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-navy-mid">
                El método Filló
              </p>
              <h2 className="mt-3 font-display text-5xl tracking-tight text-navy md:text-6xl">
                4 pasos hasta tu carnet
              </h2>
              <div className="mt-10 space-y-6">
                {[
                  {
                    t: "Matrícula",
                    d: "Te explicamos packs, plazos y documentación. Empiezas cuando tú quieras.",
                  },
                  {
                    t: "Teórica",
                    d: "Aula virtual + clases presenciales individuales gratuitas para ir seguro al examen.",
                  },
                  {
                    t: "Prácticas",
                    d: "Siempre con el mismo profesor y vehículo. Ritmo personalizado, sin presión inútil.",
                  },
                  {
                    t: "Examen",
                    d: "Cuando estés listo, programamos el práctico. El objetivo: aprobar a la primera.",
                  },
                ].map((step, i) => (
                  <div key={step.t} className="flex gap-5 border-l-2 border-navy/15 pl-5">
                    <span className="font-display text-3xl text-navy">0{i + 1}</span>
                    <div>
                      <h3 className="font-display text-2xl text-navy">{step.t}</h3>
                      <p className="mt-1 text-muted">{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative min-h-[420px] overflow-hidden rounded-[2rem]">
              <Image
                src={images.permisoB}
                alt="Prácticas de coche en Tarragona"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PROCESO INTERACTIVO + FOTOS */}
      <section className="bg-fog py-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-navy-mid">
            Experiencia Filló
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-5xl tracking-tight text-navy">
            Tu proceso, paso a paso
          </h2>
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <LicensePathWidget />
            <ExamReadyWidget />
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {[
              { src: images.permisoB, alt: "Permiso B coche", label: "Permiso B · coche" },
              { src: images.permisoMoto, alt: "Permiso A1/A2", label: "Permiso A1/A2 · moto" },
              { src: images.permisoAm, alt: "Permiso AM ciclomotor", label: "Permiso AM · ciclomotor" },
            ].map((item) => (
              <figure
                key={item.label}
                className="group relative min-h-[260px] overflow-hidden rounded-[2rem]"
              >
                <Image
                  src={item.src as string}
                  alt={item.alt}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-deep/90 to-transparent px-5 pb-4 pt-12 text-sm text-white">
                  {item.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="relative overflow-hidden bg-navy py-24 text-white">
        <div className="absolute inset-0 mesh-blue opacity-40" />
        <div className="relative mx-auto max-w-[1400px] px-5 md:px-8">
          <p className="text-xs uppercase tracking-[0.3em] text-sky">Alumnos Filló</p>
          <h2 className="mt-3 max-w-3xl font-display text-5xl tracking-tight md:text-6xl">
            El momento de aprobar empieza aquí
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                q: "Mismo profesor de principio a fin. Se nota en la confianza el día del examen.",
                a: "Alumna permiso B",
              },
              {
                q: "Con la moto fui directo: sin esperas y con un profe que de verdad entiende las dos ruedas.",
                a: "Alumno A2",
              },
              {
                q: "Me saqué el AM en poco tiempo y adaptaron los horarios al instituto.",
                a: "Alumno AM",
              },
            ].map((item) => (
              <blockquote
                key={item.a}
                className="rounded-[1.5rem] border border-white/15 bg-white/8 p-6 backdrop-blur"
              >
                <p className="text-lg leading-relaxed text-white/90">“{item.q}”</p>
                <footer className="mt-5 text-sm uppercase tracking-[0.2em] text-sky">{item.a}</footer>
              </blockquote>
            ))}
          </div>
          <div className="mt-10">
            <CTAButton href="/preguntas-frecuentes" variant="sky">
              Ver preguntas frecuentes
            </CTAButton>
          </div>
        </div>
      </section>

      {/* TOOLS — single utility band */}
      <section className="bg-paper py-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <div className="rounded-[2rem] bg-navy p-8 text-white md:p-14">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-sky">{home.toolsEyebrow}</p>
                <h2 className="mt-3 font-display text-4xl md:text-5xl">{home.toolsTitle}</h2>
                <p className="mt-4 text-white/70">{home.toolsText}</p>
                <p className="mt-4 font-medium text-sky">{home.midgtText}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={site.midgtAndroid}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-navy"
                  >
                    Android
                  </a>
                  <a
                    href={site.midgtIos}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold"
                  >
                    iOS
                  </a>
                </div>
              </div>
              <div className="grid gap-3">
                {[
                  {
                    title: "Resultados DGT",
                    text: "Consulta exámenes teóricos y prácticos",
                    href: site.dgtResultados,
                  },
                  {
                    title: "Estado del carnet",
                    text: "Consulta el estado de tu permiso",
                    href: site.dgtEstadoCarnet,
                  },
                  {
                    title: "Aula virtual",
                    text: home.aulaText,
                    href: site.aulaVirtualUrl,
                  },
                ].map((tool) => (
                  <a
                    key={tool.title}
                    href={tool.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between gap-4 rounded-2xl bg-white/8 px-5 py-4 transition hover:bg-white/14"
                  >
                    <div>
                      <p className="font-display text-2xl">{tool.title}</p>
                      <p className="mt-1 line-clamp-2 text-sm text-white/55">{tool.text}</p>
                    </div>
                    <ExternalLink className="shrink-0 text-sky" size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="bg-fog py-24">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-navy-mid">
              {home.contactEyebrow}
            </p>
            <h2 className="mt-3 font-display text-5xl tracking-tight text-ink">
              {home.contactTitle}
            </h2>
            <p className="mt-5 text-lg text-muted">{home.contactText}</p>
            <div className="mt-10 space-y-4 text-ink/80">
              <p className="text-xl font-medium">{site.address}</p>
              <p>
                <a href={`tel:${site.phone}`} className="text-2xl font-display text-navy hover:text-navy-mid">
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
          <div className="rounded-[2rem] bg-white p-6 shadow-[0_30px_80px_rgba(0,40,104,0.08)] md:p-8">
            <LeadForm source="home" />
          </div>
        </div>
      </section>
    </>
  );
}
