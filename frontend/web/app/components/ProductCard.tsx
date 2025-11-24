import React from 'react';
import Image from 'next/image';

interface ProductCardProps {
  image: string;
  title: string;
  subtitle?: string;
}

export default function ProductCard({ image, title, subtitle }: ProductCardProps) {
  return (
    <div className="group cursor-pointer flex flex-col items-center">
      <div className="relative w-full aspect-square rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-md mb-3 md:mb-4 transition transform group-hover:shadow-xl group-hover:-translate-y-2">
        <Image 
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <h3 className="font-serif text-xl md:text-2xl text-center text-[#4A3B32] leading-tight">
        {title}
        {subtitle && (
          <>
            <br />
            {subtitle}
          </>
        )}
      </h3>
    </div>
  );
}

