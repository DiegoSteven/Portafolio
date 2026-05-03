"use client"

import { LetterAnimate } from "@/components/letter-animate"
import { Calendar, Code, ExternalLink, Github, Users } from "lucide-react"

const projects = [
  {
    title: "SmartGob Ibarra · Módulo de Seguridad Ocupacional",
    description:
      "Participación en el desarrollo del módulo de Seguridad Ocupacional dentro de la plataforma de gobierno digital SmartGob (Origami-GT) para el Gobierno Autónomo Descentralizado de Ibarra: gestión y trazabilidad de procesos de seguridad y salud en el trabajo integrados al ecosistema municipal.",
    image: "/smartGob.png",
    technologies: ["Java", "Spring Boot", "React", "PostgreSQL", "JasperReports"],
    features: [
      "Módulo de Seguridad Ocupacional para entorno SmartGob / Origami-GT",
      "Backend con Java y Spring Boot; reportes con JasperReports",
      "Interfaces dinámicas con React",
      "Modelado y gestión de datos en PostgreSQL",
      "Despliegue en entorno municipal (GAD Ibarra)",
    ],
    category: "Gobierno digital",
    date: "2026",
    team: "ORIGAMI EC · GAD Ibarra",
    github: "Repositorio privado",
    demo: "https://smartgob.ibarra.gob.ec/",
  },
  {
    title: "Landing Page de Neurona Global",
    description:
      "Desarrollo y despliegue de la nueva landing page de Neurona, aplicando tecnologías modernas y prácticas de arquitectura en la nube con optimización completa.",
    image: "/Neurona.png",
    technologies: ["React", "Vite", "Tailwind CSS", "GitHub Actions", "AWS S3", "AWS CloudFront"],
    features: [
      "Frontend moderno con React + Vite y Tailwind CSS",
      "CI/CD automatizado con GitHub Actions",
      "Infraestructura en la nube con Amazon S3 y CloudFront",
      "Optimización de rendimiento, tiempos de carga y SEO técnico",
      "Colaboración con equipos de diseño y QA",
    ],
    category: "Corporate Website",
    date: "2025",
    team: "Neurona Global",
    github: "Repositorio privado",
    demo: "https://www.neuronaglobal.com/",
  },
  {
    title: "AnalytiCore - Análisis de Texto con IA",
    description:
      "AnalytiCore es una aplicación web moderna que utiliza inteligencia artificial para el análisis avanzado de texto. Ofrece el análisis de sentimiento. Está desplegada en Render.",
    image: "/ServiciosDesplegados.png",
    technologies: ["Spring Boot", "React", "Docker", "Java", "Python", "FastAPI"],
    features: [
      "Análisis de sentimiento con IA",
      "Interfaz web moderna y responsiva",
      "API RESTful con Spring Boot",
      "Despliegue en contenedores Docker",
    ],
    category: "Web Application",
    date: "2025",
    team: "Individual",
    github: "https://github.com/DiegoSteven/AnalytiCore.git",
    demo: "https://frontend-service-ppt4.onrender.com/",
  },
  {
    title: "Servicio de Reportes - Sistema de Rastreo Vehicular",
    description:
      "Servicio desarrollado con Spring Boot para la generación de reportes basados en datos de dispositivos GPS. Procesa información de posición y genera reportes detallados.",
    image: "/ReporteRuta.png",
    technologies: ["Java", "Spring Boot", "MySQL", "Postman", "Spring Mail"],
    features: [
      "Procesamiento de datos GPS",
      "Generación de reportes en Excel",
      "Envío automático por correo",
      "Detección de viajes y paradas",
    ],
    category: "Backend Service",
    date: "2025",
    team: "Individual",
    github: "https://github.com/DiegoSteven/servicioReportes.git",
    demo: null as string | null,
  },
  {
    title: "Sistema de Gestión de Pedidos - Microservicios",
    description:
      "Plataforma completa de gestión de pedidos implementada bajo arquitectura de microservicios con Spring Boot y RabbitMQ. Frontend desarrollado con Next.js.",
    image: "/Pedidos.png",
    technologies: ["Java", "Spring Boot", "MySQL", "RabbitMQ", "Docker", "Next.js", "React"],
    features: [
      "Arquitectura de microservicios",
      "Comunicación asíncrona con RabbitMQ",
      "Frontend moderno con Next.js",
      "Autenticación JWT",
    ],
    category: "Full Stack Application",
    date: "2025",
    team: "Individual",
    github: "https://github.com/DiegoSteven/sistema-gestion-pedidos",
    demo: null as string | null,
  },
  {
    title: "Hospital Médico - Sistema de Gestión Hospitalaria",
    description:
      "Sistema de gestión hospitalaria para administrar pacientes, servicios médicos, productos farmacéuticos y facturación. Implementa patrones de diseño avanzados.",
    image: "/sistemaHospitalario.png",
    technologies: ["Spring Boot", "React", "SQLite", "Java", "Node"],
    features: [
      "Gestión integral de pacientes",
      "Administración de servicios médicos",
      "Control de productos farmacéuticos",
      "Sistema de facturación completo",
    ],
    category: "Healthcare System",
    date: "2025",
    team: "Individual",
    github: "https://github.com/DiegoSteven/Hospital_Medico.git",
    demo: null as string | null,
  },
]

export function ProjectsSectionContent() {
  return (
    <div className="p-6">
      <div className="grid gap-8">
        {projects.map((project, index) => (
          <div key={index} className="overflow-hidden rounded-xl bg-gray-50 transition-shadow duration-300 hover:shadow-lg">
            <div className="md:flex">
              <div className="md:w-1/3">
                <div className="flex h-48 items-center justify-center bg-gray-200 md:h-full">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = "none"
                      const parent = target.parentElement
                      if (parent)
                        parent.innerHTML = `<div class="flex h-full items-center justify-center text-gray-400">Imagen no disponible</div>`
                    }}
                  />
                </div>
              </div>

              <div className="p-6 md:w-2/3">
                <div className="mb-3 flex items-start justify-between">
                  <LetterAnimate
                    text={project.title}
                    as="h3"
                    className="text-xl font-bold text-gray-900"
                  />
                  <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800">
                    {project.category}
                  </span>
                </div>

                <p className="mb-4 leading-relaxed text-gray-700">{project.description}</p>

                <div className="mb-4 grid gap-4 text-sm md:grid-cols-3">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-500" />
                    <span className="text-gray-600">{project.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-gray-500" />
                    <span className="text-gray-600">{project.team}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Code size={16} className="text-gray-500" />
                    <span className="text-gray-600">{project.technologies.length} tecnologías</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="mb-2 font-semibold text-gray-900">Características principales:</h4>
                  <ul className="space-y-1">
                    {project.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="mb-2 font-semibold text-gray-900">Tecnologías:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-800">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  {project.github === "Repositorio privado" ? (
                    <div className="flex cursor-not-allowed items-center gap-2 rounded-lg bg-gray-500 px-4 py-2 text-sm text-white">
                      <Github size={16} />
                      Privado
                    </div>
                  ) : (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2 text-sm text-white transition-colors hover:bg-gray-700"
                    >
                      <Github size={16} />
                      Código
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm text-white transition-colors hover:bg-red-500"
                    >
                      <ExternalLink size={16} />
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: "Proyectos Completados", value: "6+" },
          { label: "Tecnologías Usadas", value: "15+" },
          { label: "Empresas", value: "4+" },
          { label: "Proyectos Desplegados", value: "3+" },
        ].map((stat, index) => (
          <div key={index} className="rounded-lg bg-gray-50 p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{stat.value}</div>
            <div className="text-sm font-medium text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
