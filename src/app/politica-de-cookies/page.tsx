import type { Metadata } from "next";
import { LegalContent, PageHero } from "@/components/ui/Sections";
import { getSiteData } from "@/lib/data";

export const metadata: Metadata = { title: "Política de Cookies" };

export default async function CookiesPage() {
  const { legal, images } = await getSiteData();
  return (
    <>
      <PageHero title="Política de Cookies" breadcrumb="Política de cookies" image={images.oficina} />
      <LegalContent title="Política de Cookies" body={legal.cookies} />
    </>
  );
}
