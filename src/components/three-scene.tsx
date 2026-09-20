"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";

function Rig() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    const { camera } = state;
    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      mouse.current.x * 1.6,
      2.5,
      delta
    );
    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      mouse.current.y * 1.0,
      2.5,
      delta
    );
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function Floaters({ progress }: { progress?: MotionValue<number> }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const p = progress?.get() ?? 0;
    group.current.rotation.y = state.clock.elapsedTime * 0.05 - p * 0.9;
    group.current.rotation.x = -p * 0.18;
    group.current.rotation.z = p * 0.1;
  });

  return (
    <group ref={group}>
      <Float speed={1.6} rotationIntensity={1.1} floatIntensity={1.6}>
        <mesh position={[3.6, 1.4, -1.5]}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.9} />
        </mesh>
      </Float>

      <Float speed={1.25} rotationIntensity={0.8} floatIntensity={1.3}>
        <mesh position={[-3.8, 1.8, -2.2]}>
          <icosahedronGeometry args={[1.2, 1]} />
          <meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.85} />
        </mesh>
      </Float>

      <Float speed={1.9} rotationIntensity={1.3} floatIntensity={1.5}>
        <mesh position={[2.7, -2, -0.8]}>
          <torusKnotGeometry args={[0.55, 0.2, 140, 18]} />
          <meshBasicMaterial color="#f472b6" wireframe transparent opacity={0.8} />
        </mesh>
      </Float>

      <Float speed={1.4} rotationIntensity={0.9} floatIntensity={1.1}>
        <mesh position={[-2.6, -1.9, -3.4]}>
          <dodecahedronGeometry args={[0.75, 0]} />
          <meshBasicMaterial color="#a3e635" wireframe transparent opacity={0.7} />
        </mesh>
      </Float>

      <Float speed={1.1} rotationIntensity={0.5} floatIntensity={1.2}>
        <mesh position={[0.6, 2.6, -3.8]}>
          <sphereGeometry args={[1.7, 48, 48]} />
          <MeshDistortMaterial
            color="#22d3ee"
            emissive="#0e7490"
            emissiveIntensity={0.4}
            distort={0.35}
            speed={1.8}
            transparent
            opacity={0.75}
            roughness={0.12}
            metalness={0.3}
          />
        </mesh>
      </Float>
    </group>
  );
}

export function Scene({ progress }: { progress?: MotionValue<number> }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 9.5], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.7} />
      <pointLight position={[6, 5, 4]} intensity={120} color="#22d3ee" />
      <pointLight position={[-6, -3, 3]} intensity={120} color="#a78bfa" />
      <pointLight position={[0, -6, -5]} intensity={90} color="#f472b6" />

      <Floaters progress={progress} />

      <Sparkles
        count={220}
        scale={16}
        size={1.6}
        speed={0.4}
        opacity={0.65}
        color="#a78bfa"
      />

      <Rig />
    </Canvas>
  );
}