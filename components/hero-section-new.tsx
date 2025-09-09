"use client"

import { useEffect, useState } from "react"
import { Github, Linkedin, Mail } from "lucide-react"
import { Model3D } from "./model-3d"
import { motion } from "framer-motion"

export function HeroSectionNew({ isModalOpen = false }: { isModalOpen?: boolean }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section id="inicio" className="h-screen relative overflow-hidden">
      {/* Fondo con gradiente animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
      </div>

      {/* Header con el nombre - posicionado en esquina superior izquierda */}
      <div className="absolute top-8 left-8 z-20">
        <motion.h1 
          className="text-3xl md:text-5xl font-bold text-white mb-2"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: isModalOpen ? 0.3 : 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Diego Steven
          <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Hidalgo
          </span>
        </motion.h1>
        <motion.p 
          className="text-sm md:text-lg text-gray-300 max-w-xs"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: isModalOpen ? 0.3 : 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Full Stack Developer & Software Engineering Student
        </motion.p>
      </div>

      {/* Escena 3D principal */}
      <div className="w-full h-full" style={{
        // Optimizaciones CSS para móviles
        willChange: 'transform',
        transform: 'translateZ(0)', // Forzar aceleración por hardware
        backfaceVisibility: 'hidden',
        perspective: '1000px'
      }}>
        <Model3D isModalOpen={isModalOpen} />
      </div>

      {/* Instrucciones de navegación */}
      <motion.div 
        className="absolute bottom-4 left-4 text-white/60 text-sm z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: isModalOpen ? 0.2 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <p>🖱️ Arrastra para rotar</p>
        <p>✨ Ver más para ver detalles</p>
      </motion.div>

      {/* Social links en la esquina */}
      <motion.div 
        className="absolute bottom-4 right-4 flex gap-3 z-20"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: isModalOpen ? 0.2 : 1 }}
        transition={{ duration: isModalOpen ? 0.3 : 1, delay: isModalOpen ? 0 : 0.8 }}
      >
        <motion.a
          href="https://github.com/DiegoSteven"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Github size={20} />
        </motion.a>
        <motion.a
          href="https://www.linkedin.com/in/diego-hidalgo-152a15182"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Linkedin size={20} />
        </motion.a>
        <motion.a
          href="mailto:diegoshh582@gmail.com"
          className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Mail size={20} />
        </motion.a>
      </motion.div>
    </section>
  )
}
