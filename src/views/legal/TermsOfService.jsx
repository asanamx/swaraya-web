import Link from 'next/link';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { ArrowLeft } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-[#05060A]" data-testid="terms-of-service-page">
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
              Términos de Servicio
            </h1>
            <p className="text-[#6B7280] text-sm">
              Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <div className="max-w-3xl space-y-10 text-[#9BA5B7]">
            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-light text-[#F4F6F9]">1. Aceptación de los Términos</h2>
              <p className="leading-relaxed">
                Al acceder y utilizar el sitio web de Swaraya y nuestros servicios, usted acepta estar sujeto a estos Términos de Servicio. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestros servicios.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-light text-[#F4F6F9]">2. Descripción de los Servicios</h2>
              <p className="leading-relaxed">
                Swaraya es una agencia de inteligencia aplicada que ofrece servicios de investigación, diseño e integración de sistemas de inteligencia artificial. Nuestros servicios incluyen, pero no se limitan a:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Consultoría estratégica en inteligencia artificial.</li>
                <li>Desarrollo e implementación de soluciones de IA personalizadas.</li>
                <li>Investigación aplicada en tecnologías emergentes.</li>
                <li>Integración de sistemas inteligentes en infraestructuras existentes.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-light text-[#F4F6F9]">3. Uso del Sitio Web</h2>
              <p className="leading-relaxed">Al utilizar nuestro sitio web, usted se compromete a:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Proporcionar información veraz y actualizada.</li>
                <li>No utilizar el sitio para fines ilegales o no autorizados.</li>
                <li>No intentar acceder a áreas restringidas del sitio.</li>
                <li>No interferir con el funcionamiento normal del sitio.</li>
                <li>Respetar la propiedad intelectual de Swaraya y terceros.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-light text-[#F4F6F9]">4. Propiedad Intelectual</h2>
              <p className="leading-relaxed">
                Todo el contenido del sitio web, incluyendo textos, gráficos, logotipos, imágenes, software y código, es propiedad de Swaraya o sus licenciantes y está protegido por las leyes de propiedad intelectual aplicables. Queda prohibida la reproducción, distribución o modificación sin autorización expresa.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-light text-[#F4F6F9]">5. Confidencialidad</h2>
              <p className="leading-relaxed">
                Todos los proyectos y colaboraciones con Swaraya están sujetos a acuerdos de confidencialidad (NDA). Nos comprometemos a proteger la información confidencial de nuestros clientes y esperamos el mismo nivel de discreción por parte de ellos.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-light text-[#F4F6F9]">6. Limitación de Responsabilidad</h2>
              <p className="leading-relaxed">
                En la máxima medida permitida por la ley, Swaraya no será responsable por daños indirectos, incidentales, especiales o consecuentes que resulten del uso o la imposibilidad de uso de nuestros servicios o sitio web.
              </p>
              <p className="leading-relaxed">
                El sitio web y su contenido se proporcionan "tal cual" sin garantías de ningún tipo, ya sean expresas o implícitas.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-light text-[#F4F6F9]">7. Asistente de Chat con IA</h2>
              <p className="leading-relaxed">
                Nuestro sitio web incluye un asistente de chat impulsado por inteligencia artificial. Las respuestas proporcionadas por este asistente son de carácter informativo y no constituyen asesoramiento profesional vinculante. Para consultas específicas sobre proyectos, le recomendamos contactar directamente con nuestro equipo.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-light text-[#F4F6F9]">8. Enlaces a Terceros</h2>
              <p className="leading-relaxed">
                Nuestro sitio web puede contener enlaces a sitios web de terceros. No somos responsables del contenido, políticas de privacidad o prácticas de sitios web de terceros. Le recomendamos revisar los términos y políticas de cualquier sitio que visite.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-light text-[#F4F6F9]">9. Modificaciones</h2>
              <p className="leading-relaxed">
                Nos reservamos el derecho de modificar estos Términos de Servicio en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio web. El uso continuado de nuestros servicios después de cualquier modificación constituye su aceptación de los nuevos términos.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-light text-[#F4F6F9]">10. Terminación</h2>
              <p className="leading-relaxed">
                Podemos suspender o terminar su acceso a nuestros servicios en cualquier momento, sin previo aviso, por cualquier motivo, incluyendo el incumplimiento de estos Términos de Servicio.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-light text-[#F4F6F9]">11. Ley Aplicable</h2>
              <p className="leading-relaxed">
                Estos Términos de Servicio se regirán e interpretarán de acuerdo con las leyes aplicables, sin tener en cuenta sus disposiciones sobre conflictos de leyes.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-light text-[#F4F6F9]">12. Contacto</h2>
              <p className="leading-relaxed">
                Si tiene preguntas sobre estos Términos de Servicio, puede contactarnos en:
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

export default TermsOfService;
