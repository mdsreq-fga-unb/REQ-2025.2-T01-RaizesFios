'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingBag, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-[#A67C6D] text-white px-4 md:px-6 py-3 md:py-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
        
        {/* Logo Area */}
        <div className="flex items-center justify-center md:justify-start w-full md:w-auto">
          <Link href="/" className="cursor-pointer hover:opacity-90 transition">
            <Image 
              src="/logo.svg" 
              alt="Raízes & Fios Logo" 
              className="object-contain"
              width={100}
              height={100}
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
               className="w-full md:w-80 py-2 px-3 md:px-4 pr-10 rounded bg-[#FDF6EB] text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-200 text-sm"
               aria-label="Buscar produtos"
             />
             <Search className="absolute right-3 top-2 text-gray-500 w-4 h-4 pointer-events-none" />
           </div>

          {/* Icons Area */}
          <div className="flex gap-3 md:gap-6 items-center">
            <button className="hover:opacity-80 transition" aria-label="Carrinho">
              <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* LOGIN / CADASTRO */}
            <div className="flex items-center gap-2">
              {/* O Ícone leva para o Login */}
              <Link href="/login" aria-label="Acessar conta" className="hover:opacity-80 transition">
                <User className="w-5 h-5 md:w-6 md:h-6" />
              </Link>
              
              <div className="text-xs md:text-sm hidden md:block leading-tight">
                {/* Link  p Login */}
                <Link href="/login" className="underline hover:text-orange-200 transition">
                  Entre
                </Link>
                {" "}ou <br />
                {/* Link p Cadastro */}
                <Link href="/register" className="underline hover:text-orange-200 transition">
                  Cadastre-se
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-3 md:mt-4 border-t border-white/20 pt-2 md:pt-3 flex justify-center gap-4 md:gap-32 text-sm md:text-lg font-light uppercase tracking-wide px-2 md:px-6 flex-wrap" aria-label="Navegação principal">
        <Link href="/" className="hover:text-orange-100 transition whitespace-nowrap">Início</Link>
        <Link href="/#sobre" className="hover:text-orange-100 transition whitespace-nowrap">Sobre</Link>
        <Link href="/#produtos" className="hover:text-orange-100 transition whitespace-nowrap">Produtos</Link>
        <Link href="/#contatos" className="hover:text-orange-100 transition whitespace-nowrap">Contatos</Link>
      </nav>
    </header>
  );
}
