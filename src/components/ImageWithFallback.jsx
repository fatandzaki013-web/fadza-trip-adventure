import React, { useState, useEffect } from 'react';
import { Compass } from 'lucide-react';

export default function ImageWithFallback({
  src,
  fallbackSrc,
  alt = "Foto Destinasi FADZA TRIP ADVENTURE",
  className = "",
  style = {},
  objectFit = "cover",
  objectPosition = "center",
  loading = "lazy",
  ...props
}) {
  const reliableDefault = src || fallbackSrc || '/images/hero/hero-padar-panoramic.jpg';
  const [currentSrc, setCurrentSrc] = useState(reliableDefault);
  const [isFailed, setIsFailed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setCurrentSrc(src || fallbackSrc || '/images/hero/hero-padar-panoramic.jpg');
    setIsFailed(false);
    setIsLoaded(false);
  }, [src, fallbackSrc]);

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else if (currentSrc !== '/images/hero/hero-padar-panoramic.jpg') {
      setCurrentSrc('/images/hero/hero-padar-panoramic.jpg');
    } else {
      setIsFailed(true);
    }
  };

  if (isFailed || !currentSrc) {
    return (
      <div
        className={className}
        style={{
          width: '100%',
          height: '100%',
          minHeight: '140px',
          background: 'linear-gradient(135deg, #171A19 0%, #242927 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-accent)',
          padding: '1rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          ...style
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(85,220,199,0.15) 0%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />
        <Compass size={32} opacity={0.6} />
        <span style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '0.5rem', fontWeight: '600' }}>
          {alt || "FADZA TRIP ADVENTURE"}
        </span>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading={loading}
      onError={handleError}
      onLoad={() => setIsLoaded(true)}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        objectFit: objectFit,
        objectPosition: objectPosition,
        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
        opacity: isLoaded ? 1 : 0.85,
        ...style
      }}
      {...props}
    />
  );
}
