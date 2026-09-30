import React, { useEffect } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
  ArrowRight,
  Compass,
  CheckCircle2,
  Calendar
} from 'lucide-react';

export default function LightboxModal({
  item,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  onSelectPackage,
  onNavigate
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  if (!item) return null;

  const handleGoToPackage = (packageId) => {
    onClose();
    if (onSelectPackage) {
      onSelectPackage(packageId);
    } else if (onNavigate) {
      onNavigate('package-detail');
      window.location.hash = `package-${packageId}`;
    } else {
      window.location.hash = `package-${packageId}`;
    }
  };

  const imageSrc = item.image || item.src;
  const descriptionText =
    item.detailedDescription || item.shortDescription || item.description || item.caption;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        backgroundColor: 'rgba(10, 18, 28, 0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(0.75rem, 2.5vw, 2rem)',
        overflowY: 'auto'
      }}
      onClick={onClose}
    >
      {/* Floating Close Button */}
      <button
        onClick={onClose}
        style={{
          position: 'fixed',
          top: '18px',
          right: '18px',
          zIndex: 2030,
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          backgroundColor: '#101C2C',
          border: '1.5px solid rgba(255, 255, 255, 0.25)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#DFFF00';
          e.currentTarget.style.color = '#101C2C';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#101C2C';
          e.currentTarget.style.color = '#FFFFFF';
        }}
        aria-label="Tutup detail foto"
      >
        <X size={22} />
      </button>

      {/* Prev Button (Floating Desktop) */}
      {hasPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          style={{
            position: 'fixed',
            left: '18px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2030,
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: '#101C2C',
            border: '1.5px solid rgba(255, 255, 255, 0.25)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#DFFF00';
            e.currentTarget.style.color = '#101C2C';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#101C2C';
            e.currentTarget.style.color = '#FFFFFF';
          }}
          aria-label="Foto sebelumnya"
        >
          <ChevronLeft size={26} />
        </button>
      )}

      {/* Next Button (Floating Desktop) */}
      {hasNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          style={{
            position: 'fixed',
            right: '18px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2030,
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: '#101C2C',
            border: '1.5px solid rgba(255, 255, 255, 0.25)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#DFFF00';
            e.currentTarget.style.color = '#101C2C';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#101C2C';
            e.currentTarget.style.color = '#FFFFFF';
          }}
          aria-label="Foto selanjutnya"
        >
          <ChevronRight size={26} />
        </button>
      )}

      {/* Main Editorial Split Modal Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '1120px',
          width: '100%',
          maxHeight: '90vh',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 25px 65px rgba(0, 0, 0, 0.5)',
          animation: 'fadzaChatOpen 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'relative'
        }}
      >
        {/* Left Side: Large Visual Showcase */}
        <div
          style={{
            backgroundColor: '#101C2C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            minHeight: '340px',
            maxHeight: '85vh',
            overflow: 'hidden'
          }}
        >
          <img
            src={imageSrc}
            alt={item.title || 'Dokumentasi Visual FADZA TRIP ADVENTURE'}
            style={{
              width: '100%',
              height: '100%',
              maxHeight: '85vh',
              objectFit: 'cover',
              display: 'block'
            }}
          />

          {/* Category Overlay Tag */}
          <div
            style={{
              position: 'absolute',
              top: '1.25rem',
              left: '1.25rem',
              backgroundColor: 'rgba(16, 28, 44, 0.75)',
              backdropFilter: 'blur(8px)',
              color: '#FFFFFF',
              padding: '0.35rem 0.85rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: '700',
              border: '1px solid rgba(255, 255, 255, 0.15)'
            }}
          >
            {item.category || item.destination}
          </div>

          {/* Mobile Next/Prev In-Picture Controls */}
          <div
            style={{
              position: 'absolute',
              bottom: '1rem',
              right: '1rem',
              display: 'flex',
              gap: '0.5rem',
              zIndex: 10
            }}
          >
            {hasPrev && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onPrev();
                }}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(16, 28, 44, 0.8)',
                  backdropFilter: 'blur(6px)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <ChevronLeft size={20} />
              </button>
            )}
            {hasNext && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(16, 28, 44, 0.8)',
                  backdropFilter: 'blur(6px)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Right Side: Informative Narrative & Context Panel */}
        <div
          style={{
            padding: 'clamp(1.5rem, 3vw, 2.5rem)',
            overflowY: 'auto',
            maxHeight: '85vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxSizing: 'border-box'
          }}
        >
          <div>
            {/* Header: Location & Province */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                color: '#101C2C',
                fontSize: '0.85rem',
                fontWeight: '700',
                marginBottom: '0.5rem'
              }}
            >
              <MapPin size={15} color="#101C2C" />
              <span>{item.location || item.destination}</span>
              {item.category && (
                <>
                  <span style={{ color: '#CBD5E1' }}>•</span>
                  <span style={{ color: '#68717C', fontWeight: '600' }}>{item.category}</span>
                </>
              )}
            </div>

            {/* Title */}
            <h2
              style={{
                fontSize: 'clamp(1.5rem, 2.6vw, 1.95rem)',
                color: '#101C2C',
                fontWeight: '800',
                lineHeight: 1.25,
                margin: '0 0 1rem 0'
              }}
            >
              {item.title}
            </h2>

            {/* Detailed Narrative Description */}
            <p
              style={{
                color: '#4B5563',
                fontSize: '0.94rem',
                lineHeight: 1.65,
                marginBottom: '1.25rem'
              }}
            >
              {descriptionText}
            </p>

            {/* Keistimewaan Destinasi (Apa yang menarik) */}
            {item.travelInsight && (
              <div
                style={{
                  backgroundColor: '#F8F9F5',
                  borderLeft: '4px solid #DFFF00',
                  borderRadius: '10px',
                  padding: '0.9rem 1.15rem',
                  marginBottom: '1.25rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#101C2C', fontWeight: '800', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.35rem' }}>
                  <Compass size={14} color="#101C2C" />
                  <span>Keistimewaan Destinasi:</span>
                </div>
                <p style={{ color: '#4B5563', fontSize: '0.88rem', lineHeight: 1.55, margin: 0 }}>
                  {item.travelInsight}
                </p>
              </div>
            )}

            {/* Best Moment / Waktu Kunjungan Terbaik */}
            {item.bestMoment && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.55rem',
                  backgroundColor: '#F0F2EB',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  marginBottom: '1.5rem',
                  fontSize: '0.84rem',
                  color: '#101C2C'
                }}
              >
                <Clock size={16} color="#101C2C" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ display: 'block', fontSize: '0.76rem', textTransform: 'uppercase', color: '#68717C' }}>
                    Waktu Terbaik Menikmati Momen:
                  </strong>
                  <span style={{ fontWeight: '600' }}>{item.bestMoment}</span>
                </div>
              </div>
            )}
          </div>

          {/* Related Package Action Box */}
          {item.packageId && (
            <div
              style={{
                backgroundColor: '#101C2C',
                color: '#FFFFFF',
                borderRadius: '16px',
                padding: '1.25rem',
                marginTop: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#DFFF00', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <Compass size={13} />
                <span>Paket Terkait Destinasi Ini</span>
              </div>

              <div style={{ fontSize: '1.05rem', fontWeight: '800', lineHeight: 1.25 }}>
                {item.packageName || 'Paket Wisata Terkurasi FADZA'}
              </div>

              <p style={{ color: '#CBD5E1', fontSize: '0.82rem', margin: 0, lineHeight: 1.45 }}>
                Kunjungi spot ini bersama pemandu berpengalaman dengan fasilitas akomodasi dan transportasi privat terjamin.
              </p>

              <button
                type="button"
                onClick={() => handleGoToPackage(item.packageId)}
                className="btn-lime"
                style={{
                  padding: '0.7rem 1.25rem',
                  fontSize: '0.88rem',
                  borderRadius: '10px',
                  marginTop: '0.25rem',
                  justifyContent: 'center'
                }}
              >
                <span>Lihat Paket Terkait</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
