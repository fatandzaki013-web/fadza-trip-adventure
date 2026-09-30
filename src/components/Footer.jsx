import React, { useState } from 'react';
import { BRAND_INFO } from '../data/travelData';
import { getGeneralWhatsAppLink } from '../utils/whatsapp';
import WhatsAppIcon from './WhatsAppIcon';
import { useLanguage } from '../context/LanguageContext';
import {
  Compass,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  FileText,
  Lock,
  X,
  ArrowRight,
  Phone
} from 'lucide-react';

const InstagramIcon = ({ size = 18, color = 'currentColor', style = {} }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function Footer({ onNavigate, onSelectDestination, onSelectPackage, onOpenAiChat }) {
  const { language, setLanguage, t } = useLanguage();
  const [legalModal, setLegalModal] = useState(null); // 'terms' | 'privacy' | 'service' | null

  const handleNavClick = (pageId, scrollId = null) => {
    if (onNavigate) {
      onNavigate(pageId);
    }
    if (scrollId) {
      setTimeout(() => {
        const el = document.getElementById(scrollId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDestinationClick = (destId) => {
    if (onSelectDestination) {
      onSelectDestination(destId);
    } else if (onNavigate) {
      onNavigate('packages');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: '#0B1320',
        color: '#CBD5E1',
        paddingTop: 'clamp(3.5rem, 6vw, 5rem)',
        paddingBottom: '2.5rem',
        borderTop: 'none',
        position: 'relative'
      }}
    >
      {/* Top Subtle Luxury Accent Bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(223, 255, 0, 0.6) 30%, rgba(2, 132, 199, 0.6) 70%, transparent 100%)'
        }}
      />

      <div className="container">
        {/* Main Footer 4-Column Balanced Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 230px), 1fr))',
            gap: 'clamp(2rem, 4vw, 3.5rem)',
            marginBottom: '3.5rem'
          }}
        >
          {/* Column 1: Brand & Identity */}
          <div style={{ maxWidth: '380px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '11px',
                  overflow: 'hidden',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '3px',
                  flexShrink: 0
                }}
              >
                <img
                  src="/images/logo-fadza.png"
                  alt="Logo FADZA TRIP ADVENTURE"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                  }}
                />
              </div>

              <div>
                <span
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: '800',
                    color: '#FFFFFF',
                    lineHeight: 1.1,
                    display: 'block'
                  }}
                >
                  FADZA <span style={{ color: '#DFFF00' }}>TRIP ADVENTURE</span>
                </span>
                <span
                  style={{
                    fontSize: '0.7rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#94A3B8',
                    fontWeight: '600'
                  }}
                >
                  Travel Concierge Nusantara
                </span>
              </div>
            </div>

            {/* Official Registration & Quality Trust Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '8px',
                padding: '0.3rem 0.65rem',
                marginBottom: '1rem'
              }}
            >
              <ShieldCheck size={13} color="#DFFF00" />
              <span style={{ fontSize: '0.72rem', color: '#CBD5E1', fontWeight: '600' }}>
                Biro Wisata Resmi &amp; Mitra Terverifikasi RI
              </span>
            </div>

            {/* Exact brand statement requested */}
            <p
              style={{
                fontSize: '0.9rem',
                color: '#CBD5E1',
                lineHeight: 1.65,
                marginBottom: '1.5rem',
                fontStyle: 'normal'
              }}
            >
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.75rem' }}>
              <button
                type="button"
                onClick={() => handleNavClick('packages')}
                className="btn-lime"
                style={{
                  padding: '0.65rem 1.25rem',
                  fontSize: '0.85rem',
                  borderRadius: '10px'
                }}
              >
                <span>{t('footer_explore_packages', 'Jelajahi Paket')}</span>
                <ArrowRight size={14} />
              </button>

              <a
                href={getGeneralWhatsAppLink('Halo FADZA TRIP ADVENTURE, saya ingin konsultasi perjalanan.')}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.65rem 1.25rem',
                  fontSize: '0.85rem',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  textDecoration: 'none',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}
                className="hover:border-[#DFFF00] hover:text-[#DFFF00]"
              >
                <WhatsAppIcon size={15} />
                <span>{t('footer_contact_fadza', 'Hubungi FADZA')}</span>
              </a>
            </div>

            {/* Direct Social / Contact Icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <a
                href={getGeneralWhatsAppLink('Halo FADZA TRIP ADVENTURE, saya ingin tanya ketersediaan trip.')}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: '#16263A',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#25D366',
                  transition: 'all 0.2s ease'
                }}
                className="hover:border-[#25D366] hover:scale-105"
                title="WhatsApp Hotline Resmi"
              >
                <WhatsAppIcon size={18} />
              </a>

              <a
                href="https://instagram.com/fadzapadventure"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: '#16263A',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#CBD5E1',
                  transition: 'all 0.2s ease'
                }}
                className="hover:text-[#DFFF00] hover:border-[#DFFF00] hover:scale-105"
                title="Instagram @fadzapadventure"
              >
                <InstagramIcon size={18} />
              </a>

              <a
                href={`mailto:${BRAND_INFO.email}`}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: '#16263A',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#CBD5E1',
                  transition: 'all 0.2s ease'
                }}
                className="hover:text-[#DFFF00] hover:border-[#DFFF00] hover:scale-105"
                title={`Email ke ${BRAND_INFO.email}`}
              >
                <Mail size={18} />
              </a>

              <a
                href="tel:+6285888159765"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: '#16263A',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#CBD5E1',
                  transition: 'all 0.2s ease'
                }}
                className="hover:text-[#DFFF00] hover:border-[#DFFF00] hover:scale-105"
                title="Hubungi Telepon"
              >
                <Phone size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Navigasi Utama */}
          <div>
            <h4
              style={{
                color: '#FFFFFF',
                fontSize: '0.88rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '1.25rem'
              }}
            >
              {t('footer_nav_title', 'Navigasi Utama')}
            </h4>

            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                fontSize: '0.88rem'
              }}
            >
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('home')}
                  style={{ background: 'none', border: 'none', color: '#CBD5E1', cursor: 'pointer', padding: 0 }}
                  className="hover:text-[#DFFF00] transition-colors"
                >
                  {t('nav_home', 'Beranda')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('packages')}
                  style={{ background: 'none', border: 'none', color: '#CBD5E1', cursor: 'pointer', padding: 0 }}
                  className="hover:text-[#DFFF00] transition-colors"
                >
                  {t('nav_packages', 'Paket Wisata')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('explore')}
                  style={{ background: 'none', border: 'none', color: '#CBD5E1', cursor: 'pointer', padding: 0 }}
                  className="hover:text-[#DFFF00] transition-colors"
                >
                  {t('dest_catalog_btn', 'Katalog 16 Destinasi')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('about')}
                  style={{ background: 'none', border: 'none', color: '#CBD5E1', cursor: 'pointer', padding: 0 }}
                  className="hover:text-[#DFFF00] transition-colors"
                >
                  {t('nav_about', 'Tentang')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('gallery')}
                  style={{ background: 'none', border: 'none', color: '#CBD5E1', cursor: 'pointer', padding: 0 }}
                  className="hover:text-[#DFFF00] transition-colors"
                >
                  {t('nav_gallery', 'Galeri')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('testimonials')}
                  style={{ background: 'none', border: 'none', color: '#CBD5E1', cursor: 'pointer', padding: 0 }}
                  className="hover:text-[#DFFF00] transition-colors"
                >
                  {t('nav_testimonials', 'Testimoni')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('contact')}
                  style={{ background: 'none', border: 'none', color: '#CBD5E1', cursor: 'pointer', padding: 0 }}
                  className="hover:text-[#DFFF00] transition-colors"
                >
                  {t('nav_contact', 'Kontak')}
                </button>
              </li>
              {onOpenAiChat && (
                <li>
                  <button
                    type="button"
                    onClick={onOpenAiChat}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#DFFF00',
                      cursor: 'pointer',
                      padding: 0,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontWeight: '600'
                    }}
                    className="hover:underline"
                  >
                    <Compass size={15} />
                    <span>{language === 'en' ? 'FADZA AI Assistant' : 'Tanya FADZA AI'}</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Column 3: Destinasi Pilihan (Fully Clickable) */}
          <div>
            <h4
              style={{
                color: '#FFFFFF',
                fontSize: '0.88rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '1.25rem'
              }}
            >
              {t('footer_dest_title', 'Destinasi Pilihan')}
            </h4>

            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                fontSize: '0.88rem'
              }}
            >
              {[
                { id: 'labuan-bajo', name: 'Labuan Bajo & Phinisi Komodo' },
                { id: 'raja-ampat', name: 'Raja Ampat Papua Barat' },
                { id: 'bali', name: 'Bali Kintamani & Nusa Penida' },
                { id: 'lombok', name: 'Lombok & Trio Gili' },
                { id: 'bromo', name: 'Gunung Bromo & Malang' },
                { id: 'sumba', name: 'Sumba Savana & Budaya Adat' }
              ].map((dest) => (
                <li key={dest.id}>
                  <button
                    type="button"
                    onClick={() => handleDestinationClick(dest.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#CBD5E1',
                      cursor: 'pointer',
                      padding: 0,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      textAlign: 'left'
                    }}
                    className="hover:text-[#DFFF00] transition-colors"
                  >
                    <MapPin size={13} color="#C9A45C" />
                    <span>{dest.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Kontak & Operasional */}
          <div>
            <h4
              style={{
                color: '#FFFFFF',
                fontSize: '0.88rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '1.25rem'
              }}
            >
              {t('footer_contact_title', 'Kontak & Operasional')}
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem', fontSize: '0.86rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <MapPin size={16} color="#B86B4B" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{BRAND_INFO.address}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Clock size={16} color="#C9A45C" style={{ flexShrink: 0 }} />
                <span>{BRAND_INFO.hours}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <WhatsAppIcon size={16} />
                <a
                  href={getGeneralWhatsAppLink('Halo FADZA TRIP ADVENTURE, saya ingin tanya ketersediaan jadwal.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#CBD5E1', textDecoration: 'none' }}
                  className="hover:text-[#25D366]"
                >
                  +62 858-8815-9765 (Hotline)
                </a>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Mail size={16} color="#DFFF00" style={{ flexShrink: 0 }} />
                <a
                  href={`mailto:${BRAND_INFO.email}`}
                  style={{ color: '#CBD5E1', textDecoration: 'none' }}
                  className="hover:text-[#DFFF00]"
                >
                  {BRAND_INFO.email}
                </a>
              </div>

              {/* Verified Commitment */}
              <div
                style={{
                  marginTop: '0.5rem',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '10px',
                  backgroundColor: '#16263A',
                  border: '1px solid rgba(201, 164, 92, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.55rem'
                }}
              >
                <ShieldCheck size={16} color="#C9A45C" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.75rem', color: '#E2E8F0', fontWeight: '600' }}>
                  Layanan Resmi Terstandarisasi Asuransi & Panduan Lokal
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ACCREDITATIONS & VERIFIED PAYMENT CHANNELS STRIP */}
        <div
          style={{
            borderTop: '1px solid #1E2D3D',
            paddingTop: '2rem',
            paddingBottom: '2rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '1.75rem',
            alignItems: 'center'
          }}
        >
          {/* Official Accreditations */}
          <div>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: '800',
                color: '#94A3B8',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '0.65rem'
              }}
            >
              Akreditasi &amp; Standardisasi Resmi
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
              <div
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: '8px',
                  backgroundColor: '#16263A',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <span>🇮🇩</span>
                <span>Kemenparekraf RI Partner</span>
              </div>
              <div
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: '8px',
                  backgroundColor: '#16263A',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <ShieldCheck size={14} color="#DFFF00" />
                <span>ASITA Certified Member</span>
              </div>
              <div
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: '8px',
                  backgroundColor: '#16263A',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  color: '#FFFFFF'
                }}
              >
                <span>NIB: 0220261988114</span>
              </div>
            </div>
          </div>

          {/* Secure Payment Gateways */}
          <div>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: '800',
                color: '#94A3B8',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '0.65rem'
              }}
            >
              Kanal Transaksi &amp; Reservasi Terverifikasi
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              {['BCA VA', 'MANDIRI VA', 'BNI', 'BRI', 'QRIS INSTANT', 'VISA / MC'].map((channel, cIdx) => (
                <span
                  key={cIdx}
                  style={{
                    padding: '0.3rem 0.6rem',
                    borderRadius: '6px',
                    backgroundColor: '#16263A',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    fontSize: '0.72rem',
                    fontWeight: '800',
                    color: '#E2E8F0',
                    letterSpacing: '0.04em'
                  }}
                >
                  {channel}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Interactive Legal Modals */}
        {/* Dedicated Standalone Language Switcher (Zero Text Beside It) */}
        <div
          style={{
            borderTop: '1px solid #16263A',
            paddingTop: '1.5rem',
            paddingBottom: '1.25rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              padding: '3px',
              gap: '3px'
            }}
          >
            <button
              type="button"
              onClick={() => setLanguage('id')}
              style={{
                padding: '0.4rem 1.1rem',
                borderRadius: '8px',
                border: 'none',
                fontSize: '0.82rem',
                fontWeight: '800',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                backgroundColor: language === 'id' ? '#DFFF00' : 'transparent',
                color: language === 'id' ? '#101C2C' : 'rgba(255,255,255,0.7)',
                boxShadow: language === 'id' ? '0 2px 10px rgba(223, 255, 0, 0.35)' : 'none',
                transition: 'all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)'
              }}
            >
              ID
            </button>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              style={{
                padding: '0.4rem 1.1rem',
                borderRadius: '8px',
                border: 'none',
                fontSize: '0.82rem',
                fontWeight: '800',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                backgroundColor: language === 'en' ? '#DFFF00' : 'transparent',
                color: language === 'en' ? '#101C2C' : 'rgba(255,255,255,0.7)',
                boxShadow: language === 'en' ? '0 2px 10px rgba(223, 255, 0, 0.35)' : 'none',
                transition: 'all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)'
              }}
            >
              EN
            </button>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            paddingTop: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.82rem',
            color: '#94A3B8'
          }}
        >
          <div>
            <span>
              © {new Date().getFullYear()} FADZA TRIP ADVENTURE. {t('footer_copyright', 'Seluruh hak cipta dilindungi undang-undang.')}
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', alignItems: 'center' }}>
            <button
              type="button"
              onClick={() => setLegalModal('terms')}
              style={{
                background: 'none',
                border: 'none',
                color: '#94A3B8',
                cursor: 'pointer',
                padding: 0,
                fontSize: '0.82rem'
              }}
              className="hover:text-[#DFFF00] transition-colors"
            >
              {t('footer_terms', 'Syarat & Ketentuan')}
            </button>

            <button
              type="button"
              onClick={() => setLegalModal('privacy')}
              style={{
                background: 'none',
                border: 'none',
                color: '#94A3B8',
                cursor: 'pointer',
                padding: 0,
                fontSize: '0.82rem'
              }}
              className="hover:text-[#DFFF00] transition-colors"
            >
              {t('footer_privacy', 'Kebijakan Privasi')}
            </button>

            <button
              type="button"
              onClick={() => setLegalModal('service')}
              style={{
                background: 'none',
                border: 'none',
                color: '#94A3B8',
                cursor: 'pointer',
                padding: 0,
                fontSize: '0.82rem'
              }}
              className="hover:text-[#DFFF00] transition-colors"
            >
              {language === 'en' ? 'Service Standards & Insurance' : 'Standar Layanan & Asuransi'}
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Policy & Legal Modals */}
      {legalModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(10, 18, 28, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
          onClick={() => setLegalModal(null)}
        >
          <div
            style={{
              backgroundColor: '#101C2C',
              border: '1px solid #16263A',
              borderRadius: '24px',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              color: '#CBD5E1',
              padding: '2rem',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.6)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLegalModal(null)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#16263A',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              className="hover:text-[#DFFF00]"
            >
              <X size={18} />
            </button>

            {legalModal === 'terms' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      backgroundColor: '#DFFF00',
                      color: '#101C2C',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 style={{ color: '#FFFFFF', fontSize: '1.3rem', fontWeight: '800', margin: 0 }}>
                      Syarat & Ketentuan Layanan
                    </h3>
                    <p style={{ color: '#94A3B8', fontSize: '0.8rem', margin: 0 }}>FADZA TRIP ADVENTURE</p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.9rem', lineHeight: 1.65 }}>
                  <div>
                    <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                      1. Pemesanan & Pembayaran DP
                    </h4>
                    <p style={{ color: '#94A3B8', margin: 0 }}>
                      Pemesanan paket wisata dianggap sah setelah calon peserta melakukan pembayaran Uang Muka (Down Payment) minimal 30% dari total nilai paket dan menerima tanda terima resmi via WhatsApp resmi FADZA.
                    </p>
                  </div>

                  <div>
                    <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                      2. Pelunasan Biaya Perjalanan
                    </h4>
                    <p style={{ color: '#94A3B8', margin: 0 }}>
                      Pelunasan sisa biaya paket wajib diselesaikan paling lambat 7 (tujuh) hari sebelum tanggal keberangkatan (H-7).
                    </p>
                  </div>

                  <div>
                    <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                      3. Kebijakan Reschedule & Keamanan
                    </h4>
                    <p style={{ color: '#94A3B8', margin: 0 }}>
                      Pengajuan perubahan jadwal (reschedule) diperbolehkan 1 kali tanpa penalti maksimal 10 hari sebelum hari keberangkatan (tergantung ketersediaan akomodasi dan armada).
                    </p>
                  </div>
                </div>
              </div>
            )}

            {legalModal === 'privacy' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      backgroundColor: '#C9A45C',
                      color: '#101C2C',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Lock size={20} />
                  </div>
                  <div>
                    <h3 style={{ color: '#FFFFFF', fontSize: '1.3rem', fontWeight: '800', margin: 0 }}>
                      Kebijakan Privasi Tamu
                    </h3>
                    <p style={{ color: '#94A3B8', fontSize: '0.8rem', margin: 0 }}>Perlindungan Informasi Pribadi</p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.9rem', lineHeight: 1.65 }}>
                  <div>
                    <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                      1. Penggunaan Data Tamu
                    </h4>
                    <p style={{ color: '#94A3B8', margin: 0 }}>
                      Data identitas, nama lengkap, dan nomor kontak tamu hanya digunakan untuk penerbitan tiket masuk kawasan taman nasional, manifes kapal, serta reservasi hotel.
                    </p>
                  </div>

                  <div>
                    <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                      2. Kerahasiaan & Keamanan
                    </h4>
                    <p style={{ color: '#94A3B8', margin: 0 }}>
                      FADZA TRIP ADVENTURE tidak pernah memperjualbelikan data kontak kepada pihak ketiga mana pun.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {legalModal === 'service' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      backgroundColor: '#B86B4B',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h3 style={{ color: '#FFFFFF', fontSize: '1.3rem', fontWeight: '800', margin: 0 }}>
                      Standar Layanan & Asuransi
                    </h3>
                    <p style={{ color: '#94A3B8', fontSize: '0.8rem', margin: 0 }}>Protokol Keselamatan Wisatawan</p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.9rem', lineHeight: 1.65 }}>
                  <div>
                    <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                      1. Perlindungan Asuransi
                    </h4>
                    <p style={{ color: '#94A3B8', margin: 0 }}>
                      Seluruh paket wisata FADZA telah mencakup asuransi kecelakaan dasar untuk setiap peserta terdaftar.
                    </p>
                  </div>

                  <div>
                    <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                      2. Kelaikan Kapal & Transportasi
                    </h4>
                    <p style={{ color: '#94A3B8', margin: 0 }}>
                      Armada kendaraan dan kapal phinisi telah memenuhi standar kelaikan operasi berkala dari otoritas terkait serta dilengkapi life jacket dan kotak P3K lengkap.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                className="btn-lime"
                style={{ padding: '0.65rem 1.5rem', fontSize: '0.88rem', borderRadius: '10px' }}
              >
                Tutup Dokumen
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
