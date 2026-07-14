import Link from 'next/link';
import { getPostBySlug } from '@/lib/supabase';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Mapeia a classe do badge baseada no tema e emoji para preservar o design original
  const getBadgeClass = (theme: string, emoji: string) => {
    switch (theme) {
      case 'bairros': return 'badge-solteiros'; // Argila
      case 'arquitetura': return emoji === '🌿' ? 'badge-familia' : 'badge-casais'; // Sálvia ou Rosé
      case 'mercado': return 'badge-invest'; // Petróleo
      case 'lifestyle': return 'badge-gold'; // Gold Fosco
      default: return 'badge-gray';
    }
  };

  // Mapeia a cor da barra de segmento baseada no tema e emoji
  const getSegmentColor = (theme: string, emoji: string) => {
    switch (theme) {
      case 'bairros': return 'var(--solteiros)';
      case 'arquitetura': return emoji === '🌿' ? 'var(--ninho-cheio)' : 'var(--casais)';
      case 'mercado': return 'var(--investidores)';
      case 'lifestyle': return 'var(--ninho-vazio)';
      default: return 'var(--coral)';
    }
  };

  // Iniciais do autor para o avatar
  const getAuthorInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <article className="container animate-fade-in" style={{ paddingBottom: 'var(--space-8)' }}>
      {/* Cabeçalho do Artigo */}
      <header className="article-header">
        <div className="article-eyebrow">
          <span className={`badge ${getBadgeClass(post.theme, post.emoji)}`}>
            ● {post.themeLabel}
          </span>
          <span>&middot;</span>
          <span>{post.bairro}</span>
        </div>

        <h1 className="article-title">{post.title}</h1>

        <div className="article-meta">
          <div className="article-author-avatar">
            {getAuthorInitials(post.author)}
          </div>
          <div>
            <div style={{ fontWeight: 600, color: 'var(--grafite)' }}>{post.author}</div>
            <div style={{ fontSize: 'var(--text-xs)' }}>
              {post.date} &middot; {post.readingTime}
            </div>
          </div>
        </div>
      </header>

      {/* Banner Poético do Artigo */}
      <div 
        style={{ 
          background: post.gradient,
          height: '320px',
          borderRadius: 'var(--radius-lg)',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: 'var(--space-6)'
        }}
      >
        <div 
          style={{ 
            width: '100%', 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            opacity: 0.35, 
            fontSize: '96px',
            userSelect: 'none'
          }}
        >
          {post.emoji}
        </div>
        <div 
          style={{ 
            position: 'absolute', 
            bottom: 0, 
            left: 0, 
            right: 0, 
            padding: 'var(--space-5)', 
            background: 'linear-gradient(to top, rgba(45, 45, 45, 0.8) 0%, transparent 100%)' 
          }}
        >
          <div className="card-img-phrase" style={{ fontSize: 'var(--text-xl)' }}>
            "{post.poeticPhrase}"
          </div>
        </div>
      </div>

      {/* Barra de Segmento */}
      <div 
        style={{ 
          height: '4px', 
          backgroundColor: getSegmentColor(post.theme, post.emoji), 
          marginTop: '-24px', 
          marginBottom: 'var(--space-6)',
          borderRadius: '0 0 var(--radius-lg) var(--radius-lg)' 
        }} 
      />

      {/* Conteúdo do Artigo */}
      <div 
        className="article-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Seção CTA Boutique */}
      <section className="article-cta">
        <h2 className="article-cta-title">Este artigo inspirou você?</h2>
        <p className="article-cta-desc">
          Na Imovit, ajudamos você a encontrar lares com a sua alma. Fale com um de nossos curadores especialistas no WhatsApp e compartilhe seu projeto de vida.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a 
            href={`https://wa.me/5519999999999?text=Olá,%20li%20o%20artigo%20"${encodeURIComponent(post.title)}"%20e%20gostaria%20de%20falar%20com%20um%20curador.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Falar no WhatsApp
          </a>
          <Link href="/" className="btn btn-secondary">
            Voltar para a Home
          </Link>
        </div>
      </section>
    </article>
  );
}
