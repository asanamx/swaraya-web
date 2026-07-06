import LegalLayout from './LegalLayout';

const COMPANY = 'swaraya, S. de R. L. de C. V.';
const SHORT = 'swaraya';
const RFC = 'SWA1408208F7';
const ADDRESS = 'Avenida Juárez 397, Pachuca de Soto, Estado de Hidalgo, C.P. 42000, México';
const EMAIL_ARCO = 'privacidad@swaraya.ai';
const EMAIL_CONTACT = 'hola@swaraya.ai';

const sections = [
  {
    number: '01',
    id: 'identidad',
    title: 'Identidad y domicilio del Responsable',
    body: (
      <>
        <p>
          <strong>{COMPANY}</strong> (en adelante, el <strong>“Responsable”</strong> o <strong>“{SHORT}”</strong>), con Registro Federal de Contribuyentes <strong>{RFC}</strong> y domicilio para oír y recibir notificaciones en {ADDRESS}, es el responsable del tratamiento, uso, protección y resguardo de los datos personales que recabe, conforme al presente Aviso.
        </p>
      </>
    ),
  },
  {
    number: '02',
    id: 'datos',
    title: 'Datos personales que se recaban',
    body: (
      <>
        <p>
          El Responsable podrá recabar, de forma directa, indirecta o a través de terceros autorizados, las siguientes categorías de datos personales:
        </p>
        <ul>
          <li><strong>Datos de identificación:</strong> nombre completo, fotografía cuando aplique y, en su caso, identificación oficial para procesos contractuales.</li>
          <li><strong>Datos de contacto:</strong> teléfono fijo, teléfono móvil, correo electrónico, dirección postal, redes sociales y otros medios de comunicación.</li>
          <li><strong>Datos profesionales y de la organización:</strong> empresa o entidad que representa, cargo o función, sector, tamaño de la organización, alcance del proyecto y presupuesto estimado, exclusivamente cuando el Titular manifieste interés en contratar nuestros servicios.</li>
          <li><strong>Datos fiscales:</strong> razón social, RFC, domicilio fiscal y uso de CFDI, exclusivamente respecto de clientes activos para fines de facturación y cumplimiento fiscal.</li>
          <li><strong>Datos de la conversación:</strong> contenido de los mensajes, prompts y consultas enviadas a través de nuestro formulario de contacto, correo electrónico o asistente conversacional con tecnología de inteligencia artificial.</li>
          <li><strong>Datos de navegación:</strong> dirección IP, identificador del dispositivo, sistema operativo, tipo de navegador, ubicación geográfica aproximada, páginas visitadas dentro del sitio y datos derivados de cookies (ver Sección 09).</li>
        </ul>
        <p>
          El Responsable <strong>no recaba datos personales sensibles</strong>, salvo aquéllos estrictamente necesarios para el cumplimiento de obligaciones legales o fiscales, en cuyo caso se solicitará el consentimiento expreso por escrito del Titular.
        </p>
        <p>
          Se solicita al Titular abstenerse de proporcionar al asistente conversacional información personal sensible, secretos comerciales o información confidencial de terceros sin la debida autorización.
        </p>
      </>
    ),
  },
  {
    number: '03',
    id: 'finalidades',
    title: 'Finalidades del tratamiento',
    body: (
      <>
        <span className="sublabel">Finalidades primarias · necesarias para la relación con el Titular</span>
        <ul>
          <li>Atender solicitudes de información sobre los servicios de investigación, diseño, ingeniería e integración de sistemas de inteligencia artificial que ofrece {SHORT}.</li>
          <li>Operar el asistente conversacional del sitio y dar respuesta a las consultas formuladas a través del mismo.</li>
          <li>Coordinar y dar seguimiento a reuniones, llamadas, presentaciones, demos y visitas a las oficinas del Responsable.</li>
          <li>Generar cotizaciones, propuestas técnicas y comerciales, así como contratos de prestación de servicios.</li>
          <li>Ejecutar, dar seguimiento y entregar los proyectos contratados, incluyendo la coordinación con los equipos técnicos y de operación del cliente.</li>
          <li>Emitir comprobantes fiscales digitales (CFDI) y cumplir con las obligaciones contables, fiscales, jurídicas y administrativas aplicables.</li>
          <li>Atender requerimientos de autoridades competentes y dar cumplimiento a la legislación aplicable, incluyendo la prevención de operaciones con recursos de procedencia ilícita cuando resulte exigible.</li>
        </ul>
        <span className="sublabel">Finalidades secundarias · opcionales y revocables</span>
        <ul>
          <li>Envío de comunicaciones comerciales, boletines (<em>newsletter</em>), invitaciones a eventos, contenidos editoriales y novedades relacionadas con los servicios del Responsable.</li>
          <li>Estudios estadísticos, de mercado y de uso del sitio para mejorar nuestros servicios.</li>
          <li>Encuestas de satisfacción y calidad del servicio.</li>
          <li>Uso anonimizado y agregado de conversaciones para mejorar el desempeño del asistente conversacional.</li>
        </ul>
        <p>
          Si el Titular no desea que sus datos sean tratados para alguna de las finalidades secundarias, podrá manifestarlo en cualquier momento al correo <a href={`mailto:${EMAIL_ARCO}`}>{EMAIL_ARCO}</a>, sin que ello afecte la relación con el Responsable ni la prestación del servicio principal.
        </p>
      </>
    ),
  },
  {
    number: '04',
    id: 'transferencias',
    title: 'Transferencias de datos personales',
    body: (
      <>
        <p>
          El Responsable podrá transferir los datos personales del Titular, exclusivamente para el cumplimiento de las finalidades descritas en este Aviso, a los siguientes terceros:
        </p>
        <ul>
          <li><strong>Proveedores de infraestructura tecnológica:</strong> servicios de alojamiento, despliegue, bases de datos y entrega de contenido (<em>hosting</em>, <em>CDN</em>) ubicados dentro y fuera del territorio nacional, contratados bajo cláusulas que garantizan un nivel de protección equivalente al de la normativa mexicana aplicable.</li>
          <li><strong>Proveedores de modelos de inteligencia artificial:</strong> plataformas que prestan servicios de procesamiento de lenguaje natural y modelos generativos (por ejemplo, OpenAI, Anthropic, Google) empleados para operar el asistente conversacional y servicios derivados.</li>
          <li><strong>Plataformas de gestión de contenido (CMS) y de comunicación transaccional:</strong> proveedores que nos permiten administrar el contenido editorial y enviar correos electrónicos de servicio (por ejemplo, Sanity, Resend).</li>
          <li><strong>Plataformas de analítica y desempeño del sitio:</strong> únicamente con información agregada y no identificable.</li>
          <li><strong>Despachos contables, fiscales y jurídicos:</strong> exclusivamente para el cumplimiento de obligaciones fiscales, contables o legales del Responsable.</li>
          <li><strong>Autoridades competentes:</strong> en los casos legalmente exigidos.</li>
        </ul>
        <p>
          Estas transferencias resultan necesarias para el mantenimiento o cumplimiento de la relación jurídica entre el Titular y el Responsable, así como para el cumplimiento de obligaciones legales, por lo que <strong>no requieren del consentimiento expreso</strong> del Titular conforme al artículo 37 de la LFPDPPP.
        </p>
      </>
    ),
  },
  {
    number: '05',
    id: 'arco',
    title: 'Derechos ARCO y revocación del consentimiento',
    body: (
      <>
        <p>
          El Titular tiene derecho a conocer qué datos personales tenemos de él, para qué los utilizamos y las condiciones del uso que les damos (<strong>Acceso</strong>). Asimismo, tiene derecho a solicitar la corrección de su información personal en caso de que esté desactualizada, sea inexacta o incompleta (<strong>Rectificación</strong>); que eliminemos sus datos de nuestros registros cuando considere que no están siendo utilizados conforme a los principios, deberes y obligaciones previstas en la normativa (<strong>Cancelación</strong>); así como oponerse al uso de sus datos personales para fines específicos (<strong>Oposición</strong>). En conjunto, estos derechos se conocen como <strong>derechos ARCO</strong>.
        </p>
        <p>
          Para el ejercicio de los derechos ARCO o la revocación del consentimiento, el Titular deberá enviar una solicitud al correo electrónico <a href={`mailto:${EMAIL_ARCO}`}>{EMAIL_ARCO}</a> con la siguiente información:
        </p>
        <ul>
          <li>Nombre completo y datos de contacto del Titular.</li>
          <li>Documentos que acrediten su identidad (o, en su caso, la personalidad de su representante legal).</li>
          <li>Descripción clara y precisa de los datos personales respecto de los cuales se pretende ejercer alguno de los derechos ARCO.</li>
          <li>Cualquier otro elemento que facilite la localización de los datos personales.</li>
        </ul>
        <p>
          El Responsable dará respuesta a la solicitud en un plazo no mayor a <strong>veinte (20) días hábiles</strong> contados a partir de su recepción, conforme al artículo 32 de la LFPDPPP.
        </p>
      </>
    ),
  },
  {
    number: '06',
    id: 'limitar',
    title: 'Medios para limitar el uso o divulgación de datos',
    body: (
      <>
        <p>
          El Titular puede limitar el uso o divulgación de sus datos personales enviando una solicitud al correo <a href={`mailto:${EMAIL_ARCO}`}>{EMAIL_ARCO}</a>. Asimismo, podrá inscribirse en el <strong>Registro Público para Evitar Publicidad (REPEP)</strong> de la Procuraduría Federal del Consumidor para no recibir publicidad de bienes y servicios.
        </p>
      </>
    ),
  },
  {
    number: '07',
    id: 'seguridad',
    title: 'Medidas de seguridad',
    body: (
      <>
        <p>
          El Responsable ha implementado y mantiene medidas de seguridad administrativas, técnicas y físicas para proteger los datos personales contra daño, pérdida, alteración, destrucción o uso, acceso o tratamiento no autorizado. Únicamente personal autorizado tiene acceso a la información, los accesos se administran bajo el principio de menor privilegio y toda transmisión digital se realiza mediante conexiones cifradas (HTTPS/TLS).
        </p>
      </>
    ),
  },
  {
    number: '08',
    id: 'conservacion',
    title: 'Conservación de los datos',
    body: (
      <>
        <p>
          Los datos personales del Titular se conservarán durante el tiempo necesario para cumplir con las finalidades descritas en este Aviso y, posteriormente, durante los plazos exigidos por la legislación fiscal, civil y mercantil aplicable (<strong>hasta un máximo de diez años</strong>, salvo disposición legal en contrario), después de los cuales serán bloqueados y eliminados.
        </p>
      </>
    ),
  },
  {
    number: '09',
    id: 'cookies',
    title: 'Uso de cookies, web beacons y tecnologías similares',
    body: (
      <>
        <p>
          El sitio <strong>swaraya.ai</strong> utiliza cookies y tecnologías similares con el fin de mejorar la experiencia de navegación, recordar preferencias del usuario, medir el desempeño del sitio y mostrar contenido relevante. Las cookies utilizadas son:
        </p>
        <ul>
          <li><strong>Cookies estrictamente necesarias:</strong> indispensables para el funcionamiento del sitio (gestión de sesión, seguridad). No requieren consentimiento.</li>
          <li><strong>Cookies de desempeño y analítica:</strong> permiten conocer el comportamiento agregado de los usuarios para mejorar el sitio.</li>
          <li><strong>Cookies de funcionalidad:</strong> recuerdan opciones elegidas por el Usuario (idioma, contexto del asistente conversacional).</li>
          <li><strong>Cookies de marketing:</strong> utilizadas para mostrar contenido o publicidad personalizada en plataformas externas, únicamente cuando el Usuario lo autorice.</li>
        </ul>
        <p>
          El Titular puede deshabilitar el uso de cookies desde la configuración de su navegador. Sin embargo, deshabilitar ciertas cookies puede limitar la funcionalidad del sitio. El sitio respeta la señal <strong>“Do Not Track”</strong> cuando ésta es enviada por el navegador.
        </p>
      </>
    ),
  },
  {
    number: '10',
    id: 'cambios',
    title: 'Cambios al Aviso de Privacidad',
    body: (
      <>
        <p>
          El presente Aviso de Privacidad podrá sufrir modificaciones, cambios o actualizaciones derivadas de nuevos requerimientos legales, de nuestras propias necesidades, de nuestras prácticas de privacidad o por otras causas. Cualquier modificación se pondrá a disposición del Titular en la presente página, con la fecha de la última actualización al inicio del documento.
        </p>
      </>
    ),
  },
  {
    number: '11',
    id: 'aceptacion',
    title: 'Aceptación del Aviso de Privacidad',
    body: (
      <>
        <p>
          Al proporcionar sus datos personales al Responsable, ya sea de manera directa, indirecta o por medios electrónicos —incluyendo el envío del formulario de contacto, el intercambio de mensajes con el asistente conversacional o cualquier comunicación por correo electrónico—, el Titular manifiesta su conocimiento y aceptación del presente Aviso de Privacidad. Asimismo, autoriza expresamente el tratamiento de sus datos personales para las finalidades aquí descritas.
        </p>
      </>
    ),
  },
  {
    number: '12',
    id: 'contacto',
    title: 'Contacto del Departamento de Datos Personales',
    body: (
      <>
        <p>
          Para cualquier duda, aclaración o solicitud relacionada con el presente Aviso de Privacidad o el tratamiento de datos personales, el Titular puede comunicarse al departamento responsable a través de:
        </p>
        <ul>
          <li><strong>Correo electrónico (ARCO y privacidad):</strong> <a href={`mailto:${EMAIL_ARCO}`}>{EMAIL_ARCO}</a></li>
          <li><strong>Correo electrónico (general):</strong> <a href={`mailto:${EMAIL_CONTACT}`}>{EMAIL_CONTACT}</a></li>
          <li><strong>Domicilio:</strong> {ADDRESS}</li>
        </ul>
      </>
    ),
  },
];

const PrivacyPolicy = () => {
  return (
    <LegalLayout
      eyebrow="Legal · Aviso de Privacidad"
      title="Aviso de Privacidad Integral"
      subtitle={`En cumplimiento con lo dispuesto por la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP), su Reglamento y los Lineamientos del Aviso de Privacidad, el presente documento describe la forma y los términos en que ${COMPANY} (en adelante, “${SHORT}”) tratará los datos personales de los Titulares que tengan contacto con ${SHORT} a través de cualquiera de sus canales digitales y presenciales.`}
      lastUpdated="15 de junio de 2026"
      sections={sections}
    />
  );
};

export default PrivacyPolicy;
