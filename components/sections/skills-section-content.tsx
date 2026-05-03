import { LetterAnimate } from "@/components/letter-animate"
import { Code, Database, Globe, Smartphone } from "lucide-react"

const skillCategories = [
  {
    title: "Frontend",
    icon: Globe,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    bar: "bg-blue-500",
    skills: [
      { name: "React", level: 90 },
      { name: "Vue.js", level: 90 },
      { name: "Vite", level: 85 },
      { name: "JavaScript", level: 88 },
      { name: "Tailwind CSS", level: 85 },
    ],
  },
  {
    title: "Backend",
    icon: Code,
    color: "text-green-600",
    bgColor: "bg-green-100",
    bar: "bg-green-500",
    skills: [
      { name: "Spring Boot", level: 90 },
      { name: "Laravel", level: 85 },
      { name: "ASP.NET Core", level: 75 },
      { name: "Flask", level: 70 },
    ],
  },
  {
    title: "Bases de Datos",
    icon: Database,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    bar: "bg-purple-500",
    skills: [
      { name: "MySQL", level: 85 },
      { name: "MariaDB", level: 80 },
      { name: "MongoDB", level: 75 },
      { name: "PostgreSQL", level: 70 },
    ],
  },
  {
    title: "DevOps & Cloud",
    icon: Smartphone,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    bar: "bg-orange-500",
    skills: [
      { name: "AWS S3", level: 85 },
      { name: "AWS CloudFront", level: 80 },
      { name: "GitHub Actions", level: 85 },
      { name: "Docker", level: 80 },
      { name: "Flutter", level: 85 },
      { name: "Git", level: 90 },
      { name: "CI/CD", level: 80 },
      { name: "Automatización", level: 82 },
      { name: "Brain", level: 85 },
    ],
  },
]

export function SkillsSectionContent() {
  return (
    <div className="p-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, index) => (
          <div key={index} className="rounded-xl bg-gray-50 p-6 transition-shadow duration-300 hover:shadow-lg">
            <div className="mb-4 flex items-center gap-3">
              <div className={`rounded-full p-2 ${category.bgColor}`}>
                <category.icon size={20} className={category.color} />
              </div>
              <LetterAnimate
                text={category.title}
                as="h3"
                className="text-lg font-bold text-gray-900"
              />
            </div>

            <div className="space-y-3">
              {category.skills.map((skill, skillIndex) => (
                <div key={skillIndex}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                    <span className="text-sm text-gray-500">{skill.level}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className={`h-2 rounded-full transition-all duration-1000 ${category.bar}`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: "Lenguajes", value: "8+" },
          { label: "Frameworks", value: "12+" },
          { label: "Herramientas", value: "15+" },
          { label: "Años Estudiando", value: "4+" },
        ].map((stat, index) => (
          <div key={index} className="rounded-lg bg-gray-50 p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{stat.value}</div>
            <div className="text-sm font-medium text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
