import Link from 'next/link';

export default function Header() {
  return (
    <header className="header animate-fade-in">
      <div className="container header-container">
        <div className="header-logo-group">
          <Link href="/" className="header-logo">
            imovit
          </Link>
          <span className="header-tagline">lares com a sua alma.</span>
        </div>

        <nav className="header-nav" aria-label="Navegação Principal">
          <Link href="/" className="header-link">
            Blog
          </Link>
          <a 
            href="https://imovitimobiliaria.com.br" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="header-link"
          >
            Imóveis
          </a>
          <a 
            href="https://wa.me/5519999999999" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary btn-sm"
          >
            Falar com Curador
          </a>
        </nav>
      </div>
    </header>
  );
}
