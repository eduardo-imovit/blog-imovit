'use client';

import { useMemo, useState } from 'react';
import { Post } from '@/lib/supabase';
import PostCard from '@/components/PostCard';

const THEMES = [
  { value: 'todos', label: 'Todos os Temas', filterClass: '' },
  { value: 'arquitetura', label: 'Arquitetura & Design', filterClass: 'filter-casais' }, // Rosé
  { value: 'bairros', label: 'Bairros Nobres', filterClass: 'filter-solteiros' }, // Argila
  { value: 'mercado', label: 'Mercado & Tendências', filterClass: 'filter-investidores' }, // Petróleo
  { value: 'lifestyle', label: 'Estilo de Vida', filterClass: 'filter-ninho-vazio' }, // Gold Fosco
];

interface HomeFeedProps {
  posts: Post[];
}

export default function HomeFeed({ posts }: HomeFeedProps) {
  const [selectedTheme, setSelectedTheme] = useState('todos');

  const filteredPosts = useMemo(() => {
    if (selectedTheme === 'todos') return posts;
    return posts.filter((post) => post.theme === selectedTheme);
  }, [selectedTheme, posts]);

  return (
    <>
      {/* Menu Interativo de Filtros por Temas */}
      <section className="segment-filter-container" aria-labelledby="filter-heading">
        <h2 id="filter-heading" className="segment-filter-label">
          Filtrar por Tema do Artigo:
        </h2>
        <div className="segment-filter-list" role="group" aria-labelledby="filter-heading">
          {THEMES.map((theme) => (
            <button
              key={theme.value}
              type="button"
              onClick={() => setSelectedTheme(theme.value)}
              aria-pressed={selectedTheme === theme.value}
              className={`segment-filter-btn ${selectedTheme === theme.value ? `active ${theme.filterClass}` : ''}`}
            >
              {theme.value !== 'todos' && '● '}
              {theme.label}
            </button>
          ))}
        </div>
      </section>

      {/* Contagem de resultados */}
      <p
        aria-live="polite"
        style={{
          color: 'var(--grafite-soft)',
          fontSize: 'var(--text-sm)',
          marginBottom: 'var(--space-4)',
        }}
      >
        {filteredPosts.length} {filteredPosts.length === 1 ? 'artigo encontrado' : 'artigos encontrados'}
      </p>

      {/* Grid de Conteúdo */}
      {filteredPosts.length > 0 ? (
        <div className="cards-grid animate-fade-in">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: 'center',
            padding: 'var(--space-6) 0',
            color: 'var(--grafite-soft)',
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 'var(--text-md)',
          }}
        >
          Nenhum artigo encontrado para este tema no momento.
        </div>
      )}
    </>
  );
}
