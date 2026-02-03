"use client"

import { Suspense, useRef, useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment, ContactShadows } from "@react-three/drei"
import { motion } from "framer-motion"
import * as THREE from "three"
import { FloatingCards } from "./floating-cards"

// Componente del avatar/modelo principal
function AvatarModel() {
  // Verificar que estamos en el cliente antes de cargar el modelo
  if (typeof window === 'undefined') {
    return null
  }
  
  const { scene } = useGLTF("/models/avatar+3d+modelo+anime.glb")
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
  const [cameraAngle, setCameraAngle] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const { camera, gl } = useThree()
  const orbitControlsRef = useRef<any>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useFrame(() => {
    // Calcular el ángulo de la cámara respecto al avatar
    const cameraPosition = camera.position
    const angle = Math.atan2(cameraPosition.x, cameraPosition.z) * (180 / Math.PI)
    setCameraAngle(angle)
  })

  useEffect(() => {
    // Escuchar eventos de rotación de cámara desde FloatingCards
    const handleRotateCamera = (event: CustomEvent) => {
      const { targetCard } = event.detail
      
      if (orbitControlsRef.current && typeof window !== 'undefined') {
        import('gsap').then(({ gsap }) => {
          // Ángulos exactos de cada tarjeta (en radianes)
          const cardAngles: { [key: number]: number } = {
            0: 0,                    // Sobre mí (0°)
            1: Math.PI / 3,          // Experiencia (60°)
            2: (2 * Math.PI) / 3,    // Proyectos (120°)
            3: Math.PI,              // Educación (180°)
            4: (4 * Math.PI) / 3,    // Habilidades (240°)
            5: (5 * Math.PI) / 3     // Contacto (300°)
          }
          
          const targetAngle = cardAngles[targetCard]
          if (targetAngle === undefined) return
          
          // Deshabilitar controles durante animación
          orbitControlsRef.current.enabled = false
          
          // Obtener ángulo actual
          const currentAngle = orbitControlsRef.current.getAzimuthalAngle()
          
          // Calcular diferencia más corta
          let angleDiff = targetAngle - currentAngle
          if (angleDiff > Math.PI) angleDiff -= 2 * Math.PI
          if (angleDiff < -Math.PI) angleDiff += 2 * Math.PI
          
          // Animar directamente al ángulo objetivo
          gsap.to(orbitControlsRef.current, {
            duration: 1.0,
            ease: "power2.inOut",
            onUpdate: function() {
              const progress = this.progress()
              const newAngle = currentAngle + (angleDiff * progress)
              orbitControlsRef.current.setAzimuthalAngle(newAngle)
              orbitControlsRef.current.update()
            },
            onComplete: () => {
              // Asegurar que llegamos exactamente al objetivo
              orbitControlsRef.current.setAzimuthalAngle(targetAngle)
              orbitControlsRef.current.update()
              orbitControlsRef.current.enabled = true
            }
          })
        })
      }
    }

    window.addEventListener('rotateCamera', handleRotateCamera as EventListener)
    
    return () => {
      window.removeEventListener('rotateCamera', handleRotateCamera as EventListener)
    }
  }, [camera, isMobile])

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
      <FloatingCards cameraAngle={cameraAngle} />
      
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
        dampingFactor={isMobile ? 0.05 : 0.1} // Más suave en móviles
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

export function Model3D({ isModalOpen = false }: { isModalOpen?: boolean }) {
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
      animate={{ opacity: isModalOpen ? 0 : 1 }}
      transition={{ duration: 0.3 }}
      style={{ 
        pointerEvents: isModalOpen ? 'none' : 'auto',
        visibility: isModalOpen ? 'hidden' : 'visible'
      }}
    >
      <Canvas
        camera={{ 
          position: [0, 0, isMobile ? 20 : 25], 
          fov: isMobile ? 70 : 60 
        }}
        style={{ background: "transparent" }}
        dpr={1} // DPR fijo en 1 para máximo rendimiento
        gl={{ 
          antialias: false, // Sin antialiasing para máximo rendimiento
          alpha: true,
          powerPreference: "high-performance"
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
useGLTF.preload("/models/avatar+3d+modelo+anime.glb")
