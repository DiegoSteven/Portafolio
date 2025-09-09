import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { AppWrapper } from '@/components/app-wrapper'
import './globals.css'

export const metadata: Metadata = {
  title: 'Portafolio Diego Hidalgo',
  description: 'Mi portafolio personal de proyectos y experiencia',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-slate-900">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
  background-color: rgb(15 23 42) !important;
}
body {
  background-color: rgb(15 23 42) !important;
}
        `}</style>
      </head>
      <body className="bg-slate-900">
        <AppWrapper>
          {children}
        </AppWrapper>
      </body>
    </html>
  )
}
