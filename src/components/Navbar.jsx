'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Investigación', href: '#research' },
    { name: 'Método', href: '#method' },
    { name: 'Filosofía', href: '#philosophy' },
    { name: 'Blog', href: '/blog', isRoute: true },
    { name: 'Contacto', href: '#contact' },
  ];

  const scrollToSection = (href) => {
    if (href.startsWith('#')) {
      if (!isHomePage) {
        window.location.href = '/' + href;
        return;
      }
      const element = document.querySelector(href);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        isMobileMenuOpen 
          ? 'bg-[#05060A] h-screen' 
          : isScrolled
            ? 'bg-[#05060A]/96 backdrop-blur-xl border-b border-[rgba(255,255,255,0.03)]'
            : 'bg-transparent'
      }`}
      data-testid="navbar"
    >
      <div className="container-main">
        <div className="flex items-center justify-between h-14 md:h-16 lg:h-[72px]">
          {/* Logo */}
          <Link
            href="/"
            className="relative z-50 flex items-center mt-1"
            data-testid="navbar-logo"
          >
            <img 
              src="/logo-swaraya.png" 
              alt="Swaraya - Inteligencia Aplicada" 
              className="h-5 md:h-6 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-9 xl:gap-10">
            {navLinks.map((link) => (
              link.isRoute ? (
                <Link
                  key={link.name}
                  href={link.href}
                  className="link-hover text-[0.8125rem] text-[#5D6878] hover:text-[#F4F6F9] tracking-wide"
                  data-testid={`nav-link-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </Link>
              ) : (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="link-hover text-[0.8125rem] text-[#5D6878] hover:text-[#F4F6F9] tracking-wide"
                  data-testid={`nav-link-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </button>
              )
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <button
              onClick={() => scrollToSection('#contact')}
              className="btn-primary py-2.5 px-5 text-[0.8125rem]"
              data-testid="navbar-cta"
            >
              Iniciar Diálogo
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-[#F4F6F9] p-1.5 -mr-1.5 relative z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="mobile-menu-button"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <div className="relative w-5 h-5">
              <Menu 
                size={18} 
                strokeWidth={1.5} 
                className={`absolute inset-0 m-auto transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
                }`}
              />
              <X 
                size={18} 
                strokeWidth={1.5} 
                className={`absolute inset-0 m-auto transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-0 left-0 right-0 bottom-0 transition-all duration-350 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        data-testid="mobile-menu"
      >
        <div className="container-main pt-20 pb-8 h-full flex flex-col">
          <div className="flex-1 flex flex-col justify-center -mt-12">
            <nav className="space-y-0">
              {navLinks.map((link, index) => (
                link.isRoute ? (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block w-full text-left text-xl md:text-2xl font-medium text-[#9BA5B7] hover:text-[#F4F6F9] transition-all duration-300 py-3.5 ${
                      isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                    }`}
                    style={{ transitionDelay: isMobileMenuOpen ? `${index * 40 + 80}ms` : '0ms' }}
                    data-testid={`mobile-nav-link-${link.name.toLowerCase()}`}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className={`block w-full text-left text-xl md:text-2xl font-medium text-[#9BA5B7] hover:text-[#F4F6F9] transition-all duration-300 py-3.5 ${
                      isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                    }`}
                    style={{ transitionDelay: isMobileMenuOpen ? `${index * 40 + 80}ms` : '0ms' }}
                    data-testid={`mobile-nav-link-${link.name.toLowerCase()}`}
                  >
                    {link.name}
                  </button>
                )
              ))}
            </nav>
          </div>
          
          <div 
            className={`transition-all duration-300 ${
              isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
            style={{ transitionDelay: isMobileMenuOpen ? '250ms' : '0ms' }}
          >
            <button
              onClick={() => scrollToSection('#contact')}
              className="btn-primary w-full"
              data-testid="mobile-navbar-cta"
            >
              Iniciar Diálogo
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
