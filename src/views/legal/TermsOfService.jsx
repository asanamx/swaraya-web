import LegalLayout from './LegalLayout';
import Link from 'next/link';
import { corporate, formatInitiativesText, initiatives } from '@/data/initiatives';

const COMPANY = corporate.legalName;
const SHORT = corporate.shortName;
const EMAIL_CONTACT = corporate.contact.general;
const SITE = 'swaraya.ai';
const ADDRESS = 'Avenida Juárez 397, Pachuca de Soto, Estado de Hidalgo, C.P. 42000, México';

const sections = [
  {
    number: '01',
    id: 'objeto',
    title: 'Objeto y alcance del Sitio',
    body: (
      <>
        <p>
          El Sitio tiene como objeto presentar de manera informativa los servicios de investigación, diseño, ingeniería e integración de sistemas de inteligencia artificial que ofrece <strong>{SHORT}</strong>, así como su enfoque metodológico, contenido editorial (blog) y facilitar el contacto entre prospectos interesados y el equipo de {SHORT}.
        </p>
        <p>
          La información publicada en el Sitio es de carácter <strong>ilustrativo y referencial</strong> y no constituye una oferta vinculante de prestación de servicios.
        </p>
      </>
    ),
  },
  {
    number: '02',
    id: 'comercial',
    title: 'Información comercial y propuestas',
    body: (
      <>
        <p>
          Las descripciones de servicios, metodologías, capacidades técnicas, tiempos de entrega estimados, casos de estudio y cualquier rango de honorarios que se mencione en el Sitio son de <strong>carácter meramente referencial</strong> y pueden estar sujetos a cambios sin previo aviso por parte de {SHORT}. Cuando se expresen precios, éstos se entenderán en <strong>pesos mexicanos (MXN)</strong> y, salvo indicación expresa, no incluyen el Impuesto al Valor Agregado (IVA) ni gastos adicionales como licenciamiento de software, infraestructura en la nube, cómputo de modelos de inteligencia artificial de terceros, viáticos u otros costos derivados de la ejecución del proyecto.
        </p>
        <p>
          Las condiciones definitivas de cada relación comercial se establecerán únicamente en los <strong>documentos contractuales firmados entre las partes</strong> (carta de compromiso, propuesta firmada, orden de trabajo y/o contrato de prestación de servicios), los cuales prevalecerán sobre cualquier información contenida en el Sitio.
        </p>
      </>
    ),
  },
  {
    number: '03',
    id: 'propiedad',
    title: 'Propiedad intelectual',
    body: (
      <>
        <p>
          La totalidad del contenido del Sitio, incluyendo de manera enunciativa y no limitativa: textos, artículos del blog, fotografías, ilustraciones, videos, diagramas, logotipos, la marca <strong>“{SHORT}”</strong>, tipografías, paleta de colores, identidad visual, código fuente, código compilado, bases de datos, gráficos, metodologías, frameworks de evaluación y cualesquiera otros elementos, son propiedad exclusiva de {SHORT} o se utilizan con autorización expresa de sus titulares, y se encuentran protegidos por la <strong>Ley Federal del Derecho de Autor</strong>, la <strong>Ley Federal de Protección a la Propiedad Industrial</strong> y los tratados internacionales aplicables.
        </p>
        <p>
          Queda estrictamente prohibida cualquier reproducción, distribución, comunicación pública, transformación, uso para el entrenamiento de modelos de inteligencia artificial o utilización del contenido del Sitio sin la autorización previa, expresa y por escrito de {SHORT}.
        </p>
      </>
    ),
  },
  {
    number: '04',
    id: 'uso-permitido',
    title: 'Uso permitido del Sitio',
    body: (
      <>
        <p>El Usuario se obliga a utilizar el Sitio únicamente con fines lícitos. Queda prohibido:</p>
        <ul>
          <li>Realizar cualquier acto que vulnere la seguridad, integridad o disponibilidad del Sitio (intentos de intrusión, escaneo, inyección de código, ataques de denegación de servicio, ingeniería inversa, entre otros).</li>
          <li>Utilizar bots, scrapers, crawlers, spiders o cualquier herramienta automatizada para extraer información del Sitio, del blog o del asistente conversacional sin autorización expresa.</li>
          <li>Suplantar la identidad de terceros o proporcionar información falsa, inexacta o desactualizada.</li>
          <li>Reproducir, copiar, distribuir o explotar comercialmente el contenido del Sitio.</li>
          <li>Utilizar el Sitio, sus formularios o el asistente conversacional para fines ajenos a la consulta legítima sobre los servicios de {SHORT}, incluyendo el envío de <em>spam</em>, contenido ofensivo, ilegal o que vulnere derechos de terceros.</li>
          <li>Intentar manipular, desviar (<em>jailbreak</em>, <em>prompt injection</em>) o explotar el comportamiento del asistente conversacional para obtener resultados distintos a su propósito.</li>
        </ul>
      </>
    ),
  },
  {
    number: '05',
    id: 'asistente',
    title: 'Asistente conversacional con inteligencia artificial',
    body: (
      <>
        <p>
          El Sitio incorpora un asistente conversacional que utiliza modelos de inteligencia artificial provistos por terceros. La información generada por dicho asistente es de <strong>carácter orientativo</strong>, puede contener imprecisiones u omisiones y <strong>no constituye asesoría profesional, legal, fiscal, financiera ni técnica vinculante</strong>.
        </p>
        <p>
          El Usuario se obliga a no proporcionar al asistente datos personales sensibles, secretos industriales o información confidencial de terceros sin la debida autorización. Las conversaciones podrán ser almacenadas, procesadas y analizadas de forma agregada y anonimizada para mejorar la calidad del servicio, conforme a lo previsto en el Aviso de Privacidad Integral.
        </p>
        <p>
          {SHORT} no garantiza la disponibilidad continua del asistente y podrá suspenderlo, modificarlo o reemplazarlo en cualquier momento sin que ello genere responsabilidad alguna.
        </p>
      </>
    ),
  },
  {
    number: '06',
    id: 'enlaces',
    title: 'Enlaces a sitios de terceros',
    body: (
      <>
        <p>
          El Sitio puede contener enlaces a sitios web operados por terceros (plataformas de modelos de IA, herramientas de productividad, redes sociales, repositorios de código, entre otros). {SHORT} no es responsable del contenido, políticas de privacidad ni prácticas de dichos sitios, por lo que se recomienda al Usuario revisar los términos y condiciones aplicables al acceder a ellos.
        </p>
      </>
    ),
  },
  {
    number: '07',
    id: 'datos',
    title: 'Tratamiento de datos personales',
    body: (
      <>
        <p>
          El tratamiento de los datos personales que el Usuario proporcione a través del Sitio, ya sea mediante el formulario de contacto, el correo electrónico, el asistente conversacional o cualquier otro canal, se rige por el{' '}
          <Link href="/privacidad">Aviso de Privacidad Integral</Link>, el cual forma parte integrante de los presentes Términos.
        </p>
      </>
    ),
  },
  {
    number: '08',
    id: 'cookies',
    title: 'Cookies y tecnologías similares',
    body: (
      <>
        <p>
          El Sitio utiliza cookies y tecnologías similares con la finalidad de mejorar la experiencia del Usuario, medir el desempeño del Sitio y, en su caso, mostrar contenido relevante. El detalle del uso de cookies se encuentra descrito en el{' '}
          <Link href="/privacidad#cookies">Aviso de Privacidad Integral</Link>. Al continuar navegando en el Sitio, el Usuario acepta el uso de cookies conforme a dicha política, salvo manifestación expresa en contrario.
        </p>
      </>
    ),
  },
  {
    number: '09',
    id: 'responsabilidad',
    title: 'Limitación de responsabilidad',
    body: (
      <>
        <p>
          {SHORT} hace su mejor esfuerzo por mantener actualizada y precisa toda la información publicada en el Sitio; sin embargo, no garantiza la ausencia absoluta de errores, omisiones, interrupciones, virus informáticos o cualquier otro elemento que pueda afectar el correcto funcionamiento del Sitio o causar daños al Usuario. En la máxima medida permitida por la legislación aplicable, {SHORT} <strong>no será responsable</strong> por daños directos, indirectos, incidentales, especiales o consecuentes derivados del acceso, uso o imposibilidad de uso del Sitio, del asistente conversacional o de la información en él contenida.
        </p>
      </>
    ),
  },
  {
    number: '10',
    id: 'cobros-devoluciones',
    title: 'Cobros y devoluciones',
    body: (
      <>
        <p>
          Los cobros de las iniciativas comerciales operadas por {SHORT} son procesados por <strong>Paddle.com Market Ltd</strong> en su calidad de <em>Merchant of Record</em>. Las condiciones específicas de reembolso, cancelación de suscripciones y atención de disputas se detallan en nuestra <Link href="/devoluciones">Política de devoluciones</Link>, la cual forma parte integral de los presentes Términos.
        </p>
        <p>
          Al confirmar cualquier compra, el Usuario declara haber leído y aceptado dicha Política, así como los términos aplicables de Paddle.
        </p>
      </>
    ),
  },
  {
    number: '11',
    id: 'disponibilidad',
    title: 'Disponibilidad del Sitio',
    body: (
      <>
        <p>
          {SHORT} se reserva el derecho de suspender, modificar, interrumpir o descontinuar, total o parcialmente, el Sitio o cualquiera de sus funcionalidades en cualquier momento y sin previo aviso, por causas técnicas, de mantenimiento, comerciales o de cualquier otra naturaleza, sin que ello genere responsabilidad alguna en favor del Usuario.
        </p>
      </>
    ),
  },
  {
    number: '12',
    id: 'modificaciones',
    title: 'Modificación de los Términos',
    body: (
      <>
        <p>
          {SHORT} podrá modificar los presentes Términos en cualquier momento. Las modificaciones surtirán efecto desde su publicación en el Sitio. La fecha de última actualización aparece al inicio del documento. El uso continuado del Sitio después de cualquier modificación constituye la <strong>aceptación tácita</strong> de los nuevos Términos.
        </p>
      </>
    ),
  },
  {
    number: '13',
    id: 'jurisdiccion',
    title: 'Legislación aplicable y jurisdicción',
    body: (
      <>
        <p>
          Los presentes Términos se rigen por las leyes vigentes de los <strong>Estados Unidos Mexicanos</strong>. Para la interpretación, cumplimiento y ejecución de los mismos, las partes se someten expresamente a la jurisdicción de los <strong>tribunales competentes de la ciudad de Pachuca de Soto, Estado de Hidalgo</strong>, renunciando a cualquier otra jurisdicción que pudiera corresponderles por razón de sus domicilios presentes o futuros.
        </p>
      </>
    ),
  },
  {
    number: '14',
    id: 'contacto',
    title: 'Contacto',
    body: (
      <>
        <p>
          Para cualquier duda, comentario o aclaración relacionada con los presentes Términos, el Usuario puede comunicarse a:
        </p>
        <ul>
          <li><strong>Correo electrónico:</strong> <a href={`mailto:${EMAIL_CONTACT}`}>{EMAIL_CONTACT}</a></li>
          <li><strong>Domicilio:</strong> {ADDRESS}</li>
        </ul>
      </>
    ),
  },
];

const TermsOfService = () => {
  return (
    <LegalLayout
      eyebrow="Legal · Términos y Condiciones"
      title="Términos y Condiciones de uso"
      subtitle={`Los presentes Términos y Condiciones (en adelante, los “Términos”) regulan el acceso y uso del sitio web ${SITE} (en adelante, el “Sitio”), propiedad de ${COMPANY} (en adelante, “${SHORT}” o el “Titular”), así como la relación entre ${SHORT} y cualquier persona que ingrese, navegue o interactúe con el Sitio (en adelante, el “Usuario”). Al acceder y utilizar el Sitio, el Usuario manifiesta haber leído, comprendido y aceptado en su totalidad los presentes Términos. En caso de no estar de acuerdo, deberá abstenerse de utilizar el Sitio.`}
      lastUpdated="15 de junio de 2026"
      sections={sections}
    />
  );
};

export default TermsOfService;
