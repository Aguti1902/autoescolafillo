"use client";

import { FormEvent, useState } from "react";
import ReactMarkdown from "react-markdown";
import { CheckCircle2, FileBarChart2, Lightbulb, Sparkles } from "lucide-react";

const presets = [
  "Hazme un informe general del rendimiento de la web",
  "Analiza los leads y dame recomendaciones comerciales",
  "Informe de tráfico y páginas más visitadas",
  "Cruza tarifas con la demanda de leads",
  "¿Qué debería priorizar esta semana?",
];

export default function InformesAdminPage() {
  const [question, setQuestion] = useState(presets[0]);
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generate(e?: FormEvent) {
    e?.preventDefault();
    setLoading(true);
    setError("");
    setReport("");
    try {
      const res = await fetch("/api/admin/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error");
      setReport(data.report);
    } catch {
      setError("No se pudo generar el informe. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-navy-mid">
            <Sparkles size={14} /> Inteligencia artificial
          </p>
          <h1 className="mt-2 font-display text-4xl text-navy">Informes IA</h1>
          <p className="mt-2 max-w-2xl text-muted">
            Pregunta lo que quieras sobre leads, visitas, chat, tarifas o rendimiento. La IA
            analiza los datos del panel y te devuelve un informe accionable.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {presets.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setQuestion(p)}
            className={`rounded-full border px-4 py-2 text-left text-sm transition ${
              question === p
                ? "border-navy bg-navy text-white"
                : "border-navy/15 bg-white text-navy/80 hover:border-navy/30"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <form onSubmit={generate} className="mt-6 rounded-2xl border border-navy/10 bg-white p-5 shadow-sm">
        <label className="text-sm font-medium text-navy">Tu solicitud de informe</label>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={3}
          className="mt-2 w-full rounded-xl border border-navy/15 bg-fog/40 px-4 py-3 outline-none focus:border-navy focus:ring-2 focus:ring-navy/15"
          placeholder="Ej: Resume los leads de esta semana y dime qué permiso interesa más"
        />
        <button
          disabled={loading || !question.trim()}
          className="mt-4 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white hover:bg-navy-mid disabled:opacity-60"
        >
          {loading ? "Generando informe…" : "Generar informe"}
        </button>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </form>

      {loading && (
        <div className="mt-6 rounded-2xl border border-dashed border-navy/20 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-navy/20 border-t-navy" />
          <p className="mt-4 font-medium text-navy">Analizando datos del panel…</p>
          <p className="mt-1 text-sm text-muted">Esto solo tarda unos segundos</p>
        </div>
      )}

      {report && !loading && (
        <article className="mt-6 overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-[0_20px_60px_rgba(0,40,104,0.06)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-navy/10 bg-gradient-to-r from-navy to-navy-mid px-6 py-5 text-white">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                <FileBarChart2 size={20} />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky/90">Informe generado</p>
                <h2 className="font-display text-2xl">Resultado del análisis</h2>
              </div>
            </div>
            <p className="text-xs text-white/60">
              {new Date().toLocaleString("es-ES")}
            </p>
          </div>

          <div className="report-content px-6 py-7 md:px-8 md:py-8">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="mb-4 font-display text-3xl tracking-tight text-navy">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="mb-3 mt-8 flex items-center gap-2 border-b border-navy/10 pb-2 font-display text-2xl text-navy first:mt-0">
                    <CheckCircle2 size={18} className="text-navy-mid" />
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="mb-2 mt-6 flex items-center gap-2 font-display text-xl text-navy">
                    <Lightbulb size={16} className="text-navy-mid" />
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="mb-3 text-[15px] leading-relaxed text-ink/80">{children}</p>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-navy">{children}</strong>
                ),
                ul: ({ children }) => (
                  <ul className="mb-5 list-none space-y-2.5 border-l-2 border-navy/15 pl-4">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="mb-5 list-decimal space-y-2.5 pl-5 marker:font-semibold marker:text-navy">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-[15px] leading-relaxed text-ink/80">{children}</li>
                ),
              }}
            >
              {report}
            </ReactMarkdown>
          </div>
        </article>
      )}
    </div>
  );
}
