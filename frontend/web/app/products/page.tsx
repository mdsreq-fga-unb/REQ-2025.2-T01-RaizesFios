"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header, Footer } from '../components';
import ProductCard from '../components/ProductCard';
import { productService, Product } from '../services/productService';
import { Loader2 } from 'lucide-react';

function ProductList() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const data = await productService.getAll(search || undefined, true);
        setProducts(data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [search]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-10 h-10 animate-spin text-terracotta" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p className="text-xl">
          {search ? `Nenhum produto encontrado para "${search}".` : "Nenhum produto encontrado no momento."}
        </p>
        {search && (
          <p className="mt-2 text-sm">Tente buscar por outro termo.</p>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          image={product.imageUrl || "/placeholder.png"}
          title={product.name}
          subtitle={product.category?.name || "Artesanato"}
          price={Number(product.price)}
        />
      ))}
    </div>
  );
}

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

          <Suspense fallback={
             <div className="flex justify-center py-20">
               <Loader2 className="w-10 h-10 animate-spin text-terracotta" />
             </div>
          }>
            <ProductList />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}
