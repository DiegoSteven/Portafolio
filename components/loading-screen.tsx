"use client"

import { useState, useEffect } from "react"

interface LoadingScreenProps {
  onLoadingComplete?: () => void
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [loadingText, setLoadingText] = useState("Cargando...")

  // Textos de carga minimalistas
  const loadingTexts = [
    "Iniciando...",
    "Cargando...",
    "Preparando...",
    "Configurando...",
    "Finalizando...",
    "Listo"
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
        
        // Transición de salida más suave
        setTimeout(() => {
          setIsVisible(false)
          // Esperar a que termine la animación antes de notificar
          setTimeout(() => {
            onLoadingComplete?.()
          }, 400)
        }, 200)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [onLoadingComplete])

  if (!isVisible) return null

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-500 ease-in-out ${
        isComplete && !isVisible ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        backgroundImage: 'url(/cyberpunk.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay oscuro para suavizar el fondo */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Contenido minimalista */}
      <div className="relative z-10 flex flex-col items-center space-y-12 px-8">
        
        {/* Logo/Avatar minimalista */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-white animate-pulse" />
            </div>
          </div>
          
          {/* Anillo sutil animado */}
          <div className="absolute inset-0 rounded-full border border-white/30 animate-ping" 
               style={{ animationDuration: '2s' }} />
        </div>

        {/* Texto minimalista */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-light text-white mb-2 tracking-wide">
            Diego Steven
          </h1>
          <p className="text-white/60 text-sm font-light tracking-wider uppercase">
            Full Stack Developer
          </p>
        </div>

        {/* Barra de progreso minimalista */}
        <div className="w-80 max-w-md">
          {/* Texto de carga minimalista */}
          <p className="text-white/50 text-xs mb-6 text-center font-light tracking-wide">
            {loadingText}
          </p>

          {/* Barra de progreso simple */}
          <div className="relative">
            {/* Fondo de la barra */}
            <div className="w-full h-px bg-white/20">
              {/* Barra de progreso */}
              <div
                className="h-full bg-white transition-all duration-300 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                {/* Punto brillante en el extremo */}
                <div className="absolute right-0 top-0 w-1 h-1 bg-white rounded-full shadow-lg shadow-white/50" />
              </div>
            </div>

            {/* Porcentaje minimalista */}
            <div className="absolute -top-6 right-0 text-white/40 text-xs font-light">
              {Math.round(progress)}%
            </div>
          </div>
        </div>

        {/* Indicador de carga minimalista */}
        <div className="flex space-x-1">
          <div className="w-1 h-1 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="w-1 h-1 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <div className="w-1 h-1 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  )
}
