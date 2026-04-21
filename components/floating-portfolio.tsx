"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { PreviewModal, type PreviewModalData } from "./preview-modal"

type Theme = "bakery" | "lawyer" | "garage" | "wellness"

type Card = {
  id: string
  title: string
  kind: string
  description: string
  theme: Theme
  objective: string
  bullets: string[]
  isReal?: boolean
  href?: string
}

const CARDS: Card[] = [
  {
    id: "boulangerie",
    title: "Boulangerie artisanale",
    kind: "Maquette",
    description: "Vitrine locale pensée autour du produit, avec commande simple et rassurante.",
    theme: "bakery",
    objective: "Attirer la clientèle locale et faciliter les commandes du jour.",
    bullets: [
      "Hero chaleureux qui met en avant le savoir-faire",
      "Produits visibles en quelques secondes",
      "CTA direct vers la commande ou l'appel",
    ],
  },
  {
    id: "avocat",
    title: "Cabinet d'avocat",
    kind: "Maquette",
    description: "Identité sérieuse et rassurante, structurée pour déclencher la prise de rendez-vous.",
    theme: "lawyer",
    objective: "Renforcer la confiance et générer des demandes de consultation qualifiées.",
    bullets: [
      "Hero sobre et crédible, centré sur l'expertise",
      "Domaines d'intervention clairs et scannables",
      "Formulaire visible rapidement sans friction",
    ],
  },
  {
    id: "garage",
    title: "Garage automobile",
    kind: "Maquette",
    description: "Page orientée action avec devis express et services clés immédiatement visibles.",
    theme: "garage",
    objective: "Déclencher des demandes de devis rapidement, sans friction.",
    bullets: [
      "Hero impactant orienté réactivité",
      "Services essentiels mis en avant dès l'ouverture",
      "CTA devis express persistant et très visible",
    ],
  },
  {
    id: "doucementsoi",
    title: "Doucementsoi.fr",
    kind: "Cas réel",
    description: "Un site existant, plus éditorial, pensé pour rassurer et créer une connexion avant le contact.",
    theme: "wellness",
    objective: "Créer un pont émotionnel avant de guider vers la prise de rendez-vous.",
    bullets: [
      "Direction éditoriale douce avec hiérarchie apaisée",
      "Narration guidée : posture, méthode, rencontre",
      "Passage au contact simple et cohérent avec le ton du site",
    ],
    isReal: true,
    href: "https://doucementsoi.fr",
  },
]

export function FloatingPortfolio() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })

  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80])
  const y2 = useTransform(scrollYProgress, [0, 1], [40, -40])
  const y3 = useTransform(scrollYProgress, [0, 1], [100, -100])
  const y4 = useTransform(scrollYProgress, [0, 1], [20, -60])

  const parallax = [y1, y2, y3, y4]
  const rotations = [-4, 3, -2, 5]
  const [hovered, setHovered] = useState<string | null>(null)
  const [activeCard, setActiveCard] = useState<Card | null>(null)

  const modalData: PreviewModalData | null = activeCard
    ? {
        id: activeCard.id,
        title: activeCard.title,
        kind: activeCard.kind,
        description: activeCard.description,
        objective: activeCard.objective,
        bullets: activeCard.bullets,
        isReal: activeCard.isReal,
        href: activeCard.href,
        preview: activeCard.id === "doucementsoi" ? (
          <RealSitePreview url="https://doucementsoi.fr" />
        ) : (
          <MockPreview theme={activeCard.theme} large />
        ),
      }
    : null

  return (
    <section ref={ref} id="portfolio" className="relative overflow-hidden py-28 sm:py-36 scroll-mt-28">
      <div className="pointer-events-none absolute inset-0 -z-10 mask-fade-radial" aria-hidden>
        <div className="absolute inset-0 dotted-grid opacity-40" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Réalisations"
          title={
            <>
              Une sélection de pages{" "}
              <span className="italic font-normal" style={{ fontFamily: "var(--font-instrument-serif)" }}>
                pensées
              </span>{" "}
              pour convertir.
            </>
          }
          description="Chaque projet est conçu comme un produit : clair, rapide, orienté résultats."
        />

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] text-muted-foreground"
        >
          <span className="inline-flex items-center gap-1.5"><span className="h-1 w-1 rounded-full bg-accent" />Aperçus de concepts et cas réel</span>
          <span className="inline-flex items-center gap-1.5"><span className="h-1 w-1 rounded-full bg-accent" />Pensé pour les professionnels locaux</span>
          <span className="inline-flex items-center gap-1.5"><span className="h-1 w-1 rounded-full bg-accent" />Design orienté conversion</span>
        </motion.div>

        <div className="relative mt-16 h-[1400px] sm:h-[640px]">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.id}
              style={{ y: parallax[i], rotate: rotations[i] }}
              className={positionClass(i)}
              onMouseEnter={() => setHovered(card.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <PortfolioCard card={card} dimmed={hovered !== null && hovered !== card.id} onOpen={() => setActiveCard(card)} />
            </motion.div>
          ))}
        </div>
      </div>

      <PreviewModal data={modalData} onClose={() => setActiveCard(null)} />
    </section>
  )
}

function positionClass(i: number) {
  const positions = [
    "absolute left-[4%] top-[1%] w-[88%] sm:w-[44%] sm:top-[4%] sm:left-[2%] z-10",
    "absolute right-[4%] top-[26%] w-[88%] sm:w-[42%] sm:top-[18%] sm:right-[2%] z-20",
    "absolute left-[2%] top-[52%] w-[88%] sm:w-[40%] sm:top-[48%] sm:left-[6%] z-30",
    "absolute right-[2%] top-[76%] w-[88%] sm:w-[44%] sm:top-[32%] sm:right-[6%] z-40",
  ]
  return positions[i]
}

function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: React.ReactNode; description: string }) {
  return (
    <div className="max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-[12px] text-muted-foreground">
        <span className="h-1 w-1 rounded-full bg-accent" />
        <span className="tracking-wide uppercase">{eyebrow}</span>
      </motion.div>
      <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.08 }} className="mt-4 text-balance text-[36px] sm:text-[52px] leading-[1.05] tracking-[-0.03em] font-semibold text-foreground">
        {title}
      </motion.h2>
      <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.16 }} className="mt-5 max-w-xl text-[16.5px] leading-relaxed text-muted-foreground text-pretty">
        {description}
      </motion.p>
    </div>
  )
}

function PortfolioCard({ card, dimmed, onOpen }: { card: Card; dimmed: boolean; onOpen: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -8, scale: 1.02, rotate: 0 }}
      animate={{ opacity: dimmed ? 0.4 : 1, filter: dimmed ? "blur(2px)" : "blur(0px)" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onClick={onOpen}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl bg-card card-shadow ring-soft ${card.isReal ? "ring-1 ring-foreground/10" : ""}`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {card.id === "doucementsoi" ? <RealSitePreview url="https://doucementsoi.fr" compact /> : <MockPreview theme={card.theme} />}
        {card.isReal && (
          <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-foreground/90 px-2.5 py-1 text-[10.5px] font-medium uppercase tracking-wide text-primary-foreground backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />Cas réel
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-border/70 p-5 sm:p-6">
        <div className="min-w-0">
          <div className="mb-1 flex items-center gap-2">
            <h3 className="truncate text-[17px] font-semibold tracking-tight text-foreground">{card.title}</h3>
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10.5px] uppercase tracking-wide text-muted-foreground">{card.kind}</span>
          </div>
          <p className="line-clamp-1 text-[13.5px] leading-relaxed text-muted-foreground">{card.description}</p>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onOpen()
          }}
          className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-[12.5px] font-medium text-foreground transition-all group-hover:-translate-y-[1px] group-hover:border-foreground"
        >
          <span>Voir l&apos;aperçu</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </motion.div>
  )
}

function MockPreview({ theme, large = false }: { theme: Theme; large?: boolean }) {
  const innerHeight = large ? "min-h-[720px]" : "min-h-[460px]"
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f7f9fb] to-[#eef2f6] p-3">
      <div className="h-full overflow-auto rounded-[20px] border border-border bg-white">
        <div className={`relative ${innerHeight} overflow-hidden`}>
          <ThemeShell theme={theme} />
        </div>
      </div>
    </div>
  )
}

function ThemeShell({ theme }: { theme: Theme }) {
  if (theme === "bakery") {
    return (
      <div className="min-h-full bg-[#fbf5ed] text-[#3B2A14]">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#eadfce] bg-[#fbf5ed]/95 px-5 py-4 text-[11px] uppercase tracking-[0.18em] text-[#8B6B3D] backdrop-blur-sm">
          <span>Boulangerie</span><span>Produits · Commande · Contact</span>
        </div>
        <div className="px-5 pt-4 pb-8">
          <div className="overflow-hidden rounded-[28px] border border-[#eadfce] bg-white shadow-sm">
            <img src="/mock-bakery-scene.svg" alt="Aperçu d'une landing page de boulangerie" className="h-52 w-full object-cover" />
            <div className="bg-[#fbf5ed] p-6">
              <div className="text-[10px] uppercase tracking-[0.22em] text-[#8B6B3D]">Fabrication artisanale</div>
              <div className="mt-3 h-8 w-4/5 rounded bg-[#3B2A14]" />
              <div className="mt-3 h-3 w-3/5 rounded bg-[#3B2A14]/40" />
              <div className="mt-5 flex gap-3">
                <div className="h-10 w-32 rounded-full bg-[#3B2A14]" />
                <div className="h-10 w-28 rounded-full border border-[#3B2A14]/15 bg-white/70" />
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[28px] border border-[#eadfce] bg-white/85 p-4 shadow-sm">
              <div className="text-[10px] uppercase tracking-[0.18em] text-[#8B6B3D]">Nos spécialités</div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[0,1,2].map((idx) => (
                  <div key={idx} className="overflow-hidden rounded-2xl bg-[#f7efe2]">
                    <div className="h-24 bg-gradient-to-br from-[#E5C08C] via-[#D4A574] to-[#A67744]" />
                    <div className="p-3">
                      <div className="h-3 w-4/5 rounded bg-[#3B2A14]/75" />
                      <div className="mt-2 h-2.5 w-2/3 rounded bg-[#3B2A14]/15" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[28px] bg-[#3B2A14] p-5 text-white shadow-sm">
              <div className="text-[10px] uppercase tracking-[0.18em] text-[#E5C08C]">Commande rapide</div>
              <div className="mt-4 h-10 w-full rounded-xl bg-white/90" />
              <div className="mt-3 h-10 w-full rounded-xl bg-white/16" />
              <div className="mt-3 h-10 w-2/3 rounded-xl bg-white/16" />
              <div className="mt-4 h-11 w-full rounded-full bg-[#E5C08C]" />
            </div>
          </div>

          <div className="mt-6 rounded-[28px] border border-[#eadfce] bg-white/75 p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-[#8B6B3D]">Pourquoi ça convertit</div>
                <div className="mt-2 h-6 w-48 rounded bg-[#3B2A14]" />
              </div>
              <div className="hidden h-12 w-32 rounded-full bg-[#3B2A14] sm:block" />
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[0,1,2].map((idx) => (
                <div key={idx} className="rounded-2xl bg-[#f7efe2] p-4">
                  <div className="h-4 w-3/4 rounded bg-[#3B2A14]/70" />
                  <div className="mt-3 h-16 rounded-xl bg-white/70" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
  if (theme === "lawyer") {
    return (
      <div className="min-h-full bg-[#F5F2ED] text-[#1F2937]">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#e8dcc8] bg-[#F5F2ED]/95 px-5 py-4 text-[11px] uppercase tracking-[0.18em] text-[#7e6a44] backdrop-blur-sm">
          <span>Cabinet</span><span>Expertise · Équipe · Contact</span>
        </div>
        <div className="px-5 pt-4 pb-8">
          <div className="overflow-hidden rounded-[28px] border border-[#ddd1bc] bg-white shadow-sm">
            <img src="/mock-lawyer-scene.svg" alt="Aperçu d'une landing page de cabinet d'avocat" className="h-52 w-full object-cover" />
            <div className="p-6">
              <div className="h-2 w-20 rounded-full bg-[#C9A86B]" />
              <div className="mt-4 h-8 w-5/6 rounded bg-[#1F2937]" />
              <div className="mt-2 h-8 w-1/2 rounded bg-[#1F2937]" />
              <div className="mt-4 h-3 w-2/3 rounded bg-[#1F2937]/25" />
              <div className="mt-6 flex gap-3">
                <div className="h-10 w-40 rounded-sm bg-[#1F2937]" />
                <div className="h-10 w-28 rounded-sm border border-[#1F2937]/10 bg-white" />
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[0,1,2].map((idx) => (
              <div key={idx} className="rounded-2xl bg-white/70 p-4 shadow-sm ring-1 ring-[#e8dcc8]">
                <div className="text-[10px] uppercase tracking-[0.18em] text-[#7e6a44]">Pôle d'expertise</div>
                <div className="mt-4 h-5 w-3/4 rounded bg-[#1F2937]/80" />
                <div className="mt-3 h-3 w-full rounded bg-[#1F2937]/12" />
                <div className="mt-2 h-3 w-4/5 rounded bg-[#1F2937]/12" />
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[28px] bg-[#e8dcc8] p-5 shadow-sm">
              <div className="text-[10px] uppercase tracking-[0.18em] text-[#7e6a44]">Méthode</div>
              <div className="mt-4 space-y-3">
                <div className="h-16 rounded-2xl bg-white/65" />
                <div className="h-16 rounded-2xl bg-white/65" />
                <div className="h-16 rounded-2xl bg-white/65" />
              </div>
            </div>
            <div className="rounded-[28px] border border-[#ddd1bc] bg-white/75 p-5 shadow-sm">
              <div className="text-[10px] uppercase tracking-[0.18em] text-[#7e6a44]">Prendre rendez-vous</div>
              <div className="mt-4 h-10 w-full rounded-xl bg-[#1F2937]/8" />
              <div className="mt-3 h-10 w-full rounded-xl bg-[#1F2937]/8" />
              <div className="mt-3 h-24 w-full rounded-2xl bg-[#1F2937]/8" />
              <div className="mt-4 h-10 w-32 rounded-sm bg-[#1F2937]" />
            </div>
          </div>
        </div>
      </div>
    )
  }
  if (theme === "garage") {
    return (
      <div className="min-h-full bg-[#0F172A] text-white">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#0F172A]/95 px-5 py-4 text-[11px] uppercase tracking-[0.18em] text-[#F59E0B] backdrop-blur-sm">
          <span>Garage</span><span>Services · Devis · Contact</span>
        </div>
        <div className="px-5 pt-4 pb-8">
          <div className="overflow-hidden rounded-[28px] border border-white/12 bg-[#111c35] shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
            <img src="/mock-garage-scene.svg" alt="Aperçu d'une landing page de garage automobile" className="h-52 w-full object-cover" />
            <div className="p-6">
              <div className="h-3 w-28 rounded-full bg-[#F59E0B]" />
              <div className="mt-4 h-8 w-full rounded bg-white/95" />
              <div className="mt-2 h-8 w-2/3 rounded bg-white/95" />
              <div className="mt-4 h-3 w-1/2 rounded bg-white/25" />
              <div className="mt-6 flex gap-3">
                <div className="h-10 w-36 rounded-full bg-[#F59E0B]" />
                <div className="h-10 w-28 rounded-full border border-white/15 bg-white/10" />
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {[0,1,2].map((idx) => (
              <div key={idx} className="rounded-2xl border border-white/12 bg-white/5 p-4 shadow-sm">
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/55">Service</div>
                <div className="mt-4 h-5 w-3/4 rounded bg-white/90" />
                <div className="mt-3 h-3 w-full rounded bg-white/12" />
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[28px] border border-white/12 bg-white/5 p-5 shadow-sm">
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/55">Services clés</div>
              <div className="mt-4 space-y-3">
                <div className="h-16 rounded-2xl bg-white/8" />
                <div className="h-16 rounded-2xl bg-white/8" />
                <div className="h-16 rounded-2xl bg-white/8" />
              </div>
            </div>
            <div className="rounded-[28px] border border-white/12 bg-[#111c35] p-5 shadow-sm">
              <div className="text-[10px] uppercase tracking-[0.18em] text-[#F59E0B]">Devis express</div>
              <div className="mt-4 h-10 w-full rounded-xl bg-white/90" />
              <div className="mt-3 h-10 w-full rounded-xl bg-white/14" />
              <div className="mt-3 h-10 w-full rounded-xl bg-white/14" />
              <div className="mt-4 h-11 w-full rounded-full bg-[#F59E0B]" />
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-full bg-[#F5F1EC] text-[#3D3226]">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#e8ded3] bg-[#F5F1EC]/95 px-5 py-4 text-[11px] uppercase tracking-[0.18em] text-[#8B7355] backdrop-blur-sm">
        <span>Doucement Soi</span><span>Approche · Méthode · Contact</span>
      </div>
      <div className="px-5 pt-4 pb-8">
        <div className="text-[28px] italic leading-none" style={{ fontFamily: "var(--font-instrument-serif)" }}>Doucement avec soi.</div>
        <div className="mt-4 h-3 w-2/3 rounded bg-[#5C4A37]/35" />
        <div className="mt-2 h-3 w-1/2 rounded bg-[#5C4A37]/25" />
        <div className="mt-6 h-48 rounded-[28px] bg-gradient-to-br from-[#D4C4AD] via-[#BFA584] to-[#8B7355]" />
        <div className="mt-6 grid gap-3">
          <div className="h-24 rounded-2xl bg-white/55" />
          <div className="h-24 rounded-2xl bg-white/55" />
          <div className="h-12 w-40 rounded-full bg-[#3D3226]" />
        </div>
      </div>
    </div>
  )
}

function RealSitePreview({ url, compact = false }: { url: string; compact?: boolean }) {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#f5f1ec] via-[#e8dfd3] to-[#d8c9b4] p-3">
      <div className="flex h-full flex-col overflow-hidden rounded-[20px] border border-[#d9c8b5] bg-white/80 backdrop-blur-sm">
        <div className="flex items-center justify-between border-b border-[#e7dccf] px-4 py-2.5 text-[11px] text-[#6f5d48]">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#d89b92]" />
            <span className="h-2 w-2 rounded-full bg-[#e5c06a]" />
            <span className="h-2 w-2 rounded-full bg-[#95b895]" />
          </div>
          <span className="truncate">doucementsoi.fr</span>
        </div>
        <div className="relative flex-1 overflow-auto bg-[#f7f2ec]">
          <iframe
            src={url}
            title="Aperçu du site Doucementsoi"
            className="h-[880px] w-full origin-top-left border-0"
            style={{ transform: compact ? "scale(0.84)" : "scale(1)", transformOrigin: "top left", width: compact ? "119%" : "100%" }}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#f7f2ec] to-transparent" />
        </div>
      </div>
    </div>
  )
}