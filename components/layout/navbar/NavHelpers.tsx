import Link from "next/link"

export function NavLink({ href, active, children }: {
  href: string; active: boolean; children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      style={{
        position: "relative", padding: "6px 14px", borderRadius: 8,
        fontFamily: "var(--font-ui)", fontSize: "0.875rem",
        fontWeight: active ? 500 : 400,
        color: active ? "var(--fg)" : "var(--fg-secondary)",
        textDecoration: "none", whiteSpace: "nowrap", transition: "color 0.2s",
      }}
    >
      {children}
      {active && (
        <span aria-hidden style={{
          position: "absolute", bottom: -14, left: "50%",
          transform: "translateX(-50%)",
          width: 20, height: 2, borderRadius: 9999,
          background: "var(--gradient-brand-90)",
          boxShadow: "0 0 6px var(--color-geko-purple-a60)",
        }} />
      )}
    </Link>
  )
}

export function IconBtn({ children, onClick, label, style }: {
  children: React.ReactNode; onClick?: () => void; label?: string; style?: React.CSSProperties
}) {
  return (
    <button
      onClick={onClick} aria-label={label}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        width: 34, height: 34, borderRadius: 8,
        border: "1px solid var(--border)",
        background: "var(--surface)",
        color: "var(--fg-secondary)", cursor: "pointer", flexShrink: 0,
        ...style,
      }}
    >
      {children}
    </button>
  )
}
