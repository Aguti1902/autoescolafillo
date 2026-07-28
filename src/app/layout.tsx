import type { Metadata } from "next";
import { Syne, Manrope } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { getSiteData } from "@/lib/data";

const display = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    default: "Autoescola Filló | Autoescuela en Tarragona desde 1963",
    template: "%s | Autoescola Filló",
  },
  description:
    "Autoescuela familiar en Tarragona desde 1963. Permisos B, A1/A2 y AM. Formación personalizada, tarifas asequibles y chat de consultas.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getSiteData();

  return (
    <html lang="es" className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full antialiased">
        <SiteChrome
          phoneDisplay={data.site.phoneDisplay}
          address={data.site.address}
          email={data.site.email}
          facebook={data.site.facebook}
          instagram={data.site.instagram}
        >
          {children}
        </SiteChrome>
      </body>
    </html>
  );
}
