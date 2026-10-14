import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'
import * as THREE from 'three'

// Window-level pointer, because the canvas itself ignores pointer events.
const pointer = { x: 0, y: 0 }

// Gold dust drifting up through the smoke; shares the ShaderGradient canvas (one WebGL context).
// Generated once at module load; this file is only ever lazy-loaded in the browser.
const DUST_COUNT = 220
const dustPositions = new Float32Array(DUST_COUNT * 3)
const dustSeeds = new Float32Array(DUST_COUNT)
for (let i = 0; i < DUST_COUNT; i++) {
  dustPositions[i * 3] = (Math.random() - 0.5) * 7
  dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 5
  dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 2
  dustSeeds[i] = Math.random()
}
const dustUniforms = {
  uTime: { value: 0 },
  uColor: { value: new THREE.Color('#E3C893') },
  uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
}

function GoldDust() {
  const ref = useRef()

  useFrame(({ clock }) => {
    const pts = ref.current
    pts.material.uniforms.uTime.value = clock.elapsedTime
    pts.rotation.y += (pointer.x * 0.12 - pts.rotation.y) * 0.04
    pts.rotation.x += (-pointer.y * 0.08 - pts.rotation.x) * 0.04
  })

  return (
    <points ref={ref} renderOrder={10}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[dustPositions, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[dustSeeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthTest={false}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={dustUniforms}
        vertexShader={`
          uniform float uTime; uniform float uPixelRatio;
          attribute float aSeed; varying float vAlpha;
          void main() {
            vec3 p = position;
            p.y = mod(p.y + 2.5 + uTime * (0.04 + aSeed * 0.08), 5.0) - 2.5;
            p.x += sin(uTime * 0.3 + aSeed * 12.0) * 0.15;
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_Position = projectionMatrix * mv;
            gl_PointSize = (1.5 + aSeed * 3.5) * uPixelRatio * (3.0 / -mv.z);
            vAlpha = (0.35 + 0.65 * sin(uTime * (0.6 + aSeed) + aSeed * 40.0) * 0.5 + 0.5) * smoothstep(2.5, 1.2, abs(p.y));
          }`}
        fragmentShader={`
          uniform vec3 uColor; varying float vAlpha;
          void main() {
            float d = length(gl_PointCoord - 0.5);
            gl_FragColor = vec4(uColor, smoothstep(0.5, 0.0, d) * vAlpha * 0.8);
          }`}
      />
    </points>
  )
}

// Hero "scent smoke". Lazy-loaded by Home only when motion is allowed on a wide screen;
// the CSS gradient underneath is the fallback and still frame. lazyLoad unmounts it off screen.
export default function HeroSmoke() {
  useEffect(() => {
    const move = (e) => {
      pointer.x = e.clientX / window.innerWidth - 0.5
      pointer.y = e.clientY / window.innerHeight - 0.5
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])

  return (
    <ShaderGradientCanvas style={{ position: 'absolute', inset: 0 }} pixelDensity={1} fov={45} pointerEvents="none" lazyLoad>
      <ShaderGradient
        control="props"
        type="plane"
        animate="on"
        uSpeed={0.15}
        uStrength={4}
        uDensity={1.3}
        uFrequency={5.5}
        uAmplitude={1}
        positionX={-1.4}
        positionY={0}
        positionZ={0}
        rotationX={0}
        rotationY={10}
        rotationZ={50}
        color1="#1A0D06"
        color2="#8E5B2C"
        color3="#5A1F1A"
        reflection={0.1}
        lightType="3d"
        brightness={0.8}
        grain="off"
        cAzimuthAngle={180}
        cPolarAngle={90}
        cDistance={2.9}
        cameraZoom={1}
      />
      <GoldDust />
    </ShaderGradientCanvas>
  )
}
