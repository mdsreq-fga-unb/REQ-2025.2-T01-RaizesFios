'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCartStore } from '../stores/useCartStore';
import { useIsClient } from '../hooks/useIsClient';

export default function CartDrawer() {
  const router = useRouter();
  
  // Seletores individuais
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const items = useCartStore((state) => state.items);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const getTotal = useCartStore((state) => state.getTotal);

  // Hydration fix via useSyncExternalStore (Hook reutilizável)
  const isClient = useIsClient();

  // Se não estiver no cliente, não renderiza nada para evitar hydration mismatch
  if (!isClient) return null;

  // Handler para checkout
  const handleCheckout = () => {
    toggleCart(); 
    router.push('/cart');
  };

  return (
    <>
      {/* Overlay com transição de opacidade */}
      <div 
        className={`fixed inset-0 bg-black/50 z-9999 transition-opacity duration-300 ease-in-out ${
          isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleCart}
      />

      {/* Drawer Panel com transição de transform */}
      <div className={`fixed inset-y-0 right-0 w-full max-w-md bg-cream shadow-2xl z-10000 flex flex-col transform transition-transform duration-300 ease-in-out ${
        isCartOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {/* Header */}
        <div className="p-6 bg-terracotta text-white flex items-center justify-between shadow-md">
          <h2 className="text-2xl font-serif font-bold">Seu Carrinho</h2>
          <button 
            onClick={toggleCart}
            className="p-2 hover:bg-white/20 rounded-full transition"
            aria-label="Fechar carrinho"
          >
            <X size={24} />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
              <p className="text-lg">Seu carrinho está vazio</p>
              <button 
                onClick={toggleCart}
                className="px-6 py-2 bg-terracotta text-white rounded-full hover:opacity-90 transition"
              >
                Continuar Comprando
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 bg-white p-4 rounded-xl shadow-sm">
                {/* Imagem */}
                <div className="relative w-20 h-20 shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={item.imageUrl || item.image || '/placeholder.png'}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Detalhes */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-medium text-brown-text line-clamp-1">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <p className="font-bold text-terracotta">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format((item.price || 0) * item.quantity)}
                    </p>
                    
                    {/* Controles de Quantidade */}
                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-2 py-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:text-terracotta transition disabled:opacity-30"
                        aria-label="Diminuir quantidade"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm w-4 text-center font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:text-terracotta transition"
                        aria-label="Aumentar quantidade"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Remover */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-400 hover:text-red-500 transition self-start p-1"
                  aria-label="Remover item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer / Totais */}
        {items.length > 0 && (
          <div className="p-6 bg-white border-t border-gray-100 space-y-4">
            <div className="flex justify-between items-center text-lg font-medium text-brown-text">
              <span>Subtotal</span>
              <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(getTotal())}</span>
            </div>
            
            <button 
              onClick={handleCheckout}
              className="w-full py-4 bg-terracotta text-white rounded-xl font-bold hover:opacity-90 transition shadow-lg hover:shadow-xl transform active:scale-[0.98]"
            >
              Finalizar Compra
            </button>
          </div>
        )}
      </div>
    </>
  );
}
