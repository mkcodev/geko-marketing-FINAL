"use client"

export function HeroBackground() {
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          top: "-15%",
          right: "-5%",
          width: "55%",
          height: "70%",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, var(--color-geko-purple-a22) 0%, transparent 70%)",
          filter: "blur(40px)",
          animation: "float 9s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          left: "-10%",
          width: "45%",
          height: "55%",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, var(--color-geko-blue-a18) 0%, transparent 70%)",
          filter: "blur(50px)",
          animation: "float 12s ease-in-out infinite reverse",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "35%",
          width: "35%",
          height: "35%",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, var(--color-geko-purple-a08) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "float 7s ease-in-out infinite 2s",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(var(--surface) 1px, transparent 1px), linear-gradient(90deg, var(--surface) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
        }}
      />
    </div>
  )
}
