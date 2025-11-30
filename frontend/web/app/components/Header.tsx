'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingBag, User, Loader2 } from 'lucide-react';
import { useCartStore } from '../stores/useCartStore';
import { useAuthStore } from '../stores/useAuthStore';
import { useIsClient } from '../hooks/useIsClient';
import { authService } from '../services/authService';
import { productService, Product } from '../services/productService';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const toggleCart = useCartStore((state) => state.toggleCart);
  const itemCount = useCartStore((state) => state.items.reduce((acc, item) => acc + item.quantity, 0));
  const { user, isAuthenticated, logout } = useAuthStore();
  
  const isClient = useIsClient();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Estados para busca instantânea
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLFormElement>(null);

  // Efeito de Debounce para busca
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.trim().length >= 2) { // Só busca se tiver 2+ caracteres
        setIsSearching(true);
        try {
          const results = await productService.getAll(searchTerm, true); // Apenas ativos
          setSearchResults(results.slice(0, 5)); // Limita a 5 resultados
          setShowResults(true);
        } catch (error) {
          console.error("Erro na busca instantânea:", error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Fecha ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Erro ao fazer logout no servidor', error);
    }
    logout();
    router.push('/auth/login');
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchTerm)}`);
      setShowResults(false);
    }
  };

  const handleResultClick = (id: number) => {
    router.push(`/products/${id}`);
    setShowResults(false);
    setSearchTerm("");
  };

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
           <form 
             ref={searchRef}
             onSubmit={handleSearch} 
             className="relative flex-1 md:flex-initial"
           >
             <input 
               type="search" 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               onFocus={() => {
                 if (searchTerm.length >= 2 && searchResults.length > 0) setShowResults(true);
               }}
               placeholder="Buscar produtos..." 
               className="w-full md:w-[500px] py-2 px-3 md:px-4 pr-10 rounded bg-cream text-brown-text placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-200 text-sm"
               aria-label="Buscar produtos"
             />
             <button type="submit" className="absolute right-3 top-2 text-gray-500 hover:text-terracotta transition">
                {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
             </button>

             {/* Resultados da Busca Instantânea */}
             {showResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-white rounded-b-lg shadow-lg border-t border-gray-100 overflow-hidden z-50 mt-1">
                  {searchResults.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleResultClick(product.id)}
                      className="w-full text-left p-3 hover:bg-orange-50 transition flex items-center gap-3 border-b border-gray-50 last:border-0"
                    >
                      <div className="relative w-10 h-10 shrink-0 rounded overflow-hidden bg-gray-100">
                        <Image
                          src={product.imageUrl || "/placeholder.png"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-brown-text truncate">{product.name}</p>
                        <p className="text-xs text-terracotta font-bold">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(product.price))}
                        </p>
                      </div>
                    </button>
                  ))}
                  <button 
                    onClick={handleSearch}
                    className="w-full text-center p-2 text-xs text-gray-500 hover:text-terracotta hover:bg-gray-50 font-medium transition"
                  >
                    Ver todos os resultados
                  </button>
                </div>
             )}
           </form>

          {/* Icons Area */}
          <div className="flex gap-3 md:gap-6 items-center">
            <button 
              className="hover:opacity-80 transition relative" 
              aria-label="Carrinho"
              onClick={toggleCart}
            >
              <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
              {isClient && itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {itemCount}
                </span>
              )}
            </button>

            {/* LOGIN / CADASTRO / LOGOUT */}
            <div className="flex items-center gap-2">
              {/* O Ícone leva para o Login ou Perfil */}
              <Link href={isAuthenticated ? "/profile" : "/auth/login"} aria-label="Acessar conta" className="hover:opacity-80 transition">
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
                    <Link href="/auth/login" className="underline hover:text-orange-200 transition">
                      Entre
                    </Link>
                    {" "}ou <br />
                    <Link href="/auth/register" className="underline hover:text-orange-200 transition">
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
        <Link href="/#about" className="hover:text-orange-100 transition whitespace-nowrap">Sobre</Link>
        <Link href="/products" className="hover:text-orange-100 transition whitespace-nowrap">Produtos</Link>
        <Link href="/#contacts" className="hover:text-orange-100 transition whitespace-nowrap">Contatos</Link>
      </nav>
    </header>
  );
}
