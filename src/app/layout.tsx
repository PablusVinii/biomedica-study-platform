import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

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
  manifest: "/manifest.json",
  applicationName: "BioMédica",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "BioMédica",
  },
  formatDetection: {
    telephone: false,
  },
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
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                const register = () => {
                  navigator.serviceWorker.register('/sw.js').then((reg) => {
                    console.log('SW registered successfully:', reg.scope);
                  }).catch((err) => {
                    console.error('SW registration failed:', err);
                  });
                };
                if (document.readyState === 'complete') {
                  register();
                } else {
                  window.addEventListener('load', register);
                }
              }
            `
          }}
        />
      </head>
      <body className="min-h-screen">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

