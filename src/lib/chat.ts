import { getSiteData } from "./data";

type Msg = { role: "user" | "assistant"; content: string };

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

export async function answerWithKnowledge(message: string): Promise<string> {
  const site = await getSiteData();
  const q = normalize(message);

  const scored = site.faq
    .map((item) => {
      const hay = normalize(`${item.q} ${item.a}`);
      const words = q.split(/\s+/).filter((w) => w.length > 3);
      const score = words.reduce((acc, w) => (hay.includes(w) ? acc + 1 : acc), 0);
      return { item, score };
    })
    .sort((a, b) => b.score - a.score);

  if (q.includes("precio") || q.includes("tarifa") || q.includes("cuesta") || q.includes("pack")) {
    const { tariffs } = site;
    return `Estas son nuestras tarifas actuales:\n\n• Carnet de coche (B): packs desde ${tariffs.coche.packs[0].price}€. Pack destacado ${tariffs.coche.featured.price}€ con 20 prácticas.\n• Carnet de moto (A1/A2): ${tariffs.moto.price}€ (antes ${tariffs.moto.oldPrice}€).\n• Carnet de ciclomotor (AM): ${tariffs.am.price}€ (antes ${tariffs.am.oldPrice}€).\n\nPara un presupuesto personalizado llámanos al ${site.site.phoneDisplay} o escríbenos a ${site.site.email}.`;
  }

  if (q.includes("horario") || q.includes("abre") || q.includes("abierto")) {
    return `Nuestro horario de atención es: ${site.site.hours}. Estamos en ${site.site.address}.`;
  }

  if (q.includes("direccion") || q.includes("ubicacion") || q.includes("donde") || q.includes("localiz")) {
    return `Nos encontrarás en ${site.site.address}. Teléfono: ${site.site.phoneDisplay}.`;
  }

  if (q.includes("telefono") || q.includes("llamar") || q.includes("contacto")) {
    return `Puedes llamarnos al ${site.site.phoneDisplay} o escribir a ${site.site.email}. También puedes dejarnos un mensaje en la página de contacto.`;
  }

  if (q.includes("moto") || q.includes("a1") || q.includes("a2")) {
    return `${site.carnetMoto.headline} ${site.carnetMoto.text}\n\nPrecio actual: ${site.tariffs.moto.price}€. Ventajas: ${site.tariffs.moto.features.join(", ")}.`;
  }

  if (q.includes("ciclomotor") || q.includes(" am") || q.startsWith("am") || q.includes("50cc")) {
    return `${site.carnetAm.text}\n\n${site.carnetAm.age}\n\nPrecio: ${site.tariffs.am.price}€.`;
  }

  if (q.includes("coche") || q.includes("permiso b") || q.includes("carnet b")) {
    return `${site.carnetB.headline} ${site.carnetB.text}\n\nPack destacado: ${site.tariffs.coche.featured.price}€ (${site.tariffs.coche.featured.features.join(", ")}).`;
  }

  if (scored[0]?.score > 0) {
    return scored[0].item.a;
  }

  return `Gracias por tu consulta. Soy el asistente de Autoescola Filló (desde ${site.site.founded} en Tarragona).\n\nPuedo ayudarte con precios, permisos B / A1-A2 / AM, horarios, requisitos y matrícula.\n\nSi prefieres hablar con el equipo: ${site.site.phoneDisplay} · ${site.site.email} · ${site.site.address}.`;
}

export async function answerChat(messages: Msg[]): Promise<string> {
  const last = messages.filter((m) => m.role === "user").at(-1)?.content || "";
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return answerWithKnowledge(last);
  }

  try {
    const site = await getSiteData();
    const system = `Eres el asistente oficial de Autoescola Filló (Tarragona, desde ${site.site.founded}). Responde siempre en español, de forma clara, cercana y breve. Usa solo información real de la autoescuela. Datos clave: dirección ${site.site.address}, teléfono ${site.site.phoneDisplay}, email ${site.site.email}, horario ${site.site.hours}. Tarifas: coche packs desde ${site.tariffs.coche.packs[0].price}€ (pack 20 prácticas ${site.tariffs.coche.featured.price}€), moto ${site.tariffs.moto.price}€, AM ${site.tariffs.am.price}€. Si no sabes algo, invita a contactar. FAQ: ${JSON.stringify(site.faq)}`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.4,
        messages: [{ role: "system", content: system }, ...messages.slice(-8)],
      }),
    });

    if (!res.ok) return answerWithKnowledge(last);
    const data = await res.json();
    return data.choices?.[0]?.message?.content || (await answerWithKnowledge(last));
  } catch {
    return answerWithKnowledge(last);
  }
}
