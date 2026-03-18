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
          <div className="relative min-h-screen">
            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
              <div className="absolute left-1/2 top-[-12rem] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute left-[8%] top-[28rem] h-[20rem] w-[20rem] rounded-full bg-white/5 blur-3xl" />
              <div className="absolute right-[10%] top-[14rem] h-[24rem] w-[24rem] rounded-full bg-white/5 blur-3xl" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.07),transparent_35%)]" />
            </div>

            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}