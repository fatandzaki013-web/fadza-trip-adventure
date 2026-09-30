import React, { useState } from 'react';
import { STORIES, TESTIMONIALS } from '../data/travelData';
import { ASSET_IMAGES } from '../data/images';
import ImageWithFallback from '../components/ImageWithFallback';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { getGeneralWhatsAppLink } from '../utils/whatsapp';
import { BookOpen, Calendar, Clock, ArrowRight, Star, X } from 'lucide-react';

export default function StoriesPage() {
  const [selectedStory, setSelectedStory] = useState(null);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-primary)', paddingTop: '95px', paddingBottom: '80px', position: 'relative' }}>
      {/* Full-screen Fixed Nature Backdrop */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden'
        }}
      >
        <ImageWithFallback
          src={ASSET_IMAGES.destinations.bali.primary}
          fallbackSrc={ASSET_IMAGES.destinations.lombok.primary}
          alt="Lanskap Alam Nusantara"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.22,
            filter: 'brightness(0.68) contrast(1.15)'
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(23, 26, 25, 0.75) 0%, rgba(23, 26, 25, 0.95) 100%)'
          }}
        />
      </div>

      {/* Header */}
      <section style={{ padding: '2rem 0 3.5rem 0', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', position: 'relative', zIndex: 1 }}>
        <div className="container">
          <div style={{ maxWidth: '800px' }}>
            <div className="glass-badge" style={{ marginBottom: '1rem' }}>
              <BookOpen size={14} />
              <span>Inspirasi & Tips Wisata</span>
            </div>
            <h1
              className="text-editorial-hero"
              style={{
                color: '#FFFFFF',
                marginBottom: '1rem'
              }}
            >
              Cerita Penjelajah & <br />
              <span style={{ color: 'var(--color-accent)' }}>Panduan Praktis Liburan.</span>
            </h1>
            <p style={{ color: '#94A3B8', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Kumpulan artikel edukatif, rekomendasi spot tersembunyi, dan tips persiapan perjalanan dari para travel specialist FADZA TRIP ADVENTURE.
            </p>
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section style={{ padding: '3.5rem 0', position: 'relative', zIndex: 1 }}>
        <div className="container">
          <div className="grid-3" style={{ marginBottom: '5rem' }}>
            {STORIES.map((story) => (
              <div
                key={story.id}
                className="card-hover"
                style={{
                  backgroundColor: 'rgba(23, 26, 25, 0.85)',
                  border: '1px solid rgba(216, 208, 195, 0.16)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  backdropFilter: 'blur(12px)'
                }}
              >
                <div className="card-image-wrap" style={{ height: '210px', width: '100%' }}>
                  <ImageWithFallback
                    src={story.image}
                    alt={story.title}
                    objectFit="cover"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: 'rgba(23, 26, 25, 0.88)',
                      color: 'var(--color-accent)',
                      border: '1px solid rgba(199, 169, 107, 0.4)',
                      padding: '0.25rem 0.75rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      zIndex: 2
                    }}
                  >
                    {story.category}
                  </div>
                </div>

                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.78rem', color: '#94A3B8', marginBottom: '0.75rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Calendar size={13} color="var(--color-accent)" />
                      {story.date}
                    </span>
                    <span>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Clock size={13} color="var(--color-accent)" />
                      {story.readTime}
                    </span>
                  </div>

                  <h3 style={{ color: '#FFFFFF', fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.75rem', lineHeight: 1.35 }}>
                    {story.title}
                  </h3>

                  <p style={{ color: '#CBD5E1', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1 }}>
                    {story.excerpt}
                  </p>

                  <button
                    onClick={() => setSelectedStory(story)}
                    className="btn-secondary btn-sm"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <span>Baca Selengkapnya</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Customer Testimonials Section */}
          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '4rem' }}>
            <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3rem auto' }}>
              <div className="glass-badge" style={{ marginBottom: '0.75rem' }}>
                <Star size={14} />
                <span>Testimoni Pelanggan</span>
              </div>
              <h2 className="text-section-title" style={{ color: '#FFFFFF' }}>
                Kata Mereka Tentang FADZA
              </h2>
              <div style={{ marginTop: '0.65rem' }}>
                <span className="badge-demo">
                  Simulasi / Sampel Ulasan Pengguna
                </span>
              </div>
            </div>

            <div className="grid-3">
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.id}
                  className="glass-card"
                  style={{
                    padding: '1.75rem',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', color: 'var(--color-accent)', gap: '3px', marginBottom: '1rem' }}>
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={15} fill="#C7A96B" color="#C7A96B" />
                      ))}
                    </div>
                    <p style={{ color: '#F4F0E8', fontSize: '0.925rem', lineHeight: 1.65, fontStyle: 'italic', marginBottom: '1.5rem' }}>
                      "{t.text}"
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid rgba(244, 240, 232, 0.12)' }}>
                    <img src={t.avatar} alt={t.name} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <h4 style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: '700' }}>{t.name}</h4>
                      <span style={{ color: 'var(--color-taupe, #D8D0C3)', fontSize: '0.78rem' }}>{t.trip}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Article Reader Modal */}
      {selectedStory && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(4, 16, 22, 0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
          onClick={() => setSelectedStory(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#171A19',
              borderRadius: '24px',
              border: '1px solid rgba(199, 169, 107, 0.35)',
              maxWidth: '750px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)',
              animation: 'fadeIn 0.25s ease'
            }}
          >
            {/* Modal Image with Fallback */}
            <div style={{ position: 'relative', height: '280px', width: '100%' }}>
              <ImageWithFallback src={selectedStory.image} alt={selectedStory.title} objectFit="cover" />
              <button
                onClick={() => setSelectedStory(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(23, 26, 25, 0.88)',
                  border: '1px solid rgba(199, 169, 107, 0.35)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 5
                }}
                aria-label="Tutup artikel"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.8rem', color: '#94A3B8', marginBottom: '0.75rem' }}>
                <span style={{ color: 'var(--color-accent)', fontWeight: '700' }}>{selectedStory.category}</span>
                <span>•</span>
                <span>{selectedStory.date}</span>
                <span>•</span>
                <span>{selectedStory.readTime}</span>
              </div>

              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.85rem', color: '#FFFFFF', marginBottom: '1.25rem', lineHeight: 1.25 }}>
                {selectedStory.title}
              </h2>

              <div style={{ color: '#CBD5E1', fontSize: '0.975rem', lineHeight: 1.8, whiteSpace: 'pre-line', marginBottom: '2rem' }}>
                {selectedStory.content}
              </div>

              <div style={{ paddingTop: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: '#94A3B8' }}>
                  Tertarik mengunjungi destinasi ini?
                </span>
                <a
                  href={getGeneralWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp btn-sm"
                  aria-label="Chat WhatsApp"
                >
                  <WhatsAppIcon size={16} color="#FFFFFF" />
                  <span>Chat WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
