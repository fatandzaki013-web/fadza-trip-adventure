// FADZA TRIP ADVENTURE WhatsApp Integration Utility
// Official Number: 085888159765 -> 6285888159765

export const OFFICIAL_PHONE = "085888159765";
export const WA_PHONE_INTERNATIONAL = "6285888159765";

/**
 * Returns pre-filled WhatsApp link for general inquiries
 */
export function getGeneralWhatsAppLink() {
  const message = "Halo FADZA Travel, saya ingin mendapatkan informasi mengenai paket wisata.";
  return `https://wa.me/${WA_PHONE_INTERNATIONAL}?text=${encodeURIComponent(message)}`;
}

/**
 * Returns pre-filled WhatsApp link for a specific package
 * Format: "Halo FADZA Travel, saya tertarik dengan paket [PACKAGE NAME]. Saya ingin mendapatkan informasi lebih lanjut mengenai paket ini."
 */
export function getPackageWhatsAppLink(packageName, extraDetails = {}) {
  let message = `Halo FADZA Travel, saya tertarik dengan paket ${packageName}. Saya ingin mendapatkan informasi lebih lanjut mengenai paket ini.`;
  
  if (extraDetails.guests) {
    message += ` (Rencana rombongan: ${extraDetails.guests} orang)`;
  }
  if (extraDetails.date) {
    message += ` (Perkiraan tanggal: ${extraDetails.date})`;
  }
  
  return `https://wa.me/${WA_PHONE_INTERNATIONAL}?text=${encodeURIComponent(message)}`;
}

/**
 * Returns pre-filled WhatsApp link for custom trip planner/inquiry form
 */
export function getCustomInquiryWhatsAppLink({ name, destination, duration, budget, travelers, note }) {
  let message = `Halo FADZA Travel, saya ingin merencanakan liburan:`;
  if (name) message += `\n- Nama: ${name}`;
  if (destination) message += `\n- Destinasi Impian: ${destination}`;
  if (duration) message += `\n- Durasi: ${duration}`;
  if (travelers) message += `\n- Jumlah Peserta: ${travelers} orang`;
  if (budget) message += `\n- Estimasi Budget: ${budget}`;
  if (note) message += `\n- Catatan Khusus: ${note}`;
  message += `\n\nMohon rekomendasi paket terbaik dan ketersediaannya. Terima kasih!`;
  
  return `https://wa.me/${WA_PHONE_INTERNATIONAL}?text=${encodeURIComponent(message)}`;
}
