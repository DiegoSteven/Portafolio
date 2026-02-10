"use client"

import { useRef, useState, useEffect, useMemo } from "react"
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
function FloatingCard({ card, cameraAngle }: { 
  card: PortfolioCard, 
  cameraAngle: number
}) {
  const meshRef = useRef<THREE.Group>(null)
  const cardRef = useRef<THREE.Mesh>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // Función para manejar el clic en la tarjeta
  const handleCardClick = () => {
    // Disparar evento personalizado para cada tarjeta
    const eventMap: { [key: string]: string } = {
      'about': 'openAboutModal',
      'experience': 'openExperienceModal',
      'skills': 'openSkillsModal',
      'projects': 'openProjectsModal',
      'education': 'openEducationModal',
      'contact': 'openContactModal'
    }
    
    const eventName = eventMap[card.id]
    if (eventName) {
      const event = new CustomEvent(eventName)
      window.dispatchEvent(event)
    }
  }
  
  // Configuración del carrusel circular optimizada para móviles (memo para evitar recálculo)
  const { radius, centerPosition, fixedX, fixedZ, fixedAngle } = useMemo(() => {
    const r = isMobile ? 8 : 10
    const center = [0, 2, 0] as const
    const angle = card.angle
    const angleRad = (angle * Math.PI) / 180
    return {
      radius: r,
      centerPosition: center,
      fixedX: center[0] + r * Math.sin(angleRad),
      fixedZ: center[2] + r * Math.cos(angleRad),
      fixedAngle: angle,
    }
  }, [card.angle, isMobile])
  
  // Calcular qué tan cerca está esta tarjeta de estar frente a la cámara
  // La cámara rota, pero las tarjetas mantienen posiciones fijas
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
  
  // Progreso para estado centrado (sin escalar demasiado para evitar pixelación)
  let centerProgress = 0
  if (normalizedDiff <= 15) {
    centerProgress = Math.max(0, (15 - normalizedDiff) / 15)
    centerProgress = Math.min(centerProgress, 1)
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
  
  // Animaciones con GSAP cuando cambia el estado
  useEffect(() => {
    if (!gsap) return
    // Las animaciones se manejan en el render; mantenemos este efecto vacío para conservar la carga perezosa sin spamear renders
  }, [isCenter, centerProgress])

  useFrame((state) => {
    if (meshRef.current && cardRef.current) {
      const time = state.clock.elapsedTime
      
      // Posición fija en el espacio 3D con efecto de carrusel vertical
      const finalY = centerPosition[1] + verticalOffset // Aplicar desplazamiento vertical
      
      // Flotación suave y discreta para no marear ni desenfocar
      let floatOffset = 0
      if (isCenter && centerProgress > 0) {
        floatOffset = Math.sin(time * 0.8) * 0.12 * centerProgress
      }
      
      // Elevación adicional mucho más notoria para la tarjeta central
      const elevationOffset = centerProgress * 0.45 // Elevación moderada
      
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
        distanceFactor={isMobile ? 10 : 11}
        // Desactivar oclusión para ahorrar cálculos de raycasting
        occlude={false}
        style={{
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
          touchAction: 'manipulation',
          width: `${isMobile ? 190 : 230}px`, // Menor tamaño para no escalar y evitar pixelación
          height: `${isMobile ? 132 : 158}px`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: card.backgroundImage ? '#f8fafc' : '#111827', // Texto más claro para contraste
          textAlign: 'center',
          padding: '0', // Sin padding para que la imagen llene todo
          pointerEvents: 'auto', // Habilitar eventos de puntero para clic
          opacity: cardOpacity, // Aplicar opacidad del carrusel vertical
          background: card.backgroundImage 
            ? `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.35)), url(${card.backgroundImage})`
            : 'rgba(255, 255, 255, 0.9)', // Más sólido para que el texto sea nítido
          backgroundSize: card.backgroundImage ? 'cover' : 'auto',
          backgroundPosition: card.backgroundImage ? 'center' : 'initial',
          backgroundRepeat: card.backgroundImage ? 'no-repeat' : 'initial',
          borderRadius: '12px',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          overflow: 'hidden',
          border: 'none',
          boxSizing: 'border-box',
          transform: `scale(${isCenter ? 1 : 0.92})`, // Centro nítido, laterales más pequeños
          transition: 'transform 0.5s ease, opacity 0.5s ease',
          boxShadow: centerProgress > 0 
            ? `0 ${8 + centerProgress * 20}px ${16 + centerProgress * 30}px rgba(0, 0, 0, 0.2)` 
            : card.backgroundImage 
              ? '0 4px 8px rgba(0, 0, 0, 0.15)' 
              : '0 2px 4px rgba(0, 0, 0, 0.1)', // Sombra elegante
          cursor: 'pointer', // Mostrar cursor de puntero
          imageRendering: 'auto',
          filter: 'none',
          willChange: 'transform, opacity',
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
            backdropFilter: 'none',
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
            fontWeight: '800',
            margin: '0 0 6px 0',
            color: card.backgroundImage ? '#ffffff' : '#0f172a',
            letterSpacing: '-0.25px',
            textShadow: card.backgroundImage ? '0 1px 2px rgba(0, 0, 0, 0.55)' : 'none',
          }}>
            {card.title}
          </h2>

          {/* Descripción */}
          <p style={{
            fontSize: '11px',
            color: card.backgroundImage ? 'rgba(255, 255, 255, 0.94)' : '#475569',
            margin: '0 0 8px 0',
            fontWeight: '600',
            lineHeight: '1.3',
            textShadow: card.backgroundImage ? '0 1px 2px rgba(0, 0, 0, 0.6)' : 'none',
          }}>
            {card.description}
          </p>

          {/* Contenido / Botón "Ver más" */}
          <div 
            style={{
              fontSize: '9px',
              color: card.backgroundImage ? 'rgba(255, 255, 255, 0.95)' : '#1f2937',
              margin: '0',
              lineHeight: '1.3',
              maxWidth: '90%',
              wordWrap: 'break-word',
              textShadow: card.backgroundImage ? '0 1px 2px rgba(0, 0, 0, 0.6)' : 'none',
              padding: '5px 10px',
              border: card.backgroundImage 
                ? '1px solid rgba(255, 255, 255, 0.35)' 
                : `1px solid ${card.color}40`,
              borderRadius: '12px',
              background: card.backgroundImage 
                ? 'rgba(0, 0, 0, 0.25)' 
                : `${card.color}12`,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              backdropFilter: 'none',
              fontWeight: '700',
              textAlign: 'center' as const,
              userSelect: 'none',
            }}
            onClick={(e) => {
              e.stopPropagation()
              handleCardClick()
            }}
          >
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
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Escuchar eventos de navegación desde el navbar
    const handleNavigateToCard = (event: CustomEvent) => {
      const { cardId } = event.detail
      navigateToCard(cardId)
    }

    window.addEventListener('navigateToCard', handleNavigateToCard as EventListener)
    
    return () => {
      window.removeEventListener('navigateToCard', handleNavigateToCard as EventListener)
    }
  }, [])

  const navigateToCard = (cardId: string) => {
    const targetCard = portfolioCards.find(card => card.id === cardId)
    if (!targetCard) return

    // Encontrar el índice de la tarjeta objetivo
    const cardIndex = portfolioCards.findIndex(card => card.id === cardId)
    
    // En lugar de calcular ángulos, enviar directamente el índice
    // para que model-3d.tsx maneje la rotación natural
    window.dispatchEvent(new CustomEvent('rotateCamera', {
      detail: { 
        targetCard: cardIndex
      }
    }))
  }

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
