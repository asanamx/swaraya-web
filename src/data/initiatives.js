/**
 * SWARAYA · Iniciativas propietarias.
 *
 * Lista central de plataformas/productos operados por swaraya. Todos
 * los componentes de UI y las páginas legales leen desde aquí para
 * mantener consistencia. Añadir una iniciativa nueva = un objeto más
 * en este array; no hay que tocar componentes.
 */

export const initiatives = [
  {
    id: 'atika',
    name: 'atika',
    domain: 'atika.studio',
    url: 'https://atika.studio',
    logoAlt: 'atika',
    footerHeightPx: 18,                // ajuste óptico
    tagline: 'Diagnóstico digital de interiores con IA',
    description:
      'Plataforma de diagnóstico digital de interiores impulsada por inteligencia artificial. Genera análisis y reportes de espacios habitables bajo demanda.',
    model: 'delivery',                 // 'delivery' | 'subscription'
    contactEmail: 'hola@atika.studio',
    status: 'operativa',               // 'operativa' | 'desarrollo' | 'proximo'
  },
  {
    id: 'constructos',
    name: 'constructos',
    domain: 'constructos.app',
    url: 'https://constructos.app',
    logoAlt: 'constructos',
    footerHeightPx: 17,                // ajuste óptico: wordmark muy largo
    tagline: 'constructos operativos para equipos de producto',
    description:
      'Plataforma de constructos operativos que estandariza rituales, artefactos y flujos de trabajo de equipos de producto y operaciones apoyada por inteligencia artificial.',
    model: 'subscription',
    contactEmail: 'hola@constructos.app',
    status: 'desarrollo',
  },
  {
    id: 'stratika',
    name: 'stratika',
    domain: 'stratika.systems',
    url: 'https://stratika.systems',
    logoAlt: 'stratika',
    footerHeightPx: 16,                // ajuste óptico
    tagline: 'Sistemas estratégicos impulsados por IA',
    description:
      'Plataforma de sistemas estratégicos que opera flujos de decisión aumentados por inteligencia artificial para equipos ejecutivos y unidades de negocio.',
    model: 'subscription',
    contactEmail: 'hola@stratika.systems',
    status: 'desarrollo',
  },
  {
    id: 'blynx',
    name: 'blynx',
    domain: 'blynx.app',
    url: 'https://blynx.app',
    logoAlt: 'blynx',
    footerHeightPx: 16,
    tagline: 'Automatización de mercadotecnia con IA',
    description:
      'Plataforma de automatización de mercadotecnia para pequeñas y medianas empresas, con generación de contenido y gestión de campañas asistidas por inteligencia artificial.',
    model: 'subscription',
    contactEmail: 'hola@blynx.app',
    status: 'desarrollo',
  },
  // Próximas iniciativas se agregan aquí — la UI y los documentos
  // legales se actualizarán automáticamente:
  // {
  //   id: 'xtratica',
  //   name: 'Xtrática',
  //   domain: 'xtratica.com',
  //   url: 'https://xtratica.com',
  //   tagline: 'Análisis financiero inmobiliario',
  //   description: '…',
  //   model: 'subscription',
  //   contactEmail: 'hola@xtratica.com',
  //   status: 'desarrollo',
  // },
];

/** Datos corporativos únicos (fuente de verdad legal). */
export const corporate = {
  legalName: 'swaraya, S. de R. L. de C. V.',
  shortName: 'swaraya',
  rfc: 'SWA1408208F7',
  address: {
    street: 'Avenida Juárez 397',
    city: 'Pachuca de Soto',
    state: 'Estado de Hidalgo',
    zip: '42000',
    country: 'México',
  },
  contact: {
    general: 'hola@swaraya.ai',
    privacy: 'privacidad@swaraya.ai',
  },
  merchantOfRecord: 'Paddle.com Market Limited',
};

/** Utilidad — string formateado del domicilio en una sola línea. */
export const formatAddress = () => {
  const a = corporate.address;
  return `${a.street}, ${a.city}, ${a.state}, C.P. ${a.zip}, ${a.country}`;
};

/** Utilidad — listado legible de iniciativas para textos legales. */
export const formatInitiativesText = () => {
  if (initiatives.length === 0) return '';
  if (initiatives.length === 1) {
    const i = initiatives[0];
    return `${i.name} (${i.domain})`;
  }
  const all = initiatives.map((i) => `${i.name} (${i.domain})`);
  const last = all.pop();
  return `${all.join(', ')} y ${last}`;
};
