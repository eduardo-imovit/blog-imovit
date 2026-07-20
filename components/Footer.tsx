import { Instagram, Linkedin, MessageCircle, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-logo-group">
          <div className="footer-logo">imovit</div>
          <span className="footer-tagline">imóveis, pessoas e histórias.</span>
        </div>

        <div className="footer-socials">
          <a href="https://wa.me/5519971237841?text=Olá,%20gostaria%20de%20falar%20com%20um%20curador." target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="WhatsApp">
            <MessageCircle size={16} />
          </a>
          <a href="https://www.instagram.com/imovitimobiliaria/" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram">
            <Instagram size={16} />
          </a>
          <a href="https://www.linkedin.com/company/imovitimobiliaria" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="LinkedIn">
            <Linkedin size={16} />
          </a>
          <a href="https://imovit.com.br" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Website">
            <Globe size={16} />
          </a>
        </div>

        <div className="footer-copy">
          &copy; {new Date().getFullYear()} Imovit. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
