import type { Metadata, Viewport } from "next"
import { Inter, Instrument_Serif, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { CookieBanner } from "@/components/cookie-banner"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://majeio.fr"),
  title: "MAJEIO — Landing pages qui transforment vos visiteurs en clients",
  description:
    "Studio digital premium. Design, performance et simplicité au service de votre croissance. Obtenez un aperçu gratuit de votre future landing page.",
  keywords: [
    "MAJEIO",
    "landing page",
    "design premium",
    "studio digital",
    "automation",
    "conversion",
  ],
  authors: [{ name: "Alan & Quentin" }],
  creator: "MAJEIO",
  openGraph: {
    title: "MAJEIO — Studio digital premium",
    description: "Des landing pages qui transforment vos visiteurs en clients.",
    url: "https://majeio.fr",
    siteName: "MAJEIO",
    locale: "fr_FR",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#F7F9FB",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${instrumentSerif.variable} ${geistMono.variable} bg-background`}
    >
      <body className="font-sans antialiased text-foreground">
        {children}
        <CookieBanner />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
