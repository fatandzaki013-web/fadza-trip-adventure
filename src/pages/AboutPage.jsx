import React from 'react';
import { BRAND_INFO, DESTINATIONS } from '../data/travelData';
import { ASSET_IMAGES } from '../data/images';
import { getGeneralWhatsAppLink } from '../utils/whatsapp';
import ImageWithFallback from '../components/ImageWithFallback';
import WhatsAppIcon from '../components/WhatsAppIcon';
import {
  Compass,
  ShieldCheck,
  FileCheck,
  Headphones,
  Users,
  Camera,
  MapPin,
  Clock,
  ArrowRight,
  Phone,
  Mail,
  HeartHandshake,
  CheckCircle2,
  CalendarCheck,
  Sailboat
} from 'lucide-react';

export default function AboutPage({ onNavigate, onSelectDestination }) {
  const steps = [
    {
      num: '01',
      title: 'Eksplorasi (Explore)',
      desc: 'Jelajahi 16 destinasi pilihan di seluruh penjuru Nusantara sesuai selera dan suasana impian Anda.',
      color: '#0284C7'
    },
    {
      num: '02',
      title: 'Pilih Paket (Choose)',
      desc: 'Tentukan paket open trip atau private tour dengan durasi dan fasilitas yang paling tepat untuk Anda.',
      color: '#C85A32'
    },
    {
      num: '03',
      title: 'Pahami Detail (Understand)',
      desc: 'Pelajari itinerary transparan harian, rincian fasilitas termasuk, dan tips persiapan perjalanan.',
      color: '#15803D'
    },
    {
      num: '04',
      title: 'Konsultasi (Consult)',
      desc: 'Diskusikan kustomisasi jadwal, preferensi kamar, atau penjemputan bandara langsung via WhatsApp.',
      color: '#D97706'
    },
    {
      num: '05',
      title: 'Reservasi & Berangkat (Book)',
      desc: 'Konfirmasi pemesanan dengan mudah dan aman, lalu nikmati perjalanan tanpa rasa cemas.',
      color: '#7C3AED'
    }
  ];

  const values = [
    {
      icon: ShieldCheck,
      color: '#DFFF00',
      title: 'Keamanan & Kesiapsiagaan',
      desc: 'Standar keselamatan nomor satu dengan armada terawat, kapal berizin resmi, perlengkapan pelampung standar internasional, dan proteksi asuransi perjalanan.'
    },
    {
      icon: FileCheck,
      color: '#38BDF8',
      title: 'Transparansi Biaya',
      desc: 'Tidak ada biaya tersembunyi. Rincian fasilitas, tiket taman nasional, penginapan, dan transportasi dipaparkan terbuka sejak awal konsultasi.'
    },
    {
      icon: Sailboat,
      color: '#FB923C',
      title: 'Standar Kenyamanan Prima',
      desc: 'Kurasi hotel bersih berbintang, kapal phinisi premium dengan kabin ber-AC, serta kendaraan transportasi privat yang nyaman dan higienis.'
    },
    {
      icon: HeartHandshake,
      color: '#4ADE80',
      title: 'Kearifan & Dampak Positif Lokal',
      desc: 'Bekerja sama erat dengan ranger taman nasional, kapten perahu lokal, dan komunitas pemandu setempat untuk mendukung pariwisata berkelanjutan.'
    },
    {
      icon: Users,
      color: '#C084FC',
      title: 'Personalisasi & Fleksibilitas',
      desc: 'Setiap rombongan memiliki keunikan ritme. Kami menyediakan opsi private trip yang dapat disesuaikan dengan tempo dan minat keluarga Anda.'
    },
    {
      icon: Headphones,
      color: '#FBBF24',
      title: 'Layanan Concierge Responsif',
      desc: 'Tim travel concierge siap mendampingi kebutuhan informasi dan koordinasi perjalanan Anda setiap hari pukul 08:00 hingga 22:00 WITA.'
    }
  ];

  const services = [
    {
      title: 'Paket Wisata Nusantara',
      desc: 'Pilihan Open Trip terjadwal dan Private Trip eksklusif ke destinasi laut, pegunungan, dan budaya unggulan Indonesia.',
      color: '#0284C7'
    },
    {
      title: 'Kurasi Rute & Destinasi',
      desc: 'Penataan alur rute wisata yang efisien agar waktu di lokasi tidak habis terbuang di jalan.',
      color: '#C85A32'
    },
    {
      title: 'Itinerary Harian Transparan',
      desc: 'Panduan lengkap jam per jam, titik temu bandara, aktivitas eksplorasi, hingga rekomendasi kuliner autentik.',
      color: '#15803D'
    },
    {
      title: 'Konsultasi Perjalanan Pribadi',
      desc: 'Bantuan perencanaan perjalanan tanpa biaya konsultasi melalui WhatsApp resmi dan AI Concierge FADZA.',
      color: '#D97706'
    },
    {
      title: 'Pendampingan Pemandu Berlisensi',
      desc: 'Tour guide dan ranger lokal berpengalaman yang ramah, informatif, dan menguasai keselamatan lapangan.',
      color: '#7C3AED'
    },
    {
      title: 'Dokumentasi Momen Liburan',
      desc: 'Penyediaan dokumentasi foto dan video berkualitas untuk mengabadikan setiap kenangan berharga perjalanan Anda.',
      color: '#0D9488'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAFAF5', paddingTop: '80px', paddingBottom: '0' }}>
      {/* =========================================================================
          A. HERO SECTION
          Editorial photography, short statement, dual CTAs
          ========================================================================= */}
      <section
        style={{
          position: 'relative',
          backgroundColor: '#101C2C',
          padding: ' clamp(4rem, 8vw, 6.5rem) 0 clamp(3.5rem, 6vw, 5rem) 0',
          color: '#FFFFFF',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'absolute', inset: 0, opacity: 0.28, pointerEvents: 'none' }}>
          <ImageWithFallback
            src={ASSET_IMAGES.backgrounds.hero}
            fallbackSrc={ASSET_IMAGES.destinations.rajaAmpat.primary}
            alt="Lanskap Bahari FADZA TRIP ADVENTURE"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }}
          />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 5 }}>
          <div style={{ maxWidth: '820px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                backgroundColor: 'rgba(223, 255, 0, 0.15)',
                border: '1px solid rgba(223, 255, 0, 0.35)',
                color: '#DFFF00',
                padding: '0.35rem 0.9rem',
                borderRadius: '9999px',
                fontSize: '0.78rem',
                fontWeight: '700',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '1.25rem'
              }}
            >
              <Compass size={14} color="#DFFF00" />
              <span>About FADZA TRIP ADVENTURE</span>
            </div>

            <h1
              className="text-editorial-hero"
              style={{
                color: '#FFFFFF',
                margin: '0 0 1.25rem 0'
              }}
            >
              Membuka Gerbang Petualangan <br />
              <span style={{ color: '#DFFF00' }}>Terbaik di Nusantara</span>
            </h1>

            <p style={{ color: '#CBD5E1', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '720px' }}>
              FADZA TRIP ADVENTURE lahir dari visi menghadirkan pengalaman perjalanan yang dirancang secara cermat, transparan, dan berkesan. Kami percaya liburan terbaik adalah kombinasi antara keindahan alam sejati, kenyamanan prima, dan ketenangan pikiran.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem' }}>
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('packages')}
                className="btn-lime"
                style={{ borderRadius: '12px' }}
              >
                <span>Jelajahi Paket Wisata</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                onClick={() => onNavigate && onNavigate('contact')}
                className="btn-secondary"
                style={{ borderRadius: '12px' }}
              >
                <Phone size={16} />
                <span>Hubungi Kami</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          B. BRAND STORY (Storytelling with Visual Composition)
          ========================================================================= */}
      <section style={{ padding: 'clamp(4rem, 6vw, 6rem) 0', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E7E2' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
              gap: 'clamp(2.5rem, 5vw, 4.5rem)',
              alignItems: 'center'
            }}
          >
            {/* Story Text */}
            <div>
              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: '800',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#B86B4B',
                  backgroundColor: 'rgba(184, 107, 75, 0.12)',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '9999px',
                  display: 'inline-block',
                  marginBottom: '1rem'
                }}
              >
                Kisah & Filosofi Kami
              </span>

              <h2
                className="text-editorial-title"
                style={{ color: '#101C2C', margin: '0 0 1.25rem 0' }}
              >
                Dari Penikmat Alam untuk Para Penjelajah Sejati
              </h2>

              <p style={{ color: '#55616D', fontSize: '1rem', lineHeight: 1.75, marginBottom: '1.25rem' }}>
                Perjalanan ke pelosok Nusantara bukan sekadar menempuh jarak atau berfoto di depan pemandangan indah. Ini adalah tentang menghirup udara segar savana di pagi buta, merasakan hangatnya sambutan warga pulau, serta menenangkan pikiran dari kepenatan rutinitas.
              </p>

              <p style={{ color: '#55616D', fontSize: '1rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                Namun, kami sering menemukan traveler yang merasa lelah karena itinerary yang terburu-buru, biaya tersembunyi yang tidak dijelaskan di awal, atau fasilitas yang tidak sesuai ekspektasi. FADZA TRIP ADVENTURE didirikan untuk menjadi jawaban atas kegelisahan tersebut: sebuah biro perjalanan yang mengutamakan kejujuran informasi, kenyamanan transportasi dan hotel, serta penghormatan mendalam terhadap alam dan budaya setempat.
              </p>

              <div
                style={{
                  padding: '1.25rem 1.5rem',
                  backgroundColor: '#FAFAF5',
                  borderLeft: '4px solid #C9A45C',
                  borderRadius: '0 12px 12px 0',
                  color: '#101C2C',
                  fontStyle: 'italic',
                  fontSize: '0.98rem',
                  lineHeight: 1.6
                }}
              >
                “Bagi kami, perjalanan yang sukses bukan yang terburu-buru mengunjungi puluhan titik, melainkan yang meninggalkan kenangan berharga dan rasa damai di hati setiap tamu.”
              </div>
            </div>

            {/* Story Visual Frame */}
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 14px 40px rgba(16, 28, 44, 0.1)',
                  height: '460px',
                  position: 'relative'
                }}
              >
                <ImageWithFallback
                  src={ASSET_IMAGES.backgrounds.experience}
                  fallbackSrc={ASSET_IMAGES.destinations.bali.primary}
                  alt="Suasana Perjalanan FADZA"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(16, 28, 44, 0.8) 0%, transparent 60%)'
                  }}
                />
                <div style={{ position: 'absolute', bottom: '1.75rem', left: '1.75rem', right: '1.75rem', color: '#FFFFFF' }}>
                  <span className="badge-gold" style={{ marginBottom: '0.5rem' }}>
                    Standar Pengalaman
                  </span>
                  <div style={{ fontSize: '1.25rem', fontWeight: '800', lineHeight: 1.3 }}>
                    Eksplorasi yang Dirancang dengan Rasa & Ketulusan
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          C. WHAT WE DO (Layanan Utama Terverifikasi)
          ========================================================================= */}
      <section style={{ padding: 'clamp(4rem, 6vw, 5.5rem) 0', backgroundColor: '#FAFAF5' }}>
        <div className="container">
          <div style={{ maxWidth: '680px', marginBottom: '3rem' }}>
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: '800',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#C9A45C',
                backgroundColor: 'rgba(201, 164, 92, 0.14)',
                padding: '0.3rem 0.8rem',
                borderRadius: '9999px',
                display: 'inline-block',
                marginBottom: '0.85rem'
              }}
            >
              Layanan & Keahlian
            </span>

            <h2 className="text-editorial-title" style={{ color: '#101C2C', margin: '0 0 0.75rem 0' }}>
              Apa yang Kami Hadirkan untuk Anda
            </h2>

            <p style={{ color: '#68717C', fontSize: '1rem', lineHeight: 1.65, margin: 0 }}>
              Dari perencanaan rute hingga kepulangan, seluruh aspek perjalanan ditangani secara profesional dan terstruktur.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
              gap: '1.5rem'
            }}
          >
            {services.map((svc, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '18px',
                  padding: '1.75rem',
                  border: '1px solid #E5E7E2',
                  boxShadow: '0 4px 16px rgba(16, 28, 44, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: '800',
                      color: svc.color,
                      backgroundColor: `${svc.color}18`,
                      border: `1px solid ${svc.color}35`,
                      padding: '0.2rem 0.6rem',
                      borderRadius: '6px'
                    }}
                  >
                    0{idx + 1}
                  </span>
                  <CheckCircle2 size={18} color={svc.color} />
                </div>

                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#101C2C', margin: 0 }}>
                  {svc.title}
                </h3>

                <p style={{ color: '#68717C', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                  {svc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          D. OUR VALUES (Nilai Inti Layanan — Balanced 3x2 Grid)
          ========================================================================= */}
      <section style={{ padding: 'clamp(4.5rem, 6vw, 6rem) 0', backgroundColor: '#101C2C', color: '#FFFFFF' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: '800',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#DFFF00',
                backgroundColor: 'rgba(223, 255, 0, 0.15)',
                padding: '0.3rem 0.85rem',
                borderRadius: '9999px',
                display: 'inline-block',
                marginBottom: '1rem'
              }}
            >
              Komitmen FADZA
            </span>

            <h2 className="text-editorial-title" style={{ color: '#FFFFFF', margin: '0 0 1rem 0' }}>
              Enam Nilai Utama Perjalanan Kami
            </h2>

            <p style={{ color: '#CBD5E1', fontSize: '1rem', lineHeight: 1.65, margin: 0 }}>
              Prinsip yang kami pegang teguh di setiap paket perjalanan untuk memberikan kenyamanan, keamanan, dan kepuasan sejati.
            </p>
          </div>

          <div className="grid-editorial-destinations">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#16263A',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderTop: `4px solid ${val.color}`,
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
                    borderRadius: '20px',
                    padding: '1.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.85rem',
                    transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1)'
                  }}
                  className="hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      backgroundColor: `${val.color}15`,
                      border: `1.5px solid ${val.color}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: val.color,
                      flexShrink: 0
                    }}
                  >
                    <Icon size={22} />
                  </div>

                  <h3 style={{ color: '#FFFFFF', fontSize: '1.12rem', fontWeight: '800', margin: 0 }}>
                    {val.title}
                  </h3>

                  <p style={{ color: '#94A3B8', fontSize: '0.88rem', lineHeight: 1.65, margin: 0 }}>
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          E. HOW FADZA WORKS (5-Step Visual Stepper / Timeline)
          ========================================================================= */}
      <section style={{ padding: 'clamp(4.5rem, 6vw, 6rem) 0', backgroundColor: '#FAFAF5', borderBottom: '1px solid #E5E7E2' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3.5rem auto' }}>
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: '800',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#B86B4B',
                backgroundColor: 'rgba(184, 107, 75, 0.12)',
                padding: '0.3rem 0.85rem',
                borderRadius: '9999px',
                display: 'inline-block',
                marginBottom: '1rem'
              }}
            >
              Proses Pemesanan
            </span>

            <h2 className="text-editorial-title" style={{ color: '#101C2C', margin: '0 0 1rem 0' }}>
              Bagaimana FADZA Bekerja
            </h2>

            <p style={{ color: '#68717C', fontSize: '1rem', lineHeight: 1.65, margin: 0 }}>
              Lima langkah sederhana untuk merencanakan liburan impian Anda bersama FADZA TRIP ADVENTURE.
            </p>
          </div>

          {/* Stepper Grid (Horizontal on Desktop, Vertical on Mobile) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
              gap: '1.25rem',
              position: 'relative'
            }}
          >
            {steps.map((st, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '18px',
                  padding: '1.5rem',
                  border: '1px solid #E5E7E2',
                  borderTop: `4px solid ${st.color}`,
                  boxShadow: '0 4px 14px rgba(16, 28, 44, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.65rem',
                  transition: 'transform 0.2s ease'
                }}
                className="hover:-translate-y-1"
              >
                <div
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: '800',
                    color: st.color,
                    lineHeight: 1
                  }}
                >
                  {st.num}
                </div>

                <h3 style={{ fontSize: '0.98rem', fontWeight: '800', color: '#101C2C', margin: 0, lineHeight: 1.3 }}>
                  {st.title}
                </h3>

                <p style={{ fontSize: '0.82rem', color: '#68717C', lineHeight: 1.55, margin: 0 }}>
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          F. WHY TRAVEL WITH FADZA (Verified Facts & Visual Overview)
          ========================================================================= */}
      <section style={{ padding: 'clamp(4.5rem, 6vw, 6rem) 0', backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
              gap: 'clamp(2.5rem, 5vw, 4.5rem)',
              alignItems: 'center'
            }}
          >
            {/* Visual Mosaic */}
            <div
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 12px 36px rgba(16, 28, 44, 0.08)',
                height: '420px',
                position: 'relative'
              }}
            >
              <ImageWithFallback
                src={ASSET_IMAGES.destinations.labuanBajo.primary}
                fallbackSrc={ASSET_IMAGES.backgrounds.hero}
                alt="Kapal Phinisi FADZA di Labuan Bajo"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(16, 28, 44, 0.75) 0%, transparent 60%)'
                }}
              />
              <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem', color: '#FFFFFF' }}>
                <span className="badge-terracotta" style={{ marginBottom: '0.4rem', color: '#FFFFFF', backgroundColor: '#B86B4B' }}>
                  Petualangan Bahari
                </span>
                <div style={{ fontSize: '1.15rem', fontWeight: '800' }}>
                  Pelayaran Phinisi & Pesona Taman Nasional Komodo
                </div>
              </div>
            </div>

            {/* Content & Genuine Metrics */}
            <div>
              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: '800',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#C9A45C',
                  backgroundColor: 'rgba(201, 164, 92, 0.14)',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '9999px',
                  display: 'inline-block',
                  marginBottom: '1rem'
                }}
              >
                Standar Kualitas
              </span>

              <h2 className="text-editorial-title" style={{ color: '#101C2C', margin: '0 0 1.25rem 0' }}>
                Mengapa Mempercayakan Liburan Bersama FADZA
              </h2>

              <p style={{ color: '#55616D', fontSize: '0.98rem', lineHeight: 1.7, marginBottom: '1.75rem' }}>
                Kami tidak mengklaim menjadi yang terbesar, namun kami berkomitmen menjadi yang paling jujur, teliti, dan peduli terhadap kenyamanan setiap tamu. Setiap hotel dan armada yang kami rekomendasikan telah melewati standar inspeksi kebersihan dan kelayakan.
              </p>

              {/* Genuine Metrics (Based on real catalog data) */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '1.25rem',
                  padding: '1.5rem',
                  backgroundColor: '#FAFAF5',
                  borderRadius: '16px',
                  border: '1px solid #E5E7E2',
                  marginBottom: '2rem'
                }}
              >
                <div>
                  <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#101C2C', lineHeight: 1 }}>16</div>
                  <div style={{ fontSize: '0.82rem', color: '#68717C', marginTop: '0.35rem', fontWeight: '600' }}>
                    Destinasi Terkurasi di Nusantara
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#B86B4B', lineHeight: 1 }}>16</div>
                  <div style={{ fontSize: '0.82rem', color: '#68717C', marginTop: '0.35rem', fontWeight: '600' }}>
                    Paket Wisata Siap Reservasi
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#C9A45C', lineHeight: 1 }}>100%</div>
                  <div style={{ fontSize: '0.82rem', color: '#68717C', marginTop: '0.35rem', fontWeight: '600' }}>
                    Transparansi & Tanpa Biaya Tersembunyi
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#101C2C', lineHeight: 1 }}>24/7</div>
                  <div style={{ fontSize: '0.82rem', color: '#68717C', marginTop: '0.35rem', fontWeight: '600' }}>
                    Dukungan Concierge WhatsApp & AI
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
                <a
                  href={getGeneralWhatsAppLink('Halo FADZA TRIP ADVENTURE, saya ingin konsultasi paket wisata.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-lime"
                  style={{ textDecoration: 'none', borderRadius: '12px' }}
                >
                  <WhatsAppIcon size={16} />
                  <span>Konsultasi WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          G. DESTINATION COVERAGE (Real 16 Destinations from System Data)
          ========================================================================= */}
      <section style={{ padding: 'clamp(4.5rem, 6vw, 6rem) 0', backgroundColor: '#F0F2EB', borderTop: '1px solid #E5E7E2' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '1rem',
              marginBottom: '2.5rem'
            }}
          >
            <div>
              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: '800',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#101C2C',
                  backgroundColor: '#E5E7E2',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '9999px',
                  display: 'inline-block',
                  marginBottom: '0.75rem'
                }}
              >
                Cakupan Destinasi
              </span>

              <h2 className="text-editorial-title" style={{ color: '#101C2C', margin: '0 0 0.5rem 0' }}>
                16 Sudut Keindahan Indonesia yang Kami Layani
              </h2>

              <p style={{ color: '#68717C', fontSize: '0.95rem', margin: 0 }}>
                Eksplorasi yang terbentang dari kepulauan barat Sumatera hingga perairan timur Papua.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate && onNavigate('explore')}
              className="btn-outline-dark"
              style={{ borderRadius: '12px', padding: '0.65rem 1.4rem' }}
            >
              <span>Lihat Detail Semua Destinasi</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* 4-column balanced grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
              gap: '1.25rem'
            }}
          >
            {DESTINATIONS.slice(0, 8).map((dest) => (
              <div
                key={dest.id}
                onClick={() => onSelectDestination ? onSelectDestination(dest) : (onNavigate && onNavigate('packages'))}
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7E2',
                  boxShadow: '0 4px 14px rgba(16, 28, 44, 0.05)',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                className="hover:-translate-y-1 hover:shadow-lg"
              >
                <div style={{ height: '160px', position: 'relative', overflow: 'hidden' }}>
                  <ImageWithFallback
                    src={dest.image}
                    fallbackSrc={dest.fallbackImage}
                    alt={dest.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '0.65rem',
                      left: '0.65rem',
                      backgroundColor: 'rgba(16, 28, 44, 0.85)',
                      color: '#FFFFFF',
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      padding: '0.25rem 0.6rem',
                      borderRadius: '6px'
                    }}
                  >
                    {dest.region}
                  </div>
                </div>

                <div style={{ padding: '1rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#101C2C', margin: '0 0 0.25rem 0' }}>
                    {dest.name}
                  </h4>
                  <div style={{ fontSize: '0.78rem', color: '#68717C', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <MapPin size={12} color="#B86B4B" />
                    <span>{dest.province}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          H & I. TRUST, CONTACT & OPERATIONAL INFORMATION
          ========================================================================= */}
      <section style={{ padding: 'clamp(4.5rem, 6vw, 6rem) 0', backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
              gap: 'clamp(2rem, 5vw, 4rem)',
              backgroundColor: '#FAFAF5',
              border: '1px solid #E5E7E2',
              borderRadius: '24px',
              padding: 'clamp(2rem, 4vw, 3.5rem)'
            }}
          >
            <div>
              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: '800',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#101C2C',
                  backgroundColor: '#E5E7E2',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '9999px',
                  display: 'inline-block',
                  marginBottom: '1rem'
                }}
              >
                Informasi Resmi
              </span>

              <h2 className="text-editorial-title" style={{ color: '#101C2C', margin: '0 0 1rem 0' }}>
                Layanan Pelanggan & Komunikasi Resmi
              </h2>

              <p style={{ color: '#68717C', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '2rem' }}>
                Kami siap membantu menjawab segala pertanyaan Anda terkait ketersediaan jadwal, pilihan paket privat, hingga konsultasi rute khusus keluarga.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      backgroundColor: '#101C2C',
                      color: '#DFFF00',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: '600' }}>Basis Operasional</div>
                    <div style={{ fontSize: '0.95rem', color: '#101C2C', fontWeight: '700' }}>{BRAND_INFO.address}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      backgroundColor: '#101C2C',
                      color: '#C9A45C',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Clock size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: '600' }}>Jam Operasional Concierge</div>
                    <div style={{ fontSize: '0.95rem', color: '#101C2C', fontWeight: '700' }}>{BRAND_INFO.hours}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      backgroundColor: '#101C2C',
                      color: '#25D366',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <WhatsAppIcon size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: '600' }}>WhatsApp Hotline Resmi</div>
                    <a
                      href={getGeneralWhatsAppLink('Halo FADZA TRIP ADVENTURE, saya ingin tanya informasi paket.')}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '0.95rem', color: '#101C2C', fontWeight: '700', textDecoration: 'none' }}
                      className="hover:text-[#25D366]"
                    >
                      +62 858-8815-9765
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      backgroundColor: '#101C2C',
                      color: '#B86B4B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Mail size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: '600' }}>Email Korespondensi</div>
                    <a
                      href={`mailto:${BRAND_INFO.email}`}
                      style={{ fontSize: '0.95rem', color: '#101C2C', fontWeight: '700', textDecoration: 'none' }}
                      className="hover:text-[#B86B4B]"
                    >
                      {BRAND_INFO.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Assurance Card */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                padding: '2rem',
                border: '1px solid #E5E7E2',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '1.25rem'
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(201, 164, 92, 0.14)',
                  color: '#C9A45C',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ShieldCheck size={26} />
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#101C2C', margin: 0 }}>
                Jaminan Ketenangan Berwisata
              </h3>

              <p style={{ color: '#68717C', fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}>
                Setiap pemesanan dikonfirmasi secara tertulis dengan tanda terima resmi, kontak darurat tour leader lapangan, dan panduan persiapan trip yang komprehensif.
              </p>

              <div style={{ paddingTop: '0.75rem', borderTop: '1px solid #F0F2EB' }}>
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('contact')}
                  className="btn-lime"
                  style={{ width: '100%', borderRadius: '12px' }}
                >
                  <Phone size={16} />
                  <span>Kunjungi Halaman Kontak</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          J. FINAL CTA SECTION
          ========================================================================= */}
      <section
        style={{
          position: 'relative',
          backgroundColor: '#101C2C',
          padding: 'clamp(5rem, 8vw, 7rem) 0',
          color: '#FFFFFF',
          textAlign: 'center',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'absolute', inset: 0, opacity: 0.22, pointerEvents: 'none' }}>
          <ImageWithFallback
            src={ASSET_IMAGES.backgrounds.hero}
            fallbackSrc={ASSET_IMAGES.destinations.rajaAmpat.primary}
            alt="Lanskap FADZA"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 5, maxWidth: '720px', margin: '0 auto' }}>
          <span
            style={{
              fontSize: '0.78rem',
              fontWeight: '800',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#DFFF00',
              backgroundColor: 'rgba(223, 255, 0, 0.15)',
              padding: '0.35rem 0.85rem',
              borderRadius: '9999px',
              display: 'inline-block',
              marginBottom: '1.25rem'
            }}
          >
            Mulai Cerita Anda
          </span>

          <h2
            className="text-editorial-hero"
            style={{ color: '#FFFFFF', margin: '0 0 1.25rem 0' }}
          >
            Siap Menentukan Perjalanan Anda?
          </h2>

          <p style={{ color: '#CBD5E1', fontSize: '1.05rem', lineHeight: 1.65, marginBottom: '2.5rem' }}>
            Konsultasikan rencana liburan Anda bersama tim FADZA TRIP ADVENTURE. Kami siap membantu merancang perjalanan yang paling berkesan untuk Anda dan orang-orang terkasih.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('packages')}
              className="btn-lime"
              style={{ padding: '0.85rem 2rem', fontSize: '0.95rem', borderRadius: '12px' }}
            >
              <span>Jelajahi Paket</span>
              <ArrowRight size={16} />
            </button>

            <a
              href={getGeneralWhatsAppLink('Halo FADZA TRIP ADVENTURE, saya siap merencanakan liburan.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
              style={{ padding: '0.85rem 2rem', fontSize: '0.95rem', borderRadius: '12px', textDecoration: 'none' }}
            >
              <WhatsAppIcon size={16} />
              <span>Hubungi FADZA via WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
