"use client"

import { useState, useEffect, useCallback } from "react"

const LOADING_TEXTS = [
  "Iniciando...",
  "Cargando...",
  "Preparando...",
  "Configurando...",
  "Finalizando...",
  "Listo",
] as const

interface LoadingScreenProps {
  onLoadingComplete?: () => void
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<"loading" | "exiting">("loading")
  const [loadingText, setLoadingText] = useState("Cargando...")

  const finish = useCallback(() => {
    setPhase("exiting")
    globalThis.setTimeout(() => onLoadingComplete?.(), 480)
  }, [onLoadingComplete])

  useEffect(() => {
    const duration = 1500
    const interval = 50
    const steps = duration / interval
    const increment = 100 / steps

    let currentProgress = 0
    let textIndex = 0

    const timer = setInterval(() => {
      currentProgress += increment
      setProgress(Math.min(currentProgress, 100))

      const newTextIndex = Math.floor((currentProgress / 100) * LOADING_TEXTS.length)
      if (newTextIndex !== textIndex && newTextIndex < LOADING_TEXTS.length) {
        textIndex = newTextIndex
        setLoadingText(LOADING_TEXTS[textIndex])
      }

      if (currentProgress >= 100) {
        clearInterval(timer)
        setTimeout(finish, 180)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [finish])

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Cargando portafolio"
      className={`fixed inset-0 z-[100] flex items-center justify-center ease-out ${
        phase === "exiting" ? "pointer-events-none opacity-0 duration-500" : "opacity-100 duration-300"
      }`}
      style={{
        backgroundImage: "url(/cyberpunk.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgb(2 6 23)",
      }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div className="relative z-10 flex flex-col items-center space-y-12 px-8">
        <div className="relative">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-2xl backdrop-blur-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
              <div className="h-6 w-6 animate-pulse rounded-full bg-white" />
            </div>
          </div>
          <div
            className="absolute inset-0 animate-ping rounded-full border border-white/30"
            style={{ animationDuration: "2s" }}
          />
        </div>

        <div className="text-center">
          <h1 className="mb-2 text-3xl font-light tracking-wide text-white md:text-4xl">Diego Steven</h1>
          <p className="text-xs font-light uppercase tracking-wider text-white/60">Full Stack Developer</p>
        </div>

        <div className="w-80 max-w-md">
          <p className="mb-6 text-center text-xs font-light tracking-wide text-white/50">{loadingText}</p>
          <div className="relative">
            <div className="h-px w-full bg-white/20">
              <div
                className="relative h-full bg-white transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-0 h-1 w-1 rounded-full bg-white shadow-lg shadow-white/50" />
              </div>
            </div>
            <div className="absolute -top-6 right-0 text-xs font-light text-white/40">{Math.round(progress)}%</div>
          </div>
        </div>

        <div className="flex space-x-1">
          <div className="h-1 w-1 animate-bounce rounded-full bg-white/40" style={{ animationDelay: "0s" }} />
          <div className="h-1 w-1 animate-bounce rounded-full bg-white/40" style={{ animationDelay: "0.2s" }} />
          <div className="h-1 w-1 animate-bounce rounded-full bg-white/40" style={{ animationDelay: "0.4s" }} />
        </div>
      </div>
    </div>
  )
}
