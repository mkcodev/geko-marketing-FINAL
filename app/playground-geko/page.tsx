/**
 * /playground-geko — Página temporal para probar efectos y animaciones
 * Esta página se elimina antes de producción.
 * URL: localhost:3000/playground-geko
 */
export default function PlaygroundPage() {
  return (
    <main className="min-h-screen p-8" style={{ background: "var(--bg)", color: "var(--fg)" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 pb-8 border-b" style={{ borderColor: "var(--border)" }}>
          <span className="text-xs font-mono px-3 py-1 rounded-full mb-4 inline-block"
            style={{ background: "rgba(107,45,124,0.2)", color: "#8B3D9C" }}>
            🧪 Playground temporal — eliminar antes de producción
          </span>
          <h1 className="text-5xl font-heading font-bold mt-4">
            Geko Design Playground
          </h1>
          <p className="mt-2" style={{ color: "var(--fg-secondary)" }}>
            Aquí probamos efectos antes de implementarlos. Con badge{" "}
            <span className="px-2 py-0.5 rounded text-xs font-mono"
              style={{ background: "rgba(29,78,216,0.2)", color: "#3B82F6" }}>
              ELEGIR
            </span>{" "}
            los que requieren tu aprobación.
          </p>
        </div>

        {/* Sección: Texto con gradiente */}
        <section className="mb-16">
          <h2 className="text-sm font-mono mb-6 uppercase tracking-widest"
            style={{ color: "var(--fg-muted)" }}>
            01 — Gradient Text
          </h2>
          <div className="space-y-4">
            <p className="text-6xl font-heading font-bold text-gradient-brand">
              Transformamos seguidores
            </p>
            <p className="text-6xl font-heading font-bold text-gradient-brand"
              style={{ animationDelay: "0.5s" }}>
              en clientes reales.
            </p>
          </div>
        </section>

        {/* Sección: Glass cards */}
        <section className="mb-16">
          <h2 className="text-sm font-mono mb-6 uppercase tracking-widest"
            style={{ color: "var(--fg-muted)" }}>
            02 — Glass Cards
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {["Silver", "Golden", "Platinum"].map((plan) => (
              <div key={plan} className="glass rounded-2xl p-6">
                <div className="text-lg font-heading font-semibold mb-2">{plan}</div>
                <div className="text-3xl font-heading font-bold text-gradient-brand">
                  {plan === "Silver" ? "399€" : plan === "Golden" ? "599€" : "1.100€"}
                </div>
                <div className="mt-1 text-sm" style={{ color: "var(--fg-secondary)" }}>/mes</div>
              </div>
            ))}
          </div>
        </section>

        {/* Sección: Noise overlay test */}
        <section className="mb-16">
          <h2 className="text-sm font-mono mb-6 uppercase tracking-widest"
            style={{ color: "var(--fg-muted)" }}>
            03 — Noise overlay (global, 2.5% opacidad)
          </h2>
          <div className="glass rounded-2xl p-6">
            <p style={{ color: "var(--fg-secondary)" }}>
              El noise overlay está activo en toda la web (sutil, hace que los gradientes
              tengan textura premium — estilo Linear/Stripe). Si ves un ruido muy sutil
              encima de todo, está funcionando correctamente.
            </p>
          </div>
        </section>

        {/* Sección: Tipografías */}
        <section className="mb-16">
          <h2 className="text-sm font-mono mb-6 uppercase tracking-widest"
            style={{ color: "var(--fg-muted)" }}>
            04 — Typography Stack
          </h2>
          <div className="space-y-6">
            <div>
              <span className="text-xs font-mono" style={{ color: "var(--fg-muted)" }}>
                Bricolage Grotesque (headings)
              </span>
              <p className="text-5xl font-heading font-bold mt-1">
                Agencia de Marketing
              </p>
            </div>
            <div>
              <span className="text-xs font-mono" style={{ color: "var(--fg-muted)" }}>
                Geist (UI elements)
              </span>
              <p className="text-2xl font-ui mt-1">
                Silver · Golden · Platinum
              </p>
            </div>
            <div>
              <span className="text-xs font-mono" style={{ color: "var(--fg-muted)" }}>
                Body (Geist fallback hasta instalar Satoshi)
              </span>
              <p className="text-base mt-1" style={{ color: "var(--fg-secondary)" }}>
                Transformamos tu presencia digital con estrategia, creatividad y resultados
                medibles. Gestionamos tus redes para que tú puedas centrarte en tu negocio.
              </p>
            </div>
          </div>
        </section>

        {/* Sección: Colores del sistema */}
        <section className="mb-16">
          <h2 className="text-sm font-mono mb-6 uppercase tracking-widest"
            style={{ color: "var(--fg-muted)" }}>
            05 — Brand Colors
          </h2>
          <div className="grid grid-cols-4 gap-4">
            {[
              { name: "Geko Purple", color: "#6B2D7C" },
              { name: "Purple Light", color: "#8B3D9C" },
              { name: "Geko Blue", color: "#1D4ED8" },
              { name: "Blue Light", color: "#3B82F6" },
            ].map(({ name, color }) => (
              <div key={name}>
                <div className="w-full h-16 rounded-xl mb-2" style={{ background: color }} />
                <div className="text-xs font-mono" style={{ color: "var(--fg-secondary)" }}>
                  {name}<br />{color}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center py-8 text-sm font-mono"
          style={{ color: "var(--fg-muted)" }}>
          Más efectos se añadirán aquí durante el desarrollo ✦
        </div>
      </div>
    </main>
  )
}
