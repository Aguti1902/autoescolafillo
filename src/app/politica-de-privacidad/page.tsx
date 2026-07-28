import type { Metadata } from "next";
import { LegalContent, PageHero } from "@/components/ui/Sections";
import { getSiteData } from "@/lib/data";

export const metadata: Metadata = { title: "Política de Privacidad" };

export default async function PrivacidadPage() {
  const { legal, images } = await getSiteData();
  return (
    <>
      <PageHero title="Política de Privacidad" breadcrumb="Política de privacidad" image={images.oficina} />
      <LegalContent title="Política de Privacidad" body={legal.privacidad} />
    </>
  );
}
