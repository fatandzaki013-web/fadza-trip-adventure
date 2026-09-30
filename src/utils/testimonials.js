import { TESTIMONIALS } from '../data/travelData';

export const TESTIMONIAL_STORAGE_KEY = 'fadza_testimonials';

export const DESTINATION_OPTIONS = [
  'Labuan Bajo',
  'Raja Ampat',
  'Bali',
  'Bromo Semeru',
  'Yogyakarta',
  'Lombok & Gili',
  'Sumba',
  'Danau Toba',
  'Derawan & Maratua',
  'Belitung',
  'Toraja',
  'Dieng Plateau',
  'Wakatobi',
  'Bandung Heritage'
];

export const TRAVEL_STYLE_OPTIONS = [
  'Private Tour Pasangan',
  'Keluarga & Multi-Generasi',
  'Petualangan Kawan',
  'Eksplorasi Bahari',
  'Healing & Budaya'
];

export function getStoredTestimonials() {
  try {
    const raw = localStorage.getItem(TESTIMONIAL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Filter out any custom user submissions (identified by high timestamp ids)
        const customAdded = parsed.filter((item) => item.id > 1000000000000);
        const customIds = new Set(customAdded.map((c) => c.id));
        const remaining = parsed.filter((item) => !customIds.has(item.id) && item.id <= 1000000000000);
        
        // If remaining is smaller than new base TESTIMONIALS, use full TESTIMONIALS
        const baseList = remaining.length >= TESTIMONIALS.length ? remaining : TESTIMONIALS;
        return [...customAdded, ...baseList];
      }
    }
  } catch (e) {
    console.error('Error loading stored testimonials:', e);
  }
  return TESTIMONIALS;
}

export function saveTestimonial(newTesti) {
  const current = getStoredTestimonials();
  const updated = [newTesti, ...current];
  try {
    localStorage.setItem(TESTIMONIAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving testimonial:', e);
  }
  return updated;
}
