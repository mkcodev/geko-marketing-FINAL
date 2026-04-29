import GlareHover from './GlareHover'

export const GlareHoverEff = () => {
  return (

<div style={{ height: '600px', position: 'relative' }}>
  <GlareHover
    glareColor="#ffffff"
    glareOpacity={0.1}
    glareAngle={-30}
    glareSize={300}
    transitionDuration={1950}
    playOnce
  >
    <h2 style={{ fontSize: '3rem', fontWeight: '900', color: '#333', margin: 0 }}>
      Hover Me
    </h2>
  </GlareHover>
</div>
  )
}
