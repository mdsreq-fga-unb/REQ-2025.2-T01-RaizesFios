'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingBag, User } from 'lucide-react';
import { useCartStore } from '../stores/useCartStore';
import { useAuthStore } from '../stores/useAuthStore';
import { useIsClient } from '../hooks/useIsClient';
import { authService } from '../services/authService';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const toggleCart = useCartStore((state) => state.toggleCart);
  const getItemCount = useCartStore((state) => state.getItemCount);
  const { user, isAuthenticated, logout } = useAuthStore();
  
  const isClient = useIsClient();

  async function handleLogout() {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Erro ao fazer logout no servidor', error);
    }
    logout();
    router.push('/login');
  }

  return (
    <header className="bg-terracotta text-white px-4 md:px-6 py-2 sticky top-0 z-30 shadow-sm">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
        
        {/* Logo Area */}
        <div className="flex items-center justify-center md:justify-start w-full md:w-auto -my-2">
          <Link href="/" className="cursor-pointer hover:opacity-90 transition block relative w-32 h-24 md:w-40 md:h-28">
            <Image 
              src="/logo.svg" 
              alt="Raízes & Fios Logo" 
              fill
              className="object-contain"
              sizes="(max-width: 768px) 128px, 160px"
              priority
            />
          </Link>
        </div>

        {/* Search Bar and Icons */}
        <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto justify-center">
          {/* Search Bar */}
           <div className="relative flex-1 md:flex-initial">
             <input 
               type="search" 
               placeholder="Buscar produtos..." 
               className="w-full md:w-80 py-2 px-3 md:px-4 pr-10 rounded bg-cream text-brown-text placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-200 text-sm"
               aria-label="Buscar produtos"
             />
             <Search className="absolute right-3 top-2 text-gray-500 w-4 h-4 pointer-events-none" />
           </div>

          {/* Icons Area */}
          <div className="flex gap-3 md:gap-6 items-center">
            <button 
              className="hover:opacity-80 transition relative" 
              aria-label="Carrinho"
              onClick={toggleCart}
            >
              <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
              {isClient && getItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {getItemCount()}
                </span>
              )}
            </button>

            {/* LOGIN / CADASTRO / LOGOUT */}
            <div className="flex items-center gap-2">
              {/* O Ícone leva para o Login ou Perfil */}
              <Link href={isAuthenticated ? "/perfil" : "/login"} aria-label="Acessar conta" className="hover:opacity-80 transition">
                <User className="w-5 h-5 md:w-6 md:h-6" />
              </Link>
              
              <div className="text-xs md:text-sm hidden md:block leading-tight">
                {isClient && isAuthenticated && user ? (
                  <div className="flex flex-col items-start">
                    <span className="font-bold text-cream text-base drop-shadow-sm">Olá, {user.name.split(' ')[0]}!</span>
                    <button 
                      onClick={handleLogout}
                      className="text-xs text-white/80 hover:text-white hover:underline transition"
                    >
                      Sair da conta
                    </button>
                  </div>
                ) : (
                  <>
                    <Link href="/login" className="underline hover:text-orange-200 transition">
                      Entre
                    </Link>
                    {" "}ou <br />
                    <Link href="/register" className="underline hover:text-orange-200 transition">
                      Cadastre-se
                    </Link>
                  </>
                )}
              </div>
            </div>
            {/* Fim da atualização */}

          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-2 md:mt-2 border-t border-white/20 pt-2 flex justify-center gap-4 md:gap-32 text-sm md:text-base font-light uppercase tracking-wide px-2 md:px-6 flex-wrap" aria-label="Navegação principal">
        <Link href="/" className="hover:text-orange-100 transition whitespace-nowrap">Início</Link>
        <Link href="/#sobre" className="hover:text-orange-100 transition whitespace-nowrap">Sobre</Link>
        <Link href="/produtos" className="hover:text-orange-100 transition whitespace-nowrap">Produtos</Link>
        <Link href="/#contatos" className="hover:text-orange-100 transition whitespace-nowrap">Contatos</Link>
      </nav>
    </header>
  );
}
