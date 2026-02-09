import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { DarkModeProvider } from "@/lib/DarkModeContext";
import { AuthProvider } from "@/lib/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VartaLang - India's Language Bridge",
  description: "Learn languages by connecting with real people across India",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        {/* Google Analytics (GA4) – Consent Mode, no cookies by default */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZX9RMWTWVR"
          strategy="afterInteractive"
        />

        <Script id="ga4-consent-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            // Default: no cookies, no tracking storage
            gtag('consent', 'default', {
              analytics_storage: 'denied'
            });

            gtag('js', new Date());
            gtag('config', 'G-ZX9RMWTWVR', {
              anonymize_ip: true,
              page_path: window.location.pathname,
            });
          `}
        </Script>

        <AuthProvider>
          <DarkModeProvider>
            {children}
          </DarkModeProvider>
        </AuthProvider>

      </body>
    </html>
  );
}
