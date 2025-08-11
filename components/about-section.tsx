"use client"

import { useEffect, useRef, useState } from "react"

export function AboutSection() {
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

  return (
    <section ref={sectionRef} id="sobre-mi" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 right-10 w-20 h-20 border border-gray-200 rotate-45 animate-spin-slow opacity-50"></div>
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
                Sobre mí
                <div className="absolute -top-2 -right-2 w-2 h-2 bg-black rounded-full animate-ping"></div>
              </h2>
              <div
                className={`w-16 h-0.5 bg-black mx-auto transition-all duration-1000 delay-300 ${
                  isVisible ? "scale-x-100" : "scale-x-0"
                }`}
              ></div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              className={`space-y-6 transform transition-all duration-1000 delay-500 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
              }`}
            >
              <div className="prose prose-lg">
                <p className="text-gray-700 text-lg leading-relaxed font-light hover:text-black transition-colors duration-300">
                  Soy Diego Steven Hidalgo, estudiante de Ingeniería en Software en la Universidad de las Fuerzas
                  Armadas ESPE. Me especializo en desarrollo Full Stack con experiencia en frameworks como Laravel,
                  React, Vue.js y Spring Boot.
                </p>

                <p className="text-gray-700 text-lg leading-relaxed font-light hover:text-black transition-colors duration-300">
                  Tengo experiencia práctica desarrollando microservicios, APIs REST y aplicaciones móviles con Flutter.
                  He trabajado con bases de datos SQL y NoSQL, servicios en la nube y contenedores Docker.
                </p>

                <p className="text-gray-700 text-lg leading-relaxed font-light hover:text-black transition-colors duration-300">
                  Además del desarrollo, me apasiona el senderismo, ciclismo de montaña, el arte y participo activamente
                  en competencias de programación como IEEE Xtreme.
                </p>
              </div>

              {/* Key Points with stagger animation */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { label: "Experiencia", value: "1+ años" },
                  { label: "Proyectos", value: "10+" },
                  { label: "Tecnologías", value: "15+" },
                  { label: "Pasantías", value: "2" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`text-center p-4 border border-gray-200 hover:border-black transition-all duration-300 transform hover:scale-105 hover:shadow-lg group cursor-pointer ${
                      isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
                    }`}
                    style={{ transitionDelay: `${700 + index * 100}ms` }}
                  >
                    <div className="text-2xl font-bold text-black group-hover:scale-110 transition-transform duration-300">
                      {item.value}
                    </div>
                    <div className="text-sm text-gray-600 font-medium group-hover:text-black transition-colors duration-300">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`relative transform transition-all duration-1000 delay-700 ${
                isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
              }`}
            >
              {/* Main Image Container */}
              <div className="relative group">
                <div className="w-full h-96 border-4 border-black overflow-hidden transition-all duration-500 group-hover:border-gray-600">
                  <img
                    src="/compe.jpg?height=400&width=350"
                    alt="Working setup"
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                </div>

                {/* Animated Decorative Elements */}
                <div className="absolute -top-4 -left-4 w-8 h-8 border-2 border-black transition-all duration-500 group-hover:rotate-45 group-hover:scale-125"></div>
                <div className="absolute -bottom-4 -right-4 w-8 h-8 border-2 border-black transition-all duration-500 group-hover:-rotate-45 group-hover:scale-125"></div>

                {/* Quote bubble with animation */}
                <div className="absolute -right-10 top-5 bg-white border-2 border-black p-4 max-w-xs hidden lg:block transform transition-all duration-500 hover:scale-105 hover:rotate-1 group-hover:shadow-lg">
                  <p className="text-sm font-medium">
                    "El código limpio siempre parece que fue escrito por alguien que se preocupa"
                  </p>
                  <div className="absolute -left-2 top-4 w-4 h-4 bg-white border-l-2 border-b-2 border-black transform rotate-45 transition-transform duration-300 group-hover:scale-110"></div>
                </div>

                {/* Floating elements */}
                <div className="absolute top-10 -left-6 w-3 h-3 bg-black rounded-full animate-bounce delay-300"></div>
                <div className="absolute bottom-10 -right-6 w-2 h-2 border-2 border-black animate-spin-slow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
