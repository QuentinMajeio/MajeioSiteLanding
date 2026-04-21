"use client"

import { motion } from "framer-motion"
import { useState } from "react"

type FormState = {
  nom: string
  email: string
  telephone: string
  entreprise: string
  message: string
  consent: boolean
}

const INITIAL: FormState = {
  nom: "",
  email: "",
  telephone: "",
  entreprise: "",
  message: "",
  consent: false,
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  function validate(data: FormState) {
    const e: Partial<Record<keyof FormState, string>> = {}
    if (!data.nom.trim()) e.nom = "Ce champ est requis"
    if (!data.email.trim()) e.email = "Ce champ est requis"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = "Email invalide"
    if (data.telephone.trim() && !/^(0|\+33)\s?[1-9](?:[\s.-]?\d{2}){4}$/.test(data.telephone.trim())) {
      e.telephone = "Format attendu : 06 00 00 00 00"
    }
    if (!data.entreprise.trim()) e.entreprise = "Ce champ est requis"
    if (!data.message.trim()) e.message = "Ce champ est requis"
    if (!data.consent) e.consent = "Merci de cocher la case pour être recontacté"
    return e
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const v = validate(form)
    setErrors(v)
    if (Object.keys(v).length > 0) return

    setStatus("loading")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.nom,
          email: form.email,
          phone: form.telephone,
          company: form.entreprise,
          message: form.message,
          consent: form.consent,
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data?.message || "Erreur lors de l'envoi")
      }

      setStatus("success")
      setForm(INITIAL)
      setErrors({})
    } catch (error) {
      console.error(error)
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-28 py-28 sm:py-36">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-[12px] text-muted-foreground"
            >
              <span className="h-1 w-1 rounded-full bg-accent" />
              <span className="tracking-wide uppercase">Contact</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              className="mt-4 text-balance text-[36px] sm:text-[48px] leading-[1.05] tracking-[-0.03em] font-semibold text-foreground"
            >
              Parlons de votre{" "}
              <span className="italic font-normal" style={{ fontFamily: "var(--font-instrument-serif)" }}>
                projet.
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
              className="mt-5 text-[16.5px] leading-relaxed text-muted-foreground text-pretty"
            >
              Décrivez votre activité et vos objectifs. Nous revenons vers vous avec une première piste visuelle claire et exploitable.
            </motion.p>

            <div className="mt-8 space-y-3 text-[14px]">
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-card ring-soft">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                </span>
                <a href="mailto:contact@majeio.fr" className="text-foreground font-medium hover:text-accent transition-colors">
                  contact@majeio.fr
                </a>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-card ring-soft">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                </span>
                <span>Réponse sous 24h ouvrées</span>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="rounded-2xl bg-card ring-soft card-shadow p-6 sm:p-8">
              {status === "success" ? (
                <SuccessState onReset={() => setStatus("idle")} />
              ) : (
                <form onSubmit={onSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field
                      id="nom"
                      label="Nom"
                      placeholder="Martin Dupont"
                      value={form.nom}
                      error={errors.nom}
                      onChange={(v) => setForm({ ...form, nom: v })}
                    />
                    <Field
                      id="email"
                      type="email"
                      label="Email"
                      placeholder="monentreprise@gmail.com"
                      value={form.email}
                      error={errors.email}
                      onChange={(v) => setForm({ ...form, email: v })}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field
                      id="telephone"
                      type="tel"
                      label="Téléphone"
                      hint="Optionnel"
                      placeholder="06 00 00 00 00"
                      value={form.telephone}
                      error={errors.telephone}
                      onChange={(v) => setForm({ ...form, telephone: v })}
                    />
                    <Field
                      id="entreprise"
                      label="Nom de l'entreprise"
                      placeholder="Majéio"
                      value={form.entreprise}
                      error={errors.entreprise}
                      onChange={(v) => setForm({ ...form, entreprise: v })}
                    />
                  </div>
                  <Field
                    id="message"
                    label="Message"
                    textarea
                    placeholder="Je souhaite une landing page plus premium et plus claire pour générer des demandes de contact."
                    value={form.message}
                    error={errors.message}
                    onChange={(v) => setForm({ ...form, message: v })}
                  />

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <span className="relative mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center">
                      <input
                        type="checkbox"
                        checked={form.consent}
                        onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                        className="peer sr-only"
                        aria-invalid={!!errors.consent}
                      />
                      <span className="h-5 w-5 rounded-md border border-border bg-card transition-all peer-checked:bg-foreground peer-checked:border-foreground peer-focus-visible:ring-2 peer-focus-visible:ring-accent/40" />
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="absolute text-primary-foreground opacity-0 peer-checked:opacity-100 transition-opacity" aria-hidden>
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </span>
                    <span className="text-[13.5px] leading-relaxed text-muted-foreground text-pretty">
                      J&apos;accepte d&apos;être recontacté concernant ma demande.
                    </span>
                  </label>
                  {errors.consent && <p className="text-[12.5px] text-red-500 -mt-2 pl-8">{errors.consent}</p>}

                  {status === "error" && (
                    <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-[12.5px] text-red-600">
                      Impossible d'envoyer votre demande pour le moment. Vérifiez la configuration Resend puis réessayez.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group relative inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-[14.5px] font-medium text-primary-foreground transition-all hover:-translate-y-[2px] hover:shadow-xl hover:shadow-foreground/20 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? (
                      <>
                        <span className="h-4 w-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
                        <span>Envoi en cours...</span>
                      </>
                    ) : (
                      <>
                        <span>Recevoir mon aperçu</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                          <path d="M5 12h14M13 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Field({
  id,
  label,
  hint,
  value,
  onChange,
  error,
  textarea,
  type = "text",
  placeholder,
}: {
  id: string
  label: string
  hint?: string
  value: string
  onChange: (value: string) => void
  error?: string
  textarea?: boolean
  type?: string
  placeholder?: string
}) {
  const baseClass = [
    "w-full rounded-2xl border bg-background px-4 py-3.5 text-[14.5px] text-foreground outline-none transition-all",
    error ? "border-red-400 focus:border-red-400" : "border-border focus:border-accent",
    "placeholder:text-muted-foreground/70",
  ].join(" ")

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-[13px] font-medium text-foreground">
          {label}
        </label>
        {hint ? <span className="text-[12px] text-muted-foreground">{hint}</span> : null}
      </div>
      {textarea ? (
        <textarea
          id={id}
          rows={5}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`${baseClass} min-h-[140px] resize-y`}
          aria-invalid={!!error}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`${baseClass} h-12`}
          aria-invalid={!!error}
        />
      )}
      {error ? <p className="mt-2 text-[12.5px] text-red-500">{error}</p> : null}
    </div>
  )
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-foreground text-primary-foreground shadow-lg shadow-foreground/10">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>
      <h3 className="mt-6 text-[26px] leading-tight font-semibold tracking-[-0.02em] text-foreground">
        Votre demande a bien été envoyée.
      </h3>
      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted-foreground text-pretty">
        Merci. Nous revenons vers vous rapidement avec une première réponse claire sur votre projet.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-[14px] font-medium text-foreground transition-all hover:-translate-y-[1px] hover:border-foreground"
      >
        Envoyer une autre demande
      </button>
    </div>
  )
}
