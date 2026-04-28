import type { Metadata } from "next"
import { LegalHeader, LegalSection } from "@/components/layout/legal-header"

export const metadata: Metadata = {
  title: "Aviso Legal | Geko Marketing",
  description: "Aviso legal y condiciones de uso del sitio web de Geko Marketing, agencia de marketing digital en Tres Cantos, Madrid.",
  alternates: { canonical: "https://geko-marketing.com/aviso-legal" },
  robots: { index: false, follow: false },
}

export default function AvisoLegalPage() {
  return (
    <div style={{ paddingTop: "var(--section-padding-tight)", paddingBottom: "var(--section-padding-v)" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>
        <LegalHeader
          title="Aviso Legal"
          breadcrumb="Aviso Legal"
          updatedAt="abril de 2025"
        />

        <LegalSection title="1. Datos identificativos">
          <p>En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE), se informa:</p>
          <ul>
            <li><strong>Denominación social:</strong> Geko Marketing</li>
            <li><strong>Domicilio:</strong> Tres Cantos, Madrid, 28760, España</li>
            <li><strong>Email:</strong> info@geko-marketing.com</li>
            <li><strong>Teléfono:</strong> +34 633 197 798</li>
            <li><strong>Sitio web:</strong> https://geko-marketing.com</li>
          </ul>
        </LegalSection>

        <LegalSection title="2. Objeto y ámbito de aplicación">
          <p>El presente Aviso Legal regula el acceso y el uso del sitio web geko-marketing.com (en adelante, «el Sitio»), del que es titular Geko Marketing. El acceso al Sitio implica la aceptación plena y sin reservas de las presentes condiciones.</p>
        </LegalSection>

        <LegalSection title="3. Propiedad intelectual e industrial">
          <p>Todos los contenidos del Sitio —textos, imágenes, logotipos, diseños, código fuente y demás elementos— son propiedad de Geko Marketing o de sus legítimos licenciantes, y están protegidos por la legislación española e internacional sobre propiedad intelectual e industrial.</p>
          <p>Queda prohibida la reproducción, distribución, comunicación pública o transformación de cualquier contenido sin autorización expresa y por escrito de Geko Marketing.</p>
        </LegalSection>

        <LegalSection title="4. Exclusión de garantías y responsabilidad">
          <p>Geko Marketing no garantiza la disponibilidad continua del Sitio ni la ausencia de errores en sus contenidos. La información publicada tiene carácter meramente informativo y no constituye asesoramiento profesional.</p>
          <p>Geko Marketing no se responsabiliza de los daños derivados de virus informáticos, interrupciones del servicio o del uso indebido del Sitio por parte de terceros.</p>
        </LegalSection>

        <LegalSection title="5. Enlaces a terceros">
          <p>El Sitio puede contener enlaces a sitios web de terceros. Geko Marketing no controla dichos sitios ni se responsabiliza de sus contenidos, políticas de privacidad o disponibilidad.</p>
        </LegalSection>

        <LegalSection title="6. Ley aplicable y jurisdicción">
          <p>El presente Aviso Legal se rige por la legislación española. Para la resolución de cualquier controversia derivada del acceso o uso del Sitio, las partes se someten a los Juzgados y Tribunales de Madrid, con renuncia expresa a cualquier otro fuero que pudiera corresponderles.</p>
        </LegalSection>
      </div>
    </div>
  )
}

