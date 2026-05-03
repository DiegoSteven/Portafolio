import { LetterAnimate } from "@/components/letter-animate"
import { Briefcase, Calendar, MapPin } from "lucide-react"

const experiences = [
  {
    title: "Full Stack Developer",
    company: "ORIGAMI EC",
    period: "Marzo 2026 - Actualidad",
    location: "Ibarra, Imbabura, Ecuador · Híbrido",
    description:
      "Participé en el desarrollo e implementación de soluciones tecnológicas para plataformas de gobierno digital (SmartGob), colaborando con el Gobierno Autónomo Descentralizado de Ibarra y el Gobierno Autónomo Descentralizado de Latacunga.",
    achievements: [
      "Contribuí en el diseño y desarrollo de módulos clave: Sistema de Seguridad Ocupacional y Módulo de Ventanilla",
      "Desarrollo de backend utilizando Java con Spring Boot",
      "Generación de reportes con JasperReports",
      "Desarrollo de interfaces modernas con React",
      "Gestión y modelado de bases de datos en PostgreSQL",
    ],
    technologies: ["Java", "Spring Boot", "JasperReports", "React", "PostgreSQL"],
  },
  {
    title: "Tech Support Analyst",
    company: "Jelou AI",
    period: "Diciembre 2025 - Febrero 2026",
    location: "Guayaquil · En remoto",
    description:
      "Soporte técnico a clientes corporativos en la integración y operación de soluciones de IA conversacional, con foco en calidad en producción y mejora continua de flujos.",
    achievements: [
      "Brindé soporte técnico a clientes corporativos en la integración y operación de soluciones de IA conversacional",
      "Analicé logs y tracé errores en producción para identificar y resolver incidencias en flujos conversacionales",
      "Trabajé en conjunto con los equipos de Operations y Tech para el seguimiento de bugs y mejora continua de los sistemas",
      "Validé integraciones mediante herramientas como Postman y cURL, asegurando el correcto funcionamiento de APIs",
      "Participé en la optimización de flujos conversacionales e integraciones utilizando modelos de IA",
    ],
    technologies: [
      "Postman",
      "cURL",
      "APIs REST",
      "IA conversacional",
      "Automatización",
      "Brain",
    ],
  },
  {
    title: "Full-stack Developer",
    company: "Neurona",
    period: "Agosto 2025 - Actualidad",
    location: "Chile · En remoto",
    description:
      "Como Full-stack Developer en Neurona, lideré el desarrollo y despliegue de la nueva landing page, aplicando tecnologías modernas y prácticas de arquitectura en la nube.",
    achievements: [
      "Frontend: React + Vite y Tailwind CSS para una interfaz moderna, responsiva y optimizada",
      "CI/CD: Automatización con GitHub Actions para despliegues continuos y confiables",
      "Infraestructura en la nube: Hosting en Amazon S3 y distribución global con AWS CloudFront",
      "Optimización: Mejoras en rendimiento, tiempos de carga y SEO técnico",
      "Colaboración: Trabajo con diseño y QA asegurando calidad y consistencia visual",
      "Formación en AWS: Sales Accreditation (Business), Technical Essentials (ES), Generative AI on AWS for Financial Services y Serverless con AWS Lambda",
    ],
    technologies: ["React", "Vite", "Tailwind CSS", "GitHub Actions", "AWS S3", "AWS CloudFront", "AWS Lambda"],
  },
  {
    title: "Desarrollador Frontend",
    company: "Magdata Solutions",
    period: "Noviembre 2024 - Febrero 2025",
    location: "Quito, Pichincha, Ecuador · En remoto",
    description:
      "Gestioné y resolví diversos tickets enfocados principalmente en el desarrollo frontend. Trabajé en una aplicación web para la reserva de citas orientadas al cuidado de mascotas.",
    achievements: [
      "Creación de nuevas vistas siguiendo diseños detallados en Figma",
      "Actualización de estilos y módulos con Vue.js y Quasar",
      "Integración de funcionalidades mediante el consumo de APIs desarrolladas en MongoDB",
      "Enfoque en asegurar una experiencia de usuario fluida",
      "Optimización tanto de funcionalidad como del diseño de la plataforma",
    ],
    technologies: ["Vue.js", "Quasar", "JavaScript", "MongoDB", "Figma"],
  },
  {
    title: "Pasante Backend",
    company: "GAD Municipal de Salcedo",
    period: "Febrero 2024 - Junio 2024",
    location: "Salcedo, Cotopaxi, Ecuador · Presencial",
    description:
      "Desarrollé microservicios utilizando Java y Spring Boot, migrando bases de datos y optimizando consultas para mejorar el rendimiento del sistema.",
    achievements: [
      "Desarrollé microservicios en Tomcat utilizando Java en Eclipse",
      "Implementé microservicios con Spring Boot creando endpoints para el frontend",
      "Migré una base de datos desde FoxPro a MariaDB utilizando Pentaho como herramienta de ETL",
      "Configuré las cadenas de conexión para integrar la base de datos en los microservicios",
      "Desarrollé múltiples stored procedures para inserción, edición y eliminación de datos",
      "Refactoricé consultas en PHP trasladándolas a la base de datos para optimizar su ejecución",
    ],
    technologies: ["Java", "Spring Boot", "MariaDB", "Pentaho", "PHP", "Tomcat", "Eclipse"],
  },
]

export function ExperienceSectionContent() {
  return (
    <div className="p-6">
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div key={index} className="relative">
            <div className="absolute bottom-0 left-6 top-16 hidden w-0.5 bg-gray-200 md:block" />

            <div className="rounded-xl bg-gray-50 p-6 transition-shadow duration-300 hover:shadow-lg">
              <div className="flex flex-col gap-6 md:flex-row">
                <div className="md:flex-1">
                  <div className="flex items-start gap-4">
                    <div className="hidden rounded-full bg-green-500 p-3 text-white md:block">
                      <Briefcase size={20} />
                    </div>
                    <div className="flex-1">
                      <LetterAnimate
                        text={exp.title}
                        as="h3"
                        className="mb-2 text-xl font-bold text-gray-900"
                      />
                      <p className="mb-2 text-lg font-semibold text-green-600">{exp.company}</p>

                      <div className="mb-4 flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar size={16} />
                          {exp.period}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={16} />
                          {exp.location}
                        </div>
                      </div>

                      <p className="mb-4 leading-relaxed text-gray-700">{exp.description}</p>

                      <div className="mb-4">
                        <h4 className="mb-2 font-semibold text-gray-900">Logros principales:</h4>
                        <ul className="space-y-1">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-700">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="mb-2 font-semibold text-gray-900">Tecnologías utilizadas:</h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: "Años de Experiencia", value: "2+" },
          { label: "Empresas", value: "5" },
          { label: "Tecnologías", value: "15+" },
          { label: "Proyectos", value: "10+" },
        ].map((stat, index) => (
          <div key={index} className="rounded-lg bg-gray-50 p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stat.value}</div>
            <div className="text-sm font-medium text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
