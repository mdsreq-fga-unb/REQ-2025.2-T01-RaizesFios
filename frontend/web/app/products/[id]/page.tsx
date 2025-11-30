'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { Star, ShoppingBag, Truck, ShieldCheck, Info, Loader2 } from 'lucide-react';
import { Header, Footer } from '../../components';
import { useCartStore } from '../../stores/useCartStore';
import { productService, Product } from '../../services/productService';

// Mock de avaliações para exemplo (mantido estático por enquanto)
const REVIEWS = [
  {
    id: 1,
    user: "Maria Silva",
    rating: 5,
    date: "15/11/2024",
    comment: "Simplesmente encantada! O acabamento é perfeito e chegou super rápido."
  },
  {
    id: 2,
    user: "João Santos",
    rating: 4,
    date: "10/11/2024",
    comment: "Muito bonito, igual à foto. Só achei um pouco menor do que imaginava, mas as medidas estavam na descrição."
  },
  {
    id: 3,
    user: "Ana Oliveira",
    rating: 5,
    date: "05/11/2024",
    comment: "Trabalho impecável. Dá pra ver que foi feito com muito carinho."
  }
];

export default function ProductDetailsPage() {
  const params = useParams();
  const addToCart = useCartStore((state) => state.addToCart);
  
  const productId = Number(params.id);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const loadProduct = async () => {
      if (!productId) return;
      try {
        const data = await productService.getById(productId);
        setProduct(data);
        setSelectedImage(data.imageUrl || '/placeholder.png');
      } catch (err) {
        console.error("Erro ao carregar produto", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadProduct();
  }, [productId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
         <Loader2 className="w-10 h-10 animate-spin text-terracotta" />
      </div>
    );
  }

  if (!product) {
    return notFound();
  }

  // Adaptação para o layout de galeria (backend atual só tem 1 imagem)
  const mainImage = product.imageUrl || '/placeholder.png';
  const images = [mainImage]; 

  // Função auxiliar para adicionar ao carrinho com compatibilidade de tipos
  const handleAddToCart = () => {    
    addToCart(product);
  };

  return (
    <div className="min-h-screen font-sans bg-cream flex flex-col">
      <Header />

      <main className="grow px-4 md:px-8 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Seção Principal do Produto */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm mb-12">
            <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
              
              {/* Galeria de Imagens (Esquerda) */}
              <div className="w-full lg:w-1/2 flex flex-col-reverse md:flex-row gap-4">
                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:max-h-[500px] scrollbar-hide">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(img)}
                        className={`relative w-20 h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                          selectedImage === img 
                            ? 'border-terracotta opacity-100 ring-2 ring-terracotta/30' 
                            : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`${product.name} - View ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Imagem Principal */}
                <div className="grow relative aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-inner">
                  {product.imageUrl ? (
                    <Image
                      src={selectedImage}
                      alt={product.name}
                      fill
                      className="object-cover transition-opacity duration-300"
                      priority
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      Sem imagem
                    </div>
                  )}
                </div>
              </div>

              {/* Coluna de Informações */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6">
                <div>
                  <span className="text-sm text-terracotta font-bold uppercase tracking-wider">
                    {product.category?.name || "Artesanato"}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-serif font-bold text-brown-text mt-2 mb-2">
                    {product.name}
                  </h1>
                  
                  {/* Avaliação Resumida */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-yellow-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={18} fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">(3 avaliações)</span>
                  </div>

                  <p className="text-3xl font-bold text-terracotta">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(product.price))}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-terracotta text-white py-4 px-6 rounded-full font-bold hover:opacity-90 transition flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform active:scale-[0.98]"
                  >
                    <ShoppingBag size={20} />
                    Adicionar ao Carrinho
                  </button>
                </div>

                {/* Ícones de Garantia/Info */}
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-3 text-brown-text/80">
                    <Truck className="text-terracotta" />
                    <span className="text-sm font-medium">Envio para todo Brasil</span>
                  </div>
                  <div className="flex items-center gap-3 text-brown-text/80">
                    <ShieldCheck className="text-terracotta" />
                    <span className="text-sm font-medium">Compra Segura</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Nova Seção de Detalhes e Descrição Longa */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm mb-12">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                {/* Coluna da Descrição Longa */}
                <div className="md:col-span-2">
                  <div className="flex items-center gap-3 mb-6">
                    <Info className="text-terracotta" size={24} />
                    <h2 className="text-2xl font-serif font-bold text-brown-text">
                      Descrição do Produto
                    </h2>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-lg text-justify">
                    {product.description}
                  </p>
                </div>
             </div>
          </div>

          {/* Seção de Avaliações */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-serif font-bold text-brown-text mb-8 border-b border-gray-100 pb-4">
              Avaliações de Clientes
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {REVIEWS.map((review) => (
                <div key={review.id} className="bg-cream/50 p-6 rounded-2xl border border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-brown-text">{review.user}</h4>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex text-yellow-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm italic">
                    &quot;{review.comment}&quot;
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
