"use client"

import { useState } from "react"
import { LoadingScreen } from "./loading-screen"

interface AppWrapperProps {
  children: React.ReactNode
}

export function AppWrapper({ children }: AppWrapperProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="relative min-h-screen bg-slate-950">
      {/* Siempre montado debajo del loader: evita el “flash” azul entre carga y contenido */}
      <div className="relative z-0 min-h-screen">{children}</div>
      {isLoading && (
        <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
      )}
    </div>
  )
}
