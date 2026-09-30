import React, { useState, useEffect, useRef } from 'react';
import { generateTravelResponse } from '../services/aiService.js';
import ImageWithFallback from './ImageWithFallback.jsx';
import {
  Compass,
  X,
  Send,
  RotateCcw,
  ArrowRight,
  MapPin,
  Clock,
  CheckCircle2,
  Users,
  Wallet,
  Calendar,
  Layers,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

export default function AITravelAssistantModal({
  isOpen,
  onClose,
  currentPackage = null,
  onSelectPackage
}) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [lastUserMessage, setLastUserMessage] = useState('');
  const chatBottomRef = useRef(null);
  const inputRef = useRef(null);

  // Suggestion chips when opened
  const defaultSuggestions = currentPackage
    ? [
        'Berapa harga paket ini?',
        'Apa saja yang termasuk?',
        'Jelaskan itinerary-nya',
        'Meeting point di mana?',
        'Apa yang perlu saya siapkan?',
        'Ada paket lain yang mirip?'
      ]
    : [
        'Rekomendasikan paket untuk saya',
        'Cari paket di bawah 5 juta',
        'Paket ramah keluarga',
        'Paket Labuan Bajo',
        'Paket Bali Escape',
        'Paket durasi 4 hari'
      ];

  // Quick Action Pills
  const quickActions = [
    { label: 'Cari Paket', query: 'Tampilkan pilihan paket wisata yang tersedia' },
    { label: 'Budget < 5 Jt', query: 'Carikan paket dengan budget di bawah 5 juta' },
    { label: 'Untuk Keluarga', query: 'Rekomendasikan paket yang cocok untuk liburan keluarga' },
    { label: 'Labuan Bajo', query: 'Jelaskan paket wisata Labuan Bajo Phinisi' },
    { label: 'Bali Escape', query: 'Jelaskan paket Bali Escape & Nusa Penida' },
    { label: 'Raja Ampat', query: 'Ceritakan paket ekspedisi Raja Ampat' }
  ];

  // Initialize or reset conversation when modal opens or currentPackage changes
  useEffect(() => {
    if (isOpen) {
      const initialGreeting = currentPackage
        ? `Halo! Saya **FADZA AI Travel Assistant**, asisten perjalanan digital Anda.\n\nSaat ini kita sedang membahas **${currentPackage.name}** (${currentPackage.destination}, ${currentPackage.duration}) dengan tarif mulai **${currentPackage.formattedPrice}/orang**.\n\nAda yang ingin Anda ketahui seputar harga, jadwal itinerary, fasilitas, atau perbandingan dengan paket lain?`
        : `Halo! Selamat datang di **FADZA AI Travel Assistant**.\n\nSaya siap membantu Anda memahami seluruh katalog paket wisata privat FADZA TRIP ADVENTURE di 16 destinasi Nusantara. Ada destinasi, budget, atau gaya liburan tertentu yang Anda cari?`;

      setMessages([
        {
          id: 'msg-welcome',
          sender: 'ai',
          text: initialGreeting,
          suggestedPackages: currentPackage ? [currentPackage] : [],
          timestamp: new Date()
        }
      ]);
      setHasError(false);

      // Focus input after opening animation
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 250);
    }
  }, [isOpen, currentPackage]);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  // Prevent background body scroll when modal is open
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

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || inputText).trim();
    if (!query || isLoading) return;

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

    try {
      const response = await generateTravelResponse({
        message: query,
        history: messages,
        currentPackage
      });

      const aiMessageObj = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: response.text,
        suggestedPackages: response.suggestedPackages || [],
        quickReplies: response.quickReplies || [],
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
          text: 'Maaf, FADZA AI sedang mengalami kendala teknis saat memproses data. Silakan tekan tombol **Coba Lagi** di bawah.',
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
      onClose();
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(10, 12, 11, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(0px, 2vw, 1.25rem)',
        boxSizing: 'border-box'
      }}
      onClick={onClose}
    >
      {/* Modal / Dialog Container */}
      <div
        className="fadza-ai-modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '680px',
          height: '100%',
          maxHeight: 'min(86vh, 740px)',
          backgroundColor: '#171A19',
          border: '1.5px solid rgba(199, 169, 107, 0.45)',
          borderRadius: 'var(--radius-xl, 20px)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.85), 0 0 35px rgba(199, 169, 107, 0.15)',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* =======================================================================
            1. HEADER: Branding, Active Context, Close Action
            ======================================================================= */}
        <div
          style={{
            padding: '1.15rem 1.4rem',
            borderBottom: '1px solid rgba(244, 240, 232, 0.12)',
            backgroundColor: 'rgba(23, 26, 25, 0.96)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            flexShrink: 0
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1.5px solid rgba(223, 255, 0, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                overflow: 'hidden',
                padding: '4px'
              }}
            >
              <img
                src="/images/logo-fadza.png"
                alt="FADZA Logo"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>

            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <h3
                  style={{
                    color: '#FFFFFF',
                    fontSize: '1.05rem',
                    fontWeight: '800',
                    fontFamily: 'var(--font-serif)',
                    letterSpacing: '0.02em',
                    margin: 0,
                    whiteSpace: 'nowrap'
                  }}
                >
                  FADZA AI Travel Assistant
                </h3>
                <span
                  style={{
                    backgroundColor: 'rgba(199, 169, 107, 0.22)',
                    color: 'var(--color-accent)',
                    border: '1px solid rgba(199, 169, 107, 0.4)',
                    padding: '0.15rem 0.45rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.68rem',
                    fontWeight: '700',
                    textTransform: 'uppercase'
                  }}
                >
                  Digital Concierge
                </span>
              </div>
              <p
                style={{
                  color: 'var(--color-taupe, #D8D0C3)',
                  fontSize: '0.78rem',
                  margin: '2px 0 0 0',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                Penasihat perjalanan resmi terhubung ke seluruh katalog paket FADZA
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'rgba(244, 240, 232, 0.08)',
              border: '1px solid rgba(244, 240, 232, 0.15)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'all 0.2s ease'
            }}
            aria-label="Tutup FADZA AI Assistant"
          >
            <X size={18} />
          </button>
        </div>

        {/* Current Active Context Strip */}
        {currentPackage && (
          <div
            style={{
              backgroundColor: 'rgba(199, 169, 107, 0.12)',
              borderBottom: '1px solid rgba(199, 169, 107, 0.28)',
              padding: '0.5rem 1.4rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.75rem',
              fontSize: '0.78rem',
              flexShrink: 0
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--color-accent)', minWidth: 0 }}>
              <Compass size={14} style={{ flexShrink: 0 }} />
              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Sedang membahas: <strong style={{ color: '#FFFFFF' }}>{currentPackage.name}</strong>
              </span>
            </div>
            <span style={{ color: 'var(--color-accent)', fontWeight: '700', whiteSpace: 'nowrap' }}>
              {currentPackage.formattedPrice}/pax
            </span>
          </div>
        )}

        {/* =======================================================================
            2. CHAT MESSAGES STREAM (Scrollable Viewport)
            ======================================================================= */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.25rem 1.4rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(199, 169, 107, 0.3) transparent'
          }}
        >
          {messages.map((msg) => {
            const isAi = msg.sender === 'ai';
            return (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isAi ? 'flex-start' : 'flex-end',
                  width: '100%',
                  gap: '0.5rem'
                }}
              >
                {/* Message Bubble Container */}
                <div
                  style={{
                    maxWidth: '88%',
                    backgroundColor: isAi
                      ? msg.isError
                        ? 'rgba(239, 68, 68, 0.15)'
                        : 'rgba(244, 240, 232, 0.05)'
                      : 'rgba(199, 169, 107, 0.22)',
                    border: isAi
                      ? msg.isError
                        ? '1px solid rgba(239, 68, 68, 0.4)'
                        : '1px solid rgba(244, 240, 232, 0.12)'
                      : '1px solid var(--color-accent)',
                    borderRadius: isAi ? '4px 18px 18px 18px' : '18px 4px 18px 18px',
                    padding: '1rem 1.25rem',
                    color: '#F4F0E8',
                    fontSize: '0.92rem',
                    lineHeight: 1.65,
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
                    backdropFilter: 'blur(10px)',
                    wordBreak: 'break-word',
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  {/* Sender Tag */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      marginBottom: '0.45rem',
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: isAi ? 'var(--color-accent)' : '#FFFFFF'
                    }}
                  >
                    {isAi ? <Compass size={12} /> : null}
                    <span>{isAi ? 'FADZA AI Concierge' : 'Anda'}</span>
                  </div>

                  {/* Render content text with formatting */}
                  <div>{msg.text}</div>

                  {/* Retry action if error */}
                  {msg.isError && (
                    <button
                      onClick={handleRetry}
                      style={{
                        marginTop: '0.85rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        backgroundColor: 'rgba(239, 68, 68, 0.25)',
                        border: '1px solid rgba(239, 68, 68, 0.5)',
                        color: '#FFFFFF',
                        padding: '0.4rem 0.85rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.8rem',
                        fontWeight: '700',
                        cursor: 'pointer'
                      }}
                    >
                      <RotateCcw size={13} />
                      <span>Coba Lagi</span>
                    </button>
                  )}
                </div>

                {/* ===============================================================
                    CLICKABLE PACKAGE RESULT CARDS (Requirement 13)
                    Renders rich compact card whenever AI mentions or suggests packages
                    =============================================================== */}
                {isAi && msg.suggestedPackages && msg.suggestedPackages.length > 0 && (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.65rem',
                      marginTop: '0.4rem',
                      width: '100%',
                      maxWidth: '88%'
                    }}
                  >
                    <span style={{ fontSize: '0.74rem', color: 'var(--color-accent)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Pilihan Paket Rekomendasi:
                    </span>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '0.75rem', width: '100%' }}>
                      {msg.suggestedPackages.map((pkg) => (
                        <div
                          key={pkg.id}
                          style={{
                            backgroundColor: 'rgba(23, 26, 25, 0.95)',
                            border: '1.5px solid rgba(199, 169, 107, 0.35)',
                            borderRadius: '14px',
                            overflow: 'hidden',
                            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'transform 0.2s ease, border-color 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--color-accent)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(199, 169, 107, 0.35)';
                            e.currentTarget.style.transform = 'translateY(0)';
                          }}
                        >
                          <div style={{ position: 'relative', height: '110px', width: '100%' }}>
                            <ImageWithFallback
                              src={pkg.heroImage}
                              fallbackSrc={pkg.fallbackImage}
                              alt={pkg.name}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(23, 26, 25, 0.9) 0%, transparent 60%)' }} />
                            <div style={{ position: 'absolute', bottom: '8px', left: '10px', right: '10px' }}>
                              <span style={{ color: 'var(--color-accent)', fontSize: '0.72rem', fontWeight: '700', textTransform: 'uppercase' }}>
                                {pkg.destination} • {pkg.duration}
                              </span>
                            </div>
                          </div>

                          <div style={{ padding: '0.85rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                            <h4 style={{ color: '#FFFFFF', fontSize: '0.92rem', fontWeight: '700', marginBottom: '0.35rem', lineHeight: 1.3 }}>
                              {pkg.name}
                            </h4>
                            <div style={{ fontSize: '0.82rem', color: 'var(--color-taupe, #D8D0C3)', marginBottom: '0.75rem' }}>
                              Mulai dari <strong style={{ color: 'var(--color-accent)' }}>{pkg.formattedPrice}</strong>/pax
                            </div>

                            <button
                              type="button"
                              onClick={() => handlePackageClick(pkg)}
                              className="btn-primary"
                              style={{
                                width: '100%',
                                padding: '0.55rem',
                                fontSize: '0.8rem',
                                gap: '0.35rem',
                                marginTop: 'auto'
                              }}
                            >
                              <span>Lihat Detail Paket</span>
                              <ArrowRight size={13} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isLoading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', alignSelf: 'flex-start', padding: '0.75rem 1rem', backgroundColor: 'rgba(244, 240, 232, 0.05)', border: '1px solid rgba(244, 240, 232, 0.1)', borderRadius: 'var(--radius-full)', color: 'var(--color-accent)', fontSize: '0.84rem' }}>
              <Compass size={14} className="spin-slow" />
              <span>FADZA AI sedang menyiapkan jawaban...</span>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* =======================================================================
            3. QUICK ACTIONS & SUGGESTED CHIPS ROW
            ======================================================================= */}
        <div
          style={{
            padding: '0.65rem 1.25rem',
            borderTop: '1px solid rgba(244, 240, 232, 0.08)',
            backgroundColor: 'rgba(23, 26, 25, 0.98)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            flexShrink: 0
          }}
        >
          {/* Quick Actions Pills */}
          <div
            style={{
              display: 'flex',
              gap: '0.45rem',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              paddingBottom: '2px',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {quickActions.map((qa, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSendMessage(qa.query)}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'rgba(244, 240, 232, 0.05)',
                  border: '1px solid rgba(244, 240, 232, 0.14)',
                  color: 'var(--color-taupe, #D8D0C3)',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  flexShrink: 0
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(199, 169, 107, 0.2)';
                  e.currentTarget.style.borderColor = 'var(--color-accent)';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(244, 240, 232, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(244, 240, 232, 0.14)';
                  e.currentTarget.style.color = 'var(--color-taupe, #D8D0C3)';
                }}
              >
                {qa.label}
              </button>
            ))}
          </div>

          {/* 4–6 Suggested Question Chips */}
          <div
            style={{
              display: 'flex',
              gap: '0.45rem',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              paddingBottom: '2px',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {defaultSuggestions.map((sug, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSendMessage(sug)}
                style={{
                  padding: '0.35rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'rgba(199, 169, 107, 0.12)',
                  border: '1px solid rgba(199, 169, 107, 0.35)',
                  color: 'var(--color-accent)',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  flexShrink: 0
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-accent)';
                  e.currentTarget.style.color = '#171A19';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(199, 169, 107, 0.12)';
                  e.currentTarget.style.color = 'var(--color-accent)';
                }}
              >
                {sug}
              </button>
            ))}
          </div>
        </div>

        {/* =======================================================================
            4. INPUT DOCK
            ======================================================================= */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          style={{
            padding: '0.9rem 1.25rem calc(0.9rem + env(safe-area-inset-bottom, 0px)) 1.25rem',
            borderTop: '1px solid rgba(244, 240, 232, 0.12)',
            backgroundColor: '#111312',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            flexShrink: 0
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Tanyakan paket wisata, itinerary, harga, atau fasilitas..."
            disabled={isLoading}
            style={{
              flex: 1,
              backgroundColor: 'rgba(244, 240, 232, 0.07)',
              border: '1px solid rgba(244, 240, 232, 0.18)',
              borderRadius: 'var(--radius-full)',
              padding: '0.75rem 1.15rem',
              color: '#FFFFFF',
              fontSize: '0.9rem',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />

          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="btn-primary"
            style={{
              padding: '0.75rem 1.25rem',
              borderRadius: 'var(--radius-full)',
              opacity: !inputText.trim() || isLoading ? 0.5 : 1,
              cursor: !inputText.trim() || isLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              flexShrink: 0
            }}
            aria-label="Kirim Pertanyaan ke FADZA AI"
          >
            <Send size={15} />
            <span style={{ fontSize: '0.85rem', fontWeight: '700' }}>Kirim</span>
          </button>
        </form>
      </div>
    </div>
  );
}
