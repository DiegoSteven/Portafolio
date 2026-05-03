"use client"

import { Suspense, useRef, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei"
import * as THREE from "three"
import { AVATAR_GLB_PATH } from "@/lib/avatar-model"

function StaticAvatarFallback() {
  return (
    <mesh>
      <cylinderGeometry args={[0.6, 0.6, 1.2, 12]} />
      <meshStandardMaterial color="#6366f1" />
    </mesh>
  )
}

function StaticAvatar() {
  const { scene } = useGLTF(AVATAR_GLB_PATH)
  const avatarRef = useRef<THREE.Group>(null)

  useEffect(() => {
    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh) || !child.material) return
      const apply = (m: THREE.Material) => {
        m.precision = "lowp"
      }
      if (Array.isArray(child.material)) child.material.forEach(apply)
      else apply(child.material)
      child.castShadow = false
      child.receiveShadow = false
    })
  }, [scene])

  return (
    <primitive
      ref={avatarRef}
      object={scene}
      scale={4.2}
      position={[0, -1, 0]}
      rotation={[0, 0, 0]}
    />
  )
}

function OptimizedLights() {
  return (
    <>
      <ambientLight intensity={0.8} color="#ffffff" />
      <directionalLight position={[5, 5, 5]} intensity={0.3} castShadow={false} />
    </>
  )
}

interface StaticModel3DProps {
  className?: string
}

export function StaticModel3D({ className = "" }: StaticModel3DProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "low-power",
          precision: "lowp",
        }}
        performance={{ min: 0.2 }}
        frameloop="demand"
      >
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <OptimizedLights />
        <Suspense fallback={<StaticAvatarFallback />}>
          <StaticAvatar />
        </Suspense>
        <OrbitControls
          enabled
          enablePan={false}
          enableZoom={false}
          enableRotate
          autoRotate={false}
          rotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  )
}

useGLTF.preload(AVATAR_GLB_PATH)
