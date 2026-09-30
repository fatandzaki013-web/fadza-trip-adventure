import React, { useState } from 'react';
import { getGeneralWhatsAppLink } from '../utils/whatsapp';
import WhatsAppIcon from './WhatsAppIcon';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '22px',
        right: '20px',
        zIndex: 850,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '0.5rem',
        pointerEvents: 'none'
      }}
    >
      {/* Tooltip on Hover */}
      {showTooltip && (
        <div
          style={{
            backgroundColor: '#171A19',
            color: '#FFFFFF',
            border: '1px solid rgba(199, 169, 107, 0.4)',
            padding: '0.4rem 0.85rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.78rem',
            fontWeight: '600',
            boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
            whiteSpace: 'nowrap',
            animation: 'fadeIn 0.2s ease',
            pointerEvents: 'auto'
          }}
        >
          Konsultasi WhatsApp FADZA Trip Adventure
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={getGeneralWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Konsultasi WhatsApp"
        title="Konsultasi WhatsApp"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          backgroundColor: '#25D366',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 20px rgba(37, 211, 102, 0.4)',
          border: '2px solid rgba(255, 255, 255, 0.35)',
          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          cursor: 'pointer',
          textDecoration: 'none',
          pointerEvents: 'auto'
        }}
        className="floating-wa-btn"
      >
        <WhatsAppIcon size={24} color="#FFFFFF" />
      </a>

      {/* Floating animation & mobile specific size */}
      <style>{`
        .floating-wa-btn {
          animation: floatGentle 3.2s ease-in-out infinite;
        }
        .floating-wa-btn:hover {
          animation-play-state: paused;
          transform: scale(1.1) translateY(-3px) !important;
          box-shadow: 0 12px 28px rgba(37, 211, 102, 0.6) !important;
        }
        @media (max-width: 480px) {
          .floating-wa-btn {
            width: 46px !important;
            height: 46px !important;
          }
        }
      `}</style>
    </div>
  );
}
