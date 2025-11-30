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
    <div className="min-h-screen font-sans bg-cream text-brown-text">
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
