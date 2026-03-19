import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

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
