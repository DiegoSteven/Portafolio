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
  
  const [isMobile, setIsMobile] = useState(false)
  const [modelLoaded, setModelLoaded] = useState(false)
  const [loadError, setLoadError] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Intentar cargar el modelo con timeout
  let scene
  try {
    const gltf = useGLTF("https://models.readyplayer.me/68bed93f8c3845189bf7688e.glb")
    scene = gltf.scene
    
    if (scene && !modelLoaded) {
      setModelLoaded(true)
    }
  } catch (error) {
    console.warn('Error loading 3D model, using fallback:', error)
    setLoadError(true)
  }

  const modelRef = useRef<THREE.Group>(null)

  // Si hay error o el modelo no carga, mostrar un placeholder 3D simple
  if (loadError || !scene) {
    return (
      <group ref={modelRef}>
        <mesh position={[0, -4, 0]}>
          <cylinderGeometry args={[1.5, 1.5, 3, 8]} />
          <meshStandardMaterial 
            color="#4f46e5" 
            roughness={0.7}
            metalness={0.3}
          />
        </mesh>
        <mesh position={[0, -2, 0]}>
          <sphereGeometry args={[1.2, 8, 6]} />
          <meshStandardMaterial 
            color="#6366f1" 
            roughness={0.5}
            metalness={0.2}
          />
        </mesh>
      </group>
    )
  }

  useFrame((state) => {
    if (modelRef.current) {
      // Solo movimiento de respiración sutil, menos intenso en móviles
      const breatheIntensity = isMobile ? 0.01 : 0.02
      const breathe = Math.sin(state.clock.elapsedTime * 0.5) * breatheIntensity
      modelRef.current.position.y = -6 + breathe // Posición ajustada
      
      // Avatar siempre mirando al frente
      modelRef.current.rotation.y = 0
    }
  })

  useEffect(() => {
    if (scene) {
      // Optimizar materiales para mejor rendimiento, especialmente en móviles
      scene.traverse((child: any) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = !isMobile // Sin sombras en móviles
          child.receiveShadow = !isMobile
          if (child.material) {
            // Optimizar materiales en móviles
            if (isMobile && child.material instanceof THREE.MeshStandardMaterial) {
              child.material.roughness = 0.8
              child.material.metalness = 0.1
            }
            child.material.needsUpdate = true
          }
        }
      })
    }
  }, [scene, isMobile])

  return (
    <group ref={modelRef}>
      <primitive 
        object={scene} 
        scale={isMobile ? 9 : 11} // Modelo más pequeño en móviles para mejor rendimiento
        position={[0, -6, 0]} // Posición centrada
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
    // Escuchar eventos de animación de cámara desde FloatingCards
    const handleAnimateCamera = (event: CustomEvent) => {
      const { targetPosition, targetCard, duration = 1.5 } = event.detail
      
      if (orbitControlsRef.current) {
        // Animar la cámara usando GSAP
        if (typeof window !== 'undefined') {
          import('gsap').then(({ gsap }) => {
            // Deshabilitar controles durante la animación
            orbitControlsRef.current.enabled = false
            
            // Obtener posición actual de la cámara
            const currentPosition = {
              x: camera.position.x,
              y: camera.position.y,
              z: camera.position.z
            }
            
            // Animar posición de la cámara con easing suave
            gsap.to(camera.position, {
              duration: duration,
              x: targetPosition.x,
              y: targetPosition.y,
              z: targetPosition.z,
              ease: "power2.inOut",
              onUpdate: () => {
                camera.lookAt(0, -2, 0) // Siempre mirar al avatar
              },
              onComplete: () => {
                // Reactivar controles después de la animación
                orbitControlsRef.current.enabled = true
                orbitControlsRef.current.update()
              }
            })
          })
        }
      }
    }

    window.addEventListener('animateCamera', handleAnimateCamera as EventListener)
    
    return () => {
      window.removeEventListener('animateCamera', handleAnimateCamera as EventListener)
    }
  }, [camera])

  return (
    <>
      {/* Iluminación optimizada para móviles */}
      <ambientLight intensity={isMobile ? 1.0 : 0.8} />
      {!isMobile ? (
        <directionalLight 
          position={[10, 15, 8]} 
          intensity={0.6}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-15}
          shadow-camera-right={15}
          shadow-camera-top={15}
          shadow-camera-bottom={-15}
        />
      ) : (
        <directionalLight 
          position={[10, 15, 8]} 
          intensity={0.4}
          castShadow={false}
        />
      )}
      
      {/* Avatar principal (estático) */}
      <Suspense fallback={<ModelFallback />}>
        <AvatarModel />
      </Suspense>
      
      {/* Tarjetas del portafolio con efecto de papel remolino */}
      <FloatingCards cameraAngle={cameraAngle} />
      
      {/* Sombras solo en desktop */}
      {!isMobile && (
        <ContactShadows 
          position={[0, -7, 0]}
          opacity={0.2} 
          scale={25}
          blur={6} 
          far={18}
        />
      )}
      
      {/* Ambiente */}
      <Environment preset="city" />
      
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
        dpr={[1, isMobile ? 1.5 : 2]} // Reducir DPR en móviles
        gl={{ 
          antialias: !isMobile, // Sin antialiasing en móviles para mejor rendimiento
          alpha: true
        }}
        shadows={!isMobile} // Sin sombras en móviles
        performance={{
          min: isMobile ? 0.2 : 0.5,
          max: isMobile ? 0.6 : 1,
          debounce: isMobile ? 500 : 200
        }}
      >
        <Scene3D />
      </Canvas>
    </motion.div>
  )
}

// Preload the model solo en desktop y con conexión rápida
if (typeof window !== 'undefined') {
  // Solo precargar en desktop con buena conexión
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
  const isSlowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')
  const isMobile = window.innerWidth < 768
  
  if (!isMobile && !isSlowConnection) {
    useGLTF.preload("https://models.readyplayer.me/68bed93f8c3845189bf7688e.glb")
  }
}
