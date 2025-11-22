import React from 'react';
import { Sparkles, Heart, Scissors } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="sobre" className="py-8 md:py-12 border-t border-[#EADBC8] border-b my-4 md:my-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 px-4">
        
        {/* Left Title */}
        <div className="md:w-1/3 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#3E2723]">Quem somos</h2>
          
          <div className="flex justify-center gap-6 md:gap-8 mt-4 md:mt-6 text-[#3E2723]">
            <Sparkles className="w-6 h-6 md:w-8 md:h-8" />
            <Scissors className="w-6 h-6 md:w-8 md:h-8 rotate-90" />
            <Heart className="w-6 h-6 md:w-8 md:h-8 fill-current" />
          </div>
        </div>

        {/* Right Text */}
        <div className="md:w-2/3 text-center text-base md:text-xl lg:text-2xl font-light leading-relaxed text-[#5D4037] px-4">
          <p>
            Somos um <span className="text-[#A67C6D]">casal</span> dedicado ao <br className="hidden md:block"/>
            <span className="text-[#A67C6D]">artesanato</span>, criando peças <br className="hidden md:block"/>
            únicas, <span className="italic">sempre</span> feitas à mão <br className="hidden md:block"/>
            com <strong className="font-bold">cuidado</strong>, <strong className="font-bold">tradição</strong> e <strong className="font-bold text-[#A67C6D]">amor</strong> <br className="hidden md:block"/>
            pelos detalhes.
          </p>
        </div>
      </div>
    </section>
  );
}

