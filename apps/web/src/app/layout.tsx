import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pulse Hub",
  description: "Tres pilares para capacitar, adoptar y automatizar con ROI medible y cumplimiento. Ecosistema humano-tecnológico para acelerar la adopción de IA en empresas.",
  keywords: ["adopción IA", "inteligencia artificial empresas", "capacitación IA", "automatización responsable", "ROI IA"],
  icons: {
    icon: [
      { url: '/icono.png', sizes: '32x32', type: 'image/png' },
      { url: '/icono.png', sizes: '16x16', type: 'image/png' }
    ],
    shortcut: '/icono.png',
    apple: '/icono.png',
  },
  other: {
    'ai-context-docs': 'ESTRATEGIA-ADOPCION-IA.md, PRD-PULSE-HUB.md, DESIGN-SYSTEM-PROMPT.md, ARCHITECTURE.md',
    'ai-strategy-doc': '../../docs/product/ESTRATEGIA-ADOPCION-IA.md',
    'ai-prd-doc': '../../docs/product/PRD-PULSE-HUB.md',
    'ai-design-doc': '../../docs/design/DESIGN-SYSTEM-PROMPT.md',
    'ai-architecture-doc': '../../docs/reference/ARCHITECTURE.md',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      {/* 
        Documentación de Contexto para Asistentes IA:
        - Estrategia de Adopción IA: ../../docs/product/ESTRATEGIA-ADOPCION-IA.md
        - PRD Completo: ../../docs/product/PRD-PULSE-HUB.md
        - Design System: ../../docs/design/DESIGN-SYSTEM-PROMPT.md
        - Arquitectura: ../../docs/reference/ARCHITECTURE.md
      */}
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
