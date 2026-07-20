'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { Post } from '@/lib/supabase';
import NewsletterCTA from '@/components/NewsletterCTA';

const THEMES = [
  { value: 'todos', label: 'Todos' },
  { value: 'arquitetura', label: 'Arquitetura & Design' },
  { value: 'bairros', label: 'Bairros Nobres' },
  { value: 'mercado', label: 'Mercado & Tendências' },
  { value: 'lifestyle', label: 'Estilo de Vida' },
];

interface HomeFeedProps { posts: Post[] }

export default function HomeFeed({ posts }: HomeFeedProps) {
  const [theme, setTheme] = useState('todos');

  const filtered = useMemo(
    () => theme === 'todos' ? posts : posts.filter(p => p.theme === theme),
    [posts, theme]
  );

  const featured = filtered[0];
  const midHighlights = filtered.slice(1, 3);
  const rest = filtered.slice(3);

  return (
    <>
      <nav className="home-filter" aria-label="Filtrar por tema">
        {THEMES.map(t => (
          <button
            key={t.value}
            onClick={() => setTheme(t.value)}
            className={`home-pill ${theme === t.value ? 'active' : ''}`}
            aria-pressed={theme === t.value}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {filtered.length === 0 && (
        <div className="home-empty">Nenhuma análise encontrada neste tema.</div>
      )}

      {featured && (
        <>
          <div className="home-section-label">Leitura em destaque</div>
          <FeaturedCard post={featured} />
        </>
      )}

      {midHighlights.length > 0 && (
        <div className="home-mid-grid">
          {midHighlights.map(p => <MidCard key={p.id} post={p} />)}
        </div>
      )}

      <NewsletterCTA />

      {rest.length > 0 && (
        <>
          <div className="home-section-label">Todas as análises</div>
          <div className="home-min-grid">
            {rest.map(p => <MinCard key={p.id} post={p} />)}
          </div>
        </>
      )}
    </>
  );
}

function FeaturedCard({ post }: { post: Post }) {
  return (
    <Link href={`/posts/${post.slug}`} className="home-featured">
      <div className="home-featured-visual" style={{ background: post.gradient }}>
        <div className="home-featured-emoji">{post.emoji}</div>
        <div className="home-featured-phrase">&ldquo;{post.poeticPhrase}&rdquo;</div>
      </div>
      <div className="home-featured-text">
        <div className="home-card-eyebrow">● {post.themeLabel}</div>
        <h2 className="home-featured-title">{post.title}</h2>
        <p className="home-featured-excerpt">{post.excerpt}</p>
        <div className="home-featured-meta">
          <span>{post.date}</span>
          <span className="home-dot"></span>
          <span>{post.readingTime}</span>
          <span className="home-dot"></span>
          <span>{post.author}</span>
        </div>
        <span className="home-read-more">Ler análise →</span>
      </div>
    </Link>
  );
}

function MidCard({ post }: { post: Post }) {
  return (
    <Link href={`/posts/${post.slug}`} className="home-mid-card">
      <div className="home-mid-visual" style={{ background: post.gradient }}>
        <div className="home-mid-emoji">{post.emoji}</div>
        <div className="home-mid-phrase">&ldquo;{post.poeticPhrase}&rdquo;</div>
      </div>
      <div className="home-mid-body">
        <div className="home-card-eyebrow">● {post.themeLabel}</div>
        <h3 className="home-mid-title">{post.title}</h3>
        <p className="home-mid-excerpt">{post.excerpt}</p>
        <div className="home-mid-meta">{post.date} · {post.readingTime}</div>
      </div>
    </Link>
  );
}

function MinCard({ post }: { post: Post }) {
  return (
    <Link href={`/posts/${post.slug}`} className="home-min-card">
      <div className="home-min-visual" style={{ background: post.gradient }}>
        <div className="home-min-emoji">{post.emoji}</div>
      </div>
      <div className="home-min-body">
        <div className="home-card-eyebrow">● {post.themeLabel}</div>
        <h4 className="home-min-title">{post.title}</h4>
        <div className="home-min-meta">{post.date} · {post.readingTime}</div>
      </div>
    </Link>
  );
}