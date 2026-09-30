import React, { useState, useMemo, useEffect } from 'react';
import { DESTINATIONS, PACKAGES } from '../data/travelData';
import { ASSET_IMAGES } from '../data/images';
import ImageWithFallback from '../components/ImageWithFallback';
import PackageCard from '../components/PackageCard';
import DestinationCard from '../components/DestinationCard';
import Pagination from '../components/Pagination';
import ModernSelect from '../components/ModernSelect';
import { Compass, Search, RotateCcw, MapPin, Clock, Wallet } from 'lucide-react';

const ITEMS_PER_PAGE = 6;

const EXPLORE_STYLES = [
  { value: 'all', label: 'Semua Gaya' },
  { value: 'Relax', label: 'Santai & Healing' },
  { value: 'Adventure', label: 'Petualangan & Bahari' },
  { value: 'Romantic', label: 'Romantis / Honeymoon' },
  { value: 'Culture', label: 'Budaya & Heritage' }
];

const EXPLORE_DURATIONS = [
  { value: 'all', label: 'Semua Durasi' },
  { value: 'short', label: 'Weekend (2–3 Hari)' },
  { value: 'medium', label: '3–5 Hari' },
  { value: 'long', label: '6+ Hari' }
];

const EXPLORE_BUDGETS = [
  { value: 'all', label: 'Semua Budget' },
  { value: 'under3m', label: '< Rp 3 Juta' },
  { value: '3mTo5m', label: 'Rp 3–5 Juta' },
  { value: '5mTo10m', label: 'Rp 5–10 Juta' },
  { value: 'over10m', label: '> Rp 10 Juta' }
];

export default function ExplorePage({
  initialFilters = {},
  onSelectPackage,
  onSelectDestination,
  onSelectDestinationDetail
}) {
  const [activeTab, setActiveTab] = useState(initialFilters.tab || 'destinations');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedStyle, setSelectedStyle] = useState(initialFilters.style || 'all');
  const [selectedDuration, setSelectedDuration] = useState(initialFilters.duration || 'all');
  const [selectedBudget, setSelectedBudget] = useState(initialFilters.budget || 'all');
  const [currentPage, setCurrentPage] = useState(1);

  // Sync initial filters
  useEffect(() => {
    if (initialFilters.tab) setActiveTab(initialFilters.tab);
    if (initialFilters.style) setSelectedStyle(initialFilters.style);
    if (initialFilters.duration) setSelectedDuration(initialFilters.duration);
    if (initialFilters.budget) setSelectedBudget(initialFilters.budget);
  }, [initialFilters]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedRegion, selectedStyle, selectedDuration, selectedBudget, activeTab]);

  const regions = [
    { id: 'all', label: 'Semua Wilayah', activeColor: '#101C2C', activeText: '#DFFF00' },
    { id: 'Bali', label: 'Bali', activeColor: '#F43F5E', activeText: '#FFFFFF' },
    { id: 'Nusa Tenggara', label: 'Nusa Tenggara', activeColor: '#0284C7', activeText: '#FFFFFF' },
    { id: 'Jawa', label: 'Jawa', activeColor: '#EA580C', activeText: '#FFFFFF' },
    { id: 'Sumatra', label: 'Sumatra', activeColor: '#7C3AED', activeText: '#FFFFFF' },
    { id: 'Kalimantan', label: 'Kalimantan', activeColor: '#16A34A', activeText: '#FFFFFF' },
    { id: 'Maluku & Papua', label: 'Maluku & Papua', activeColor: '#0D9488', activeText: '#FFFFFF' }
  ];

  // Filtered Destinations
  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((dest) => {
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchesName = dest.name.toLowerCase().includes(query);
        const matchesSubtitle = dest.subtitle && dest.subtitle.toLowerCase().includes(query);
        const matchesDesc = dest.description && dest.description.toLowerCase().includes(query);
        const matchesRegion = dest.region && dest.region.toLowerCase().includes(query);
        if (!matchesName && !matchesSubtitle && !matchesDesc && !matchesRegion) return false;
      }
      if (selectedRegion !== 'all' && dest.region !== selectedRegion) {
        return false;
      }
      return true;
    });
  }, [searchTerm, selectedRegion]);

  // Filtered Packages
  const filteredPackages = useMemo(() => {
    return PACKAGES.filter((pkg) => {
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchesName = pkg.name.toLowerCase().includes(query);
        const matchesDest = pkg.destination && pkg.destination.toLowerCase().includes(query);
        const matchesDesc = pkg.shortDescription && pkg.shortDescription.toLowerCase().includes(query);
        if (!matchesName && !matchesDest && !matchesDesc) return false;
      }
      if (selectedStyle !== 'all') {
        if (selectedStyle === 'Relax' && pkg.travelStyle !== 'Relax' && pkg.travelStyle !== 'Pantai') return false;
        if (selectedStyle === 'Adventure' && pkg.travelStyle !== 'Adventure') return false;
        if (selectedStyle === 'Romantic' && pkg.travelStyle !== 'Romantic') return false;
        if (selectedStyle === 'Culture' && pkg.travelStyle !== 'Culture') return false;
      }
      if (selectedDuration !== 'all') {
        const days = pkg.durationDays || 3;
        if (selectedDuration === 'short' && days > 3) return false;
        if (selectedDuration === 'medium' && (days < 3 || days > 5)) return false;
        if (selectedDuration === 'long' && days < 6) return false;
      }
      if (selectedBudget !== 'all') {
        const price = pkg.price || 0;
        if (selectedBudget === 'under3m' && price >= 3000000) return false;
        if (selectedBudget === '3mTo5m' && (price < 3000000 || price > 5000000)) return false;
        if (selectedBudget === '5mTo10m' && (price <= 5000000 || price > 10000000)) return false;
        if (selectedBudget === 'over10m' && price <= 10000000) return false;
      }
      return true;
    });
  }, [searchTerm, selectedStyle, selectedDuration, selectedBudget]);

  const currentList = activeTab === 'destinations' ? filteredDestinations : filteredPackages;
  const totalPages = Math.ceil(currentList.length / ITEMS_PER_PAGE) || 1;
  const paginatedList = currentList.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedRegion('all');
    setSelectedStyle('all');
    setSelectedDuration('all');
    setSelectedBudget('all');
    setCurrentPage(1);
  };

  const handleDestinationClick = (dest) => {
    if (onSelectDestinationDetail) {
      onSelectDestinationDetail(dest);
    } else if (onSelectDestination) {
      onSelectDestination(dest.name);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAFAF5', paddingTop: '80px', paddingBottom: '90px' }}>
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
        <div style={{ position: 'absolute', inset: 0, opacity: 0.22, pointerEvents: 'none' }}>
          <ImageWithFallback
            src={ASSET_IMAGES.backgrounds.destinationSection}
            fallbackSrc={ASSET_IMAGES.destinations.labuanBajo.primary}
            alt="Kepulauan Nusantara"
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
              <span>Discovery Hub Nusantara</span>
            </div>

            <h1
              className="text-editorial-hero"
              style={{
                color: '#FFFFFF',
                marginBottom: '0.85rem'
              }}
            >
              Jelajahi Keindahan <br />
              <span style={{ color: '#DFFF00' }}>Destinasi Indonesia</span>
            </h1>

            <p style={{ color: '#CBD5E1', fontSize: '1.05rem', lineHeight: 1.65 }}>
              Dari gugusan karst Raja Ampat hingga keindahan magis Bromo. Temukan lanskap eksotis, kekayaan budaya, dan paket liburan terbaik di setiap pulau.
            </p>
          </div>
        </div>
      </section>

      {/* Main Filter & Results Container */}
      <section style={{ padding: '2.5rem 0' }}>
        <div className="container">
          {/* Controls Bar: Tab switch + Search */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid #E5E7E2',
              padding: '1.5rem',
              boxShadow: '0 8px 24px rgba(16, 28, 44, 0.04)',
              marginBottom: '2rem'
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1.25rem', marginBottom: '1.25rem' }}>
              {/* Segmented View Switch */}
              <div
                style={{
                  display: 'flex',
                  backgroundColor: '#FAFAF5',
                  padding: '4px',
                  borderRadius: '12px',
                  border: '1px solid #E5E7E2'
                }}
              >
                <button
                  type="button"
                  onClick={() => setActiveTab('destinations')}
                  style={{
                    padding: '0.6rem 1.4rem',
                    borderRadius: '10px',
                    border: 'none',
                    backgroundColor: activeTab === 'destinations' ? '#101C2C' : 'transparent',
                    color: activeTab === 'destinations' ? '#DFFF00' : '#68717C',
                    fontWeight: '700',
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Destinasi ({DESTINATIONS.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('packages')}
                  style={{
                    padding: '0.6rem 1.4rem',
                    borderRadius: '10px',
                    border: 'none',
                    backgroundColor: activeTab === 'packages' ? '#101C2C' : 'transparent',
                    color: activeTab === 'packages' ? '#DFFF00' : '#68717C',
                    fontWeight: '700',
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Paket Wisata ({PACKAGES.length})
                </button>
              </div>

              {/* Search Bar */}
              <div style={{ position: 'relative', width: '100%', maxWidth: '340px' }}>
                <Search size={16} color="#68717C" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder={activeTab === 'destinations' ? 'Cari nama destinasi atau pulau...' : 'Cari nama paket wisata...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 1rem 0.65rem 2.6rem',
                    borderRadius: '12px',
                    backgroundColor: '#FAFAF5',
                    border: '1px solid #E5E7E2',
                    color: '#101C2C',
                    fontSize: '0.88rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* Region Filter for Destinations */}
            {activeTab === 'destinations' ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', paddingTop: '1rem', borderTop: '1px solid #F0F2EB' }}>
                {regions.map((reg) => {
                  const isSelected = selectedRegion === reg.id;
                  return (
                    <button
                      key={reg.id}
                      type="button"
                      onClick={() => setSelectedRegion(reg.id)}
                      style={{
                        padding: '0.45rem 1rem',
                        borderRadius: '9999px',
                        backgroundColor: isSelected ? (reg.activeColor || '#101C2C') : '#FAFAF5',
                        color: isSelected ? (reg.activeText || '#DFFF00') : '#101C2C',
                        border: isSelected ? `1px solid ${reg.activeColor || '#101C2C'}` : '1px solid #E5E7E2',
                        boxShadow: isSelected ? `0 2px 8px ${reg.activeColor}40` : 'none',
                        fontSize: '0.82rem',
                        fontWeight: isSelected ? '700' : '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {reg.label}
                    </button>
                  );
                })}
              </div>
            ) : (
              /* Dropdown Filters for Packages */
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid #F0F2EB' }}>
                <ModernSelect
                  label="Gaya Liburan"
                  value={selectedStyle}
                  onChange={setSelectedStyle}
                  options={EXPLORE_STYLES}
                  icon={Compass}
                  placeholder="Pilih Gaya"
                />

                <ModernSelect
                  label="Durasi Hari"
                  value={selectedDuration}
                  onChange={setSelectedDuration}
                  options={EXPLORE_DURATIONS}
                  icon={Clock}
                  placeholder="Pilih Durasi"
                />

                <ModernSelect
                  label="Budget Per Orang"
                  value={selectedBudget}
                  onChange={setSelectedBudget}
                  options={EXPLORE_BUDGETS}
                  icon={Wallet}
                  placeholder="Pilih Budget"
                />
              </div>
            )}
          </div>

          {/* Results Summary */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', color: '#68717C', fontSize: '0.9rem' }}>
            <span>
              Menampilkan <strong style={{ color: '#101C2C' }}>{currentList.length}</strong> {activeTab === 'destinations' ? 'destinasi' : 'paket wisata'}
            </span>
            {(searchTerm || selectedRegion !== 'all' || selectedStyle !== 'all') && (
              <button
                type="button"
                onClick={resetFilters}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.82rem',
                  color: '#101C2C',
                  background: 'none',
                  border: 'none',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
                className="hover:underline"
              >
                <RotateCcw size={13} />
                <span>Reset Pencarian</span>
              </button>
            )}
          </div>

          {/* Cards Grid */}
          {paginatedList.length > 0 ? (
            <div className={activeTab === 'destinations' ? 'grid-editorial-destinations' : 'popular-packages-grid'}>
              {activeTab === 'destinations'
                ? paginatedList.map((dest) => (
                    <DestinationCard
                      key={dest.id}
                      destination={dest}
                      onSelectDestination={handleDestinationClick}
                    />
                  ))
                : paginatedList.map((pkg) => (
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
                Tidak Ada Hasil Pencarian
              </h3>
              <p style={{ color: '#68717C', fontSize: '0.92rem', maxWidth: '420px', margin: '0 auto 1.5rem auto' }}>
                Coba sesuaikan kata kunci pencarian atau ganti wilayah filter untuk menemukan pilihan lain.
              </p>
              <button
                type="button"
                onClick={resetFilters}
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
