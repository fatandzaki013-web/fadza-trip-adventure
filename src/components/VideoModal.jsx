import React, { useEffect } from 'react';
import { X, Play, Compass } from 'lucide-react';
import { getGeneralWhatsAppLink } from '../utils/whatsapp';
import { ASSET_IMAGES } from '../data/images';
import ImageWithFallback from './ImageWithFallback';
import WhatsAppIcon from './WhatsAppIcon';

export default function VideoModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1100,
        backgroundColor: 'rgba(4, 16, 22, 0.94)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '850px',
          backgroundColor: '#171A19',
          borderRadius: '24px',
          border: '1px solid rgba(199, 169, 107, 0.3)',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)',
          animation: 'fadeIn 0.3s ease'
        }}
      >
        {/* Header bar */}
        <div
          style={{
            padding: '1rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            backgroundColor: 'rgba(23, 26, 25, 0.95)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Compass size={20} color="var(--color-accent)" />
            <span style={{ fontWeight: '700', fontSize: '0.95rem', color: '#FFFFFF' }}>
              FADZA TRIP ADVENTURE — Cinematic Teaser Experience
            </span>
          </div>

          <button
            onClick={onClose}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            aria-label="Tutup video modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cinematic Video Showcase */}
        <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', backgroundColor: '#000000', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <ImageWithFallback
              src={ASSET_IMAGES.backgrounds.teaserPoster}
              alt="Cinematic Video Preview"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.8)'
              }}
            />
          </div>

          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle, rgba(23, 26, 25, 0.4) 0%, rgba(23, 26, 25, 0.85) 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '2rem',
              zIndex: 3
            }}
          >
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                backgroundColor: 'rgba(199, 169, 107, 0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#171A19',
                boxShadow: '0 0 35px rgba(199, 169, 107, 0.6)',
                marginBottom: '1.25rem',
                cursor: 'pointer',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <Play size={30} fill="#171A19" style={{ marginLeft: '4px' }} />
            </div>

            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', color: '#FFFFFF', marginBottom: '0.4rem' }}>
              Keindahan Alam Nusantara Menantimu
            </h3>
            <p style={{ color: '#D8D0C3', fontSize: '0.9rem', maxWidth: '520px', lineHeight: 1.5 }}>
              Dari puncak karst Raja Ampat hingga keajaiban laut Flores. Bersama FADZA TRIP ADVENTURE, setiap langkah adalah cerita yang tak terlupakan.
            </p>
          </div>
        </div>

        {/* Footer info in modal */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            backgroundColor: 'rgba(23, 26, 25, 0.98)',
            borderTop: '1px solid rgba(244, 240, 232, 0.1)'
          }}
        >
          <div>
            <div style={{ color: '#FFFFFF', fontWeight: '700', fontSize: '0.9rem' }}>
              Konsultasikan Rencana Liburan Impianmu
            </div>
            <div style={{ color: '#94A3B8', fontSize: '0.8rem' }}>
              Tim travel specialist FADZA siap merekomendasikan rute terbaik secara personal.
            </div>
          </div>

          <a
            href={getGeneralWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
            style={{ fontSize: '0.875rem', padding: '0.65rem 1.25rem', gap: '0.5rem' }}
            aria-label="Chat WhatsApp Sekarang"
          >
            <WhatsAppIcon size={18} color="#FFFFFF" />
            <span>Chat WhatsApp Sekarang</span>
          </a>
        </div>
      </div>
    </div>
  );
}
