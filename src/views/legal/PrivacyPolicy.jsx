import Link from 'next/link';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#05060A]" data-testid="privacy-policy-page">
      <Navbar />
      
      <main className="pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="container-main">
          {/* Back link */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-[#7AC4E0] hover:text-[#9BD4EC] transition-colors duration-250 mb-10"
            data-testid="back-to-home"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Volver al inicio</span>
          </Link>

          {/* Header */}
          <div className="mb-12 md:mb-16">
            <p className="label-accent text-[#7AC4E0] mb-4">Legal</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#F4F6F9] mb-6">
              Aviso de Privacidad
            </h1>
            <p className="text-[#6B7280] text-sm">
              Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <div className="max-w-3xl space-y-10 text-[#9BA5B7]">
            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-light text-[#F4F6F9]">1. Información General</h2>
              <p className="leading-relaxed">
                swaraya ("nosotros", "nuestro" o "la Agencia") se compromete a proteger la privacidad de nuestros usuarios y clientes. Este Aviso de Privacidad describe cómo recopilamos, usamos, almacenamos y protegemos su información personal cuando utiliza nuestro sitio web y servicios.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-light text-[#F4F6F9]">2. Información que Recopilamos</h2>
              <p className="leading-relaxed">Podemos recopilar los siguientes tipos de información:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-[#F4F6F9]">Información de contacto:</strong> nombre, dirección de correo electrónico, número de teléfono y empresa.</li>
                <li><strong className="text-[#F4F6F9]">Información técnica:</strong> dirección IP, tipo de navegador, dispositivo utilizado y páginas visitadas.</li>
                <li><strong className="text-[#F4F6F9]">Información de comunicación:</strong> contenido de los mensajes enviados a través de nuestro formulario de contacto o asistente de chat.</li>
                <li><strong className="text-[#F4F6F9]">Información de uso:</strong> cómo interactúa con nuestro sitio web y servicios.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-light text-[#F4F6F9]">3. Uso de la Información</h2>
              <p className="leading-relaxed">Utilizamos su información para:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Responder a sus consultas y proporcionar servicios solicitados.</li>
                <li>Mejorar nuestro sitio web y experiencia de usuario.</li>
                <li>Enviar comunicaciones relevantes sobre nuestros servicios (con su consentimiento).</li>
                <li>Cumplir con obligaciones legales y proteger nuestros derechos.</li>
                <li>Analizar tendencias y patrones de uso de manera agregada.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-light text-[#F4F6F9]">4. Compartir Información</h2>
              <p className="leading-relaxed">
                No vendemos ni alquilamos su información personal a terceros. Podemos compartir información con:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Proveedores de servicios que nos ayudan a operar nuestro negocio.</li>
                <li>Autoridades legales cuando sea requerido por ley.</li>
                <li>Terceros con su consentimiento explícito.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-light text-[#F4F6F9]">5. Seguridad de los Datos</h2>
              <p className="leading-relaxed">
                Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger su información personal contra acceso no autorizado, alteración, divulgación o destrucción. Sin embargo, ningún método de transmisión por Internet es 100% seguro.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-light text-[#F4F6F9]">6. Cookies y Tecnologías Similares</h2>
              <p className="leading-relaxed">
                Utilizamos cookies y tecnologías similares para mejorar su experiencia en nuestro sitio. Puede configurar su navegador para rechazar cookies, aunque esto puede afectar la funcionalidad del sitio.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-light text-[#F4F6F9]">7. Sus Derechos</h2>
              <p className="leading-relaxed">Usted tiene derecho a:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Acceder a su información personal.</li>
                <li>Rectificar datos inexactos.</li>
                <li>Solicitar la eliminación de sus datos.</li>
                <li>Oponerse al procesamiento de sus datos.</li>
                <li>Retirar su consentimiento en cualquier momento.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-light text-[#F4F6F9]">8. Retención de Datos</h2>
              <p className="leading-relaxed">
                Conservamos su información personal solo durante el tiempo necesario para cumplir con los fines descritos en este aviso, a menos que se requiera un período de retención más largo por ley.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-light text-[#F4F6F9]">9. Cambios a este Aviso</h2>
              <p className="leading-relaxed">
                Podemos actualizar este Aviso de Privacidad periódicamente. Le notificaremos sobre cambios significativos publicando el nuevo aviso en esta página con una fecha de actualización.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-light text-[#F4F6F9]">10. Contacto</h2>
              <p className="leading-relaxed">
                Si tiene preguntas sobre este Aviso de Privacidad o desea ejercer sus derechos, puede contactarnos en:
              </p>
              <p className="leading-relaxed">
                <strong className="text-[#F4F6F9]">Email:</strong>{' '}
                <a href="mailto:contacto@swaraya.ai" className="text-[#7AC4E0] hover:text-[#9BD4EC] transition-colors">
                  contacto@swaraya.ai
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
