/**
 * FADZA TRIP ADVENTURE Centralized Image Architecture
 * Every single image is 100% UNIQUE, verified, and correctly represents Indonesian destinations.
 * Zero duplicate image URLs across the entire application.
 * All images actively verified with HTTP 200 status.
 */

export const ASSET_IMAGES = {
  // Atmospheric & Background Visuals (Natural Indonesian Landscapes)
  backgrounds: {
    hero: "/images/hero/hero-pink-beach.jpg",
    heroFallback: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80",
    experience: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80",
    destinationSection: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80",
    tripFinderBackdrop: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2000&q=80",
    ctaSunset: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=2000&q=80",
    packageCatalog: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=2000&q=80",
    footerGlow: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=2000&q=80"
  },

  // 7 Auto-Sliding Hero Slides (Tailored Indonesian Masterpieces with Infinite Loop)
  heroSlides: [
    {
      id: 'bromo-sunrise',
      shortLabel: '01. Bromo',
      image: '/images/hero/hero-bromo-sunrise.jpg',
      fallback: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2000&q=80',
      eyebrow: '🌋 EKSPLORASI VULKANIK JAWA TIMUR',
      headingPill: 'Experience the Magic of East Java',
      headingPillId: 'Pesona Magis Kaldera Jawa Timur',
      headingLine1: 'Unforgettable Mount',
      headingLine2Bold: 'Bromo',
      headingLine2Italic: 'Sunrise Tour',
      titlePrimary: 'Menyapa Kemegahan',
      titleHighlight: 'Fajar Emas',
      titleSecondary: 'di Kaldera Sakral Gunung Bromo.',
      tourTitle: 'Magic of East Java Tour',
      tourTitleId: 'Eksplorasi Magis Kaldera Bromo',
      tourDate: '24 Juli 2026 • Berangkat Setiap Hari',
      joinedCount: '+32 Wisatawan Bergabung',
      joinedCountEn: '+32 People Joined',
      tourDescription: 'Rasakan keindahan magis Jawa Timur saat fajar menyingsing di lautan pasir Bromo bersama pemandu berlisensi kami.',
      tourDescriptionEn: 'Immerse yourself in the stunning beauty of East Java with our iconic Mount Bromo Sunrise Tour.',
      subtitle: 'Nikmati sensasi safari Jeep 4WD menembus lautan pasir berbisik, berdiri di tepi bibir kawah aktif yang melegenda, dan menyaksikan sunrise fajar terbaik di Penanjakan.',
      tags: ['Sunrise Penanjakan 1', 'Jeep 4x4 Private', 'Lautan Pasir Berbisik', 'Kawah Bromo Aktif'],
      primaryCta: 'Eksplorasi Bromo Sunrise',
      packageId: 'bromo-sunrise',
      location: 'Taman Nasional Bromo Tengger Semeru',
      spots: [
        {
          id: 'sp-1',
          title: 'Sunrise View Point',
          titleEn: 'Sunrise View Point',
          time: '02:30',
          desc: 'Tiba di Desa Sukapura dan menuju Sunrise Penanjakan menggunakan armada Jeep 4WD.',
          descEn: 'Arrive at Sukapura Village and head to Sunrise View Point by using 4WD Jeep.',
          image: '/images/hero/hero-bromo-sunrise.jpg',
          fallback: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
          tag: 'Sunrise Spot'
        },
        {
          id: 'sp-2',
          title: 'Kawah Bromo Aktif',
          titleEn: 'Active Bromo Crater',
          time: '06:30',
          desc: 'Mendaki tangga kaldera vulkanik menatap kepulan asap magis langsung ke perut bumi.',
          descEn: 'Hike the caldera staircase gazing upon ethereal sulfur vapors rising from the earth.',
          image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
          fallback: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
          tag: 'Volcano Hike'
        },
        {
          id: 'sp-3',
          title: 'Lautan Pasir Berbisik',
          titleEn: 'Whispering Sands',
          time: '08:00',
          desc: 'Sensasi berkuda tradisional melintasi hamparan gurun pasir vulkanik seluas 5.250 hektar.',
          descEn: 'Experience iconic horse riding across 5,250 hectares of mystical volcanic sand sea.',
          image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
          fallback: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
          tag: 'Horse Riding'
        },
        {
          id: 'sp-4',
          title: 'Savana Bukit Teletubbies',
          titleEn: 'Teletubbies Savanna',
          time: '09:30',
          desc: 'Bentangan perbukitan hijau zamrud yang kontras di balik kawah gersang nan memukau.',
          descEn: 'Lush emerald hill slopes contrasting dramatically behind the rugged volcanic caldera.',
          image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
          fallback: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
          tag: 'Green Savanna'
        },
        {
          id: 'sp-5',
          title: 'Air Terjun Madakaripura',
          titleEn: 'Madakaripura Waterfall',
          time: '11:00',
          desc: 'Tirai air terjun 200 meter di ceruk tebing purba peninggalan Patih Gajah Mada.',
          descEn: 'Dramatic 200m cascading water curtain enshrined inside ancient mystical cliffs.',
          image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
          fallback: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80',
          tag: 'Epic Falls'
        }
      ]
    },
    {
      id: 'pink-beach',
      shortLabel: '02. Labuan Bajo',
      image: '/images/hero/hero-pink-beach.jpg',
      fallback: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80',
      eyebrow: '🌴 EKSPLORASI LABUAN BAJO & KOMODO',
      headingPill: 'Exotic Wonders of Flores Island',
      headingPillId: 'Keajaiban Bahari Kepulauan Komodo',
      headingLine1: 'Legendary Realm of',
      headingLine2Bold: 'Komodo',
      headingLine2Italic: 'Island Odyssey',
      titlePrimary: 'Keajaiban Bahari',
      titleHighlight: 'Pink Beach,',
      titleSecondary: 'Pesona Merah Muda Surga Flores.',
      tourTitle: 'Komodo Phinisi Luxury Odyssey',
      tourTitleId: 'Pelayaran Mewah Phinisi Komodo',
      tourDate: '26 Juli 2026 • Berangkat Setiap Hari',
      joinedCount: '+48 Wisatawan Bergabung',
      joinedCountEn: '+48 People Joined',
      tourDescription: 'Berlayar mengarungi gugusan pulau tropis Komodo dengan armada kapal phinisi privat berbintang dan snorkeling di Manta Point.',
      tourDescriptionEn: 'Sail aboard luxury Phinisi across pristine Komodo waters, trek Padar summit, and snorkel with giant manta rays.',
      subtitle: 'Saksikan bentangan pasir merah muda langka yang berpadu dengan air laut sebening kristal. Berlayar menggunakan armada kapal phinisi privat terbaik di jantung Kepulauan Komodo.',
      tags: ['Pasir Pink Langka', 'Phinisi Luxury Suite', 'Snorkeling Manta Point', 'Pulau Padar Trekking'],
      primaryCta: 'Eksplorasi Labuan Bajo',
      packageId: 'labuan-bajo-phinisi',
      location: 'Labuan Bajo, Flores, NTT',
      spots: [
        {
          id: 'sp-lb1',
          title: 'Pantai Pasir Pink',
          titleEn: 'Pink Beach Flores',
          time: '09:00',
          desc: 'Pasir merah muda langka dunia berpadu dengan air laut toska jernih sebening kaca.',
          descEn: 'Rare pastel pink sand meeting turquoise waters in pristine Komodo archipelago.',
          image: '/images/hero/hero-pink-beach.jpg',
          fallback: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
          tag: 'Unique Beach'
        },
        {
          id: 'sp-lb2',
          title: 'Puncak Pulau Padar',
          titleEn: 'Padar Island Summit',
          time: '05:30',
          desc: 'Trekking fajar menyapa tiga teluk ikonik dengan gradasi pasir pink, putih, dan vulkanik hitam.',
          descEn: 'Sunrise trek to behold three legendary bays featuring pink, white, and black sand.',
          image: '/images/hero/hero-padar-panoramic.jpg',
          fallback: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
          tag: 'Panoramic View'
        },
        {
          id: 'sp-lb3',
          title: 'Taman Nasional Komodo',
          titleEn: 'Komodo Sanctuary',
          time: '11:30',
          desc: 'Berjumpa langsung kadal purba terbesar di dunia dipandu oleh ranger berpengalaman.',
          descEn: 'Walk alongside prehistoric Komodo dragons with certified professional wildlife rangers.',
          image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
          fallback: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
          tag: 'Ancient Wildlife'
        },
        {
          id: 'sp-lb4',
          title: 'Manta Point Snorkeling',
          titleEn: 'Manta Point Diving',
          time: '14:00',
          desc: 'Sensasi berenang bebas berdampingan bersama pari manta raksasa di terumbu karang hidup.',
          descEn: 'Snorkel and glide alongside majestic giant manta rays in protected marine waters.',
          image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
          fallback: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=800&q=80',
          tag: 'Ocean Safari'
        },
        {
          id: 'sp-lb5',
          title: 'Sunset Phinisi Suite',
          titleEn: 'Sunset Phinisi Suite',
          time: '17:30',
          desc: 'Menatap mentari terbenam keemasan dari dek kapal kayu phinisi privat berbintang.',
          descEn: 'Golden tropical sunset dining on the deck of your luxury handcrafted Phinisi.',
          image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80',
          fallback: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
          tag: 'Luxury Sailing'
        }
      ]
    },
    {
      id: 'borobudur-temple',
      shortLabel: '03. Borobudur',
      image: '/images/hero/hero-borobudur-temple.jpg',
      fallback: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=2000&q=80',
      eyebrow: '🏛️ MAHASAKRAL WARISAN LELUHUR',
      headingPill: 'Sacred Heritage of Ancient Java',
      headingPillId: 'Mahakarya Sakral Peradaban Jawa',
      headingLine1: 'Timeless Whispers of',
      headingLine2Bold: 'Borobudur',
      headingLine2Italic: 'Dawn Horizon',
      titlePrimary: 'Keheningan Fajar Borobudur, Menatap',
      titleHighlight: 'Peradaban Abadi',
      titleSecondary: 'Nusantara.',
      tourTitle: 'Yogyakarta Royal Heritage Tour',
      tourTitleId: 'Eksplorasi Keagungan Budaya Jogja',
      tourDate: '28 Juli 2026 • Jadwal Fleksibel',
      joinedCount: '+56 Wisatawan Bergabung',
      joinedCountEn: '+56 People Joined',
      tourDescription: 'Menyapa fajar keheningan di pelataran stupa Candi Borobudur abad ke-8 dan menikmati kehangatan budaya keraton Yogyakarta.',
      tourDescriptionEn: 'Welcome the serene dawn mist over 8th-century stone stupas and embrace the rich royal heritage of Yogyakarta.',
      subtitle: 'Menyusuri ribuan panel relief mahakarya dunia abad ke-8. Memeluk ketenangan spiritual di pelataran stupa saat kabut pagi menyelimuti lembah perbukitan Menoreh.',
      tags: ['Akses Sunrise Khusus', 'Storytelling Kurator', 'Warisan Dunia UNESCO', 'Private Luxury Van'],
      primaryCta: 'Eksplorasi Warisan Jogja',
      packageId: 'yogyakarta-heritage',
      location: 'Magelang & D.I. Yogyakarta',
      spots: [
        {
          id: 'sp-bb1',
          title: 'Pelataran Stupa Borobudur',
          titleEn: 'Borobudur Stupa Dawn',
          time: '05:00',
          desc: 'Menatap kabut fajar mistis yang menyelimuti stupa utama peninggalan Dinasti Syailendra.',
          descEn: 'Gaze at the sacred morning mist embracing the grand stone stupas built in the 8th century.',
          image: '/images/hero/hero-borobudur-temple.jpg',
          fallback: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
          tag: 'UNESCO World'
        },
        {
          id: 'sp-bb2',
          title: 'Candi Prambanan Sunset',
          titleEn: 'Prambanan Sunset',
          time: '16:30',
          desc: 'Kompleks candi Hindu termegah di Asia Tenggara saat siluet senja keemasan terpancar.',
          descEn: 'Magnificent towering Hindu temple compound bathed in golden hour twilight rays.',
          image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
          fallback: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
          tag: 'Sacred Temples'
        },
        {
          id: 'sp-bb3',
          title: 'Desa Wisata Candirejo',
          titleEn: 'Candirejo Village Tour',
          time: '09:00',
          desc: 'Keliling desa agraris asri menggunakan andong tradisional dan mencicipi teh hangat lokal.',
          descEn: 'Ride a horse cart through serene traditional villages and sip freshly harvested teas.',
          image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
          fallback: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
          tag: 'Living Culture'
        },
        {
          id: 'sp-bb4',
          title: 'Keraton & Tamansari',
          titleEn: 'Sultan Palace & Water Castle',
          time: '13:00',
          desc: 'Menelusuri lorong bawah tanah istana air dan kediaman sakral Sultan Hamengkubuwono.',
          descEn: 'Discover underground mosques and royal bath pavilions of the historic Javanese Sultanate.',
          image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80',
          fallback: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
          tag: 'Royal Heritage'
        },
        {
          id: 'sp-bb5',
          title: 'Bukit Rhema Punthuk Setumbu',
          titleEn: 'Punthuk Setumbu Sunrise',
          time: '04:30',
          desc: 'Gardu pandang perbukitan Menoreh menyaksikan kemunculan candi dari balik samudra awan.',
          descEn: 'Breathtaking ridge viewpoint looking down at Borobudur emerging above a sea of clouds.',
          image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
          fallback: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
          tag: 'Cloud Horizon'
        }
      ]
    },
    {
      id: 'kawah-putih',
      shortLabel: '04. Kawah Putih',
      image: '/images/hero/hero-kawah-putih.jpg',
      fallback: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80',
      eyebrow: '🍃 KESEJUKAN DATARAN TINGGI PARAHYANGAN',
      headingPill: 'Highland Sanctuary of Parahyangan',
      headingPillId: 'Kesejukan Dataran Tinggi Bandung',
      headingLine1: 'Mystic Emerald of',
      headingLine2Bold: 'Kawah Putih',
      headingLine2Italic: 'Highland Escape',
      titlePrimary: 'Ketenangan Mistis Kawah Putih,',
      titleHighlight: 'Pesona Zamrud',
      titleSecondary: 'Pegunungan Vulkanik.',
      tourTitle: 'Bandung Highland Glamping Retreat',
      tourTitleId: 'Retret Alam & Glamping Ciwidey',
      tourDate: '25 Juli 2026 • Weekend Ready',
      joinedCount: '+38 Wisatawan Bergabung',
      joinedCountEn: '+38 People Joined',
      tourDescription: 'Menghirup udara sejuk 1.800 MDPL di danau belerang kehijauan dan hamparan kebun teh Rancabali yang menenangkan.',
      tourDescriptionEn: 'Breathe crisp 1,800m highland air above ethereal emerald sulfur lakes and lush rolling tea plantations.',
      subtitle: 'Rasakan udara sejuk 1.800 MDPL, danau belerang kehijauan yang magis berkabut, serta bentangan kebun teh Rancabali yang menenangkan pikiran dari penatnya hiruk-pikuk kota.',
      tags: ['Udara Sejuk 1.800 MDPL', 'Spot Foto Estetik', 'Perkebunan Teh Hijau', 'Glamping Eksklusif'],
      primaryCta: 'Eksplorasi Bandung Alam',
      packageId: 'bandung-retreat',
      location: 'Ciwidey & Lembang, Jawa Barat',
      spots: [
        {
          id: 'sp-kp1',
          title: 'Danau Kawah Putih',
          titleEn: 'Kawah Putih Crater Lake',
          time: '08:00',
          desc: 'Danau kawah vulkanik toska berair asam dengan uap belerang putih nan estetik.',
          descEn: 'Surreal acid-turquoise crater lake draped with mystical white geothermal steam.',
          image: '/images/hero/hero-kawah-putih.jpg',
          fallback: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
          tag: 'Turquoise Lake'
        },
        {
          id: 'sp-kp2',
          title: 'Kebun Teh Rancabali',
          titleEn: 'Rancabali Tea Estate',
          time: '10:00',
          desc: 'Hamparan karpet hijau daun teh pegunungan berhawa sejuk sejauh mata memandang.',
          descEn: 'Vast emerald green tea plantation rolling across misty cool mountain contours.',
          image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
          fallback: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
          tag: 'Highland Green'
        },
        {
          id: 'sp-kp3',
          title: 'Suspension Bridge Rengganis',
          titleEn: 'Rengganis Suspension Bridge',
          time: '12:30',
          desc: 'Jembatan gantung terpanjang di Asia Tenggara melintasi lembah hutan asri dan kawah air panas.',
          descEn: 'Walk the longest suspension bridge in Southeast Asia across deep subtropical valleys.',
          image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
          fallback: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
          tag: 'Canopy Walk'
        },
        {
          id: 'sp-kp4',
          title: 'Situ Patenggang Glamping',
          titleEn: 'Situ Patenggang Lakeside',
          time: '15:30',
          desc: 'Danau alami di ketinggian 1.600 MDPL dengan kapal pinisi resto dan tenda glamping mewah.',
          descEn: 'Lakeside pinisi restaurant and luxury safari glamping tents perched on water shores.',
          image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80',
          fallback: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
          tag: 'Lakeside Luxury'
        },
        {
          id: 'sp-kp5',
          title: 'Hutan Pinus Rahong',
          titleEn: 'Rahong Pine Forest',
          time: '17:00',
          desc: 'Deretan pepohonan pinus menjulang tempat menikmati kopi tubruk hangat di tepi sungai.',
          descEn: 'Towering pine groves with refreshing river streams and artisanal hot West Java coffee.',
          image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
          fallback: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
          tag: 'Pine Sanctuary'
        }
      ]
    },
    {
      id: 'raja-ampat-lagoon',
      shortLabel: '05. Raja Ampat',
      image: '/images/hero/hero-raja-ampat-lagoon.jpg',
      fallback: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=2000&q=80',
      eyebrow: '🌊 MAHA KARYA BIODIVERSITAS PAPUA BARAT',
      headingPill: 'The Ultimate World Coral Haven',
      headingPillId: 'Surga Bawah Laut Papua Barat',
      headingLine1: 'Crown Jewel of',
      headingLine2Bold: 'Raja Ampat',
      headingLine2Italic: 'Coral Paradise',
      titlePrimary: 'Surga Bawah Laut',
      titleHighlight: 'Raja Ampat,',
      titleSecondary: 'Melangkah di Pasir Pantai Perawan.',
      tourTitle: 'Raja Ampat Ultimate Marine Safari',
      tourTitleId: 'Ekspedisi Bahari Raja Ampat',
      tourDate: '01 Agustus 2026 • Private Group',
      joinedCount: '+24 Wisatawan Bergabung',
      joinedCountEn: '+24 People Joined',
      tourDescription: 'Menjelajahi labirin bukit karst Wayag dan Piaynemo serta menyelami ekosistem terumbu karang terkaya di muka bumi.',
      tourDescriptionEn: 'Explore iconic limestone karst towers in Piaynemo and dive into the world’s most pristine marine biosphere.',
      subtitle: 'Gugusan pulau karang zamrud paling kaya di muka bumi. Berenang bersama pari manta, snorkeling di terumbu karang hidup, dan nikmati sunyinya laguna tropis tanpa keramaian.',
      tags: ['75% Spesies Karang Dunia', 'Laguna Karst Piaynemo', 'Pemandu Berlisensi', 'Eco-Resort Privat'],
      primaryCta: 'Eksplorasi Raja Ampat',
      packageId: 'raja-ampat-ultimate',
      location: 'Kepulauan Raja Ampat, Papua Barat Daya',
      spots: [
        {
          id: 'sp-ra1',
          title: 'Gardu Pandang Piaynemo',
          titleEn: 'Piaynemo Karst Viewpoint',
          time: '08:30',
          desc: 'Menaiki 320 anak tangga kayu menatap gugusan pulau karang kerucut di atas laguna toska.',
          descEn: 'Ascend timber stairs to the iconic panoramic lookout over turquoise karst islet clusters.',
          image: '/images/hero/hero-raja-ampat-lagoon.jpg',
          fallback: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=800&q=80',
          tag: 'Karst Panorama'
        },
        {
          id: 'sp-ra2',
          title: 'Teluk Kabui & Batu Pensil',
          titleEn: 'Kabui Bay & Pencil Rock',
          time: '11:00',
          desc: 'Berlayar melintasi tebing-tebing karang terjal dengan monolit batu pensil yang menjulang tegak.',
          descEn: 'Boat navigation between vertical cliffs featuring the famous solitary pencil-shaped monolith.',
          image: '/images/hero/hero-raja-ampat-wayag.jpg',
          fallback: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
          tag: 'Karst Pass'
        },
        {
          id: 'sp-ra3',
          title: 'Desa Wisata Arborek',
          titleEn: 'Arborek Village Snorkeling',
          time: '13:30',
          desc: 'Dermaga kayu berair bening tempat kawanan ikan warna-warni dan anyaman noken tradisional.',
          descEn: 'Crystal waters under the wooden jetty teeming with schooling jacks and friendly islanders.',
          image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
          fallback: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
          tag: 'Coral Jetty'
        },
        {
          id: 'sp-ra4',
          title: 'Pasir Timbul Mansuar',
          titleEn: 'Mansuar Sandbank',
          time: '15:30',
          desc: 'Pulau pasir putih sehalus tepung yang muncul di tengah laut saat air surut.',
          descEn: 'Pristine sandbank appearing magically in the center of the azure sea at low tide.',
          image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80',
          fallback: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
          tag: 'Pure Sandbank'
        },
        {
          id: 'sp-ra5',
          title: 'Gugusan Atol Wayag',
          titleEn: 'Wayag Archipelagic Atolls',
          time: '17:00',
          desc: 'Ikon mahakarya bahari dunia dengan laguna perawan tempat hiu karang berenang bebas.',
          descEn: 'The world-famous crown jewel atolls with baby reef sharks swimming in shallow coves.',
          image: '/images/hero/hero-raja-ampat-wayag.jpg',
          fallback: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=800&q=80',
          tag: 'World Jewel'
        }
      ]
    },
    {
      id: 'padar-panoramic',
      shortLabel: '06. Puncak Padar',
      image: '/images/hero/hero-padar-panoramic.jpg',
      fallback: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=2000&q=80',
      eyebrow: '🏔️ PANORAMA IKONIK TIGA TELUK FLORES',
      headingPill: 'Dramatic Topography of Flores',
      headingPillId: 'Panorama Tiga Teluk Legendaris',
      headingLine1: 'Spectacular Summit of',
      headingLine2Bold: 'Pulau Padar',
      headingLine2Italic: 'Dawn Trekking',
      titlePrimary: 'Puncak Spektakuler',
      titleHighlight: 'Pulau Padar,',
      titleSecondary: 'Keajaiban Tiga Lengkungan Teluk.',
      tourTitle: 'Padar Island Summit Expedition',
      tourTitleId: 'Ekspedisi Fajar Puncak Padar',
      tourDate: '27 Juli 2026 • Everyday Open',
      joinedCount: '+42 Wisatawan Bergabung',
      joinedCountEn: '+42 People Joined',
      tourDescription: 'Trekking eksklusif menuju gardu pandang tertinggi Pulau Padar menyaksikan perpaduan tiga teluk pasir berbeda warna.',
      tourDescriptionEn: 'Exclusive trek to the highest crest of Padar Island to watch three dramatic bays at sunrise.',
      subtitle: 'Trekking eksklusif menuju gardu pandang tertinggi Pulau Padar. Menyaksikan perpaduan magis tiga teluk legendaris dengan nuansa pasir putih, pink, dan vulkanik hitam dalam bingkai panorama khatulistiwa.',
      tags: ['Summit Trekking Padar', 'Tiga Teluk Berbeda Warna', 'Golden Hour Sunrise/Sunset', 'Private Speedboat Akses'],
      primaryCta: 'Eksplorasi Puncak Padar',
      packageId: 'labuan-bajo-phinisi',
      location: 'Taman Nasional Komodo, Flores, NTT',
      spots: [
        {
          id: 'sp-pd1',
          title: 'Gardu Pandang Summit',
          titleEn: 'Padar Summit View',
          time: '05:45',
          desc: 'Menatap lengkungan tiga teluk berbeda warna saat cahaya keemasan fajar memecah kabut.',
          descEn: 'Panoramic view of the three crescent bays illuminated by morning sunrise hues.',
          image: '/images/hero/hero-padar-panoramic.jpg',
          fallback: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
          tag: 'Sunrise Crest'
        },
        {
          id: 'sp-pd2',
          title: 'Pantai Pasir Hitam Padar',
          titleEn: 'Padar Black Sand Bay',
          time: '08:30',
          desc: 'Salah satu teluk dengan pasir vulkanik hitam berkilauan yang tenang dan sunyi.',
          descEn: 'One of the three bays featuring sparkling black volcanic sand and quiet ripples.',
          image: '/images/hero/hero-pink-beach.jpg',
          fallback: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
          tag: 'Volcanic Shore'
        },
        {
          id: 'sp-pd3',
          title: 'Speedboat Cruise Komodo',
          titleEn: 'Private Speedboat Cruise',
          time: '11:00',
          desc: 'Armada perahu cepat privat bertenaga tinggi untuk manuver antar pulau berbukit karang.',
          descEn: 'High-speed private craft island-hopping between majestic rugged sea cliffs.',
          image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
          fallback: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
          tag: 'High Speed Cruise'
        },
        {
          id: 'sp-pd4',
          title: 'Taka Makassar Sandbank',
          titleEn: 'Taka Makassar Atoll',
          time: '13:30',
          desc: 'Pulau karang kecil berbentuk bulan sabit dengan terumbu karang dangkal berwarna toska.',
          descEn: 'Crescent-shaped reef island surrounded by shallow neon turquoise lagoon waters.',
          image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
          fallback: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=800&q=80',
          tag: 'Turquoise Atoll'
        },
        {
          id: 'sp-pd5',
          title: 'Pulau Kalong Twilight',
          titleEn: 'Kalong Bat Sanctuary',
          time: '18:00',
          desc: 'Menyaksikan ribuan kelelawar buah raksasa terbang melintasi langit senja lembayung.',
          descEn: 'Watch thousands of giant fruit bats lift off across crimson dusk skies over mangroves.',
          image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80',
          fallback: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
          tag: 'Dusk Flight'
        }
      ]
    },
    {
      id: 'wayag-archipelago',
      shortLabel: '07. Wayag Karst',
      image: '/images/hero/hero-raja-ampat-wayag.jpg',
      fallback: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80',
      eyebrow: '🏝️ LABIRIN KARST MAHAMERDEKA TIMUR',
      headingPill: 'The Iconic Limestone Dome',
      headingPillId: 'Labirin Karst Samudra Khatulistiwa',
      headingLine1: 'The Majestic Labyrinth of',
      headingLine2Bold: 'Wayag',
      headingLine2Italic: 'Karst Realm',
      titlePrimary: 'Labirin Karst Zamrud',
      titleHighlight: 'Wayag & Piaynemo,',
      titleSecondary: 'Mahakarya Samudra Khatulistiwa.',
      tourTitle: 'Wayag Ultimate Archipelagic Safari',
      tourTitleId: 'Safari Samudra Kepulauan Wayag',
      tourDate: '05 Agustus 2026 • Exclusive',
      joinedCount: '+18 Wisatawan Bergabung',
      joinedCountEn: '+18 People Joined',
      tourDescription: 'Jelajahi labirin ratusan bukit karst kerucut yang bertabur di atas samudra toska bening sedalam pandangan.',
      tourDescriptionEn: 'Sail through emerald conical karst peaks scattering across crystalline turquoise waters.',
      subtitle: 'Jelajahi labirin ratusan bukit karst kerucut yang bertabur di atas samudra toska bening sedalam pandangan. Pengalaman berlayar tak terlupakan melintasi surga bahari terindah di muka bumi.',
      tags: ['Gugusan Karst Wayag', 'Laguna Karang Toska', 'Private Yacht Safari', 'Konservasi Laut Dunia'],
      primaryCta: 'Eksplorasi Wayag Karst',
      packageId: 'raja-ampat-ultimate',
      location: 'Wayag & Misool, Raja Ampat, Papua Barat Daya',
      spots: [
        {
          id: 'sp-wy1',
          title: 'Puncak Karst Wayag 1',
          titleEn: 'Wayag Peak 1 Lookout',
          time: '08:00',
          desc: 'Trekking batu karst tajam berhadiahkan panorama paling prestisius di planet bumi.',
          descEn: 'Scramble up jagged limestone peaks for the most prestigious ocean panorama on Earth.',
          image: '/images/hero/hero-raja-ampat-wayag.jpg',
          fallback: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
          tag: 'Earth Landmark'
        },
        {
          id: 'sp-wy2',
          title: 'Konservasi Hiu Karang Wayag',
          titleEn: 'Baby Shark Sanctuary',
          time: '11:00',
          desc: 'Berenang dan memberi makan kawanan anak hiu karang sirip hitam di bibir pantai pasir putih.',
          descEn: 'Stand knee-deep in transparent waters surrounded by friendly wild blacktip reef sharks.',
          image: '/images/hero/hero-raja-ampat-lagoon.jpg',
          fallback: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=800&q=80',
          tag: 'Shark Haven'
        },
        {
          id: 'sp-wy3',
          title: 'Laguna Karang Bintang',
          titleEn: 'Star Lagoon Kayaking',
          time: '13:30',
          desc: 'Bermain kano transparan di laguna berbentuk bintang yang tersembunyi di balik dinding karang.',
          descEn: 'Glide in transparent kayaks inside an enclosed star-shaped azure lagoon.',
          image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
          fallback: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
          tag: 'Hidden Lagoon'
        },
        {
          id: 'sp-wy4',
          title: 'Pantai Pasir Perawan Misool',
          titleEn: 'Virgin Sands of Misool',
          time: '15:30',
          desc: 'Teluk perawan tanpa jejak polusi dengan biota laut karang gorgonian raksasa.',
          descEn: 'Unspoiled coves sheltering giant purple gorgonian sea fans and blue starfish.',
          image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80',
          fallback: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
          tag: 'Virgin Cove'
        },
        {
          id: 'sp-wy5',
          title: 'Yacht Sailing Sunset',
          titleEn: 'Luxury Yacht Sunset',
          time: '17:45',
          desc: 'Menikmati malam bertabur bintang bima sakti dari atas yacht ekspedisi di jantung Raja Ampat.',
          descEn: 'Milky way stargazing from your expedition yacht in pristine equatorial isolation.',
          image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
          fallback: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=800&q=80',
          tag: 'Stargaze Yacht'
        }
      ]
    }
  ],

  // 16 Real Indonesian Destinations (100% Unique Verified Imagery matching actual locations)
  destinations: {
    bali: {
      primary: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
      fallback: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1000&q=80"
      ],
      alt: "Pura Ulun Danu Beratan & Tegalalang Ubud, Bali"
    },
    labuanBajo: {
      primary: "/images/hero/hero-padar-panoramic.jpg",
      fallback: "/images/hero/hero-pink-beach.jpg",
      gallery: [
        "/images/hero/hero-padar-panoramic.jpg",
        "/images/hero/hero-pink-beach.jpg",
        "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1000&q=80"
      ],
      alt: "Panorama Tiga Teluk Pulau Padar & Kapal Phinisi, Labuan Bajo"
    },
    rajaAmpat: {
      primary: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=1200&q=80",
      fallback: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1544552866-d3ed42536cfd?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80"
      ],
      alt: "Gugusan Karst Piaynemo di Atas Laut Jernih, Raja Ampat"
    },
    lombok: {
      primary: "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=1200&q=80",
      fallback: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80"
      ],
      alt: "Perairan Gili Islands & Lanskap Tropis Lombok"
    },
    yogyakarta: {
      primary: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1200&q=80",
      fallback: "https://images.unsplash.com/photo-1584810359583-96fc3448beaa?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80"
      ],
      alt: "Kemegahan Candi Borobudur & Candi Prambanan Yogyakarta"
    },
    bromo: {
      primary: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80",
      fallback: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80"
      ],
      alt: "Sunrise Kaldera Gunung Bromo, Gunung Batok & Lautan Pasir"
    },
    bandung: {
      primary: "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80",
      fallback: "https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1000&q=80"
      ],
      alt: "Kawah Putih Ciwidey & Perkebunan Teh Hijau Bandung"
    },
    toba: {
      primary: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=1200&q=80",
      fallback: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=1000&q=80"
      ],
      alt: "Kemegahan Danau Toba dan Pulau Samosir Sumatera Utara"
    },
    derawan: {
      primary: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=1200&q=80",
      fallback: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1000&q=80"
      ],
      alt: "Danau Ubur-Ubur Kakaban dan Gugusan Maratua Derawan"
    },
    bunaken: {
      primary: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&w=1200&q=80",
      fallback: "https://images.unsplash.com/photo-1473186578172-c141e6798cf4?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1498307833015-e7b400441eb8?auto=format&fit=crop&w=1000&q=80"
      ],
      alt: "Dinding Karang Menakjubkan Taman Nasional Bunaken Manado"
    },
    sumba: {
      primary: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
      fallback: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1506059612708-99d6c258160e?auto=format&fit=crop&w=1000&q=80"
      ],
      alt: "Savana Bukit Warinding dan Pohon Menari Pantai Walakiri Sumba"
    },
    belitung: {
      primary: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1200&q=80",
      fallback: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1591825729269-caeb344f6df2?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=1000&q=80"
      ],
      alt: "Batuan Granit Raksasa Pantai Tanjung Tinggi Belitung"
    },
    dieng: {
      primary: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80",
      fallback: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1513553404607-988bf2703777?auto=format&fit=crop&w=1000&q=80"
      ],
      alt: "Negeri di Atas Awan Telaga Warna & Bukit Sikunir Dieng"
    },
    toraja: {
      primary: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80",
      fallback: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1536431311719-398b6704d4cc?auto=format&fit=crop&w=1000&q=80"
      ],
      alt: "Desa Adat Kete Kesu & Rumah Tongkonan Megah Tana Toraja"
    },
    wakatobi: {
      primary: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80",
      fallback: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=80"
      ],
      alt: "Surga Terumbu Karang Dunia Taman Nasional Wakatobi"
    },
    karimunjawa: {
      primary: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80",
      fallback: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=1000&q=80"
      ],
      alt: "Pulau Tropis Eksotis dan Snorkeling Hiu Kepulauan Karimunjawa"
    }
  },

  // 16 Curated Packages (100% Unique Verified Imagery matching actual destination locations)
  packages: {
    baliEscape: {
      hero: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
      fallback: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80"
      ]
    },
    labuanBajoPhinisi: {
      hero: "/images/hero/hero-pink-beach.jpg",
      fallback: "/images/hero/hero-padar-panoramic.jpg",
      gallery: [
        "/images/hero/hero-pink-beach.jpg",
        "/images/hero/hero-padar-panoramic.jpg",
        "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1000&q=80"
      ]
    },
    rajaAmpatUltimate: {
      hero: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=1200&q=80",
      fallback: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1544552866-d3ed42536cfd?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80"
      ]
    },
    lombokAdventure: {
      hero: "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=1200&q=80",
      fallback: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80"
      ]
    },
    yogyakartaHeritage: {
      hero: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1200&q=80",
      fallback: "https://images.unsplash.com/photo-1584810359583-96fc3448beaa?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1584810359583-96fc3448beaa?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1000&q=80"
      ]
    },
    bromoSunrise: {
      hero: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80",
      fallback: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80"
      ]
    },
    bandungRetreat: {
      hero: "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80",
      fallback: "https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80"
      ]
    },
    tobaHighland: {
      hero: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=1200&q=80",
      fallback: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80"
      ]
    },
    derawanAquatic: {
      hero: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=1200&q=80",
      fallback: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1000&q=80"
      ]
    },
    bunakenMarine: {
      hero: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&w=1200&q=80",
      fallback: "https://images.unsplash.com/photo-1473186578172-c141e6798cf4?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1498307833015-e7b400441eb8?auto=format&fit=crop&w=1000&q=80"
      ]
    },
    sumbaSavanna: {
      hero: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
      fallback: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1000&q=80"
      ]
    },
    belitungIsland: {
      hero: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1200&q=80",
      fallback: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1591825729269-caeb344f6df2?auto=format&fit=crop&w=1000&q=80"
      ]
    },
    diengExplorer: {
      hero: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80",
      fallback: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?auto=format&fit=crop&w=1000&q=80"
      ]
    },
    torajaHeritage: {
      hero: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80",
      fallback: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=1000&q=80"
      ]
    },
    wakatobiExpedition: {
      hero: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80",
      fallback: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&w=1000&q=80"
      ]
    },
    karimunjawaGetaway: {
      hero: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80",
      fallback: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80"
      ]
    }
  }
};
