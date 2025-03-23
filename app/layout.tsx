import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cristo Salva - Iglesia Evangélica",
  description: "Compartiendo el mensaje de esperanza y salvación a través de la fe en Cristo Jesús.",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head />
      <body className="min-h-screen bg-[#0a0a0f] font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <main className="min-h-screen">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'