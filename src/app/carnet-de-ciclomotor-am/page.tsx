import type { Metadata } from "next";
import { PermisoDetailPage } from "@/components/permisos/PermisoDetailPage";
import { getSiteData } from "@/lib/data";

export const metadata: Metadata = { title: "Carnet de ciclomotor (AM)" };

export default async function CarnetAmPage() {
  const { carnetAm, tariffs, images, site } = await getSiteData();
  const t = tariffs.am;

  return (
    <PermisoDetailPage
      title={carnetAm.title}
      breadcrumb="Carnet de ciclomotor (AM)"
      heroImage={images.permisoAm}
      eyebrow="Permiso AM"
      headline="Tu primera libertad sobre dos ruedas"
      paragraphs={[carnetAm.text, carnetAm.age, carnetAm.exam]}
      price={t.price}
      oldPrice={t.oldPrice}
      priceLabel={t.label}
      badge="Oferta actual"
      features={t.features}
      sideImage={images.permisoAm}
      sideCaption="Ciclomotor AM desde los 15 años"
      steps={[
        {
          title: "Teórico específico AM",
          text: "Es el carnet más rápido: teórico específico enfocado y sin rodeos.",
        },
        {
          title: "Práctica en circuito",
          text: "Simulación de examen práctico en circuito cerrado para llegar seguro al día D.",
        },
        {
          title: "Horarios flexibles",
          text: "Nos adaptamos a tus horarios de instituto o trabajo para que no se te complique.",
        },
      ]}
      includes={[
        "Para mayores de 15 años",
        "Ciclomotores de 2 y 3 ruedas hasta 50cc",
        "Cuadriciclos ligeros",
        "Examen teórico específico",
        "Examen práctico en circuito cerrado",
        "Simulación de examen práctico",
        "Adaptación a tus horarios",
        "El carnet más rápido de obtener",
      ]}
      extras={[
        {
          title: "El más rápido",
          text: "Menos fases, más foco: ideal para empezar a moverte con independencia.",
        },
        {
          title: "Base sólida",
          text: "Aunque sea el primer carnet, te formamos con hábitos seguros desde el día uno.",
        },
        {
          title: "Paso siguiente",
          text: "Cuando quieras subir a A1/A2 o B, ya conoces la casa y el método Filló.",
        },
      ]}
      phone={site.phone}
      phoneDisplay={site.phoneDisplay}
      email={site.email}
      address={site.address}
      hours={site.hours}
    />
  );
}
