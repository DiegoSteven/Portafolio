"use client"

import { useState, useEffect } from "react"

interface LoadingScreenProps {
  onLoadingComplete?: () => void
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [loadingText, setLoadingText] = useState("Cargando...")

  // Textos de carga dinámicos
  const loadingTexts = [
    "Inicializando portafolio...",
    "Cargando modelos 3D...",
    "Preparando experiencia...",
    "Configurando animaciones...",
    "Casi listo...",
    "¡Completado!"
  ]

  useEffect(() => {
    const duration = 1500 // Reducido a 1.5 segundos
    const interval = 50 // Actualizar cada 50ms
    const steps = duration / interval
    const increment = 100 / steps

    let currentProgress = 0
    let textIndex = 0

    const timer = setInterval(() => {
      currentProgress += increment
      setProgress(Math.min(currentProgress, 100))

      // Cambiar texto basado en el progreso
      const newTextIndex = Math.floor((currentProgress / 100) * loadingTexts.length)
      if (newTextIndex !== textIndex && newTextIndex < loadingTexts.length) {
        textIndex = newTextIndex
        setLoadingText(loadingTexts[textIndex])
      }

      if (currentProgress >= 100) {
        clearInterval(timer)
        setIsComplete(true)
        
        // Esperar un poco antes de completar
        setTimeout(() => {
          onLoadingComplete?.()
        }, 500)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [onLoadingComplete])

  if (isComplete) return null

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 transition-opacity duration-500 ${
        isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Fondo animado */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_center,rgba(147,51,234,0.1),transparent_60deg,rgba(59,130,246,0.1),transparent_120deg,rgba(147,51,234,0.1))] animate-spin" 
             style={{ animationDuration: '10s' }} />
      </div>

      {/* Contenido del loading */}
      <div className="relative z-10 flex flex-col items-center space-y-8 px-8 animate-fade-in">
        {/* Logo/Avatar animado */}
        <div className="relative animate-bounce-slow">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center animate-spin" 
                 style={{ animationDuration: '2s' }}>
              <div className="w-8 h-8 rounded-full bg-white" />
            </div>
          </div>
          
          {/* Anillos animados alrededor */}
          <div className="absolute inset-0 rounded-full border-2 border-purple-400/30 border-t-purple-400 animate-spin" 
               style={{ animationDuration: '3s', animationDirection: 'reverse' }} />
          <div className="absolute -inset-2 rounded-full border border-blue-400/20 border-b-blue-400 animate-spin" 
               style={{ animationDuration: '4s' }} />
        </div>

        {/* Título */}
        <div className="text-center animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">
            Diego Steven
          </h1>
          <p className="text-white/80 text-lg">Full Stack Developer</p>
        </div>

        {/* Barra de progreso */}
        <div className="w-full max-w-md animate-slide-up" style={{ animationDelay: '1s' }}>
          {/* Texto de carga */}
          <p className="text-white/70 text-sm mb-4 text-center font-medium transition-all duration-300">
            {loadingText}
          </p>

          {/* Contenedor de la barra */}
          <div className="relative">
            {/* Fondo de la barra */}
            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/20">
              {/* Barra de progreso */}
              <div
                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full relative overflow-hidden transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              >
                {/* Efecto de brillo que se mueve */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </div>
            </div>

            {/* Porcentaje */}
            <div className="absolute -top-8 right-0 text-white/80 text-sm font-medium">
              {Math.round(progress)}%
            </div>
          </div>
        </div>
      </div>

      {/* Partículas de fondo con posiciones fijas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { left: 10, top: 20, duration: 3, delay: 0.5 },
          { left: 30, top: 80, duration: 4, delay: 1.2 },
          { left: 60, top: 30, duration: 2.5, delay: 0.8 },
          { left: 80, top: 70, duration: 3.5, delay: 1.8 },
          { left: 25, top: 50, duration: 4.2, delay: 0.3 },
          { left: 70, top: 15, duration: 2.8, delay: 1.5 },
          { left: 45, top: 90, duration: 3.8, delay: 0.7 },
          { left: 85, top: 40, duration: 2.2, delay: 1.0 },
          { left: 15, top: 65, duration: 4.5, delay: 0.2 },
          { left: 95, top: 25, duration: 3.2, delay: 1.7 },
          { left: 35, top: 10, duration: 2.7, delay: 0.9 },
          { left: 75, top: 85, duration: 4.1, delay: 0.4 },
          { left: 5, top: 45, duration: 3.6, delay: 1.3 },
          { left: 55, top: 75, duration: 2.9, delay: 0.6 },
          { left: 90, top: 55, duration: 3.3, delay: 1.1 },
          { left: 20, top: 35, duration: 4.8, delay: 0.1 },
          { left: 65, top: 95, duration: 2.4, delay: 1.6 },
          { left: 40, top: 5, duration: 3.7, delay: 0.8 },
          { left: 82, top: 60, duration: 2.6, delay: 1.4 },
          { left: 12, top: 82, duration: 4.3, delay: 0.5 }
        ].map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-float opacity-60"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) opacity(0.6); }
          50% { transform: translateY(-20px) opacity(1); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out both;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 1.5s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
