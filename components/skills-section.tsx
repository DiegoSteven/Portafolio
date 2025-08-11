"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface Skill {
  name: string
  level: number
  category: string
}


export function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedLevels, setAnimatedLevels] = useState<{ [key: string]: number }>({})
  const sectionRef = useRef<HTMLElement>(null)

  const skillCategories = {
    Frontend: [
      { name: "React", level: 85, category: "Frontend" },
      { name: "Vue.js", level: 90, category: "Frontend" },
      { name: "JavaScript", level: 88, category: "Frontend" },
      { name: "tailwindcss", level: 80, category: "Frontend" },
    ],
    Backend: [
      { name: "Spring Boot", level: 90, category: "Backend" },
      { name: "Laravel", level: 85, category: "Backend" },
      { name: "ASP.NET Core", level: 75, category: "Backend" },
      { name: "Flask", level: 70, category: "Backend" },
    ],
    "Bases de Datos": [
      { name: "MySQL", level: 85, category: "Bases de Datos" },
      { name: "MariaDB", level: 80, category: "Bases de Datos" },
      { name: "MongoDB", level: 75, category: "Bases de Datos" },
      { name: "PostgreSQL", level: 70, category: "Bases de Datos" },
    ],
    "DevOps & Móvil": [
      { name: "Docker", level: 80, category: "DevOps & Móvil" },
      { name: "Flutter", level: 85, category: "DevOps & Móvil" },
      { name: "Git", level: 90, category: "DevOps & Móvil" },
      { name: "CI/CD", level: 70, category: "DevOps & Móvil" },
    ],
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Animate skill levels
          setTimeout(() => {
            const allSkills = Object.values(skillCategories).flat()
            allSkills.forEach((skill, index) => {
              setTimeout(() => {
                setAnimatedLevels((prev) => ({
                  ...prev,
                  [skill.name]: skill.level,
                }))
              }, index * 200)
            })
          }, 500)
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
    <section ref={sectionRef} id="habilidades" className="py-20 bg-white relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 gap-4 h-full">
          {Array.from({ length: 48 }).map((_, i) => (
            <div
              key={i}
              className="border border-gray-300 animate-pulse"
              style={{ animationDelay: `${i * 100}ms` }}
            ></div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="inline-block">
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-4 relative">
                Habilidades
                <div className="absolute -top-1 -right-1 w-3 h-3 border-2 border-black animate-spin"></div>
              </h2>
              <div
                className={`w-16 h-0.5 bg-black mx-auto transition-all duration-1000 delay-300 ${
                  isVisible ? "scale-x-100" : "scale-x-0"
                }`}
              ></div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(skillCategories).map(([category, skills], categoryIndex) => (
              <Card
                key={category}
                className={`border-2 border-gray-200 hover:border-black transition-all duration-500 transform hover:scale-105 hover:shadow-xl group ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${categoryIndex * 200}ms` }}
              >
                <CardContent className="p-6 relative overflow-hidden">
                  {/* Category background effect */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-black to-gray-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

                  <h3 className="text-xl font-bold text-black mb-6 text-center group-hover:scale-110 transition-transform duration-300">
                    {category}
                  </h3>

                  <div className="space-y-4">
                    {skills.map((skill, skillIndex) => (
                      <div
                        key={skill.name}
                        className={`transform transition-all duration-500 ${
                          isVisible ? "translate-x-0 opacity-100" : "-translate-x-5 opacity-0"
                        }`}
                        style={{ transitionDelay: `${categoryIndex * 200 + skillIndex * 100}ms` }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-700 font-medium hover:text-black transition-colors duration-300">
                            {skill.name}
                          </span>
                          <span className="text-sm text-gray-500 font-mono">{animatedLevels[skill.name] || 0}%</span>
                        </div>

                        {/* Animated Progress Bar */}
                        <div className="w-full bg-gray-200 h-2 relative overflow-hidden group/bar">
                          <div
                            className="h-2 bg-black transition-all duration-1500 ease-out relative"
                            style={{ width: `${animatedLevels[skill.name] || 0}%` }}
                          >
                            {/* Shimmer effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                          </div>

                          {/* Hover effect */}
                          <div className="absolute inset-0 bg-black/10 scale-x-0 group-hover/bar:scale-x-100 transition-transform duration-300 origin-left"></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Decorative corner elements */}
                  <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-gray-300 group-hover:border-black transition-colors duration-300"></div>
                  <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-gray-300 group-hover:border-black transition-colors duration-300"></div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Info with typewriter effect */}
          <div
            className={`mt-16 text-center transform transition-all duration-1000 delay-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <p className="text-gray-600 font-light max-w-2xl mx-auto relative">
              <span className="inline-block">
                  Siempre aprendiendo nuevas tecnologías y perfeccionando mis habilidades.  
                  Deseo formar parte de un equipo de trabajo donde pueda aportar valor,  
                  colaborar en proyectos desafiantes y adquirir nuevas competencias que me impulsen a crecer profesionalmente.
              </span>
              <span className="inline-block w-0.5 h-5 bg-black ml-1 animate-blink"></span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
