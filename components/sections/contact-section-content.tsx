"use client"

import { LetterAnimate } from "@/components/letter-animate"
import { Linkedin, Mail, MessageCircle, MessageSquare } from "lucide-react"

const contactActions = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    action: "https://wa.me/593959544333",
    description: "Respuesta inmediata",
    color: "bg-green-600 hover:bg-green-700",
  },
  {
    icon: Mail,
    label: "Email",
    action: "mailto:diegoshh582@gmail.com",
    description: "diegoshh582@gmail.com",
    color: "bg-blue-600 hover:bg-blue-700",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    action: "https://www.linkedin.com/in/diego-hidalgo-152a15182/",
    description: "Perfil profesional",
    color: "bg-blue-800 hover:bg-blue-900",
  },
  {
    icon: MessageSquare,
    label: "Telegram",
    action: "https://t.me/DiegoHidalgo01",
    description: "Mensaje directo",
    color: "bg-blue-500 hover:bg-blue-600",
  },
]

export function ContactSectionContent() {
  const handleContactAction = (action: string) => {
    if (action.startsWith("mailto:")) {
      window.location.href = action
      return
    }
    window.open(action, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="p-6">
      <div className="mb-6 text-center">
        <LetterAnimate
          text="¡Hablemos!"
          as="h3"
          className="mb-2 text-lg font-semibold text-gray-900"
        />
        <p className="text-gray-600">Elige la forma que prefieras para contactarme</p>
      </div>

      <div className="grid gap-4">
        {contactActions.map((contact, index) => {
          const IconComponent = contact.icon
          return (
            <button
              key={index}
              type="button"
              onClick={() => handleContactAction(contact.action)}
              className={`${contact.color} flex w-full items-center gap-4 rounded-xl p-4 text-white transition-all duration-300 hover:scale-105`}
            >
              <div className="rounded-lg bg-white/20 p-2">
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
  )
}
