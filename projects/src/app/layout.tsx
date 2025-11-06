import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Projects | Timi Olumchev",
  description: "Explore my collection of prototypes, SaaS applications, and interactive web experiences.",
  keywords: ["portfolio", "projects", "web development", "SaaS", "prototypes"],
  authors: [{ name: "Timi Olumchev" }],
  openGraph: {
    title: "Projects | Timi Olumchev",
    description: "Explore my collection of prototypes, SaaS applications, and interactive web experiences.",
    url: "https://timiolumchev.com/projects",
    siteName: "Timi Olumchev Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          {children}
        </div>
      </body>
    </html>
  );
}
