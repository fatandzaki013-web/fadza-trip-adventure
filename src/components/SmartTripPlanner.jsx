import React, { useState, useMemo } from 'react';
import { PACKAGES } from '../data/travelData.js';
import { useLanguage } from '../context/LanguageContext';
import ImageWithFallback from './ImageWithFallback';
import {
  Users,
  Compass,
  Wallet,
  Sparkles,
  ArrowRight,
  Check,
  Star,
  Clock,
  Ticket,
  MapPin,
  Sliders
} from 'lucide-react';

export default function SmartTripPlanner({ onSelectPackage, onOpenBooking, onNavigate }) {
  const { language } = useLanguage();

  // State: Party size, travel style, and budget slider
  const [partyType, setPartyType] = useState('couple'); // 'solo' (1), 'couple' (2), 'family' (4), 'group' (8)
  const [travelStyle, setTravelStyle] = useState('all'); // 'all', 'bahari', 'vulkanik', 'budaya', 'alam'
  const [budgetPerPerson, setBudgetPerPerson] = useState(7500000); // 2.5jt to 15jt

  // Party size helper
  const partyGuestCount = {
    solo: 1,
    couple: 2,
    family: 4,
    group: 8
  }[partyType] || 2;

  const partyOptions = [
    { id: 'solo', label: language === 'en' ? 'Solo Explorer' : 'Solo Explorer', count: '1 Orang', icon: '🎒' },
    { id: 'couple', label: language === 'en' ? 'Couple / Romantic' : 'Pasangan / Duet', count: '2 Orang', icon: '💑' },
    { id: 'family', label: language === 'en' ? 'Family Vacation' : 'Keluarga Ceria', count: '3 - 5 Orang', icon: '👨‍👩‍👧‍👦' },
    { id: 'group', label: language === 'en' ? 'Group / Corporate' : 'Grup & Komunitas', count: '6+ Orang', icon: '👥' }
  ];

  const styleOptions = [
    { id: 'all', label: language === 'en' ? 'All Styles' : 'Semua Karakter', icon: '✨' },
    { id: 'bahari', label: language === 'en' ? 'Coastal & Islands' : 'Santai & Bahari', icon: '🏖️' },
    { id: 'vulkanik', label: language === 'en' ? 'Volcanic Adventure' : 'Petualangan Vulkanik', icon: '🌋' },
    { id: 'budaya', label: language === 'en' ? 'Heritage & Culture' : 'Warisan Budaya', icon: '🏛️' },
    { id: 'alam', label: language === 'en' ? 'Highland & Nature' : 'Relaksasi Alam', icon: '🍃' }
  ];

  // Dynamic filter matching packages
  const matchingPackages = useMemo(() => {
    return PACKAGES.filter((pkg) => {
      // Budget check
      const withinBudget = pkg.price <= budgetPerPerson;

      // Style check
      let styleMatch = true;
      if (travelStyle === 'bahari') {
        styleMatch = ['labuan-bajo', 'raja-ampat', 'bali', 'lombok', 'derawan', 'bunaken', 'wakatobi'].some(
          (d) => pkg.destination?.toLowerCase().includes(d) || pkg.id?.includes(d)
        );
      } else if (travelStyle === 'vulkanik') {
        styleMatch = ['bromo', 'rinjani', 'ijen'].some(
          (d) => pkg.destination?.toLowerCase().includes(d) || pkg.id?.includes(d) || pkg.name?.toLowerCase().includes('bromo')
        );
      } else if (travelStyle === 'budaya') {
        styleMatch = ['yogyakarta', 'toraja', 'bali'].some(
          (d) => pkg.destination?.toLowerCase().includes(d) || pkg.id?.includes(d) || pkg.name?.toLowerCase().includes('heritage')
        );
      } else if (travelStyle === 'alam') {
        styleMatch = ['bandung', 'dieng', 'sumba', 'belitung'].some(
          (d) => pkg.destination?.toLowerCase().includes(d) || pkg.id?.includes(d)
        );
      }

      return withinBudget && styleMatch;
    }).slice(0, 3);
  }, [travelStyle, budgetPerPerson]);

  const formatRupiah = (num) => {
    return 'Rp' + Number(num).toLocaleString('id-ID');
  };

  return (
    <section
      id="smart-trip-planner-section"
      style={{
        padding: '5rem 0',
        backgroundColor: '#FAF9F5',
        position: 'relative'
      }}
    >
      <div className="container" style={{ maxWidth: '1240px' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3rem auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              backgroundColor: 'rgba(2, 132, 199, 0.1)',
              border: '1px solid rgba(2, 132, 199, 0.28)',
              color: '#0284C7',
              padding: '0.35rem 0.95rem',
              borderRadius: '9999px',
              fontSize: '0.78rem',
              fontWeight: '800',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem'
            }}
          >
            <Sparkles size={14} color="#0284C7" />
            <span>{language === 'en' ? 'Smart Trip & Budget Simulator' : 'Kalkulator & Kurasi Rute Impian'}</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(1.85rem, 3.4vw, 2.75rem)',
              fontWeight: '800',
              lineHeight: 1.3,
              paddingTop: '0.2rem',
              color: '#0F172A',
              margin: '0 0 0.5rem 0',
              letterSpacing: '-0.015em'
            }}
          >
            {language === 'en'
              ? 'Plan Your Tailored Journey with Live Budget Simulation'
              : 'Rencanakan Rute Impian dengan Simulasi Budget Real-Time'}
          </h2>
          <p style={{ color: '#64748B', fontSize: '1rem', marginTop: '0.35rem', lineHeight: 1.6 }}>
            {language === 'en'
              ? 'Customize your group, desired holiday vibe, and budget per person. Our smart algorithm instantly curates verified private itineraries with automatic cost calculation.'
              : 'Pilih tipe rombongan, gaya liburan impian, dan budget per orang. Algoritma cerdas FADZA secara otomatis menghitung dan merekomendasikan rute terverifikasi.'}
          </p>
        </div>

        {/* Interactive Control Console Card */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: 'clamp(1.5rem, 3.5vw, 2.5rem)',
            boxShadow: '0 12px 36px rgba(16, 28, 44, 0.06)',
            border: '1px solid rgba(16, 28, 44, 0.08)',
            marginBottom: '3rem'
          }}
        >
          {/* Row 1: Who is traveling */}
          <div style={{ marginBottom: '2rem' }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.92rem',
                fontWeight: '800',
                color: '#101C2C',
                marginBottom: '0.85rem'
              }}
            >
              <Users size={16} color="#0284C7" />
              <span>{language === 'en' ? '1. Who is traveling with you?' : '1. Siapa yang akan bepergian?'}</span>
            </label>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
                gap: '0.75rem'
              }}
            >
              {partyOptions.map((opt) => {
                const isSelected = partyType === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setPartyType(opt.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.85rem 1rem',
                      borderRadius: '14px',
                      border: isSelected ? '2px solid #0284C7' : '1px solid #E2E8F0',
                      backgroundColor: isSelected ? 'rgba(2, 132, 199, 0.06)' : '#FAF9F5',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      textAlign: 'left'
                    }}
                  >
                    <span style={{ fontSize: '1.4rem' }}>{opt.icon}</span>
                    <div>
                      <div style={{ fontWeight: isSelected ? '800' : '700', fontSize: '0.92rem', color: isSelected ? '#0284C7' : '#1E293B' }}>
                        {opt.label}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{opt.count}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 2: Travel Style */}
          <div style={{ marginBottom: '2.25rem' }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.92rem',
                fontWeight: '800',
                color: '#101C2C',
                marginBottom: '0.85rem'
              }}
            >
              <Compass size={16} color="#D97706" />
              <span>{language === 'en' ? '2. Desired Travel Atmosphere' : '2. Karakter & Gaya Perjalanan'}</span>
            </label>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.65rem'
              }}
            >
              {styleOptions.map((opt) => {
                const isSelected = travelStyle === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setTravelStyle(opt.id)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      padding: '0.65rem 1.15rem',
                      borderRadius: '9999px',
                      border: isSelected ? '1.5px solid #101C2C' : '1px solid #E2E8F0',
                      backgroundColor: isSelected ? '#101C2C' : '#FFFFFF',
                      color: isSelected ? '#DFFF00' : '#475569',
                      fontWeight: isSelected ? '800' : '600',
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected ? '0 4px 14px rgba(16, 28, 44, 0.2)' : 'none'
                    }}
                  >
                    <span>{opt.icon}</span>
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 3: Budget Range Slider */}
          <div
            style={{
              padding: '1.25rem 1.5rem',
              backgroundColor: '#F8FAFC',
              borderRadius: '16px',
              border: '1px solid #E2E8F0'
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Wallet size={16} color="#15803D" />
                <span style={{ fontSize: '0.92rem', fontWeight: '800', color: '#101C2C' }}>
                  {language === 'en' ? '3. Budget Limit per Person' : '3. Batas Budget per Orang'}
                </span>
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#15803D', fontFamily: 'var(--font-heading)' }}>
                {formatRupiah(budgetPerPerson)} <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#64748B' }}>/ peserta</span>
              </div>
            </div>

            <input
              type="range"
              min={2500000}
              max={15000000}
              step={250000}
              value={budgetPerPerson}
              onChange={(e) => setBudgetPerPerson(Number(e.target.value))}
              style={{
                width: '100%',
                height: '8px',
                accentColor: '#101C2C',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.78rem', color: '#94A3B8', fontWeight: '600' }}>
              <span>Rp 2.500.000 (Ekonomis Cermat)</span>
              <span>Rp 8.000.000 (Semi-Luxury)</span>
              <span>Rp 15.000.000+ (Ultra-Private VIP)</span>
            </div>
          </div>
        </div>

        {/* Live Matching Results Grid */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#101C2C', margin: 0 }}>
                {language === 'en'
                  ? `Recommended Packages (${matchingPackages.length} Matches)`
                  : `Rekomendasi Paket Terpilih (${matchingPackages.length} Sesuai)`}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748B', margin: '0.2rem 0 0 0' }}>
                {language === 'en'
                  ? `Calculated estimate for ${partyGuestCount} person party with budget up to ${formatRupiah(budgetPerPerson)}/person`
                  : `Estimasi total untuk ${partyGuestCount} orang peserta dengan batas budget s/d ${formatRupiah(budgetPerPerson)}/orang`}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate && onNavigate('packages')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.88rem',
                fontWeight: '700',
                color: '#0284C7',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <span>{language === 'en' ? 'View All 16 Packages' : 'Lihat Semua Paket'}</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {matchingPackages.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
                gap: '1.75rem'
              }}
            >
              {matchingPackages.map((pkg) => {
                const totalCost = pkg.price * partyGuestCount;
                const dpCost = Math.round(totalCost * 0.3);

                return (
                  <div
                    key={pkg.id}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      boxShadow: '0 8px 24px rgba(16, 28, 44, 0.05)',
                      border: '1px solid rgba(16, 28, 44, 0.08)',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.25s ease'
                    }}
                  >
                    {/* Package Thumbnail */}
                    <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
                      <ImageWithFallback
                        src={pkg.image}
                        alt={pkg.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          backgroundColor: 'rgba(16, 28, 44, 0.85)',
                          backdropFilter: 'blur(8px)',
                          color: '#FFFFFF',
                          padding: '0.3rem 0.75rem',
                          borderRadius: '8px',
                          fontSize: '0.78rem',
                          fontWeight: '700',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem'
                        }}
                      >
                        <Clock size={12} color="#DFFF00" />
                        <span>{pkg.duration}</span>
                      </div>

                      <div
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          backgroundColor: '#DFFF00',
                          color: '#101C2C',
                          padding: '0.3rem 0.75rem',
                          borderRadius: '8px',
                          fontSize: '0.78rem',
                          fontWeight: '800'
                        }}
                      >
                        ★ {pkg.rating}
                      </div>

                      <div
                        style={{
                          position: 'absolute',
                          bottom: '12px',
                          left: '12px',
                          backgroundColor: 'rgba(16, 28, 44, 0.75)',
                          backdropFilter: 'blur(6px)',
                          color: '#FFFFFF',
                          padding: '0.25rem 0.65rem',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem'
                        }}
                      >
                        <MapPin size={11} color="#38BDF8" />
                        <span>{pkg.destination}</span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <h4
                        style={{
                          fontSize: '1.15rem',
                          fontWeight: '800',
                          color: '#101C2C',
                          margin: '0 0 0.5rem 0',
                          lineHeight: 1.3
                        }}
                      >
                        {pkg.name}
                      </h4>
                      <p style={{ fontSize: '0.84rem', color: '#64748B', lineHeight: 1.5, margin: '0 0 1rem 0' }}>
                        {pkg.shortDescription || pkg.description}
                      </p>

                      {/* Live Calculation Panel */}
                      <div
                        style={{
                          marginTop: 'auto',
                          padding: '0.9rem',
                          backgroundColor: '#F8FAFC',
                          borderRadius: '12px',
                          border: '1px solid #E2E8F0',
                          marginBottom: '1rem'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748B', marginBottom: '0.25rem' }}>
                          <span>Tarif per Orang:</span>
                          <span style={{ fontWeight: '700', color: '#101C2C' }}>{pkg.formattedPrice}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', fontWeight: '800', color: '#15803D' }}>
                          <span>Total ({partyGuestCount} Peserta):</span>
                          <span>{formatRupiah(totalCost)}</span>
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '0.2rem' }}>
                          DP Ringan 30%: {formatRupiah(dpCost)} (Pelunasan H-7)
                        </div>
                      </div>

                      {/* Actions */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '0.65rem' }}>
                        <button
                          type="button"
                          onClick={() => onSelectPackage && onSelectPackage(pkg)}
                          style={{
                            padding: '0.65rem',
                            borderRadius: '10px',
                            border: '1px solid #CBD5E1',
                            backgroundColor: '#FFFFFF',
                            color: '#1E293B',
                            fontSize: '0.84rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          Detail Rute
                        </button>

                        <button
                          type="button"
                          onClick={() => onOpenBooking && onOpenBooking(pkg, partyGuestCount)}
                          style={{
                            padding: '0.65rem',
                            borderRadius: '10px',
                            border: 'none',
                            backgroundColor: '#DFFF00',
                            color: '#101C2C',
                            fontSize: '0.86rem',
                            fontWeight: '800',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.35rem',
                            boxShadow: '0 2px 8px rgba(223, 255, 0, 0.35)',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <Ticket size={14} />
                          <span>Booking Sekarang</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                padding: '3rem 2rem',
                textAlign: 'center',
                border: '1px dashed #CBD5E1'
              }}
            >
              <p style={{ color: '#64748B', fontSize: '1rem', marginBottom: '1rem' }}>
                Tidak ada paket di bawah {formatRupiah(budgetPerPerson)} dengan karakter ini. Coba naikkan slider budget atau pilih karakter perjalanan lain.
              </p>
              <button
                type="button"
                onClick={() => {
                  setBudgetPerPerson(10000000);
                  setTravelStyle('all');
                }}
                style={{
                  padding: '0.65rem 1.4rem',
                  borderRadius: '10px',
                  backgroundColor: '#101C2C',
                  color: '#DFFF00',
                  fontWeight: '700',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Reset Filter Budget
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
