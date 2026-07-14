import Link from 'next/link';
import { Post } from '@/lib/supabase';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
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

  return (
    <article className="card">
      <Link href={`/posts/${post.slug}`} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Imagem do Card */}
        <div className="card-img-wrapper" style={{ background: post.gradient }}>
          <div 
            style={{ 
              width: '100%', 
              height: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              opacity: 0.35, 
              fontSize: '64px',
              userSelect: 'none'
            }}
          >
            {post.emoji}
          </div>
          <div className="card-img-overlay">
            <div className="card-img-phrase">
              {post.poeticPhrase}
            </div>
          </div>
        </div>

        {/* Barra de Segmento de Cor */}
        <div className="card-seg-bar" style={{ backgroundColor: getSegmentColor(post.theme, post.emoji) }} />

        {/* Corpo do Card */}
        <div className="card-body">
          <div className="card-location">
            {post.bairro}
          </div>
          
          <h3 className="card-title">
            {post.title}
          </h3>
          
          <p className="card-excerpt">
            {post.excerpt}
          </p>
          
          <div className="card-tags">
            <span className={`badge ${getBadgeClass(post.theme, post.emoji)}`}>
              ● {post.themeLabel}
            </span>
          </div>
        </div>

        {/* Rodapé do Card */}
        <div className="card-footer">
          <div className="card-curator">
            por <strong>{post.author}</strong>
          </div>
          <span className="btn btn-ghost btn-sm">Ver Artigo</span>
        </div>
      </Link>
    </article>
  );
}
