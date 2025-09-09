"use client"

import { Suspense, useRef, useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment, ContactShadows } from "@react-three/drei"
import { motion } from "framer-motion"
import * as THREE from "three"
import { FloatingCards } from "./floating-cards"
import { useDeviceDetection } from "@/hooks/use-device-detection"

// Componente del avatar optimizado
function OptimizedAvatarModel({ quality }: { quality: 'low' | 'medium' | 'high' }) {
  // Verificar que estamos en el cliente antes de cargar el modelo
  if (typeof window === 'undefined') {
    return null
  }
  
  const { scene } = useGLTF("https://models.readyplayer.me/68bed93f8c3845189bf7688e.glb")
  const modelRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (modelRef.current) {
      // Respiración más suave en móviles
      const breatheIntensity = quality === 'low' ? 0.01 : 0.02
      const breathe = Math.sin(state.clock.elapsedTime * 0.5) * breatheIntensity
      modelRef.current.position.y = -6 + breathe
      
      // Avatar siempre mirando al frente
      modelRef.current.rotation.y = 0
    }
  })

  useEffect(() => {
    if (scene) {
      // Optimizar materiales según la calidad
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = quality !== 'low'
          child.receiveShadow = quality !== 'low'
          
          if (child.material) {
            // Reducir calidad de materiales en dispositivos lentos
            if (quality === 'low') {
              if (child.material instanceof THREE.MeshStandardMaterial) {
                child.material.roughness = 0.8
                child.material.metalness = 0.1
              }
            }
            child.material.needsUpdate = true
          }
        }
      })
    }
  }, [scene, quality])

  const scale = quality === 'low' ? 9 : quality === 'medium' ? 10 : 11

  return (
    <group ref={modelRef}>
      <primitive 
        object={scene} 
        scale={scale}
        position={[0, -6, 0]}
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

// Componente de loading mejorado para móviles
function MobileLoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <p className="text-white text-sm">Cargando modelo 3D...</p>
      </div>
    </div>
  )
}

// Componente principal de la escena 3D optimizada
function OptimizedScene3D() {
  const [cameraAngle, setCameraAngle] = useState(0)
  const { camera, gl } = useThree()
  const orbitControlsRef = useRef<any>(null)
  const deviceInfo = useDeviceDetection()

  // Configurar renderer según el dispositivo
  useEffect(() => {
    if (gl) {
      // Configuración optimizada para móviles
      gl.setPixelRatio(Math.min(deviceInfo.devicePixelRatio, deviceInfo.isMobile ? 1.5 : 2))
      
      // Reducir calidad de sombras en móviles
      gl.shadowMap.enabled = !deviceInfo.isLowEnd
      gl.shadowMap.type = deviceInfo.isLowEnd ? THREE.BasicShadowMap : THREE.PCFShadowMap
    }
  }, [gl, deviceInfo])

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
            
            // Duración más corta en móviles
            const animDuration = deviceInfo.isMobile ? duration * 0.7 : duration
            
            // Animar posición de la cámara con easing suave
            gsap.to(camera.position, {
              duration: animDuration,
              x: targetPosition.x,
              y: targetPosition.y,
              z: targetPosition.z,
              ease: "power2.inOut",
              onUpdate: () => {
                camera.lookAt(0, -2, 0)
              },
              onComplete: () => {
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
  }, [camera, deviceInfo])

  // Determinar calidad según el dispositivo
  const getQuality = () => {
    if (deviceInfo.isLowEnd) return 'low'
    if (deviceInfo.isMobile) return 'medium'
    return 'high'
  }

  const quality = getQuality()

  return (
    <>
      {/* Iluminación optimizada según dispositivo */}
      <ambientLight intensity={deviceInfo.isLowEnd ? 1.0 : 0.8} />
      {!deviceInfo.isLowEnd && (
        <directionalLight 
          position={[10, 15, 8]} 
          intensity={0.6}
          castShadow={!deviceInfo.isMobile}
          shadow-mapSize-width={deviceInfo.isMobile ? 512 : 1024}
          shadow-mapSize-height={deviceInfo.isMobile ? 512 : 1024}
          shadow-camera-far={50}
          shadow-camera-left={-15}
          shadow-camera-right={15}
          shadow-camera-top={15}
          shadow-camera-bottom={-15}
        />
      )}
      
      {/* Avatar principal optimizado */}
      <Suspense fallback={<ModelFallback />}>
        <OptimizedAvatarModel quality={quality} />
      </Suspense>
      
      {/* Tarjetas del portafolio */}
      <FloatingCards cameraAngle={cameraAngle} />
      
      {/* Sombras solo en dispositivos potentes */}
      {!deviceInfo.isLowEnd && (
        <ContactShadows 
          position={[0, -7, 0]}
          opacity={0.15}
          scale={deviceInfo.isMobile ? 20 : 25}
          blur={deviceInfo.isMobile ? 4 : 6}
          far={deviceInfo.isMobile ? 15 : 18}
        />
      )}
      
      {/* Ambiente optimizado */}
      <Environment preset="city" />
      
      {/* Controles optimizados para móviles */}
      <OrbitControls 
        ref={orbitControlsRef}
        enablePan={false} 
        enableZoom={false}
        minDistance={deviceInfo.isMobile ? 20 : 25}
        maxDistance={deviceInfo.isMobile ? 20 : 25}
        maxPolarAngle={Math.PI / 2.2}
        minPolarAngle={Math.PI / 2.2}
        autoRotate={false}
        dampingFactor={deviceInfo.isMobile ? 0.05 : 0.1}
        enableDamping={true}
        target={[0, -2, 0]}
        rotateSpeed={deviceInfo.isMobile ? 0.8 : 1.0}
        enableRotate={true}
        // Mejor respuesta táctil en móviles
        touches={{
          ONE: THREE.TOUCH.ROTATE,
          TWO: THREE.TOUCH.DOLLY_PAN
        }}
      />
    </>
  )
}

export function OptimizedModel3D({ isModalOpen = false }: { isModalOpen?: boolean }) {
  const deviceInfo = useDeviceDetection()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Simular carga más rápida en móviles
    const loadTime = deviceInfo.isMobile ? 500 : 1000
    const timer = setTimeout(() => setIsLoaded(true), loadTime)
    return () => clearTimeout(timer)
  }, [deviceInfo])

  if (!isLoaded) {
    return <MobileLoadingFallback />
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
          position: [0, 0, deviceInfo.isMobile ? 20 : 25], 
          fov: deviceInfo.isMobile ? 65 : 60 
        }}
        style={{ background: "transparent" }}
        dpr={[1, deviceInfo.isMobile ? 1.5 : 2]}
        gl={{ 
          antialias: !deviceInfo.isLowEnd,
          alpha: true,
          powerPreference: deviceInfo.isLowEnd ? "low-power" : "high-performance"
        }}
        shadows={!deviceInfo.isLowEnd}
        performance={{
          min: deviceInfo.isLowEnd ? 0.2 : 0.5,
          max: deviceInfo.isLowEnd ? 0.5 : 1,
          debounce: deviceInfo.isMobile ? 500 : 200
        }}
      >
        <OptimizedScene3D />
      </Canvas>
    </motion.div>
  )
}

// Preload the model
useGLTF.preload("https://models.readyplayer.me/68bed93f8c3845189bf7688e.glb")
