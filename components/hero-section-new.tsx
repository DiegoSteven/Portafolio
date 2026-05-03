"use client"

import { Noto_Sans_JP } from "next/font/google"
import { useRouter } from "next/navigation"
import { Github, Linkedin, Mail } from "lucide-react"

import { Model3D } from "./model-3d"
import { StaticModel3D } from "./static-model-3d"
import { HorizontalCarousel } from "./horizontal-carousel"
import { motion } from "framer-motion"
import { useDevicePerformance } from "@/hooks/use-device-performance"
import { sectionHref } from "@/lib/section-routes"

const notoSansJp = Noto_Sans_JP({
  weight: ["700"],
  subsets: ["latin"],
  display: "swap",
})

export function HeroSectionNew() {
  const devicePerformance = useDevicePerformance()
  const router = useRouter()

  const handleCarouselCardClick = (cardId: string) => {
    router.push(sectionHref(cardId))
  }

  return (
    <section id="inicio" className="h-screen relative overflow-hidden">
      {/* Fondo con imagen */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-green-950">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: 'url(/fondolanding.png)' }}
        ></div>
      </div>

      {/* Nombre: en móvil un poco más arriba y tipografía más compacta para no chocar con las tarjetas 3D */}
      <div className="pointer-events-none absolute left-4 top-[4.25rem] z-40 max-w-[min(92vw,16rem)] pr-2 sm:left-8 sm:top-24 sm:max-w-none md:top-28">
        <motion.h1
          className="mb-1 text-2xl font-bold sm:mb-2 sm:text-3xl md:text-5xl"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.92),0_1px_3px_rgba(0,0,0,0.9)]">
            Diego Steven
          </span>
          <span className="block bg-gradient-to-r from-yellow-400 via-green-400 to-cyan-400 bg-clip-text text-transparent [filter:drop-shadow(0_2px_10px_rgba(0,0,0,0.85))]">
            Hidalgo
          </span>
        </motion.h1>
        <motion.p
          className="max-w-[13rem] text-xs leading-snug text-gray-100 [text-shadow:0_1px_8px_rgba(0,0,0,0.85)] sm:max-w-xs sm:text-sm md:text-lg"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Full Stack Developer & Software Engineering
        </motion.p>
      </div>

      {/* Contenido principal adaptativo */}
      {devicePerformance.shouldUseHorizontalCarousel ? (
        // Versión optimizada para dispositivos de gama baja
        <div className="flex flex-col items-center justify-center h-full pt-32 pb-16">
          {/* Avatar estático */}
          <div className="mb-2 h-64 w-64">
            <StaticModel3D />
          </div>
          <motion.p
            lang="ja"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className={`${notoSansJp.className} mb-8 mt-2 text-center text-xl tracking-wider text-white/95 [text-shadow:0_2px_14px_rgba(0,0,0,0.9)] md:text-2xl md:tracking-[0.2em]`}
          >
            限界を超えろ
          </motion.p>

          {/* Carrusel horizontal */}
          <HorizontalCarousel onCardClick={handleCarouselCardClick} />
          
          {/* Indicador de modo optimizado */}
          <div className="text-white/40 text-xs mt-4 text-center">
            ⚡ Modo optimizado para mejor rendimiento
          </div>
        </div>
      ) : (
        // Versión completa para dispositivos potentes
        <>
          {/* Escena 3D principal */}
          <div className="isolate z-10 h-full w-full [transform:translateZ(0)]">
            <Model3D />
          </div>

          <motion.p
            lang="ja"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.55 }}
            className={`${notoSansJp.className} pointer-events-none absolute bottom-[calc(env(safe-area-inset-bottom)+6.35rem)] left-4 right-[10.5rem] z-30 text-center text-lg font-bold tracking-wider text-white/95 [text-shadow:0_2px_18px_rgba(0,0,0,0.92),0_0_40px_rgba(0,0,0,0.45)] sm:inset-x-0 sm:bottom-[calc(env(safe-area-inset-bottom)+min(9vh,3.75rem))] sm:px-4 sm:text-xl md:bottom-[calc(env(safe-area-inset-bottom)+min(10vh,4.25rem))] md:text-2xl md:tracking-[0.22em] lg:bottom-[calc(env(safe-area-inset-bottom)+min(11vh,4.75rem))]`}
          >
            限界を超えろ
          </motion.p>

          {/* Instrucciones de navegación */}
          <motion.div 
            className="absolute bottom-4 left-4 text-white/60 text-sm z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
          </motion.div>
        </>
      )}

      {/* Social links en la esquina */}
      <motion.div
        className="absolute bottom-[calc(env(safe-area-inset-bottom)+5.75rem)] right-3 z-[35] flex shrink-0 gap-2.5 sm:bottom-32 sm:right-4 sm:gap-3 lg:bottom-4"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <motion.a
          href="https://github.com/DiegoSteven"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan-400/35 bg-white/25 text-white transition-all duration-300 hover:bg-cyan-400 hover:text-gray-900"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Github size={20} />
        </motion.a>
        <motion.a
          href="https://www.linkedin.com/in/diego-hidalgo-152a15182"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-green-400/35 bg-white/25 text-white transition-all duration-300 hover:bg-green-400 hover:text-gray-900"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Linkedin size={20} />
        </motion.a>
        <motion.a
          href="mailto:diegoshh582@gmail.com"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-yellow-400/35 bg-white/25 text-white transition-all duration-300 hover:bg-yellow-400 hover:text-gray-900"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Mail size={20} />
        </motion.a>
      </motion.div>
    </section>
  )
}
