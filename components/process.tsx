"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const STEPS = [
  {
    id: "01",
    title: "Analyse",
    description:
      "Nous comprenons votre activité, votre audience et vos objectifs. Un brief court, précis, efficace.",
    duration: "48h",
  },
  {
    id: "02",
    title: "Aperçu",
    description:
      "Nous concevons un aperçu visuel personnalisé. Vous voyez avant de vous engager.",
    duration: "72h",
  },
  {
    id: "03",
    title: "Livraison",
    description:
      "Page livrée, déployée, prête à convertir. Optimisée pour la performance et l'expérience mobile.",
    duration: "5j",
  },
]

export function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 40%"],
  })

  const lineProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section id="process" className="relative py-28 sm:py-36 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10 mask-fade-radial opacity-70"
        aria-hidden
      >
        <div className="absolute inset-0 dotted-grid" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-[12px] text-muted-foreground"
          >
            <span className="h-1 w-1 rounded-full bg-accent" />
            <span className="tracking-wide uppercase">Notre process</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="mt-4 text-balance text-[36px] sm:text-[52px] leading-[1.05] tracking-[-0.03em] font-semibold text-foreground"
          >
            Trois étapes,{" "}
            <span
              className="italic font-normal"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              zéro friction.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
            className="mt-5 text-[16.5px] leading-relaxed text-muted-foreground max-w-xl"
          >
            Un flux clair, pensé pour que vous gardiez le contrôle — sans y passer vos journées.
          </motion.p>
        </div>

        <div ref={ref} className="relative mt-20">
          {/* Desktop: horizontal line */}
          <div
            className="hidden md:block absolute top-[46px] left-[10%] right-[10%] h-[2px] bg-border rounded-full"
            aria-hidden
          >
            <motion.div
              style={{ width: lineProgress }}
              className="h-full rounded-full bg-gradient-to-r from-accent via-accent to-accent/50"
            />
          </div>
          {/* Mobile: vertical line */}
          <div
            className="md:hidden absolute top-8 bottom-8 left-[46px] w-[2px] bg-border rounded-full"
            aria-hidden
          >
            <motion.div
              style={{ height: lineProgress }}
              className="w-full rounded-full bg-gradient-to-b from-accent via-accent to-accent/50"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 relative">
            {STEPS.map((step, i) => (
              <StepCard key={step.id} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function StepCard({
  step,
  index,
}: {
  step: (typeof STEPS)[number]
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      className="group relative flex md:flex-col items-start gap-5 md:gap-0"
    >
      {/* Node */}
      <div className="relative shrink-0 md:mb-8">
        <motion.div
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex h-[92px] w-[92px] items-center justify-center rounded-full bg-card ring-soft card-shadow"
        >
          <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-foreground text-primary-foreground">
            <span className="font-mono text-[15px] tracking-wider">
              {step.id}
            </span>
          </div>
          <div className="absolute -inset-1 rounded-full border border-accent/30 opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
        <div
          className="absolute -top-1 -right-1 rounded-full bg-accent px-2 py-0.5 text-[10.5px] font-medium text-accent-foreground shadow-md"
          aria-label={`Durée: ${step.duration}`}
        >
          {step.duration}
        </div>
      </div>

      <div className="flex-1 md:pr-6">
        <h3 className="text-[22px] font-semibold tracking-tight text-foreground">
          {step.title}
        </h3>
        <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted-foreground text-pretty">
          {step.description}
        </p>
      </div>
    </motion.div>
  )
}
