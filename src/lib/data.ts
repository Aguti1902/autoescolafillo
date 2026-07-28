import { promises as fs } from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");

export type SiteData = {
  site: {
    name: string;
    tagline: string;
    phone: string;
    phoneDisplay: string;
    email: string;
    address: string;
    hours: string;
    yearsExperience: number;
    studentsApproved: number;
    founded: number;
    aulaVirtualUrl: string;
    midgtAndroid: string;
    midgtIos: string;
    dgtResultados: string;
    dgtEstadoCarnet: string;
    facebook: string;
    instagram: string;
    logo: string;
  };
  images: Record<string, string | string[]> & {
    hero: string;
    permisoB: string;
    permisoMoto: string;
    permisoAm: string;
    nosotros: string;
    practica: string;
    equipo: string;
    motoHero: string;
    oficina: string;
    cocheRed: string;
    gallery: string[];
  };
  home: Record<string, string> & {
    pillars: { title: string; text: string }[];
  };
  nosotros: Record<string, string>;
  permisos: {
    eyebrow: string;
    title: string;
    text: string;
    items: {
      id: string;
      title: string;
      description: string;
      cta: string;
      href: string;
      imageKey: string;
    }[];
  };
  tariffs: {
    coche: {
      featured: {
        name: string;
        price: number;
        oldPrice: number | null;
        features: string[];
      };
      packs: {
        id: string;
        name: string;
        price: number | null;
        description: string;
      }[];
    };
    moto: {
      price: number;
      oldPrice: number;
      label: string;
      features: string[];
    };
    am: {
      price: number;
      oldPrice: number;
      label: string;
      features: string[];
    };
  };
  carnetB: Record<string, string>;
  carnetMoto: Record<string, string>;
  carnetAm: Record<string, string>;
  contacto: Record<string, string>;
  faq: { q: string; a: string }[];
  legal: {
    avisoLegal: string;
    privacidad: string;
    cookies: string;
  };
};

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message?: string;
  source: string;
  status: "nuevo" | "contactado" | "matriculado" | "descartado";
  createdAt: string;
};

export type MediaItem = {
  id: string;
  url: string;
  label: string;
  slot?: string;
};

export type StatsData = {
  pageViews: Record<string, number>;
  daily: Record<string, number>;
  chatMessages: number;
  updatedAt: string | null;
};

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(path.join(dataDir, file), "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson<T>(file: string, data: T) {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(path.join(dataDir, file), JSON.stringify(data, null, 2), "utf8");
}

export async function getSiteData(): Promise<SiteData> {
  return readJson<SiteData>("site.json", {} as SiteData);
}

export async function saveSiteData(data: SiteData) {
  await writeJson("site.json", data);
}

export async function getLeads(): Promise<Lead[]> {
  return readJson<Lead[]>("leads.json", []);
}

export async function saveLeads(leads: Lead[]) {
  await writeJson("leads.json", leads);
}

export async function getMedia(): Promise<MediaItem[]> {
  return readJson<MediaItem[]>("media.json", []);
}

export async function saveMedia(media: MediaItem[]) {
  await writeJson("media.json", media);
}

export async function getStats(): Promise<StatsData> {
  return readJson<StatsData>("stats.json", {
    pageViews: {},
    daily: {},
    chatMessages: 0,
    updatedAt: null,
  });
}

export async function saveStats(stats: StatsData) {
  await writeJson("stats.json", stats);
}

export function formatPhone(phone: string) {
  return phone.replace(/\s/g, "");
}
