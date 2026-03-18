import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PersonaFlux",
  description:
    "Crée un clone IA visuel premium, monétisable et prêt pour de vraies conversations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="fr" suppressHydrationWarning>
        <body
          className={`${inter.variable} min-h-screen bg-black font-sans text-white antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}