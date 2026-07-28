"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

export function AIChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "¡Hola! Soy el asistente de Autoescola Filló. Pregúntame por precios, permisos B/A1-A2/AM, horarios o matrícula.",
    },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function send(e?: FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages([...next, { role: "assistant", content: data.reply || "No he podido responder." }]);
    } catch {
      setMessages([
        ...next,
        {
          role: "assistant",
          content: "Hay un problema de conexión. Llámanos al 97 723 42 31.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-[60]">
      {open && (
        <div className="mb-3 flex h-[min(540px,70vh)] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-white/10 bg-navy-deep shadow-2xl shadow-navy/40">
          <div className="flex items-center justify-between bg-navy px-4 py-3">
            <div>
              <p className="font-display text-lg text-white">Asistente Filló</p>
              <p className="text-xs text-white/50">Consultas al instante</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-full p-1 text-white/70 hover:text-white"
              aria-label="Cerrar chat"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto bg-sky text-navy-deep"
                    : "bg-white/10 text-white/90"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="w-fit rounded-2xl bg-white/10 px-3 py-2 text-sm text-white/60">
                Escribiendo…
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form onSubmit={send} className="flex gap-2 border-t border-white/10 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu consulta…"
              className="flex-1 rounded-full bg-white/10 px-4 py-2 text-sm text-white outline-none placeholder:text-white/35"
            />
            <button
              type="submit"
              className="rounded-full bg-sky p-2.5 text-navy-deep hover:bg-white"
              aria-label="Enviar"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="glow-btn relative flex items-center gap-2 rounded-full bg-navy px-5 py-3 font-semibold text-white shadow-lg shadow-navy/40 transition hover:bg-navy-mid"
      >
        <MessageCircle size={18} />
        Pregunta a la IA
      </button>
    </div>
  );
}
