import { LiquidMetal } from '@paper-design/shaders-react'

// The brand arch rendered as liquid gold (Paper shaders, Apache-2.0). Lazy-loaded by Home on
// wide screens with motion allowed; `running` drops speed to 0 so it idles when off screen.
export default function LiquidArch({ running = true }) {
  return (
    <LiquidMetal
      image="/brand/arch.svg"
      colorBack="#00000000"
      colorTint="#C99A52"
      repetition={2.4}
      softness={0.25}
      shiftRed={0}
      shiftBlue={0}
      distortion={0.06}
      contour={0.5}
      angle={70}
      shape="none"
      fit="contain"
      scale={1}
      speed={running ? 0.55 : 0}
      minPixelRatio={1.5}
      maxPixelCount={1600 * 1600}
      style={{ position: 'absolute', inset: 0 }}
    />
  )
}
