import React, { useState } from 'react';
import ImageWithFallback from '../components/ImageWithFallback';
import PackageCard from '../components/PackageCard';
import { PACKAGES, TESTIMONIALS } from '../data/travelData';
import {
  MapPin,
  Clock,
  Calendar,
  Wallet,
  Compass,
  ArrowLeft,
  ChevronDown,
  CheckCircle2,
  Camera,
  ArrowRight,
  ShieldCheck,
  Share2,
  Star,
  ThumbsUp,
  X
} from 'lucide-react';

export default function DestinationDetailPage({
  destination,
  onBack,
  onSelectPackage,
  onOpenGalleryItem,
  onNavigate
}) {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [reviewFilter, setReviewFilter] = useState('all');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const [reviewsList, setReviewsList] = useState(() => {
    if (!destination) return TESTIMONIALS.slice(0, 6);
    const matched = TESTIMONIALS.filter((t) =>
      (t.packageTitle && t.packageTitle.toLowerCase().includes(destination.name.toLowerCase())) ||
      (t.destination && t.destination.toLowerCase().includes(destination.name.toLowerCase()))
    );
    const others = TESTIMONIALS.filter((t) => !matched.includes(t));
    return [...matched, ...others.slice(0, Math.max(3, 6 - matched.length))];
  });

  const [helpfulCounts, setHelpfulCounts] = useState({});
  const [likedReviews, setLikedReviews] = useState({});

  const [newReview, setNewReview] = useState({
    name: '',
    origin: '',
    rating: 5,
    tag: 'Petualang',
    comment: ''
  });

  const handleHelpfulClick = (id) => {
    if (likedReviews[id]) return;
    setLikedReviews((prev) => ({ ...prev, [id]: true }));
    setHelpfulCounts((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.comment.trim()) return;

    const submitted = {
      id: Date.now(),
      name: newReview.name.trim(),
      origin: newReview.origin.trim() || 'Traveler FADZA',
      packageTitle: `Eksplorasi ${destination.name}`,
      rating: Number(newReview.rating),
      tag: newReview.tag,
      verified: true,
      isNew: true,
      comment: newReview.comment.trim(),
      date: 'Baru saja'
    };

    setReviewsList((prev) => [submitted, ...prev]);
    setNewReview({ name: '', origin: '', rating: 5, tag: 'Petualang', comment: '' });
    setShowReviewModal(false);
    setReviewSuccess(true);
    setTimeout(() => setReviewSuccess(false), 4500);
  };

  if (!destination) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAFAF5', paddingTop: '100px' }}>
        <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <h2 style={{ fontSize: '1.75rem', color: '#101C2C', fontWeight: '800', marginBottom: '1rem' }}>
            Destinasi Tidak Ditemukan
          </h2>
          <p style={{ color: '#68717C', marginBottom: '2rem' }}>
            Destinasi yang Anda cari mungkin telah dipindahkan atau belum tersedia.
          </p>
          <button onClick={onBack} className="btn-dark">
            <ArrowLeft size={18} />
            <span>Kembali ke Destinasi</span>
          </button>
        </div>
      </div>
    );
  }

  const linkedPackages = PACKAGES.filter(
    (pkg) => pkg.destinationId === destination.id || pkg.destination.toLowerCase().includes(destination.name.toLowerCase())
  );

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const scrollToPackages = () => {
    const el = document.getElementById('dest-packages-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAFAF5', paddingTop: '80px', paddingBottom: '90px' }}>
      {/* Top Nav Breadcrumb Bar */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E7E2', padding: '0.85rem 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <button
            onClick={onBack}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#101C2C',
              fontSize: '0.875rem',
              fontWeight: '700',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <ArrowLeft size={16} />
            <span>Kembali ke Jelajahi Destinasi</span>
          </button>

          <button
            onClick={handleShare}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: copiedLink ? '#101C2C' : '#68717C',
              fontSize: '0.82rem',
              fontWeight: '600',
              background: '#FAFAF5',
              border: '1px solid #E5E7E2',
              borderRadius: '9999px',
              padding: '0.35rem 0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <Share2 size={14} />
            <span>{copiedLink ? 'Link Tersalin!' : 'Bagikan Destinasi'}</span>
          </button>
        </div>
      </div>

      {/* Hero Destination Banner */}
      <section style={{ padding: '2rem 0' }}>
        <div className="container">
          <div
            style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              minHeight: '420px',
              display: 'flex',
              alignItems: 'flex-end',
              padding: 'clamp(1.5rem, 4vw, 3rem)',
              boxShadow: '0 12px 36px rgba(16, 28, 44, 0.12)'
            }}
          >
            <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
              <ImageWithFallback
                src={destination.image}
                fallbackSrc={destination.fallbackImage}
                alt={destination.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 2,
                background: 'linear-gradient(to top, rgba(16, 28, 44, 0.95) 0%, rgba(16, 28, 44, 0.45) 60%, rgba(16, 28, 44, 0.2) 100%)'
              }}
            />

            <div style={{ position: 'relative', zIndex: 3, maxWidth: '850px', width: '100%' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.85rem' }}>
                <span
                  style={{
                    backgroundColor: '#101C2C',
                    color: '#DFFF00',
                    padding: '0.3rem 0.85rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em'
                  }}
                >
                  Wilayah {destination.region}
                </span>

                {destination.province && (
                  <span
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(8px)',
                      color: '#FFFFFF',
                      padding: '0.3rem 0.85rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}
                  >
                    Provinsi {destination.province}
                  </span>
                )}

                <span
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(8px)',
                    color: '#DFFF00',
                    padding: '0.3rem 0.85rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <Compass size={13} />
                  {linkedPackages.length} Pilihan Paket
                </span>
              </div>

              <h1
                className="text-editorial-hero"
                style={{
                  color: '#FFFFFF',
                  marginBottom: '0.65rem'
                }}
              >
                {destination.name}
              </h1>

              <p style={{ color: '#F4F5F0', fontSize: '1.1rem', lineHeight: 1.55, marginBottom: '1.75rem', maxWidth: '720px' }}>
                "{destination.subtitle}"
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                {linkedPackages.length > 0 && (
                  <button onClick={scrollToPackages} className="btn-lime">
                    <span>Lihat {linkedPackages.length} Paket Wisata</span>
                    <ArrowRight size={18} />
                  </button>
                )}
                <a
                  href="#dest-overview"
                  className="btn-outline-dark"
                  style={{ color: '#FFFFFF', borderColor: 'rgba(255, 255, 255, 0.4)' }}
                >
                  <span>Pelajari Destinasi</span>
                  <Compass size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Facts Strip */}
      <section style={{ padding: '1rem 0 2.5rem 0' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 230px), 1fr))',
              gap: '1.25rem'
            }}
          >
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '18px', border: '1px solid #E5E7E2', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 4px 15px rgba(16, 28, 44, 0.03)' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: '#101C2C', color: '#DFFF00', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Clock size={20} />
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#8A939E', textTransform: 'uppercase', fontWeight: '700', display: 'block' }}>
                  Durasi Rekomendasi
                </span>
                <strong style={{ color: '#101C2C', fontSize: '1rem', fontWeight: '800' }}>
                  {destination.recommendedDuration || '3 - 4 Hari'}
                </strong>
              </div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '18px', border: '1px solid #E5E7E2', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 4px 15px rgba(16, 28, 44, 0.03)' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: '#101C2C', color: '#DFFF00', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Calendar size={20} />
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#8A939E', textTransform: 'uppercase', fontWeight: '700', display: 'block' }}>
                  Waktu Terbaik
                </span>
                <strong style={{ color: '#101C2C', fontSize: '1rem', fontWeight: '800' }}>
                  {destination.bestTime || 'Mei - Oktober'}
                </strong>
              </div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '18px', border: '1px solid #E5E7E2', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 4px 15px rgba(16, 28, 44, 0.03)' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: '#101C2C', color: '#DFFF00', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Wallet size={20} />
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#8A939E', textTransform: 'uppercase', fontWeight: '700', display: 'block' }}>
                  Estimasi Budget
                </span>
                <strong style={{ color: '#101C2C', fontSize: '1rem', fontWeight: '800' }}>
                  {destination.estimatedBudget || 'Mulai Rp 2.5 Jt'}
                </strong>
              </div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '18px', border: '1px solid #E5E7E2', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 4px 15px rgba(16, 28, 44, 0.03)' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: '#101C2C', color: '#DFFF00', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <ShieldCheck size={20} />
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#8A939E', textTransform: 'uppercase', fontWeight: '700', display: 'block' }}>
                  Kenyamanan Trip
                </span>
                <strong style={{ color: '#101C2C', fontSize: '1rem', fontWeight: '800' }}>
                  {destination.comfortLevel || 'Sangat Nyaman'}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview & Attractions */}
      <section id="dest-overview" style={{ padding: '2rem 0' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: '2.5rem',
              alignItems: 'start'
            }}
          >
            {/* Left: Overview Story */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', border: '1px solid #E5E7E2', padding: '2rem', boxShadow: '0 4px 20px rgba(16, 28, 44, 0.04)' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#101C2C', marginBottom: '1rem' }}>
                Pesona Alam & Budaya {destination.name}
              </h2>
              <p style={{ color: '#68717C', fontSize: '1rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                {destination.description}
              </p>

              {/* Tags */}
              {destination.tags && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', paddingTop: '1.25rem', borderTop: '1px solid #F0F2EB' }}>
                  {destination.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      style={{
                        backgroundColor: '#FAFAF5',
                        border: '1px solid #E5E7E2',
                        color: '#101C2C',
                        padding: '0.35rem 0.85rem',
                        borderRadius: '9999px',
                        fontSize: '0.8rem',
                        fontWeight: '600'
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Highlights / Top Attractions */}
            {destination.attractions && destination.attractions.length > 0 && (
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', border: '1px solid #E5E7E2', padding: '2rem', boxShadow: '0 4px 20px rgba(16, 28, 44, 0.04)' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#101C2C', marginBottom: '1.25rem' }}>
                  Destinasi & Spot Ikonik
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {destination.attractions.map((spot, sIdx) => (
                    <div
                      key={sIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.85rem 1rem',
                        borderRadius: '12px',
                        backgroundColor: '#FAFAF5',
                        border: '1px solid #E5E7E2'
                      }}
                    >
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#101C2C', color: '#DFFF00', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <CheckCircle2 size={14} />
                      </div>
                      <span style={{ fontSize: '0.92rem', fontWeight: '700', color: '#101C2C' }}>
                        {spot}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Available Packages Section */}
      <section id="dest-packages-section" style={{ padding: '3.5rem 0' }}>
        <div className="container">
          <div style={{ marginBottom: '2rem' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                backgroundColor: '#101C2C',
                color: '#DFFF00',
                padding: '0.3rem 0.8rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: '700',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                marginBottom: '0.5rem'
              }}
            >
              <Compass size={13} color="#DFFF00" />
              <span>Paket Terkurasi</span>
            </div>
            <h2 className="text-editorial-title" style={{ color: '#101C2C', margin: '0 0 0.25rem 0' }}>
              Pilihan Paket Wisata {destination.name}
            </h2>
            <p style={{ color: '#68717C', fontSize: '0.95rem', marginTop: '0.25rem' }}>
              Pilih itinerary yang sesuai dengan gaya dan tempo liburan impian Anda
            </p>
          </div>

          {linkedPackages.length > 0 ? (
            <div className="popular-packages-grid">
              {linkedPackages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  onSelectPackage={onSelectPackage}
                />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#FFFFFF', borderRadius: '20px', border: '1px solid #E5E7E2' }}>
              <p style={{ color: '#68717C' }}>
                Paket reguler untuk destinasi ini sedang dalam pembaruan jadwal. Anda dapat memesan private kustom trip via WhatsApp.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Traveler Reviews */}
      <section style={{ padding: '3.5rem 0', backgroundColor: '#F0F2EB', borderTop: '1px solid #E5E7E2' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1rem', marginBottom: '2rem' }}>
            <div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#101C2C' }}>
                Ulasan Traveler {destination.name}
              </h3>
              <p style={{ color: '#68717C', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                Pengalaman autentik dari traveler yang telah menjelajah bersama kami
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowReviewModal(true)}
              className="btn-dark"
              style={{ padding: '0.65rem 1.25rem', fontSize: '0.88rem', borderRadius: '12px' }}
            >
              <span>+ Tulis Ulasan</span>
            </button>
          </div>

          {reviewSuccess && (
            <div style={{ backgroundColor: '#EBF9F1', border: '1px solid #107C41', color: '#107C41', padding: '0.85rem 1.25rem', borderRadius: '12px', marginBottom: '1.5rem', fontWeight: '600', fontSize: '0.9rem' }}>
              ✓ Terima kasih! Ulasan Anda telah berhasil ditambahkan.
            </div>
          )}

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '1.5rem'
            }}
          >
            {reviewsList.slice(0, 3).map((rev) => (
              <div
                key={rev.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '18px',
                  border: '1px solid #E5E7E2',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '0.85rem' }}>
                  {[...Array(rev.rating || 5)].map((_, i) => (
                    <Star key={i} size={15} fill="#E5A800" color="#E5A800" />
                  ))}
                </div>

                <p style={{ color: '#101C2C', fontSize: '0.92rem', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '1.25rem', flex: 1 }}>
                  "{rev.comment || rev.quote}"
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid #F0F2EB' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#101C2C', color: '#DFFF00', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800' }}>
                      {rev.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#101C2C' }}>{rev.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#8A939E' }}>{rev.origin || 'Traveler FADZA'}</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleHelpfulClick(rev.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: likedReviews[rev.id] ? '#101C2C' : '#8A939E',
                      fontSize: '0.78rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}
                  >
                    <ThumbsUp size={13} />
                    <span>{helpfulCounts[rev.id] || 0}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Review Modal */}
      {showReviewModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(16, 28, 44, 0.7)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '2rem',
              maxWidth: '480px',
              width: '100%',
              boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
              position: 'relative'
            }}
          >
            <button
              onClick={() => setShowReviewModal(false)}
              style={{ position: 'absolute', right: '1.25rem', top: '1.25rem', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <X size={20} color="#101C2C" />
            </button>

            <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#101C2C', marginBottom: '0.5rem' }}>
              Tulis Ulasan untuk {destination.name}
            </h3>
            <p style={{ color: '#68717C', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              Bagikan cerita liburan Anda untuk membantu traveler lain
            </p>

            <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#101C2C', fontWeight: '700', marginBottom: '0.35rem' }}>
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Rina Melati"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid #E5E7E2', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#101C2C', fontWeight: '700', marginBottom: '0.35rem' }}>
                  Kota Asal
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Jakarta"
                  value={newReview.origin}
                  onChange={(e) => setNewReview({ ...newReview, origin: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid #E5E7E2', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#101C2C', fontWeight: '700', marginBottom: '0.35rem' }}>
                  Rating Bintang
                </label>
                <select
                  value={newReview.rating}
                  onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid #E5E7E2', outline: 'none', boxSizing: 'border-box' }}
                >
                  <option value="5">⭐⭐⭐⭐⭐ 5 - Luar Biasa</option>
                  <option value="4">⭐⭐⭐⭐ 4 - Sangat Bagus</option>
                  <option value="3">⭐⭐⭐ 3 - Cukup Baik</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: '#101C2C', fontWeight: '700', marginBottom: '0.35rem' }}>
                  Cerita Liburan Anda *
                </label>
                <textarea
                  rows="3"
                  required
                  placeholder="Ceritakan pengalaman Anda selama berkunjung..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid #E5E7E2', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}
                />
              </div>

              <button
                type="submit"
                className="btn-lime"
                style={{ padding: '0.8rem', borderRadius: '12px', justifyContent: 'center', marginTop: '0.5rem' }}
              >
                <span>Kirim Ulasan</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
