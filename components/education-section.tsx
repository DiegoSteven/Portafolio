"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, MapPin, Calendar, Award } from "lucide-react"

export function EducationSection() {
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

  const education = {
    institution: "Universidad de las Fuerzas Armadas ESPE",
    degree: "Ingeniería de Software",
    location: "Latacunga, Ecuador",
    period: "En curso - Graduación Marzo 2025",
    subjects: [
      "Desarrollo avanzado de software",
      "Sistemas de gestión de bases de datos",
      "Tecnologías móviles y web",
      "Diseño e implementación de servicios y microservicios",
      "Análisis de datos y aprendizaje automático",
    ],
    achievements: [
      "Participación activa en competencias de programación IEEE Xtreme",
      "Participacion en el hackathon de la Banco Pichincha",
    ],
  }

  const interests = [
    { icon: "🏔️", title: "Senderismo y Ciclismo", description: "Fortalecen mi capacidad para resolver problemas" },
    { icon: "🎨", title: "Arte y Dibujo", description: "Desarrollan mi creatividad e innovación" },
    { icon: "⚽", title: "Deportes", description: "Baloncesto y fútbol mejoran mi trabajo en equipo" },
    { icon: "💻", title: "Competencias de Programación", description: "IEEE Xtreme, C++ y Python" },
  ]

  return (
    <section ref={sectionRef} id="educacion" className="py-20 bg-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-24 h-24 border border-gray-200 rotate-45 animate-spin-slow opacity-20"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 border border-gray-300 animate-pulse opacity-30"></div>

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="inline-block">
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-4 relative">
                Educación
                <div className="absolute -top-1 -right-1 w-3 h-3 border-2 border-black animate-spin"></div>
              </h2>
              <div
                className={`w-16 h-0.5 bg-black mx-auto transition-all duration-1000 delay-300 ${
                  isVisible ? "scale-x-100" : "scale-x-0"
                }`}
              ></div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Education Card */}
            <Card
              className={`border-2 border-gray-200 hover:border-black transition-all duration-500 group transform hover:scale-105 hover:shadow-xl ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 border-2 border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
                    <GraduationCap size={24} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-black text-xl mb-2">{education.degree}</CardTitle>
                    <p className="text-gray-600 font-medium mb-2">{education.institution}</p>
                    <div className="flex flex-col gap-1 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span>{education.period}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} />
                        <span>{education.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-bold text-black mb-3">Materias Principales</h4>
                  <ul className="space-y-2">
                    {education.subjects.map((subject, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-gray-700 hover:text-black transition-colors duration-300"
                      >
                        <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                        <span className="leading-relaxed text-sm">{subject}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-black mb-3 flex items-center gap-2">
                    <Award size={16} />
                    Logros Destacados
                  </h4>
                  <ul className="space-y-2">
                    {education.achievements.map((achievement, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-gray-700 hover:text-black transition-colors duration-300"
                      >
                        <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                        <span className="leading-relaxed text-sm">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Interests Grid */}
            <div
              className={`transform transition-all duration-1000 delay-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              <h3 className="text-2xl font-bold text-black mb-6">Intereses y Pasiones</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {interests.map((interest, index) => (
                  <Card
                    key={index}
                    className={`border border-gray-200 hover:border-black transition-all duration-300 group cursor-pointer transform hover:scale-105 ${
                      isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
                    }`}
                    style={{ transitionDelay: `${900 + index * 100}ms` }}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl mb-3 group-hover:animate-bounce">{interest.icon}</div>
                      <h4 className="font-bold text-black text-sm mb-2 group-hover:text-gray-700 transition-colors duration-300">
                        {interest.title}
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed">{interest.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Languages */}
              <Card className="mt-6 border border-gray-200 hover:border-black transition-all duration-300 group">
                <CardContent className="p-6">
                  <h4 className="font-bold text-black mb-4">Idiomas</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">Español</span>
                      <span className="text-sm text-gray-500">Nativo</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2">
                      <div className="h-2 bg-black w-full"></div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">Inglés</span>
                      <span className="text-sm text-gray-500">Intermedio</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2">
                      <div className="h-2 bg-black w-3/4 transition-all duration-1000"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
