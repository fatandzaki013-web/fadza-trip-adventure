import React, { useState, useMemo, useEffect } from 'react';
import { PACKAGES, DESTINATIONS } from '../data/travelData';
import { ASSET_IMAGES } from '../data/images';
import ImageWithFallback from '../components/ImageWithFallback';
import PackageCard from '../components/PackageCard';
import Pagination from '../components/Pagination';
import ModernSelect from '../components/ModernSelect';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUpDown, RotateCcw, Compass, MapPin, Clock, Wallet, X } from 'lucide-react';

const ITEMS_PER_PAGE = 6;

const STYLE_OPTIONS = [
  { value: 'all', label: 'Semua Gaya' },
  { value: 'leisure', label: 'Leisure & Escape' },
  { value: 'nature', label: 'Nature & Exploration' },
  { value: 'island', label: 'Island Adventure' },
  { value: 'culture', label: 'Cultural Journey' },
  { value: 'family', label: 'Family Escape' },
  { value: 'private', label: 'Private Journey' },
  { value: 'expedition', label: 'Expedition' }
];

const DURATION_OPTIONS = [
  { value: 'all', label: 'Semua Durasi' },
  { value: '1-3', label: '1–3 Hari' },
  { value: '4-5', label: '4–5 Hari' },
  { value: '6-8', label: '6–8 Hari' },
  { value: '9+', label: '9+ Hari' }
];

const BUDGET_OPTIONS = [
  { value: 'all', label: 'Semua Anggaran' },
  { value: 'under-3m', label: '< Rp3 Juta' },
  { value: '3m-5m', label: 'Rp3–5 Juta' },
  { value: '5m-10m', label: 'Rp5–10 Juta' },
  { value: 'above-10m', label: '> Rp10 Juta' }
];

const SORT_OPTIONS = [
  { value: 'popular', label: 'Paling Populer' },
  { value: 'price-low', label: 'Harga Terendah' },
  { value: 'price-high', label: 'Harga Tertinggi' },
  { value: 'duration', label: 'Durasi Perjalanan' }
];

function matchStyle(pkg, style) {
  if (style === 'all') return true;
  const combined = (pkg.name + ' ' + (pkg.category || '') + ' ' + (pkg.travelStyle || '') + ' ' + (pkg.travelStyleLabel || '') + ' ' + (pkg.tagline || '') + ' ' + pkg.destination + ' ' + (pkg.groupSize || '')).toLowerCase();
  if (style === 'leisure') return combined.includes('pantai') || combined.includes('healing') || combined.includes('relaksasi') || combined.includes('retreat');
  if (style === 'nature') return combined.includes('pegunungan') || combined.includes('nature') || combined.includes('highland') || combined.includes('sunrise') || combined.includes('kawah');
  if (style === 'island') return combined.includes('island') || combined.includes('pulau') || combined.includes('bahari') || combined.includes('phinisi') || combined.includes('coral') || combined.includes('derawan');
  if (style === 'culture') return combined.includes('budaya') || combined.includes('culture') || combined.includes('heritage') || combined.includes('toraja') || combined.includes('yogyakarta') || combined.includes('toba');
  if (style === 'family') return ['bali-escape', 'bandung-retreat', 'belitung-island', 'yogyakarta-heritage', 'lombok-adventure', 'dieng-explorer'].includes(pkg.id);
  if (style === 'private') return (pkg.groupSize && pkg.groupSize.toLowerCase().includes('private')) || ['labuan-bajo-phinisi', 'raja-ampat-ultimate', 'wakatobi-expedition', 'toraja-heritage'].includes(pkg.id);
  if (style === 'expedition') return combined.includes('expedition') || combined.includes('ekspedisi') || combined.includes('adventure') || combined.includes('discovery') || ['raja-ampat-ultimate', 'wakatobi-expedition', 'derawan-adventure', 'sumba-paradise'].includes(pkg.id);
  return true;
}

export default function PackagesPage({
  initialDestination,
  onSelectPackage
}) {
  const { language, t } = useLanguage();
  const [selectedDest, setSelectedDest] = useState(initialDestination || 'all');
  const [selectedStyle, setSelectedStyle] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);

  const destinationOptions = useMemo(() => [
    { value: 'all', label: 'Semua Destinasi' },
    ...DESTINATIONS.map((d) => ({ value: d.name, label: d.name }))
  ], []);

  // Sync initialDestination if prop changes
  useEffect(() => {
    if (initialDestination) {
      setSelectedDest(initialDestination);
      setCurrentPage(1);
    }
  }, [initialDestination]);

  // Reset page when any filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedDest, selectedStyle, selectedDuration, selectedBudget, sortBy]);

  const filteredAndSortedPackages = useMemo(() => {
    let result = PACKAGES.filter((pkg) => {
      // Destination filter
      if (selectedDest !== 'all') {
        const target = selectedDest.toLowerCase();
        const pkgDest = (pkg.destination || '').toLowerCase();
        const pkgDestId = (pkg.destinationId || '').toLowerCase();
        if (pkgDest !== target && !pkgDest.includes(target) && pkgDestId !== target) {
          return false;
        }
      }

      // Travel style filter
      if (!matchStyle(pkg, selectedStyle)) {
        return false;
      }

      // Duration filter
      if (selectedDuration !== 'all') {
        const days = pkg.durationDays || 3;
        if (selectedDuration === '1-3' && (days < 1 || days > 3)) return false;
        if (selectedDuration === '4-5' && (days < 4 || days > 5)) return false;
        if (selectedDuration === '6-8' && (days < 6 || days > 8)) return false;
        if (selectedDuration === '9+' && days < 9) return false;
      }

      // Budget filter
      if (selectedBudget !== 'all') {
        const price = pkg.price || 0;
        if (selectedBudget === 'under-3m' && price >= 3000000) return false;
        if (selectedBudget === '3m-5m' && (price < 3000000 || price > 5000000)) return false;
        if (selectedBudget === '5m-10m' && (price <= 5000000 || price > 10000000)) return false;
        if (selectedBudget === 'above-10m' && price <= 10000000) return false;
      }

      return true;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'price-low') return (a.price || 0) - (b.price || 0);
      if (sortBy === 'price-high') return (b.price || 0) - (a.price || 0);
      if (sortBy === 'duration') return (a.durationDays || 0) - (b.durationDays || 0);
      return (b.reviewCount || 0) - (a.reviewCount || 0);
    });

    return result;
  }, [selectedDest, selectedStyle, selectedDuration, selectedBudget, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedPackages.length / ITEMS_PER_PAGE);

  // Paginated slice
  const displayedPackages = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedPackages.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedPackages, currentPage]);

  const resetAllFilters = () => {
    setSelectedDest('all');
    setSelectedStyle('all');
    setSelectedDuration('all');
    setSelectedBudget('all');
    setSortBy('popular');
    setCurrentPage(1);
  };

  const hasActiveFilters = selectedDest !== 'all' || selectedStyle !== 'all' || selectedDuration !== 'all' || selectedBudget !== 'all';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAFAF5', paddingTop: '80px', paddingBottom: '80px' }}>
      {/* Top Banner (Navy #101C2C with subtle tropical backdrop) */}
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
            src={ASSET_IMAGES.backgrounds.packageCatalog}
            fallbackSrc={ASSET_IMAGES.destinations.rajaAmpat.primary}
            alt="Alam Indonesia"
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
              <Compass size={14} color="#DFFF00" />
              <span>{language === 'en' ? 'Curated Tour Itineraries' : 'Katalog Perjalanan Terkurasi'}</span>
            </div>

            <h1
              className="text-editorial-hero"
              style={{
                color: '#FFFFFF',
                marginBottom: '0.85rem'
              }}
            >
              {language === 'en' ? (
                <>
                  Discover Handcrafted <br />
                  <span style={{ color: '#DFFF00' }}>Indonesian Tour Packages</span>
                </>
              ) : (
                <>
                  Pilihan Paket Wisata <br />
                  <span style={{ color: '#DFFF00' }}>Terbaik di Indonesia</span>
                </>
              )}
            </h1>

            <p style={{ color: '#CBD5E1', fontSize: '1.05rem', lineHeight: 1.65 }}>
              {language === 'en'
                ? 'Explore meticulously curated private itineraries featuring star-rated accommodations, licensed local guides, and transparent pricing with zero hidden surcharges.'
                : 'Jelajahi beragam itinerary privat dengan akomodasi pilihan, panduan lokal berlisensi, dan kepastian fasilitas lengkap tanpa biaya tersembunyi.'}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section style={{ padding: '2.5rem 0' }}>
        <div className="container">
          {/* Floating Filter Card */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E7E2',
              borderRadius: '20px',
              padding: '1.5rem',
              boxShadow: '0 8px 24px rgba(16, 28, 44, 0.04)',
              marginBottom: '2rem'
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                alignItems: 'flex-end'
              }}
            >
              <ModernSelect
                label="Destinasi"
                value={selectedDest}
                onChange={setSelectedDest}
                options={destinationOptions}
                icon={MapPin}
                placeholder="Pilih Destinasi"
              />

              <ModernSelect
                label="Gaya Perjalanan"
                value={selectedStyle}
                onChange={setSelectedStyle}
                options={STYLE_OPTIONS}
                icon={Compass}
                placeholder="Pilih Gaya"
              />

              <ModernSelect
                label="Durasi"
                value={selectedDuration}
                onChange={setSelectedDuration}
                options={DURATION_OPTIONS}
                icon={Clock}
                placeholder="Pilih Durasi"
              />

              <ModernSelect
                label="Anggaran"
                value={selectedBudget}
                onChange={setSelectedBudget}
                options={BUDGET_OPTIONS}
                icon={Wallet}
                placeholder="Pilih Anggaran"
              />

              <ModernSelect
                label="Urutkan"
                value={sortBy}
                onChange={setSortBy}
                options={SORT_OPTIONS}
                icon={ArrowUpDown}
                placeholder="Urutan"
              />
            </div>

            {/* Active Filters Row */}
            {hasActiveFilters && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                  paddingTop: '1rem',
                  marginTop: '1rem',
                  borderTop: '1px solid #F0F2EB'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.78rem', color: '#68717C', fontWeight: '600' }}>Filter aktif:</span>
                  {selectedDest !== 'all' && (
                    <span
                      style={{
                        backgroundColor: '#0284C7',
                        color: '#FFFFFF',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '9999px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        boxShadow: '0 2px 6px rgba(2, 132, 199, 0.3)'
                      }}
                    >
                      {selectedDest}
                      <X size={12} style={{ cursor: 'pointer' }} onClick={() => setSelectedDest('all')} />
                    </span>
                  )}
                  {selectedStyle !== 'all' && (
                    <span
                      style={{
                        backgroundColor: '#C85A32',
                        color: '#FFFFFF',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '9999px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        boxShadow: '0 2px 6px rgba(200, 90, 50, 0.3)'
                      }}
                    >
                      {STYLE_OPTIONS.find((s) => s.value === selectedStyle)?.label}
                      <X size={12} style={{ cursor: 'pointer' }} onClick={() => setSelectedStyle('all')} />
                    </span>
                  )}
                  {selectedDuration !== 'all' && (
                    <span
                      style={{
                        backgroundColor: '#15803D',
                        color: '#FFFFFF',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '9999px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        boxShadow: '0 2px 6px rgba(21, 128, 61, 0.3)'
                      }}
                    >
                      {DURATION_OPTIONS.find((d) => d.value === selectedDuration)?.label}
                      <X size={12} style={{ cursor: 'pointer' }} onClick={() => setSelectedDuration('all')} />
                    </span>
                  )}
                  {selectedBudget !== 'all' && (
                    <span
                      style={{
                        backgroundColor: '#D97706',
                        color: '#FFFFFF',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '9999px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        boxShadow: '0 2px 6px rgba(217, 119, 6, 0.3)'
                      }}
                    >
                      {BUDGET_OPTIONS.find((b) => b.value === selectedBudget)?.label}
                      <X size={12} style={{ cursor: 'pointer' }} onClick={() => setSelectedBudget('all')} />
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={resetAllFilters}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.8rem',
                    color: '#101C2C',
                    background: 'none',
                    border: 'none',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                  className="hover:underline"
                >
                  <RotateCcw size={13} />
                  <span>Reset Semua Filter</span>
                </button>
              </div>
            )}
          </div>

          {/* Results Summary Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.5rem',
              color: '#68717C',
              fontSize: '0.9rem'
            }}
          >
            <span>
              Menampilkan <strong style={{ color: '#101C2C' }}>{filteredAndSortedPackages.length}</strong> paket perjalanan
            </span>
          </div>

          {/* Package Grid */}
          {displayedPackages.length > 0 ? (
            <div className="popular-packages-grid">
              {displayedPackages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  onSelectPackage={onSelectPackage}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div
              style={{
                textAlign: 'center',
                padding: '4rem 1.5rem',
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                border: '1px solid #E5E7E2'
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#F0F2EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem auto'
                }}
              >
                <Compass size={28} color="#101C2C" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#101C2C', marginBottom: '0.5rem' }}>
                Tidak Ada Paket yang Sesuai
              </h3>
              <p style={{ color: '#68717C', fontSize: '0.92rem', maxWidth: '420px', margin: '0 auto 1.5rem auto' }}>
                Coba ubah kombinasi filter atau reset pilihan pencarian untuk melihat semua paket perjalanan yang tersedia.
              </p>
              <button
                type="button"
                onClick={resetAllFilters}
                className="btn-lime"
                style={{ padding: '0.65rem 1.4rem', borderRadius: '12px' }}
              >
                <span>Reset Semua Filter</span>
              </button>
            </div>
          )}

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </section>
    </div>
  );
}
