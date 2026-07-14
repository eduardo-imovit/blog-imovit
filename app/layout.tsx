import type { Metadata } from 'next';
import { Noto_Serif_Display, DM_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Configuração das fontes oficiais do Design System Imovit
const notoSerifDisplay = Noto_Serif_Display({
  variable: '--font-noto-serif',
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Blog Imovit — Imóveis, pessoas e histórias. Lares com a sua alma.',
  description: 'O blog oficial da Imovit Imobiliária. Curadoria boutique de imóveis de alto padrão em Campinas. Encontre artigos sobre mercado, bairros nobres e design de interiores.',
  keywords: 'imobiliaria boutique, imóveis campinas, cambui, gramado, alto padrão, blog imovit, decoraçao, mercado imobiliário',
  authors: [{ name: 'Imovit' }],
  openGraph: {
    title: 'Blog Imovit — Imóveis, pessoas e histórias.',
    description: 'Curadoria boutique de imóveis de alto padrão em Campinas. Lares com a sua alma.',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${notoSerifDisplay.variable} ${dmSans.variable}`}>
      <body>
        <Header />
        <main className="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
