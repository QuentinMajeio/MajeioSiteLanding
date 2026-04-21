import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Politique de confidentialité — MAJEIO",
  description: "Politique de confidentialité du site MAJEIO.",
}

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="min-h-screen bg-background px-6 py-24 text-foreground">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-[13px] text-muted-foreground underline underline-offset-4">
          Retour à l&apos;accueil
        </Link>
        <h1 className="mt-6 text-[38px] font-semibold tracking-[-0.03em]">Politique de confidentialité</h1>
        <div className="mt-10 space-y-8 text-[15px] leading-7 text-muted-foreground">
          <section>
            <h2 className="mb-2 text-[18px] font-semibold text-foreground">Données collectées</h2>
            <p>
              Lorsque vous utilisez le formulaire de contact, nous pouvons collecter votre nom,
              votre email, votre téléphone, le nom de votre entreprise et le contenu de votre message.
            </p>
          </section>
          <section>
            <h2 className="mb-2 text-[18px] font-semibold text-foreground">Finalité</h2>
            <p>
              Ces données sont utilisées uniquement pour répondre à votre demande, échanger au sujet
              de votre projet et assurer le suivi commercial lié à cette prise de contact.
            </p>
          </section>
          <section>
            <h2 className="mb-2 text-[18px] font-semibold text-foreground">Durée de conservation</h2>
            <p>
              Les données sont conservées pendant la durée strictement nécessaire au traitement de la
              demande et au suivi de la relation commerciale.
            </p>
          </section>
          <section>
            <h2 className="mb-2 text-[18px] font-semibold text-foreground">Vos droits</h2>
            <p>
              Vous pouvez demander l&apos;accès, la rectification ou la suppression de vos données à tout moment en écrivant à{" "}
              <a href="mailto:contact@majeio.fr" className="text-foreground underline underline-offset-4">contact@majeio.fr</a>.
            </p>
          </section>
          <section>
            <h2 className="mb-2 text-[18px] font-semibold text-foreground">Partage des données</h2>
            <p>Aucune revente de données personnelles n&apos;est effectuée.</p>
          </section>
        </div>
      </div>
    </main>
  )
}
