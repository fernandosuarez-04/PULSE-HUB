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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
