import React, { useState, useEffect, useMemo } from 'react';
import { GALLERY_ITEMS } from '../data/travelData';
import { ASSET_IMAGES } from '../data/images';
import ImageWithFallback from '../components/ImageWithFallback';
import Pagination from '../components/Pagination';
import { Eye, MapPin, ArrowUpRight, Camera } from 'lucide-react';

const ITEMS_PER_PAGE = 6;

export default function GalleryPage({ onOpenLightbox }) {
  const [selectedDest, setSelectedDest] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filterTabs = [
    { id: 'all', label: 'Semua Destinasi' },
    { id: 'raja-ampat', label: 'Raja Ampat' },
    { id: 'labuan-bajo', label: 'Labuan Bajo' },
    { id: 'bali', label: 'Bali' },
    { id: 'bromo', label: 'Bromo' },
    { id: 'yogyakarta', label: 'Yogyakarta' },
    { id: 'lombok', label: 'Lombok' },
    { id: 'sumba', label: 'Sumba' },
    { id: 'toba', label: 'Danau Toba' },
    { id: 'derawan', label: 'Derawan' },
    { id: 'belitung', label: 'Belitung' },
    { id: 'dieng', label: 'Dieng' },
    { id: 'toraja', label: 'Toraja' }
  ];

  const getGalleryPageTheme = (destId, dest) => {
    const d = ((destId || '') + ' ' + (dest || '')).toLowerCase();
    if (d.includes('raja')) return { bg: '#0284C7', text: '#FFFFFF', border: '#38BDF8' };
    if (d.includes('bromo')) return { bg: '#EA580C', text: '#FFFFFF', border: '#FB923C' };
    if (d.includes('bali')) return { bg: '#F43F5E', text: '#FFFFFF', border: '#FB7185' };
    if (d.includes('bajo')) return { bg: '#D97706', text: '#FFFFFF', border: '#FBBF24' };
    if (d.includes('jogja') || d.includes('yogyakarta')) return { bg: '#16A34A', text: '#FFFFFF', border: '#4ADE80' };
    if (d.includes('lombok')) return { bg: '#0D9488', text: '#FFFFFF', border: '#2DD4BF' };
    if (d.includes('sumba')) return { bg: '#C2410C', text: '#FFFFFF', border: '#F97316' };
    if (d.includes('toba')) return { bg: '#6366F1', text: '#FFFFFF', border: '#818CF8' };
    return { bg: '#101C2C', text: '#DFFF00', border: 'rgba(223, 255, 0, 0.4)' };
  };

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedDest]);

  const filteredItems = useMemo(() => {
    return GALLERY_ITEMS.filter((item) => {
      if (selectedDest === 'all') return true;
      return item.destinationId === selectedDest;
    });
  }, [selectedDest]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const safeCurrentPage = Math.min(Math.max(1, currentPage), Math.max(1, totalPages));

  const displayedItems = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredItems, safeCurrentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    const el = document.getElementById('gallery-catalog-section');
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAFAF5', paddingTop: '80px', paddingBottom: '90px' }}>
      {/* Top Banner (Navy #101C2C with atmospheric backdrop) */}
      <section
        style={{
          position: 'relative',
          backgroundColor: '#101C2C',
          padding: '4.5rem 0 4rem 0',
          color: '#FFFFFF',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'absolute', inset: 0, opacity: 0.22, pointerEvents: 'none' }}>
          <ImageWithFallback
            src={ASSET_IMAGES.backgrounds.experience}
            fallbackSrc={ASSET_IMAGES.destinations.rajaAmpat.primary}
            alt="Kepulauan Indonesia"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 5 }}>
          <div style={{ maxWidth: '800px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                backgroundColor: 'rgba(223, 255, 0, 0.15)',
                border: '1px solid rgba(223, 255, 0, 0.35)',
                color: '#DFFF00',
                padding: '0.35rem 0.85rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: '700',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '1.25rem'
              }}
            >
              <Camera size={14} />
              <span>Dokumentasi Visual Autentik</span>
            </div>

            <h1
              className="text-editorial-hero"
              style={{
                color: '#FFFFFF',
                marginBottom: '1rem'
              }}
            >
              Galeri Momen Perjalanan <br />
              <span style={{ color: '#DFFF00' }}>Keindahan Nusantara</span>
            </h1>

            <p style={{ color: '#CBD5E1', fontSize: '1.05rem', lineHeight: 1.65, maxWidth: '680px' }}>
              Kumpulan dokumentasi autentik dari setiap ekspedisi dan perjalanan privat bersama FADZA TRIP ADVENTURE. Lanskap alami, budaya lokal, dan cerita nyata para penjelajah.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Filter & Balanced Grid Section */}
      <section id="gallery-catalog-section" style={{ padding: '3rem 0' }}>
        <div className="container">
          {/* Destination Filter Tabs */}
          <div
            style={{
              display: 'flex',
              gap: '0.6rem',
              overflowX: 'auto',
              paddingBottom: '0.85rem',
              marginBottom: '2rem'
            }}
          >
            {filterTabs.map((tab) => {
              const isSelected = selectedDest === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedDest(tab.id)}
                  style={{
                    padding: '0.55rem 1.25rem',
                    borderRadius: '9999px',
                    fontSize: '0.85rem',
                    fontWeight: isSelected ? '700' : '600',
                    backgroundColor: isSelected ? '#101C2C' : '#FFFFFF',
                    color: isSelected ? '#DFFF00' : '#101C2C',
                    border: isSelected ? '1.5px solid #101C2C' : '1px solid #E5E7E2',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 4px 14px rgba(16, 28, 44, 0.15)' : '0 2px 6px rgba(16, 28, 44, 0.04)'
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Results Summary Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ color: '#68717C', fontSize: '0.92rem' }}>
              Menampilkan <strong style={{ color: '#101C2C' }}>{filteredItems.length}</strong> foto dokumentasi
              {selectedDest !== 'all' && (
                <span> untuk destinasi <strong>{filterTabs.find(t => t.id === selectedDest)?.label}</strong></span>
              )}
            </div>

            {totalPages > 1 && (
              <span style={{ fontSize: '0.82rem', color: '#8A939E', fontWeight: '600' }}>
                Halaman {safeCurrentPage} dari {totalPages}
              </span>
            )}
          </div>

          {/* Balanced 3-Column Desktop Grid (6 items per page, exactly 3x2) */}
          <div className="grid-editorial-destinations">
            {displayedItems.map((item, idx) => {
              const fullIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE + idx;
              const gTheme = getGalleryPageTheme(item.destinationId, item.destination);
              return (
                <div
                  key={item.id}
                  onClick={() => onOpenLightbox && onOpenLightbox(item, fullIndex, filteredItems)}
                  style={{
                    borderRadius: '20px',
                    overflow: 'hidden',
                    height: '320px',
                    position: 'relative',
                    cursor: 'pointer',
                    backgroundColor: '#101C2C',
                    boxShadow: '0 8px 24px rgba(16, 28, 44, 0.08)',
                    transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
                  }}
                  className="group hover:-translate-y-2 hover:shadow-2xl"
                >
                  <ImageWithFallback
                    src={item.image || item.src}
                    fallbackSrc={item.fallback || item.fallbackSrc}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)'
                    }}
                    className="group-hover:scale-108"
                  />

                  {/* Gradient Legibility Vignette */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(16, 28, 44, 0.92) 0%, rgba(16, 28, 44, 0.3) 50%, transparent 100%)',
                      zIndex: 2
                    }}
                  />

                  {/* Category Pill Top Right */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      backgroundColor: gTheme.bg,
                      color: gTheme.text,
                      padding: '0.3rem 0.8rem',
                      borderRadius: '8px',
                      fontSize: '0.74rem',
                      fontWeight: '800',
                      border: `1px solid ${gTheme.border}`,
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                      zIndex: 3
                    }}
                  >
                    {item.category || item.destination}
                  </div>

                  {/* Bottom Information */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '1.25rem',
                      left: '1.25rem',
                      right: '1.25rem',
                      zIndex: 3
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: gTheme.border, fontSize: '0.78rem', fontWeight: '700', marginBottom: '0.25rem' }}>
                      <MapPin size={13} color={gTheme.border} />
                      <span>{item.location || item.destination}</span>
                    </div>

                    <h3 style={{ color: '#FFFFFF', fontSize: '1.1rem', fontWeight: '800', lineHeight: 1.3, margin: '0 0 0.35rem 0' }}>
                      {item.title}
                    </h3>

                    <p
                      style={{
                        color: '#CBD5E1',
                        fontSize: '0.82rem',
                        lineHeight: 1.4,
                        margin: 0,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {item.shortDescription || item.description}
                    </p>
                  </div>

                  {/* Expand Icon Button Hover */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(16, 28, 44, 0.65)',
                      backdropFilter: 'blur(8px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      zIndex: 3,
                      border: '1px solid rgba(255, 255, 255, 0.15)'
                    }}
                    className="group-hover:bg-[#DFFF00] group-hover:text-[#101C2C] group-hover:border-[#DFFF00] transition-colors"
                  >
                    <ArrowUpRight size={17} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State if filter yields zero */}
          {filteredItems.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 1.5rem', backgroundColor: '#FFFFFF', borderRadius: '20px', border: '1px solid #E5E7E2', marginTop: '1.5rem' }}>
              <Camera size={36} color="#8A939E" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.25rem', color: '#101C2C', fontWeight: '700', marginBottom: '0.5rem' }}>
                Belum Ada Foto untuk Destinasi Ini
              </h3>
              <p style={{ color: '#68717C', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Katalog dokumentasi terus diperbarui dengan foto-foto perjalanan terbaru.
              </p>
              <button
                type="button"
                onClick={() => setSelectedDest('all')}
                className="btn-lime"
                style={{ padding: '0.65rem 1.5rem', borderRadius: '10px', fontSize: '0.88rem' }}
              >
                Lihat Semua Destinasi
              </button>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div style={{ marginTop: '2.5rem' }}>
              <Pagination
                currentPage={safeCurrentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
