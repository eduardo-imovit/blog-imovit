'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header animate-fade-in">
      <div className="container header-container">
        <div className="header-logo-group">
          <Link href="/" className="header-logo" onClick={closeMobileMenu}>
            imovit
          </Link>
          <span className="header-tagline">lares com a sua alma.</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="header-nav header-nav-desktop" aria-label="Navegação Principal Desktop">
          <Link href="/" className="header-link">
            Blog
          </Link>
          <a 
            href="https://imovit.com.br" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="header-link"
          >
            Imóveis
          </a>
          <a 
            href="https://wa.me/5519971237841?text=Olá,%20gostaria%20de%20falar%20com%20um%20curador." 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary btn-sm"
          >
            Falar com Curador
          </a>
        </nav>

        {/* Hamburger Toggle Button for Mobile */}
        <button 
          className="header-mobile-toggle"
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay / Drawer */}
        <div className={`header-mobile-drawer-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={closeMobileMenu}>
          <div className="header-mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="header-drawer-header">
              <Link href="/" className="header-logo" onClick={closeMobileMenu}>
                imovit
              </Link>
              <button 
                className="header-mobile-close"
                onClick={closeMobileMenu}
                aria-label="Fechar menu"
              >
                <X size={24} />
              </button>
            </div>
            <nav className="header-drawer-nav" aria-label="Navegação Principal Móvel">
              <Link href="/" className="header-drawer-link" onClick={closeMobileMenu}>
                Blog
              </Link>
              <a 
                href="https://imovit.com.br" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="header-drawer-link"
                onClick={closeMobileMenu}
              >
                Imóveis
              </a>
              <a 
                href="https://wa.me/5519971237841?text=Olá,%20gostaria%20de%20falar%20com%20um%20curador." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary btn-drawer-cta w-full"
                onClick={closeMobileMenu}
              >
                Falar com Curador
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
