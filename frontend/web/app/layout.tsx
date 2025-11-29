import type { Metadata, Viewport } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";

// Configuração das fontes otimizadas
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "600", "700"],
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Raízes & Fios - Artesanato em Crochê",
  description: "Peças únicas de crochê feitas à mão com carinho. Bonecos personalizados, tapetes exclusivos e acessórios artesanais.",
  keywords: ["crochê", "artesanato", "bonecos", "tapetes", "acessórios", "feito à mão", "personalizado"],
  authors: [{ name: "Raízes & Fios" }],
  openGraph: {
    title: "Raízes & Fios - Artesanato em Crochê",
    description: "Peças únicas de crochê feitas à mão com carinho",
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${lato.variable}`}>
      <body className="antialiased font-sans bg-cream text-brown-text">
        {children}
      </body>
    </html>
  );
}
