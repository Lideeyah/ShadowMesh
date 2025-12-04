import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { WalletProvider } from "@/context/WalletContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "ShadowMesh | Privacy-First Autonomous Agent Network",
  description: "Execute shielded, multi-chain actions across Zcash, Mina, Starknet, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        suppressHydrationWarning
        className={clsx(
          inter.variable,
          spaceGrotesk.variable,
          jetbrainsMono.variable,
          "antialiased bg-[#0A0A0A] text-white min-h-screen selection:bg-[#F4B728] selection:text-black"
        )}
      >
        <WalletProvider>
          <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a1a1a] via-[#0A0A0A] to-[#0A0A0A] -z-10" />
          {children}
        </WalletProvider>
      </body>
    </html>
  );
}
