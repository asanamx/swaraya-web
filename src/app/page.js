import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Positioning from '@/components/Positioning';
import ResearchDomains from '@/components/ResearchDomains';
import Method from '@/components/Method';
import Principles from '@/components/Principles';
import Outcomes from '@/components/Outcomes';
import IntelligenceShowcase from '@/components/IntelligenceShowcase';
import Initiatives from '@/components/Initiatives';
import Philosophy from '@/components/Philosophy';
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
        <Method />
        <Principles />
        <Outcomes />
        <IntelligenceShowcase />
        <Initiatives />
        <Philosophy />
        <BlogPreview />
      </main>
      <Footer />
    </div>
  );
}
