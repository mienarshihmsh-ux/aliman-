"use client"

import React from 'react';
import { TentangData } from '@/lib/types';
import { Info } from 'lucide-react';
import Image from 'next/image';

interface TentangProps {
  data: TentangData;
  imageUrl?: string;
}

export function Tentang({ data, imageUrl }: TentangProps) {
  return (
    <section id="tentang" className="section section-light py-24 px-[5%] bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title flex items-center justify-center gap-3">
          <Info className="w-8 h-8 text-primary" /> Tentang Kami
        </h2>

        <div className="grid lg:grid-cols-12 gap-12 items-start mt-16">
          {/* Kolom Deskripsi */}
          <div className="lg:col-span-7 relative">
            <div className="absolute -top-10 -left-6 opacity-10">
              <i className="fas fa-quote-left text-8xl text-primary"></i>
            </div>
            <div className="relative z-10">
              <p className="text-lg md:text-xl leading-relaxed text-muted-foreground italic text-justify">
                {data.deskripsi || 'Memuat deskripsi...'}
              </p>
            </div>
          </div>

          {/* Kolom Kanan: Gambar (Desktop) & Statistik */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Gambar Utama hanya muncul di Desktop */}
            {imageUrl && (
              <div className="hidden lg:block relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border-4 border-white transition-transform duration-500 hover:scale-[1.02]">
                <Image 
                  src={imageUrl} 
                  alt="Tentang TPA AL IMAN" 
                  fill 
                  className="object-cover"
                  data-ai-hint="islamic education"
                />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6">
              <div className="flex flex-col sm:flex-row lg:flex-row gap-4 justify-center items-center lg:items-stretch sm:justify-start lg:justify-end">
                <StatCard 
                  icon="fas fa-users" 
                  label="Santri Aktif" 
                  value={data.santri || '0'} 
                />
                <StatCard 
                  icon="fas fa-chalkboard-teacher" 
                  label="Tenaga Pengajar" 
                  value={data.ustadz || '0'} 
                />
                <StatCard 
                  icon="fas fa-book-quran" 
                  label="Program Unggulan" 
                  value={data.program || '0'} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const StatCard = ({ icon, label, value }: { icon: string; label: string; value: string | number }) => (
  <div className="bg-primary p-8 rounded-2xl text-center text-white transition-all duration-300 shadow-xl hover:-translate-y-2 flex flex-col items-center justify-center min-w-[160px] flex-1">
    <div className="mb-4 text-[#f9e79f]">
      <i className={`${icon} text-4xl`}></i>
    </div>
    <div className="text-4xl font-bold mb-1">{value}+</div>
    <div className="text-[10px] font-bold uppercase tracking-widest opacity-80 whitespace-nowrap">{label}</div>
  </div>
);
