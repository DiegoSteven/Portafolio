"use client"

import { useState, useEffect } from 'react'

interface DeviceInfo {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isLowEnd: boolean
  devicePixelRatio: number
  maxTextureSize: number
}

export function useDeviceDetection(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isLowEnd: false,
    devicePixelRatio: 1,
    maxTextureSize: 2048
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const detectDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const isMobile = /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
      const isTablet = /ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP)))/i.test(userAgent)
      const isDesktop = !isMobile && !isTablet

      // Detectar dispositivos de gama baja
      const memory = (navigator as any).deviceMemory || 4
      const hardwareConcurrency = navigator.hardwareConcurrency || 4
      const isLowEnd = memory <= 2 || hardwareConcurrency <= 2

      // Obtener información de renderizado
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') as WebGLRenderingContext
      let maxTextureSize = 2048
      
      if (gl) {
        maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE)
      }

      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        isLowEnd: isLowEnd || isMobile,
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2), // Limitar a 2x máximo
        maxTextureSize: Math.min(maxTextureSize, isMobile ? 1024 : 2048)
      })
    }

    detectDevice()
    
    // Re-detectar en cambio de orientación
    window.addEventListener('orientationchange', detectDevice)
    window.addEventListener('resize', detectDevice)

    return () => {
      window.removeEventListener('orientationchange', detectDevice)
      window.removeEventListener('resize', detectDevice)
    }
  }, [])

  return deviceInfo
}
