"use client"

import React from 'react';
import { Info, Users, GraduationCap, BookOpen, Quote } from 'lucide-react';
import { TentangData } from '@/lib/types';

interface TentangProps {
  data: TentangData;
}

export function Tentang({ data }: TentangProps) {
  return (
    <section id="tentang" className="py-20 px-[5%] bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary inline-flex items-center gap-3">
            <Info className="w-8 h-8" /> Tentang Kami
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-primary to-[#f9e79f] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <Quote className="absolute -top-6 -left-6 w-12 h-12 text-primary/10" />
            <p className="text-lg leading-relaxed text-muted-foreground italic">
              {data.deskripsi || 'Memuat deskripsi...'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <StatCard 
              icon={<Users className="w-8 h-8" />} 
              label="Santri Aktif" 
              value={data.santri || '0'} 
            />
            <StatCard 
              icon={<GraduationCap className="w-8 h-8" />} 
              label="Ustaz/Ustazah" 
              value={data.ustadz || '0'} 
            />
            <StatCard 
              icon={<BookOpen className="w-8 h-8" />} 
              label="Program Unggulan" 
              value={data.program || '0'} 
            />
          </div>
        </div>
      </div>
    </section>
  );
}

const StatCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) => (
  <div className="bg-primary text-white p-8 rounded-2xl text-center shadow-xl hover:-translate-y-2 transition-transform">
    <div className="mb-4 flex justify-center text-[#f9e79f]">
      {icon}
    </div>
    <div className="text-3xl font-bold mb-1">{value}</div>
    <div className="text-xs uppercase tracking-wider opacity-80">{label}</div>
  </div>
);