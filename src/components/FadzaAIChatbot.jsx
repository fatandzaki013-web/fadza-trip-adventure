import React, { useState, useEffect, useRef } from 'react';
import { generateTravelResponse } from '../services/aiService.js';
import { generateBookingWhatsAppLink } from '../services/travelTools.js';
import ImageWithFallback from './ImageWithFallback.jsx';
import WhatsAppIcon from './WhatsAppIcon.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import {
  X,
  Send,
  RotateCcw,
  Minus,
  Maximize2,
  Minimize2,
  ChevronDown,
  ArrowRight,
  MapPin,
  Clock,
  Compass,
  Calculator,
  MessageSquare,
  AlertCircle,
  Ticket,
  Sparkles,
  Check,
  QrCode,
  FileText
} from 'lucide-react';

const MAX_CHAR_LIMIT = 500;

export default function FadzaAIChatbot({
  isOpen,
  onToggle,
  currentPackage = null,
  onSelectPackage,
  onSelectDestination,
  onOpenBooking
}) {
  const { language, t } = useLanguage();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [lastUserMessage, setLastUserMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [charLimitWarning, setCharLimitWarning] = useState(false);

  // Micro-interaction states
  const [hasAttention, setHasAttention] = useState(true);
  const [showTeaser, setShowTeaser] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const chatBottomRef = useRef(null);
  const inputRef = useRef(null);

  // Initial welcome message
  const initialWelcomeText =
    'Selamat datang di **FADZA TRIP ADVENTURE**.\n\n' +
    'Saya **FADZA AI**, *Intelligent Travel Concierge* yang siap membantu Anda menemukan, menghitung, dan memahami informasi perjalanan resmi yang tersedia di website kami.\n\n' +
    'Silakan tanyakan mengenai destinasi, paket wisata, harga, durasi, itinerary, fasilitas, atau minta saya menghitungkan estimasi biaya liburan Anda.';

  // Default quick action chips
  const defaultQuestions = currentPackage
    ? [
        'Berapa kalau untuk 2 orang?',
        'Apa saja yang termasuk?',
        'Jelaskan itinerary-nya',
        'Meeting point di mana?',
        'Cari paket untuk saya',
        'Destinasi yang tersedia'
      ]
    : [
        'Cari paket untuk saya',
        'Destinasi yang tersedia',
        'Cari berdasarkan budget',
        'Cari berdasarkan durasi',
        'Hitung biaya perjalanan',
        'Saya mau perjalanan santai'
      ];

  // Attention animation on first landing (stops after 4.5 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAttention(false);
    }, 4500);

    const teaserTimer = setTimeout(() => {
      setShowTeaser(false);
    }, 9000);

    // Periodic gentle reminder pulse every 25 seconds if unopened
    const pulseInterval = setInterval(() => {
      if (!isOpen) {
        setHasAttention(true);
        setTimeout(() => setHasAttention(false), 3000);
      }
    }, 25000);

    return () => {
      clearTimeout(timer);
      clearTimeout(teaserTimer);
      clearInterval(pulseInterval);
    };
  }, [isOpen]);

  // Initialize or reset conversation when package changes
  useEffect(() => {
    if (messages.length === 0) {
      handleResetConversation();
    }
  }, [currentPackage]);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (isOpen && !isMinimized) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen, isMinimized]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 250);
    }
  }, [isOpen, isMinimized]);

  const handleResetConversation = () => {
    let welcomeMsg = initialWelcomeText;
    if (currentPackage) {
      welcomeMsg += `\n\n✦ **Paket Sedang Dilihat**: **${currentPackage.name}** (${currentPackage.duration}) mulai dari **${currentPackage.formattedPrice}/orang**.`;
    }

    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'ai',
        text: welcomeMsg,
        suggestedPackages: currentPackage ? [currentPackage] : [],
        quickReplies: defaultQuestions,
        timestamp: new Date()
      }
    ]);
    setHasError(false);
    setInputText('');
    setCharLimitWarning(false);
  };

  const handleSendMessage = async (textToSend) => {
    const raw = textToSend !== undefined ? textToSend : inputText;
    const query = (raw || '').trim();

    // Empty validation
    if (!query || isLoading) return;

    // Character limit check
    if (query.length > MAX_CHAR_LIMIT) {
      setCharLimitWarning(true);
      return;
    } else {
      setCharLimitWarning(false);
    }

    setInputText('');
    setHasError(false);
    setLastUserMessage(query);

    const userMessageObj = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessageObj]);
    setIsLoading(true);

    // Instant local concierge check for booking status & FDZ- codes
    const fdzMatch = query.match(/FDZ-\d{4}-[A-Za-z0-9]+/i);
    const isBookingQuery = fdzMatch || /(?:cek|status|lihat|kode)\s+(?:booking|reservasi|tiket|pesanan)/i.test(query) || query === 'Cek Status Booking';

    if (isBookingQuery) {
      try {
        const saved = JSON.parse(localStorage.getItem('fadza_bookings') || '[]');
        let targetBooking = null;
        if (fdzMatch) {
          targetBooking = saved.find((b) => b.bookingCode?.toLowerCase() === fdzMatch[0].toLowerCase());
        } else if (saved.length > 0) {
          targetBooking = saved[0]; // most recent booking
        }

        if (targetBooking) {
          const statusText = `✦ **Status Reservasi Ditemukan**: **${targetBooking.bookingCode}**\n\n` +
            `• **Paket**: ${targetBooking.packageName} (${targetBooking.duration})\n` +
            `• **Jadwal Keberangkatan**: ${targetBooking.travelDate}\n` +
            `• **Peserta**: ${targetBooking.guests} Orang (100% Private Tour)\n` +
            `• **Pemesan**: ${targetBooking.customer?.fullName}\n` +
            `• **Status E-Voucher**: Valid & Terverifikasi Aktif\n\n` +
            `E-Voucher Anda aktif. Tim Concierge resmi FADZA siap menyambut kedatangan Anda di destinasi.`;

          const aiMessageObj = {
            id: `ai-${Date.now()}`,
            sender: 'ai',
            text: statusText,
            bookingRecord: targetBooking,
            quickReplies: ['Tanya via WhatsApp', 'Lihat paket lain', 'Hitung biaya perjalanan'],
            timestamp: new Date()
          };
          setTimeout(() => {
            setMessages((prev) => [...prev, aiMessageObj]);
            setIsLoading(false);
          }, 350);
          return;
        } else if (fdzMatch) {
          const notFoundText = `Kode booking **${fdzMatch[0]}** belum ditemukan di catatan reservasi perangkat ini.\n\nPastikan format kode sudah sesuai (contoh: *FDZ-2026-ABCD*) atau Anda dapat membuat pemesanan baru melalui tombol **Booking Sekarang**.`;
          const aiMessageObj = {
            id: `ai-${Date.now()}`,
            sender: 'ai',
            text: notFoundText,
            quickReplies: ['Cari paket untuk saya', 'Destinasi yang tersedia'],
            timestamp: new Date()
          };
          setTimeout(() => {
            setMessages((prev) => [...prev, aiMessageObj]);
            setIsLoading(false);
          }, 350);
          return;
        } else {
          const noBookingText = `Belum ada riwayat booking tersimpan di sesi browser ini.\n\nAnda dapat memilih paket wisata favorit di website ini dan klik tombol **Booking Sekarang** untuk mendapatkan Kode Booking dan E-Voucher resmi instan.`;
          const aiMessageObj = {
            id: `ai-${Date.now()}`,
            sender: 'ai',
            text: noBookingText,
            quickReplies: ['Cari paket untuk saya', 'Destinasi yang tersedia', 'Hitung budget saya'],
            timestamp: new Date()
          };
          setTimeout(() => {
            setMessages((prev) => [...prev, aiMessageObj]);
            setIsLoading(false);
          }, 350);
          return;
        }
      } catch (e) {
        console.warn('Booking lookup failed:', e);
      }
    }

    try {
      let response = null;

      // 1. Query Secure Backend API Route
      try {
        const apiRes = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: query,
            history: messages,
            currentPackage
          })
        });
        if (apiRes.ok) {
          const json = await apiRes.json();
          if (json.success && json.data) {
            response = json.data;
          }
        }
      } catch (netErr) {
        // Fallback to local client engine seamlessly
      }

      // 2. Client-side Engine Fallback
      if (!response) {
        response = await generateTravelResponse({
          message: query,
          history: messages,
          currentPackage
        });
      }

      const aiMessageObj = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: response.text,
        suggestedPackages: response.suggestedPackages || [],
        suggestedDestinations: response.suggestedDestinations || [],
        calculation: response.calculation || null,
        comparison: response.comparison || null,
        bookingInfo: response.bookingInfo || null,
        quickReplies: response.quickReplies || defaultQuestions,
        guidedStep: response.guidedStep || null,
        guidedPreferences: response.guidedPreferences || null,
        awaitingResponseTo: response.awaitingResponseTo || null,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, aiMessageObj]);
    } catch (err) {
      console.error('FADZA AI Chat Error:', err);
      setHasError(true);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'ai',
          isError: true,
          text: 'Maaf, saya sedang mengalami kendala dalam memproses pertanyaan Anda. Silakan coba kembali.',
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (lastUserMessage) {
      handleSendMessage(lastUserMessage);
    }
  };

  const handlePackageClick = (pkg) => {
    if (onSelectPackage) {
      onSelectPackage(pkg);
    }
    // On mobile, close chat so user can enjoy the detail page
    if (window.innerWidth < 768 && onToggle) {
      onToggle(false);
    }
  };

  const handleDestinationClick = (dest) => {
    if (onSelectDestination) {
      onSelectDestination(dest.id || dest.name);
    } else {
      handleSendMessage(`Jelaskan paket untuk destinasi ${dest.name}`);
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputText(val);
    if (val.length > MAX_CHAR_LIMIT) {
      setCharLimitWarning(true);
    } else if (charLimitWarning) {
      setCharLimitWarning(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Safe markdown text formatting
  const renderFormattedText = (rawText) => {
    if (!rawText) return null;

    const lines = rawText.split('\n');
    return lines.map((line, idx) => {
      // Bold rendering **text**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const renderedParts = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={pIdx} style={{ color: '#101C2C', fontWeight: '800' }}>
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
          return <em key={pIdx} style={{ fontStyle: 'italic', color: '#101C2C' }}>{part.slice(1, -1)}</em>;
        }
        return part;
      });

      // Heading style line: ✦ Title
      if (line.trim().startsWith('✦')) {
        return (
          <div key={idx} style={{ marginTop: '0.65rem', marginBottom: '0.25rem', fontWeight: '800', color: '#101C2C' }}>
            {renderedParts}
          </div>
        );
      }

      // Bullet points
      if (line.trim().startsWith('•') || line.trim().startsWith('✓') || line.trim().startsWith('×')) {
        return (
          <div key={idx} style={{ paddingLeft: '0.65rem', marginBottom: '0.2rem', lineHeight: '1.5' }}>
            {renderedParts}
          </div>
        );
      }

      // Empty line spacer
      if (!line.trim()) {
        return <div key={idx} style={{ height: '0.45rem' }} />;
      }

      return (
        <div key={idx} style={{ marginBottom: '0.25rem', lineHeight: '1.55' }}>
          {renderedParts}
        </div>
      );
    });
  };

  return (
    <>
      {/* =========================================================================
          1. FLOATING LAUNCHER (BOTTOM LEFT) - DESKTOP & MOBILE
          Micro-interactions: breathing, soft glow, attention animation, tooltip.
          ========================================================================= */}
      <div
        className="fadza-ai-launcher-container"
        style={{
          position: 'fixed',
          bottom: '22px',
          left: '20px',
          right: 'auto',
          zIndex: 850,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '0.5rem',
          pointerEvents: 'none'
        }}
      >
        {/* PROACTIVE TEASER SPEECH BUBBLE */}
        {showTeaser && !isOpen && (
          <div
            className="fadza-ai-teaser-bubble"
            onClick={() => onToggle(true)}
            style={{
              pointerEvents: 'auto',
              backgroundColor: '#101C2C',
              color: '#FFFFFF',
              padding: '0.55rem 0.85rem',
              borderRadius: '14px',
              border: '1.5px solid rgba(223, 255, 0, 0.4)',
              boxShadow: '0 10px 28px rgba(0, 0, 0, 0.4), 0 0 16px rgba(223, 255, 0, 0.15)',
              fontSize: '0.78rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              marginBottom: '4px',
              animation: 'fadzaFadeIn 0.3s ease-out'
            }}
          >
            <Sparkles size={14} color="#DFFF00" />
            <span>{language === 'en' ? 'Need trip guidance?' : 'Butuh panduan trip?'} <strong style={{ color: '#DFFF00' }}>{language === 'en' ? 'Ask FADZA AI' : 'Tanya FADZA AI'}</strong></span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowTeaser(false);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#94A3B8',
                cursor: 'pointer',
                padding: '0 0.15rem',
                fontSize: '1.05rem',
                lineHeight: 1
              }}
              aria-label="Tutup teaser"
            >
              ×
            </button>
          </div>
        )}

        {/* ULTRA-SLEEK LUXURY CIRCULAR FAB LAUNCHER (ALIGNED ON LEFT LIKE WHATSAPP IS ON RIGHT) */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          {/* Tooltip on Hover expanding to the right */}
          {isHovered && !isOpen && (
            <div
              style={{
                position: 'absolute',
                left: '58px',
                right: 'auto',
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: '#101C2C',
                color: '#FFFFFF',
                padding: '0.45rem 0.9rem',
                borderRadius: '9999px',
                border: '1px solid rgba(223, 255, 0, 0.4)',
                fontSize: '0.78rem',
                fontWeight: '700',
                whiteSpace: 'nowrap',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                animation: 'fadzaFadeIn 0.2s ease'
              }}
            >
              <Sparkles size={13} color="#DFFF00" />
              <span>{language === 'en' ? 'FADZA AI Concierge' : 'Tanya FADZA AI Concierge'}</span>
            </div>
          )}

          <button
            type="button"
            onClick={() => {
              if (isOpen && isMinimized) {
                setIsMinimized(false);
              } else {
                onToggle(!isOpen);
              }
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label="Buka FADZA AI Intelligent Travel Concierge"
            title="FADZA AI — Intelligent Travel Concierge"
            className={`fadza-ai-launcher-btn ${hasAttention && !isOpen ? 'attention-glow' : ''}`}
            style={{
              pointerEvents: 'auto',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #101C2C 0%, #19273C 100%)',
              border: '2px solid #DFFF00',
              color: '#FFFFFF',
              boxShadow: '0 8px 24px rgba(16, 28, 44, 0.45), 0 0 16px rgba(223, 255, 0, 0.3)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              outline: 'none'
            }}
          >
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                overflow: 'hidden',
                backgroundColor: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3px'
              }}
            >
              <img
                src="/images/logo-fadza.png"
                alt="FADZA AI"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain'
                }}
              />
            </div>

            {/* Glowing Active Online Status Dot */}
            <span
              style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#10B981',
                border: '2px solid #101C2C',
                boxShadow: '0 0 8px #10B981'
              }}
            />
          </button>
        </div>
      </div>

      {/* =========================================================================
          2. CHAT PANEL (ANCHORED AT BOTTOM LEFT ON DESKTOP, FULL/SHEET ON MOBILE)
          Open Animation: fade + slide + scale (250ms).
          ========================================================================= */}
      {isOpen && (
        <div
          className={`fadza-ai-chat-window ${isMinimized ? 'minimized' : ''} ${isExpanded ? 'expanded' : ''}`}
          style={{
            position: 'fixed',
            zIndex: 9999,
            backgroundColor: '#FFFFFF',
            border: '1.5px solid #101C2C',
            boxShadow: '0 24px 65px rgba(16, 28, 44, 0.25)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'fadzaChatOpen 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* =====================================================================
              A. CHAT HEADER
              ===================================================================== */}
          <div
            style={{
              padding: '0.85rem 1.15rem',
              backgroundColor: '#101C2C',
              borderBottom: '1px solid #16263A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.75rem',
              flexShrink: 0
            }}
          >
            {/* Branding & Status */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: 0 }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid #DFFF00',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '3px',
                  flexShrink: 0
                }}
              >
                <img
                  src="/images/logo-fadza.png"
                  alt="FADZA AI"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                  }}
                />
              </div>

              <div style={{ minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <h3
                    style={{
                      color: '#FFFFFF',
                      fontSize: '0.96rem',
                      fontWeight: '800',
                      letterSpacing: '0.02em',
                      margin: 0,
                      whiteSpace: 'nowrap'
                    }}
                  >
                    FADZA AI
                  </h3>
                  <span
                    style={{
                      fontSize: '0.65rem',
                      color: '#DFFF00',
                      border: '1px solid rgba(223, 255, 0, 0.4)',
                      padding: '0.1rem 0.35rem',
                      borderRadius: '4px',
                      textTransform: 'uppercase',
                      fontWeight: '700'
                    }}
                  >
                    Smart Concierge
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '2px' }}>
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#10B981',
                      display: 'inline-block'
                    }}
                  />
                  <span style={{ color: '#94A3B8', fontSize: '0.74rem' }}>
                    Siap Memandu & Verifikasi Booking
                  </span>
                </div>
              </div>
            </div>

            {/* Header Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <button
                type="button"
                onClick={handleResetConversation}
                title="Percakapan Baru"
                aria-label="Percakapan Baru"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}
              >
                <RotateCcw size={14} />
              </button>

              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? 'Tampilan Standar' : 'Perluas Tampilan (Studio Mode)'}
                aria-label={isExpanded ? 'Tampilan Standar' : 'Perluas Tampilan'}
                className="desktop-only-btn"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: isExpanded ? '#DFFF00' : 'rgba(255, 255, 255, 0.1)',
                  border: isExpanded ? '1px solid #DFFF00' : '1px solid rgba(255, 255, 255, 0.15)',
                  color: isExpanded ? '#101C2C' : '#FFFFFF',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}
              >
                {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              </button>

              <button
                type="button"
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? 'Buka Penuh' : 'Kecilkan'}
                aria-label={isMinimized ? 'Buka Penuh' : 'Kecilkan'}
                className="desktop-only-btn"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}
              >
                <Minus size={14} />
              </button>

              <button
                type="button"
                onClick={() => onToggle(false)}
                title="Tutup Chat"
                aria-label="Tutup Chat"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* If minimized on desktop, only header is rendered */}
          {!isMinimized && (
            <>
              {/* QUICK CONCIERGE MODES BAR */}
              <div
                style={{
                  display: 'flex',
                  gap: '0.45rem',
                  padding: '0.55rem 0.85rem',
                  backgroundColor: '#0A131F',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  overflowX: 'auto',
                  flexShrink: 0,
                  scrollbarWidth: 'none'
                }}
              >
                {[
                  { label: '🎯 Rekomendasi', prompt: 'Rekomendasikan paket wisata terbaik untuk saya' },
                  { label: '💰 Hitung Budget', prompt: 'Hitung biaya perjalanan' },
                  { label: '🏝️ Destinasi', prompt: 'Destinasi yang tersedia' },
                  { label: '📋 Cek Booking', prompt: 'Cek Status Booking' }
                ].map((tab, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(tab.prompt)}
                    style={{
                      whiteSpace: 'nowrap',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(223, 255, 0, 0.25)',
                      borderRadius: '9999px',
                      padding: '0.28rem 0.65rem',
                      color: '#F1F5F9',
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      flexShrink: 0
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              {/* =================================================================
                  B. CURRENT PACKAGE CONTEXT BANNER
                  ================================================================= */}
              {currentPackage && (
                <div
                  style={{
                    padding: '0.55rem 1rem',
                    backgroundColor: '#F0F2EB',
                    borderBottom: '1px solid #E5E7E2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.65rem',
                    fontSize: '0.78rem',
                    color: '#101C2C',
                    flexShrink: 0
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', minWidth: 0 }}>
                    <Compass size={14} color="#101C2C" style={{ flexShrink: 0 }} />
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      Konteks: <strong>{currentPackage.name}</strong>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSendMessage('Jelaskan paket ini')}
                    style={{
                      background: '#101C2C',
                      border: 'none',
                      color: '#DFFF00',
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      padding: '0.2rem 0.55rem',
                      borderRadius: '9999px',
                      cursor: 'pointer',
                      flexShrink: 0
                    }}
                  >
                    Tanya Paket Ini
                  </button>
                </div>
              )}

              {/* =================================================================
                  C. CHAT MESSAGE STREAM
                  ================================================================= */}
              <div
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  padding: '1rem',
                  backgroundColor: '#FAFAF5',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  overscrollBehavior: 'contain'
                }}
              >
                {messages.map((msg) => {
                  const isUser = msg.sender === 'user';
                  return (
                    <div
                      key={msg.id}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: isUser ? 'flex-end' : 'flex-start',
                        maxWidth: '100%'
                      }}
                    >
                      {/* Sender label */}
                      <span
                        style={{
                          fontSize: '0.68rem',
                          color: '#8A939E',
                          marginBottom: '0.25rem',
                          paddingLeft: isUser ? '0' : '0.35rem',
                          paddingRight: isUser ? '0.35rem' : '0'
                        }}
                      >
                        {isUser ? 'Anda' : 'FADZA AI'}
                      </span>

                      {/* Message bubble */}
                      <div
                        style={{
                          maxWidth: isUser ? '86%' : '94%',
                          padding: '0.8rem 1rem',
                          borderRadius: isUser ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                          backgroundColor: isUser ? '#101C2C' : '#FFFFFF',
                          border: isUser ? 'none' : '1px solid #E5E7E2',
                          color: isUser ? '#FFFFFF' : '#101C2C',
                          fontSize: '0.86rem',
                          lineHeight: 1.55,
                          boxShadow: '0 2px 8px rgba(16, 28, 44, 0.05)',
                          wordBreak: 'break-word'
                        }}
                      >
                        {renderFormattedText(msg.text)}

                        {/* CONFIRMED BOOKING RECORD CARD */}
                        {msg.bookingRecord && (
                          <div
                            style={{
                              marginTop: '0.85rem',
                              backgroundColor: '#101C2C',
                              color: '#FFFFFF',
                              borderRadius: '14px',
                              padding: '1rem',
                              border: '1.5px solid #DFFF00',
                              boxShadow: '0 8px 24px rgba(16, 28, 44, 0.25)'
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                                <Ticket size={16} color="#DFFF00" />
                                <span style={{ fontSize: '0.78rem', fontWeight: '800', letterSpacing: '0.04em', color: '#DFFF00' }}>
                                  E-VOUCHER TERKONFIRMASI
                                </span>
                              </div>
                              <span style={{ fontSize: '0.68rem', backgroundColor: 'rgba(22, 163, 74, 0.25)', color: '#4ADE80', padding: '0.15rem 0.45rem', borderRadius: '4px', fontWeight: '700' }}>
                                AKTIF & VALID
                              </span>
                            </div>

                            <div style={{ fontSize: '1.25rem', fontWeight: '900', letterSpacing: '0.05em', color: '#FFFFFF', fontFamily: 'monospace', marginBottom: '0.5rem' }}>
                              {msg.bookingRecord.bookingCode}
                            </div>

                            <div style={{ fontSize: '0.8rem', color: '#CBD5E1', display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '0.85rem' }}>
                              <div>Destinasi: <strong style={{ color: '#FFFFFF' }}>{msg.bookingRecord.packageName}</strong></div>
                              <div>Jadwal: <strong style={{ color: '#FFFFFF' }}>{msg.bookingRecord.travelDate}</strong> ({msg.bookingRecord.guests} Orang - Private Tour)</div>
                              <div>Pemesan: <strong style={{ color: '#FFFFFF' }}>{msg.bookingRecord.customer?.fullName}</strong></div>
                              <div>Tagihan: <strong style={{ color: '#DFFF00' }}>Rp{Number(msg.bookingRecord.totalPaid || msg.bookingRecord.subtotal).toLocaleString('id-ID')} ({msg.bookingRecord.paymentScheme === 'dp' ? 'DP 30%' : 'Lunas'})</strong></div>
                            </div>

                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                              <a
                                href={`https://wa.me/6281234567890?text=${encodeURIComponent(`Halo Fadza Concierge, saya ingin konfirmasi status reservasi kode: ${msg.bookingRecord.bookingCode} paket ${msg.bookingRecord.packageName}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-lime"
                                style={{
                                  flex: 1,
                                  padding: '0.5rem 0.75rem',
                                  borderRadius: '8px',
                                  fontSize: '0.76rem',
                                  fontWeight: '800',
                                  textDecoration: 'none',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  gap: '0.35rem'
                                }}
                              >
                                <WhatsAppIcon size={14} />
                                <span>Buka WhatsApp Concierge</span>
                              </a>

                              <button
                                type="button"
                                onClick={() => {
                                  if (onOpenBooking) {
                                    onOpenBooking({ id: msg.bookingRecord.packageId, name: msg.bookingRecord.packageName });
                                  }
                                }}
                                style={{
                                  padding: '0.5rem 0.75rem',
                                  borderRadius: '8px',
                                  fontSize: '0.76rem',
                                  fontWeight: '700',
                                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                  border: '1px solid rgba(255, 255, 255, 0.2)',
                                  color: '#FFFFFF',
                                  cursor: 'pointer'
                                }}
                              >
                                Booking Baru
                              </button>
                            </div>
                          </div>
                        )}

                        {/* CALCULATION SUMMARY BADGE */}
                        {msg.calculation && (
                          <div
                            style={{
                              marginTop: '0.75rem',
                              padding: '0.75rem',
                              backgroundColor: '#F0F2EB',
                              border: '1px solid #E5E7E2',
                              borderRadius: '10px',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '0.35rem',
                              fontSize: '0.8rem'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#101C2C', fontWeight: '700' }}>
                              <Calculator size={14} color="#101C2C" />
                              <span>Ringkasan Estimasi Biaya</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#101C2C' }}>
                              <span>Estimasi Total ({msg.calculation.participantCount} Orang):</span>
                              <strong style={{ color: '#101C2C', fontSize: '0.92rem', fontWeight: '800' }}>
                                {msg.calculation.formattedTotalPrice || msg.calculation.formattedGrandTotal}
                              </strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#68717C' }}>
                              <span>DP Reservasi (30%):</span>
                              <strong style={{ color: '#101C2C' }}>{msg.calculation.formattedDownPayment}</strong>
                            </div>
                          </div>
                        )}

                        {/* Error retry button */}
                        {msg.isError && (
                          <div style={{ marginTop: '0.65rem' }}>
                            <button
                              type="button"
                              onClick={handleRetry}
                              style={{
                                padding: '0.35rem 0.85rem',
                                borderRadius: 'var(--radius-full)',
                                backgroundColor: 'rgba(169, 104, 82, 0.25)',
                                border: '1px solid var(--color-secondary-accent, #A96852)',
                                color: '#FFFFFF',
                                fontSize: '0.78rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.35rem'
                              }}
                            >
                              <RotateCcw size={12} />
                              <span>Coba Lagi</span>
                            </button>
                          </div>
                        )}

                        {/* COMPARISON CARD IF AVAILABLE */}
                        {msg.comparison && (
                          <div
                            style={{
                              marginTop: '0.85rem',
                              backgroundColor: '#FFFFFF',
                              border: '1px solid #E5E7E2',
                              borderRadius: '14px',
                              padding: '0.9rem',
                              boxShadow: '0 4px 15px rgba(16, 28, 44, 0.05)'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#101C2C', fontWeight: '800', fontSize: '0.84rem', marginBottom: '0.65rem' }}>
                              <Compass size={14} color="#101C2C" />
                              <span>Komparasi Paket Wisata Resmi</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.65rem' }}>
                              <div style={{ padding: '0.65rem', backgroundColor: '#FAFAF5', borderRadius: '10px', border: '1px solid #E5E7E2' }}>
                                <div style={{ fontSize: '0.8rem', fontWeight: '800', color: '#101C2C', marginBottom: '0.2rem', lineHeight: 1.25 }}>
                                  {msg.comparison.pkgA.name}
                                </div>
                                <div style={{ color: '#101C2C', fontWeight: '800', fontSize: '0.88rem' }}>
                                  {msg.comparison.pkgA.formattedPrice}
                                </div>
                                <div style={{ fontSize: '0.7rem', color: '#68717C', marginTop: '0.2rem' }}>
                                  {msg.comparison.pkgA.duration} • {msg.comparison.pkgA.travelStyle}
                                </div>
                              </div>
                              <div style={{ padding: '0.65rem', backgroundColor: '#FAFAF5', borderRadius: '10px', border: '1px solid #E5E7E2' }}>
                                <div style={{ fontSize: '0.8rem', fontWeight: '800', color: '#101C2C', marginBottom: '0.2rem', lineHeight: 1.25 }}>
                                  {msg.comparison.pkgB.name}
                                </div>
                                <div style={{ color: '#101C2C', fontWeight: '800', fontSize: '0.88rem' }}>
                                  {msg.comparison.pkgB.formattedPrice}
                                </div>
                                <div style={{ fontSize: '0.7rem', color: '#68717C', marginTop: '0.2rem' }}>
                                  {msg.comparison.pkgB.duration} • {msg.comparison.pkgB.travelStyle}
                                </div>
                              </div>
                            </div>
                            <div style={{ fontSize: '0.76rem', color: '#68717C', marginBottom: '0.4rem', lineHeight: '1.45' }}>
                              {msg.comparison.samePrice ? (
                                <span>Kedua opsi memiliki tarif per orang yang sama.</span>
                              ) : (
                                <span>
                                  Paket <strong>{msg.comparison.cheaperPkg?.name}</strong> lebih hemat <strong>{msg.comparison.formattedPriceDiff}</strong>/orang.
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* DEDICATED BOOKING INFO CARD */}
                        {msg.bookingInfo && (
                          <div
                            style={{
                              marginTop: '0.85rem',
                              backgroundColor: '#EBF9F1',
                              border: '1.5px solid #107C41',
                              borderRadius: '14px',
                              padding: '0.9rem',
                              boxShadow: '0 4px 15px rgba(16, 28, 44, 0.05)'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#107C41', fontWeight: '800', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                              <WhatsAppIcon size={16} color="#107C41" />
                              <span>Konfirmasi Reservasi Resmi</span>
                            </div>
                            <div style={{ fontSize: '0.82rem', color: '#101C2C', lineHeight: 1.55, marginBottom: '0.75rem' }}>
                              <div>• Paket: <strong>{msg.bookingInfo.package?.name}</strong></div>
                              <div>• Peserta: <strong>{msg.bookingInfo.participants} orang</strong></div>
                              {msg.bookingInfo.calculation && (
                                <>
                                  <div>• Estimasi Total: <strong>{msg.bookingInfo.calculation.formattedTotalPrice}</strong></div>
                                  <div>• DP Konfirmasi (30%): <strong>{msg.bookingInfo.calculation.formattedDownPayment}</strong></div>
                                </>
                              )}
                            </div>
                            <a
                              href={msg.bookingInfo.whatsappUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                width: '100%',
                                padding: '0.6rem',
                                backgroundColor: '#107C41',
                                borderRadius: '10px',
                                color: '#FFFFFF',
                                fontSize: '0.82rem',
                                fontWeight: '700',
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.45rem',
                                transition: 'all 0.2s ease',
                                boxSizing: 'border-box'
                              }}
                            >
                              <WhatsAppIcon size={15} color="#FFFFFF" />
                              <span>Lanjutkan ke WhatsApp Resmi</span>
                            </a>
                          </div>
                        )}

                        {/* INTERACTIVE DESTINATION MINI CARDS */}
                        {msg.suggestedDestinations && msg.suggestedDestinations.length > 0 && (
                          <div
                            style={{
                              marginTop: '0.85rem',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '0.65rem'
                            }}
                          >
                            {msg.suggestedDestinations.map((dest) => (
                              <div
                                key={dest.id}
                                style={{
                                  backgroundColor: '#FFFFFF',
                                  border: '1px solid #E5E7E2',
                                  borderRadius: '14px',
                                  overflow: 'hidden',
                                  boxShadow: '0 4px 15px rgba(16, 28, 44, 0.05)'
                                }}
                              >
                                <div style={{ height: '130px', width: '100%', position: 'relative' }}>
                                  <ImageWithFallback
                                    src={dest.image}
                                    fallbackSrc={dest.fallbackImage}
                                    alt={dest.name}
                                    objectFit="cover"
                                    style={{ width: '100%', height: '100%' }}
                                  />
                                  <div
                                    style={{
                                      position: 'absolute',
                                      bottom: '8px',
                                      left: '8px',
                                      backgroundColor: 'rgba(16, 28, 44, 0.85)',
                                      backdropFilter: 'blur(4px)',
                                      WebkitBackdropFilter: 'blur(4px)',
                                      padding: '0.2rem 0.55rem',
                                      borderRadius: '6px',
                                      fontSize: '0.72rem',
                                      color: '#DFFF00',
                                      fontWeight: '700'
                                    }}
                                  >
                                    {dest.region}
                                  </div>
                                </div>

                                <div style={{ padding: '0.75rem 0.85rem' }}>
                                  <div style={{ color: '#101C2C', fontWeight: '800', fontSize: '0.9rem', marginBottom: '0.2rem' }}>
                                    {dest.name}
                                  </div>
                                  <div style={{ color: '#68717C', fontSize: '0.78rem', marginBottom: '0.65rem', lineHeight: '1.4' }}>
                                    {dest.subtitle || dest.shortDescription}
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => handleDestinationClick(dest)}
                                    className="btn-dark"
                                    style={{
                                      width: '100%',
                                      padding: '0.5rem',
                                      borderRadius: '8px',
                                      fontSize: '0.78rem',
                                      justifyContent: 'center',
                                      gap: '0.35rem'
                                    }}
                                  >
                                    <span>Jelajahi Paket {dest.name}</span>
                                    <ArrowRight size={13} />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* INTERACTIVE PACKAGE MINI CARDS (CRISP 140PX HERO IMAGE + DUAL CTAS) */}
                        {msg.suggestedPackages && msg.suggestedPackages.length > 0 && (
                          <div
                            style={{
                              marginTop: '0.85rem',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '0.75rem'
                            }}
                          >
                            {msg.suggestedPackages.map((pkg) => {
                              const pkgImage = pkg.heroImage || pkg.image || pkg.fallbackImage;
                              const waBookingLink = generateBookingWhatsAppLink(
                                pkg,
                                msg.calculation?.participantCount || 2
                              );

                              return (
                                <div
                                  key={pkg.id}
                                  style={{
                                    backgroundColor: '#FFFFFF',
                                    border: '1px solid #E5E7E2',
                                    borderRadius: '14px',
                                    overflow: 'hidden',
                                    boxShadow: '0 4px 15px rgba(16, 28, 44, 0.05)'
                                  }}
                                >
                                  {/* Crisp, large 140px Hero Image */}
                                  <div style={{ height: '140px', width: '100%', position: 'relative', overflow: 'hidden' }}>
                                    <ImageWithFallback
                                      src={pkgImage}
                                      fallbackSrc={pkg.fallbackImage}
                                      alt={pkg.name}
                                      objectFit="cover"
                                      style={{ width: '100%', height: '100%' }}
                                    />
                                    {/* Destination & Duration Pill */}
                                    <div
                                      style={{
                                        position: 'absolute',
                                        bottom: '8px',
                                        left: '8px',
                                        backgroundColor: 'rgba(16, 28, 44, 0.85)',
                                        backdropFilter: 'blur(4px)',
                                        WebkitBackdropFilter: 'blur(4px)',
                                        padding: '0.2rem 0.55rem',
                                        borderRadius: '6px',
                                        fontSize: '0.72rem',
                                        color: '#DFFF00',
                                        fontWeight: '700'
                                      }}
                                    >
                                      {pkg.destination} • {pkg.duration}
                                    </div>
                                    {/* Private Trip Pill */}
                                    <div
                                      style={{
                                        position: 'absolute',
                                        top: '8px',
                                        right: '8px',
                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                        padding: '0.15rem 0.45rem',
                                        borderRadius: '4px',
                                        fontSize: '0.65rem',
                                        color: '#101C2C',
                                        fontWeight: '700'
                                      }}
                                    >
                                      Private Trip
                                    </div>
                                  </div>

                                  {/* Clean Text and Price Content Below Image */}
                                  <div style={{ padding: '0.85rem' }}>
                                    <div style={{ color: '#101C2C', fontWeight: '800', fontSize: '0.92rem', lineHeight: 1.35, marginBottom: '0.25rem' }}>
                                      {pkg.name}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', marginBottom: '0.45rem' }}>
                                      <span style={{ color: '#101C2C', fontWeight: '800', fontSize: '1rem' }}>
                                        {pkg.formattedPrice}
                                      </span>
                                      <span style={{ fontSize: '0.72rem', fontWeight: '500', color: '#8A939E' }}>
                                        / orang
                                      </span>
                                    </div>

                                    {pkg.tagline && (
                                      <div style={{ color: '#68717C', fontSize: '0.76rem', marginBottom: '0.75rem', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        {pkg.tagline}
                                      </div>
                                    )}

                                    {/* Dual Action CTAs: Detail + WhatsApp */}
                                    <div style={{ display: 'flex', gap: '0.45rem' }}>
                                      <button
                                        type="button"
                                        onClick={() => handlePackageClick(pkg)}
                                        className="btn-dark"
                                        style={{
                                          flex: 1,
                                          padding: '0.5rem 0.6rem',
                                          borderRadius: '8px',
                                          fontSize: '0.78rem',
                                          justifyContent: 'center',
                                          gap: '0.3rem'
                                        }}
                                      >
                                        <span>Detail</span>
                                        <ArrowRight size={12} />
                                      </button>

                                      <button
                                        type="button"
                                        onClick={() => {
                                          if (onOpenBooking) {
                                            onOpenBooking(pkg);
                                          }
                                        }}
                                        className="btn-lime"
                                        style={{
                                          flex: 1.4,
                                          padding: '0.5rem 0.6rem',
                                          borderRadius: '8px',
                                          fontSize: '0.78rem',
                                          fontWeight: '800',
                                          cursor: 'pointer',
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          gap: '0.3rem'
                                        }}
                                      >
                                        <Ticket size={13} />
                                        <span>Booking Sekarang</span>
                                      </button>

                                      <a
                                        href={waBookingLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                          padding: '0.5rem 0.6rem',
                                          borderRadius: '8px',
                                          fontSize: '0.78rem',
                                          textDecoration: 'none',
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          gap: '0.3rem',
                                          backgroundColor: '#F1F5F9',
                                          border: '1px solid #CBD5E1',
                                          color: '#0F172A',
                                          fontWeight: '700'
                                        }}
                                        title="Tanya lebih lanjut via WhatsApp"
                                      >
                                        <WhatsAppIcon size={14} color="#101C2C" />
                                        <span>Tanya WA</span>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Typing Indicator */}
                {isLoading && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingLeft: '0.35rem' }}>
                    <div
                      style={{
                        padding: '0.6rem 0.85rem',
                        borderRadius: '16px 16px 16px 2px',
                        backgroundColor: 'rgba(244, 240, 232, 0.05)',
                        border: '1px solid rgba(244, 240, 232, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <div className="typing-dots" style={{ display: 'flex', gap: '4px' }}>
                        <span className="dot" />
                        <span className="dot" />
                        <span className="dot" />
                      </div>
                      <span style={{ fontSize: '0.76rem', color: 'var(--color-taupe, #D8D0C3)' }}>
                        FADZA AI sedang berpikir...
                      </span>
                    </div>
                  </div>
                )}

                <div ref={chatBottomRef} />
              </div>

              {/* =================================================================
                  D. QUICK ACTION CHIPS
                  ================================================================= */}
              <div
                style={{
                  padding: '0.5rem 0.75rem',
                  backgroundColor: '#FAFAF5',
                  borderTop: '1px solid #E5E7E2',
                  display: 'flex',
                  gap: '0.45rem',
                  overflowX: 'auto',
                  flexShrink: 0,
                  scrollbarWidth: 'none'
                }}
              >
                {defaultQuestions.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    disabled={isLoading}
                    onClick={() => handleSendMessage(chip)}
                    style={{
                      whiteSpace: 'nowrap',
                      backgroundColor: chip.startsWith('✦') ? '#101C2C' : '#FFFFFF',
                      border: chip.startsWith('✦') ? '1px solid #101C2C' : '1px solid #E5E7E2',
                      borderRadius: '9999px',
                      padding: '0.35rem 0.75rem',
                      color: chip.startsWith('✦') ? '#DFFF00' : '#101C2C',
                      fontSize: '0.74rem',
                      fontWeight: '700',
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      flexShrink: 0,
                      transition: 'all 0.2s ease',
                      boxShadow: '0 1px 4px rgba(16, 28, 44, 0.04)'
                    }}
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* =================================================================
                  E. CHAT FOOTER & INPUT DOCK
                  ================================================================= */}
              <div
                style={{
                  padding: '0.75rem 0.9rem',
                  backgroundColor: '#FFFFFF',
                  borderTop: '1px solid #E5E7E2',
                  flexShrink: 0
                }}
              >
                {/* Character limit warning */}
                {charLimitWarning && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.74rem',
                      color: '#D92D20',
                      marginBottom: '0.4rem',
                      padding: '0.3rem 0.6rem',
                      backgroundColor: '#FEECEC',
                      borderRadius: '6px'
                    }}
                  >
                    <AlertCircle size={13} />
                    <span>Silakan ringkas pertanyaan Anda agar saya dapat membantu dengan lebih baik.</span>
                  </div>
                )}

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: '#FAFAF5',
                    border: '1px solid #E5E7E2',
                    borderRadius: '9999px',
                    padding: '0.25rem 0.4rem 0.25rem 0.85rem'
                  }}
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Tanya rute, hitung 2 orang, atau bandingkan paket..."
                    disabled={isLoading}
                    maxLength={MAX_CHAR_LIMIT + 50}
                    style={{
                      flex: 1,
                      backgroundColor: 'transparent',
                      border: 'none',
                      outline: 'none',
                      color: '#101C2C',
                      fontSize: '0.86rem',
                      padding: '0.45rem 0'
                    }}
                  />

                  <button
                    type="button"
                    disabled={!inputText.trim() || isLoading}
                    onClick={() => handleSendMessage()}
                    aria-label="Kirim Pesan"
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      backgroundColor: inputText.trim() && !isLoading ? '#101C2C' : '#E5E7E2',
                      color: inputText.trim() && !isLoading ? '#DFFF00' : '#8A939E',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: inputText.trim() && !isLoading ? 'pointer' : 'not-allowed',
                      flexShrink: 0,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Send size={15} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Global Embedded Styles for Animations & Responsive Layout */}
      <style>{`
        /* Desktop Floating Window - Anchored to Bottom Left */
        .fadza-ai-chat-window {
          bottom: 84px;
          left: 20px;
          right: auto;
          width: clamp(380px, 30vw, 440px);
          height: clamp(560px, 80vh, 700px);
          border-radius: 20px;
          transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .fadza-ai-chat-window.expanded {
          width: clamp(580px, 48vw, 740px) !important;
          height: clamp(620px, 86vh, 780px) !important;
        }

        .fadza-ai-chat-window.minimized {
          height: auto !important;
          width: 330px !important;
        }

        /* Open animation: fade + slide + subtle scale */
        @keyframes fadzaChatOpen {
          0% {
            opacity: 0;
            transform: translateY(16px) scale(0.97);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fadzaFadeIn {
          0% { opacity: 0; transform: translateY(4px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        /* Subtle Breathing & Attention Animation on Launcher */
        .fadza-ai-launcher-btn.attention-glow {
          animation: fadzaAttentionRise 3.5s ease-in-out;
        }

        @keyframes fadzaAttentionRise {
          0% {
            transform: translateY(0);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.65), 0 0 16px rgba(199, 169, 107, 0.28);
          }
          30% {
            transform: translateY(-5px);
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.75), 0 0 24px rgba(199, 169, 107, 0.55);
            border-color: #E2CF9F;
          }
          70% {
            transform: translateY(-2px);
            box-shadow: 0 10px 28px rgba(0, 0, 0, 0.7), 0 0 20px rgba(199, 169, 107, 0.4);
          }
          100% {
            transform: translateY(0);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.65), 0 0 16px rgba(199, 169, 107, 0.28);
          }
        }

        /* Mobile Viewport (< 768px): Full Screen or Near Full Screen Bottom Sheet */
        @media (max-width: 767px) {
          .desktop-only-btn,
          .desktop-only-teaser {
            display: none !important;
          }

          .fadza-ai-chat-window {
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            width: 100% !important;
            height: 100dvh !important;
            max-height: 100dvh !important;
            border-radius: 0 !important;
            border-left: none !important;
            border-right: none !important;
            border-bottom: none !important;
          }

          .fadza-ai-launcher-container {
            bottom: 22px !important;
            left: 16px !important;
            right: auto !important;
            align-items: flex-start !important;
          }
        }

        /* Typing Dots Animation */
        .typing-dots .dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: var(--color-accent, #C7A96B);
          display: inline-block;
          animation: fadzaTyping 1.4s infinite ease-in-out both;
        }

        .typing-dots .dot:nth-child(1) { animation-delay: -0.32s; }
        .typing-dots .dot:nth-child(2) { animation-delay: -0.16s; }
        .typing-dots .dot:nth-child(3) { animation-delay: 0s; }

        @keyframes fadzaTyping {
          0%, 80%, 100% {
            transform: scale(0.6);
            opacity: 0.4;
          }
          40% {
            transform: scale(1.1);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
