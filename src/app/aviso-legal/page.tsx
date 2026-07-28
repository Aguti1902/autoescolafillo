import type { Metadata } from "next";
import { LegalContent, PageHero } from "@/components/ui/Sections";
import { getSiteData } from "@/lib/data";

export const metadata: Metadata = { title: "Aviso Legal" };

export default async function AvisoLegalPage() {
  const { legal, images } = await getSiteData();
  return (
    <>
      <PageHero title="Aviso Legal" breadcrumb="Aviso legal" image={images.oficina} />
      <LegalContent title="Aviso Legal" body={legal.avisoLegal} />
    </>
  );
}
