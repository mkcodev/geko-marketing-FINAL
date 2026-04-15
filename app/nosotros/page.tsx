import { CtaFinal } from "@/components/sections/cta-final"

export const metadata = {
  title: "Nosotros | Geko Marketing",
  description:
    "Conoce al equipo de Geko Marketing. Agencia de marketing digital en Tres Cantos, Madrid.",
}

const VALUES = [
  { emoji: "🎯", title: "Orientados a resultados", description: "Cada decisión está basada en datos. Medimos todo, optimizamos lo que no funciona y escalamos lo que sí." },
  { emoji: "🤝", title: "Transparencia total", description: "Reportes semanales, acceso a todas las métricas en tiempo real y comunicación directa con tu account manager." },
  { emoji: "⚡", title: "Ejecución rápida", description: "De la estrategia a la acción en días, no meses. Somos ágiles y nos adaptamos a las necesidades de tu negocio." },
  { emoji: "🦎", title: "Adaptabilidad", description: "Como el gecko, nos adaptamos a cualquier entorno. Cada cliente es diferente y nuestra estrategia también lo es." },
]

export default function NosotrosPage() {
  return (
    <>
      {/* Hero */}
      <div
        className="section-container"
        style={{ paddingTop: 60, paddingBottom: 64 }}
      >
        <span
          style={{
            display: "inline-block",
            padding: "4px 12px",
            borderRadius: 9999,
            background: "rgba(107,45,124,0.12)",
            border: "1px solid rgba(107,45,124,0.30)",
            fontFamily: "var(--font-ui)",
            fontSize: "0.78rem",
            fontWeight: 500,
            color: "#9B4DBC",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          Sobre nosotros
        </span>
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2.25rem, 5vw, 4rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "rgba(255,255,255,0.96)",
            marginBottom: 24,
            maxWidth: 640,
          }}
        >
          El equipo detrás de{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #9B4DBC 0%, #3B82F6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            tu crecimiento
          </span>
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1.125rem",
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.75,
            maxWidth: 580,
            marginBottom: 48,
          }}
        >
          Somos una agencia de marketing digital con sede en Tres Cantos, Madrid. Ayudamos a pymes y emprendedores a hacer crecer su presencia digital con estrategias que realmente funcionan.
        </p>

        {/* Origin story */}
        <div
          style={{
            padding: "32px",
            borderRadius: 20,
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
            maxWidth: 720,
            marginBottom: 64,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.0625rem",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.8,
              fontStyle: "italic",
            }}
          >
            &ldquo;Fundamos Geko Marketing porque vimos que muchas pymes pagaban grandes sumas a agencias que no entendían su negocio y no medían resultados. Quisimos ser diferentes: transparentes, ágiles y obsesionados con los datos.&rdquo;
          </p>
        </div>

        {/* Values */}
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            fontWeight: 700,
            color: "rgba(255,255,255,0.90)",
            letterSpacing: "-0.02em",
            marginBottom: 32,
          }}
        >
          Nuestros valores
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 20,
            marginBottom: 64,
          }}
        >
          {VALUES.map((v) => (
            <div
              key={v.title}
              style={{
                padding: "24px",
                borderRadius: 16,
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: 14 }}>{v.emoji}</div>
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.0625rem",
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.90)",
                  marginBottom: 8,
                }}
              >
                {v.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9375rem",
                  color: "rgba(255,255,255,0.42)",
                  lineHeight: 1.65,
                }}
              >
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <CtaFinal />
    </>
  )
}
