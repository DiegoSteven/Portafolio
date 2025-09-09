"use client"

import { Suspense, useRef, useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment, ContactShadows } from "@react-three/drei"
import { motion } from "framer-motion"
import * as THREE from "three"
import { FloatingCards } from "./floating-cards"

// Componente del avatar/modelo principal
function AvatarModel() {
  const { scene } = useGLTF("https://models.readyplayer.me/68bed93f8c3845189bf7688e.glb")
  const modelRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (modelRef.current) {
      // Solo movimiento de respiración sutil, sin rotación automática
      const breathe = Math.sin(state.clock.elapsedTime * 0.5) * 0.02 
      modelRef.current.position.y = -6 + breathe // Posición ajustada
      
      // Avatar siempre mirando al frente
      modelRef.current.rotation.y = 0
    }
  })

  useEffect(() => {
    if (scene) {
      // Optimizar materiales para mejor rendimiento
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true
          child.receiveShadow = true
          if (child.material) {
            child.material.needsUpdate = true
          }
        }
      })
    }
  }, [scene])

  return (
    <group ref={modelRef}>
      <primitive 
        object={scene} 
        scale={11} // Avatar súper gigante e imponente (aumentado de 10 a 14)
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
  const { camera } = useThree()

  useFrame(() => {
    // Calcular el ángulo de la cámara respecto al avatar
    const cameraPosition = camera.position
    const angle = Math.atan2(cameraPosition.x, cameraPosition.z) * (180 / Math.PI)
    setCameraAngle(angle)
  })

  return (
    <>
      {/* Iluminación suave sin destellos */}
      <ambientLight intensity={0.8} />
      <directionalLight 
        position={[10, 15, 8]} 
        intensity={0.6} // Intensidad reducida para evitar destellos
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
      />
      
      {/* Avatar principal (estático) */}
      <Suspense fallback={<ModelFallback />}>
        <AvatarModel />
      </Suspense>
      
      {/* Tarjetas del portafolio con efecto de papel remolino */}
      <FloatingCards cameraAngle={cameraAngle} />
      
      {/* Sombras de contacto suaves */}
      <ContactShadows 
        position={[0, -7, 0]} // Posición bajo el avatar
        opacity={0.2} 
        scale={25} // Escala proporcional para avatar más grande
        blur={6} 
        far={18} // Aumentado para avatar más grande
      />
      
      {/* Ambiente */}
      <Environment preset="city" />
      
      {/* Controles de órbita - solo rotación horizontal, altura fija */}
      <OrbitControls 
        enablePan={false} 
        enableZoom={false} // Zoom completamente deshabilitado
        minDistance={25} // Distancia fija
        maxDistance={25} // Misma distancia para mantener tamaño fijo
        maxPolarAngle={Math.PI / 2.2} // Altura de vista fija
        minPolarAngle={Math.PI / 2.2} // Misma altura - sin movimiento vertical
        autoRotate={false} // Sin auto-rotación
        dampingFactor={0.1} // Suavidad en la rotación
        enableDamping={true}
        target={[0, -2, 0]} // Target centrado en el avatar
        rotateSpeed={1.0} // Velocidad de rotación controlada
        enableRotate={true} // Solo rotación horizontal habilitada
      />
    </>
  )
}

export function Model3D({ isModalOpen = false }: { isModalOpen?: boolean }) {
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
        camera={{ position: [0, 0, 25], fov: 60 }} // Cámara ajustada
        style={{ background: "transparent" }}
        dpr={[1, 2]}
        gl={{ 
          antialias: true, 
          alpha: true
        }}
        shadows
      >
        <Scene3D />
      </Canvas>
    </motion.div>
  )
}

// Preload the model
useGLTF.preload("https://models.readyplayer.me/68bed93f8c3845189bf7688e.glb")
