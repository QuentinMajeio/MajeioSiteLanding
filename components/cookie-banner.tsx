"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const COOKIE_KEY = "majeio-cookie-consent"

export function CookieBanner() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const stored = window.localStorage.getItem(COOKIE_KEY)
    if (!stored) setOpen(true)
  }, [])

  function save(value: "accepted" | "refused") {
    window.localStorage.setItem(COOKIE_KEY, value)
    setOpen(false)
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 18 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-[120] px-4 pb-4 sm:px-6 sm:pb-6"
        >
          <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card/95 p-4 sm:p-5 card-shadow-lg backdrop-blur-xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-[14.5px] font-medium text-foreground">Gestion des cookies</p>
                <p className="mt-1 text-[13.5px] leading-relaxed text-muted-foreground">
                  Ce site utilise uniquement des cookies essentiels au bon fonctionnement par défaut.
                  Aucun suivi marketing n&apos;est déposé sans consentement. Consultez notre{" "}
                  <Link href="/politique-de-confidentialite" className="text-foreground underline underline-offset-4">
                    politique de confidentialité
                  </Link>
                  .
                </p>
              </div>
              <div className="flex flex-col-reverse gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={() => save("refused")}
                  className="inline-flex items-center justify-center rounded-full border border-border bg-background px-4 py-2.5 text-[13.5px] font-medium text-foreground transition-all hover:-translate-y-[1px] hover:border-foreground"
                >
                  Refuser
                </button>
                <button
                  type="button"
                  onClick={() => save("accepted")}
                  className="inline-flex items-center justify-center rounded-full bg-foreground px-4 py-2.5 text-[13.5px] font-medium text-primary-foreground transition-all hover:-translate-y-[1px] hover:shadow-lg hover:shadow-foreground/20"
                >
                  Accepter
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
