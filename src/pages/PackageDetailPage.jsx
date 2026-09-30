import React, { useState, useMemo } from 'react';
import ImageWithFallback from '../components/ImageWithFallback';
import WhatsAppIcon from '../components/WhatsAppIcon';
import PackageCard from '../components/PackageCard';
import AITravelAssistantModal from '../components/AITravelAssistantModal';
import { PACKAGES, DESTINATIONS } from '../data/travelData';
import { getStoredTestimonials, saveTestimonial } from '../utils/testimonials';
import {
  ArrowLeft,
  Clock,
  MapPin,
  Star,
  Check,
  X,
  Calendar,
  Users,
  Info,
  ShieldCheck,
  Share2,
  ChevronDown,
  ArrowRight,
  Award,
  HeartHandshake,
  MessageSquarePlus,
  ThumbsUp,
  CheckCircle2,
  Ticket,
  Bot
} from 'lucide-react';

export default function PackageDetailPage({
  packageData,
  onBack,
  onOpenGalleryItem,
  onSelectPackage,
  onOpenAiChat,
  onOpenBooking
}) {
  const [guests, setGuests] = useState(2);
  const [selectedDate, setSelectedDate] = useState('');
  const [activeDay, setActiveDay] = useState(1);
  const [expandedDays, setExpandedDays] = useState({ 1: true });
  const [copied, setCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [helpfulVotes, setHelpfulVotes] = useState({});

  const [reviewsList, setReviewsList] = useState(() => {
    const all = getStoredTestimonials();
    const destName = packageData?.destination || '';
    const matched = all.filter(
      (t) =>
        (t.destination && t.destination.toLowerCase().includes(destName.toLowerCase())) ||
        (t.packageTitle && t.packageTitle.toLowerCase().includes(destName.toLowerCase())) ||
        (packageData?.name && t.packageTitle && t.packageTitle.toLowerCase().includes(packageData.name.toLowerCase()))
    );
    if (matched.length > 0) return matched;
    return all.slice(0, 3);
  });

  const [newReview, setNewReview] = useState({
    name: '',
    origin: '',
    rating: 5,
    tag: 'Petualang',
    comment: ''
  });

  const handleHelpfulClick = (id) => {
    setHelpfulVotes((prev) => ({ ...prev, [id]: true }));
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.comment.trim()) return;

    const submitted = {
      id: Date.now(),
      name: newReview.name.trim(),
      origin: newReview.origin.trim() || 'Traveler FADZA',
      packageTitle: packageData.name,
      destination: packageData.destination || 'Nusantara',
      rating: Number(newReview.rating),
      tag: newReview.tag,
      quote: newReview.comment.trim(),
      comment: newReview.comment.trim(),
      date: 'Baru saja',
      verified: true
    };

    saveTestimonial(submitted);
    setReviewsList((prev) => [submitted, ...prev]);
    setNewReview({ name: '', origin: '', rating: 5, tag: 'Petualang', comment: '' });
    setShowReviewModal(false);
    setReviewSuccess(true);
    setTimeout(() => setReviewSuccess(false), 4500);
  };

  const toggleDayExpand = (dayNum) => {
    setExpandedDays((prev) => ({
      ...prev,
      [dayNum]: !prev[dayNum]
    }));
  };

  const itineraryList = packageData?.itinerary || [];
  const highlightsList = packageData?.highlights || [];
  const includedList = packageData?.included || [];
  const excludedList = packageData?.excluded || packageData?.notIncluded || [];
  const importantInfoList = packageData?.importantInfo || packageData?.notes || [];
  const galleryList = packageData?.gallery || [];
  const faqList = packageData?.faq || [];

  const packageGalleryImages = useMemo(() => {
    if (galleryList && galleryList.length > 0) return galleryList;
    const dest = DESTINATIONS.find((d) => d.id === packageData?.destinationId || d.name === packageData?.destination);
    if (dest?.gallery && dest.gallery.length > 0) return dest.gallery;
    return [packageData?.image, packageData?.fallbackImage].filter(Boolean);
  }, [galleryList, packageData]);

  const relatedPackages = useMemo(() => {
    if (!packageData) return [];
    const sameDestinationOrStyle = PACKAGES.filter(
      (p) =>
        p.id !== packageData.id &&
        (p.destinationId === packageData.destinationId ||
          p.destination === packageData.destination ||
          p.travelStyle === packageData.travelStyle)
    );
    const others = PACKAGES.filter(
      (p) => p.id !== packageData.id && !sameDestinationOrStyle.some((s) => s.id === p.id)
    );
    return [...sameDestinationOrStyle, ...others].slice(0, 3);
  }, [packageData]);

  if (!packageData) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAFAF5', paddingTop: '100px' }}>
        <div style={{ textAlign: 'center', padding: '3rem 1.5rem', maxWidth: '520px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#F0F2EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#101C2C',
              margin: '0 auto 1.5rem auto'
            }}
          >
            <MapPin size={32} />
          </div>
          <h2 style={{ fontSize: '1.75rem', color: '#101C2C', fontWeight: '800', marginBottom: '0.85rem' }}>
            Perjalanan Tidak Ditemukan
          </h2>
          <p style={{ color: '#68717C', marginBottom: '2rem', lineHeight: 1.6 }}>
            Paket wisata yang Anda cari tidak tersedia atau tautan sudah kedaluwarsa. Silakan jelajahi katalog paket pilihan kami lainnya.
          </p>
          <button onClick={onBack} className="btn-dark" style={{ padding: '0.85rem 1.85rem', borderRadius: '12px' }}>
            <ArrowLeft size={18} />
            <span>Kembali ke Katalog Paket</span>
          </button>
        </div>
      </div>
    );
  }

  const priceNumber = packageData.price || 0;
  const estimatedTotal = priceNumber * guests;
  const formattedEstimatedTotal = `Rp ${estimatedTotal.toLocaleString('id-ID')}`;

  let waMessage = `Halo FADZA TRIP ADVENTURE, saya tertarik dengan paket ${packageData.name} (${packageData.duration}) dengan harga mulai ${packageData.formattedPrice}/orang. Saya ingin mengetahui ketersediaan dan detail booking.`;
  if (guests) {
    waMessage += ` Rencana jumlah peserta: ${guests} orang.`;
  }
  if (selectedDate) {
    waMessage += ` Perkiraan tanggal: ${selectedDate}.`;
  }

  const waLink = `https://wa.me/6285888159765?text=${encodeURIComponent(waMessage)}`;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
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
            <span>Kembali ke Paket Wisata</span>
          </button>

          <button
            onClick={handleShare}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: copied ? '#101C2C' : '#68717C',
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
            <span>{copied ? 'Tautan Disalin!' : 'Bagikan Brosur'}</span>
          </button>
        </div>
      </div>

      {/* Hero Presentation */}
      <section style={{ padding: '2rem 0' }}>
        <div className="container">
          <div
            style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              minHeight: '400px',
              display: 'flex',
              alignItems: 'flex-end',
              padding: 'clamp(1.5rem, 4vw, 3rem)',
              boxShadow: '0 12px 36px rgba(16, 28, 44, 0.12)'
            }}
          >
            <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
              <ImageWithFallback
                src={packageData.heroImage}
                fallbackSrc={packageData.fallbackImage}
                alt={packageData.name}
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
                  {packageData.category || 'Petualangan Terkurasi'}
                </span>

                <span
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(8px)',
                    color: '#FFFFFF',
                    padding: '0.3rem 0.85rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <Clock size={13} color="#DFFF00" />
                  {packageData.duration}
                </span>

                <span
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(8px)',
                    color: '#FFFFFF',
                    padding: '0.3rem 0.85rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <MapPin size={13} color="#DFFF00" />
                  {packageData.destination}
                </span>
              </div>

              <h1
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                  color: '#FFFFFF',
                  fontWeight: '800',
                  lineHeight: 1.15,
                  marginBottom: '0.65rem'
                }}
              >
                {packageData.name}
              </h1>

              <p style={{ color: '#F4F5F0', fontSize: '1.05rem', lineHeight: 1.55, marginBottom: '1.25rem', maxWidth: '720px' }}>
                {packageData.tagline}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#FFFFFF', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="#E5A800" color="#E5A800" />
                  ))}
                </div>
                <span style={{ fontWeight: '700', fontSize: '0.88rem' }}>{packageData.rating || 5.0}</span>
                <span style={{ color: '#CBD5E1', fontSize: '0.82rem' }}>
                  ({packageData.reviewCount || 100} ulasan terverifikasi)
                </span>
                <span style={{ color: 'rgba(255, 255, 255, 0.3)', margin: '0 0.25rem' }}>•</span>
                <span style={{ color: '#DFFF00', fontSize: '0.88rem', fontWeight: '800' }}>
                  Mulai dari {packageData.formattedPrice}/orang
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main 2-Column Content Area */}
      <section style={{ padding: '1.5rem 0 3.5rem 0' }}>
        <div className="container">
          <div className="package-detail-layout">
            {/* LEFT COLUMN: Overview, Highlights, Itinerary, Gallery */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Overview Box */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  border: '1px solid #E5E7E2',
                  padding: 'clamp(1.5rem, 3vw, 2.25rem)',
                  boxShadow: '0 4px 20px rgba(16, 28, 44, 0.04)'
                }}
              >
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
                    marginBottom: '1rem'
                  }}
                >
                  <Info size={13} />
                  <span>Tentang Paket Ini</span>
                </div>

                <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)', color: '#101C2C', fontWeight: '800', marginBottom: '1rem', lineHeight: 1.25 }}>
                  Menikmati Pesona {packageData.destination}
                </h2>

                <p style={{ color: '#68717C', fontSize: '1rem', lineHeight: 1.75, marginBottom: '2rem' }}>
                  {packageData.overview || packageData.shortDescription}
                </p>

                {/* 3 Value Pillars */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                  <div style={{ backgroundColor: '#FAFAF5', border: '1px solid #E5E7E2', borderRadius: '14px', padding: '1.15rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#101C2C', color: '#DFFF00', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                      <MapPin size={18} />
                    </div>
                    <h4 style={{ color: '#101C2C', fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.35rem' }}>Rute Terkurasi</h4>
                    <p style={{ color: '#68717C', fontSize: '0.8rem', lineHeight: 1.5 }}>
                      Setiap jam dirancang proporsional agar Anda dapat menikmati perjalanan tanpa terburu-buru.
                    </p>
                  </div>

                  <div style={{ backgroundColor: '#FAFAF5', border: '1px solid #E5E7E2', borderRadius: '14px', padding: '1.15rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#101C2C', color: '#DFFF00', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                      <Award size={18} />
                    </div>
                    <h4 style={{ color: '#101C2C', fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.35rem' }}>Standar Nyaman</h4>
                    <p style={{ color: '#68717C', fontSize: '0.8rem', lineHeight: 1.5 }}>
                      Transportasi privat prima ber-AC, pemandu lokal berlisensi, dan hotel terverifikasi.
                    </p>
                  </div>

                  <div style={{ backgroundColor: '#FAFAF5', border: '1px solid #E5E7E2', borderRadius: '14px', padding: '1.15rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#101C2C', color: '#DFFF00', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                      <HeartHandshake size={18} />
                    </div>
                    <h4 style={{ color: '#101C2C', fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.35rem' }}>Transparansi Biaya</h4>
                    <p style={{ color: '#68717C', fontSize: '0.8rem', lineHeight: 1.5 }}>
                      Semua rincian fasilitas jelas sejak awal tanpa ada biaya siluman selama trip.
                    </p>
                  </div>
                </div>
              </div>

              {/* Highlights Box */}
              {highlightsList.length > 0 && (
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '20px',
                    border: '1px solid #E5E7E2',
                    padding: 'clamp(1.5rem, 3vw, 2.25rem)',
                    boxShadow: '0 4px 20px rgba(16, 28, 44, 0.04)'
                  }}
                >
                  <h3 style={{ fontSize: '1.35rem', color: '#101C2C', fontWeight: '800', marginBottom: '1.25rem' }}>
                    Sorotan Aktivitas Utama
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem' }}>
                    {highlightsList.map((hl, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          backgroundColor: '#FAFAF5',
                          border: '1px solid #E5E7E2',
                          padding: '0.85rem 1rem',
                          borderRadius: '12px'
                        }}
                      >
                        <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#101C2C', color: '#DFFF00', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Check size={13} />
                        </div>
                        <span style={{ color: '#101C2C', fontSize: '0.88rem', fontWeight: '600' }}>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Itinerary Section */}
              {itineraryList.length > 0 && (
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '20px',
                    border: '1px solid #E5E7E2',
                    padding: 'clamp(1.5rem, 3vw, 2.25rem)',
                    boxShadow: '0 4px 20px rgba(16, 28, 44, 0.04)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.35rem', color: '#101C2C', fontWeight: '800' }}>
                        Jadwal & Rute Perjalanan
                      </h3>
                      <p style={{ color: '#68717C', fontSize: '0.88rem', marginTop: '0.25rem' }}>
                        Itinerary harian yang dirancang dengan tempo seimbang
                      </p>
                    </div>

                    <span style={{ backgroundColor: '#101C2C', color: '#DFFF00', fontSize: '0.75rem', fontWeight: '700', padding: '0.3rem 0.8rem', borderRadius: '9999px' }}>
                      {itineraryList.length} Hari
                    </span>
                  </div>

                  {/* Day Tabs */}
                  <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                    {itineraryList.map((dayItem, idx) => {
                      const dayNum = dayItem.day || idx + 1;
                      const isActive = activeDay === dayNum;
                      return (
                        <button
                          key={dayNum}
                          type="button"
                          onClick={() => {
                            setActiveDay(dayNum);
                            setExpandedDays({ [dayNum]: true });
                          }}
                          style={{
                            padding: '0.55rem 1.15rem',
                            borderRadius: '12px',
                            backgroundColor: isActive ? '#101C2C' : '#FAFAF5',
                            color: isActive ? '#DFFF00' : '#101C2C',
                            border: isActive ? '1.5px solid #101C2C' : '1px solid #E5E7E2',
                            fontSize: '0.85rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          Hari {dayNum}
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Day Detail */}
                  {(() => {
                    const currentDayItem = itineraryList.find((d) => (d.day || 1) === activeDay) || itineraryList[0];
                    if (!currentDayItem) return null;

                    return (
                      <div
                        style={{
                          backgroundColor: '#FAFAF5',
                          border: '1px solid #E5E7E2',
                          borderRadius: '16px',
                          padding: '1.5rem'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#68717C', fontSize: '0.82rem', marginBottom: '0.4rem' }}>
                          <MapPin size={13} color="#101C2C" />
                          <span>{currentDayItem.location || packageData.destination}</span>
                        </div>

                        <h4 style={{ color: '#101C2C', fontSize: '1.2rem', fontWeight: '800', marginBottom: '1rem' }}>
                          {currentDayItem.title}
                        </h4>

                        {/* Activities Timeline */}
                        {currentDayItem.activities && currentDayItem.activities.length > 0 && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                            {currentDayItem.activities.map((act, actIdx) => (
                              <div
                                key={actIdx}
                                style={{
                                  display: 'flex',
                                  alignItems: 'flex-start',
                                  gap: '1rem',
                                  paddingLeft: '0.75rem',
                                  borderLeft: '2px solid #101C2C',
                                  position: 'relative'
                                }}
                              >
                                <div
                                  style={{
                                    position: 'absolute',
                                    left: '-5px',
                                    top: '4px',
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    backgroundColor: '#DFFF00',
                                    border: '2px solid #101C2C'
                                  }}
                                />
                                <div style={{ minWidth: '70px', fontSize: '0.8rem', fontWeight: '700', color: '#101C2C' }}>
                                  {act.time}
                                </div>
                                <div style={{ fontSize: '0.88rem', color: '#101C2C', lineHeight: 1.5, flex: 1 }}>
                                  {act.activity}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Package Specific Destination Gallery Preview */}
              {packageGalleryImages.length > 0 && (
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '20px',
                    border: '1px solid #E5E7E2',
                    padding: 'clamp(1.5rem, 3vw, 2.25rem)',
                    boxShadow: '0 4px 20px rgba(16, 28, 44, 0.04)'
                  }}
                >
                  <div style={{ marginBottom: '1.25rem' }}>
                    <h3 style={{ fontSize: '1.35rem', color: '#101C2C', fontWeight: '800' }}>
                      Galeri Foto Spot Perjalanan
                    </h3>
                    <p style={{ color: '#68717C', fontSize: '0.86rem', marginTop: '0.2rem' }}>
                      Dokumentasi sudut-sudut eksotis yang dikunjungi pada paket ini
                    </p>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
                      gap: '1rem'
                    }}
                  >
                    {packageGalleryImages.slice(0, 3).map((imgUrl, gIdx) => (
                      <div
                        key={gIdx}
                        onClick={() =>
                          onOpenGalleryItem &&
                          onOpenGalleryItem({
                            image: imgUrl,
                            title: `${packageData.name} — Spot ${gIdx + 1}`,
                            location: packageData.destination,
                            category: packageData.travelStyle || 'Wisata Nusantara',
                            detailedDescription: packageData.overview || packageData.shortDescription,
                            packageId: packageData.id,
                            packageName: packageData.name
                          })
                        }
                        style={{
                          borderRadius: '16px',
                          overflow: 'hidden',
                          height: '160px',
                          cursor: 'pointer',
                          position: 'relative',
                          boxShadow: '0 4px 14px rgba(16, 28, 44, 0.08)',
                          backgroundColor: '#101C2C'
                        }}
                        className="group"
                      >
                        <ImageWithFallback
                          src={imgUrl}
                          fallbackSrc={packageData.image}
                          alt={`${packageData.name} Foto ${gIdx + 1}`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.4s ease'
                          }}
                          className="group-hover:scale-105"
                        />
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to top, rgba(16, 28, 44, 0.75) 0%, transparent 60%)'
                          }}
                        />
                        <div style={{ position: 'absolute', bottom: '0.75rem', left: '0.75rem', color: '#DFFF00', fontSize: '0.75rem', fontWeight: '700' }}>
                          Lihat Detail →
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Sticky Booking, Facilities, Notes & Contact */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Primary Sticky Booking Card */}
              <div
                style={{
                  position: 'sticky',
                  top: '96px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '24px',
                  border: '1px solid #E5E7E2',
                  padding: '1.75rem',
                  boxShadow: '0 10px 30px rgba(16, 28, 44, 0.08)',
                  zIndex: 20
                }}
              >
                {/* Starting Price Header */}
                <div style={{ marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid #F0F2EB' }}>
                  <span style={{ fontSize: '0.78rem', color: '#8A939E', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Harga Mulai Dari
                  </span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', marginTop: '0.2rem' }}>
                    <span style={{ fontSize: '2.1rem', fontWeight: '800', color: '#101C2C' }}>
                      {packageData.formattedPrice}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: '#8A939E' }}>/orang</span>
                  </div>
                </div>

                {/* Guests Selector */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#101C2C', fontWeight: '700', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                    Jumlah Peserta
                  </label>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: '#FAFAF5',
                      border: '1px solid #E5E7E2',
                      borderRadius: '12px',
                      padding: '0.5rem 0.85rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Users size={16} color="#101C2C" />
                      <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#101C2C' }}>
                        {guests} Orang
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <button
                        type="button"
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        disabled={guests <= 1}
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '8px',
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #E5E7E2',
                          color: '#101C2C',
                          fontWeight: '700',
                          cursor: guests <= 1 ? 'not-allowed' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() => setGuests(guests + 1)}
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '8px',
                          backgroundColor: '#101C2C',
                          border: 'none',
                          color: '#DFFF00',
                          fontWeight: '700',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Estimated Date */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#101C2C', fontWeight: '700', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                    Perkiraan Tanggal
                  </label>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      backgroundColor: '#FAFAF5',
                      border: '1px solid #E5E7E2',
                      borderRadius: '12px',
                      padding: '0.5rem 0.85rem'
                    }}
                  >
                    <Calendar size={16} color="#101C2C" />
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#101C2C',
                        fontSize: '0.88rem',
                        fontWeight: '600',
                        width: '100%',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                {/* Estimated Total */}
                <div
                  style={{
                    backgroundColor: '#FAFAF5',
                    borderRadius: '14px',
                    padding: '1rem',
                    marginBottom: '1.5rem',
                    border: '1px solid #E5E7E2'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.82rem', color: '#68717C' }}>Estimasi Total ({guests} orang)</span>
                    <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#101C2C' }}>
                      {formattedEstimatedTotal}
                    </span>
                  </div>
                </div>

                {/* Action CTAs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenBooking) {
                        onOpenBooking(packageData, guests, selectedDate);
                      }
                    }}
                    className="btn-lime"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      padding: '0.9rem 1.25rem',
                      fontSize: '0.98rem',
                      fontWeight: '800',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.55rem',
                      boxShadow: '0 4px 14px rgba(223, 255, 0, 0.35)'
                    }}
                  >
                    <Ticket size={18} />
                    <span>Booking Sekarang</span>
                  </button>

                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-dark"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      padding: '0.8rem 1rem',
                      fontSize: '0.88rem',
                      fontWeight: '700',
                      borderRadius: '12px',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      borderColor: '#E2E8F0',
                      color: '#101C2C'
                    }}
                  >
                    <WhatsAppIcon size={16} />
                    <span>Tanya Lebih Lanjut via WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenAiChat) onOpenAiChat();
                      else setIsAiModalOpen(true);
                    }}
                    className="btn-outline-dark"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      padding: '0.75rem 1rem',
                      fontSize: '0.86rem',
                      borderRadius: '12px',
                      borderColor: '#E2E8F0',
                      color: '#64748B',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem'
                    }}
                  >
                    <Bot size={16} color="#101C2C" />
                    <span>Tanya FADZA AI Concierge</span>
                  </button>
                </div>

                {/* Guarantee Trust Points */}
                <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid #F0F2EB', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.78rem', color: '#68717C' }}>
                    <ShieldCheck size={14} color="#101C2C" />
                    <span>100% Berizin & Terdaftar Resmi Kemenparekraf</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.78rem', color: '#68717C' }}>
                    <CheckCircle2 size={14} color="#101C2C" />
                    <span>Jaminan Layanan Privat & Fleksibel</span>
                  </div>
                </div>
              </div>

              {/* Inclusions & Exclusions Card */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '24px',
                  border: '1px solid #E5E7E2',
                  padding: '1.75rem',
                  boxShadow: '0 4px 20px rgba(16, 28, 44, 0.04)'
                }}
              >
                <h4 style={{ color: '#101C2C', fontSize: '1.15rem', fontWeight: '800', marginBottom: '1.25rem' }}>
                  Fasilitas & Layanan Paket
                </h4>

                {/* Termasuk */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#EBF9F1', color: '#107C41', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <span style={{ color: '#107C41', fontSize: '0.88rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Harga Sudah Termasuk:
                    </span>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                    {includedList.map((inc, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '0.86rem', color: '#101C2C', lineHeight: 1.5 }}>
                        <span style={{ color: '#107C41', fontWeight: '700', marginTop: '1px' }}>✓</span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tidak Termasuk */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#FEECEC', color: '#D92D20', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <X size={14} strokeWidth={3} />
                    </div>
                    <span style={{ color: '#D92D20', fontSize: '0.88rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Belum Termasuk:
                    </span>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                    {excludedList.map((exc, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '0.86rem', color: '#68717C', lineHeight: 1.5 }}>
                        <span style={{ color: '#D92D20', fontWeight: '700', marginTop: '1px' }}>✕</span>
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Important Info & Preparation Card */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '24px',
                  border: '1px solid #E5E7E2',
                  padding: '1.75rem',
                  boxShadow: '0 4px 20px rgba(16, 28, 44, 0.04)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <Info size={18} color="#101C2C" />
                  <h4 style={{ color: '#101C2C', fontSize: '1.05rem', fontWeight: '800' }}>
                    Catatan Penting Perjalanan
                  </h4>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.84rem', color: '#68717C', lineHeight: 1.55 }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem' }}>
                    <span style={{ color: '#101C2C', fontWeight: '700' }}>•</span>
                    <span><strong>Penjemputan:</strong> Tersedia langsung di bandara atau lobi hotel sesuai kesepakatan jadwal tiba.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem' }}>
                    <span style={{ color: '#101C2C', fontWeight: '700' }}>•</span>
                    <span><strong>Perlengkapan:</strong> Disarankan membawa pakaian nyaman menyerap keringat, kacamata hitam, dan kamera.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem' }}>
                    <span style={{ color: '#101C2C', fontWeight: '700' }}>•</span>
                    <span><strong>Reschedule:</strong> Bebas penyesuaian tanggal 1 kali maksimal H-10 keberangkatan tanpa penalti.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* FULL WIDTH BOTTOM: FAQ Accordion */}
          {faqList.length > 0 && (
            <div style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid #E5E7E2' }}>
              <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                  <h3 style={{ fontSize: '1.6rem', color: '#101C2C', fontWeight: '800' }}>
                    Pertanyaan Seputar Paket Ini
                  </h3>
                  <p style={{ color: '#68717C', fontSize: '0.92rem', marginTop: '0.35rem' }}>
                    Kumpulan jawaban penting terkait pemesanan, ketersediaan, dan jadwal
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {faqList.map((faq, fIdx) => {
                    const isOpen = openFaqIndex === fIdx;
                    return (
                      <div
                        key={fIdx}
                        style={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #E5E7E2',
                          borderRadius: '16px',
                          overflow: 'hidden',
                          boxShadow: '0 2px 10px rgba(16, 28, 44, 0.03)'
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaqIndex(isOpen ? -1 : fIdx)}
                          style={{
                            width: '100%',
                            padding: '1.15rem 1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            textAlign: 'left',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            gap: '1rem'
                          }}
                        >
                          <span style={{ fontSize: '0.98rem', fontWeight: '700', color: '#101C2C' }}>
                            {faq.question}
                          </span>
                          <ChevronDown
                            size={18}
                            color="#101C2C"
                            style={{
                              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                              transition: 'transform 0.2s ease',
                              flexShrink: 0
                            }}
                          />
                        </button>
                        {isOpen && (
                          <div style={{ padding: '0 1.5rem 1.25rem 1.5rem', fontSize: '0.9rem', color: '#68717C', lineHeight: 1.65, borderTop: '1px solid #F0F2EB', paddingTop: '0.85rem' }}>
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* FULL WIDTH: Reviews & Testimonials Section for This Package */}
          <div style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid #E5E7E2' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                flexWrap: 'wrap',
                gap: '1.25rem',
                marginBottom: '2rem'
              }}
            >
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    backgroundColor: 'rgba(217, 119, 6, 0.12)',
                    border: '1px solid rgba(217, 119, 6, 0.3)',
                    color: '#D97706',
                    padding: '0.3rem 0.85rem',
                    borderRadius: '9999px',
                    fontSize: '0.78rem',
                    fontWeight: '800',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    marginBottom: '0.65rem'
                  }}
                >
                  <Star size={13} fill="#D97706" color="#D97706" />
                  <span>Ulasan Penjelajah</span>
                </div>
                <h3 style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)', fontWeight: '800', color: '#101C2C', margin: '0 0 0.35rem 0' }}>
                  Kesan & Cerita Nyata Tamu Kami
                </h3>
                <p style={{ color: '#68717C', fontSize: '0.94rem', margin: 0 }}>
                  Pengalaman langsung dari mereka yang telah menjelajahi destinasi ini bersama FADZA TRIP ADVENTURE.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowReviewModal(true)}
                className="btn-lime"
                style={{
                  padding: '0.75rem 1.45rem',
                  fontSize: '0.9rem',
                  fontWeight: '800',
                  borderRadius: '12px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  cursor: 'pointer'
                }}
              >
                <MessageSquarePlus size={16} />
                <span>Tulis Ulasan untuk Trip Ini</span>
              </button>
            </div>

            {/* Success Alert */}
            {reviewSuccess && (
              <div
                style={{
                  backgroundColor: '#F0FDF4',
                  border: '1px solid #86EFAC',
                  borderRadius: '12px',
                  padding: '0.85rem 1.25rem',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  color: '#15803D',
                  fontSize: '0.9rem',
                  fontWeight: '700'
                }}
              >
                <CheckCircle2 size={18} color="#16A34A" />
                <span>Terima kasih! Ulasan Anda telah berhasil disimpan dan diterbitkan di bawah ini.</span>
              </div>
            )}

            {/* Testimonials Grid for this package */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
                gap: '1.5rem'
              }}
            >
              {reviewsList.map((rev) => {
                const isVoted = helpfulVotes[rev.id];
                return (
                  <div
                    key={rev.id}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '20px',
                      border: '1px solid #E5E7E2',
                      padding: '1.75rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: '0 4px 16px rgba(16, 28, 44, 0.04)'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          {rev.avatar ? (
                            <img
                              src={rev.avatar}
                              alt={rev.name}
                              style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
                            />
                          ) : (
                            <div
                              style={{
                                width: '42px',
                                height: '42px',
                                borderRadius: '50%',
                                backgroundColor: '#101C2C',
                                color: '#DFFF00',
                                fontWeight: '800',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              {rev.name?.charAt(0) || 'F'}
                            </div>
                          )}
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                              <h4 style={{ fontSize: '0.96rem', fontWeight: '800', color: '#101C2C', margin: 0 }}>
                                {rev.name}
                              </h4>
                              <span
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '0.15rem',
                                  backgroundColor: 'rgba(2, 132, 199, 0.1)',
                                  color: '#0284C7',
                                  fontSize: '0.65rem',
                                  fontWeight: '800',
                                  padding: '0.15rem 0.45rem',
                                  borderRadius: '9999px'
                                }}
                              >
                                <ShieldCheck size={10} color="#0284C7" />
                                <span>Terverifikasi</span>
                              </span>
                            </div>
                            <div style={{ fontSize: '0.78rem', color: '#8A939E' }}>{rev.origin}</div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '2px' }}>
                          {[...Array(Number(rev.rating) || 5)].map((_, i) => (
                            <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
                          ))}
                        </div>
                      </div>

                      <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.6, margin: '0 0 1rem 0' }}>
                        "{rev.comment || rev.quote}"
                      </p>
                    </div>

                    <div
                      style={{
                        paddingTop: '0.85rem',
                        borderTop: '1px solid #F0F2EB',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.78rem'
                      }}
                    >
                      <span style={{ color: '#8A939E' }}>{rev.date || '2026'}</span>
                      <button
                        type="button"
                        onClick={() => handleHelpfulClick(rev.id)}
                        style={{
                          background: 'none',
                          border: isVoted ? '1px solid #16A34A' : '1px solid #E2E8F0',
                          borderRadius: '6px',
                          padding: '0.25rem 0.55rem',
                          color: isVoted ? '#16A34A' : '#68717C',
                          fontWeight: '700',
                          cursor: isVoted ? 'default' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          backgroundColor: isVoted ? 'rgba(22, 163, 74, 0.08)' : 'transparent'
                        }}
                      >
                        <ThumbsUp size={12} color={isVoted ? '#16A34A' : '#68717C'} />
                        <span>Membantu</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* FULL WIDTH BOTTOM: Related Packages Grid */}
          {relatedPackages.length > 0 && (
            <div style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid #E5E7E2' }}>
              <div style={{ marginBottom: '2.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#101C2C' }}>
                    Paket Wisata Lain yang Mungkin Anda Suka
                  </h3>
                  <p style={{ color: '#68717C', fontSize: '0.92rem', marginTop: '0.35rem' }}>
                    Pilihan rute alternatif dengan suasana dan standar kenyamanan serupa
                  </p>
                </div>
              </div>

              <div className="popular-packages-grid">
                {relatedPackages.map((relPkg) => (
                  <PackageCard
                    key={relPkg.id}
                    pkg={relPkg}
                    onSelectPackage={onSelectPackage}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* AI Assistant Modal fallback if needed */}
      {isAiModalOpen && (
        <AITravelAssistantModal
          isOpen={isAiModalOpen}
          onClose={() => setIsAiModalOpen(false)}
          initialPackage={packageData}
        />
      )}

      {/* Package Specific Review Modal */}
      {showReviewModal && (
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
          onClick={() => setShowReviewModal(false)}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.45)',
              position: 'relative',
              padding: '2rem'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #E5E7E2' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#B86B4B', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {packageData.name}
                </span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#101C2C', margin: '0.2rem 0 0 0' }}>
                  Tulis Ulasan Perjalanan
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowReviewModal(false)}
                style={{ background: 'none', border: 'none', color: '#68717C', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#101C2C', marginBottom: '0.35rem' }}>
                  Penilaian Bintang *
                </label>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: s })}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px' }}
                    >
                      <Star
                        size={28}
                        fill={s <= newReview.rating ? '#F59E0B' : '#E2E8F0'}
                        color={s <= newReview.rating ? '#F59E0B' : '#CBD5E1'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#101C2C', marginBottom: '0.35rem' }}>
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Budi Santoso"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#101C2C', marginBottom: '0.35rem' }}>
                  Kota Asal / Pekerjaan
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Bandung"
                  value={newReview.origin}
                  onChange={(e) => setNewReview({ ...newReview, origin: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#101C2C', marginBottom: '0.35rem' }}>
                  Ulasan & Cerita Perjalanan *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Ceritakan kepuasan Anda terhadap hotel, pemandu, armada, dan rute perjalanan..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit', lineHeight: 1.6 }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  style={{ padding: '0.75rem 1.25rem', borderRadius: '10px', border: '1px solid #CBD5E1', background: 'none', color: '#68717C', cursor: 'pointer', fontWeight: '600' }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-lime"
                  style={{ padding: '0.75rem 1.75rem', borderRadius: '10px', fontWeight: '800', cursor: 'pointer' }}
                >
                  Kirim Ulasan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
