"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Download, ChevronDown } from "lucide-react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToNext = () => {
    const element = document.getElementById("sobre-mi")
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-black rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-gray-400 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-black rounded-full animate-pulse delay-700"></div>
        <div className="absolute top-60 left-1/3 w-1 h-1 bg-gray-600 rounded-full animate-bounce delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Avatar */}
          <div
            className={`mb-12 relative transform transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="w-56 h-56 mx-auto rounded-full border-4 border-black overflow-hidden relative group">
              <img
                src="/FotoPerfil.jpg"
                alt="Profile"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
            </div>

            {/* Animated decorative lines */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8">
              <div
                className={`w-16 h-0.5 bg-black transition-all duration-1000 delay-500 ${
                  isVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                }`}
              ></div>
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8">
              <div
                className={`w-16 h-0.5 bg-black transition-all duration-1000 delay-700 ${
                  isVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                }`}
              ></div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-3 h-3 border-2 border-black animate-spin-slow"></div>
            <div className="absolute -bottom-4 -left-4 w-2 h-2 bg-black animate-bounce delay-500"></div>
          </div>

          {/* Title with typewriter effect */}
          <div
            className={`transform transition-all duration-1000 delay-300 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-black relative">
              <span className="inline-block hover:animate-pulse">Diego Steven Hidalgo</span>
              <div className="absolute -right-2 top-0 w-1 h-full bg-black animate-blink"></div>
            </h1>
          </div>

          {/* Subtitle with slide animation */}
          <div
            className={`relative mb-8 transform transition-all duration-1000 delay-500 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <p className="text-xl md:text-2xl text-gray-600 font-light">Full Stack Developer</p>
            <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-6 h-0.5 bg-gray-400 hidden md:block animate-slide-right"></div>
            <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-6 h-0.5 bg-gray-400 hidden md:block animate-slide-left"></div>
          </div>

          <div
            className={`transform transition-all duration-1000 delay-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Estudiante de Ingeniería en Software especializado en desarrollo web con React, Vue.js y Spring Boot
            </p>
          </div>

          {/* Social Links with hover animations */}
          <div
            className={`flex justify-center space-x-6 transform transition-all duration-1000 delay-1100 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            {[
              { icon: Github, href: "https://github.com/DiegoSteven", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/diego-hidalgo-152a15182", label: "LinkedIn" },
              { icon: Mail, href: "mailto:diegoshh582@gmail.com", label: "Email" },
            ].map(({ icon: Icon, href, label }, index) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:border-black hover:text-black transition-all duration-300 transform hover:scale-110 hover:rotate-12 group relative"
                aria-label={label}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Icon size={20} className="transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  {label}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
        onClick={scrollToNext}
      >
        <ChevronDown size={24} className="text-gray-400 hover:text-black transition-colors duration-300" />
      </div>
    </section>
  )
}
