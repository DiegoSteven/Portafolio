"use client"

import { useEffect, useRef, useState } from "react"
import { X, MessageCircle, Mail, Linkedin, MessageSquare } from "lucide-react"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      document.body.style.overflow = 'hidden'
    } else {
      setIsVisible(false)
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const contactActions = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      action: "https://wa.me/593959544333",
      description: "Respuesta inmediata",
      color: "bg-green-600 hover:bg-green-700"
    },
    {
      icon: Mail,
      label: "Email",
      action: "mailto:diegoshh582@gmail.com",
      description: "diegoshh582@gmail.com",
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      action: "https://www.linkedin.com/in/diego-hidalgo-152a15182/",
      description: "Perfil profesional",
      color: "bg-blue-800 hover:bg-blue-900"
    },
    {
      icon: MessageSquare,
      label: "Telegram",
      action: "https://t.me/DiegoHidalgo01",
      description: "Mensaje directo",
      color: "bg-blue-500 hover:bg-blue-600"
    }
  ]

  const handleContactAction = (action: string) => {
    window.open(action, '_blank')
  }

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-all duration-300 ${
        isVisible ? 'opacity-100 backdrop-blur-sm' : 'opacity-0'
      }`}
      style={{ 
        background: 'rgba(0, 0, 0, 0.8)',
        animation: isVisible ? 'fadeIn 0.3s ease-out' : undefined
      }}
    >
      <div 
        ref={modalRef}
        className={`bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {/* Header del Modal */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <MessageCircle size={24} className="text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Contacto</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Contenido del Modal */}
        <div className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">¡Hablemos!</h3>
            <p className="text-gray-600">Elige la forma que prefieras para contactarme</p>
          </div>

          {/* Opciones de Contacto */}
          <div className="grid gap-4">
            {contactActions.map((contact, index) => {
              const IconComponent = contact.icon
              return (
                <button
                  key={index}
                  onClick={() => handleContactAction(contact.action)}
                  className={`${contact.color} text-white p-4 rounded-xl hover:scale-105 transition-all duration-300 flex items-center gap-4 w-full`}
                >
                  <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                    <IconComponent size={24} />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">{contact.label}</div>
                    <div className="text-sm opacity-90">{contact.description}</div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
