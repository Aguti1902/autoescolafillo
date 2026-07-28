import { getLeads, getSiteData, getStats } from "./data";

export async function buildAdminDataContext() {
  const [site, leads, stats] = await Promise.all([getSiteData(), getLeads(), getStats()]);
  const totalViews = Object.values(stats.pageViews).reduce((a, b) => a + b, 0);
  const byStatus = {
    nuevo: leads.filter((l) => l.status === "nuevo").length,
    contactado: leads.filter((l) => l.status === "contactado").length,
    matriculado: leads.filter((l) => l.status === "matriculado").length,
    descartado: leads.filter((l) => l.status === "descartado").length,
  };
  const byService: Record<string, number> = {};
  for (const l of leads) {
    const key = l.service || "Sin servicio";
    byService[key] = (byService[key] || 0) + 1;
  }
  const last7 = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const key = d.toISOString().slice(0, 10);
    return { date: key, views: stats.daily[key] || 0 };
  });
  const topPages = Object.entries(stats.pageViews)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  return {
    empresa: site.site.name,
    direccion: site.site.address,
    telefono: site.site.phoneDisplay,
    tarifas: {
      cocheDestacado: site.tariffs.coche.featured.price,
      cochePacks: site.tariffs.coche.packs.map((p) => ({
        nombre: p.name,
        precio: p.price,
        descripcion: p.description,
      })),
      moto: { precio: site.tariffs.moto.price, anterior: site.tariffs.moto.oldPrice },
      am: { precio: site.tariffs.am.price, anterior: site.tariffs.am.oldPrice },
    },
    metricas: {
      visitasTotales: totalViews,
      mensajesChat: stats.chatMessages || 0,
      leadsTotales: leads.length,
      leadsPorEstado: byStatus,
      leadsPorServicio: byService,
      visitasUltimos7Dias: last7,
      paginasMasVistas: topPages,
    },
    leadsRecientes: leads.slice(0, 20).map((l) => ({
      nombre: l.name,
      email: l.email,
      telefono: l.phone,
      servicio: l.service,
      estado: l.status,
      origen: l.source,
      fecha: l.createdAt,
      mensaje: l.message,
    })),
  };
}

function localReport(question: string, ctx: Awaited<ReturnType<typeof buildAdminDataContext>>) {
  const q = question.toLowerCase();
  const { metricas, tarifas, leadsRecientes } = ctx;

  if (q.includes("lead") || q.includes("consulta") || q.includes("comercial")) {
    return `## Informe de leads

- **Total leads:** ${metricas.leadsTotales}
- **Nuevos:** ${metricas.leadsPorEstado.nuevo}
- **Contactados:** ${metricas.leadsPorEstado.contactado}
- **Matriculados:** ${metricas.leadsPorEstado.matriculado}
- **Descartados:** ${metricas.leadsPorEstado.descartado}

### Por servicio
${Object.entries(metricas.leadsPorServicio)
  .map(([k, v]) => `- ${k}: ${v}`)
  .join("\n") || "- Sin datos todavía"}

### Últimos leads
${leadsRecientes
  .slice(0, 8)
  .map((l) => `- ${l.nombre} · ${l.servicio || "Sin servicio"} · ${l.estado} · ${new Date(l.fecha).toLocaleDateString("es-ES")}`)
  .join("\n") || "- No hay leads registrados"}

### Recomendación
Prioriza contactar los leads en estado **nuevo** en las próximas 24–48 h. Si un servicio concentra más consultas, refuerza esa página y su CTA.`;
  }

  if (q.includes("visita") || q.includes("trafico") || q.includes("tráfico") || q.includes("pagina") || q.includes("página")) {
    const week = metricas.visitasUltimos7Dias.reduce((a, b) => a + b.views, 0);
    return `## Informe de tráfico web

- **Visitas totales:** ${metricas.visitasTotales}
- **Últimos 7 días:** ${week}
- **Mensajes al chat IA:** ${metricas.mensajesChat}

### Páginas más vistas
${metricas.paginasMasVistas.map(([p, n]) => `- ${p}: ${n}`).join("\n") || "- Sin datos todavía"}

### Visitas diarias (7 días)
${metricas.visitasUltimos7Dias.map((d) => `- ${d.date}: ${d.views}`).join("\n")}

### Recomendación
Refuerza SEO/contenido en las páginas con más visitas y revisa las que casi no tienen tráfico para mejorar enlaces internos.`;
  }

  if (q.includes("tarifa") || q.includes("precio") || q.includes("pack")) {
    return `## Informe de tarifas

- **Pack coche destacado:** ${tarifas.cocheDestacado}€
- **Packs coche:** ${tarifas.cochePacks.map((p) => `${p.nombre} (${p.precio ?? "consultar"}€)`).join(", ")}
- **Moto A1/A2:** ${tarifas.moto.precio}€ (antes ${tarifas.moto.anterior}€)
- **Ciclomotor AM:** ${tarifas.am.precio}€ (antes ${tarifas.am.anterior}€)

### Cruce con demanda
${Object.entries(metricas.leadsPorServicio)
  .map(([k, v]) => `- ${k}: ${v} leads`)
  .join("\n") || "- Aún no hay leads para cruzar demanda"}

### Recomendación
Si moto/AM concentran leads, mantén la oferta visible en home. Si el pack de coche destaca en consultas, úsalo como ancla en campañas.`;
  }

  return `## Informe general Autoescola Filló

### Resumen ejecutivo
- Visitas totales: **${metricas.visitasTotales}**
- Leads totales: **${metricas.leadsTotales}** (nuevos: ${metricas.leadsPorEstado.nuevo})
- Chat IA: **${metricas.mensajesChat}** mensajes
- Conversión aproximada leads/visitas: **${
    metricas.visitasTotales
      ? ((metricas.leadsTotales / metricas.visitasTotales) * 100).toFixed(1)
      : "0.0"
  }%**

### Tarifas vigentes
- Coche destacado: ${tarifas.cocheDestacado}€
- Moto: ${tarifas.moto.precio}€
- AM: ${tarifas.am.precio}€

### Leads por estado
- Nuevo: ${metricas.leadsPorEstado.nuevo}
- Contactado: ${metricas.leadsPorEstado.contactado}
- Matriculado: ${metricas.leadsPorEstado.matriculado}
- Descartado: ${metricas.leadsPorEstado.descartado}

### Acciones sugeridas
1. Contactar leads nuevos pendientes.
2. Revisar páginas top y reforzar CTAs.
3. Pedir un informe específico: “leads”, “tráfico” o “tarifas”.`;
}

export async function generateAdminReport(question: string): Promise<string> {
  const ctx = await buildAdminDataContext();
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return localReport(question, ctx);
  }

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.3,
        messages: [
          {
            role: "system",
            content:
              "Eres el analista de negocio del panel admin de Autoescola Filló (Tarragona). Responde siempre en español, en formato informe Markdown claro, con hallazgos, números y recomendaciones accionables. Usa solo los datos proporcionados. No inventes cifras.",
          },
          {
            role: "user",
            content: `Datos actuales del panel:\n${JSON.stringify(ctx, null, 2)}\n\nSolicitud del administrador:\n${question}`,
          },
        ],
      }),
    });
    if (!res.ok) return localReport(question, ctx);
    const data = await res.json();
    return data.choices?.[0]?.message?.content || localReport(question, ctx);
  } catch {
    return localReport(question, ctx);
  }
}
