import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Positioning from '@/components/Positioning';
import ResearchDomains from '@/components/ResearchDomains';
import Method from '@/components/Method';
import Principles from '@/components/Principles';
import PrecisionMedida from '@/components/PrecisionMedida';
import CasoSantaMonica from '@/components/CasoSantaMonica';
import PanelOverview from '@/components/PanelOverview';
import IntelligenceShowcase from '@/components/IntelligenceShowcase';
import Initiatives from '@/components/Initiatives';
import BlogPreview from '@/components/BlogPreview';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="App" data-testid="swaraya-app">
      <Navbar />
      <main>
        <Hero />
        <Positioning />
        <ResearchDomains />
        <IntelligenceShowcase />
        <Method />
        <Principles />
        {/* Nuevas secciones — insertadas entre Compromisos y Plataformas propias */}
        <PrecisionMedida />
        <CasoSantaMonica />
        <PanelOverview />
        <Initiatives />
        <BlogPreview />
      </main>
      <Footer />
    </div>
  );
}
