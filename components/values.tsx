"use client"

import { motion } from "framer-motion"

const VALUES = [
  {
    title: "Rapide",
    description:
      "Livraison en quelques jours. Pas de process interminable — vous voyez des résultats, vite.",
    icon: BoltIcon,
    delay: 0,
  },
  {
    title: "Efficace",
    description:
      "Pensé pour la conversion. Chaque section, chaque mot, chaque pixel a une intention.",
    icon: TargetIcon,
    delay: 0.08,
  },
  {
    title: "Simple",
    description:
      "Vous n'avez rien à gérer. Brief, aperçu, livraison — on s'occupe du reste.",
    icon: SparkIcon,
    delay: 0.16,
  },
]

export function Values() {
  return (
    <section id="valeurs" className="relative py-28 sm:py-36">
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
            <span className="tracking-wide uppercase">Ce qui nous définit</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="mt-4 text-balance text-[36px] sm:text-[52px] leading-[1.05] tracking-[-0.03em] font-semibold text-foreground"
          >
            Trois principes,{" "}
            <span
              className="italic font-normal"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              zéro compromis.
            </span>
          </motion.h2>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: v.delay }}
              className={i === 1 ? "md:translate-y-6" : ""}
            >
              <ValueCard
                title={v.title}
                description={v.description}
                Icon={v.icon}
                floatDelay={i * -2}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ValueCard({
  title,
  description,
  Icon,
  floatDelay,
}: {
  title: string
  description: string
  Icon: (props: { className?: string }) => React.ReactNode
  floatDelay: number
}) {
  return (
    <div
      className="group relative rounded-2xl bg-card ring-soft card-shadow p-7 transition-all duration-500 hover:-translate-y-1.5 hover:card-shadow-lg"
      style={{ animationDelay: `${floatDelay}s` }}
    >
      <div className="absolute inset-x-0 -top-px mx-8 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex items-start gap-4">
        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-foreground text-primary-foreground transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-105">
          <Icon className="h-[18px] w-[18px]" />
          <span className="absolute inset-0 rounded-xl ring-1 ring-white/10" />
        </div>
        <div className="flex-1 pt-1">
          <h3 className="text-[20px] font-semibold tracking-tight text-foreground">
            {title}
          </h3>
          <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground text-pretty">
            {description}
          </p>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between text-[12px] text-muted-foreground">
        <span className="font-mono tracking-wider">
          0{VALUES.findIndex((x) => x.title === title) + 1}
        </span>
        <span className="h-[1px] flex-1 mx-4 bg-gradient-to-r from-border via-border/50 to-transparent" />
        <span className="text-accent font-medium tracking-wide uppercase text-[10.5px]">
          Principe
        </span>
      </div>
    </div>
  )
}

function BoltIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
    </svg>
  )
}

function TargetIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" />
    </svg>
  )
}

function SparkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6" />
    </svg>
  )
}
