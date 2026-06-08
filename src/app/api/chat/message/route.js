// Next.js Route Handler — Swaraya AI chat assistant.
// POST /api/chat/message  — uses the user's own OpenAI API key (OPENAI_API_KEY).

const SYSTEM_MESSAGE = `Eres el asistente virtual de Swaraya, una Agencia de Inteligencia Aplicada.

## Sobre Swaraya:
- Swaraya investiga, diseña e integra sistemas de inteligencia artificial para organizaciones
- Nos especializamos en: Arquitectura Estratégica de IA, Agentes Autónomos, Modelado Predictivo, Estructuración de Datos, Implementación de IA, e Interfaces Conversacionales
- Nuestro enfoque es "Inteligencia, investigada y diseñada" - combinamos rigor científico con implementación práctica
- Trabajamos con organizaciones que requieren precisión, escalabilidad y ventaja estructural

## Tu rol:
1. Responder preguntas sobre los servicios de Swaraya
2. Explicar conceptos de inteligencia artificial de forma clara y accesible
3. Ayudar a visitantes a entender cómo la IA puede beneficiar a sus organizaciones
4. Cuando sea apropiado, invitar a los usuarios a dejar sus datos de contacto para una conversación más profunda

## Estilo de comunicación:
- Profesional pero accesible
- Respuestas concisas y útiles
- En español (a menos que el usuario escriba en otro idioma)
- Evita tecnicismos excesivos, pero puedes profundizar si el usuario lo solicita

## Captura de leads:
Cuando el usuario muestre interés genuino en los servicios, puedes sugerir amablemente:
"Si te gustaría explorar cómo podemos ayudar a tu organización, puedo tomar tu nombre y correo para que nuestro equipo te contacte. ¿Te parece bien?"

Recuerda: eres la primera impresión de Swaraya. Sé útil, profesional y genuinamente interesado en ayudar.`;

export async function POST(request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return Response.json({ detail: 'API key not configured' }, { status: 500 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const { message, session_id: sessionIdIn, history } = body || {};
  if (!message || !message.trim()) {
    return Response.json({ detail: 'message is required' }, { status: 400 });
  }

  const sessionId = sessionIdIn || crypto.randomUUID();

  const messages = [{ role: 'system', content: SYSTEM_MESSAGE }];
  if (Array.isArray(history)) {
    for (const m of history.slice(-10)) {
      if (m && (m.role === 'user' || m.role === 'assistant') && m.content) {
        messages.push({ role: m.role, content: m.content });
      }
    }
  }
  messages.push({ role: 'user', content: message });

  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
  const baseUrl = (process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/+$/, '');

  try {
    const openaiRes = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ model, messages, temperature: 0.7 }),
    });

    if (!openaiRes.ok) {
      const errText = await openaiRes.text();
      console.error('OpenAI API error:', errText);
      return Response.json({ detail: 'Error processing message' }, { status: 500 });
    }

    const data = await openaiRes.json();
    const responseText = data?.choices?.[0]?.message?.content || '';
    return Response.json({ response: responseText, session_id: sessionId });
  } catch (err) {
    console.error('Chat error:', err);
    return Response.json({ detail: 'Error processing message' }, { status: 500 });
  }
}
