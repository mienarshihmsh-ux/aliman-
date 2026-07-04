# TPA AL IMAN - Sistem Pendaftaran Santri Baru Digital

Aplikasi web modern untuk manajemen pendaftaran santri baru di TPA AL IMAN. Dibangun dengan fokus pada kemudahan pengguna, keamanan data, dan integrasi pembayaran digital.

## 🚀 Fitur Utama

- **Landing Page Interaktif:** Tampilan responsif dengan desain bernuansa Islami yang modern.
- **Gallery Kegiatan:** Menampilkan dokumentasi kegiatan TPA menggunakan modal gambar.
- **Formulir Pendaftaran Digital:** Pengisian data santri lengkap termasuk unggah berkas (Foto, Ijazah, KK).
- **Integrasi Pembayaran (Midtrans):** Pembayaran biaya pendaftaran otomatis menggunakan Midtrans Snap API.
- **Penyimpanan Cloud (Google Sheets & Drive):** Data pendaftaran disimpan langsung ke Google Sheets dan berkas diunggah ke Google Drive melalui Google Apps Script.
- **Validasi Real-time:** Pengecekan data ganda (NISN, NIK, Email, No. Telp) untuk mencegah pendaftaran duplikat.
- **Notifikasi Elegan:** Menggunakan SweetAlert2 untuk umpan balik pengguna yang lebih baik.

## 🛠️ Teknologi yang Digunakan

- **Frontend:** Next.js 15 (App Router), React 19, TypeScript.
- **Styling:** Tailwind CSS, Lucide Icons, Font Awesome.
- **UI Components:** Shadcn UI, Radix UI.
- **Backend/Logic:** Next.js Server Actions.
- **Payment Gateway:** Midtrans Snap SDK.
- **Database/Storage:** Google Apps Script (sebagai API Bridge ke Google Sheets & Drive).

## ⚙️ Konfigurasi Environment Variables

Untuk menjalankan aplikasi ini, Anda perlu membuat file `.env` di folder root dan mengisi variabel berikut:

```env
# Midtrans Keys
MIDTRANS_SERVER_KEY=isi_dengan_server_key_anda
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=isi_dengan_client_key_anda

# Apps Script URL
NEXT_PUBLIC_APPS_SCRIPT_URL=isi_dengan_url_deployment_apps_script
```

## 📝 Catatan Penting

1. **Google Apps Script:** Pastikan Anda telah men-deploy Google Apps Script dengan izin akses "Anyone" agar aplikasi dapat mengirim data pendaftaran.
2. **Midtrans:** Aplikasi ini saat ini dikonfigurasi menggunakan mode Sandbox untuk keperluan pengembangan/testing.
3. **Keamanan:** Selalu gunakan Environment Variables untuk menyimpan kunci rahasia agar tidak bocor saat diunggah ke repositori publik seperti GitHub.

## 📦 Instalasi dan Pengembangan

1. Clone repositori ini.
2. Jalankan `npm install` untuk menginstal dependensi.
3. Jalankan `npm run dev` untuk memulai server pengembangan di `http://localhost:9002`.

---
© 2025 TPA AL IMAN - Dikembangkan dengan ❤️ untuk pendidikan Al-Qur'an.
