"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"

export function ImmersiveCTA() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 1.04])
  const yBg = useTransform(scrollYProgress, [0, 1], [-40, 40])

  return (
    <section ref={ref} className="relative py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          style={{ scale }}
          className="relative overflow-hidden rounded-[28px] card-shadow-lg"
        >
          {/* Background */}
          <motion.div
            style={{ y: yBg }}
            className="absolute inset-0 -z-10"
            aria-hidden
          >
            <div className="absolute inset-0 bg-foreground" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(800px 400px at 20% 10%, rgba(107,138,251,0.35), transparent 60%), radial-gradient(600px 300px at 80% 90%, rgba(167,189,255,0.25), transparent 60%), radial-gradient(500px 250px at 50% 50%, rgba(107,138,251,0.18), transparent 60%)",
              }}
            />
            <div className="absolute inset-0 bg-noise opacity-40 mix-blend-overlay" />
            {/* Moving grid */}
            <div
              className="absolute inset-0 opacity-[0.15]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
                maskImage:
                  "radial-gradient(ellipse at center, black 30%, transparent 80%)",
              }}
            />
          </motion.div>

          {/* Floating ambient orbs */}
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]"
            aria-hidden
          >
            <div className="absolute left-[-10%] top-[-20%] h-80 w-80 rounded-full bg-accent/30 blur-3xl animate-drift" />
            <div
              className="absolute right-[-10%] bottom-[-20%] h-96 w-96 rounded-full bg-accent/20 blur-3xl animate-drift"
              style={{ animationDelay: "-6s" }}
            />
          </div>

          <div className="relative px-6 sm:px-12 py-20 sm:py-28 text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm px-3.5 py-1.5 text-[12px] text-white/70"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-soft" />
              <span className="tracking-wide uppercase">Aperçu sans engagement</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="mx-auto mt-6 max-w-3xl text-balance text-[40px] sm:text-[60px] leading-[1.02] tracking-[-0.03em] font-semibold text-white"
            >
              Voyez concrètement ce qu&apos;on peut{" "}
              <span
                className="italic font-normal"
                style={{ fontFamily: "var(--font-instrument-serif)" }}
              >
                faire pour vous.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="mx-auto mt-5 max-w-xl text-[16.5px] leading-relaxed text-white/70"
            >
              Recevez un aperçu personnalisé gratuitement. Sans engagement, sans blabla.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="mt-10 flex justify-center"
            >
              <Link
                href="#contact"
                className="group relative inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-4 text-[15px] font-medium text-foreground transition-all hover:-translate-y-[2px] hover:shadow-2xl hover:shadow-accent/30"
              >
                <span>Recevoir mon aperçu</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-primary-foreground transition-transform duration-300 group-hover:rotate-[-45deg]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
