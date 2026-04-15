import Link from "next/link"

const AUTHORS = {
  guillermo: {
    name: "Guillermo",
    role: "CEO & Fundador · Geko Marketing",
    bio: "Especialista en estrategia de marketing digital con más de 8 años de experiencia ayudando a pymes a crecer en el entorno digital. Fundador de Geko Marketing en Tres Cantos, Madrid.",
    initials: "G",
    color: "#9B4DBC",
    linkedin: "https://www.linkedin.com/in/guillermo-garcia-gekomarketing",
    instagram: "https://www.instagram.com/guilleco",
  },
}

function LinkedInIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function InstagramIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

interface AuthorCardProps {
  author: keyof typeof AUTHORS
}

export function AuthorCard({ author }: AuthorCardProps) {
  const data = AUTHORS[author] ?? AUTHORS.guillermo

  return (
    <div
      style={{
        display: "flex",
        gap: 20,
        padding: "24px 28px",
        borderRadius: 18,
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.07)",
        alignItems: "flex-start",
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          flexShrink: 0,
          background: `linear-gradient(135deg, ${data.color}60, ${data.color}30)`,
          border: `1px solid ${data.color}40`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-heading)",
          fontSize: "1.25rem",
          fontWeight: 700,
          color: data.color,
        }}
      >
        {data.initials}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "0.65rem",
            fontWeight: 600,
            letterSpacing: "0.10em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.28)",
            marginBottom: 4,
          }}
        >
          Escrito por
        </p>
        <p
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1.0625rem",
            fontWeight: 700,
            color: "rgba(255,255,255,0.92)",
            marginBottom: 2,
          }}
        >
          {data.name}
        </p>
        <p
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: "0.8rem",
            color: data.color,
            marginBottom: 10,
          }}
        >
          {data.role}
        </p>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.875rem",
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.42)",
            marginBottom: 14,
          }}
        >
          {data.bio}
        </p>

        <div style={{ display: "flex", gap: 8 }}>
          <Link
            href={data.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 12px",
              borderRadius: 8,
              background: "rgba(0,119,181,0.12)",
              border: "1px solid rgba(0,119,181,0.25)",
              color: "#0077B5",
              textDecoration: "none",
              fontFamily: "var(--font-ui)",
              fontSize: "0.75rem",
              fontWeight: 500,
            }}
          >
            <LinkedInIcon size={13} />
            LinkedIn
          </Link>
          <Link
            href={data.instagram}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 12px",
              borderRadius: 8,
              background: "rgba(225,48,108,0.10)",
              border: "1px solid rgba(225,48,108,0.22)",
              color: "#E1306C",
              textDecoration: "none",
              fontFamily: "var(--font-ui)",
              fontSize: "0.75rem",
              fontWeight: 500,
            }}
          >
            <InstagramIcon size={13} />
            Instagram
          </Link>
        </div>
      </div>
    </div>
  )
}
