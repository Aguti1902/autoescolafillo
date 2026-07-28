import type { Metadata } from "next";
import { PermisoDetailPage } from "@/components/permisos/PermisoDetailPage";
import { getSiteData } from "@/lib/data";

export const metadata: Metadata = { title: "Carnet de moto (A1/A2)" };

export default async function CarnetMotoPage() {
  const { carnetMoto, tariffs, images, site } = await getSiteData();
  const t = tariffs.moto;

  return (
    <PermisoDetailPage
      title={carnetMoto.title}
      breadcrumb="Carnet de moto (A1/A2)"
      heroImage={images.permisoMoto}
      eyebrow="Permiso A1 / A2"
      headline={carnetMoto.headline}
      paragraphs={[carnetMoto.text, carnetMoto.carlos]}
      price={t.price}
      oldPrice={t.oldPrice}
      priceLabel={t.label}
      badge="Oferta actual"
      features={t.features}
      sideImage={images.permisoMoto}
      sideCaption="Formación de moto A1 / A2"
      steps={[
        {
          title: "Teórica ágil",
          text: "Preparas el teórico de forma fácil y rápida, con apoyo del aula virtual y nuestras clases.",
        },
        {
          title: "Circuito y circulación",
          text: "Practicas maniobras y circulación con un profesor apasionado de las motos.",
        },
        {
          title: "Examen programado",
          text: "Te organizamos prácticas y exámenes para que no pierdas tiempo entre fases.",
        },
      ]}
      includes={[
        "Programación de prácticas y exámenes",
        "Teórico de manera fácil y rápida",
        "Sin esperas innecesarias entre fases",
        "Profesor especialista en moto (Carlos Filló)",
        "Formación en circuito y circulación",
        "Consejos de seguridad y equipo",
        "Trato personalizado A1 y A2",
        "Seguimiento cercano hasta el examen",
      ]}
      extras={[
        {
          title: "Pasión real",
          text: "Carlos Filló empezó en Motocross a los 10 años y pasó al Enduro. Aprendes de alguien que vive las motos.",
        },
        {
          title: "A1 o A2",
          text: "Te orientamos según edad, experiencia y el tipo de moto que quieres conducir.",
        },
        {
          title: "Seguridad primero",
          text: "Técnica, anticipación y control: la adrenalina, con cabeza.",
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
