"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Calendar, Building } from "lucide-react"

export function ExperienceSection() {
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

  const experiences = [
    {
      company: "Magdata Solutions",
      position: "Programador Frontend",
      location: "Quito, Pichincha, Ecuador (Remoto)",
      period: "Noviembre 2024 – Febrero 2025",
      type: "Pasantía",
      achievements: [
        "Gestioné y resolví diversos tickets enfocados principalmente en el desarrollo frontend",
        "Creé nuevas vistas, actualicé estilos y módulos, siguiendo diseños detallados en Figma",
        "Participé en la integración de funcionalidades mediante el consumo de APIs desarrolladas en MongoDB",
        "Trabajé en una aplicación web para la reserva de citas orientadas al cuidado de mascotas, desarrollada con Vue.js y Quasar",
      ],
      technologies: ["Vue.js", "Quasar", "MongoDB", "Figma", "JavaScript"],
    },
    {
      company: "GAD Municipal de Salcedo",
      position: "Programador Backend",
      location: "Salcedo, Cotopaxi (Presencial)",
      period: "Febrero 2024 – Mayo 2024",
      type: "Pasantía",
      achievements: [
        "Desarrollé microservicios en Java con Spring Boot y Tomcat, implementando APIs RESTful",
        "Migré una base de datos desde FoxPro a MariaDB utilizando Pentaho como herramienta de ETL",
        "Configuré las cadenas de conexión para integrar la base de datos en los microservicios",
        "Refactoricé lógica en PHP trasladando consultas del frontend al backend mediante procedimientos almacenados",
      ],
      technologies: ["Java", "Spring Boot", "MariaDB", "Pentaho", "PHP", "Tomcat"],
    },
  ]

  return (
    <section ref={sectionRef} id="experiencia" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 right-10 w-20 h-20 border border-gray-200 rotate-12 animate-spin-slow opacity-20"></div>
      <div className="absolute bottom-20 left-10 w-16 h-16 border border-gray-300 animate-pulse opacity-30"></div>

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
                Experiencia
                <div className="absolute -top-2 -right-2 w-2 h-2 bg-black rounded-full animate-ping"></div>
              </h2>
              <div
                className={`w-16 h-0.5 bg-black mx-auto transition-all duration-1000 delay-300 ${
                  isVisible ? "scale-x-100" : "scale-x-0"
                }`}
              ></div>
            </div>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <Card
                key={index}
                className={`border-2 border-gray-200 hover:border-black transition-all duration-500 group transform hover:scale-105 hover:shadow-xl ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${500 + index * 300}ms` }}
              >
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle className="text-black text-xl mb-2 group-hover:text-gray-700 transition-colors duration-300">
                        {exp.position}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <Building size={16} />
                        <span className="font-medium">{exp.company}</span>
                        <span className="px-2 py-1 bg-black text-white text-xs rounded">{exp.type}</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 space-y-1">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, achIndex) => (
                      <li
                        key={achIndex}
                        className="flex items-start gap-3 text-gray-700 hover:text-black transition-colors duration-300"
                      >
                        <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                        <span className="leading-relaxed">{achievement}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 pt-4">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 border border-gray-300 text-xs text-gray-700 font-medium hover:border-black hover:bg-black hover:text-white transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
