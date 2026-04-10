/**
 * Home page — Geko Marketing
 * La construcción real empieza en Fase 2.
 * De momento: placeholder que verifica que el setup funciona.
 */
export default function HomePage() {
  return (
    <main id="main-content" className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: "var(--bg)" }}>
      <div className="text-center space-y-4">
        <p className="text-5xl font-heading font-bold text-gradient-brand">
          Geko Marketing
        </p>
        <p className="font-ui" style={{ color: "var(--fg-secondary)" }}>
          Setup base completado ✦ Fase 1 en curso
        </p>
        <a href="/playground-geko"
          className="inline-block mt-4 px-4 py-2 rounded-lg text-sm font-ui glass"
          style={{ color: "var(--fg)" }}>
          Ver playground →
        </a>
      </div>
    </main>
  )
}
