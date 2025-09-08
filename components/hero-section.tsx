"use client"

import { useEffect, useState, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Text, Html } from "@react-three/drei"
import { User, Briefcase, Code, FolderOpen, GraduationCap, MessageCircle, X, Github, Linkedin, Mail } from "lucide-react"
import { Model3D } from "./model-3d"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import * as THREE from "three"

interface CardData {
  id: string
  title: string
  icon: any
  color: string
  position: [number, number, number]
  description: string
  content: any
}

// Componente para las cards flotantes en 3D
function FloatingCard({ card, onClick, isSelected }: { card: CardData, onClick: () => void, isSelected: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      // Rotación suave y movimiento flotante
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.position.y = card.position[1] + Math.sin(state.clock.elapsedTime * 0.8 + card.position[0]) * 0.2
      
      // Efecto de hover
      const targetScale = hovered ? 1.1 : 1
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })

  const Icon = card.icon

  return (
    <group position={card.position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[2, 2.5, 0.1]} />
        <meshStandardMaterial 
          color={hovered ? "#ffffff" : card.color} 
          transparent 
          opacity={0.9}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
      
      <Html
        position={[0, 0, 0.06]}
        transform
        occlude
        style={{
          width: '180px',
          height: '220px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          padding: '20px',
          pointerEvents: 'none'
        }}
      >
        <Icon size={32} className="mb-3" />
        <h3 className="text-lg font-bold mb-2">{card.title}</h3>
        <p className="text-sm opacity-80">{card.description}</p>
      </Html>
    </group>
  )
}

// Componente del modelo 3D integrado
function Scene3D({ cards, onCardClick, selectedCard }: { 
  cards: CardData[], 
  onCardClick: (card: CardData) => void, 
  selectedCard: CardData | null 
}) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <pointLight position={[-10, 0, 5]} intensity={0.3} color="#4f46e5" />
      <pointLight position={[10, 0, -5]} intensity={0.3} color="#ec4899" />
      
      {/* Modelo 3D central */}
      <group position={[0, -1, 0]}>
        <Model3DIntegrated />
      </group>
      
      {/* Cards flotantes alrededor del modelo */}
      {cards.map((card) => (
        <FloatingCard
          key={card.id}
          card={card}
          onClick={() => onCardClick(card)}
          isSelected={selectedCard?.id === card.id}
        />
      ))}
      
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={8}
        maxDistance={15}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 6}
        autoRotate={true}
        autoRotateSpeed={0.5}
        dampingFactor={0.05}
        enableDamping={true}
      />
    </>
  )
}

// Modelo 3D simplificado para la escena
function Model3DIntegrated() {
  const { scene } = useGLTF("https://models.readyplayer.me/68bed93f8c3845189bf7688e.glb")
  const modelRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.002
    }
  })

  return (
    <group ref={modelRef}>
      <primitive object={scene} scale={1.8} position={[0, 0, 0]} />
    </group>
  )
}

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const cards: CardData[] = [
    {
      id: "about",
      title: "Sobre Mí",
      icon: User,
      color: "#3b82f6",
      position: [-4, 2, 2],
      description: "Conoce mi historia",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Soy Diego Steven Hidalgo, estudiante de Ingeniería en Software en la Universidad de las Fuerzas
            Armadas ESPE. Me especializo en desarrollo Full Stack con experiencia en frameworks como Laravel,
            React, Vue.js y Spring Boot.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Tengo experiencia práctica desarrollando microservicios, APIs REST y aplicaciones móviles con Flutter.
            He trabajado con bases de datos SQL y NoSQL, servicios en la nube y contenedores Docker.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-6">
            {[
              { label: "Experiencia", value: "1+ años" },
              { label: "Proyectos", value: "10+" },
              { label: "Tecnologías", value: "15+" },
              { label: "Pasantías", value: "2" },
            ].map((item, index) => (
              <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-xl font-bold text-blue-600">{item.value}</div>
                <div className="text-sm text-gray-600">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "experience",
      title: "Experiencia",
      icon: Briefcase,
      color: "#10b981",
      position: [4, 2, 1],
      description: "Mi trayectoria profesional",
      content: (
        <div className="space-y-6">
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-bold text-lg">Programador Frontend</h3>
            <p className="text-green-600 font-medium">Magdata Solutions</p>
            <p className="text-sm text-gray-500 mb-2">Noviembre 2024 – Febrero 2025</p>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Desarrollo frontend con Vue.js y Quasar</li>
              <li>• Integración de APIs con MongoDB</li>
              <li>• Aplicación web para reserva de citas de mascotas</li>
            </ul>
          </div>
          
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-bold text-lg">Programador Backend</h3>
            <p className="text-blue-600 font-medium">GAD Municipal de Salcedo</p>
            <p className="text-sm text-gray-500 mb-2">Febrero 2024 – Mayo 2024</p>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Desarrollo de microservicios con Spring Boot</li>
              <li>• Migración de bases de datos FoxPro a MariaDB</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: "skills",
      title: "Habilidades",
      icon: Code,
      color: "#8b5cf6",
      position: [-3, 0, 4],
      description: "Tecnologías que domino",
      content: (
        <div className="space-y-4">
          <div>
            <h3 className="font-bold mb-2 text-purple-600">Frontend</h3>
            <div className="flex flex-wrap gap-2">
              {["React", "Vue.js", "Next.js", "TypeScript", "Tailwind CSS"].map(skill => (
                <span key={skill} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">{skill}</span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-2 text-blue-600">Backend</h3>
            <div className="flex flex-wrap gap-2">
              {["Spring Boot", "Node.js", "PHP", "Laravel", "FastAPI"].map(skill => (
                <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: "projects",
      title: "Proyectos",
      icon: FolderOpen,
      color: "#ef4444",
      position: [3, 0, 4],
      description: "Mis trabajos destacados",
      content: (
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-bold text-lg mb-2">AnalytiCore - Análisis de Texto con IA</h3>
            <p className="text-gray-700 text-sm mb-3">
              Aplicación web que utiliza IA para análisis de sentimiento de texto.
            </p>
            <div className="flex gap-2">
              <a href="https://frontend-service-ppt4.onrender.com/" target="_blank" className="text-blue-600 text-sm hover:underline">Ver Demo</a>
              <a href="https://github.com/DiegoSteven/AnalytiCore.git" target="_blank" className="text-gray-600 text-sm hover:underline">GitHub</a>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "education",
      title: "Educación",
      icon: GraduationCap,
      color: "#6366f1",
      position: [-4, -2, 2],
      description: "Mi formación académica",
      content: (
        <div className="space-y-4">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h3 className="font-bold text-lg">Ingeniería en Software</h3>
            <p className="text-indigo-600 font-medium">Universidad de las Fuerzas Armadas ESPE</p>
            <p className="text-sm text-gray-500 mb-2">2021 - Presente</p>
          </div>
        </div>
      )
    },
    {
      id: "contact",
      title: "Contacto",
      icon: MessageCircle,
      color: "#f97316",
      position: [4, -2, 1],
      description: "Conectemos",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            ¿Interesado en trabajar juntos? ¡Me encantaría escuchar sobre tu proyecto!
          </p>
          
          <div className="space-y-3">
            <a href="mailto:diegoshh582@gmail.com" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <Mail className="text-orange-500" size={20} />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-gray-600">diegoshh582@gmail.com</p>
              </div>
            </a>
          </div>
        </div>
      )
    }
  ]

  return (
    <section id="inicio" className="h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      {/* Header con el nombre */}
      <div className="absolute top-0 left-0 right-0 z-20 p-8">
        <div className="text-center">
          <h1 
            className={`text-4xl md:text-6xl font-bold text-white mb-2 transform transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            Diego Steven
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Hidalgo
            </span>
          </h1>
          <p 
            className={`text-lg md:text-xl text-gray-300 transform transition-all duration-1000 delay-300 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            Full Stack Developer & Software Engineering Student
          </p>
        </div>
      </div>

      {/* Escena 3D principal */}
      <div className="w-full h-full">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 60 }}
          style={{ background: "transparent" }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <Scene3D 
            cards={cards} 
            onCardClick={setSelectedCard} 
            selectedCard={selectedCard} 
          />
        </Canvas>
      </div>

      {/* Controles de la cámara - instrucciones */}
      <div className="absolute bottom-4 left-4 text-white/60 text-sm z-20">
        <p>Arrastra para rotar • Scroll para zoom</p>
      </div>

      {/* Social links en la esquina */}
      <div className="absolute bottom-4 right-4 flex gap-3 z-20">
        <a
          href="https://github.com/DiegoSteven"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-all duration-300"
        >
          <Github size={18} />
        </a>
        <a
          href="https://www.linkedin.com/in/diego-hidalgo-152a15182"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-all duration-300"
        >
          <Linkedin size={18} />
        </a>
        <a
          href="mailto:diegoshh582@gmail.com"
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-all duration-300"
        >
          <Mail size={18} />
        </a>
      </div>

      {/* Modal para contenido expandido */}
      {selectedCard && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-4xl max-h-[80vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <selectedCard.icon className="text-gray-700" size={24} />
                {selectedCard.title}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCard(null)}
                className="h-8 w-8 p-0"
              >
                <X size={16} />
              </Button>
            </CardHeader>
            <CardContent>
              {selectedCard.content}
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  )
}

// Preload del modelo
import { useGLTF } from "@react-three/drei"
useGLTF.preload("https://models.readyplayer.me/68bed93f8c3845189bf7688e.glb")
