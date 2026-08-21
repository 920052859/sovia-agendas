import type { Metadata } from "next";
import {
  Bebas_Neue,
  Cormorant_Garamond,
  Fraunces,
  Geist,
  Geist_Mono,
  Outfit,
  Playfair_Display,
} from "next/font/google";
import "mouse-follower/dist/mouse-follower.min.css";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-romantic",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const fraunces = Fraunces({
  variable: "--font-creative",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const outfit = Outfit({
  variable: "--font-minimal",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const bebas = Bebas_Neue({
  variable: "--font-intense",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://agenda-viva-a5.754984.chatgpt.site"),
  title: "SoVia | Tu agenda personalizada al 100%",
  description:
    "Configurador interactivo SoVia para disenar agendas, calendarios y accesorios personalizados: cuestionario, metas, pasta, empastado, sellos premium y pedido PDF.",
  openGraph: {
    title: "SoVia | Tu agenda personalizada al 100%",
    description:
      "Disena tu agenda, calendario y vision board con SoVia: cuestionario, acabados premium y pedido PDF.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "SoVia, agenda personalizada, calendario y vision board",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SoVia | Tu agenda personalizada al 100%",
    description:
      "Disena tu agenda, calendario y vision board con SoVia: cuestionario, acabados premium y pedido PDF.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${cormorant.variable} ${fraunces.variable} ${outfit.variable} ${bebas.variable} antialiased`}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
