import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Identifica se as credenciais do Supabase foram configuradas corretamente
export const isSupabaseConfigured = 
  supabaseUrl.trim() !== '' && 
  supabaseUrl !== 'your-supabase-project-url' &&
  supabaseAnonKey.trim() !== '' && 
  supabaseAnonKey !== 'your-supabase-anon-key';

// Instancia o cliente apenas se configurado para evitar erros de inicialização
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  theme: 'arquitetura' | 'bairros' | 'mercado' | 'lifestyle';
  themeLabel: string;
  poeticPhrase: string;
  bairro: string;
  author: string;
  date: string;
  readingTime: string;
  gradient: string;
  emoji: string;
}

// Interface de uso estritamente interno
interface BlogPostRow {
  id: string;
  slug: string;
  titulo: string;
  tema: string;
  angulo?: string | null;
  publico?: string | null;
  conteudo_html: string;
  email_copy?: string | null;
  email_assunto?: string | null;
  status: string;
  view_count: number;
  data_geracao: string;
  semana_iso?: string | null;
  link_drive_artigo?: string | null;
  link_drive_email?: string | null;
}

// Dados simulados (Mock) baseados em temas de conteúdo e cores do Design System
export const mockPosts: Post[] = [
  {
    id: '1',
    title: 'O Charme de Morar no Alphaville Dom Pedro: Infraestrutura e Natureza in Campinas',
    slug: 'charme-morar-alphaville-dom-pedro',
    excerpt: 'Descubra como a curadoria boutique seleciona residências que integram sofisticação urbana, segurança de alto nível e contato direto com a natureza no Alphaville Dom Pedro.',
    content: `
<p>Morar no <strong>Alphaville Dom Pedro</strong> é desfrutar de um dos endereços mais desejados de Campinas. O bairro é referência em infraestrutura, unindo a conveniência urbana à tranquilidade de amplas áreas verdes.</p>

<blockquote>"Respire silêncio. Um lar perfeito é aquele que preserva sua paz interior no ritmo dinâmico da cidade."</blockquote>

<h2>Estilo de vida integrado ao entorno</h2>
<p>Em nossa curadoria na Imovit, observamos que morar nesta região oferece uma verdadeira extensão de lazer. A presença de clubes privativos de alto padrão com quadras de tennis, piscinas e bosques nativos cria um ecossistema único de convívio social e contato com o meio ambiente.</p>

<p>Casas com amplos vãos de vidro, projetos arquitetônicos integrados e segurança fortificada 24 horas são marcas registradas das propriedades selecionadas para nosso portfólio no Alphaville Dom Pedro.</p>

<h2>Destaques da região:</h2>
<ul>
  <li><strong>Conectividade:</strong> Acesso imediato à Rodovia Dom Pedro I e proximidade aos principais centros educacionais e shoppings.</li>
  <li><strong>Infraestrutura Esportiva:</strong> Prática diária de esportes e lazer com segurança garantida.</li>
  <li><strong>Valorização Contínua:</strong> Uma região que consolida valor patrimonial ano após ano.</li>
</ul>
    `,
    theme: 'bairros',
    themeLabel: 'Bairros Nobres',
    poeticPhrase: 'Respire silêncio.',
    bairro: 'Alphaville Dom Pedro',
    author: 'Nádia Marchiori',
    date: '14 de Julho de 2026',
    readingTime: '4 min de leitura',
    gradient: 'linear-gradient(135deg, #e3c4b8, #d4755a)', // Argila (Solteiros)
    emoji: '🧭'
  },
  {
    id: '2',
    title: 'Apartamento Garden no Jardim Madalena: A Integração entre Conforto e Área Externa',
    slug: 'apartamento-garden-jardim-madalena',
    excerpt: 'O conceito garden une a segurança de um apartamento à privacidade de uma casa com quintal. Veja como a arquitetura moderna valoriza esses espaços no Jardim Madalena.',
    content: `
<p>Os apartamentos do tipo <strong>Garden</strong> tornaram-se sinônimo de versatilidade e requinte arquitetônico. No Jardim Madalena, esses imóveis ganham destaque por valorizar o convívio ao ar livre e a luz natural abundante.</p>

<blockquote>"Iluminada de amor. Encontrar a luz certa que entra pela janela ao amanhecer transforma um espaço físico em um lar."</blockquote>

<h2>O terraço gourmet como centro de convivência</h2>
<p>A grande vantagem do conceito garden é a extensão de área útil privativa. Projetos contemporâneos integram a cozinha e a sala de estar diretamente ao deck externo, permitindo a criação de jardins verticais, pequenos pomares urbanos ou simplesmente uma charmosa varanda lounge.</p>

<p>Nossa seleção boutique prioriza acabamentos de alto padrão que suportam a transição entre ambientes internos e externos de forma fluida e funcional.</p>
    `,
    theme: 'arquitetura',
    themeLabel: 'Arquitetura & Design',
    poeticPhrase: 'Iluminada de amor.',
    bairro: 'Jardim Madalena',
    author: 'Daniel Aranovich',
    date: '10 de Julho de 2026',
    readingTime: '3 min de leitura',
    gradient: 'linear-gradient(135deg, #d4b8bc, #c09098)', // Rosé (Casais)
    emoji: '🕯'
  },
  {
    id: '3',
    title: 'Mapeamento do Mercado de Alto Padrão em Campinas: Guia de Investimentos 2026',
    slug: 'mapeamento-mercado-alto-padrao-campinas',
    excerpt: 'Análise de valorização, rentabilidade e liquidez de lajes comerciais e imóveis residenciais de alto padrão nas regiões mais valorizadas de Campinas.',
    content: `
<p>Investir no mercado de alto padrão in Campinas requer uma visão estratégica focada em dados e na solidez de bons ativos imobiliários. Historicamente, o segmento boutique apresenta resiliência em momentos de oscilação econômica.</p>

<blockquote>"Amor concreto. A solidez de um bom tijolo aliada à inteligência de dados gera o investimento que se perpetua."</blockquote>

<h2>Bairros líderes em valorização</h2>
<p>O Cambuí permanece como a principal referência de valorização por metro quadrado. A alta densidade de comércio de luxo e a conveniência urbana atraem executivos e profissionais qualificados dispostos a pagar aluguel premium.</p>

<p>Por outro lado, Sousas e Gramado despontam no segmento de residências em condomínios fechados, impulsionados pela busca incessante por qualidade de vida pós-pandemia, gerando excelente ganho de capital no médio e longo prazo.</p>
    `,
    theme: 'mercado',
    themeLabel: 'Mercado & Tendências',
    poeticPhrase: 'Amor concreto.',
    bairro: 'Cambuí',
    author: 'Daniel Aranovich',
    date: '08 de Julho de 2026',
    readingTime: '5 min de leitura',
    gradient: 'linear-gradient(135deg, #2B4A6B, #1a3552)', // Petróleo (Investidores)
    emoji: '📐'
  },
  {
    id: '4',
    title: 'Downsizing com Sofisticação: Simplificar a Rotina sem Diminuir o Luxo do seu Lar',
    slug: 'downsizing-com-sofisticacao',
    excerpt: 'Reduzir a área de manutenção do imóvel é uma tendência crescente. Entenda como escolher um apartamento prático e luxuoso no Gramado ou no Cambuí.',
    content: `
<p>A transição para um imóvel de menor manutenção – ou <i>downsizing</i> – tem sido a escolha de muitas pessoas que buscam mais liberdade prática no cotidiano sem abrir mão da sofisticação e do espaço útil.</p>

<blockquote>"O valor da maturidade. Simplificar a rotina sem diminuir a elegância é o verdadeiro luxo contemporâneo."</blockquote>

<h2>Menos metragem, mais qualidade de acabamento</h2>
<p>A chave para um downsizing de sucesso está na escolha de plantas integradas de alto padrão, onde cada metro quadrado é otimizado. Condomínios com segurança integrada, automação residencial e áreas comuns completas (como academia equipada e salão de eventos boutique) compensam a redução de área privativa.</p>
    `,
    theme: 'lifestyle',
    themeLabel: 'Estilo de Vida',
    poeticPhrase: 'O valor da maturidade.',
    bairro: 'Gramado',
    author: 'Nádia Marchiori',
    date: '05 de Julho de 2026',
    readingTime: '3 min de leitura',
    gradient: 'linear-gradient(135deg, #ede2cd, #c9a96e)', // Gold (Ninho Vazio)
    emoji: '✨'
  },
  {
    id: '5',
    title: 'A Influência da Iluminação Natural na Sensação de Amplitude dos Espaços',
    slug: 'influencia-iluminacao-natural-amplitude',
    excerpt: 'Projetos arquitetônicos focados em iluminação natural valorizam o design de interiores. Conheça as melhores técnicas utilizadas por arquitetos modernos.',
    content: `
<p>A luz natural é um dos elementos mais poderosos no design de interiores. Um projeto luminotécnico bem planejado, que aproveita a luz do sol, tem o poder de transformar espaços compactos em ambientes visivelmente amplos e convidativos.</p>

<blockquote>"Respire luz. A claridade natural que banha os cômodos alimenta a alma e conecta a casa com o ciclo natural do dia."</blockquote>

<h2>Estratégias de arquitetura luminosa</h2>
<p>Para obter o máximo de aproveitamento, arquitetos contemporâneos utilizam grandes aberturas de vidro, claraboias em banheiros e corredores, e layouts integrados que evitam barreiras físicas para a passagem da luz.</p>

<p>O uso de cores claras em superfícies estratégicas e espelhos posicionados em frente a aberturas amplia a reverberação luminosa de forma elegante.</p>
    `,
    theme: 'arquitetura',
    themeLabel: 'Arquitetura & Design',
    poeticPhrase: 'Respire luz.',
    bairro: 'Cambuí',
    author: 'Nádia Marchiori',
    date: '01 de Julho de 2026',
    readingTime: '3 min de leitura',
    gradient: 'linear-gradient(135deg, #c8d8c8, #a8c4a8)', // Sálvia (Família)
    emoji: '🌿'
  }
];

// Função adaptadora para transformar BlogPostRow em Post
function adaptBlogPost(row: BlogPostRow): Post {
  // 1. Mapeamento direto
  const id = row.id;
  const title = row.titulo;
  const slug = row.slug;
  const content = row.conteudo_html;

  // 2. tema -> theme (Fuzzy match case-insensitive por substring)
  const temaLower = (row.tema || '').toLowerCase();
  let theme: 'arquitetura' | 'bairros' | 'mercado' | 'lifestyle';

  if (temaLower.includes('arquitetura') || temaLower.includes('design') || temaLower.includes('interior')) {
    theme = 'arquitetura';
  } else if (temaLower.includes('bairro') || temaLower.includes('localiza') || temaLower.includes('região') || temaLower.includes('regiao')) {
    theme = 'bairros';
  } else if (temaLower.includes('lifestyle') || temaLower.includes('estilo') || temaLower.includes('vida')) {
    theme = 'lifestyle';
  } else {
    theme = 'mercado'; // fallback/default
  }

  // 3. themeLabel derivado do theme
  const themeLabelMap = {
    arquitetura: 'Arquitetura & Design',
    bairros: 'Bairros Nobres',
    mercado: 'Mercado & Tendências',
    lifestyle: 'Estilo de Vida'
  };
  const themeLabel = themeLabelMap[theme];

  // 4. gradient por theme
  const gradientMap = {
    arquitetura: 'linear-gradient(135deg, #e8c4c4, #d18a8a)',
    bairros: 'linear-gradient(135deg, #e3c4b8, #d4755a)',
    mercado: 'linear-gradient(135deg, #2B4A6B, #1a3552)',
    lifestyle: 'linear-gradient(135deg, #ede2cd, #c9a96e)'
  };
  const gradient = gradientMap[theme];

  // 5. emoji por theme
  const emojiMap = {
    arquitetura: '🏛️',
    bairros: '🧭',
    mercado: '📈',
    lifestyle: '✨'
  };
  const emoji = emojiMap[theme];

  // 6. poeticPhrase (row.angulo se <= 80 chars, senão fallback por theme)
  let poeticPhrase = '';
  if (row.angulo && row.angulo.trim().length <= 80) {
    poeticPhrase = row.angulo.trim();
  } else {
    const poeticFallbackMap = {
      arquitetura: 'Design com alma.',
      bairros: 'Onde a vida acontece.',
      mercado: 'Estratégia com significado.',
      lifestyle: 'O luxo do essencial.'
    };
    poeticPhrase = poeticFallbackMap[theme];
  }

  // 7. excerpt: primeiros 180 chars do conteudo_html sem tags, normalizando whitespace
  const rawText = (content || '').replace(/<\/?[^>]+(>|$)/g, '');
  const cleanText = rawText.replace(/\s+/g, ' ').trim();
  const excerpt = cleanText.length > 180 ? cleanText.substring(0, 180) + '...' : cleanText;

  // 8. readingTime: baseado em 200 palavras/minuto, mínimo 1 min
  const words = cleanText ? cleanText.split(/\s+/).length : 0;
  const minutes = Math.max(1, Math.ceil(words / 200));
  const readingTime = `${minutes} min de leitura`;

  // 9. date: formatar data_geracao (ISO) para pt-BR
  let date = '';
  try {
    const parsedDate = new Date(row.data_geracao);
    if (!isNaN(parsedDate.getTime())) {
      date = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }).format(parsedDate);
    } else {
      date = row.data_geracao;
    }
  } catch (e) {
    date = row.data_geracao;
  }

  // 10. bairro (hardcoded "Campinas")
  const bairro = 'Campinas';

  // 11. author (hardcoded "Curadoria Imovit")
  const author = 'Curadoria Imovit';

  return {
    id,
    title,
    slug,
    excerpt,
    content,
    theme,
    themeLabel,
    poeticPhrase,
    bairro,
    author,
    date,
    readingTime,
    gradient,
    emoji
  };
}

// Funções para busca de posts (Supabase com fallback para Mock)
export async function getPosts(): Promise<Post[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'publicado')
        .order('data_geracao', { ascending: false });

      if (error) throw error;
      if (data && data.length > 0) {
        return (data as BlogPostRow[]).map(adaptBlogPost);
      }
    } catch (e) {
      console.warn('Erro ao buscar posts do Supabase, utilizando mock data:', e);
    }
  }

  // Fallback padrão para mock
  return mockPosts;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'publicado')
        .maybeSingle();

      if (error) throw error;
      if (data) {
        return adaptBlogPost(data as BlogPostRow);
      }
    } catch (e) {
      console.warn(`Erro ao buscar post por slug (${slug}) no Supabase, utilizando mock data:`, e);
    }
  }

  // Fallback padrão para mock
  const post = mockPosts.find(p => p.slug === slug);
  return post || null;
}
