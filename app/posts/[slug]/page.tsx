import Link from 'next/link';
import { getPostBySlug } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import TocNav from '@/components/TocNav';
import { MessageCircle, Linkedin, Facebook } from 'lucide-react';
import NewsletterCTA from '@/components/NewsletterCTA';

export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Adiciona IDs em h2/h3 e retorna a lista de headings para o TOC */
function processContent(html: string) {
  const headings: { id: string; text: string; level: number }[] = [];
  const slugify = (t: string) =>
    t.toLowerCase().normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, '')
      .trim().replace(/\s+/g, '-').slice(0, 60);

  const processed = html.replace(/<(h[23])>([^<]+)<\/\1>/g, (_, tag: string, text: string) => {
    const level = parseInt(tag[1], 10);
    const base = slugify(text);
    let id = base, n = 1;
    while (headings.some(h => h.id === id)) id = `${base}-${n++}`;
    headings.push({ id, text, level });
    return `<${tag} id="${id}">${text}</${tag}>`;
  });

  return { html: processed, headings };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const { html: processedHtml, headings } = processContent(post.content);
  const getInitials = (n: string) => n.split(' ').map(x => x[0]).join('').toUpperCase().substring(0, 2);
  const shareUrl = `https://blog-imovit.vercel.app/posts/${post.slug}`;

  return (
    <article className="post-layout animate-fade-in">

      <header className="post-header">
        <div className="post-header-main">
          <div className="post-eyebrow">
            <span>● {post.themeLabel}</span>
            <span>·</span>
            <span>{post.bairro}</span>
          </div>
          <h1 className="post-title">{post.title}</h1>
          <p className="post-lede">{post.poeticPhrase}</p>
        </div>
        <aside className="post-meta-col">
          <div className="post-meta-item"><span className="post-meta-label">Data</span><span className="post-meta-value">{post.date}</span></div>
          <div className="post-meta-item"><span className="post-meta-label">Categoria</span><span className="post-meta-value">{post.themeLabel}</span></div>
          <div className="post-meta-item"><span className="post-meta-label">Leitura</span><span className="post-meta-value">{post.readingTime}</span></div>
          <div className="post-meta-item"><span className="post-meta-label">Curadoria</span><span className="post-meta-value">{post.author}</span></div>
        </aside>
      </header>

      <div className="post-hero" style={{ background: post.gradient }}>
        <div className="post-hero-emoji">{post.emoji}</div>
        <div className="post-hero-phrase">&ldquo;{post.poeticPhrase}&rdquo;</div>
      </div>

      <div className="post-body">
        <div className="post-content-col">
          <div className="article-content" dangerouslySetInnerHTML={{ __html: processedHtml }} />

          <NewsletterCTA origemSlug={post.slug} />

          <section className="post-cta">
            <h2 className="post-cta-title">Este artigo inspirou você?</h2>
            <p className="post-cta-desc">
              Na Imovit, ajudamos você a encontrar lares com a sua alma. Fale com um de nossos curadores especialistas.
            </p>
            <div className="post-cta-actions">

              <a href={`https://wa.me/5519971237841?text=Olá,%20li%20o%20artigo%20"${encodeURIComponent(post.title)}"%20e%20gostaria%20de%20falar%20com%20um%20curador.`}
                target="_blank" rel="noopener noreferrer" className="btn btn-primary"
              >Falar no WhatsApp</a>
              <Link href="/" className="btn btn-secondary">Voltar para a Home</Link>
            </div>
          </section>
        </div>

        <aside className="post-sidebar">
          <div className="post-sidebar-sticky">
            <TocNav headings={headings} />

            <div className="post-side-block">
              <div className="post-side-label">Curadoria</div>
              <div className="post-side-author">
                <div className="post-side-avatar">{getInitials(post.author)}</div>
                <div>
                  <div className="post-side-author-name">{post.author}</div>
                  <div className="post-side-author-role">Especialistas em mercado premium de Campinas.</div>
                </div>
              </div>
            </div>

            <div className="post-side-block">
              <div className="post-side-label">Compartilhar</div>
              <div className="post-side-share">
                <a href={`https://wa.me/?text=${encodeURIComponent(post.title + ' — ' + shareUrl)}`} target="_blank" rel="noopener noreferrer" className="post-share-btn" aria-label="WhatsApp">
                  <MessageCircle size={15} />
                </a>
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="post-share-btn" aria-label="LinkedIn">
                  <Linkedin size={15} />
                </a>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="post-share-btn" aria-label="Facebook">
                  <Facebook size={15} />
                </a>
              </div>
            </div>
          </div>
        </aside>
      </div >
    </article >
  );
}