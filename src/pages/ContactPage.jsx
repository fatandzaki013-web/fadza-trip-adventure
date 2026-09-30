import React, { useState } from 'react';
import { BRAND_INFO, DESTINATIONS, PACKAGES } from '../data/travelData';
import { ASSET_IMAGES } from '../data/images';
import ImageWithFallback from '../components/ImageWithFallback';
import WhatsAppIcon from '../components/WhatsAppIcon';
import ModernSelect from '../components/ModernSelect';
import { getGeneralWhatsAppLink } from '../utils/whatsapp';
import {
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Users,
  Compass,
  ShieldCheck,
  Calendar,
  ChevronDown,
  Phone,
  RotateCcw
} from 'lucide-react';

const CONTACT_DESTINATIONS = [
  { value: 'all', label: 'Belum Menentukan (Rekomendasi Konsultan)' },
  ...DESTINATIONS.map((d) => ({
    value: d.name,
    label: d.name
  }))
];

const PACKAGE_OPTIONS = [
  { value: 'custom', label: 'Rute Khusus / Custom Itinerary (Bebas Pilih)' },
  ...PACKAGES.map((p) => ({
    value: p.name,
    label: `${p.name} (${p.duration})`
  }))
];

const CONTACT_FAQS = [
  {
    q: 'Berapa lama estimasi respons pesan konsultasi FADZA?',
    a: 'Tim konsultan kami aktif setiap hari pukul 08.00 – 22.00 WIB dan biasanya merespons dalam waktu 10 hingga 25 menit. Di luar jam operasional, pesan Anda menjadi prioritas utama pada pagi berikutnya.'
  },
  {
    q: 'Apakah ada biaya untuk konsultasi dan pembuatan draft itinerary?',
    a: 'Konsultasi dan penyusunan proposal awal 100% Bebas Biaya (Gratis). Anda bebas mendiskusikan rute, menanyakan musim terbaik, dan menyesuaikan preferensi sebelum melakukan booking.'
  },
  {
    q: 'Bisakah mengajukan tanggal keberangkatan sendiri di luar jadwal reguler?',
    a: 'Tentu bisa. Untuk format Private Trip, tanggal keberangkatan, durasi hari, dan titik penjemputan sepenuhnya fleksibel disesuaikan dengan agenda liburan Anda.'
  },
  {
    q: 'Bagaimana prosedur konfirmasi dan pembayaran paket wisata?',
    a: 'Reservasi resmi dikonfirmasi dengan DP 30% setelah proposal itinerary disepakati bersama. Pelunasan dilakukan H-7 keberangkatan melalui rekening resmi perusahaan dengan tanda terima dan voucher digital bergaransi.'
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: 'Bali',
    packageChoice: 'custom',
    date: '',
    travelers: '2',
    note: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [inquiryId, setInquiryId] = useState('');
  const [activeFaq, setActiveFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const generatedId = `FTA-INQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setInquiryId(generatedId);
    setSubmitted(true);
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  const getCustomWaUrl = () => {
    let msg = `Halo FADZA TRIP ADVENTURE, saya telah mengajukan konsultasi rencana perjalanan.\n\n`;
    msg += `• Nama: ${formData.name}\n`;
    if (formData.email) msg += `• Email: ${formData.email}\n`;
    if (formData.phone) msg += `• WhatsApp: ${formData.phone}\n`;
    msg += `• Destinasi: ${formData.destination}\n`;
    msg += `• Pilihan Paket: ${formData.packageChoice === 'custom' ? 'Custom Itinerary' : formData.packageChoice}\n`;
    if (formData.date) msg += `• Perkiraan Tanggal: ${formData.date}\n`;
    msg += `• Jumlah Peserta: ${formData.travelers} orang\n`;
    if (formData.note) msg += `• Catatan/Pesan: ${formData.note}\n`;
    msg += `\nMohon konfirmasi ketersediaan dan detail proposal perjalanan. Terima kasih!`;

    return `https://wa.me/6285888159765?text=${encodeURIComponent(msg)}`;
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAFAF5', paddingTop: '80px', paddingBottom: '90px' }}>
      {/* Top Banner (Navy #101C2C with tropical backdrop) */}
      <section
        style={{
          position: 'relative',
          backgroundColor: '#101C2C',
          padding: '4rem 0 3.5rem 0',
          color: '#FFFFFF',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'absolute', inset: 0, opacity: 0.25, pointerEvents: 'none' }}>
          <ImageWithFallback
            src={ASSET_IMAGES.backgrounds.ctaSunset}
            fallbackSrc={ASSET_IMAGES.destinations.bali.primary}
            alt="Lanskap Alam Nusantara"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 5 }}>
          <div style={{ maxWidth: '780px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                backgroundColor: 'rgba(223, 255, 0, 0.15)',
                border: '1px solid rgba(223, 255, 0, 0.35)',
                color: '#DFFF00',
                padding: '0.3rem 0.8rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: '700',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '1rem'
              }}
            >
              <Compass size={14} />
              <span>Layanan Pelanggan & Konsultasi</span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: '800',
                color: '#FFFFFF',
                lineHeight: 1.18,
                marginBottom: '0.85rem'
              }}
            >
              Hubungi Kami <br />
              <span style={{ color: '#DFFF00' }}>Rencanakan Liburan Impian</span>
            </h1>

            <p style={{ color: '#CBD5E1', fontSize: '1.05rem', lineHeight: 1.65 }}>
              Konsultasikan rencana liburan Anda bersama tim konsultan FADZA TRIP ADVENTURE. Kami siap membantu mulai dari pemilihan destinasi hingga penyusunan itinerary khusus.
            </p>
          </div>
        </div>
      </section>

      {/* Main Split Section: Official Channels & Inquiry Form */}
      <section style={{ padding: '3.5rem 0' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
              gap: '2.5rem',
              alignItems: 'start'
            }}
          >
            {/* Left Column: Official Channels & Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  border: '1px solid #E5E7E2',
                  padding: '2rem',
                  boxShadow: '0 8px 24px rgba(16, 28, 44, 0.04)'
                }}
              >
                <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#101C2C', marginBottom: '1.5rem' }}>
                  Saluran Komunikasi Resmi
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {/* WhatsApp */}
                  <a
                    href={getGeneralWhatsAppLink('Halo FADZA TRIP ADVENTURE, saya ingin konsultasi rencana liburan.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      borderRadius: '14px',
                      backgroundColor: '#FAFAF5',
                      border: '1px solid #E5E7E2',
                      textDecoration: 'none',
                      color: 'inherit',
                      transition: 'border-color 0.2s ease'
                    }}
                    className="hover:border-[#101C2C]"
                  >
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        backgroundColor: '#25D366',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <WhatsAppIcon size={22} color="#FFFFFF" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.78rem', color: '#68717C', fontWeight: '600' }}>WhatsApp Konsultasi Cepat</div>
                      <div style={{ fontSize: '1rem', fontWeight: '700', color: '#101C2C' }}>{BRAND_INFO.phone}</div>
                      <div style={{ fontSize: '0.75rem', color: '#107C41', fontWeight: '600', marginTop: '2px' }}>
                        ● Online (Respons 10-25 Menit)
                      </div>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:${BRAND_INFO.email}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      borderRadius: '14px',
                      backgroundColor: '#FAFAF5',
                      border: '1px solid #E5E7E2',
                      textDecoration: 'none',
                      color: 'inherit',
                      transition: 'border-color 0.2s ease'
                    }}
                    className="hover:border-[#0284C7]"
                  >
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        backgroundColor: 'rgba(2, 132, 199, 0.12)',
                        border: '1px solid rgba(2, 132, 199, 0.3)',
                        color: '#0284C7',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <Mail size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.78rem', color: '#68717C', fontWeight: '600' }}>Email Resmi</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#101C2C' }}>{BRAND_INFO.email}</div>
                    </div>
                  </a>

                  {/* Address */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1rem',
                      padding: '1rem',
                      borderRadius: '14px',
                      backgroundColor: '#FAFAF5',
                      border: '1px solid #E5E7E2'
                    }}
                  >
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        backgroundColor: 'rgba(200, 90, 50, 0.12)',
                        border: '1px solid rgba(200, 90, 50, 0.3)',
                        color: '#C85A32',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <MapPin size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.78rem', color: '#68717C', fontWeight: '600' }}>Kantor Operasional</div>
                      <div style={{ fontSize: '0.92rem', fontWeight: '700', color: '#101C2C' }}>{BRAND_INFO.address}</div>
                    </div>
                  </div>

                  {/* Hours */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      borderRadius: '14px',
                      backgroundColor: '#FAFAF5',
                      border: '1px solid #E5E7E2'
                    }}
                  >
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        backgroundColor: 'rgba(217, 119, 6, 0.12)',
                        border: '1px solid rgba(217, 119, 6, 0.3)',
                        color: '#D97706',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <Clock size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.78rem', color: '#68717C', fontWeight: '600' }}>Jam Operasional</div>
                      <div style={{ fontSize: '0.92rem', fontWeight: '700', color: '#101C2C' }}>Senin – Minggu: 08.00 – 22.00 WIB</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guarantees Box */}
              <div
                style={{
                  backgroundColor: '#101C2C',
                  borderRadius: '20px',
                  borderTop: '4px solid #DFFF00',
                  boxShadow: '0 10px 30px rgba(16, 28, 44, 0.12)',
                  padding: '2rem',
                  color: '#FFFFFF'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <ShieldCheck size={20} color="#DFFF00" />
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '800' }}>Jaminan Keamanan & Kenyamanan</h4>
                </div>
                <p style={{ color: '#CBD5E1', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                  Setiap perjalanan bersama FADZA TRIP ADVENTURE bergaransi resmi dengan izin operasional lengkap, asuransi perjalanan terpercaya, dan panduan lokal bersertifikasi.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#DFFF00', fontSize: '0.82rem', fontWeight: '700' }}>
                  <CheckCircle2 size={14} />
                  <span>Garansi Transparansi 100% Tanpa Biaya Siluman</span>
                </div>
              </div>
            </div>

            {/* Right Column: Inquiry Form or Submission Success */}
            <div>
              {submitted ? (
                /* Success Confirmation State */
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '20px',
                    border: '1px solid #E5E7E2',
                    padding: '2.5rem',
                    boxShadow: '0 8px 24px rgba(16, 28, 44, 0.05)',
                    textAlign: 'center'
                  }}
                >
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      backgroundColor: '#EBF9F1',
                      color: '#107C41',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1.25rem auto'
                    }}
                  >
                    <CheckCircle2 size={32} />
                  </div>

                  <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#101C2C', marginBottom: '0.5rem' }}>
                    Permintaan Berhasil Terkirim!
                  </h3>
                  <p style={{ color: '#68717C', fontSize: '0.92rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                    Terima kasih <strong>{formData.name}</strong>. Tim konsultan kami telah menerima rincian rencana perjalanan Anda dengan ID Tiket: <strong style={{ color: '#101C2C' }}>{inquiryId}</strong>.
                  </p>

                  <div style={{ backgroundColor: '#FAFAF5', borderRadius: '14px', border: '1px solid #E5E7E2', padding: '1.25rem', marginBottom: '2rem', textAlign: 'left' }}>
                    <div style={{ fontSize: '0.82rem', color: '#68717C', marginBottom: '0.35rem' }}>Destinasi: <strong style={{ color: '#101C2C' }}>{formData.destination}</strong></div>
                    <div style={{ fontSize: '0.82rem', color: '#68717C', marginBottom: '0.35rem' }}>Paket: <strong style={{ color: '#101C2C' }}>{formData.packageChoice === 'custom' ? 'Custom Itinerary' : formData.packageChoice}</strong></div>
                    <div style={{ fontSize: '0.82rem', color: '#68717C' }}>Peserta: <strong style={{ color: '#101C2C' }}>{formData.travelers} orang</strong></div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    <a
                      href={getCustomWaUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-lime"
                      style={{
                        padding: '0.85rem 1.5rem',
                        fontSize: '0.95rem',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        justifyContent: 'center'
                      }}
                    >
                      <WhatsAppIcon size={18} />
                      <span>Lanjutkan Chat via WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#101C2C',
                        fontWeight: '700',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        padding: '0.5rem'
                      }}
                    >
                      Kirim Pertanyaan Lain
                    </button>
                  </div>
                </div>
              ) : (
                /* Inquiry Form */
                <form
                  onSubmit={handleSubmit}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '20px',
                    border: '1px solid #E5E7E2',
                    padding: '2.25rem',
                    boxShadow: '0 8px 24px rgba(16, 28, 44, 0.05)'
                  }}
                >
                  <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#101C2C', marginBottom: '0.5rem' }}>
                    Formulir Rencana Perjalanan
                  </h3>
                  <p style={{ color: '#68717C', fontSize: '0.88rem', marginBottom: '1.75rem', lineHeight: 1.5 }}>
                    Isi formulir di bawah ini untuk mendapatkan proposal itinerary awal dan penawaran terbaik.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {/* Name */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', color: '#101C2C', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                        Nama Lengkap *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Budi Santoso"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          borderRadius: '12px',
                          border: '1px solid #E5E7E2',
                          backgroundColor: '#FAFAF5',
                          color: '#101C2C',
                          fontSize: '0.9rem',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    {/* WhatsApp Phone */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', color: '#101C2C', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                        Nomor WhatsApp Aktif *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Contoh: 081234567890"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          borderRadius: '12px',
                          border: '1px solid #E5E7E2',
                          backgroundColor: '#FAFAF5',
                          color: '#101C2C',
                          fontSize: '0.9rem',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', color: '#101C2C', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                        Alamat Email
                      </label>
                      <input
                        type="email"
                        placeholder="Contoh: nama@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          borderRadius: '12px',
                          border: '1px solid #E5E7E2',
                          backgroundColor: '#FAFAF5',
                          color: '#101C2C',
                          fontSize: '0.9rem',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    {/* Destination & Package Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                      <ModernSelect
                        label="Destinasi Impian"
                        value={formData.destination}
                        onChange={(val) => setFormData({ ...formData, destination: val })}
                        options={CONTACT_DESTINATIONS}
                        icon={MapPin}
                        placeholder="Pilih Destinasi"
                      />

                      <ModernSelect
                        label="Pilihan Paket"
                        value={formData.packageChoice}
                        onChange={(val) => setFormData({ ...formData, packageChoice: val })}
                        options={PACKAGE_OPTIONS}
                        icon={Compass}
                        placeholder="Pilih Paket"
                      />
                    </div>

                    {/* Date & Travelers Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', color: '#101C2C', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                          Perkiraan Tanggal
                        </label>
                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '0.7rem 0.9rem',
                            borderRadius: '12px',
                            border: '1px solid #E5E7E2',
                            backgroundColor: '#FAFAF5',
                            color: '#101C2C',
                            fontSize: '0.88rem',
                            outline: 'none',
                            boxSizing: 'border-box'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', color: '#101C2C', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                          Jumlah Peserta
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="100"
                          value={formData.travelers}
                          onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '0.7rem 0.9rem',
                            borderRadius: '12px',
                            border: '1px solid #E5E7E2',
                            backgroundColor: '#FAFAF5',
                            color: '#101C2C',
                            fontSize: '0.88rem',
                            outline: 'none',
                            boxSizing: 'border-box'
                          }}
                        />
                      </div>
                    </div>

                    {/* Note / Message */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', color: '#101C2C', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                        Catatan Khusus / Preferensi
                      </label>
                      <textarea
                        rows="3"
                        placeholder="Contoh: Butuh hotel bintang 4 dengan private pool, traveling bersama anak usia 5 tahun..."
                        value={formData.note}
                        onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          borderRadius: '12px',
                          border: '1px solid #E5E7E2',
                          backgroundColor: '#FAFAF5',
                          color: '#101C2C',
                          fontSize: '0.9rem',
                          outline: 'none',
                          boxSizing: 'border-box',
                          resize: 'vertical'
                        }}
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="btn-lime"
                      style={{
                        padding: '0.9rem 1.5rem',
                        fontSize: '1rem',
                        borderRadius: '14px',
                        justifyContent: 'center',
                        marginTop: '0.5rem'
                      }}
                    >
                      <Send size={18} />
                      <span>Kirim Permintaan Konsultasi</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: '3.5rem 0', backgroundColor: '#F0F2EB', borderTop: '1px solid #E5E7E2' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#101C2C' }}>
              Tanya Jawab Seputar Konsultasi
            </h3>
            <p style={{ color: '#68717C', fontSize: '0.92rem', marginTop: '0.35rem' }}>
              Semua hal yang perlu Anda ketahui sebelum merencanakan liburan bersama kami
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {CONTACT_FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '14px',
                    border: '1px solid #E5E7E2',
                    overflow: 'hidden'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    style={{
                      width: '100%',
                      padding: '1.15rem 1.4rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      gap: '0.85rem'
                    }}
                  >
                    <span style={{ fontSize: '0.95rem', fontWeight: '700', color: '#101C2C' }}>
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={18}
                      color="#101C2C"
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                        flexShrink: 0
                      }}
                    />
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 1.4rem 1.15rem 1.4rem', fontSize: '0.9rem', color: '#68717C', lineHeight: 1.6, borderTop: '1px solid #F0F2EB', paddingTop: '0.85rem' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
