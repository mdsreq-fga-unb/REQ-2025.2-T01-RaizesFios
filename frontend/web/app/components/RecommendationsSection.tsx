import React from 'react';
import ProductCard from './ProductCard';

const recommendations = [
  {
    id: 1,
    image: "/bonecoCroche.svg",
    title: "Bonecos",
    subtitle: "Personalizados"
  },
  {
    id: 2,
    image: "/tapeteCroche.svg",
    title: "Tapetes",
    subtitle: "Exclusivos"
  },
  {
    id: 3,
    image: "/bolsaCroche.svg",
    title: "Coleções",
    subtitle: "limitadas"
  }
];

export default function RecommendationsSection() {
  return (
    <section id="produtos" className="py-8 md:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#3E2723] mb-8 md:mb-12 text-center">Recomendações</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {recommendations.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              title={product.title}
              subtitle={product.subtitle}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

