import type { Metadata } from "next";
import { Geist, Geist_Mono, Yatra_One } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { DarkModeProvider } from "@/lib/DarkModeContext";
import { AuthProvider } from "@/lib/AuthContext";
import Analytics from "@/components/Analytics";
import { GoogleOAuthProvider } from "@react-oauth/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const yatraOne = Yatra_One({
  variable: "--font-yatra-one",
  weight: "400",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${yatraOne.variable} antialiased`}
      >

        {/* Google Analytics */}
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

        {/* Google Ads */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18474647156"
          strategy="afterInteractive"
        />

        <Script id="google-ads-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            gtag('js', new Date());

            gtag('config', 'AW-18474647156');
          `}
        </Script>

        <GoogleOAuthProvider clientId={process.env.CLIENT_ID || ""}>
          <AuthProvider>
            <DarkModeProvider>
              <Analytics />
              {children}
            </DarkModeProvider>
          </AuthProvider>
        </GoogleOAuthProvider>

      </body>
    </html>
  );
}