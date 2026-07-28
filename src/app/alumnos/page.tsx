import type { Metadata } from "next";
import { AulaRedirect } from "@/components/alumnos/AulaRedirect";
import { getSiteData } from "@/lib/data";

export const metadata: Metadata = {
  title: "Alumnos · Aula virtual",
  description: "Accede al aula virtual de Autoescola Filló",
  robots: { index: false, follow: false },
};

export default async function AlumnosPage() {
  const { site } = await getSiteData();
  const url = site.aulaVirtualUrl || "https://www.tuautoescuela.es/aula-virtual";

  return <AulaRedirect url={url} />;
}
