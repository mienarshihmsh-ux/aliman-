"use client"

import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { createPaymentToken } from '@/app/actions/payment';
import Swal from 'sweetalert2';

declare global {
  interface Window {
    snap: any;
  }
}

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  appsScriptUrl: string;
}

const MAX_FILE_SIZE = 1024 * 1024; // 1MB dalam bytes

export function RegistrationModal({ isOpen, onClose, appsScriptUrl }: RegistrationModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    telepon: '',
    nisn: '',
    nik: '',
  });

  const [files, setFiles] = useState<{
    foto: File | null;
    ijazah: File | null;
    kk: File | null;
  }>({
    foto: null,
    ijazah: null,
    kk: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === 'nisn') {
      setFormData(prev => ({ ...prev, nisn: value.replace(/\D/g, '').slice(0, 10) }));
    } else if (id === 'nik') {
      setFormData(prev => ({ ...prev, nik: value.replace(/\D/g, '').slice(0, 16) }));
    } else if (id === 'telepon') {
      setFormData(prev => ({ ...prev, telepon: value.replace(/\D/g, '') }));
    } else {
      setFormData(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, files: selectedFiles } = e.target;
    if (selectedFiles && selectedFiles[0]) {
      const file = selectedFiles[0];
      if (file.size > MAX_FILE_SIZE) {
        Swal.fire({
          title: 'Berkas Terlalu Besar',
          text: `Ukuran maksimal ${file.name} adalah 1MB. Silakan kompres berkas Anda.`,
          icon: 'warning',
          confirmButtonColor: '#1e8449',
        });
        e.target.value = ''; // Reset input
        return;
      }
      setFiles(prev => ({ ...prev, [id]: file }));
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nama || !formData.email || !formData.telepon || !formData.nisn || !formData.nik || !files.foto || !files.ijazah || !files.kk) {
      Swal.fire({
        title: 'Form Tidak Lengkap',
        text: 'Semua kolom wajib diisi!',
        icon: 'warning',
        confirmButtonColor: '#1e8449',
      });
      return;
    }

    setLoading(true);

    try {
      // 1. Persiapkan Berkas
      const fotoBase64 = await fileToBase64(files.foto);
      const ijazahBase64 = await fileToBase64(files.ijazah);
      const kkBase64 = await fileToBase64(files.kk);

      // 2. Kirim ke Google Apps Script
      const bodyParams = new URLSearchParams();
      bodyParams.append('nama', formData.nama);
      bodyParams.append('email', formData.email);
      bodyParams.append('noTelp', formData.telepon); // Sesuai dengan Apps Script: noTelp
      bodyParams.append('nisn', formData.nisn);
      bodyParams.append('nik', formData.nik);
      bodyParams.append('foto', fotoBase64);
      bodyParams.append('fotoExt', files.foto.name.split('.').pop() || 'jpg');
      bodyParams.append('ijazah', ijazahBase64);
      bodyParams.append('kk', kkBase64);

      const response = await fetch(appsScriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: bodyParams.toString(),
      });

      const result = await response.json();

      if (result.result !== 'success') {
        setLoading(false);
        Swal.fire({
          title: 'Pendaftaran Gagal',
          text: result.message || 'Terjadi kesalahan pada server.',
          icon: 'error',
          confirmButtonColor: '#1e8449',
        });
        return;
      }

      // 3. Proses Pembayaran Midtrans
      const orderId = `REG-${Date.now()}-${formData.nisn}`;
      const amount = 50000; 

      const paymentResult = await createPaymentToken({
        amount,
        orderId,
        customerName: formData.nama,
        email: formData.email
      });

      if (!paymentResult || !paymentResult.token) {
        setLoading(false);
        Swal.fire({
          title: 'Data Tersimpan',
          text: 'Pendaftaran berhasil, tetapi gagal memuat sistem pembayaran. Silakan hubungi admin.',
          icon: 'info',
          confirmButtonColor: '#1e8449',
        });
        return;
      }

      if (window.snap) {
        onClose(); // Tutup modal agar overlay tidak menghalangi klik Midtrans
        
        window.snap.pay(paymentResult.token, {
          onSuccess: () => {
            Swal.fire({
              title: 'Pendaftaran Berhasil!',
              text: `Alhamdulillah ${formData.nama}, pendaftaran dan pembayaran telah selesai.`,
              icon: 'success',
              confirmButtonColor: '#1e8449',
            });
            setFormData({ nama: '', email: '', telepon: '', nisn: '', nik: '' });
            setFiles({ foto: null, ijazah: null, kk: null });
          },
          onPending: () => {
            Swal.fire({
              title: 'Menunggu Pembayaran',
              text: 'Silakan selesaikan pembayaran sesuai instruksi Midtrans yang muncul.',
              icon: 'info',
              confirmButtonColor: '#1e8449',
            });
          },
          onError: () => {
            Swal.fire({
              title: 'Pembayaran Gagal',
              text: 'Terjadi kesalahan pada sistem pembayaran. Silakan coba beberapa saat lagi.',
              icon: 'error',
              confirmButtonColor: '#1e8449',
            });
          }
        });
      } else {
        setLoading(false);
        Swal.fire({
          title: 'Sistem Belum Siap',
          text: 'Gagal memuat sistem pembayaran. Silakan refresh halaman dan coba lagi.',
          icon: 'warning',
          confirmButtonColor: '#1e8449',
        });
      }

    } catch (error: any) {
      setLoading(false);
      Swal.fire({
        title: 'Kesalahan Jaringan',
        text: 'Gagal mengirim data. Pastikan koneksi internet stabil dan berkas tidak terlalu besar.',
        icon: 'error',
        confirmButtonColor: '#1e8449',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[650px] max-h-[95vh] overflow-y-auto rounded-3xl p-8 border-none shadow-2xl z-[1200]">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl font-headline font-bold text-primary flex items-center gap-3">
            <i className="fas fa-paper-plane"></i> Form Pendaftaran Santri Baru
          </DialogTitle>
          <DialogDescription className="text-base">
            Lengkapi data santri. Biaya pendaftaran Rp 50.000 (Bayar via Midtrans).
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <Label htmlFor="nama" className="flex items-center gap-2 text-foreground font-semibold">
                <i className="fas fa-user text-primary"></i> Nama Lengkap Santri <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="nama" 
                placeholder="Ibrahim Hassan" 
                className="h-12 border-2 focus:border-primary rounded-xl"
                value={formData.nama}
                onChange={handleInputChange}
                required 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2 text-foreground font-semibold">
                <i className="fas fa-envelope text-primary"></i> Email Orang Tua <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="email" 
                type="email"
                placeholder="email@contoh.com" 
                className="h-12 border-2 focus:border-primary rounded-xl"
                value={formData.email}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telepon" className="flex items-center gap-2 text-foreground font-semibold">
                <i className="fas fa-phone text-primary"></i> No. HP / WhatsApp <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="telepon" 
                placeholder="0812xxxxxx" 
                className="h-12 border-2 focus:border-primary rounded-xl"
                value={formData.telepon}
                onChange={handleInputChange}
                required 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="nisn" className="flex items-center gap-2 text-foreground font-semibold">
                <i className="fas fa-id-card text-primary"></i> NISN <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="nisn" 
                placeholder="10 digit angka" 
                className="h-12 border-2 focus:border-primary rounded-xl"
                value={formData.nisn}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nik" className="flex items-center gap-2 text-foreground font-semibold">
                <i className="fas fa-id-card text-primary"></i> NIK <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="nik" 
                placeholder="16 digit angka" 
                className="h-12 border-2 focus:border-primary rounded-xl"
                value={formData.nik}
                onChange={handleInputChange}
                required 
              />
            </div>
          </div>

          <div className="space-y-5 bg-muted/30 p-6 rounded-2xl border border-dashed border-primary/20">
            <div className="space-y-2">
              <Label htmlFor="foto" className="flex items-center gap-2 text-foreground font-semibold">
                <i className="fas fa-camera text-primary"></i> Foto Santri (.jpg/.png, Max 1MB) <span className="text-red-500">*</span>
              </Label>
              <Input id="foto" type="file" accept=".jpg,.jpeg,.png" onChange={handleFileChange} className="bg-white border-2 rounded-xl" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ijazah" className="flex items-center gap-2 text-foreground font-semibold">
                <i className="fas fa-graduation-cap text-primary"></i> Ijazah (PDF, Max 1MB) <span className="text-red-500">*</span>
              </Label>
              <Input id="ijazah" type="file" accept=".pdf" onChange={handleFileChange} className="bg-white border-2 rounded-xl" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="kk" className="flex items-center gap-2 text-foreground font-semibold">
                <i className="fas fa-users text-primary"></i> Kartu Keluarga (PDF, Max 1MB) <span className="text-red-500">*</span>
              </Label>
              <Input id="kk" type="file" accept=".pdf" onChange={handleFileChange} className="bg-white border-2 rounded-xl" required />
            </div>
          </div>

          <DialogFooter>
            <Button 
              type="submit" 
              className={cn(
                "w-full h-14 text-lg font-bold rounded-xl shadow-lg transition-all hero-gradient hover:scale-[1.02]",
                loading && "opacity-80"
              )} 
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <i className="fas fa-spinner animate-spin"></i> Sedang Mengunggah Berkas...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <i className="fas fa-paper-plane"></i> Kirim & Bayar Sekarang
                </span>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
