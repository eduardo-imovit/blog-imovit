---
name: desenvolvedor-frontend-blog-imovit
description: Orientação especializada para desenvolvimento do blog-imovit (Next.js 16 + React 19 + TypeScript + Supabase) — componentes, páginas, layout, integração Supabase, estilo e design system.
---

# Skill: Desenvolvedor Frontend — Blog Imovit

## Overview

Orientação especializada para desenvolvimento do **blog-imovit**, um projeto Next.js 16 + React 19 + TypeScript + Supabase que apresenta artigos premium de mercado imobiliário em Campinas.

**Triggers:** componente, página, layout, integração supabase, estilo, design system  
**Stack:** Next.js 16.2, React 19, TypeScript 5, Supabase, CSS Modules, Vercel

---

## Contexto do Projeto

### Tech Stack
- **Framework:** Next.js 16.2.10 (App Router)
- **Linguagem:** TypeScript 5
- **Styling:** CSS Modules + CSS puro (globals.css)
- **Banco de dados:** Supabase (PostgreSQL)
- **Fonte de dados:** Tabela `blog_posts` do Supabase (posts em status "publicado")
- **Deploy:** Vercel
- **Fontes:** Noto Serif Display (títulos), DM Sans (body)

### Estrutura de Diretórios
```
blog-imovit/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Home (índice de posts)
│   ├── layout.tsx         # Root layout com meta/fonts
│   ├── globals.css        # Estilos globais
│   ├── page.module.css    # Estilos home
│   ├── not-found.tsx      # 404 page
│   └── posts/
│       └── [slug]/
│           └── page.tsx   # Página do artigo individual
├── components/            # Componentes React reutilizáveis
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── PostCard.tsx
├── lib/
│   └── supabase.ts        # Cliente Supabase + tipos Post + mockPosts
├── public/                # Assets estáticos
├── next.config.ts
├── tsconfig.json
└── package.json
```

### Brand & Design System Imovit

**Cores:**
- Coral/Laranja: `#E8593C` (accent, CTA)
- Grafite: `#2D2D2D` (textos principais)
- Champagne: `#EDE7D9` (backgrounds, seções neutras)
- Cinza neutro: `#888880`, `#666660` (texto secundário, metadados)

**Tipografia:**
- **Serif (títulos):** `Noto Serif Display` (300, 400 italic)
- **Sans (body):** `DM Sans` (300, 400, 500, 600)

**Padrões UI:**
- Títulos em serif italic 32-42px
- Body em sans 16px line-height 1.7
- Espaçamento: 24px, 32px, 40px
- Border-radius: 0-8px (linhas e boxes)
- Cards: fundo branco, borda fina #E8E6E1, sombra suave

### Interface Supabase

**Tabela:** `blog_posts`

```typescript
interface Post {
  id: string;              // UUID
  slug: string;            // unique, usado em URL
  titulo: string;          // título do artigo
  tema: string;             // tema principal
  angulo: string;          // ângulo/perspectiva
  publico: string;         // descrição público-alvo
  conteudo_html: string;   // HTML do artigo (renderizar direto)
  email_copy: string;      // cópia do email
  status: string;          // 'publicado', 'rascunho', 'rejeitado'
  view_count: number;      // contador de views
  data_geracao: datetime;  // timestamp de criação
  semana_iso: string;      // semana ISO (2026-07-14)
  link_drive_artigo?: string;  // referência Google Docs
  link_drive_email?: string;   // referência Google Docs
}
```

**Query padrão:**
```typescript
const { data } = await supabase
  .from('blog_posts')
  .select('*')
  .eq('status', 'publicado')
  .order('data_geracao', { ascending: false });
```

### Mock Data (fallback)

Projeto contém `mockPosts` em `lib/supabase.ts` com posts de exemplo:
- Temas: arquitetura, bairros, mercado, lifestyle
- Campos: id, title, slug, excerpt, content, theme, themeLabel, poeticPhrase, bairro, author, date, readingTime, gradient, emoji

Usar quando Supabase não estiver configurado.

---

## Padrões de Código

### TypeScript

**Tipagem de componentes:**
```typescript
import { ReactNode } from 'react';

interface ComponentProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function Component({ title, children, className }: ComponentProps) {
  return <div className={className}>{title}{children}</div>;
}
```

**Tipagem de funções Supabase:**
```typescript
import { Post, supabase, mockPosts } from '@/lib/supabase';

async function fetchPosts(): Promise<Post[]> {
  if (!supabase) return mockPosts;
  
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'publicado')
    .order('data_geracao', { ascending: false });
    
  if (error) return mockPosts;
  return data as Post[];
}
```

### CSS Modules

Usar CSS Modules por página/componente:
```typescript
// ComponentName.tsx
import styles from './ComponentName.module.css';

export default function ComponentName() {
  return <div className={styles.container}>...</div>;
}
```

```css
/* ComponentName.module.css */
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: var(--font-dm-sans);
}

.title {
  font-family: var(--font-noto-serif);
  font-size: 32px;
  font-weight: 400;
  font-style: italic;
  color: var(--color-grafite);
}
```

### Next.js Padrões

**Rotas dinâmicas (artigos):**
```typescript
// app/posts/[slug]/page.tsx
interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await fetchPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);
  
  if (!post) notFound();
  
  return (
    <article>
      <h1>{post.titulo}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.conteudo_html }} />
    </article>
  );
}
```

**Metadata dinâmica:**
```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);
  
  if (!post) return { title: 'Artigo não encontrado' };
  
  return {
    title: post.titulo,
    description: post.conteudo_html.slice(0, 160),
    openGraph: {
      title: post.titulo,
      description: post.tema,
    },
  };
}
```

---

## Componentes Principais

### Header.tsx
- Logo Imovit + navegação
- Links: Home, About, Contact
- Responsivo mobile
- Barra fixa ou sticky opcional

### Footer.tsx
- Links úteis (Home, Privacy, Contact)
- Copyright + redes sociais
- Fundo grafite, texto claro

### PostCard.tsx
- Preview do artigo (thumbnail, título, excerpt, data)
- Link pra página completa
- Tema/tag visual
- Responsivo grid 1-3 colunas

### Página Home (page.tsx)
- Hero section com tagline Imovit
- Grid de PostCards (últimos 12 posts)
- Filtro opcional por tema
- Infinite scroll ou paginação

### Página Artigo (posts/[slug]/page.tsx)
- Título em serif italic
- Metadados (data, tema, autor, tempo leitura)
- Conteúdo HTML renderizado
- Sidebar ou CTA (conversar com especialista)
- Posts relacionados

---

## Checklist de Desenvolvimento

### Estrutura Base
- [ ] Verificar todas as dependências instaladas (`npm install`)
- [ ] Configurar variáveis de ambiente (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)
- [ ] Testar conexão Supabase em lib/supabase.ts
- [ ] Validar que mockPosts funcionam como fallback

### Home Page
- [ ] Renderizar grid de PostCards
- [ ] Implementar infinite scroll ou paginação
- [ ] Adicionar filtro por tema (opcional)
- [ ] SEO meta tags

### Página de Artigo
- [ ] Rota dinâmica [slug] funcionando
- [ ] Renderizar conteudo_html com dangerouslySetInnerHTML
- [ ] Metadata dinâmica por post
- [ ] Posts relacionados (mesma semana ou tema)
- [ ] CTA com link WhatsApp/contato

### Componentes
- [ ] Header responsivo
- [ ] Footer com links
- [ ] PostCard com estilos Imovit
- [ ] Carregamento de imagens (otimizar com Next Image)

### Estilos
- [ ] Importar fontes Google (Noto Serif Display, DM Sans)
- [ ] CSS variables para cores
- [ ] Media queries mobile (max-width: 768px)
- [ ] Dark mode (opcional)

### Performance
- [ ] SSG (Static Site Generation) via generateStaticParams
- [ ] Image optimization (Next/Image)
- [ ] Cache strategy Supabase
- [ ] Vercel analytics (opcional)

### Deploy
- [ ] Push pra GitHub
- [ ] Conectar Vercel ao repo
- [ ] Configurar env vars em Vercel
- [ ] Build e deploy
- [ ] Testar em produção

---

## Comandos Úteis

```bash
# Desenvolvimento
npm run dev              # Rodar servidor Next.js localhost:3000

# Build
npm run build           # Build para produção
npm start               # Iniciar servidor de produção

# Linting
npm run lint            # Executar ESLint

# Debug
node --inspect ...      # Node debugger
```

---

## Referências de Design

### Tipografia
- Títulos: Noto Serif Display 32-42px, font-style: italic, font-weight: 400
- Subtítulos: Noto Serif Display 20-24px, font-style: italic
- Body: DM Sans 16px, line-height: 1.7
- Meta: DM Sans 12-13px, color: #888880, text-transform: uppercase

### Espaçamento Vertical
- Section gap: 40-60px
- Component padding: 24-32px
- Line height: 1.7-1.8

### Cores em Fundo
- Branco (#FFF) + Coral CTA
- Champagne (#EDE7D9) + Grafite texto
- Grafite (#2D2D2D) + branco/claro texto

### Assets
- Favicon: app/favicon.ico
- Public assets: public/ (SVG preferred, WebP images)

---

## Notas Importantes

1. **Supabase:** Verificar se `isSupabaseConfigured` está true antes de fazer queries. Usar mockPosts como fallback.
2. **TypeScript Strict:** Manter `strict: true` em tsconfig.json. Sempre tipar props e retornos.
3. **Renderização HTML:** `conteudo_html` vem de Supabase pronto. Usar `dangerouslySetInnerHTML` é seguro aqui (conteúdo controlado).
4. **Cache:** Considerar ISR (Incremental Static Regeneration) pra atualizar posts sem rebuild.
5. **Mobile:** Sempre testar em viewport 375px, 768px, 1440px.
6. **Acessibilidade:** Usar semantic HTML (article, section, nav, etc). Testar com screen reader.
