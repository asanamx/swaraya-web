'use client';

import Link from 'next/link';
import useScrollReveal from '../hooks/useScrollReveal';

export const Footer = () => {
  const [footerRef, isVisible] = useScrollReveal({ threshold: 0.3 });
  const currentYear = new Date().getFullYear();

  return (
    <footer
      ref={footerRef}
      className={`relative py-14 md:py-16 lg:py-20 bg-[#05060A] reveal ${isVisible ? 'revealed' : ''}`}
      data-testid="footer"
    >
      {/* Top border with accent */}
      <div className="absolute top-0 left-0 right-0">
        <div className="container-main">
          <div 
            className="h-px"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 20%, rgba(90,123,250,0.1) 50%, rgba(255,255,255,0.06) 80%, transparent 100%)',
            }}
          />
        </div>
      </div>

      <div className="container-main">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand - takes more space */}
          <div className="col-span-2 lg:col-span-5 space-y-5">
            <a href="#" className="inline-block">
              <img 
                src="/logo-swaraya.png" 
                alt="Swaraya - Inteligencia Aplicada" 
                className="h-5 md:h-[22px] w-auto"
                data-testid="footer-logo"
              />
            </a>
            <p className="text-[0.8125rem] text-[#6B7280] max-w-[300px] leading-relaxed">
              Agencia de Inteligencia Aplicada. Sistemas de nivel investigación para instituciones modernas.
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[0.6875rem] font-medium text-[#4B5563] tracking-wide">Navegar</h4>
            <nav className="space-y-3">
              {[
                { label: 'Investigación', href: '#research' },
                { label: 'Método', href: '#method' },
                { label: 'Filosofía', href: '#philosophy' },
                { label: 'Blog', href: '/blog', isRoute: true },
                { label: 'Contacto', href: '#contact' },
              ].map((item) => (
                item.isRoute ? (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block text-[0.8125rem] text-[#9BA5B7] hover:text-[#F4F6F9] transition-colors duration-250"
                  >
                    {item.label}
                  </a>
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block text-[0.8125rem] text-[#9BA5B7] hover:text-[#F4F6F9] transition-colors duration-250"
                  >
                    {item.label}
                  </a>
                )
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[0.6875rem] font-medium text-[#4B5563] tracking-wide" data-testid="footer-contact-title">
              Contacto
            </h4>
            <a
              href="mailto:contacto@swaraya.ai"
              className="block text-[0.8125rem] text-[#9BA5B7] hover:text-[#F4F6F9] transition-colors duration-250"
              data-testid="footer-email"
            >
              contacto@swaraya.ai
            </a>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[0.6875rem] font-medium text-[#4B5563] tracking-wide" data-testid="footer-legal-title">
              Confidencial
            </h4>
            <p className="text-[0.8125rem] text-[#6B7280]">
              Todos los proyectos bajo NDA
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 md:mt-20 pt-6 border-t border-[rgba(255,255,255,0.03)] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[0.6875rem] text-[#4B5563]" data-testid="footer-copyright">
            © {currentYear} Swaraya. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacidad" className="text-[0.6875rem] text-[#4B5563] hover:text-[#9BA5B7] transition-colors duration-250" data-testid="footer-privacy">
              Aviso de Privacidad
            </Link>
            <Link href="/terminos" className="text-[0.6875rem] text-[#4B5563] hover:text-[#9BA5B7] transition-colors duration-250" data-testid="footer-terms">
              Términos de Servicio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
