/**
 * SWARAYA — Catálogo de agentes en operación.
 *
 * ARQUITECTURA: Datos separados de presentación.
 * Mañana esta lista puede venir de Sanity / API externa sin tocar el
 * componente. El shape debe respetar:
 *
 *   {
 *     id:         string  (estable)
 *     disciplina: string  (etiqueta corta, ej. "Inmobiliario residencial")
 *     titulo:     string  (la promesa de valor, una frase corta)
 *     problema:   string  (qué duele en una frase)
 *     resultado:  string  (qué hace el agente, en una frase)
 *     estado:     'produccion' | 'desarrollo' | 'proximo'
 *     logro:      string  (resultado anonimizado, sin nombre de cliente)
 *     ctaCard?:   boolean (true marca la tarjeta como CTA, no como caso)
 *   }
 */

export const agents = [
  {
    id: 'inmobiliario-leads',
    disciplina: 'Inmobiliario residencial',
    titulo: 'Califica leads y prioriza los de mayor cierre',
    problema:
      'Entran muchos prospectos y nadie sabe cuáles valen la pena.',
    resultado:
      'Perfila cada lead automáticamente y prioriza por probabilidad de cierre, con aprobación humana antes de actuar.',
    estado: 'produccion',
    logro:
      'Perfilado automático de leads operando en un desarrollo residencial.',
  },
  {
    id: 'fiscal-riesgos',
    disciplina: 'Fiscal / Contable',
    titulo: 'Detecta riesgos fiscales antes de que cuesten',
    problema:
      'Revisar documentación fiscal a mano es lento y se escapan riesgos.',
    resultado:
      'Pre-revisa documentos y marca los de mayor riesgo para atención prioritaria.',
    estado: 'desarrollo',
    logro: 'En construcción.',
  },
  {
    id: 'cta-disciplina',
    disciplina: 'Tu disciplina',
    titulo: 'El siguiente agente podría ser para tu negocio',
    problema:
      'Cada profesión tiene tareas repetitivas de criterio experto.',
    resultado: 'Diseñamos agentes a la medida de tu disciplina.',
    estado: 'proximo',
    logro: '',
    ctaCard: true,
  },
];
