'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../stores/useCartStore';
import { Product } from '../types/product';

export interface ProductCardProps {
  id?: number;
  image: string;
  title: string;
  subtitle?: string;
  price?: number;
}

export default function ProductCard({ id, image, title, subtitle, price }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const router = useRouter();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (id && price) {
      const product: Product = {
        id,
        name: title,
        image,
        category: subtitle,
        price
      };
      addToCart(product);
    }
  };

  const handleCardClick = () => {
    if (id) {
      router.push(`/produtos/${id}`);
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group cursor-pointer flex flex-col items-center"
    >
      <div className="relative w-full aspect-square rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-md mb-3 md:mb-4 transition transform group-hover:shadow-xl group-hover:-translate-y-2">
        <Image 
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
        
        {/* Botão de Adicionar ao Carrinho (aparece no hover) */}
        {price && (
          <button
            onClick={handleAddToCart}
            className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-terracotta hover:text-white transform translate-y-4 group-hover:translate-y-0 z-20"
            aria-label="Adicionar ao carrinho"
          >
            <ShoppingCart size={20} />
          </button>
        )}
      </div>
      
      <div className="text-center w-full">
        <h3 className="font-serif text-xl md:text-2xl text-brown-text leading-tight group-hover:text-terracotta transition-colors">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm md:text-base text-gray-600 mt-1">
            {subtitle}
          </p>
        )}
        {price !== undefined && (
          <p className="font-bold text-lg text-terracotta mt-2">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)}
          </p>
        )}
      </div>
    </div>
  );
}
