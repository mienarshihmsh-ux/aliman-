import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'TPA AL IMAN - Tempat Pendidikan Al-Qur\'an',
  description: 'Tempat Belajar Al-Qur\'an dan Tahfidz Terpercaya di Al Iman Digital.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Mengambil client key dari environment variable
  const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || '';

  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" 
          integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" 
        />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
        {/* Midtrans Snap JS - Menggunakan Environment Variable untuk data-client-key */}
        <Script 
          src="https://app.sandbox.midtrans.com/snap/snap.js" 
          data-client-key={clientKey}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
