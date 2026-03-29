import { useState, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Preload } from '@react-three/drei'
// @ts-ignore
import * as random from 'maath/random/dist/maath-random.esm'

const StarBackgroundInner = (props: any) => {
  const ref: any = useRef(null)
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.2 }))

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10
      ref.current.rotation.y -= delta / 15
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#818cf8"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

const StarBackground = () => (
  <div style={{ width: '100%', height: 'auto', position: 'fixed', inset: 0, zIndex: -1 }}>
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Suspense fallback={null}>
        <StarBackgroundInner />
      </Suspense>
      <Preload all />
    </Canvas>
  </div>
)

export default StarBackground
