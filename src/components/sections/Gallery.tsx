"use client"

import React from 'react';
import { Images } from 'lucide-react';
import { GalleryData } from '@/lib/types';
import Image from 'next/image';

interface GalleryProps {
  data: GalleryData;
}

export function Gallery({ data }: GalleryProps) {
  return (
    <section id="gallery" className="py-20 px-[5%] bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary inline-flex items-center gap-3">
            <Images className="w-8 h-8" /> Gallery Kegiatan
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-primary to-[#f9e79f] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.items.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.caption}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6 text-center font-bold text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                {item.caption}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}