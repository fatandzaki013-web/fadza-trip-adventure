# FADZA TRAVEL — "Temukan Perjalananmu."

Website platform discovery dan kurasi paket wisata nusantara yang modern, premium, dan competition-ready.

## 🌟 Identitas Brand & Desain

- **Brand:** FADZA TRAVEL
- **Tagline:** *"Temukan Perjalananmu."*
- **Arah Visual:** Cinematic Travel + Premium Dark + Editorial Typography + Subtle Glassmorphism + Fotografi Alam Nusantara
- **Tipografi:** 
  - Heading: `DM Serif Display` (Editorial & Anggun)
  - Body & UI: `Manrope` (Modern, Bersih, Ergonomis)
- **Sistem Warna:**
  - Deep Ocean Navy (`#071B24`) — Warna Primer
  - Dark Teal (`#0D3035`) — Warna Sekunder
  - Aqua / Mint (`#55DCC7`) — Aksen Interaktif & CTA
  - Warm Off White (`#F5F3ED`) & Light Slate — Kontras Teks Bersih
- **Kontak Resmi WhatsApp:** `085888159765` (International: `6285888159765`)

---

## 🧭 Struktur Halaman & Fitur Unggulan

1. **Home (`#home`):**
   - Cinematic Hero dengan visual dramatis gugusan pulau samudra
   - Floating *Trip Finder* (Destinasi, Gaya Liburan, Durasi, Estimasi Budget)
   - Trust Metrics & Value Guarantee Strip (500+ Destinasi, 12K+ Wisatawan, 4.9 Rating)
   - Jelajahi Destinasi Pilihan (Bali, Labuan Bajo, Raja Ampat, Lombok, Yogyakarta, Bromo)
   - Paket Pilihan Untukmu dengan filter chips cepat
   - Fitur "Kenapa FADZA?": Harga Transparan, Kurasi Eksklusif, Pendampingan 24/7, Booking Mudah
   - Section Editorial *"More Than A Destination"*
   - Galeri Visual & Cuplikan Momen
   - Cerita Wisatawan (Testimoni terkurasi dengan label sampel)
   - Accordion Tanya Jawab (FAQ) Interaktif
   - Final CTA & Tombol WhatsApp Dinamis

2. **Explore (`#explore`):**
   - Discovery Hub pintar untuk pelancong yang belum menentukan pilihan
   - Multi-filter pencarian: Search input teks, Destinasi, Gaya Liburan, Durasi, dan Anggaran
   - Toggle tampilan antara Paket Wisata dan Destinasi

3. **Paket Wisata (`#packages`):**
   - Katalog paket wisata lengkap dengan kartu informatif
   - Filter cepat berdasarkan destinasi, durasi, gaya liburan
   - Fitur pengurutan: Paling Populer, Harga Terendah, Harga Tertinggi, Durasi

4. **Detail Paket (`#package-[id]`):**
   - Format panduan wisata mini (*Mini Travel Guide*)
   - Hero banner dengan highlight durasi, destinasi, dan harga per orang
   - Rincian *Overview* dan Highlight Pengalaman
   - Rencana Perjalanan (*Day-by-Day Itinerary*) dengan tab interaktif, timeline jam, aktivitas, menu makan, dan akomodasi
   - Komparasi *Sudah Termasuk* vs *Tidak Termasuk* yang sangat transparan
   - Galeri foto paket terhubung dengan Lightbox modal
   - Kalkulator Peserta & Estimasi Total Otomatis
   - Tombol Booking WhatsApp dengan pesan dinamis:
     `"Halo FADZA Travel, saya tertarik dengan paket [NAMA PAKET]. Saya ingin mendapatkan informasi lebih lanjut mengenai paket ini."`

5. **Tentang Kami (`#about`):**
   - Kisah FADZA TRAVEL, Prinsip Layanan, Komitmen Pariwisata Berkelanjutan
   - Transparansi representasi produk demo tanpa klaim fiktif

6. **Galeri (`#gallery`):**
   - Filter tab destinasi (Semua, Bali, Labuan Bajo, Raja Ampat, Lombok, Yogyakarta, Bromo)
   - Grid masonry editorial dengan efek hover halus
   - Fullscreen Lightbox viewer dengan navigasi keyboard (`ArrowLeft`, `ArrowRight`, `Esc`)

7. **Cerita & Tips (`#stories`):**
   - Artikel panduan wisata edukatif dengan modal pembaca lengkap
   - Cerita pengalaman liburan wisatawan

8. **Kontak (`#contact`):**
   - Informasi lengkap: WhatsApp `085888159765`, Email, Instagram, Alamat Kantor, Jam Operasional
   - Formulir Rencana Perjalanan Interaktif yang langsung merangkai pesan WhatsApp dan membukanya otomatis

---

## 🚀 Cara Menjalankan Project

Masuk ke direktori project:
```bash
cd /data/data/com.termux/files/home/.gemini/antigravity-cli/scratch/fadza-travel
```

### Menjalankan Server Produksi Lokal:
```bash
node server.js
```
Aplikasi akan aktif di `http://localhost:3000` (atau port yang disesuaikan).

### Melakukan Build Ulang:
```bash
node ./node_modules/vite/bin/vite.js build
```

---

## 📱 Aksesibilitas & Responsivitas

- Responsif penuh di Desktop (1440px/1280px), Tablet (1024px/768px), dan Smartphone (430px - 375px).
- Tidak ada horizontal overflow (*zero layout shift*).
- Tombol touch-friendly dengan ukuran target di atas 44px.
- Mendukung `prefers-reduced-motion` untuk kenyamanan visual semua pengguna.
