"use client"

import { Suspense, useRef, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"
import { motion } from "framer-motion"
import * as THREE from "three"
import { FloatingCards } from "./floating-cards"
import { AVATAR_GLB_PATH } from "@/lib/avatar-model"

// Componente del avatar/modelo principal
function AvatarModel() {
  // Verificar que estamos en el cliente antes de cargar el modelo
  if (typeof window === 'undefined') {
    return null
  }
  
  const { scene } = useGLTF(AVATAR_GLB_PATH)
  const modelRef = useRef<THREE.Group>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useFrame((state) => {
    if (modelRef.current) {
      // Solo movimiento de respiración sutil, menos intenso en móviles
      const breatheIntensity = isMobile ? 0.01 : 0.02
      const breathe = Math.sin(state.clock.elapsedTime * 0.5) * breatheIntensity
      modelRef.current.position.y = -1 + breathe // Posición más elevada para que esté sobre las cards
      
      // Avatar siempre mirando al frente
      modelRef.current.rotation.y = 0
    }
  })

  useEffect(() => {
    if (scene) {
      // Optimizar materiales para mejor rendimiento, especialmente en móviles
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = false // Sin sombras para mejor rendimiento
          child.receiveShadow = false
          if (child.material) {
            // Optimizar materiales
            if (child.material instanceof THREE.MeshStandardMaterial) {
              child.material.roughness = 0.8
              child.material.metalness = 0.1
              // Simplificar calidad de reflexiones
              child.material.envMapIntensity = 0.5
            }
            child.material.needsUpdate = true
          }
          // Optimizar geometría
          if (child.geometry) {
            child.geometry.computeVertexNormals()
          }
        }
      })
    }
  }, [scene, isMobile])

  return (
    <group ref={modelRef}>
      <primitive 
        object={scene} 
        scale={isMobile ? 10 : 12} // Escala optimizada para máximo rendimiento
        position={[0, -1, 0]} // Posición elevada para estar sobre las cards
      />
    </group>
  )
}

function ModelFallback() {
  return (
    <mesh>
      <cylinderGeometry args={[1, 1, 2, 8]} />
      <meshStandardMaterial color="#4f46e5" wireframe />
    </mesh>
  )
}

// Componente principal de la escena 3D
function Scene3D() {
  const [isMobile, setIsMobile] = useState(false)
  const orbitControlsRef = useRef<any>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <>
      {/* Iluminación optimizada para máximo rendimiento */}
      <ambientLight intensity={0.9} />
      <directionalLight 
        position={[10, 15, 8]} 
        intensity={0.5}
        castShadow={false}
      />
      
      {/* Avatar principal (estático) */}
      <Suspense fallback={<ModelFallback />}>
        <AvatarModel />
      </Suspense>
      
      {/* Tarjetas del portafolio con efecto de papel remolino */}
      <FloatingCards />
      
      {/* Controles de órbita optimizados para móviles */}
      <OrbitControls 
        ref={orbitControlsRef}
        enablePan={false} 
        enableZoom={false}
        minDistance={isMobile ? 20 : 25} // Más cerca en móviles
        maxDistance={isMobile ? 20 : 25}
        maxPolarAngle={Math.PI / 2.2}
        minPolarAngle={Math.PI / 2.2}
        autoRotate={false}
        dampingFactor={isMobile ? 0.08 : 0.14}
        enableDamping={true}
        target={[0, -2, 0]}
        rotateSpeed={isMobile ? 0.8 : 1.0} // Rotación más lenta en móviles
        enableRotate={true}
        // Mejorar respuesta táctil en móviles
        touches={{
          ONE: THREE.TOUCH.ROTATE,
          TWO: THREE.TOUCH.DOLLY_PAN
        }}
      />
    </>
  )
}

export function Model3D() {
  const [isClient, setIsClient] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (!isClient) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black">
        <div className="text-white text-lg">Cargando...</div>
      </div>
    )
  }

  return (
    <motion.div 
      className="w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Canvas
        camera={{ 
          position: [0, 0, isMobile ? 20 : 25], 
          fov: isMobile ? 70 : 60 
        }}
        style={{ background: "transparent" }}
        // DPR moderado: valores altos + scroll del documento suelen sentirse “pesados”
        dpr={[1, isMobile ? 1.1 : 1.2]}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        shadows={false} // Sin sombras
        performance={{
          min: 0.5,
          max: 1,
          debounce: 100
        }}
      >
        <Scene3D />
      </Canvas>
    </motion.div>
  )
}

// Preload the model
useGLTF.preload(AVATAR_GLB_PATH)
