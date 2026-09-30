import React, { useState } from 'react';
import { PACKAGES } from '../data/travelData.js';
import { ASSET_IMAGES } from '../data/images.js';
import ImageWithFallback from './ImageWithFallback';
import WhatsAppIcon from './WhatsAppIcon';
import { getGeneralWhatsAppLink } from '../utils/whatsapp';
import { useLanguage } from '../context/LanguageContext';
import {
  Sailboat,
  Mountain,
  Landmark,
  Compass,
  ArrowRight,
  MapPin,
  Clock,
  CheckCircle2,
  ChevronRight,
  Users
} from 'lucide-react';

export default function TravelStyleShowcase({ onSelectPackage, onNavigate }) {
  const { language, t } = useLanguage();
  const [selectedStyleId, setSelectedStyleId] = useState(null);

  const STYLES = [
    {
      id: 'bahari',
      title: {
        id: 'Bahari & Pelayaran Phinisi',
        en: 'Ocean & Phinisi Sailing'
      },
      tag: {
        id: 'BAHARI & PULAU',
        en: 'OCEAN & ISLANDS'
      },
      color: '#0284C7',
      accentGlow: 'rgba(2, 132, 199, 0.25)',
      badgeBg: 'rgba(2, 132, 199, 0.12)',
      borderHover: 'rgba(2, 132, 199, 0.6)',
      icon: Sailboat,
      image: '/images/hero/hero-padar-panoramic.jpg',
      imageFallback: '/images/hero/hero-pink-beach.jpg',
      alt: 'Pelayaran Phinisi Labuan Bajo & Raja Ampat',
      destinations: 'Labuan Bajo • Raja Ampat • Belitung',
      description: {
        id: 'Berlayar dengan kapal Phinisi eksklusif, snorkeling di terumbu karang terjernih, dan menikmati sunset magis di kepulauan karst.',
        en: 'Sail aboard private Phinisi schooners, snorkel vibrant coral reefs, and soak in mesmerizing karst sunsets across pristine waters.'
      },
      idealFor: {
        id: 'Keluarga, Pasangan, Pecinta Laut',
        en: 'Families, Couples, Marine Enthusiasts'
      },
      packageIds: ['labuan-bajo-phinisi', 'raja-ampat-ultimate', 'belitung-island']
    },
    {
      id: 'kaldera',
      title: {
        id: 'Kaldera & Petualangan Vulkanik',
        en: 'Caldera & Volcanic Adventure'
      },
      tag: {
        id: 'GUNUNG & KALDERA',
        en: 'VOLCANO & ADVENTURE'
      },
      color: '#C85A32',
      accentGlow: 'rgba(200, 90, 50, 0.25)',
      badgeBg: 'rgba(200, 90, 50, 0.12)',
      borderHover: 'rgba(200, 90, 50, 0.6)',
      icon: Mountain,
      image: '/images/hero/hero-bromo-sunrise.jpg',
      imageFallback: '/images/hero/hero-kawah-putih.jpg',
      alt: 'Matahari Terbit Gunung Bromo & Kawah Ijen',
      destinations: 'Bromo • Dieng • Bandung',
      description: {
        id: 'Menyaksikan kabut fajar tersibak di lautan pasir kaldera Bromo, pesona kawah belerang, dan sejuknya lanskap pegunungan tropis.',
        en: 'Witness surreal golden dawns parting the caldera mist over Bromo, crater peaks, and cool highland landscapes.'
      },
      idealFor: {
        id: 'Petualang, Fotografer, Sahabat',
        en: 'Adventurers, Photographers, Friend Groups'
      },
      packageIds: ['bromo-sunrise', 'dieng-explorer', 'bandung-retreat']
    },
    {
      id: 'budaya',
      title: {
        id: 'Warisan Budaya & Tradisi Leluhur',
        en: 'Sacred Heritage & Living Culture'
      },
      tag: {
        id: 'BUDAYA & MAJESTIC HERITAGE',
        en: 'CULTURE & SACRED HERITAGE'
      },
      color: '#15803D',
      accentGlow: 'rgba(21, 128, 61, 0.25)',
      badgeBg: 'rgba(21, 128, 61, 0.12)',
      borderHover: 'rgba(21, 128, 61, 0.6)',
      icon: Landmark,
      image: '/images/hero/hero-borobudur-temple.jpg',
      imageFallback: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1200&q=80',
      alt: 'Keagungan Candi Borobudur & Budaya Yogyakarta',
      destinations: 'Yogyakarta • Tana Toraja • Danau Toba',
      description: {
        id: 'Meresapi kemegahan candi Borobudur & Prambanan, rumah adat megalitik Toraja, dan keramahan hangat masyarakat tradisi Nusantara.',
        en: 'Immerse in the timeless geometry of Borobudur and Prambanan, ancestral Torajan architecture, and heartfelt local hospitality.'
      },
      idealFor: {
        id: 'Keluarga Besar, Edukasi, Pecinta Sejarah',
        en: 'Multi-Gen Families, Education, History Lovers'
      },
      packageIds: ['yogyakarta-heritage', 'toraja-heritage', 'toba-highland']
    },
    {
      id: 'wellness',
      title: {
        id: 'Ketenangan & Wellness Tropis',
        en: 'Serenity & Tropical Wellness'
      },
      tag: {
        id: 'WELLNESS & RELAXATION',
        en: 'WELLNESS & RELAXATION'
      },
      color: '#7C3AED',
      accentGlow: 'rgba(124, 58, 237, 0.25)',
      badgeBg: 'rgba(124, 58, 237, 0.12)',
      borderHover: 'rgba(124, 58, 237, 0.6)',
      icon: Compass,
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
      imageFallback: '/images/hero/hero-raja-ampat-lagoon.jpg',
      alt: 'Resort Tropis Ubud Bali & Lombok',
      destinations: 'Bali Ubud • Lombok • Sumba',
      description: {
        id: 'Melepaskan penat di resort hijau asri Ubud, villa tepi pantai pasir putih, dan spa relaksasi dengan ritme liburan santai.',
        en: 'Recharge body and soul amid Ubud emerald valleys, private beachfront villas, and restorative spa rituals crafted for pure tranquility.'
      },
      idealFor: {
        id: 'Honeymoon, Solo Traveler, Relaksasi',
        en: 'Honeymooners, Solo Travelers, Reset & Recharge'
      },
      packageIds: ['bali-escape', 'lombok-adventure', 'sumba-paradise']
    }
  ];

  const handleCardClick = (style) => {
    if (selectedStyleId === style.id) {
      setSelectedStyleId(null);
    } else {
      setSelectedStyleId(style.id);
    }
  };

  const handleOpenTrip = (pkgId) => {
    const found = PACKAGES.find((p) => p.id === pkgId);
    if (found && onSelectPackage) {
      onSelectPackage(found);
    } else if (onNavigate) {
      onNavigate('packages');
    }
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Section Header */}
      <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3rem auto' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: 'rgba(201, 164, 92, 0.12)',
            border: '1px solid rgba(201, 164, 92, 0.35)',
            color: '#C9A45C',
            padding: '0.35rem 1rem',
            borderRadius: '9999px',
            fontSize: '0.78rem',
            fontWeight: '800',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '1rem'
          }}
        >
          <Compass size={14} color="#C9A45C" />
          <span>{t('style_badge', 'Pilih Gaya Liburan Anda')}</span>
        </div>

        <h2
          style={{
            fontSize: 'clamp(1.85rem, 3.4vw, 2.75rem)',
            fontWeight: '800',
            color: '#0F172A',
            margin: '0 0 0.85rem 0',
            letterSpacing: '-0.025em',
            lineHeight: 1.18
          }}
        >
          {t('style_title', 'Mau Liburan Seperti Apa? Temukan Gaya Anda.')}
        </h2>

        <p
          style={{
            color: '#334155',
            fontSize: '1.02rem',
            lineHeight: 1.6,
            margin: 0
          }}
        >
          {t(
            'style_subtitle',
            'Setiap penjelajah memiliki suasana impian yang berbeda. Pilih tipe liburan yang paling Anda dambakan, lalu jelajahi rute terbaiknya.'
          )}
        </p>
      </div>

      {/* 4 Large Visual Experience Cards (Symmetrical Grid: 4x1 Desktop, 2x2 Tablet, 1 Mobile) */}
      <div
        className="style-cards-grid"
        style={{
          display: 'grid',
          gap: '1.5rem',
          width: '100%',
          alignItems: 'stretch'
        }}
      >
        {STYLES.map((style) => {
          const IconComp = style.icon;
          const isSelected = selectedStyleId === style.id;
          const stylePackages = PACKAGES.filter((p) => style.packageIds.includes(p.id));

          return (
            <div
              key={style.id}
              onClick={() => handleCardClick(style)}
              className="group"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                overflow: 'hidden',
                border: isSelected ? `2.5px solid ${style.color}` : '1.5px solid #E5E7E2',
                boxShadow: isSelected
                  ? `0 16px 36px ${style.accentGlow}`
                  : '0 4px 18px rgba(15, 23, 42, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.25s ease',
                cursor: 'pointer',
                position: 'relative',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale'
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = style.color;
                  e.currentTarget.style.boxShadow = `0 18px 36px -8px ${style.accentGlow}, 0 6px 16px rgba(15, 23, 42, 0.06)`;
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.transform = 'translateZ(0)';
                  e.currentTarget.style.borderColor = '#E5E7E2';
                  e.currentTarget.style.boxShadow = '0 4px 18px rgba(15, 23, 42, 0.05)';
                }
              }}
            >
              {/* Card Photo Header */}
              <div
                style={{
                  position: 'relative',
                  height: '190px',
                  width: '100%',
                  overflow: 'hidden',
                  backgroundColor: '#1E293B'
                }}
              >
                <ImageWithFallback
                  src={style.image}
                  fallbackSrc={style.imageFallback}
                  alt={style.alt}
                  className="group-hover:scale-105"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />
                {/* Visual Gradient Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.2) 60%, transparent 100%)'
                  }}
                />

                {/* Mood Tag Badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    backgroundColor: style.color,
                    color: '#FFFFFF',
                    padding: '0.28rem 0.75rem',
                    borderRadius: '8px',
                    fontSize: '0.68rem',
                    fontWeight: '800',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.25)'
                  }}
                >
                  <IconComp size={12} color="#FFFFFF" />
                  <span>{style.tag[language] || style.tag.id}</span>
                </div>

                {/* Destination Key Spots at Bottom of Image */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '14px',
                    right: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    color: '#FFFFFF',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    textShadow: '0 1px 4px rgba(0,0,0,0.6)'
                  }}
                >
                  <MapPin size={13} color={style.color} style={{ flexShrink: 0 }} />
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {style.destinations}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div
                style={{
                  padding: '1.35rem',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: '800',
                      color: '#0F172A',
                      margin: '0 0 0.65rem 0',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.25
                    }}
                  >
                    {style.title[language] || style.title.id}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: '#334155',
                      fontWeight: '500',
                      lineHeight: 1.55,
                      margin: '0 0 1rem 0'
                    }}
                  >
                    {style.description[language] || style.description.id}
                  </p>

                  {/* Ideal for Tag */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      backgroundColor: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      padding: '0.45rem 0.65rem',
                      borderRadius: '10px',
                      fontSize: '0.76rem',
                      color: '#475569',
                      fontWeight: '600',
                      marginBottom: '1rem'
                    }}
                  >
                    <Users size={13} color={style.color} style={{ flexShrink: 0 }} />
                    <span>
                      <strong style={{ color: '#0F172A' }}>
                        {t('style_recommended_for', 'Cocok untuk')}:
                      </strong>{' '}
                      {style.idealFor[language] || style.idealFor.id}
                    </span>
                  </div>
                </div>

                {/* Action Trigger */}
                <div>
                  <button
                    type="button"
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      backgroundColor: isSelected ? style.color : 'transparent',
                      color: isSelected ? '#FFFFFF' : style.color,
                      border: `1.5px solid ${style.color}`,
                      borderRadius: '12px',
                      padding: '0.65rem 1rem',
                      fontSize: '0.86rem',
                      fontWeight: '800',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span>
                      {isSelected
                        ? language === 'en'
                          ? 'Tutup Pilihan Trip'
                          : 'Tutup Pilihan Trip'
                        : language === 'en'
                          ? `View ${style.title.en}`
                          : `Lihat Pilihan Trip (${stylePackages.length})`}
                    </span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              {/* Expandable Curated Trip Preview (Instant Value without leaving page) */}
              {isSelected && (
                <div
                  className="animate-fade-in-up"
                  style={{
                    backgroundColor: '#F8FAFC',
                    borderTop: `1px solid ${style.borderHover}`,
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem'
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '0.25rem'
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: '800',
                        color: '#334155',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}
                    >
                      {language === 'en' ? 'Curated Trips' : 'Rute Terkurasi'}:
                    </span>
                    <button
                      onClick={() => onNavigate && onNavigate('packages')}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: style.color,
                        fontSize: '0.75rem',
                        fontWeight: '800',
                        cursor: 'pointer',
                        padding: 0
                      }}
                    >
                      {language === 'en' ? 'All Packages →' : 'Semua Paket →'}
                    </button>
                  </div>

                  {stylePackages.map((pkg) => (
                    <div
                      key={pkg.id}
                      onClick={() => handleOpenTrip(pkg.id)}
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E2E8F0',
                        borderRadius: '12px',
                        padding: '0.75rem 0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '0.75rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = style.color;
                        e.currentTarget.style.backgroundColor = style.badgeBg;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#E2E8F0';
                        e.currentTarget.style.backgroundColor = '#FFFFFF';
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: '0.85rem',
                            fontWeight: '700',
                            color: '#0F172A',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {pkg.name}
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginTop: '0.2rem',
                            fontSize: '0.72rem',
                            color: '#334155'
                          }}
                        >
                          <span>{pkg.duration}</span>
                          <span>•</span>
                          <span style={{ fontWeight: '700', color: style.color }}>
                            {pkg.startingPriceFormatted}
                          </span>
                        </div>
                      </div>

                      <ChevronRight size={16} color={style.color} style={{ flexShrink: 0 }} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Scoped CSS for Perfect Non-Clipping Grid: 4x1 on Desktop, 2x2 on Tablet, 1 on Mobile */}
      <style>{`
        @media (min-width: 1024px) {
          .style-cards-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          .style-cards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 639px) {
          .style-cards-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
