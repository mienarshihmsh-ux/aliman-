"use client"

import React from 'react';
import { Mosque, Instagram, Facebook, Twitter, Youtube, Globe } from 'lucide-react';
import { LogoData, FooterData, SocialMediaData } from '@/lib/types';

interface FooterProps {
  logo?: LogoData;
  footer?: FooterData;
  socials?: SocialMediaData;
}

export function Footer({ logo, footer, socials }: FooterProps) {
  const getIcon = (iconName: string) => {
    const name = iconName.toLowerCase();
    if (name.includes('instagram')) return <Instagram className="w-5 h-5" />;
    if (name.includes('facebook')) return <Facebook className="w-5 h-5" />;
    if (name.includes('twitter')) return <Twitter className="w-5 h-5" />;
    if (name.includes('youtube')) return <Youtube className="w-5 h-5" />;
    return <Globe className="w-5 h-5" />;
  };

  return (
    <footer className="bg-[#0d2e1c] text-white py-16 px-[5%]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
        <div className="flex items-center gap-3">
          <Mosque className="w-10 h-10 text-[#f9e79f]" />
          <h3 className="text-2xl font-headline font-bold uppercase tracking-tight">
            {logo?.nama || 'TPA AL IMAN'}
          </h3>
        </div>

        <div className="flex gap-4">
          {socials?.items.map((social, index) => (
            <a 
              key={index} 
              href={social.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/10 p-3 rounded-full hover:bg-[#f9e79f] hover:text-[#1e8449] transition-all"
            >
              {getIcon(social.icon)}
            </a>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-8 border-t border-white/10 text-center">
        <p className="text-white/60 text-sm">
          &copy; {footer?.copyright || new Date().getFullYear()} {logo?.nama || 'TPA AL IMAN'} {footer?.tagline ? `| ${footer?.tagline}` : ''}
        </p>
      </div>
    </footer>
  );
}