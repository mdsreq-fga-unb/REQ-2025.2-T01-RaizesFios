import type { Metadata, Viewport } from "next";
import "./globals.css";
import { GOOGLE_FONTS_URL } from "./constants/fonts";

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
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={GOOGLE_FONTS_URL} rel="stylesheet" />
      </head>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
