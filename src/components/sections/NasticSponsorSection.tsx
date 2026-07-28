import Image from "next/image";

export function NasticSponsorSection() {
  return (
    <section className="bg-paper py-14 md:py-20">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="flex flex-col items-center gap-8 border-y border-navy/10 py-10 md:flex-row md:items-center md:gap-14 md:py-14">
          <a
            href="https://gimnasticdetarragona.cat/"
            target="_blank"
            rel="noreferrer"
            className="relative block h-28 w-[200px] shrink-0 sm:h-32 sm:w-[240px] md:h-36 md:w-[280px]"
            aria-label="Club Gimnàstic de Tarragona"
          >
            <Image
              src="/group-1.png"
              alt="Escudo Club Gimnàstic de Tarragona"
              fill
              className="object-contain object-left"
              sizes="(max-width: 768px) 200px, 280px"
              priority
              unoptimized
            />
          </a>

          <div className="text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-navy-mid">
              Compromiso con Tarragona
            </p>
            <h2 className="mt-3 font-display text-3xl tracking-tight text-navy md:text-4xl lg:text-5xl">
              Col·laborador oficial Club Gimnàstic Tarragona
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted md:mx-0">
              Estamos patrocinando a un equipo de fútbol de nuestra ciudad. Orgullo local,
              mismo compromiso.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
