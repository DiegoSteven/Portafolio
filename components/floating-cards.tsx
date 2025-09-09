"use client"

import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import * as THREE from "three"
import { User, Briefcase, Code, FolderOpen, GraduationCap, MessageCircle } from "lucide-react"

// Importar GSAP dinámicamente para evitar problemas de SSR
let gsap: any = null
if (typeof window !== 'undefined') {
  import('gsap').then((GSAP) => {
    gsap = GSAP.gsap
  })
}

interface PortfolioCard {
  id: string
  title: string
  icon: any
  color: string
  description: string
  content: string
  index: number
  angle: number
  backgroundImage?: string // Nueva propiedad para imagen de fondo
}

// Datos de las tarjetas del portafolio en órbita circular
export const portfolioCards: PortfolioCard[] = [
  {
    id: "about",
    title: "Sobre Mí",
    icon: User,
    color: "#3b82f6",
    description: "Full Stack Developer",
    content: "Ver más",
    index: 0,
    angle: 0,
    backgroundImage: "/compe.jpg" // Imagen de fondo para "Sobre Mí"
  },
  {
    id: "experience",
    title: "Experiencia",
    icon: Briefcase,
    color: "#10b981",
    description: "2+ años",
    content: "Ver más",
    index: 1,
    angle: 60,
    backgroundImage: "/Experiencia.jpg" // Descomenta y agrega tu imagen
  },
  {
    id: "skills",
    title: "Habilidades",
    icon: Code,
    color: "#8b5cf6",
    description: "Tecnologías",
    content: "Ver más",
    index: 2,
    angle: 120,
    backgroundImage: "/skills.jpg" // Descomenta y agrega tu imagen
  },
  {
    id: "projects",
    title: "Proyectos",
    icon: FolderOpen,
    color: "#ef4444",
    description: "Innovadores",
    content: "Ver más",
    index: 3,
    angle: 180,
    backgroundImage: "/proyectos.jpg" // Descomenta y agrega tu imagen
  },
  {
    id: "education",
    title: "Educación",
    icon: GraduationCap,
    color: "#6366f1",
    description: "Universidad ESPE",
    content: "Ver más",
    index: 4,
    angle: 240,
    backgroundImage: "/educacion.jpg" // Descomenta y agrega tu imagen
  },
  {
    id: "contact",
    title: "Contacto",
    icon: MessageCircle,
    color: "#f97316",
    description: "Conectemos",
    content: "Ver más",
    index: 5,
    angle: 300,
    backgroundImage: "/contacto.jpg" // Descomenta y agrega tu imagen
  }
]

// Componente individual para cada tarjeta del carrusel 3D con órbita fija
function FloatingCard({ card, cameraAngle }: { card: PortfolioCard, cameraAngle: number }) {
  const meshRef = useRef<THREE.Group>(null)
  const cardRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  // Función para manejar el clic en la tarjeta
  const handleCardClick = () => {
    // Mapear los IDs de las tarjetas a los IDs de las secciones
    const sectionMap: { [key: string]: string } = {
      'about': 'sobre-mi',
      'experience': 'experiencia', 
      'skills': 'habilidades',
      'projects': 'proyectos',
      'education': 'educacion',
      'contact': 'contacto'
    }
    
    const targetSection = sectionMap[card.id]
    if (targetSection) {
      // Scroll suave a la sección correspondiente
      const element = document.getElementById(targetSection)
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      }
    }
  }
  
  // Configuración del carrusel circular con órbita fija - radio aumentado para tarjetas más grandes
  const radius = 10 // Radio del círculo aumentado para acomodar tarjetas más grandes
  const centerPosition = [0, 0.5, 0] // Posición del centro (avatar) - más centrado
  
  // Posición fija de la tarjeta en el espacio 3D (NO rota con el avatar)
  const fixedAngle = card.angle // Ángulo fijo en el espacio
  const angleRad = (fixedAngle * Math.PI) / 180
  
  // Posición fija en el círculo (coordenadas absolutas)
  const fixedX = centerPosition[0] + radius * Math.sin(angleRad)
  const fixedZ = centerPosition[2] + radius * Math.cos(angleRad)
  
  // Calcular qué tan cerca está esta tarjeta de estar frente a la cámara
  // La cámara rota, pero las tarjetas mantienen posiciones fijas
  const cameraAngleRad = (cameraAngle * Math.PI) / 180
  
  // Distancia angular entre la dirección de la cámara y esta tarjeta
  // Mejorado para manejar mejor el cruce 0°/360°
  let angleDifference = Math.abs(fixedAngle - cameraAngle)
  if (angleDifference > 180) {
    angleDifference = 360 - angleDifference
  }
  const normalizedDiff = angleDifference
  
  // Determinar la visibilidad basada en la proximidad al centro de la vista
  const isCenter = normalizedDiff <= 15 // ±15° del centro de la vista
  const isSide = normalizedDiff > 15 && normalizedDiff <= 75 // Laterales visibles (rango más pequeño)
  const isBack = normalizedDiff > 75 // Atrás, completamente oculto (más estricto)
  
  // Calcular progreso suave para transiciones - crecimiento más notorio y elegante
  let centerProgress = 0
  
  // Solo aplicar escala en un rango pequeño pero con efecto más visible
  if (normalizedDiff <= 15) {
    centerProgress = Math.max(0, (15 - normalizedDiff) / 15) // Progreso de 0 a 1
    centerProgress = Math.min(centerProgress, 1) // Asegurar que nunca exceda 1
    
    // Escala mucho más grande y impactante - máximo 40% de crecimiento
    centerProgress = centerProgress * 0.40 // 40% de crecimiento máximo (mucho más notorio)
  }
  
  // Calcular la posición Y para el efecto de carrusel vertical (pantalla completa) - más suave
  let verticalOffset = 0
  let cardOpacity = 1.0
  
  // Si está detrás, ocultar completamente
  if (isBack) {
    cardOpacity = 0
  } else {
    // Definir zonas del carrusel vertical - transiciones más suaves y elegantes
    if (normalizedDiff <= 75) {
      // Zona de entrada más amplia: viene desde muy abajo de la pantalla completa
      const enterProgress = Math.max(0, (75 - normalizedDiff) / 75) // De 0 a 1 (rango más amplio)
      // Curva suave para entrada más elegante
      const smoothEnterProgress = 1 - Math.pow(1 - enterProgress, 3) // Curva cúbica suave
      verticalOffset = (1 - smoothEnterProgress) * -15 // Viene desde -15 unidades
      cardOpacity = smoothEnterProgress // Aparece gradualmente con curva suave
    }
  }
  
  const sideProgress = isSide ? Math.max(0, (90 - normalizedDiff) / 60) : 0
  const backProgress = isBack ? Math.max(0, (180 - normalizedDiff) / 90) : 0

  // Debug para verificar el carrusel vertical de pantalla completa
  if (card.title === "Experiencia") {
    console.log(`${card.title} - normalizedDiff: ${normalizedDiff.toFixed(1)}, verticalOffset: ${verticalOffset.toFixed(2)}, opacity: ${cardOpacity.toFixed(2)}`)
  }

  // Animaciones con GSAP cuando cambia el estado
  useEffect(() => {
    if (!gsap) return

  // Las animaciones ahora se manejan directamente en el render
  // Solo necesitamos detectar cuando cambia el estado para re-renderizar

  }, [isCenter, centerProgress]) // Dependencias simplificadas

  useFrame((state) => {
    if (meshRef.current && cardRef.current) {
      const time = state.clock.elapsedTime
      
      // Posición fija en el espacio 3D con efecto de carrusel vertical
      const finalY = centerPosition[1] + verticalOffset // Aplicar desplazamiento vertical
      
      // Flotación suave y elegante para la card central - más pronunciada
      let floatOffset = 0
      if (isCenter && centerProgress > 0) {
        floatOffset = Math.sin(time * 0.8) * 0.2 * centerProgress // Flotación más pronunciada
      }
      
      // Elevación adicional mucho más notoria para la tarjeta central
      const elevationOffset = centerProgress * 0.8 // Eleva la tarjeta 0.8 unidades cuando está centrada (mucho más notorio)
      
      // Aplicar posición fija (las tarjetas no siguen al avatar)
      meshRef.current.position.set(fixedX, finalY + floatOffset + elevationOffset, fixedZ)
      
      // Las tarjetas siempre miran hacia afuera (hacia la cámara/usuario)
      // Calcular el ángulo para que miren desde el centro hacia afuera
      const cardPosition = new THREE.Vector3(fixedX, finalY + floatOffset, fixedZ)
      const centerPos = new THREE.Vector3(centerPosition[0], finalY, centerPosition[2])
      const direction = cardPosition.sub(centerPos).normalize()
      const targetRotationY = Math.atan2(direction.x, direction.z)
      
      meshRef.current.rotation.y = targetRotationY
    }
  })

  const Icon = card.icon

  return (
    <group 
      ref={meshRef}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={handleCardClick}
      visible={!isBack && cardOpacity > 0} // Ocultar cuando está detrás del avatar O cuando opacidad es 0
    >
      {/* Tarjeta principal con proporciones correctas */}
      <mesh ref={cardRef}>
        <planeGeometry args={[4.5 * (1 + centerProgress * 0.1), 3.2 * (1 + centerProgress * 0.1)]} />
        <meshStandardMaterial 
          color="#ffffff"
          transparent
          opacity={0.1 * cardOpacity} // Muy transparente para que solo se vea el contenido HTML
          roughness={0.1 - (centerProgress * 0.08)} // Superficie más pulida cuando está centrada
          metalness={0.1 + (centerProgress * 0.15)} // Efecto metálico más notorio cuando está centrada
        />
      </mesh>

      {/* Contenido HTML con perspectiva 3D corregida */}
      <Html
        position={[0, 0, 0.01]} // Posición más cerca del mesh
        transform
        occlude
        style={{
          width: `${260}px`, // Tamaño fijo 
          height: `${180}px`, // Altura fija 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: card.backgroundImage ? '#ffffff' : '#1f2937', // Texto blanco si hay imagen de fondo
          textAlign: 'center',
          padding: '0', // Sin padding para que la imagen llene todo
          pointerEvents: 'auto', // Habilitar eventos de puntero para clic
          opacity: cardOpacity, // Aplicar opacidad del carrusel vertical
          background: card.backgroundImage 
            ? `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${card.backgroundImage})`
            : 'rgba(255, 255, 255, 0.85)', // Ligeramente más transparente
          backgroundSize: card.backgroundImage ? 'cover' : 'auto',
          backgroundPosition: card.backgroundImage ? 'center' : 'initial',
          backgroundRepeat: card.backgroundImage ? 'no-repeat' : 'initial',
          borderRadius: '12px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          overflow: 'hidden',
          border: 'none',
          boxSizing: 'border-box',
          transform: `scale(${1 + centerProgress * 0.15})`, // Escala aplicada aquí
          transition: 'transform 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)', // Transición más suave y elegante
          boxShadow: centerProgress > 0 
            ? `0 ${8 + centerProgress * 20}px ${16 + centerProgress * 30}px rgba(0, 0, 0, 0.2)` 
            : card.backgroundImage 
              ? '0 4px 8px rgba(0, 0, 0, 0.15)' 
              : '0 2px 4px rgba(0, 0, 0, 0.1)', // Sombra elegante
          cursor: 'pointer', // Mostrar cursor de puntero
        }}
        onClick={handleCardClick}
      >
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          boxSizing: 'border-box',
        }}>
          {/* Icono con efecto 3D */}
          <div style={{
            marginBottom: '10px',
            padding: '10px',
            borderRadius: '50%',
            background: card.backgroundImage 
              ? `rgba(255, 255, 255, 0.15)` 
              : `${card.color}20`, // Fondo transparente si hay imagen, color de la card si no
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: card.backgroundImage ? 'blur(4px)' : 'none',
            border: card.backgroundImage ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
            boxShadow: card.backgroundImage 
              ? `0 4px 12px rgba(0, 0, 0, 0.3)` 
              : `0 2px 8px ${card.color}30`,
          }}>
            <Icon 
              size={20}
              color={card.backgroundImage ? '#ffffff' : card.color}
            />
          </div>

          {/* Título */}
          <h2 style={{
            fontSize: '15px',
            fontWeight: '700',
            margin: '0 0 6px 0',
            color: card.backgroundImage ? '#ffffff' : '#1f2937',
            letterSpacing: '-0.2px',
            textShadow: card.backgroundImage ? '1px 1px 3px rgba(0, 0, 0, 0.7)' : 'none',
          }}>
            {card.title}
          </h2>

          {/* Descripción */}
          <p style={{
            fontSize: '10px',
            color: card.backgroundImage ? 'rgba(255, 255, 255, 0.9)' : '#6b7280',
            margin: '0 0 8px 0',
            fontWeight: '500',
            lineHeight: '1.2',
            textShadow: card.backgroundImage ? '1px 1px 2px rgba(0, 0, 0, 0.7)' : 'none',
          }}>
            {card.description}
          </p>

          {/* Contenido / Botón "Ver más" */}
          <div style={{
            fontSize: '8px',
            color: card.backgroundImage ? 'rgba(255, 255, 255, 0.9)' : '#374151',
            margin: '0',
            lineHeight: '1.3',
            maxWidth: '90%',
            wordWrap: 'break-word',
            textShadow: card.backgroundImage ? '1px 1px 2px rgba(0, 0, 0, 0.7)' : 'none',
            padding: '4px 8px',
            border: card.backgroundImage 
              ? '1px solid rgba(255, 255, 255, 0.3)' 
              : `1px solid ${card.color}40`,
            borderRadius: '12px',
            background: card.backgroundImage 
              ? 'rgba(255, 255, 255, 0.1)' 
              : `${card.color}10`,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            backdropFilter: card.backgroundImage ? 'blur(2px)' : 'none',
            fontWeight: '600',
            textAlign: 'center' as const,
          }}>
            {card.content}
          </div>

          {/* Línea decorativa */}
          <div style={{
            width: '20px',
            height: '2px',
            background: card.backgroundImage 
              ? 'linear-gradient(90deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.3))' 
              : `linear-gradient(90deg, ${card.color}, ${card.color}60)`,
            margin: '10px auto 0',
            borderRadius: '1px',
            boxShadow: card.backgroundImage ? '0 1px 2px rgba(0, 0, 0, 0.5)' : 'none',
          }} />
        </div>
      </Html>
    </group>
  )
}

// Componente principal que contiene todas las tarjetas flotantes
export function FloatingCards({ cameraAngle }: { cameraAngle: number }) {
  return (
    <>
      {portfolioCards.map((card, index) => (
        <FloatingCard
          key={card.id}
          card={card}
          cameraAngle={cameraAngle}
        />
      ))}
    </>
  )
}
