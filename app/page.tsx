import { SiteNav } from "@/components/site-nav"
import { Hero } from "@/components/hero"
import { FloatingPortfolio } from "@/components/floating-portfolio"
import { Values } from "@/components/values"
import { Process } from "@/components/process"
import { ImmersiveCTA } from "@/components/immersive-cta"
import { ContactForm } from "@/components/contact-form"
import { SiteFooter } from "@/components/site-footer"

export default function HomePage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-clip">
      <SiteNav />
      <Hero />
      <FloatingPortfolio />
      <Values />
      <Process />
      <ImmersiveCTA />
      <ContactForm />
      <SiteFooter />
    </main>
  )
}
