// FADZA AI Travel Concierge - Pure Domain Tools & Knowledge Engine
// Single Source of Truth: Uses verified website dataset from travelData.js
// Strict Zero-Hallucination: Safe calculations, factual data lookups, accurate image mapping.

import { PACKAGES, DESTINATIONS, BRAND_INFO, GENERAL_FAQS, GALLERY_ITEMS } from '../data/travelData.js';

/**
 * Format currency helper (Rp X.XXX.XXX)
 */
export function formatRupiah(num) {
  if (num === null || num === undefined || isNaN(num)) return 'Rp 0';
  return `Rp ${Math.round(num).toLocaleString('id-ID')}`;
}

/**
 * Tool 1: Get all available packages
 */
export function getAllPackages() {
  return PACKAGES;
}

/**
 * Tool 2: Get all available destinations
 */
export function getAllDestinations() {
  return DESTINATIONS;
}

/**
 * Tool 3: Get package by ID or Slug
 */
export function getPackageById(idOrSlug) {
  if (!idOrSlug) return null;
  const q = idOrSlug.toLowerCase().trim();
  return PACKAGES.find((p) =>
    p.id.toLowerCase() === q ||
    p.slug.toLowerCase() === q ||
    (p.name && p.name.toLowerCase().includes(q))
  ) || null;
}

/**
 * Tool 4: Get destination by ID or Name
 */
export function getDestinationById(idOrName) {
  if (!idOrName) return null;
  const q = idOrName.toLowerCase().trim();
  return DESTINATIONS.find((d) =>
    d.id.toLowerCase() === q ||
    d.name.toLowerCase() === q ||
    q.includes(d.name.toLowerCase()) ||
    d.name.toLowerCase().includes(q)
  ) || null;
}

/**
 * Tool 5: Search packages by keyword (destination, name, highlights, travelStyle, region, province)
 */
export function searchPackages(keyword) {
  if (!keyword) return PACKAGES;
  const q = keyword.toLowerCase().trim();
  const normalizedQ = (q === 'sumatera') ? 'sumatra' : q;

  return PACKAGES.filter((p) => {
    const name = (p.name || '').toLowerCase();
    const dest = (p.destination || '').toLowerCase();
    const destId = (p.destinationId || '').toLowerCase();
    const style = (Array.isArray(p.travelStyle) ? p.travelStyle.join(' ') : (p.travelStyle || '')).toLowerCase();
    const styleLabel = (p.travelStyleLabel || '').toLowerCase();
    const tagline = (p.tagline || '').toLowerCase();
    const highlights = (p.highlights || []).join(' ').toLowerCase();

    // Check package's linked destination for region & province
    const linkedDest = DESTINATIONS.find((d) => d.id === p.destinationId || d.name.toLowerCase() === dest);
    const destRegion = (linkedDest?.region || '').toLowerCase();
    const destProvince = (linkedDest?.province || '').toLowerCase();

    if (
      name.includes(q) ||
      dest.includes(q) ||
      destId.includes(q) ||
      style.includes(q) ||
      styleLabel.includes(q) ||
      tagline.includes(q) ||
      highlights.includes(q) ||
      destRegion.includes(q) ||
      destRegion.includes(normalizedQ) ||
      destProvince.includes(q) ||
      destProvince.includes(normalizedQ)
    ) {
      return true;
    }

    // Specific region matches
    if (q === 'sumatera' || q === 'sumatra') {
      return ['toba-highland', 'belitung-island'].includes(p.id) || destRegion.includes('sumatra');
    }
    if (q === 'jawa' || q === 'java') {
      return destRegion.includes('jawa');
    }
    if (q === 'sulawesi' || q === 'celebes') {
      return destRegion.includes('sulawesi');
    }
    if (q === 'kalimantan' || q === 'borneo') {
      return destRegion.includes('kalimantan') || p.id === 'derawan-adventure';
    }
    if (q === 'nusa tenggara' || q === 'ntb' || q === 'ntt' || q === 'flores') {
      return destRegion.includes('nusa tenggara');
    }
    if (q === 'papua' || q === 'maluku') {
      return p.id === 'raja-ampat-ultimate';
    }

    return false;
  });
}

/**
 * Tool 6: Search destinations by keyword (name, region, province, tags, description)
 */
export function searchDestinations(keyword) {
  if (!keyword) return DESTINATIONS;
  const q = keyword.toLowerCase().trim();
  const normalizedQ = (q === 'sumatera') ? 'sumatra' : q;

  return DESTINATIONS.filter((d) => {
    const name = (d.name || '').toLowerCase();
    const region = (d.region || '').toLowerCase();
    const province = (d.province || '').toLowerCase();
    const desc = (d.shortDescription || '').toLowerCase();
    const fullDesc = (d.fullDescription || '').toLowerCase();
    const tags = (d.tags || []).join(' ').toLowerCase();

    if (
      name.includes(q) ||
      region.includes(q) ||
      region.includes(normalizedQ) ||
      province.includes(q) ||
      province.includes(normalizedQ) ||
      desc.includes(q) ||
      fullDesc.includes(q) ||
      tags.includes(q)
    ) {
      return true;
    }

    // Specific region and alias mappings
    if (q === 'sumatera' || q === 'sumatra') {
      return d.id === 'toba' || d.id === 'belitung' || region.includes('sumatra');
    }
    if (q === 'jawa' || q === 'java') {
      return region.includes('jawa') || ['yogyakarta', 'bromo', 'bandung', 'dieng', 'karimunjawa'].includes(d.id);
    }
    if (q === 'sulawesi' || q === 'celebes') {
      return region.includes('sulawesi') || ['bunaken', 'toraja', 'wakatobi'].includes(d.id);
    }
    if (q === 'kalimantan' || q === 'borneo') {
      return region.includes('kalimantan') || d.id === 'derawan';
    }
    if (q === 'nusa tenggara' || q === 'ntb' || q === 'ntt' || q === 'flores') {
      return region.includes('nusa tenggara') || ['labuan-bajo', 'lombok', 'sumba'].includes(d.id);
    }
    if (q === 'papua' || q === 'maluku') {
      return d.id === 'raja-ampat' || region.toLowerCase().includes('papua');
    }

    return false;
  });
}

/**
 * Tool 7: Filter packages by multidimensional criteria
 */
export function filterPackages({
  minPrice = 0,
  maxPrice = Infinity,
  durationDays = null,
  destination = null,
  vibe = null,
  isFamily = false
} = {}) {
  return PACKAGES.filter((p) => {
    // Price filter
    if (p.price < minPrice || p.price > maxPrice) return false;

    // Duration filter
    if (durationDays && p.durationDays !== durationDays) return false;

    // Destination filter
    if (destination) {
      const destQuery = destination.toLowerCase();
      const pDest = (p.destination || '').toLowerCase();
      const pDestId = (p.destinationId || '').toLowerCase();
      const linkedDest = DESTINATIONS.find((d) => d.id === p.destinationId || d.name.toLowerCase() === pDest);
      const destRegion = (linkedDest?.region || '').toLowerCase();
      const destProvince = (linkedDest?.province || '').toLowerCase();
      const isMatch = pDest.includes(destQuery) || pDestId.includes(destQuery) || destRegion.includes(destQuery) || destProvince.includes(destQuery) ||
        ((destQuery.includes('sumatera') || destQuery.includes('sumatra')) && ['toba-highland', 'belitung-island'].includes(p.id));
      if (!isMatch) return false;
    }

    // Vibe filter
    if (vibe) {
      const v = vibe.toLowerCase();
      const combinedText = `${p.name} ${p.travelStyle} ${p.travelStyleLabel} ${p.tagline} ${(p.highlights || []).join(' ')}`.toLowerCase();

      if (v.includes('pantai') || v.includes('bahari') || v.includes('laut') || v.includes('snorkeling')) {
        const isBeach = combinedText.includes('pantai') || combinedText.includes('snorkeling') || combinedText.includes('diving') || combinedText.includes('phinisi') || combinedText.includes('island');
        if (!isBeach) return false;
      } else if (v.includes('gunung') || v.includes('sunrise') || v.includes('savana') || v.includes('alam') || v.includes('kawah')) {
        const isNature = combinedText.includes('bromo') || combinedText.includes('savana') || combinedText.includes('kawah') || combinedText.includes('sunrise') || combinedText.includes('highland') || combinedText.includes('alam');
        if (!isNature) return false;
      } else if (v.includes('budaya') || v.includes('candi') || v.includes('heritage') || v.includes('sejarah') || v.includes('tradisi')) {
        const isCulture = combinedText.includes('heritage') || combinedText.includes('budaya') || combinedText.includes('candi') || combinedText.includes('toraja') || combinedText.includes('yogyakarta');
        if (!isCulture) return false;
      } else if (v.includes('tenang') || v.includes('santai') || v.includes('healing') || v.includes('rileks')) {
        const isCalm = ['sumba-paradise', 'belitung-island', 'toba-highland', 'derawan-adventure', 'bali-escape'].includes(p.id);
        if (!isCalm) return false;
      }
    }

    // Family filter
    if (isFamily) {
      const familyIds = ['bali-escape', 'yogyakarta-heritage', 'bandung-retreat', 'belitung-island', 'toba-highland', 'lombok-adventure'];
      if (!familyIds.includes(p.id)) return false;
    }

    return true;
  });
}

/**
 * Tool 8: Calculate package total dynamically
 * Accurate math function preventing LLM calculation hallucinations.
 */
export function calculatePackageTotal(packageOrPrice, participantCount = 1) {
  const count = Math.max(1, parseInt(participantCount, 10) || 1);
  let price = 0;
  let pkg = null;

  if (typeof packageOrPrice === 'object' && packageOrPrice !== null) {
    pkg = packageOrPrice;
    price = pkg.price || 0;
  } else {
    price = Math.max(0, parseInt(packageOrPrice, 10) || 0);
  }

  const subtotal = price * count;
  const downPayment = Math.round(subtotal * 0.3); // 30% Down Payment
  const remaining = subtotal - downPayment;

  return {
    package: pkg,
    participantCount: count,
    pricePerPerson: price,
    formattedPricePerPerson: formatRupiah(price),
    totalPrice: subtotal,
    formattedTotalPrice: formatRupiah(subtotal),
    downPayment,
    formattedDownPayment: formatRupiah(downPayment),
    remaining,
    formattedRemaining: formatRupiah(remaining),
    equation: `${formatRupiah(price)} × ${count} orang = ${formatRupiah(subtotal)}`
  };
}

/**
 * Tool 9: Calculate combined total for multiple packages
 * e.g., "paket A untuk 2 orang dan paket B untuk 3 orang"
 */
export function calculateMultiPackageTotal(items = []) {
  let grandTotal = 0;
  const computedItems = items.map((item) => {
    const pkg = typeof item.pkg === 'string' ? getPackageById(item.pkg) : item.pkg;
    const count = Math.max(1, parseInt(item.count, 10) || 1);
    const price = pkg ? pkg.price : (item.price || 0);
    const total = price * count;
    grandTotal += total;

    return {
      pkg,
      count,
      pricePerPerson: price,
      formattedPrice: formatRupiah(price),
      total,
      formattedTotal: formatRupiah(total)
    };
  });

  const downPayment = Math.round(grandTotal * 0.3);

  return {
    items: computedItems,
    grandTotal,
    formattedGrandTotal: formatRupiah(grandTotal),
    downPayment,
    formattedDownPayment: formatRupiah(downPayment)
  };
}

/**
 * Tool 10: Compare two packages factually
 */
export function comparePackages(pkgA, pkgB) {
  if (!pkgA || !pkgB) return null;

  const priceDiff = Math.abs(pkgA.price - pkgB.price);
  const cheaperPkg = pkgA.price < pkgB.price ? pkgA : (pkgB.price < pkgA.price ? pkgB : null);
  const samePrice = pkgA.price === pkgB.price;

  return {
    pkgA: {
      id: pkgA.id,
      name: pkgA.name,
      destination: pkgA.destination,
      duration: pkgA.duration,
      durationDays: pkgA.durationDays,
      price: pkgA.price,
      formattedPrice: pkgA.formattedPrice,
      travelStyle: pkgA.travelStyleLabel || pkgA.travelStyle,
      highlights: pkgA.highlights ? pkgA.highlights.slice(0, 3) : [],
      included: pkgA.included ? pkgA.included.slice(0, 4) : []
    },
    pkgB: {
      id: pkgB.id,
      name: pkgB.name,
      destination: pkgB.destination,
      duration: pkgB.duration,
      durationDays: pkgB.durationDays,
      price: pkgB.price,
      formattedPrice: pkgB.formattedPrice,
      travelStyle: pkgB.travelStyleLabel || pkgB.travelStyle,
      highlights: pkgB.highlights ? pkgB.highlights.slice(0, 3) : [],
      included: pkgB.included ? pkgB.included.slice(0, 4) : []
    },
    priceDiff,
    formattedPriceDiff: formatRupiah(priceDiff),
    cheaperPkg,
    samePrice
  };
}

/**
 * Tool 11: Get FAQ answer matching query
 */
export function searchFaq(keyword) {
  if (!keyword) return null;
  const q = keyword.toLowerCase().trim();

  return GENERAL_FAQS.find((faq) => {
    const ques = faq.question.toLowerCase();
    const ans = faq.answer.toLowerCase();
    return ques.includes(q) || ans.includes(q) || q.includes(ques);
  }) || null;
}

/**
 * Tool 12: Get company / brand information
 */
export function getCompanyInfo() {
  return BRAND_INFO;
}

/**
 * Tool 13: Get gallery items matching destination
 */
export function getGalleryItems(destinationKeyword = '') {
  if (!destinationKeyword) return GALLERY_ITEMS;
  const q = destinationKeyword.toLowerCase().trim();
  return GALLERY_ITEMS.filter((g) => {
    return (
      (g.title || '').toLowerCase().includes(q) ||
      (g.location || '').toLowerCase().includes(q) ||
      (g.destination || '').toLowerCase().includes(q)
    );
  });
}

/**
 * Tool 14: Generate WhatsApp booking URL with pre-filled context
 */
export function generateBookingWhatsAppLink(pkg, participants = 1, customNote = '') {
  const phone = BRAND_INFO.whatsappNumber || '6285888159765';
  const count = Math.max(1, parseInt(participants, 10) || 1);
  const pkgName = pkg?.name || 'Paket Wisata FADZA';
  const dest = pkg?.destination || 'Nusantara';
  const dur = pkg?.duration || '';
  const priceTotal = pkg?.price ? formatRupiah(pkg.price * count) : '';

  let message = `Halo FADZA TRIP ADVENTURE, saya tertarik untuk melakukan pemesanan (booking) paket perjalanan:\n\n` +
    `• Paket: ${pkgName}\n` +
    `• Destinasi: ${dest} (${dur})\n` +
    `• Jumlah Peserta: ${count} orang\n`;
  if (priceTotal) {
    message += `• Estimasi Total Biaya: ${priceTotal}\n`;
  }
  if (customNote) {
    message += `• Catatan: ${customNote}\n`;
  }
  message += `\nMohon informasi ketersediaan jadwal keberangkatan dan langkah konfirmasi pemesanan selanjutnya. Terima kasih.`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
