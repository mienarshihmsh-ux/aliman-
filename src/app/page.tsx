"use client"

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Tentang } from '@/components/sections/Tentang';
import { Gallery } from '@/components/sections/Gallery';
import { Kontak } from '@/components/sections/Kontak';
import { Footer } from '@/components/layout/Footer';
import { LoadingScreen } from '@/components/layout/LoadingScreen';
import { RegistrationModal } from '@/components/sections/RegistrationModal';
import { ArrowUp, RefreshCw, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AppData } from '@/lib/types';

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwEXoPbCRx-OC1R982OHH7-amDKkuyMsqgT60J8Jwcv-oHuVxEPUOGucyEOu7hBq6zQ/exec';

export default function Home() {
  const [data, setData] = useState<AppData | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('Memuat Data...');
  const [error, setError] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      setLoadingText('Menghubungi server...');
      
      const response = await fetch(APPS_SCRIPT_URL);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      setLoadingText('Memproses data...');
      const result = await response.json();
      
      if (result.error) throw new Error(result.error);
      
      setData(result);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Gagal memuat data dari server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) return <LoadingScreen text={loadingText} />;

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-background">
        <AlertCircle className="w-16 h-16 text-destructive mb-4" />
        <h1 className="text-2xl font-headline font-bold mb-2">Gagal Memuat Data</h1>
        <p className="text-muted-foreground mb-8 max-w-md">{error}</p>
        <Button onClick={() => window.location.reload()} variant="outline" className="gap-2">
          <RefreshCw className="w-4 h-4" /> Muat Ulang
        </Button>
      </div>
    );
  }

  if (!data) return null;

  return (
    <main className="relative">
      <Navbar logo={data.logo} onOpenModal={() => setIsModalOpen(true)} />
      
      <Hero hero={data.hero} carousel={data.hero_carousel} />
      
      <Tentang data={data.tentang} />
      
      <Gallery data={data.gallery} />
      
      <Kontak data={data.kontak} />
      
      <Footer logo={data.logo} footer={data.footer} socials={data.sosial_media} />

      <RegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        appsScriptUrl={APPS_SCRIPT_URL}
      />

      {/* Back to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 z-[40] w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:-translate-y-2 ${
          showBackToTop ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-10'
        }`}
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </main>
  );
}