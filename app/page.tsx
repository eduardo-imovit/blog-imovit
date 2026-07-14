'use client';

import { useState, useEffect } from 'react';
import { getPosts, Post } from '@/lib/supabase';
import PostCard from '@/components/PostCard';

const THEMES = [
  { value: 'todos', label: 'Todos os Temas', filterClass: '' },
  { value: 'arquitetura', label: 'Arquitetura & Design', filterClass: 'filter-casais' }, // Rosé
  { value: 'bairros', label: 'Bairros Nobres', filterClass: 'filter-solteiros' }, // Argila
  { value: 'mercado', label: 'Mercado & Tendências', filterClass: 'filter-investidores' }, // Petróleo
  { value: 'lifestyle', label: 'Estilo de Vida', filterClass: 'filter-ninho-vazio' }, // Gold Fosco
];

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [selectedTheme, setSelectedTheme] = useState('todos');
  const [loading, setLoading] = useState(true);

  // Carrega posts ao montar o componente
  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getPosts();
        setPosts(data);
        setFilteredPosts(data);
      } catch (error) {
        console.error('Erro ao carregar posts:', error);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  // Filtra posts de acordo com o tema selecionado
  useEffect(() => {
    if (selectedTheme === 'todos') {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post => post.theme === selectedTheme);
      setFilteredPosts(filtered);
    }
  }, [selectedTheme, posts]);

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

      {/* Menu Interativo de Filtros por Temas */}
      <section className="segment-filter-container" aria-labelledby="filter-heading">
        <h2 id="filter-heading" className="segment-filter-label">
          Filtrar por Tema do Artigo:
        </h2>
        <div className="segment-filter-list">
          {THEMES.map((theme) => (
            <button
              key={theme.value}
              onClick={() => setSelectedTheme(theme.value)}
              className={`segment-filter-btn ${selectedTheme === theme.value ? `active ${theme.filterClass}` : ''}`}
            >
              {theme.value !== 'todos' && '● '}
              {theme.label}
            </button>
          ))}
        </div>
      </section>

      {/* Grid de Conteúdo */}
      {loading ? (
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '200px',
            color: 'var(--grafite-soft)',
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-base)'
          }}
        >
          Carregando narrativas...
        </div>
      ) : filteredPosts.length > 0 ? (
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
            fontSize: 'var(--text-md)'
          }}
        >
          Nenhum artigo encontrado para este tema no momento.
        </div>
      )}
    </div>
  );
}
