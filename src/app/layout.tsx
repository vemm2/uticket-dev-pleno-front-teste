import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EventHub - Descubra eventos incríveis',
  description: 'Sistema de gerenciamento de eventos',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className}`}>
        <div className="app">
          <Navbar />
          <main className="main-content">
            {children}
          </main>
          <footer className="footer">
            <p>© 2025 EventHub - Todos os direitos reservados</p>
            <p className="footer-note">
              Dados fornecidos pela Ticketmaster Discovery API
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
