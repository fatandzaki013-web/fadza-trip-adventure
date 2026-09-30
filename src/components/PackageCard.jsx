import React from 'react';
import ImageWithFallback from './ImageWithFallback';
import { useLanguage } from '../context/LanguageContext';
import { Clock, MapPin, Star, ArrowRight } from 'lucide-react';

// Dynamic, vibrant Indonesian Travel Palette
function getPackageTheme(item) {
  const dest = (item.destinationId || item.destination || '').toLowerCase();
  const style = (item.travelStyle || item.travelStyleLabel || '').toLowerCase();

  if (dest.includes('bajo') || dest.includes('raja') || dest.includes('derawan') || style.includes('bahari')) {
    return {
      primary: '#0284C7',
      bgLight: '#E0F2FE',
      text: '#0369A1',
      badgeBg: '#0284C7',
      badgeText: '#FFFFFF',
      border: '#BAE6FD'
    };
  }
  if (dest.includes('bromo') || dest.includes('dieng') || dest.includes('rinjani') || style.includes('petualangan')) {
    return {
      primary: '#EA580C',
      bgLight: '#FFF7ED',
      text: '#C2410C',
      badgeBg: '#EA580C',
      badgeText: '#FFFFFF',
      border: '#FFEDD5'
    };
  }
  if (dest.includes('jogja') || dest.includes('yogyakarta') || dest.includes('toraja') || dest.includes('toba') || style.includes('budaya')) {
    return {
      primary: '#16A34A',
      bgLight: '#F0FDF4',
      text: '#15803D',
      badgeBg: '#16A34A',
      badgeText: '#FFFFFF',
      border: '#BBF7D0'
    };
  }
  if (dest.includes('bali') || style.includes('healing') || style.includes('romantic')) {
    return {
      primary: '#7C3AED',
      bgLight: '#F5F3FF',
      text: '#6D28D9',
      badgeBg: '#7C3AED',
      badgeText: '#FFFFFF',
      border: '#DDD6FE'
    };
  }
  if (dest.includes('belitung') || dest.includes('bandung') || style.includes('pantai')) {
    return {
      primary: '#0D9488',
      bgLight: '#F0FDFA',
      text: '#0F766E',
      badgeBg: '#0D9488',
      badgeText: '#FFFFFF',
      border: '#99F6E4'
    };
  }
  return {
    primary: '#D97706',
    bgLight: '#FEF3C7',
    text: '#B45309',
    badgeBg: '#D97706',
    badgeText: '#FFFFFF',
    border: '#FDE68A'
  };
}

export default function PackageCard({ pkg, packageData, onSelectPackage }) {
  const { language, t } = useLanguage();
  const item = pkg || packageData;
  if (!item) return null;

  const theme = getPackageTheme(item);

  return (
    <div
      onClick={() => onSelectPackage && onSelectPackage(item)}
      className="card-travel group"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelectPackage && onSelectPackage(item);
        }
      }}
      aria-label={`Lihat detail paket wisata ${item.name}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        cursor: 'pointer',
        position: 'relative',
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1.5px solid #E2E8F0',
        overflow: 'hidden',
        boxShadow: '0 4px 18px rgba(15, 23, 42, 0.05)',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.25s ease',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.borderColor = theme.primary;
        e.currentTarget.style.boxShadow = '0 16px 36px -8px rgba(15, 23, 42, 0.12), 0 4px 12px rgba(15, 23, 42, 0.04)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateZ(0)';
        e.currentTarget.style.borderColor = '#E2E8F0';
        e.currentTarget.style.boxShadow = '0 4px 18px rgba(15, 23, 42, 0.05)';
      }}
    >
      {/* 16:10 / 4:3 Aspect Ratio Image Container */}
      <div
        className="card-image-wrap"
        style={{
          aspectRatio: '16/10',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#0F172A'
        }}
      >
        <ImageWithFallback
          src={item.heroImage}
          fallbackSrc={item.fallbackImage}
          alt={`Paket Wisata ${item.name}`}
          objectFit="cover"
          objectPosition="center"
          loading="lazy"
        />

        {/* Top Badges with Theme Color */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            right: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 3
          }}
        >
          {item.badge ? (
            <span
              style={{
                backgroundColor: theme.badgeBg,
                color: theme.badgeText,
                padding: '0.35rem 0.8rem',
                borderRadius: '8px',
                fontSize: '0.74rem',
                fontWeight: '800',
                letterSpacing: '0.04em',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)'
              }}
            >
              {item.badge}
            </span>
          ) : (
            <span
              style={{
                backgroundColor: theme.badgeBg,
                color: theme.badgeText,
                padding: '0.35rem 0.8rem',
                borderRadius: '8px',
                fontSize: '0.74rem',
                fontWeight: '800',
                letterSpacing: '0.04em'
              }}
            >
              {item.destination}
            </span>
          )}

          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              color: '#0F172A',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              padding: '0.32rem 0.7rem',
              borderRadius: '8px',
              fontSize: '0.74rem',
              fontWeight: '800',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <Clock size={12} color="#0F172A" />
            <span>{item.duration}</span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div style={{ padding: '1.35rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Destination Location & Style Tag */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.82rem',
            fontWeight: '700',
            marginBottom: '0.45rem',
            color: theme.text
          }}
        >
          <MapPin size={14} color={theme.primary} />
          <span>{item.destination}</span>
          {item.travelStyleLabel && (
            <>
              <span style={{ opacity: 0.35 }}>•</span>
              <span
                style={{
                  backgroundColor: theme.bgLight,
                  color: theme.text,
                  padding: '0.15rem 0.5rem',
                  borderRadius: '6px',
                  fontSize: '0.72rem',
                  fontWeight: '800'
                }}
              >
                {item.travelStyleLabel}
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <h3
          style={{
            color: '#0F172A',
            fontSize: '1.18rem',
            fontWeight: '800',
            marginBottom: '0.5rem',
            lineHeight: 1.35,
            transition: 'color 0.2s ease'
          }}
          className="group-hover:text-blue-700"
        >
          {item.name}
        </h3>

        {/* Short Highlight / Description */}
        <p
          style={{
            color: '#334155',
            fontSize: '0.88rem',
            fontWeight: '500',
            lineHeight: 1.55,
            marginBottom: '1.1rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {item.shortDescription || (item.highlights && item.highlights[0]) || ''}
        </p>

        {/* Price & Rating Row */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '0.95rem',
            borderTop: '1px solid #F1F5F9',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '1rem',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}
        >
          <div>
            <span style={{ fontSize: '0.74rem', color: '#475569', display: 'block', fontWeight: '700' }}>
              {t('pkg_starting_from', 'Mulai dari')}
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.2rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '1.3rem', fontWeight: '800', color: theme.text }}>
                {item.formattedPrice}
              </span>
              <span style={{ fontSize: '0.75rem', color: '#475569', fontWeight: '700' }}>{t('pkg_per_person', '/orang')}</span>
            </div>
          </div>

          {item.rating && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.84rem' }}>
              <Star size={14} fill="#F59E0B" color="#F59E0B" />
              <span style={{ fontWeight: '800', color: '#0F172A' }}>{item.rating}</span>
              {item.reviewCount && (
                <span style={{ color: '#94A3B8', fontSize: '0.74rem' }}>({item.reviewCount})</span>
              )}
            </div>
          )}
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelectPackage && onSelectPackage(item);
          }}
          style={{
            width: '100%',
            justifyContent: 'center',
            padding: '0.75rem 1rem',
            fontSize: '0.9rem',
            fontWeight: '800',
            borderRadius: '12px',
            backgroundColor: '#0F172A',
            color: '#FFFFFF',
            border: `1.5px solid ${theme.border}`,
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            transition: 'all 0.25s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = theme.primary;
            e.currentTarget.style.borderColor = theme.primary;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#0F172A';
            e.currentTarget.style.borderColor = theme.border;
          }}
        >
          <span>{t('pkg_detail_btn', 'Lihat Detail Paket')}</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}
