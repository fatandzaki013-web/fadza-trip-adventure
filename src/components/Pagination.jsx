import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  theme = 'yellow',
  style = {}
}) {
  if (!totalPages || totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;
  const isYellowTheme = theme === 'yellow';

  return (
    <nav
      aria-label="Navigasi Halaman"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '2.75rem',
        padding: '0.5rem',
        width: '100%',
        ...style
      }}
    >
      {/* High-Contrast Multi-Color Motion Capsule */}
      <div
        className={`pagination-capsule ${isYellowTheme ? 'pagination-theme-yellow' : ''}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0F172A',
          borderRadius: '9999px',
          padding: '8px 12px',
          border: isYellowTheme ? '2px solid #DFFF00' : '1.5px solid rgba(255, 255, 255, 0.18)',
          boxShadow: isYellowTheme
            ? '0 16px 36px -4px rgba(15, 23, 42, 0.6), 0 0 20px rgba(223, 255, 0, 0.35)'
            : '0 20px 40px -8px rgba(15, 23, 42, 0.45), 0 0 0 1px rgba(223, 255, 0, 0.12)',
          gap: '0.45rem',
          flexWrap: 'wrap',
          maxWidth: '100%'
        }}
      >
        {/* =========================================================================
            1. BAGIAN "SEBELUMNYA"
            Yellow Theme: All Yellow (#DFFF00) with Dark Navy text
            ========================================================================= */}
        <button
          type="button"
          onClick={() => !isFirst && onPageChange(currentPage - 1)}
          disabled={isFirst}
          aria-label="Halaman Sebelumnya"
          className={`pagination-motion-btn pagination-prev-btn ${isFirst ? 'disabled' : ''}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.5rem 1rem',
            minHeight: '38px',
            borderRadius: '9999px',
            backgroundColor: "#10B981",
            border: "1.5px solid #10B981",
            color: "#FFFFFF",
            fontSize: '0.85rem',
            fontWeight: '900',
            letterSpacing: '0.02em',
            cursor: isFirst ? 'not-allowed' : 'pointer',
            transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
            boxShadow: isFirst
              ? 'none'
              : (isYellowTheme ? '0 2px 10px rgba(223, 255, 0, 0.35)' : '0 4px 14px rgba(56, 189, 248, 0.25)'),
            flexShrink: 0
          }}
        >
          <ChevronLeft
            size={16}
            className="prev-arrow-icon"
            color="#FFFFFF"
            style={{ transition: 'transform 0.25s ease' }}
          />
          <span className="pagination-text">Sebelumnya</span>
        </button>

        {/* =========================================================================
            2. BAGIAN "1, 2, 3, 4..." (ANGKA-ANGKA HALAMAN)
            Yellow Theme: Inactives are ALL YELLOW (#DFFF00)
            Active Page: DIBEDAKAN! (Solid Dark Navy #0F172A with Glowing Yellow Text & Pulse!)
            ========================================================================= */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}
        >
          {pages.map((p) => {
            const isActive = p === currentPage;
            return (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                aria-current={isActive ? 'page' : undefined}
                aria-label={`Halaman ${p}`}
                className={`pagination-motion-btn pagination-num-btn ${isActive ? 'active-pulse active-page-distinct' : ''}`}
                style={{
                  minWidth: '38px',
                  height: '38px',
                  borderRadius: '9999px',
                  // In Yellow Theme: Inactives are YELLOW (#DFFF00), Active is DIBEDAKAN (Dark Navy with Yellow Glowing Text!)
                  backgroundColor: "#10B981",
            border: "1.5px solid #10B981",
            color: "#FFFFFF",
            fontSize: '0.85rem',
            fontWeight: '900',
            letterSpacing: '0.02em',
            cursor: isLast ? 'not-allowed' : 'pointer',
            transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
            boxShadow: isLast
              ? 'none'
              : (isYellowTheme ? '0 2px 10px rgba(223, 255, 0, 0.35)' : '0 4px 14px rgba(16, 185, 129, 0.35)'),
            flexShrink: 0
          }}
        >
          <span className="pagination-text">Berikutnya</span>
          <ChevronRight
            size={16}
            className="next-arrow-icon"
            color="#FFFFFF"
            style={{ transition: 'transform 0.25s ease' }}
          />
        </button>
      </div>

      <style>{`
        /* Smooth Motion & Active Pulse Effects */
        @keyframes pagePulseMotion {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(223, 255, 0, 0.6), 0 4px 18px rgba(223, 255, 0, 0.5);
            transform: scale(1.08);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(223, 255, 0, 0), 0 6px 22px rgba(223, 255, 0, 0.6);
            transform: scale(1.14);
          }
        }

        .active-pulse {
          animation: pagePulseMotion 2.4s infinite cubic-bezier(0.4, 0, 0.6, 1);
          z-index: 2;
        }

        /* Hover Motion on Buttons */
        .pagination-motion-btn:not(.disabled):hover {
          transform: translateY(-2px) scale(1.06);
        }

        .pagination-motion-btn:not(.disabled):active {
          transform: scale(0.95);
        }

        /* Interactive Arrow Nudge */
        .pagination-prev-btn:not(.disabled):hover .prev-arrow-icon {
          transform: translateX(-3px);
        }

        .pagination-next-btn:not(.disabled):hover .next-arrow-icon {
          transform: translateX(3px);
        }

        /* Responsive optimizations */
        @media (max-width: 520px) {
          .pagination-capsule {
            padding: 6px 8px !important;
            gap: 0.35rem !important;
          }
          .pagination-prev-btn, .pagination-next-btn {
            padding: 0.45rem 0.75rem !important;
            min-height: 36px !important;
            font-size: 0.8rem !important;
          }
          .pagination-num-btn {
            min-width: 35px !important;
            height: 35px !important;
            font-size: 0.85rem !important;
          }
        }

        @media (max-width: 390px) {
          .pagination-text {
            display: none !important;
          }
          .pagination-prev-btn, .pagination-next-btn {
            padding: 0.45rem 0.65rem !important;
          }
        }
      `}</style>
    </nav>
  );
}
