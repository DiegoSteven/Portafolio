"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, MapPin, Phone, MessageCircle, Linkedin, MessageSquare } from "lucide-react"

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const contactActions = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      action: "https://wa.me/593959544333",
      description: "Respuesta inmediata",
      color: "bg-green-600 hover:bg-green-700",
      external: true
    },
    {
      icon: Mail,
      label: "Email",
      action: "mailto:diegoshh582@gmail.com",
      description: "diegoshh582@gmail.com",
      color: "bg-blue-600 hover:bg-blue-700",
      external: false
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      action: "https://www.linkedin.com/in/diego-hidalgo-152a15182/",
      description: "Perfil profesional",
      color: "bg-blue-800 hover:bg-blue-900",
      external: true
    },
    {
      icon: MessageSquare,
      label: "Telegram",
      action: "https://t.me/DiegoHidalgo01",
      description: "Mensaje directo",
      color: "bg-blue-500 hover:bg-blue-600",
      external: true
    }
  ]

  const handleContactAction = (action: string, external: boolean) => {
    if (external) {
      window.open(action, '_blank')
    } else {
      window.location.href = action
    }
  }

  return (
    <section ref={sectionRef} id="contacto" className="py-20 bg-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-20 w-16 h-16 border-2 border-gray-200 rotate-45 animate-spin-slow opacity-30"></div>
      <div className="absolute bottom-20 right-20 w-12 h-12 bg-gray-100 animate-bounce opacity-50"></div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Title */}
          <div
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="inline-block">
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-4 relative">
                Contacto
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-black rounded-full animate-pulse"></div>
              </h2>
              <div
                className={`w-16 h-0.5 bg-black mx-auto transition-all duration-1000 delay-300 ${
                  isVisible ? "scale-x-100" : "scale-x-0"
                }`}
              ></div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div
              className={`space-y-8 transform transition-all duration-1000 delay-500 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
              }`}
            >
              <div>
                <h3 className="text-2xl font-bold text-black mb-6">Hablemos</h3>
                <p className="text-gray-600 leading-relaxed mb-8">
                  ¿Tienes un proyecto en mente? Me encantaría escuchar tus ideas y ayudarte a convertirlas en realidad.
                  No dudes en contactarme por cualquiera de estos medios.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: "diegoshh582@gmail.com",
                    description: "Respondo en 24 horas",
                  },
                  {
                    icon: Phone,
                    label: "Teléfono",
                    value: "(593) 959544333",
                    description: "Lun - Vie, 9AM - 6PM",
                  },
                  {
                    icon: MapPin,
                    label: "Ubicación",
                    value: "Cayambe, Ecuador",
                    description: "Disponible para trabajo remoto y presencial",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-start space-x-4 group cursor-pointer transform transition-all duration-500 hover:scale-105 ${
                      isVisible ? "translate-x-0 opacity-100" : "-translate-x-5 opacity-0"
                    }`}
                    style={{ transitionDelay: `${700 + index * 200}ms` }}
                  >
                    <div className="w-12 h-12 border-2 border-black flex items-center justify-center transition-all duration-300 group-hover:bg-black group-hover:text-white group-hover:rotate-12">
                      <item.icon size={20} className="transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <div>
                      <h4 className="font-bold text-black group-hover:text-gray-700 transition-colors duration-300">
                        {item.label}
                      </h4>
                      <p className="text-gray-700 group-hover:text-black transition-colors duration-300">
                        {item.value}
                      </p>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Actions */}
            <Card
              className={`border-2 border-gray-200 hover:border-black transition-all duration-500 transform hover:shadow-xl ${
                isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
              }`}
              style={{ transitionDelay: "700ms" }}
            >
              <CardHeader>
                <CardTitle className="text-black text-2xl">Contáctame</CardTitle>
                <p className="text-gray-600">Elige el medio que prefieras</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  {contactActions.map((action, index) => (
                    <Button
                      key={index}
                      onClick={() => handleContactAction(action.action, action.external)}
                      className={`w-full ${action.color} text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg group relative overflow-hidden`}
                      size="lg"
                    >
                      <div className="flex items-center justify-center relative z-10">
                        <action.icon size={20} className="mr-3 transition-transform duration-300 group-hover:scale-110" />
                        <div className="text-left">
                          <div className="font-semibold">{action.label}</div>
                          <div className="text-sm opacity-90">{action.description}</div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>


              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
