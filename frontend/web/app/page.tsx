import React from 'react';
import { 
  Header, 
  Hero, 
  AboutSection, 
  RecommendationsSection, 
  Footer 
} from './components';

export default function Home() {
  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: '#FDF6EB', color: '#4A3B32' }}>
      <Header />
      
      <main className="px-2 md:px-6">
        <Hero />
        <AboutSection />
        <RecommendationsSection />
      </main>

      <Footer />
    </div>
  );
}
