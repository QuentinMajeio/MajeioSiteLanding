import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Mentions légales — MAJEIO",
  description: "Mentions légales du site MAJEIO.",
}

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-24 text-foreground">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-[13px] text-muted-foreground underline underline-offset-4">
          Retour à l&apos;accueil
        </Link>
        <h1 className="mt-6 text-[38px] font-semibold tracking-[-0.03em]">Mentions légales</h1>
        <div className="mt-10 space-y-8 text-[15px] leading-7 text-muted-foreground">
          <section>
            <h2 className="mb-2 text-[18px] font-semibold text-foreground">Éditeur du site</h2>
            <p>MAJÉIO — Quentin Marlas</p>
            <p>Entrepreneur individuel</p>
            <p>SIREN : 894 645 563</p>
            <p>Code NAF : 5912Z</p>
            <p>Siège : 17 Avenue du général de Gaulle, 47240 Castelculier, France</p>
            <p>
              Email : <a href="mailto:contact@majeio.fr" className="text-foreground underline underline-offset-4">contact@majeio.fr</a>
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[18px] font-semibold text-foreground">Directeur de publication</h2>
            <p>Quentin Marlas</p>
          </section>

          <section>
            <h2 className="mb-2 text-[18px] font-semibold text-foreground">Hébergement</h2>
            <p>Le site est hébergé par o2switch, hébergeur web situé en France.</p>
          </section>

          <section>
            <h2 className="mb-2 text-[18px] font-semibold text-foreground">Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des contenus présents sur ce site, sauf mention contraire, est protégé
              par le droit d&apos;auteur et ne peut être reproduit sans autorisation préalable.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
