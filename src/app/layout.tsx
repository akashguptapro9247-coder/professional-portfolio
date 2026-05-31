import type { Metadata } from "next";
import { Syne, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Background from "@/components/Background";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Akash Gupta | AI-Augmented Full Stack Developer",
  description:
    "Portfolio of Akash Gupta — Second-year B.Tech CSE student, AI-Augmented Full Stack Developer. React, Next.js, Node.js, MongoDB.",
  keywords: [
    "Akash Gupta",
    "Full Stack Developer",
    "AI Engineer",
    "React Developer",
    "Next.js",
    "Portfolio",
  ],
  openGraph: {
    title: "Akash Gupta | AI-Augmented Full Stack Developer",
    description:
      "Second-year B.Tech CSE student building intelligent, scalable web applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-[#050816] text-[var(--text-primary)] antialiased min-h-screen" suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: `(function(){new MutationObserver(function(){document.querySelectorAll("[fdprocessedid]").forEach(function(e){e.removeAttribute("fdprocessedid")})}).observe(document.documentElement,{attributes:true,childList:true,subtree:true,attributeFilter:["fdprocessedid"]})})()` }} />
        <Background />
        <ScrollProgress />
        <Navbar />
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
