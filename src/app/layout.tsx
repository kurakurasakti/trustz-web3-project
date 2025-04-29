import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./main.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WagmiProvider } from "@/components/providers/WagmiProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TrustScore - AI-Powered Verifiable Identity",
  description:
    "AI-powered scoring system that analyzes your resume, GitHub, or LinkedIn and issues a Verifiable TrustScore as a VC tied to your DID.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${inter.variable} antialiased min-h-screen flex flex-col`}
      >
        <WagmiProvider>
          <ThemeProvider>
            <Header />
            <main className="pt-16 flex-grow">{children}</main>
            <Footer />
          </ThemeProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
