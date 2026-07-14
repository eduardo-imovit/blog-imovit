import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-logo-group">
          <div className="footer-logo">imovit</div>
          <span className="footer-tagline">imóveis, pessoas e histórias.</span>
        </div>

        <div className="footer-copy">
          &copy; {new Date().getFullYear()} Imovit. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
