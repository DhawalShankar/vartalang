import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { DarkModeProvider } from "@/lib/DarkModeContext";
import { AuthProvider } from "@/lib/AuthContext";
import Analytics from "@/components/Analytics";

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

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7WM95MNBGL"
          strategy="afterInteractive"
        />

        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            gtag('js', new Date());

            gtag('config', 'G-7WM95MNBGL', {
              anonymize_ip: true,
              send_page_view: false
            });
          `}
        </Script>

        <AuthProvider>
          <DarkModeProvider>
            <Analytics />
            {children}
          </DarkModeProvider>
        </AuthProvider>

      </body>
    </html>
  );
}
