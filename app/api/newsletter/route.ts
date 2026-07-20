import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, nome, origem_slug } = await request.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'E-mail inválido ou não fornecido.' },
        { status: 400 }
      );
    }

    // URL do Webhook do n8n do usuário
    const webhookUrl = 'https://n8n.srv1552977.hstgr.cloud/webhook/95967769-9137-43f4-80df-f5ed1fdfb6d6';

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        nome: nome || undefined,
        origem_slug: origem_slug || undefined,
      }),
    });

    if (!response.ok) {
      console.error('[Newsletter API] Webhook retornou erro:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'Não foi possível completar a inscrição.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('[Newsletter API] Erro ao processar requisição:', error);
    return NextResponse.json(
      { error: 'Erro interno ao processar a inscrição.' },
      { status: 500 }
    );
  }
}
