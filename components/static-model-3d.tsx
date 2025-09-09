"use client"

import { useRef, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { useGLTF } from "@react-three/drei"

// Avatar estático optimizado
function StaticAvatar() {
  const { scene } = useGLTF("https://models.readyplayer.me/68bed93f8c3845189bf7688e.glb")
  const avatarRef = useRef<any>(null)

  useEffect(() => {
    if (scene) {
      // Optimizaciones para gama baja
      scene.traverse((child: any) => {
        if (child.isMesh) {
          // Reducir calidad de materiales
          if (child.material) {
            child.material.precision = 'lowp'
            child.castShadow = false
            child.receiveShadow = false
          }
        }
      })
    }
  }, [scene])

  return (
    <primitive 
      ref={avatarRef}
      object={scene} 
      scale={2.5} 
      position={[0, -3, 0]}
      rotation={[0, 0, 0]}
    />
  )
}

// Luces optimizadas
function OptimizedLights() {
  return (
    <>
      {/* Solo luz ambiental para mejor rendimiento */}
      <ambientLight intensity={0.8} color="#ffffff" />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={0.3}
        castShadow={false} // Deshabilitar sombras
      />
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
          antialias: false, // Deshabilitar antialiasing
          alpha: true,
          powerPreference: "low-power", // Optimización de batería
          precision: "lowp" // Precisión baja para mejor rendimiento
        }}
        performance={{ min: 0.2 }} // Permitir FPS más bajos
        frameloop="demand" // Solo renderizar cuando sea necesario
      >
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        
        <OptimizedLights />
        
        <StaticAvatar />
        
        {/* Controles simplificados */}
        <OrbitControls
          enabled={true}
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          autoRotate={false} // Sin auto-rotación para mejor rendimiento
          rotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  )
}

// Preload del modelo
useGLTF.preload("https://models.readyplayer.me/68bed93f8c3845189bf7688e.glb")
