import { getPosts } from '@/lib/supabase';
import HomeFeed from '@/components/HomeFeed';

// Força a página a rebuscar posts a cada request (sem cache)
export const revalidate = 0;

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: 'var(--space-8)' }}>
      {/* Banner Principal / Hero */}
      <section className="blog-hero">
        <span className="blog-hero-eyebrow">Histórias, Pessoas & Imóveis</span>
        <h1 className="blog-hero-title">O Blog da Imovit</h1>
        <p className="blog-hero-subtitle">
          Uma curadoria boutique de ideias, tendências e narrativas sobre o morar com significado em Campinas e região.
        </p>
      </section>

      <HomeFeed posts={posts} />
    </div>
  );
}
