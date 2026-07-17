import { getPosts } from '@/lib/supabase';
import HomeFeed from '@/components/HomeFeed';

export const revalidate = 0;

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="home-layout animate-fade-in">
      <section className="home-hero">
        <div className="home-hero-eyebrow">Histórias, Pessoas &amp; Imóveis</div>
        <h1 className="home-hero-title">O Blog da <em>Imovit</em></h1>
        <p className="home-hero-sub">
          Curadoria boutique de ideias, tendências e narrativas sobre o morar com significado em Campinas e região.
        </p>
      </section>

      <HomeFeed posts={posts} />
    </div>
  );
}