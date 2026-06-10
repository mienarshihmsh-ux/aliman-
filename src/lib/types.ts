export interface HeroData {
  title?: string;
  subtitle?: string;
}

export interface CarouselItem {
  image: string;
  caption: string;
}

export interface HeroCarouselData {
  items: CarouselItem[];
}

export interface TentangData {
  deskripsi?: string;
  santri?: string | number;
  ustadz?: string | number;
  program?: string | number;
}

export interface GalleryItem {
  image: string;
  caption: string;
}

export interface GalleryData {
  items: GalleryItem[];
}

export interface KontakData {
  alamat?: string;
  email1?: string;
  email2?: string;
  telpon1?: string;
  telpon2?: string;
  jam_operasional?: string;
  maps_url?: string;
}

export interface LogoData {
  icon?: string;
  nama?: string;
}

export interface FooterData {
  copyright?: string;
  tagline?: string;
}

export interface SocialMediaItem {
  url: string;
  icon: string;
}

export interface SocialMediaData {
  items: SocialMediaItem[];
}

export interface AppData {
  hero: HeroData;
  hero_carousel: HeroCarouselData;
  tentang: TentangData;
  gallery: GalleryData;
  kontak: KontakData;
  logo: LogoData;
  footer: FooterData;
  sosial_media: SocialMediaData;
  error?: string;
}