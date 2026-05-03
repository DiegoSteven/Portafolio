import { LetterAnimate } from "@/components/letter-animate"
import { Award, Calendar, GraduationCap, MapPin } from "lucide-react"

const education = [
  {
    degree: "Ingeniería de Software",
    institution: "Universidad de las Fuerzas Armadas ESPE",
    period: "Graduación: Junio 2026 · Estudios finalizados",
    location: "Latacunga, Ecuador",
    status: "Estudios finalizados",
    description:
      "Formación integral en desarrollo de software, programación, bases de datos, ingeniería de sistemas y metodologías ágiles.",
    highlights: [
      "Desarrollo avanzado de software",
      "Sistemas de gestión de bases de datos",
      "Tecnologías móviles y web",
      "Diseño e implementación de servicios y microservicios",
      "Análisis de datos y aprendizaje automático",
    ],
    courses: [
      "Desarrollo avanzado de software",
      "Sistemas de gestión de bases de datos",
      "Tecnologías móviles y web",
      "Diseño e implementación de servicios y microservicios",
      "Análisis de datos y aprendizaje automático",
    ],
  },
]

const achievements = [
  {
    title: "AWS Sales Accreditation (Business)",
    year: "2025",
    description: "Certificación en ventas y soluciones empresariales de AWS",
    icon: Award,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    title: "AWS Technical Essentials (ES)",
    year: "2025",
    description: "Fundamentos técnicos de Amazon Web Services",
    icon: Award,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    title: "Generative AI on AWS for Financial Services",
    year: "2025",
    description: "Inteligencia Artificial Generativa en AWS para servicios financieros",
    icon: Award,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    title: "Serverless con AWS Lambda",
    year: "2025",
    description: "Desarrollo de aplicaciones serverless con AWS Lambda",
    icon: Award,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    title: "IEEE Xtreme Programming Competition",
    year: "2024",
    description: "Participación activa en competencias de programación IEEE Xtreme",
    icon: Award,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
  {
    title: "Hackathon Banco Pichincha",
    year: "2025",
    description: "Participación en el hackathon del Banco Pichincha",
    icon: Award,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
]

export function EducationSectionContent() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <LetterAnimate
          text="Educación Universitaria"
          as="h3"
          className="mb-6 text-xl font-bold text-gray-900"
        />
        {education.map((edu, index) => (
          <div key={index} className="rounded-xl border border-white/10 bg-gradient-to-r from-indigo-950/50 to-slate-900/70 p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-indigo-500 p-3 text-white">
                <GraduationCap size={24} />
              </div>
              <div className="flex-1">
                <div className="mb-3 flex flex-col md:flex-row md:items-start md:justify-between">
                  <div>
                    <LetterAnimate
                      text={edu.degree}
                      as="h4"
                      className="mb-1 text-xl font-bold text-gray-900"
                    />
                    <p className="mb-2 text-lg font-semibold text-indigo-600">{edu.institution}</p>
                  </div>
                  <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-900">
                    {edu.status}
                  </span>
                </div>

                <div className="mb-4 flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    {edu.period}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    {edu.location}
                  </div>
                </div>

                <p className="mb-4 leading-relaxed text-gray-700">{edu.description}</p>

                <div className="mb-4">
                  <h5 className="mb-2 font-semibold text-gray-900">Aspectos destacados:</h5>
                  <ul className="grid gap-2 md:grid-cols-2">
                    {edu.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="mb-2 font-semibold text-gray-900">Materias relevantes:</h5>
                  <div className="flex flex-wrap gap-2">
                    {edu.courses.map((course, i) => (
                      <span
                        key={i}
                        className="rounded-full border border-indigo-200 bg-white px-3 py-1 text-sm font-medium text-indigo-800"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <LetterAnimate
          text="Logros y Reconocimientos"
          as="h3"
          className="mb-6 text-xl font-bold text-gray-900"
        />
        <div className="grid gap-4 md:grid-cols-3">
          {achievements.map((achievement, index) => (
            <div key={index} className="rounded-xl bg-gray-50 p-6 transition-shadow duration-300 hover:shadow-lg">
              <div className="mb-3 flex items-center gap-3">
                <div className={`rounded-full p-2 ${achievement.bgColor}`}>
                  <achievement.icon size={20} className={achievement.color} />
                </div>
                <span className="text-sm font-medium text-gray-600">{achievement.year}</span>
              </div>
              <h4 className="mb-2 font-bold text-gray-900">{achievement.title}</h4>
              <p className="text-sm text-gray-700">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: "Años de Estudio", value: "4+" },
          { label: "Proyectos Académicos", value: "12+" },
          { label: "Materias Aprobadas", value: "40+" },
          { label: "Competencias", value: "3+" },
        ].map((stat, index) => (
          <div key={index} className="rounded-lg bg-gray-50 p-4 text-center">
            <div className="text-2xl font-bold text-indigo-600">{stat.value}</div>
            <div className="text-sm font-medium text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
