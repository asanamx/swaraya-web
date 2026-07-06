import LegalLayout from './LegalLayout';
import Link from 'next/link';

const COMPANY = 'swaraya, S. de R. L. de C. V.';
const SHORT = 'swaraya';
const EMAIL_CONTACT = 'hola@swaraya.ai';

const sections = [
  {
    number: '01',
    id: 'marco-general',
    title: 'Marco general',
    body: (
      <>
        <p>
          Los cobros de las iniciativas comerciales operadas por <strong>{SHORT}</strong> son procesados por <strong>Paddle.com Market Ltd</strong>, quien actúa como <em>Merchant of Record</em>. Al confirmar una compra, el Usuario acepta tanto la presente Política como los Términos y Condiciones de Paddle, disponibles en{' '}
          <a href="https://www.paddle.com/legal/checkout-buyer-terms" target="_blank" rel="noopener noreferrer">paddle.com/legal/checkout-buyer-terms</a>.
        </p>
        <p>
          La presente Política forma parte integral de los{' '}
          <Link href="/terminos">Términos y Condiciones</Link> de {SHORT} y aplica a todas las iniciativas comerciales que operan bajo su titularidad, con independencia de su marca comercial.
        </p>
      </>
    ),
  },
  {
    number: '02',
    id: 'modelos',
    title: 'Modelos de entrega',
    body: (
      <>
        <p>Las iniciativas comerciales de {SHORT} operan bajo dos modelos de entrega. Las reglas de reembolso se aplican en función del modelo bajo el cual opere cada iniciativa:</p>
        <ul>
          <li>
            <strong>A. Entrega puntual de producto digital.</strong> Compras únicas en las que el Usuario recibe un análisis, reporte, pieza de material o entregable digital específico, producido a petición. El valor comercial se materializa en el momento de la entrega, generación o descarga del producto.
          </li>
          <li>
            <strong>B. Suscripción de acceso continuo.</strong> Servicios recurrentes en los que el Usuario accede a herramientas, tableros, reportes o análisis durante la vigencia del periodo pagado (mensual o anual).
          </li>
        </ul>
      </>
    ),
  },
  {
    number: '03',
    id: 'consentimiento',
    title: 'Acceso inmediato y renuncia al derecho de desistimiento',
    body: (
      <>
        <p>
          Todos los productos ofrecidos por {SHORT} son <strong>bienes y servicios digitales de acceso inmediato</strong>. Al confirmar el pago, el Usuario acepta expresamente que la prestación comienza en ese momento y <strong>renuncia al derecho de desistimiento</strong> que pudiera corresponderle bajo la Directiva 2011/83/UE (art. 16.m), la <em>Consumer Contracts Regulations 2013</em> del Reino Unido y las disposiciones equivalentes de otras jurisdicciones aplicables.
        </p>
        <p>
          Esta renuncia se registra al momento del checkout mediante consentimiento expreso, junto con la marca temporal, dirección IP y datos de la sesión.
        </p>
      </>
    ),
  },
  {
    number: '04',
    id: 'modelo-a',
    title: 'Reembolsos — Modelo A · Entrega puntual',
    body: (
      <>
        <p>
          <strong>No se emiten reembolsos</strong> una vez que el producto digital ha sido generado, entregado, visualizado o descargado por el Usuario. Cada entregable es único, se produce bajo demanda y su valor se consume en la entrega.
        </p>
        <p>Únicamente se contempla reembolso en los siguientes supuestos:</p>
        <ul>
          <li>Doble cobro o error técnico documentado imputable a Paddle</li>
          <li>Fallo verificado en la entrega: el producto no fue puesto a disposición del Usuario en su cuenta y el equipo de soporte no logró resolverlo en un plazo de 72 horas hábiles</li>
          <li>Cargo no autorizado, previa validación con Paddle y las instituciones bancarias correspondientes</li>
        </ul>
        <p>
          <strong>No constituyen motivos válidos de reembolso</strong>: la insatisfacción con el contenido de carácter subjetivo, el cambio de opinión, la omisión en la lectura de las características antes de comprar, o el no haber utilizado el producto después de haberlo generado o descargado.
        </p>
        <p>
          El Usuario declara haber revisado la descripción, alcance y muestras del producto antes de confirmar la compra.
        </p>
      </>
    ),
  },
  {
    number: '05',
    id: 'modelo-b',
    title: 'Reembolsos — Modelo B · Suscripción',
    body: (
      <>
        <p>Las suscripciones operan bajo las siguientes reglas:</p>
        <ul>
          <li>
            <strong>Cancelación libre.</strong> El Usuario puede cancelar la renovación automática en cualquier momento. El acceso al servicio se mantiene hasta el final del ciclo pagado.
          </li>
          <li>
            <strong>Sin reembolso prorrateado.</strong> No se emiten reembolsos parciales por periodos ya facturados y no consumidos por decisión del Usuario.
          </li>
          <li>
            <strong>Sin reembolso por reportes generados.</strong> Los reportes, análisis o entregables individuales producidos dentro de una suscripción activa no son reembolsables, aún si posteriormente el Usuario cancela.
          </li>
          <li>
            <strong>Renovación automática.</strong> Todo pago recurrente se notifica al Usuario con al menos 7 días naturales de anticipación mediante el correo asociado a la cuenta.
          </li>
        </ul>
        <p><strong>Ventana especial para suscripciones anuales.</strong></p>
        <p>
          Los planes anuales incluyen una <strong>ventana de 7 días naturales</strong> contados desde el primer pago para solicitar reembolso íntegro, <strong>siempre que durante ese periodo el Usuario no haya generado ningún reporte, análisis o entregable ni haya descargado material</strong>. El cumplimiento de esta condición se verifica mediante los registros de uso de la plataforma.
        </p>
        <p>
          Se emiten reembolsos adicionales únicamente por doble cobro, error técnico documentado imputable a Paddle o interrupción del servicio superior a 72 horas continuas por causa atribuible a {SHORT}.
        </p>
      </>
    ),
  },
  {
    number: '06',
    id: 'chargebacks',
    title: 'Contracargos abusivos',
    body: (
      <>
        <p>
          Antes de iniciar un contracargo (<em>chargeback</em>) ante la institución bancaria o emisora de tarjeta, se solicita al Usuario contactar al correo de soporte. La mayoría de los casos legítimos se resuelven en menos de 48 horas.
        </p>
        <p>Un contracargo iniciado sin contacto previo con soporte, o presentado después de haber consumido el producto entregado, podrá resultar en:</p>
        <ul>
          <li>Suspensión inmediata y bloqueo permanente de la cuenta del Usuario en todas las iniciativas comerciales de {SHORT}</li>
          <li>Reporte del incidente a Paddle y a las bases de datos de prevención de fraude de la industria</li>
          <li>Reclamación por la vía legal del importe disputado y de los costos administrativos y comisiones derivadas</li>
        </ul>
      </>
    ),
  },
  {
    number: '07',
    id: 'solicitud',
    title: 'Cómo solicitar un reembolso',
    body: (
      <>
        <p>Las solicitudes de reembolso deben enviarse por correo electrónico e incluir la siguiente información:</p>
        <ul>
          <li>Correo electrónico asociado a la cuenta de compra</li>
          <li>Identificador de la transacción emitido por Paddle</li>
          <li>Descripción clara y detallada del motivo</li>
          <li>Cualquier evidencia documental disponible (capturas, correos, mensajes)</li>
        </ul>
        <p>
          <strong>Correo:</strong> <a href={`mailto:${EMAIL_CONTACT}`}>{EMAIL_CONTACT}</a>
        </p>
        <p>
          El equipo de {SHORT} responde en un plazo máximo de <strong>5 días hábiles</strong> con una determinación por escrito. Cuando la solicitud proceda, el reembolso se ejecuta por Paddle al mismo método de pago original y puede tomar entre 5 y 10 días hábiles adicionales en verse reflejado, según el emisor de la tarjeta.
        </p>
      </>
    ),
  },
  {
    number: '08',
    id: 'modificaciones',
    title: 'Modificaciones',
    body: (
      <>
        <p>
          {SHORT} podrá modificar la presente Política en cualquier momento. Las modificaciones surtirán efecto desde su publicación en el Sitio, sin efecto retroactivo sobre compras ya realizadas. La fecha de última actualización aparece al inicio del documento.
        </p>
      </>
    ),
  },
];

const RefundPolicy = () => {
  return (
    <LegalLayout
      eyebrow="Legal · Política de devoluciones"
      title="Política de devoluciones y reembolsos"
      subtitle={`La presente Política de devoluciones regula las condiciones bajo las cuales ${COMPANY} (en adelante, "${SHORT}") emite reembolsos y atiende disputas comerciales por los productos y servicios digitales de sus iniciativas comerciales. Al confirmar cualquier compra, el Usuario manifiesta haber leído, comprendido y aceptado en su totalidad esta Política.`}
      lastUpdated="15 de junio de 2026"
      sections={sections}
    />
  );
};

export default RefundPolicy;
