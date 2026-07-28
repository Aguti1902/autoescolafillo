"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AIChat } from "@/components/chat/AIChat";
import { PageTracker } from "@/components/layout/PageTracker";

export function SiteChrome({
  children,
  phoneDisplay,
  address,
  email,
  facebook,
  instagram,
}: {
  children: React.ReactNode;
  phoneDisplay: string;
  address: string;
  email: string;
  facebook: string;
  instagram: string;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const isAlumnos = pathname === "/alumnos";

  if (isAdmin || isAlumnos) {
    return <>{children}</>;
  }

  return (
    <>
      <Header phoneDisplay={phoneDisplay} />
      <main>{children}</main>
      <Footer
        address={address}
        email={email}
        phoneDisplay={phoneDisplay}
        facebook={facebook}
        instagram={instagram}
      />
      <AIChat />
      <PageTracker />
    </>
  );
}
