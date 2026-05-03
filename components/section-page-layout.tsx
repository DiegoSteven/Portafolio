import { SECTION_HERO, SECTION_TITLES, type SectionHeroSlug } from "@/lib/section-hero-config"

function SectionHero({ slug }: { slug: SectionHeroSlug }) {
  const { background, letters } = SECTION_HERO[slug]
  const chars = letters.split("")

  return (
    <section
      className="relative flex min-h-[calc(100svh-3.5rem)] flex-col bg-slate-950 bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="absolute inset-0 bg-black/45" aria-hidden />
      <div
        className="relative z-10 mx-auto grid w-full flex-1 content-center items-center gap-0 px-2 py-16 sm:px-6 sm:py-20"
        style={{
          gridTemplateColumns: `repeat(${chars.length}, minmax(0, 1fr))`,
        }}
      >
        {chars.map((char, i) => (
          <div
            key={`${char}-${i}`}
            className="section-concept-hover flex min-h-[2.5em] items-center justify-center py-2 sm:min-h-0 sm:py-4"
          >
            {char === " " ? (
              <span className="w-full" aria-hidden />
            ) : (
              <h2 className="section-concept-letter select-none text-[clamp(1.5rem,8vw,4rem)] font-black uppercase leading-none tracking-tight">
                {char}
              </h2>
            )}
          </div>
        ))}
      </div>
      <p className="relative z-10 pb-24 text-center text-xs font-medium uppercase tracking-[0.35em] text-white/60 lg:pb-8">
        Desliza hacia abajo
      </p>
    </section>
  )
}

export function SectionPageLayout({
  slug,
  children,
  maxWidthClass = "max-w-4xl",
}: {
  slug: SectionHeroSlug
  children: React.ReactNode
  maxWidthClass?: string
}) {
  const pageTitle = SECTION_TITLES[slug]

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100">
      <h1 className="sr-only">{pageTitle}</h1>

      <main className="pt-14">
        <SectionHero slug={slug} />

        <section className="border-t border-white/10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-12 sm:px-6 sm:py-16">
          <div
            className={`section-content-theme mx-auto ${maxWidthClass} rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-8 shadow-xl sm:px-8 sm:py-10`}
          >
            {children}
          </div>
        </section>
      </main>
    </div>
  )
}
