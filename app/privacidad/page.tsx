import type { Metadata } from "next"
import { LegalHeader, LegalSection } from "@/components/layout/legal-header"

export const metadata: Metadata = {
  title: "Política de Privacidad | Geko Marketing",
  description: "Política de privacidad y protección de datos de Geko Marketing conforme al RGPD y la LOPD-GDD.",
  alternates: { canonical: "https://geko-marketing.com/privacidad" },
  robots: { index: false, follow: false },
}

export default function PrivacidadPage() {
  return (
    <div style={{ paddingTop: "var(--section-padding-tight)", paddingBottom: "var(--section-padding-v)" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>
        <LegalHeader
          title="Política de Privacidad"
          breadcrumb="Privacidad"
          updatedAt="abril de 2025"
        />

        <LegalSection title="1. Responsable del tratamiento">
          <ul>
            <li><strong>Responsable:</strong> Geko Marketing</li>
            <li><strong>Domicilio:</strong> Tres Cantos, Madrid, 28760, España</li>
            <li><strong>Email de contacto:</strong> info@geko-marketing.com</li>
          </ul>
        </LegalSection>

        <LegalSection title="2. Datos que recogemos">
          <p>Únicamente tratamos los datos que tú nos proporcionas voluntariamente a través del formulario de contacto:</p>
          <ul>
            <li>Nombre y apellidos</li>
            <li>Dirección de correo electrónico</li>
            <li>Número de teléfono (opcional)</li>
            <li>Nombre de empresa o negocio (opcional)</li>
            <li>Mensaje y descripción de tu proyecto</li>
          </ul>
          <p>No recogemos datos especialmente sensibles ni datos de menores de 14 años.</p>
        </LegalSection>

        <LegalSection title="3. Finalidad y base legal">
          <p>Tratamos tus datos con las siguientes finalidades:</p>
          <ul>
            <li><strong>Atender tu consulta:</strong> base legal — ejecución de un precontrato o interés legítimo (art. 6.1.b y 6.1.f RGPD).</li>
            <li><strong>Envío de información comercial sobre nuestros servicios</strong> si has dado tu consentimiento explícito: base legal — consentimiento (art. 6.1.a RGPD). Puedes retirar este consentimiento en cualquier momento.</li>
          </ul>
        </LegalSection>

        <LegalSection title="4. Plazo de conservación">
          <p>Conservamos tus datos durante el tiempo necesario para atender tu consulta y, en su caso, durante el período de vigencia de la relación comercial más los plazos legales de prescripción aplicables (generalmente 4 años según la LOPD-GDD).</p>
        </LegalSection>

        <LegalSection title="5. Destinatarios">
          <p>Tus datos son tratados exclusivamente por Geko Marketing. Para el envío de formularios, utilizamos Web3Forms (web3forms.com) como encargado del tratamiento, que actúa bajo nuestras instrucciones y con las garantías adecuadas.</p>
          <p>No cedemos ni vendemos tus datos a terceros con fines comerciales propios.</p>
        </LegalSection>

        <LegalSection title="6. Tus derechos">
          <p>Puedes ejercer en cualquier momento los siguientes derechos dirigiéndote a info@geko-marketing.com:</p>
          <ul>
            <li><strong>Acceso:</strong> saber qué datos tratamos sobre ti.</li>
            <li><strong>Rectificación:</strong> corregir datos inexactos o incompletos.</li>
            <li><strong>Supresión:</strong> solicitar el borrado de tus datos cuando ya no sean necesarios.</li>
            <li><strong>Oposición:</strong> oponerte al tratamiento basado en interés legítimo.</li>
            <li><strong>Limitación:</strong> solicitar la suspensión del tratamiento en determinadas circunstancias.</li>
            <li><strong>Portabilidad:</strong> recibir tus datos en formato estructurado y legible por máquina.</li>
          </ul>
          <p>Si consideras que el tratamiento no se ajusta a la normativa, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).</p>
        </LegalSection>

        <LegalSection title="7. Seguridad">
          <p>Aplicamos medidas técnicas y organizativas adecuadas para proteger tus datos frente a accesos no autorizados, pérdida o destrucción accidental, conforme al artículo 32 del RGPD.</p>
        </LegalSection>
      </div>
    </div>
  )
}

