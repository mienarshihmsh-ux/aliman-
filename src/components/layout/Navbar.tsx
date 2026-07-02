"use client"

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { LogoData } from '@/lib/types';

interface NavbarProps {
  logo?: LogoData;
  onOpenModal: () => void;
}

export function Navbar({ logo, onOpenModal }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className={cn(
      "navbar fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 px-[5%] py-4 flex justify-between items-center hero-gradient shadow-lg",
      scrolled ? "bg-opacity-95 backdrop-blur-md" : ""
    )}>
      <div 
        className="logo flex items-center gap-3 cursor-pointer group"
        onClick={() => scrollToSection('beranda')}
      >
        <i className={cn(logo?.icon || "fas fa-mosque", "text-2xl text-[#f9e79f] transition-transform group-hover:scale-110")}></i>
        <h1 className="text-white text-xl font-headline font-bold uppercase tracking-tight">
          {logo?.nama || 'TPA AL IMAN'}
        </h1>
      </div>

      <div className="hidden md:flex items-center gap-2">
        <NavItem onClick={() => scrollToSection('beranda')}>Beranda</NavItem>
        <NavItem onClick={() => scrollToSection('tentang')}>Tentang</NavItem>
        <NavItem onClick={() => scrollToSection('gallery')}>Gallery</NavItem>
        <NavItem onClick={() => scrollToSection('kontak')}>Kontak</NavItem>
        <button 
          onClick={onOpenModal}
          className="nav-btn ml-4 bg-[#f9e79f] text-[#1e8449] px-6 py-2.5 rounded-full font-bold hover:scale-105 transition-all flex items-center gap-2 shadow-md"
        >
          <i className="fas fa-paper-plane"></i> Daftar
        </button>
      </div>

      <button className="md:hidden text-white text-2xl" onClick={() => setIsOpen(!isOpen)}>
        <i className={cn("fas", isOpen ? "fa-times" : "fa-bars")}></i>
      </button>

      {/* Mobile Menu */}
      <div className={cn(
        "absolute top-full left-0 right-0 hero-gradient flex flex-col p-6 transition-all duration-300 md:hidden shadow-xl",
        isOpen ? "translate-y-0 opacity-100 visible" : "-translate-y-full opacity-0 invisible"
      )}>
        <MobileNavItem onClick={() => scrollToSection('beranda')}>Beranda</MobileNavItem>
        <MobileNavItem onClick={() => scrollToSection('tentang')}>Tentang</MobileNavItem>
        <MobileNavItem onClick={() => scrollToSection('gallery')}>Gallery</MobileNavItem>
        <MobileNavItem onClick={() => scrollToSection('kontak')}>Kontak</MobileNavItem>
        <button 
          onClick={onOpenModal}
          className="mt-4 bg-[#f9e79f] text-[#1e8449] w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg"
        >
          <i className="fas fa-paper-plane"></i> Daftar
        </button>
      </div>
    </nav>
  );
}

const NavItem = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="text-white px-4 py-2 rounded-full hover:bg-white/20 transition-all font-medium"
  >
    {children}
  </button>
);

const MobileNavItem = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="text-white w-full py-4 text-center border-b border-white/10 text-lg font-medium"
  >
    {children}
  </button>
);
