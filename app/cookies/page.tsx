import type { Metadata } from "next"
import { LegalHeader, LegalSection } from "@/components/layout/legal-header"

export const metadata: Metadata = {
  title: "Política de Cookies | Geko Marketing",
  description: "Información sobre las cookies utilizadas en el sitio web de Geko Marketing y cómo gestionarlas.",
  alternates: { canonical: "https://geko-marketing.com/cookies" },
  robots: { index: false, follow: false },
}

export default function CookiesPage() {
  return (
    <div style={{ paddingTop: "var(--section-padding-tight)", paddingBottom: "var(--section-padding-v)" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>
        <LegalHeader
          title="Política de Cookies"
          breadcrumb="Cookies"
          updatedAt="abril de 2025"
        />

        <LegalSection title="1. ¿Qué son las cookies?">
          <p>Las cookies son pequeños archivos de texto que los sitios web almacenan en tu dispositivo cuando los visitas. Permiten recordar tus preferencias, analizar el uso del sitio y mejorar tu experiencia.</p>
        </LegalSection>

        <LegalSection title="2. Cookies que utilizamos">
          <p>Este sitio utiliza únicamente cookies de terceros de analítica y medición. No utilizamos cookies de sesión propias ni cookies publicitarias.</p>

          <CookieTable />
        </LegalSection>

        <LegalSection title="3. Cookies de analítica">
          <p><strong>Google Tag Manager / Google Analytics 4</strong> — Recopilamos datos agregados y anonimizados sobre cómo los visitantes interactúan con el sitio (páginas visitadas, tiempo de sesión, fuente de tráfico). No identificamos a usuarios individuales. Puedes consultar la política de privacidad de Google en <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-geko-purple-accent)" }}>policies.google.com/privacy</a>.</p>

          <p><strong>Microsoft Clarity</strong> — Herramienta de análisis de comportamiento que genera mapas de calor y grabaciones de sesión anonimizadas para mejorar la usabilidad del sitio. Puedes consultar su política en <a href="https://privacy.microsoft.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-geko-purple-accent)" }}>privacy.microsoft.com</a>.</p>
        </LegalSection>

        <LegalSection title="4. Cookies de preferencias">
          <p>Almacenamos en <code style={{ background: "var(--border-subtle)", padding: "2px 6px", borderRadius: 4, fontSize: "0.875em" }}>localStorage</code> únicamente:</p>
          <ul>
            <li><strong>geko-loaded</strong> — Evita mostrar la pantalla de carga en visitas repetidas. No contiene datos personales.</li>
            <li><strong>cookie-consent</strong> — Registra tu decisión sobre las cookies para no volver a mostrarte el aviso.</li>
            <li><strong>ann-dismissed</strong> — Recuerda si has cerrado la barra de anuncio.</li>
          </ul>
          <p>Estos datos no se transmiten a ningún servidor y se eliminan al limpiar el almacenamiento del navegador.</p>
        </LegalSection>

        <LegalSection title="5. Cómo gestionar las cookies">
          <p>Puedes configurar tu navegador para rechazar o eliminar cookies en cualquier momento. Ten en cuenta que deshabilitar las cookies de analítica no afecta a la funcionalidad del sitio.</p>
          <ul>
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-geko-purple-accent)" }}>Chrome</a></li>
            <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-geko-purple-accent)" }}>Firefox</a></li>
            <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-geko-purple-accent)" }}>Safari</a></li>
            <li><a href="https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-geko-purple-accent)" }}>Edge</a></li>
          </ul>
          <p>Para opt-out específico de Google Analytics: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-geko-purple-accent)" }}>Google Analytics Opt-out</a>.</p>
        </LegalSection>

        <LegalSection title="6. Actualizaciones">
          <p>Podemos actualizar esta política cuando añadamos nuevas herramientas o cambie la normativa aplicable. Te recomendamos revisarla periódicamente. Para cualquier consulta: <a href="mailto:info@geko-marketing.com" style={{ color: "var(--color-geko-purple-accent)" }}>info@geko-marketing.com</a>.</p>
        </LegalSection>
      </div>
    </div>
  )
}

function CookieTable() {
  const cookies = [
    { nombre: "_ga, _ga_*", proveedor: "Google Analytics", tipo: "Analítica", duracion: "2 años" },
    { nombre: "_clck, _clsk, CLID", proveedor: "Microsoft Clarity", tipo: "Analítica", duracion: "1 año / sesión" },
    { nombre: "geko-loaded", proveedor: "Geko Marketing", tipo: "Preferencia", duracion: "Persistente (localStorage)" },
    { nombre: "cookie-consent", proveedor: "Geko Marketing", tipo: "Preferencia", duracion: "Persistente (localStorage)" },
  ]

  return (
    <div style={{ overflowX: "auto", marginTop: 8 }}>
      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        fontFamily: "var(--font-ui)",
        fontSize: "0.8125rem",
      }}>
        <thead>
          <tr style={{ borderBottom: "1px solid var(--border-strong)" }}>
            {["Nombre", "Proveedor", "Tipo", "Duración"].map((h) => (
              <th key={h} style={{
                textAlign: "left",
                padding: "8px 12px",
                color: "var(--fg-secondary)",
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cookies.map((c, i) => (
            <tr key={c.nombre} style={{
              borderBottom: "1px solid var(--border-subtle)",
              background: i % 2 === 0 ? "var(--surface)" : "transparent",
            }}>
              <td style={{ padding: "10px 12px", color: "var(--fg)", fontFamily: "var(--font-ui)" }}>{c.nombre}</td>
              <td style={{ padding: "10px 12px", color: "var(--fg-secondary)" }}>{c.proveedor}</td>
              <td style={{ padding: "10px 12px", color: "var(--fg-secondary)" }}>{c.tipo}</td>
              <td style={{ padding: "10px 12px", color: "var(--fg-secondary)" }}>{c.duracion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
