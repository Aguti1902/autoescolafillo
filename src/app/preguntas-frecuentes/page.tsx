import type { Metadata } from "next";
import { FaqClient } from "@/components/home/FaqClient";
import { getSiteData } from "@/lib/data";

export const metadata: Metadata = { title: "Preguntas frecuentes" };

export default async function FaqPage() {
  const data = await getSiteData();
  return (
    <FaqClient
      faqs={data.faq}
      image={data.images.oficina}
      address={data.site.address}
      phone={data.site.phoneDisplay}
      email={data.site.email}
    />
  );
}
