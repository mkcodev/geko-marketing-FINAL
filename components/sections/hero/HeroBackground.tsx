"use client"

import dynamic from "next/dynamic"

const DotField = dynamic(() => import("@/components/ui/dot-field"), { ssr: false })

export function HeroBackground() {
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>

      {/* Dot field interactivo */}
      <DotField
        dotRadius={3}
        dotSpacing={34}
        bulgeStrength={64}
        glowRadius={150}
        sparkle={false}
        waveAmplitude={0}
        cursorRadius={350}
        cursorForce={0.02}
        bulgeOnly
        gradientFrom="rgba(139,61,156,0.35)"
        gradientTo="rgba(29,78,216,0.2)"
        glowColor="#080810"
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      />

      {/* Aurora blobs */}
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
    </div>
  )
}
