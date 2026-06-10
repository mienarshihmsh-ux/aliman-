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
import { User, IdCard, Camera, GraduationCap, Users, Send, Info, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  appsScriptUrl: string;
}

export function RegistrationModal({ isOpen, onClose, appsScriptUrl }: RegistrationModalProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
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
    } else {
      setFormData(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, files: selectedFiles } = e.target;
    if (selectedFiles && selectedFiles[0]) {
      setFiles(prev => ({ ...prev, [id]: selectedFiles[0] }));
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result).split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validations
    if (!formData.nama || !formData.nisn || !formData.nik || !files.foto || !files.ijazah || !files.kk) {
      toast({
        title: "Gagal",
        description: "Semua kolom wajib diisi!",
        variant: "destructive"
      });
      return;
    }

    if (formData.nisn.length !== 10) {
      toast({ title: "Gagal", description: "NISN harus 10 digit!", variant: "destructive" });
      return;
    }

    if (formData.nik.length !== 16) {
      toast({ title: "Gagal", description: "NIK harus 16 digit!", variant: "destructive" });
      return;
    }

    setLoading(true);

    try {
      const fotoBase64 = await fileToBase64(files.foto);
      const ijazahBase64 = await fileToBase64(files.ijazah);
      const kkBase64 = await fileToBase64(files.kk);

      const body = new FormData();
      body.append('nama', formData.nama);
      body.append('nisn', formData.nisn);
      body.append('nik', formData.nik);
      body.append('foto', fotoBase64);
      body.append('fotoExt', files.foto.name.split('.').pop() || 'jpg');
      body.append('ijazah', ijazahBase64);
      body.append('kk', kkBase64);

      const response = await fetch(appsScriptUrl, {
        method: 'POST',
        body: body,
      });

      const result = await response.json();

      if (result.result === 'success') {
        toast({
          title: "Berhasil",
          description: `Pendaftaran ${formData.nama} berhasil dikirim!`,
        });
        onClose();
        // Reset form
        setFormData({ nama: '', nisn: '', nik: '' });
        setFiles({ foto: null, ijazah: null, kk: null });
      } else {
        throw new Error(result.message || 'Gagal mengirim pendaftaran');
      }
    } catch (error: any) {
      toast({
        title: "Kesalahan",
        description: error.message || "Terjadi kesalahan saat mengirim data.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline font-bold text-primary flex items-center gap-2">
            <Send className="w-6 h-6" /> Pendaftaran Santri Baru
          </DialogTitle>
          <DialogDescription>
            Silakan isi formulir di bawah ini dengan lengkap dan benar.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="nama" className="flex items-center gap-2">
              <User className="w-4 h-4 text-primary" /> Nama Lengkap <span className="text-red-500">*</span>
            </Label>
            <Input 
              id="nama" 
              placeholder="Contoh: Ibrahim Hassan" 
              value={formData.nama}
              onChange={handleInputChange}
              required 
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nisn" className="flex items-center gap-2">
                <IdCard className="w-4 h-4 text-primary" /> NISN <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="nisn" 
                placeholder="10 digit angka" 
                value={formData.nisn}
                onChange={handleInputChange}
                required 
              />
              <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                <Info className="w-3 h-3" /> Nomor Induk Siswa Nasional
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="nik" className="flex items-center gap-2">
                <IdCard className="w-4 h-4 text-primary" /> NIK <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="nik" 
                placeholder="16 digit angka" 
                value={formData.nik}
                onChange={handleInputChange}
                required 
              />
              <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                <Info className="w-3 h-3" /> Nomor Induk Kependudukan
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="foto" className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-primary" /> Foto Santri <span className="text-red-500">*</span>
              </Label>
              <Input id="foto" type="file" accept=".jpg,.jpeg,.png" onChange={handleFileChange} required />
              <p className="text-[10px] text-muted-foreground">Format: JPG, PNG | Maks 2MB</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ijazah" className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-primary" /> Ijazah / Surat Keterangan <span className="text-red-500">*</span>
              </Label>
              <Input id="ijazah" type="file" accept=".pdf" onChange={handleFileChange} required />
              <p className="text-[10px] text-muted-foreground">Format: PDF | Maks 2MB</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="kk" className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" /> Kartu Keluarga <span className="text-red-500">*</span>
              </Label>
              <Input id="kk" type="file" accept=".pdf" onChange={handleFileChange} required />
              <p className="text-[10px] text-muted-foreground">Format: PDF | Maks 2MB</p>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full h-12 text-lg font-bold rounded-xl" disabled={loading}>
              {loading ? "Mengirim..." : "Kirim Pendaftaran"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}