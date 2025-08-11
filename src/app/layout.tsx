import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Universal Character Library - 1000+ Animated 2D Characters",
  description: "The world's most comprehensive collection of customizable, animated 2D characters. 1000+ diverse characters with 500+ unique animations for web projects.",
  keywords: ["Character Library", "Animated Characters", "SVG Characters", "2D Characters", "Web Animation", "React", "Vue", "JavaScript", "Customizable Characters"],
  authors: [{ name: "Universal Character Library Team" }],
  openGraph: {
    title: "Universal Character Library",
    description: "1000+ diverse animated 2D characters for web projects",
    url: "https://github.com/VimalChaudhary07/universal-character-library",
    siteName: "Universal Character Library",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Universal Character Library",
    description: "1000+ diverse animated 2D characters for web projects",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
