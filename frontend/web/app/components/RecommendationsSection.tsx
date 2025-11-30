import React from 'react';
import ProductCard from './ProductCard';
import { MOCK_PRODUCTS } from '../mocks/products';

export default function RecommendationsSection() {
  const recommendations = MOCK_PRODUCTS.slice(0, 3);

  return (
    <section id="products" className="scroll-mt-40 py-8 md:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-brown-text mb-8 md:mb-12 text-center">Recomendações</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {recommendations.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              title={product.name}
              subtitle={product.category}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
