"use client";

import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { productService, Product } from '../services/productService';
import { Loader2 } from 'lucide-react';

export default function RecommendationsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        // Busca apenas produtos ativos
        const data = await productService.getAll(undefined, true);
        // Pega apenas os primeiros 3 produtos para recomendação
        setProducts(data.slice(0, 3));
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (isLoading) {
    return (
      <section id="products" className="scroll-mt-40 py-8 md:py-16 px-4">
        <div className="flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-terracotta" />
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section id="products" className="scroll-mt-40 py-8 md:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-brown-text mb-8 md:mb-12 text-center">Recomendações</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
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
      </div>
    </section>
  );
}
