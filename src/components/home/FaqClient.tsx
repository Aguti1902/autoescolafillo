"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { PageHero } from "@/components/ui/Sections";
import { LeadForm } from "@/components/forms/LeadForm";

type Faq = { q: string; a: string };

export function FaqClient({
  faqs,
  image,
  address,
  phone,
  email,
}: {
  faqs: Faq[];
  image: string;
  address: string;
  phone: string;
  email: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <PageHero title="Preguntas frecuentes" breadcrumb="Preguntas frecuentes" image={image} />
      <section className="bg-paper py-20">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-navy-mid">FAQ</p>
          <h2 className="mt-3 font-display text-5xl tracking-tight">Preguntas frecuentes</h2>
          <p className="mt-4 text-lg text-muted">
            Estas son algunas de las preguntas más populares de nuestros clientes antes de confiar
            en nosotros. Te pueden quitar algunas de tus dudas.
          </p>
          <div className="mt-10 divide-y divide-navy/10 border-y border-navy/10">
            {faqs.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q}>
                  <button
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="font-display text-xl md:text-2xl">{item.q}</span>
                    <ChevronDown
                      className={`shrink-0 transition ${isOpen ? "rotate-180 text-navy" : ""}`}
                    />
                  </button>
                  {isOpen && <p className="pb-5 leading-relaxed text-muted">{item.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="bg-fog py-20">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 md:grid-cols-2 md:px-8">
          <div>
            <h2 className="font-display text-4xl">Contacta con nosotros</h2>
            <div className="mt-6 space-y-2 text-muted">
              <p>{address}</p>
              <p>{phone}</p>
              <p>{email}</p>
            </div>
          </div>
          <div className="rounded-[2rem] bg-white p-6 md:p-8">
            <LeadForm source="faq" />
          </div>
        </div>
      </section>
    </>
  );
}
