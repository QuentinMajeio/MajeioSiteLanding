import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Gestion des cookies — MAJEIO",
  description: "Informations relatives aux cookies utilisés sur le site MAJEIO.",
}

export default function GestionCookiesPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-24 text-foreground">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-[13px] text-muted-foreground underline underline-offset-4">
          Retour à l&apos;accueil
        </Link>
        <h1 className="mt-6 text-[38px] font-semibold tracking-[-0.03em]">Gestion des cookies</h1>
        <div className="mt-10 space-y-8 text-[15px] leading-7 text-muted-foreground">
          <section>
            <h2 className="mb-2 text-[18px] font-semibold text-foreground">Cookies essentiels</h2>
            <p>
              Le site peut utiliser des cookies strictement nécessaires à son bon fonctionnement,
              notamment pour mémoriser votre choix concernant la bannière de consentement.
            </p>
          </section>
          <section>
            <h2 className="mb-2 text-[18px] font-semibold text-foreground">Cookies optionnels</h2>
            <p>
              Aucun cookie de mesure d&apos;audience ou marketing n&apos;est déposé sans votre consentement.
            </p>
          </section>
          <section>
            <h2 className="mb-2 text-[18px] font-semibold text-foreground">Gestion de votre choix</h2>
            <p>
              Vous pouvez accepter ou refuser les cookies via la bannière affichée lors de votre première visite.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
