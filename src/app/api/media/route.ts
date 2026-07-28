import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { getMedia, getSiteData, saveMedia, saveSiteData } from "@/lib/data";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  return NextResponse.json(await getMedia());
}

export async function POST(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file") as File | null;
  const label = String(form.get("label") || "Imagen");
  const slot = String(form.get("slot") || "");

  if (!file) {
    return NextResponse.json({ error: "Falta archivo" }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const ext = path.extname(file.name) || ".jpg";
  const filename = `${Date.now()}-${randomUUID().slice(0, 8)}${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(path.join(uploadDir, filename), bytes);

  const url = `/uploads/${filename}`;
  const media = await getMedia();
  const item = { id: randomUUID(), url, label, slot: slot || undefined };
  media.unshift(item);
  await saveMedia(media);

  if (slot) {
    const site = await getSiteData();
    (site.images as Record<string, string | string[]>)[slot] = url;
    await saveSiteData(site);
  }

  return NextResponse.json(item);
}

export async function PATCH(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const body = await req.json();
  const media = await getMedia();
  const idx = media.findIndex((m) => m.id === body.id);
  if (idx < 0) return NextResponse.json({ error: "No encontrado" }, { status: 404 });

  media[idx] = { ...media[idx], ...body };
  await saveMedia(media);

  if (body.slot && body.url) {
    const site = await getSiteData();
    (site.images as Record<string, string | string[]>)[body.slot] = body.url;
    await saveSiteData(site);
  }

  return NextResponse.json(media[idx]);
}

export async function DELETE(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const media = await getMedia();
  await saveMedia(media.filter((m) => m.id !== id));
  return NextResponse.json({ ok: true });
}
