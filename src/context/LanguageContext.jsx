import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const TRANSLATIONS = {
  id: {
    // Navigation
    nav_home: 'Beranda',
    nav_packages: 'Paket Wisata',
    nav_destinations: 'Destinasi',
    nav_about: 'Tentang',
    nav_gallery: 'Galeri',
    nav_testimonials: 'Testimoni',
    nav_contact: 'Kontak',
    nav_ai_btn: 'Bantu Pilih Trip',
    nav_consult_btn: 'Konsultasi',
    lang_name: 'Bahasa Indonesia',
    lang_code: 'ID',
    lang_toggle_to: 'Switch to English',

    // Hero
    hero_eyebrow: 'Kurasi Perjalanan Nusantara Eksklusif',
    hero_title_1: 'Menjelajahi Mahakarya Nusantara,',
    hero_title_2: 'Menciptakan Cerita yang Hidup Selamanya.',
    hero_subtitle: 'Jelajahi Indonesia melalui perjalanan privat terkurasi—mulai dari gugusan karang Labuan Bajo & Raja Ampat hingga keagungan kaldera Bromo dan warisan budaya Nusantara. Setiap rute dirancang matang, nyaman, dan berkesan.',
    hero_tag_1: '16 Destinasi Indonesia',
    hero_tag_2: '100% Private Tour',
    hero_tag_3: 'Pemandu Berlisensi',
    hero_tag_4: 'Transparansi Biaya',
    hero_cta_packages: 'Lihat Paket Wisata',
    hero_cta_styles: 'Pilih Gaya Liburan',

    // Popular Packages
    pkg_badge: 'Pilihan Favorit',
    pkg_title: 'Paket Wisata Populer',
    pkg_subtitle: 'Pilihan paket terfavorit dengan fasilitas lengkap, akomodasi hotel bintang, dan rute harian terstruktur.',
    pkg_view_all: 'Lihat Semua Paket',
    pkg_starting_from: 'Mulai dari',
    pkg_per_person: '/orang',
    pkg_detail_btn: 'Lihat Detail Paket',

    // Destinations
    dest_badge: 'Destinasi Unggulan',
    dest_title: 'Jelajahi Berbagai Sudut Nusantara',
    dest_subtitle: 'Dari kepulauan karang terjernih di dunia hingga kaldera vulkanik dan pesona budaya luhur.',
    dest_catalog_btn: 'Katalog 16 Destinasi',
    dest_packages_count: 'Pilihan Paket',
    dest_explore_now: 'Jelajahi Sekarang',

    // Travel Styles (New section replacing old widget)
    style_badge: 'Inspirasi Perjalanan',
    style_title: 'Mau Liburan Seperti Apa? Temukan Gaya Anda.',
    style_subtitle: 'Setiap penjelajah memiliki suasana impian yang berbeda. Pilih tipe liburan yang paling Anda dambakan, lalu jelajahi rute terbaiknya.',
    style_view_trips: 'Lihat Pilihan Trip',
    style_recommended_for: 'Cocok untuk',
    style_highlights: 'Destinasi Utama',

    // Why Fadza / Service Pillars
    pillars_badge: 'Nilai Utama Layanan Kami',
    pillars_title: 'Tiga Landasan Kenyamanan Anda',
    pillars_subtitle: 'Prinsip operasional yang membedakan FADZA TRIP ADVENTURE demi memastikan setiap perjalanan Anda aman dan berkesan.',
    pillars_metric_dest: 'Destinasi Pilihan',
    pillars_metric_pkg: 'Paket Terkurasi',
    pillars_metric_trans: 'Transparansi Biaya',
    pillars_metric_support: 'Layanan Siaga 24/7',
    pillars_cta_consult: 'Konsultasi Perjalanan',
    pillars_cta_ai: 'Bantu Pilih Trip',

    // Gallery
    gallery_badge: 'Dokumentasi Nyata',
    gallery_title: 'Momen Perjalanan Nyata',
    gallery_subtitle: 'Dokumentasi autentik para penjelajah yang telah menikmati keindahan Nusantara bersama kami.',
    gallery_view_all: 'Buka Semua Galeri',

    // Testimonials
    testi_badge: 'Cerita Penjelajah',
    testi_title: 'Momen yang Membekas',
    testi_subtitle: 'Kisah langsung dari mereka yang telah mempercayakan perjalanan berharganya bersama kami.',
    testi_verified: 'Wisatawan Terverifikasi',

    // FAQ
    faq_badge: 'Tanya Jawab',
    faq_title: 'Pertanyaan yang Sering Diajukan',
    faq_subtitle: 'Segala hal yang perlu Anda ketahui sebelum merencanakan perjalanan bersama FADZA TRIP ADVENTURE.',

    // CTA
    cta_badge: 'Rencana Liburan Anda',
    cta_title_1: 'Sudah Tahu Mau ke Mana?',
    cta_title_2: 'Biar Kami Bantu Susun Sisanya.',
    cta_subtitle: 'Konsultasikan jadwal, preferensi rombongan, dan anggaran Anda secara langsung. Tim travel specialist kami siap merancang itinerary eksklusif tanpa repot.',
    cta_whatsapp: 'Konsultasi via WhatsApp',
    cta_ai: 'Bantu Pilihkan Trip',

    // Footer
    footer_tagline: 'Jelajahi Indonesia dengan perjalanan yang dirancang untuk menjadi pengalaman, bukan sekadar tujuan.',
    footer_nav_title: 'Navigasi Utama',
    footer_dest_title: 'Destinasi Pilihan',
    footer_contact_title: 'Kontak & Operasional',
    footer_explore_packages: 'Jelajahi Paket',
    footer_contact_fadza: 'Hubungi FADZA',
    footer_copyright: 'Seluruh hak cipta dilindungi.',
    footer_hours: 'Setiap Hari: 08.00 - 22.00 WIB',
    footer_terms: 'Syarat & Ketentuan',
    footer_privacy: 'Kebijakan Privasi',
    footer_faq: 'Tanya Jawab'
  },
  en: {
    // Navigation
    nav_home: 'Home',
    nav_packages: 'Tour Packages',
    nav_destinations: 'Destinations',
    nav_about: 'About Us',
    nav_gallery: 'Gallery',
    nav_testimonials: 'Testimonials',
    nav_contact: 'Contact',
    nav_ai_btn: 'AI Trip Assistant',
    nav_consult_btn: 'Consultation',
    lang_name: 'English',
    lang_code: 'EN',
    lang_toggle_to: 'Ganti ke Bahasa Indonesia',

    // Hero
    hero_eyebrow: 'Exclusive Indonesian Journey Curation',
    hero_title_1: 'Discover the Masterpieces of Indonesia,',
    hero_title_2: 'Crafting Stories that Live Forever.',
    hero_subtitle: 'Experience Indonesia through handpicked private tours—from the pristine turquoise waters of Labuan Bajo & Raja Ampat to the volcanic sunrises of Mount Bromo and living cultural heritage. Carefully planned, deeply authentic.',
    hero_tag_1: '16 Indonesian Destinations',
    hero_tag_2: '100% Private Tours',
    hero_tag_3: 'Licensed Local Guides',
    hero_tag_4: 'Transparent Pricing',
    hero_cta_packages: 'Explore Tour Packages',
    hero_cta_styles: 'Choose Holiday Mood',

    // Popular Packages
    pkg_badge: 'Favorite Selections',
    pkg_title: 'Popular Tour Packages',
    pkg_subtitle: 'Most-requested travel itineraries with full inclusions, star-rated accommodations, and seamless private transfers.',
    pkg_view_all: 'View All Packages',
    pkg_starting_from: 'Starting from',
    pkg_per_person: '/person',
    pkg_detail_btn: 'View Tour Details',

    // Destinations
    dest_badge: 'Featured Destinations',
    dest_title: 'Explore the Wonders of Indonesia',
    dest_subtitle: 'From world-renowned pristine coral archipelagos to volcanic calderas and sacred ancestral heritage.',
    dest_catalog_btn: 'Catalog of 16 Destinations',
    dest_packages_count: 'Available Packages',
    dest_explore_now: 'Explore Now',

    // Travel Styles (New section replacing old widget)
    style_badge: 'Holiday Inspiration',
    style_title: 'What Kind of Vacation Do You Envision?',
    style_subtitle: 'Every traveler has a distinct holiday spirit. Choose the vacation mood that fits your dream and discover our handpicked routes.',
    style_view_trips: 'Explore Related Trips',
    style_recommended_for: 'Ideal for',
    style_highlights: 'Key Destinations',

    // Why Fadza / Service Pillars
    pillars_badge: 'Our Core Commitments',
    pillars_title: 'Three Pillars of Your Peace of Mind',
    pillars_subtitle: 'The professional standards that define FADZA TRIP ADVENTURE, ensuring every moment of your vacation is safe and truly memorable.',
    pillars_metric_dest: 'Curated Destinations',
    pillars_metric_pkg: 'Curated Packages',
    pillars_metric_trans: 'Price Transparency',
    pillars_metric_support: '24/7 Dedicated Support',
    pillars_cta_consult: 'Plan Your Vacation',
    pillars_cta_ai: 'AI Trip Assistant',

    // Gallery
    gallery_badge: 'Real Moments',
    gallery_title: 'Authentic Travel Documentation',
    gallery_subtitle: 'Unfiltered photographic highlights from travelers discovering the breathtaking scenery of the Indonesian archipelago with us.',
    gallery_view_all: 'View Full Gallery',

    // Testimonials
    testi_badge: 'Traveler Stories',
    testi_title: 'Unforgettable Memories',
    testi_subtitle: 'Genuine words from explorers who placed their cherished holiday milestones in our dedicated care.',
    testi_verified: 'Verified Traveler',

    // FAQ
    faq_badge: 'Frequently Asked Questions',
    faq_title: 'Answers to Common Inquiries',
    faq_subtitle: 'Essential details and preparation insights before booking your private journey with FADZA TRIP ADVENTURE.',

    // CTA
    cta_badge: 'Your Next Vacation',
    cta_title_1: 'Know Where You Want to Go?',
    cta_title_2: 'Let Us Perfect Every Detail.',
    cta_subtitle: 'Consult your dates, group preferences, and budget with our travel concierge. We design bespoke itineraries with zero hassle.',
    cta_whatsapp: 'Consult on WhatsApp',
    cta_ai: 'Ask AI Trip Concierge',

    // Footer
    footer_tagline: 'Explore Indonesia through journeys crafted to be lasting life experiences, not just destinations.',
    footer_nav_title: 'Main Navigation',
    footer_dest_title: 'Top Destinations',
    footer_contact_title: 'Contact & Support',
    footer_explore_packages: 'Browse Packages',
    footer_contact_fadza: 'Contact FADZA',
    footer_copyright: 'All rights reserved.',
    footer_hours: 'Every Day: 08:00 - 22:00 WIB',
    footer_terms: 'Terms & Conditions',
    footer_privacy: 'Privacy Policy',
    footer_faq: 'FAQ & Help'
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem('fadza_lang');
      return saved === 'en' ? 'en' : 'id';
    } catch (e) {
      return 'id';
    }
  });

  const setLanguage = (lang) => {
    const validLang = lang === 'en' ? 'en' : 'id';
    setLanguageState(validLang);
    try {
      localStorage.setItem('fadza_lang', validLang);
    } catch (e) {}
  };

  const toggleLanguage = () => {
    setLanguage(language === 'id' ? 'en' : 'id');
  };

  const t = (key, fallback = '') => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS.id;
    return dict[key] || fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Fallback safe context if used outside provider
    return {
      language: 'id',
      setLanguage: () => {},
      toggleLanguage: () => {},
      t: (key, fallback) => (TRANSLATIONS.id[key] || fallback || key)
    };
  }
  return context;
}
