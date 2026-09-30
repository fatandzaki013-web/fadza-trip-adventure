import React, { useState, useMemo } from 'react';
import { PACKAGES } from '../data/travelData.js';
import ImageWithFallback from './ImageWithFallback';
import WhatsAppIcon from './WhatsAppIcon';
import { getPackageWhatsAppLink } from '../utils/whatsapp';
import {
  Compass,
  Sailboat,
  Mountain,
  Landmark,
  MapPin,
  Clock,
  ArrowRight,
  Search,
  Check,
  Star
} from 'lucide-react';

const CATEGORIES = [
  {
    id: 'bahari',
    label: 'Bahari & Phinisi Sailing',
    shortLabel: 'Bahari & Phinisi',
    icon: Sailboat,
    color: '#0284C7',
    bgSoft: 'rgba(2, 132, 199, 0.1)',
    border: 'rgba(2, 132, 199, 0.3)',
    description: 'Pelayaran Phinisi privat, island hopping, dan terumbu karang terbaik dunia di Labuan Bajo, Raja Ampat, dan Belitung.'
  },
  {
    id: 'kaldera',
    label: 'Kaldera & Petualangan Alam',
    shortLabel: 'Kaldera & Alam',
    icon: Mountain,
    color: '#C85A32',
    bgSoft: 'rgba(200, 90, 50, 0.1)',
    border: 'rgba(200, 90, 50, 0.3)',
    description: 'Menyaksikan matahari terbit kaldera Bromo, pesona kawah Ijen, hingga sejuknya dataran tinggi Dieng.'
  },
  {
    id: 'budaya',
    label: 'Warisan Budaya & Tradisi',
    shortLabel: 'Budaya & Tradisi',
    icon: Landmark,
    color: '#15803D',
    bgSoft: 'rgba(21, 128, 61, 0.1)',
    border: 'rgba(21, 128, 61, 0.3)',
    description: 'Kemegahan mahakarya candi Borobudur & Prambanan, kearifan megalitik Toraja, dan tradisi Batak Danau Toba.'
  },
  {
    id: 'wellness',
    label: 'Ketenangan & Wellness Retreat',
    shortLabel: 'Ketenangan & Santai',
    icon: Compass,
    color: '#7C3AED',
    bgSoft: 'rgba(124, 58, 237, 0.1)',
    border: 'rgba(124, 58, 237, 0.3)',
    description: 'Menikmati ritme liburan santai di pesisir pasir putih Bali, perbukitan hijau Ubud, dan ketenangan pulau karang.'
  }
];

export default function ExecutiveCollectionExplorer({ onSelectPackage }) {
  const [activeCategory, setActiveCategory] = useState('bahari');
  const [searchKeyword, setSearchKeyword] = useState('');

  const currentCategoryObj = CATEGORIES.find((c) => c.id === activeCategory) || CATEGORIES[0];

  // Filtered packages based on category or search keyword
  const filteredPackages = useMemo(() => {
    let pool = PACKAGES;

    if (searchKeyword.trim()) {
      const q = searchKeyword.toLowerCase();
      const results = pool.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.destination.toLowerCase().includes(q) ||
          (p.tagline && p.tagline.toLowerCase().includes(q)) ||
          (p.travelStyle && p.travelStyle.toLowerCase().includes(q))
      );
      return results.slice(0, 3);
    }

    if (activeCategory === 'bahari') {
      pool = PACKAGES.filter(
        (p) =>
          ['labuan-bajo', 'raja-ampat', 'belitung', 'derawan'].includes(p.destinationId) ||
          p.travelStyle?.toLowerCase().includes('bahari') ||
          p.travelStyle?.toLowerCase().includes('pantai')
      );
    } else if (activeCategory === 'kaldera') {
      pool = PACKAGES.filter(
        (p) =>
          ['bromo', 'dieng', 'sumba', 'lombok'].includes(p.destinationId) ||
          p.travelStyle?.toLowerCase().includes('petualangan') ||
          p.name.toLowerCase().includes('sunrise') ||
          p.name.toLowerCase().includes('kawah')
      );
    } else if (activeCategory === 'budaya') {
      pool = PACKAGES.filter(
        (p) =>
          ['yogyakarta', 'toba', 'toraja'].includes(p.destinationId) ||
          p.travelStyle?.toLowerCase().includes('budaya') ||
          p.name.toLowerCase().includes('heritage') ||
          p.name.toLowerCase().includes('cultural')
      );
    } else if (activeCategory === 'wellness') {
      pool = PACKAGES.filter(
        (p) =>
          ['bali', 'bandung', 'belitung'].includes(p.destinationId) ||
          p.travelStyle?.toLowerCase().includes('santai') ||
          p.travelStyle?.toLowerCase().includes('healing')
      );
    }

    // Always return exactly 3 balanced items for symmetry
    return pool.slice(0, 3);
  }, [activeCategory, searchKeyword]);

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        border: '1px solid #E2E8F0',
        padding: 'clamp(1.5rem, 3.5vw, 3rem)',
        boxShadow: '0 8px 30px rgba(15, 23, 42, 0.05)',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      {/* Top Header & Search Bar Row */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: '1.5rem',
          marginBottom: '2rem',
          borderBottom: '1px solid #F1F5F9',
          paddingBottom: '1.75rem'
        }}
      >
        <div style={{ maxWidth: '640px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              backgroundColor: currentCategoryObj.bgSoft,
              color: currentCategoryObj.color,
              border: `1px solid ${currentCategoryObj.border}`,
              padding: '0.3rem 0.85rem',
              borderRadius: '9999px',
              fontSize: '0.78rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '0.65rem'
            }}
          >
            <Compass size={13} color={currentCategoryObj.color} />
            <span>Koleksi Eksklusif</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
              fontWeight: '800',
              color: '#0F172A',
              margin: '0 0 0.4rem 0',
              lineHeight: 1.2
            }}
          >
            Kurasi Perjalanan Berdasarkan Karakter
          </h2>

          <p style={{ color: '#64748B', fontSize: '0.96rem', margin: 0, lineHeight: 1.6 }}>
            {currentCategoryObj.description}
          </p>
        </div>

        {/* Live Search Input */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '340px'
          }}
        >
          <Search
            size={16}
            color="#94A3B8"
            style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
          />
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="Cari rute, pulau, atau nama trip..."
            style={{
              width: '100%',
              padding: '0.75rem 1rem 0.75rem 2.5rem',
              borderRadius: '12px',
              border: '1.5px solid #E2E8F0',
              backgroundColor: '#F8FAFC',
              fontSize: '0.88rem',
              color: '#0F172A',
              outline: 'none',
              transition: 'border-color 0.2s ease, background-color 0.2s ease'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = currentCategoryObj.color;
              e.currentTarget.style.backgroundColor = '#FFFFFF';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#E2E8F0';
              e.currentTarget.style.backgroundColor = '#F8FAFC';
            }}
          />
        </div>
      </div>

      {/* 4 Richly-Colored Category Tabs */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
          gap: '0.85rem',
          marginBottom: '2.5rem'
        }}
      >
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id && !searchKeyword;
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setActiveCategory(cat.id);
                setSearchKeyword('');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.9rem 1.1rem',
                borderRadius: '14px',
                border: isActive ? `2px solid ${cat.color}` : '1px solid #E2E8F0',
                backgroundColor: isActive ? cat.bgSoft : '#F8FAFC',
                color: isActive ? '#0F172A' : '#475569',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'left'
              }}
              className="hover:border-slate-400"
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: isActive ? cat.color : '#E2E8F0',
                  color: isActive ? '#FFFFFF' : '#475569',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Icon size={18} />
              </div>

              <div>
                <div style={{ fontSize: '0.92rem', fontWeight: isActive ? '800' : '700' }}>
                  {cat.shortLabel}
                </div>
                <div style={{ fontSize: '0.74rem', color: '#64748B', marginTop: '2px' }}>
                  Koleksi Pilihan
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Symmetric 3-Card Grid (Zero Empty Space on Left or Right) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: '1.5rem'
        }}
      >
        {filteredPackages.map((pkg) => {
          const waLink = getPackageWhatsAppLink(pkg.name);
          return (
            <div
              key={pkg.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                border: '1.5px solid #E2E8F0',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)',
                transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease'
              }}
              className="hover:-translate-y-1 hover:border-slate-400"
            >
              {/* Card Image */}
              <div style={{ position: 'relative', aspectRatio: '16/10', width: '100%', overflow: 'hidden', backgroundColor: '#0F172A' }}>
                <ImageWithFallback
                  src={pkg.heroImage || pkg.image}
                  fallbackSrc={pkg.fallbackImage}
                  alt={pkg.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                {/* Duration & Region Pill */}
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    right: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span
                    style={{
                      backgroundColor: 'rgba(15, 23, 42, 0.85)',
                      color: '#FFFFFF',
                      fontSize: '0.74rem',
                      fontWeight: '700',
                      padding: '0.3rem 0.7rem',
                      borderRadius: '8px',
                      backdropFilter: 'blur(6px)'
                    }}
                  >
                    {pkg.destination}
                  </span>

                  <span
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      color: '#0F172A',
                      fontSize: '0.74rem',
                      fontWeight: '700',
                      padding: '0.3rem 0.7rem',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}
                  >
                    <Clock size={12} color="#0F172A" />
                    <span>{pkg.duration}</span>
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
                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: '800',
                      color: currentCategoryObj.color,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '0.35rem'
                    }}
                  >
                    {pkg.travelStyleLabel || pkg.travelStyle || 'Eksklusif'}
                  </div>

                  <h3
                    style={{
                      fontSize: '1.15rem',
                      fontWeight: '800',
                      color: '#0F172A',
                      margin: '0 0 0.5rem 0',
                      lineHeight: 1.3
                    }}
                  >
                    {pkg.name}
                  </h3>

                  <p
                    style={{
                      color: '#64748B',
                      fontSize: '0.86rem',
                      lineHeight: 1.55,
                      marginBottom: '1rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {pkg.shortDescription || pkg.tagline}
                  </p>

                  {/* Highlights checklist */}
                  {pkg.highlights && pkg.highlights.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1.25rem' }}>
                      {pkg.highlights.slice(0, 2).map((h, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.8rem', color: '#334155' }}>
                          <Check size={13} color={currentCategoryObj.color} style={{ flexShrink: 0 }} />
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{h}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Price & Dual CTAs */}
                <div style={{ paddingTop: '1rem', borderTop: '1px solid #F1F5F9' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.85rem' }}>
                    <div>
                      <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block' }}>Mulai dari / orang</span>
                      <span style={{ fontSize: '1.25rem', fontWeight: '800', color: currentCategoryObj.color }}>{pkg.formattedPrice}</span>
                    </div>

                    {pkg.rating && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.82rem', fontWeight: '700', color: '#D97706' }}>
                        <Star size={13} fill="#D97706" color="#D97706" />
                        <span>{pkg.rating}</span>
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline-dark"
                      style={{
                        padding: '0.65rem',
                        fontSize: '0.82rem',
                        borderRadius: '10px',
                        justifyContent: 'center',
                        textDecoration: 'none'
                      }}
                    >
                      <WhatsAppIcon size={14} />
                      <span>WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => onSelectPackage && onSelectPackage(pkg)}
                      style={{
                        padding: '0.65rem',
                        fontSize: '0.82rem',
                        fontWeight: '800',
                        borderRadius: '10px',
                        justifyContent: 'center',
                        backgroundColor: '#0F172A',
                        color: '#FFFFFF',
                        border: `1.5px solid ${currentCategoryObj.border}`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = currentCategoryObj.color;
                        e.currentTarget.style.borderColor = currentCategoryObj.color;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#0F172A';
                        e.currentTarget.style.borderColor = currentCategoryObj.border;
                      }}
                    >
                      <span>Lihat Detail</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
