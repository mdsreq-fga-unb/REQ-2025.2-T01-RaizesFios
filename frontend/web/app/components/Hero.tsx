'use client';

import React from 'react';
import Image from 'next/image';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const slides = [
  {
    id: 1,
    image: "/bonecaCroche.svg",
    alt: "Boneca de crochê artesanal",
    title: "Peças únicas",
    subtitle: "de crochê",
    description1: "feitas à mão",
    description2: "com carinho",
    buttonText: "Ver Bonecos"
  },
  {
    id: 2,
    image: "/tapeteCroche.svg",
    alt: "Tapetes de crochê exclusivos",
    title: "Tapetes",
    subtitle: "exclusivos",
    description1: "para decorar",
    description2: "seu lar",
    buttonText: "Ver Tapetes"
  },
  {
    id: 3,
    image: "/bolsaCroche.svg",
    alt: "Acessórios de crochê",
    title: "Acessórios",
    subtitle: "artesanais",
    description1: "detalhes que",
    description2: "fazem diferença",
    buttonText: "Ver Acessórios"
  }
];

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

export default function Hero() {
  return (
    <section id="hero" className="py-8 md:py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-2 md:px-4">
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={5000}
          keyBoardControl={true}
          customTransition="transform 500ms ease-in-out"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {slides.map((slide, index) => (
            <div key={slide.id} className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 px-2 md:px-4">
              {/* Image (Left) */}
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="relative w-full max-w-[300px] md:max-w-[500px] aspect-4/3 overflow-hidden rounded-2xl md:rounded-[3rem] shadow-xl bg-terracotta/20">
                  <Image 
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              </div>

              {/* Text (Right) */}
              <div className="w-full md:w-1/2 text-center space-y-4 md:space-y-6 px-4">
                <h1 className="font-serif text-2xl md:text-4xl lg:text-6xl font-bold leading-tight text-brown-text">
                  {slide.title} <br/>
                  {slide.subtitle} <br/>
                  <span className="font-light text-xl md:text-3xl lg:text-5xl">{slide.description1}</span> <br/>
                  <span className="font-light text-xl md:text-3xl lg:text-5xl">{slide.description2}</span>
                </h1>
                
                <div className="pt-2 md:pt-4 flex justify-center">
                  <button className="bg-terracotta hover:bg-terracotta-dark text-white px-6 py-2 md:px-8 md:py-3 rounded-full text-base md:text-lg font-medium shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
                    {slide.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
