// FADZA AI — NATURAL CONVERSATION & INTELLIGENT TRAVEL CONCIERGE ENGINE
// Strict policy: Natural conversational dialogue over menu-driven templates.
// ONE question at a time. Zero generic option lists. Direct answers first.
// Visual package cards are NEVER default; shown ONLY when search/comparison/booking is required.

import {
  getAllPackages,
  getAllDestinations,
  getPackageById,
  getDestinationById,
  searchPackages,
  searchDestinations,
  filterPackages,
  calculatePackageTotal,
  calculateMultiPackageTotal,
  comparePackages,
  searchFaq,
  formatRupiah,
  getCompanyInfo,
  generateBookingWhatsAppLink
} from './travelTools.js';
import { BRAND_INFO } from '../data/travelData.js';
import { ASSET_IMAGES } from '../data/images.js';

/**
 * Standard Conversational Intent Taxonomy
 */
export const INTENTS = {
  GREETING: 'GREETING',
  THANKS: 'THANKS',
  ACKNOWLEDGEMENT: 'ACKNOWLEDGEMENT',
  FAREWELL: 'FAREWELL',
  GENERAL_CONVERSATION: 'GENERAL_CONVERSATION',
  GENERAL_FADZA_INFO: 'GENERAL_FADZA_INFO',
  DESTINATION_QUESTION: 'DESTINATION_QUESTION',
  DESTINATION_SEARCH: 'DESTINATION_SEARCH',
  TRAVEL_STYLE_PREFERENCE: 'TRAVEL_STYLE_PREFERENCE',
  PACKAGE_SEARCH: 'PACKAGE_SEARCH',
  PACKAGE_DETAIL: 'PACKAGE_DETAIL',
  PACKAGE_PRICE: 'PACKAGE_PRICE',
  PRICE_CALCULATION: 'PRICE_CALCULATION',
  MULTI_TASK_SEARCH: 'MULTI_TASK_SEARCH',
  BUDGET_SEARCH: 'BUDGET_SEARCH',
  DURATION_SEARCH: 'DURATION_SEARCH',
  FACILITY_QUESTION: 'FACILITY_QUESTION',
  ITINERARY_QUESTION: 'ITINERARY_QUESTION',
  INCLUDED_EXCLUDED: 'INCLUDED_EXCLUDED',
  TRANSPORTATION_QUESTION: 'TRANSPORTATION_QUESTION',
  ACCOMMODATION_QUESTION: 'ACCOMMODATION_QUESTION',
  COMPARISON: 'COMPARISON',
  RECOMMENDATION: 'RECOMMENDATION',
  BOOKING: 'BOOKING',
  CONTACT: 'CONTACT',
  HOW_TO_BOOK: 'HOW_TO_BOOK',
  FAQ: 'FAQ',
  CLARIFICATION: 'CLARIFICATION',
  OUT_OF_SCOPE: 'OUT_OF_SCOPE'
};

/**
 * Input Normalization Engine
 * Handles Indonesian informal typing, repeated characters, excessive punctuation, and abbreviations.
 */
export function normalizeInput(text) {
  if (!text || typeof text !== 'string') return '';

  let cleaned = text.trim();

  // 1. Normalize multiple punctuation (e.g. "???" -> "?", "!!" -> "!")
  cleaned = cleaned.replace(/\?+/g, '?').replace(/!+/g, '!');

  // 2. Lowercase for uniform processing
  cleaned = cleaned.toLowerCase();

  // 3. Normalize repeated characters:
  // Any sequence of 3 or more identical characters collapses to 1:
  // e.g. "malammm" -> "malam", "halooo" -> "halo", "pagiii" -> "pagi", "sumateraaa" -> "sumatera"
  // "okeeee" -> "oke", "iyaaa" -> "iya", "adaaa" -> "ada", "makasihhh" -> "makasih"
  cleaned = cleaned.replace(/(.)\1{2,}/g, '$1');

  // Next, handle common informal double-character endings in Indonesian:
  // e.g. "malamm" -> "malam", "haloo" -> "halo", "pagii" -> "pagi", "siangg" -> "siang",
  // "okee" -> "oke", "iyaa" -> "iya", "adaa" -> "ada", "makasihh" -> "makasih", "makasii" -> "makasih"
  cleaned = cleaned
    .replace(/\b(malam)m+\b/g, '$1')
    .replace(/\b(halo+)o+\b/g, 'halo')
    .replace(/\b(pagi+)i+\b/g, 'pagi')
    .replace(/\b(siang+)g+\b/g, 'siang')
    .replace(/\b(sore+)e+\b/g, 'sore')
    .replace(/\b(oke+)e+\b/g, 'oke')
    .replace(/\b(iya+)a+\b/g, 'iya')
    .replace(/\b(ada+)a+\b/g, 'ada')
    .replace(/\b(makasih+)h+\b/g, 'makasih')
    .replace(/\b(makasi+)i+\b/g, 'makasih')
    .replace(/\b(terima+)a+\b/g, 'terima')
    .replace(/\b(kasih+)h+\b/g, 'kasih');

  // Normalize common Indonesian informal words / abbreviations:
  const tokenMap = {
    'udh': 'sudah',
    'sdh': 'sudah',
    'udah': 'sudah',
    'blm': 'belum',
    'belom': 'belum',
    'blom': 'belum',
    'klo': 'kalau',
    'kl': 'kalau',
    'kalo': 'kalau',
    'brp': 'berapa',
    'brapa': 'berapa',
    'utk': 'untuk',
    'bgt': 'banget',
    'bngt': 'banget',
    'sy': 'saya',
    'aq': 'aku',
    'makasi': 'makasih',
    'trims': 'terimakasih',
    'tks': 'terimakasih',
    'thx': 'terimakasih',
    'thanks': 'terimakasih',
    'gmn': 'gimana',
    'bgmn': 'bagaimana',
    'dimana': 'di mana',
    'kemana': 'ke mana'
  };

  const words = cleaned.split(/\s+/);
  const normalizedWords = words.map((w) => {
    const stripped = w.replace(/[^a-z0-9]/g, '');
    const mapped = tokenMap[stripped];
    if (mapped) {
      return w.replace(stripped, mapped);
    }
    return w;
  });

  cleaned = normalizedWords.join(' ');

  // 4. Collapse extra whitespace
  cleaned = cleaned.replace(/\s+/g, ' ').trim();

  return cleaned;
}

/**
 * Ensure package has guaranteed image references for card rendering
 */
export function normalizePackage(pkg) {
  if (!pkg) return null;
  const destId = pkg.destinationId || (pkg.destination ? pkg.destination.toLowerCase().replace(/[^a-z0-9]/g, '') : '');
  const destFallback = ASSET_IMAGES.destinations[destId]?.primary || ASSET_IMAGES.destinations.bali.primary;

  return {
    ...pkg,
    image: pkg.heroImage || pkg.image || destFallback,
    fallbackImage: pkg.fallbackImage || (ASSET_IMAGES.destinations[destId]?.fallback) || ASSET_IMAGES.backgrounds.heroFallback
  };
}

/**
 * Parse travel style / vibe preference from text
 */
export function extractTravelStyle(query) {
  const q = (query || '').toLowerCase();
  if (/(?:santai|rileks|healing|tenang|tidak\s+terburu|santai\s+saja|perjalanan\s+santai|liburan\s+santai|alam\s+tenang)/i.test(q)) return 'santai';
  if (/(?:pantai|bahari|snorkeling|diving|laut|pulau)/i.test(q)) return 'pantai';
  if (/(?:pegunungan|gunung|sejuk|kawah|sunrise)/i.test(q)) return 'pegunungan';
  if (/(?:petualangan|adventure|trekking|menantang|seru)/i.test(q)) return 'petualangan';
  if (/(?:keluarga|family|anak|orang\s+tua|lansia)/i.test(q)) return 'keluarga';
  if (/(?:romantis|bulan\s+madu|honeymoon|anniversary|pasangan)/i.test(q)) return 'romantis';
  if (/(?:budaya|heritage|sejarah|candi|tradisi)/i.test(q)) return 'budaya';
  if (/(?:pemula|pertama\s+kali|newbie|mudah)/i.test(q)) return 'pemula';
  return null;
}

/**
 * Verified Region Definitions for Indonesian Travel
 */
export const REGION_DATA = [
  {
    id: 'sumatra',
    name: 'Sumatera',
    aliases: ['sumatera', 'sumatra', 'pulau sumatera', 'pulau sumatra'],
    destinations: ['Danau Toba', 'Belitung'],
    packageIds: ['toba-highland', 'belitung-island']
  },
  {
    id: 'jawa',
    name: 'Jawa',
    aliases: ['jawa', 'java', 'pulau jawa'],
    destinations: ['Yogyakarta', 'Bromo & Malang', 'Bandung', 'Dieng Plateau', 'Karimunjawa'],
    packageIds: ['yogyakarta-heritage', 'bromo-sunrise', 'bandung-retreat', 'dieng-explorer', 'karimunjawa-getaway']
  },
  {
    id: 'bali',
    name: 'Bali',
    aliases: ['bali', 'pulau bali', 'nusa penida', 'denpasar', 'ubud', 'kuta', 'seminyak'],
    destinations: ['Bali'],
    packageIds: ['bali-escape']
  },
  {
    id: 'nusa-tenggara',
    name: 'Nusa Tenggara',
    aliases: ['nusa tenggara', 'ntb', 'ntt', 'flores', 'komodo'],
    destinations: ['Labuan Bajo', 'Lombok', 'Sumba'],
    packageIds: ['labuan-bajo-phinisi', 'lombok-adventure', 'sumba-paradise']
  },
  {
    id: 'sulawesi',
    name: 'Sulawesi',
    aliases: ['sulawesi', 'celebes'],
    destinations: ['Bunaken & Manado', 'Tana Toraja', 'Wakatobi'],
    packageIds: ['bunaken-marine', 'toraja-heritage', 'wakatobi-expedition']
  },
  {
    id: 'kalimantan',
    name: 'Kalimantan',
    aliases: ['kalimantan', 'borneo'],
    destinations: ['Kepulauan Derawan'],
    packageIds: ['derawan-adventure']
  },
  {
    id: 'papua-maluku',
    name: 'Maluku & Papua',
    aliases: ['papua', 'maluku', 'raja ampat', 'sorong', 'misool', 'wayag'],
    destinations: ['Raja Ampat'],
    packageIds: ['raja-ampat-ultimate']
  }
];

export const DESTINATION_ALIASES = [
  { keywords: ['danau toba', 'toba', 'samosir', 'silangit'], destId: 'toba' },
  { keywords: ['belitung', 'bangka belitung', 'laskar pelangi'], destId: 'belitung' },
  { keywords: ['labuan bajo', 'bajo', 'komodo', 'flores'], destId: 'labuan-bajo' },
  { keywords: ['lombok', 'gili', 'rinjani', 'mandalika'], destId: 'lombok' },
  { keywords: ['yogyakarta', 'jogja', 'yogya', 'borobudur', 'prambanan'], destId: 'yogyakarta' },
  { keywords: ['bromo', 'malang', 'gunung bromo'], destId: 'bromo' },
  { keywords: ['bandung', 'lembang', 'ciwidey'], destId: 'bandung' },
  { keywords: ['dieng', 'sikunir', 'wonosobo'], destId: 'dieng' },
  { keywords: ['karimunjawa', 'karimun jawa'], destId: 'karimunjawa' },
  { keywords: ['derawan', 'maratua', 'kakaban', 'sangalaki'], destId: 'derawan' },
  { keywords: ['sumba', 'waingapu', 'weekuri'], destId: 'sumba' },
  { keywords: ['toraja', 'tana toraja', 'rantepao'], destId: 'toraja' },
  { keywords: ['bunaken', 'manado'], destId: 'bunaken' },
  { keywords: ['wakatobi'], destId: 'wakatobi' },
  { keywords: ['raja ampat'], destId: 'raja-ampat' },
  { keywords: ['bali'], destId: 'bali' }
];

/**
 * Extract explicit destination, region, or island from text
 */
export function extractExplicitDestinationOrRegion(query) {
  if (!query) return null;
  const q = query.toLowerCase();

  // 1. Check destination aliases first
  for (const alias of DESTINATION_ALIASES) {
    if (alias.keywords.some((kw) => q.includes(kw))) {
      const d = getAllDestinations().find((item) => item.id === alias.destId);
      if (d) {
        return {
          type: 'DESTINATION',
          id: d.id,
          name: d.name,
          region: d.region,
          destination: d
        };
      }
    }
  }

  // 2. Check full destination list
  for (const d of getAllDestinations()) {
    if (q.includes(d.name.toLowerCase()) || q.includes(d.id.toLowerCase())) {
      return {
        type: 'DESTINATION',
        id: d.id,
        name: d.name,
        region: d.region,
        destination: d
      };
    }
  }

  // 3. Check region aliases (Sumatera, Jawa, etc.)
  for (const r of REGION_DATA) {
    if (r.aliases.some((kw) => q.includes(kw))) {
      return {
        type: 'REGION',
        id: r.id,
        name: r.name,
        canonicalRegion: r.canonicalRegion,
        destinations: r.destinations,
        packageIds: r.packageIds
      };
    }
  }

  return null;
}

/**
 * Extract conversational context from history
 */
export function extractContext(history = [], currentPackage = null) {
  let contextPkg = currentPackage ? normalizePackage(currentPackage) : null;
  let contextDest = currentPackage ? currentPackage.destination : null;
  let contextDuration = currentPackage ? currentPackage.durationDays : null;
  let contextPax = 2; // Default reasonable pair if unspecified
  let contextBudget = null;
  let contextTravelStyle = null;
  let guidedState = null;
  let lastAiMsg = null;
  let lastUserMsg = null;
  let awaitingResponseTo = null;

  const allPackages = getAllPackages();
  const allDestinations = getAllDestinations();

  // Scan backwards through history
  for (let i = history.length - 1; i >= 0; i--) {
    const msg = history[i];
    const text = (msg.text || '').toLowerCase();

    if (!lastAiMsg && msg.sender === 'ai') {
      lastAiMsg = msg;
    }
    if (!lastUserMsg && msg.sender === 'user') {
      lastUserMsg = msg;
    }

    // Check guided concierge state
    if (!guidedState && msg.sender === 'ai' && msg.guidedStep) {
      guidedState = {
        step: msg.guidedStep,
        preferences: msg.guidedPreferences || {}
      };
    }

    // Check travel style in history
    if (!contextTravelStyle) {
      const style = extractTravelStyle(text);
      if (style) contextTravelStyle = style;
    }

    // Check destination or region in message history (prioritize explicit entity)
    const entity = extractExplicitDestinationOrRegion(text);
    if (entity) {
      if (!contextDest || entity.type === 'REGION') {
        contextDest = entity.name;
      }
      if (!contextPkg) {
        const pkgs = searchPackages(entity.name);
        if (pkgs.length > 0) {
          contextPkg = normalizePackage(pkgs[0]);
          contextDuration = contextPkg.durationDays;
        }
      }
    }

    // Check package in previous assistant cards or metadata
    if (!contextPkg && msg.suggestedPackages && msg.suggestedPackages.length > 0) {
      contextPkg = normalizePackage(msg.suggestedPackages[0]);
      if (!contextDest) {
        contextDest = contextPkg.destination;
      }
      contextDuration = contextPkg.durationDays;
    }

    if (!contextDest) {
      for (const d of allDestinations) {
        if (text.includes(d.name.toLowerCase()) || text.includes(d.id.toLowerCase())) {
          contextDest = d.name;
          const pkgs = searchPackages(d.name);
          if (!contextPkg && pkgs.length > 0) {
            contextPkg = normalizePackage(pkgs[0]);
            contextDuration = contextPkg.durationDays;
          }
          break;
        }
      }
    }

    // Check duration in history
    if (!contextDuration) {
      const durM = text.match(/(\d+)\s*hari/i);
      if (durM) contextDuration = parseInt(durM[1], 10);
    }

    // Check budget in history
    if (!contextBudget) {
      const bInfo = extractBudget(text, contextPax);
      if (bInfo) contextBudget = bInfo.totalBudget;
    }

    // Check participant count in history
    const paxMatch = text.match(/(?:untuk\s+)?(\d+)\s*(?:orang|pax|peserta)/i);
    if (paxMatch) {
      contextPax = parseInt(paxMatch[1], 10);
    } else if (text.includes('berdua') || text.includes('2 orang')) {
      contextPax = 2;
    } else if (text.includes('bertiga') || text.includes('3 orang')) {
      contextPax = 3;
    } else if (text.includes('berempat') || text.includes('4 orang')) {
      contextPax = 4;
    } else if (text.includes('berlima') || text.includes('5 orang')) {
      contextPax = 5;
    } else if (text.includes('berenam') || text.includes('6 orang')) {
      contextPax = 6;
    }
  }

  // Derive awaitingResponseTo from last AI message
  if (lastAiMsg) {
    if (lastAiMsg.awaitingResponseTo) {
      awaitingResponseTo = lastAiMsg.awaitingResponseTo;
    } else {
      const aiText = (lastAiMsg.text || '').toLowerCase();
      if (/destinasi\s+(?:impian|pilihan|yang\s+ingin)|rekomendasi(?:kan)?\s+pilihan\s+terbaik|sudah\s+memiliki\s+destinasi|ada\s+yang\s+dapat\s+saya\s+bantu\s+rencanakan/i.test(aiText)) {
        awaitingResponseTo = 'DESTINATION_CONFIRMATION';
      } else if (/destinasi\s+mana\s+yang\s+ingin\s+anda\s+(?:kunjungi|tuju)|destinasi\s+mana\s+yang\s+paling/i.test(aiText)) {
        awaitingResponseTo = 'SPECIFIC_DESTINATION';
      } else if (/berapa\s+hari|berapa\s+lama\s+kira-kira/i.test(aiText)) {
        awaitingResponseTo = 'DURATION';
      } else if (/berapa\s+orang|jumlah\s+peserta|rombongan|jumlah\s+rombongan/i.test(aiText)) {
        awaitingResponseTo = 'PARTICIPANTS';
      } else if (/suasana\s+pantai.*pegunungan/i.test(aiText) || /pantai\s+eksotis.*pegunungan/i.test(aiText)) {
        awaitingResponseTo = 'TRAVEL_STYLE';
      } else if (/budget|anggaran/i.test(aiText)) {
        awaitingResponseTo = 'BUDGET';
      }
    }
  }

  return {
    contextPkg,
    contextDest,
    contextDuration,
    contextPax,
    contextBudget,
    contextTravelStyle,
    guidedState,
    lastAiMsg,
    lastUserMsg,
    awaitingResponseTo
  };
}

/**
 * Parse participant count from query string
 */
export function extractParticipantCount(query) {
  const q = (query || '').toLowerCase();
  if (q.includes('sendiri') || q.includes('solo') || q.includes('1 orang') || q.includes('satu orang')) return 1;
  if (q.includes('berdua') || q.includes('2 orang') || q.includes('dua orang') || q.includes('pasangan')) return 2;
  if (q.includes('bertiga') || q.includes('3 orang') || q.includes('tiga orang')) return 3;
  if (q.includes('berempat') || q.includes('4 orang') || q.includes('empat orang')) return 4;
  if (q.includes('berlima') || q.includes('5 orang') || q.includes('lima orang')) return 5;
  if (q.includes('berenam') || q.includes('6 orang') || q.includes('enam orang')) return 6;
  if (q.includes('tujuh orang') || q.includes('7 orang')) return 7;
  if (q.includes('delapan orang') || q.includes('8 orang')) return 8;
  if (q.includes('sembilan orang') || q.includes('9 orang')) return 9;
  if (q.includes('sepuluh orang') || q.includes('10 orang')) return 10;

  const match = q.match(/(\d+)\s*(?:orang|pax|peserta|jiwa)/i);
  if (match) return parseInt(match[1], 10);

  // Fallback pattern: "kalau 4?" or "untuk 2?" or "buat 5?"
  const numOnlyMatch = q.match(/(?:kalau|untuk|buat)\s+(\d+)\s*\??$/i);
  if (numOnlyMatch) return parseInt(numOnlyMatch[1], 10);

  return null;
}

/**
 * Parse budget amount from query
 */
export function extractBudget(query, participantCount = 1) {
  const q = (query || '').toLowerCase();

  // Pattern: "7 juta untuk 2 orang" or "7jt berdua"
  const multiPersonBudget = q.match(/(\d+(?:[\.,]\d+)?)\s*(?:juta|jt).*?(?:untuk|buat)?\s*(\d+|berdua|bertiga|berempat)\s*orang?/i);
  if (multiPersonBudget) {
    const rawNum = parseFloat(multiPersonBudget[1].replace(',', '.'));
    const totalBudget = Math.round(rawNum * 1000000);
    let pax = participantCount;
    const paxWord = multiPersonBudget[2].toLowerCase();
    if (paxWord === 'berdua' || paxWord === '2') pax = 2;
    else if (paxWord === 'bertiga' || paxWord === '3') pax = 3;
    else if (paxWord === 'berempat' || paxWord === '4') pax = 4;
    else if (!isNaN(parseInt(paxWord, 10))) pax = parseInt(paxWord, 10);

    return {
      totalBudget,
      budgetPerPerson: Math.round(totalBudget / Math.max(1, pax)),
      isTotalForGroup: true,
      participantCount: pax
    };
  }

  // Pattern: "budget sekitar 5 juta" or "anggaran 7 juta" or "5jt"
  const singleBudget = q.match(/(?:budget|anggaran|dana|uang)\s*(?:saya\s*)?(?:sekitar\s*)?(\d+(?:[\.,]\d+)?)\s*(?:juta|jt)/i) ||
    q.match(/(\d+(?:[\.,]\d+)?)\s*(?:juta|jt)/i);

  if (singleBudget) {
    const rawNum = parseFloat(singleBudget[1].replace(',', '.'));
    const amount = Math.round(rawNum * 1000000);
    const isTotal = (participantCount > 1 && !q.includes('per orang') && !q.includes('tiap orang'));
    return {
      totalBudget: isTotal ? amount : amount * participantCount,
      budgetPerPerson: isTotal ? Math.round(amount / participantCount) : amount,
      isTotalForGroup: isTotal,
      participantCount
    };
  }

  return null;
}

/**
 * Detect out-of-scope queries
 */
function isOutOfScope(query) {
  const q = query.toLowerCase();
  const patterns = [
    /presiden/i, /menteri/i, /politik/i, /pemilu/i, /partai/i, /dpr/i,
    /sepak\s*bola/i, /pemain\s+terbaik/i, /liga\s+champion/i, /ronaldo/i, /messi/i,
    /resep/i, /nasi\s+goreng/i, /masak/i, /rendang/i,
    /coding/i, /javascript/i, /python/i, /html/i, /css/i, /react/i, /bikin\s+website/i,
    /kurs\s+dolar/i, /bitcoin/i, /crypto/i, /saham/i,
    /buatkan\s+(puisi|cerpen|pantun|skripsi)/i,
    /matematika/i, /rumus/i, /fisika/i, /kimia/i,
    /artis/i, /selebriti/i, /gosip/i
  ];
  return patterns.some((p) => p.test(q));
}

/**
 * Primary Intent Classification Engine
 */
export function classifyIntent(query, context = {}) {
  const q = normalizeInput(query);

  // 1. Out of Scope Check
  if (isOutOfScope(q)) {
    return INTENTS.OUT_OF_SCOPE;
  }

  // 2. THANK YOU INTENT
  // Matches expressions of gratitude, even if preceded by "oke", "baik", or "siap".
  // e.g. "okee baik terimakasih", "oke terima kasih", "makasih", "thanks"
  if (/(?:terima\s*kasih|makasih|makasii|thanks|thank\s*you|thx|tengkyu|trims|matur\s*nuwun|suwun)/i.test(q)) {
    return INTENTS.THANKS;
  }

  // 3. FAREWELL INTENT
  if (/(?:sampai\s*jumpa|dadah|bye|selamat\s*tinggal|nanti\s*lagi|pamit|see\s*you|sampai\s*nanti)/i.test(q)) {
    return INTENTS.FAREWELL;
  }

  // Check explicit destination or region early to guard recommendation & fallback
  const explicitEntity = extractExplicitDestinationOrRegion(q);

  // 4. ACKNOWLEDGEMENT & AFFIRMATIVE INTENT
  // Pure confirmations/acknowledgements without a new substantive question.
  // e.g. "oke", "okee", "baik", "siap", "noted", "iya ada", "sudah ada", "ada"
  const isAffirmative = /^(?:iya\s+ada|ada\s+dong|ada\s+kak|ada\s+min|ada|sudah\s+ada|udah\s+ada|punya|aku\s+(?:sudah|udah)\s+ada\s+tujuan|ada\s+tujuan(?:nya)?|sudah|udah|iya|ya|tentu|betul|benar|yup|yap)[.!\s]*$/i.test(q);
  const isPureAck = /^(?:oke+|ok|baik|baiklah|siap|mengerti|paham|mantap|keren|sip|noted|oke\s*deh|oke\s*siap|siap\s*paham|siap\s*kak|siap\s*mas|oke\s*kak|oke\s*mas|oke\s*baik|baik\s*oke|siap\s*laksanakan)[.!\s]*$/i.test(q);
  if ((isPureAck || isAffirmative) && !explicitEntity) {
    return INTENTS.ACKNOWLEDGEMENT;
  }

  // 5. GREETING INTENT
  // Pure greeting without a package search attached.
  const isPureGreeting = /^(?:halo|hai|hi|hey|hello|assalamu'?alaikum|selamat\s+(?:pagi|siang|sore|malam)|pagi|siang|sore|malam)(?:[.!\s]+(?:fadza|min|kak|mas|admin|ai)?)?[.!\s]*$/i.test(q);
  if (isPureGreeting) {
    return INTENTS.GREETING;
  }

  // 6. HOW TO BOOK (Direct question about booking process)
  // e.g. "Bagaimana cara booking?", "Cara pesannya gimana?", "Gimana cara order?"
  if (/(?:bagaimana|gimana|tata\s*cara|langkah)\s+(?:cara\s+)?(?:booking|pesan|reservasi|order)/i.test(q) ||
      /(?:cara\s+pesan|cara\s+booking|cara\s+reservasi)(?:nya)?(?:\s+gimana|\s+bagaimana|\?)?$/i.test(q)) {
    return INTENTS.HOW_TO_BOOK;
  }

  // 7. BOOKING INTENT (Intent to book / proceed with a package)
  // e.g. "Saya mau booking yang tadi", "Saya mau booking", "Mau pesan paket ini", "Booking sekarang"
  if (/(?:booking\s+yang\s+tadi|booking\s+paket\s+ini|saya\s+mau\s+booking|mau\s+pesan\s+paket|pesan\s+sekarang|daftar\s+sekarang|hubungi\s+fadza\s+untuk\s+booking)/i.test(q) ||
      /^(?:saya\s+)?(?:mau|ingin)\s+(?:booking|pesan|reservasi)[.!\s]*$/i.test(q)) {
    return INTENTS.BOOKING;
  }

  // 8. COMPARISON INTENT
  // e.g. "Bandingkan Bali dan Lombok", "Bandingin Bali sama Lombok", "Bedanya apa", "Yang paling santai yang mana?"
  if (/(?:bandingkan|bandingin|bedanya|mana\s+yang\s+lebih|murahan\s+mana|vs|versus|yang\s+paling\s+santai|paling\s+santai\s+yang\s+mana|mana\s+yang\s+paling)/i.test(q)) {
    return INTENTS.COMPARISON;
  }

  // 9. RECOMMENDATION & DISCOVERY INTENT (Only if NO explicit entity provided)
  // e.g. "Saya belum tahu mau ke mana", "Enaknya liburan ke mana?", "Bingung mau ke mana", "Rekomendasi liburan"
  if (!explicitEntity && /(?:belum\s+tahu|belum\s+ada|belum|bingung|rekomendasi|rekomendasiin|mau\s+liburan|ke\s+mana\s+ya|saran|enaknya\s+kemana|enaknya\s+ke\s+mana|enaknya\s+liburan|pilihan\s+liburan|bagusan\s+mana)/i.test(q)) {
    return INTENTS.RECOMMENDATION;
  }

  // 10. MULTI-TASK SEARCH (Destination + Participants + Duration + Budget)
  // e.g. "Saya mau ke Bali, berdua, 4 hari, budget 7 juta."
  const hasDest = getAllDestinations().some((d) => q.includes(d.name.toLowerCase()) || q.includes(d.id.toLowerCase()));
  const hasPaxCount = extractParticipantCount(q) !== null;
  const hasDurDays = q.match(/(\d+)\s*hari/i) !== null;
  const hasBudgetVal = /(?:budget|anggaran|dana|uang)\s*(?:sekitar\s*)?\d+/i.test(q) || /\d+\s*(?:juta|jt)/i.test(q);

  if (hasDest && hasPaxCount && hasDurDays && hasBudgetVal) {
    return INTENTS.MULTI_TASK_SEARCH;
  }

  // 11. TRAVEL STYLE PREFERENCE INTENT
  // e.g. "Saya mau perjalanan santai.", "Saya mau perjalanan santai ke Bali.", "Trip yang santai"
  const travelStyleFound = extractTravelStyle(q);
  if (travelStyleFound && !q.includes('terima kasih') && !q.includes('booking')) {
    return INTENTS.TRAVEL_STYLE_PREFERENCE;
  }

  // 12. PRICE CALCULATION INTENT (Multi-person Math)
  // e.g. "Kalau 2 orang?", "Kalau berdua?", "Kalau 3 orang berapa?", "Berenam habis berapa?"
  const hasPax = extractParticipantCount(q) !== null;
  const hasCalcTerms = /(?:berapa|biaya|total|habis\s+berapa|hitung|kalkulasi|kalau\s+\d+|untuk\s+\d+|buat\s+\d+|kalau\s+berdua|kalau\s+bertiga)/i.test(q);
  if (hasPax && hasCalcTerms && !q.includes('budget') && !q.includes('bandingkan')) {
    return INTENTS.PRICE_CALCULATION;
  }

  // 13. PACKAGE PRICE INQUIRY (Single / General)
  // e.g. "Berapa harga paket Bali?", "Berapa harga Bali Escape?", "Harganya berapa?"
  if (/(?:berapa\s+(?:harga|tarif|biaya)|harganya\s+berapa|tarifnya\s+berapa|biayanya\s+berapa|berapaan|price)/i.test(q)) {
    return INTENTS.PACKAGE_PRICE;
  }

  // 14. INCLUDED / EXCLUDED
  // e.g. "Apa yang termasuk?", "Apa saja yang tidak termasuk?", "Included apa saja?"
  if (/(?:termasuk|included|include|tidak\s+termasuk|belum\s+termasuk|excluded|exclude|dapat\s+apa\s+saja|dapat\s+apa)/i.test(q)) {
    return INTENTS.INCLUDED_EXCLUDED;
  }

  // 15. FACILITY QUESTION
  // e.g. "Apa fasilitasnya?", "Fasilitas apa saja?"
  if (/(?:fasilitas|benefit|keuntungan)/i.test(q)) {
    return INTENTS.FACILITY_QUESTION;
  }

  // 16. ITINERARY & AGENDA QUESTION
  // e.g. "Hari pertama ngapain?", "Jelaskan itinerary-nya"
  if (/(?:itinerary|jadwal|rundown|agenda|rute|hari\s+ke|ngapain\s+aja|day\s+\d+|jadwal\s+kegiatan)/i.test(q)) {
    return INTENTS.ITINERARY_QUESTION;
  }

  // 17. LOGISTICS: TRANSPORTATION & ACCOMMODATION
  if (/(?:transport|mobil|armada|kendaraan|driver|mobilnya\s+apa)/i.test(q)) {
    return INTENTS.TRANSPORTATION_QUESTION;
  }
  if (/(?:hotel|nginep|penginapan|resor|resort|kamar|tidur\s+di\s+mana)/i.test(q)) {
    return INTENTS.ACCOMMODATION_QUESTION;
  }

  // 18. GENERAL FADZA INFO & BRAND INQUIRY
  // e.g. "FADZA TRIP ADVENTURE itu apa?", "Siapa FADZA?", "Profil FADZA"
  if (/(?:fadza\s+trip\s+adventure\s+itu\s+apa|siapa\s+fadza|profil\s+fadza|tentang\s+fadza|legalitas\s+fadza|fadza\s+itu\s+apa|apa\s+itu\s+fadza|kantor\s+fadza|alamat\s+fadza)/i.test(q)) {
    return INTENTS.GENERAL_FADZA_INFO;
  }

  // 19. CONTACT INQUIRY
  if (/(?:kontak\s+fadza|nomor\s+(?:telepon|wa|whatsapp)|customer\s+service|cs\s+fadza|kontak\s+resmi)/i.test(q)) {
    return INTENTS.CONTACT;
  }

  // 20. BUDGET SEARCH INTENT
  // e.g. "Budget saya 5 juta", "Anggaran 7 juta untuk 2 orang"
  if (/(?:budget|anggaran|dana|uang)\s*(?:saya|kami)?/i.test(q) || /\d+\s*(?:juta|jt)/i.test(q)) {
    return INTENTS.BUDGET_SEARCH;
  }

  // 21. DURATION SEARCH INTENT
  // e.g. "Saya mau 3 hari", "Yang 4 hari ada?"
  if (/\d+\s*hari/i.test(q)) {
    return INTENTS.DURATION_SEARCH;
  }

  // 22. DESTINATION QUESTION VS GENERAL CONVERSATION VS PACKAGE SEARCH
  if (/(?:bogor|puncak|sukabumi).*?(?:jawa\s*barat|di\s*mana|dimana|kan|ya)/i.test(q) && !/(?:paket|trip|wisata|tour|liburan|harga|sewa)/i.test(q)) {
    return INTENTS.DESTINATION_QUESTION;
  }
  if (/(?:saya\s+pernah\s+ke|pernah\s+liburan\s+ke|pernah\s+ke|kayaknya\s+.*?menarik|kayaknya\s+mahal)/i.test(q)) {
    return INTENTS.GENERAL_CONVERSATION;
  }

  // 23. PACKAGE SEARCH OR DESTINATION SEARCH INTENT
  const searchSignals = /(?:ada\s+paket|carikan|cari\s+paket|mencari\s+paket|ada\s+trip|pilihan\s+paket|mau\s+ke|mau\s+liburan\s+ke|paket\s+wisata|trip\s+ke|tersedia|paket\s+apa|destinasi\s+apa|apakah\s+ada|ada\s+apa|ada\s+destinasi|punya\s+paket|ada\?|apakah\s+ada\??|gimana|info)/i.test(q);
  const mentionsDestination = getAllDestinations().some((d) => q.includes(d.name.toLowerCase()) || q.includes(d.id.toLowerCase()));
  const mentionsUnknownDest = [
    'bogor', 'puncak', 'sukabumi', 'bekasi', 'depok', 'tangerang', 'semarang',
    'surabaya', 'malang kota', 'batu', 'medan', 'padang', 'aceh', 'lampung',
    'palembang', 'bali utara', 'jepang', 'korea', 'singapura', 'malaysia',
    'thailand', 'vietnam', 'eropa', 'swiss', 'paris', 'turki', 'australia',
    'amerika', 'dubai', 'china', 'hongkong', 'taiwan'
  ].some((loc) => q.includes(loc));

  if (explicitEntity || searchSignals || mentionsDestination || mentionsUnknownDest) {
    return INTENTS.PACKAGE_SEARCH;
  }

  // 24. FAQ INQUIRY
  if (searchFaq(q)) {
    return INTENTS.FAQ;
  }

  return INTENTS.CLARIFICATION;
}

/**
 * Main Concierge Intelligence Engine
 * Response Decision Tree:
 * USER MESSAGE -> INTENT CLASSIFICATION -> CONTEXT EVALUATION -> ONE QUESTION OR DIRECT ANSWER
 * ZERO GENERIC MENU LISTS.
 */
export async function generateTravelResponse({
  message,
  history = [],
  currentPackage = null
}) {
  // Brief delay to simulate natural concierge consideration (240ms)
  await new Promise((resolve) => setTimeout(resolve, 240));

  const trimmed = (message || '').trim();
  const allPackages = getAllPackages().map(normalizePackage);
  const allDestinations = getAllDestinations();

  // If user opens chat empty
  if (!trimmed) {
    return {
      intent: INTENTS.GREETING,
      mode: 'MODE_A_CONVERSATIONAL',
      text: 'Halo! Selamat datang di **FADZA TRIP ADVENTURE**.\n\nSaya **FADZA AI**, *Intelligent Travel Concierge* resmi Anda. Ada yang dapat saya bantu rencanakan untuk liburan Anda?',
      suggestedPackages: [],
      suggestedDestinations: [],
      quickReplies: [
        '✦ Cari paket untuk saya',
        'Destinasi yang tersedia',
        'Cari berdasarkan budget',
        'Tanya rekomendasi liburan'
      ]
    };
  }

  const query = normalizeInput(trimmed);
  const context = extractContext(history, currentPackage);

  // EXPLICIT DESTINATION OR REGION OVERRIDE
  // Rule 20: JIKA USER MENGGANTI DESTINASI, OLD DESTINATION CONTEXT MUST BE OVERRIDDEN!
  const explicitEntity = extractExplicitDestinationOrRegion(query);
  if (explicitEntity) {
    if (context.contextPkg) {
      const p = context.contextPkg;
      const linkedDest = allDestinations.find((d) => d.id === p.destinationId || d.name.toLowerCase() === (p.destination || '').toLowerCase());
      const pRegion = (linkedDest?.region || '').toLowerCase();
      const pDest = (p.destination || '').toLowerCase();
      const pDestId = (p.destinationId || '').toLowerCase();

      let matches = false;
      if (explicitEntity.type === 'REGION') {
        matches = explicitEntity.packageIds.includes(p.id) || pRegion.includes(explicitEntity.id) || (explicitEntity.id === 'sumatra' && ['toba-highland', 'belitung-island'].includes(p.id));
      } else if (explicitEntity.type === 'DESTINATION') {
        matches = pDest.includes(explicitEntity.name.toLowerCase()) || pDestId.includes(explicitEntity.id.toLowerCase());
      }

      if (!matches) {
        context.contextPkg = null;
      }
    }
    context.contextDest = explicitEntity.name;
  }

  const participants = extractParticipantCount(query) || context.contextPax || 2;
  const budgetInfo = extractBudget(query, participants);
  const durMatch = query.match(/(\d+)\s*hari/i);
  const durationDays = durMatch ? parseInt(durMatch[1], 10) : null;

  // Classify intent
  const intent = classifyIntent(query, context);

  // =========================================================================
  // 1. OUT OF SCOPE
  // =========================================================================
  if (intent === INTENTS.OUT_OF_SCOPE) {
    return {
      intent,
      mode: 'MODE_A_CONVERSATIONAL',
      text: 'Maaf, saya merupakan asisten virtual resmi **FADZA TRIP ADVENTURE**.\n\nSaya hanya dapat membantu Anda mengenai destinasi wisata, paket perjalanan, rute, harga, itinerary, fasilitas, dan informasi perjalanan yang tersedia di website kami.\n\nApakah ada destinasi atau paket wisata Nusantara yang ingin Anda tanyakan?',
      awaitingResponseTo: 'DESTINATION_CONFIRMATION',
      suggestedPackages: [],
      suggestedDestinations: [],
      quickReplies: [
        'Destinasi yang tersedia',
        '✦ Cari paket untuk saya',
        'Tanya rekomendasi liburan'
      ]
    };
  }

  // =========================================================================
  // 2. THANK YOU INTENT (MODE A: CONVERSATIONAL — ZERO CARDS, ZERO MENU)
  // e.g. "Terima kasih", "okee baik terimakasih", "makasih ya"
  // =========================================================================
  if (intent === INTENTS.THANKS) {
    return {
      intent,
      mode: 'MODE_A_CONVERSATIONAL',
      text: 'Sama-sama! Senang dapat membantu Anda. Jika ada hal lain yang ingin ditanyakan tentang perjalanan Anda bersama FADZA TRIP ADVENTURE, saya selalu siap membantu.',
      awaitingResponseTo: 'GENERAL_INQUIRY',
      suggestedPackages: [],
      suggestedDestinations: [],
      quickReplies: [
        'Destinasi yang tersedia',
        '✦ Cari paket untuk saya',
        'Tanya rekomendasi liburan'
      ]
    };
  }

  // =========================================================================
  // 3. FAREWELL INTENT (MODE A: CONVERSATIONAL — ZERO CARDS)
  // e.g. "sampai jumpa", "dadah", "nanti lagi ya", "pamit"
  // =========================================================================
  if (intent === INTENTS.FAREWELL) {
    return {
      intent,
      mode: 'MODE_A_CONVERSATIONAL',
      text: 'Sama-sama. Semoga rencana perjalanan Anda menyenangkan! Saya siap membantu kapan pun Anda membutuhkan informasi dari **FADZA TRIP ADVENTURE**.',
      awaitingResponseTo: null,
      suggestedPackages: [],
      suggestedDestinations: [],
      quickReplies: [
        'Destinasi yang tersedia',
        'Hubungi via WhatsApp'
      ]
    };
  }

  // =========================================================================
  // 4. ACKNOWLEDGEMENT INTENT (MODE A: CONVERSATIONAL — ZERO CARDS, ZERO MENU)
  // e.g. "Oke.", "Baik.", "Siap.", "Paham.", "Oke baik.", "Iya ada", "Sudah ada"
  // =========================================================================
  if (intent === INTENTS.ACKNOWLEDGEMENT) {
    const isAffirmativeDest = context.awaitingResponseTo === 'DESTINATION_CONFIRMATION' ||
      /^(?:iya\s+ada|ada\s+dong|ada\s+kak|ada\s+min|ada|sudah\s+ada|udah\s+ada|punya|aku\s+(?:sudah|udah)\s+ada\s+tujuan|ada\s+tujuan(?:nya)?)[.!\s]*$/i.test(query);

    if (isAffirmativeDest) {
      return {
        intent,
        mode: 'MODE_A_CONVERSATIONAL',
        text: 'Baik. Destinasi mana yang ingin Anda kunjungi bersama **FADZA TRIP ADVENTURE**?\n\nKami melayani berbagai destinasi seperti Bali, Labuan Bajo, Lombok, Bromo & Malang, Danau Toba, Belitung, Derawan, hingga Raja Ampat.',
        awaitingResponseTo: 'SPECIFIC_DESTINATION',
        suggestedPackages: [],
        suggestedDestinations: [],
        quickReplies: [
          'Bali',
          'Labuan Bajo',
          'Lombok',
          'Sumatera',
          'Bromo & Malang',
          'Raja Ampat'
        ]
      };
    }

    return {
      intent,
      mode: 'MODE_A_CONVERSATIONAL',
      text: 'Baik. Jika ada hal lain yang ingin Anda ketahui, silakan beri tahu saya.',
      awaitingResponseTo: 'GENERAL_INQUIRY',
      suggestedPackages: [],
      suggestedDestinations: [],
      quickReplies: [
        'Destinasi yang tersedia',
        'Hitung biaya perjalanan',
        '✦ Cari paket untuk saya'
      ]
    };
  }

  // =========================================================================
  // 5. GREETING INTENT (MODE A: CONVERSATIONAL — ZERO CARDS, ZERO MENU)
  // e.g. "Halo", "Selamat pagi", "Hi", "malammm"
  // =========================================================================
  if (intent === INTENTS.GREETING) {
    let timeGreeting = 'selamat datang';
    if (query.includes('pagi')) timeGreeting = 'selamat pagi';
    else if (query.includes('siang')) timeGreeting = 'selamat siang';
    else if (query.includes('sore')) timeGreeting = 'selamat sore';
    else if (query.includes('malam')) timeGreeting = 'selamat malam';
    else {
      const hour = new Date().getHours();
      if (hour >= 4 && hour < 11) timeGreeting = 'selamat pagi';
      else if (hour >= 11 && hour < 15) timeGreeting = 'selamat siang';
      else if (hour >= 15 && hour < 18) timeGreeting = 'selamat sore';
      else timeGreeting = 'selamat malam';
    }

    return {
      intent,
      mode: 'MODE_A_CONVERSATIONAL',
      text: `Halo, ${timeGreeting} di **FADZA TRIP ADVENTURE**. Saya **FADZA AI**, asisten perjalanan resmi Anda.\n\nAda yang dapat saya bantu rencanakan untuk liburan Anda?`,
      awaitingResponseTo: 'DESTINATION_CONFIRMATION',
      suggestedPackages: [],
      suggestedDestinations: [],
      quickReplies: [
        '✦ Cari paket untuk saya',
        'Destinasi yang tersedia',
        'Cari berdasarkan budget',
        'Tanya rekomendasi liburan'
      ]
    };
  }

  // =========================================================================
  // 6. HOW TO BOOK (Direct explanation of booking process — NO CARDS, NO MENU)
  // e.g. "Bagaimana cara booking?", "Cara pesannya gimana?"
  // =========================================================================
  if (intent === INTENTS.HOW_TO_BOOK) {
    return {
      intent,
      mode: 'MODE_B_INFORMATIONAL',
      text: `Untuk melakukan pemesanan (booking), Anda dapat langsung menghubungi FADZA TRIP ADVENTURE melalui WhatsApp di nomor resmi kami **+62 858-8815-9765**.\n\n` +
        `Jika Anda sudah menentukan paketnya, Anda cukup memberi tahu nama paket, tanggal rencana liburan, dan jumlah rombongan. Saya juga dapat membantu merangkumkan pesanan Anda agar langsung siap dikirimkan ke admin WhatsApp kami.`,
      suggestedPackages: [],
      suggestedDestinations: [],
      quickReplies: [
        'Paket Bali Escape',
        'Paket Labuan Bajo',
        'Destinasi yang tersedia'
      ]
    };
  }

  // =========================================================================
  // 7. BOOKING INTENT (e.g. "Saya mau booking yang tadi", "Saya mau booking")
  // =========================================================================
  if (intent === INTENTS.BOOKING) {
    let targetPkg = null;
    for (const p of allPackages) {
      if (query.includes(p.name.toLowerCase()) || query.includes(p.destination.toLowerCase()) || query.includes(p.id.toLowerCase())) {
        targetPkg = p;
        break;
      }
    }
    if (!targetPkg) {
      targetPkg = context.contextPkg;
    }

    if (targetPkg) {
      const pax = participants || context.contextPax || 2;
      const calc = calculatePackageTotal(targetPkg, pax);
      const waLink = generateBookingWhatsAppLink(targetPkg, pax);

      return {
        intent,
        mode: 'MODE_G_BOOKING',
        text: `Baik! Saya siap membantu mengarahkan Anda untuk reservasi paket **${targetPkg.name}** untuk **${pax} orang** (estimasi total **${calc.formattedTotalPrice}**).\n\n` +
          `• **DP Konfirmasi Reservasi (30%)**: ${calc.formattedDownPayment}\n` +
          `• **Sisa Pelunasan**: ${calc.formattedRemaining} (paling lambat H-7 keberangkatan)\n\n` +
          `Silakan klik tombol **"Booking via WhatsApp"** di bawah ini untuk terhubung langsung dengan admin resmi kami dengan rincian pesanan yang sudah terisi otomatis.`,
        suggestedPackages: [targetPkg],
        bookingInfo: {
          package: targetPkg,
          participants: pax,
          calculation: calc,
          whatsappUrl: waLink
        },
        calculation: calc,
        quickReplies: [
          'Apa saja yang termasuk?',
          'Jelaskan itinerary-nya',
          'Meeting point di mana?'
        ]
      };
    } else {
      return {
        intent,
        mode: 'MODE_G_BOOKING',
        text: `Tentu, saya siap membantu mengarahkan proses pemesanan Anda ke konsultan resmi kami via WhatsApp.\n\nBoleh tahu paket perjalanan mana yang ingin Anda pesan?`,
        suggestedPackages: [],
        suggestedDestinations: [],
        quickReplies: [
          'Paket Bali Escape',
          'Paket Labuan Bajo',
          'Destinasi yang tersedia'
        ]
      };
    }
  }

  // =========================================================================
  // 8. MULTI-TASK SEARCH (Destination + Participants + Duration + Budget)
  // e.g. "Saya mau ke Bali, berdua, 4 hari, budget 7 juta."
  // =========================================================================
  if (intent === INTENTS.MULTI_TASK_SEARCH) {
    let targetDest = allDestinations.find((d) => query.includes(d.name.toLowerCase()) || query.includes(d.id.toLowerCase())) || allDestinations[0];
    let matchingPkgs = allPackages.filter((p) => {
      const isDest = p.destination.toLowerCase().includes(targetDest.name.toLowerCase());
      const isDur = p.durationDays === durationDays;
      return isDest && isDur;
    });

    if (matchingPkgs.length === 0) {
      matchingPkgs = searchPackages(targetDest.name);
    }

    const targetPkg = matchingPkgs[0] || allPackages[0];
    const calc = calculatePackageTotal(targetPkg, participants);
    const budgetTotal = budgetInfo?.totalBudget || 7000000;
    const isWithinBudget = calc.totalPrice <= budgetTotal;
    const diff = Math.abs(budgetTotal - calc.totalPrice);

    let resp = `Tentu! Saya telah menganalisis seluruh kebutuhan perjalanan Anda ke **${targetDest.name}**:\n\n` +
      `• **Paket Rekomendasi**: **${targetPkg.name}** (${targetPkg.duration})\n` +
      `• **Gaya Perjalanan**: ${targetPkg.travelStyleLabel || targetPkg.travelStyle}\n` +
      `• **Jumlah Peserta**: ${participants} orang\n\n` +
      `✦ **Kalkulasi Biaya Resmi**:\n` +
      `• Tarif per orang: ${calc.formattedPricePerPerson}\n` +
      `• Perhitungan: ${calc.formattedPricePerPerson} × ${participants} orang\n` +
      `✦ **Estimasi Total Biaya**: **${calc.formattedTotalPrice}**\n` +
      `• DP Konfirmasi Reservasi (30%): ${calc.formattedDownPayment}\n\n`;

    if (isWithinBudget) {
      resp += `✦ **Evaluasi Anggaran**: Paket ini **MASUK DALAM BUDGET** Anda sebesar ${formatRupiah(budgetTotal)} dengan sisa anggaran **${formatRupiah(diff)}**.\n\n`;
    } else {
      resp += `✦ **Catatan Anggaran**: Estimasi total paket (${calc.formattedTotalPrice}) melebihi budget sekitar ${formatRupiah(diff)}.\n\n`;
    }

    resp += `Paket ini sudah mencakup armada privat ber-AC khusus rombongan Anda, hotel bintang 4 pilihan, seluruh tiket masuk objek wisata, dan pemandu lokal berlisensi.`;

    return {
      intent,
      mode: 'MODE_C_SEARCH',
      text: resp,
      suggestedPackages: [targetPkg],
      calculation: calc,
      bookingInfo: {
        package: targetPkg,
        participants,
        calculation: calc,
        whatsappUrl: generateBookingWhatsAppLink(targetPkg, participants)
      },
      quickReplies: [
        'Apa saja yang termasuk?',
        'Jelaskan itinerary-nya',
        'Saya mau booking paket ini'
      ]
    };
  }

  // =========================================================================
  // 9. TRAVEL STYLE PREFERENCE INTENT (Natural conversational discovery)
  // e.g. "Saya mau perjalanan santai.", "Saya mau perjalanan santai ke Bali."
  // =========================================================================
  if (intent === INTENTS.TRAVEL_STYLE_PREFERENCE) {
    const style = extractTravelStyle(query) || context.contextTravelStyle || 'santai';

    let targetDest = null;
    if (explicitEntity) {
      targetDest = explicitEntity;
    } else {
      for (const d of allDestinations) {
        if (query.includes(d.name.toLowerCase()) || query.includes(d.id.toLowerCase())) {
          targetDest = d;
          break;
        }
      }
      if (!targetDest && context.contextDest) {
        targetDest = allDestinations.find((d) => d.name.toLowerCase() === context.contextDest.toLowerCase()) || { name: context.contextDest };
      }
    }

    const targetDuration = durationDays || context.contextDuration;

    // Check if query is an inquiry asking for available relaxed options
    // e.g. "Kalau Sumatera ada yang santai?" or "Ada yang santai di Sumatera?"
    const isStyleInquiry = query.includes('ada') || query.includes('pilihan') || query.includes('kalau');
    if (targetDest && (targetDuration || isStyleInquiry || targetDest.type === 'REGION')) {
      const destName = targetDest.name;
      const searchKey = targetDest.id || destName;
      let matchingPkgs = searchPackages(searchKey).map(normalizePackage);

      if (targetDuration) {
        const exactDur = matchingPkgs.filter((p) => p.durationDays === targetDuration);
        if (exactDur.length > 0) matchingPkgs = exactDur;
      }

      if (matchingPkgs.length > 0) {
        let resp = `Ya, untuk perjalanan santai di kawasan **${destName}**, FADZA TRIP ADVENTURE memiliki pilihan paket privat resmi dengan ritme yang tenang dan leluasa:\n\n`;
        matchingPkgs.forEach((p) => {
          resp += `• **${p.name} (${p.duration})**: ${p.tagline} — **${p.formattedPrice}/orang**\n`;
        });
        resp += `\nSeluruh paket dirancang seimbang dengan armada privat ber-AC dan hotel berbintang pilihan tanpa jadwal terburu-buru.\n\nPaket mana yang ingin Anda ketahui lebih detail?`;

        return {
          intent,
          mode: 'MODE_C_SEARCH',
          text: resp,
          suggestedPackages: matchingPkgs.slice(0, 3),
          quickReplies: [
            'Yang paling santai yang mana?',
            'Ada yang 4 hari?',
            'Berapa kalau untuk 2 orang?'
          ]
        };
      }
    }

    // Case B: Destination known, duration not yet known -> Ask duration (ONE question!)
    if (targetDest && !targetDuration) {
      return {
        intent,
        mode: 'MODE_A_CONVERSATIONAL',
        text: `Baik! Untuk perjalanan santai di **${targetDest.name}**, FADZA TRIP ADVENTURE memiliki pilihan rute dengan ritme yang nyaman dan tidak terburu-buru.\n\nBerapa hari kira-kira Anda ingin bepergian?`,
        suggestedPackages: [],
        suggestedDestinations: [],
        quickReplies: [
          '3 Hari',
          '4 Hari',
          '5 Hari',
          'Tergantung paket terbaik'
        ]
      };
    }

    // Case C: Destination not yet known -> Ask destination based on chosen style (ONE question!)
    if (style === 'pantai') {
      return {
        intent,
        mode: 'MODE_A_CONVERSATIONAL',
        text: `Untuk suasana pantai eksotis dan wisata bahari, **FADZA TRIP ADVENTURE** memiliki destinasi unggulan seperti **Bali**, **Labuan Bajo & Komodo**, **Pesona Belitung**, hingga **Raja Ampat**.\n\nDestinasi pantai mana yang paling ingin Anda kunjungi?`,
        awaitingResponseTo: 'SPECIFIC_DESTINATION',
        suggestedPackages: [],
        suggestedDestinations: [],
        quickReplies: ['Bali', 'Labuan Bajo', 'Belitung', 'Raja Ampat']
      };
    }
    if (style === 'pegunungan') {
      return {
        intent,
        mode: 'MODE_A_CONVERSATIONAL',
        text: `Untuk panorama alam dan pegunungan sejuk, kami memiliki pilihan seperti **Bromo & Malang**, **Danau Toba & Samosir**, **Dieng Plateau**, dan **Bandung Retreat**.\n\nDestinasi pegunungan mana yang menarik bagi Anda?`,
        awaitingResponseTo: 'SPECIFIC_DESTINATION',
        suggestedPackages: [],
        suggestedDestinations: [],
        quickReplies: ['Bromo & Malang', 'Danau Toba', 'Dieng Plateau', 'Bandung']
      };
    }
    if (style === 'budaya') {
      return {
        intent,
        mode: 'MODE_A_CONVERSATIONAL',
        text: `Untuk kekayaan budaya dan situs warisan Nusantara, kami memiliki **Yogyakarta Cultural Heritage** dan **Toraja Cultural Heritage**.\n\nDestinasi budaya mana yang ingin Anda jelajahi?`,
        awaitingResponseTo: 'SPECIFIC_DESTINATION',
        suggestedPackages: [],
        suggestedDestinations: [],
        quickReplies: ['Yogyakarta', 'Tana Toraja']
      };
    }

    return {
      intent,
      mode: 'MODE_A_CONVERSATIONAL',
      text: `Tentu. Saya akan menyesuaikan pencarian dengan gaya perjalanan yang lebih santai dan tidak terlalu padat.\n\nApakah Anda sudah memiliki destinasi yang ingin dikunjungi?`,
      awaitingResponseTo: 'DESTINATION_CONFIRMATION',
      suggestedPackages: [],
      suggestedDestinations: [],
      quickReplies: [
        'Ke Bali',
        'Ke Lombok',
        'Ke Yogyakarta',
        'Belum ada, beri saran'
      ]
    };
  }

  // =========================================================================
  // 10. PACKAGE COMPARISON INTENT (MODE E: COMPARISON)
  // e.g. "Bandingkan Bali dan Lombok", "Bandingin sama Lombok"
  // =========================================================================
  if (intent === INTENTS.COMPARISON) {
    if (query.includes('santai') || query.includes('tenang') || query.includes('healing')) {
      const tobaPkg = allPackages.find((p) => p.id === 'toba-highland');
      const belitungPkg = allPackages.find((p) => p.id === 'belitung-island');

      if ((context.contextDest && (context.contextDest.toLowerCase().includes('sumat') || context.contextDest.toLowerCase().includes('toba') || context.contextDest.toLowerCase().includes('belitung'))) ||
          (context.contextPkg && ['toba-highland', 'belitung-island'].includes(context.contextPkg.id))) {
        return {
          intent,
          mode: 'MODE_E_COMPARISON',
          text: `Di kawasan Sumatera, jika prioritas utama Anda adalah **pantai yang tenang dan perjalanan yang santai**, maka **Belitung Island Escape** adalah pilihan yang paling santai. Aksesnya sangat nyaman hanya 50 menit penerbangan dari Jakarta, lautnya tenang tanpa ombak besar, dan pulau-pulau granitnya sangat damai untuk bersantai.\n\n` +
            `Namun jika Anda lebih menginginkan suasana santai di **pegunungan dengan udara yang sejuk dan tenang**, **Danau Toba Cultural Escape** adalah pilihan tepat dengan panorama kaldera vulkanik dan keindahan Danau Toba dari tepi Pulau Samosir.\n\n` +
            `Keduanya memiliki ritme perjalanan privat yang leluasa tanpa terburu-buru. Paket mana yang lebih memikat hati Anda?`,
          suggestedPackages: [belitungPkg, tobaPkg],
          quickReplies: [
            'Berapa harga Belitung?',
            'Berapa harga Danau Toba?',
            'Ada yang 4 hari?',
            'Kalau berdua berapa?'
          ]
        };
      }
    }

    const matched = allPackages.filter((p) => {
      const qLower = query.toLowerCase();
      return qLower.includes(p.name.toLowerCase()) || qLower.includes(p.destination.toLowerCase()) || qLower.includes(p.id.toLowerCase());
    });

    let pkgA = matched[0] || context.contextPkg || allPackages[0];
    let pkgB = matched[1];

    if (!pkgB) {
      if (query.includes('lombok')) pkgB = allPackages.find((p) => p.destination.toLowerCase().includes('lombok'));
      else if (query.includes('bali')) pkgB = allPackages.find((p) => p.destination.toLowerCase().includes('bali'));
      else if (query.includes('bajo') || query.includes('labuan')) pkgB = allPackages.find((p) => p.destination.toLowerCase().includes('bajo'));
      else if (query.includes('raja')) pkgB = allPackages.find((p) => p.destination.toLowerCase().includes('raja'));
      else if (query.includes('bromo')) pkgB = allPackages.find((p) => p.destination.toLowerCase().includes('bromo'));
      else if (query.includes('jogja') || query.includes('yogyakarta')) pkgB = allPackages.find((p) => p.destination.toLowerCase().includes('yogyakarta'));
      else pkgB = allPackages.find((p) => p.id !== pkgA.id) || allPackages[1];
    }

    if (pkgA.id === pkgB.id) {
      pkgB = allPackages.find((p) => p.id !== pkgA.id) || allPackages[1];
    }

    const comp = comparePackages(pkgA, pkgB);

    let resp = `Berikut perbandingan objektif antara **${comp.pkgA.name}** dan **${comp.pkgB.name}** berdasarkan data resmi FADZA TRIP ADVENTURE:\n\n` +
      `• **${comp.pkgA.name}** (${comp.pkgA.duration}): Bertarif **${comp.pkgA.formattedPrice}/orang** dengan nuansa ${comp.pkgA.travelStyle}.\n` +
      `• **${comp.pkgB.name}** (${comp.pkgB.duration}): Bertarif **${comp.pkgB.formattedPrice}/orang** dengan nuansa ${comp.pkgB.travelStyle}.\n\n`;

    if (comp.samePrice) {
      resp += `Kedua paket memiliki tarif per orang yang sama. `;
    } else {
      resp += `Paket **${comp.cheaperPkg.name}** lebih hemat sebesar **${comp.formattedPriceDiff}/orang**. `;
    }

    resp += `Pilih **${comp.pkgA.name}** jika prioritas Anda adalah *${comp.pkgA.travelStyle}*, atau **${comp.pkgB.name}** jika menginginkan atmosfer *${comp.pkgB.travelStyle}*.`;

    return {
      intent,
      mode: 'MODE_E_COMPARISON',
      text: resp,
      suggestedPackages: [pkgA, pkgB],
      comparison: comp,
      quickReplies: [
        `Hitung biaya ${pkgA.name}`,
        `Hitung biaya ${pkgB.name}`,
        'Apa saja yang termasuk?'
      ]
    };
  }

  // =========================================================================
  // 11. RECOMMENDATION / DISCOVERY INTENT (ONE conversational question — NO MENU)
  // e.g. "Saya belum tahu mau ke mana.", "Enaknya liburan ke mana?"
  // =========================================================================
  if (intent === INTENTS.RECOMMENDATION) {
    if (context.awaitingResponseTo === 'DESTINATION_CONFIRMATION' || /^(?:belum|belum\s+ada|belum\s+tahu|bingung|rekomendasiin\s+aja|rekomendasiin|rekomendasi|saran\s+dong|bantu\s+pilihkan)[.!\s]*$/i.test(query)) {
      return {
        intent,
        mode: 'MODE_A_CONVERSATIONAL',
        text: `Tidak masalah! Untuk membantu memilihkan yang pas, Anda lebih menyukai suasana pantai, pegunungan yang sejuk, atau wisata budaya?`,
        awaitingResponseTo: 'TRAVEL_STYLE',
        suggestedPackages: [],
        suggestedDestinations: [],
        quickReplies: [
          'Pantai eksotis & bahari',
          'Pegunungan sejuk & alam',
          'Wisata budaya & sejarah'
        ]
      };
    }

    if (query.includes('belum tahu') || query.includes('bingung')) {
      return {
        intent,
        mode: 'MODE_A_CONVERSATIONAL',
        text: `Tidak masalah, menentukan tujuan adalah awal dari perjalanan yang berkesan!\n\nSupaya pilihannya tidak terlalu luas, Anda lebih tertarik pada suasana pantai eksotis, pegunungan yang sejuk, wisata budaya, atau tempat yang tenang untuk bersantai?`,
        awaitingResponseTo: 'TRAVEL_STYLE',
        suggestedPackages: [],
        suggestedDestinations: [],
        quickReplies: [
          'Pantai & Bahari',
          'Pegunungan & Sunrise',
          'Budaya & Heritage',
          'Tempat Tenang / Healing'
        ]
      };
    }

    return {
      intent,
      mode: 'MODE_A_CONVERSATIONAL',
      text: `Saya bisa membantu merekomendasikan pilihan terbaik untuk Anda! Supaya pilihannya lebih mengerucut dan pas, berapa lama kira-kira Anda ingin bepergian?`,
      awaitingResponseTo: 'DURATION',
      suggestedPackages: [],
      suggestedDestinations: [],
      quickReplies: [
        'Sekitar 2-3 hari',
        'Sekitar 4-5 hari',
        '1 minggu atau lebih',
        'Tergantung rute terbaik'
      ]
    };
  }

  // =========================================================================
  // 12. PRICE CALCULATION INTENT (MODE D: CALCULATION — Direct answer)
  // e.g. "Kalau 2 orang?", "Kalau berdua?", "Kalau 3 orang berapa?"
  // =========================================================================
  if (intent === INTENTS.PRICE_CALCULATION) {
    let targetPkg = null;
    for (const p of allPackages) {
      if (query.includes(p.name.toLowerCase()) || query.includes(p.destination.toLowerCase()) || query.includes(p.id.toLowerCase())) {
        targetPkg = p;
        break;
      }
    }
    if (!targetPkg) {
      targetPkg = context.contextPkg;
    }
    if (!targetPkg && context.contextDest) {
      const destPkgs = searchPackages(context.contextDest).map(normalizePackage);
      if (destPkgs.length > 0) targetPkg = destPkgs[0];
    }

    if (targetPkg) {
      const pax = participants || 2;
      const calc = calculatePackageTotal(targetPkg, pax);

      let resp = `Jika tarifnya ${calc.formattedPricePerPerson} per orang, untuk **${pax} orang** pada paket **${targetPkg.name}** (${targetPkg.duration}) estimasi total biayanya adalah **${calc.formattedTotalPrice}**.\n\n` +
        `• **DP Konfirmasi Reservasi (30%)**: ${calc.formattedDownPayment}\n` +
        `• **Sisa Pelunasan**: ${calc.formattedRemaining} (paling lambat H-7 keberangkatan)\n\n`;

      if (context.contextDest && (context.contextDest.toLowerCase().includes('sumat') || ['toba-highland', 'belitung-island'].includes(targetPkg.id))) {
        const otherSumatra = allPackages.find((p) => p.id === (targetPkg.id === 'toba-highland' ? 'belitung-island' : 'toba-highland'));
        if (otherSumatra) {
          const otherCalc = calculatePackageTotal(otherSumatra, pax);
          resp += `Sebagai perbandingan di kawasan Sumatera, paket **${otherSumatra.name}** bertarif ${otherSumatra.formattedPrice}/orang dengan total **${otherCalc.formattedTotalPrice}** untuk ${pax} orang (DP ${otherCalc.formattedDownPayment}).\n\n`;
        }
      }

      resp += `Biaya ini sudah mencakup akomodasi hotel bintang 4 pilihan, transportasi privat ber-AC khusus rombongan Anda, seluruh tiket objek wisata, dan pemandu lokal tanpa biaya tersembunyi.`;

      return {
        intent,
        mode: 'MODE_D_CALCULATION',
        text: resp,
        suggestedPackages: [],
        calculation: calc,
        bookingInfo: {
          package: targetPkg,
          participants: pax,
          calculation: calc,
          whatsappUrl: generateBookingWhatsAppLink(targetPkg, pax)
        },
        quickReplies: [
          `Kalau ${pax + 2} orang?`,
          'Apa saja yang termasuk?',
          'Jelaskan itinerary-nya',
          'Saya mau booking paket ini'
        ]
      };
    } else {
      return {
        intent,
        mode: 'MODE_D_CALCULATION',
        text: `Paket perjalanan yang mana yang ingin Anda hitung? Jika Anda menyebutkan nama paket atau destinasinya (misalnya Bali, Labuan Bajo, atau Bromo), saya dapat langsung menghitungkan total biayanya untuk **${participants} orang**.`,
        suggestedPackages: [],
        suggestedDestinations: [],
        quickReplies: [
          'Hitung Paket Bali',
          'Hitung Paket Labuan Bajo',
          'Destinasi yang tersedia'
        ]
      };
    }
  }

  // =========================================================================
  // 13. PACKAGE PRICE INQUIRY (MODE B: Direct answer — ZERO CARDS)
  // e.g. "Berapa harga Bali Escape?", "Berapa harga paket Bali?"
  // =========================================================================
  if (intent === INTENTS.PACKAGE_PRICE) {
    let targetPkg = null;
    for (const p of allPackages) {
      if (query.includes(p.name.toLowerCase()) || query.includes(p.destination.toLowerCase()) || query.includes(p.id.toLowerCase())) {
        targetPkg = p;
        break;
      }
    }
    if (!targetPkg) {
      targetPkg = context.contextPkg;
    }

    if (targetPkg) {
      return {
        intent,
        mode: 'MODE_B_INFORMATIONAL',
        text: `Untuk paket **${targetPkg.name}** (${targetPkg.duration}, ${targetPkg.destination}), tarif resminya adalah **${targetPkg.formattedPrice} per orang**.\n\n` +
          `Tarif ini sudah mencakup akomodasi hotel bintang 4 pilihan, armada mobil privat ber-AC khusus rombongan Anda, seluruh tiket masuk objek wisata, dan pemandu lokal tanpa biaya tersembunyi.`,
        suggestedPackages: [],
        suggestedDestinations: [],
        quickReplies: [
          'Kalau untuk 2 orang berapa?',
          'Kalau untuk 4 orang berapa?',
          'Apa saja yang termasuk?',
          'Saya mau booking paket ini'
        ]
      };
    } else {
      return {
        intent,
        mode: 'MODE_B_INFORMATIONAL',
        text: `FADZA TRIP ADVENTURE memiliki 16 paket wisata privat di seluruh Nusantara dengan tarif mulai dari Rp 1.450.000/orang (Bandung Retreat) hingga Rp 8.850.000/orang (Raja Ampat Paradise).\n\nPaket atau destinasi mana yang ingin Anda ketahui harganya?`,
        suggestedPackages: [],
        suggestedDestinations: [],
        quickReplies: [
          'Berapa harga Bali?',
          'Berapa harga Bromo?',
          'Destinasi yang tersedia'
        ]
      };
    }
  }

  // =========================================================================
  // 14. INCLUDED / EXCLUDED & FACILITY QUESTION (MODE B: Direct answer — ZERO CARDS)
  // e.g. "Apa fasilitasnya?", "Apa yang termasuk?"
  // =========================================================================
  if (intent === INTENTS.INCLUDED_EXCLUDED || intent === INTENTS.FACILITY_QUESTION) {
    const pkg = context.contextPkg || allPackages[0];

    const resp = `Paket **${pkg.name}** sudah mencakup akomodasi hotel bintang 4 pilihan, armada mobil privat ber-AC khusus rombongan Anda selama tur, seluruh tiket masuk objek wisata resmi, dan pemandu lokal berlisensi.\n\n` +
      `Yang belum termasuk: tiket pesawat PP dari kota asal ke destinasi dan pengeluaran pribadi. Seluruh perjalanan dijamin bebas dari biaya tersembunyi.`;

    return {
      intent,
      mode: 'MODE_B_INFORMATIONAL',
      text: resp,
      suggestedPackages: [],
      suggestedDestinations: [],
      quickReplies: [
        'Berapa kalau untuk 2 orang?',
        'Jelaskan itinerary-nya',
        'Meeting point di mana?',
        'Saya mau booking paket ini'
      ]
    };
  }

  // =========================================================================
  // 15. ITINERARY & AGENDA QUESTION (MODE B: Direct answer — ZERO CARDS)
  // e.g. "Hari pertama ngapain?", "Jelaskan itinerary-nya"
  // =========================================================================
  if (intent === INTENTS.ITINERARY_QUESTION) {
    const pkg = context.contextPkg || allPackages[0];
    const itin = pkg.itinerary || [];

    const dayMatch = query.match(/(?:day|hari\s*(?:ke)?)\s*(\d+)/i);
    if (dayMatch) {
      const dayNum = parseInt(dayMatch[1], 10);
      const targetDay = itin.find((d) => d.day === dayNum);

      if (targetDay) {
        let resp = `**Rincian Kegiatan Hari 0${targetDay.day} — ${pkg.name}:**\n\n` +
          `• Lokasi: ${targetDay.location}\n`;
        if (targetDay.meals) resp += `• Konsumsi: ${targetDay.meals}\n`;
        if (targetDay.accommodation) resp += `• Penginapan: ${targetDay.accommodation}\n`;
        if (targetDay.activities && targetDay.activities.length > 0) {
          resp += `\n**Aktivitas Utama**:\n`;
          targetDay.activities.forEach((act) => {
            resp += `• **${act.time}**: ${act.activity} (${act.desc})\n`;
          });
        }
        return {
          intent,
          mode: 'MODE_B_INFORMATIONAL',
          text: resp,
          suggestedPackages: [],
          suggestedDestinations: [],
          quickReplies: [`Hari selanjutnya?`, 'Apa saja yang termasuk?', 'Berapa kalau untuk 2 orang?']
        };
      }
    }

    // Full Itinerary
    let resp = `**Itinerary Resmi — ${pkg.name}** (${pkg.duration}):\n\n`;
    itin.forEach((d) => {
      resp += `✦ **Hari 0${d.day}: ${d.title}** (${d.location})\n`;
      if (d.activities && d.activities.length > 0) {
        resp += `• Sorotan: ${d.activities.slice(0, 2).map((a) => a.activity).join('; ')}\n`;
      }
    });

    resp += `\nRitme perjalanan dibuat seimbang dan santai agar Anda dapat menikmati setiap momen tanpa terburu-buru.`;

    return {
      intent,
      mode: 'MODE_B_INFORMATIONAL',
      text: resp,
      suggestedPackages: [],
      suggestedDestinations: [],
      quickReplies: ['Berapa kalau untuk 2 orang?', 'Apa saja yang termasuk?', 'Meeting point di mana?']
    };
  }

  // =========================================================================
  // 16. LOGISTICS: TRANSPORTATION & ACCOMMODATION (MODE B: Direct answer — ZERO CARDS)
  // =========================================================================
  if (intent === INTENTS.TRANSPORTATION_QUESTION || intent === INTENTS.ACCOMMODATION_QUESTION) {
    const pkg = context.contextPkg || allPackages[0];

    const resp = `Untuk paket **${pkg.name}**, armada yang digunakan adalah mobil privat ber-AC (seperti Innova Reborn atau HiAce Premio) khusus rombongan Anda lengkap dengan driver lokal berpengalaman dan BBM.\n\n` +
      `Penginapan menggunakan hotel bintang 4 pilihan di lokasi strategis dengan fasilitas kamar ber-AC dan sarapan lezat setiap pagi.`;

    return {
      intent,
      mode: 'MODE_B_INFORMATIONAL',
      text: resp,
      suggestedPackages: [],
      suggestedDestinations: [],
      quickReplies: [
        'Jelaskan itinerary-nya',
        'Berapa kalau untuk 2 orang?',
        'Apa saja yang termasuk?'
      ]
    };
  }

  // =========================================================================
  // 17. BUDGET SEARCH (ONE Question if incomplete, otherwise direct evaluation)
  // =========================================================================
  if (intent === INTENTS.BUDGET_SEARCH) {
    const hasSpecifiedPax = query.includes('orang') || query.includes('berdua') || query.includes('bertiga') || query.includes('berempat');
    const hasSpecifiedDur = durMatch !== null;

    if (!hasSpecifiedPax && !hasSpecifiedDur && !context.contextPkg) {
      const budgetNum = budgetInfo ? formatRupiah(budgetInfo.totalBudget) : 'tersebut';
      return {
        intent,
        mode: 'MODE_B_INFORMATIONAL',
        text: `Baik. Apakah anggaran **${budgetNum}** tersebut untuk satu orang atau total seluruh rombongan?\n\nJika Anda menyebutkan jumlah peserta dan durasi liburan yang diinginkan, saya dapat menyaringkan pilihan paket yang paling tepat untuk Anda.`,
        suggestedPackages: [],
        suggestedDestinations: [],
        quickReplies: [
          'Untuk 2 orang',
          'Untuk 1 orang',
          'Durasi 3 hari',
          'Destinasi yang tersedia'
        ]
      };
    }

    const { totalBudget, budgetPerPerson } = budgetInfo || { totalBudget: 5000000, budgetPerPerson: 2500000 };
    const pax = participants || 2;

    if (context.contextPkg) {
      const p = context.contextPkg;
      const tripCost = p.price * pax;
      const fits = tripCost <= totalBudget;
      const diff = Math.abs(totalBudget - tripCost);

      let resp = `Berdasarkan anggaran **${formatRupiah(totalBudget)}** untuk **${pax} orang** pada paket **${p.name}**:\n\n` +
        `• Tarif per orang: ${p.formattedPrice}\n` +
        `• Total Biaya (${pax} orang): **${formatRupiah(tripCost)}**\n\n`;

      if (fits) {
        resp += `Paket ini **masuk dalam budget Anda** dengan sisa anggaran **${formatRupiah(diff)}**.\n\n`;
      } else {
        resp += `Total paket melebihi anggaran sekitar **${formatRupiah(diff)}**.\n\n`;
      }

      resp += `Apakah Anda ingin melanjutkan konfirmasi pemesanan paket ini?`;

      return {
        intent,
        mode: 'MODE_D_CALCULATION',
        text: resp,
        suggestedPackages: [p],
        calculation: calculatePackageTotal(p, pax),
        quickReplies: [
          'Saya mau booking paket ini',
          'Apa saja yang termasuk?',
          'Cari paket lain yang lebih hemat'
        ]
      };
    }

    const affordable = allPackages.filter((p) => (p.price * pax) <= totalBudget || p.price <= budgetPerPerson);
    if (affordable.length > 0) {
      let resp = `Untuk anggaran **${formatRupiah(totalBudget)}** bagi **${pax} orang**, berikut paket privat resmi yang masuk dalam budget Anda:\n\n`;
      affordable.slice(0, 2).forEach((p, idx) => {
        resp += `**${idx + 1}. ${p.name}** (${p.destination}, ${p.duration}) — **${p.formattedPrice}/orang**\n`;
      });
      resp += `\nPaket mana yang ingin Anda pelajari lebih detail?`;

      return {
        intent,
        mode: 'MODE_C_SEARCH',
        text: resp,
        suggestedPackages: affordable.slice(0, 2),
        quickReplies: [
          `Detail ${affordable[0]?.name || 'paket'}`,
          'Apa saja yang termasuk?',
          'Jelaskan itinerary-nya'
        ]
      };
    } else {
      return {
        intent,
        mode: 'MODE_B_INFORMATIONAL',
        text: `Untuk anggaran **${formatRupiah(totalBudget)}** bagi **${pax} orang**, paket privat paling hemat kami adalah **Bandung Weekend Retreat** seharga Rp 1.450.000/orang (total Rp ${formatRupiah(1450000 * pax)}).\n\nApakah Anda ingin melihat rincian paket Bandung tersebut?`,
        suggestedPackages: [allPackages.find((p) => p.id === 'bandung-retreat') || allPackages[6]],
        quickReplies: ['Detail paket Bandung', 'Destinasi yang tersedia']
      };
    }
  }

  // =========================================================================
  // 18. DURATION SEARCH (ONE Question if destination missing)
  // e.g. "Saya mau 3 hari"
  // =========================================================================
  if (intent === INTENTS.DURATION_SEARCH) {
    if (context.contextDest) {
      const destPkgs = searchPackages(context.contextDest).map(normalizePackage);
      const exactDurationMatches = destPkgs.filter((p) => p.durationDays === durationDays);

      if (exactDurationMatches.length > 0) {
        const pkg = exactDurationMatches[0];
        const resp = `Ya, untuk destinasi **${context.contextDest}**, kami memiliki paket **${pkg.name}** dengan durasi tepat **${pkg.duration}**.\n\n` +
          `Tarif resminya adalah **${pkg.formattedPrice} per orang**, sudah mencakup hotel bintang 4, armada privat ber-AC, dan pemandu lokal.`;

        return {
          intent,
          mode: 'MODE_C_SEARCH',
          text: resp,
          suggestedPackages: [pkg],
          quickReplies: [
            'Berapa kalau untuk 2 orang?',
            'Apa saja yang termasuk?',
            'Jelaskan itinerary-nya',
            'Saya mau booking paket ini'
          ]
        };
      } else if (destPkgs.length > 0) {
        const availableDurations = [...new Set(destPkgs.map((p) => p.duration))].join(' dan ');
        return {
          intent,
          mode: 'MODE_C_SEARCH',
          text: `Untuk destinasi di kawasan **${context.contextDest}**, paket perjalanan resmi standar kami saat ini berdurasi **${availableDurations}** (${destPkgs.map((p) => p.name).join(' dan ')}).\n\n` +
            `Namun, karena seluruh perjalanan FADZA TRIP ADVENTURE berformat **private tour khusus rombongan Anda**, jadwal dan durasi dapat disesuaikan (customized) menjadi **${durationDays || 4} hari** (misalnya menambah malam santai di Danau Toba atau Pulau Belitung) melalui konsultasi WhatsApp bersama kami.\n\n` +
            `Apakah Anda ingin melihat detail paket ${availableDurations} yang tersedia, atau ingin langsung berkonsultasi untuk kustomisasi jadwal ${durationDays || 4} hari?`,
          suggestedPackages: destPkgs.slice(0, 2),
          quickReplies: [
            'Berapa kalau untuk 2 orang?',
            'Apa saja yang termasuk?',
            'Jelaskan itinerary-nya',
            'Hubungi via WhatsApp'
          ]
        };
      }
    }

    return {
      intent,
      mode: 'MODE_B_INFORMATIONAL',
      text: `Tentu! Untuk liburan **${durationDays || 3} Hari**, apakah Anda sudah memiliki destinasi tertentu yang ingin dikunjungi, atau ingin saya carikan rekomendasi rute terbaik?`,
      suggestedPackages: [],
      suggestedDestinations: [],
      quickReplies: [
        'Pilihan paket Yogyakarta (3 Hari)',
        'Pilihan paket Bromo (2-3 Hari)',
        'Pilihan paket Bali (4 Hari)',
        'Destinasi yang tersedia'
      ]
    };
  }

  // =========================================================================
  // 19. PACKAGE SEARCH & UNKNOWN DESTINATION CHECK
  // e.g. "Ada paket Bali?", "Ada paket ke Bogor?", "sumatera apakah ada??"
  // =========================================================================
  if (intent === INTENTS.PACKAGE_SEARCH) {
    const unknownLocations = [
      'bogor', 'puncak', 'sukabumi', 'bekasi', 'depok', 'tangerang', 'semarang',
      'surabaya', 'malang kota', 'batu', 'medan', 'padang', 'aceh', 'lampung',
      'palembang', 'bali utara', 'jepang', 'korea', 'singapura', 'malaysia',
      'thailand', 'vietnam', 'eropa', 'swiss', 'paris', 'turki', 'australia',
      'amerika', 'dubai', 'china', 'hongkong', 'taiwan'
    ];
    const hasUnknownMention = unknownLocations.find((loc) => query.includes(loc));

    if (hasUnknownMention) {
      const locCap = hasUnknownMention.charAt(0).toUpperCase() + hasUnknownMention.slice(1);
      let alternativeText = '';
      let altPackages = [];

      if (['bogor', 'puncak', 'sukabumi', 'bekasi', 'depok', 'tangerang'].includes(hasUnknownMention)) {
        alternativeText = `Untuk destinasi alam, pegunungan, dan perkebunan teh terdekat di kawasan Jawa Barat, kami memiliki paket **Bandung Weekend Retreat (2 Hari 1 Malam)**. Selain itu, untuk pengalaman pegunungan spektakuler, kami sangat merekomendasikan **Bromo Sunrise Escape** atau **Dieng Highland Exploration**.`;
        altPackages = [
          allPackages.find((p) => p.id === 'bandung-retreat') || allPackages[6],
          allPackages.find((p) => p.id === 'bromo-sunrise') || allPackages[5]
        ];
      } else if (['jepang', 'korea', 'singapura', 'malaysia', 'thailand', 'vietnam', 'eropa', 'swiss', 'paris', 'turki', 'australia', 'amerika', 'dubai'].includes(hasUnknownMention)) {
        alternativeText = `FADZA TRIP ADVENTURE berfokus secara eksklusif pada **16 destinasi eksotis Nusantara** dengan standar private travel premium (seperti Bali, Labuan Bajo, Raja Ampat, Sumba, Belitung, dan Lombok).`;
        altPackages = [allPackages[0], allPackages[2]];
      } else {
        alternativeText = `FADZA TRIP ADVENTURE saat ini melayani 16 destinasi unggulan di Indonesia meliputi Bali, Labuan Bajo, Raja Ampat, Lombok, Yogyakarta, Bromo, Bandung, Danau Toba, Sumba, Belitung, Derawan, Dieng, Toraja, Wakatobi, Bunaken, dan Karimunjawa.`;
        altPackages = [allPackages[0], allPackages[1]];
      }

      return {
        intent: INTENTS.DESTINATION_SEARCH,
        mode: 'MODE_C_SEARCH',
        text: `Maaf, saat ini **FADZA TRIP ADVENTURE** belum menyediakan paket perjalanan khusus untuk destinasi **${locCap}**.\n\n${alternativeText}\n\nApakah Anda ingin melihat detail paket alternatif di atas?`,
        suggestedPackages: altPackages.filter(Boolean),
        quickReplies: [
          'Destinasi yang tersedia',
          'Paket Bali',
          'Paket Bromo',
          '✦ Cari paket untuk saya'
        ]
      };
    }

    // 2. Explicit Region Search (e.g. Sumatera, Jawa, Kalimantan, Sulawesi, Nusa Tenggara, dll.)
    if (explicitEntity && explicitEntity.type === 'REGION') {
      const regionPkgs = searchPackages(explicitEntity.id).map(normalizePackage);

      if (regionPkgs.length > 0) {
        let resp = `Tentu. **FADZA TRIP ADVENTURE** memiliki pilihan perjalanan resmi di kawasan **${explicitEntity.name}**, yaitu:\n\n`;
        regionPkgs.forEach((p) => {
          resp += `• **${p.name}** (${p.duration}, ${p.destination}) — Mulai dari **${p.formattedPrice}/orang**\n  *${p.tagline}*\n\n`;
        });
        resp += `Seluruh perjalanan berformat *private trip* eksklusif khusus rombongan Anda dengan armada mobil ber-AC, hotel bintang 4 pilihan, seluruh tiket masuk objek wisata resmi, dan pemandu lokal berlisensi tanpa biaya siluman.\n\n` +
          `Berikut pilihan paket resmi yang tersedia di kawasan ${explicitEntity.name}:`;

        return {
          intent: INTENTS.PACKAGE_SEARCH,
          mode: 'MODE_C_SEARCH',
          text: resp,
          suggestedPackages: regionPkgs.slice(0, 3),
          quickReplies: [
            'Yang paling santai yang mana?',
            'Ada yang 4 hari?',
            'Berapa kalau untuk 2 orang?',
            'Apa saja fasilitasnya?'
          ]
        };
      } else {
        return {
          intent: INTENTS.PACKAGE_SEARCH,
          mode: 'MODE_C_SEARCH',
          text: `Saat ini saya belum menemukan destinasi atau paket perjalanan di kawasan **${explicitEntity.name}** yang tersedia dalam data resmi FADZA TRIP ADVENTURE.\n\n` +
            `FADZA TRIP ADVENTURE berfokus pada 16 destinasi eksotis Nusantara pilihan seperti Bali, Labuan Bajo, Danau Toba, Belitung, Raja Ampat, Bromo, dan Lombok.\n\n` +
            `Apakah Anda ingin saya bantu mencarikan rekomendasi destinasi alternatif yang tersedia?`,
          suggestedPackages: [],
          quickReplies: [
            'Destinasi yang tersedia',
            'Paket Bali Escape',
            'Paket Labuan Bajo'
          ]
        };
      }
    }

    // 3. Explicit Destination Search (e.g. Danau Toba, Belitung, Bali, Lombok, Bromo, dll.)
    for (const dest of allDestinations) {
      const dName = dest.name.toLowerCase();
      const dId = dest.id.toLowerCase();
      if (query.includes(dName) || query.includes(dId) || (explicitEntity && explicitEntity.id === dest.id)) {
        const pkgs = searchPackages(dest.name).map(normalizePackage);
        const primaryPkg = pkgs[0] || allPackages[0];

        let resp = `Ya, tersedia paket perjalanan resmi ke **${dest.name}** di FADZA TRIP ADVENTURE, yaitu **${primaryPkg.name} (${primaryPkg.duration})** mulai dari **${primaryPkg.formattedPrice} per orang**.\n\n` +
          `• **Destinasi**: ${dest.name} (${dest.region})\n` +
          `• **Pesona Utama**: ${dest.subtitle || dest.shortDescription}\n` +
          `• **Format Tur**: Private Trip Eksklusif (armada privat ber-AC khusus rombongan Anda)\n\n` +
          `Apakah Anda ingin saya hitungkan estimasi biaya total untuk jumlah peserta tertentu, atau melihat rincian fasilitas yang didapatkan?`;

        return {
          intent,
          mode: 'MODE_C_SEARCH',
          text: resp,
          suggestedPackages: [primaryPkg],
          quickReplies: [
            'Berapa kalau untuk 2 orang?',
            'Yang 4 hari ada?',
            'Apa saja fasilitasnya?',
            'Jelaskan itinerary-nya'
          ]
        };
      }
    }

    for (const pkg of allPackages) {
      if (query.includes(pkg.name.toLowerCase()) || query.includes(pkg.slug.toLowerCase())) {
        let resp = `Tentu. Paket **${pkg.name}** (${pkg.duration}, ${pkg.destination}) bertarif resmi **${pkg.formattedPrice}/orang**.\n\n` +
          `*"${pkg.tagline}"*\n\n` +
          `✦ **Sorotan Utama**: ${(pkg.highlights || []).slice(0, 3).join('; ')}\n\n` +
          `Apakah Anda ingin mengetahui jadwal itinerary harian atau menghitung estimasi biaya rombongan?`;

        return {
          intent,
          mode: 'MODE_C_SEARCH',
          text: resp,
          suggestedPackages: [pkg],
          quickReplies: [
            'Berapa kalau untuk 2 orang?',
            'Apa saja yang termasuk?',
            'Jelaskan itinerary-nya',
            'Saya mau booking paket ini'
          ]
        };
      }
    }

    return {
      intent,
      mode: 'MODE_C_SEARCH',
      text: `FADZA TRIP ADVENTURE menyediakan **16 destinasi eksotis dan paket perjalanan privat di seluruh kepulauan Indonesia** seperti Bali, Labuan Bajo, Raja Ampat, Bromo, dan Lombok.\n\nDestinasi mana yang ingin Anda kunjungi?`,
      suggestedPackages: [allPackages[0]],
      quickReplies: [
        'Paket Bali',
        'Paket Labuan Bajo',
        'Paket Bromo',
        'Destinasi yang tersedia'
      ]
    };
  }

  // =========================================================================
  // 20. GENERAL CONVERSATION (Conversational, warm, empathetic — ZERO CARDS)
  // e.g. "Kayaknya Bali menarik.", "Kayaknya mahal ya."
  // =========================================================================
  if (intent === INTENTS.GENERAL_CONVERSATION) {
    if (query.includes('mahal')) {
      return {
        intent,
        mode: 'MODE_A_CONVERSATIONAL',
        text: `Biaya perjalanan kami fleksibel tergantung paket, durasi, dan jumlah peserta dalam rombongan Anda. Seluruh paket bersifat privat dan sudah mencakup armada mobil ber-AC, hotel bintang 4 pilihan, dan tiket masuk wisata tanpa biaya siluman.\n\nJika Anda menyebutkan kisaran anggaran, saya dapat membantu mencarikan pilihan yang paling sesuai.`,
        suggestedPackages: [],
        suggestedDestinations: [],
        quickReplies: [
          'Budget 2-3 juta',
          'Budget 4-5 juta',
          'Destinasi yang tersedia'
        ]
      };
    }

    return {
      intent,
      mode: 'MODE_A_CONVERSATIONAL',
      text: `Memang banyak sekali pilihan pengalaman perjalanan yang berkesan di destinasi Nusantara, mulai dari ketenangan perdesaan hingga keindahan tebing laut.\n\nJika Anda ingin, saya dapat membantu mencarikan pilihan paket yang sesuai dengan durasi atau gaya perjalanan yang Anda minati.`,
      suggestedPackages: [],
      suggestedDestinations: [],
      quickReplies: [
        'Ada paket apa saja?',
        'Rekomendasi destinasi',
        'Destinasi yang tersedia'
      ]
    };
  }

  // =========================================================================
  // 21. DESTINATION QUESTION (Geographical fact — ZERO CARDS)
  // e.g. "Bogor itu ada di Jawa Barat kan?"
  // =========================================================================
  if (intent === INTENTS.DESTINATION_QUESTION) {
    return {
      intent,
      mode: 'MODE_B_INFORMATIONAL',
      text: `Betul, Bogor terletak di provinsi Jawa Barat dan terkenal dengan udara pegunungan yang sejuk serta kawasan Puncak.\n\n` +
        `Untuk destinasi alam dan pegunungan terdekat di Jawa Barat yang kami layani secara resmi, FADZA TRIP ADVENTURE menyediakan paket **Bandung Weekend Retreat (2 Hari 1 Malam)** serta **Bromo Sunrise Escape**. Apakah Anda ingin mengetahui rincian paket tersebut?`,
      suggestedPackages: [],
      suggestedDestinations: [],
      quickReplies: [
        'Paket Bandung Weekend Retreat',
        'Destinasi yang tersedia',
        '✦ Cari paket untuk saya'
      ]
    };
  }

  // =========================================================================
  // 22. GENERAL FADZA INFO & BRAND (MODE B: INFORMATIONAL — ZERO CARDS)
  // e.g. "FADZA TRIP ADVENTURE itu apa?", "Siapa FADZA?"
  // =========================================================================
  if (intent === INTENTS.GENERAL_FADZA_INFO) {
    return {
      intent,
      mode: 'MODE_B_INFORMATIONAL',
      text: `**FADZA TRIP ADVENTURE** merupakan layanan perjalanan dan tur resmi yang berfokus pada pengalaman *private travel* premium di 16 destinasi eksotis Nusantara.\n\n` +
        `Kami menerapkan transparansi biaya 100% tanpa pungutan tersembunyi, didukung armada privat ber-AC khusus rombongan Anda, hotel berbintang terkurasi, dan pemandu lokal berlisensi.\n\n` +
        `Apakah Anda ingin melihat daftar destinasi atau mencari paket wisata yang sesuai dengan rencana liburan Anda?`,
      suggestedPackages: [],
      suggestedDestinations: [],
      quickReplies: [
        'Destinasi yang tersedia',
        '✦ Cari paket untuk saya',
        'Kontak resmi FADZA'
      ]
    };
  }

  // =========================================================================
  // 23. CONTACT INQUIRY (MODE B: INFORMATIONAL — ZERO CARDS)
  // =========================================================================
  if (intent === INTENTS.CONTACT) {
    return {
      intent,
      mode: 'MODE_B_INFORMATIONAL',
      text: `**Informasi Kontak Resmi FADZA TRIP ADVENTURE:**\n\n` +
        `• **WhatsApp Konsultan**: +62 858-8815-9765\n` +
        `• **Jam Operasional**: Setiap hari (08:00 – 21:00 WIB)\n` +
        `• **Layanan**: Konsultasi rute, pemesanan paket wisata privat, dan kustomisasi jadwal perjalanan.`,
      suggestedPackages: [],
      suggestedDestinations: [],
      quickReplies: [
        'Destinasi yang tersedia',
        '✦ Cari paket untuk saya'
      ]
    };
  }

  // =========================================================================
  // 24. FAQ INQUIRY (MODE B: Direct answer — ZERO CARDS)
  // =========================================================================
  if (intent === INTENTS.FAQ) {
    const matchedFaq = searchFaq(query);
    if (matchedFaq) {
      return {
        intent,
        mode: 'MODE_B_INFORMATIONAL',
        text: `**${matchedFaq.question}**\n\n${matchedFaq.answer}\n\nFADZA TRIP ADVENTURE selalu memprioritaskan transparansi biaya, keselamatan perjalanan, dan pelayanan ramah berstandar tinggi.`,
        suggestedPackages: [],
        suggestedDestinations: [],
        quickReplies: ['Berapa kalau untuk 2 orang?', 'Apa saja yang termasuk?', 'Destinasi yang tersedia']
      };
    }
  }

  // =========================================================================
  // 25. CONVERSATIONAL CLARIFICATION & FALLBACK
  // ZERO GENERIC MENUS. CONTEXTUAL ANSWER. ZERO CARDS.
  // =========================================================================
  if (context.awaitingResponseTo === 'DESTINATION_CONFIRMATION') {
    return {
      intent: INTENTS.CLARIFICATION,
      mode: 'MODE_A_CONVERSATIONAL',
      text: `Agar saya dapat memberikan rekomendasi yang paling tepat, apakah Anda sudah memiliki kota atau pulau tujuan (seperti Bali, Lombok, atau Danau Toba), atau ingin saya bantu rekomendasikan sesuai suasana liburan impian Anda?`,
      awaitingResponseTo: 'DESTINATION_CONFIRMATION',
      suggestedPackages: [],
      suggestedDestinations: [],
      quickReplies: [
        'Destinasi yang tersedia',
        '✦ Cari paket untuk saya',
        'Cari berdasarkan budget',
        'Tanya rekomendasi liburan'
      ]
    };
  }

  return {
    intent: INTENTS.CLARIFICATION,
    mode: 'MODE_A_CONVERSATIONAL',
    text: `Saya siap membantu kebutuhan liburan Anda bersama **FADZA TRIP ADVENTURE**.\n\nAnda dapat menanyakan paket wisata Nusantara kami, estimasi biaya rombongan, jadwal itinerary, fasilitas privat, atau meminta rekomendasi destinasi impian.`,
    awaitingResponseTo: 'DESTINATION_CONFIRMATION',
    suggestedPackages: [],
    suggestedDestinations: [],
    quickReplies: [
      'Destinasi yang tersedia',
      '✦ Cari paket untuk saya',
      'Cari berdasarkan budget',
      'Tanya rekomendasi liburan'
    ]
  };
}
