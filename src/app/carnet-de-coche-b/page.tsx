import type { Metadata } from "next";
import { PermisoDetailPage } from "@/components/permisos/PermisoDetailPage";
import { getSiteData } from "@/lib/data";

export const metadata: Metadata = { title: "Carnet de coche (B)" };

export default async function CarnetBPage() {
  const { carnetB, tariffs, images, site } = await getSiteData();
  const { featured, packs } = tariffs.coche;

  return (
    <PermisoDetailPage
      title={carnetB.title}
      breadcrumb="Carnet de coche (B)"
      heroImage={images.permisoB}
      eyebrow="Permiso B"
      headline={carnetB.headline}
      paragraphs={[carnetB.text, carnetB.ageNote, carnetB.method]}
      price={featured.price}
      priceLabel={featured.name}
      badge="Pack destacado"
      features={featured.features}
      sideImage={images.permisoB}
      sideCaption="Prácticas de coche en Tarragona"
      steps={[
        {
          title: "Matrícula y teórica",
          text: "Te damos de alta, accedes al aula virtual y empiezas la teórica a tu ritmo. Con 17 años ya puedes examinarte de teoría.",
        },
        {
          title: "Clases prácticas",
          text: "Siempre con el mismo profesor y el mismo vehículo. Evolucionas con continuidad, sin cambiar de método cada semana.",
        },
        {
          title: "Examen y carnet",
          text: "Cuando estés preparado, programamos el práctico. Nuestro objetivo: que apruebes a la primera.",
        },
      ]}
      includes={[
        "Matrícula y tramitación del expediente",
        "Derechos de examen teórico y práctico",
        "Acceso al aula virtual con tests DGT",
        "Clases teóricas presenciales personalizadas (gratuitas)",
        "Seguimiento continuo con el mismo profesor",
        "Planes de pago flexibles",
        "Asesoramiento sobre horarios y exámenes",
        "Formación enfocada a aprobar a la primera",
      ]}
      extras={[
        {
          title: "Sin esperas eternas",
          text: "Cuando estás listo, priorizamos tu fecha de examen para no alargar el proceso.",
        },
        {
          title: "Método Filló",
          text: "Más de 60 años formando conductores en Tarragona con trato familiar y profesional.",
        },
        {
          title: "Te acompañamos",
          text: "Resolvemos dudas de teórica, práctica, tasas y documentación en cada paso.",
        },
      ]}
      packs={packs}
      phone={site.phone}
      phoneDisplay={site.phoneDisplay}
      email={site.email}
      address={site.address}
      hours={site.hours}
    />
  );
}
