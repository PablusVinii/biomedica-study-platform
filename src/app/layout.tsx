import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BioMédica — Plataforma de Estudos em Engenharia Biomédica",
  description:
    "Plataforma de estudos completa para o curso de Engenharia Biomédica. Grade curricular consolidada de UFPE, UFU, UNINTER e literatura canônica internacional. Acompanhe seu progresso em 62 blocos de estudo.",
  keywords: [
    "engenharia biomédica",
    "plataforma de estudos",
    "grade curricular",
    "biomédica",
    "instrumentação biomédica",
    "engenharia clínica",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
