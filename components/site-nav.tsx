"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={[
          "flex items-center gap-6 rounded-full px-3 py-2 pl-5 transition-all duration-500",
          scrolled
            ? "glass card-shadow"
            : "bg-transparent border border-transparent",
        ].join(" ")}
      >
        <Link href="#top" className="flex items-center group" aria-label="MAJEIO accueil">
          <LogoMark />
        </Link>

        <div className="hidden md:flex items-center gap-1 text-[13.5px] text-muted-foreground">
          <NavLink href="#portfolio">Réalisations</NavLink>
          <NavLink href="#valeurs">Valeurs</NavLink>
          <NavLink href="#process">Process</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </div>

        <Link
          href="#contact"
          className="group relative inline-flex items-center gap-1.5 rounded-full bg-foreground text-primary-foreground px-4 py-2 text-[13px] font-medium tracking-tight transition-all hover:shadow-lg hover:shadow-foreground/20 hover:-translate-y-[1px]"
        >
          <span>Aperçu gratuit</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover:translate-x-0.5"
            aria-hidden
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </Link>
      </nav>
    </motion.header>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="relative px-3 py-1.5 rounded-full transition-colors hover:text-foreground"
    >
      {children}
    </Link>
  )
}

export function LogoMark({ size = 42 }: { size?: number }) {
  return (
    <img
      src="/majeio-logo.png"
      alt="MAJEIO"
      className="h-auto w-auto object-contain"
      style={{ height: size, width: "auto", maxWidth: "none" }}
      aria-hidden
    />
  )
}
