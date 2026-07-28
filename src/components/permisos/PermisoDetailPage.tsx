import Link from "next/link";
import Image from "next/image";
import { Check, Phone, Sparkles } from "lucide-react";
import { PageHero } from "@/components/ui/Sections";
import { ExamReadyWidget } from "@/components/illustrations/AutoScenes";
import { LeadForm } from "@/components/forms/LeadForm";

type Pack = {
  id: string;
  name: string;
  price: number | null;
  description: string;
};

type Props = {
  title: string;
  breadcrumb: string;
  heroImage: string;
  eyebrow: string;
  headline: string;
  paragraphs: string[];
  price: number;
  oldPrice?: number | null;
  priceLabel: string;
  badge: string;
  features: string[];
  sideImage: string;
  sideCaption: string;
  steps: { title: string; text: string }[];
  includes: string[];
  extras?: { title: string; text: string }[];
  packs?: Pack[];
  phone: string;
  phoneDisplay: string;
  email: string;
  address: string;
  hours: string;
};

export function PermisoDetailPage(props: Props) {
  const {
    title,
    breadcrumb,
    heroImage,
    eyebrow,
    headline,
    paragraphs,
    price,
    oldPrice,
    priceLabel,
    badge,
    features,
    sideImage,
    sideCaption,
    steps,
    includes,
    extras = [],
    packs,
    phone,
    phoneDisplay,
    email,
    address,
    hours,
  } = props;

  return (
    <>
      <PageHero title={title} breadcrumb={breadcrumb} image={heroImage} />

      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto grid max-w-[1400px] items-stretch gap-8 px-5 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-navy-mid">{eyebrow}</p>
            <h2 className="mt-4 font-display text-4xl leading-tight tracking-tight text-navy md:text-5xl">
              {headline}
            </h2>
            {paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="mt-5 text-lg leading-relaxed text-muted">
                {p}
              </p>
            ))}
          </div>

          <div className="relative overflow-hidden rounded-[2rem] bg-navy text-white shadow-[0_40px_100px_rgba(0,40,104,0.25)]">
            <div className="absolute inset-0 opacity-25">
              <Image src={heroImage} alt="" fill className="object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-navy/75 via-navy/95 to-navy" />
            <div className="relative flex h-full flex-col p-8 md:p-10">
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-sky/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-sky">
                <Sparkles size={14} /> {badge}
              </div>
              <p className="mt-6 text-sm text-white/65">{priceLabel}</p>
              {oldPrice ? (
                <p className="mt-3 text-xl text-white/40 line-through">ANTES {oldPrice}€</p>
              ) : null}
              <p className="font-display text-7xl leading-none text-sky md:text-8xl">
                {price}
                <span className="text-5xl">€</span>
              </p>
              <ul className="mt-8 space-y-4 border-t border-white/15 pt-8">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky text-navy">
                      <Check size={14} strokeWidth={3} />
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-10">
                <Link
                  href="/contacto"
                  className="flex w-full items-center justify-center rounded-full bg-sky py-4 text-sm font-bold uppercase tracking-[0.15em] text-navy-deep hover:bg-white"
                >
                  Me interesa
                </Link>
                <a
                  href={`tel:${phone}`}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-white/25 py-3 text-sm font-semibold text-white/80 hover:bg-white/10"
                >
                  <Phone size={15} /> {phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-fog py-20">
        <div className="mx-auto grid max-w-[1400px] gap-8 px-5 lg:grid-cols-2 lg:px-8">
          <figure className="relative min-h-[360px] overflow-hidden rounded-[2rem] md:min-h-[440px]">
            <Image src={sideImage} alt={sideCaption} fill className="object-cover" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-deep/85 to-transparent px-5 pb-4 pt-12 text-sm text-white">
              {sideCaption}
            </figcaption>
          </figure>
          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-navy-mid">
              Cómo funciona
            </p>
            <h2 className="mt-3 font-display text-4xl text-navy md:text-5xl">
              Del primer día al carnet
            </h2>
            <div className="mt-8 space-y-5">
              {steps.map((step, i) => (
                <div key={step.title} className="flex gap-4 border-l-2 border-navy/15 pl-5">
                  <span className="font-display text-2xl text-navy">0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-xl text-navy">{step.title}</h3>
                    <p className="mt-1 text-muted">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-20">
        <div className="mx-auto grid max-w-[1400px] gap-8 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-navy-mid">Incluye</p>
            <h2 className="mt-3 font-display text-4xl text-navy md:text-5xl">
              Todo lo que necesitas saber
            </h2>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {includes.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-navy/10 bg-white p-5"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy text-white">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <p className="text-ink/80">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <ExamReadyWidget />
        </div>
      </section>

      {extras.length > 0 && (
        <section className="bg-navy-deep py-20 text-white">
          <div className="mx-auto grid max-w-[1400px] gap-8 px-5 md:grid-cols-3 md:px-8">
            {extras.map((extra, i) => (
              <div key={extra.title} className="border-t border-sky/40 pt-6">
                <p className="font-display text-3xl text-sky">0{i + 1}</p>
                <h3 className="mt-3 font-display text-2xl">{extra.title}</h3>
                <p className="mt-2 text-white/65">{extra.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {packs && packs.length > 0 && (
        <section className="bg-fog py-20 md:py-28">
          <div className="mx-auto max-w-[1400px] px-5 md:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-navy-mid">Packs</p>
            <h2 className="mt-3 font-display text-5xl tracking-tight text-navy">Elige tu ritmo</h2>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {packs.map((pack, i) => (
                <article
                  key={pack.id}
                  className={`relative flex flex-col overflow-hidden rounded-[1.75rem] p-7 ${
                    i === 1
                      ? "bg-navy text-white shadow-[0_30px_80px_rgba(0,40,104,0.2)]"
                      : "border border-navy/10 bg-white"
                  }`}
                >
                  {i === 1 && (
                    <span className="mb-4 w-fit rounded-full bg-sky/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-sky">
                      Popular
                    </span>
                  )}
                  <h3 className="font-display text-4xl">
                    {pack.price ? (
                      <>
                        {pack.price}
                        <span className="text-2xl">€</span>
                      </>
                    ) : (
                      pack.name
                    )}
                  </h3>
                  <p className={`mt-3 flex-1 ${i === 1 ? "text-white/65" : "text-muted"}`}>
                    {pack.description}
                  </p>
                  <Link
                    href="/contacto"
                    className={`mt-8 inline-flex items-center justify-center rounded-full py-3 text-sm font-semibold transition ${
                      i === 1
                        ? "bg-sky text-navy-deep hover:bg-white"
                        : "bg-navy text-white hover:bg-navy-mid"
                    }`}
                  >
                    Me interesa
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-navy-mid">Contacto</p>
            <h2 className="mt-3 font-display text-4xl text-navy">¿Listo para empezar?</h2>
            <p className="mt-4 text-muted">
              Escríbenos y te orientamos sin compromiso sobre el mejor pack para ti.
            </p>
            <div className="mt-8 space-y-2 text-ink/80">
              <p>{address}</p>
              <p className="font-display text-2xl text-navy">{phoneDisplay}</p>
              <p>{email}</p>
              <p className="text-sm text-muted">{hours}</p>
            </div>
          </div>
          <div className="rounded-[2rem] border border-navy/10 bg-fog/40 p-6 md:p-8">
            <LeadForm source={`permiso-${eyebrow}`} />
          </div>
        </div>
      </section>
    </>
  );
}
