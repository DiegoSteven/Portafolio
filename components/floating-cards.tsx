"use client"

import { useRef, useState, useEffect, useMemo, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useFrame, useThree } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import * as THREE from "three"
import { User, Briefcase, Code, FolderOpen, GraduationCap, MessageCircle } from "lucide-react"
import { sectionHref } from "@/lib/section-routes"

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
function FloatingCard({ card }: { card: PortfolioCard }) {
  const meshRef = useRef<THREE.Group>(null)
  const cardRef = useRef<THREE.Mesh>(null)
  const htmlDynamicRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const { camera } = useThree()
  const cardPosTmp = useMemo(() => new THREE.Vector3(), [])
  const centerPosTmp = useMemo(() => new THREE.Vector3(), [])
  const lastHtmlStyle = useRef({
    opacity: -1,
    scale: -1,
    pointerEvents: "" as "auto" | "none",
    boxShadow: "",
  })

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  const router = useRouter()

  const handleCardClick = useCallback(() => {
    router.push(sectionHref(card.id))
  }, [card.id, router])
  
  // Configuración del carrusel circular optimizada para móviles (memo para evitar recálculo)
  const { centerPosition, fixedX, fixedZ, fixedAngle } = useMemo(() => {
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

  useFrame((state) => {
    const cameraAngle = Math.atan2(camera.position.x, camera.position.z) * (180 / Math.PI)

    let angleDifference = Math.abs(fixedAngle - cameraAngle)
    if (angleDifference > 180) angleDifference = 360 - angleDifference
    const normalizedDiff = angleDifference

    const isCenter = normalizedDiff <= 15
    const isBack = normalizedDiff > 75

    let centerProgress = 0
    if (normalizedDiff <= 15) {
      centerProgress = Math.min(Math.max(0, (15 - normalizedDiff) / 15), 1)
    }

    let verticalOffset = 0
    let cardOpacity = 1.0

    if (isBack) {
      cardOpacity = 0
    } else if (normalizedDiff <= 75) {
      const enterProgress = Math.max(0, (75 - normalizedDiff) / 75)
      const smoothEnterProgress = 1 - Math.pow(1 - enterProgress, 3)
      verticalOffset = (1 - smoothEnterProgress) * -15
      cardOpacity = smoothEnterProgress
    }

    if (meshRef.current && cardRef.current) {
      const time = state.clock.elapsedTime
      const finalY = centerPosition[1] + verticalOffset

      let floatOffset = 0
      if (isCenter && centerProgress > 0) {
        floatOffset = Math.sin(time * 0.8) * 0.12 * centerProgress
      }

      const elevationOffset = centerProgress * 0.45

      meshRef.current.position.set(fixedX, finalY + floatOffset + elevationOffset, fixedZ)

      cardPosTmp.set(fixedX, finalY + floatOffset, fixedZ)
      centerPosTmp.set(centerPosition[0], finalY, centerPosition[2])
      const direction = cardPosTmp.sub(centerPosTmp).normalize()
      meshRef.current.rotation.y = Math.atan2(direction.x, direction.z)

      // Sin planos “fantasma” al costado: el mesh solo cuando hay opacidad útil
      const showMesh = !isBack && cardOpacity > 0.2
      meshRef.current.visible = showMesh

      const mat = cardRef.current.material as THREE.MeshStandardMaterial
      mat.opacity = 0.1 * cardOpacity
      mat.roughness = 0.1 - centerProgress * 0.08
      mat.metalness = 0.1 + centerProgress * 0.15

      const s = 1 + centerProgress * 0.1
      cardRef.current.scale.set(s, s, 1)
    }

    const el = htmlDynamicRef.current
    if (el) {
      const scale = isCenter ? 1 : 0.92
      const pointerEvents: "auto" | "none" =
        isBack || cardOpacity <= 0 ? "none" : "auto"
      const boxShadow =
        centerProgress > 0
          ? `0 ${8 + centerProgress * 20}px ${16 + centerProgress * 30}px rgba(0, 0, 0, 0.2)`
          : card.backgroundImage
            ? "0 4px 8px rgba(0, 0, 0, 0.15)"
            : "0 2px 4px rgba(0, 0, 0, 0.1)"

      const prev = lastHtmlStyle.current
      if (
        Math.abs(prev.opacity - cardOpacity) > 0.004 ||
        Math.abs(prev.scale - scale) > 0.002 ||
        prev.pointerEvents !== pointerEvents ||
        prev.boxShadow !== boxShadow
      ) {
        el.style.opacity = String(cardOpacity)
        el.style.transform = `scale(${scale})`
        el.style.pointerEvents = pointerEvents
        el.style.transition = "none"
        el.style.boxShadow = boxShadow
        lastHtmlStyle.current = {
          opacity: cardOpacity,
          scale,
          pointerEvents,
          boxShadow,
        }
      }
    }
  })

  const Icon = card.icon

  return (
    <group ref={meshRef} onClick={handleCardClick}>
      {/* Geometría base; escala y material se actualizan en useFrame */}
      <mesh ref={cardRef}>
        <planeGeometry args={[4.5, 3.2]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.1}
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>

      <Html
        position={[0, 0, 0.01]}
        transform
        distanceFactor={isMobile ? 10 : 11}
        occlude={false}
        style={{
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
          touchAction: 'manipulation',
          width: `${isMobile ? 190 : 230}px`,
          height: `${isMobile ? 132 : 158}px`,
          padding: '0',
          pointerEvents: 'auto',
          border: 'none',
          boxSizing: 'border-box',
          cursor: 'pointer',
          imageRendering: 'auto',
          filter: 'none',
        }}
        onClick={handleCardClick}
      >
        <div
          ref={htmlDynamicRef}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: card.backgroundImage ? '#f8fafc' : '#111827',
            textAlign: 'center',
            padding: '16px',
            boxSizing: 'border-box',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            overflow: 'hidden',
            borderRadius: '12px',
            background: card.backgroundImage
              ? `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.35)), url(${card.backgroundImage})`
              : 'rgba(255, 255, 255, 0.9)',
            backgroundSize: card.backgroundImage ? 'cover' : 'auto',
            backgroundPosition: card.backgroundImage ? 'center' : 'initial',
            backgroundRepeat: card.backgroundImage ? 'no-repeat' : 'initial',
            opacity: 1,
            transform: 'scale(1)',
            transition: 'none',
            boxShadow: card.backgroundImage
              ? '0 4px 8px rgba(0, 0, 0, 0.15)'
              : '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
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
export function FloatingCards() {
  return (
    <>
      {portfolioCards.map((card, index) => (
        <FloatingCard key={card.id} card={card} />
      ))}
    </>
  )
}
