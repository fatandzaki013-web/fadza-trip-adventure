import React from 'react';
import ImageWithFallback from './ImageWithFallback';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUpRight, MapPin } from 'lucide-react';

function getDestinationTheme(dest) {
  const id = (dest?.id || dest?.name || '').toLowerCase();

  if (id.includes('bajo')) {
    return { badgeBg: '#0284C7', text: '#FFFFFF', pill: 'Bahari Karst' };
  }
  if (id.includes('raja')) {
    return { badgeBg: '#0D9488', text: '#FFFFFF', pill: 'Kepulauan Karang' };
  }
  if (id.includes('bali')) {
    return { badgeBg: '#F43F5E', text: '#FFFFFF', pill: 'Pulau Dewata' };
  }
  if (id.includes('bromo')) {
    return { badgeBg: '#EA580C', text: '#FFFFFF', pill: 'Kaldera Vulkanik' };
  }
  if (id.includes('jogja') || id.includes('yogyakarta')) {
    return { badgeBg: '#16A34A', text: '#FFFFFF', pill: 'Warisan Budaya' };
  }
  if (id.includes('lombok')) {
    return { badgeBg: '#0EA5E9', text: '#FFFFFF', pill: 'Gili & Pantai' };
  }
  if (id.includes('sumba')) {
    return { badgeBg: '#D97706', text: '#FFFFFF', pill: 'Sabana Eksotis' };
  }
  if (id.includes('belitung')) {
    return { badgeBg: '#0284C7', text: '#FFFFFF', pill: 'Batu Granit' };
  }
  if (id.includes('toba')) {
    return { badgeBg: '#6366F1', text: '#FFFFFF', pill: 'Danau Raksasa' };
  }
  if (id.includes('toraja')) {
    return { badgeBg: '#C2410C', text: '#FFFFFF', pill: 'Tradisi Leluhur' };
  }
  return { badgeBg: '#0F172A', text: '#FFFFFF', pill: 'Pesona Nusantara' };
}

export default function DestinationCard({ destination, onSelectDestination }) {
  const { t } = useLanguage();
  if (!destination) return null;

  const theme = getDestinationTheme(destination);

  return (
    <div
      onClick={() => onSelectDestination && onSelectDestination(destination)}
      className="group"
      style={{
        position: 'relative',
        borderRadius: '20px',
        overflow: 'hidden',
        height: '380px',
        cursor: 'pointer',
        boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease',
        backgroundColor: '#0F172A',
        boxSizing: 'border-box',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.boxShadow = '0 20px 42px -8px rgba(15, 23, 42, 0.28)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateZ(0)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(15, 23, 42, 0.08)';
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelectDestination && onSelectDestination(destination);
        }
      }}
      aria-label={`Jelajahi keindahan destinasi ${destination.name}`}
    >
      {/* Background Image */}
      <div style={{ position: 'absolute', inset: 0, height: '100%', width: '100%', overflow: 'hidden' }}>
        <ImageWithFallback
          src={destination.image}
          fallbackSrc={destination.fallbackImage}
          alt={`Destinasi ${destination.name}`}
          objectFit="cover"
          objectPosition="center"
          loading="lazy"
          style={{ width: '100%', height: '100%', transition: 'transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)' }}
          className="group-hover:scale-106"
        />
      </div>

      {/* High Contrast Gradient Overlay for Crystal Clear Text */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(11, 19, 32, 0.98) 0%, rgba(11, 19, 32, 0.75) 45%, rgba(11, 19, 32, 0.2) 100%)',
          zIndex: 2
        }}
      />

      {/* Top Badges with Rich Color Theme */}
      <div
        style={{
          position: 'absolute',
          top: '14px',
          left: '14px',
          right: '14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 5
        }}
      >
        <span
          style={{
            backgroundColor: theme.badgeBg,
            color: theme.text,
            padding: '0.35rem 0.8rem',
            borderRadius: '8px',
            fontSize: '0.74rem',
            fontWeight: '800',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)'
          }}
        >
          {destination.region || destination.province || 'Nusantara'}
        </span>

        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            transition: 'all 0.2s ease'
          }}
        >
          <ArrowUpRight size={18} />
        </div>
      </div>

      {/* Bottom Content Area */}
      <div
        style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          right: '0',
          padding: '1.4rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.4rem',
          zIndex: 5
        }}
      >
        {/* Subtitle / Tagline */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#FDE68A', fontSize: '0.8rem', fontWeight: '700' }}>
          <MapPin size={13} color="#F59E0B" />
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {destination.subtitle || destination.province}
          </span>
        </div>

        {/* Destination Name */}
        <h3
          style={{
            fontSize: 'clamp(1.4rem, 2vw, 1.8rem)',
            color: '#FFFFFF',
            fontWeight: '800',
            letterSpacing: '-0.02em',
            margin: '0 0 0.2rem 0',
            lineHeight: 1.2
          }}
        >
          {destination.name}
        </h3>

        {/* Short Description */}
        <p
          style={{
            color: '#CBD5E1',
            fontSize: '0.84rem',
            lineHeight: 1.45,
            margin: '0 0 0.5rem 0',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {destination.shortDescription || destination.description}
        </p>

        {/* Starting Price & Action */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '0.85rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
            marginTop: '0.2rem',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}
        >
          <div>
            <span style={{ fontSize: '0.7rem', color: '#94A3B8', textTransform: 'uppercase', display: 'block', fontWeight: '600' }}>
              {t('pkg_starting_from', 'Mulai dari')}
            </span>
            <span style={{ color: '#DFFF00', fontSize: '1rem', fontWeight: '800' }}>
              {destination.startingPrice ? `Rp ${(destination.startingPrice).toLocaleString('id-ID')}` : 'Rp 3.000.000'}
            </span>
          </div>

          <div
            style={{
              backgroundColor: theme.badgeBg,
              color: '#FFFFFF',
              padding: '0.35rem 0.75rem',
              borderRadius: '8px',
              fontSize: '0.75rem',
              fontWeight: '700',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)'
            }}
          >
            {theme.pill}
          </div>
        </div>
      </div>
    </div>
  );
}
