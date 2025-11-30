import React from 'react';
import { Header, Footer } from '../components';
import ProductCard from '../components/ProductCard';
import { MOCK_PRODUCTS } from '../mocks/products';

export default function ProductsPage() {
  return (
    <div className="min-h-screen font-sans bg-cream text-brown-text flex flex-col">
      <Header />
      
      <main className="grow px-4 md:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 md:mb-12 text-center">
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-brown-text mb-4">
              Nossos Produtos
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore nossa coleção completa de peças artesanais, feitas com amor e dedicação em cada ponto.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {MOCK_PRODUCTS.map((product) => (
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
      </main>

      <Footer />
    </div>
  );
}
