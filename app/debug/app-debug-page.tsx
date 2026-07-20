/**
 * Página /debug — Diagnóstico completo da conexão Supabase.
 * 
 * DEPLOY:
 *   Copie este arquivo para: app/debug/page.tsx
 * 
 * ACESSE:
 *   https://blog-imovit.vercel.app/debug
 * 
 * REMOVA depois que o problema for resolvido.
 */

import { createClient } from '@supabase/supabase-js';

// Força renderização em cada request (não cachear)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface DiagnosticResult {
  step: string;
  status: 'OK' | 'FALHOU' | 'INFO';
  detail: string;
}

async function runDiagnostics(): Promise<{
  results: DiagnosticResult[];
  timestamp: string;
  vercelInfo: Record<string, string>;
}> {
  const results: DiagnosticResult[] = [];
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // 1. Verificar env var URL
  if (url && url.trim() !== '') {
    results.push({
      step: 'ENV: NEXT_PUBLIC_SUPABASE_URL',
      status: 'OK',
      detail: `Valor: ${url}`,
    });
  } else {
    results.push({
      step: 'ENV: NEXT_PUBLIC_SUPABASE_URL',
      status: 'FALHOU',
      detail: 'Variável não configurada ou vazia. Verifique Vercel → Settings → Environment Variables.',
    });
  }

  // 2. Verificar env var KEY
  if (key && key.trim() !== '') {
    results.push({
      step: 'ENV: NEXT_PUBLIC_SUPABASE_ANON_KEY',
      status: 'OK',
      detail: `Comprimento: ${key.length} chars. Início: ${key.substring(0, 30)}... | Fim: ...${key.substring(key.length - 20)}`,
    });
  } else {
    results.push({
      step: 'ENV: NEXT_PUBLIC_SUPABASE_ANON_KEY',
      status: 'FALHOU',
      detail: 'Variável não configurada ou vazia.',
    });
  }

  // 3. Se tem env vars, testar HTTP direto
  if (url && key) {
    try {
      const httpUrl = `${url}/rest/v1/blog_posts?status=eq.publicado&select=id,slug,titulo,status&limit=5`;
      const httpResponse = await fetch(httpUrl, {
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
        },
        cache: 'no-store',
      });

      const httpBody = await httpResponse.text();

      if (httpResponse.ok) {
        try {
          const parsed = JSON.parse(httpBody);
          results.push({
            step: 'HTTP: GET blog_posts via fetch direto',
            status: 'OK',
            detail: `Status ${httpResponse.status}. Retornou ${Array.isArray(parsed) ? parsed.length : 0} registros. Body (primeiros 500 chars): ${httpBody.substring(0, 500)}`,
          });
        } catch {
          results.push({
            step: 'HTTP: GET blog_posts via fetch direto',
            status: 'FALHOU',
            detail: `Status ${httpResponse.status} mas body não é JSON válido: ${httpBody.substring(0, 500)}`,
          });
        }
      } else {
        results.push({
          step: 'HTTP: GET blog_posts via fetch direto',
          status: 'FALHOU',
          detail: `Status ${httpResponse.status}. Body: ${httpBody.substring(0, 500)}`,
        });
      }
    } catch (e) {
      results.push({
        step: 'HTTP: GET blog_posts via fetch direto',
        status: 'FALHOU',
        detail: `Exceção: ${e instanceof Error ? e.message : String(e)}`,
      });
    }

    // 4. Testar via cliente supabase-js
    try {
      const client = createClient(url, key);
      const { data, error, status: sbStatus } = await client
        .from('blog_posts')
        .select('id, slug, titulo, status')
        .eq('status', 'publicado')
        .limit(5);

      if (error) {
        results.push({
          step: 'SDK: supabase-js query',
          status: 'FALHOU',
          detail: `Status ${sbStatus} — Erro: ${error.message} | Code: ${error.code} | Details: ${error.details ?? 'nenhum'} | Hint: ${error.hint ?? 'nenhum'}`,
        });
      } else {
        results.push({
          step: 'SDK: supabase-js query',
          status: 'OK',
          detail: `Retornou ${data?.length ?? 0} registros: ${JSON.stringify(data)}`,
        });
      }
    } catch (e) {
      results.push({
        step: 'SDK: supabase-js query',
        status: 'FALHOU',
        detail: `Exceção: ${e instanceof Error ? e.message : String(e)}`,
      });
    }
  }

  return {
    results,
    timestamp: new Date().toISOString(),
    vercelInfo: {
      env: process.env.VERCEL_ENV ?? 'não é Vercel',
      region: process.env.VERCEL_REGION ?? 'desconhecida',
      gitCommit: process.env.VERCEL_GIT_COMMIT_SHA?.substring(0, 8) ?? 'desconhecido',
      gitBranch: process.env.VERCEL_GIT_COMMIT_REF ?? 'desconhecido',
      nodeVersion: process.version,
    },
  };
}

export default async function DebugPage() {
  const diagnostic = await runDiagnostics();

  return (
    <main
      style={{
        fontFamily: 'ui-monospace, SFMono-Regular, Consolas, monospace',
        padding: '2rem',
        maxWidth: '1000px',
        margin: '0 auto',
        lineHeight: 1.6,
      }}
    >
      <h1 style={{ fontSize: '24px', marginBottom: '8px' }}>🔍 Diagnóstico Blog Imovit</h1>
      <p style={{ color: '#666', fontSize: '13px', marginBottom: '2rem' }}>
        Timestamp: {diagnostic.timestamp}
      </p>

      <section style={{ marginBottom: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h2 style={{ fontSize: '16px', marginBottom: '12px' }}>Ambiente Vercel</h2>
        <div style={{ fontSize: '13px' }}>
          <div><strong>VERCEL_ENV:</strong> {diagnostic.vercelInfo.env}</div>
          <div><strong>VERCEL_REGION:</strong> {diagnostic.vercelInfo.region}</div>
          <div><strong>Git Branch:</strong> {diagnostic.vercelInfo.gitBranch}</div>
          <div><strong>Git Commit:</strong> {diagnostic.vercelInfo.gitCommit}</div>
          <div><strong>Node:</strong> {diagnostic.vercelInfo.nodeVersion}</div>
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: '16px', marginBottom: '12px' }}>Resultados dos Testes</h2>
        {diagnostic.results.map((r, idx) => (
          <div
            key={idx}
            style={{
              padding: '12px 16px',
              marginBottom: '8px',
              background: r.status === 'OK' ? '#e6f7e6' : r.status === 'FALHOU' ? '#fce6e6' : '#f0f0f0',
              borderLeft: `4px solid ${r.status === 'OK' ? '#22c55e' : r.status === 'FALHOU' ? '#dc2626' : '#888'}`,
              borderRadius: '4px',
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: '4px' }}>
              {r.status === 'OK' ? '✅' : r.status === 'FALHOU' ? '❌' : 'ℹ️'} {r.step}
            </div>
            <div style={{ fontSize: '12px', color: '#333', wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
              {r.detail}
            </div>
          </div>
        ))}
      </section>

      <section style={{ marginTop: '2rem', padding: '1rem', background: '#fff9e6', borderRadius: '8px', fontSize: '13px' }}>
        <strong>⚠️ Importante:</strong> esta página expõe informações técnicas. Remova o arquivo <code>app/debug/page.tsx</code> depois de resolver o problema.
      </section>
    </main>
  );
}
