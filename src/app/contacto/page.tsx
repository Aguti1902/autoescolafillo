import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/ui/Sections";
import { LeadForm } from "@/components/forms/LeadForm";
import { getSiteData } from "@/lib/data";

export const metadata: Metadata = { title: "Contacto" };

export default async function ContactoPage() {
  const { contacto, site, images } = await getSiteData();

  return (
    <>
      <PageHero title="Contacto" breadcrumb="Contacto" image={images.oficina} />
      <section className="bg-paper py-20">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-navy-mid">
            {contacto.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-5xl tracking-tight md:text-6xl">
            {contacto.title}
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-muted">{contacto.text}</p>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              { icon: MapPin, label: "Ubicación", value: site.address },
              { icon: Phone, label: "Llámanos", value: `+34 ${site.phoneDisplay}` },
              { icon: Mail, label: "Escríbenos", value: site.email },
            ].map((item) => (
              <div key={item.label} className="rounded-[1.5rem] bg-fog p-6">
                <item.icon className="text-navy" />
                <h3 className="mt-4 font-display text-2xl">{item.label}</h3>
                <p className="mt-2 text-muted">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-fog py-20">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 md:grid-cols-2 md:px-8">
          <div>
            <h2 className="font-display text-4xl text-navy">{contacto.visitTitle}</h2>
            <p className="mt-4 text-muted">{contacto.visitText}</p>
            <p className="mt-6 font-medium text-ink">Horarios de Atención: {site.hours}</p>

            <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-navy/10 bg-white shadow-[0_20px_60px_rgba(0,40,104,0.08)]">
              <iframe
                title="Ubicación Autoescola Filló en Google Maps"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(site.address)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                className="h-[320px] w-full border-0 md:h-[380px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white hover:bg-navy-mid"
            >
              Cómo llegar
            </a>
          </div>
          <div className="rounded-[2rem] bg-white p-6 md:p-8">
            <h2 className="font-display text-3xl">{contacto.formTitle}</h2>
            <p className="mt-2 mb-6 text-muted">{contacto.formText}</p>
            <LeadForm source="contacto" />
          </div>
        </div>
      </section>
    </>
  );
}
