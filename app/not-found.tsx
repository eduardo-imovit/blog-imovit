import Link from 'next/link';

export default function NotFound() {
  return (
    <div 
      className="container animate-fade-in" 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '60vh',
        textAlign: 'center',
        gap: 'var(--space-4)'
      }}
    >
      <span style={{ fontSize: '72px' }}>🍂</span>
      
      <h2 
        style={{ 
          fontFamily: 'var(--font-serif)', 
          fontSize: 'var(--text-2xl)', 
          fontWeight: 300,
          color: 'var(--grafite)'
        }}
      >
        Narrativa não encontrada.
      </h2>
      
      <p 
        style={{ 
          color: 'var(--grafite-soft)', 
          maxWidth: '460px', 
          lineHeight: 1.7,
          fontSize: 'var(--text-base)'
        }}
      >
        O lar ou a história que você procura pode ter mudado de endereço ou ainda não foi escrita por nossa curadoria.
      </p>
      
      <Link href="/" className="btn btn-primary" style={{ marginTop: 'var(--space-2)' }}>
        Voltar ao Início
      </Link>
    </div>
  );
}
