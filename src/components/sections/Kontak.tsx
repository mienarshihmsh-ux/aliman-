"use client"

import React from 'react';
import { MapPin, Mail, Phone, Clock, Map as MapIcon } from 'lucide-react';
import { KontakData } from '@/lib/types';

interface KontakProps {
  data: KontakData;
}

export function Kontak({ data }: KontakProps) {
  return (
    <section id="kontak" className="py-20 px-[5%] bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary inline-flex items-center gap-3">
            <MapIcon className="w-8 h-8" /> Hubungi Kami
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-primary to-[#f9e79f] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold flex items-center gap-2 text-primary">
              <MapPin className="w-6 h-6" /> Informasi Kontak
            </h3>
            
            <div className="space-y-4">
              <ContactItem 
                icon={<MapPin />} 
                title="Alamat" 
                content={data.alamat || '-'} 
              />
              <ContactItem 
                icon={<Mail />} 
                title="Email" 
                content={
                  <>
                    {data.email1 && <div>{data.email1}</div>}
                    {data.email2 && <div>{data.email2}</div>}
                  </>
                } 
              />
              <ContactItem 
                icon={<Phone />} 
                title="Telepon" 
                content={
                  <>
                    {data.telpon1 && <div>{data.telpon1}</div>}
                    {data.telpon2 && <div>{data.telpon2}</div>}
                  </>
                } 
              />
              <ContactItem 
                icon={<Clock />} 
                title="Jam Operasional" 
                content={data.jam_operasional || '-'} 
                isMultiLine
              />
            </div>
          </div>

          <div className="bg-background rounded-3xl p-6 shadow-inner">
            <h3 className="text-2xl font-bold flex items-center gap-2 text-primary mb-6">
              <MapIcon className="w-6 h-6" /> Lokasi Kami
            </h3>
            <div className="w-full aspect-square md:aspect-video rounded-2xl overflow-hidden border-4 border-white shadow-xl">
              <iframe 
                src={data.maps_url} 
                className="w-full h-full border-0" 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const ContactItem = ({ icon, title, content, isMultiLine }: { icon: React.ReactNode; title: string; content: React.ReactNode; isMultiLine?: boolean }) => (
  <div className="flex gap-4 p-5 bg-background rounded-2xl border border-border hover:border-primary/30 transition-all hover:translate-x-2">
    <div className="text-primary mt-1">
      {React.cloneElement(icon as React.ReactElement, { className: "w-6 h-6" })}
    </div>
    <div>
      <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-1">{title}</h4>
      <div className={cn("text-base font-medium", isMultiLine && "whitespace-pre-line")}>
        {content}
      </div>
    </div>
  </div>
);