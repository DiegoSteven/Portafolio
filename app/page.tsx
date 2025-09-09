"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { HeroSectionNew } from "@/components/hero-section-new"
import { Footer } from "@/components/footer"
import { AboutModal } from "@/components/about-modal"
import { ExperienceModal } from "@/components/experience-modal"
import { SkillsModal } from "@/components/skills-modal"
import { ProjectsModal } from "@/components/projects-modal"
import { EducationModal } from "@/components/education-modal"
import { ContactModal } from "@/components/contact-modal"

export default function Portfolio() {
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false)
  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false)
  const [isProjectsModalOpen, setIsProjectsModalOpen] = useState(false)
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  // Verificar si algún modal está abierto
  const isAnyModalOpen = isAboutModalOpen || isExperienceModalOpen || isSkillsModalOpen || 
                        isProjectsModalOpen || isEducationModalOpen || isContactModalOpen

  useEffect(() => {
    const handleOpenAboutModal = () => setIsAboutModalOpen(true)
    const handleOpenExperienceModal = () => setIsExperienceModalOpen(true)
    const handleOpenSkillsModal = () => setIsSkillsModalOpen(true)
    const handleOpenProjectsModal = () => setIsProjectsModalOpen(true)
    const handleOpenEducationModal = () => setIsEducationModalOpen(true)
    const handleOpenContactModal = () => setIsContactModalOpen(true)

    // Escuchar todos los eventos personalizados
    window.addEventListener('openAboutModal', handleOpenAboutModal)
    window.addEventListener('openExperienceModal', handleOpenExperienceModal)
    window.addEventListener('openSkillsModal', handleOpenSkillsModal)
    window.addEventListener('openProjectsModal', handleOpenProjectsModal)
    window.addEventListener('openEducationModal', handleOpenEducationModal)
    window.addEventListener('openContactModal', handleOpenContactModal)

    return () => {
      window.removeEventListener('openAboutModal', handleOpenAboutModal)
      window.removeEventListener('openExperienceModal', handleOpenExperienceModal)
      window.removeEventListener('openSkillsModal', handleOpenSkillsModal)
      window.removeEventListener('openProjectsModal', handleOpenProjectsModal)
      window.removeEventListener('openEducationModal', handleOpenEducationModal)
      window.removeEventListener('openContactModal', handleOpenContactModal)
    }
  }, [])

  return (
    <div 
      className="min-h-screen overflow-x-hidden relative"
      style={{
        backgroundImage: 'url(/fondo.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay para mejorar legibilidad si es necesario */}
      <div className="absolute inset-0 bg-black/20 z-0" />
      
      {/* Contenido principal */}
      <div className="relative z-10">
        <Header />
        <main>
          <HeroSectionNew isModalOpen={isAnyModalOpen} />
        </main>
        <Footer />
      </div>
      
      {/* Todos los modales */}
      <AboutModal 
        isOpen={isAboutModalOpen} 
        onClose={() => setIsAboutModalOpen(false)} 
      />
      
      <ExperienceModal 
        isOpen={isExperienceModalOpen} 
        onClose={() => setIsExperienceModalOpen(false)} 
      />
      
      <SkillsModal 
        isOpen={isSkillsModalOpen} 
        onClose={() => setIsSkillsModalOpen(false)} 
      />
      
      <ProjectsModal 
        isOpen={isProjectsModalOpen} 
        onClose={() => setIsProjectsModalOpen(false)} 
      />
      
      <EducationModal 
        isOpen={isEducationModalOpen} 
        onClose={() => setIsEducationModalOpen(false)} 
      />
      
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </div>
  )
}
