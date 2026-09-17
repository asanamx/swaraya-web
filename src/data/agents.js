/**
 * SWARAYA — Catálogo de agentes / capacidades.
 *
 * ARQUITECTURA: Datos separados de presentación.
 * Estados admitidos: 'produccion' | 'desarrollo' | 'disponible' | 'cta'
 *
 *   {
 *     id:         string  (estable)
 *     disciplina: string  (etiqueta corta, ej. "Inmobiliario residencial")
 *     titulo:     string  (la promesa de valor, una frase corta)
 *     problema:   string  (qué duele en una frase)
 *     resultado:  string  (qué hace el agente, en una frase)
 *     estado:     'produccion' | 'desarrollo' | 'disponible'
 *     logro:      string  (pie de tarjeta)
 *     ctaCard?:   boolean (true marca la tarjeta como CTA, no como caso)
 *   }
 */

export const agents = [
  {
    id: 'inmobiliario-prospectos',
    disciplina: 'Inmobiliario residencial',
    titulo: 'Califica y prioriza prospectos',
    problema:
      'Entran solicitudes por todos lados y nadie alcanza a contestarlas a tiempo.',
    resultado:
      'Responde en segundos, califica con tu criterio y entrega al vendedor solo lo que vale su tiempo.',
    estado: 'produccion',
    logro:
      'Perfilado automático operando en un desarrollo residencial.',
  },
  {
    id: 'fiscal-riesgos',
    disciplina: 'Fiscal / Contable',
    titulo: 'Procesa documentos y detecta riesgos',
    problema:
      'Revisar facturas, contratos y expedientes a mano es lento y se escapan cosas.',
    resultado:
      'Extrae, valida y marca por prioridad de riesgo, con la excepción siempre a revisión humana.',
    estado: 'desarrollo',
    logro: 'En construcción.',
  },
  {
    id: 'operacion-manual',
    disciplina: 'Operación interna',
    titulo: 'Responde con el manual de la casa',
    problema:
      'Todo depende de la persona que se sabe las políticas y los precedentes.',
    resultado:
      'Contesta sobre políticas, precios y casos anteriores usando los documentos de tu empresa.',
    estado: 'disponible',
    logro: 'Plantilla lista para implementar.',
  },
  {
    id: 'seguimiento-desviaciones',
    disciplina: 'Seguimiento',
    titulo: 'Vigila y avisa antes del problema',
    problema:
      'Las desviaciones se descubren cuando ya costaron dinero.',
    resultado:
      'Compara la operación contra lo planeado y alerta al responsable con el dato en la mano.',
    estado: 'disponible',
    logro: 'Plantilla lista para implementar.',
  },
  {
    id: 'cta-disciplina',
    disciplina: 'Tu disciplina',
    titulo: 'El siguiente podría ser el tuyo',
    problema:
      'Si reconoces una tarea repetitiva donde se ejerce criterio sobre datos que llegan en flujo,',
    resultado:
      'probablemente ahí vive tu primer agente.',
    cierre:
      'Lo mapeamos contigo en dos semanas.',
    estado: 'proximo',
    logro: '',
    ctaCard: true,
  },
];
