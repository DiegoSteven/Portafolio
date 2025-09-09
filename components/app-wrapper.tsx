"use client"

import { useState, useEffect } from "react"
import { LoadingScreen } from "./loading-screen"

interface AppWrapperProps {
  children: React.ReactNode
}

export function AppWrapper({ children }: AppWrapperProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  const handleLoadingComplete = () => {
    // Pequeño delay para asegurar transición suave
    setTimeout(() => {
      setIsLoading(false)
      // Mostrar contenido después de que se oculte la pantalla de carga
      setTimeout(() => {
        setShowContent(true)
      }, 100)
    }, 200)
  }

  return (
    <div className="bg-slate-900 min-h-screen">
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      {!isLoading && (
        <div className={`transition-opacity duration-700 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
          {children}
        </div>
      )}
    </div>
  )
}
