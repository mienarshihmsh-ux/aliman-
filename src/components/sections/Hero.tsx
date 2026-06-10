"use client"

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { HeroData, HeroCarouselData } from '@/lib/types';
import Image from 'next/image';

interface HeroProps {
  hero: HeroData;
  carousel: HeroCarouselData;
}

export function Hero({ hero, carousel }: HeroProps) {
  return (
    <section id="beranda" className="relative w-full aspect-[4/3] sm:aspect-video overflow-hidden">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-full"
      >
        {carousel.items.map((item, index) => (
          <SwiperSlide key={index} className="relative w-full h-full">
            <Image
              src={item.image}
              alt={item.caption}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
              <div className="bg-black/60 backdrop-blur-md text-white px-6 py-2 rounded-full text-sm md:text-base whitespace-nowrap border border-white/20">
                {item.caption}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute inset-0 pointer-events-none z-[5] bg-gradient-to-t from-[#145a32]/80 to-transparent flex flex-col justify-center items-center text-center p-6">
        <h1 className="text-white text-3xl md:text-6xl font-headline font-bold mb-4 drop-shadow-lg max-w-4xl">
          {hero.title || 'TPA AL IMAN'}
        </h1>
        <p className="text-white/90 text-lg md:text-2xl max-w-2xl drop-shadow-md">
          {hero.subtitle || 'Tempat Pendidikan Al-Qur\'an'}
        </p>
      </div>
    </section>
  );
}