import React, { useState, useMemo } from 'react';
import {
  Search,
  MapPin,
  Calendar,
  Compass,
  ArrowRight,
  Ticket,
  Star,
  Clock,
  Users,
  CheckCircle2,
  SlidersHorizontal,
  X,
  Filter
} from 'lucide-react';
import { PACKAGES, DESTINATIONS } from '../data/travelData';
import { useLanguage } from '../context/LanguageContext';
import ImageWithFallback from './ImageWithFallback';

export default function QuickTripSearch({ onSelectPackage, onOpenBooking, onNavigate }) {
  const { language, t } = useLanguage();

  const [keyword, setKeyword] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('all');
  const [selectedStyle, setSelectedStyle] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');

  // Quick preset pills with rich vibrant categorization
  const popularKeywords = useMemo(() => [
    { label: '🏝️ Labuan Bajo Phinisi', dest: 'labuan-bajo', style: 'bahari', color: '#0284C7', bg: '#EFF6FF' },
    { label: '🌋 Bromo Golden Dawn', dest: 'bromo', style: 'gunung', color: '#EA580C', bg: '#FFF7ED' },
    { label: '🪸 Raja Ampat Karst', dest: 'raja-ampat', style: 'bahari', color: '#0D9488', bg: '#F0FDFA' },
    { label: '🏛️ Borobudur Heritage', dest: 'yogyakarta', style: 'budaya', color: '#D97706', bg: '#FEFCE8' },
    { label: '🌴 Bali & Nusa Penida', dest: 'bali', style: 'healing', color: '#7C3AED', bg: '#FAF5FF' }
  ], []);

  // Unique destinations for dropdown
  const destinationOptions = useMemo(() => {
    return DESTINATIONS.map((d) => ({ id: d.id, name: d.name }));
  }, []);

  // Filtered packages
  const filteredPackages = useMemo(() => {
    return PACKAGES.filter((pkg) => {
      // 1. Keyword search (name, subtitle, location, highlights)
      if (keyword.trim()) {
        const q = keyword.toLowerCase().trim();
        const matchName = pkg.name?.toLowerCase().includes(q);
        const matchSubtitle = pkg.subtitle?.toLowerCase().includes(q);
        const matchLocation = pkg.location?.toLowerCase().includes(q);
        const matchHighlights = pkg.highlights?.some((h) => h.toLowerCase().includes(q));
        if (!matchName && !matchSubtitle && !matchLocation && !matchHighlights) {
          return false;
        }
      }

      // 2. Destination
      if (selectedDestination !== 'all') {
        const destId = selectedDestination.toLowerCase();
        const pkgDest = (pkg.destinationId || pkg.id || '').toLowerCase();
        const pkgLoc = (pkg.location || '').toLowerCase();
        if (!pkgDest.includes(destId) && !pkgLoc.includes(destId)) {
          return false;
        }
      }

      // 3. Travel Style
      if (selectedStyle !== 'all') {
        const tags = (pkg.tags || []).map((t) => t.toLowerCase());
        const cat = (pkg.category || '').toLowerCase();
        if (selectedStyle === 'bahari') {
          const match = tags.some((t) => t.includes('laut') || t.includes('pantai') || t.includes('phinisi') || t.includes('island') || t.includes('diving') || t.includes('bahari')) || cat.includes('bahari');
          if (!match) return false;
        } else if (selectedStyle === 'gunung') {
          const match = tags.some((t) => t.includes('gunung') || t.includes('sunrise') || t.includes('bromo') || t.includes('ijen') || t.includes('hiking') || t.includes('kaldera') || t.includes('alam')) || cat.includes('pegunungan');
          if (!match) return false;
        } else if (selectedStyle === 'budaya') {
          const match = tags.some((t) => t.includes('budaya') || t.includes('heritage') || t.includes('candi') || t.includes('sejarah') || t.includes('tradisi')) || cat.includes('budaya');
          if (!match) return false;
        } else if (selectedStyle === 'healing') {
          const match = tags.some((t) => t.includes('healing') || t.includes('wellness') || t.includes('santai') || t.includes('resort') || t.includes('romantic') || t.includes('pantai'));
          if (!match) return false;
        }
      }

      // 4. Duration
      if (selectedDuration !== 'all') {
        const days = pkg.days || 3;
        if (selectedDuration === 'short' && days > 3) return false;
        if (selectedDuration === 'medium' && (days < 4 || days > 5)) return false;
        if (selectedDuration === 'long' && days < 6) return false;
      }

      return true;
    });
  }, [keyword, selectedDestination, selectedStyle, selectedDuration]);

  const handleResetFilters = () => {
    setKeyword('');
    setSelectedDestination('all');
    setSelectedStyle('all');
    setSelectedDuration('all');
  };

  const handleApplyPreset = (dest, style) => {
    setSelectedDestination(dest || 'all');
    setSelectedStyle(style || 'all');
    setKeyword('');
  };

  const formatPrice = (num) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <section
      id="trip-search-section"
      className="bg-search-atmosphere"
      style={{
        padding: '5.5rem 0',
        position: 'relative'
      }}
    >
      <div className="container" style={{ maxWidth: '1240px' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 2.75rem auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              backgroundColor: 'rgba(2, 132, 199, 0.1)',
              border: '1px solid rgba(2, 132, 199, 0.25)',
              color: '#0284C7',
              padding: '0.35rem 0.95rem',
              borderRadius: '9999px',
              fontSize: '0.78rem',
              fontWeight: '800',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '0.85rem'
            }}
          >
            <Search size={14} color="#0284C7" />
            <span>{language === 'en' ? 'Quick Tour & Ticket Search' : 'Pencarian Tiket & Paket Perjalanan'}</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(1.9rem, 3.4vw, 2.75rem)',
              fontWeight: '800',
              color: '#0F172A',
              margin: '0 0 0.65rem 0',
              letterSpacing: '-0.025em',
              lineHeight: 1.2
            }}
          >
            {language === 'en' ? 'Find Your Dream Destination & Tour Route' : 'Temukan Destinasi & Tiket Impian Anda'}
          </h2>

          <p
            style={{
              color: '#334155',
              fontSize: '1rem',
              lineHeight: 1.6,
              margin: 0
            }}
          >
            {language === 'en'
              ? 'Filter through 16 curated destinations by keyword, travel style, and duration. Book verified private tours with instant concierge assistance.'
              : 'Saring pilihan paket wisata berdasarkan rute, gaya liburan, atau durasi. Dapatkan kepastian reservasi resmi dengan pelayanan private concierge.'}
          </p>
        </div>

        {/* Executive Luxury Search Control Bar with Vivid Multi-Color Accent */}
        <div
          style={{
            position: 'relative',
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '1.5px solid #E2E8F0',
            boxShadow: '0 16px 40px -10px rgba(15, 23, 42, 0.08), 0 0 20px rgba(2, 132, 199, 0.04)',
            padding: '1.65rem',
            marginBottom: '2rem',
            overflow: 'hidden'
          }}
        >
          {/* Top Multi-Color Gradient Stripe */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #0284C7 0%, #10B981 33%, #F59E0B 66%, #8B5CF6 100%)'
            }}
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
              gap: '1rem',
              alignItems: 'end'
            }}
          >
            {/* Input 1: Keyword / Search Text */}
            <div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  color: '#0284C7',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  marginBottom: '0.45rem'
                }}
              >
                <Search size={14} color="#0284C7" />
                <span>{language === 'en' ? 'Keyword / Place' : 'Kata Kunci / Tempat'}</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder={language === 'en' ? 'e.g. Phinisi, Komodo, Bromo, Ubud...' : 'Misal: Phinisi, Komodo, Bromo, Ubud...'}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.9rem',
                    borderRadius: '10px',
                    border: '1.5px solid #CBD5E1',
                    fontSize: '0.88rem',
                    color: '#0F172A',
                    backgroundColor: '#F8FAFC',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#0284C7')}
                  onBlur={(e) => (e.target.style.borderColor = '#CBD5E1')}
                />
                {keyword && (
                  <button
                    type="button"
                    onClick={() => setKeyword('')}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: '#94A3B8',
                      cursor: 'pointer',
                      padding: 0
                    }}
                  >
                    <X size={15} />
                  </button>
                )}
              </div>
            </div>

            {/* Input 2: Destinasi Dropdown */}
            <div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  color: '#C85A32',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  marginBottom: '0.45rem'
                }}
              >
                <MapPin size={14} color="#C85A32" />
                <span>{language === 'en' ? 'Indonesian Destination' : 'Destinasi Nusantara'}</span>
              </label>
              <select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.9rem',
                  borderRadius: '10px',
                  border: '1.5px solid #CBD5E1',
                  fontSize: '0.88rem',
                  color: '#0F172A',
                  backgroundColor: '#F8FAFC',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="all">{language === 'en' ? 'All Destinations (16 Regions)' : 'Semua Destinasi (16 Wilayah)'}</option>
                {destinationOptions.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Input 3: Gaya Liburan */}
            <div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  color: '#15803D',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  marginBottom: '0.45rem'
                }}
              >
                <Compass size={14} color="#15803D" />
                <span>{language === 'en' ? 'Travel Style' : 'Gaya Liburan'}</span>
              </label>
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.9rem',
                  borderRadius: '10px',
                  border: '1.5px solid #CBD5E1',
                  fontSize: '0.88rem',
                  color: '#0F172A',
                  backgroundColor: '#F8FAFC',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="all">{language === 'en' ? 'All Travel Styles' : 'Semua Kategori Gaya'}</option>
                <option value="bahari">{language === 'en' ? '🌊 Marine & Phinisi Sailing' : '🌊 Bahari & Phinisi Sailing'}</option>
                <option value="gunung">{language === 'en' ? '🌋 Caldera & Volcanic Nature' : '🌋 Kaldera & Vulkanik Alam'}</option>
                <option value="budaya">{language === 'en' ? '🏛️ Cultural & Sacred Heritage' : '🏛️ Warisan Luhur & Budaya'}</option>
                <option value="healing">{language === 'en' ? '✨ Wellness, Relaxation & Beaches' : '✨ Wellness, Relaksasi & Pantai'}</option>
              </select>
            </div>

            {/* Input 4: Durasi Trip */}
            <div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  color: '#7C3AED',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  marginBottom: '0.45rem'
                }}
              >
                <Clock size={14} color="#7C3AED" />
                <span>{language === 'en' ? 'Trip Duration' : 'Durasi Perjalanan'}</span>
              </label>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.9rem',
                  borderRadius: '10px',
                  border: '1.5px solid #CBD5E1',
                  fontSize: '0.88rem',
                  color: '#0F172A',
                  backgroundColor: '#F8FAFC',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="all">{language === 'en' ? 'All Durations' : 'Semua Durasi'}</option>
                <option value="short">{language === 'en' ? '⚡ 3 Days 2 Nights (Weekend Short Escape)' : '⚡ 3 Hari 2 Malam (Weekend Short Escape)'}</option>
                <option value="medium">{language === 'en' ? '✨ 4 - 5 Days (Comprehensive Tour)' : '✨ 4 - 5 Hari (Ideal Comprehensive Tour)'}</option>
                <option value="long">{language === 'en' ? '🌟 6+ Days (Grand Expedition)' : '🌟 6+ Hari (Grand Expedition)'}</option>
              </select>
            </div>
          </div>

          {/* Popular Fast Picks Strip with Colorful Badges */}
          <div
            style={{
              marginTop: '1.25rem',
              paddingTop: '1rem',
              borderTop: '1px solid #F1F5F9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#334155', textTransform: 'uppercase' }}>
                {language === 'en' ? 'Popular Picks:' : 'Pilihan Populer:'}
              </span>
              {popularKeywords.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyPreset(item.dest, item.style)}
                  style={{
                    backgroundColor: item.bg || '#F1F5F9',
                    border: `1px solid ${item.color ? `${item.color}40` : '#E2E8F0'}`,
                    color: item.color || '#334155',
                    padding: '0.3rem 0.75rem',
                    borderRadius: '8px',
                    fontSize: '0.76rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                  }}
                  className="hover:scale-105"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {(keyword || selectedDestination !== 'all' || selectedStyle !== 'all' || selectedDuration !== 'all') && (
              <button
                type="button"
                onClick={handleResetFilters}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  background: 'none',
                  border: 'none',
                  color: '#EF4444',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  padding: '0.25rem 0.5rem'
                }}
              >
                <X size={14} />
                <span>{language === 'en' ? 'Reset Filters' : 'Reset Saringan'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Live Filter Meta Summary */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
            marginBottom: '1.5rem',
            padding: '0 0.5rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                fontSize: '0.88rem',
                fontWeight: '800',
                color: '#0F172A'
              }}
            >
              {language === 'en'
                ? `Showing ${filteredPackages.length} of ${PACKAGES.length} Curated Tour Packages`
                : `Ditemukan ${filteredPackages.length} Paket Wisata Siap Berangkat`}
            </span>
            <span
              style={{
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                color: '#FFFFFF',
                fontSize: '0.72rem',
                fontWeight: '800',
                padding: '0.2rem 0.65rem',
                borderRadius: '6px',
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.25)'
              }}
            >
              {language === 'en' ? '2026 Schedule Active' : 'Jadwal 2026 Aktif'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onNavigate && onNavigate('packages')}
            style={{
              background: 'none',
              border: 'none',
              color: '#0284C7',
              fontSize: '0.84rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
            className="hover:underline"
          >
            <span>{language === 'en' ? 'View All Tour Packages' : 'Lihat Seluruh Katalog Paket'}</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Search Results Grid */}
        {filteredPackages.length === 0 ? (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '3.5rem 2rem',
              textAlign: 'center',
              border: '1.5px dashed #CBD5E1',
              maxWidth: '650px',
              margin: '0 auto'
            }}
          >
            <p style={{ margin: '0 0 0.75rem 0', fontSize: '1.1rem', fontWeight: '800', color: '#0F172A' }}>
              {language === 'en' ? 'No tour packages match your selected filters' : 'Tidak ada paket yang sesuai dengan kriteria saringan Anda'}
            </p>
            <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.9rem', color: '#334155' }}>
              {language === 'en'
                ? 'Try clearing your keywords or select "All Destinations" to view all available options.'
                : 'Coba atur ulang kata kunci atau pilih "Semua Destinasi" untuk melihat seluruh opsi perjalanan.'}
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="btn-lime"
              style={{
                padding: '0.75rem 1.6rem',
                borderRadius: '10px',
                fontSize: '0.88rem',
                fontWeight: '800',
                cursor: 'pointer'
              }}
            >
              {language === 'en' ? 'Reset Filters & Show All' : 'Reset Saringan & Tampilkan Semua'}
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
              gap: '1.5rem',
              alignItems: 'stretch'
            }}
          >
            {filteredPackages.slice(0, 6).map((pkg) => (
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
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className="hover:shadow-xl hover:border-slate-300"
              >
                {/* Photo Thumbnail with Badges */}
                <div style={{ position: 'relative', height: '210px', width: '100%', overflow: 'hidden', backgroundColor: '#0F172A' }}>
                  <ImageWithFallback
                    src={pkg.heroImage || pkg.image || pkg.fallbackImage || '/images/hero/hero-padar-panoramic.jpg'}
                    fallbackSrc={pkg.fallbackImage || pkg.heroImage || '/images/hero/hero-pink-beach.jpg'}
                    alt={pkg.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                    className="hover:scale-105"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(15, 23, 42, 0.75) 0%, rgba(15, 23, 42, 0.1) 60%, transparent 100%)'
                    }}
                  />

                  {/* Top Badge: Duration & Category */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem'
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: '#101C2C',
                        color: '#DFFF00',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '6px',
                        fontSize: '0.72rem',
                        fontWeight: '800',
                        letterSpacing: '0.04em'
                      }}
                    >
                      {pkg.duration || `${pkg.days}D / ${pkg.nights}N`}
                    </span>
                    <span
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        color: '#0F172A',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '6px',
                        fontSize: '0.72rem',
                        fontWeight: '800'
                      }}
                    >
                      ⭐ {pkg.rating || '4.9'}
                    </span>
                  </div>

                  {/* Bottom Image Strip: Location */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      left: '12px',
                      right: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      color: '#FFFFFF',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      textShadow: '0 1px 3px rgba(0,0,0,0.6)'
                    }}
                  >
                    <MapPin size={13} color="#DFFF00" style={{ flexShrink: 0 }} />
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {pkg.location || 'Nusantara'}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div
                  style={{
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: '1.12rem',
                        fontWeight: '800',
                        color: '#0F172A',
                        margin: '0 0 0.45rem 0',
                        lineHeight: 1.3
                      }}
                    >
                      {pkg.name}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.84rem',
                        color: '#334155',
                        lineHeight: 1.55,
                        margin: '0 0 0.85rem 0',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {pkg.subtitle || pkg.shortDescription || 'Pengalaman privat tak terlupakan dengan pemandu lokal bersertifikasi.'}
                    </p>

                    {/* Highlights bullet points */}
                    {pkg.highlights && pkg.highlights.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1.15rem' }}>
                        {pkg.highlights.slice(0, 2).map((h, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.78rem', color: '#334155' }}>
                            <CheckCircle2 size={13} color="#16A34A" style={{ flexShrink: 0 }} />
                            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {h}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Price & Action Row */}
                  <div
                    style={{
                      borderTop: '1px solid #F1F5F9',
                      paddingTop: '0.95rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.5rem',
                      flexWrap: 'wrap'
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '0.72rem', color: '#334155', display: 'block', fontWeight: '600' }}>
                        {language === 'en' ? 'Starting from / person' : 'Mulai dari / orang'}
                      </span>
                      <strong style={{ fontSize: '1.1rem', color: '#0F172A', fontWeight: '900' }}>
                        {formatPrice(pkg.price)}
                      </strong>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <button
                        type="button"
                        onClick={() => onSelectPackage && onSelectPackage(pkg)}
                        style={{
                          padding: '0.55rem 0.85rem',
                          borderRadius: '8px',
                          border: '1.5px solid #CBD5E1',
                          backgroundColor: '#FFFFFF',
                          color: '#0F172A',
                          fontSize: '0.8rem',
                          fontWeight: '700',
                          cursor: 'pointer'
                        }}
                        className="hover:border-slate-800"
                      >
                        {language === 'en' ? 'Details' : 'Detail'}
                      </button>

                      <button
                        type="button"
                        onClick={() => onOpenBooking && onOpenBooking(pkg)}
                        className="btn-lime"
                        style={{
                          padding: '0.55rem 0.95rem',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          fontWeight: '800',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem'
                        }}
                      >
                        <Ticket size={14} />
                        <span>{language === 'en' ? 'Book Ticket' : 'Booking Tiket'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
