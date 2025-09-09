"use client"

import { useState, useEffect } from 'react'

export function useModelLoadingProgress() {
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simular progreso de carga realista
    const steps = [
      { progress: 20, delay: 200, text: "Conectando..." },
      { progress: 40, delay: 500, text: "Descargando modelo..." },
      { progress: 70, delay: 800, text: "Procesando texturas..." },
      { progress: 90, delay: 400, text: "Optimizando..." },
      { progress: 100, delay: 200, text: "¡Listo!" }
    ]

    let currentStep = 0
    
    const runStep = () => {
      if (currentStep < steps.length) {
        const step = steps[currentStep]
        setTimeout(() => {
          setProgress(step.progress)
          if (step.progress === 100) {
            setTimeout(() => setIsLoading(false), 300)
          } else {
            currentStep++
            runStep()
          }
        }, step.delay)
      }
    }

    runStep()
  }, [])

  return { progress, isLoading }
}
