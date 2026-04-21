"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect } from "react"
import { X, ArrowRight, ExternalLink, Check } from "lucide-react"

export type PreviewModalData = {
  id: string
  title: string
  kind: string
  description: string
  objective: string
  bullets: string[]
  isReal?: boolean
  href?: string
  preview: React.ReactNode
}

export function PreviewModal({ data, onClose }: { data: PreviewModalData | null; onClose: () => void }) {
  const open = !!data

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [open, onClose])

  const handleContactCta = () => {
    onClose()
    setTimeout(() => {
      const el = document.getElementById("contact")
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 60)
  }

  return (
    <AnimatePresence>
      {open && data ? (
        <motion.div
          key="preview-modal"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="preview-modal-title"
        >
          <motion.button aria-label="Fermer l'aperçu" onClick={onClose} className="absolute inset-0 bg-foreground/40 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-3xl bg-card card-shadow-lg ring-soft"
          >
            <button onClick={onClose} aria-label="Fermer" className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/80 text-foreground/70 backdrop-blur transition-all hover:-translate-y-[1px] hover:bg-card hover:text-foreground">
              <X size={16} strokeWidth={2.2} />
            </button>

            <div className="grid max-h-[90vh] grid-cols-1 overflow-auto lg:grid-cols-[1.25fr_0.95fr]">
              <div className="relative min-h-[360px] border-b border-border/70 bg-gradient-to-br from-muted/60 via-card to-muted p-5 sm:p-8 lg:min-h-[640px] lg:border-b-0 lg:border-r">
                <div className="absolute inset-0 dotted-grid opacity-40 mask-fade-radial pointer-events-none" />
                <div className="absolute left-5 top-5 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/80 px-2.5 py-1 text-[10.5px] font-medium uppercase tracking-wide text-muted-foreground backdrop-blur">{data.kind}</span>
                  {data.isReal ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-2.5 py-1 text-[10.5px] font-medium uppercase tracking-wide text-primary-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />Cas réel
                    </span>
                  ) : null}
                </div>
                <motion.div
                  initial={{ y: 16, opacity: 0, rotate: -1 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="relative h-full w-full overflow-hidden rounded-2xl border border-border/80 bg-card card-shadow-lg"
                >
                  {data.preview}
                </motion.div>
              </div>

              <div className="flex flex-col p-6 sm:p-8 md:p-10">
                <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Aperçu de projet</div>
                <h3 id="preview-modal-title" className="mt-2 text-[28px] sm:text-[34px] leading-[1.05] tracking-[-0.02em] font-semibold text-foreground text-balance">
                  {data.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground text-pretty">{data.description}</p>

                <div className="mt-7 rounded-xl border border-border/80 bg-background/60 p-4">
                  <div className="mb-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-accent">Objectif</div>
                  <div className="text-[15.5px] leading-snug text-foreground text-pretty">{data.objective}</div>
                </div>

                <ul className="mt-6 space-y-3">
                  {data.bullets.map((b, i) => (
                    <motion.li key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.15 + i * 0.07, ease: [0.16, 1, 0.3, 1] }} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-foreground text-primary-foreground">
                        <Check size={11} strokeWidth={3} />
                      </span>
                      <span className="text-[14.5px] leading-relaxed text-foreground/90">{b}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-6 rounded-xl border border-border/80 bg-muted/40 p-4 text-[13.5px] leading-relaxed text-muted-foreground">
                  Astuce : dans l&apos;aperçu à gauche, tu peux scroller pour parcourir la structure de la page et te faire une idée plus concrète du rendu.
                </div>

                <div className="mt-auto flex flex-col gap-3 pt-8">
                  <button onClick={handleContactCta} className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-[14.5px] font-medium text-primary-foreground transition-all hover:-translate-y-[2px] hover:shadow-xl hover:shadow-foreground/20">
                    <span>Demander un aperçu similaire</span>
                    <ArrowRight size={16} strokeWidth={2.2} className="transition-transform duration-300 group-hover:translate-x-1" />
                    <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/10" />
                  </button>
                  {data.href ? (
                    <a href={data.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-card px-5 py-2.5 text-[13px] font-medium text-foreground transition-all hover:-translate-y-[1px] hover:border-foreground">
                      <span>Voir le site en ligne</span>
                      <ExternalLink size={13} strokeWidth={2} />
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
