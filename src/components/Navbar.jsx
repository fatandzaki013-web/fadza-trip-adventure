import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ArrowUpRight, MessageSquare, Globe, Ticket } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar({ activePage, setActivePage, onOpenAiChat, onOpenBooking }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: 'home', label: t('nav_home', 'Beranda') },
    { id: 'packages', label: t('nav_packages', 'Paket Wisata') },
    { id: 'destinations', label: t('nav_destinations', 'Destinasi') },
    { id: 'testimonials', label: t('nav_testimonials', 'Testimoni') },
    { id: 'gallery', label: t('nav_gallery', 'Galeri') }
  ];

  const handleNavClick = (pageId) => {
    if (pageId === 'destinations' || pageId === 'explore') {
      if (activePage === 'home') {
        const el = document.getElementById('destinations-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          setMobileMenuOpen(false);
          return;
        }
      }
      setActivePage('explore');
      setMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (pageId === 'packages' || pageId === 'styles') {
      setActivePage('packages');
      setMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isLightHeader = scrolled || activePage !== 'home';

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 900,
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          backgroundColor: isLightHeader ? 'rgba(11, 19, 32, 0.88)' : 'transparent',
          backdropFilter: isLightHeader ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: isLightHeader ? 'blur(16px)' : 'none',
          borderBottom: isLightHeader ? '1px solid rgba(255, 255, 255, 0.12)' : 'none',
          boxShadow: isLightHeader ? '0 8px 30px rgba(0, 0, 0, 0.35)' : 'none',
          padding: '0.85rem 0'
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '1380px',
            padding: '0 clamp(1rem, 3.5vw, 2.5rem)',
            gap: '1rem'
          }}
        >
          {/* Brand Logo / Wordmark (Left) - Matching Reference Cursive Logo */}
          <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('home');
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                textDecoration: 'none'
              }}
              aria-label="Fadza Trip Adventure Beranda"
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <img
                  src="/images/logo-fadza.png"
                  alt="Logo Fadza Trip Adventure"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                  }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontFamily: "var(--font-handwriting), 'Caveat', cursive",
                    fontSize: '2.1rem',
                    fontWeight: '700',
                    color: '#FFFFFF',
                    lineHeight: 0.95,
                    textShadow: '0 2px 10px rgba(0,0,0,0.7)',
                    letterSpacing: '0.02em'
                  }}
                >
                  Fadza
                </span>
                <span
                  style={{
                    fontSize: '0.62rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    fontWeight: '700',
                    color: 'rgba(255, 255, 255, 0.9)',
                    textShadow: '0 1px 4px rgba(0,0,0,0.6)',
                    marginTop: '-2px'
                  }}
                >
                  Trip Adventure
                </span>
              </div>
            </a>
          </div>

          {/* =========================================================================
              DESKTOP FLOATING FROSTED PILL CAPSULE (Visible on desktop)
              ========================================================================= */}
          <div
            className="desktop-menu-wrapper"
            style={{
              display: 'none',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.18)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '9999px',
              padding: '4px 6px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
              gap: '4px'
            }}
          >
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  style={{
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '9999px',
                    padding: '0.5rem 1.25rem',
                    fontSize: '0.88rem',
                    fontWeight: isActive ? '800' : '600',
                    backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                    color: isActive ? '#0F172A' : '#FFFFFF',
                    boxShadow: isActive ? '0 2px 10px rgba(0, 0, 0, 0.18)' : 'none',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    whiteSpace: 'nowrap',
                    textShadow: isActive ? 'none' : '0 1px 4px rgba(0,0,0,0.5)'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {link.label}
                </button>
              );
            })}

            {/* Bilingual Language Switcher inside capsule */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: 'rgba(15, 23, 42, 0.45)',
                borderRadius: '9999px',
                padding: '2px',
                marginLeft: '6px'
              }}
              role="group"
              aria-label="Language Selector"
            >
              <button
                type="button"
                onClick={() => setLanguage('id')}
                style={{
                  padding: '0.3rem 0.6rem',
                  borderRadius: '9999px',
                  border: 'none',
                  fontSize: '0.74rem',
                  fontWeight: '800',
                  cursor: 'pointer',
                  backgroundColor: language === 'id' ? '#FFFFFF' : 'transparent',
                  color: language === 'id' ? '#0F172A' : 'rgba(255, 255, 255, 0.85)',
                  boxShadow: language === 'id' ? '0 1px 4px rgba(0,0,0,0.2)' : 'none',
                  transition: 'all 0.2s ease',
                  lineHeight: 1
                }}
                title="Bahasa Indonesia"
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                style={{
                  padding: '0.3rem 0.6rem',
                  borderRadius: '9999px',
                  border: 'none',
                  fontSize: '0.74rem',
                  fontWeight: '800',
                  cursor: 'pointer',
                  backgroundColor: language === 'en' ? '#FFFFFF' : 'transparent',
                  color: language === 'en' ? '#0F172A' : 'rgba(255, 255, 255, 0.85)',
                  boxShadow: language === 'en' ? '0 1px 4px rgba(0,0,0,0.2)' : 'none',
                  transition: 'all 0.2s ease',
                  lineHeight: 1
                }}
                title="English"
              >
                EN
              </button>
            </div>
          </div>

          {/* Desktop Right Action: Book Now Pill Button with Circular Arrow Icon */}
          <div className="desktop-actions-wrapper" style={{ display: 'none', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
            {onOpenBooking && (
              <button
                type="button"
                onClick={() => onOpenBooking()}
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#0F172A',
                  fontWeight: '800',
                  fontSize: '0.9rem',
                  padding: '0.45rem 0.55rem 0.45rem 1.35rem',
                  borderRadius: '9999px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.25)';
                }}
              >
                <span>{language === 'en' ? 'Book Now' : 'Pesan Sekarang'}</span>
                <span
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#0F172A',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                  }}
                >
                  <ArrowUpRight size={17} />
                </span>
              </button>
            )}
          </div>

          {/* =========================================================================
              MOBILE & TABLET ACTIONS CLUSTER (Visible on screen width < 1080px)
              Contains: [ID|EN] + [Booking ↗] + [Hamburger]
              ========================================================================= */}
          <div className="mobile-header-actions">
            {/* Mobile Language Switcher (Directly accessible in header) */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: isLightHeader ? '#E2E8F0' : 'rgba(15, 23, 42, 0.7)',
                borderRadius: '8px',
                border: isLightHeader ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.2)',
                padding: '2px',
                gap: '1px'
              }}
              role="group"
              aria-label="Language Selector"
            >
              <button
                type="button"
                onClick={() => setLanguage('id')}
                style={{
                  padding: '0.32rem 0.55rem',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '0.74rem',
                  fontWeight: '800',
                  cursor: 'pointer',
                  backgroundColor: language === 'id' ? '#DFFF00' : 'transparent',
                  color: language === 'id' ? '#0F172A' : (isLightHeader ? '#64748B' : 'rgba(255, 255, 255, 0.8)'),
                  boxShadow: language === 'id' ? '0 1px 4px rgba(0,0,0,0.15)' : 'none',
                  transition: 'all 0.18s ease',
                  lineHeight: 1
                }}
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                style={{
                  padding: '0.32rem 0.55rem',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '0.74rem',
                  fontWeight: '800',
                  cursor: 'pointer',
                  backgroundColor: language === 'en' ? '#DFFF00' : 'transparent',
                  color: language === 'en' ? '#0F172A' : (isLightHeader ? '#64748B' : 'rgba(255, 255, 255, 0.8)'),
                  boxShadow: language === 'en' ? '0 1px 4px rgba(0,0,0,0.15)' : 'none',
                  transition: 'all 0.18s ease',
                  lineHeight: 1
                }}
              >
                EN
              </button>
            </div>

            {/* Mobile Header Direct Booking Button */}
            {onOpenBooking && (
              <button
                type="button"
                onClick={() => onOpenBooking()}
                className="mobile-header-booking-btn"
                style={{
                  backgroundColor: '#DFFF00',
                  color: '#101C2C',
                  fontWeight: '800',
                  fontSize: '0.78rem',
                  padding: '0.42rem 0.75rem',
                  borderRadius: '9px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 2px 8px rgba(223, 255, 0, 0.3)'
                }}
                aria-label="Booking Sekarang"
              >
                <Ticket size={14} />
                <span className="mobile-header-booking-text">{language === 'en' ? 'Book' : 'Booking'}</span>
              </button>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                borderRadius: '9px',
                backgroundColor: isLightHeader ? '#F2F3EE' : 'rgba(255, 255, 255, 0.18)',
                border: isLightHeader ? '1px solid #E5E7E2' : '1px solid rgba(255, 255, 255, 0.25)',
                color: isLightHeader ? '#101C2C' : '#FFFFFF',
                cursor: 'pointer',
                flexShrink: 0
              }}
              className="mobile-toggle"
              aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu navigasi'}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 899,
            backgroundColor: 'rgba(16, 28, 44, 0.65)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            paddingTop: '82px'
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="mobile-drawer-enter"
            style={{
              backgroundColor: '#FFFFFF',
              borderBottomLeftRadius: '24px',
              borderBottomRightRadius: '24px',
              padding: '1.5rem 1.25rem 2rem 1.25rem',
              boxShadow: '0 12px 32px rgba(16, 28, 44, 0.18)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.65rem',
              maxHeight: 'calc(100vh - 90px)',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Drawer Brand Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingBottom: '0.85rem', borderBottom: '1px solid #E5E7E2', marginBottom: '0.35rem' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <img
                  src="/images/logo-fadza.png"
                  alt="Logo FADZA TRIP ADVENTURE"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
              <div>
                <span style={{ fontSize: '1.05rem', fontWeight: '800', color: '#101C2C', display: 'block', lineHeight: 1.1 }}>
                  FADZA TRIP ADVENTURE
                </span>
                <span style={{ fontSize: '0.65rem', color: '#68717C', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: '600' }}>
                  Travel Concierge
                </span>
              </div>
            </div>

            {/* Mobile Drawer Language Switcher Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.5rem 0.5rem 0.75rem 0.5rem',
                borderBottom: '1px solid #E5E7E2'
              }}
            >
              <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#68717C' }}>
                {language === 'en' ? 'Language / Bahasa' : 'Pilih Bahasa'}
              </span>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                  backgroundColor: '#E2E8F0',
                  padding: '3px',
                  borderRadius: '10px'
                }}
              >
                <button
                  type="button"
                  onClick={() => setLanguage('id')}
                  style={{
                    padding: '0.4rem 0.85rem',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '0.82rem',
                    fontWeight: '800',
                    cursor: 'pointer',
                    backgroundColor: language === 'id' ? '#0F172A' : 'transparent',
                    color: language === 'id' ? '#DFFF00' : '#64748B',
                    boxShadow: language === 'id' ? '0 2px 6px rgba(0,0,0,0.15)' : 'none',
                    transition: 'all 0.18s ease'
                  }}
                  title="Bahasa Indonesia"
                >
                  ID
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  style={{
                    padding: '0.4rem 0.85rem',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '0.82rem',
                    fontWeight: '800',
                    cursor: 'pointer',
                    backgroundColor: language === 'en' ? '#0F172A' : 'transparent',
                    color: language === 'en' ? '#DFFF00' : '#64748B',
                    boxShadow: language === 'en' ? '0 2px 6px rgba(0,0,0,0.15)' : 'none',
                    transition: 'all 0.18s ease'
                  }}
                  title="English"
                >
                  EN
                </button>
              </div>
            </div>

            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1rem',
                    borderRadius: '12px',
                    backgroundColor: isActive ? '#F2F3EE' : 'transparent',
                    color: isActive ? '#101C2C' : '#68717C',
                    fontSize: '1.02rem',
                    fontWeight: isActive ? '800' : '600',
                    textAlign: 'left',
                    border: 'none',
                    cursor: 'pointer',
                    width: '100%'
                  }}
                >
                  <span>{link.label}</span>
                  {isActive && <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#DFFF00' }} />}
                </button>
              );
            })}

            <div style={{ height: '1px', backgroundColor: '#E5E7E2', margin: '0.5rem 0' }} />

            {/* Mobile Booking Sekarang Primary Button */}
            {onOpenBooking && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.95rem',
                  borderRadius: '12px',
                  backgroundColor: '#DFFF00',
                  color: '#101C2C',
                  fontSize: '1rem',
                  fontWeight: '800',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(223, 255, 0, 0.35)'
                }}
              >
                <Ticket size={18} />
                <span>{language === 'en' ? 'Book Now' : 'Booking Sekarang'}</span>
              </button>
            )}

            {/* Mobile AI Button */}
            {onOpenAiChat && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAiChat();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.85rem',
                  borderRadius: '12px',
                  backgroundColor: '#F2F3EE',
                  border: '1px solid #E5E7E2',
                  color: '#101C2C',
                  fontSize: '0.95rem',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                <MessageSquare size={16} />
                <span>{t('nav_ai_btn', 'Bantu Pilih Trip')}</span>
              </button>
            )}

            {/* Mobile Kontak Button */}
            <button
              onClick={() => handleNavClick('contact')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.85rem',
                borderRadius: '12px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #CBD5E1',
                color: '#0F172A',
                fontSize: '0.95rem',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              <span>{language === 'en' ? 'Contact Us' : 'Hubungi Kami'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Responsive CSS for Header (Complete Overflow Protection) */}
      <style>{`
        @media (min-width: 1080px) {
          .desktop-menu-wrapper {
            display: flex !important;
          }
          .desktop-actions-wrapper {
            display: flex !important;
          }
          .mobile-header-actions {
            display: none !important;
          }
        }
        @media (max-width: 1079px) {
          .desktop-menu-wrapper {
            display: none !important;
          }
          .desktop-actions-wrapper {
            display: none !important;
          }
          .mobile-header-actions {
            display: flex !important;
            align-items: center;
            gap: 0.5rem;
            flex-shrink: 0;
          }
        }
        @media (max-width: 380px) {
          .mobile-header-booking-text {
            display: none !important;
          }
          .mobile-header-booking-btn {
            padding: 0.42rem 0.55rem !important;
          }
        }
      `}</style>
    </>
  );
}
