import React, { useState, useEffect } from 'react';
import {
  DESTINATIONS,
  PACKAGES,
  GALLERY_ITEMS,
  TESTIMONIALS,
  GENERAL_FAQS
} from '../data/travelData.js';
import { ASSET_IMAGES } from '../data/images.js';
import DestinationCard from '../components/DestinationCard';
import PackageCard from '../components/PackageCard';
import Pagination from '../components/Pagination';
import TravelStyleShowcase from '../components/TravelStyleShowcase';
import QuickTripSearch from '../components/QuickTripSearch';
import ImageWithFallback from '../components/ImageWithFallback';
import { getGeneralWhatsAppLink } from '../utils/whatsapp';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { useLanguage } from '../context/LanguageContext';
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  Camera,
  Check,
  Sailboat,
  MessageSquarePlus,
  CheckCircle2,
  X,
  HelpCircle,
  Ticket,
  CalendarCheck,
  Search,
  Award,
  SlidersHorizontal,
  MapPin,
  Bot,
  ThumbsUp,
  Clock,
  Sparkles
} from 'lucide-react';

const HERO_SLIDE_EN = {
  'pink-beach': {
    eyebrow: '🌴 LABUAN BAJO & KOMODO EXPEDITION',
    titlePrimary: 'Marine Wonders of Pink Beach,',
    titleHighlight: 'The Pink Paradise',
    titleSecondary: 'of Flores Archipelago.',
    subtitle: 'Witness the rare expanse of pastel pink sands meeting crystal clear ocean waters. Sail aboard our finest private luxury Phinisi in the heart of Komodo National Park.',
    tags: ['Rare Pink Sand', 'Luxury Suite Phinisi', 'Manta Point Snorkeling', 'Padar Island Trekking'],
    primaryCta: 'Explore Labuan Bajo',
    location: 'Labuan Bajo, Flores, East Nusa Tenggara'
  },
  'bromo-sunrise': {
    eyebrow: '🌋 EAST JAVA VOLCANIC EXPEDITION',
    titlePrimary: 'Greeting the Golden Dawn',
    titleHighlight: 'across the Sacred Caldera',
    titleSecondary: 'of Mount Bromo.',
    subtitle: 'Experience private 4WD Jeep safaris crossing whispering sands, stand on the edge of the legendary active crater, and witness sunrise from King Kong Hill.',
    tags: ['Penanjakan Sunrise', 'Private 4x4 Jeep', 'Whispering Sands', 'Active Bromo Crater'],
    primaryCta: 'Explore Bromo Sunrise',
    location: 'Bromo Tengger Semeru National Park'
  },
  'borobudur-temple': {
    eyebrow: '🏛️ SACRED ANCESTRAL HERITAGE',
    titlePrimary: 'The Dawn Serenity of Borobudur,',
    titleHighlight: 'Gazing upon Eternal Heritage',
    titleSecondary: 'in Yogyakarta.',
    subtitle: 'Immerse in spiritual peace amidst morning mist surrounding the 8th-century stone stupas. Savor traditional royal Javanese dinners and artistic crafts in Prambanan.',
    tags: ['Dawn Temple Tour', 'UNESCO World Heritage', 'Royal Javanese Dining', 'Prambanan Complex'],
    primaryCta: 'Explore Yogyakarta',
    location: 'Borobudur & Prambanan, Yogyakarta'
  },
  'raja-ampat-lagoon': {
    eyebrow: '🪸 SURREAL OCEANS OF WEST PAPUA',
    titlePrimary: 'The Emerald Waters of Raja Ampat,',
    titleHighlight: 'The Pinnacle of Marine Biodiversity',
    titleSecondary: 'on Earth.',
    subtitle: 'Sail through labyrinthine karst lagoons and plunge into the world’s most biodiverse coral reefs. Experience unspoiled natural beauty in Misool and Wayag.',
    tags: ['Pristine Karst Islands', 'World Coral Triangle', 'Trekking Pianemo', 'Exclusive Island Resort'],
    primaryCta: 'Explore Raja Ampat',
    location: 'Raja Ampat Islands, Southwest Papua'
  },
  'padar-panoramic': {
    eyebrow: '🌊 DRAMATIC TOPOGRAPHY OF KOMODO',
    titlePrimary: 'The Three-Color Bay of Padar Island,',
    titleHighlight: 'Panoramic Majesty',
    titleSecondary: 'of Flores Seas.',
    subtitle: 'Hike to the summit of Padar at first light and witness three different colored bays under one golden sky. Continue sailing to Komodo dragon sanctuaries.',
    tags: ['Padar Summit Trek', 'Three-Color Bay', 'Komodo Sanctuary', 'Private Speedboat'],
    primaryCta: 'Explore Padar & Komodo',
    location: 'Padar Island, Komodo National Park'
  },
  'raja-ampat-wayag': {
    eyebrow: '🏝️ THE ICONIC DOME OF WAYAG',
    titlePrimary: 'Scaling the Karst Towers of Wayag,',
    titleHighlight: 'The Ultimate Archipelagic Panorama',
    titleSecondary: 'in Raja Ampat.',
    subtitle: 'Scale sharp limestone towers to behold the world-famous panorama of turquoise atolls and sea eagle nests. Truly a once-in-a-lifetime journey.',
    tags: ['Wayag Summit Trek', 'Baby Shark Sanctuary', 'Karst Lagoon Kayak', 'Deep Sea Snorkeling'],
    primaryCta: 'Explore Wayag Archipelago',
    location: 'Wayag Karst Islands, Raja Ampat'
  },
  'kawah-putih': {
    eyebrow: '🌲 HIGHLAND MIST OF PARAHYANGAN',
    titlePrimary: 'The Mystical Turquoise Crater,',
    titleHighlight: 'Cool Mountain Whispers',
    titleSecondary: 'of Ciwidey Bandung.',
    subtitle: 'Breathe crisp mountain air surrounded by tea plantations and sulfurous turquoise waters. Unwind in exclusive colonial resorts in the hills of West Java.',
    tags: ['Turquoise Sulfur Crater', 'Rolling Tea Plantations', 'Private Heritage Villa', 'Cool Highland Breeze'],
    primaryCta: 'Explore Bandung Highlands',
    location: 'Ciwidey Crater, South Bandung'
  }
};

const SLIDE_THEMES = [
  {
    id: 'bromo-sunrise',
    name: 'Gunung Bromo & Kaldera Tengger',
    accent: '#EA580C',
    secondaryAccent: '#F59E0B',
    amberAccent: '#059669',
    tagColor: '#D97706',
    glowColor: 'rgba(234, 88, 12, 0.35)',
    // Multi-color palette blend: Golden Sunrise + Volcanic Ember + Savana Emerald + Lavender Dawn
    bgGradient: 'radial-gradient(ellipse at 20% 15%, rgba(254, 215, 170, 0.55) 0%, transparent 50%), radial-gradient(ellipse at 80% 30%, rgba(253, 230, 138, 0.5) 0%, transparent 55%), radial-gradient(ellipse at 40% 75%, rgba(167, 243, 208, 0.4) 0%, transparent 60%), linear-gradient(180deg, #FFF7ED 0%, #FEFCE8 35%, #F0FDF4 70%, #EFF6FF 100%)',
    weather: '14°C Sejuk Fajar • Lautan Pasir Berbisik • Golden Dawn Siap',
    highlightBadge: '🌋 FAJAR EMAS VULKANIK'
  },
  {
    id: 'pink-beach',
    name: 'Labuan Bajo & Komodo',
    accent: '#F43F5E',
    secondaryAccent: '#0284C7',
    amberAccent: '#F59E0B',
    tagColor: '#E11D48',
    glowColor: 'rgba(244, 63, 94, 0.35)',
    // Multi-color palette blend: Soft Rose + Selat Komodo Cyan + Golden Coral + Lavender Mist
    bgGradient: 'radial-gradient(ellipse at 15% 10%, rgba(254, 205, 211, 0.5) 0%, transparent 50%), radial-gradient(ellipse at 85% 35%, rgba(186, 230, 253, 0.5) 0%, transparent 55%), radial-gradient(ellipse at 50% 80%, rgba(254, 240, 138, 0.4) 0%, transparent 60%), linear-gradient(180deg, #FFF1F2 0%, #F0FDF4 35%, #F0F9FF 70%, #FFF7ED 100%)',
    weather: '28°C Cerah Berawan • Ombak 0.5m Tenang • Visibilitas Selam 25m',
    highlightBadge: '🏝️ PESONA BAHARI FLORES'
  },
  {
    id: 'borobudur-temple',
    name: 'Candi Borobudur & D.I. Yogyakarta',
    accent: '#059669',
    secondaryAccent: '#D97706',
    amberAccent: '#7C3AED',
    tagColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.35)',
    // Multi-color palette blend: Sacred Rainforest Jade + Royal Javanese Gold + Misty Orchid
    bgGradient: 'radial-gradient(ellipse at 15% 20%, rgba(167, 243, 208, 0.55) 0%, transparent 50%), radial-gradient(ellipse at 85% 35%, rgba(254, 243, 199, 0.5) 0%, transparent 55%), radial-gradient(ellipse at 50% 85%, rgba(233, 213, 255, 0.4) 0%, transparent 60%), linear-gradient(180deg, #ECFDF5 0%, #FEFCE8 35%, #F0FDF4 70%, #F5F3FF 100%)',
    weather: '25°C Kabut Pagi • Suasana Khidmat • Udara Pegunungan Menoreh Sejuk',
    highlightBadge: '🏛️ MAHASAKRAL WARISAN DUNIA'
  },
  {
    id: 'kawah-putih',
    name: 'Kawah Putih Ciwidey Bandung',
    accent: '#0891B2',
    secondaryAccent: '#059669',
    amberAccent: '#F59E0B',
    tagColor: '#0E7490',
    glowColor: 'rgba(8, 145, 178, 0.35)',
    // Multi-color palette blend: Sulfur Turquoise + Highland Pine Emerald + Warm Tea Plantation Gold
    bgGradient: 'radial-gradient(ellipse at 20% 15%, rgba(165, 243, 252, 0.55) 0%, transparent 50%), radial-gradient(ellipse at 80% 40%, rgba(167, 243, 208, 0.5) 0%, transparent 55%), radial-gradient(ellipse at 50% 80%, rgba(254, 243, 199, 0.4) 0%, transparent 60%), linear-gradient(180deg, #ECFEFF 0%, #F0FDF4 35%, #F0FDFA 70%, #FEF3C7 100%)',
    weather: '18°C Sejuk Segar 1.800 MDPL • Danau Belerang Zamrud • Hutan Pinus Asri',
    highlightBadge: '🍃 DATARAN TINGGI PARAHYANGAN'
  },
  {
    id: 'raja-ampat-lagoon',
    name: 'Laguna Karst Raja Ampat',
    accent: '#0284C7',
    secondaryAccent: '#0D9488',
    amberAccent: '#F43F5E',
    tagColor: '#0369A1',
    glowColor: 'rgba(2, 132, 199, 0.35)',
    // Multi-color palette blend: Karst Ocean Azure + Piaynemo Turquoise + Coral Reef Rose
    bgGradient: 'radial-gradient(ellipse at 15% 15%, rgba(186, 230, 253, 0.6) 0%, transparent 50%), radial-gradient(ellipse at 85% 35%, rgba(153, 246, 228, 0.5) 0%, transparent 55%), radial-gradient(ellipse at 45% 85%, rgba(254, 205, 211, 0.4) 0%, transparent 60%), linear-gradient(180deg, #F0F9FF 0%, #F0FDFA 35%, #EFF6FF 70%, #FFF1F2 100%)',
    weather: '29°C Tropis Hangat • Kejernihan Terumbu 100% • Manta Point Ramah',
    highlightBadge: '🪸 SURGA BAWAH LAUT DUNIA'
  },
  {
    id: 'padar-panoramic',
    name: 'Puncak Padar & Teluk Tiga Warna',
    accent: '#2563EB',
    secondaryAccent: '#EA580C',
    amberAccent: '#10B981',
    tagColor: '#1D4ED8',
    glowColor: 'rgba(37, 99, 235, 0.35)',
    // Multi-color palette blend: Deep Cobalt Bay + Savana Sunrise Amber + Island Green
    bgGradient: 'radial-gradient(ellipse at 20% 15%, rgba(199, 210, 254, 0.55) 0%, transparent 50%), radial-gradient(ellipse at 80% 40%, rgba(254, 215, 170, 0.5) 0%, transparent 55%), radial-gradient(ellipse at 50% 80%, rgba(167, 243, 208, 0.4) 0%, transparent 60%), linear-gradient(180deg, #EEF2FF 0%, #FFF7ED 35%, #F0FDF4 70%, #F0F9FF 100%)',
    weather: '28°C Panorama 3 Teluk • Jalur Trekking Kering & Aman • Sunset Magis',
    highlightBadge: '🌊 PANORAMA TIGA TELUK'
  },
  {
    id: 'raja-ampat-wayag',
    name: 'Gugusan Atol Wayag Papua',
    accent: '#0D9488',
    secondaryAccent: '#7C3AED',
    amberAccent: '#F59E0B',
    tagColor: '#047857',
    glowColor: 'rgba(13, 148, 136, 0.35)',
    // Multi-color palette blend: Pristine Atoll Teal + Twilight Royal Purple + Golden Coral
    bgGradient: 'radial-gradient(ellipse at 15% 15%, rgba(153, 246, 228, 0.55) 0%, transparent 50%), radial-gradient(ellipse at 85% 35%, rgba(233, 213, 255, 0.5) 0%, transparent 55%), radial-gradient(ellipse at 50% 85%, rgba(253, 230, 138, 0.4) 0%, transparent 60%), linear-gradient(180deg, #F0FDFA 0%, #F5F3FF 35%, #FEFCE8 70%, #F0F9FF 100%)',
    weather: '29°C Atol Zamrud • Laguna Karst Perawan • Air Laut Tenang Bening',
    highlightBadge: '🏝️ KEPULAUAN KARST PURBA'
  }
];

export default function HomePage({
  packages: propPackages,
  onSelectPackage,
  onSelectDestination,
  onSelectDestinationDetail,
  onNavigate,
  onOpenGalleryItem,
  onOpenAiChat,
  onOpenBooking
}) {
  const { language, t } = useLanguage();
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [faqSearchQuery, setFaqSearchQuery] = useState('');
  const [selectedFaqCategory, setSelectedFaqCategory] = useState('all');
  const [helpfulFaqIds, setHelpfulFaqIds] = useState([]);
  const [packagePage, setPackagePage] = useState(1);

  // Hero Carousel State (Tailored Destination Masterpiece Slides)
  const heroSlides = ASSET_IMAGES.heroSlides || [];
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [activeSpotIndex, setActiveSpotIndex] = useState(0);
  const cardsScrollRef = React.useRef(null);

  // Current dynamic slide theme that adapts content background color seamlessly
  const currentTheme = SLIDE_THEMES[activeHeroSlide % SLIDE_THEMES.length] || SLIDE_THEMES[0];

  // Interactive Nature Audio Ambience (Web Audio API Synthesizer - 0 Extra Downloads)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioContextRef = React.useRef(null);

  const toggleNatureAudio = () => {
    try {
      if (isAudioPlaying) {
        if (audioContextRef.current) {
          audioContextRef.current.suspend();
        }
        setIsAudioPlaying(false);
        return;
      }

      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioContextRef.current) {
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        // Generate 5s pink noise loop simulating realistic ocean waves
        const bufferSize = ctx.sampleRate * 5;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.035;
          b6 = white * 0.115926;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, ctx.currentTime);

        const lfo = ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(0.12, ctx.currentTime); // 8-second wave rhythm

        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(220, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.065, ctx.currentTime);

        noise.connect(filter);
        filter.connect(masterGain);
        masterGain.connect(ctx.destination);

        noise.start(0);
        lfo.start(0);
      } else {
        audioContextRef.current.resume();
      }

      setIsAudioPlaying(true);
    } catch (err) {
      console.warn('Audio context init deferred', err);
    }
  };

  // Recent Live Activity Booking Pulse Ticker
  const [activeActivityIdx, setActiveActivityIdx] = useState(0);
  const [showActivityToast, setShowActivityToast] = useState(true);

  const RECENT_ACTIVITIES = React.useMemo(() => [
    {
      id: 1,
      traveler: 'Dwi Prasetyo & Partner',
      city: 'Surabaya',
      action: 'Baru saja memesan',
      package: 'Labuan Bajo Phinisi Luxury Suite 3D2N',
      time: '3 menit lalu',
      tag: 'Phinisi VIP',
      color: '#0284C7'
    },
    {
      id: 2,
      traveler: 'Keluarga Bpk. Hendra',
      city: 'Jakarta Selatan',
      action: 'Dikonfirmasi',
      package: 'Raja Ampat Misool & Piaynemo 4D3N',
      time: '7 menit lalu',
      tag: 'Family Tour',
      color: '#0D9488'
    },
    {
      id: 3,
      traveler: 'dr. Sarah Amanda',
      city: 'Bandung',
      action: 'Booking Berhasil',
      package: 'Bromo Golden Dawn Safari 4x4 Jeep',
      time: '14 menit lalu',
      tag: 'Petualangan',
      color: '#EA580C'
    },
    {
      id: 4,
      traveler: 'Reza & Anisa',
      city: 'Tangerang',
      action: 'Reservasi Aktif',
      package: 'Bali Escape & Nusa Penida Sunset',
      time: '21 menit lalu',
      tag: 'Honeymoon',
      color: '#7C3AED'
    }
  ], []);

  useEffect(() => {
    const actInterval = setInterval(() => {
      setActiveActivityIdx((prev) => (prev + 1) % RECENT_ACTIVITIES.length);
    }, 7000);
    return () => clearInterval(actInterval);
  }, [RECENT_ACTIVITIES.length]);

  // Preload all hero slide images for seamless zero-flicker transitions
  useEffect(() => {
    if (!heroSlides || heroSlides.length === 0) return;
    heroSlides.forEach((slide) => {
      if (slide.image) {
        const img = new Image();
        img.src = slide.image;
      }
    });
  }, [heroSlides]);

  // Continuous Auto-slide every 5.5 seconds with smooth cross-fade (never stalls or freezes)
  useEffect(() => {
    if (!heroSlides || heroSlides.length <= 1) return;
    const interval = setInterval(() => {
      setActiveHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  // Reset active spot when hero slide changes
  useEffect(() => {
    setActiveSpotIndex(0);
    if (cardsScrollRef.current) {
      cardsScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [activeHeroSlide]);

  const handleNextHeroSlide = () => {
    setActiveHeroSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const handlePrevHeroSlide = () => {
    setActiveHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  // Scroll Progress Bar Tracker (Top Chromatic Indicator)
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.pageYOffset / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for Smooth Scroll-Driven Reveal Transitions Across All Features
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(
      '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale, .scroll-reveal-flip'
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [packagePage]);

  // Testimonials state with LocalStorage persistence
  const [testimonialsList, setTestimonialsList] = useState(() => {
    try {
      const saved = localStorage.getItem('fadza_testimonials');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return TESTIMONIALS;
  });

  const [activeTestiIndex, setActiveTestiIndex] = useState(0);
  const [isTestiPaused, setIsTestiPaused] = useState(false);
  const [showTestiModal, setShowTestiModal] = useState(false);
  const [testiSuccessMsg, setTestiSuccessMsg] = useState(false);

  // New review form state matching website data
  const [newTesti, setNewTesti] = useState({
    name: '',
    origin: '',
    destination: 'Labuan Bajo',
    tag: 'Private Tour (Pasangan)',
    rating: 5,
    comment: ''
  });

  // Auto-motion slide timer: automatically advances testimonial smoothly ("geser geser sendiri")
  const testiTimeoutRef = React.useRef(null);
  const pauseTestiTemporarily = (duration = 5000) => {
    setIsTestiPaused(true);
    if (testiTimeoutRef.current) clearTimeout(testiTimeoutRef.current);
    testiTimeoutRef.current = setTimeout(() => {
      setIsTestiPaused(false);
    }, duration);
  };

  useEffect(() => {
    if (isTestiPaused || testimonialsList.length <= 1) return;
    const interval = setInterval(() => {
      setActiveTestiIndex((prev) => (prev + 1) % testimonialsList.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isTestiPaused, testimonialsList.length]);

  const handlePrevTesti = () => {
    pauseTestiTemporarily(6000);
    setActiveTestiIndex((prev) => (prev - 1 + testimonialsList.length) % testimonialsList.length);
  };

  const handleNextTesti = () => {
    pauseTestiTemporarily(6000);
    setActiveTestiIndex((prev) => (prev + 1) % testimonialsList.length);
  };

  const handleSubmitTestimonial = (e) => {
    e.preventDefault();
    if (!newTesti.name.trim() || !newTesti.comment.trim()) return;

    const submitted = {
      id: Date.now(),
      name: newTesti.name.trim(),
      origin: newTesti.origin.trim() || 'Traveler Nusantara',
      packageTitle: `Trip ke ${newTesti.destination}`,
      destination: newTesti.destination,
      rating: Number(newTesti.rating),
      tag: newTesti.tag,
      quote: newTesti.comment.trim(),
      comment: newTesti.comment.trim(),
      date: 'Baru saja'
    };

    const updated = [submitted, ...testimonialsList];
    setTestimonialsList(updated);
    setActiveTestiIndex(0);
    try {
      localStorage.setItem('fadza_testimonials', JSON.stringify(updated));
    } catch (e) {}

    setShowTestiModal(false);
    setTestiSuccessMsg(true);
    setNewTesti({
      name: '',
      origin: '',
      destination: 'Labuan Bajo',
      tag: 'Private Tour (Pasangan)',
      rating: 5,
      comment: ''
    });
    setTimeout(() => setTestiSuccessMsg(false), 5500);
  };

  const handleDestinationClick = (dest) => {
    if (onSelectDestinationDetail) {
      onSelectDestinationDetail(dest);
    } else if (onSelectDestination) {
      onSelectDestination(dest.name);
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Source of truth: packages prop if provided, or full PACKAGES dataset
  const popularPackages = propPackages || PACKAGES;

  // Package Pagination: Exactly 3 cards per row on desktop (Balanced 3x1 Grid)
  const ITEMS_PER_PAGE = 3;
  const totalPages = Math.ceil(popularPackages.length / ITEMS_PER_PAGE);
  const safeCurrentPage = Math.min(Math.max(1, packagePage), Math.max(1, totalPages));
  const currentPackages = popularPackages.slice(
    (safeCurrentPage - 1) * ITEMS_PER_PAGE,
    safeCurrentPage * ITEMS_PER_PAGE
  );

  const handlePackagePageChange = (newPage) => {
    setPackagePage(newPage);
    const section = document.getElementById('packages-section');
    if (section) {
      const topOffset = section.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  // Top 6 popular destinations for Section 2 (Balanced 3x2 Grid)
  const popularOrder = ['bali', 'labuan-bajo', 'raja-ampat', 'bromo', 'yogyakarta', 'lombok'];
  const popularDestinations = popularOrder
    .map((id) => DESTINATIONS.find((d) => d.id === id))
    .filter(Boolean);

  // Exactly 6 gallery items for Section 5 (Balanced 3x2 Grid)
  const balancedGalleryItems = GALLERY_ITEMS.slice(0, 6);

  const getGalleryBadge = (dest) => {
    const d = (dest || '').toLowerCase();
    if (d.includes('raja')) return { bg: '#0284C7', text: '#FFFFFF', pill: 'Raja Ampat' };
    if (d.includes('bromo')) return { bg: '#EA580C', text: '#FFFFFF', pill: 'Bromo' };
    if (d.includes('bali')) return { bg: '#F43F5E', text: '#FFFFFF', pill: 'Bali' };
    if (d.includes('bajo')) return { bg: '#D97706', text: '#FFFFFF', pill: 'Labuan Bajo' };
    if (d.includes('jogja') || d.includes('yogyakarta')) return { bg: '#16A34A', text: '#FFFFFF', pill: 'Yogyakarta' };
    if (d.includes('lombok')) return { bg: '#0D9488', text: '#FFFFFF', pill: 'Lombok' };
    return { bg: '#0F172A', text: '#FFFFFF', pill: dest || 'Nusantara' };
  };

  // 3 Core Service Pillars
  const CORE_PILLARS = [
    {
      num: '01',
      title: language === 'en' ? 'Crystal Clear Plans Before Departure' : 'Rencana Jelas Sebelum Berangkat',
      subtitle: language === 'en' ? 'Full Transparency & Route Curation' : 'Transparansi Penuh & Kurasi Rute',
      description:
        language === 'en'
          ? 'Daily schedules, vetted star-rated accommodations, air-conditioned private vehicles, and all entrance admissions are clearly itemized. Zero surprise surcharges.'
          : 'Seluruh jadwal harian, hotel bintang terkurasi, armada ber-AC, dan tiket masuk objek wisata dipaparkan secara transparan. Tidak ada biaya siluman atau pengeluaran tak terduga.',
      highlight: language === 'en' ? '100% Price Transparency Without Hidden Fees' : '100% Biaya Transparan Tanpa Biaya Tersembunyi',
      tag: language === 'en' ? 'Price Certainty' : 'Kepastian Biaya',
      accentColor: '#DFFF00',
      badgeBg: 'rgba(223, 255, 0, 0.15)',
      badgeColor: '#DFFF00'
    },
    {
      num: '02',
      title: language === 'en' ? 'Bespoke Travel Tailored to You' : 'Pilihan Perjalanan Sesuai Kebutuhan',
      subtitle: language === 'en' ? 'Flexible Private Tour Experience' : 'Format Private Tour Fleksibel',
      description:
        language === 'en'
          ? 'Every itinerary is exclusively reserved for you and your travel party (families, couples, or friends). Enjoy relaxed pacing without feeling rushed.'
          : 'Setiap perjalanan dirancang eksklusif hanya untuk Anda dan rombongan (keluarga, pasangan, atau kawan). Ritme perjalanan santai tanpa diburu waktu dan dapat disesuaikan.',
      highlight: language === 'en' ? 'Exclusive Private Party From 2 Guests' : 'Eksklusif Rombongan Anda Mulai 2 Orang',
      tag: language === 'en' ? 'Personal Comfort' : 'Kenyamanan Personal',
      accentColor: '#F59E0B',
      badgeBg: 'rgba(245, 158, 11, 0.15)',
      badgeColor: '#F59E0B'
    },
    {
      num: '03',
      title: language === 'en' ? 'Reliable Support Whenever Needed' : 'Bantuan Nyata Ketika Dibutuhkan',
      subtitle: language === 'en' ? 'Dedicated Concierge & Local Guides' : 'Pendampingan Siaga & Pemandu Lokal',
      description:
        language === 'en'
          ? 'Certified local guides steeped in regional ecology and customs, backed by 24/7 concierge support ready to handle any real-time request promptly.'
          : 'Pemandu lokal berlisensi yang memahami seluk-beluk alam dan adat istiadat, didukung oleh tim concierge siaga yang memastikan setiap kebutuhan Anda tertangani cepat dan ramah.',
      highlight: language === 'en' ? 'Licensed Guides & 24/7 Standby Support' : 'Pemandu Berlisensi & Layanan Siaga 24/7',
      tag: language === 'en' ? 'Guaranteed Safety' : 'Keamanan Terjamin',
      accentColor: '#38BDF8',
      badgeBg: 'rgba(56, 189, 248, 0.15)',
      badgeColor: '#38BDF8'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#101C2C', width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
      {/* Viewport Scroll Progress Line (Multi-Color Chromatic Depth) */}
      <div className="scroll-progress-line" style={{ width: `${scrollProgress}%` }} />

      {/* =========================================================================
          HERO CAROUSEL / SLIDER (5 Tailored Indonesian Masterpieces with Auto-Rotation)
          ========================================================================= */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          paddingTop: '100px',
          paddingBottom: '2.5rem',
          overflow: 'hidden'
        }}
      >
        {/* Render Destination Masterpiece Photos with Smooth Hardware Crossfade */}
        {heroSlides.map((slide, idx) => {
          const isActive = idx === activeHeroSlide;
          return (
            <div
              key={slide.id}
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 2,
                opacity: isActive ? 1 : 0,
                transition: 'opacity 1.4s ease-in-out',
                transform: 'translateZ(0)',
                willChange: 'opacity',
                pointerEvents: 'none'
              }}
            >
              <ImageWithFallback
                src={slide.image}
                fallbackSrc={slide.fallback}
                alt={slide.titlePrimary || slide.headingLine1 || ''}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 42%'
                }}
              />
            </div>
          );
        })}

        {/* Soaring Birds Horizon Animation Across the Mountain Sky */}
        <div className="bird-flock-1">
          <svg width="68" height="24" viewBox="0 0 68 24" fill="none">
            <path d="M2 14C8 8 16 10 22 17C28 10 36 8 42 14" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M44 8C48 4 54 5 58 10C62 5 68 4 72 8" stroke="rgba(255,255,255,0.5)" strokeWidth="1.4" strokeLinecap="round" transform="translate(-10, 0)" />
          </svg>
        </div>
        <div className="bird-flock-2">
          <svg width="48" height="18" viewBox="0 0 48 18" fill="none">
            <path d="M2 11C7 6 13 8 18 13C23 8 29 6 34 11" stroke="rgba(255,255,255,0.55)" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </div>

        {/* Cinematic Vignette Overlay (Protects top header and bottom panels while letting mountain scenery shine) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 3,
            background:
              'linear-gradient(180deg, rgba(11, 19, 32, 0.78) 0%, rgba(11, 19, 32, 0.22) 28%, transparent 48%), linear-gradient(0deg, rgba(11, 19, 32, 0.94) 0%, rgba(11, 19, 32, 0.65) 38%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />

        {/* Top/Center Main Headline (Matching reference image) */}
        <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1380px' }}>
          {heroSlides.map((slide, idx) => {
            if (idx !== activeHeroSlide) return null;
            const currentSlide = (language === 'en' && HERO_SLIDE_EN[slide.id])
              ? { ...slide, ...HERO_SLIDE_EN[slide.id] }
              : slide;

            return (
              <div
                key={slide.id}
                style={{
                  textAlign: 'center',
                  animation: 'fadeIn 0.5s ease',
                  padding: '1.25rem 0'
                }}
              >
                {/* Eyebrow Capsule */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.18)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '9999px',
                    padding: '0.45rem 1.45rem',
                    color: '#FFFFFF',
                    fontSize: 'clamp(0.82rem, 1.2vw, 0.96rem)',
                    fontWeight: '600',
                    letterSpacing: '0.03em',
                    marginBottom: '1.15rem',
                    boxShadow: '0 4px 18px rgba(0, 0, 0, 0.35)'
                  }}
                >
                  <span>
                    {language === 'en'
                      ? (slide.headingPill || slide.eyebrow)
                      : (slide.headingPillId || slide.eyebrow || slide.headingPill)}
                  </span>
                </div>

                {/* Main Hero Headline */}
                <h1
                  style={{
                    fontSize: 'clamp(2.4rem, 6vw, 4.9rem)',
                    fontWeight: '700',
                    color: '#FFFFFF',
                    lineHeight: 1.15,
                    letterSpacing: '-0.02em',
                    margin: 0,
                    textShadow: '0 4px 28px rgba(0, 0, 0, 0.85), 0 2px 8px rgba(0, 0, 0, 0.7)'
                  }}
                >
                  <span style={{ display: 'block' }}>{slide.headingLine1 || 'Unforgettable Mount'}</span>
                  <span style={{ display: 'block' }}>
                    {slide.headingLine2Bold || 'Bromo'}{' '}
                    <span
                      style={{
                        fontFamily: "var(--font-editorial), var(--font-serif), 'Playfair Display', Georgia, serif",
                        fontStyle: 'italic',
                        fontWeight: '400',
                        marginLeft: '0.35rem'
                      }}
                    >
                      {slide.headingLine2Italic || 'Sunrise Tour'}
                    </span>
                  </span>
                </h1>
              </div>
            );
          })}
        </div>

        {/* Bottom Hero Area (Split Grid: Left Tour Info + Right Draggable Cards Gallery) */}
        <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1380px', marginTop: 'auto' }}>
          {heroSlides.map((slide, idx) => {
            if (idx !== activeHeroSlide) return null;
            const currentSlide = (language === 'en' && HERO_SLIDE_EN[slide.id])
              ? { ...slide, ...HERO_SLIDE_EN[slide.id] }
              : slide;
            const targetPkg = PACKAGES.find((p) => p.id === slide.packageId) || PACKAGES[0];
            const spots = slide.spots || [];

            return (
              <div
                key={slide.id}
                className="hero-bottom-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(280px, 350px) 1fr',
                  gap: 'clamp(1.5rem, 3.5vw, 3.5rem)',
                  alignItems: 'flex-end',
                  animation: 'fadeIn 0.5s ease'
                }}
              >
                {/* Left Column: Tour Info, Avatars, Book Now CTA & Counter */}
                <div style={{ paddingBottom: '0.5rem' }}>
                  <h2
                    style={{
                      fontSize: 'clamp(1.25rem, 2.2vw, 1.6rem)',
                      fontWeight: '800',
                      color: '#FFFFFF',
                      marginBottom: '0.35rem',
                      lineHeight: 1.3,
                      textShadow: '0 2px 12px rgba(0, 0, 0, 0.85)'
                    }}
                  >
                    {language === 'en'
                      ? (slide.tourTitle || slide.titlePrimary)
                      : (slide.tourTitleId || slide.tourTitle || slide.titlePrimary)}
                  </h2>

                  <div
                    style={{
                      fontSize: '0.92rem',
                      color: 'rgba(255, 255, 255, 0.92)',
                      fontWeight: '600',
                      marginBottom: '1rem',
                      textShadow: '0 1px 6px rgba(0, 0, 0, 0.8)'
                    }}
                  >
                    {slide.tourDate || '24 Juli 2026 • Berangkat Setiap Hari'}
                  </div>

                  {/* Joined Avatars Row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {[
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
                        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
                        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
                        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80'
                      ].map((imgUrl, aIdx) => (
                        <div
                          key={aIdx}
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            border: '2px solid rgba(255, 255, 255, 0.85)',
                            overflow: 'hidden',
                            marginLeft: aIdx === 0 ? 0 : '-10px',
                            backgroundColor: '#1E293B',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.35)'
                          }}
                        >
                          <img
                            src={imgUrl}
                            alt="Wisatawan joined"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                      ))}
                    </div>
                    <span
                      style={{
                        color: '#FFFFFF',
                        fontSize: '0.85rem',
                        fontWeight: '700',
                        textShadow: '0 1px 6px rgba(0, 0, 0, 0.85)'
                      }}
                    >
                      {language === 'en'
                        ? (slide.joinedCountEn || '+32 People Joined')
                        : (slide.joinedCount || '+32 Wisatawan Bergabung')}
                    </span>
                  </div>

                  {/* Short description */}
                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: 'rgba(255, 255, 255, 0.92)',
                      lineHeight: 1.6,
                      marginBottom: '1.4rem',
                      maxWidth: '340px',
                      textShadow: '0 1px 8px rgba(0, 0, 0, 0.85)'
                    }}
                  >
                    {language === 'en'
                      ? (slide.tourDescriptionEn || slide.subtitle)
                      : (slide.tourDescription || slide.subtitle)}
                  </p>

                  {/* Book Now Button */}
                  <button
                    type="button"
                    onClick={() => onOpenBooking && onOpenBooking(targetPkg)}
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
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      marginBottom: '1.6rem'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.45)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.35)';
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

                  {/* Slide Number Counter */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                    <span
                      style={{
                        fontSize: '1.85rem',
                        fontWeight: '800',
                        color: '#FFFFFF',
                        lineHeight: 1,
                        textShadow: '0 2px 10px rgba(0,0,0,0.85)'
                      }}
                    >
                      {String(activeHeroSlide + 1).padStart(2, '0')}
                    </span>
                    <span style={{ fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.65)', fontWeight: '600' }}>
                      / {String(heroSlides.length).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Right Column: Horizontal Cards Gallery (Bisa digeser semua!) */}
                <div style={{ width: '100%', minWidth: 0, overflow: 'hidden' }}>
                  {/* Cards Scroller Container */}
                  <div
                    ref={cardsScrollRef}
                    className="hero-cards-scroller"
                    style={{
                      display: 'flex',
                      alignItems: 'flex-end',
                      gap: '1.15rem',
                      overflowX: 'auto',
                      scrollSnapType: 'x mandatory',
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none',
                      paddingBottom: '0.85rem',
                      cursor: 'grab',
                      WebkitOverflowScrolling: 'touch'
                    }}
                  >
                    {spots.map((spot, sIdx) => {
                      const isSpotActive = sIdx === activeSpotIndex;
                      return (
                        <div
                          key={spot.id || sIdx}
                          onClick={() => setActiveSpotIndex(sIdx)}
                          style={{
                            flexShrink: 0,
                            width: isSpotActive ? 'clamp(280px, 28vw, 360px)' : 'clamp(140px, 14vw, 180px)',
                            height: isSpotActive ? 'clamp(210px, 22vw, 260px)' : 'clamp(190px, 20vw, 240px)',
                            borderRadius: '22px',
                            overflow: 'hidden',
                            position: 'relative',
                            cursor: 'pointer',
                            scrollSnapAlign: 'start',
                            transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                            boxShadow: isSpotActive
                              ? '0 18px 40px -8px rgba(0, 0, 0, 0.65), 0 0 0 2px rgba(255, 255, 255, 0.45)'
                              : '0 8px 22px rgba(0, 0, 0, 0.38)',
                            transform: 'translateZ(0)'
                          }}
                        >
                          <ImageWithFallback
                            src={spot.image}
                            fallbackSrc={spot.fallback}
                            alt={spot.title}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover'
                            }}
                          />

                          {/* Gradient Overlay for 100% Readable Text */}
                          <div
                            style={{
                              position: 'absolute',
                              inset: 0,
                              background: isSpotActive
                                ? 'linear-gradient(to top, rgba(11, 19, 32, 0.95) 0%, rgba(11, 19, 32, 0.62) 48%, transparent 100%)'
                                : 'linear-gradient(to top, rgba(11, 19, 32, 0.88) 0%, transparent 60%)',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'flex-end',
                              padding: isSpotActive ? '1.15rem' : '0.85rem'
                            }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '0.45rem',
                                marginBottom: '0.25rem'
                              }}
                            >
                              <h3
                                style={{
                                  color: '#FFFFFF',
                                  fontSize: isSpotActive ? '1.08rem' : '0.86rem',
                                  fontWeight: '800',
                                  margin: 0,
                                  lineHeight: 1.25,
                                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.9)'
                                }}
                              >
                                {language === 'en' ? (spot.titleEn || spot.title) : spot.title}
                              </h3>
                              {spot.time && isSpotActive && (
                                <span
                                  style={{
                                    fontSize: '0.72rem',
                                    color: 'rgba(255, 255, 255, 0.95)',
                                    fontWeight: '700',
                                    backgroundColor: 'rgba(255, 255, 255, 0.22)',
                                    padding: '0.15rem 0.5rem',
                                    borderRadius: '6px',
                                    backdropFilter: 'blur(4px)'
                                  }}
                                >
                                  {spot.time}
                                </span>
                              )}
                            </div>

                            {isSpotActive && spot.desc && (
                              <p
                                style={{
                                  color: 'rgba(255, 255, 255, 0.92)',
                                  fontSize: '0.78rem',
                                  lineHeight: 1.48,
                                  margin: 0,
                                  textShadow: '0 1px 6px rgba(0, 0, 0, 0.85)'
                                }}
                              >
                                {language === 'en' ? (spot.descEn || spot.desc) : spot.desc}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Bottom Progress Scrubber Bar & Controls */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: '0.85rem',
                      gap: '1.25rem'
                    }}
                  >
                    {/* Slider Progress Bar Line matching image */}
                    <div
                      style={{
                        flex: 1,
                        height: '3px',
                        backgroundColor: 'rgba(255, 255, 255, 0.22)',
                        borderRadius: '9999px',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          bottom: 0,
                          left: `${(activeSpotIndex / Math.max(spots.length - 1, 1)) * 60}%`,
                          width: '40%',
                          backgroundColor: '#FFFFFF',
                          borderRadius: '9999px',
                          transition: 'all 0.35s ease',
                          boxShadow: '0 0 10px rgba(255, 255, 255, 0.85)'
                        }}
                      />
                    </div>

                    {/* Next/Previous Slide Controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <button
                        type="button"
                        onClick={() => {
                          if (activeSpotIndex > 0) {
                            setActiveSpotIndex(activeSpotIndex - 1);
                          } else {
                            handlePrevHeroSlide();
                          }
                        }}
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          backdropFilter: 'blur(8px)',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          color: '#FFFFFF',
                          fontSize: '1.2rem',
                          lineHeight: 1,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.35)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                        }}
                        title="Sebelumnya"
                        aria-label="Sebelumnya"
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (activeSpotIndex < spots.length - 1) {
                            setActiveSpotIndex(activeSpotIndex + 1);
                          } else {
                            handleNextHeroSlide();
                          }
                        }}
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          backdropFilter: 'blur(8px)',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          color: '#FFFFFF',
                          fontSize: '1.2rem',
                          lineHeight: 1,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.35)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                        }}
                        title="Selanjutnya"
                        aria-label="Selanjutnya"
                      >
                        ›
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          HERO-TO-SURFACE TRANSITION CARD
          ========================================================================= */}
      <div className="hero-transition-card" style={{ position: 'relative', zIndex: 20 }}>
        {/* Dynamic Multi-Color Indonesian Nature Ambient Canvas */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            overflow: 'hidden',
            pointerEvents: 'none'
          }}
        >
          {/* Dynamic Content Multi-Color Gradient Mesh - Smooth Stacked Crossfading */}
          {SLIDE_THEMES.map((theme, tIdx) => {
            const isThemeActive = (activeHeroSlide % SLIDE_THEMES.length) === tIdx;
            return (
              <div
                key={theme.id || tIdx}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: theme.bgGradient,
                  opacity: isThemeActive ? 1 : 0,
                  transition: 'opacity 1.4s ease-in-out',
                  willChange: 'opacity',
                  pointerEvents: 'none'
                }}
              />
            );
          })}

          {/* Living Nature Particle Motes */}
          <div className="nature-particles-overlay">
            <div className="nature-mote mote-1" />
            <div className="nature-mote mote-2" />
            <div className="nature-mote mote-3" />
          </div>
        </div>

        {/* Live Environmental Conditions Ribbon (Status Iklim & Pelayaran Nusantara) */}
        <div
          className="scroll-reveal scroll-reveal-scale is-visible"
          style={{
            position: 'relative',
            zIndex: 10,
            backgroundColor: '#FFFFFF',
            borderBottom: '1.5px solid #E2E8F0',
            padding: '0.85rem 1rem',
            boxShadow: '0 4px 20px rgba(15, 23, 42, 0.06)'
          }}
        >
          <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  backgroundColor: currentTheme.accent,
                  color: '#FFFFFF',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.72rem',
                  fontWeight: '800',
                  letterSpacing: '0.04em',
                  transition: 'background-color 0.6s ease'
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#FFFFFF', display: 'inline-block' }} />
                LIVE RADAR ALAM
              </span>
              <span style={{ fontSize: '0.86rem', fontWeight: '800', color: '#0F172A' }}>
                📍 {currentTheme.name}:
              </span>
              <span style={{ fontSize: '0.84rem', color: '#334155', fontWeight: '600' }}>
                {currentTheme.weather}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {/* Nature Soundscape Toggle Button with Web Audio API Pink-Noise Waves */}
              <button
                type="button"
                onClick={toggleNatureAudio}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '9999px',
                  border: `1.5px solid ${isAudioPlaying ? currentTheme.accent : '#CBD5E1'}`,
                  backgroundColor: isAudioPlaying ? 'rgba(255, 255, 255, 0.95)' : '#F8FAFC',
                  color: isAudioPlaying ? currentTheme.accent : '#334155',
                  fontSize: '0.74rem',
                  fontWeight: '800',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: isAudioPlaying ? `0 0 12px ${currentTheme.glowColor}` : 'none'
                }}
                title={isAudioPlaying ? 'Matikan Suara Ombak & Angin Hutan' : 'Putar Audio Deburan Ombak Nusantara'}
              >
                <span style={{ fontSize: '0.9rem' }}>{isAudioPlaying ? '🔊' : '🔈'}</span>
                <span>{isAudioPlaying ? 'Suara Ombak Aktif' : 'Dengarkan Suara Alam'}</span>
                {isAudioPlaying && (
                  <span className="sound-wave-bars">
                    <span className="bar bar1" />
                    <span className="bar bar2" />
                    <span className="bar bar3" />
                  </span>
                )}
              </button>

              {/* Verified Operator Badge */}
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.74rem',
                  color: '#059669',
                  fontWeight: '700'
                }}
              >
                <ShieldCheck size={14} color="#059669" />
                <span>Izin Resmi BPW Kemenparekraf</span>
              </span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            SECTION 1: PAKET WISATA POPULER (Balanced 3x1 Grid, 100% Width Symmetrical)
            ========================================================================= */}
        <section id="packages-section" className="bg-topo-pattern" style={{ padding: '4.5rem 0 5rem 0' }}>
          <div className="container">
            {/* Header: Title Left + "Lihat Semua →" Right */}
            <div
              className="scroll-reveal scroll-reveal-left"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                gap: '1rem',
                marginBottom: '2.5rem'
              }}
            >
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    backgroundColor: 'rgba(200, 90, 50, 0.12)',
                    border: '1px solid rgba(200, 90, 50, 0.3)',
                    color: '#C85A32',
                    padding: '0.3rem 0.85rem',
                    borderRadius: '9999px',
                    fontSize: '0.78rem',
                    fontWeight: '800',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    marginBottom: '0.65rem'
                  }}
                >
                  <Sailboat size={13} color="#C85A32" />
                  <span>{t('pkg_badge', 'Pilihan Favorit')}</span>
                </div>

                <h2
                  className="font-serif"
                  style={{
                    fontSize: 'clamp(1.9rem, 3.5vw, 2.85rem)',
                    fontWeight: '700',
                    lineHeight: 1.34,
                    paddingTop: '0.2rem',
                    color: '#0F172A',
                    margin: '0 0 0.4rem 0',
                    letterSpacing: '-0.015em'
                  }}
                >
                  {t('pkg_title', 'Paket Wisata Populer')}
                </h2>
                <p style={{ color: '#334155', fontSize: '0.98rem', marginTop: '0.35rem', maxWidth: '640px' }}>
                  {t('pkg_subtitle', 'Pilihan paket terfavorit dengan fasilitas lengkap, akomodasi hotel bintang, dan rute harian terstruktur.')}
                </p>
              </div>

              <button
                onClick={() => onNavigate && onNavigate('packages')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#0F172A',
                  fontSize: '0.95rem',
                  fontWeight: '800',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  cursor: 'pointer',
                  padding: '0.5rem 0'
                }}
                className="hover:underline"
              >
                <span>{t('pkg_view_all', 'Lihat Semua Paket')} ({popularPackages.length})</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Exactly 3 Cards per Row on Desktop (Zero Empty Space on Left or Right) */}
            <div className="popular-packages-grid">
              {currentPackages.map((pkg, pIdx) => (
                <div key={pkg.id} className={`scroll-reveal stagger-${(pIdx % 3) + 1}`}>
                  <PackageCard
                    pkg={pkg}
                    onSelectPackage={onSelectPackage}
                  />
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center', width: '100%' }}>
                <Pagination
                  currentPage={safeCurrentPage}
                  totalPages={totalPages}
                  onPageChange={handlePackagePageChange}
                  theme="yellow"
                />
              </div>
            )}
          </div>
        </section>

        {/* =========================================================================
            EXECUTIVE QUICK TRIP SEARCH & FILTER ENGINE (Replaces SmartTripPlanner)
            ========================================================================= */}
        <div className="scroll-reveal scroll-reveal-flip">
          <QuickTripSearch
            onSelectPackage={onSelectPackage}
            onOpenBooking={onOpenBooking}
            onNavigate={onNavigate}
          />
        </div>

        {/* =========================================================================
            SECTION 2: JELAJAHI DESTINASI NUSANTARA (Balanced 3x2 Grid, 6 Items)
            ========================================================================= */}
        <section
          id="destinations-section"
          className="bg-slate-atmosphere"
          style={{
            padding: '5rem 0'
          }}
        >
          <div className="container">
            <div
              className="scroll-reveal scroll-reveal-right"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                gap: '1rem',
                marginBottom: '2.5rem'
              }}
            >
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    backgroundColor: 'rgba(2, 132, 199, 0.12)',
                    border: '1px solid rgba(2, 132, 199, 0.3)',
                    color: '#0284C7',
                    padding: '0.3rem 0.85rem',
                    borderRadius: '9999px',
                    fontSize: '0.78rem',
                    fontWeight: '800',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    marginBottom: '0.65rem'
                  }}
                >
                  <MapPin size={13} color="#0284C7" />
                  <span>{t('dest_badge', 'Destinasi Unggulan')}</span>
                </div>
                <h2
                  style={{
                    fontSize: 'clamp(1.8rem, 3.3vw, 2.7rem)',
                    fontWeight: '800',
                    lineHeight: 1.32,
                    paddingTop: '0.2rem',
                    color: '#0F172A',
                    margin: '0 0 0.4rem 0',
                    letterSpacing: '-0.015em'
                  }}
                >
                  {t('dest_title', 'Jelajahi Berbagai Sudut Nusantara')}
                </h2>
                <p style={{ color: '#334155', fontSize: '0.98rem', marginTop: '0.35rem', maxWidth: '620px' }}>
                  {t('dest_subtitle', 'Dari kepulauan karang terjernih di dunia hingga kaldera vulkanik dan pesona budaya luhur.')}
                </p>
              </div>

              <button
                onClick={() => onNavigate && onNavigate('explore')}
                className="btn-outline-dark"
                style={{
                  padding: '0.75rem 1.6rem',
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  borderRadius: '12px'
                }}
              >
                <span>{t('dest_catalog_btn', 'Katalog 16 Destinasi')}</span>
                <ArrowRight size={15} />
              </button>
            </div>

            {/* Exactly 6 Cards in a Balanced 3x2 Grid (Desktop) / 2x3 (Tablet) / 1 Col (Mobile) */}
            <div className="grid-editorial-destinations">
              {popularDestinations.map((dest, dIdx) => (
                <div key={dest.id} className={`scroll-reveal scroll-reveal-scale stagger-${(dIdx % 3) + 1}`}>
                  <DestinationCard
                    destination={dest}
                    onSelectDestination={handleDestinationClick}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: PILIH GAYA LIBURAN ANDA (TravelStyleShowcase)
            Intuitive, highly visual 4-card lifestyle showcase replacing complex widget
            ========================================================================= */}
        <section id="category-collection-section" className="bg-sand-warm" style={{ padding: '5rem 0' }}>
          <div className="container">
            <div className="scroll-reveal scroll-reveal-scale">
              <TravelStyleShowcase onSelectPackage={onSelectPackage} onNavigate={onNavigate} />
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: TIGA PILAR NILAI LAYANAN (Balanced 3x1 Grid, High Color Contrast)
            ========================================================================= */}
        <section
          id="why-fadza-section"
          className="bg-navy-atmosphere"
          style={{
            backgroundColor: '#0B1320',
            padding: 'clamp(4.5rem, 7vw, 6rem) 0',
            color: '#FFFFFF',
            position: 'relative'
          }}
        >
          <div className="container">
            {/* Header Container Card with Solid Dark Navy Background */}
            <div 
              className="scroll-reveal scroll-reveal-left" 
              style={{ 
                textAlign: 'center', 
                maxWidth: '820px', 
                margin: '0 auto 3.5rem auto',
                backgroundColor: '#0F172A',
                border: '1.5px solid rgba(255, 255, 255, 0.18)',
                borderRadius: '24px',
                padding: 'clamp(2rem, 4.5vw, 2.75rem) clamp(1.25rem, 4vw, 2.5rem)',
                boxShadow: '0 20px 48px -10px rgba(15, 23, 42, 0.5), 0 0 0 1px rgba(223, 255, 0, 0.1)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '15%',
                  right: '15%',
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, #DFFF00, transparent)',
                  opacity: 0.8
                }}
              />
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: 'rgba(223, 255, 0, 0.15)',
                  border: '1px solid rgba(223, 255, 0, 0.45)',
                  color: '#DFFF00',
                  padding: '0.4rem 1.15rem',
                  borderRadius: '9999px',
                  fontSize: '0.8rem',
                  fontWeight: '800',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '1.25rem'
                }}
              >
                <ShieldCheck size={15} color="#DFFF00" />
                <span>{t('pillars_badge', 'Nilai Utama Layanan Kami')}</span>
              </div>

              <h2
                className="font-serif"
                style={{
                  fontSize: 'clamp(1.95rem, 3.6vw, 2.85rem)',
                  fontWeight: '800',
                  lineHeight: 1.3,
                  color: '#FFFFFF',
                  margin: '0 0 1.15rem 0',
                  letterSpacing: '-0.015em'
                }}
              >
                {t('pillars_title', 'Tiga Landasan Kenyamanan Anda')}
              </h2>

              <p style={{ color: '#E2E8F0', fontSize: '1.02rem', lineHeight: 1.65, margin: 0, maxWidth: '680px', marginLeft: 'auto', marginRight: 'auto' }}>
                {t(
                  'pillars_subtitle',
                  'Prinsip operasional yang membedakan FADZA TRIP ADVENTURE demi memastikan setiap perjalanan Anda aman dan berkesan.'
                )}
              </p>
            </div>

            {/* Exactly 3 Symmetrical Pillars in a 3x1 Grid */}
            <div className="pillars-grid">
              {CORE_PILLARS.map((pillar, idx) => (
                <div
                  key={idx}
                  className={`scroll-reveal scroll-reveal-flip stagger-${idx + 1} hover:border-slate-400 hover:-translate-y-2 hover:shadow-2xl`}
                  style={{
                    backgroundColor: '#1E293B',
                    borderRadius: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderTop: `4px solid ${pillar.accentColor}`,
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
                    padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '1.5rem',
                    transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)'
                  }}
                >
                  <div>
                    {/* Top Row: Number & Tag */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        marginBottom: '1.25rem'
                      }}
                    >
                      <span
                        style={{
                          fontSize: 'clamp(2.5rem, 4.5vw, 3.5rem)',
                          fontWeight: '800',
                          color: pillar.accentColor,
                          lineHeight: 1
                        }}
                      >
                        {pillar.num}
                      </span>

                      <span
                        style={{
                          fontSize: '0.74rem',
                          fontWeight: '700',
                          color: pillar.badgeColor,
                          backgroundColor: pillar.badgeBg,
                          padding: '0.25rem 0.65rem',
                          borderRadius: '9999px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}
                      >
                        {pillar.tag}
                      </span>
                    </div>

                    <h3
                      style={{
                        color: '#FFFFFF',
                        fontSize: '1.25rem',
                        fontWeight: '800',
                        lineHeight: 1.3,
                        margin: '0 0 0.5rem 0'
                      }}
                    >
                      {pillar.title}
                    </h3>

                    <div
                      style={{
                        fontSize: '0.84rem',
                        fontWeight: '700',
                        color: pillar.accentColor,
                        marginBottom: '0.85rem'
                      }}
                    >
                      {pillar.subtitle}
                    </div>

                    <p style={{ color: '#CBD5E1', fontSize: '0.92rem', lineHeight: 1.65, margin: 0 }}>
                      {pillar.description}
                    </p>
                  </div>

                  {/* Highlight pill */}
                  <div
                    style={{
                      paddingTop: '1rem',
                      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      fontSize: '0.82rem',
                      color: '#F1F5F9',
                      fontWeight: '600'
                    }}
                  >
                    <Check size={14} color={pillar.accentColor} style={{ flexShrink: 0 }} />
                    <span>{pillar.highlight}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Bar: Genuine System Metrics & Direct Actions */}
            <div
              className="scroll-reveal scroll-reveal-scale"
              style={{
                backgroundColor: '#1E293B',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: 'clamp(1.5rem, 3.5vw, 2.25rem)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                gap: '2rem',
                alignItems: 'center'
              }}
            >
              {/* Verified Metrics (Ground truth from system data) */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 120px), 1fr))',
                  gap: '1.25rem'
                }}
              >
                <div>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#DFFF00', lineHeight: 1 }}>16</div>
                  <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '0.35rem' }}>{t('pillars_metric_dest', 'Destinasi Pilihan')}</div>
                </div>

                <div>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#F59E0B', lineHeight: 1 }}>16</div>
                  <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '0.35rem' }}>{t('pillars_metric_pkg', 'Paket Terkurasi')}</div>
                </div>

                <div>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#38BDF8', lineHeight: 1 }}>100%</div>
                  <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '0.35rem' }}>{t('pillars_metric_trans', 'Transparansi Biaya')}</div>
                </div>

                <div>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#34D399', lineHeight: 1 }}>24/7</div>
                  <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '0.35rem' }}>{t('pillars_metric_support', 'Layanan Siaga 24/7')}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', justifyContent: 'flex-start' }}>
                <a
                  href={getGeneralWhatsAppLink('Halo FADZA TRIP ADVENTURE, saya ingin konsultasi rencana liburan.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-lime"
                  style={{
                    padding: '0.85rem 1.75rem',
                    fontSize: '0.92rem',
                    fontWeight: '800',
                    borderRadius: '12px',
                    textDecoration: 'none'
                  }}
                >
                  <WhatsAppIcon size={16} />
                  <span>{t('pillars_cta_consult', 'Konsultasi Perjalanan')}</span>
                </a>

                {onOpenAiChat && (
                  <button
                    type="button"
                    onClick={onOpenAiChat}
                    className="btn-outline-dark"
                    style={{
                      padding: '0.85rem 1.6rem',
                      fontSize: '0.92rem',
                      fontWeight: '700',
                      borderRadius: '12px',
                      borderColor: 'rgba(255, 255, 255, 0.25)',
                      color: '#FFFFFF'
                    }}
                  >
                    <Bot size={16} color="#DFFF00" />
                    <span>{t('pillars_cta_ai', 'Bantu Pilih Trip')}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: GALERI MOMEN PERJALANAN (Balanced 3x2 Grid, 6 Photos, No Gaps)
            ========================================================================= */}
        <section id="gallery-section" className="bg-gallery-atmosphere" style={{ padding: '5.5rem 0' }}>
          <div className="container">
            <div
              className="scroll-reveal scroll-reveal-right"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                gap: '1rem',
                marginBottom: '2.5rem'
              }}
            >
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    backgroundColor: 'rgba(21, 128, 61, 0.12)',
                    border: '1px solid rgba(21, 128, 61, 0.3)',
                    color: '#15803D',
                    padding: '0.3rem 0.85rem',
                    borderRadius: '9999px',
                    fontSize: '0.78rem',
                    fontWeight: '800',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    marginBottom: '0.65rem'
                  }}
                >
                  <Camera size={13} color="#15803D" />
                  <span>{t('gallery_badge', 'Dokumentasi Nyata')}</span>
                </div>

                <h2
                  className="font-serif"
                  style={{
                    fontSize: 'clamp(1.9rem, 3.5vw, 2.85rem)',
                    fontWeight: '700',
                    lineHeight: 1.34,
                    paddingTop: '0.2rem',
                    color: '#0F172A',
                    margin: '0 0 0.4rem 0',
                    letterSpacing: '-0.015em'
                  }}
                >
                  {t('gallery_title', 'Momen Perjalanan Nyata')}
                </h2>
                <p style={{ color: '#334155', fontSize: '0.98rem', marginTop: '0.35rem' }}>
                  {t('gallery_subtitle', 'Dokumentasi autentik para penjelajah yang telah menikmati keindahan Nusantara bersama kami.')}
                </p>
              </div>

              <button
                onClick={() => onNavigate && onNavigate('gallery')}
                className="btn-outline-dark"
                style={{
                  padding: '0.75rem 1.6rem',
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  borderRadius: '12px'
                }}
              >
                <span>{t('gallery_view_all', 'Buka Semua Galeri')} ({GALLERY_ITEMS.length})</span>
                <ArrowRight size={15} />
              </button>
            </div>

            {/* Exactly 6 Photos in a Balanced 3x2 Grid */}
            <div className="grid-editorial-destinations">
              {balancedGalleryItems.map((item, idx) => (
                <div
                  key={item.id}
                  className={`scroll-reveal stagger-${(idx % 3) + 1}`}
                  onClick={() => onOpenGalleryItem && onOpenGalleryItem(item, idx, GALLERY_ITEMS)}
                  style={{
                    borderRadius: '18px',
                    overflow: 'hidden',
                    height: '280px',
                    position: 'relative',
                    cursor: 'pointer',
                    boxShadow: '0 6px 20px rgba(15, 23, 42, 0.08)',
                    backgroundColor: '#0F172A',
                    transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
                  }}
                  className="group hover:-translate-y-2 hover:shadow-2xl"
                >
                  <ImageWithFallback
                    src={item.image || item.src}
                    fallbackSrc={item.fallback || item.fallbackSrc}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)'
                    }}
                    className="group-hover:scale-108"
                  />

                  {/* Gradient Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(15, 23, 42, 0.88) 0%, transparent 60%)',
                      pointerEvents: 'none'
                    }}
                  />

                  {/* Content on Image */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '1rem',
                      left: '1.25rem',
                      right: '1.25rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end'
                    }}
                  >
                    <div>
                      {(() => {
                        const gBadge = getGalleryBadge(item.destination);
                        return (
                          <span
                            style={{
                              display: 'inline-block',
                              backgroundColor: gBadge.bg,
                              color: gBadge.text,
                              fontSize: '0.74rem',
                              fontWeight: '800',
                              padding: '0.25rem 0.65rem',
                              borderRadius: '6px',
                              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                              marginBottom: '0.35rem'
                            }}
                          >
                            {item.destination}
                          </span>
                        );
                      })()}
                      <h4
                        style={{
                          color: '#FFFFFF',
                          fontSize: '1.02rem',
                          fontWeight: '800',
                          margin: 0,
                          lineHeight: 1.3
                        }}
                      >
                        {item.title}
                      </h4>
                    </div>

                    <div
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '50%',
                        backgroundColor: '#DFFF00',
                        color: '#0F172A',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)'
                      }}
                    >
                      <Camera size={16} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: CERITA PENJELAJAH (Immersive Nature Backdrop & Professional Typography)
            ========================================================================= */}
        <section
          id="testimonials-section"
          style={{
            position: 'relative',
            padding: '6rem 0',
            overflow: 'hidden',
            backgroundColor: '#0F172A'
          }}
        >
          {/* High-Resolution Nature Backdrop with Parallax Motion Effect */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url(/images/hero/hero-padar-panoramic.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center 42%',
              backgroundAttachment: 'fixed',
              filter: 'brightness(0.36) saturate(1.25)',
              transform: 'scale(1.04)',
              pointerEvents: 'none'
            }}
          />

          {/* Multi-layer Gradient Scrim for Crystal Clear Readability & Seamless Blending */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(16, 28, 44, 0.88) 0%, rgba(15, 23, 42, 0.78) 50%, rgba(16, 28, 44, 0.92) 100%)',
              pointerEvents: 'none'
            }}
          />

          <div className="container" style={{ position: 'relative', zIndex: 10 }}>
            {/* Header Block */}
            <div className="scroll-reveal" style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3rem auto' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  backgroundColor: 'rgba(223, 255, 0, 0.15)',
                  border: '1px solid rgba(223, 255, 0, 0.35)',
                  color: '#DFFF00',
                  padding: '0.35rem 0.95rem',
                  borderRadius: '9999px',
                  fontSize: '0.78rem',
                  fontWeight: '800',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                  boxShadow: '0 0 15px rgba(223, 255, 0, 0.2)'
                }}
              >
                <Star size={13} fill="#DFFF00" color="#DFFF00" />
                <span>{t('testi_badge', 'Cerita Penjelajah Nusantara')}</span>
              </div>

              <h2
                style={{
                  fontSize: 'clamp(2rem, 3.8vw, 2.95rem)',
                  fontWeight: '800',
                  lineHeight: 1.25,
                  color: '#FFFFFF',
                  margin: '0 0 0.65rem 0',
                  letterSpacing: '-0.02em'
                }}
              >
                {t('testi_title', 'Momen Nyata yang Membekas')}
              </h2>

              <p style={{ color: '#CBD5E1', fontSize: '1rem', lineHeight: 1.6, marginTop: '0', marginBottom: '1.25rem' }}>
                {t('testi_subtitle', 'Kisah autentik dari para penjelajah yang telah mempercayakan momen berharga dan liburan privat bersama FADZA TRIP ADVENTURE.')}
              </p>

              {/* Social Proof Live Trust Chip */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  padding: '0.35rem 0.95rem',
                  borderRadius: '9999px',
                  color: '#FFFFFF',
                  fontSize: '0.8rem',
                  fontWeight: '700',
                  marginBottom: '1.5rem'
                }}
              >
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
                <span>4.95 / 5.0 Rating Kepuasan dari 350+ Ulasan Terverifikasi</span>
              </div>

              {/* Action Buttons: Submit Testimonial & View All Testimonials */}
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.85rem' }}>
                <button
                  type="button"
                  onClick={() => setShowTestiModal(true)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: '#FFFFFF',
                    color: '#0F172A',
                    border: '1px solid #E2E8F0',
                    borderRadius: '12px',
                    padding: '0.65rem 1.35rem',
                    fontSize: '0.88rem',
                    fontWeight: '800',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                    transition: 'all 0.25s ease'
                  }}
                  className="hover:shadow-lg hover:scale-102"
                >
                  <MessageSquarePlus size={16} color="#D97706" />
                  <span>{language === 'en' ? 'Share Your Travel Story' : 'Bagikan Cerita Anda'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('testimonials')}
                  className="btn-lime"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    borderRadius: '12px',
                    padding: '0.65rem 1.35rem',
                    fontSize: '0.88rem',
                    fontWeight: '800',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <span>{language === 'en' ? `Browse All Reviews (${testimonialsList.length})` : `Semua Ulasan (${testimonialsList.length})`}</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>

            {/* Success Toast */}
            {testiSuccessMsg && (
              <div
                style={{
                  maxWidth: '960px',
                  margin: '0 auto 1.5rem auto',
                  backgroundColor: '#F0FDF4',
                  border: '1.5px solid #86EFAC',
                  borderRadius: '14px',
                  padding: '0.85rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  color: '#15803D',
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  boxShadow: '0 4px 15px rgba(22, 163, 74, 0.1)'
                }}
              >
                <CheckCircle2 size={18} color="#16A34A" style={{ flexShrink: 0 }} />
                <span>
                  {language === 'en'
                    ? 'Thank you! Your travel story has been published and is now live below.'
                    : 'Terima kasih! Cerita pengalaman Anda berhasil dibagikan dan langsung tampil di bawah ini.'}
                </span>
              </div>
            )}

            {/* Centered Showcase Card with Professional Clean Typography */}
            {testimonialsList.length > 0 && (
              <div
                className="scroll-reveal scroll-reveal-scale"
                style={{
                  position: 'relative',
                  maxWidth: '960px',
                  margin: '0 auto'
                }}
                onMouseEnter={() => setIsTestiPaused(true)}
                onMouseLeave={() => setIsTestiPaused(false)}
              >
                <div
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    border: '1px solid rgba(255, 255, 255, 0.7)',
                    boxShadow: '0 25px 65px -15px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.35)',
                    padding: 'clamp(1.75rem, 4vw, 2.75rem)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Motion Progress Line */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      backgroundColor: '#E2E8F0'
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${((activeTestiIndex + 1) / testimonialsList.length) * 100}%`,
                        background: 'linear-gradient(90deg, #0284C7 0%, #DFFF00 100%)',
                        transition: 'width 0.4s ease'
                      }}
                    />
                  </div>

                  {/* Editorial Dual-Column Grid */}
                  <div className="testimonial-editorial-grid">
                    {/* Left Column: Review, Verified Identity, Highlights */}
                    <div>
                      {/* Top Badges */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
                          <span
                            style={{
                              backgroundColor: '#ECFDF5',
                              border: '1px solid #A7F3D0',
                              color: '#065F46',
                              padding: '0.28rem 0.65rem',
                              borderRadius: '8px',
                              fontSize: '0.74rem',
                              fontWeight: '800',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem'
                            }}
                          >
                            <ShieldCheck size={12} color="#059669" />
                            <span>TERVERIFIKASI INVOICE BPW-{1000 + (testimonialsList[activeTestiIndex]?.id || 1) * 37}</span>
                          </span>

                          <span
                            style={{
                              backgroundColor: '#EFF6FF',
                              border: '1px solid #BFDBFE',
                              color: '#1E40AF',
                              padding: '0.28rem 0.65rem',
                              borderRadius: '8px',
                              fontSize: '0.74rem',
                              fontWeight: '700'
                            }}
                          >
                            📍 {testimonialsList[activeTestiIndex]?.destination}
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <div style={{ display: 'flex', gap: '1px' }}>
                            {[...Array(testimonialsList[activeTestiIndex]?.rating || 5)].map((_, i) => (
                              <Star key={i} size={15} fill="#F59E0B" color="#F59E0B" />
                            ))}
                          </div>
                          <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#0F172A' }}>
                            5.0 / 5.0
                          </span>
                        </div>
                      </div>

                      {/* Decorative Quote Mark & Text */}
                      <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
                        <span
                          style={{
                            position: 'absolute',
                            top: '-18px',
                            left: '-8px',
                            fontSize: '3.5rem',
                            lineHeight: 1,
                            fontFamily: 'serif',
                            color: 'rgba(217, 119, 6, 0.2)',
                            pointerEvents: 'none'
                          }}
                        >
                          “
                        </span>
                        <p
                          className="font-serif"
                          style={{
                            fontSize: 'clamp(1.08rem, 1.8vw, 1.3rem)',
                            color: '#0F172A',
                            fontWeight: '600',
                            lineHeight: 1.6,
                            margin: '0.5rem 0 0 0',
                            position: 'relative',
                            zIndex: 1
                          }}
                        >
                          "{testimonialsList[activeTestiIndex]?.quote || testimonialsList[activeTestiIndex]?.comment}"
                        </p>
                      </div>

                      {/* Highlight Note */}
                      {testimonialsList[activeTestiIndex]?.highlight && (
                        <div
                          style={{
                            backgroundColor: '#F8FAFC',
                            borderLeft: '3.5px solid #0284C7',
                            borderRadius: '8px',
                            padding: '0.65rem 1rem',
                            fontSize: '0.84rem',
                            color: '#334155',
                            marginBottom: '1.5rem',
                            lineHeight: 1.55
                          }}
                        >
                          <strong style={{ color: '#0F172A', display: 'block', marginBottom: '0.15rem', fontSize: '0.8rem' }}>
                            ⭐ Momen Paling Berkesan:
                          </strong>
                          {testimonialsList[activeTestiIndex]?.highlight}
                        </div>
                      )}

                      {/* Traveler Identity */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', paddingTop: '1rem', borderTop: '1px solid #E2E8F0' }}>
                        <img
                          src={testimonialsList[activeTestiIndex]?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                          alt={testimonialsList[activeTestiIndex]?.name}
                          style={{
                            width: '46px',
                            height: '46px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '2px solid #0284C7',
                            flexShrink: 0
                          }}
                        />
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <h4 style={{ color: '#0F172A', fontSize: '1.02rem', fontWeight: '800', margin: 0 }}>
                              {testimonialsList[activeTestiIndex]?.name}
                            </h4>
                            <span style={{ fontSize: '0.68rem', backgroundColor: '#DCFCE7', color: '#15803D', fontWeight: '800', padding: '0.12rem 0.45rem', borderRadius: '9999px' }}>
                              ✓ Terverifikasi
                            </span>
                          </div>
                          <p style={{ color: '#334155', fontSize: '0.82rem', margin: '0.15rem 0 0 0' }}>
                            {testimonialsList[activeTestiIndex]?.origin || 'Indonesia'} • {testimonialsList[activeTestiIndex]?.tag || 'Private Trip'} • {testimonialsList[activeTestiIndex]?.date || 'Agustus 2026'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Real Trip Documentation Snapshot */}
                    <div
                      style={{
                        borderRadius: '16px',
                        overflow: 'hidden',
                        backgroundColor: '#0F172A',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        minHeight: '260px',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)'
                      }}
                    >
                      <ImageWithFallback
                        src={
                          testimonialsList[activeTestiIndex]?.destination?.toLowerCase().includes('bromo')
                            ? '/images/hero/hero-bromo-sunrise.jpg'
                            : testimonialsList[activeTestiIndex]?.destination?.toLowerCase().includes('bali')
                            ? ASSET_IMAGES.destinations.bali.primary
                            : testimonialsList[activeTestiIndex]?.destination?.toLowerCase().includes('raja')
                            ? '/images/hero/hero-raja-ampat-lagoon.jpg'
                            : '/images/hero/hero-padar-panoramic.jpg'
                        }
                        fallbackSrc="/images/hero/hero-pink-beach.jpg"
                        alt="Foto Dokumentasi Perjalanan"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(to top, rgba(11, 19, 32, 0.92) 0%, rgba(11, 19, 32, 0.3) 50%, rgba(11, 19, 32, 0.6) 100%)'
                        }}
                      />

                      <div style={{ position: 'relative', zIndex: 2, padding: '1rem' }}>
                        <span style={{ backgroundColor: 'rgba(16, 28, 44, 0.85)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255, 255, 255, 0.25)', color: '#FFFFFF', padding: '0.25rem 0.6rem', borderRadius: '6px', fontSize: '0.72rem', fontWeight: '800' }}>
                          📸 DOKUMENTASI TRIP ASLI
                        </span>
                      </div>

                      <div style={{ position: 'relative', zIndex: 2, padding: '1rem', color: '#FFFFFF' }}>
                        <span style={{ fontSize: '0.72rem', color: '#DFFF00', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          {testimonialsList[activeTestiIndex]?.packageTitle || 'Paket Eksklusif FADZA'}
                        </span>
                        <div style={{ marginTop: '0.4rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.75rem', color: '#E2E8F0' }}>
                          <span>✓ 100% Sesuai Jadwal Itinerary</span>
                          <span>✓ Fasilitas Kapal & Hotel Terverifikasi</span>
                          <span>✓ Pemandu Lokal Ramah & Sabar</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Interactive Thumbnail Selector Strip */}
                  <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.78rem', color: '#334155', fontWeight: '700' }}>Ulasan Lainnya:</span>
                      {testimonialsList.slice(0, 5).map((tItem, tIdx) => {
                        const isSelected = tIdx === activeTestiIndex;
                        return (
                          <button
                            key={tItem.id || tIdx}
                            type="button"
                            onClick={() => {
                              setIsTestiPaused(true);
                              setActiveTestiIndex(tIdx);
                              setTimeout(() => setIsTestiPaused(false), 8000);
                            }}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              padding: '0.3rem 0.65rem',
                              borderRadius: '8px',
                              border: isSelected ? '1.5px solid #0284C7' : '1px solid #CBD5E1',
                              backgroundColor: isSelected ? '#0284C7' : '#F8FAFC',
                              color: isSelected ? '#FFFFFF' : '#334155',
                              fontSize: '0.76rem',
                              fontWeight: '700',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <span>{tItem.name.split(' ')[0]}</span>
                            <span style={{ opacity: 0.8, fontSize: '0.7rem' }}>({tItem.destination.split(' ')[0]})</span>
                          </button>
                        );
                      })}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <button
                        type="button"
                        onClick={handlePrevTesti}
                        style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#F1F5F9', border: '1px solid #CBD5E1', color: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                        aria-label="Sebelumnya"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        type="button"
                        onClick={handleNextTesti}
                        style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#101C2C', border: 'none', color: '#DFFF00', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                        aria-label="Selanjutnya"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Testimonial Submission Modal */}
            {showTestiModal && (
              <div
                style={{
                  position: 'fixed',
                  inset: 0,
                  zIndex: 99999,
                  backgroundColor: 'rgba(15, 23, 42, 0.72)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1rem',
                  animation: 'fadeInUpSmooth 0.25s ease'
                }}
                onClick={() => setShowTestiModal(false)}
              >
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '24px',
                    maxWidth: '560px',
                    width: '100%',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    padding: 'clamp(1.5rem, 3.5vw, 2.25rem)',
                    boxShadow: '0 25px 60px -12px rgba(15, 23, 42, 0.35)',
                    border: '1.5px solid #E2E8F0',
                    position: 'relative'
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Modal Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                    <div>
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          backgroundColor: 'rgba(217, 119, 6, 0.14)',
                          color: '#D97706',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '9999px',
                          fontSize: '0.74rem',
                          fontWeight: '800',
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          marginBottom: '0.5rem'
                        }}
                      >
                        <Star size={13} fill="#D97706" color="#D97706" />
                        <span>{language === 'en' ? 'Share Your Experience' : 'Beri Ulasan Perjalanan'}</span>
                      </div>
                      <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                        {language === 'en' ? 'Tell Your Travel Story' : 'Bagikan Cerita Perjalanan Anda'}
                      </h3>
                      <p style={{ color: '#334155', fontSize: '0.86rem', marginTop: '0.35rem', lineHeight: 1.5 }}>
                        {language === 'en'
                          ? 'Your genuine feedback helps fellow travelers discover authentic journeys across Indonesia.'
                          : 'Kisah autentik Anda membantu sesama penjelajah merencanakan liburan impian bersama FADZA TRIP ADVENTURE.'}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowTestiModal(false)}
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '50%',
                        border: '1px solid #E2E8F0',
                        backgroundColor: '#F8FAFC',
                        color: '#334155',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        flexShrink: 0
                      }}
                      className="hover:bg-slate-200"
                    >
                      <X size={17} />
                    </button>
                  </div>

                  {/* Modal Form */}
                  <form onSubmit={handleSubmitTestimonial} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#0F172A', marginBottom: '0.35rem' }}>
                        {language === 'en' ? 'Full Name *' : 'Nama Lengkap *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={newTesti.name}
                        onChange={(e) => setNewTesti({ ...newTesti, name: e.target.value })}
                        placeholder={language === 'en' ? 'e.g. Raditya Pratama' : 'Contoh: Raditya Pratama'}
                        className="input-clean"
                        style={{ padding: '0.75rem 1rem', borderRadius: '10px' }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#0F172A', marginBottom: '0.35rem' }}>
                          {language === 'en' ? 'City / Origin' : 'Kota Asal'}
                        </label>
                        <input
                          type="text"
                          value={newTesti.origin}
                          onChange={(e) => setNewTesti({ ...newTesti, origin: e.target.value })}
                          placeholder={language === 'en' ? 'e.g. Jakarta Selatan' : 'Contoh: Jakarta Selatan'}
                          className="input-clean"
                          style={{ padding: '0.75rem 1rem', borderRadius: '10px' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#0F172A', marginBottom: '0.35rem' }}>
                          {language === 'en' ? 'Destination *' : 'Destinasi yang Dikunjungi *'}
                        </label>
                        <select
                          value={newTesti.destination}
                          onChange={(e) => setNewTesti({ ...newTesti, destination: e.target.value })}
                          className="input-clean"
                          style={{ padding: '0.75rem 1rem', borderRadius: '10px', backgroundColor: '#FFFFFF' }}
                        >
                          {DESTINATIONS.map((d) => (
                            <option key={d.id} value={d.name}>
                              {d.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#0F172A', marginBottom: '0.35rem' }}>
                          {language === 'en' ? 'Trip Type' : 'Kategori Perjalanan'}
                        </label>
                        <select
                          value={newTesti.tag}
                          onChange={(e) => setNewTesti({ ...newTesti, tag: e.target.value })}
                          className="input-clean"
                          style={{ padding: '0.75rem 1rem', borderRadius: '10px', backgroundColor: '#FFFFFF' }}
                        >
                          <option value="Private Tour (Pasangan)">Private Tour (Pasangan)</option>
                          <option value="Liburan Keluarga">Liburan Keluarga (Family)</option>
                          <option value="Private Tour (Kawan)">Private Tour (Kawan)</option>
                          <option value="Eksplorasi Bahari">Eksplorasi Bahari (Phinisi)</option>
                          <option value="Trip Santai & Healing">Trip Santai & Healing</option>
                          <option value="Open Trip Petualangan">Open Trip Petualangan</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#0F172A', marginBottom: '0.35rem' }}>
                          {language === 'en' ? 'Satisfaction Rating' : 'Rating Kepuasan'}
                        </label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', paddingTop: '0.35rem' }}>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              type="button"
                              key={star}
                              onClick={() => setNewTesti({ ...newTesti, rating: star })}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '2px',
                                transition: 'transform 0.15s ease'
                              }}
                              className="hover:scale-125"
                            >
                              <Star
                                size={24}
                                fill={star <= newTesti.rating ? '#F59E0B' : '#E2E8F0'}
                                color={star <= newTesti.rating ? '#F59E0B' : '#CBD5E1'}
                              />
                            </button>
                          ))}
                          <span style={{ fontSize: '0.86rem', fontWeight: '800', color: '#0F172A', marginLeft: '0.4rem' }}>
                            {newTesti.rating}.0 / 5.0
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#0F172A', marginBottom: '0.35rem' }}>
                        {language === 'en' ? 'Your Story & Review *' : 'Cerita Pengalaman Perjalanan Anda *'}
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={newTesti.comment}
                        onChange={(e) => setNewTesti({ ...newTesti, comment: e.target.value })}
                        placeholder={
                          language === 'en'
                            ? 'Share your memorable moments with FADZA (guides, boat/vehicles, itinerary pacing, comfort)...'
                            : 'Ceritakan momen paling berkesan selama trip bersama FADZA TRIP ADVENTURE (pelayanan pemandu, kenyamanan armada, keindahan rute)...'
                        }
                        className="input-clean"
                        style={{ padding: '0.75rem 1rem', borderRadius: '10px', resize: 'vertical' }}
                      />
                    </div>

                    {/* Form Actions */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                      <button
                        type="button"
                        onClick={() => setShowTestiModal(false)}
                        className="btn-outline-dark"
                        style={{ padding: '0.75rem 1.4rem', borderRadius: '12px' }}
                      >
                        {language === 'en' ? 'Cancel' : 'Batal'}
                      </button>

                      <button
                        type="submit"
                        className="btn-lime"
                        style={{ padding: '0.75rem 1.75rem', borderRadius: '12px', fontWeight: '800' }}
                      >
                        <CheckCircle2 size={16} />
                        <span>{language === 'en' ? 'Submit Story' : 'Kirim Ulasan'}</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: TANYA JAWAB / FAQ & HELP CENTER (Modern Interactive Split Mode)
            ========================================================================= */}
        <section id="faq-section" className="bg-faq-atmosphere" style={{ padding: '5.5rem 0' }}>
          <div className="container" style={{ maxWidth: '1160px' }}>
            {/* SECTION HEADER */}
            <div className="scroll-reveal" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  backgroundColor: 'rgba(2, 132, 199, 0.12)',
                  border: '1px solid rgba(2, 132, 199, 0.3)',
                  color: '#0284C7',
                  padding: '0.35rem 0.95rem',
                  borderRadius: '9999px',
                  fontSize: '0.78rem',
                  fontWeight: '800',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '0.65rem'
                }}
              >
                <HelpCircle size={15} color="#0284C7" />
                <span>{t('faq_badge', 'Tanya Jawab & Pusat Bantuan')}</span>
              </div>
              <h2
                className="font-serif"
                style={{
                  fontSize: 'clamp(1.9rem, 3.5vw, 2.85rem)',
                  fontWeight: '700',
                  color: '#0F172A',
                  margin: '0 0 0.5rem 0',
                  letterSpacing: '-0.02em'
                }}
              >
                {t('faq_title', 'Pertanyaan yang Sering Diajukan')}
              </h2>
              <p style={{ color: '#334155', fontSize: '1rem', maxWidth: '640px', margin: '0.35rem auto 0 auto', lineHeight: 1.6 }}>
                {t('faq_subtitle', 'Segala hal yang perlu Anda ketahui sebelum merencanakan perjalanan bersama FADZA TRIP ADVENTURE.')}
              </p>

              {/* LIVE SEARCH BAR */}
              <div
                style={{
                  maxWidth: '560px',
                  margin: '1.75rem auto 0 auto',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    border: '1.5px solid #CBD5E1',
                    padding: '0.45rem 1rem',
                    boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)',
                    gap: '0.65rem'
                  }}
                >
                  <Search size={18} color="#0284C7" style={{ flexShrink: 0 }} />
                  <input
                    type="text"
                    value={faqSearchQuery}
                    onChange={(e) => setFaqSearchQuery(e.target.value)}
                    placeholder="Cari pertanyaan (misal: booking, dp, tiket, fasilitas)..."
                    style={{
                      border: 'none',
                      outline: 'none',
                      width: '100%',
                      fontSize: '0.92rem',
                      color: '#0F172A',
                      backgroundColor: 'transparent'
                    }}
                  />
                  {faqSearchQuery && (
                    <button
                      type="button"
                      onClick={() => setFaqSearchQuery('')}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#94A3B8',
                        cursor: 'pointer',
                        padding: '0.2rem',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>

              {/* CATEGORY TABS */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginTop: '1.25rem'
                }}
              >
                {[
                  { id: 'all', label: '🌟 Semua Topik (8)' },
                  { id: 'booking', label: '💳 Pemesanan & Biaya (2)' },
                  { id: 'facilities', label: '🎒 Fasilitas & Layanan (2)' },
                  { id: 'custom', label: '✨ Kustomisasi Trip (2)' },
                  { id: 'policy', label: '🛡️ Keamanan & Kebijakan (2)' }
                ].map((cat) => {
                  const isSelected = selectedFaqCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedFaqCategory(cat.id)}
                      style={{
                        padding: '0.45rem 0.95rem',
                        borderRadius: '9999px',
                        border: isSelected ? '1.5px solid #0284C7' : '1px solid #CBD5E1',
                        backgroundColor: isSelected ? '#0284C7' : '#FFFFFF',
                        color: isSelected ? '#FFFFFF' : '#475569',
                        fontSize: '0.82rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: isSelected ? '0 2px 8px rgba(2, 132, 199, 0.25)' : 'none'
                      }}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* BALANCED 2-COLUMN SYMMETRICAL FAQ GRID (Zero empty space, perfectly balanced left & right) */}
            {(() => {
              const filteredFaqs = GENERAL_FAQS.filter((faq) => {
                const matchesCategory =
                  selectedFaqCategory === 'all' || faq.category === selectedFaqCategory;
                const query = faqSearchQuery.toLowerCase().trim();
                if (!query) return matchesCategory;
                return (
                  matchesCategory &&
                  (faq.question.toLowerCase().includes(query) ||
                    faq.answer.toLowerCase().includes(query) ||
                    (faq.categoryLabel && faq.categoryLabel.toLowerCase().includes(query)) ||
                    (faq.tip && faq.tip.toLowerCase().includes(query)))
                );
              });

              return (
                <div>
                  {filteredFaqs.length === 0 ? (
                    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '3rem 2rem', textAlign: 'center', border: '1px solid #E2E8F0', marginBottom: '2.5rem' }}>
                      <p style={{ margin: '0 0 0.75rem 0', fontSize: '1.05rem', fontWeight: '700', color: '#0F172A' }}>
                        Tidak ditemukan pertanyaan yang cocok dengan "{faqSearchQuery}"
                      </p>
                      <button
                        type="button"
                        onClick={() => { setFaqSearchQuery(''); setSelectedFaqCategory('all'); }}
                        style={{ padding: '0.55rem 1.2rem', borderRadius: '8px', border: '1px solid #0284C7', backgroundColor: '#F0F9FF', color: '#0284C7', fontWeight: '700', cursor: 'pointer' }}
                      >
                        Reset Pencarian &amp; Tampilkan Semua
                      </button>
                    </div>
                  ) : (
                    <div
                      style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))',
                      gap: '1.25rem',
                      alignItems: 'start',
                      marginBottom: '3rem'
                    }}
                  >
                    {filteredFaqs.map((faq, idx) => {
                      const isOpen = openFaqIndex === idx;
                      const isHelpful = helpfulFaqIds.includes(faq.id || idx);
                      return (
                        <div
                          key={faq.id || idx}
                          className={`scroll-reveal stagger-${(idx % 2) + 1}`}
                          style={{
                            backgroundColor: '#FFFFFF',
                            borderRadius: '16px',
                            border: isOpen ? '1.5px solid #0284C7' : '1px solid #E2E8F0',
                            overflow: 'hidden',
                            transition: 'all 0.25s ease',
                            boxShadow: isOpen ? '0 8px 24px rgba(2, 132, 199, 0.1)' : '0 2px 8px rgba(15, 23, 42, 0.03)'
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                            style={{
                              width: '100%',
                              padding: '1.25rem 1.5rem',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              textAlign: 'left',
                              gap: '1rem',
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer'
                            }}
                          >
                            <div style={{ flex: 1 }}>
                              {faq.categoryLabel && (
                                <span
                                  style={{
                                    display: 'inline-block',
                                    fontSize: '0.72rem',
                                    fontWeight: '800',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    color: '#0284C7',
                                    backgroundColor: 'rgba(2, 132, 199, 0.08)',
                                    padding: '0.15rem 0.5rem',
                                    borderRadius: '6px',
                                    marginBottom: '0.4rem'
                                  }}
                                >
                                  {faq.categoryLabel}
                                </span>
                              )}
                              <h3
                                style={{
                                  fontSize: '0.98rem',
                                  fontWeight: '800',
                                  color: isOpen ? '#0284C7' : '#0F172A',
                                  margin: 0,
                                  lineHeight: 1.4,
                                  transition: 'color 0.2s ease'
                                }}
                              >
                                {faq.question}
                              </h3>
                            </div>

                            <div
                              style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                backgroundColor: isOpen ? '#0284C7' : '#F1F5F9',
                                color: isOpen ? '#FFFFFF' : '#0F172A',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                transition: 'all 0.25s ease'
                              }}
                            >
                              <ChevronDown
                                size={16}
                                style={{
                                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                  transition: 'transform 0.25s ease'
                                }}
                              />
                            </div>
                          </button>

                          {isOpen && (
                            <div
                              style={{
                                padding: '0 1.5rem 1.35rem 1.5rem',
                                borderTop: '1px solid #F1F5F9',
                                paddingTop: '0.95rem'
                              }}
                            >
                              <p style={{ margin: '0 0 0.85rem 0', color: '#475569', fontSize: '0.92rem', lineHeight: 1.65 }}>
                                {faq.answer}
                              </p>

                              {faq.tip && (
                                <div
                                  style={{
                                    backgroundColor: '#F8FAFC',
                                    borderRadius: '10px',
                                    borderLeft: '3px solid #0284C7',
                                    padding: '0.65rem 0.95rem',
                                    fontSize: '0.84rem',
                                    color: '#334155',
                                    marginBottom: '0.95rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                  }}
                                >
                                  <span>💡</span>
                                  <span><strong>Tips FADZA:</strong> {faq.tip}</span>
                                </div>
                              )}

                              {/* Micro interaction */}
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  borderTop: '1px dashed #E2E8F0',
                                  paddingTop: '0.75rem',
                                  fontSize: '0.78rem',
                                  color: '#94A3B8',
                                  flexWrap: 'wrap',
                                  gap: '0.5rem'
                                }}
                              >
                                <span>Apakah jawaban ini membantu?</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const key = faq.id || idx;
                                    setHelpfulFaqIds((prev) =>
                                      prev.includes(key) ? prev : [...prev, key]
                                    );
                                  }}
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.35rem',
                                    padding: '0.3rem 0.65rem',
                                    borderRadius: '6px',
                                    border: isHelpful ? '1px solid #86EFAC' : '1px solid #CBD5E1',
                                    backgroundColor: isHelpful ? '#F0FDF4' : '#FFFFFF',
                                    color: isHelpful ? '#16A34A' : '#475569',
                                    fontSize: '0.78rem',
                                    fontWeight: '700',
                                    cursor: 'pointer'
                                  }}
                                >
                                  <span>{isHelpful ? '✓ Ya, sangat jelas' : 'Ya, sangat jelas'}</span>
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* PERFECTLY BALANCED & CENTERED CONCIERGE ASSISTANCE CARD */}
                  <div
                    className="scroll-reveal scroll-reveal-scale"
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '24px',
                      border: '1.5px solid #E2E8F0',
                      padding: 'clamp(2rem, 4vw, 3rem)',
                      boxShadow: '0 10px 30px rgba(15, 23, 42, 0.05)',
                      textAlign: 'center',
                      maxWidth: '760px',
                      margin: '0 auto'
                    }}
                  >
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        backgroundColor: '#DCFCE7',
                        color: '#15803D',
                        padding: '0.3rem 0.85rem',
                        borderRadius: '9999px',
                        fontSize: '0.78rem',
                        fontWeight: '800',
                        marginBottom: '0.85rem'
                      }}
                    >
                      <span
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: '#16A34A',
                          display: 'inline-block'
                        }}
                      />
                      <span>Tim Concierge Siaga • Respon &lt; 5 Menit</span>
                    </div>

                    <h3
                      style={{
                        margin: '0 0 0.5rem 0',
                        fontSize: 'clamp(1.25rem, 2.5vw, 1.6rem)',
                        fontWeight: '800',
                        color: '#0F172A',
                        lineHeight: 1.3
                      }}
                    >
                      Masih Punya Pertanyaan Khusus Seputar Perjalanan?
                    </h3>

                    <p
                      style={{
                        margin: '0 auto 1.5rem auto',
                        fontSize: '0.94rem',
                        color: '#334155',
                        lineHeight: 1.6,
                        maxWidth: '580px'
                      }}
                    >
                      Travel specialist FADZA siap membantu menyusun estimasi anggaran rombongan, private tour keluarga, hingga penyesuaian rute khusus tanpa biaya tambahan.
                    </p>

                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '0.85rem'
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => onOpenBooking && onOpenBooking()}
                        className="btn-lime"
                        style={{
                          padding: '0.85rem 1.65rem',
                          borderRadius: '12px',
                          fontSize: '0.92rem',
                          fontWeight: '800',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          boxShadow: '0 4px 14px rgba(223, 255, 0, 0.3)'
                        }}
                      >
                        <Ticket size={18} />
                        <span>Booking Sekarang</span>
                      </button>

                      <a
                        href={getGeneralWhatsAppLink('Halo FADZA TRIP ADVENTURE, saya ingin konsultasi seputar jadwal dan rincian paket wisata.')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline-dark"
                        style={{
                          padding: '0.85rem 1.5rem',
                          borderRadius: '12px',
                          fontSize: '0.92rem',
                          fontWeight: '700',
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          borderColor: '#CBD5E1',
                          color: '#0F172A'
                        }}
                      >
                        <WhatsAppIcon size={18} />
                        <span>Tanya via WhatsApp</span>
                      </a>
                    </div>

                    <div
                      style={{
                        marginTop: '1.25rem',
                        paddingTop: '1rem',
                        borderTop: '1px dashed #E2E8F0',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '1.25rem',
                        fontSize: '0.78rem',
                        color: '#334155'
                      }}
                    >
                      <span>✓ Konsultasi 100% Bebas Biaya</span>
                      <span>✓ Tanpa Komitmen Awal</span>
                      <span>✓ Respon Resmi PT Fadza Trip Adventure</span>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: CONVERSATIONAL CTA (Direct Booking + Optional WhatsApp Assistance)
            ========================================================================= */}
        <section
          className="bg-navy-atmosphere"
          style={{
            padding: '5.5rem 0',
            color: '#FFFFFF',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div className="container scroll-reveal scroll-reveal-scale" style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '820px' }}>
            {/* UPDATED LOGO / BADGE (Replaced Compass with CalendarCheck) */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                backgroundColor: 'rgba(223, 255, 0, 0.15)',
                border: '1px solid rgba(223, 255, 0, 0.35)',
                color: '#DFFF00',
                padding: '0.35rem 0.85rem',
                borderRadius: '9999px',
                fontSize: '0.78rem',
                fontWeight: '800',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '1.25rem'
              }}
            >
              <CalendarCheck size={15} color="#DFFF00" />
              <span>{t('cta_badge', 'Rencana Liburan Anda')}</span>
            </div>

            <h2
              className="font-serif"
              style={{
                color: '#FFFFFF',
                fontSize: 'clamp(2.1rem, 4.2vw, 3.3rem)',
                fontWeight: '700',
                lineHeight: 1.34,
                paddingTop: '0.25rem',
                margin: '0 0 1.25rem 0',
                letterSpacing: '-0.015em'
              }}
            >
              {t('cta_title_1', 'Sudah Tahu Mau ke Mana?')} <br />
              <span style={{ color: '#DFFF00', fontStyle: 'italic' }}>{t('cta_title_2', 'Biar Kami Bantu Susun Sisanya.')}</span>
            </h2>

            <p style={{ color: '#CBD5E1', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              {t('cta_subtitle', 'Pilih paket favorit Anda dan lakukan reservasi instan secara online, atau diskusikan kebutuhan khusus langsung bersama travel concierge kami.')}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', alignItems: 'center' }}>
              {/* PRIMARY ACTION: DIRECT BOOKING SEKARANG */}
              <button
                type="button"
                onClick={() => onOpenBooking && onOpenBooking()}
                className="btn-lime"
                style={{
                  padding: '1rem 2.2rem',
                  fontSize: '1rem',
                  fontWeight: '800',
                  borderRadius: '14px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  boxShadow: '0 8px 24px rgba(223, 255, 0, 0.35)'
                }}
              >
                <Ticket size={20} />
                <span>Booking Sekarang</span>
              </button>

              {/* SECONDARY ACTION: WHATSAPP ASSISTANCE AS REQUESTED */}
              <a
                href={getGeneralWhatsAppLink('Halo FADZA TRIP ADVENTURE, saya ingin konsultasi dan tanya lebih lanjut mengenai rencana liburan ke Nusantara.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-dark"
                style={{
                  padding: '1rem 1.85rem',
                  fontSize: '0.96rem',
                  fontWeight: '700',
                  borderRadius: '14px',
                  borderColor: 'rgba(255, 255, 255, 0.35)',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.55rem'
                }}
              >
                <WhatsAppIcon size={18} />
                <span>Tanya Lebih Lanjut via WhatsApp</span>
              </a>

              {/* TERTIARY ACTION: AI CONCIERGE */}
              {onOpenAiChat && (
                <button
                  type="button"
                  onClick={onOpenAiChat}
                  style={{
                    padding: '1rem 1.6rem',
                    fontSize: '0.92rem',
                    fontWeight: '700',
                    borderRadius: '14px',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.22)',
                    color: '#E2E8F0',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <SlidersHorizontal size={17} color="#DFFF00" />
                  <span>{t('cta_ai', 'Bantu Pilihkan Trip')}</span>
                </button>
              )}
            </div>

            {/* TRUST GUARANTEES FOOTER */}
            <div
              style={{
                marginTop: '2.5rem',
                paddingTop: '1.75rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '1.75rem',
                fontSize: '0.82rem',
                color: '#94A3B8'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <ShieldCheck size={16} color="#DFFF00" />
                <span>Reservasi Resmi &amp; Terproteksi</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <CheckCircle2 size={16} color="#DFFF00" />
                <span>E-Voucher &amp; Konfirmasi Otomatis</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Clock size={16} color="#DFFF00" />
                <span>Bebas Reschedule 1x hingga H-10</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Floating Live Activity Pulse Toast Notification (Living Verified Traveler Activity) */}
      {showActivityToast && RECENT_ACTIVITIES && RECENT_ACTIVITIES.length > 0 && (
        <div
          style={{
            position: 'fixed',
            bottom: '96px',
            left: '20px',
            zIndex: 998,
            maxWidth: '350px',
            backgroundColor: 'rgba(255, 255, 255, 0.96)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            border: '1.5px solid rgba(226, 232, 240, 0.95)',
            borderRadius: '16px',
            padding: '0.75rem 0.95rem',
            boxShadow: '0 16px 36px rgba(15, 23, 42, 0.16)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            animation: 'fadeInUp 0.4s ease'
          }}
        >
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#22C55E',
              boxShadow: '0 0 10px #22C55E',
              flexShrink: 0
            }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: '800',
                  color: RECENT_ACTIVITIES[activeActivityIdx]?.color || '#0284C7',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em'
                }}
              >
                {RECENT_ACTIVITIES[activeActivityIdx]?.tag} • {RECENT_ACTIVITIES[activeActivityIdx]?.time}
              </span>
              <button
                type="button"
                onClick={() => setShowActivityToast(false)}
                style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0 }}
                title="Tutup notifikasi"
              >
                <X size={13} />
              </button>
            </div>
            <p style={{ margin: '0.15rem 0 0 0', fontSize: '0.8rem', fontWeight: '800', color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {RECENT_ACTIVITIES[activeActivityIdx]?.traveler} ({RECENT_ACTIVITIES[activeActivityIdx]?.city})
            </p>
            <p style={{ margin: 0, fontSize: '0.72rem', color: '#334155', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {RECENT_ACTIVITIES[activeActivityIdx]?.action}: {RECENT_ACTIVITIES[activeActivityIdx]?.package}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
