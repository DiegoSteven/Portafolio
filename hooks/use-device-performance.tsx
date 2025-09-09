"use client"

import { useState, useEffect } from "react"

interface DeviceInfo {
  isLowEnd: boolean
  isMobile: boolean
  memoryGB: number
  cores: number
  connectionSpeed: string
}

export function useDevicePerformance() {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isLowEnd: false,
    isMobile: false,
    memoryGB: 4,
    cores: 4,
    connectionSpeed: 'unknown'
  })

  const [performanceScore, setPerformanceScore] = useState(100)

  useEffect(() => {
    const detectDevice = async () => {
      // Detectar si es móvil
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      
      // Detectar memoria RAM (si está disponible)
      let memoryGB = 4 // Default fallback
      if ('deviceMemory' in navigator) {
        memoryGB = (navigator as any).deviceMemory
      }

      // Detectar número de cores
      let cores = navigator.hardwareConcurrency || 4

      // Detectar velocidad de conexión
      let connectionSpeed = 'unknown'
      if ('connection' in navigator) {
        const connection = (navigator as any).connection
        connectionSpeed = connection.effectiveType || 'unknown'
      }

      // Test de rendimiento simple
      const performanceTest = () => {
        const start = performance.now()
        
        // Operación intensiva simple para medir rendimiento
        let result = 0
        for (let i = 0; i < 100000; i++) {
          result += Math.sqrt(i) * Math.sin(i)
        }
        
        const end = performance.now()
        return end - start
      }

      const testTime = performanceTest()
      const score = Math.max(0, Math.min(100, 100 - (testTime - 10) * 2))

      // Determinar si es dispositivo de gama baja
      const isLowEnd = 
        memoryGB <= 3 || // 3GB RAM o menos
        cores <= 4 || // 4 cores o menos
        testTime > 50 || // Test de rendimiento lento
        connectionSpeed === '2g' || connectionSpeed === 'slow-2g' ||
        (isMobile && (
          /Android [1-6]\./i.test(navigator.userAgent) || // Android viejo
          /iPhone OS [1-9]_/i.test(navigator.userAgent) || // iOS viejo
          navigator.userAgent.includes('Mobile') && memoryGB <= 2
        ))

      setDeviceInfo({
        isLowEnd,
        isMobile,
        memoryGB,
        cores,
        connectionSpeed
      })

      setPerformanceScore(score)

      // Log para debugging
      console.log('Device Detection:', {
        isLowEnd,
        isMobile,
        memoryGB,
        cores,
        connectionSpeed,
        testTime,
        score,
        userAgent: navigator.userAgent
      })
    }

    detectDevice()
  }, [])

  return {
    ...deviceInfo,
    performanceScore,
    // Configuraciones basadas en el dispositivo
    shouldUseStaticAvatar: deviceInfo.isLowEnd,
    shouldUseHorizontalCarousel: deviceInfo.isLowEnd,
    shouldReduceAnimations: deviceInfo.isLowEnd || performanceScore < 60,
    shouldDisableParticles: deviceInfo.isLowEnd,
    maxFPS: deviceInfo.isLowEnd ? 30 : 60,
    qualityLevel: deviceInfo.isLowEnd ? 'low' : 'high'
  }
}
