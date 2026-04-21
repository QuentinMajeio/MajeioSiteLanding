import Link from "next/link"
import { LogoMark } from "./site-nav"

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border/70 bg-background">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <LogoMark size={28} />
            </div>
            <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-muted-foreground text-pretty">
              Studio digital. Nous concevons des landing pages pensées comme des produits — design, performance et conversion.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2 text-[13px] text-muted-foreground">
              <span className="font-medium text-foreground">Alan</span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span className="font-medium text-foreground">Quentin</span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span>Fondateurs</span>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 sm:gap-14">
            <div>
              <div className="mb-4 text-[11px] tracking-wider uppercase text-muted-foreground">Navigation</div>
              <ul className="space-y-2.5 text-[14px]">
                <li><Link href="#portfolio" className="text-foreground hover:text-accent transition-colors">Réalisations</Link></li>
                <li><Link href="#valeurs" className="text-foreground hover:text-accent transition-colors">Valeurs</Link></li>
                <li><Link href="#process" className="text-foreground hover:text-accent transition-colors">Process</Link></li>
                <li><Link href="#contact" className="text-foreground hover:text-accent transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <div className="mb-4 text-[11px] tracking-wider uppercase text-muted-foreground">Contact</div>
              <ul className="space-y-2.5 text-[14px]">
                <li><a href="mailto:contact@majeio.fr" className="text-foreground hover:text-accent transition-colors">contact@majeio.fr</a></li>
                                <li className="text-muted-foreground">47240 Castelculier · France</li>
                <li className="text-muted-foreground">Réponse sous 24h</li>
              </ul>
            </div>
            <div>
              <div className="mb-4 text-[11px] tracking-wider uppercase text-muted-foreground">Légal</div>
              <ul className="space-y-2.5 text-[14px]">
                <li><Link href="/mentions-legales" className="text-foreground hover:text-accent transition-colors">Mentions légales</Link></li>
                <li><Link href="/politique-de-confidentialite" className="text-foreground hover:text-accent transition-colors">Politique de confidentialité</Link></li>
                <li><Link href="/gestion-des-cookies" className="text-foreground hover:text-accent transition-colors">Gestion des cookies</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border/70 pt-6 text-[12.5px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} MAJEIO — Tous droits réservés.</p>
          <p className="font-mono tracking-wider">Pensé & conçu à la main.</p>
        </div>
      </div>
    </footer>
  )
}
