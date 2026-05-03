import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      {/* Fondo a pantalla completa (evita franja a la derecha junto al gutter/scroll) */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 bg-slate-900 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/cyberpunk.webp)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 bg-black/20"
      />
      <div className="relative z-10 min-h-screen overflow-x-hidden">
        <Header />
        <main className="pb-[4.75rem] lg:pb-0">{children}</main>
        <Footer />
      </div>
    </div>
  )
}
