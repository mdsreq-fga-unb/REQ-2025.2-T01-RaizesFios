'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus } from 'lucide-react';
import { Header, Footer } from '../components';
import { useCartStore } from '../stores/useCartStore';

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const getTotal = useCartStore((state) => state.getTotal);

  const [cep, setCep] = useState('');
  const [shippingCost, setShippingCost] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Evita hydration mismatch
  if (!mounted) return null;

  const handleCalculateShipping = () => {
    if (!cep) return;
    setIsCalculating(true);
    // Mock de cálculo de frete
    setTimeout(() => {
      setShippingCost(25.00); // Valor fixo para exemplo
      setIsCalculating(false);
    }, 1000);
  };

  const total = getTotal();
  const finalTotal = total + (shippingCost || 0);

  return (
    <div className="min-h-screen font-sans bg-cream flex flex-col">
      <Header />

      <main className="grow px-4 md:px-8 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          
          {items.length === 0 ? (
             <div className="text-center py-20">
              <h1 className="text-3xl font-serif text-brown-text mb-4">Seu carrinho está vazio</h1>
              <Link 
                href="/products" 
                className="inline-block px-8 py-3 bg-terracotta text-white rounded-full hover:opacity-90 transition"
              >
                Ver Produtos
              </Link>
             </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Coluna Esquerda - Lista de Itens */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-terracotta rounded-3xl p-6 md:p-8 text-brown-text shadow-lg">
                  <h1 className="text-3xl font-serif font-bold text-white mb-8">Carrinho</h1>
                  
                  <div className="space-y-8">
                    {items.map((item) => (
                      <div key={item.id} className="flex flex-col sm:flex-row gap-6 items-start sm:items-center border-b border-white/20 pb-8 last:border-0 last:pb-0">
                        {/* Imagem */}
                        <div className="relative w-full sm:w-32 h-32 bg-white/10 rounded-2xl overflow-hidden shrink-0">
                          <Image
                            src={item.imageUrl || item.image || '/placeholder.png'}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Detalhes */}
                        <div className="grow space-y-2 w-full">
                          <div className="flex justify-between items-start">
                            <h3 className="text-xl md:text-2xl text-brown-text font-medium">{item.name}</h3>
                            <p className="text-xl md:text-2xl text-brown-text font-medium">
                              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format((item.price || 0) * item.quantity)}
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 md:gap-8 mt-4">
                            {/* Seletor de Quantidade */}
                            <div className="flex items-center bg-white/20 rounded-lg border border-brown-text/20">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-2 px-3 hover:bg-white/10 transition text-brown-text"
                                aria-label="Diminuir"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="px-2 text-brown-text font-medium min-w-8 text-center">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-2 px-3 hover:bg-white/10 transition text-brown-text"
                                aria-label="Aumentar"
                              >
                                <Plus size={16} />
                              </button>
                            </div>

                            <span className="text-sm text-brown-text/70 font-medium">1 disponível</span>
                          </div>

                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-700 hover:text-red-900 text-sm font-medium mt-2 hover:underline transition"
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Seção de Frete dentro do card esquerdo, conforme imagem */}
                  <div className="mt-12 pt-8 border-t border-white/20">
                    <h3 className="text-xl text-brown-text mb-4 font-medium">Frete e prazo de envio</h3>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md">
                      <input 
                        type="text" 
                        placeholder="Digite o CEP" 
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                        className="grow bg-white rounded-full px-6 py-3 text-brown-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brown-text/50"
                      />
                      <button 
                        onClick={handleCalculateShipping}
                        disabled={isCalculating}
                        className="bg-brown-text text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition disabled:opacity-70"
                      >
                        {isCalculating ? 'Calculando...' : 'Calcular'}
                      </button>
                    </div>
                    {shippingCost !== null && (
                      <p className="mt-4 text-white font-medium">
                        Frete fixo: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(shippingCost)}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Coluna Direita - Resumo */}
              <div className="lg:col-span-1">
                <div className="bg-terracotta rounded-3xl p-6 md:p-8 text-brown-text shadow-lg sticky top-24">
                  <h2 className="text-3xl font-serif font-bold text-white mb-8">Resumo</h2>
                  
                  <div className="space-y-4 text-brown-text text-lg">
                    <div className="flex justify-between">
                      <span>Produto(s)</span>
                      <span className="font-medium">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Frete</span>
                      <span className="font-medium">
                        {shippingCost !== null 
                          ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(shippingCost) 
                          : 'Informe o CEP'}
                      </span>
                    </div>
                  </div>

                  <div className="my-8 border-t border-brown-text/20"></div>

                  <div className="flex justify-between items-center mb-8">
                    <span className="text-xl font-medium text-brown-text">Total:</span>
                    <span className="text-2xl font-bold text-black">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(finalTotal)}
                    </span>
                  </div>

                  <button 
                    onClick={() => alert("Checkout será implementado em breve!")}
                    className="w-full bg-brown-text text-white py-4 rounded-2xl font-medium text-lg hover:opacity-90 transition transform hover:scale-[1.02] shadow-md"
                  >
                    Finalizar Pedido
                  </button>
                  
                  <div className="mt-4 flex justify-center">
                    <Link href="/products" className="text-sm text-brown-text/80 hover:text-terracotta underline transition">
                        Continuar comprando
                    </Link>
                  </div>

                </div>
              </div>

            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
