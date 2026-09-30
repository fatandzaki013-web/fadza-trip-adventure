import React, { useState, useMemo, useEffect } from 'react';
import {
  Star,
  ShieldCheck,
  MapPin,
  Compass,
  MessageSquarePlus,
  Search,
  Filter,
  ThumbsUp,
  Share2,
  CheckCircle2,
  X,
  ArrowRight,
  Heart,
  Quote,
  Calendar,
  UserCheck,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import {
  getStoredTestimonials,
  saveTestimonial,
  DESTINATION_OPTIONS,
  TRAVEL_STYLE_OPTIONS
} from '../utils/testimonials';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { getGeneralWhatsAppLink } from '../utils/whatsapp';
import Pagination from '../components/Pagination';

export default function TestimonialsPage({ onSelectPackage, onSelectDestination, onNavigate }) {
  const { language, t } = useLanguage();
  const [testimonials, setTestimonials] = useState(getStoredTestimonials);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('ALL');
  const [selectedStyle, setSelectedStyle] = useState('ALL');
  const [selectedRating, setSelectedRating] = useState('ALL');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Reset to page 1 when filters or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedDestination, selectedStyle, selectedRating]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  // Helpful votes state (local state + localStorage)
  const [helpfulVotes, setHelpfulVotes] = useState(() => {
    try {
      const saved = localStorage.getItem('fadza_helpful_votes');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  // New Testimonial Form State
  const [formData, setFormData] = useState({
    name: '',
    origin: '',
    destination: 'Labuan Bajo',
    tag: 'Private Tour Pasangan',
    rating: 5,
    title: '',
    comment: '',
    highlight: '',
    note: ''
  });

  const [formHoverRating, setFormHoverRating] = useState(0);

  // Filter logic
  const filteredTestimonials = useMemo(() => {
    return testimonials.filter((item) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name?.toLowerCase().includes(q);
        const matchesOrigin = item.origin?.toLowerCase().includes(q);
        const matchesDest = (item.destination || item.packageTitle || '').toLowerCase().includes(q);
        const matchesComment = (item.comment || item.quote || '').toLowerCase().includes(q);
        const matchesTag = item.tag?.toLowerCase().includes(q);
        const matchesNote = item.note?.toLowerCase().includes(q);
        if (!matchesName && !matchesOrigin && !matchesDest && !matchesComment && !matchesTag && !matchesNote) {
          return false;
        }
      }

      // Destination filter
      if (selectedDestination !== 'ALL') {
        const destMatch =
          (item.destination && item.destination.toLowerCase().includes(selectedDestination.toLowerCase())) ||
          (item.packageTitle && item.packageTitle.toLowerCase().includes(selectedDestination.toLowerCase()));
        if (!destMatch) return false;
      }

      // Travel style filter
      if (selectedStyle !== 'ALL') {
        const styleMatch = item.tag && item.tag.toLowerCase().includes(selectedStyle.toLowerCase());
        if (!styleMatch) return false;
      }

      // Rating filter
      if (selectedRating !== 'ALL') {
        if (Number(item.rating) !== Number(selectedRating)) return false;
      }

      return true;
    });
  }, [testimonials, searchQuery, selectedDestination, selectedStyle, selectedRating]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredTestimonials.length / itemsPerPage) || 1;
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (safeCurrentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredTestimonials.length);
  const paginatedTestimonials = filteredTestimonials.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    const el = document.getElementById('reviews-grid-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }
  };

  // Statistics calculation
  const totalCount = testimonials.length;
  const avgRating = useMemo(() => {
    if (testimonials.length === 0) return 5.0;
    const sum = testimonials.reduce((acc, curr) => acc + (Number(curr.rating) || 5), 0);
    return (sum / testimonials.length).toFixed(1);
  }, [testimonials]);

  // Handle helpful click
  const handleHelpfulClick = (id) => {
    if (helpfulVotes[id]) return;
    const newVotes = { ...helpfulVotes, [id]: true };
    setHelpfulVotes(newVotes);
    try {
      localStorage.setItem('fadza_helpful_votes', JSON.stringify(newVotes));
    } catch (e) {}
  };

  // Handle share click
  const handleShareClick = (tItem) => {
    const text = `"${tItem.comment || tItem.quote}" — ${tItem.name} (${tItem.destination || 'FADZA TRIP ADVENTURE'})`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(tItem.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  // Handle form submission
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.comment.trim()) return;

    const newEntry = {
      id: Date.now(),
      name: formData.name.trim(),
      origin: formData.origin.trim() || 'Traveler Nusantara',
      packageTitle: `Trip ke ${formData.destination}`,
      destination: formData.destination,
      rating: Number(formData.rating) || 5,
      tag: formData.tag,
      quote: formData.comment.trim(),
      comment: formData.comment.trim(),
      highlight: formData.highlight.trim(),
      note: formData.note.trim() || 'Pengalaman yang sangat berkesan!',
      date: 'Baru saja',
      verified: true,
      helpfulCount: 1
    };

    const updated = saveTestimonial(newEntry);
    setTestimonials(updated);
    setIsModalOpen(false);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 5000);

    // Reset form
    setFormData({
      name: '',
      origin: '',
      destination: 'Labuan Bajo',
      tag: 'Private Tour Pasangan',
      rating: 5,
      title: '',
      comment: '',
      highlight: '',
      note: ''
    });
  };

  const getRatingLabel = (val) => {
    if (val === 5) return '5/5 — Luar Biasa & Sempurna';
    if (val === 4) return '4/5 — Sangat Memuaskan';
    if (val === 3) return '3/5 — Cukup Baik';
    if (val === 2) return '2/5 — Kurang Memuaskan';
    return '1/5 — Perlu Ditingkatkan';
  };

  return (
    <div className="bg-sand-warm" style={{ minHeight: '100vh', paddingTop: '86px', paddingBottom: '90px' }}>
      {/* Top Header Hero with Rich Atmospheric Deep Navy Background */}
      <section
        className="bg-navy-atmosphere"
        style={{
          color: '#FFFFFF',
          padding: 'clamp(3.5rem, 6vw, 5.25rem) 0 4.25rem 0',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid rgba(201, 164, 92, 0.25)'
        }}
      >
        {/* Subtle decorative glowing orb */}
        <div
          style={{
            position: 'absolute',
            top: '-40%',
            right: '-10%',
            width: '650px',
            height: '650px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(223, 255, 0, 0.08) 0%, rgba(201, 164, 92, 0.06) 45%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '2rem'
            }}
          >
            <div style={{ maxWidth: '750px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  backgroundColor: 'rgba(223, 255, 0, 0.14)',
                  border: '1px solid rgba(223, 255, 0, 0.35)',
                  color: '#DFFF00',
                  padding: '0.35rem 0.95rem',
                  borderRadius: '9999px',
                  fontSize: '0.78rem',
                  fontWeight: '800',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '1.25rem'
                }}
              >
                <Star size={13} fill="#DFFF00" color="#DFFF00" />
                <span>{language === 'en' ? 'Verified Traveler Stories' : 'Cerita Penjelajah & Ulasan Terverifikasi'}</span>
              </div>

              <h1
                className="font-serif"
                style={{
                  fontSize: 'clamp(2.2rem, 4.4vw, 3.6rem)',
                  fontWeight: '700',
                  color: '#FFFFFF',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  margin: '0 0 1.25rem 0'
                }}
              >
                {language === 'en' ? (
                  <>
                    Authentic Stories from <br />
                    <span style={{ color: '#DFFF00', fontStyle: 'italic' }}>Indonesian Explorers.</span>
                  </>
                ) : (
                  <>
                    Cerita Nyata dari Para <br />
                    <span style={{ color: '#DFFF00', fontStyle: 'italic' }}>Penjelajah Nusantara.</span>
                  </>
                )}
              </h1>

              <p
                style={{
                  fontSize: 'clamp(0.98rem, 1.6vw, 1.12rem)',
                  color: '#CBD5E1',
                  lineHeight: 1.65,
                  margin: 0,
                  maxWidth: '680px'
                }}
              >
                {language === 'en'
                  ? 'Unfiltered reflections, heartfelt memories, and honest reviews from guests who entrusted their private travel milestones with FADZA TRIP ADVENTURE.'
                  : 'Kesan jujur, catatan perjalanan pribadi, dan ulasan langsung dari mereka yang telah menjelajahi keindahan Indonesia bersama FADZA TRIP ADVENTURE.'}
              </p>

              {/* Handwritten Traveler Badge Note */}
              <div style={{ marginTop: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="font-handwriting" style={{ fontSize: '1.45rem', color: '#C9A45C', fontWeight: '700' }}>
                  ✍️ "Membaca kisah mereka adalah inspirasi terbaik sebelum Anda berangkat."
                </span>
              </div>
            </div>

            {/* Action: Write Testimonial */}
            <div>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="btn-lime"
                style={{
                  padding: '0.95rem 1.85rem',
                  fontSize: '0.98rem',
                  fontWeight: '800',
                  borderRadius: '14px',
                  boxShadow: '0 8px 24px rgba(223, 255, 0, 0.3)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  cursor: 'pointer'
                }}
              >
                <MessageSquarePlus size={18} />
                <span>{language === 'en' ? 'Write a Review' : 'Tulis Testimoni Anda'}</span>
              </button>
            </div>
          </div>

          {/* Executive Trust Scorecard & Metrics Dashboard */}
          <div
            style={{
              marginTop: '3.5rem',
              backgroundColor: '#0F172A',
              backgroundImage: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.95) 100%)',
              borderRadius: '24px',
              border: '1.5px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 20px 48px -8px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(223, 255, 0, 0.08)',
              padding: 'clamp(1.5rem, 3vw, 2.25rem)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Top Accent Strip */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, #DFFF00 0%, #38BDF8 50%, #C9A45C 100%)'
              }}
            />

            <div
              className="testimonials-scorecard-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '1.25rem',
                alignItems: 'stretch'
              }}
            >
              {/* Primary Trust Hero Badge: Rating Scorecard */}
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1.5px solid rgba(223, 255, 0, 0.25)',
                  borderRadius: '18px',
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.08)'
                }}
              >
                {/* Numeric Score with /5.0 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flexShrink: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', whiteSpace: 'nowrap' }}>
                    <span
                      style={{
                        fontSize: 'clamp(2.4rem, 4vw, 3.2rem)',
                        fontWeight: '900',
                        color: '#DFFF00',
                        lineHeight: 1,
                        letterSpacing: '-0.03em',
                        fontFamily: "var(--font-sans), 'Plus Jakarta Sans', system-ui, sans-serif",
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {avgRating}
                    </span>
                    <span style={{ fontSize: '1rem', fontWeight: '800', color: '#94A3B8', whiteSpace: 'nowrap' }}>
                      / 5.0
                    </span>
                  </div>
                  <span
                    style={{
                      marginTop: '0.35rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      backgroundColor: 'rgba(16, 185, 129, 0.15)',
                      color: '#34D399',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      padding: '0.15rem 0.55rem',
                      borderRadius: '9999px',
                      fontSize: '0.7rem',
                      fontWeight: '800',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase'
                    }}
                  >
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                    Sempurna
                  </span>
                </div>

                {/* Stars and Review Count */}
                <div style={{ borderLeft: '1px solid rgba(255, 255, 255, 0.1)', paddingLeft: '1.15rem' }}>
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '0.45rem' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={17} fill="#F59E0B" color="#F59E0B" />
                    ))}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#F1F5F9', fontWeight: '700' }}>
                    {language === 'en' ? `From ${totalCount} verified reviews` : `Dari ${totalCount} ulasan penjelajah`}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#94A3B8', marginTop: '0.15rem' }}>
                    {language === 'en' ? '100% authentic guest experiences' : '100% perjalanan tamu terverifikasi'}
                  </div>
                </div>
              </div>

              {/* Metric 2: Verified */}
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '18px',
                  padding: '1.25rem 1.35rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.9rem'
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(56, 189, 248, 0.12)',
                    border: '1px solid rgba(56, 189, 248, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <ShieldCheck size={22} color="#38BDF8" />
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '900', color: '#FFFFFF', lineHeight: 1.1, whiteSpace: 'nowrap' }}>
                    100%
                  </div>
                  <div style={{ fontSize: '0.86rem', color: '#E2E8F0', fontWeight: '700', marginTop: '0.35rem' }}>
                    {language === 'en' ? 'Verified Explorers' : 'Wisatawan Terverifikasi'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '0.15rem' }}>
                    {language === 'en' ? 'Zero fake or automated reviews' : 'Trip wisatawan nyata terverifikasi'}
                  </div>
                </div>
              </div>

              {/* Metric 3: Recommendation */}
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '18px',
                  padding: '1.25rem 1.35rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.9rem'
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(244, 63, 94, 0.12)',
                    border: '1px solid rgba(244, 63, 94, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Heart size={22} color="#F43F5E" />
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '900', color: '#FFFFFF', lineHeight: 1.1, whiteSpace: 'nowrap' }}>
                    99.4%
                  </div>
                  <div style={{ fontSize: '0.86rem', color: '#E2E8F0', fontWeight: '700', marginTop: '0.35rem' }}>
                    {language === 'en' ? 'High Recommendation' : 'Tingkat Rekomendasi'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '0.15rem' }}>
                    {language === 'en' ? 'Recommend to friends & family' : 'Merekomendasikan ke kerabat'}
                  </div>
                </div>
              </div>

              {/* Metric 4: Destinations */}
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '18px',
                  padding: '1.25rem 1.35rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.9rem'
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(201, 164, 92, 0.12)',
                    border: '1px solid rgba(201, 164, 92, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Compass size={22} color="#C9A45C" />
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '900', color: '#FFFFFF', lineHeight: 1.1, whiteSpace: 'nowrap' }}>
                    16+
                  </div>
                  <div style={{ fontSize: '0.86rem', color: '#E2E8F0', fontWeight: '700', marginTop: '0.35rem' }}>
                    {language === 'en' ? 'Curated Destinations' : 'Destinasi Ikonik Nusantara'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '0.15rem' }}>
                    {language === 'en' ? 'Iconic Indonesian destinations' : 'Destinasi kurasi seluruh Nusantara'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area with Atmospheric Background */}
      <section id="reviews-grid-section" className="bg-topo-pattern" style={{ padding: '3.5rem 0' }}>
        <div className="container">
          {/* Success Toast */}
          {showSuccessToast && (
            <div
              style={{
                backgroundColor: '#F0FDF4',
                border: '1.5px solid #86EFAC',
                borderRadius: '16px',
                padding: '1rem 1.5rem',
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: '#15803D',
                boxShadow: '0 6px 20px rgba(22, 163, 74, 0.12)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CheckCircle2 size={22} color="#16A34A" />
                <div>
                  <div style={{ fontWeight: '800', fontSize: '0.96rem' }}>
                    {language === 'en' ? 'Thank you! Your review has been posted.' : 'Terima kasih! Testimoni Anda telah diterbitkan.'}
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#166534' }}>
                    {language === 'en'
                      ? 'Your story is now live and helps other travelers plan their dream holiday.'
                      : 'Cerita Anda kini tampil dan membantu penjelajah lain memilih rute liburan terbaik.'}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowSuccessToast(false)}
                style={{ background: 'none', border: 'none', color: '#15803D', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>
          )}

          {/* Interactive Multi-Filter & Search Bar */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1.5px solid rgba(201, 164, 92, 0.28)',
              padding: '1.5rem',
              boxShadow: '0 6px 24px rgba(15, 23, 42, 0.05)',
              marginBottom: '2.5rem'
            }}
          >
            <div
              className="testimonials-filter-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '1rem',
                alignItems: 'center'
              }}
            >
              {/* Search Field */}
              <div style={{ position: 'relative' }}>
                <Search
                  size={18}
                  color="#94A3B8"
                  style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'en' ? 'Search by name, place, keyword...' : 'Cari nama, destinasi, atau cerita...'}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem 0.75rem 2.75rem',
                    borderRadius: '12px',
                    border: '1.5px solid #CBD5E1',
                    fontSize: '0.9rem',
                    color: '#0F172A',
                    outline: 'none',
                    backgroundColor: '#FAFAF5'
                  }}
                />
              </div>

              {/* Destination Filter */}
              <div>
                <select
                  value={selectedDestination}
                  onChange={(e) => setSelectedDestination(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    border: '1.5px solid #CBD5E1',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: '#0F172A',
                    backgroundColor: '#FAFAF5',
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                >
                  <option value="ALL">{language === 'en' ? 'All Destinations (16)' : 'Semua Destinasi (16)'}</option>
                  {DESTINATION_OPTIONS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* Travel Style Filter */}
              <div>
                <select
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    border: '1.5px solid #CBD5E1',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: '#0F172A',
                    backgroundColor: '#FAFAF5',
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                >
                  <option value="ALL">{language === 'en' ? 'All Travel Moods' : 'Semua Gaya Liburan'}</option>
                  {TRAVEL_STYLE_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating Filter */}
              <div>
                <select
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    border: '1.5px solid #CBD5E1',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: '#0F172A',
                    backgroundColor: '#FAFAF5',
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                >
                  <option value="ALL">{language === 'en' ? 'All Ratings' : 'Semua Rating Bintang'}</option>
                  <option value="5">⭐⭐⭐⭐⭐ (5 Bintang)</option>
                  <option value="4">⭐⭐⭐⭐ (4 Bintang)</option>
                </select>
              </div>
            </div>

            {/* Filter tags, summary & Reset */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.75rem',
                marginTop: '1rem',
                paddingTop: '0.85rem',
                borderTop: '1px solid #F1F5F9',
                fontSize: '0.84rem'
              }}
            >
              <div style={{ color: '#64748B', fontWeight: '600' }}>
                {language === 'en'
                  ? `Showing ${startIndex + 1}–${endIndex} of ${filteredTestimonials.length} traveler reviews`
                  : `Menampilkan ${filteredTestimonials.length > 0 ? startIndex + 1 : 0}–${endIndex} dari ${filteredTestimonials.length} ulasan penjelajah`}
              </div>

              {(searchQuery || selectedDestination !== 'ALL' || selectedStyle !== 'ALL' || selectedRating !== 'ALL') && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedDestination('ALL');
                    setSelectedStyle('ALL');
                    setSelectedRating('ALL');
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#B86B4B',
                    fontWeight: '800',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <X size={14} />
                  <span>{language === 'en' ? 'Reset Filters' : 'Reset Semua Filter'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Testimonials Grid with Upgraded Editorial Design */}
          {paginatedTestimonials.length > 0 ? (
            <>
              <div
                className="testimonials-cards-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
                  gap: '1.75rem'
                }}
              >
                {paginatedTestimonials.map((tItem) => {
                  const isVoted = helpfulVotes[tItem.id];
                  const voteCount = (tItem.helpfulCount || 0) + (isVoted ? 1 : 0);
                  const isCopied = copiedId === tItem.id;

                  return (
                    <div
                      key={tItem.id}
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '24px',
                        border: '1.5px solid rgba(201, 164, 92, 0.28)',
                        padding: 'clamp(1.5rem, 2.5vw, 2rem)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: '0 8px 24px rgba(15, 23, 42, 0.05)',
                        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                      className="hover:border-[#B86B4B] hover:shadow-2xl hover:-translate-y-1.5"
                    >
                      {/* Top Decorative Border Accent */}
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: '4px',
                          background: 'linear-gradient(90deg, #B86B4B 0%, #C9A45C 50%, #DFFF00 100%)'
                        }}
                      />

                      <div>
                        {/* Header: User Avatar, Name, Handwritten Note on top right */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '1.15rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                            {tItem.avatar ? (
                              <img
                                src={tItem.avatar}
                                alt={tItem.name}
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  borderRadius: '50%',
                                  objectFit: 'cover',
                                  border: '2px solid #C9A45C',
                                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                  flexShrink: 0
                                }}
                              />
                            ) : (
                              <div
                                className="font-display"
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  borderRadius: '50%',
                                  backgroundColor: '#101C2C',
                                  color: '#DFFF00',
                                  fontWeight: '800',
                                  fontSize: '1.25rem',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0,
                                  border: '2px solid #C9A45C'
                                }}
                              >
                                {tItem.name?.charAt(0) || 'F'}
                              </div>
                            )}

                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                                <h3
                                  style={{
                                    fontSize: '1.05rem',
                                    fontWeight: '800',
                                    color: '#0F172A',
                                    margin: 0
                                  }}
                                >
                                  {tItem.name}
                                </h3>
                                <span
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.2rem',
                                    backgroundColor: 'rgba(2, 132, 199, 0.12)',
                                    color: '#0284C7',
                                    fontSize: '0.68rem',
                                    fontWeight: '800',
                                    padding: '0.15rem 0.5rem',
                                    borderRadius: '9999px',
                                    textTransform: 'uppercase'
                                  }}
                                >
                                  <ShieldCheck size={11} color="#0284C7" />
                                  <span>{language === 'en' ? 'Verified' : 'Terverifikasi'}</span>
                                </span>
                              </div>

                              <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '0.2rem' }}>
                                {tItem.origin}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Handwritten Note Highlight (Caveat font) */}
                        {tItem.note && (
                          <div
                            style={{
                              backgroundColor: 'rgba(184, 107, 75, 0.08)',
                              borderRadius: '10px',
                              padding: '0.4rem 0.85rem',
                              marginBottom: '0.95rem',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.4rem'
                            }}
                          >
                            <span className="font-handwriting" style={{ fontSize: '1.28rem', color: '#B86B4B', fontWeight: '700', lineHeight: 1.2 }}>
                              "{tItem.note}"
                            </span>
                          </div>
                        )}

                        {/* Destination & Style Tag Row */}
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            flexWrap: 'wrap',
                            marginBottom: '0.85rem'
                          }}
                        >
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.3rem',
                              backgroundColor: '#F1F5F9',
                              color: '#1E293B',
                              fontSize: '0.78rem',
                              fontWeight: '700',
                              padding: '0.25rem 0.65rem',
                              borderRadius: '8px',
                              border: '1px solid #E2E8F0'
                            }}
                          >
                            <MapPin size={12} color="#B86B4B" />
                            <span>{tItem.destination || 'Nusantara'}</span>
                          </span>

                          {tItem.tag && (
                            <span
                              style={{
                                backgroundColor: 'rgba(201, 164, 92, 0.16)',
                                color: '#8F661E',
                                fontSize: '0.76rem',
                                fontWeight: '700',
                                padding: '0.25rem 0.65rem',
                                borderRadius: '8px',
                                border: '1px solid rgba(201, 164, 92, 0.3)'
                              }}
                            >
                              {tItem.tag}
                            </span>
                          )}
                        </div>

                        {/* Stars & Date */}
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '1rem'
                          }}
                        >
                          <div style={{ display: 'flex', gap: '3px' }}>
                            {[...Array(Number(tItem.rating) || 5)].map((_, i) => (
                              <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
                            ))}
                          </div>
                          <span style={{ fontSize: '0.78rem', color: '#94A3B8', fontWeight: '600' }}>
                            {tItem.date || '2026'}
                          </span>
                        </div>

                        {/* Testimonial Quote with Editorial Serif font */}
                        <blockquote
                          className="font-serif"
                          style={{
                            fontSize: '0.98rem',
                            color: '#1E293B',
                            lineHeight: 1.68,
                            margin: '0 0 1.25rem 0',
                            fontStyle: 'normal'
                          }}
                        >
                          "{tItem.comment || tItem.quote}"
                        </blockquote>

                        {/* Highlight Box if available */}
                        {tItem.highlight && (
                          <div
                            style={{
                              backgroundColor: '#FAF9F6',
                              borderLeft: '3.5px solid #C9A45C',
                              borderRadius: '8px',
                              padding: '0.75rem 0.95rem',
                              fontSize: '0.84rem',
                              color: '#475569',
                              marginBottom: '1.25rem',
                              lineHeight: 1.55,
                              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.02)'
                            }}
                          >
                            <strong style={{ color: '#0F172A', display: 'block', marginBottom: '0.2rem', fontSize: '0.8rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                              ⭐ {language === 'en' ? 'Highlight of the trip:' : 'Momen Paling Berkesan:'}
                            </strong>
                            {tItem.highlight}
                          </div>
                        )}
                      </div>

                      {/* Bottom Card Footer: Helpful & Share */}
                      <div
                        style={{
                          paddingTop: '1rem',
                          borderTop: '1px solid #F1F5F9',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => handleHelpfulClick(tItem.id)}
                          style={{
                            background: isVoted ? 'rgba(22, 163, 74, 0.1)' : 'transparent',
                            border: isVoted ? '1px solid #16A34A' : '1px solid #E2E8F0',
                            borderRadius: '9px',
                            padding: '0.4rem 0.75rem',
                            color: isVoted ? '#16A34A' : '#64748B',
                            fontSize: '0.8rem',
                            fontWeight: '700',
                            cursor: isVoted ? 'default' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <ThumbsUp size={13} color={isVoted ? '#16A34A' : '#64748B'} />
                          <span>{language === 'en' ? 'Helpful' : 'Membantu'}</span>
                          {voteCount > 0 && <span>({voteCount})</span>}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleShareClick(tItem)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: isCopied ? '#16A34A' : '#94A3B8',
                            fontSize: '0.8rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem'
                          }}
                          className="hover:text-slate-900"
                          title="Salin ulasan ini"
                        >
                          {isCopied ? <CheckCircle2 size={14} color="#16A34A" /> : <Share2 size={14} />}
                          <span>{isCopied ? (language === 'en' ? 'Copied' : 'Tersalin') : (language === 'en' ? 'Share' : 'Bagikan')}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Responsive Unified Pagination with High Contrast & Motion */}
              {totalPages > 1 && (
                <div style={{ marginTop: '2.5rem' }}>
                  <Pagination
                    currentPage={safeCurrentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          ) : (
            /* Empty State */
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                border: '1.5px dashed #CBD5E1',
                padding: '4rem 2rem',
                textAlign: 'center',
                maxWidth: '600px',
                margin: '0 auto'
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: '#F1F5F9',
                  color: '#64748B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem auto'
                }}
              >
                <Search size={26} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.5rem' }}>
                {language === 'en' ? 'No matching reviews found' : 'Tidak ada ulasan yang sesuai'}
              </h3>
              <p style={{ color: '#64748B', fontSize: '0.92rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                {language === 'en'
                  ? 'Try adjusting your destination or travel mood filter to see other traveler stories.'
                  : 'Coba ubah kata kunci pencarian atau reset filter untuk melihat cerita penjelajah lainnya.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDestination('ALL');
                  setSelectedStyle('ALL');
                  setSelectedRating('ALL');
                }}
                className="btn-dark"
                style={{ padding: '0.75rem 1.5rem', borderRadius: '12px' }}
              >
                <span>{language === 'en' ? 'Reset All Filters' : 'Reset Semua Filter'}</span>
              </button>
            </div>
          )}

          {/* Bottom Pre-Footer CTA with Atmospheric Layering */}
          <div
            className="bg-navy-atmosphere"
            style={{
              marginTop: '5rem',
              borderRadius: '28px',
              border: '1px solid rgba(201, 164, 92, 0.3)',
              padding: 'clamp(2.5rem, 5vw, 4rem)',
              color: '#FFFFFF',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '2rem',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(16, 28, 44, 0.25)'
            }}
          >
            <div style={{ maxWidth: '620px' }}>
              <span
                style={{
                  fontSize: '0.8rem',
                  fontWeight: '800',
                  color: '#DFFF00',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  display: 'block',
                  marginBottom: '0.65rem'
                }}
              >
                {language === 'en' ? 'Craft Your Own Memory' : 'Ciptakan Cerita Anda Sendiri'}
              </span>
              <h2
                className="font-serif"
                style={{
                  fontSize: 'clamp(1.85rem, 3.4vw, 2.7rem)',
                  fontWeight: '700',
                  color: '#FFFFFF',
                  margin: '0 0 1rem 0',
                  lineHeight: 1.2
                }}
              >
                {language === 'en'
                  ? 'Ready to Experience Indonesia with Dedicated Care?'
                  : 'Siap Menjelajahi Mahakarya Nusantara Bersama Kami?'}
              </h2>
              <p style={{ color: '#CBD5E1', fontSize: '1rem', lineHeight: 1.6, margin: 0 }}>
                {language === 'en'
                  ? 'Consult directly with our travel specialists. We plan customized private itineraries designed around your pace and preferences.'
                  : 'Konsultasikan tanggal, destinasi impian, dan preferensi rombongan Anda langsung ke tim concierge kami. Jadwal terencana rapi, privat, dan tanpa repot.'}
              </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <a
                href={getGeneralWhatsAppLink('Halo FADZA TRIP ADVENTURE, saya ingin konsultasi rencana liburan privat.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-lime"
                style={{
                  padding: '0.95rem 1.85rem',
                  fontSize: '0.95rem',
                  fontWeight: '800',
                  borderRadius: '14px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <WhatsAppIcon size={18} />
                <span>{language === 'en' ? 'Chat on WhatsApp' : 'Konsultasi via WhatsApp'}</span>
              </a>

              <button
                type="button"
                onClick={() => onNavigate && onNavigate('packages')}
                className="btn-outline-dark"
                style={{
                  padding: '0.95rem 1.85rem',
                  fontSize: '0.95rem',
                  fontWeight: '700',
                  borderRadius: '14px',
                  borderColor: 'rgba(255, 255, 255, 0.25)',
                  color: '#FFFFFF'
                }}
              >
                <span>{language === 'en' ? 'Browse Tour Packages' : 'Lihat Paket Wisata'}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Modal: Tulis Testimoni Baru */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(10, 18, 28, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.25rem'
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.45)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '1.75rem 2rem',
                borderBottom: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'sticky',
                top: 0,
                backgroundColor: '#FFFFFF',
                zIndex: 10
              }}
            >
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    color: '#B86B4B',
                    fontSize: '0.78rem',
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    marginBottom: '0.25rem'
                  }}
                >
                  <MessageSquarePlus size={14} />
                  <span>{language === 'en' ? 'Traveler Feedback' : 'Suara Penjelajah'}</span>
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                  {language === 'en' ? 'Share Your Travel Experience' : 'Bagikan Cerita Pengalaman Anda'}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#F1F5F9',
                  border: 'none',
                  color: '#64748B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                className="hover:bg-slate-200"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSubmitForm} style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Rating Picker */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.45rem' }}>
                    {language === 'en' ? 'Overall Rating *' : 'Penilaian Keseluruhan *'}
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {[1, 2, 3, 4, 5].map((starVal) => {
                        const isHovered = formHoverRating >= starVal;
                        const isSelected = formData.rating >= starVal;
                        return (
                          <button
                            key={starVal}
                            type="button"
                            onClick={() => setFormData({ ...formData, rating: starVal })}
                            onMouseEnter={() => setFormHoverRating(starVal)}
                            onMouseLeave={() => setFormHoverRating(0)}
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              padding: '2px',
                              transition: 'transform 0.15s ease'
                            }}
                            className="hover:scale-115"
                            aria-label={`Beri nilai ${starVal} bintang`}
                          >
                            <Star
                              size={28}
                              fill={isHovered || isSelected ? '#F59E0B' : '#E2E8F0'}
                              color={isHovered || isSelected ? '#F59E0B' : '#CBD5E1'}
                            />
                          </button>
                        );
                      })}
                    </div>
                    <span style={{ fontSize: '0.86rem', fontWeight: '700', color: '#B86B4B', marginLeft: '0.5rem' }}>
                      {getRatingLabel(formHoverRating || formData.rating)}
                    </span>
                  </div>
                </div>

                {/* Name & Origin Row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.45rem' }}>
                      {language === 'en' ? 'Full Name *' : 'Nama Lengkap *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={language === 'en' ? 'e.g. Raditya Pratama' : 'Contoh: Raditya Pratama'}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.8rem 1rem',
                        borderRadius: '12px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '0.92rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.45rem' }}>
                      {language === 'en' ? 'City / Origin' : 'Asal Kota / Profesi'}
                    </label>
                    <input
                      type="text"
                      placeholder={language === 'en' ? 'e.g. Jakarta Selatan' : 'Contoh: Jakarta Selatan'}
                      value={formData.origin}
                      onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.8rem 1rem',
                        borderRadius: '12px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '0.92rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                {/* Destination & Travel Style Row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.45rem' }}>
                      {language === 'en' ? 'Destination Visited *' : 'Destinasi yang Dikunjungi *'}
                    </label>
                    <select
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.8rem 1rem',
                        borderRadius: '12px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '0.92rem',
                        backgroundColor: '#FFFFFF',
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      {DESTINATION_OPTIONS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.45rem' }}>
                      {language === 'en' ? 'Travel Style' : 'Gaya Liburan'}
                    </label>
                    <select
                      value={formData.tag}
                      onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.8rem 1rem',
                        borderRadius: '12px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '0.92rem',
                        backgroundColor: '#FFFFFF',
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      {TRAVEL_STYLE_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Short Personal Note (Handwritten Caveat Preview) */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.45rem' }}>
                    {language === 'en' ? 'Short Personal Impression (Handwritten note)' : 'Catatan Kesan Singkat (Catatan Pribadi)'}
                  </label>
                  <input
                    type="text"
                    placeholder={
                      language === 'en'
                        ? 'e.g. 5-star crew & unforgettable moments!'
                        : 'Contoh: Pelayanan bintang lima & kru sangat ramah!'
                    }
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: '12px',
                      border: '1.5px solid #CBD5E1',
                      fontSize: '0.92rem',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* Detailed Comment / Quote */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.45rem' }}>
                    {language === 'en' ? 'Your Review / Story *' : 'Cerita & Ulasan Pengalaman Anda *'}
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder={
                      language === 'en'
                        ? 'Share details about the service, boat, hotel, guide, or schedule during your trip...'
                        : 'Ceritakan kenyamanan armada, keramahan pemandu, pemandangan, atau kepuasan itinerary Anda...'
                    }
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '12px',
                      border: '1.5px solid #CBD5E1',
                      fontSize: '0.92rem',
                      lineHeight: 1.6,
                      outline: 'none',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>

                {/* Highlight / Best Moment */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.45rem' }}>
                    {language === 'en' ? 'Highlight of the Trip (Optional)' : 'Momen Paling Berkesan (Opsional)'}
                  </label>
                  <input
                    type="text"
                    placeholder={
                      language === 'en'
                        ? 'e.g. Sunrise atop Padar Island or dinner by Jimbaran beach'
                        : 'Contoh: Matahari terbit di puncak Pulau Padar atau sailing Phinisi senja'
                    }
                    value={formData.highlight}
                    onChange={(e) => setFormData({ ...formData, highlight: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: '12px',
                      border: '1.5px solid #CBD5E1',
                      fontSize: '0.92rem',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* Trust Guarantee */}
                <div
                  style={{
                    backgroundColor: '#F8F6F0',
                    border: '1px solid #E2E8F0',
                    borderRadius: '12px',
                    padding: '0.85rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    fontSize: '0.82rem',
                    color: '#64748B'
                  }}
                >
                  <ShieldCheck size={18} color="#0284C7" style={{ flexShrink: 0 }} />
                  <span>
                    {language === 'en'
                      ? 'Every review is published instantly and helps build authentic transparency for all Indonesian travelers.'
                      : 'Setiap testimoni disimpan dan langsung tampil untuk menjaga transparansi dan kualitas layanan FADZA TRIP ADVENTURE.'}
                  </span>
                </div>

                {/* Submit Button */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    style={{
                      padding: '0.8rem 1.5rem',
                      borderRadius: '12px',
                      border: '1px solid #CBD5E1',
                      backgroundColor: 'transparent',
                      color: '#64748B',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    {language === 'en' ? 'Cancel' : 'Batal'}
                  </button>

                  <button
                    type="submit"
                    className="btn-lime"
                    style={{
                      padding: '0.8rem 2rem',
                      borderRadius: '12px',
                      fontWeight: '800',
                      fontSize: '0.94rem',
                      cursor: 'pointer'
                    }}
                  >
                    {language === 'en' ? 'Publish Testimonial' : 'Kirim & Terbitkan'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        /* Symmetrical 4-Card Scorecard Layout (No dangling 4th card) */
        @media (max-width: 1100px) {
          .testimonials-scorecard-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1.15rem !important;
          }
        }
        @media (max-width: 580px) {
          .testimonials-scorecard-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
        }

        /* Filter Grid Responsiveness */
        @media (max-width: 960px) {
          .testimonials-filter-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.85rem !important;
          }
        }
        @media (max-width: 540px) {
          .testimonials-filter-grid {
            grid-template-columns: 1fr !important;
          }
        }

        /* Review Cards Grid: Enforce 1 column on mobile to prevent squeezing ("jangan ada yg keluar luar gitu") */
        @media (max-width: 820px) {
          .testimonials-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}
