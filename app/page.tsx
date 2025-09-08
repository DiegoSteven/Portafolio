import { Header } from "@/components/header"
import { HeroSectionNew } from "@/components/hero-section-new"
import { Footer } from "@/components/footer"

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <main>
        <HeroSectionNew />
      </main>
      <Footer />
    </div>
  )
}
