"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  // Parallax layers
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 120])
  const yMid = useTransform(scrollYProgress, [0, 1], [0, 220])
  const yFg = useTransform(scrollYProgress, [0, 1], [0, 340])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-[100svh] w-full overflow-hidden pt-28 pb-24 sm:pt-36"
    >
      {/* Background gradient wash */}
      <motion.div
        style={{ y: yBg }}
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1200px 600px at 50% -10%, rgba(107,138,251,0.18), transparent 60%), radial-gradient(900px 500px at 85% 10%, rgba(167,189,255,0.18), transparent 60%), radial-gradient(700px 400px at 10% 20%, rgba(17,22,28,0.04), transparent 60%)",
          }}
        />
        <div className="absolute inset-0 dotted-grid opacity-[0.5] mask-fade-radial" />
        <div className="absolute inset-0 bg-noise opacity-[0.35] mix-blend-multiply" />
      </motion.div>

      {/* Floating mid layer shapes */}
      <motion.div
        style={{ y: yMid, opacity }}
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      >
        <div
          className="absolute left-[6%] top-[28%] h-40 w-40 rounded-full blur-2xl animate-drift"
          style={{ background: "radial-gradient(circle, rgba(107,138,251,0.45), transparent 70%)" }}
        />
        <div
          className="absolute right-[8%] top-[18%] h-56 w-56 rounded-full blur-3xl animate-drift"
          style={{
            background: "radial-gradient(circle, rgba(167,189,255,0.4), transparent 70%)",
            animationDelay: "-4s",
          }}
        />
        <div
          className="absolute left-[40%] bottom-[10%] h-72 w-72 rounded-full blur-3xl animate-drift"
          style={{
            background: "radial-gradient(circle, rgba(107,138,251,0.25), transparent 70%)",
            animationDelay: "-8s",
          }}
        />
      </motion.div>

      {/* Main content */}
      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 glass px-3.5 py-1.5 text-[12.5px] text-muted-foreground"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          <span className="tracking-tight">Studio digital — disponible en mai</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="relative z-10 mx-auto max-w-5xl rounded-[30px] bg-background/66 px-5 py-4 text-center text-balance text-[44px] leading-[1.03] tracking-[-0.03em] shadow-[0_20px_80px_-32px_rgba(17,22,28,0.22)] backdrop-blur-md sm:px-8 sm:py-6 sm:text-[64px] md:text-[76px] font-semibold text-foreground"
        >
          Des landing pages qui{" "}
          <span className="relative inline-block">
            <span
              className="italic font-normal"
              style={{ fontFamily: "var(--font-instrument-serif)" }}
            >
              transforment
            </span>
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 300 12"
              fill="none"
              aria-hidden
            >
              <motion.path
                d="M2 8 C 80 2, 220 2, 298 8"
                stroke="#6B8AFB"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
            </svg>
          </span>{" "}
          vos visiteurs en clients.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative z-10 mx-auto mt-7 max-w-xl rounded-[24px] bg-background/58 px-5 py-4 text-center text-[17px] leading-relaxed text-muted-foreground text-pretty shadow-[0_20px_80px_-40px_rgba(17,22,28,0.25)] backdrop-blur-md"
        >
          Design premium. Performance. Simplicité. Nous concevons des pages qui
          convertissent, pensées comme des produits.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            href="#contact"
            className="group relative inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-[14.5px] font-medium text-primary-foreground transition-all hover:-translate-y-[2px] hover:shadow-xl hover:shadow-foreground/20"
          >
            <span>Obtenir un aperçu gratuit</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
            <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/10" />
          </Link>
          <Link
            href="#portfolio"
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-card/60 glass px-5 py-3.5 text-[14.5px] font-medium text-foreground transition-all hover:bg-card hover:-translate-y-[1px]"
          >
            <span>Voir nos réalisations</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-y-0.5"
              aria-hidden
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </Link>
        </motion.div>

        <div className="pointer-events-none absolute left-1/2 top-[18%] h-[240px] w-[min(88vw,820px)] -translate-x-1/2 rounded-full bg-white/70 blur-3xl" aria-hidden />

        {/* Floating UI frames */}
        <motion.div
          style={{ y: yFg }}
          className="relative mx-auto mt-20 h-[380px] sm:h-[460px] max-w-5xl opacity-90"
          aria-hidden
        >
          {/* LEFT — Analytics (meaningful, kept) */}
          <FloatingFrame
            className="absolute left-[2%] top-[10%] w-[220px] sm:w-[260px] rotate-[-7deg]"
            delay={0.1}
            style={{ ["--r" as string]: "-7deg" }}
            floatClass="animate-float-lg"
          >
            <AnalyticsMock />
          </FloatingFrame>

          {/* CENTER — Landing preview with label */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[300px] sm:w-[380px] z-20">
            <FloatingTag className="absolute -top-3 left-1/2 -translate-x-1/2" delay={0.55}>
              Aperçu personnalisé
            </FloatingTag>
            <FloatingFrame
              className=""
              delay={0.2}
              style={{ ["--r" as string]: "0deg" }}
              floatClass="animate-float"
            >
              <LandingMock />
            </FloatingFrame>
          </div>

          {/* RIGHT — Contact form preview with label */}
          <div className="absolute right-[2%] top-[14%] w-[220px] sm:w-[260px]">
            <FloatingTag
              className="absolute -top-3 right-3 rotate-[4deg]"
              delay={0.65}
              tone="foreground"
            >
              Formulaire optimisé
            </FloatingTag>
            <FloatingFrame
              className="rotate-[6deg]"
              delay={0.3}
              style={{ ["--r" as string]: "6deg" }}
              floatClass="animate-float-slow"
            >
              <FormMock />
            </FloatingFrame>
          </div>
        </motion.div>
      </div>

      {/* Fade out bottom */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-background" />
    </section>
  )
}

function FloatingFrame({
  children,
  className,
  delay = 0,
  style,
  floatClass = "animate-float",
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  style?: React.CSSProperties
  floatClass?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.4 + delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={style}
    >
      <div className={floatClass}>
        <div className="rounded-2xl bg-card card-shadow-lg ring-soft overflow-hidden">
          {children}
        </div>
      </div>
    </motion.div>
  )
}

function FloatingTag({
  children,
  className,
  delay = 0,
  tone = "card",
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  tone?: "card" | "foreground"
}) {
  const isDark = tone === "foreground"
  return (
    <motion.div
      initial={{ opacity: 0, y: -4, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.4 + delay, ease: [0.16, 1, 0.3, 1] }}
      className={`z-30 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10.5px] font-medium tracking-wide uppercase shadow-sm ${
        isDark
          ? "bg-foreground text-primary-foreground"
          : "bg-card border border-border text-muted-foreground"
      } ${className ?? ""}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isDark ? "bg-accent" : "bg-foreground"
        } animate-pulse-soft`}
      />
      {children}
    </motion.div>
  )
}

/* -------------------- Mocks -------------------- */

function AnalyticsMock() {
  return (
    <div className="p-4 bg-background w-full">
      <div className="flex items-center justify-between mb-3">
        <div className="h-2 w-14 rounded-full bg-muted" />
        <div className="h-2 w-8 rounded-full bg-accent/60" />
      </div>
      <div className="mb-2">
        <div className="text-[18px] font-semibold text-foreground tracking-tight">+42%</div>
        <div className="text-[9px] text-muted-foreground">conversions / mois</div>
      </div>
      <div className="relative h-20 rounded-lg bg-gradient-to-br from-accent/5 to-muted overflow-hidden">
        <svg viewBox="0 0 200 80" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6B8AFB" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#6B8AFB" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,60 C30,55 50,40 80,35 C110,30 130,20 160,25 C180,28 190,15 200,10 L200,80 L0,80 Z"
            fill="url(#g1)"
          />
          <path
            d="M0,60 C30,55 50,40 80,35 C110,30 130,20 160,25 C180,28 190,15 200,10"
            stroke="#6B8AFB"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>
      <div className="mt-3 space-y-1.5">
        <div className="flex items-center justify-between">
          <div className="h-1.5 w-10 rounded bg-muted" />
          <div className="h-1.5 w-6 rounded bg-foreground/80" />
        </div>
        <div className="flex items-center justify-between">
          <div className="h-1.5 w-14 rounded bg-muted" />
          <div className="h-1.5 w-8 rounded bg-foreground/80" />
        </div>
      </div>
    </div>
  )
}

function LandingMock() {
  return (
    <div className="bg-background w-full">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 border-b border-border bg-muted/50 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
        <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
        <span className="h-2 w-2 rounded-full bg-[#28C840]" />
        <div className="ml-2 flex flex-1 justify-center">
          <div className="inline-flex items-center gap-1 rounded-[4px] border border-border bg-card px-2 py-0.5">
            <svg
              width="8"
              height="8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              className="text-muted-foreground"
              aria-hidden
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <div className="text-[7.5px] tracking-tight text-muted-foreground">
              majeio.studio/apercu
            </div>
          </div>
        </div>
      </div>

      {/* Page */}
      <div className="p-4">
        {/* Nav */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-sm bg-foreground" />
            <div className="h-2 w-12 rounded bg-foreground" />
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-6 rounded bg-muted-foreground/40" />
            <div className="h-1.5 w-6 rounded bg-muted-foreground/40" />
            <div className="h-1.5 w-6 rounded bg-muted-foreground/40" />
            <div className="ml-1 h-4 w-12 rounded-full bg-foreground" />
          </div>
        </div>

        {/* Hero */}
        <div className="mb-4 flex flex-col items-center text-center">
          <div className="mb-1.5 inline-flex items-center gap-1 rounded-full border border-border bg-card px-1.5 py-0.5">
            <span className="h-1 w-1 rounded-full bg-accent" />
            <span className="text-[7px] tracking-[0.15em] uppercase text-muted-foreground">
              Local · Premium
            </span>
          </div>
          <div className="mb-1 h-2.5 w-40 rounded bg-foreground" />
          <div className="mb-2 h-2.5 w-28 rounded bg-foreground" />
          <div className="mb-3 h-1.5 w-44 rounded bg-muted-foreground/40" />
          <div className="flex items-center gap-1.5">
            <div className="flex h-5 items-center gap-1 rounded-full bg-foreground px-2">
              <div className="h-1 w-10 rounded bg-primary-foreground" />
              <svg
                width="6"
                height="6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-primary-foreground"
                aria-hidden
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </div>
            <div className="h-5 w-14 rounded-full border border-border" />
          </div>
        </div>

        {/* Feature blocks */}
        <div className="grid grid-cols-3 gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-md border border-border bg-card p-1.5"
            >
              <div className="mb-1 h-2 w-2 rounded-[3px] bg-accent" />
              <div className="mb-0.5 h-1 w-full rounded bg-foreground/70" />
              <div className="mb-1 h-1 w-3/4 rounded bg-foreground/70" />
              <div className="h-0.5 w-full rounded bg-muted-foreground/30" />
              <div className="mt-0.5 h-0.5 w-2/3 rounded bg-muted-foreground/30" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function FormMock() {
  return (
    <div className="w-full bg-background p-4">
      {/* Header */}
      <div className="mb-3 flex items-start justify-between">
        <div>
          <div className="mb-1 text-[8px] font-semibold tracking-[0.2em] uppercase text-accent">
            Demande de contact
          </div>
          <div className="h-2.5 w-24 rounded bg-foreground" />
        </div>
        <div className="flex items-center gap-1 rounded-full border border-border bg-card px-1.5 py-0.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse-soft" />
          <span className="text-[7.5px] tracking-tight text-muted-foreground">En ligne</span>
        </div>
      </div>

      {/* Fields */}
      <div className="space-y-2">
        <FieldMock width="w-6" />
        <FieldMock width="w-10" focused />
        <FieldMock width="w-8" tall />
      </div>

      {/* Footer: hint + CTA */}
      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="text-[7.5px] tracking-tight text-muted-foreground">
          Réponse &lt; 24h
        </div>
        <div className="inline-flex h-6 items-center gap-1 rounded-full bg-foreground px-2.5">
          <div className="h-1 w-10 rounded bg-primary-foreground/90" />
          <svg
            width="7"
            height="7"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-primary-foreground"
            aria-hidden
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  )
}

function FieldMock({
  width,
  focused = false,
  tall = false,
}: {
  width: string
  focused?: boolean
  tall?: boolean
}) {
  return (
    <div>
      <div className={`mb-1 h-1 ${width} rounded bg-muted-foreground/50`} />
      <div
        className={`${tall ? "h-10" : "h-6"} rounded-md border bg-card ${
          focused
            ? "border-accent ring-2 ring-accent/20"
            : "border-border"
        }`}
      >
        {focused && (
          <div className="flex h-full items-center px-2">
            <div className="h-1 w-10 rounded bg-foreground/70" />
            <div className="ml-0.5 h-3 w-[1.5px] rounded bg-foreground animate-pulse-soft" />
          </div>
        )}
      </div>
    </div>
  )
}
