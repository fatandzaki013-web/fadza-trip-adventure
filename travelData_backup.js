// FADZA TRAVEL Data Architecture
// All content in natural, inspiring Indonesian

export const BRAND_INFO = {
  name: "FADZA TRAVEL",
  tagline: "Temukan Perjalananmu.",
  phone: "085888159765",
  whatsappNumber: "6285888159765",
  email: "halo@fadzatravel.com",
  instagram: "@fadzatravel",
  address: "Jl. Sunset Road No. 88, Seminyak, Bali & Satrio Tower Lt. 14, Mega Kuningan, Jakarta Selatan",
  hours: "Senin - Minggu: 08.00 - 22.00 WIB",
  established: "2024",
  currency: "IDR"
};

export const DESTINATIONS = [
  {
    id: "bali",
    name: "Bali",
    subtitle: "Pulau Dewata",
    description: "Kombinasi magis pantai berpasir putih, sawah berundak terasering Ubud, tebing Nusa Penida, dan kearifan budaya yang mendalam.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    packageCount: 6,
    startingPrice: 2850000,
    tags: ["Pantai", "Budaya", "Romantic", "Healing"],
    bestTime: "Mei - Oktober",
    highlightSpots: ["Nusa Penida", "Ubud Tegallalang", "Uluwatu Sunset", "Pantai Melasti"]
  },
  {
    id: "labuan-bajo",
    name: "Labuan Bajo",
    subtitle: "Gerbang Komodo & Phinisi",
    description: "Petualangan bahari kelas dunia melintasi gugusan pulau purba, perjumpaan dengan Komodo Dragon, dan sensasi liveaboard phinisi mewah.",
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80",
    packageCount: 5,
    startingPrice: 4200000,
    tags: ["Phinisi", "Adventure", "Snorkeling", "Luxury"],
    bestTime: "April - November",
    highlightSpots: ["Pulau Padar", "Pink Beach", "Taka Makassar", "Manta Point"]
  },
  {
    id: "raja-ampat",
    name: "Raja Ampat",
    subtitle: "Mahakarya Bawah Laut Dunia",
    description: "Ikon keanekaragaman hayati laut terkaya di planet bumi. Gugusan karst zamrud di atas air laut sebening kaca kristal.",
    image: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=1200&q=80",
    packageCount: 4,
    startingPrice: 8750000,
    tags: ["Diving", "Eksklusif", "Nature", "Photography"],
    bestTime: "Oktober - April",
    highlightSpots: ["Piaynemo", "Wayag", "Manta Sandy", "Teluk Kabui"]
  },
  {
    id: "lombok",
    name: "Lombok",
    subtitle: "Sensasi Eksotis & Gili Tropis",
    description: "Ketenangan pantai pasir merica Kuta Lombok, kemegahan Gunung Rinjani, dan pesona perairan tenang trio Gili tanpa polusi.",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
    packageCount: 5,
    startingPrice: 2950000,
    tags: ["Island Hopping", "Relax", "Surfing", "Nature"],
    bestTime: "Mei - September",
    highlightSpots: ["Gili Trawangan", "Bukit Merese", "Pantai Tanjung Aan", "Air Terjun Sendang Gile"]
  },
  {
    id: "yogyakarta",
    name: "Yogyakarta",
    subtitle: "Ibu Kota Budaya & Warisan Luhur",
    description: "Perjalanan spiritual dan budaya menelusuri kemegahan Candi Borobudur, keriuhan Malioboro, gua karst Goa Pindul, hingga kuliner legendaris.",
    image: "https://images.unsplash.com/photo-1584810359583-96fc3448beaa?auto=format&fit=crop&w=1200&q=80",
    packageCount: 4,
    startingPrice: 1950000,
    tags: ["Budaya", "Heritage", "Kuliner", "Family"],
    bestTime: "Sepanjang Tahun",
    highlightSpots: ["Candi Borobudur", "Candi Prambanan", "Taman Sari", "Goa Jomblang"]
  },
  {
    id: "bromo",
    name: "Bromo & Malang",
    subtitle: "Negeri di Atas Awan",
    description: "Sensasi sunrise magis berlatar kepulan kawah Bromo dan Gunung Semeru, menembus lautan pasir dengan Jeep 4x4, serta segarnya Malang.",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=1200&q=80",
    packageCount: 4,
    startingPrice: 1850000,
    tags: ["Adventure", "Sunrise", "Photography", "Jeep"],
    bestTime: "Juni - November",
    highlightSpots: ["Penanjakan Sunrise", "Kawah Bromo", "Pasir Berbisik", "Bukit Teletubbies"]
  }
];

export const PACKAGES = [
  {
    id: "bali-escape",
    slug: "bali-escape-4d3n",
    name: "Bali Escape & Nusa Penida",
    tagline: "Kombinasi Sempurna Budaya Ubud & Spektakuler Tebing Nusa Penida",
    destination: "Bali",
    destinationId: "bali",
    duration: "4 Hari 3 Malam",
    durationDays: 4,
    durationNights: 3,
    durationCategory: "medium", // short (2-3), medium (4-5), long (6+)
    travelStyle: "Relax", // Relax, Adventure, Romantic, Family, Group, Photography
    travelStyleLabel: "Santai & Healing",
    badge: "Best Seller",
    featured: true,
    price: 3450000,
    formattedPrice: "Rp 3.450.000",
    rating: 4.9,
    reviewCount: 148,
    heroImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=1000&q=80"
    ],
    shortDescription: "Nikmati kedamaian pedesaan Ubud, sunset tepi tebing Uluwatu, dan petualangan menyeberang ke formasi tebing ikonik Kelingking Beach.",
    overview: "Paket Bali Escape 4D3N dirancang khusus untuk Anda yang mendambakan liburan seimbang: relaksasi di resor bernuansa asri, sentuhan budaya Bali yang sakral, serta momen foto memukau di Nusa Penida. Seluruh transportasi menggunakan armada privat ber-AC dengan driver merangkap tour guide lokal yang ramah dan siap membantu dokumentasi terbaik Anda.",
    highlights: [
      "Eksplorasi West Nusa Penida: Kelingking Beach, Broken Beach, & Angel's Billabong",
      "Sunset magis di Pura Luhur Uluwatu dengan tiket VIP Tari Kecak Fire Dance",
      "Makan malam romantis tepi pantai di Seafood Jimbaran dengan deburan ombak",
      "Santai di Ubud: Tegalalang Rice Terrace, Sacred Monkey Forest, & Pasar Seni",
      "Akomodasi hotel bintang 4 pilihan di Seminyak / Ubud dengan sarapan lezat"
    ],
    itinerary: [
      {
        day: 1,
        title: "Penjemputan Bandara & Sunset Romantis Uluwatu",
        location: "Kuta & Uluwatu",
        meals: "Makan Malam (Jimbaran Seafood)",
        accommodation: "Hotel Bintang 4 Seminyak",
        activities: [
          { time: "12:00 - 14:00", activity: "Penjemputan di Bandara Internasional I Gusti Ngurah Rai dengan kalungan bunga khas Bali" },
          { time: "14:30 - 15:30", activity: "Check-in hotel di kawasan Seminyak, rehat sejenak dan menyegarkan diri" },
          { time: "16:00 - 18:30", activity: "Menuju Pura Uluwatu di atas tebing samudra megah, menyaksikan Tari Kecak saat matahari terbenam" },
          { time: "19:30 - 21:00", activity: "Santap malam Candlelight Seafood Dinner di tepi Pantai Jimbaran" }
        ]
      },
      {
        day: 2,
        title: "Island Hopping Nusa Penida West Coast",
        location: "Nusa Penida Island",
        meals: "Sarapan Hotel, Makan Siang Lokal, Makan Malam Kuta",
        accommodation: "Hotel Bintang 4 Seminyak",
        activities: [
          { time: "06:30 - 07:30", activity: "Sarapan pagi di hotel dan transfer ke Pelabuhan Sanur" },
          { time: "08:00 - 08:45", activity: "Menyeberang ke Nusa Penida dengan Speedboat Cepat" },
          { time: "09:30 - 12:30", activity: "Eksplorasi Kelingking Beach T-Rex Cliff dan Angel's Billabong" },
          { time: "12:30 - 13:30", activity: "Makan siang di resto lokal Nusa Penida dengan kelapa muda segar" },
          { time: "14:00 - 16:00", activity: "Mengunjungi Broken Beach (Pasih Uug) dan berfoto di Crystal Bay" },
          { time: "16:30 - 17:30", activity: "Kembali ke Sanur dan kembali ke hotel untuk bersantai" }
        ]
      },
      {
        day: 3,
        title: "Kesejukan Ubud Terasering & Cafe Hidden Gem",
        location: "Ubud & Kintamani",
        meals: "Sarapan Hotel, Makan Siang Kintamani View, Makan Malam Ubud",
        accommodation: "Hotel Bintang 4 Seminyak",
        activities: [
          { time: "08:30 - 10:00", activity: "Perjalanan menuju Ubud, mengunjungi Tegalalang Rice Terrace & Bali Swing (opsional)" },
          { time: "10:30 - 12:30", activity: "Jalan santai di Sacred Monkey Forest Sanctuary yang rimbun dan sakral" },
          { time: "13:00 - 14:30", activity: "Makan siang buffet di Kintamani dengan panorama Gunung & Danau Batur" },
          { time: "15:30 - 17:30", activity: "Berbelanja kerajinan otentik di Ubud Art Market dan mampir di cafe estetik" },
          { time: "19:00 - 20:30", activity: "Makan malam santai dengan kuliner khas Bebek Tepi Sawah" }
        ]
      },
      {
        day: 4,
        title: "Oleh-Oleh Khas Bali & Transfer Bandara",
        location: "Kuta / Bandara Ngurah Rai",
        meals: "Sarapan Hotel",
        accommodation: "-",
        activities: [
          { time: "08:00 - 10:00", activity: "Sarapan pagi dan proses check-out santai" },
          { time: "10:30 - 12:30", activity: "Belanja cenderamata dan pie susu khas Bali di Krisna Oleh-Oleh Nusantara" },
          { time: "13:00", activity: "Diantar menuju Bandara Ngurah Rai untuk penerbangan pulang membawa kenangan indah" }
        ]
      }
    ],
    included: [
      "Akomodasi 3 malam di Hotel Bintang 4 (1 kamar berdua / twin bed)",
      "Transportasi privat ber-AC selama tour (Avanza / Innova / HiAce sesuai jumlah pax)",
      "Tiket speedboat pulang-pergi Sanur - Nusa Penida",
      "Transport privat khusus dan driver lokal di Nusa Penida",
      "Tiket masuk seluruh objek wisata sesuai program",
      "Tiket pertunjukan Tari Kecak Uluwatu VIP seat",
      "3x Sarapan Hotel, 2x Makan Siang, 3x Makan Malam (termasuk Jimbaran Seafood)",
      "Air mineral dingin gratis setiap hari selama tour",
      "Driver merangkap guide ramah berlisensi dan jago fotografi",
      "Biaya parkir, tol, dan retribusi daerah"
    ],
    notIncluded: [
      "Tiket pesawat PP dari dan menuju Denpasar Bali",
      "Pengeluaran pribadi (laundry, minibar, belanja oleh-oleh, tips driver sukarela)",
      "Aktivitas opsional seperti Bali Swing, Watersport, atau Spa",
      "Asuransi perjalanan tambahan (tersedia add-on atas permintaan)"
    ],
    facilities: [
      { name: "Hotel Bintang 4", icon: "Hotel" },
      { name: "Mobil Privat AC", icon: "Car" },
      { name: "Speedboat Cepat", icon: "Ship" },
      { name: "Makanan Halal", icon: "Utensils" },
      { name: "Pemandu Berlisensi", icon: "UserCheck" },
      { name: "Free Foto/Video", icon: "Camera" }
    ],
    notes: [
      "Harga berlaku untuk WNI (Warga Negara Indonesia) periode regular season.",
      "Meeting point: Bandara Internasional I Gusti Ngurah Rai (DPS).",
      "Paket bersifat privat, tidak digabung dengan rombongan lain.",
      "Itinerary fleksibel dapat disesuaikan dengan jam kedatangan dan kepulangan penerbangan Anda.",
      "Disarankan membawa pakaian ganti, tabir surya (sunblock), topi pantai, dan kacamata hitam untuk trip Nusa Penida."
    ],
    faqs: [
      {
        q: "Apakah jadwal tour Nusa Penida aman untuk anak-anak dan lansia?",
        a: "Aman! Jalur menuju viewpoint utama di Kelingking dan Broken Beach telah dilengkapi pagar pengaman. Untuk lansia dan balita, kami menyarankan menikmati pemandangan dari atas tanpa turun ke pantai tebing."
      },
      {
        q: "Bisakah kami upgrade tipe kamar atau hotel bintang 5?",
        a: "Sangat bisa. Anda dapat melakukan kustomisasi hotel (seperti Padma Resort, Ayana, atau private pool villa di Ubud) cukup dengan memberitahu konsultan kami via WhatsApp."
      }
    ]
  },
  {
    id: "labuan-bajo-phinisi",
    slug: "labuan-bajo-phinisi-3d2n",
    name: "Labuan Bajo Phinisi Discovery",
    tagline: "Liveaboard Phinisi Semi-Mewah Menjelajahi Surga Purba Komodo",
    destination: "Labuan Bajo",
    destinationId: "labuan-bajo",
    duration: "3 Hari 2 Malam",
    durationDays: 3,
    durationNights: 2,
    durationCategory: "short",
    travelStyle: "Adventure",
    travelStyleLabel: "Petualangan & Bahari",
    badge: "Sensasi Unik",
    featured: true,
    price: 4650000,
    formattedPrice: "Rp 4.650.000",
    rating: 5.0,
    reviewCount: 92,
    heroImage: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80"
    ],
    shortDescription: "Tidur di atas kapal phinisi tradisional semi-luxury, menyaksikan ribuan kelelawar di Pulau Kalong, dan trekking matahari terbit Pulau Padar.",
    overview: "Rasakan kebebasan sejati berlayar melintasi perairan biru toska Taman Nasional Komodo. Nikmati fasilitas kabin AC privat/berbagi di atas kapal Phinisi berstandar tinggi, didampingi koki kapal profesional yang menyajikan santapan lezat setiap saat, serta juru kamera dengan drone untuk mengabadikan momen berharga Anda.",
    highlights: [
      "Trekking sunrise spektakuler di puncak bukit Pulau Padar berlatar 3 teluk",
      "Berenang dan snorkeling santai di Pink Beach dengan pasir merah muda unik",
      "Berenang bersama pari raksasa di habitat alaminya di Manta Point",
      "Menyaksikan jutaan kelelawar terbang saat senja merah di Pulau Kalong",
      "Dokumentasi profesional dengan Drone DJI & Kamera Mirrorless underwater"
    ],
    itinerary: [
      {
        day: 1,
        title: "Check-in Kapal Phinisi & Senja Magis Pulau Kalong",
        location: "Pelabuhan Marina - Pulau Kelor - Kalong",
        meals: "Makan Siang & Makan Malam di Kapal",
        accommodation: "Kabin Kapal Phinisi AC",
        activities: [
          { time: "09:30 - 10:30", activity: "Penjemputan di hotel/Bandara Komodo (LBJ) menuju Marina Labuan Bajo" },
          { time: "11:00 - 12:30", activity: "Welcome drink, briefing keselamatan, dan berlayar menuju Pulau Kelor" },
          { time: "13:00 - 15:00", activity: "Trekking bukit Kelor untuk panorama 360 derajat & santap siang di kapal" },
          { time: "15:30 - 17:00", activity: "Snorkeling di Pulau Manjarite melihat terumbu karang dan nemo" },
          { time: "17:30 - 19:00", activity: "Menikmati golden sunset di Pulau Kalong diiringi tarian ribuan kalong terbang" },
          { time: "19:30", activity: "Makan malam lezat olahan koki kapal dan beristirahat di bawah langit berbintang" }
        ]
      },
      {
        day: 2,
        title: "Ikon Padar, Komodo Dragon & Pink Beach",
        location: "Pulau Padar - Komodo - Pink Beach - Manta Point",
        meals: "Sarapan, Makan Siang & Makan Malam di Kapal",
        accommodation: "Kabin Kapal Phinisi AC",
        activities: [
          { time: "05:00 - 07:30", activity: "Trekking pagi di Pulau Padar untuk menyaksikan sunrise spektakuler" },
          { time: "08:00 - 09:30", activity: "Sarapan hangat di sundeck kapal sembari berlayar ke Pulau Komodo" },
          { time: "10:00 - 12:00", activity: "Ranger-guided trekking di Pulau Komodo bertemu satwa purba Komodo Dragon" },
          { time: "12:30 - 15:00", activity: "Makan siang dan bersantai di hamparan pasir merah muda Pink Beach" },
          { time: "15:30 - 17:30", activity: "Snorkeling di Taka Makassar pasir timbul & Manta Point berenang dengan Manta Ray" },
          { time: "19:00", activity: "Malam keakraban BBQ party di atas kapal phinisi" }
        ]
      },
      {
        day: 3,
        title: "Pulau Kanawa, Sayonara & Kepulangan",
        location: "Pulau Kanawa - Marina Labuan Bajo",
        meals: "Sarapan & Makan Siang di Kapal",
        accommodation: "-",
        activities: [
          { time: "07:00 - 08:30", activity: "Sarapan di kapal dan berlayar ke Pulau Kanawa" },
          { time: "09:00 - 11:00", activity: "Snorkeling santai di dermaga Kanawa dengan ribuan ikan warna-warni" },
          { time: "11:30 - 13:00", activity: "Makan siang penutup perjalanan di kapal sambil berlayar kembali ke pelabuhan" },
          { time: "13:30", activity: "Drop-off menuju Bandara Komodo atau hotel di Labuan Bajo" }
        ]
      }
    ],
    included: [
      "Liveaboard 3H2M di Kapal Phinisi Semi-Luxury (Kabin ber-AC)",
      "Antar jemput bandara / hotel Labuan Bajo PP dengan mobil ber-AC",
      "Makan lengkap 3x sehari selama di kapal diracik koki profesional",
      "Snack sore, buah segar, kopi, teh, dan air mineral tak terbatas",
      "Peralatan snorkeling lengkap (mask, snorkel, fin) & Life Jacket pelampung",
      "Dokumentasi drone, mirrorless & underwater GoPro selama trip",
      "Tour guide lokal berpengalaman dan ranger resmi Taman Nasional",
      "P3K standar pelayaran dan asuransi kapal"
    ],
    notIncluded: [
      "Tiket pesawat PP ke Labuan Bajo (LBJ)",
      "Tiket masuk Taman Nasional Komodo & retribusi Pemda (dibayar di lokasi)",
      "Tipping kru kapal & guide (sukarela)",
      "Keperluan belanja pribadi dan minuman beralkohol"
    ],
    facilities: [
      { name: "Phinisi Boat", icon: "Ship" },
      { name: "Kabin AC Nyaman", icon: "Home" },
      { name: "Full Board Meals", icon: "Utensils" },
      { name: "Snorkel Gear", icon: "Waves" },
      { name: "Dokumentasi Drone", icon: "Video" },
      { name: "Safety First", icon: "ShieldCheck" }
    ],
    notes: [
      "Jadwal sailing reguler buka setiap hari Jumat - Minggu (Open Trip) dan setiap hari (Private Charter).",
      "Penerbangan kedatangan di hari pertama disarankan tiba sebelum pukul 09.30 WITA.",
      "Penerbangan kepulangan di hari terakhir disarankan setelah pukul 14.30 WITA.",
      "Disarankan membawa sepatu trekking nyaman untuk mendaki bukit Pulau Padar."
    ],
    faqs: [
      {
        q: "Apakah sinyal internet handphone tersedia selama berlayar?",
        a: "Di beberapa titik seperti Pulau Padar dan Pink Beach sinyal Telkomsel cukup stabil, namun di beberapa teluk sinyal akan hilang sementara sehingga Anda bisa benar-benar menikmati digital detox alami."
      },
      {
        q: "Bagaimana jika saya tidak bisa berenang?",
        a: "Kru kapal dan guide kami akan selalu memakaikan life jacket dan siap mendampingi Anda di air dengan pelampung ring buoy."
      }
    ]
  },
  {
    id: "raja-ampat-ultimate",
    slug: "raja-ampat-ultimate-5d4n",
    name: "Raja Ampat Ultimate Paradise",
    tagline: "Eksplorasi Mahakarya Karst Piaynemo & Teluk Kabui yang Magis",
    destination: "Raja Ampat",
    destinationId: "raja-ampat",
    duration: "5 Hari 4 Malam",
    durationDays: 5,
    durationNights: 4,
    durationCategory: "medium",
    travelStyle: "Romantic",
    travelStyleLabel: "Eksklusif & Fotografi",
    badge: "Eksklusif",
    featured: true,
    price: 8950000,
    formattedPrice: "Rp 8.950.000",
    rating: 5.0,
    reviewCount: 64,
    heroImage: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80"
    ],
    shortDescription: "Saksikan langsung keajaiban gugusan pulau karang Piaynemo, Pasir Timbul, Teluk Kabui, dan menyelam bersama biota laut terkaya di dunia.",
    overview: "Sebuah perjalanan sekali seumur hidup menuju surga paling murni di timur nusantara. Menginap di eco-resort terapung di atas laut jernih Waisai, menjelajahi laguna tersembunyi, hingga berinteraksi hangat dengan masyarakat lokal desa wisata Arborek.",
    highlights: [
      "Mendaki tangga kayu menuju puncak Piaynemo dengan panorama gugusan pulau karst ikonik",
      "Menyusuri labirin karst dan bebatuan mistis di Teluk Kabui & Batu Pensil",
      "Snorkeling bersama puluhan ikan pelagis di dermaga Desa Wisata Arborek",
      "Menginjakkan kaki di Pasir Timbul Pulau Mansuar yang timbul saat air surut",
      "Akomodasi eco-resort tepi laut dengan pemandangan bintang malam tanpa polusi"
    ],
    itinerary: [
      {
        day: 1,
        title: "Penjemputan Sorong & Ferry Cepat ke Waisai",
        location: "Sorong - Waisai Raja Ampat",
        meals: "Makan Siang & Makan Malam",
        accommodation: "Water Bungalow Resort Waisai",
        activities: [
          { time: "07:30 - 08:30", activity: "Penjemputan di Bandara Domine Eduard Osok (SOQ) Sorong" },
          { time: "09:00 - 11:30", activity: "Menyeberang ke Pelabuhan Waisai Raja Ampat dengan VIP Express Ferry" },
          { time: "12:00 - 14:00", activity: "Tiba di Waisai, transfer speedboat ke resort, check-in dan makan siang hangat" },
          { time: "15:00 - 18:00", activity: "Waktu santai snorkeling langsung dari depan balkon kamar resort Anda" }
        ]
      },
      {
        day: 2,
        title: "Ikonik Piaynemo, Teluk Bintang & Arborek",
        location: "Piaynemo & Arborek",
        meals: "Sarapan, Makan Siang Box di Pulau, Makan Malam Resort",
        accommodation: "Water Bungalow Resort Waisai",
        activities: [
          { time: "07:00 - 09:00", activity: "Speedboat menuju Piaynemo melintasi selat berair hijau zamrud" },
          { time: "09:30 - 11:30", activity: "Mendaki 320 anak tangga ke puncak Piaynemo & Teluk Bintang" },
          { time: "12:00 - 13:30", activity: "Makan siang santai dan mencicipi camilan khas kepulauan" },
          { time: "14:00 - 16:30", activity: "Snorkeling di Dermaga Arborek yang dipenuhi gerombolan ikan warna-warni" }
        ]
      },
      {
        day: 3,
        title: "Teluk Kabui, Batu Pensil & Pasir Timbul",
        location: "Kabui Bay & Mansuar",
        meals: "Sarapan, Makan Siang, Makan Malam",
        accommodation: "Water Bungalow Resort Waisai",
        activities: [
          { time: "08:00 - 11:00", activity: "Menyusuri perairan tenang Teluk Kabui yang magis dan melihat formasi Batu Pensil" },
          { time: "11:30 - 13:00", activity: "Mampir ke Pasir Timbul berfoto di atas pulau pasir putih di tengah lautan luas" },
          { time: "14:00 - 16:00", activity: "Snorkeling di Yenbuba Jetty melihat hiu karang blacktip yang ramah" },
          { time: "18:00", activity: "Sunset view dari sundeck resort" }
        ]
      },
      {
        day: 4,
        title: "Bird Watching Cendrawasih & Snorkeling Friwen",
        location: "Sawinggrai & Friwen",
        meals: "Sarapan, Makan Siang, Makan Malam",
        accommodation: "Water Bungalow Resort Waisai",
        activities: [
          { time: "05:30 - 08:00", activity: "Trekking pagi mengamati tarian Burung Cendrawasih Merah di habitat liar" },
          { time: "09:00 - 12:00", activity: "Relaksasi di Pantai Friwen dengan pasir halus bak bedak dan ayunan laut" },
          { time: "14:00 - 17:00", activity: "Waktu luang kayak laut atau santai sebelum malam perpisahan" }
        ]
      },
      {
        day: 5,
        title: "Kembali ke Sorong & Transfer Bandara",
        location: "Waisai - Sorong",
        meals: "Sarapan Resort",
        accommodation: "-",
        activities: [
          { time: "07:00 - 08:30", activity: "Sarapan pagi dan proses check-out resort" },
          { time: "09:00 - 11:00", activity: "Ferry cepat kembali ke Kota Sorong" },
          { time: "11:30 - 13:00", activity: "Mampir ke pusat cinderamata Batik Papua & Roti Abon Gulung Sorong" },
          { time: "13:30", activity: "Pengantaran ke Bandara DEO Sorong. Tour selesai." }
        ]
      }
    ],
    included: [
      "Akomodasi 4 malam di Resort Tepi Laut Raja Ampat (AC, Hot Water)",
      "Tiket Ferry Cepat Express Bahari Kelas VIP Sorong - Waisai PP",
      "Private Speedboat selama tour pulau-pulau Raja Ampat",
      "Makan lengkap 3x sehari (breakfast, lunch, dinner) menu seafood & nusantara",
      "Peralatan snorkeling & jaket pelampung keselamatan",
      "Local guide asli Papua berlisensi HPI & kapten speedboat berpengalaman",
      "Dokumentasi foto kamera profesional",
      "Air mineral, teh, kopi, dan camilan lokal selama trip"
    ],
    notIncluded: [
      "Tiket pesawat udara ke Kota Sorong (SOQ)",
      "PIN / Kartu Tarif Jasa Lingkungan (BLUD) Raja Ampat",
      "Pengeluaran personal & tipping kru speedboat",
      "Peralatan scuba diving (tersedia rental terpisah bagi pemegang lisensi)"
    ],
    facilities: [
      { name: "Overwater Resort", icon: "Hotel" },
      { name: "VIP Express Ferry", icon: "Ship" },
      { name: "Private Speedboat", icon: "Compass" },
      { name: "Local Guide", icon: "Users" },
      { name: "Snorkel Gear", icon: "Waves" },
      { name: "Full Board", icon: "Utensils" }
    ],
    notes: [
      "Waktu terbaik berkunjung adalah Oktober hingga April di mana laut sangat tenang dan jernih.",
      "Wajib membawa botol minum isi ulang (tumbler) untuk menjaga kelestarian alam Raja Ampat bebas sampah plastik.",
      "Mata uang yang berlaku tunai (cash) karena mesin ATM hanya tersedia di kota Sorong dan Waisai."
    ],
    faqs: [
      {
        q: "Apakah pemula yang belum pernah snorkeling bisa ikut?",
        a: "Tentu bisa! Perairan Raja Ampat di area terumbu karang dangkal sangat tenang, dan pemandu lokal kami akan memegang tangan atau memandu pelampung Anda secara sabar."
      }
    ]
  },
  {
    id: "lombok-adventure",
    slug: "lombok-adventure-4d3n",
    name: "Lombok Tropical Dream & Gili",
    tagline: "Petualangan Trio Gili, Bukit Merese & Keindahan Alam Sasak",
    destination: "Lombok",
    destinationId: "lombok",
    duration: "4 Hari 3 Malam",
    durationDays: 4,
    durationNights: 3,
    durationCategory: "medium",
    travelStyle: "Adventure",
    travelStyleLabel: "Petualangan & Alam",
    badge: "Favorit",
    featured: true,
    price: 3150000,
    formattedPrice: "Rp 3.150.000",
    rating: 4.8,
    reviewCount: 110,
    heroImage: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1000&q=80"
    ],
    shortDescription: "Jelajahi keindahan bawah laut Gili Trawangan, Meno, & Air dengan private glass-bottom boat, lalu nikmati golden hour di Bukit Merese.",
    overview: "Nikmati kombinasi keindahan pantai selatan Lombok yang terkenal dengan ombak birunya, kekayaan adat di Desa Adat Sade suku Sasak, hingga ketenangan pulau tanpa kendaraan bermotor di Gili Trawangan.",
    highlights: [
      "Snorkeling private boat di 3 Gili: Patung Bawah Laut Meno, Penyu Gili Trawangan, & Karang Gili Air",
      "Matahari terbenam di Bukit Merese berlatar Pantai Tanjung Aan nan magis",
      "Belajar tenun tradisional di Desa Adat Sade suku Sasak",
      "Menyantap Ayam Taliwang pedas gurih legendaris Lombok",
      "Hotel tepi pantai Senggigi atau Kuta Lombok pilihan bintang 4"
    ],
    itinerary: [
      {
        day: 1,
        title: "Eksplorasi Sasak Culture & Sunset Mandalika",
        location: "Kuta Mandalika & Desa Sade",
        meals: "Makan Siang & Makan Malam",
        accommodation: "Hotel Bintang 4 Kuta Lombok",
        activities: [
          { time: "09:00 - 10:30", activity: "Penjemputan di Bandara Internasional Lombok (LOP)" },
          { time: "11:00 - 12:30", activity: "Berkunjung ke Desa Sade belajar filosofi rumah adat & tenun ikat Sasak" },
          { time: "13:00 - 14:30", activity: "Makan siang dengan kuliner Ayam Taliwang asli Lombok" },
          { time: "15:30 - 18:30", activity: "Melihat Sirkuit Internasional Mandalika dari luar & sunset di Bukit Merese" }
        ]
      },
      {
        day: 2,
        title: "Snorkeling Private Boat Trio Gili",
        location: "Gili Trawangan, Meno & Air",
        meals: "Sarapan, Makan Siang di Gili, Makan Malam",
        accommodation: "Hotel Bintang 4 Senggigi",
        activities: [
          { time: "08:00 - 09:30", activity: "Perjalanan ke Pelabuhan Teluk Nare, naik private glass-bottom boat" },
          { time: "10:00 - 13:00", activity: "Snorkeling di spot Patung Nest Bask Gili Meno & penyu laut Gili Trawangan" },
          { time: "13:00 - 15:30", activity: "Makan siang di tepi pantai Gili Trawangan & sewa sepeda santai keliling pulau" },
          { time: "16:00 - 17:30", activity: "Kembali ke daratan Lombok dan check-in hotel Senggigi" }
        ]
      },
      {
        day: 3,
        title: "Air Terjun Sendang Gile & Kesejukan Senaru",
        location: "Lereng Gunung Rinjani",
        meals: "Sarapan, Makan Siang, Makan Malam",
        accommodation: "Hotel Bintang 4 Senggigi",
        activities: [
          { time: "08:30 - 11:30", activity: "Perjalanan scenic ke kaki Rinjani di Desa Senaru yang sejuk" },
          { time: "11:30 - 14:00", activity: "Trekking ringan menyusuri hutan rimbun menuju Air Terjun Sendang Gile & Tiu Kelep" },
          { time: "14:30 - 17:00", activity: "Makan siang santai dan menikmati panorama perbukitan hijau" }
        ]
      },
      {
        day: 4,
        title: "Pusat Mutiara Lombok & Sayonara",
        location: "Mataram - Bandara",
        meals: "Sarapan Hotel",
        accommodation: "-",
        activities: [
          { time: "08:30 - 11:30", activity: "Check-out hotel, belanja mutiara laut Lombok dan madu Sumbawa asli" },
          { time: "12:00", activity: "Drop-off ke Bandara Internasional Lombok" }
        ]
      }
    ],
    included: [
      "Akomodasi 3 malam di Hotel Bintang 4 pilihan",
      "Private boat untuk snorkeling ke 3 Gili + alat snorkeling lengkap",
      "Transportasi privat ber-AC selama tour",
      "Semua tiket masuk objek wisata & donasi desa adat",
      "Makan sesuai itinerary (3x sarapan, 3x lunch, 3x dinner)",
      "Pemandu wisata berlisensi lokal",
      "Dokumentasi foto GoPro underwater di Gili"
    ],
    notIncluded: [
      "Tiket pesawat PP ke Lombok",
      "Sewa sepeda atau cidomo (delman) di Gili Trawangan",
      "Pengeluaran pribadi & tips guide"
    ],
    facilities: [
      { name: "Hotel Bintang 4", icon: "Hotel" },
      { name: "Private Car AC", icon: "Car" },
      { name: "Private Boat Gili", icon: "Ship" },
      { name: "Makan Lengkap", icon: "Utensils" },
      { name: "GoPro Photos", icon: "Camera" }
    ],
    notes: [
      "Cocok untuk liburan keluarga maupun pasangan.",
      "Gili Trawangan bebas kendaraan bermotor, transportasi di dalam pulau menggunakan sepeda atau cidomo."
    ],
    faqs: [
      {
        q: "Apakah trekking ke Air Terjun Tiu Kelep aman untuk anak-anak?",
        a: "Aman dengan pengawasan orang tua. Jalur jalan setapak sudah tertata rapi, dan guide kami siap membantu menyeberangi sungai kecil berarus tenang."
      }
    ]
  },
  {
    id: "yogyakarta-heritage",
    slug: "yogyakarta-heritage-3d2n",
    name: "Yogyakarta Heritage & Cave Tubing",
    tagline: "Pesona Luhur Candi Borobudur, Petualangan Gua Pindul & Kuliner Khas",
    destination: "Yogyakarta",
    destinationId: "yogyakarta",
    duration: "3 Hari 2 Malam",
    durationDays: 3,
    durationNights: 2,
    durationCategory: "short",
    travelStyle: "Family",
    travelStyleLabel: "Budaya & Keluarga",
    badge: "Ramah Keluarga",
    featured: true,
    price: 2150000,
    formattedPrice: "Rp 2.150.000",
    rating: 4.9,
    reviewCount: 135,
    heroImage: "https://images.unsplash.com/photo-1584810359583-96fc3448beaa?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1584810359583-96fc3448beaa?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=1000&q=80"
    ],
    shortDescription: "Jelajahi kemegahan relief Candi Borobudur dengan pemandu arkeolog, serunya susur sungai bawah tanah Goa Pindul, dan malam syahdu Malioboro.",
    overview: "Paket wisata Yogyakarta yang memadukan edukasi sejarah berkelas, petualangan alam yang aman untuk seluruh anggota keluarga, dan kehangatan keramahan khas masyarakat Jogja.",
    highlights: [
      "Kunjungan Candi Borobudur naik ke atas monumen candi dengan sandal upanat khusus",
      "Petualangan cave tubing menyusuri sungai bawah tanah di Goa Pindul & Sungai Oya",
      "Sunset estetik di Candi Ijo atau Tebing Breksi dengan view kota Jogja dari ketinggian",
      "Berburu kuliner legendaris Gudeg Yu Djum & Kopi Klotok Pakem",
      "Menginap di hotel bintang 4 strategis dekat Malioboro"
    ],
    itinerary: [
      {
        day: 1,
        title: "Kedatangan, Keraton Jogja & Romantisme Malioboro",
        location: "Pusat Kota Yogyakarta",
        meals: "Makan Siang & Makan Malam",
        accommodation: "Hotel Bintang 4 Malioboro",
        activities: [
          { time: "09:00 - 10:30", activity: "Penjemputan di Bandara YIA / Stasiun Tugu Yogyakarta" },
          { time: "11:00 - 13:00", activity: "Makan siang kuliner khas dan mengunjungi Keraton Yogyakarta & Taman Sari" },
          { time: "14:30 - 16:30", activity: "Check-in hotel, istirahat sejenak" },
          { time: "17:30 - 21:00", activity: "Jalan santai di pedestrian Malioboro, mendengarkan musisi jalanan, dan makan malam wedangan" }
        ]
      },
      {
        day: 2,
        title: "Kemegahan Candi Borobudur & Asrinya Kopi Klotok",
        location: "Magelang & Kaliurang",
        meals: "Sarapan, Makan Siang Kopi Klotok, Makan Malam",
        accommodation: "Hotel Bintang 4 Malioboro",
        activities: [
          { time: "07:30 - 09:30", activity: "Perjalanan ke Candi Borobudur" },
          { time: "09:30 - 12:00", activity: "Naik ke struktur Candi Borobudur didampingi pemandu edukasi khusus" },
          { time: "12:30 - 14:30", activity: "Makan siang masakan ndeso di Warung Kopi Klotok Pakem di tepi sawah" },
          { time: "15:00 - 17:30", activity: "Lava Tour Merapi dengan Jeep 4x4 melintasi trek bebatuan dan bunker Kaliadem" }
        ]
      },
      {
        day: 3,
        title: "Cave Tubing Goa Pindul & Belanja Bakpia",
        location: "Gunungkidul - Pusat Kota",
        meals: "Sarapan, Makan Siang",
        accommodation: "-",
        activities: [
          { time: "08:00 - 11:30", activity: "Cave tubing seru di Goa Pindul melihat stalaktit kristal dan air terjun Sungai Oya" },
          { time: "12:00 - 13:30", activity: "Makan siang nasi tiwul & ayam goreng kampung khas Gunungkidul" },
          { time: "14:30 - 16:00", activity: "Belanja Bakpia Kukus Tugu & oleh-oleh khas sebelum diantar ke Stasiun / Bandara" }
        ]
      }
    ],
    included: [
      "Akomodasi 2 malam di Hotel Bintang 4 dekat Malioboro",
      "Mobil privat AC + driver merangkap guide",
      "Tiket naik ke monumen Candi Borobudur (termasuk sandal upanat & pemandu)",
      "Tiket Jeep Lava Tour Merapi rute short/medium",
      "Paket Cave Tubing Goa Pindul + perlengkapan pelampung & ban",
      "Semua tiket masuk destinasi dan retribusi parkir",
      "Makan sesuai itinerary (2x breakfast, 3x lunch, 2x dinner)"
    ],
    notIncluded: [
      "Tiket kereta / pesawat menuju Yogyakarta",
      "Pengeluaran pribadi & belanja cenderamata",
      "Tipping sukarela untuk driver / jeep driver"
    ],
    facilities: [
      { name: "Hotel Dekat Malioboro", icon: "Hotel" },
      { name: "Mobil Privat AC", icon: "Car" },
      { name: "Jeep 4x4 Merapi", icon: "Compass" },
      { name: "Tiket Candi Naik", icon: "Landmark" },
      { name: "Kuliner Khas", icon: "Utensils" }
    ],
    notes: [
      "Tiket naik struktur candi Borobudur memiliki kuota terbatas per hari, pemesanan minimal H-7 disarankan.",
      "Membawa pakaian ganti untuk aktivitas basah-basahan di Goa Pindul."
    ],
    faqs: [
      {
        q: "Apakah lansia bisa ikut Lava Tour Merapi?",
        a: "Bisa! Kami menyediakan opsi rute Jeep yang lebih tenang tanpa manuver air ekstrem untuk kenyamanan keluarga senior."
      }
    ]
  },
  {
    id: "bromo-sunrise",
    slug: "bromo-sunrise-ijen-3d2n",
    name: "Bromo Sunrise & Ijen Blue Fire",
    tagline: "Sensasi Dua Fenomena Vulkanik Paling Ikonik di Jawa Timur",
    destination: "Bromo & Malang",
    destinationId: "bromo",
    duration: "3 Hari 2 Malam",
    durationDays: 3,
    durationNights: 2,
    durationCategory: "short",
    travelStyle: "Adventure",
    travelStyleLabel: "Petualangan & Sunrise",
    badge: "Petualang",
    featured: true,
    price: 2650000,
    formattedPrice: "Rp 2.650.000",
    rating: 4.9,
    reviewCount: 88,
    heroImage: "https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1000&q=80"
    ],
    shortDescription: "Taklukkan sunrise Penanjakan Bromo dengan Jeep Hardtop 4x4, lalu saksikan fenomena api biru langka dunia di kawah belerang Gunung Ijen.",
    overview: "Dirancang bagi pencinta keindahan lanskap alam dramatis. Perjalanan ini menyajikan dua atraksi vulkanik terhebat di dunia: lautan pasir dan kepulan asap Bromo yang agung, serta kawah belerang toska Ijen dengan fenomena Blue Fire magis yang hanya ada dua di dunia.",
    highlights: [
      "Golden sunrise di titik tertinggi Penanjakan 1 Bromo berlatar Batok dan Semeru",
      "Menunggangi Jeep 4x4 melintasi Lautan Pasir Berbisik dan Bukit Teletubbies",
      "Mendaki kawah aktif Bromo dan mendengar gemuruh alam dari dekat",
      "Midnight hike ke Kawah Ijen untuk menyaksikan fenomena langka Blue Fire",
      "Didampingi local guide dengan masker gas standar respirator"
    ],
    itinerary: [
      {
        day: 1,
        title: "Penjemputan Surabaya/Malang & Menuju Kawasan Bromo",
        location: "Surabaya / Malang - Bromo",
        meals: "Makan Siang & Makan Malam",
        accommodation: "Hotel / Lodge Pegunungan Bromo",
        activities: [
          { time: "09:00 - 11:00", activity: "Penjemputan di Bandara Juanda Surabaya / Stasiun Malang" },
          { time: "11:30 - 14:00", activity: "Makan siang kuliner Jawa Timuran dan berkendara ke area Bromo Tengger" },
          { time: "15:00 - 17:00", activity: "Check-in hotel di Bromo, menikmati hawa sejuk pegunungan dan kabut sore" },
          { time: "18:00 - 19:30", activity: "Makan malam hangat dan istirahat awal untuk persiapan sunrise" }
        ]
      },
      {
        day: 2,
        title: "Bromo Sunrise Jeep Tour & Perjalanan ke Banyuwangi",
        location: "Bromo - Banyuwangi",
        meals: "Sarapan Hotel, Makan Siang, Makan Malam",
        accommodation: "Hotel Bintang 3+ Banyuwangi",
        activities: [
          { time: "03:00 - 06:30", activity: "Berangkat dengan Jeep 4x4 menuju Penanjakan 1 menikmati sunrise spektakuler" },
          { time: "06:30 - 09:00", activity: "Eksplorasi Lautan Pasir, mendaki tangga kawah Bromo, & berfoto di Bukit Teletubbies" },
          { time: "09:30 - 11:30", activity: "Kembali ke hotel, sarapan pagi dan mandi air hangat, lalu check-out" },
          { time: "12:00 - 17:00", activity: "Perjalanan menuju Banyuwangi (kaki Gunung Ijen), makan siang dalam perjalanan" },
          { time: "18:00", activity: "Check-in hotel Banyuwangi dan tidur awal" }
        ]
      },
      {
        day: 3,
        title: "Midnight Hike Blue Fire Ijen & Kepulangan",
        location: "Kawah Ijen - Banyuwangi / Surabaya",
        meals: "Sarapan Box, Makan Siang",
        accommodation: "-",
        activities: [
          { time: "00:30 - 02:00", activity: "Bangun dan berkendara menuju Pos Paltuding Kawah Ijen" },
          { time: "02:00 - 04:30", activity: "Pendakian kawah Ijen bersama guide dan melihat fenomena api biru magis (Blue Fire)" },
          { time: "05:30 - 07:00", activity: "Menikmati sunrise dan indahnya danau kawah asam berwarna hijau toska" },
          { time: "08:30 - 10:00", activity: "Turun ke Paltuding, sarapan box, dan kembali ke hotel untuk mandi/check-out" },
          { time: "11:30", activity: "Pengantaran ke Bandara Banyuwangi (BWX) atau stasiun. Trip berkesan selesai." }
        ]
      }
    ],
    included: [
      "Akomodasi 1 malam di Bromo & 1 malam di Banyuwangi",
      "Mobil privat AC PP Surabaya/Malang - Bromo - Banyuwangi",
      "Sewa Jeep Hardtop 4x4 resmi di Bromo",
      "Tiket masuk Taman Nasional Bromo Tengger Semeru & Kawah Ijen",
      "Masker gas respirator khusus untuk pendakian Kawah Ijen & senter kepala",
      "Local guide ramah di Bromo dan guide lokal Kawah Ijen",
      "Makan lengkap sesuai jadwal tour"
    ],
    notIncluded: [
      "Tiket pesawat / kereta api",
      "Sewa kuda di lautan pasir Bromo (opsional)",
      "Sewa troli gerobak di Kawah Ijen (opsional jika lelah mendaki)",
      "Pengeluaran personal & tips"
    ],
    facilities: [
      { name: "Jeep 4x4", icon: "Compass" },
      { name: "Hotel Pegunungan", icon: "Hotel" },
      { name: "Masker Gas Ijen", icon: "Shield" },
      { name: "Private Transport", icon: "Car" },
      { name: "Guide Pendakian", icon: "UserCheck" }
    ],
    notes: [
      "Suhu di Bromo dan Ijen dapat mencapai 5 - 12 derajat Celsius. Wajib membawa jaket tebal, sarung tangan, syal, dan sepatu kets/gunung.",
      "Pendakian Kawah Ijen memiliki jalur tanjakan sedang sejauh 3 km, disarankan memiliki kebugaran fisik yang memadai."
    ],
    faqs: [
      {
        q: "Apakah anak-anak boleh ikut melihat Blue Fire Ijen?",
        a: "Anak-anak di atas usia 10 tahun yang terbiasa aktivitas outdoor dapat ikut dengan pengawasan ketat dan menggunakan masker gas yang disediakan."
      }
    ]
  }
];

export const WHY_FADZA = [
  {
    id: "pricing",
    icon: "ShieldCheck",
    title: "Harga Transparan & Pasti",
    description: "Semua rincian biaya, tiket masuk, akomodasi, dan transportasi dijelaskan secara terbuka tanpa ada biaya tersembunyi saat di lokasi."
  },
  {
    id: "curated",
    icon: "Sparkles",
    title: "Itinerary Kurasi Ahli",
    description: "Rute perjalanan dirancang dengan ritme yang menyenangkan, tidak terburu-buru, dan menyisipkan spot autentik yang jarang diketahui turis biasa."
  },
  {
    id: "support",
    icon: "Headphones",
    title: "Pendampingan Personal 24/7",
    description: "Konsultan travel kami siap menjawab pertanyaan dan memantau kelancaran perjalanan Anda sejak persiapan hingga tiba kembali di rumah."
  },
  {
    id: "booking",
    icon: "MessageCircle",
    title: "Kemudahan Booking via WhatsApp",
    description: "Konsultasi gratis, kustomisasi tanggal dan rombongan langsung dengan respons cepat melalui percakapan santai di WhatsApp resmi kami."
  }
];

export const GALLERY_ITEMS = [
  {
    id: 1,
    title: "Tebing Kelingking T-Rex",
    destination: "Bali",
    destinationId: "bali",
    category: "Lanskap",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    caption: "Formasi tebing karang ikonik Nusa Penida yang menjulang kokoh di atas lautan biru toska."
  },
  {
    id: 2,
    title: "Tari Kecak Uluwatu",
    destination: "Bali",
    destinationId: "bali",
    category: "Budaya",
    image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=1200&q=80",
    caption: "Pertunjukan magis berbalut senja di pelataran Pura Luhur Uluwatu tepi samudra."
  },
  {
    id: 3,
    title: "Pesona Tiga Teluk Pulau Padar",
    destination: "Labuan Bajo",
    destinationId: "labuan-bajo",
    category: "Lanskap",
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80",
    caption: "Puncak bukit Pulau Padar yang menampakkan tiga lengkungan pantai dengan warna pasir berbeda."
  },
  {
    id: 4,
    title: "Berlayar Bersama Kapal Phinisi",
    destination: "Labuan Bajo",
    destinationId: "labuan-bajo",
    category: "Aktivitas",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    caption: "Menikmati hembusan angin laut Flores dari dek kayu jati kapal phinisi tradisional nusantara."
  },
  {
    id: 5,
    title: "Gugusan Karst Zamrud Piaynemo",
    destination: "Raja Ampat",
    destinationId: "raja-ampat",
    category: "Lanskap",
    image: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=1200&q=80",
    caption: "Kepingan surga bawah laut dunia yang memikat setiap pasang mata penjelajah bumi."
  },
  {
    id: 6,
    title: "Ketenangan Gili Meno",
    destination: "Lombok",
    destinationId: "lombok",
    category: "Pantai",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
    caption: "Perairan dangkal bening kaca dengan terumbu karang yang terjaga rapi di pulau tanpa motor."
  },
  {
    id: 7,
    title: "Relief Megah Candi Borobudur",
    destination: "Yogyakarta",
    destinationId: "yogyakarta",
    category: "Budaya",
    image: "https://images.unsplash.com/photo-1584810359583-96fc3448beaa?auto=format&fit=crop&w=1200&q=80",
    caption: "Warisan luhur nenek moyang bangsa yang menyimpan ribuan cerita filosofi kebajikan hidup."
  },
  {
    id: 8,
    title: "Sunrise Emas di Atas Awan Bromo",
    destination: "Bromo & Malang",
    destinationId: "bromo",
    category: "Lanskap",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=1200&q=80",
    caption: "Gradasi fajar menyinari kawah Bromo dan Gunung Semeru yang gagah berselimut kabut lembut."
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Dimas Wicaksono & Natasha",
    location: "Jakarta Selatan",
    trip: "Bali Escape & Nusa Penida 4D3N",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    text: "Awalnya bingung mau honeymoon ke mana dengan budget tertentu. Tim FADZA menjelaskan setiap detail paket dengan sangat transparan di WhatsApp. Driver di Balinya luar biasa sopan, jago motoin kami, dan itinerary-nya santai nggak buru-buru. Sangat berkesan!",
    badge: "Sample Verified Review"
  },
  {
    id: 2,
    name: "dr. Hendra Pratama",
    location: "Surabaya",
    trip: "Labuan Bajo Phinisi Discovery 3D2N",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    text: "Pengalaman liveaboard phinisi pertama kali dan langsung jatuh cinta! Makanan di kapal dimasakin koki langsung sangat enak dan selalu hangat. Momen trekking Pulau Padar waktu sunrise bener-bener magis. Hasil dokumentasi drone juga dapet gratis tanpa tambahan biaya.",
    badge: "Sample Verified Review"
  },
  {
    id: 3,
    name: "Keluarga Ibu Ratna Sari",
    location: "Bandung",
    trip: "Yogyakarta Heritage & Cave Tubing 3D2N",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    text: "Liburan bareng anak-anak dan orang tua biasanya repot, tapi bersama FADZA semuanya tertata rapi. Mobilnya bersih wangi, tiket candi Borobudur sudah diuruskan sampai dapat sandal khusus, dan tempat makannya cocok untuk lidah keluarga. Recommended banget!",
    badge: "Sample Verified Review"
  }
];

export const GENERAL_FAQS = [
  {
    q: "Bagaimana cara booking paket wisata di FADZA TRAVEL?",
    a: "Caranya sangat mudah dan praktis! Cukup klik tombol 'Chat WhatsApp' di paket yang Anda inginkan. Anda akan terhubung langsung ke konsultan kami (085888159765) dengan pesan yang otomatis memuat nama paket. Tim kami akan membantu cek ketersediaan tanggal, penyesuaian jumlah peserta, dan mengirimkan invoice resmi."
  },
  {
    q: "Apa saja yang sudah termasuk dalam paket wisata?",
    a: "Secara umum seluruh paket kami sudah termasuk: akomodasi hotel bintang / kapal phinisi sesuai pilihan, kendaraan privat ber-AC, driver merangkap pemandu berlisensi, tiket masuk seluruh objek wisata utama, makan sesuai jadwal itinerary, air mineral, serta dokumentasi foto perjalanan. Rincian spesifik tercantum lengkap di halaman masing-masing paket."
  },
  {
    q: "Apakah harga yang tertera sudah termasuk tiket pesawat / kereta?",
    a: "Harga paket belum termasuk tiket transportasi antarkota (pesawat/kereta), sehingga Anda memiliki fleksibilitas penuh memilih maskapai atau jadwal terbang terbaik. Namun bila Anda ingin kami pesankan tiket pesawat sekaligus dalam satu bundle perjalanan, tim kami siap membantu tanpa repot."
  },
  {
    q: "Apakah jadwal itinerary dan destinasi bisa disesuaikan (custom tour)?",
    a: "Sangat bisa! Seluruh paket FADZA TRAVEL bersifat fleksibel. Bila Anda menginginkan upgrade hotel bintang 5 / private villa, menambah hari, atau mengganti spot wisata tertentu sesuai keinginan rombongan, kami akan buatkan itinerary kustom khusus untuk Anda."
  },
  {
    q: "Bagaimana sistem pembayaran dan keamanan transaksi?",
    a: "Pembayaran dilakukan secara aman dan transparan melalui transfer ke Rekening Bank Perusahaan resmi FADZA TRAVEL. Cukup membayar DP (Down Payment) sebesar 30-50% saat konfirmasi booking untuk mengamankan kamar dan transportasi, sedangkan pelunasan dapat diselesaikan H-3 sebelum keberangkatan atau saat tiba di lokasi."
  },
  {
    q: "Bagaimana jika terjadi cuaca buruk atau kondisi mendesak?",
    a: "Keselamatan Anda adalah prioritas mutlak kami. Pemandu dan kapten kami selalu memantau info BMKG dan Syahbandar resmi. Jika ada destinasi bahari yang ditutup karena faktor alam, kami akan mengalihkan ke rute alternatif yang setara atau melakukan penjadwalan ulang secara adil dan transparan."
  }
];

export const STORIES = [
  {
    id: "panduan-labuan-bajo",
    title: "Panduan Lengkap Jelajah Labuan Bajo untuk Pertama Kali",
    category: "Travel Guide",
    date: "15 Maret 2026",
    readTime: "5 menit baca",
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1000&q=80",
    excerpt: "Semua hal yang perlu Anda persiapkan: mulai dari pilihan liveaboard phinisi vs hotel darat, tips trekking Pulau Padar, hingga etika melihat Komodo Dragon secara aman.",
    content: `Labuan Bajo di Nusa Tenggara Timur telah bertransformasi menjadi salah satu destinasi bahari paling menawan di dunia. Bagi Anda yang baru pertama kali merencanakan kunjungan ke sini, ada beberapa tips penting yang perlu Anda ketahui:

1. Liveaboard Phinisi: Pengalaman Wajib
Menginap di atas kapal Phinisi semi-mewah (liveaboard) adalah cara terbaik menikmati Taman Nasional Komodo. Anda akan bangun tepat saat matahari terbit di depan tebing Pulau Padar dan tidur diiringi ribuan bintang di teluk yang tenang.

2. Waktu Terbaik Berkunjung
Bulan April hingga November adalah musim kering terbaik dengan perairan tenang dan langit biru cerah. Jika Anda ingin melihat padang savana hijau segar, datanglah di bulan April-Mei; sedangkan jika menyukai nuansa savana cokelat eksotis ala Jurassic Park, bulan Juli-Oktober adalah pilihan tepat.

3. Perlengkapan yang Wajib Dibawa
Gunakan sepatu trekking bertapak karet untuk mendaki tangga Pulau Padar, baju renang berlengan panjang untuk snorkeling menghindari paparan sengatan ubur-ubur kecil, serta tabir surya yang ramah terumbu karang (reef-safe sunscreen).`
  },
  {
    id: "hidden-gems-ubud",
    title: "7 Hidden Gems di Ubud yang Tenang & Menyegarkan Jiwa",
    category: "Inspirasi",
    date: "02 Maret 2026",
    readTime: "4 menit baca",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80",
    excerpt: "Melipir sejenak dari keramaian pusat Ubud menuju lembah tersembunyi, air terjun alami bertingkat, dan cafe di tengah kebun organik yang menyejukkan hati.",
    content: `Ubud selalu memiliki ruang khusus bagi mereka yang mencari ketenangan batin. Jika Anda merasa pusat kota Ubud mulai padat, cobalah melangkah sedikit lebih jauh ke arah utara dan timur:

1. Air Terjun Kanto Lampo saat Pagi
Datanglah sebelum pukul 08.00 pagi. Anda akan merasakan kedamaian gemercik air yang jatuh di atas bebatuan bertingkat hitam legam tanpa antrean foto.

2. Jalan Setapak Campuhan Ridge Walk
Berjalan santai saat fajar menyingsing di atas bukit berundak dengan ilalang hijau segar. Udara sejuk dan kabut tipis lembah Sungai Wos akan mengisi kembali energi positif Anda.

3. Kuliner Organik Petik Sendiri
Kunjungi kebun-kebun lokal di kawasan Tegallalang yang menyajikan teh herbal daun kelor hangat dan salad sayur organik segar yang dipetik langsung dari kebun.`
  },
  {
    id: "tips-packing-trip-kepulauan",
    title: "Tips Packing Cerdas untuk Trip Kepulauan & Bahari",
    category: "Tips Perjalanan",
    date: "20 Februari 2026",
    readTime: "4 menit baca",
    image: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=1000&q=80",
    excerpt: "Jangan biarkan koper berat membatasi mobilitas Anda saat island hopping. Simak daftar barang penting yang wajib masuk tas perjalanan Anda.",
    content: `Melakukan perjalanan antar pulau di Raja Ampat, Komodo, maupun trio Gili memerlukan strategi packing yang sedikit berbeda dari liburan perkotaan biasa:

1. Gunakan Duffle Bag atau Tas Ransel Waterproof
Hindari membawa koper beroda kaku (hardcase) berukuran terlalu besar karena ruang penyimpanan di kabin kapal atau speedboat terbatas. Tas dry-bag tahan air 20-30L sangat berguna melindungi kamera dan gadget Anda dari cipratan ombak.

2. Pakaian Cepat Kering (Quick-Dry)
Pilihlah pakaian berbahan linen atau poliester ringan yang cepat kering saat terkena air laut atau keringat. Bawa minimal dua set baju renang agar bisa dipakai bergantian tanpa menunggu terlalu lama.

3. Kantong Anti Air Khusus Smartphone & Sandal Gunung
Sandal gunung bertali jauh lebih aman dan tidak licin saat menaiki tangga dermaga atau bebatuan karang basah dibandingkan sandal jepit biasa.`
  }
];
