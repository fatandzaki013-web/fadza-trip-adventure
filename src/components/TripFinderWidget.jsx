import React, { useState, useMemo } from 'react';
import { PACKAGES } from '../data/travelData.js';
import ImageWithFallback from './ImageWithFallback';
import WhatsAppIcon from './WhatsAppIcon';
import { getGeneralWhatsAppLink } from '../utils/whatsapp';
import {
  Compass,
  MapPin,
  Clock,
  ArrowRight,
  RotateCcw,
  Check,
  Search,
  SlidersHorizontal,
  Waves,
  Mountain,
  Landmark,
  Sailboat,
  Users
} from 'lucide-react';

const STYLE_OPTIONS = [
  { id: 'relax', label: 'Santai / Relax', icon: Waves, desc: 'Pantai & relaksasi' },
  { id: 'adventure', label: 'Petualangan', icon: Mountain, desc: 'Gunung & alam bebas' },
  { id: 'culture', label: 'Budaya / Culture', icon: Landmark, desc: 'Candi & kearifan lokal' },
  { id: 'islands', label: 'Bahari / Island', icon: Sailboat, desc: 'Phinisi & pulau eksotis' },
  { id: 'family', label: 'Keluarga / Family', icon: Users, desc: 'Tempo santai & privat' }
];

const DURATION_OPTIONS = [
  { id: 'weekend', label: '1–3 Hari', sub: 'Short Escape' },
  { id: 'extended', label: '4–5 Hari', sub: 'Extended Trip' },
  { id: 'deep', label: '6–8 Hari', sub: 'Deep Exploration' },
  { id: 'grand', label: '9+ Hari', sub: 'Grand Expedition' }
];

const BUDGET_OPTIONS = [
  { id: 'easy', label: '< Rp 3 Juta', sub: 'Efisien' },
  { id: 'comfort', label: 'Rp 3–5 Juta', sub: 'Kenyamanan' },
  { id: 'premium', label: 'Rp 5–10 Juta', sub: 'Eksklusif' },
  { id: 'signature', label: 'Rp 10 Juta+', sub: 'Signature' }
];

export default function TripFinderWidget({ onSelectPackage }) {
  const [selectedStyle, setSelectedStyle] = useState('islands');
  const [selectedDuration, setSelectedDuration] = useState('extended');
  const [selectedBudget, setSelectedBudget] = useState('comfort');
  const [hasSearched, setHasSearched] = useState(false);

  // Smart scoring algorithm based on verified package data
  const { matches, matchReason } = useMemo(() => {
    const scored = PACKAGES.map((pkg) => {
      let score = 0;
      const combined = (
        pkg.name + ' ' +
        (pkg.category || '') + ' ' +
        (pkg.travelStyle || '') + ' ' +
        (pkg.travelStyleLabel || '') + ' ' +
        (pkg.tagline || '') + ' ' +
        pkg.destination
      ).toLowerCase();

      // Style matching
      if (selectedStyle === 'relax') {
        if (combined.includes('pantai') || combined.includes('healing') || combined.includes('relaksasi') || pkg.destinationId === 'bali') score += 40;
      } else if (selectedStyle === 'adventure') {
        if (combined.includes('pegunungan') || combined.includes('kawah') || combined.includes('sunrise') || ['bromo', 'sumba', 'dieng'].includes(pkg.destinationId)) score += 40;
      } else if (selectedStyle === 'culture') {
        if (combined.includes('budaya') || combined.includes('heritage') || combined.includes('candi') || ['yogyakarta', 'toba', 'toraja'].includes(pkg.destinationId)) score += 40;
      } else if (selectedStyle === 'islands') {
        if (combined.includes('phinisi') || combined.includes('island') || combined.includes('bahari') || ['labuan-bajo', 'raja-ampat', 'derawan', 'belitung'].includes(pkg.destinationId)) score += 45;
      } else if (selectedStyle === 'family') {
        if (['bali-escape', 'bandung-retreat', 'belitung-island', 'yogyakarta-heritage', 'lombok-adventure'].includes(pkg.id)) score += 40;
      }

      // Duration matching
      const days = pkg.durationDays || 3;
      if (selectedDuration === 'weekend' && days <= 3) score += 30;
      else if (selectedDuration === 'extended' && days >= 4 && days <= 5) score += 30;
      else if (selectedDuration === 'deep' && days >= 6 && days <= 8) score += 30;
      else if (selectedDuration === 'grand' && days >= 8) score += 30;

      // Budget matching
      const price = pkg.price || 0;
      if (selectedBudget === 'easy' && price < 3000000) score += 25;
      else if (selectedBudget === 'comfort' && price >= 3000000 && price <= 5500000) score += 25;
      else if (selectedBudget === 'premium' && price > 5000000 && price <= 10000000) score += 25;
      else if (selectedBudget === 'signature' && price > 8500000) score += 25;

      return { pkg, score };
    });

    scored.sort((a, b) => b.score - a.score);
    const topMatches = scored.slice(0, 3).map((s) => s.pkg);

    const styleObj = STYLE_OPTIONS.find((s) => s.id === selectedStyle);
    const durObj = DURATION_OPTIONS.find((d) => d.id === selectedDuration);
    const bgtObj = BUDGET_OPTIONS.find((b) => b.id === selectedBudget);

    const reason = `Menampilkan 3 rekomendasi terbaik untuk gaya ${styleObj?.label || 'Eksplorasi'}, durasi ${durObj?.label || 'fleksibel'}, dan estimasi anggaran ${bgtObj?.label || 'terpilih'}.`;

    return { matches: topMatches, matchReason: reason };
  }, [selectedStyle, selectedDuration, selectedBudget]);

  const resetPreferences = () => {
    setSelectedStyle('islands');
    setSelectedDuration('extended');
    setSelectedBudget('comfort');
    setHasSearched(false);
  };

  const handleSearchClick = () => {
    setHasSearched(true);
    const resultsEl = document.getElementById('trip-finder-results');
    if (resultsEl) {
      resultsEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        border: '1px solid #E5E7E2',
        padding: 'clamp(1.5rem, 3.5vw, 2.75rem)',
        boxShadow: '0 10px 32px rgba(16, 28, 44, 0.05)',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      {/* Header: Editorial & Concise */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '1rem',
          marginBottom: '2rem',
          borderBottom: '1px solid #F0F2EC',
          paddingBottom: '1.5rem'
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              backgroundColor: '#101C2C',
              color: '#DFFF00',
              fontSize: '0.75rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              padding: '0.3rem 0.85rem',
              borderRadius: '9999px',
              marginBottom: '0.75rem'
            }}
          >
            <Compass size={14} color="#DFFF00" />
            <span>Find Your Journey</span>
          </div>

          <h2
            className="text-editorial-title"
            style={{
              color: '#101C2C',
              margin: '0 0 0.4rem 0'
            }}
          >
            Temukan Perjalanan yang Tepat
          </h2>

          <p style={{ color: '#68717C', fontSize: '0.95rem', margin: 0, lineHeight: 1.5 }}>
            Temukan perjalanan yang sesuai dengan gaya, waktu, dan budget Anda dalam hitungan detik.
          </p>
        </div>

        <button
          type="button"
          onClick={resetPreferences}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            background: '#FAFAF5',
            border: '1px solid #E5E7E2',
            color: '#68717C',
            padding: '0.5rem 1rem',
            borderRadius: '9999px',
            fontSize: '0.82rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            marginTop: '0.25rem'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#101C2C';
            e.currentTarget.style.borderColor = '#101C2C';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#68717C';
            e.currentTarget.style.borderColor = '#E5E7E2';
          }}
        >
          <RotateCcw size={14} />
          <span>Reset</span>
        </button>
      </div>

      {/* Compact Interactive Journey Selector (3 Compact Rows) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem', marginBottom: '2rem' }}>
        {/* Step 01: Travel Style */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: '800',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#B86B4B',
                backgroundColor: 'rgba(184, 107, 75, 0.12)',
                padding: '0.2rem 0.6rem',
                borderRadius: '6px'
              }}
            >
              Step 01
            </span>
            <span style={{ fontSize: '0.95rem', fontWeight: '700', color: '#101C2C' }}>
              Gaya Perjalanan (Travel Style)
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))',
              gap: '0.65rem'
            }}
          >
            {STYLE_OPTIONS.map((opt) => {
              const isSelected = selectedStyle === opt.id;
              const Icon = opt.icon;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedStyle(opt.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    padding: '0.7rem 0.95rem',
                    borderRadius: '12px',
                    border: isSelected ? '1.5px solid #101C2C' : '1px solid #E5E7E2',
                    backgroundColor: isSelected ? '#101C2C' : '#FAFAF5',
                    color: isSelected ? '#FFFFFF' : '#101C2C',
                    cursor: 'pointer',
                    transition: 'all 0.18s ease',
                    textAlign: 'left'
                  }}
                >
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '8px',
                      backgroundColor: isSelected ? '#DFFF00' : '#E5E7E2',
                      color: '#101C2C',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Icon size={15} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: '700', lineHeight: 1.2 }}>{opt.label}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 02: Duration */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: '800',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#C9A45C',
                backgroundColor: 'rgba(201, 164, 92, 0.14)',
                padding: '0.2rem 0.6rem',
                borderRadius: '6px'
              }}
            >
              Step 02
            </span>
            <span style={{ fontSize: '0.95rem', fontWeight: '700', color: '#101C2C' }}>
              Durasi Waktu (Duration)
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))',
              gap: '0.65rem'
            }}
          >
            {DURATION_OPTIONS.map((opt) => {
              const isSelected = selectedDuration === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedDuration(opt.id)}
                  style={{
                    padding: '0.65rem 0.95rem',
                    borderRadius: '12px',
                    border: isSelected ? '1.5px solid #101C2C' : '1px solid #E5E7E2',
                    backgroundColor: isSelected ? '#101C2C' : '#FAFAF5',
                    color: isSelected ? '#FFFFFF' : '#101C2C',
                    cursor: 'pointer',
                    transition: 'all 0.18s ease',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ fontSize: '0.88rem', fontWeight: '700', lineHeight: 1.2 }}>{opt.label}</div>
                  <div style={{ fontSize: '0.74rem', color: isSelected ? '#DFFF00' : '#88929E', marginTop: '2px' }}>
                    {opt.sub}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 03: Budget */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: '800',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#101C2C',
                backgroundColor: '#E5E7E2',
                padding: '0.2rem 0.6rem',
                borderRadius: '6px'
              }}
            >
              Step 03
            </span>
            <span style={{ fontSize: '0.95rem', fontWeight: '700', color: '#101C2C' }}>
              Estimasi Anggaran per Orang (Budget)
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))',
              gap: '0.65rem'
            }}
          >
            {BUDGET_OPTIONS.map((opt) => {
              const isSelected = selectedBudget === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedBudget(opt.id)}
                  style={{
                    padding: '0.65rem 0.95rem',
                    borderRadius: '12px',
                    border: isSelected ? '1.5px solid #101C2C' : '1px solid #E5E7E2',
                    backgroundColor: isSelected ? '#101C2C' : '#FAFAF5',
                    color: isSelected ? '#FFFFFF' : '#101C2C',
                    cursor: 'pointer',
                    transition: 'all 0.18s ease',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ fontSize: '0.88rem', fontWeight: '700', lineHeight: 1.2 }}>{opt.label}</div>
                  <div style={{ fontSize: '0.74rem', color: isSelected ? '#DFFF00' : '#88929E', marginTop: '2px' }}>
                    {opt.sub}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Action / Trigger Row */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          padding: '1rem 1.25rem',
          backgroundColor: '#FAFAF5',
          borderRadius: '16px',
          border: '1px solid #E5E7E2',
          marginBottom: '2rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <SlidersHorizontal size={16} color="#B86B4B" />
          <span style={{ fontSize: '0.82rem', color: '#68717C' }}>Kriteria Anda:</span>
          <span
            style={{
              fontSize: '0.82rem',
              fontWeight: '700',
              color: '#101C2C',
              backgroundColor: '#FFFFFF',
              padding: '0.2rem 0.65rem',
              borderRadius: '6px',
              border: '1px solid #E5E7E2'
            }}
          >
            {STYLE_OPTIONS.find((s) => s.id === selectedStyle)?.label} •{' '}
            {DURATION_OPTIONS.find((d) => d.id === selectedDuration)?.label} •{' '}
            {BUDGET_OPTIONS.find((b) => b.id === selectedBudget)?.label}
          </span>
        </div>

        <button
          type="button"
          onClick={handleSearchClick}
          className="btn-lime"
          style={{
            padding: '0.7rem 1.65rem',
            fontSize: '0.9rem',
            borderRadius: '12px'
          }}
        >
          <Search size={16} />
          <span>Temukan Perjalanan ({matches.length} Paket)</span>
        </button>
      </div>

      {/* Recommendations Results (3 Balanced Cards) */}
      <div id="trip-finder-results">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
            marginBottom: '1.25rem'
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#101C2C', margin: 0 }}>
              Rekomendasi Paket Terpilih
            </h3>
            <p style={{ color: '#68717C', fontSize: '0.84rem', margin: '0.2rem 0 0 0' }}>
              {matchReason}
            </p>
          </div>
          <span className="badge-gold">
            Terverifikasi FADZA
          </span>
        </div>

        <div className="popular-packages-grid">
          {matches.map((pkg) => (
            <div
              key={pkg.id}
              className="card-travel"
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                position: 'relative'
              }}
            >
              {/* Image Preview */}
              <div className="card-image-wrap">
                <ImageWithFallback
                  src={pkg.image}
                  fallbackSrc={pkg.fallbackImage}
                  alt={pkg.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '0.75rem',
                    left: '0.75rem',
                    display: 'flex',
                    gap: '0.4rem',
                    zIndex: 2
                  }}
                >
                  <span
                    style={{
                      backgroundColor: 'rgba(16, 28, 44, 0.85)',
                      backdropFilter: 'blur(6px)',
                      color: '#FFFFFF',
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      padding: '0.3rem 0.65rem',
                      borderRadius: '6px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    <MapPin size={12} color="#DFFF00" />
                    <span>{pkg.destination}</span>
                  </span>
                  <span
                    style={{
                      backgroundColor: 'rgba(184, 107, 75, 0.92)',
                      color: '#FFFFFF',
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      padding: '0.3rem 0.65rem',
                      borderRadius: '6px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    <Clock size={12} />
                    <span>{pkg.duration}</span>
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h4
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: '800',
                    color: '#101C2C',
                    marginBottom: '0.4rem',
                    lineHeight: 1.3
                  }}
                >
                  {pkg.name}
                </h4>

                <p
                  style={{
                    fontSize: '0.82rem',
                    color: '#68717C',
                    lineHeight: 1.5,
                    marginBottom: '1rem',
                    flexGrow: 1
                  }}
                >
                  {pkg.tagline || pkg.shortDescription}
                </p>

                {/* Price & Action Row */}
                <div
                  style={{
                    paddingTop: '0.85rem',
                    borderTop: '1px solid #E5E7E2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.75rem',
                    marginTop: 'auto'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.72rem', color: '#94A3B8', display: 'block' }}>Mulai dari</span>
                    <span style={{ fontSize: '1.15rem', fontWeight: '800', color: '#101C2C' }}>
                      {pkg.priceFormatted}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}> /pax</span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.45rem' }}>
                    <button
                      type="button"
                      onClick={() => onSelectPackage && onSelectPackage(pkg)}
                      className="btn-lime"
                      style={{
                        padding: '0.55rem 0.95rem',
                        fontSize: '0.8rem',
                        borderRadius: '9px',
                        minHeight: '38px'
                      }}
                    >
                      <span>Detail</span>
                      <ArrowRight size={14} />
                    </button>

                    <a
                      href={getGeneralWhatsAppLink(`Halo FADZA TRIP ADVENTURE, saya tertarik dengan paket ${pkg.name}. Mohon informasi jadwal dan ketersediaan.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '9px',
                        backgroundColor: '#25D366',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textDecoration: 'none',
                        transition: 'transform 0.18s ease'
                      }}
                      className="hover:scale-105"
                      title="Konsultasi via WhatsApp"
                    >
                      <WhatsAppIcon size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
