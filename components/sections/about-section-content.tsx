import { LetterAnimate } from "@/components/letter-animate"

export function AboutSectionContent() {
  return (
    <div className="p-6">
      <div className="mx-auto max-w-4xl">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <div className="prose prose-lg">
              <p className="text-lg font-light leading-relaxed text-gray-700 transition-colors duration-300 hover:text-black">
                Tengo experiencia desarrollando aplicaciones web y móviles utilizando Laravel, React, Vue.js y Flutter
                (Dart). Poseo habilidades trabajando tanto con bases de datos SQL y NoSQL, así como con servicios en la
                nube como AWS, incluyendo despliegues de sitios web estáticos en S3 con distribución global mediante
                CloudFront.
              </p>

              <p className="text-lg font-light leading-relaxed text-gray-700 transition-colors duration-300 hover:text-black">
                Me especializo en la construcción de APIs REST y microservicios utilizando Spring Boot, Flask y ASP.NET
                Core Web API. Además, tengo experiencia integrando modelos de lenguaje (LLMs) en aplicaciones mediante
                APIs como Gemini, lo que permite incorporar funcionalidades impulsadas por inteligencia artificial y
                flujos de trabajo inteligentes dentro de sistemas de software. También cuento con experiencia práctica
                en Docker. Asimismo, he implementado despliegues automatizados utilizando GitHub Actions en plataformas
                como Vercel y Render.
              </p>

              <p className="text-lg font-light leading-relaxed text-gray-700 transition-colors duration-300 hover:text-black">
                Me destaco por mi capacidad de trabajo en equipo, colaboración efectiva mediante Git, y un fuerte
                enfoque en la entrega de soluciones eficientes, escalables e innovadoras.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { label: "Experiencia", value: "2 años" },
                { label: "Proyectos", value: "10+" },
                { label: "Tecnologías", value: "15+" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group flex min-w-0 cursor-pointer flex-col items-center justify-center gap-2 border border-gray-200 px-3 py-5 text-center transition-all duration-300 hover:scale-105 hover:border-black hover:shadow-lg sm:min-h-[120px]"
                >
                  <div className="flex min-h-[2.5rem] w-full items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <LetterAnimate
                      text={item.value}
                      as="span"
                      className="inline-block whitespace-nowrap text-2xl font-bold leading-none tracking-tight text-black"
                      whenVisible
                    />
                  </div>
                  <div className="text-sm font-medium leading-snug text-gray-600 transition-colors duration-300 group-hover:text-black">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="group relative">
              <div className="flex h-96 w-full items-center justify-center overflow-hidden border-4 border-black bg-neutral-900 transition-all duration-500 group-hover:border-gray-600">
                <img
                  src="/compe.jpg?height=400&width=350"
                  alt="Working setup"
                  className="h-full w-full max-h-96 object-contain object-center transition-all duration-700 group-hover:rotate-2 group-hover:scale-110 md:object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/10" />
              </div>

              <div className="absolute -left-4 -top-4 h-8 w-8 border-2 border-black transition-all duration-500 group-hover:rotate-45 group-hover:scale-125" />
              <div className="absolute -bottom-4 -right-4 h-8 w-8 border-2 border-black transition-all duration-500 group-hover:-rotate-45 group-hover:scale-125" />

              {/* Móvil/tablet: cita sobre la imagen (antes solo existía en lg+). Escritorio: tarjeta lateral. */}
              <div className="absolute inset-x-2 bottom-2 z-10 max-h-[min(48%,13.5rem)] overflow-y-auto rounded-lg border border-white/40 bg-black/60 p-3 shadow-lg backdrop-blur-sm transition-all duration-500 sm:inset-x-3 sm:bottom-3 sm:max-h-[min(46%,15rem)] sm:p-4 lg:inset-x-auto lg:bottom-auto lg:left-auto lg:right-[-2.5rem] lg:top-5 lg:max-h-none lg:max-w-sm lg:overflow-visible lg:rounded-none lg:border-2 lg:border-black lg:bg-white lg:p-4 lg:shadow-none lg:backdrop-blur-none group-hover:lg:shadow-lg">
                <p className="text-pretty text-xs font-medium leading-snug text-white sm:text-sm lg:text-black">
                  <LetterAnimate
                    text="Código limpio no es vanidad: Es admitir que el software vive en el tiempo, y el tiempo premia lo que otro pueda entender, corregir y extender sin miedo."
                    as="span"
                    whenVisible
                    rootMargin="0px 0px 5% 0px"
                    threshold={0.08}
                  />
                </p>
                <div className="absolute -left-2 top-4 hidden h-4 w-4 rotate-45 border-b-2 border-l-2 border-black bg-white transition-transform duration-300 group-hover:scale-110 lg:block" />
              </div>

              <div className="absolute -left-6 top-10 h-3 w-3 animate-bounce rounded-full bg-black delay-300" />
              <div className="absolute -right-6 bottom-10 h-2 w-2 animate-spin-slow rounded-full border-2 border-black" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
