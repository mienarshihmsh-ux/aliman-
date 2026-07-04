"use client"

import React from 'react';
import { KontakData } from '@/lib/types';
import { cn } from '@/lib/utils';

interface KontakProps {
  data: KontakData;
}

export function Kontak({ data }: KontakProps) {
  return (
    <section id="kontak" className="section section-light py-20 px-[5%] bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title">
          <i className="fas fa-address-card mr-3"></i> Hubungi Kami
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Bagian Informasi Kontak */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold flex items-center gap-3 text-primary mb-8">
              <i className="fas fa-info-circle"></i> Informasi Kontak
            </h3>
            
            <div className="flex flex-col gap-5">
              <ContactItem 
                icon="fas fa-map-pin" 
                title="Alamat" 
                content={data.alamat || '-'} 
              />
              <ContactItem 
                icon="fas fa-envelope" 
                title="Email" 
                content={
                  <>
                    {data.email1 && <div>{data.email1}</div>}
                    {data.email2 && <div>{data.email2}</div>}
                  </>
                } 
              />
              <ContactItem 
                icon="fas fa-phone-alt" 
                title="Telepon" 
                content={
                  <>
                    {data.telpon1 && <div>{data.telpon1}</div>}
                    {data.telpon2 && <div>{data.telpon2}</div>}
                  </>
                } 
              />
              <ContactItem 
                icon="fas fa-clock" 
                title="Jam Operasional" 
                content={data.jam_operasional || '-'} 
                isMultiLine
              />
            </div>
          </div>

          {/* Bagian Peta (Peta tetap ada, namun judul 'Lokasi Kami' telah dihilangkan) */}
          <div className="w-full">
            <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white h-[450px] relative">
              <iframe 
                src={data.maps_url || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.81956135000001!3d-6.194741399999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f421a7d6ad01%3A0x6b490f2b2341255c!2sMonumen%20Nasional!5e0!3m2!1sid!2sid!4v1652164444444!5m2!1sid!2sid"}
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta Lokasi TPA"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const ContactItem = ({ icon, title, content, isMultiLine }: { icon: string; title: string; content: React.ReactNode; isMultiLine?: boolean }) => (
  <div className="info-item">
    <div className="text-primary w-12 flex justify-center text-2xl">
      <i className={icon}></i>
    </div>
    <div>
      <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground/60 mb-0.5">{title}</h4>
      <div className={cn("text-base font-semibold text-foreground", isMultiLine && "whitespace-pre-line")}>
        {content}
      </div>
    </div>
  </div>
);
