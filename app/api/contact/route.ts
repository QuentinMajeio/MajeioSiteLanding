import { NextResponse } from "next/server"
import { Resend } from "resend"

const resendApiKey = process.env.RESEND_API_KEY

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

export async function POST(req: Request) {
  try {
    if (!resendApiKey) {
      return NextResponse.json(
        { success: false, message: "La clé API Resend est absente côté serveur." },
        { status: 500 },
      )
    }

    const body = await req.json()

    const name = String(body?.name ?? "").trim()
    const email = String(body?.email ?? "").trim()
    const phone = String(body?.phone ?? "").trim()
    const company = String(body?.company ?? "").trim()
    const message = String(body?.message ?? "").trim()
    const consent = Boolean(body?.consent)

    if (!name || !email || !company || !message || !consent) {
      return NextResponse.json(
        { success: false, message: "Champs requis manquants." },
        { status: 400 },
      )
    }

    const resend = new Resend(resendApiKey)

    await resend.emails.send({
      from: "MAJEIO <contact@majeio.fr>",
      to: ["contact@majeio.fr"],
      replyTo: email,
      subject: `Nouveau lead MAJEIO — ${name}`,
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#11161C">
          <h2 style="margin:0 0 16px">Nouveau message depuis majeio.fr</h2>
          <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
          <p><strong>Email :</strong> ${escapeHtml(email)}</p>
          <p><strong>Téléphone :</strong> ${escapeHtml(phone || "Non renseigné")}</p>
          <p><strong>Entreprise :</strong> ${escapeHtml(company)}</p>
          <p><strong>Consentement :</strong> Oui</p>
          <p><strong>Message :</strong></p>
          <div style="padding:14px 16px;border:1px solid #D7E0E6;border-radius:12px;background:#F7F9FB;white-space:pre-wrap">${escapeHtml(message)}</div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form error", error)
    return NextResponse.json(
      { success: false, message: "Impossible d'envoyer le message pour le moment." },
      { status: 500 },
    )
  }
}
