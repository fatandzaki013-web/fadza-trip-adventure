import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Users,
  CreditCard,
  ShieldCheck,
  Ticket,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Copy,
  Printer,
  ArrowRight,
  ArrowLeft,
  Building2,
  QrCode,
  Wallet,
  Clock,
  Check,
  Plane,
  Sparkles
} from 'lucide-react';
import { PACKAGES } from '../data/travelData';
import { useLanguage } from '../context/LanguageContext';
import WhatsAppIcon from './WhatsAppIcon';
import ImageWithFallback from './ImageWithFallback';

export default function BookingModal({
  isOpen,
  onClose,
  initialPackage = null,
  initialGuests = 2,
  initialDate = ''
}) {
  const { t } = useLanguage();

  // Wizard Steps: 1: Package & Schedule, 2: Customer Details, 3: Payment & Review, 4: Confirmed E-Voucher
  const [step, setStep] = useState(1);

  // Form State
  const [selectedPkgId, setSelectedPkgId] = useState(
    initialPackage?.id || PACKAGES[0]?.id || 'bali-escape'
  );
  const [travelDate, setTravelDate] = useState(initialDate || '');
  const [guests, setGuests] = useState(Math.max(1, initialGuests || 2));
  const [roomType, setRoomType] = useState('deluxe');

  // Customer State
  const [customer, setCustomer] = useState({
    fullName: '',
    whatsapp: '',
    email: '',
    originCity: '',
    idNumber: '',
    emergencyContact: '',
    specialNotes: ''
  });

  // Payment Options
  const [paymentScheme, setPaymentScheme] = useState('dp'); // 'dp' (30%) or 'full' (100%)
  const [paymentMethod, setPaymentMethod] = useState('bca_va'); // bca_va, mandiri_va, qris, cc

  // Result State
  const [bookingCode, setBookingCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Synchronize when initialPackage or isOpen changes
  useEffect(() => {
    if (isOpen) {
      if (initialPackage && initialPackage.id) {
        setSelectedPkgId(initialPackage.id);
      }
      if (initialGuests) {
        setGuests(Math.max(1, initialGuests));
      }
      if (initialDate) {
        setTravelDate(initialDate);
      } else {
        // Default 3 days ahead
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 3);
        const yyyy = tomorrow.getFullYear();
        const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const dd = String(tomorrow.getDate()).padStart(2, '0');
        setTravelDate(`${yyyy}-${mm}-${dd}`);
      }
      setStep(1);
      setValidationError('');
      setCopiedCode(false);
    }
  }, [isOpen, initialPackage, initialGuests, initialDate]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Selected package details
  const currentPkg = PACKAGES.find((p) => p.id === selectedPkgId) || PACKAGES[0];
  const unitPrice = currentPkg?.price || 3500000;
  const subtotal = unitPrice * guests;
  const roomUpgradeFee = roomType === 'suite' ? 350000 * guests : 0;
  const discountAmount = 150000; // Promo FADZANUSANTARA
  const grossTotal = subtotal + roomUpgradeFee;
  const netTotal = Math.max(0, grossTotal - discountAmount);
  const dpAmount = Math.round(netTotal * 0.3);
  const currentTotalToPay = paymentScheme === 'dp' ? dpAmount : netTotal;

  const formatRupiah = (num) => {
    return 'Rp' + Number(num).toLocaleString('id-ID');
  };

  const handleNextStep1 = () => {
    if (!travelDate) {
      setValidationError('Silakan pilih perkiraan tanggal keberangkatan Anda.');
      return;
    }
    setValidationError('');
    setStep(2);
  };

  const handleNextStep2 = () => {
    if (!customer.fullName.trim()) {
      setValidationError('Silakan isi nama lengkap pemesan sesuai identitas KTP/Paspor.');
      return;
    }
    if (!customer.whatsapp.trim()) {
      setValidationError('Silakan isi nomor WhatsApp aktif untuk konfirmasi reservasi.');
      return;
    }
    if (!customer.email.trim()) {
      setValidationError('Silakan isi alamat email untuk penerimaan e-voucher.');
      return;
    }
    setValidationError('');
    setStep(3);
  };

  const handleConfirmBooking = () => {
    setIsSubmitting(true);
    setValidationError('');

    // Generate unique modern Booking ID
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const newCode = `FDZ-${new Date().getFullYear()}-${randomHex}`;
    setBookingCode(newCode);

    // Save booking into localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('fadza_bookings') || '[]');
      const newBookingRecord = {
        bookingCode: newCode,
        createdAt: new Date().toISOString(),
        packageId: currentPkg.id,
        packageName: currentPkg.name,
        destination: currentPkg.destination,
        duration: currentPkg.duration,
        travelDate,
        guests,
        roomType,
        customer,
        subtotal,
        roomUpgradeFee,
        discountAmount,
        netTotal,
        dpAmount,
        totalPaid: currentTotalToPay,
        paymentScheme,
        paymentMethod,
        status: 'TERKONFIRMASI_MENUNGGU_BAYAR'
      };
      existing.unshift(newBookingRecord);
      localStorage.setItem('fadza_bookings', JSON.stringify(existing));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setStep(4);
    }, 700);
  };

  const handleCopyCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(bookingCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // WhatsApp Link for Follow-up / Direct Assistance
  const waMessage = `Halo Tim Concierge FADZA TRIP ADVENTURE, saya telah membuat reservasi perjalanan resmi:
• Kode Reservasi: ${bookingCode}
• Paket: ${currentPkg?.name} (${currentPkg?.duration})
• Destinasi: ${currentPkg?.destination}
• Tanggal Berangkat: ${travelDate}
• Peserta: ${guests} Orang (${roomType === 'suite' ? 'VIP Ocean Suite' : 'Standard Deluxe'})
• Pemesan: ${customer.fullName}
• Asal/Penjemputan: ${customer.originCity || 'Indonesia'}
• Skema Bayar: ${paymentScheme === 'dp' ? 'Uang Muka (DP 30%)' : 'Pelunasan Penuh (100%)'} - ${formatRupiah(currentTotalToPay)}
• Metode Pembayaran: ${paymentMethod.toUpperCase()}

Mohon verifikasi ketersediaan dan konfirmasi e-tiket resmi. Terima kasih!`;

  const waFollowUpUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(waMessage)}`;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '820px',
          maxHeight: '92vh',
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* MODAL HEADER */}
        <div
          style={{
            padding: '1.25rem 1.75rem',
            backgroundColor: '#101C2C',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            flexShrink: 0
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: 'rgba(223, 255, 0, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#DFFF00'
              }}
            >
              <Ticket size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: '800', letterSpacing: '-0.01em' }}>
                {step === 4 ? 'Konfirmasi Reservasi Resmi' : 'Reservasi & Booking Perjalanan'}
              </h3>
              <span style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
                FADZA TRIP ADVENTURE • Official Travel Concierge
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer',
              padding: '0.4rem',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color 0.2s ease'
            }}
            aria-label="Tutup"
          >
            <X size={20} />
          </button>
        </div>

        {/* STEP PROGRESS INDICATOR (Steps 1 to 3) */}
        {step < 4 && (
          <div
            style={{
              padding: '0.9rem 1.75rem',
              backgroundColor: '#FAFAF5',
              borderBottom: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              flexShrink: 0
            }}
          >
            {[
              { num: 1, label: 'Pilih & Jadwal' },
              { num: 2, label: 'Data Pemesan' },
              { num: 3, label: 'Pembayaran' }
            ].map((s, idx) => {
              const isActive = step === s.num;
              const isDone = step > s.num;
              return (
                <div
                  key={s.num}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    flex: 1
                  }}
                >
                  <div
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      backgroundColor: isDone ? '#101C2C' : isActive ? '#DFFF00' : '#E2E8F0',
                      color: isDone ? '#DFFF00' : isActive ? '#101C2C' : '#64748B',
                      fontSize: '0.78rem',
                      fontWeight: '800',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    {isDone ? <Check size={14} strokeWidth={3} /> : s.num}
                  </div>
                  <span
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: isActive || isDone ? '700' : '600',
                      color: isActive ? '#0F172A' : '#64748B',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {s.label}
                  </span>
                  {idx < 2 && (
                    <div
                      style={{
                        flex: 1,
                        height: '2px',
                        backgroundColor: isDone ? '#101C2C' : '#E2E8F0',
                        marginLeft: '0.5rem'
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* MODAL BODY (SCROLLABLE) */}
        <div
          style={{
            padding: '1.5rem 1.75rem',
            overflowY: 'auto',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}
        >
          {/* Validation Alert */}
          {validationError && (
            <div
              style={{
                backgroundColor: '#FEF2F2',
                border: '1px solid #FCA5A5',
                color: '#B91C1C',
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                fontSize: '0.86rem',
                fontWeight: '600'
              }}
            >
              ⚠️ {validationError}
            </div>
          )}

          {/* =========================================================================
              STEP 1: SELECT PACKAGE & SCHEDULE
              ========================================================================= */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  1. Pilih Paket Wisata Nusantara
                </label>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '0.75rem',
                    maxHeight: '220px',
                    overflowY: 'auto',
                    paddingRight: '0.25rem'
                  }}
                >
                  {PACKAGES.map((pkg) => {
                    const isSelected = pkg.id === selectedPkgId;
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPkgId(pkg.id)}
                        style={{
                          padding: '0.75rem 0.85rem',
                          borderRadius: '14px',
                          border: isSelected ? '2px solid #101C2C' : '1px solid #E2E8F0',
                          backgroundColor: isSelected ? '#F8FAFC' : '#FFFFFF',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          transition: 'all 0.2s ease',
                          boxShadow: isSelected ? '0 4px 12px rgba(16, 28, 44, 0.08)' : 'none'
                        }}
                      >
                        <div
                          style={{
                            width: '46px',
                            height: '46px',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            flexShrink: 0,
                            position: 'relative'
                          }}
                        >
                          <ImageWithFallback
                            src={pkg.heroImage}
                            alt={pkg.name}
                            objectFit="cover"
                          />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h4
                            style={{
                              margin: 0,
                              fontSize: '0.86rem',
                              fontWeight: '800',
                              color: '#0F172A',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}
                          >
                            {pkg.name}
                          </h4>
                          <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                            {pkg.duration} • {pkg.destination}
                          </span>
                          <div style={{ fontSize: '0.8rem', fontWeight: '800', color: '#0284C7', marginTop: '1px' }}>
                            {pkg.formattedPrice}/pax
                          </div>
                        </div>
                        {isSelected && (
                          <div
                            style={{
                              width: '20px',
                              height: '20px',
                              borderRadius: '50%',
                              backgroundColor: '#101C2C',
                              color: '#DFFF00',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}
                          >
                            <Check size={12} strokeWidth={3} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SCHEDULE & PARTICIPANTS GRID */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                {/* Departure Date */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.45rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    2. Tanggal Berangkat
                  </label>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      padding: '0.75rem 1rem',
                      borderRadius: '12px',
                      border: '1.5px solid #CBD5E1',
                      backgroundColor: '#FAFAF5'
                    }}
                  >
                    <Calendar size={18} color="#0284C7" />
                    <input
                      type="date"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      style={{
                        background: 'none',
                        border: 'none',
                        outline: 'none',
                        fontSize: '0.92rem',
                        fontWeight: '700',
                        color: '#0F172A',
                        width: '100%'
                      }}
                    />
                  </div>

                  {/* Quick Date Shortcut Chips */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.45rem' }}>
                    {[
                      { label: '+3 Hari', days: 3 },
                      { label: '+7 Hari (Akhir Pekan)', days: 7 },
                      { label: '+14 Hari (2 Pekan)', days: 14 },
                      { label: '+30 Hari (Bulan Depan)', days: 30 }
                    ].map((chip) => (
                      <button
                        key={chip.label}
                        type="button"
                        onClick={() => {
                          const target = new Date();
                          target.setDate(target.getDate() + chip.days);
                          const yyyy = target.getFullYear();
                          const mm = String(target.getMonth() + 1).padStart(2, '0');
                          const dd = String(target.getDate()).padStart(2, '0');
                          setTravelDate(`${yyyy}-${mm}-${dd}`);
                        }}
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: '700',
                          padding: '0.22rem 0.55rem',
                          borderRadius: '6px',
                          border: '1px solid #CBD5E1',
                          backgroundColor: '#FFFFFF',
                          color: '#334155',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>

                  <span style={{ fontSize: '0.73rem', color: '#64748B', marginTop: '0.35rem', display: 'block' }}>
                    *Bisa reschedule bebas biaya 1x hingga H-10 keberangkatan
                  </span>
                </div>

                {/* Guest Counter */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.45rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    3. Jumlah Peserta
                  </label>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.65rem 1rem',
                      borderRadius: '12px',
                      border: '1.5px solid #CBD5E1',
                      backgroundColor: '#FAFAF5'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Users size={18} color="#0284C7" />
                      <span style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0F172A' }}>
                        {guests} Orang
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <button
                        type="button"
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        disabled={guests <= 1}
                        style={{
                          width: '30px',
                          height: '30px',
                          borderRadius: '8px',
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #CBD5E1',
                          color: '#0F172A',
                          fontWeight: '800',
                          cursor: guests <= 1 ? 'not-allowed' : 'pointer'
                        }}
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() => setGuests(guests + 1)}
                        style={{
                          width: '30px',
                          height: '30px',
                          borderRadius: '8px',
                          backgroundColor: '#101C2C',
                          border: 'none',
                          color: '#DFFF00',
                          fontWeight: '800',
                          cursor: 'pointer'
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.73rem', color: '#64748B', marginTop: '0.25rem', display: 'block' }}>
                    *Format 100% Private Tour eksklusif hanya grup Anda
                  </span>
                </div>
              </div>

              {/* ROOM / CABIN TIER SELECTION */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.45rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  4. Pilihan Fasilitas Kamar / Kabin
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
                  <div
                    onClick={() => setRoomType('deluxe')}
                    style={{
                      padding: '0.85rem 1rem',
                      borderRadius: '12px',
                      border: roomType === 'deluxe' ? '2px solid #0284C7' : '1px solid #CBD5E1',
                      backgroundColor: roomType === 'deluxe' ? '#F0F9FF' : '#FFFFFF',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.5rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: '800', color: '#0F172A' }}>
                        Deluxe Standard
                      </div>
                      <div style={{ fontSize: '0.74rem', color: '#64748B' }}>
                        AC, Hot Shower, Queen/Twin Bed
                      </div>
                    </div>
                    <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#059669', backgroundColor: '#ECFDF5', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>
                      Termasuk
                    </span>
                  </div>

                  <div
                    onClick={() => setRoomType('suite')}
                    style={{
                      padding: '0.85rem 1rem',
                      borderRadius: '12px',
                      border: roomType === 'suite' ? '2px solid #0284C7' : '1px solid #CBD5E1',
                      backgroundColor: roomType === 'suite' ? '#F0F9FF' : '#FFFFFF',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.5rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: '800', color: '#0F172A' }}>
                        VIP Ocean Suite
                      </div>
                      <div style={{ fontSize: '0.74rem', color: '#64748B' }}>
                        Balkon Laut Privat + Jacuzzi Bath
                      </div>
                    </div>
                    <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#0284C7', backgroundColor: '#EFF6FF', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>
                      +Rp 350.000/pax
                    </span>
                  </div>
                </div>
              </div>

              {/* LIVE ESTIMATION SUMMARY CARD */}
              <div
                style={{
                  backgroundColor: '#101C2C',
                  color: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '1.15rem 1.35rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.85rem'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Estimasi Bersih ({guests} Peserta • {roomType === 'suite' ? 'VIP Suite' : 'Standard'})
                    </span>
                    <span style={{ fontSize: '0.7rem', color: '#34D399', backgroundColor: 'rgba(52, 211, 153, 0.15)', padding: '0.1rem 0.45rem', borderRadius: '4px', fontWeight: '700' }}>
                      Promo Diskon Rp 150.000 Terpasang
                    </span>
                  </div>
                  <div style={{ fontSize: '1.45rem', fontWeight: '800', color: '#DFFF00', marginTop: '0.15rem' }}>
                    {formatRupiah(netTotal)}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                    Opsi DP 30% Tersedia Saat Pembayaran
                  </span>
                  <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#FFFFFF' }}>
                    Cukup DP {formatRupiah(dpAmount)} untuk amankan kuota
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              STEP 2: CUSTOMER INFORMATION
              ========================================================================= */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              <div style={{ padding: '0.85rem 1rem', backgroundColor: '#EFF6FF', borderRadius: '12px', border: '1px solid #BFDBFE', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <ShieldCheck size={20} color="#1D4ED8" />
                <span style={{ fontSize: '0.84rem', color: '#1E40AF', fontWeight: '600' }}>
                  Data Anda aman dan terenkripsi. Digunakan khusus untuk penerbitan e-voucher, asuransi, dan manifes penjemputan resmi.
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.35rem' }}>
                    Nama Lengkap Pemesan *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Sesuai KTP / Paspor"
                    value={customer.fullName}
                    onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      border: '1.5px solid #CBD5E1',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.35rem' }}>
                    Nomor WhatsApp Aktif *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="tel"
                      required
                      placeholder="Contoh: 081234567890"
                      value={customer.whatsapp}
                      onChange={(e) => setCustomer({ ...customer, whatsapp: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem 0.75rem 2.4rem',
                        borderRadius: '10px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '0.9rem',
                        outline: 'none'
                      }}
                    />
                    <Phone size={16} color="#64748B" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.35rem' }}>
                    Alamat Email (Untuk E-Voucher & Faktur) *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="email"
                      required
                      placeholder="nama@email.com"
                      value={customer.email}
                      onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem 0.75rem 2.4rem',
                        borderRadius: '10px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '0.9rem',
                        outline: 'none'
                      }}
                    />
                    <Mail size={16} color="#64748B" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.35rem' }}>
                    Kota Asal / Penjemputan
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      placeholder="Contoh: Jakarta / Surabaya"
                      value={customer.originCity}
                      onChange={(e) => setCustomer({ ...customer, originCity: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem 0.75rem 2.4rem',
                        borderRadius: '10px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '0.9rem',
                        outline: 'none'
                      }}
                    />
                    <MapPin size={16} color="#64748B" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.35rem' }}>
                    NIK KTP / No. Paspor (Dokumen Manifes & Asuransi)
                  </label>
                  <input
                    type="text"
                    placeholder="16 Digit NIK / Paspor (Bisa disusulkan)"
                    value={customer.idNumber || ''}
                    onChange={(e) => setCustomer({ ...customer, idNumber: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      border: '1.5px solid #CBD5E1',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                  <span style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '0.2rem', display: 'block' }}>
                    *Diperlukan untuk polis asuransi resmi & tiket kapal cepat
                  </span>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.35rem' }}>
                    Kontak Darurat (Nama & No. WhatsApp Kerabat)
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Ibu Rina (081298765432)"
                    value={customer.emergencyContact || ''}
                    onChange={(e) => setCustomer({ ...customer, emergencyContact: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      border: '1.5px solid #CBD5E1',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                  <span style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '0.2rem', display: 'block' }}>
                    *Protokol standar keselamatan perjalanan ASITA & BPW
                  </span>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.35rem' }}>
                  Permintaan Khusus / Catatan Tambahan (Opsional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Misal: Jemput di Bandara Komodo pukul 11:00 WITA, menu makanan ramah vegetarian, atau kejutan honeymoon..."
                  value={customer.specialNotes}
                  onChange={(e) => setCustomer({ ...customer, specialNotes: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    border: '1.5px solid #CBD5E1',
                    fontSize: '0.88rem',
                    outline: 'none',
                    fontFamily: 'inherit'
                  }}
                />
              </div>
            </div>
          )}

          {/* =========================================================================
              STEP 3: PAYMENT SCHEME & METHOD SELECTION
              ========================================================================= */}
          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Payment Scheme: DP vs Full */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  1. Pilih Skema Pembayaran
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
                  <div
                    onClick={() => setPaymentScheme('dp')}
                    style={{
                      padding: '1rem',
                      borderRadius: '14px',
                      border: paymentScheme === 'dp' ? '2px solid #101C2C' : '1px solid #CBD5E1',
                      backgroundColor: paymentScheme === 'dp' ? '#F8FAFC' : '#FFFFFF',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.25rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: '800', fontSize: '0.92rem', color: '#0F172A' }}>
                        Uang Muka (DP 30%)
                      </span>
                      <span style={{ fontSize: '0.72rem', backgroundColor: '#FEF3C7', color: '#92400E', padding: '0.15rem 0.5rem', borderRadius: '6px', fontWeight: '700' }}>
                        Paling Favorit
                      </span>
                    </div>
                    <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0284C7' }}>
                      {formatRupiah(dpAmount)}
                    </div>
                    <span style={{ fontSize: '0.74rem', color: '#64748B' }}>
                      Pelunasan sisa {formatRupiah(netTotal - dpAmount)} dapat dilakukan H-7 sebelum berangkat.
                    </span>
                  </div>

                  <div
                    onClick={() => setPaymentScheme('full')}
                    style={{
                      padding: '1rem',
                      borderRadius: '14px',
                      border: paymentScheme === 'full' ? '2px solid #101C2C' : '1px solid #CBD5E1',
                      backgroundColor: paymentScheme === 'full' ? '#F8FAFC' : '#FFFFFF',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.25rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: '800', fontSize: '0.92rem', color: '#0F172A' }}>
                        Pelunasan Penuh (100%)
                      </span>
                    </div>
                    <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#101C2C' }}>
                      {formatRupiah(netTotal)}
                    </div>
                    <span style={{ fontSize: '0.74rem', color: '#64748B' }}>
                      Selesai dalam satu transaksi, tanpa perlu mengingat jadwal pelunasan tambahan.
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  2. Pilih Metode Pembayaran Resmi
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {[
                    { id: 'bca_va', icon: Building2, title: 'BCA Virtual Account', desc: 'Verifikasi instan otomatis 24 jam' },
                    { id: 'mandiri_va', icon: Building2, title: 'Mandiri / BNI / BRI Virtual Account', desc: 'Tersedia transfer via ATM & m-Banking' },
                    { id: 'qris', icon: QrCode, title: 'QRIS & E-Wallet (GoPay, OVO, ShopeePay)', desc: 'Cukup pindai kode QR dari semua e-wallet' },
                    { id: 'credit_card', icon: CreditCard, title: 'Kartu Kredit / Visa / Mastercard', desc: 'Proteksi 3D Secure dengan verifikasi OTP' }
                  ].map((method) => {
                    const isSelected = paymentMethod === method.id;
                    const IconComp = method.icon;
                    return (
                      <div
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        style={{
                          padding: '0.75rem 1rem',
                          borderRadius: '12px',
                          border: isSelected ? '2px solid #0284C7' : '1px solid #E2E8F0',
                          backgroundColor: isSelected ? '#F0F9FF' : '#FFFFFF',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.85rem',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '8px',
                            backgroundColor: isSelected ? '#0284C7' : '#F1F5F9',
                            color: isSelected ? '#FFFFFF' : '#64748B',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}
                        >
                          <IconComp size={18} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '0.88rem', fontWeight: '800', color: '#0F172A' }}>
                            {method.title}
                          </div>
                          <div style={{ fontSize: '0.74rem', color: '#64748B' }}>
                            {method.desc}
                          </div>
                        </div>
                        <div
                          style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            border: isSelected ? '5px solid #0284C7' : '2px solid #CBD5E1',
                            backgroundColor: '#FFFFFF',
                            flexShrink: 0
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ITEMIZED OFFICIAL INVOICE BREAKDOWN TABLE */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1.5px solid #CBD5E1',
                  overflow: 'hidden',
                  boxShadow: '0 4px 15px rgba(15, 23, 42, 0.04)'
                }}
              >
                <div
                  style={{
                    backgroundColor: '#F8FAFC',
                    padding: '0.85rem 1.15rem',
                    borderBottom: '1px solid #E2E8F0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <ShieldCheck size={16} color="#0284C7" />
                    <span>Faktur & Rincian Transparansi Biaya Resmi</span>
                  </span>
                  <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#059669', backgroundColor: '#ECFDF5', padding: '0.15rem 0.5rem', borderRadius: '6px' }}>
                    BEBAS BIAYA TERSEMBUNYI
                  </span>
                </div>

                <div style={{ padding: '1rem 1.15rem', display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.84rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                    <span>Tarif Dasar Paket ({guests} Pax × {formatRupiah(unitPrice)})</span>
                    <strong style={{ color: '#0F172A' }}>{formatRupiah(subtotal)}</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                    <span>Fasilitas Kamar ({roomType === 'suite' ? 'VIP Ocean Suite' : 'Deluxe Standard'})</span>
                    <strong style={{ color: roomUpgradeFee > 0 ? '#0284C7' : '#059669' }}>
                      {roomUpgradeFee > 0 ? `+${formatRupiah(roomUpgradeFee)}` : 'Termasuk (Rp 0)'}
                    </strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                    <span>PNBP Konservasi TN & Retribusi Daerah</span>
                    <span style={{ color: '#059669', fontWeight: '700' }}>Rp 0 (Ditanggung FADZA)</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                    <span>Polis Asuransi Perjalanan Jasa Raharja Putra</span>
                    <span style={{ color: '#059669', fontWeight: '700' }}>Rp 0 (Perlindungan Penuh)</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                    <span>Biaya Administrasi & Payment Gateway</span>
                    <span style={{ color: '#059669', fontWeight: '700' }}>Rp 0 (Gratis)</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669', backgroundColor: '#F0FDF4', padding: '0.35rem 0.65rem', borderRadius: '8px', border: '1px dashed #86EFAC' }}>
                    <span>Kupon Promo Eksklusif: <strong>FADZANUSANTARA</strong></span>
                    <strong>-{formatRupiah(discountAmount)}</strong>
                  </div>

                  <div style={{ borderTop: '1.5px solid #E2E8F0', paddingTop: '0.65rem', marginTop: '0.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ display: 'block', fontSize: '0.78rem', color: '#64748B', fontWeight: '700', textTransform: 'uppercase' }}>
                        Total Nilai Reservasi Bersih
                      </span>
                      <span style={{ fontSize: '1.15rem', fontWeight: '900', color: '#0F172A' }}>
                        {formatRupiah(netTotal)}
                      </span>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ display: 'block', fontSize: '0.78rem', color: '#0284C7', fontWeight: '800' }}>
                        Tagihan Bayar Saat Ini ({paymentScheme === 'dp' ? 'DP 30%' : 'Lunas 100%'})
                      </span>
                      <span style={{ fontSize: '1.35rem', fontWeight: '900', color: '#0284C7' }}>
                        {formatRupiah(currentTotalToPay)}
                      </span>
                    </div>
                  </div>

                  {paymentScheme === 'dp' && (
                    <div style={{ fontSize: '0.74rem', color: '#64748B', backgroundColor: '#FFFBEB', padding: '0.45rem 0.75rem', borderRadius: '8px', border: '1px solid #FDE68A', marginTop: '0.25rem' }}>
                      ⏳ Sisa pelunasan sebesar <strong>{formatRupiah(netTotal - dpAmount)}</strong> dapat diselesaikan santai selambatnya <strong>H-7 sebelum hari keberangkatan</strong>.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              STEP 4: CONFIRMED RESERVATION & E-VOUCHER
              ========================================================================= */}
          {step === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center' }}>
              {/* SUCCESS BADGE */}
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#DCFCE7',
                  color: '#16A34A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(22, 163, 74, 0.2)'
                }}
              >
                <CheckCircle2 size={36} />
              </div>

              <div style={{ textAlign: 'center' }}>
                <h3 style={{ margin: '0 0 0.35rem 0', fontSize: '1.45rem', fontWeight: '800', color: '#0F172A' }}>
                  Reservasi Anda Berhasil Dibuat!
                </h3>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748B', maxWidth: '500px' }}>
                  E-Voucher dan instruksi pembayaran telah dikirimkan ke email <strong>{customer.email}</strong>.
                </p>
              </div>

              {/* OFFICIAL LUXURY BOARDING PASS & E-VOUCHER CARD */}
              <div
                style={{
                  width: '100%',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  border: '2px solid #101C2C',
                  boxShadow: '0 20px 50px rgba(16, 28, 44, 0.12)',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                {/* BOARDING PASS TOP HEADER */}
                <div
                  style={{
                    backgroundColor: '#101C2C',
                    color: '#FFFFFF',
                    padding: '1rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.65rem',
                    borderBottom: '2px solid #DFFF00'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(223, 255, 0, 0.2)',
                        color: '#DFFF00',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Plane size={18} />
                    </div>
                    <div>
                      <span style={{ fontWeight: '900', fontSize: '0.95rem', letterSpacing: '0.04em', display: 'block' }}>
                        FADZA TRIP ADVENTURE • OFFICIAL BOARDING PASS
                      </span>
                      <span style={{ fontSize: '0.7rem', color: '#94A3B8', letterSpacing: '0.05em' }}>
                        INDONESIA EXCLUSIVE TRAVEL CONCIERGE & EXPEDITION
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: '800',
                        backgroundColor: '#DCFCE7',
                        color: '#15803D',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '9999px',
                        letterSpacing: '0.04em',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem'
                      }}
                    >
                      <CheckCircle2 size={13} color="#15803D" />
                      <span>TERVERIFIKASI AKTIF</span>
                    </span>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: '800',
                        backgroundColor: 'rgba(223, 255, 0, 0.18)',
                        color: '#DFFF00',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '9999px',
                        letterSpacing: '0.04em'
                      }}
                    >
                      100% PRIVATE TOUR
                    </span>
                  </div>
                </div>

                {/* BOARDING PASS MAIN CONTENT (TWO-PART WITH PERFORATION) */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
                    gap: 0,
                    backgroundColor: '#FFFFFF'
                  }}
                >
                  {/* LEFT PASS: FLIGHT & ROUTE DETAILS */}
                  <div
                    style={{
                      padding: '1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1.25rem',
                      borderRight: '2px dashed #CBD5E1',
                      position: 'relative'
                    }}
                  >
                    {/* Route Banner Display */}
                    <div
                      style={{
                        backgroundColor: '#F8FAFC',
                        borderRadius: '12px',
                        padding: '0.85rem 1.15rem',
                        border: '1px solid #E2E8F0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '0.75rem'
                      }}
                    >
                      <div>
                        <span style={{ fontSize: '0.68rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', fontWeight: '700' }}>
                          Kota Keberangkatan
                        </span>
                        <span style={{ fontSize: '1.15rem', fontWeight: '900', color: '#0F172A' }}>
                          {customer.originCity ? customer.originCity.toUpperCase() : 'JAKARTA (JKT)'}
                        </span>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.15rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#0284C7' }}>
                          <span style={{ height: '2px', width: '24px', backgroundColor: '#0284C7' }} />
                          <Plane size={16} />
                          <span style={{ height: '2px', width: '24px', backgroundColor: '#0284C7' }} />
                        </div>
                        <span style={{ fontSize: '0.65rem', fontWeight: '800', color: '#64748B' }}>
                          PRIVATE EXPEDITION
                        </span>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '0.68rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', fontWeight: '700' }}>
                          Destinasi Wisata
                        </span>
                        <span style={{ fontSize: '1.15rem', fontWeight: '900', color: '#0284C7' }}>
                          {currentPkg.destination ? currentPkg.destination.toUpperCase() : 'NUSANTARA'}
                        </span>
                      </div>
                    </div>

                    {/* Passenger & Ticket Data Grid */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                        gap: '0.9rem',
                        fontSize: '0.82rem'
                      }}
                    >
                      <div>
                        <span style={{ color: '#64748B', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: '700' }}>
                          Nama Pemesan
                        </span>
                        <strong style={{ color: '#0F172A', fontSize: '0.92rem' }}>{customer.fullName}</strong>
                      </div>

                      <div>
                        <span style={{ color: '#64748B', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: '700' }}>
                          Paket & Durasi
                        </span>
                        <strong style={{ color: '#0F172A', fontSize: '0.92rem' }}>{currentPkg.name} ({currentPkg.duration})</strong>
                      </div>

                      <div>
                        <span style={{ color: '#64748B', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: '700' }}>
                          Tanggal Berangkat
                        </span>
                        <strong style={{ color: '#0F172A', fontSize: '0.92rem' }}>{travelDate}</strong>
                      </div>

                      <div>
                        <span style={{ color: '#64748B', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: '700' }}>
                          Tipe Kamar / Kabin
                        </span>
                        <strong style={{ color: roomType === 'suite' ? '#0284C7' : '#0F172A', fontSize: '0.92rem' }}>
                          {roomType === 'suite' ? 'VIP Ocean Suite' : 'Deluxe Standard'}
                        </strong>
                      </div>

                      <div>
                        <span style={{ color: '#64748B', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: '700' }}>
                          Total Rombongan
                        </span>
                        <strong style={{ color: '#0F172A', fontSize: '0.92rem' }}>{guests} Orang (Private Tour)</strong>
                      </div>

                      <div>
                        <span style={{ color: '#64748B', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: '700' }}>
                          NIK / No. Paspor
                        </span>
                        <strong style={{ color: '#0F172A', fontSize: '0.88rem' }}>
                          {customer.idNumber || 'Terdaftar Resmi'}
                        </strong>
                      </div>

                      <div>
                        <span style={{ color: '#64748B', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: '700' }}>
                          Status Pembayaran
                        </span>
                        <strong style={{ color: '#16A34A', fontSize: '0.88rem' }}>
                          {paymentScheme === 'dp' ? 'DP 30% Terverifikasi' : 'Pelunasan Penuh (100%)'}
                        </strong>
                      </div>

                      <div>
                        <span style={{ color: '#64748B', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: '700' }}>
                          Nominal Dibayar ({paymentMethod.toUpperCase()})
                        </span>
                        <strong style={{ color: '#0284C7', fontSize: '1.05rem', fontWeight: '900' }}>
                          {formatRupiah(currentTotalToPay)}
                        </strong>
                      </div>
                    </div>

                    {/* Official Inclusions Strip */}
                    <div
                      style={{
                        padding: '0.7rem 0.95rem',
                        backgroundColor: '#F8FAFC',
                        borderRadius: '10px',
                        border: '1px solid #E2E8F0',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.65rem',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.72rem',
                        color: '#475569'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <ShieldCheck size={13} color="#0284C7" />
                        <span>Asuransi All-Risk</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Users size={13} color="#16A34A" />
                        <span>Pemandu & Driver Lokal</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Ticket size={13} color="#D97706" />
                        <span>Semua Tiket Wisata Masuk</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <CheckCircle2 size={13} color="#15803D" />
                        <span>Bebas Reschedule H-10</span>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT PASS: TICKET STUB WITH QR & BARCODE */}
                  <div
                    style={{
                      padding: '1.5rem',
                      backgroundColor: '#FAFAF5',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      textAlign: 'center'
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '0.68rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '800', display: 'block' }}>
                        KODE BOOKING RESMI
                      </span>
                      <div style={{ fontSize: '1.5rem', fontWeight: '900', color: '#0F172A', letterSpacing: '0.06em', fontFamily: 'monospace', marginTop: '0.15rem' }}>
                        {bookingCode}
                      </div>

                      <button
                        type="button"
                        onClick={handleCopyCode}
                        style={{
                          marginTop: '0.4rem',
                          padding: '0.35rem 0.75rem',
                          borderRadius: '6px',
                          backgroundColor: copiedCode ? '#DCFCE7' : '#FFFFFF',
                          border: copiedCode ? '1px solid #86EFAC' : '1px solid #CBD5E1',
                          color: copiedCode ? '#16A34A' : '#0F172A',
                          fontSize: '0.74rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem'
                        }}
                      >
                        {copiedCode ? <Check size={13} /> : <Copy size={13} />}
                        <span>{copiedCode ? 'Tersalin!' : 'Salin Kode Booking'}</span>
                      </button>
                    </div>

                    {/* QR Code Digital Box */}
                    <div
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '2px solid #0F172A',
                        borderRadius: '14px',
                        padding: '0.75rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        boxShadow: '0 6px 18px rgba(0, 0, 0, 0.08)'
                      }}
                    >
                      <QrCode size={68} color="#0F172A" />
                      <span style={{ fontSize: '0.65rem', fontWeight: '900', color: '#0F172A', marginTop: '0.35rem', letterSpacing: '0.06em' }}>
                        SCAN VERIFIKASI BANDARA
                      </span>
                    </div>

                    {/* Barcode & Security Verification */}
                    <div style={{ width: '100%' }}>
                      <div
                        style={{
                          letterSpacing: '3px',
                          fontFamily: 'monospace',
                          fontSize: '0.95rem',
                          fontWeight: '900',
                          color: '#475569',
                          userSelect: 'none'
                        }}
                      >
                        ||||| | |||| || ||||||| | ||| |||| |
                      </div>
                      <span style={{ fontSize: '0.62rem', color: '#94A3B8', letterSpacing: '0.08em', display: 'block', marginTop: '0.15rem' }}>
                        FADZA-PASSPORT-ID: {bookingCode}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.72rem', color: '#64748B' }}>
                      <Clock size={13} color="#0284C7" />
                      <span>Batas Konfirmasi: <strong>23:59 WIB</strong></span>
                    </div>
                  </div>
                </div>

                {/* TICKET FOOTER: WHATSAPP SYNC & PRINT CONTROLS */}
                <div
                  style={{
                    backgroundColor: '#F8FAFC',
                    borderTop: '1px solid #E2E8F0',
                    padding: '1.15rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.85rem'
                  }}
                >
                  <span style={{ fontSize: '0.8rem', color: '#475569', maxWidth: '420px', lineHeight: 1.5 }}>
                    💡 <strong>Simpan salinan tiket ini.</strong> Tim concierge resmi FADZA siap membantu verifikasi atau penyesuaian khusus kapan saja via WhatsApp:
                  </span>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
                    <a
                      href={waFollowUpUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-lime"
                      style={{
                        padding: '0.65rem 1.25rem',
                        fontSize: '0.84rem',
                        fontWeight: '800',
                        borderRadius: '10px',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem'
                      }}
                    >
                      <WhatsAppIcon size={16} />
                      <span>Kirim Salinan ke WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={handlePrint}
                      style={{
                        padding: '0.65rem 1.15rem',
                        borderRadius: '10px',
                        backgroundColor: '#FFFFFF',
                        border: '1.5px solid #CBD5E1',
                        color: '#0F172A',
                        fontSize: '0.84rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem'
                      }}
                    >
                      <Printer size={16} />
                      <span>Cetak Boarding Pass</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* MODAL FOOTER BUTTONS */}
        <div
          style={{
            padding: '1.15rem 1.75rem',
            backgroundColor: '#FFFFFF',
            borderTop: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0
          }}
        >
          {step === 1 && (
            <>
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: '0.7rem 1.25rem',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  background: 'none',
                  color: '#64748B',
                  fontWeight: '700',
                  fontSize: '0.88rem',
                  cursor: 'pointer'
                }}
              >
                Batal
              </button>

              <button
                type="button"
                onClick={handleNextStep1}
                className="btn-lime"
                style={{
                  padding: '0.75rem 1.6rem',
                  borderRadius: '12px',
                  fontWeight: '800',
                  fontSize: '0.92rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  cursor: 'pointer'
                }}
              >
                <span>Lanjut: Data Pemesan</span>
                <ArrowRight size={16} />
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <button
                type="button"
                onClick={() => setStep(1)}
                style={{
                  padding: '0.7rem 1.25rem',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  background: 'none',
                  color: '#0F172A',
                  fontWeight: '700',
                  fontSize: '0.88rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  cursor: 'pointer'
                }}
              >
                <ArrowLeft size={16} />
                <span>Kembali</span>
              </button>

              <button
                type="button"
                onClick={handleNextStep2}
                className="btn-lime"
                style={{
                  padding: '0.75rem 1.6rem',
                  borderRadius: '12px',
                  fontWeight: '800',
                  fontSize: '0.92rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  cursor: 'pointer'
                }}
              >
                <span>Lanjut: Pembayaran</span>
                <ArrowRight size={16} />
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={isSubmitting}
                style={{
                  padding: '0.7rem 1.25rem',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  background: 'none',
                  color: '#0F172A',
                  fontWeight: '700',
                  fontSize: '0.88rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
              >
                <ArrowLeft size={16} />
                <span>Kembali</span>
              </button>

              <button
                type="button"
                onClick={handleConfirmBooking}
                disabled={isSubmitting}
                className="btn-lime"
                style={{
                  padding: '0.75rem 1.85rem',
                  borderRadius: '12px',
                  fontWeight: '800',
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.7 : 1
                }}
              >
                <Ticket size={18} />
                <span>{isSubmitting ? 'Memproses Reservasi...' : 'Konfirmasi & Booking Sekarang'}</span>
              </button>
            </>
          )}

          {step === 4 && (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={onClose}
                className="btn-lime"
                style={{
                  padding: '0.75rem 1.85rem',
                  borderRadius: '12px',
                  fontWeight: '800',
                  fontSize: '0.92rem',
                  cursor: 'pointer'
                }}
              >
                Selesai & Tutup
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
