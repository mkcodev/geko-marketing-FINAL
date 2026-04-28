export default function BlogLoading() {
  return (
    <div style={{ paddingTop: "var(--section-padding-tight)", paddingBottom: "var(--section-padding-v)" }}>
      <div className="section-container">
        {/* Header skeleton */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ ...SKEL, width: 60, height: 24, borderRadius: 9999, margin: "0 auto 16px" }} />
          <div style={{ ...SKEL, width: "55%", height: 44, borderRadius: 8, margin: "0 auto 12px" }} />
          <div style={{ ...SKEL, width: "38%", height: 20, borderRadius: 6, margin: "0 auto 32px" }} />
          <div style={{ ...SKEL, width: 280, height: 44, borderRadius: 10, margin: "0 auto" }} />
        </div>

        {/* Tag filter skeleton */}
        <div style={{ display: "flex", gap: 8, marginBottom: 48, flexWrap: "wrap" }}>
          {[80, 110, 90, 120, 75].map((w, i) => (
            <div key={i} style={{ ...SKEL, width: w, height: 32, borderRadius: 9999 }} />
          ))}
        </div>

        {/* Cards grid skeleton */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 24,
        }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{
              borderRadius: 16,
              background: "var(--surface)",
              border: "1px solid var(--border-subtle)",
              overflow: "hidden",
            }}>
              <div style={{ ...SKEL, height: 200, borderRadius: 0 }} />
              <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ ...SKEL, width: 80, height: 20, borderRadius: 9999 }} />
                <div style={{ ...SKEL, width: "90%", height: 24, borderRadius: 6 }} />
                <div style={{ ...SKEL, width: "75%", height: 20, borderRadius: 6 }} />
                <div style={{ ...SKEL, width: "60%", height: 16, borderRadius: 6, marginTop: 8 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const SKEL: React.CSSProperties = {
  background: "linear-gradient(90deg, var(--surface) 25%, var(--border) 50%, var(--surface) 75%)",
  backgroundSize: "200% 100%",
  animation: "skeleton-shimmer 1.5s ease-in-out infinite",
}
