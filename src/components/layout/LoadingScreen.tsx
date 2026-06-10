"use client"

import React from 'react';
import { Mosque, Loader2 } from 'lucide-react';

export function LoadingScreen({ text }: { text: string }) {
  return (
    <div className="fixed inset-0 z-[9999] hero-gradient flex flex-col items-center justify-center text-white">
      <div className="relative mb-8">
        <Mosque className="w-20 h-20 text-[#f9e79f] animate-pulse" />
        <Loader2 className="w-8 h-8 absolute -bottom-4 -right-4 animate-spin" />
      </div>
      <h2 className="text-xl font-headline font-semibold mb-2">{text}</h2>
      <p className="text-white/60 text-sm animate-pulse">Menghubungkan ke sistem...</p>
    </div>
  );
}