import React from 'react';

export default function Footer() {
  return (
    <footer id="contatos" className="bg-[#A67C6D] text-white py-6 md:py-8 mt-8 md:mt-12">
      <div className="px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
        <div className="flex gap-4 md:gap-8 text-xs md:text-sm opacity-80 flex-wrap justify-center">
          <a href="#" className="hover:underline whitespace-nowrap">Política de Privacidade</a>
          <a href="#" className="hover:underline whitespace-nowrap">Contatos</a>
        </div>
        <div className="text-xs md:text-sm opacity-60 text-center">
          © 2025 Raízes & Fios. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}

