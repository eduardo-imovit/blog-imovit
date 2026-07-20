'use client';

import { useState } from 'react';

interface NewsletterCTAProps {
  origemSlug?: string;
}

export default function NewsletterCTA({ origemSlug }: NewsletterCTAProps) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const validateEmail = (val: string) => {
    return val.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMsg('Por favor, informe um endereço de e-mail válido.');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          nome: nome.trim() || undefined,
          origem_slug: origemSlug || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('Falha na requisição');
      }

      setStatus('success');
      setNome('');
      setEmail('');
    } catch (err) {
      console.error('[Newsletter] Erro ao cadastrar:', err);
      setStatus('error');
      setErrorMsg('Não foi possível completar sua inscrição. Por favor, tente novamente.');
    }
  };

  return (
    <div className="newsletter-cta animate-fade-in">
      <div className="newsletter-container">
        {status === 'success' ? (
          <div className="newsletter-success">
            <div className="newsletter-success-icon">✓</div>
            <h3 className="newsletter-title">Inscrição confirmada!</h3>
            <p className="newsletter-desc">
              Obrigado por se inscrever. Em breve você receberá nossa curadoria de histórias e lares com significado no seu e-mail.
            </p>
          </div>
        ) : (
          <>
            <div className="newsletter-header">
              <h3 className="newsletter-title">Curadoria Imovit na sua caixa de entrada</h3>
              <p className="newsletter-desc">
                Receba análises exclusivas sobre arquitetura, bairros nobres e tendências do mercado imobiliário boutique de Campinas.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="newsletter-form">
              <div className="newsletter-inputs">
                <input
                  type="text"
                  placeholder="Seu nome (opcional)"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="newsletter-input"
                  disabled={status === 'loading'}
                  aria-label="Nome"
                />
                <input
                  type="email"
                  placeholder="Seu e-mail principal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newsletter-input"
                  required
                  disabled={status === 'loading'}
                  aria-label="E-mail"
                />
                <button
                  type="submit"
                  className="btn btn-primary newsletter-submit"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Enviando...' : 'Inscrever-se'}
                </button>
              </div>

              {status === 'error' && (
                <div className="newsletter-error-message">
                  {errorMsg}
                </div>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}
