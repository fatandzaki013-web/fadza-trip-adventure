// FADZA TRIP ADVENTURE Data Architecture
// Centralized, verified destination data & packages with editable demo content
// Differentiates DESTINATIONS (places to explore) and PACKAGES (bookable products)

import { ASSET_IMAGES } from './images.js';

export const BRAND_INFO = {
  name: "FADZA TRIP ADVENTURE",
  tagline: "TEMUKAN PERJALANAN. CIPTAKAN CERITA.",
  // Internal WhatsApp number used only for link generation (NEVER rendered directly as text in UI)
  whatsappNumber: "6285888159765",
  email: "halo@fadzapadventure.com",
  instagram: "@fadzapadventure",
  address: "Seminyak, Bali & Jakarta Selatan (Demo Office)",
  hours: "Setiap Hari: 08.00 - 22.00 WIB",
  currency: "IDR"
};

export const DESTINATIONS = [
  {
    id: "bali",
    name: "Bali",
    region: "Bali",
    province: "Bali",
    subtitle: "Pulau Dewata & Tebing Nusa Penida",
    shortDescription: "Pantai berpasir putih, sawah terasering Ubud, tebing Nusa Penida, dan kearifan budaya spiritual.",
    description: "Kombinasi magis pantai berpasir putih, sawah berundak terasering Ubud, tebing Nusa Penida yang dramatis, serta kearifan tradisi budaya spiritual yang mendalam di setiap sudut pura.",
    fullDescription: "Bali adalah episentrum keindahan pariwisata nusantara yang memadukan pesona alam tropis kelas dunia dengan kekayaan budaya luhur. Dari ketenangan pedesaan seniman Ubud, kemegahan ombak tebing karang Uluwatu, pesona bawah air Nusa Penida, hingga gemerlap kuliner pantai Seminyak dan Canggu.",
    image: ASSET_IMAGES.destinations.bali.primary,
    fallbackImage: ASSET_IMAGES.destinations.bali.fallback,
    packageCount: 1,
    startingPrice: 3450000,
    tags: ["Pantai", "Budaya", "Romantic", "Healing"],
    travelStyles: ["Pantai", "Healing", "Romantic", "Culture"],
    travelStyle: ["Pantai", "Healing", "Romantic", "Culture"],
    bestTime: "April - Oktober (Musim Kemarau Cerah)",
    durationRecommendation: "4 - 5 Hari",
    recommendedDuration: "4 - 5 Hari",
    estimatedBudget: "Rp 3.000.000 - Rp 6.000.000 / orang",
    comfortLevel: "Sangat Nyaman (Semua Usia)",
    highlights: [
      "Pemandangan spektakuler tebing samudra Kelingking Beach Nusa Penida",
      "Ketenangan sawah terasering Tegalalang dan atmosfer seni Ubud",
      "Sunset legendaris Pura Uluwatu diiringi pementasan Tari Kecak",
      "Makan malam romantis Jimbaran Seafood di bibir pantai berpasir putih",
      "Koleksi beach club premium di Canggu dan Seminyak"
    ],
    attractions: [
      "Kelingking Beach & Broken Beach Nusa Penida",
      "Tegalalang Rice Terrace & Monkey Forest Ubud",
      "Pura Luhur Uluwatu & Tari Kecak",
      "Pantai Melasti & Pantai Jimbaran"
    ],
    recommendedPlaces: [
      "Nusa Penida (Kelingking, Broken Beach, Angel's Billabong)",
      "Ubud (Tegalalang Rice Terrace, Monkey Forest, Campuhan Ridge)",
      "Uluwatu (Pura Luhur, Pantai Suluban, Pantai Melasti)",
      "Kintamani (Gunung Batur & Danau Batur sunrise view)",
      "Tanah Lot Temple"
    ],
    thingsToDo: [
      "Menyaksikan Tari Kecak Fire Dance saat matahari terbenam di tebing Uluwatu",
      "Eksplorasi speedboat ke teluk-teluk eksotis Nusa Penida",
      "Spa relaksasi tradisional Bali di tengah lembah hijau Ubud",
      "Kuliner autentik Bebek Bengil dan seafood bakar bumbu khas Jimbaran",
      "Floating breakfast di private pool villa bernuansa tropis"
    ],
    activities: [
      "Island hopping fast boat Nusa Penida",
      "Tari Kecak Fire Dance sunset Uluwatu",
      "Spa herbal tradisional Bali di Ubud",
      "Candlelight seafood dinner di Pantai Jimbaran"
    ],
    importantInfo: [
      "Bawalah pakaian santai berbahan katun tipis dan pakaian renang.",
      "Gunakan sandal gunung atau sepatu sneakers yang tidak licin saat trekking di Nusa Penida.",
      "Selalu kenakan sarung dan selendang saat memasuki pura peribadatan suci."
    ],
    gallery: ASSET_IMAGES.destinations.bali.gallery,
    weatherDetails: "Suhu tropis rata-rata 26°C–31°C sepanjang tahun. Musim terbaik adalah Mei hingga September dengan langit cerah, kelembapan sejuk, dan sunset terindah.",
    localCuisine: [{"name":"Ayam Betutu Gilimanuk","desc":"Ayam kampung berbumbu base genep rempah lengkap yang dimasak lambat hingga empuk meresap."},{"name":"Sate Lilit Ikan Laut","desc":"Daging ikan segar cincang berpadu kelapa parut dan serai wangi, dibakar arang kelapa."},{"name":"Nasi Campur Bali & Lawar","desc":"Kombinasi nasi hangat dengan aneka sayur lawar kelapa, kacang panjang, sambal matah, dan sate."}],
    culturalEtiquette: ["Selalu kenakan sarung dan selendang saat memasuki area pura peribadatan suci.","Jangan melangkahi atau menginjak sesajen canang sari yang diletakkan di tanah/trotoar.","Gunakan tangan kanan saat memberi atau menerima sesuatu dari warga lokal."],
    transportationGuide: "Penerbangan langsung ke Bandara Internasional I Gusti Ngurah Rai (DPS). Tersedia penjemputan privat FADZA TRIP ADVENTURE dan fast boat resmi menuju Nusa Penida.",
    relatedPackages: ["bali-escape"],
    faq: [
      {
        question: "Kapan waktu paling ideal liburan ke Bali?",
        answer: "Bulan Mei hingga September merupakan periode terbaik dengan cuaca cerah, ombak ramah untuk wisata laut, dan langit sore yang sangat bersih untuk menikmati sunset."
      },
      {
        question: "Apakah perjalanan menyeberang ke Nusa Penida aman?",
        answer: "Ya, kami selalu menggunakan fast boat modern berlisensi resmi lengkap dengan jaket pelampung dan asuransi pelayaran terpercaya."
      }
    ]
  },
  {
    id: "labuan-bajo",
    name: "Labuan Bajo",
    region: "Nusa Tenggara",
    province: "Nusa Tenggara Timur",
    subtitle: "Gerbang Komodo & Phinisi Mewah",
    shortDescription: "Petualangan liveaboard phinisi, perjumpaan Komodo Dragon, dan trekking Bukit Padar.",
    description: "Petualangan bahari kelas dunia melintasi gugusan pulau purba, perjumpaan langsung dengan satwa langka Komodo Dragon, dan sensasi liveaboard di atas kapal phinisi mewah.",
    fullDescription: "Labuan Bajo di ujung barat Pulau Flores adalah gerbang utama menuju Taman Nasional Komodo. Di sini Anda akan merasakan sensasi berlayar di atas kapal kayu phinisi tradisional berfasilitas hotel bintang lima, mendaki puncak bukit tiga teluk di Pulau Padar, serta berenang di laut merah muda Pink Beach.",
    image: ASSET_IMAGES.destinations.labuanBajo.primary,
    fallbackImage: ASSET_IMAGES.destinations.labuanBajo.fallback,
    packageCount: 1,
    startingPrice: 4950000,
    tags: ["Phinisi", "Adventure", "Snorkeling", "Luxury"],
    travelStyles: ["Adventure", "Pantai", "Romantic"],
    travelStyle: ["Adventure", "Pantai", "Romantic"],
    bestTime: "Mei - Oktober (Laut Tenang & Cerah)",
    durationRecommendation: "3 - 4 Hari",
    recommendedDuration: "3 - 4 Hari",
    estimatedBudget: "Rp 4.500.000 - Rp 9.500.000 / orang",
    comfortLevel: "Petualangan Santai & Mewah",
    highlights: [
      "Pendakian bukit ikonik Pulau Padar dengan pemandangan 3 teluk warna-warni",
      "Melihat satwa purba Komodo Dragon bersama ranger profesional di Pulau Komodo",
      "Berenang bersama pari manta raksasa di Manta Point perairan jernih",
      "Hamparan pasir merah muda alami di Pink Beach Flores",
      "Tidur di kabin phinisi ber-AC di bawah taburan jutaan bintang malam"
    ],
    attractions: [
      "Pulau Padar (Puncak trekking sunrise)",
      "Pink Beach (Pantai berpasir merah muda)",
      "Pulau Komodo & Pulau Rinca",
      "Manta Point & Taka Makassar"
    ],
    recommendedPlaces: [
      "Pulau Padar (Puncak trekking sunrise spektakuler)",
      "Pink Beach (Pantai berpasir merah muda langka)",
      "Pulau Komodo & Pulau Rinca (Habitat asli naga komodo)",
      "Taka Makassar (Gundukan pasir putih timbul di tengah samudra)",
      "Manta Point & Turtle Point"
    ],
    thingsToDo: [
      "Liveaboard menginap di kapal Phinisi berlayar di Taman Nasional Komodo",
      "Snorkeling bersama pari manta di perairan jernih biru toska",
      "Trekking bukit Padar untuk foto panorama landscape legendaris",
      "Melihat ribuan kelelawar terbang saat sunset di Pulau Kalong",
      "Menikmati santap malam seafood segar di dek atas kapal phinisi"
    ],
    activities: [
      "Liveaboard phinisi sailing 3 hari 2 malam",
      "Trekking Bukit Padar sunrise",
      "Snorkeling bersama pari manta di Manta Point",
      "Sunset di Pulau Kalong"
    ],
    importantInfo: [
      "Membawa obat anti mabuk perjalanan laut bagi yang sensitif gelombang ombak.",
      "Siapkan uang tunai secukupnya untuk tiket retribusi konservasi Taman Nasional Komodo.",
      "Gunakan tabir surya ramah terumbu karang (reef-safe sunscreen)."
    ],
    gallery: ASSET_IMAGES.destinations.labuanBajo.gallery,
    weatherDetails: "Suhu tropis kering berkisar 26°C–32°C. Periode terbaik Mei hingga Oktober saat perairan tenang untuk sailing dan langit biru cerah.",
    localCuisine: [{"name":"Seafood Bakar Ikan Kuah Asam","desc":"Ikan kakap karang segar kuah asam kunyit pedas khas pesisir Flores."},{"name":"Kolo (Nasi Bambu)","desc":"Beras berpadu santan dan rempah yang dibakar perlahan dalam bilah bambu."},{"name":"Jagung Bose","desc":"Bubur jagung manis khas NTT dengan kacang merah dan santan lembut gurih."}],
    culturalEtiquette: ["Selalu ikuti instruksi ranger saat berada di area habitat Komodo.","Gunakan tabir surya ramah terumbu karang (reef-safe).","Jangan membuang sampah apa pun ke perairan Taman Nasional Komodo."],
    transportationGuide: "Penerbangan langsung ke Bandara Komodo Labuan Bajo (LBJ). Dilanjutkan antar-jemput privat menuju dermaga Marina Labuan Bajo untuk naik kapal Phinisi.",
    relatedPackages: ["labuan-bajo-phinisi"],
    faq: [
      {
        question: "Apakah orang yang tidak bisa berenang bisa ikut sailing Labuan Bajo?",
        answer: "Sangat bisa! Tersedia pelampung keselamatan standar internasional dan tim pemandu lokal kami selalu mendampingi di dalam air selama sesi snorkeling."
      }
    ]
  },
  {
    id: "raja-ampat",
    name: "Raja Ampat",
    region: "Maluku & Papua",
    province: "Papua Barat Daya",
    subtitle: "Mahakarya Karst & Bawah Laut Dunia",
    shortDescription: "Gugusan karst zamrud Piaynemo, terumbu karang dunia, dan burung Cendrawasih.",
    description: "Pusat segitiga terumbu karang dunia dengan keanekaragaman hayati laut tertinggi di bumi. Gugusan bukit karst zamrud berdiri kokoh di atas perairan sebening kristal.",
    fullDescription: "Raja Ampat adalah mahakarya alam terbesar di Papua Barat Daya. Tempat ini menjadi habitat bagi lebih dari 75% spesies karang dunia. Gugusan bukit karst Piaynemo yang tersohor, air laut sejernih kristal, dan keramahan penduduk desa wisata menjadikan perjalanan ke sini sebagai pengalaman hidup yang sakral.",
    image: ASSET_IMAGES.destinations.rajaAmpat.primary,
    fallbackImage: ASSET_IMAGES.destinations.rajaAmpat.fallback,
    packageCount: 1,
    startingPrice: 9250000,
    tags: ["Diving", "Eksklusif", "Nature", "Photography"],
    travelStyles: ["Adventure", "Pantai", "Healing"],
    travelStyle: ["Adventure", "Pantai", "Healing"],
    bestTime: "Oktober - April (Periode Menyelam Terbaik)",
    durationRecommendation: "5 - 7 Hari",
    recommendedDuration: "5 - 7 Hari",
    estimatedBudget: "Rp 8.500.000 - Rp 15.000.000 / orang",
    comfortLevel: "Petualangan Bahari Eksklusif",
    highlights: [
      "Panorama karst dunia Piaynemo dan Laguna Bintang dari puncak gardu pandang",
      "Kemegahan gugusan Wayag dengan formasi pulau karang tak tertandingi",
      "Snorkeling perairan Manta Sandy & Yenbuba Jetty yang kaya biota laut",
      "Menyaksikan burung langka Cendrawasih menari di rimbun hutan Sawinggrai",
      "Bermalam di eco-resort tepi laut dengan deburan suara ombak tenang"
    ],
    attractions: [
      "Piaynemo & Teluk Bintang",
      "Yenbuba Jetty & Pasir Timbul Mansuar",
      "Teluk Kabui & Batu Pensil",
      "Hutan Burung Cendrawasih Sawinggrai"
    ],
    recommendedPlaces: [
      "Piaynemo & Teluk Bintang",
      "Gugusan Kepulauan Wayag",
      "Yenbuba Jetty & Pasir Timbul Mansuar",
      "Teluk Kabui & Batu Pensil",
      "Desa Wisata Arborek & Sawinggrai"
    ],
    thingsToDo: [
      "Snorkeling bersama ratusan spesies ikan karang di Yenbuba Jetty",
      "Trekking tangga kayu menuju gardu pandang Piaynemo",
      "Menikmati ketenangan pasir putih halus di Pasir Timbul Mansuar",
      "Birdwatching burung Cendrawasih merah di habitat aslinya",
      "Menikmati sunset damai dari dermaga kayu penginapan"
    ],
    activities: [
      "Trekking gardu pandang Piaynemo",
      "Snorkeling dermaga Yenbuba Jetty",
      "Pengamatan burung Cendrawasih pagi hari",
      "Eksplorasi perahu speedboat Teluk Kabui"
    ],
    importantInfo: [
      "Setiap wisatawan diwajibkan membeli Kartu Jasa Pemeliharaan Lingkungan (PIN Konservasi Raja Ampat).",
      "Jaringan internet terbaik di pulau utama Waisai didukung oleh Telkomsel.",
      "Bawa dry bag pelindung kamera dan ponsel saat berada di atas speedboat."
    ],
    gallery: ASSET_IMAGES.destinations.rajaAmpat.gallery,
    weatherDetails: "Suhu laut 28°C–30°C dengan visibilitas luar biasa hingga 30 meter. Periode terbaik Oktober hingga April saat laut sangat tenang dan pari manta berkumpul.",
    localCuisine: [{"name":"Papeda & Ikan Kuah Kuning","desc":"Sagu kenyal khas Papua dinikmati dengan sup ikan kakap berkuah kunyit rempah asam segar."},{"name":"Ikan Bungkus Daun Talas","desc":"Ikan laut berbumbu rempah daun kemangi yang dibakar dalam balutan daun talas."},{"name":"Kelapa Muda Manokwari","desc":"Kesegaran kelapa muda murni di tepi gugusan pulau karst."}],
    culturalEtiquette: ["Hormati kearifan adat Sasi laut tradisional setempat.","Dilarang menyentuh atau mematahkan terumbu karang hidup saat snorkeling/diving.","Bawa kembali sampah plastik pribadi ke daratan Sorong."],
    transportationGuide: "Penerbangan ke Bandara DEO Sorong (SOQ), dilanjutkan kapal cepat Bahari Express (2 jam) atau speedboat privat FADZA menuju Waisai Raja Ampat.",
    relatedPackages: ["raja-ampat-ultimate"],
    faq: [
      {
        question: "Bagaimana akses transportasi menuju Raja Ampat?",
        answer: "Penerbangan menuju Bandara DEO Sorong, dilanjutkan penyeberangan kapal cepat VIP menuju Waisai selama 2 jam."
      }
    ]
  },
  {
    id: "lombok",
    name: "Lombok",
    region: "Nusa Tenggara",
    province: "Nusa Tenggara Barat",
    subtitle: "Sensasi Eksotis Bukit Merese & Trio Gili",
    shortDescription: "Pantai pasir merica Kuta Lombok, Bukit Merese, dan snorkeling trio Gili.",
    description: "Ketenangan pantai pasir merica Kuta Selatan Lombok, kemegahan bukit savana Merese, serta pesona perairan trio Gili (Trawangan, Meno, Air) yang bebas kendaraan bermotor.",
    fullDescription: "Pulau Lombok menawarkan ketenangan pesisir yang autentik. Nikmati pemandangan laut dari Bukit Merese yang berbukit-bukit hijau, budaya tenun suku Sasak di Desa Sade, serta kehidupan pulau tanpa polusi di Gili Trawangan dengan snorkeling bersama penyu liar.",
    image: ASSET_IMAGES.destinations.lombok.primary,
    fallbackImage: ASSET_IMAGES.destinations.lombok.fallback,
    packageCount: 1,
    startingPrice: 2950000,
    tags: ["Island Hopping", "Relax", "Surfing", "Nature"],
    travelStyles: ["Pantai", "Romantic", "Healing"],
    travelStyle: ["Pantai", "Romantic", "Healing"],
    bestTime: "Sepanjang Tahun (Terbaik Mei - September)",
    durationRecommendation: "3 - 4 Hari",
    recommendedDuration: "3 - 4 Hari",
    estimatedBudget: "Rp 2.900.000 - Rp 5.500.000 / orang",
    comfortLevel: "Sangat Nyaman",
    highlights: [
      "Sunset romantis Bukit Merese dengan lanskap samudra selatan lepas",
      "Snorkeling patung bawah laut Nest karya Jason deCaires Taylor di Gili Meno",
      "Melihat penyu liar berenang di perairan jernih Gili Trawangan",
      "Keunikan pasir merica dan bukit batu Pantai Tanjung Aan",
      "Belajar tenun ikat tradisional di Desa Budaya Sade Sasak"
    ],
    attractions: [
      "Bukit Merese & Pantai Tanjung Aan",
      "Gili Trawangan, Meno & Air",
      "Desa Adat Sade Sasak",
      "Air Terjun Tiu Kelep"
    ],
    recommendedPlaces: [
      "Bukit Merese & Pantai Tanjung Aan",
      "Gili Trawangan, Gili Meno, Gili Air",
      "Pantai Pink (Tangsi) Lombok Timur",
      "Desa Adat Sade / Ende"
    ],
    thingsToDo: [
      "Bersepeda keliling Gili Trawangan tanpa polusi kendaraan bermotor",
      "Island hopping speedboat snorkeling melihat kura-kura laut",
      "Menikmati kuliner Ayam Taliwang pedas nikmat dan plecing kangkung",
      "Duduk santai di atas bukit Merese saat semburat senja jingga"
    ],
    activities: [
      "Snorkeling patung bawah laut Gili Meno",
      "Trekking bukit hijau Merese",
      "Wisata budaya tenun Desa Sade",
      "Kuliner Ayam Taliwang asli Lombok"
    ],
    importantInfo: [
      "Di Gili Trawangan tidak terdapat kendaraan bermotor; gunakan sepeda atau kereta kuda Cidomo.",
      "Gunakan kacamata hitam dan pakaian pelindung sinar matahari saat berada di bukit Merese."
    ],
    gallery: ASSET_IMAGES.destinations.lombok.gallery,
    weatherDetails: "Suhu rata-rata 25°C–32°C. Periode terbaik Mei hingga Oktober saat ombak tenang dan pemandangan perbukitan savana menghijau.",
    localCuisine: [{"name":"Ayam Taliwang Pedas","desc":"Ayam bakar bumbu cabai rawit merah pedas, terasi khas Lombok, dan perasan jeruk limau."},{"name":"Plecing Kangkung","desc":"Kangkung air segar renyah disiram sambal tomat terasi dengan taburan kacang tanah sangrai."},{"name":"Sate Bulayak","desc":"Sate daging sapi empuk berlumur bumbu kari santan kental dengan lontong daun aren."}],
    culturalEtiquette: ["Gunakan pakaian sopan saat berkunjung ke Desa Adat Sade suku Sasak.","Lepas alas kaki saat memasuki rumah adat tradisional berlantai tanah liat.","Sapalah warga lokal dengan ramah dan senyuman."],
    transportationGuide: "Penerbangan ke Bandara Internasional Lombok Praya (LOP) atau fast boat dari Padangbai Bali menuju Gili Trawangan dan Pelabuhan Bangsal.",
    relatedPackages: ["lombok-adventure"],
    faq: [
      {
        question: "Apakah bisa trip ke Gili dalam 1 hari?",
        answer: "Bisa, trip island hopping 3 Gili dapat dilakukan dalam 1 hari menggunakan private boat dari pelabuhan Teluk Nare."
      }
    ]
  },
  {
    id: "yogyakarta",
    name: "Yogyakarta",
    region: "Jawa",
    province: "D.I. Yogyakarta",
    subtitle: "Ibu Kota Budaya & Warisan Luhur Nusantara",
    shortDescription: "Kemegahan Candi Borobudur & Prambanan, gua karst, dan malam syahdu Malioboro.",
    description: "Perjalanan spiritual dan budaya menelusuri kemegahan Candi Borobudur dan Prambanan, keriuhan Malioboro, gua karst berair jomblang, serta kuliner legendaris istimewa.",
    fullDescription: "Yogyakarta adalah pusat kebudayaan Jawa yang memikat hati jutaan wisatawan. Menyaksikan stupa Borobudur saat fajar menyingsing, kemegahan relief Prambanan peninggalan Mataram Kuno, keseruan tubing di aliran air bawah tanah Goa Pindul, hingga menyantap Gudeg hangat di kawasan Malioboro.",
    image: ASSET_IMAGES.destinations.yogyakarta.primary,
    fallbackImage: ASSET_IMAGES.destinations.yogyakarta.fallback,
    packageCount: 1,
    startingPrice: 1950000,
    tags: ["Budaya", "Heritage", "Kuliner", "Family"],
    travelStyles: ["Culture", "Family", "Adventure"],
    travelStyle: ["Culture", "Family", "Adventure"],
    bestTime: "Sepanjang Tahun (Terbaik Mei - Oktober)",
    durationRecommendation: "3 - 4 Hari",
    recommendedDuration: "3 - 4 Hari",
    estimatedBudget: "Rp 1.950.000 - Rp 4.200.000 / orang",
    comfortLevel: "Ramah Keluarga & Santai",
    highlights: [
      "Sunrise spektakuler berkabut tipis menghadap stupa agung Candi Borobudur",
      "Kemegahan arsitektur relief Candi Prambanan berlatar langit biru",
      "Petualangan cave tubing menyusuri sungai bawah tanah Goa Pindul",
      "Suasana hangat malam di Malioboro, angkringan, dan Keraton Ngayogyakarta"
    ],
    attractions: [
      "Candi Borobudur & Candi Prambanan",
      "Goa Pindul & HeHa Sky View",
      "Taman Sari Water Castle",
      "Kawasan Malioboro & Keraton"
    ],
    recommendedPlaces: [
      "Candi Borobudur & Candi Prambanan",
      "Keraton Yogyakarta & Taman Sari Water Castle",
      "Goa Pindul & Goa Jomblang Gunungkidul",
      "HeHa Sky View & Hutan Pinus Mangunan"
    ],
    thingsToDo: [
      "Menikmati sunrise Borobudur dari bukit Punthuk Setumbu",
      "Cave tubing mengapung di ban menyusuri aliran Goa Pindul",
      "Menyantap Gudeg Yu Djum autentik dan kopi jos arang panas",
      "Hunting foto etnik di lorong bawah air Taman Sari"
    ],
    activities: [
      "Sunrise stupa Candi Borobudur",
      "Cave tubing Goa Pindul",
      "Tur sejarah Kraton Yogyakarta & Taman Sari",
      "Wisata belanja oleh-oleh khas Malioboro"
    ],
    importantInfo: [
      "Membawa pakaian ganti ekstra untuk aktivitas air di Goa Pindul.",
      "Kenakan alas kaki yang nyaman untuk berjalan di area pelataran candi yang luas."
    ],
    gallery: ASSET_IMAGES.destinations.yogyakarta.gallery,
    weatherDetails: "Suhu berkisar 24°C–32°C. Musim kemarau Mei hingga Oktober sangat ideal untuk mengeksplorasi candi, pantai selatan, dan perbukitan Menoreh.",
    localCuisine: [{"name":"Gudeg Yu Djum","desc":"Nangka muda dimasak manis gurih dengan santan kental, krecek pedas, dan telur bebek bumbu bacem."},{"name":"Bakpia Pathok Hangat","desc":"Kue kering tradisional isi kacang hijau manis legit yang baru matang dari pemanggang."},{"name":"Sate Klathak Pak Pong","desc":"Sate kambing muda ditusuk jeruji besi berkuah gulai gurih khas Imogiri Bantul."}],
    culturalEtiquette: ["Gunakan pakaian sopan dan tertutup saat memasuki area Keraton Yogyakarta dan Candi Borobudur.","Bertutur kata santun dan hindari suara keras di area suci candi.","Gunakan tangan kanan saat menunjuk atau menyerahkan sesuatu."],
    transportationGuide: "Penerbangan ke Bandara Internasional Yogyakarta (YIA) di Kulon Progo dengan akses KA Bandara (39 menit) ke pusat kota, atau kereta eksekutif ke Stasiun Tugu.",
    relatedPackages: ["yogyakarta-heritage"],
    faq: [
      {
        question: "Apakah paket Yogyakarta ramah anak dan lansia?",
        answer: "Sangat ramah keluarga! Rute perjalanan santai dengan mobil privat ber-AC dan waktu kunjungan yang fleksibel."
      }
    ]
  },
  {
    id: "bromo",
    name: "Bromo & Malang",
    region: "Jawa",
    province: "Jawa Timur",
    subtitle: "Negeri di Atas Awan & Kaldera Purba",
    shortDescription: "Golden sunrise Penanjakan 1, melintasi Pasir Berbisik naik Jeep 4x4.",
    description: "Sensasi sunrise magis berlatar kepulan kawah Bromo dan Gunung Semeru, menembus lautan pasir berbisik dengan Jeep 4x4, serta segarnya hawa pegunungan Malang dan Batu.",
    fullDescription: "Taman Nasional Bromo Tengger Semeru menyajikan bentang alam kaldera vulkanik yang menyerupai lanskap planet lain. Rasakan hembusan angin dingin saat menanti matahari terbit di Penanjakan 1, mendaki tangga kawah aktif Bromo, dan memacu adrenalin bersama armada Jeep 4x4 di tengah Pasir Berbisik.",
    image: ASSET_IMAGES.destinations.bromo.primary,
    fallbackImage: ASSET_IMAGES.destinations.bromo.fallback,
    packageCount: 1,
    startingPrice: 1850000,
    tags: ["Adventure", "Sunrise", "Photography", "Jeep"],
    travelStyles: ["Adventure", "Family", "Healing"],
    travelStyle: ["Adventure", "Family", "Healing"],
    bestTime: "Juni - November (Langit Cerah & Bebas Hujan)",
    durationRecommendation: "2 Hari 1 Malam",
    recommendedDuration: "2 Hari 1 Malam",
    estimatedBudget: "Rp 1.850.000 - Rp 3.800.000 / orang",
    comfortLevel: "Petualangan Sejuk & Seru",
    highlights: [
      "Golden sunrise megah di Penanjakan 1 memandang kaldera Tengger",
      "Melintasi hamparan lautan Pasir Berbisik mengendarai Jeep Hardtop 4x4",
      "Mendaki tangga kawah aktif Bromo mendengar dentuman alam",
      "Hamparan perbukitan hijau asri Bukit Teletubbies & Savana Tengger"
    ],
    attractions: [
      "Penanjakan 1 (Golden Sunrise view)",
      "Kawah Aktif Bromo & Pura Poten",
      "Lautan Pasir Berbisik",
      "Bukit Teletubbies & Savana"
    ],
    recommendedPlaces: [
      "Penanjakan 1 / King Kong Hill",
      "Kawah Aktif Bromo & Pura Luhur Poten",
      "Pasir Berbisik & Bukit Teletubbies",
      "Kota Wisata Batu Malang"
    ],
    thingsToDo: [
      "Berburu foto Milky Way dan bintang malam di padang pasir Bromo",
      "Menunggang kuda melintasi kaldera menuju kaki tangga kawah",
      "Menikmati secangkir teh panas dan jagung bakar di gardu pandang",
      "Petualangan off-road jeep melewati jalur berpasir Tengger"
    ],
    activities: [
      "Safari Jeep 4x4 Bromo 5 spot utama",
      "Trekking bibir kawah aktif Bromo",
      "Hunting foto sunrise Penanjakan",
      "Eksplorasi savana bukit Teletubbies"
    ],
    importantInfo: [
      "Suhu udara di Penanjakan pada dini hari berkisar antara 4 hingga 9 derajat Celcius.",
      "Wajib membawa jaket tebal, sarung tangan, kupluk penghangat, dan syal."
    ],
    gallery: ASSET_IMAGES.destinations.bromo.gallery,
    weatherDetails: "Suhu siang 15°C–20°C, sedangkan dini hari dapat mencapai 3°C–8°C. Musim terbaik Mei hingga Oktober untuk view sunrise langit bersih.",
    localCuisine: [{"name":"Bakso Bakar & Bakso Malang","desc":"Bakso daging sapi kenyal kuah kaldu sumsum gurih dilengkapi pangsit renyah dan tahu bakso."},{"name":"Nasi Aron Tengger","desc":"Nasi jagung pulen tradisional suku Tengger berpadu sambal terong dan ikan asin gurih."},{"name":"Apel Manalagi Malang","desc":"Buah apel manis renyah yang dipetik langsung dari kebun agrowisata Batu."}],
    culturalEtiquette: ["Gunakan jaket tebal berbulu, sarung tangan, syal, dan masker debu pasir.","Hormati kesakralan Kawah Bromo bagi masyarakat adat suku Tengger.","Gunakan jasa ojek kuda berlisensi resmi bila tidak kuat mendaki tangga kawah."],
    transportationGuide: "Kereta api atau penerbangan ke Stasiun/Bandara Surabaya (SUB) atau Malang (MLG), dilanjutkan transfer mobil privat AC menuju hotel lereng Tengger.",
    relatedPackages: ["bromo-sunrise"],
    faq: [
      {
        question: "Apakah bisa dijemput dari Surabaya atau Malang?",
        answer: "Bisa! Kami menyediakan opsi penjemputan dari Stasiun atau Bandara di Kota Malang maupun Surabaya."
      }
    ]
  },
  {
    id: "bandung",
    name: "Bandung",
    region: "Jawa",
    province: "Jawa Barat",
    subtitle: "Kota Kembang, Kawah Putih & Kebun Teh Asri",
    shortDescription: "Kawah belerang toska Ciwidey, perkebunan teh Rancabali, dan kuliner Sunda.",
    description: "Keindahan dataran tinggi Parahyangan dengan danau vulkanik Kawah Putih yang magis, hamparan karpet hijau kebun teh Rancabali, serta kehangatan kuliner Sunda.",
    fullDescription: "Bandung dan kawasan pegunungan Ciwidey adalah destinasi liburan akhir pekan favorit dengan udara sejuk menyegarkan. Nikmati panorama danau kawah berwarna putih toska berpagar tebing kapur, berjalan di atas jembatan gantung kebun teh, hingga mencicipi kuliner nasi liwet hangat di saung bambu.",
    image: ASSET_IMAGES.destinations.bandung.primary,
    fallbackImage: ASSET_IMAGES.destinations.bandung.fallback,
    packageCount: 1,
    startingPrice: 1450000,
    tags: ["Pegunungan", "Sejuk", "Kuliner", "Weekend"],
    travelStyles: ["Healing", "Family", "Romantic"],
    travelStyle: ["Healing", "Family", "Romantic"],
    bestTime: "Sepanjang Tahun (Terbaik Mei - Oktober)",
    durationRecommendation: "2 Hari 1 Malam",
    recommendedDuration: "2 Hari 1 Malam",
    estimatedBudget: "Rp 1.450.000 - Rp 2.800.000 / orang",
    comfortLevel: "Sangat Nyaman & Santai",
    highlights: [
      "Danau belerang toska magis Kawah Putih Ciwidey",
      "Hamparan perkebunan teh Rancabali yang hijau sejauh mata memandang",
      "Kuliner autentik nasi liwet Sunda dan kopi arabika Jawa Barat",
      "Glamping lakeside tepi danau Situ Patenggang"
    ],
    attractions: [
      "Kawah Putih Ciwidey",
      "Kebun Teh Rancabali & Glamping Lakeside",
      "Situ Patenggang",
      "Kawasan Dago & Punclut"
    ],
    recommendedPlaces: [
      "Kawah Putih & Jembatan Apung Cantigi",
      "Perkebunan Teh Rancabali",
      "Danau Situ Patenggang & Batu Cinta",
      "Pusat Oleh-Oleh Kartika Sari & Prima Rasa"
    ],
    thingsToDo: [
      "Berfoto di tepi danau kawah belerang toska Kawah Putih",
      "Menikmati secangkir teh panas di tengah hamparan kebun teh",
      "Menyantap nasi liwet komplit gurih beralas daun pisang",
      "Belanja kue bolu pisang dan pisang bollen khas Bandung"
    ],
    activities: [
      "Tur kawah belerang Kawah Putih Ciwidey",
      "Tea walk perkebunan teh Rancabali",
      "Santap siang kuliner Sunda saung liwet",
      "Belanja oleh-oleh khas Kota Bandung"
    ],
    importantInfo: [
      "Gunakan jaket hangat atau sweater karena suhu di Ciwidey cukup dingin.",
      "Pakailah masker di kawasan Kawah Putih karena aroma belerang yang pekat."
    ],
    gallery: ASSET_IMAGES.destinations.bandung.gallery,
    weatherDetails: "Suhu sejuk 18°C–26°C khas dataran tinggi Priangan. Cocok dikunjungi sepanjang tahun dengan rekomendasi hari kerja untuk ketenangan maksimal.",
    localCuisine: [{"name":"Batagor & Siomay Kingsley","desc":"Olahan ikan tenggiri kenyal digoreng keemasan disiram saus kacang gurih pedas manis."},{"name":"Nasi Timbel Komplit","desc":"Nasi pulen dibungkus daun pisang harum dengan ayam goreng lengkuas, tahu, tempe, dan sambal terasi."},{"name":"Surabi Kinca Oncom","desc":"Kue surabi bakar tanah liat dengan varian kuah gula merah kinca atau taburan oncom pedas."}],
    culturalEtiquette: ["Gunakan pakaian hangat berlapis saat mengunjungi kawah Tangkuban Parahu atau Kawah Putih Ciwidey.","Patuhi rambu peringatan bau belerang aktif di dekat kawah.","Gunakan masker dan kacamata saat kabut belerang menebal."],
    transportationGuide: "Akses kereta cepat Whoosh Jakarta-Bandung hanya 30 menit ke Stasiun Padalarang/Tegalluar, atau perjalanan darat via Tol Cipularang (2-3 jam).",
    relatedPackages: ["bandung-retreat"],
    faq: [
      {
        question: "Apakah paket Bandung cocok untuk short weekend trip?",
        answer: "Sangat ideal! Durasi 2 Hari 1 Malam dirancang pas untuk liburan singkat dari Jakarta atau sekitarnya."
      }
    ]
  },
  {
    id: "toba",
    name: "Danau Toba",
    region: "Sumatra",
    province: "Sumatera Utara",
    subtitle: "Kemegahan Kaldera Vulkanik Terbesar Dunia",
    shortDescription: "Kaldera vulkanik terbesar di Asia, tradisi Batak Samosir, dan Air Terjun Sipiso-piso.",
    description: "Kedamaian danau kawah vulkanik terbesar di Asia Tenggara, pesona Pulau Samosir di tengah danau, udara sejuk pegunungan, serta kekayaan tradisi Batak Toba yang hangat.",
    fullDescription: "Danau Toba adalah keajaiban geologis dunia di Sumatera Utara. Danau purba seluas lebih dari 1.100 kilometer persegi ini menyuguhkan ketenangan air tawar diapit bukit-bukit hijau nan megah, budaya tarian Tor-Tor dan boneka Sigale-Gale di Pulau Samosir, serta keanggunan Air Terjun Sipiso-Piso setinggi 120 meter.",
    image: ASSET_IMAGES.destinations.toba.primary,
    fallbackImage: ASSET_IMAGES.destinations.toba.fallback,
    packageCount: 1,
    startingPrice: 3200000,
    tags: ["Danau", "Budaya Batak", "Healing", "Nature"],
    travelStyles: ["Healing", "Culture", "Family"],
    travelStyle: ["Healing", "Culture", "Family"],
    bestTime: "Sepanjang Tahun (Terbaik Mei - September)",
    durationRecommendation: "3 Hari 2 Malam",
    recommendedDuration: "3 Hari 2 Malam",
    estimatedBudget: "Rp 3.200.000 - Rp 5.200.000 / orang",
    comfortLevel: "Sangat Nyaman & Tenang",
    highlights: [
      "Panorama luas perairan Danau Toba dari puncak bukit Tele dan Holbung",
      "Mengenal sejarah Batak dan boneka Sigale-gale di Desa Tomok Samosir",
      "Gemuruh air terjun tertinggi di Indonesia, Air Terjun Sipiso-piso",
      "Menginap di hotel tepi danau dengan udara pegunungan yang sangat bersih"
    ],
    attractions: [
      "Pulau Samosir (Tomok & Tuk-tuk)",
      "Bukit Holbung (Bukit Teletubbies Toba)",
      "Air Terjun Sipiso-piso",
      "Menara Pandang Tele"
    ],
    recommendedPlaces: [
      "Pulau Samosir (Tomok & Tuk-tuk)",
      "Bukit Holbung (Bukit Teletubbies Toba)",
      "Air Terjun Sipiso-piso",
      "Menara Pandang Tele"
    ],
    thingsToDo: [
      "Berlayar kapal santai mengelilingi perairan tenang Pulau Samosir",
      "Menari Tor-tor bersama boneka Sigale-gale",
      "Trekking bukit Holbung memandang lanskap pulau dan danau dari ketinggian",
      "Mencicipi ikan mas arsik bumbu andaliman yang menggugah selera"
    ],
    activities: [
      "Berlayar private boat di perairan Danau Toba",
      "Menari Tor-tor di Desa Budaya Tomok",
      "Trekking Bukit Holbung panorama 360 derajat",
      "Mengunjungi Air Terjun Sipiso-piso"
    ],
    importantInfo: [
      "Disarankan memilih penerbangan tiba di Bandara Internasional Silangit (DTB) untuk akses lebih dekat.",
      "Udara tepi danau saat malam hari relatif dingin, bawalah jaket hangat."
    ],
    gallery: ASSET_IMAGES.destinations.toba.gallery,
    weatherDetails: "Suhu sejuk berkisar 19°C–27°C. Bulan Mei hingga September adalah waktu paling cerah menikmati lanskap danau kaldera terbesar di dunia.",
    localCuisine: [{"name":"Ikan Mas Arsik","desc":"Ikan mas danau dimasak bumbu rempah kuning andaliman khas Batak dengan rasa getir asam segar."},{"name":"Mie Gomak Kuah Santan","desc":"Mie lidi kenyal berkuah santan andaliman pedas harum serai yang menghangatkan tubuh."},{"name":"Kopi Arabika Lintong","desc":"Kopi single origin aroma floral dan cokelat pekat dari dataran tinggi sekitar danau."}],
    culturalEtiquette: ["Gunakan kain ulos dengan posisi yang benar saat menari Tor-Tor bersama tetua adat.","Lepas alas kaki saat memasuki Rumah Bolon adat Batak.","Hormati makam batu kuno para raja di Desa Tomok Samosir."],
    transportationGuide: "Penerbangan langsung ke Bandara Internasional Silangit (DTB) di Siborong-borong (hanya 30 menit ke danau), atau Bandara Kualanamu Medan (KNO) via tol.",
    relatedPackages: ["toba-highland"],
    faq: [
      {
        question: "Apakah makanan yang disajikan terjamin halal?",
        answer: "FADZA TRIP ADVENTURE selalu menyediakan restoran bersertifikasi halal dan bersih untuk seluruh program makan dalam paket."
      }
    ]
  },
  {
    id: "derawan",
    name: "Kepulauan Derawan",
    region: "Kalimantan",
    province: "Kalimantan Timur",
    subtitle: "Surga Penyu Raksasa & Danau Ubur-Ubur Tanpa Sengat",
    shortDescription: "Berenang bersama ubur-ubur tanpa sengat di Kakaban dan hiu paus Talisayan.",
    description: "Gugusan kepulauan tropis di Laut Sulawesi dengan sensasi berenang bersama ribuan ubur-ubur tanpa sengat di Pulau Kakaban dan penyu hijau raksasa di Pulau Derawan.",
    fullDescription: "Kepulauan Derawan di Kalimantan Timur adalah surga bahari yang menakjubkan. Di sini Anda dapat berenang bebas di dalam danau purba Kakaban bersama ribuan ubur-ubur jinak yang tidak menyengat, menjumpai kawanan hiu paus ramah di perairan Talisayan, dan tidur di cottage terapung di atas laut biru toska.",
    image: ASSET_IMAGES.destinations.derawan.primary,
    fallbackImage: ASSET_IMAGES.destinations.derawan.fallback,
    packageCount: 1,
    startingPrice: 4650000,
    tags: ["Bahari", "Snorkeling", "Penyu", "Island Hopping"],
    travelStyles: ["Adventure", "Pantai", "Healing"],
    travelStyle: ["Adventure", "Pantai", "Healing"],
    bestTime: "Maret - Oktober (Laut Tenang)",
    durationRecommendation: "4 Hari 3 Malam",
    recommendedDuration: "4 Hari 3 Malam",
    estimatedBudget: "Rp 4.500.000 - Rp 7.500.000 / orang",
    comfortLevel: "Petualangan Bahari Tropis",
    highlights: [
      "Berenang bersama ribuan ubur-ubur jinak tanpa sengat di Danau Kakaban",
      "Melihat kura-kura hijau bertelur di tepi pantai malam hari Pulau Derawan",
      "Sensasi berenang bersama hiu paus (Whale Shark) di perairan Talisayan",
      "Resort terapung di atas air laut biru toska di Pulau Maratua"
    ],
    attractions: [
      "Danau Kakaban (Jellyfish Lake)",
      "Pulau Maratua & Pulau Derawan",
      "Sangalaki Manta Point",
      "Talisayan Whale Shark Point"
    ],
    recommendedPlaces: [
      "Pulau Derawan & Pulau Maratua",
      "Pulau Kakaban (Jellyfish Lake)",
      "Pulau Sangalaki (Manta Ray & Hatchery Penyu)",
      "Danau Labuan Cermin Biduk-Biduk"
    ],
    thingsToDo: [
      "Snorkeling bebas di danau prasejarah Kakaban tanpa takut tersengat",
      "Duduk santai di jembatan kayu cottage melihat penyu berenang di bawahnya",
      "Berenang bersama ikan pari manta tutul di perairan Sangalaki",
      "Melihat fenomena air tawar dan asin yang tidak bercampur di Labuan Cermin"
    ],
    activities: [
      "Snorkeling ubur-ubur tanpa sengat di Danau Kakaban",
      "Berenang bersama Hiu Paus ramah di Talisayan",
      "Island hopping speedboat Maratua & Sangalaki",
      "Menginap di cottage kayu terapung di atas laut"
    ],
    importantInfo: [
      "Dilarang memakai lotion tabir surya kimia saat berenang di Danau Kakaban demi melindungi ekosistem ubur-ubur.",
      "Gunakan baju renang lengan panjang atau rash guard pelindung matahari."
    ],
    gallery: ASSET_IMAGES.destinations.derawan.gallery,
    weatherDetails: "Suhu laut 27°C–29°C dengan visibilitas snorkeling jernih. Periode terbaik April hingga Oktober saat angin tenang dan ubur-ubur Kakaban sangat aktif.",
    localCuisine: [{"name":"Kepiting Kenari Saus Lada Hitam","desc":"Kepiting laut berdaging tebal gurih manis dengan limpahan rempah lada hitam pedas nikmat."},{"name":"Kima & Kerang Laut Bakar","desc":"Kerang laut segar tangkapan nelayan lokal dibakar dengan perasan jeruk nipis dan sambal dabu."},{"name":"Ikan Asin Teluk Sulaiman","desc":"Ikan asin renyah gurih khas pesisir Berau."}],
    culturalEtiquette: ["Dilarang keras memakai fin / kaki katak saat berenang di Danau Ubur-Ubur Kakaban agar tidak menyakiti ubur-ubur tanpa sengat.","Jangan melompat / diving di danau Kakaban.","Dilarang memegang penyu yang sedang bertelur di Pulau Sangalaki."],
    transportationGuide: "Penerbangan ke Bandara Kalimarau Berau (BEJ) atau Bandara Tarakan, dilanjutkan mobil 2 jam ke Pelabuhan Tanjung Batu dan speedboat 30 menit ke Derawan.",
    relatedPackages: ["derawan-adventure"],
    faq: [
      {
        question: "Apakah aman berenang bersama hiu paus di Talisayan?",
        answer: "Sangat aman! Hiu paus adalah satwa laut raksasa pemakan plankton yang sangat tenang dan ramah terhadap manusia."
      }
    ]
  },
  {
    id: "bunaken",
    name: "Bunaken & Manado",
    region: "Sulawesi",
    province: "Sulawesi Utara",
    subtitle: "Dinding Karang Raksasa & Surga Penyu Laut",
    shortDescription: "Taman laut legendaris dengan terumbu karang dinding vertikal dan penyu raksasa.",
    description: "Taman Nasional Laut Bunaken yang tersohor di dunia dengan keanekaragaman terumbu karang dinding vertikal curam, kejernihan air samudra tropis, dan kuliner pedas nikmat Manado.",
    fullDescription: "Taman Nasional Bunaken di Teluk Manado diakui dunia sebagai surga terumbu karang vertikal terbesar. Di sini para pecinta bawah laut dapat snorkeling dan diving di Lekuan Wall memandang ribuan ikan karang tropis dan kawanan penyu laut raksasa yang berenang tenang.",
    image: ASSET_IMAGES.destinations.bunaken.primary,
    fallbackImage: ASSET_IMAGES.destinations.bunaken.fallback,
    packageCount: 1,
    startingPrice: 3450000,
    tags: ["Diving", "Snorkeling", "Penyu", "Bahari"],
    travelStyles: ["Adventure", "Pantai", "Healing"],
    travelStyle: ["Adventure", "Pantai", "Healing"],
    bestTime: "Mei - Oktober (Visibilitas Bawah Laut Terbaik)",
    durationRecommendation: "3 Hari 2 Malam",
    recommendedDuration: "3 Hari 2 Malam",
    estimatedBudget: "Rp 3.400.000 - Rp 5.800.000 / orang",
    comfortLevel: "Petualangan Bahari",
    highlights: [
      "Dinding karang vertikal (drop-off wall) spektakuler Lekuan Wall",
      "Perjumpaan langsung dengan penyu hijau raksasa di habitat alaminya",
      "Kejernihan air laut dengan jarak pandang hingga 30 meter",
      "Kuliner autentik Ikan Woku Belanga dan Klappertaart khas Manado"
    ],
    attractions: [
      "Lekuan Wall & Liang Cove Bunaken",
      "Pulau Siladen",
      "Pemandangan Gunung Manado Tua",
      "Kota Manado & Klappertaart"
    ],
    recommendedPlaces: [
      "Pulau Bunaken (Lekuan 1, 2, 3)",
      "Pulau Siladen pasir putih",
      "Kawasan Pantai Malalayang Manado",
      "Pusat Kuliner Ikan Bakar Manado"
    ],
    thingsToDo: [
      "Snorkeling menyusuri dinding karang vertikal sedalam puluhan meter",
      "Berenang berdampingan dengan penyu raksasa yang jinak",
      "Bersantai di resort pulau menikmati sunset berlatar Gunung Manado Tua",
      "Menikmati gurih dan pedasnya sajian ikan cakalang fufu dan rica-rica"
    ],
    activities: [
      "Snorkeling tour di spot Lekuan Wall dan Liang Beach",
      "Island hopping perahu katamaran di Pulau Bunaken & Siladen",
      "Kuliner seafood woku belanga khas Minahasa",
      "Wisata oleh-oleh Klappertaart Manado"
    ],
    importantInfo: [
      "Gunakan masker snorkel yang pas dan pelampung keselamatan selama berada di laut dalam.",
      "Dilarang berdiri atau menginjak terumbu karang hidup di area taman laut."
    ],
    gallery: ASSET_IMAGES.destinations.bunaken.gallery,
    weatherDetails: "Suhu tropis rata-rata 27°C–31°C. Periode terbaik Mei hingga Oktober dengan visibilitas bawah laut mencapai 30-40 meter di dinding karang vertical drop-off.",
    localCuisine: [{"name":"Tinutuan (Bubur Manado)","desc":"Bubur beras kaya labu kuning, kangkung, kemangi wangi disajikan dengan sambal roa dan perkedel jagung."},{"name":"Ikan Cakalang Fufu Saus Rica","desc":"Ikan cakalang asap harum disuwir berbalur cabai rica pedas menggugah selera."},{"name":"Klappertaart Panggang","desc":"Kue lembut Belanda khas Manado isi daging kelapa muda, kismis, kayu manis, dan keju gurih."}],
    culturalEtiquette: ["Gunakan tabir surya bersertifikasi reef-friendly.","Jangan menginjak terumbu karang karpet di tepi pantai saat surut.","Buang sampah di tempat tertutup agar tidak terbawa angin ke laut."],
    transportationGuide: "Penerbangan langsung ke Bandara Sam Ratulangi Manado (MDC), dilanjutkan perjalanan mobil 20 menit ke Dermaga Marina Manado dan speedboat 35 menit ke Bunaken.",
    relatedPackages: ["bunaken-marine"],
    faq: [
      {
        question: "Apakah orang yang hanya snorkeling bisa menikmati Bunaken?",
        answer: "Bisa sekali! Puncak dinding karang Bunaken berada hanya 1-2 meter di bawah permukaan laut sehingga terumbu karang dan penyu terlihat sangat jelas."
      }
    ]
  },
  {
    id: "sumba",
    name: "Sumba",
    region: "Nusa Tenggara",
    province: "Nusa Tenggara Timur",
    subtitle: "Eksotisme Savana Liar & Budaya Marapu",
    shortDescription: "Savana bergelombang Wairinding, pohon menari Walakiri, dan kampung adat Marapu.",
    description: "Keajaiban tanah Sumba dengan bukit savana bergelombang tak berujung, kuda liar Sandalwood, rumah adat bertonggak tinggi Marapu, dan air terjun biru bertingkat.",
    fullDescription: "Sumba menyuguhkan keindahan alam liar dan tradisi budaya yang tak terlupakan. Bukit savana bergelombang Wairinding, laguna air asin jernih Danau Weekuri, arsitektur magis rumah adat beratap menara di Prai Ijing, hingga siluet pohon menari di bibir Pantai Walakiri.",
    image: ASSET_IMAGES.destinations.sumba.primary,
    fallbackImage: ASSET_IMAGES.destinations.sumba.fallback,
    packageCount: 1,
    startingPrice: 4850000,
    tags: ["Eksotis", "Savana", "Budaya", "Adventure"],
    travelStyles: ["Adventure", "Culture", "Healing"],
    travelStyle: ["Adventure", "Culture", "Healing"],
    bestTime: "Mei - Oktober (Musim Kering & Rumput Emas)",
    durationRecommendation: "4 - 5 Hari",
    recommendedDuration: "4 - 5 Hari",
    estimatedBudget: "Rp 4.850.000 - Rp 8.000.000 / orang",
    comfortLevel: "Petualangan Eksotis",
    highlights: [
      "Sunset legendaris pohon menari di bibir Pantai Walakiri",
      "Hamparan perbukitan savana bergelombang tanpa batas di Bukit Wairinding",
      "Kejernihan air toska bertingkat di Danau Weekuri Lagoon",
      "Arsitektur magis rumah adat beratap menara di Desa Prai Ijing"
    ],
    attractions: [
      "Bukit Wairinding & Bukit Tenau",
      "Pantai Walakiri (Dancing Trees)",
      "Danau Weekuri (Laguna Air Asin)",
      "Kampung Adat Prai Ijing"
    ],
    recommendedPlaces: [
      "Bukit Wairinding & Bukit Tenau",
      "Pantai Walakiri (Dancing Trees)",
      "Danau Weekuri (Laguna Air Asin Alami)",
      "Air Terjun Tanggedu & Matayangu"
    ],
    thingsToDo: [
      "Menanti golden hour dan siluet pohon menari di Pantai Walakiri",
      "Berenang di laguna air asin sebening kaca Danau Weekuri",
      "Mendengar kisah luhur kepercayaan Marapu dari tetua adat",
      "Belajar proses panjang pembuatan kain tenun ikat pewarna alami"
    ],
    activities: [
      "Trekking panorama savana Bukit Wairinding",
      "Berenang laguna air asin Danau Weekuri",
      "Kunjungan budaya Kampung Adat Prai Ijing",
      "Hunting foto sunset pohon menari Walakiri"
    ],
    importantInfo: [
      "Perjalanan darat di Sumba relatif luas; kenakan pakaian yang nyaman dan bawa botol minum sendiri.",
      "Hormati adat istiadat warga lokal saat memasuki area kampung budaya."
    ],
    gallery: ASSET_IMAGES.destinations.sumba.gallery,
    weatherDetails: "Suhu berkisar 24°C–33°C. Musim terbaik Mei hingga Oktober saat bukit savana berubah warna dari hijau menjadi emas eksotis menyerupai Afrika.",
    localCuisine: [{"name":"Se’i Daging Sapi Asap","desc":"Daging sapi diasap perlahan dengan kayu kosambi menghasilkan aroma smoky lembut khas NTT."},{"name":"Ro’o Luwa (Sayur Daun Ubi)","desc":"Olahan daun ubi ditumbuk halus dimasak santan gurih dan beras jagung."},{"name":"Kue Rambut Sumba","desc":"Camilan manis renyah dari tepung beras dan gula aren menyerupai helaian benang emas."}],
    culturalEtiquette: ["Bawalah sirih pinang atau permen sebagai tanda salam persahabatan saat bertamu ke kampung adat Prai Ijing atau Ratenggaro.","Minta izin sebelum memotret warga lokal atau kubur batu megalitikum.","Gunakan pakaian sopan saat berada di pemukiman warga adat."],
    transportationGuide: "Penerbangan ke Bandara Tambolaka (TMC) Sumba Barat Daya atau Bandara Umbu Mehang Kunda Waingapu (WGP) via Denpasar atau Kupang.",
    relatedPackages: ["sumba-paradise"],
    faq: [
      {
        question: "Kapan savana di Sumba berwarna hijau vs keemasan?",
        answer: "Desember hingga April savana menghijau subur, sedangkan Mei hingga Oktober berubah menjadi padang savana keemasan khas Afrika."
      }
    ]
  },
  {
    id: "belitung",
    name: "Belitung",
    region: "Sumatra",
    province: "Kepulauan Bangka Belitung",
    subtitle: "Batu Granit Megah & Negeri Laskar Pelangi",
    shortDescription: "Pantai batu granit raksasa Tanjung Tinggi, Pulau Lengkuas, dan Danau Kaolin.",
    description: "Pesona formasi batu granit raksasa yang berdiri kokoh di pantai berpasir putih halus, mercusuar bersejarah Pulau Lengkuas peninggalan 1882, dan danau kaolin biru toska.",
    fullDescription: "Belitung adalah pulau tropis yang tenang di Laut Jawa. Formasi bebatuan granit raksasa di Pantai Tanjung Tinggi yang menjadi latar film Laskar Pelangi, kejernihan air laut di Pulau Lengkuas dengan mercusuar peninggalan kolonial, serta kenikmatan kopi tarik Kong Djie.",
    image: ASSET_IMAGES.destinations.belitung.primary,
    fallbackImage: ASSET_IMAGES.destinations.belitung.fallback,
    packageCount: 1,
    startingPrice: 2850000,
    tags: ["Pantai", "Batu Granit", "Snorkeling", "Family"],
    travelStyles: ["Pantai", "Family", "Healing"],
    travelStyle: ["Pantai", "Family", "Healing"],
    bestTime: "Maret - Oktober (Laut Sangat Tenang)",
    durationRecommendation: "3 Hari 2 Malam",
    recommendedDuration: "3 Hari 2 Malam",
    estimatedBudget: "Rp 2.800.000 - Rp 4.500.000 / orang",
    comfortLevel: "Sangat Nyaman & Santai",
    highlights: [
      "Pantai Tanjung Tinggi dengan formasi batu granit raksasa purba",
      "Menaiki mercusuar kuno tahun 1882 di Pulau Lengkuas memandang 360 derajat samudra",
      "Snorkeling melihat terumbu karang dan bintang laut di perairan jernih",
      "Danau Kaolin biru toska yang fotogenik di Tanjung Pandan"
    ],
    attractions: [
      "Pantai Tanjung Tinggi (Laskar Pelangi)",
      "Pulau Lengkuas & Mercusuar Kuno",
      "Batu Berlayar & Pulau Pasir",
      "Danau Kaolin Tanjung Pandan"
    ],
    recommendedPlaces: [
      "Pantai Tanjung Tinggi",
      "Pulau Lengkuas & Mercusuar 1882",
      "Pantai Tanjung Kelayang",
      "Danau Kaolin Belitung"
    ],
    thingsToDo: [
      "Berjalan di celah-celah bebatuan granit raksasa Pantai Tanjung Tinggi",
      "Island hopping perahu tradisional ke Pulau Lengkuas dan Batu Berlayar",
      "Mencari bintang laut di gundukan pasir timbul Pulau Pasir",
      "Menikmati secangkir kopi tarik hangat di kedai Kopi Kong Djie legendaris"
    ],
    activities: [
      "Island hopping perahu tradisional Belitung",
      "Snorkeling terumbu karang Pulau Lengkuas",
      "Foto estetik di batu granit Tanjung Tinggi",
      "Wisata Danau Kaolin dan kuliner mie Belitung"
    ],
    importantInfo: [
      "Pulau Belitung sangat ramah keluarga dengan jarak tempuh dari bandara yang relatif dekat.",
      "Bawa sandal anti selip untuk berpindah antar pulau karang."
    ],
    gallery: ASSET_IMAGES.destinations.belitung.gallery,
    weatherDetails: "Suhu tropis pesisir 26°C–31°C. Bulan Maret hingga Oktober adalah musim terbaik dengan ombak tenang untuk island hopping perahu tradisional.",
    localCuisine: [{"name":"Mie Belitung Atep","desc":"Mie kuning kenyal kuah kaldu udang manis gurih dengan topping kentang rebus, tauge renyah, dan kerupuk emping."},{"name":"Gangan Ikan Tenggiri Kuning","desc":"Sup ikan kuah kunyit asam segar berpadu irisan nanas muda yang membangkitkan selera."},{"name":"Kopi Kong Djie","desc":"Kopi saring tubruk tradisional legendaris beraroma arang yang diseduh sejak tahun 1943."}],
    culturalEtiquette: ["Hati-hati saat menaiki batuan granit besar yang basah di tepi pantai agar tidak terpeleset.","Jaga kebersihan pulau-pulau kecil tak berpenghuni seperti Pulau Lengkuas dan Batu Berlayar.","Patuhi aturan naik ke mercusuar bersejarah Pulau Lengkuas."],
    transportationGuide: "Penerbangan langsung hanya 50 menit dari Bandara Soekarno-Hatta Jakarta (CGK) ke Bandara H.A.S. Hanandjoeddin Tanjung Pandan Belitung (TJQ).",
    relatedPackages: ["belitung-island"],
    faq: [
      {
        question: "Berapa lama penerbangan dari Jakarta menuju Belitung?",
        answer: "Penerbangan dari Bandara Soekarno-Hatta (CGK) menuju Bandara H.A.S. Hanandjoeddin Belitung (TJQ) hanya membutuhkan waktu 45 menit."
      }
    ]
  }
,
  {
    id: "dieng",
    name: "Dieng Plateau",
    region: "Jawa",
    province: "Jawa Tengah",
    subtitle: "Negeri di Atas Awan & Kawah Vulkanik Magis",
    shortDescription: "Telaga Warna dua warna, Golden Sunrise Sikunir, kawah mendidih Sikidang, dan candi Hindu tertua di Jawa.",
    description: "Dataran tinggi vulkanik berkabut sejuk di ketinggian 2.093 mdpl dengan panorama fenomena alam langka, danau belerang warna-warni, serta kearifan agraris dataran tinggi yang asri.",
    fullDescription: "Dieng Plateau adalah dataran tinggi mistis di Wonosobo dan Banjarnegara yang terkenal dengan julukan 'Negeri di Atas Awan'. Dari titik pandang Bukit Sikunir saat fajar menyingsing, Anda akan disuguhi lautan awan emas berlatar siluet Gunung Sindoro yang dramatis, uap kawah Sikidang, dan keunikan Telaga Warna.",
    image: ASSET_IMAGES.destinations.dieng.primary,
    fallbackImage: ASSET_IMAGES.destinations.dieng.fallback,
    packageCount: 1,
    startingPrice: 1950000,
    tags: ["Pegunungan", "Budaya", "Healing", "Adventure"],
    travelStyles: ["Healing", "Adventure", "Culture"],
    travelStyle: ["Healing", "Adventure", "Culture"],
    bestTime: "Juni - September (Kemarau & Peluang Fenomena Embun Upas Salju Dieng)",
    durationRecommendation: "3 Hari 2 Malam",
    recommendedDuration: "3 Hari 2 Malam",
    estimatedBudget: "Rp 1.800.000 - Rp 3.500.000 / orang",
    comfortLevel: "Sejuk & Dingin (10°C - 18°C, Butuh Jaket Tebal)",
    highlights: [
      "Golden Sunrise Bukit Sikunir dengan lautan awan berlatar Gunung Sindoro",
      "Telaga Warna dan Telaga Pengilon yang berubah warna saat terpapar sinar matahari",
      "Eksplorasi uap belerang Kawah Sikidang dengan latar batuan vulkanik",
      "Kompleks Candi Arjuna, mahakarya arsitektur Hindu abad ke-7",
      "Mencicipi Mie Ongklok hangat dan buah carica manis khas Dieng"
    ],
    attractions: [
      "Bukit Sikunir (Golden Sunrise)",
      "Telaga Warna & Telaga Pengilon",
      "Kawah Sikidang",
      "Kompleks Candi Arjuna",
      "Batu Pandang Ratapan Angin"
    ],
    recommendedPlaces: [
      "Bukit Sikunir (Spot Sunrise Terbaik Asia Tenggara)",
      "Batu Pandang Ratapan Angin (View Telaga Warna dari Ketinggian)",
      "Kawah Sikidang (Kawah Vulkanik Aktif Ramah Wisatawan)",
      "Kompleks Candi Arjuna (Warisan Budaya Abad ke-7)",
      "Kawah Candradimuka & Sumur Jalatunda"
    ],
    thingsToDo: [
      "Trekking fajar menyongsong lautan awan emas Bukit Sikunir",
      "Hunting foto estetik di jembatan kayu Telaga Pengilon",
      "Menyantap tempe kemul gurih dan mie ongklok berkuah kental khas Wonosobo",
      "Menikmati udara sejuk dingin pegunungan sambil ngopi Arabika Dieng"
    ],
    weatherDetails: "Suhu rata-rata siang 16°C–20°C, malam hingga dini hari 5°C–12°C. Pada musim kemarau Juli-Agustus suhu dapat menyentuh 0°C (embun beku upas).",
    localCuisine: [
      { name: "Mie Ongklok", desc: "Mie kuning kuah kental gurih ebi manis disajikan dengan sate sapi bumbu kacang lembut." },
      { name: "Carica Dieng", desc: "Buah pepaya gunung manis segar khas Dieng dalam sirup dingin yang kaya vitamin." },
      { name: "Tempe Kemul", desc: "Gorengan tempe berbalur adonan kunyit dan kucai renyah hangat, pas di udara dingin." }
    ],
    culturalEtiquette: [
      "Gunakan jaket tebal, sarung tangan, dan kupluk hangat saat trekking dini hari.",
      "Jaga kebersihan area sakral Candi Arjuna dan tidak membuang sampah sembarangan.",
      "Patuhi jalur trekking aman di sekitar kawah aktif Sikidang."
    ],
    transportationGuide: "Penerbangan atau kereta ke Semarang / Yogyakarta, dilanjutkan perjalanan darat nyaman 3,5 - 4 jam melintasi perkebunan teh Wonosobo.",
    gallery: ASSET_IMAGES.destinations.dieng.gallery,
    relatedPackages: ["dieng-explorer"],
    faq: [
      {
        question: "Apakah trekking ke Bukit Sikunir berat untuk anak-anak?",
        answer: "Jalur tangga semen ramah keluarga hanya 20-30 menit jalan santai dengan pegangan aman dan rest area."
      }
    ]
  },
  {
    id: "toraja",
    name: "Tana Toraja",
    region: "Sulawesi",
    province: "Sulawesi Selatan",
    subtitle: "Kearifan Luhur Rumah Tongkonan & Kubur Tebing Batu",
    shortDescription: "Perkampungan megalitikum Kete Kesu, pemakaman tebing batu Londa, dan pesona pemandangan bukit Batutumonga.",
    description: "Destinasi warisan budaya antropologi dunia di dataran tinggi Sulawesi Selatan, menyimpan filosofi mendalam penghormatan leluhur, ornamen ukiran Tongkonan, dan bentang alam bukit pinus yang magis.",
    fullDescription: "Tana Toraja adalah jendela kebudayaan leluhur nusantara yang paling memesona di dunia. Dengan atap rumah Tongkonan yang melengkung bagai perahu, tradisi pemakaman tebing batu Londa, hingga bukit Batutumonga yang menghadap hamparan sawah dan awan pagi.",
    image: ASSET_IMAGES.destinations.toraja.primary,
    fallbackImage: ASSET_IMAGES.destinations.toraja.fallback,
    packageCount: 1,
    startingPrice: 3200000,
    tags: ["Budaya", "Heritage", "Pegunungan", "Eksplorasi"],
    travelStyles: ["Culture", "Adventure", "Healing"],
    travelStyle: ["Culture", "Adventure", "Healing"],
    bestTime: "Juni - Oktober (Musim festival budaya Rambu Solo & cuaca sejuk cerah)",
    durationRecommendation: "4 Hari 3 Malam",
    recommendedDuration: "4 Hari 3 Malam",
    estimatedBudget: "Rp 3.000.000 - Rp 6.000.000 / orang",
    comfortLevel: "Petualangan Budaya Sejuk & Teduh",
    highlights: [
      "Mengagumi arsitektur megah Rumah Adat Tongkonan di Desa Tradisional Kete Kesu",
      "Menelusuri gua makam purba tebing karst Londa dan patung kayu Tau-Tau",
      "Pemandangan lembah sawah bertingkat Batutumonga dari ketinggian perbukitan",
      "Mengunjungi situs megalitikum Bori Kalimbuang peninggalan zaman prasejarah",
      "Menikmati secangkir Kopi Arabika Toraja autentik langsung dari perkebunan dataran tinggi"
    ],
    attractions: [
      "Desa Tradisional Kete Kesu",
      "Gua Pemakaman Tebing Londa",
      "Bukit Savana Batutumonga",
      "Megalitikum Bori Kalimbuang",
      "Pohon Makam Kambira"
    ],
    recommendedPlaces: [
      "Kete Kesu (Pusat Kebudayaan & Lumbung Padi Berukir Etnik)",
      "Londa (Gua Karst Pemakaman Alami dengan Peti Erong Kuno)",
      "Batutumonga (Gardu Pandang Panorama Sawah Terasering & Awan)",
      "Bori Kalimbuang (Hutan Batu Menhir Megalitikum Dunia)",
      "Pasar Bolu Rantepao (Pasar Kerbau Belang & Kopi Toraja)"
    ],
    thingsToDo: [
      "Mempelajari makna filosofis ukiran Pa'ssura pada dinding kayu Tongkonan",
      "Menyusuri lorong gua Londa ditemani pemandu lokal pembawa pelita lentera minyak",
      "Trekking santai di antara kebun kopi Arabika di lereng bukit Batutumonga",
      "Mencicipi kuliner Pa'piong yang dimasak dalam bilah bambu beraroma khas"
    ],
    weatherDetails: "Iklim dataran tinggi sejuk 17°C–24°C dengan udara segar beraroma pinus dan perbukitan hijau.",
    localCuisine: [
      { name: "Pa'piong Daging / Ayam", desc: "Daging bumbu rempah daun mayana dan jahe yang dimasak lambat di dalam batang bambu di atas bara api." },
      { name: "Pantollo Lendong", desc: "Olahan belut sawah khas Toraja dimasak kuah kluwek hitam gurih sedap." },
      { name: "Kopi Arabika Toraja Sapan", desc: "Kopi legendaris dengan cita rasa herbal dan keasaman buah yang elegan." }
    ],
    culturalEtiquette: [
      "Berpakaian sopan dan tertutup saat memasuki area perkampungan adat dan situs pemakaman.",
      "Minta izin sebelum mengambil foto patung Tau-Tau atau anggota keluarga yang sedang melangsungkan ritual.",
      "Gunakan bahasa tubuh yang santun saat berbincang dengan pemuka adat (Ne' Tomina)."
    ],
    transportationGuide: "Penerbangan ke Bandara Bua Palopo (LLO) atau Bandara Toraja (TRT) dari Makassar, atau perjalanan darat eksotis 7-8 jam dari Makassar via Trans-Sulawesi.",
    gallery: ASSET_IMAGES.destinations.toraja.gallery,
    relatedPackages: ["toraja-heritage"],
    faq: [
      {
        question: "Apakah wisatawan boleh menyaksikan upacara adat Rambu Solo?",
        answer: "Boleh sekali dan sangat disambut, asalkan mengenakan pakaian berwarna gelap/sopan dan membawa cinderamata rokok/gula sebagai bentuk penghormatan adat."
      }
    ]
  },
  {
    id: "wakatobi",
    name: "Wakatobi",
    region: "Sulawesi",
    province: "Sulawesi Tenggara",
    subtitle: "Surga Karang Segitiga Karang Dunia & Suku Laut Bajo",
    shortDescription: "750 spesies karang laut dunia, berenang bersama lumba-lumba liar Wangi-Wangi, dan keajaiban Desa Terapung Mola.",
    description: "Taman Nasional Kepulauan Wakatobi (Wangi-Wangi, Kaledupa, Tomia, Binongko) merupakan jantung segitiga terumbu karang dunia dengan visibilitas air sejernih akuarium raksasa.",
    fullDescription: "Wakatobi adalah kiblat impian bagi para pecinta bahari dan penyelam di seluruh dunia. Berada di laut Banda yang kaya nutrisi, Anda akan menyaksikan 750 dari total 850 spesies koral dunia, kawanan lumba-lumba liar yang menari saat fajar, dan kehidupan harmonis suku penjelajah laut Bajo di perkampungan terapung Mola.",
    image: ASSET_IMAGES.destinations.wakatobi.primary,
    fallbackImage: ASSET_IMAGES.destinations.wakatobi.fallback,
    packageCount: 1,
    startingPrice: 4250000,
    tags: ["Diving", "Snorkeling", "Baharai", "Luxury"],
    travelStyles: ["Diving", "Pantai", "Adventure"],
    travelStyle: ["Diving", "Pantai", "Adventure"],
    bestTime: "Maret - Mei & September - November (Visibilitas Bawah Laut Terbaik)",
    durationRecommendation: "4 Hari 3 Malam",
    recommendedDuration: "4 Hari 3 Malam",
    estimatedBudget: "Rp 4.000.000 - Rp 7.500.000 / orang",
    comfortLevel: "Petualangan Bahari Sangat Memuaskan",
    highlights: [
      "Snorkeling & diving di terumbu karang warna-warni kelas dunia Pulau Hoga",
      "Menyapa puluhan lumba-lumba hidung botol berenang liar saat fajar di Selat Wangi-Wangi",
      "Mengunjungi Kampung Terapung Bajo Mola dan melihat keahlian menyelam bebas suku laut",
      "Sunset jingga magis dari Puncak Kahianga di Pulau Tomia",
      "Berenang di air jernih Goa Kontamale yang terbentuk dari batuan karst purba"
    ],
    attractions: [
      "Pulau Hoga Coral Gardens",
      "Dolphin Watching Wangi-Wangi",
      "Desa Adat Suku Bajo Mola",
      "Puncak Tomia & Mari Mabuk Dive Site",
      "Goa Karst Kontamale"
    ],
    recommendedPlaces: [
      "Pulau Hoga (Surga Snorkeling Pantai Pasir Putih Bertekstur Tepung)",
      "Perairan Mola (Dolphin Watching Liar di Laut Bebas)",
      "Tomia Reef (Dinding Karang Terkaya di Asia Pasifik)",
      "Kampung Bajo Mola (Komunitas Rumah Panggung Terapung Suku Laut)",
      "Pantai Cemara & Sombu Dive (Sunset & Spot Relaksasi)"
    ],
    thingsToDo: [
      "Snorkeling bersama ribuan ikan karang warna-warni tepat 5 meter dari bibir pantai",
      "Berlayar mengejar kawanan lumba-lumba yang melompat lincah di samping perahu",
      "Berbincang hangat dengan nelayan tradisional suku Bajo tentang kearifan menjaga laut",
      "Mencicipi olahan ikan bakar segar tangkapan hari itu berlumur dabu-dabu lokal"
    ],
    weatherDetails: "Iklim tropis maritim dengan suhu 27°C–31°C, visibilitas air laut mencapai 25 hingga 35 meter yang sangat jernih.",
    localCuisine: [
      { name: "Kasuami", desc: "Makanan pokok khas Wakatobi dari singkong parut kukus berbentuk kerucut, gurih alami pengganti nasi." },
      { name: "Ikan Parende", desc: "Sup ikan kuah asam segar kaya kunyit, daun kedondong, dan cabai rawit pedas nikmat." },
      { name: "Gohu Ikan Segar", desc: "Ikan tuna segar dipotong dadu disiram perasan jeruk limau, minyak kelapa hangat, dan kenari sangrai." }
    ],
    culturalEtiquette: [
      "Jangan menginjak atau mengambil pecahan terumbu karang hidup.",
      "Gunakan sunscreen ramah terumbu karang (reef-safe sunscreen).",
      "Hormati adat istiadat warga desa terapung Bajo saat berkunjung."
    ],
    transportationGuide: "Terbang ke Bandara Matahora Wangi-Wangi (WNI) via Makassar (UPG) atau Kendari (KDI), dilanjutkan speedboat antar-pulau berlisensi.",
    gallery: ASSET_IMAGES.destinations.wakatobi.gallery,
    relatedPackages: ["wakatobi-expedition"],
    faq: [
      {
        question: "Apakah orang yang tidak bisa berenang bisa snorkeling di Wakatobi?",
        answer: "Bisa sekali! Kami menyediakan life jacket berstandar internasional dan pemandu lokal yang mendampingi di air secara privat."
      }
    ]
  },
  {
    id: "karimunjawa",
    name: "Karimunjawa",
    region: "Jawa",
    province: "Jawa Tengah",
    subtitle: "Kepulauan Tropis Tersembunyi Laut Jawa",
    shortDescription: "27 gugusan pulau karang eksotis, penangkaran hiu jinak Menjangan Kecil, dan pantai pasir putih berair toska.",
    description: "Surga bahari tropis di utara Pulau Jawa dengan pantai pasir putih halus, terumbu karang yang terjaga, serta atmosfer pulau nelayan yang santai dan ramah kantong.",
    fullDescription: "Kepulauan Karimunjawa di Kabupaten Jepara adalah jawaban bagi Anda yang mendambakan pelarian tropis tanpa harus terbang jauh ke timur Indonesia. Jelajahi pulau tak berpenghuni, rasakan sensasi berenang bersama bayi hiu jinak di Menjangan Kecil, dan nikmati kelapa muda di Pantai Bobby berlatar ayunan pantai.",
    image: ASSET_IMAGES.destinations.karimunjawa.primary,
    fallbackImage: ASSET_IMAGES.destinations.karimunjawa.fallback,
    packageCount: 1,
    startingPrice: 1750000,
    tags: ["Pantai", "Snorkeling", "Healing", "Keluarga"],
    travelStyles: ["Pantai", "Healing", "Family", "Adventure"],
    travelStyle: ["Pantai", "Healing", "Family", "Adventure"],
    bestTime: "April - Oktober (Laut Jawa sangat tenang dan teduh)",
    durationRecommendation: "3 Hari 2 Malam",
    recommendedDuration: "3 Hari 2 Malam",
    estimatedBudget: "Rp 1.500.000 - Rp 3.000.000 / orang",
    comfortLevel: "Sangat Santai & Menyenangkan",
    highlights: [
      "Island hopping perahu wisata ke Pulau Cilik dan Pulau Menjangan Besar",
      "Sensasi berenang dan foto bersama hiu karang jinak di kolam konservasi Menjangan",
      "Snorkeling terumbu karang warna-warni dan anemon ikan badut Nemo di Spot Maer",
      "Menyantap BBQ ikan bakar segar di pantai pasir putih pulau tak berpenghuni",
      "Menyaksikan matahari terbenam spektakuler dari atas Bukit Love atau Pantai Tanjung Gelam"
    ],
    attractions: [
      "Pulau Menjangan Kecil & Besar",
      "Pantai Tanjung Gelam (Kelapa Miring)",
      "Pantai Bobby & Ayunan Laut",
      "Spot Snorkeling Nemo Maer",
      "Bukit Love Karimunjawa"
    ],
    recommendedPlaces: [
      "Pulau Menjangan Kecil (Spot Penangkaran Hiu & Pasir Putih)",
      "Pantai Tanjung Gelam (Spot Sunset Terbaik dengan Nyiur Melengkung)",
      "Pulau Cilik (Air Toska Sebening Kristal & Ikan Badut)",
      "Pantai Bobby (Pantai Tenang Menghadap Samudra dengan Suasana Rindang)",
      "Bukit Love (Spot Foto Gardu Pandang Huruf Raksasa Menghadap Gugusan Pulau)"
    ],
    thingsToDo: [
      "Berenang snorkeling melihat ikan badut Nemo bersembunyi di anemon laut",
      "Bakar ikan kakap segar di atas pasir pantai pulau terpencil untuk makan siang",
      "Menyewa motor matic mengelilingi jalanan pulau yang lengang dan asri",
      "Menikmati jagung bakar dan kopi hangat di Alun-Alun Karimunjawa saat malam hari"
    ],
    weatherDetails: "Suhu udara tropis 28°C–32°C dengan semilir angin laut yang menenangkan dan laut tenang sepanjang musim kemarau.",
    localCuisine: [
      { name: "Pindang Serani", desc: "Sup ikan laut segar kuah bening rasa gurih asam pedas rempah belimbing wuluh." },
      { name: "Ikan Bakar Bumbu Karimun", desc: "Ikan kakap atau kerapu segar dibakar arang batok kelapa dengan olesan bumbu kecap pedas gurih." },
      { name: "Bakso Ikan Ekor Kuning", desc: "Bakso kenyal lembut dari daging ikan laut asli tanpa bahan pengawet." }
    ],
    culturalEtiquette: [
      "Jaga kelestarian terumbu karang dengan tidak menginjak karang saat snorkeling.",
      "Selalu gunakan pelampung saat beraktivitas di laut terbuka.",
      "Gunakan pakaian yang sopan saat berada di perkampungan warga lokal."
    ],
    transportationGuide: "Menyeberang dengan Kapal Cepat Express Bahari (2 jam) atau KMP Siginjai dari Pelabuhan Kartini Jepara, Jawa Tengah.",
    gallery: ASSET_IMAGES.destinations.karimunjawa.gallery,
    relatedPackages: ["karimunjawa-getaway"],
    faq: [
      {
        question: "Apakah aman berenang bersama hiu di Menjangan?",
        answer: "Sangat aman. Jenis hiu karang sirip hitam (blacktip reef shark) ini sudah terbiasa dengan manusia dan selalu dipandu oleh pawang konservasi berpengalaman."
      }
    ]
  },
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
    durationCategory: "medium",
    travelStyle: "Pantai",
    travelStyleLabel: "Pantai & Healing",
    badge: "Best Seller",
    featured: true,
    price: 3450000,
    formattedPrice: "Rp 3.450.000",
    rating: 4.9,
    reviewCount: 148,
    heroImage: ASSET_IMAGES.packages.baliEscape.hero,
    fallbackImage: ASSET_IMAGES.packages.baliEscape.fallback,
    gallery: ASSET_IMAGES.packages.baliEscape.gallery,
    shortDescription: "Nikmati kedamaian pedesaan Ubud, sunset tepi tebing Uluwatu, dan petualangan menyeberang ke formasi tebing ikonik Kelingking Beach.",
    overview: "Paket Bali Escape 4D3N dirancang khusus untuk Anda yang mendambakan liburan seimbang: relaksasi di resor bernuansa asri, sentuhan budaya Bali yang sakral, serta momen foto memukau di Nusa Penida. Seluruh transportasi menggunakan armada privat ber-AC dengan pendamping lokal ramah.",
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
        title: "Kedatangan Bandara, Check-in & Sunset Tari Kecak Uluwatu",
        location: "Kuta, Jimbaran & Uluwatu",
        meals: "Makan Malam (Jimbaran Seafood Candlelight)",
        accommodation: "Hotel Bintang 4 Pilihan di Seminyak",
        activities: [
          { time: "12:00 - 13:30", activity: "Penjemputan di Bandara I Gusti Ngurah Rai (DPS) oleh tim driver privat FADZA TRIP ADVENTURE dengan kalungan bunga sambutan" },
          { time: "14:00 - 15:30", activity: "Perjalanan menuju hotel di kawasan Seminyak, proses check-in kamar dan waktu istirahat menyegarkan diri" },
          { time: "16:00 - 18:30", activity: "Menuju Pura Luhur Uluwatu di atas tebing karang samudra setinggi 70 meter, menyaksikan pementasan Tari Kecak Fire Dance saat matahari terbenam" },
          { time: "19:30 - 21:00", activity: "Santap malam romantis Candlelight Seafood Dinner di tepi Pantai Jimbaran dengan deburan ombak malam" },
          { time: "21:30", activity: "Diantar kembali ke hotel untuk beristirahat" }
        ]
      },
      {
        day: 2,
        title: "Penyeberangan Fast Boat & Eksplorasi Tebing Barat Nusa Penida",
        location: "Nusa Penida Island",
        meals: "Sarapan Hotel, Makan Siang Lokal",
        accommodation: "Hotel Bintang 4 Pilihan di Seminyak",
        activities: [
          { time: "06:30 - 07:15", activity: "Sarapan pagi di hotel dan persiapan berangkat menuju Pelabuhan Sanur" },
          { time: "07:45 - 08:30", activity: "Boarding dan penyeberangan fast boat cepat ber-AC melintasi Selat Badung menuju Pelabuhan Nusa Penida" },
          { time: "09:00 - 11:30", activity: "Tiba di Nusa Penida, eksplorasi tebing dinosaurus legendaris Kelingking Beach dan gardu pandang samudra" },
          { time: "12:00 - 13:00", activity: "Makan siang kuliner khas lokal di restoran setempat" },
          { time: "13:30 - 15:30", activity: "Mengunjungi keajaiban alam terowongan karang Broken Beach (Pasih Uug) dan kolam alami Angel's Billabong" },
          { time: "16:00 - 17:00", activity: "Kembali ke pelabuhan dan menyeberang fast boat kembali ke Pelabuhan Sanur daratan Bali" },
          { time: "17:30 - 19:00", activity: "Diantar kembali ke hotel dan waktu bebas menikmati suasana malam Seminyak" }
        ]
      },
      {
        day: 3,
        title: "Keasrian Budaya Ubud, Sawah Tegalalang & Monkey Forest",
        location: "Ubud & Gianyar",
        meals: "Sarapan Hotel, Makan Siang Bebek Crispy",
        accommodation: "Hotel Bintang 4 Pilihan di Seminyak",
        activities: [
          { time: "08:30 - 10:00", activity: "Sarapan santai di hotel, penjemputan mobil privat ber-AC menuju kawasan perbukitan Ubud" },
          { time: "10:30 - 12:30", activity: "Menjelajahi keindahan sawah berundak bertingkat Tegalalang Rice Terrace dan mencoba wahana ayunan Bali Swing" },
          { time: "13:00 - 14:15", activity: "Makan siang hidangan kuliner Bebek Goreng Crispy khas Ubud di restoran bernuansa taman asri" },
          { time: "14:30 - 16:30", activity: "Berjalan di bawah naungan pohon rindang Sacred Monkey Forest Sanctuary dan Pasar Seni Seni Tradisional Ubud" },
          { time: "17:00 - 18:30", activity: "Jalan santai sore di punggung bukit hijau Campuhan Ridge Walk menikmati hawa sejuk" },
          { time: "19:00", activity: "Perjalanan pulang santai menuju hotel" }
        ]
      },
      {
        day: 4,
        title: "Relaksasi Pagi, Berburu Cinderamata & Pengantaran Bandara",
        location: "Kuta, Tuban & Bandara",
        meals: "Sarapan Hotel",
        accommodation: "Selesai (Kepulangan)",
        activities: [
          { time: "08:00 - 10:30", activity: "Sarapan pagi santai, menikmati fasilitas kolam renang hotel dan proses check-out kamar" },
          { time: "11:00 - 12:30", activity: "Mampir berbelanja cinderamata khas Bali di pusat oleh-oleh Krisna / Pabrik Kata-Kata Joger" },
          { time: "13:00 - 14:30", activity: "Makan siang santai (opsional) sebelum menuju bandara" },
          { time: "14:30 - 15:30", activity: "Pengantaran tiba di Bandara Internasional I Gusti Ngurah Rai (DPS) untuk penerbangan kepulangan ke kota asal" }
        ]
      }
    ],
    included: [
      "Akomodasi 3 malam di hotel bintang 4 pilihan (Twin/Double Share) dengan sarapan setiap hari",
      "Tiket Fast Boat PP Sanur - Nusa Penida berlisensi resmi dan asuransi pelayaran",
      "Armada mobil privat ber-AC selama tour berlangsung (Mobil + Driver + Bahan Bakar)",
      "Tiket masuk seluruh objek wisata sesuai program itinerary",
      "Tiket VIP pertunjukan Tari Kecak Fire Dance di Pura Uluwatu",
      "1x Candlelight Dinner Seafood di tepi Pantai Jimbaran",
      "Air mineral dingin tersedia di dalam armada selama perjalanan"
    ],
    excluded: [
      "Tiket pesawat PP dari dan menuju Denpasar Bali",
      "Pengeluaran pribadi (laundry, minibar hotel, belanja suvenir)",
      "Tipping sukarela untuk driver / local guide"
    ],
    importantInfo: [
      "Meeting point penjemputan resmi di Bandara Ngurah Rai (DPS) atau hotel area Kuta/Seminyak/Sanur.",
      "Membawa pakaian santai berbahan tipis, baju renang, kacamata hitam, serta tabir surya (sunblock).",
      "Sepatu sneakers atau sandal gunung sangat disarankan untuk trekking tangga di Nusa Penida."
    ],
    faq: [
      {
        question: "Apakah jadwal perjalanan bisa disesuaikan?",
        answer: "Tentu bisa! Seluruh tur bersifat privat sehingga jam penjemputan dan aktivitas harian dapat disesuaikan dengan kenyamanan rombongan Anda."
      }
    ]
  },
  {
    id: "lombok-adventure",
    slug: "lombok-tropical-escape-3d2n",
    name: "Lombok Tropical Escape & Gili",
    tagline: "Pesona Pasir Merica Tanjung Aan, Bukit Merese & Trio Gili",
    destination: "Lombok",
    destinationId: "lombok",
    duration: "3 Hari 2 Malam",
    durationDays: 3,
    durationNights: 2,
    durationCategory: "short",
    travelStyle: "Pantai",
    travelStyleLabel: "Pantai & Eksotis",
    badge: "Popular Choice",
    featured: true,
    price: 2950000,
    formattedPrice: "Rp 2.950.000",
    rating: 4.8,
    reviewCount: 78,
    heroImage: ASSET_IMAGES.packages.lombokAdventure.hero,
    fallbackImage: ASSET_IMAGES.packages.lombokAdventure.fallback,
    gallery: ASSET_IMAGES.packages.lombokAdventure.gallery,
    shortDescription: "Trekking bukit hijau Merese, island hopping snorkeling penyu di Gili Trawangan, dan tenun tradisional Desa Sade.",
    overview: "Jelajahi keindahan alami Pulau Lombok bersama FADZA TRIP ADVENTURE. Dari deburan ombak samudra selatan di Pantai Tanjung Aan dan Bukit Merese, hingga perairan tenang Trio Gili yang bebas dari asap kendaraan bermotor.",
    highlights: [
      "Sunset menawan di atas Bukit Merese memandang Samudra Hindia",
      "Island hopping Trio Gili: snorkeling patung bawah laut Gili Meno dan penyu Gili Trawangan",
      "Keunikan budaya suku Sasak di Desa Adat Sade berlantai tanah liat",
      "Kuliner Ayam Taliwang asli dengan sambal plecing kangkung khas Lombok",
      "Akomodasi hotel tepi pantai bintang 4 di kawasan Senggigi / Kuta Lombok"
    ],
    itinerary: [
      {
        day: 1,
        title: "Kedatangan Bandara, Desa Tenun Sade, Pantai Tanjung Aan & Sunset Merese",
        location: "Lombok Selatan",
        meals: "Makan Siang & Makan Malam Kuliner Taliwang",
        accommodation: "Hotel Bintang 4 di Kawasan Kuta / Senggigi",
        activities: [
          { time: "09:00 - 10:00", activity: "Penjemputan di Bandara Internasional Lombok (LOP) oleh tim FADZA TRIP ADVENTURE dengan kalungan selendang tenun Sasak" },
          { time: "10:30 - 12:00", activity: "Mengunjungi Desa Adat Sade suku Sasak, melihat arsitektur rumah tradisional dari bambu dan proses tenun ikat" },
          { time: "12:30 - 13:45", activity: "Santap siang kuliner khas Ayam Taliwang bumbu rempah bakar dan plecing kangkung pedas segar" },
          { time: "14:15 - 16:00", activity: "Menikmati keunikan butiran pasir bulat seperti merica dan ombak tenang di Pantai Tanjung Aan" },
          { time: "16:30 - 18:30", activity: "Trekking santai bukit rumput savana Bukit Merese menyaksikan panorama matahari terbenam di atas samudra" },
          { time: "19:00 - 20:30", activity: "Makan malam lokal dan check-in hotel untuk beristirahat" }
        ]
      },
      {
        day: 2,
        title: "Speedboat Island Hopping Snorkeling Trio Gili (Trawangan, Meno, Air)",
        location: "Gili Islands (Trawangan, Meno, Air)",
        meals: "Sarapan Hotel, Makan Siang di Gili",
        accommodation: "Hotel Bintang 4 di Kawasan Kuta / Senggigi",
        activities: [
          { time: "08:00 - 09:15", activity: "Sarapan pagi di hotel dan perjalanan darat pesisir indah menuju Pelabuhan Teluk Nare" },
          { time: "09:30 - 12:00", activity: "Naik private boat snorkeling menuju spot patung bawah laut karya seniman dunia di Gili Meno dan spot koral Gili Air" },
          { time: "12:30 - 14:00", activity: "Mendarat di Gili Trawangan, santap siang di restoran tepi pantai berpasir putih" },
          { time: "14:15 - 16:30", activity: "Waktu bebas bersepeda keliling pulau Gili Trawangan tanpa polusi kendaraan bermotor atau bersantai di kafe pantai" },
          { time: "17:00 - 18:00", activity: "Speedboat kembali menuju pulau utama Lombok dan diantar kembali ke hotel" }
        ]
      },
      {
        day: 3,
        title: "Pusat Mutiara Lombok, Cinderamata & Pengantaran Bandara",
        location: "Mataram & Bandara Lombok",
        meals: "Sarapan Hotel",
        accommodation: "Selesai (Kepulangan)",
        activities: [
          { time: "08:30 - 10:00", activity: "Sarapan pagi di hotel, bersantai di kolam renang dan proses check-out kamar" },
          { time: "10:30 - 12:30", activity: "Mengunjungi pusat budidaya mutiara air laut asli Lombok, suvenir kaos Lombok, dan madu Sumbawa" },
          { time: "13:00 - 14:30", activity: "Pengantaran tiba di Bandara Internasional Lombok (LOP) untuk penerbangan kembali ke kota asal" }
        ]
      }
    ],
    included: [
      "Hotel 2 malam di hotel bintang 4 pilihan dengan sarapan pagi",
      "Armada mobil privat ber-AC selama tour berlangsung (Mobil + Driver + Bahan Bakar)",
      "Private Boat untuk tur island hopping snorkeling 3 Gili",
      "Peralatan snorkeling lengkap (Masker, Fin, Pelampung) + Pemandu Snorkeling",
      "Tiket masuk seluruh objek wisata dan donasi desa adat Sade",
      "Makan sesuai jadwal itinerary"
    ],
    excluded: [
      "Tiket pesawat PP menuju Lombok",
      "Sewa sepeda santai atau kereta kuda Cidomo di Gili Trawangan",
      "Pengeluaran belanja pribadi dan tipping sukarela"
    ],
    importantInfo: [
      "Meeting point penjemputan di Bandara Internasional Lombok (LOP).",
      "Bawa pakaian ganti dan pakaian renang untuk hari kedua saat tur perahu ke Gili."
    ],
    faq: [
      {
        question: "Apakah aman bagi yang belum pernah snorkeling?",
        answer: "Sangat aman! Kami menyediakan pelampung keselamatan dan pemandu lokal kami selalu mendampingi peserta di dalam air."
      }
    ]
  },
  {
    id: "labuan-bajo-phinisi",
    slug: "labuan-bajo-explorer-3d2n",
    name: "Labuan Bajo Explorer & Phinisi",
    tagline: "Sensasi Liveaboard Phinisi Mengarungi Pulau Purba Komodo",
    destination: "Labuan Bajo",
    destinationId: "labuan-bajo",
    duration: "3 Hari 2 Malam",
    durationDays: 3,
    durationNights: 2,
    durationCategory: "short",
    travelStyle: "Adventure",
    travelStyleLabel: "Petualangan & Bahari",
    badge: "Most Popular",
    featured: true,
    price: 4950000,
    formattedPrice: "Rp 4.950.000",
    rating: 5.0,
    reviewCount: 96,
    heroImage: ASSET_IMAGES.packages.labuanBajoPhinisi.hero,
    fallbackImage: ASSET_IMAGES.packages.labuanBajoPhinisi.fallback,
    gallery: ASSET_IMAGES.packages.labuanBajoPhinisi.gallery,
    shortDescription: "Berlayar dengan kapal Phinisi ber-AC, trekking panorama Bukit Padar, menjumpai Komodo Dragon, dan berenang bersama Manta Ray.",
    overview: "Rasakan puncak liburan bahari di Indonesia dengan menginap di atas kapal Phinisi semi-luxury FADZA. Jelajahi pulau-pulau vulkanik purba di Taman Nasional Komodo, snorkeling di atas terumbu karang warna-warni, serta nikmati matahari terbenam spektakuler langsung dari dek kapal di tengah perairan Flores.",
    highlights: [
      "Menginap 3D2N di atas kapal Phinisi ber-AC dengan kabin privat bernuansa kayu",
      "Trekking sunrise ke puncak Pulau Padar dengan pemandangan 3 teluk legendaris",
      "Perjumpaan aman dengan Komodo Dragon dipandu ranger profesional di Pulau Rinca",
      "Berenang bersama pari manta raksasa di Manta Point dan bersantai di Pink Beach",
      "Koki kapal privat menyajikan hidangan laut segar full-board selama pelayaran"
    ],
    itinerary: [
      {
        day: 1,
        title: "Penjemputan Bandara, Boarding Phinisi, Pulau Kelor & Sunset Kalong",
        location: "Pelabuhan Marina, Pulau Kelor & Pulau Kalong",
        meals: "Makan Siang & Makan Malam di Kapal",
        accommodation: "Kabin Privat Ber-AC Kapal Phinisi",
        activities: [
          { time: "09:30 - 10:30", activity: "Penjemputan di Bandara Komodo (LBJ) atau hotel Labuan Bajo menuju pelabuhan marina" },
          { time: "11:00 - 11:45", activity: "Proses boarding kapal Phinisi, perkenalan kapten kapal dan kru, pembagian kabin kamar dan welcome drink segar" },
          { time: "12:00 - 14:00", activity: "Berlayar santai menuju Pulau Kelor sambil menikmati santap siang masakan koki kapal" },
          { time: "14:15 - 16:30", activity: "Trekking bukit piramida Pulau Kelor dan snorkeling di terumbu karang Pulau Manjarite" },
          { time: "17:30 - 19:00", activity: "Kapal lego jangkar di Pulau Kalong, menyaksikan parade ribuan kelelawar terbang melintasi langit senja jingga" },
          { time: "19:30 - 21:00", activity: "Santap malam seafood segar di dek terbuka di bawah taburan jutaan bintang malam" }
        ]
      },
      {
        day: 2,
        title: "Golden Sunrise Bukit Padar, Pink Beach, Naga Komodo & Manta Point",
        location: "Pulau Padar, Komodo & Taka Makassar",
        meals: "Sarapan, Makan Siang & Makan Malam di Kapal",
        accommodation: "Kabin Privat Ber-AC Kapal Phinisi",
        activities: [
          { time: "05:00 - 07:30", activity: "Morning trekking menaiki anak tangga bukit Pulau Padar menyaksikan Golden Sunrise spektakuler 3 teluk" },
          { time: "08:30 - 10:30", activity: "Bermain air dan berfoto di hamparan pasir merah muda alami Pink Beach" },
          { time: "11:00 - 13:00", activity: "Trekking di habitat asli Komodo Dragon dipandu Jagawana (ranger) profesional bersertifikat" },
          { time: "13:30 - 15:30", activity: "Makan siang di kapal dan sesi snorkeling berenang bersama pari manta raksasa di Manta Point" },
          { time: "16:00 - 17:30", activity: "Singgah di pulau pasir timbul Taka Makassar yang berada di tengah perairan laut toska" },
          { time: "19:30 - 21:00", activity: "Makan malam santai dan karaoke di ruang keluarga kapal Phinisi" }
        ]
      },
      {
        day: 3,
        title: "Snorkeling Pulau Kanawa, Berlayar Kembali & Pengantaran Bandara",
        location: "Pulau Kanawa & Labuan Bajo",
        meals: "Sarapan & Makan Siang di Kapal",
        accommodation: "Selesai (Kepulangan)",
        activities: [
          { time: "07:30 - 09:30", activity: "Snorkeling pagi di perairan tenang Pulau Kanawa yang kaya akan ikan badut (Nemo) dan bintang laut" },
          { time: "10:00 - 12:00", activity: "Kapal Phinisi berlayar kembali menuju Pelabuhan Labuan Bajo sambil santap siang perpisahan" },
          { time: "12:30 - 14:00", activity: "Check-out dari kapal, mampir ke toko oleh-oleh khas Flores dan pengantaran ke Bandara Komodo (LBJ)" }
        ]
      }
    ],
    included: [
      "Liveaboard 3 Hari 2 Malam di Kapal Phinisi kabin privat ber-AC",
      "Full-board meals (Sarapan, Makan Siang, Makan Malam) olahan koki kapal",
      "Alat snorkeling lengkap (Masker, Snorkel, Fin) dan pelampung",
      "Dokumentasi foto kamera mirrorless dan video drone udara",
      "Kopi, teh, air mineral dingin, dan snack buah segar sepanjang hari",
      "Pemandu tur berlisensi dan ranger Taman Nasional Komodo",
      "Antar-jemput privat dari dan ke Bandara Komodo / Hotel Labuan Bajo"
    ],
    excluded: [
      "Tiket pesawat PP menuju Labuan Bajo (LBJ)",
      "Tiket retribusi Taman Nasional Komodo",
      "Tipping sukarela untuk kapten dan kru kapal Phinisi"
    ],
    importantInfo: [
      "Jadwal pelayaran phinisi rutin berangkat setiap hari Jumat pagi dan berakhir Minggu siang.",
      "Seluruh kabin dilengkapi penyejuk udara (AC) dan stopkontak listrik 24 jam.",
      "Harap tidak menyentuh karang atau satwa laut saat sesi snorkeling."
    ],
    faq: [
      {
        question: "Apakah tersedia listrik untuk charge kamera di kapal?",
        answer: "Ya, kapal dilengkapi generator listrik beroperasi 24 jam dengan stopkontak standar di setiap kabin kamar tidur."
      }
    ]
  },
  {
    id: "raja-ampat-ultimate",
    slug: "raja-ampat-discovery-5d4n",
    name: "Raja Ampat Discovery",
    tagline: "Mahakarya Bahari Piaynemo, Laguna Bintang & Karst Dunia",
    destination: "Raja Ampat",
    destinationId: "raja-ampat",
    duration: "5 Hari 4 Malam",
    durationDays: 5,
    durationNights: 4,
    durationCategory: "long",
    travelStyle: "Adventure",
    travelStyleLabel: "Eksklusif & Nature",
    badge: "Signature Trip",
    featured: true,
    price: 9250000,
    formattedPrice: "Rp 9.250.000",
    rating: 5.0,
    reviewCount: 52,
    heroImage: ASSET_IMAGES.packages.rajaAmpatUltimate.hero,
    fallbackImage: ASSET_IMAGES.packages.rajaAmpatUltimate.fallback,
    gallery: ASSET_IMAGES.packages.rajaAmpatUltimate.gallery,
    shortDescription: "Gugusan karst zamrud Piaynemo, Laguna Bintang, keanekaragaman terumbu karang dunia, dan kedamaian pulau tropis tak terjamah.",
    overview: "Raja Ampat adalah impian setiap penjelajah sejati. Dengan paket Ultimate Paradise 5D4N, Anda diajak mengarungi perairan surga di Papua Barat Daya, menaiki bukit Piaynemo yang melegenda, berenang di Pasir Timbul Mansuar, serta menginap di eco-resort tepi pantai dengan pemandangan langsung ke lautan bening.",
    highlights: [
      "Gardu pandang spektakuler Piaynemo dan Teluk Bintang",
      "Snorkeling kelas dunia di Yenbuba Jetty & Sauwandarek Village",
      "Ketenangan hamparan Pasir Timbul di tengah lautan Mansuar",
      "Birdwatching burung Cendrawasih merah di hutan Sawinggrai",
      "Akomodasi resort tepi pantai dengan pemandangan samudra sebening kaca"
    ],
    itinerary: [
      {
        day: 1,
        title: "Penjemputan Sorong, Kapal Cepat VIP ke Waisai & Check-in Eco Resort",
        location: "Kota Sorong & Waisai Raja Ampat",
        meals: "Makan Siang & Makan Malam Resort",
        accommodation: "Eco-Resort Tepi Laut Waisai / Mansuar",
        activities: [
          { time: "08:00 - 09:30", activity: "Penjemputan di Bandara DEO Sorong (SOQ) dan sarapan pagi lokal khas Papua" },
          { time: "10:00 - 12:30", activity: "Penyeberangan menggunakan kapal cepat Express VIP melintasi Selat Dampier menuju Waisai" },
          { time: "13:00 - 14:30", activity: "Tiba di dermaga Waisai, diantar ke Eco-Resort tepi laut, welcome drink dan santap siang hidangan laut" },
          { time: "15:30 - 17:30", activity: "Snorkeling santai di terumbu karang house reef tepat di depan balkon penginapan" },
          { time: "19:00 - 21:00", activity: "Santap malam bersama di restoran tepi pantai mendengarkan deburan ombak" }
        ]
      },
      {
        day: 2,
        title: "Mahakarya Piaynemo, Laguna Bintang, Teluk Kabui & Batu Pensil",
        location: "Kawasan Karst Piaynemo & Kabui",
        meals: "Sarapan, Makan Siang Kotak, Makan Malam",
        accommodation: "Eco-Resort Tepi Laut Waisai / Mansuar",
        activities: [
          { time: "07:30 - 09:30", activity: "Speedboat tour mengarungi lautan jernih menuju kawasan gugusan karst Piaynemo" },
          { time: "09:30 - 11:30", activity: "Trekking tangga kayu ke gardu pandang Piaynemo dan Teluk Bintang berfoto dengan panorama karst dunia" },
          { time: "12:00 - 13:30", activity: "Santap siang piknik di pulau karang terpencil berpasir putih halus" },
          { time: "14:00 - 16:30", activity: "Eksplorasi formasi tebing Batu Pensil di Teluk Kabui dan snorkeling dinding karang" },
          { time: "17:30", activity: "Kembali ke resort untuk beristirahat dan menikmati matahari terbenam" }
        ]
      },
      {
        day: 3,
        title: "Snorkeling Yenbuba Jetty, Pasir Timbul Mansuar & Desa Arborek",
        location: "Mansuar & Arborek Island",
        meals: "Sarapan, Makan Siang, Makan Malam",
        accommodation: "Eco-Resort Tepi Laut Waisai / Mansuar",
        activities: [
          { time: "08:00 - 10:30", activity: "Snorkeling di dermaga Yenbuba Jetty yang dipenuhi kawanan ikan napoleon dan terumbu karang sehat" },
          { time: "11:00 - 13:00", activity: "Bersantai di Pasir Timbul Mansuar dengan hamparan pasir putih lembut di tengah laut biru toska" },
          { time: "13:30 - 16:00", activity: "Mengunjungi Desa Wisata Arborek, melihat kerajinan anyaman topi pari manta dan interaksi hangat bersama anak-anak desa" },
          { time: "16:30 - 18:00", activity: "Perjalanan speedboat kembali ke resort saat senja" }
        ]
      },
      {
        day: 4,
        title: "Trekking Birdwatching Burung Cendrawasih & Relaksasi Tropis",
        location: "Hutan Sawinggrai & Resort",
        meals: "Sarapan, Makan Siang, Makan Malam",
        accommodation: "Eco-Resort Tepi Laut Waisai / Mansuar",
        activities: [
          { time: "05:30 - 08:30", activity: "Trekking subuh dipandu pemandu lokal mengamati tarian burung surga Cendrawasih merah di alam bebas" },
          { time: "09:00 - 12:00", activity: "Kembali ke resort, sarapan lezat dan waktu luang relaksasi" },
          { time: "13:00 - 17:00", activity: "Bermain perahu kayak kano atau snorkeling di perairan jernih depan kamar" },
          { time: "19:00 - 21:00", activity: "Santap malam barbeque ikan segar bakar perpisahan" }
        ]
      },
      {
        day: 5,
        title: "Penyeberangan Kembali ke Sorong, Belanja Oleh-Oleh & Bandara",
        location: "Waisai, Sorong & Bandara DEO",
        meals: "Sarapan Resort",
        accommodation: "Selesai (Kepulangan)",
        activities: [
          { time: "07:30 - 08:30", activity: "Sarapan pagi dan proses check-out resort menuju pelabuhan kapal cepat Waisai" },
          { time: "09:00 - 11:30", activity: "Penyeberangan kembali ke Sorong menggunakan kapal express VIP" },
          { time: "12:00 - 13:30", activity: "Mampir belanja suvenir dan Roti Abon Gulung khas Sorong" },
          { time: "14:00 - 15:30", activity: "Pengantaran tiba di Bandara Domine Eduard Osok (SOQ) Sorong untuk penerbangan kepulangan" }
        ]
      }
    ],
    included: [
      "Akomodasi 4 malam di Eco-Resort tepi laut pilihan di Raja Ampat",
      "Tiket kapal penyeberangan VIP Sorong - Waisai PP",
      "Sewa private speedboat selama tur antar pulau dengan nakhoda berpengalaman",
      "Semua makanan selama tur (Sarapan, Makan Siang, Makan Malam)",
      "Peralatan snorkeling standar dan pelampung keselamatan",
      "Pemandu lokal bersertifikat dan ranger pengamat burung Cendrawasih",
      "Antar-jemput privat di Sorong dan Waisai"
    ],
    excluded: [
      "Tiket pesawat PP menuju Kota Sorong (SOQ)",
      "Kartu Tarif Layanan Konservasi (PIN Raja Ampat)",
      "Pengeluaran pribadi & tipping kru"
    ],
    importantInfo: [
      "Meeting point di Bandara DEO Sorong (SOQ) maksimal pukul 08:30 WIT.",
      "PIN Konservasi Raja Ampat wajib dimiliki setiap wisatawan dan berlaku selama 1 tahun penuh.",
      "Bawa lotion anti serangga herbal dan obat pribadi."
    ],
    faq: [
      {
        question: "Apakah bisa untuk wisatawan yang tidak memiliki lisensi diving?",
        answer: "Bisa sekali! Keindahan bawah laut Raja Ampat sudah sangat memukau hanya dari permukaan dengan snorkeling tanpa perlu sertifikat diving."
      }
    ]
  },
  {
    id: "yogyakarta-heritage",
    slug: "yogyakarta-heritage-3d2n",
    name: "Yogyakarta Heritage Journey",
    tagline: "Megahnya Candi Bersejarah & Petualangan Sungai Bawah Tanah",
    destination: "Yogyakarta",
    destinationId: "yogyakarta",
    duration: "3 Hari 2 Malam",
    durationDays: 3,
    durationNights: 2,
    durationCategory: "short",
    travelStyle: "Culture",
    travelStyleLabel: "Budaya & Petualangan",
    badge: "Budget Friendly",
    featured: false,
    price: 1950000,
    formattedPrice: "Rp 1.950.000",
    rating: 4.8,
    reviewCount: 110,
    heroImage: ASSET_IMAGES.packages.yogyakartaHeritage.hero,
    fallbackImage: ASSET_IMAGES.packages.yogyakartaHeritage.fallback,
    gallery: ASSET_IMAGES.packages.yogyakartaHeritage.gallery,
    shortDescription: "Sunrise stupa Candi Borobudur, kemegahan Candi Prambanan, dan cave tubing menyusuri gua karst Goa Pindul.",
    overview: "Rasakan kehangatan budaya Jawa yang ramah dan adiluhung di Kota Istimewa Yogyakarta. Melangkah kembali ke masa lampau di pelataran Borobudur dan Prambanan, menikmati petualangan air tubing di gua stalaktit, serta meresapi malam syahdu Malioboro.",
    highlights: [
      "Tiket masuk Candi Borobudur dan Candi Prambanan warisan dunia UNESCO",
      "Cave tubing menyusuri sungai bawah tanah di Goa Pindul Gunungkidul",
      "Menyusuri lorong air sakral dan arsitektur kuno Taman Sari Keraton",
      "Makan siang prasmanan masakan ndeso Jawa di Kopi Klotok / Pawon Tembi",
      "Hotel modern nyaman di pusat kota dekat kawasan Malioboro"
    ],
    itinerary: [
      {
        day: 1,
        title: "Kedatangan Stasiun/Bandara, Candi Prambanan & Malioboro",
        location: "Sleman & Kota Yogya",
        meals: "Makan Siang & Makan Malam",
        accommodation: "Hotel Bintang 3/4 di Pusat Kota Yogya",
        activities: [
          { time: "08:30 - 10:00", activity: "Penjemputan di Bandara Internasional YIA Kulon Progo atau Stasiun Tugu Yogyakarta" },
          { time: "10:30 - 13:00", activity: "Mengagumi mahakarya relief kisah Ramayana di Candi Prambanan peninggalan abad ke-9" },
          { time: "13:30 - 14:30", activity: "Santap siang kuliner khas Gudeg Yu Djum autentik bumbu santan kental" },
          { time: "15:00 - 16:30", activity: "Proses check-in hotel dan istirahat santai sejenak" },
          { time: "18:30 - 21:00", activity: "Jalan santai menikmati malam Malioboro diiringi musisi jalanan dan kuliner angkringan kopi jos" }
        ]
      },
      {
        day: 2,
        title: "Golden Sunrise Borobudur & Cave Tubing Goa Pindul",
        location: "Magelang & Gunungkidul",
        meals: "Sarapan Hotel, Makan Siang Prasmanan Ndeso",
        accommodation: "Hotel Bintang 3/4 di Pusat Kota Yogya",
        activities: [
          { time: "05:00 - 08:30", activity: "Menuju bukit Punthuk Setumbu menyaksikan stupa Candi Borobudur diselimuti kabut pagi magis" },
          { time: "09:30 - 11:30", activity: "Sarapan pagi lokal dan perjalanan menuju kawasan karst Gunungkidul" },
          { time: "12:00 - 14:30", activity: "Petualangan cave tubing mengapung di ban menyusuri aliran air bawah tanah Goa Pindul dan rafting Sungai Oya" },
          { time: "15:30 - 17:30", activity: "Menikmati senja dari ketinggian HeHa Sky View dengan lanskap gemerlap kota Yogyakarta" },
          { time: "19:00", activity: "Makan malam santai dan kembali ke hotel" }
        ]
      },
      {
        day: 3,
        title: "Keraton Yogyakarta, Taman Sari & Belanja Bakpia",
        location: "Kota Yogya & Stasiun/Bandara",
        meals: "Sarapan Hotel",
        accommodation: "Selesai (Kepulangan)",
        activities: [
          { time: "08:30 - 10:30", activity: "Mengunjungi Taman Sari Water Castle dan spot masjid bawah tanah Sumur Gumuling" },
          { time: "11:00 - 12:30", activity: "Melihat langsung pembuatan Bakpia Kukus Tugu dan kain batik tulis khas Yogya" },
          { time: "13:00 - 14:30", activity: "Pengantaran kembali ke Stasiun Tugu / Bandara Internasional YIA untuk perjalanan kepulangan" }
        ]
      }
    ],
    included: [
      "Hotel 2 malam bintang 3/4 di pusat kota Yogyakarta (Twin Share)",
      "Mobil privat ber-AC selama tour berlangsung (Avanza/Innova/Hiace)",
      "Driver merangkap guide lokal yang ramah dan berpengalaman",
      "Tiket masuk Candi Borobudur, Candi Prambanan, dan Taman Sari",
      "Paket perlengkapan Cave Tubing Goa Pindul (Ban, Pelampung, Pemandu)",
      "Sarapan di hotel dan makan siang kuliner khas"
    ],
    excluded: [
      "Tiket kereta / pesawat menuju Yogyakarta",
      "Pengeluaran belanja pribadi dan tipping sukarela"
    ],
    importantInfo: [
      "Meeting point penjemputan gratis di Bandara YIA Kulon Progo atau Stasiun Tugu / Lempuyangan.",
      "Membawa pakaian ganti ekstra untuk aktivitas cave tubing di Goa Pindul."
    ],
    faq: [
      {
        question: "Apakah tiket Borobudur sudah termasuk naik ke struktur candi?",
        answer: "Tiket naik ke monumen candi mengikuti kuota harian resmi dari Balai Konservasi Borobudur."
      }
    ]
  },
  {
    id: "bromo-sunrise",
    slug: "bromo-sunrise-escape-2d1n",
    name: "Bromo Sunrise Escape",
    tagline: "Puncak Golden Sunrise Penanjakan & Safari Jeep Pasir Berbisik",
    destination: "Bromo & Malang",
    destinationId: "bromo",
    duration: "2 Hari 1 Malam",
    durationDays: 2,
    durationNights: 1,
    durationCategory: "short",
    travelStyle: "Adventure",
    travelStyleLabel: "Petualangan & Dingin",
    badge: "Weekend Getaway",
    featured: true,
    price: 1850000,
    formattedPrice: "Rp 1.850.000",
    rating: 4.9,
    reviewCount: 165,
    heroImage: ASSET_IMAGES.packages.bromoSunrise.hero,
    fallbackImage: ASSET_IMAGES.packages.bromoSunrise.fallback,
    gallery: ASSET_IMAGES.packages.bromoSunrise.gallery,
    shortDescription: "Sunrise magis di atas awan Penanjakan 1, melintasi Lautan Pasir dengan Jeep 4x4, dan mendaki kawah aktif Bromo.",
    overview: "Paket singkat namun sarat pengalaman tak terlupakan menembus kabut dingin Gunung Bromo. Saksikan momen ketika matahari pertama kali menyinari kaldera Tengger yang megah, menaiki tangga kawah aktif, dan berpose gagah di atas kap Jeep 4x4 di tengah Pasir Berbisik.",
    highlights: [
      "Menyaksikan Golden Sunrise spektakuler di gardu pandang Penanjakan 1 / King Kong Hill",
      "Sensasi berkendara Jeep Hardtop 4x4 melintasi lautan pasir vulkanik Tengger",
      "Trekking menaiki anak tangga menuju bibir kawah aktif Gunung Bromo",
      "Foto estetik di Savana Bukit Teletubbies yang hijau menyegarkan",
      "Termasuk penjemputan dari Malang / Surabaya dengan armada nyaman"
    ],
    itinerary: [
      {
        day: 1,
        title: "Penjemputan Malang/Surabaya, Menuju Lereng Bromo & Briefing",
        location: "Malang, Surabaya & Sukapura",
        meals: "Makan Malam Hangat",
        accommodation: "Lodge / Hotel di Lereng Gunung Bromo",
        activities: [
          { time: "13:00 - 14:30", activity: "Penjemputan di Stasiun / Bandara Kota Malang atau Surabaya oleh armada privat FADZA" },
          { time: "15:00 - 18:00", activity: "Perjalanan darat menuju penginapan berhawa sejuk di kawasan lereng Gunung Bromo" },
          { time: "18:30 - 20:00", activity: "Check-in kamar, santap malam hangat, pengarahan persiapan tur dini hari dan istirahat awal" }
        ]
      },
      {
        day: 2,
        title: "Safari Jeep 4x4 Sunrise Penanjakan, Kawah Bromo & Pengantaran Pulang",
        location: "Kaldera Bromo Tengger & Kepulangan",
        meals: "Sarapan Pagi di Lodge",
        accommodation: "Selesai (Kepulangan)",
        activities: [
          { time: "02:30 - 03:30", activity: "Morning call, berpakaian hangat dan menaiki Jeep 4x4 menuju titik Sunrise Penanjakan 1" },
          { time: "04:30 - 06:00", activity: "Menyaksikan pemandangan sunrise magis berlatar siluet kawah Bromo, Batok, dan kepulan asap Semeru" },
          { time: "06:30 - 08:30", activity: "Menuju lautan pasir, trekking ke bibir kawah aktif Bromo dan berfoto di Pura Poten" },
          { time: "09:00 - 10:30", activity: "Eksplorasi foto estetik di Lautan Pasir Berbisik dan savana hijau Bukit Teletubbies" },
          { time: "11:00 - 12:30", activity: "Kembali ke lodge untuk sarapan pagi, bersih-bersih dan proses check-out" },
          { time: "13:30 - 16:30", activity: "Perjalanan pulang dan pengantaran kembali ke Stasiun atau Bandara di Malang / Surabaya" }
        ]
      }
    ],
    included: [
      "Akomodasi 1 malam di lodge/hotel kawasan Bromo dengan fasilitas air panas",
      "Sewa privat Jeep 4x4 Bromo melintasi 5 spot utama kaldera",
      "Transportasi AC privat penjemputan PP dari Malang / Surabaya",
      "Tiket masuk resmi Taman Nasional Bromo Tengger Semeru",
      "Driver Jeep berpengalaman dan guide pendamping",
      "Sarapan pagi dan air mineral hangat"
    ],
    excluded: [
      "Sewa kuda di lautan pasir Bromo (opsional)",
      "Pengeluaran pribadi (sewa jaket tebal, sarung tangan, kupluk)"
    ],
    importantInfo: [
      "Meeting point penjemputan di Stasiun Malang Kotabaru, Bandara Abdulrachman Saleh, atau Surabaya.",
      "Suhu di Penanjakan Bromo berkisar antara 4 - 9 derajat Celcius; bawalah jaket gunung tebal."
    ],
    faq: [
      {
        question: "Apakah lansia bisa ikut tur Bromo?",
        answer: "Bisa, di gardu pandang Penanjakan aksesnya mudah, dan untuk menuju kawah tersedia opsi sewa kuda di lautan pasir."
      }
    ]
  },
  {
    id: "bandung-retreat",
    slug: "bandung-weekend-retreat-2d1n",
    name: "Bandung Weekend Retreat",
    tagline: "Kesejukan Dataran Tinggi Kawah Putih & Kebun Teh Rancabali",
    destination: "Bandung",
    destinationId: "bandung",
    duration: "2 Hari 1 Malam",
    durationDays: 2,
    durationNights: 1,
    durationCategory: "short",
    travelStyle: "Healing",
    travelStyleLabel: "Healing & Relaksasi",
    badge: "Quick Escape",
    featured: false,
    price: 1450000,
    formattedPrice: "Rp 1.450.000",
    rating: 4.8,
    reviewCount: 64,
    heroImage: ASSET_IMAGES.packages.bandungRetreat.hero,
    fallbackImage: ASSET_IMAGES.packages.bandungRetreat.fallback,
    gallery: ASSET_IMAGES.packages.bandungRetreat.gallery,
    shortDescription: "Keindahan kawah toska Ciwidey, jembatan gantung kebun teh Rancabali, dan santap kuliner Sunda.",
    overview: "Lepaskan penat rutinitas perkotaan dengan liburan akhir pekan singkat berhawa sejuk di Bandung Selatan. Menghirup udara bersih perkebunan teh, mengagumi keajaiban danau kawah belerang putih toska, serta bersantai di resort tepi danau.",
    highlights: [
      "Pemandangan magis danau belerang toska di Kawah Putih Ciwidey",
      "Berjalan di jembatan gantung di atas hamparan Perkebunan Teh Rancabali",
      "Santap siang nasi liwet komplit khas Parahyangan di saung bambu",
      "Belanja oleh-oleh legendaris pisang bollen Kartika Sari"
    ],
    itinerary: [
      {
        day: 1,
        title: "Penjemputan Bandung, Kawah Putih Ciwidey & Kebun Teh Rancabali",
        location: "Bandung Kota & Ciwidey",
        meals: "Makan Siang Liwet Sunda, Makan Malam",
        accommodation: "Resort / Hotel Berhawa Sejuk di Ciwidey",
        activities: [
          { time: "08:00 - 09:00", activity: "Penjemputan di Stasiun Kereta Cepat Whoosh Padalarang, Stasiun Bandung, atau hotel" },
          { time: "09:30 - 11:30", activity: "Perjalanan ke Ciwidey dan eksplorasi danau belerang toska berkabut Kawah Putih" },
          { time: "12:00 - 13:30", activity: "Makan siang kuliner khas Nasi Liwet Sunda, ayam bakakak, tahu tempe, dan sambal dadak" },
          { time: "14:00 - 16:30", activity: "Tea walk menyusuri perkebunan teh hijau Rancabali dan foto di Jembatan Gantung Rengganis" },
          { time: "17:00 - 18:30", activity: "Check-in resort sejuk di kawasan Situ Patenggang, mandi air hangat dan santai" },
          { time: "19:00", activity: "Makan malam hangat tepi danau" }
        ]
      },
      {
        day: 2,
        title: "Sunrise Kebun Teh, Danau Situ Patenggang, Belanja & Kepulangan",
        location: "Situ Patenggang & Kota Bandung",
        meals: "Sarapan Hotel",
        accommodation: "Selesai (Kepulangan)",
        activities: [
          { time: "07:00 - 08:30", activity: "Sarapan pagi santai memandang danau Situ Patenggang dan kebun teh berkabut" },
          { time: "09:00 - 11:00", activity: "Check-out resort dan perjalanan santai kembali menuju pusat Kota Bandung" },
          { time: "11:30 - 13:30", activity: "Mampir belanja oleh-oleh pisang bollen Kartika Sari, peuyeum Bandung, dan brownies Prima Rasa" },
          { time: "14:00 - 15:30", activity: "Pengantaran tiba di Stasiun Kereta Cepat Tegalluar / Padalarang atau Stasiun Bandung Kota" }
        ]
      }
    ],
    included: [
      "Akomodasi 1 malam di resort sejuk pilihan di kawasan Ciwidey",
      "Armada mobil privat ber-AC + Driver + Bahan Bakar",
      "Tiket masuk resmi Kawah Putih, Jembatan Rengganis, dan Situ Patenggang",
      "Sarapan pagi di hotel dan santap siang kuliner Sunda",
      "Air mineral dingin selama perjalanan"
    ],
    excluded: [
      "Tiket kereta cepat / kereta api menuju Bandung",
      "Pengeluaran belanja pribadi dan oleh-oleh"
    ],
    importantInfo: [
      "Meeting point di Stasiun Kereta Cepat Whoosh Padalarang / Stasiun Bandung Kota.",
      "Bawa jaket hangat atau sweater tebal untuk kenyamanan di malam hari."
    ],
    faq: [
      {
        question: "Apakah paket ini cocok jika naik Kereta Cepat Whoosh?",
        answer: "Sangat pas! Jam penjemputan dan pengantaran kami sesuaikan tepat dengan jadwal kedatangan Whoosh di Stasiun Padalarang."
      }
    ]
  },
  {
    id: "toba-highland",
    slug: "toba-cultural-escape-3d2n",
    name: "Danau Toba Cultural Escape",
    tagline: "Ketenangan Kaldera Vulkanik Terbesar & Kearifan Budaya Batak",
    destination: "Danau Toba",
    destinationId: "toba",
    duration: "3 Hari 2 Malam",
    durationDays: 3,
    durationNights: 2,
    durationCategory: "short",
    travelStyle: "Culture",
    travelStyleLabel: "Budaya & Ketenangan",
    badge: "Heritage Gem",
    featured: false,
    price: 3200000,
    formattedPrice: "Rp 3.200.000",
    rating: 4.8,
    reviewCount: 39,
    heroImage: ASSET_IMAGES.packages.tobaHighland.hero,
    fallbackImage: ASSET_IMAGES.packages.tobaHighland.fallback,
    gallery: ASSET_IMAGES.packages.tobaHighland.gallery,
    shortDescription: "Berlayar di Danau Toba, tradisi Sigale-gale Pulau Samosir, air terjun Sipiso-piso, dan panorama bukit Holbung.",
    overview: "Temukan kedamaian di danau vulkanik terbesar di Asia Tenggara. Berlayar melintasi air tenang diapit pegunungan hijau, belajar filosofi tenun ulos Batak di Pulau Samosir, dan meresapi hawa sejuk dataran tinggi Sumatera Utara.",
    highlights: [
      "Kapal privat berlayar santai mengelilingi perairan Pulau Samosir",
      "Menyaksikan tarian adat Tor-Tor dan boneka kayu Sigale-Gale di Desa Tomok",
      "Pemandangan spektakuler Air Terjun Sipiso-piso jatuh ke kaldera Toba",
      "Trekking bukit hijau Bukit Holbung (Bukit Teletubbies Danau Toba)",
      "Hotel nyaman di tepian danau dengan pemandangan langsung ke air"
    ],
    itinerary: [
      {
        day: 1,
        title: "Penjemputan Silangit, Menara Tele & Menyeberang ke Pulau Samosir",
        location: "Silangit, Tele & Tuk-tuk Samosir",
        meals: "Makan Siang Ikan Mas Arsik, Makan Malam",
        accommodation: "Hotel Tepi Danau Toba di Kawasan Tuk-tuk Samosir",
        activities: [
          { time: "09:30 - 11:00", activity: "Penjemputan di Bandara Internasional Silangit (DTB) dan perjalanan menuju Menara Pandang Tele" },
          { time: "11:30 - 13:00", activity: "Menyaksikan pemandangan danau kaldera raksasa dari ketinggian gardu pandang Tele" },
          { time: "13:30 - 15:00", activity: "Makan siang kuliner khas Ikan Mas Arsik bumbu andaliman yang lezat" },
          { time: "15:30 - 17:30", activity: "Menyeberang menuju Pulau Samosir dan check-in hotel tepi danau di kawasan Tuk-tuk" },
          { time: "19:00", activity: "Santap malam santai menikmati ketenangan danau diiringi musik akustik Batak" }
        ]
      },
      {
        day: 2,
        title: "Tradisi Tomok, Bukit Holbung & Air Terjun Efrata",
        location: "Pulau Samosir",
        meals: "Sarapan Hotel, Makan Siang",
        accommodation: "Hotel Tepi Danau Toba di Kawasan Tuk-tuk Samosir",
        activities: [
          { time: "08:30 - 10:30", activity: "Mengunjungi Desa Budaya Tomok, makam batu Raja Sidabutar, dan menyaksikan tarian sakral Sigale-gale" },
          { time: "11:00 - 13:00", activity: "Melihat proses pembuatan tenun kain Ulos di Desa Lumban Suhi-suhi" },
          { time: "13:30 - 14:30", activity: "Makan siang masakan khas di tepian pulau" },
          { time: "15:00 - 17:30", activity: "Trekking bukit rumput hijau Bukit Holbung dengan pemandangan danau 360 derajat" },
          { time: "18:00", activity: "Kembali ke hotel untuk beristirahat" }
        ]
      },
      {
        day: 3,
        title: "Air Terjun Sipiso-piso, Belanja Kopi Lintong & Pengantaran Bandara",
        location: "Tongging & Bandara Silangit / Medan",
        meals: "Sarapan Hotel",
        accommodation: "Selesai (Kepulangan)",
        activities: [
          { time: "08:00 - 10:30", activity: "Check-out hotel dan menyeberang menuju bibir kaldera utara Tongging" },
          { time: "11:00 - 12:30", activity: "Mengagumi gemuruh Air Terjun Sipiso-piso setinggi 120 meter yang jatuh menghadap Danau Toba" },
          { time: "13:00 - 14:30", activity: "Mampir mencicipi dan membeli Kopi Arabika Lintong khas dataran tinggi Toba" },
          { time: "15:00 - 16:30", activity: "Pengantaran kembali ke Bandara Silangit (DTB) atau Bandara Kualanamu Medan" }
        ]
      }
    ],
    included: [
      "Akomodasi 2 malam di hotel tepi danau Pulau Samosir (Twin Share)",
      "Mobil privat ber-AC selama tur berlangsung",
      "Tiket kapal penyeberangan Danau Toba PP",
      "Tiket masuk seluruh objek wisata dan pertunjukan tarian",
      "Makan sesuai program itinerary"
    ],
    excluded: [
      "Tiket pesawat PP menuju Silangit / Medan",
      "Pengeluaran pribadi belanja suvenir ulos"
    ],
    importantInfo: [
      "Meeting point penjemputan di Bandara Silangit (DTB).",
      "Udara di kawasan danau cukup sejuk pada malam hari."
    ],
    faq: [
      {
        question: "Apakah paket ini cocok untuk keluarga?",
        answer: "Sangat cocok! Itinerary santai dengan kapal privat dan mobil keluarga yang nyaman."
      }
    ]
  },
  {
    id: "derawan-adventure",
    slug: "derawan-island-adventure-4d3n",
    name: "Derawan Island Adventure",
    tagline: "Sensasi Berenang Bersama Ubur-Ubur Kakaban & Hiu Paus Talisayan",
    destination: "Kepulauan Derawan",
    destinationId: "derawan",
    duration: "4 Hari 3 Malam",
    durationDays: 4,
    durationNights: 3,
    durationCategory: "medium",
    travelStyle: "Adventure",
    travelStyleLabel: "Bahari & Snorkeling",
    badge: "Rare Experience",
    featured: true,
    price: 4650000,
    formattedPrice: "Rp 4.650.000",
    rating: 5.0,
    reviewCount: 36,
    heroImage: ASSET_IMAGES.packages.derawanAquatic.hero,
    fallbackImage: ASSET_IMAGES.packages.derawanAquatic.fallback,
    gallery: ASSET_IMAGES.packages.derawanAquatic.gallery,
    shortDescription: "Danau ubur-ubur tanpa sengat Kakaban, resort terapung Maratua, dan berenang bersama penyu raksasa Derawan.",
    overview: "Ekspedisi bahari tropis di Kalimantan Timur yang menyuguhkan satwa langka yang ramah. Berenang bebas di danau tertutup Kakaban tanpa takut tersengat, menjumpai kura-kura hijau raksasa bertelur, serta menikmati kemewahan air toska Pulau Maratua.",
    highlights: [
      "Snorkeling bersama ribuan ubur-ubur tanpa sengat di Danau Kakaban",
      "Berenang bersama penyu hijau di perairan dangkal Pulau Derawan",
      "Resort di atas air laut bening di Pulau Maratua",
      "Melihat pari manta tutul berenang di Manta Point Sangalaki",
      "Private speedboat berkecepatan tinggi dengan nakhoda handal"
    ],
    itinerary: [
      {
        day: 1,
        title: "Penjemputan Berau, Speedboat Tanjung Batu ke Pulau Derawan",
        location: "Berau & Pulau Derawan",
        meals: "Makan Malam Seafood",
        accommodation: "Water Cottage Terapung di Pulau Derawan",
        activities: [
          { time: "11:00 - 13:00", activity: "Penjemputan di Bandara Kalimarau Berau (BEJ) menuju Pelabuhan Tanjung Batu" },
          { time: "13:30 - 14:15", activity: "Speedboat cepat menyeberang melintasi perairan biru toska menuju Pulau Derawan" },
          { time: "15:00 - 17:30", activity: "Check-in water cottage terapung, santai di dermaga kayu melihat penyu berenang di bawah kamar" },
          { time: "19:00", activity: "Santap malam olahan ikan bakar segar khas nelayan kepulauan Derawan" }
        ]
      },
      {
        day: 2,
        title: "Danau Ubur-Ubur Kakaban, Maratua Paradise & Manta Sangalaki",
        location: "Pulau Kakaban, Maratua & Sangalaki",
        meals: "Sarapan, Makan Siang Kotak, Makan Malam",
        accommodation: "Water Cottage Terapung di Pulau Derawan",
        activities: [
          { time: "08:00 - 10:30", activity: "Snorkeling bebas bersama ribuan ubur-ubur jinak tanpa sengat di Danau Kakaban" },
          { time: "11:00 - 13:30", activity: "Makan siang dan berfoto di dermaga panjang resort mewah Maratua Paradise" },
          { time: "14:00 - 16:30", activity: "Snorkeling mencari pari manta tutul dan melihat penangkaran anak penyu di Sangalaki" },
          { time: "17:30", activity: "Kembali ke Derawan menikmati senja di atas jembatan kayu" }
        ]
      },
      {
        day: 3,
        title: "Berenang Bersama Hiu Paus Talisayan & Danau Labuan Cermin",
        location: "Talisayan & Biduk-Biduk",
        meals: "Sarapan, Makan Siang, Makan Malam",
        accommodation: "Water Cottage Terapung di Pulau Derawan",
        activities: [
          { time: "05:00 - 08:30", activity: "Speedboat pagi berenang bersama hiu paus ramah (Whale Shark) di perairan Talisayan" },
          { time: "10:00 - 13:00", activity: "Mengagumi keajaiban dua rasa air (asin dan tawar) di Danau Labuan Cermin" },
          { time: "15:30 - 17:30", activity: "Kembali ke Derawan dan menikmati waktu bebas santai berenang di pantai pasir putih" },
          { time: "19:00", activity: "Makan malam santai di cottage" }
        ]
      },
      {
        day: 4,
        title: "Sunrise Derawan, Speedboat ke Tanjung Batu & Bandara Berau",
        location: "Tanjung Batu & Kota Berau",
        meals: "Sarapan Cottage",
        accommodation: "Selesai (Kepulangan)",
        activities: [
          { time: "07:30 - 09:00", activity: "Sarapan pagi santai, foto penyu terakhir dan proses check-out cottage" },
          { time: "09:30 - 10:15", activity: "Speedboat kembali menuju Pelabuhan Tanjung Batu" },
          { time: "11:00 - 13:30", activity: "Pengantaran mobil privat kembali ke Bandara Kalimarau Berau (BEJ) untuk penerbangan kepulangan" }
        ]
      }
    ],
    included: [
      "Akomodasi 3 malam di water cottage terapung Pulau Derawan (Twin Share)",
      "Private Speedboat selama tour pulau (Maratua, Kakaban, Sangalaki)",
      "Mobil privat AC antar-jemput Bandara Berau - Pelabuhan PP",
      "Alat snorkeling lengkap dan pelampung",
      "Makan lengkap sesuai program itinerary",
      "Dokumentasi underwater GoPro"
    ],
    excluded: [
      "Tiket pesawat PP menuju Berau (BEJ)",
      "Pengeluaran pribadi & tipping kru boat"
    ],
    importantInfo: [
      "Meeting point penjemputan di Bandara Kalimarau Berau (BEJ).",
      "Dilarang menggunakan tabir surya saat berenang di Danau Kakaban demi melindungi ekosistem ubur-ubur."
    ],
    faq: [
      {
        question: "Apakah aman berenang bersama hiu paus di Talisayan?",
        answer: "Sangat aman! Hiu paus adalah pemakan plankton yang sangat tenang dan ramah terhadap penyelam."
      }
    ]
  },
  {
    id: "bunaken-marine",
    slug: "bunaken-marine-escape-3d2n",
    name: "Bunaken Marine Escape",
    tagline: "Pesona Dinding Karang Raksasa & Habitat Penyu Liar",
    destination: "Bunaken & Manado",
    destinationId: "bunaken",
    duration: "3 Hari 2 Malam",
    durationDays: 3,
    durationNights: 2,
    durationCategory: "short",
    travelStyle: "Adventure",
    travelStyleLabel: "Bahari & Snorkeling",
    badge: "Diver Paradise",
    featured: false,
    price: 3450000,
    formattedPrice: "Rp 3.450.000",
    rating: 4.9,
    reviewCount: 48,
    heroImage: ASSET_IMAGES.packages.bunakenMarine.hero,
    fallbackImage: ASSET_IMAGES.packages.bunakenMarine.fallback,
    gallery: ASSET_IMAGES.packages.bunakenMarine.gallery,
    shortDescription: "Dinding karang vertikal spektakuler Lekuan Wall, perjumpaan penyu laut raksasa, dan kuliner Manado.",
    overview: "Taman Nasional Bunaken di Sulawesi Utara adalah salah satu taman laut terindah di muka bumi. Mengarungi perairan jernih dengan visibilitas luar biasa, berenang bersama penyu liar di sepanjang dinding karang curam, serta menikmati hangatnya keramahtamahan Manado.",
    highlights: [
      "Snorkeling di dinding karang vertikal (drop-off wall) Lekuan Wall",
      "Berenang berdampingan dengan kawanan penyu laut raksasa",
      "Pantai berpasir putih halus di Pulau Siladen",
      "Kuliner autentik Ikan Woku Belanga dan Klappertaart asli Manado"
    ],
    itinerary: [
      {
        day: 1,
        title: "Penjemputan Manado, Penyeberangan Boat ke Bunaken & Snorkeling House Reef",
        location: "Kota Manado & Pulau Bunaken",
        meals: "Makan Siang & Makan Malam Resort",
        accommodation: "Dive Resort Tepi Pantai Pulau Bunaken",
        activities: [
          { time: "09:00 - 10:00", activity: "Penjemputan di Bandara Sam Ratulangi Manado (MDC) menuju Pelabuhan Marina" },
          { time: "10:30 - 11:30", activity: "Penyeberangan perahu katamaran melintasi Teluk Manado menuju Pulau Bunaken" },
          { time: "12:00 - 13:30", activity: "Check-in dive resort tepi laut, welcome drink dan santap siang masakan Minahasa" },
          { time: "14:30 - 17:00", activity: "Sesi snorkeling perkenalan di terumbu karang house reef depan dermaga resort" },
          { time: "17:30 - 18:30", activity: "Menikmati matahari terbenam dengan siluet megah Gunung Manado Tua" },
          { time: "19:00", activity: "Santap malam bersama di restoran resort" }
        ]
      },
      {
        day: 2,
        title: "Eksplorasi Lekuan Wall, Penyu Raksasa & Pulau Pasir Siladen",
        location: "Lekuan Wall & Pulau Siladen",
        meals: "Sarapan, Makan Siang di Pulau, Makan Malam",
        accommodation: "Dive Resort Tepi Pantai Pulau Bunaken",
        activities: [
          { time: "08:30 - 11:30", activity: "Boat trip snorkeling menyusuri dinding karang vertikal spektakuler Lekuan Wall 1 & 2 bersama penyu liar" },
          { time: "12:00 - 13:30", activity: "Mendarat di pantai pasir putih Pulau Siladen untuk makan siang kelapa muda dan ikan bakar" },
          { time: "14:00 - 16:30", activity: "Snorkeling di perairan jernih Siladen memandang schooling fish warna-warni" },
          { time: "17:00", activity: "Kembali ke resort di Bunaken untuk relaksasi sore hari" }
        ]
      },
      {
        day: 3,
        title: "Kembali ke Manado, Belanja Klappertaart & Pengantaran Bandara",
        location: "Kota Manado & Bandara Sam Ratulangi",
        meals: "Sarapan Resort",
        accommodation: "Selesai (Kepulangan)",
        activities: [
          { time: "08:00 - 09:15", activity: "Sarapan pagi di resort, proses check-out dan perahu kembali menuju Kota Manado" },
          { time: "10:00 - 12:30", activity: "Wisata kuliner belanja kue khas Klappertaart asli Manado dan sambal roa" },
          { time: "13:00 - 14:30", activity: "Pengantaran tiba di Bandara Sam Ratulangi Manado (MDC) untuk penerbangan kepulangan" }
        ]
      }
    ],
    included: [
      "Akomodasi 2 malam di dive resort tepi pantai Pulau Bunaken (Twin Share)",
      "Tiket kapal penyeberangan Manado - Bunaken PP",
      "Private boat tur snorkeling ke Lekuan Wall dan Pulau Siladen",
      "Peralatan snorkeling lengkap dan pemandu bawah air berlisensi",
      "Makan lengkap sesuai program itinerary"
    ],
    excluded: [
      "Tiket pesawat PP menuju Manado (MDC)",
      "Tiket retribusi Taman Nasional Bunaken",
      "Pengeluaran pribadi belanja suvenir"
    ],
    importantInfo: [
      "Meeting point penjemputan di Bandara Sam Ratulangi Manado (MDC).",
      "Bawa tabir surya ramah terumbu karang dan kamera bawah air."
    ],
    faq: [
      {
        question: "Apakah penyu liar selalu terlihat di Lekuan Wall?",
        answer: "Populasi penyu hijau di Lekuan Wall sangat tinggi sehingga tingkat perjumpaan mencapai lebih dari 95% di setiap sesi snorkeling."
      }
    ]
  },
  {
    id: "sumba-paradise",
    slug: "sumba-hidden-paradise-4d3n",
    name: "Sumba Hidden Paradise",
    tagline: "Keajaiban Savana Wairinding, Pantai Walakiri & Budaya Marapu",
    destination: "Sumba",
    destinationId: "sumba",
    duration: "4 Hari 3 Malam",
    durationDays: 4,
    durationNights: 3,
    durationCategory: "medium",
    travelStyle: "Adventure",
    travelStyleLabel: "Eksotis & Budaya",
    badge: "Bucket List",
    featured: true,
    price: 4850000,
    formattedPrice: "Rp 4.850.000",
    rating: 4.9,
    reviewCount: 42,
    heroImage: ASSET_IMAGES.packages.sumbaSavanna.hero,
    fallbackImage: ASSET_IMAGES.packages.sumbaSavanna.fallback,
    gallery: ASSET_IMAGES.packages.sumbaSavanna.gallery,
    shortDescription: "Sunset pohon menari Pantai Walakiri, bukit savana bergelombang Wairinding, dan laguna air asin Danau Weekuri.",
    overview: "Jelajahi Sumba, tanah magis penuh keelokan yang belum banyak tersentuh. Dari bukit savana bergelombang tanpa batas yang memanjakan mata, deburan ombak di pantai berkarst, hingga keramahan hangat masyarakat penganut tradisi luhur Marapu.",
    highlights: [
      "Sunset legendaris siluet pohon menari di bibir Pantai Walakiri",
      "Hamparan savana bergelombang tak berujung di Bukit Wairinding",
      "Berenang di laguna air asin sebening kristal Danau Weekuri",
      "Mengunjungi rumah adat bertonggak tinggi di Kampung Prai Ijing",
      "Armada 4WD privat yang tangguh melintasi lanskap savana Sumba"
    ],
    itinerary: [
      {
        day: 1,
        title: "Kedatangan Tambolaka, Laguna Weekuri & Karang Pantai Mandorak",
        location: "Sumba Barat Daya",
        meals: "Makan Siang & Makan Malam",
        accommodation: "Hotel Pilihan di Tambolaka",
        activities: [
          { time: "11:30 - 12:30", activity: "Penjemputan di Bandara Tambolaka (TMC) oleh tim FADZA TRIP ADVENTURE dengan sambutan kain tenun Sumba" },
          { time: "13:30 - 15:30", activity: "Berenang di Danau Weekuri, laguna air asin alami sebening kristal bergradasi warna toska" },
          { time: "16:00 - 17:30", activity: "Menikmati ombak samudra menabrak celah tebing karang putih di Pantai Mandorak" },
          { time: "18:30", activity: "Santap malam dan check-in hotel di Tambolaka" }
        ]
      },
      {
        day: 2,
        title: "Kampung Adat Prai Ijing, Air Terjun Lapopu & Overland ke Timur",
        location: "Sumba Tengah & Sumba Timur",
        meals: "Sarapan, Makan Siang, Makan Malam",
        accommodation: "Hotel Pilihan di Waingapu Sumba Timur",
        activities: [
          { time: "08:30 - 10:30", activity: "Eksplorasi rumah adat bertingkat suku Marapu di Kampung Prai Ijing yang bersejarah" },
          { time: "11:30 - 14:00", activity: "Santap siang dan menyegarkan diri di Air Terjun bertingkat alami Lapopu" },
          { time: "15:00 - 18:00", activity: "Perjalanan overland mobil privat melintasi perbukitan savana menuju kota pesisir timur Waingapu" },
          { time: "19:00", activity: "Santap malam kuliner lokal di Waingapu" }
        ]
      },
      {
        day: 3,
        title: "Savana Wairinding, Sentra Tenun Ikat & Sunset Pohon Menari Walakiri",
        location: "Waingapu & Pantai Walakiri",
        meals: "Sarapan, Makan Siang, Makan Malam",
        accommodation: "Hotel Pilihan di Waingapu Sumba Timur",
        activities: [
          { time: "08:30 - 11:00", activity: "Trekking santai memandang bukit bergelombang Bukit Wairinding yang megah" },
          { time: "13:00 - 15:00", activity: "Melihat proses pewarnaan alami kain tenun ikat khas Sumba bermotif kuda dan rusa" },
          { time: "16:30 - 18:30", activity: "Menanti sunset siluet 'Dancing Trees' pohon bakau menari di bibir Pantai Walakiri" },
          { time: "19:30", activity: "Makan malam seafood santai" }
        ]
      },
      {
        day: 4,
        title: "Bukit Tenau Pagi, Belanja Cinderamata & Pengantaran Bandara",
        location: "Waingapu & Bandara",
        meals: "Sarapan Hotel",
        accommodation: "Selesai (Kepulangan)",
        activities: [
          { time: "06:30 - 08:00", activity: "Sunrise sejuk di perbukitan hijau Bukit Tenau" },
          { time: "08:30 - 10:00", activity: "Sarapan pagi di hotel dan proses check-out kamar" },
          { time: "10:30 - 12:00", activity: "Pengantaran tiba di Bandara Umbu Mehang Kunda Waingapu (WGP) untuk penerbangan kepulangan" }
        ]
      }
    ],
    included: [
      "Akomodasi 3 malam di hotel pilihan Sumba Barat Daya & Timur (Twin Share)",
      "Armada privat 4WD ber-AC + Bahan Bakar + Driver berpengalaman",
      "Tiket masuk seluruh objek wisata dan donasi desa adat",
      "Makan lengkap sesuai jadwal itinerary",
      "Air mineral dingin selama perjalanan"
    ],
    excluded: [
      "Tiket pesawat PP menuju Sumba",
      "Pengeluaran belanja pribadi kain tenun ikat",
      "Tipping sukarela"
    ],
    importantInfo: [
      "Meeting point penjemputan di Bandara Tambolaka (TMC) dan kepulangan dari Bandara Waingapu (WGP).",
      "Hormati adat istiadat warga saat berkunjung ke kampung budaya."
    ],
    faq: [
      {
        question: "Apakah perjalanan di Sumba banyak jalan kaki?",
        answer: "Sebagian besar lokasi dapat dijangkau armada mobil 4WD, dengan trekking santai 10-15 menit di spot bukit dan air terjun."
      }
    ]
  },
  {
    id: "belitung-island",
    slug: "belitung-island-escape-3d2n",
    name: "Belitung Island Escape",
    tagline: "Formasi Batu Granit Raksasa & Jejak Negeri Laskar Pelangi",
    destination: "Belitung",
    destinationId: "belitung",
    duration: "3 Hari 2 Malam",
    durationDays: 3,
    durationNights: 2,
    durationCategory: "short",
    travelStyle: "Pantai",
    travelStyleLabel: "Pantai & Fotogenik",
    badge: "Family Favorite",
    featured: false,
    price: 2850000,
    formattedPrice: "Rp 2.850.000",
    rating: 4.8,
    reviewCount: 54,
    heroImage: ASSET_IMAGES.packages.belitungIsland.hero,
    fallbackImage: ASSET_IMAGES.packages.belitungIsland.fallback,
    gallery: ASSET_IMAGES.packages.belitungIsland.gallery,
    shortDescription: "Batu granit raksasa Pantai Tanjung Tinggi, mercusuar Pulau Lengkuas 1882, dan Danau Kaolin toska.",
    overview: "Kunjungi pulau tropis yang tenang di Laut Jawa dengan pantai-pantai berpasir putih selembut tepung dan bebatuan granit raksasa prasejarah. Menikmati keindahan pulau-pulau karang kecil dengan perahu tradisional serta mencicipi kopi Kong Djie yang legendaris.",
    highlights: [
      "Formasi batu granit raksasa di Pantai Tanjung Tinggi (Pantai Laskar Pelangi)",
      "Island hopping perahu tradisional ke Pulau Lengkuas dengan mercusuar kuno 1882",
      "Snorkeling terumbu karang dan mencari bintang laut di Pulau Pasir",
      "Danau Kaolin biru toska yang sangat fotogenik",
      "Menikmati secangkir kopi tarik khas di Warung Kopi Kong Djie"
    ],
    itinerary: [
      {
        day: 1,
        title: "Penjemputan Bandara, Pantai Tanjung Tinggi & Sunset Tanjung Kelayang",
        location: "Tanjung Pandan & Sijuk",
        meals: "Makan Siang Gangan Ikan, Makan Malam",
        accommodation: "Hotel Bintang 3/4 di Tanjung Pandan",
        activities: [
          { time: "08:30 - 09:30", activity: "Penjemputan di Bandara H.A.S. Hanandjoeddin (TJQ) oleh tim driver privat FADZA TRIP ADVENTURE" },
          { time: "10:30 - 12:30", activity: "Eksplorasi formasi bebatuan granit raksasa di Pantai Tanjung Tinggi (lokasi syuting Laskar Pelangi)" },
          { time: "13:00 - 14:15", activity: "Santap siang kuliner khas Belitung Gangan Ikan berkuah kuning asam pedas segar" },
          { time: "15:00 - 16:30", activity: "Check-in hotel di Tanjung Pandan dan istirahat sejenak" },
          { time: "17:00 - 18:30", activity: "Menikmati matahari terbenam santai di Pantai Tanjung Kelayang" },
          { time: "19:00", activity: "Makan malam santai seafood" }
        ]
      },
      {
        day: 2,
        title: "Island Hopping Perahu Tradisional, Mercusuar Lengkuas & Danau Kaolin",
        location: "Pulau Lengkuas, Batu Berlayar & Danau Kaolin",
        meals: "Sarapan Hotel, Makan Siang di Pulau",
        accommodation: "Hotel Bintang 3/4 di Tanjung Pandan",
        activities: [
          { time: "08:00 - 09:00", activity: "Sarapan pagi di hotel dan menuju dermaga Tanjung Kelayang" },
          { time: "09:15 - 12:00", activity: "Naik perahu kayu tradisional island hopping ke Pulau Lengkuas (mercusuar 1882) dan snorkeling terumbu karang" },
          { time: "12:30 - 13:45", activity: "Makan siang kelapa muda dan ikan bakar di pulau karang" },
          { time: "14:00 - 15:30", activity: "Mengunjungi formasi Batu Berlayar dan gundukan pulau pasir timbul mencari bintang laut" },
          { time: "16:30 - 18:00", activity: "Mampir berfoto di kawah danau bekas tambang kaolin dengan air biru toska jernih" },
          { time: "19:00", activity: "Makan malam kuliner Mie Belitung" }
        ]
      },
      {
        day: 3,
        title: "Kopi Tarik Kong Djie, Belanja Suvenir & Pengantaran Bandara",
        location: "Kota Tanjung Pandan & Bandara",
        meals: "Sarapan Hotel",
        accommodation: "Selesai (Kepulangan)",
        activities: [
          { time: "08:00 - 09:30", activity: "Sarapan pagi di hotel, check-out dan ngopi santai di Warung Kopi Kong Djie legendaris" },
          { time: "10:00 - 11:30", activity: "Belanja oleh-oleh terasi Belitung, kerupuk kemplang, dan sirup jeruk kunci" },
          { time: "12:00 - 13:00", activity: "Pengantaran tiba di Bandara H.A.S. Hanandjoeddin (TJQ) untuk penerbangan kepulangan" }
        ]
      }
    ],
    included: [
      "Hotel 2 malam di hotel bintang 3/4 pilihan di Tanjung Pandan dengan sarapan",
      "Mobil privat ber-AC selama tour berlangsung",
      "Perahu kayu tradisional untuk tur island hopping ke Pulau Lengkuas",
      "Alat snorkeling dan pelampung keselamatan",
      "Makan lengkap sesuai program itinerary",
      "Air mineral dingin selama perjalanan"
    ],
    excluded: [
      "Tiket pesawat PP menuju Belitung (TJQ)",
      "Pengeluaran belanja pribadi dan oleh-oleh",
      "Tipping sukarela"
    ],
    importantInfo: [
      "Meeting point penjemputan di Bandara H.A.S. Hanandjoeddin (TJQ).",
      "Bawa sandal karet yang tidak licin untuk berpindah antar pulau karang."
    ],
    faq: [
      {
        question: "Apakah bisa naik ke atas puncak mercusuar Pulau Lengkuas?",
        answer: "Wisatawan dapat menikmati keindahan mercusuar dari pelataran bawah pulau dan pantai berpasir putih sekitarnya."
      }
    ]
  },
  {
    id: "dieng-explorer",
    slug: "dieng-explorer-3d2n",
    name: "Dieng Highland & Golden Sunrise Sikunir",
    destinationId: "dieng",
    destination: "Dieng Plateau",
    tagline: "Pesona Negeri di Atas Awan, Telaga Warna & Kawah Sikidang",
    category: "Pegunungan & Budaya",
    travelStyle: "Healing & Adventure",
    travelStyleLabel: "Pegunungan & Sunrise",
    duration: "3 Hari 2 Malam",
    durationDays: 3,
    durationNights: 2,
    durationCategory: "short",
    days: 3,
    nights: 2,
    groupSize: "Private Group (2-12 Pax)",
    price: 1950000,
    formattedPrice: "Rp 1.950.000",
    rating: 4.9,
    reviewCount: 94,
    badge: "Eksplorasi Awan",
    heroImage: ASSET_IMAGES.packages.diengExplorer.hero,
    fallbackImage: ASSET_IMAGES.packages.diengExplorer.fallback,
    gallery: ASSET_IMAGES.packages.diengExplorer.gallery,
    shortDescription: "Saksikan Golden Sunrise legendaris Bukit Sikunir di atas lautan awan, uap belerang Kawah Sikidang, serta dua warna magis Telaga Warna Dieng.",
    overview: "Paket petualangan dataran tinggi Dieng yang dirancang santai dan mendalam. Menyaksikan langsung Golden Sunrise spektakuler di Bukit Sikunir dengan gumpalan awan di bawah kaki Anda, menyusuri uap belerang Kawah Sikidang, dan mengagumi dua warna air Telaga Warna dan Telaga Pengilon.",
    highlights: [
      "Menyaksikan Golden Sunrise Bukit Sikunir berlatar Gunung Sindoro",
      "Eksplorasi panorama Telaga Warna dan Telaga Pengilon dari Batu Pandang",
      "Menyusuri jalur aman uap belerang aktif Kawah Sikidang",
      "Kunjungan cagar budaya Candi Arjuna peninggalan Mataram Kuno",
      "Wisata kuliner Mie Ongklok dan belanja carica segar khas Wonosobo"
    ],
    itinerary: [
      {
        day: 1,
        title: "Penjemputan, Perjalanan Scenic & Sunset Kompleks Candi Arjuna",
        location: "Wonosobo & Dieng",
        meals: "Makan Siang & Makan Malam",
        accommodation: "Villa / Hotel Dieng Permai (Air Hangat)",
        activities: [
          { time: "08:00 - 09:00", activity: "Penjemputan di Stasiun / Bandara Yogyakarta atau Semarang oleh tim privat FADZA" },
          { time: "09:00 - 12:30", activity: "Perjalanan darat nyaman melintasi perbukitan kebun teh Wonosobo" },
          { time: "12:30 - 13:30", activity: "Makan siang kuliner otentik Mie Ongklok Longkrang yang legendaris" },
          { time: "14:30 - 17:00", activity: "Check-in villa sejuk di Dieng, dilanjutkan eksplorasi cagar budaya Kompleks Candi Arjuna saat sore berkabut" },
          { time: "19:00 - 20:30", activity: "Santap malam hangat tempe kemul dan istirahat untuk persiapan bangun dini hari" }
        ]
      },
      {
        day: 2,
        title: "Golden Sunrise Bukit Sikunir, Kawah Sikidang & Telaga Warna",
        location: "Sembungan & Dieng",
        meals: "Sarapan, Makan Siang & Malam",
        accommodation: "Villa / Hotel Dieng Permai",
        activities: [
          { time: "03:30 - 04:30", activity: "Menuju Desa Sembungan (desa tertinggi di Pulau Jawa) menuju gerbang Sikunir" },
          { time: "04:30 - 06:00", activity: "Trekking santai 25 menit menuju puncak Sikunir, menikmati detik-detik terbitnya fajar emas di atas awan" },
          { time: "06:30 - 08:00", activity: "Menikmati gorengan hangat dan kopi Dieng di tepi Telaga Cebong, kembali ke villa sarapan" },
          { time: "09:30 - 11:30", activity: "Eksplorasi fenomena vulkanik Kawah Sikidang dengan latar batuan kapur eksotis" },
          { time: "13:00 - 16:00", activity: "Melihat gradasi warna hijau toska Telaga Warna dari tebing Batu Pandang Ratapan Angin" },
          { time: "19:00 - 20:30", activity: "Makan malam santai dan istirahat menikmati malam Dieng yang tenang" }
        ]
      },
      {
        day: 3,
        title: "Wisata Oleh-Oleh Carica, Kebun Teh Tambi & Pengantaran Pulang",
        location: "Wonosobo & Drop-off",
        meals: "Sarapan & Makan Siang",
        accommodation: "Tidak Termasuk (Tour Selesai)",
        activities: [
          { time: "08:00 - 09:30", activity: "Sarapan villa, check-out, dan mampir ke pusat pembuatan manisan carica Dieng" },
          { time: "10:00 - 12:00", activity: "Singgah menikmati panorama asri hamparan hijau Perkebunan Teh Tambi di lereng Gunung Sindoro" },
          { time: "12:30 - 13:30", activity: "Makan siang khas Jawa Tengah di restoran lokal Wonosobo" },
          { time: "14:00 - 17:30", activity: "Pengantaran kembali ke Stasiun / Bandara Yogyakarta atau Semarang dengan selamat" }
        ]
      }
    ],
    included: [
      "Transportasi privat AC nyaman selama 3 hari (Innova / HiAce)",
      "Akomodasi 2 malam di hotel/villa Dieng dengan fasilitas air panas",
      "Tiket masuk semua objek wisata resmi Dieng",
      "Jeep / armada lokal menuju Sikunir",
      "Makan lengkap sesuai program (sarapan, siang, malam)",
      "Air mineral dingin dan snack hangat selama perjalanan",
      "Tour guide / driver lokal ramah berlisensi"
    ],
    excluded: [
      "Tiket pesawat / kereta menuju meeting point Yogyakarta/Semarang",
      "Pengeluaran pribadi & oleh-oleh",
      "Tipping sukarela kru"
    ],
    importantInfo: [
      "Wajib membawa jaket tebal, syal, sarung tangan, dan kupluk karena suhu dini hari berkisar 8°C - 12°C.",
      "Gunakan sepatu kets atau alas kaki dengan sol anti-licin untuk trekking Sikunir."
    ],
    faq: [
      {
        question: "Apakah orang tua bisa ikut ke Bukit Sikunir?",
        answer: "Bisa, trek telah difasilitasi tangga permanen dan pegangan tangan yang aman dengan banyak pos istirahat."
      }
    ]
  },
  {
    id: "toraja-heritage",
    slug: "toraja-heritage-4d3n",
    name: "Toraja Cultural & Mystical Highlands",
    destinationId: "toraja",
    destination: "Tana Toraja",
    tagline: "Maha Warisan Rumah Tongkonan, Kubur Batu Londa & Kopi Dataran Tinggi",
    category: "Budaya & Warisan Luhur",
    travelStyle: "Cultural Immersion",
    travelStyleLabel: "Budaya & Tradisi",
    duration: "4 Hari 3 Malam",
    durationDays: 4,
    durationNights: 3,
    durationCategory: "medium",
    days: 4,
    nights: 3,
    groupSize: "Private Group (2-8 Pax)",
    price: 3450000,
    formattedPrice: "Rp 3.450.000",
    rating: 4.95,
    reviewCount: 78,
    badge: "Warisan Dunia",
    heroImage: ASSET_IMAGES.packages.torajaHeritage.hero,
    fallbackImage: ASSET_IMAGES.packages.torajaHeritage.fallback,
    gallery: ASSET_IMAGES.packages.torajaHeritage.gallery,
    shortDescription: "Jelajahi mahakarya rumah adat Tongkonan Kete Kesu, misteri makam gua tebing batu Londa, serta panorama lembah awan Batutumonga.",
    overview: "Penjelajahan mendalam ke jantung kebudayaan tertua di Indonesia. Berjalan di antara lumbung padi berukir Kete Kesu, menyusuri makam tebing batu Londa, serta menikmati ketenangan lautan kabut pagi di perbukitan Batutumonga.",
    highlights: [
      "Eksplorasi Desa Tradisional Kete Kesu dan deretan rumah adat Tongkonan megah",
      "Kunjungan situs makam tebing batu dan peti mati purba Erong di Londa",
      "Panorama sawah terasering bertingkat Batutumonga dari ketinggian awan",
      "Melihat situs megalitikum batu menhir Bori Kalimbuang",
      "Menyantap masakan autentik Pa'piong di dalam bambu dan mencicipi kopi khas Toraja"
    ],
    itinerary: [
      {
        day: 1,
        title: "Perjalanan Eksotis Menuju Negeri Toraja & Panorama Gunung Nona",
        location: "Makassar - Enrekang - Rantepao",
        meals: "Makan Siang & Makan Malam",
        accommodation: "Hotel Heritage Toraja Misiliana / Setaraf",
        activities: [
          { time: "08:00 - 09:00", activity: "Penjemputan di Bandara Sultan Hasanuddin Makassar oleh tim FADZA TRIP ADVENTURE" },
          { time: "09:00 - 13:00", activity: "Perjalanan darat scenic melintasi pesisir pantai barat Sulawesi dan pegunungan karst Maros" },
          { time: "13:00 - 14:00", activity: "Makan siang seafood segar khas Bugis di Pare-Pare" },
          { time: "15:30 - 16:30", activity: "Coffee break menikmati Kopi Toraja berlatar pemandangan eksotis Gunung Nona Enrekang" },
          { time: "19:00 - 20:30", activity: "Tiba di Rantepao Toraja, check-in resort arsitektur Tongkonan dan makan malam santai" }
        ]
      },
      {
        day: 2,
        title: "Situs Budaya Kete Kesu, Kubur Gua Londa & Lemo",
        location: "Kete Kesu, Londa & Lemo",
        meals: "Sarapan, Makan Siang & Malam",
        accommodation: "Hotel Heritage Toraja Misiliana",
        activities: [
          { time: "08:00 - 10:30", activity: "Mengunjungi perkampungan adat Kete Kesu, mengagumi ukiran asli kayu Tongkonan dan makam gantung" },
          { time: "11:00 - 13:00", activity: "Eksplorasi gua pemakaman batu Londa dengan pemandu lokal pembawa lentera tradisional" },
          { time: "13:00 - 14:30", activity: "Makan siang tradisional Pa'piong bambu khas Toraja di restoran lokal" },
          { time: "15:00 - 17:00", activity: "Kunjungan ke tebing batu Lemo yang dipenuhi deretan patung kayu leluhur (Tau-Tau)" },
          { time: "19:00 - 20:30", activity: "Makan malam hangat dan santai diiringi alunan musik suling bambu tradisional" }
        ]
      },
      {
        day: 3,
        title: "Batutumonga di Atas Awan, Situs Bori & Perkebunan Kopi",
        location: "Batutumonga & Rantepao",
        meals: "Sarapan, Makan Siang & Malam",
        accommodation: "Hotel Heritage Toraja Misiliana",
        activities: [
          { time: "06:30 - 08:30", activity: "Menuju ketinggian Batutumonga menyaksikan lautan kabut lembut membentang di atas lembah sawah" },
          { time: "09:30 - 11:30", activity: "Trekking santai melintasi desa-desa tradisional dan kebun kopi Arabika di lereng bukit" },
          { time: "12:00 - 13:30", activity: "Makan siang berlatar hamparan sawah hijau di puncak bukit" },
          { time: "14:30 - 16:30", activity: "Menyaksikan deretan 102 menhir batu purba di situs megalitikum Bori Kalimbuang" },
          { time: "19:00 - 20:30", activity: "Makan malam penutupan dan persiapan check-out" }
        ]
      },
      {
        day: 4,
        title: "Belanja Oleh-Oleh Kopi Toraja & Perjalanan Pulang",
        location: "Rantepao - Makassar",
        meals: "Sarapan & Makan Siang",
        accommodation: "Tidak Termasuk (Tour Selesai)",
        activities: [
          { time: "07:30 - 09:00", activity: "Sarapan di resort, mampir ke pusat sangrai kopi Arabika Toraja asli" },
          { time: "09:00 - 13:00", activity: "Perjalanan kembali menuju Makassar dengan mobil privat ber-AC" },
          { time: "13:00 - 14:00", activity: "Makan siang santap khas lokal di perjalanan" },
          { time: "17:00 - 18:30", activity: "Tiba di Bandara Sultan Hasanuddin Makassar untuk penerbangan kembali ke kota asal" }
        ]
      }
    ],
    included: [
      "Transportasi privat AC Innova Reborn / HiAce selama 4 hari penuh",
      "Akomodasi 3 malam di Toraja Misiliana Hotel / setaraf berbintang",
      "Semua tiket masuk destinasi adat dan donasi desa cagar budaya",
      "Pemandu lokal berlisensi budaya Toraja yang ramah dan fasih berbahasa",
      "Makan lengkap sesuai program (sarapan, siang, malam)",
      "Lentera minyak dan perlengkapan safety eksplorasi gua Londa",
      "Air mineral dingin dan snack khas Sulawesi setiap hari"
    ],
    excluded: [
      "Tiket pesawat menuju Makassar (UPG)",
      "Pengeluaran belanja pribadi dan cinderamata kain tenun",
      "Tipping sukarela untuk driver dan pemandu"
    ],
    importantInfo: [
      "Disarankan membawa sepatu jalan yang nyaman dan tidak licin untuk area tangga batu dan gua.",
      "Gunakan pakaian bernuansa gelap atau sopan saat berkunjung ke situs pemakaman adat."
    ],
    faq: [
      {
        question: "Apakah bisa request tiket penerbangan langsung Makassar-Toraja?",
        answer: "Bisa, tim konsultan FADZA siap membantu pemesanan tiket pesawat perintis langsung ke Bandara Toraja (TRT)."
      }
    ]
  },
  {
    id: "wakatobi-expedition",
    slug: "wakatobi-coral-paradise-4d3n",
    name: "Wakatobi Coral Paradise & Bajo Tribe",
    destinationId: "wakatobi",
    destination: "Wakatobi",
    tagline: "Eksplorasi Jantung Terumbu Karang Dunia & Keajaiban Lumba-Lumba",
    category: "Bahari & Bawah Laut",
    travelStyle: "Marine Adventure & Luxury",
    travelStyleLabel: "Bahari & Terumbu Karang",
    duration: "4 Hari 3 Malam",
    durationDays: 4,
    durationNights: 3,
    durationCategory: "medium",
    days: 4,
    nights: 3,
    groupSize: "Private Group (2-10 Pax)",
    price: 4650000,
    formattedPrice: "Rp 4.650.000",
    rating: 4.98,
    reviewCount: 65,
    badge: "Surga Bahari",
    heroImage: ASSET_IMAGES.packages.wakatobiExpedition.hero,
    fallbackImage: ASSET_IMAGES.packages.wakatobiExpedition.fallback,
    gallery: ASSET_IMAGES.packages.wakatobiExpedition.gallery,
    shortDescription: "Snorkeling di surga karang Pulau Hoga, berlayar menyongsong kawanan lumba-lumba liar, dan mengenal budaya suku laut Bajo Mola.",
    overview: "Ekspedisi laut eksklusif menyusuri 4 pulau utama Wakatobi. Bertemu lumba-lumba liar saat fajar, snorkeling di karang hidup Pulau Hoga yang tak tertandingi, dan bercengkerama dengan masyarakat suku laut Bajo Mola yang legendaris.",
    highlights: [
      "Snorkeling spektakuler di terumbu karang warna-warni Pulau Hoga",
      "Menyaksikan parade lumba-lumba liar melompat di Selat Wangi-Wangi",
      "Tur budaya ke Perkampungan Rumah Terapung Suku Laut Bajo Mola",
      "Sunset jingga keemasan dari Puncak Kahianga di Pulau Tomia",
      "Berenang di kesegaran air tawar alami Goa Karst Kontamale"
    ],
    itinerary: [
      {
        day: 1,
        title: "Pendaratan di Wangi-Wangi, Goa Kontamale & Sunset Pantai Sombu",
        location: "Wangi-Wangi, Wakatobi",
        meals: "Makan Siang & Makan Malam",
        accommodation: "Patuno Resort Wakatobi / Setaraf",
        activities: [
          { time: "09:30 - 10:30", activity: "Penjemputan di Bandara Matahora Wangi-Wangi (WNI) oleh tim FADZA" },
          { time: "11:00 - 12:30", activity: "Check-in resort tepi pantai dan makan siang olahan seafood segar lokal" },
          { time: "14:00 - 16:00", activity: "Berenang di air bening kristal Goa Karst Kontamale yang menyegarkan" },
          { time: "16:30 - 18:30", activity: "Menikmati senja jingga di dermaga panjang Pantai Sombu Dive Spot" },
          { time: "19:00 - 20:30", activity: "Makan malam khas kuliner Kasuami dan Ikan Parende di resort" }
        ]
      },
      {
        day: 2,
        title: "Dolphin Watching Fajar & Snorkeling Surgawi Pulau Hoga",
        location: "Selat Wangi-Wangi & Pulau Hoga",
        meals: "Sarapan, Makan Siang & Malam",
        accommodation: "Patuno Resort Wakatobi",
        activities: [
          { time: "05:30 - 08:00", activity: "Berlayar dengan perahu tradisional mengejar kawanan lumba-lumba yang bermain riang di laut lepas" },
          { time: "08:30 - 10:00", activity: "Sarapan hangat di atas kapal menuju Pulau Hoga" },
          { time: "10:00 - 14:00", activity: "Sesi snorkeling di 2 spot karang terbaik Pulau Hoga dengan visibilitas luar biasa hingga 30 meter" },
          { time: "14:00 - 15:30", activity: "Santap siang picnic seafood di hamparan pantai pasir putih lembut Pulau Hoga" },
          { time: "16:30 - 18:00", activity: "Kembali ke Wangi-Wangi sambil menikmati semilir angin laut sore" }
        ]
      },
      {
        day: 3,
        title: "Kunjungan Budaya Suku Laut Bajo Mola & Puncak Kahianga",
        location: "Kampung Bajo Mola & Wangi-Wangi",
        meals: "Sarapan, Makan Siang & Malam",
        accommodation: "Patuno Resort Wakatobi",
        activities: [
          { time: "08:30 - 11:30", activity: "Eksplorasi Kampung Terapung Bajo Mola, melihat rumah panggung di atas karang dan kehidupan anak-anak laut" },
          { time: "12:00 - 13:30", activity: "Makan siang hidangan laut olahan rempah khas suku Bajo" },
          { time: "14:30 - 17:00", activity: "Menuju bukit gardu pandang Puncak Kahianga dengan pemandangan 360 derajat gugusan pulau" },
          { time: "19:00 - 21:00", activity: "Candlelight farewell dinner di pinggir pantai dengan deburan ombak tenang" }
        ]
      },
      {
        day: 4,
        title: "Belanja Kain Tenun Wakatobi & Pengantaran Bandara",
        location: "Wangi-Wangi - Drop Off",
        meals: "Sarapan Pagi",
        accommodation: "Tidak Termasuk (Tour Selesai)",
        activities: [
          { time: "07:30 - 08:30", activity: "Sarapan santai di resort sambil menikmati sunrise terakhir" },
          { time: "08:30 - 09:30", activity: "Check-out dan mampir ke sentra perajin tenun tradisional Wakatobi" },
          { time: "10:00 - 10:30", activity: "Pengantaran tepat waktu ke Bandara Matahora Wangi-Wangi" }
        ]
      }
    ],
    included: [
      "Akomodasi 3 malam di Patuno Resort Wakatobi tepi pantai (kamar AC)",
      "Private boat untuk dolphin watching dan island hopping Pulau Hoga",
      "Peralatan snorkeling lengkap berstandar internasional (mask, snorkel, life jacket)",
      "Pemandu selam dan snorkel lokal berlisensi resmi",
      "Semua tiket masuk objek wisata dan retribusi konservasi laut",
      "Makan lengkap (sarapan, makan siang, makan malam seafood)",
      "Mobil penjemputan bandara privat ber-AC"
    ],
    excluded: [
      "Tiket pesawat menuju Wangi-Wangi (WNI)",
      "Sewa tabung dan peralatan scuba diving (opsional)",
      "Pengeluaran belanja pribadi dan tipping sukarela"
    ],
    importantInfo: [
      "Wajib mematuhi kode etik konservasi laut dan tidak menginjak karang hidup.",
      "Gunakan sunscreen jenis reef-safe untuk menjaga keutuhan biota karang."
    ],
    faq: [
      {
        question: "Apakah tersedia paket untuk yang ingin Scuba Diving?",
        answer: "Tersedia! Anda dapat meng-upgrade program ke paket Fun Diving dengan instruktur PADI bersertifikat."
      }
    ]
  },
  {
    id: "karimunjawa-getaway",
    slug: "karimunjawa-turquoise-getaway-3d2n",
    name: "Karimunjawa Turquoise Island & Shark Lagoon",
    destinationId: "karimunjawa",
    destination: "Karimunjawa",
    tagline: "Snorkeling Nemo, Berenang Bersama Hiu Jinak & Pantai Kelapa Melengkung",
    category: "Pantai & Relaksasi",
    travelStyle: "Island Hopping & Healing",
    travelStyleLabel: "Pulau & Snorkeling",
    duration: "3 Hari 2 Malam",
    durationDays: 3,
    durationNights: 2,
    durationCategory: "short",
    days: 3,
    nights: 2,
    groupSize: "Private Group (2-14 Pax)",
    price: 1850000,
    formattedPrice: "Rp 1.850.000",
    rating: 4.88,
    reviewCount: 112,
    badge: "Favorit Liburan",
    heroImage: ASSET_IMAGES.packages.karimunjawaGetaway.hero,
    fallbackImage: ASSET_IMAGES.packages.karimunjawaGetaway.fallback,
    gallery: ASSET_IMAGES.packages.karimunjawaGetaway.gallery,
    shortDescription: "Pelarian akhir pekan santai ke surga tropis Karimunjawa: berenang bersama hiu jinak, snorkeling nemo, dan sunset Pantai Tanjung Gelam.",
    overview: "Pelarian akhir pekan santai dan terjangkau ke pulau tropis tersembunyi Laut Jawa. Menyusuri 4 pulau tak berpenghuni, merasakan sensasi unik berenang bersama hiu karang jinak di penangkaran Menjangan Besar, serta menikmati kelapa muda segar saat senja di Pantai Tanjung Gelam.",
    highlights: [
      "Snorkeling bersama ikan badut Nemo dan terumbu karang hidup di Spot Maer",
      "Berenang dan foto bersama hiu jinak di penangkaran Pulau Menjangan Besar",
      "Makan siang picnic BBQ ikan bakar di pantai pasir putih pulau terpencil",
      "Sunset legendaris berlatar pohon kelapa miring Pantai Tanjung Gelam",
      "Menyeberang nyaman dengan Kapal Cepat Express Bahari ber-AC"
    ],
    itinerary: [
      {
        day: 1,
        title: "Penyeberangan Cepat dari Jepara, Bukit Love & Sunset Pantai Bobby",
        location: "Jepara - Karimunjawa",
        meals: "Makan Siang & Makan Malam",
        accommodation: "Hotel / Homestay AC Nyaman Karimunjawa",
        activities: [
          { time: "08:00 - 09:00", activity: "Meeting point di Pelabuhan Kartini Jepara, boarding Kapal Cepat Express Bahari" },
          { time: "09:00 - 11:00", activity: "Pelayaran nyaman 2 jam melintasi Laut Jawa yang tenang" },
          { time: "11:30 - 13:00", activity: "Tiba di Pelabuhan Karimunjawa, penjemputan privat, check-in hotel dan makan siang ikan segar" },
          { time: "14:30 - 16:30", activity: "Eksplorasi spot foto ikonik Bukit Love dengan pemandangan gugusan pulau dari ketinggian" },
          { time: "16:30 - 18:30", activity: "Bersantai di ayunan laut Pantai Bobby menikmati semilir angin sore" },
          { time: "19:00 - 20:30", activity: "Makan malam dan jalan-jalan santai di Alun-Alun Karimunjawa menikmati kuliner malam" }
        ]
      },
      {
        day: 2,
        title: "Island Hopping Kapal Wisata, Snorkeling Nemo & Penangkaran Hiu",
        location: "Gugusan Kepulauan Karimunjawa",
        meals: "Sarapan, Makan Siang & Malam",
        accommodation: "Hotel / Homestay AC Nyaman",
        activities: [
          { time: "08:00 - 09:30", activity: "Sarapan pagi di hotel, bersiap menuju dermaga wisata perahu kayu privat" },
          { time: "09:30 - 11:30", activity: "Snorkeling di Spot Nemo Pulau Cilik dengan air toska sejernih kaca" },
          { time: "12:00 - 13:30", activity: "Mendarat di pantai pasir putih pulau tak berpenghuni, menikmati makan siang BBQ ikan bakar" },
          { time: "14:00 - 15:30", activity: "Kunjungan ke kolam konservasi hiu Menjangan Besar, berenang dan foto bersama hiu karang" },
          { time: "16:00 - 18:00", activity: "Menikmati kelapa muda di Pantai Tanjung Gelam saat matahari terbenam ke cakrawala" },
          { time: "19:00 - 20:30", activity: "Makan malam bersama dan istirahat santai" }
        ]
      },
      {
        day: 3,
        title: "Belanja Souvenir Kayu Dewandaru & Penyeberangan Kembali",
        location: "Karimunjawa - Jepara",
        meals: "Sarapan Pagi",
        accommodation: "Tidak Termasuk (Tour Selesai)",
        activities: [
          { time: "07:00 - 08:30", activity: "Sarapan pagi dan check-out penginapan" },
          { time: "08:30 - 10:00", activity: "Berbelanja cinderamata khas kayu langka Dewandaru dan terasi Karimunjawa" },
          { time: "10:30 - 11:00", activity: "Boarding Kapal Cepat Express Bahari menuju Jepara" },
          { time: "11:00 - 13:00", activity: "Tiba di Pelabuhan Kartini Jepara dengan selamat, tour selesai dengan kenangan manis" }
        ]
      }
    ],
    included: [
      "Tiket Kapal Cepat Express Bahari PP (Jepara - Karimunjawa - Jepara) kelas Eksekutif AC",
      "Akomodasi 2 malam di Karimunjawa dengan fasilitas AC, TV, dan kamar mandi dalam",
      "Perahu wisata privat untuk island hopping seharian",
      "Alat snorkeling lengkap (masker, snorkel, life jacket pelampung)",
      "Tiket retribusi penangkaran hiu Pulau Menjangan Besar",
      "Makan lengkap sesuai program termasuk BBQ ikan bakar di pantai",
      "Dokumentasi foto underwater dengan kamera bawah air",
      "Pemandu lokal bersertifikat HPI yang ramah dan sigap"
    ],
    excluded: [
      "Transportasi menuju Pelabuhan Kartini Jepara",
      "Pengeluaran pribadi di luar program (kelapa muda, sewa motor)",
      "Tipping sukarela kru kapal dan guide"
    ],
    importantInfo: [
      "Siapkan pakaian ganti dan pakaian renang yang nyaman untuk sesi snorkeling seharian.",
      "Bawalah casing handphone anti-air (waterproof pouch)."
    ],
    faq: [
      {
        question: "Apakah bisa dijemput dari Stasiun / Bandara Semarang?",
        answer: "Bisa sekali! Kami menyediakan layanan antar-jemput privat dari Semarang menuju Pelabuhan Kartini Jepara dengan armada AC."
      }
    ]
  },


];

export const WHY_FADZA = [
  {
    id: "curated-itinerary",
    title: "Itinerary Terkurasi",
    description: "Setiap perjalanan disusun agar waktu dan pengalamanmu tetap seimbang.",
    icon: "Compass"
  },
  {
    id: "transparent-info",
    title: "Informasi yang Transparan",
    description: "Detail paket, durasi, fasilitas, dan biaya ditampilkan dengan jelas.",
    icon: "FileText"
  },
  {
    id: "responsive-support",
    title: "Pendampingan yang Responsif",
    description: "Tim siap membantu sebelum dan selama perjalanan sesuai layanan yang tersedia.",
    icon: "Headphones"
  },
  {
    id: "personal-experience",
    title: "Pengalaman yang Lebih Personal",
    description: "Pilihan perjalanan dapat disesuaikan dengan karakter dan kebutuhan trip.",
    icon: "Users"
  },
  {
    id: "memorable-moments",
    title: "Dokumentasi yang Berkesan",
    description: "Abadikan momen perjalanan melalui dokumentasi yang tersedia pada paket tertentu.",
    icon: "Camera"
  },
  {
    id: "planned-journey",
    title: "Perjalanan yang Terencana",
    description: "Mulai dari persiapan hingga itinerary, informasi penting disusun agar lebih mudah dipahami.",
    icon: "CalendarCheck"
  }
];

export const GENERAL_FAQS = [
  {
    id: "faq-1",
    category: "booking",
    categoryLabel: "Pemesanan & Biaya",
    question: "Bagaimana cara melakukan pemesanan paket wisata di FADZA TRIP ADVENTURE?",
    answer: "Sangat mudah, cepat, dan transparan. Anda dapat langsung mengklik tombol 'Booking Sekarang' di paket wisata impian Anda untuk menentukan tanggal, jumlah rombongan, dan memilih metode pembayaran (DP 30% atau Lunas). Setelah konfirmasi, E-Voucher resmi langsung terbit dan tim concierge kami siap membantu koordinasi penjemputan.",
    tip: "E-Voucher dan faktur resmi otomatis terbit setelah pemesanan dikonfirmasi."
  },
  {
    id: "faq-2",
    category: "booking",
    categoryLabel: "Pemesanan & Biaya",
    question: "Bagaimana sistem konfirmasi dan pembayaran perjalanan?",
    answer: "Kami menyediakan opsi pembayaran fleksibel: Uang Muka (DP 30%) untuk mengamankan slot armada dan akomodasi, atau Pelunasan Penuh (100%). Seluruh transaksi didukung saluran resmi Virtual Account Bank (BCA, Mandiri, BNI, BRI), QRIS E-Wallet, dan Kartu Kredit dengan faktur valid berbadan hukum resmi.",
    tip: "Pelunasan sisa tagihan untuk skema DP dapat diselesaikan selambatnya H-7 sebelum hari keberangkatan."
  },
  {
    id: "faq-3",
    category: "custom",
    categoryLabel: "Kustomisasi & Rombongan",
    question: "Apakah perjalanan di FADZA TRIP ADVENTURE bisa disesuaikan (custom trip)?",
    answer: "Tentu saja. Seluruh perjalanan kami berkonsep 100% Private Tour eksklusif rombongan Anda. Kami dapat menyesuaikan tipe akomodasi (resort tepi pantai, hotel bintang, villa privat), durasi hari, hingga ritme itinerary sesuai kenyamanan keluarga, pasangan, maupun gathering perusahaan.",
    tip: "Konsultasikan preferensi khusus Anda dengan Travel Concierge kami tanpa biaya tambahan."
  },
  {
    id: "faq-4",
    category: "custom",
    categoryLabel: "Kustomisasi & Rombongan",
    question: "Berapa minimal peserta untuk private tour?",
    answer: "Private tour dapat dipesan mulai dari 2 orang peserta (ideal untuk liburan pasangan atau kawan bertualang), hingga kelompok keluarga besar dan rombongan kantor. Armada transportasi (Innova Reborn, HiAce Premio, hingga Bus Pariwisata) akan disesuaikan demi kenyamanan maksimal.",
    tip: "Tidak ada penggabungan peserta dengan rombongan orang asing lain."
  },
  {
    id: "faq-5",
    category: "facilities",
    categoryLabel: "Fasilitas & Layanan",
    question: "Apa saja fasilitas standar yang sudah termasuk dalam paket?",
    answer: "Setiap paket privat FADZA TRIP ADVENTURE sudah mencakup armada transportasi ber-AC eksklusif rombongan Anda, bahan bakar, driver merangkap pemandu lokal berlisensi, akomodasi hotel/resort/kapal Phinisi terkurasi, seluruh tiket masuk retribusi resmi kawasan wisata, serta asuransi perjalanan lokal.",
    tip: "Semua tiket retribusi dan perizinan kawasan konservasi sudah diurus tuntas sebelum tiba."
  },
  {
    id: "faq-6",
    category: "facilities",
    categoryLabel: "Fasilitas & Layanan",
    question: "Apakah biaya paket sudah termasuk tiket pesawat?",
    answer: "Paket darat kami berfokus pada pengalaman premium di destinasi (transportasi lokal privat, akomodasi, pemandu, dan tiket masuk objek wisata). Hal ini memberi Anda fleksibilitas penuh dalam menentukan jam penerbangan serta maskapai favorit dari kota asal masing-masing.",
    tip: "Pemandu kami siap menjemput Anda langsung di terminal kedatangan bandara destinasi."
  },
  {
    id: "faq-7",
    category: "policy",
    categoryLabel: "Keamanan & Kebijakan",
    question: "Bagaimana kebijakan penjadwalan ulang (rescheduling) dan pembatalan (cancellation)?",
    answer: "Kami memahami rencana liburan dapat berubah karena situasi tak terduga. Penjadwalan ulang (rescheduling) bebas biaya administrasi dapat diajukan hingga H-10 sebelum keberangkatan (menyesuaikan ketersediaan kamar hotel/kapal). Detail hak perlindungan traveler tercantum transparan pada lembar konfirmasi pemesanan Anda.",
    tip: "Garansi reschedule 1x tanpa penalti potongan biaya reservasi."
  },
  {
    id: "faq-8",
    category: "policy",
    categoryLabel: "Keamanan & Kebijakan",
    question: "Apakah jadwal itinerary bisa disesuaikan di tengah perjalanan?",
    answer: "Karena seluruh paket FADZA berformat private tour, ritme perjalanan bersifat santai dan fleksibel. Anda dapat berkonsultasi langsung dengan pemandu kami di lapangan untuk memperpanjang waktu singgah di objek wisata tertentu tanpa terburu-buru seperti tur rombongan massal.",
    tip: "Fleksibilitas penuh di tangan Anda dan rombongan sepanjang hari petualangan."
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Raditya Pratama",
    origin: "Jakarta Selatan",
    packageTitle: "Labuan Bajo Explorer & Phinisi",
    destination: "Labuan Bajo",
    rating: 5,
    tag: "Private Tour Pasangan",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    quote: "Perjalanan ke Labuan Bajo terasa sangat terorganisir karena jadwal sailing dan fasilitas kapal Phinisi sudah dijelaskan secara detail sejak awal. Pemandangan matahari terbit di Padar sungguh luar biasa.",
    comment: "Perjalanan ke Labuan Bajo terasa sangat terorganisir karena jadwal sailing dan fasilitas kapal Phinisi sudah dijelaskan secara detail sejak awal. Pemandangan matahari terbit di Padar sungguh luar biasa.",
    highlight: "Sunrise di puncak Pulau Padar & makan malam romantis di dek kapal Phinisi di bawah bintang.",
    note: "Pelayanan kru Phinisi bintang lima!",
    date: "Agustus 2026",
    verified: true,
    helpfulCount: 38
  },
  {
    id: 2,
    name: "Maya Anggraini",
    origin: "Surabaya",
    packageTitle: "Bali Escape & Nusa Penida",
    destination: "Bali",
    rating: 5,
    tag: "Keluarga & Multi-Generasi",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
    quote: "Informasi itinerary-nya jelas dan transparan dari awal, jadi kami bisa menyiapkan perjalanan keluarga tanpa bingung. Pemandu lokal di Nusa Penida sangat ramah dan sabar mendampingi orang tua kami.",
    comment: "Informasi itinerary-nya jelas dan transparan dari awal, jadi kami bisa menyiapkan perjalanan keluarga tanpa bingung. Pemandu lokal di Nusa Penida sangat ramah dan sabar mendampingi orang tua kami.",
    highlight: "Pemandangan Kelingking Beach dari tebing atas & makan malam seafood Jimbaran.",
    note: "Sangat ramah anak dan lansia.",
    date: "Agustus 2026",
    verified: true,
    helpfulCount: 29
  },
  {
    id: 3,
    name: "Bramantyo Wicaksono",
    origin: "Bandung",
    packageTitle: "Bromo Sunrise Escape",
    destination: "Bromo Semeru",
    rating: 5,
    tag: "Petualangan Kawan",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    quote: "Jadwal dini hari menuju kaldera Bromo terkoordinasi dengan sangat baik. Pemandangan lautan pasir dan matahari terbit menjadi salah satu momen alam terbaik yang pernah kami saksikan bersama kawan-kawan.",
    comment: "Jadwal dini hari menuju kaldera Bromo terkoordinasi dengan sangat baik. Pemandangan lautan pasir dan matahari terbit menjadi salah satu momen alam terbaik yang pernah kami saksikan bersama kawan-kawan.",
    highlight: "Sopir Jeep 4x4 sangat ahli dan spot foto Bukit Kingkong tidak terlalu padat turis.",
    note: "Jeep 4x4 tepat waktu & fotografer handal.",
    date: "Juli 2026",
    verified: true,
    helpfulCount: 44
  },
  {
    id: 4,
    name: "Kevin Sanjaya",
    origin: "Tangerang",
    packageTitle: "Raja Ampat Discovery",
    destination: "Raja Ampat",
    rating: 5,
    tag: "Eksplorasi Bahari",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    quote: "Gugusan pulau karang Wayag dan Piaynemo menyajikan panorama laut yang spektakuler. Seluruh rute penjelajahan laut dipandu dengan cermat dengan standar keselamatan yang sangat terjaga.",
    comment: "Gugusan pulau karang Wayag dan Piaynemo menyajikan panorama laut yang spektakuler. Seluruh rute penjelajahan laut dipandu dengan cermat dengan standar keselamatan yang sangat terjaga.",
    highlight: "Mendaki karst Wayag 1 & snorkeling bersama pari manta di Manta Sandy.",
    note: "Surga dunia nyata, wajib sekali seumur hidup!",
    date: "Juli 2026",
    verified: true,
    helpfulCount: 52
  },
  {
    id: 5,
    name: "Anindya Putri",
    origin: "Yogyakarta",
    packageTitle: "Dieng Highland & Golden Sunrise",
    destination: "Dieng Plateau",
    rating: 5,
    tag: "Healing & Budaya",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    quote: "Pilihan destinasinya membantu kami menentukan trip yang pas dengan durasi liburan singkat. Kesejukan dataran tinggi Dieng dan matahari terbit Sikunir memberikan pengalaman liburan yang menyegarkan.",
    comment: "Pilihan destinasinya membantu kami menentukan trip yang pas dengan durasi liburan singkat. Kesejukan dataran tinggi Dieng dan matahari terbit Sikunir memberikan pengalaman liburan yang menyegarkan.",
    highlight: "Golden sunrise Bukit Sikunir di atas lautan awan & hangatnya mie ongklok.",
    note: "Udara sejuk & itinerary sangat santai.",
    date: "Juni 2026",
    verified: true,
    helpfulCount: 21
  },
  {
    id: 6,
    name: "Hendrikus & Amanda",
    origin: "Medan",
    packageTitle: "Sumba Hidden Paradise",
    destination: "Sumba",
    rating: 5,
    tag: "Private Tour Pasangan",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
    quote: "Keindahan savana Sumba dan kehangatan tradisi lokalnya sungguh memikat hati. Komunikasi tim concierge sangat cepat dan tanggap membantu kebutuhan perjalanan kami.",
    comment: "Keindahan savana Sumba dan kehangatan tradisi lokalnya sungguh memikat hati. Komunikasi tim concierge sangat cepat dan tanggap membantu kebutuhan perjalanan kami.",
    highlight: "Sunset siluet pohon bakau menari di Pantai Walakiri & air jernih Danau Weekuri.",
    note: "Foto-foto kami seperti di majalah editorial!",
    date: "Juni 2026",
    verified: true,
    helpfulCount: 36
  },
  {
    id: 7,
    name: "Fajar Nugraha",
    origin: "Semarang",
    packageTitle: "Belitung Island Hopping",
    destination: "Belitung",
    rating: 5,
    tag: "Eksplorasi Bahari",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
    quote: "Eksplorasi batuan granit raksasa di Pantai Tanjung Tinggi dan pulau-pulau kecil Belitung sangat berkesan. Transportasi darat dan kapal kayu bersih, tepat waktu, dan sangat nyaman.",
    comment: "Eksplorasi batuan granit raksasa di Pantai Tanjung Tinggi dan pulau-pulau kecil Belitung sangat berkesan. Transportasi darat dan kapal kayu bersih, tepat waktu, dan sangat nyaman.",
    highlight: "Naik ke mercusuar Pulau Lengkuas tahun 1882 & minum kopi manggar legendaris.",
    note: "Laut tenang, air sebening kaca!",
    date: "Mei 2026",
    verified: true,
    helpfulCount: 19
  },
  {
    id: 8,
    name: "Rina Salsabila",
    origin: "Makassar",
    packageTitle: "Tana Toraja Sacred Heritage",
    destination: "Toraja",
    rating: 5,
    tag: "Healing & Budaya",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    quote: "Pendampingan pemandu lokal berlisensi sangat terasa manfaatnya saat kami mengunjungi desa adat Kete Kesu. Setiap sejarah dan filosofi rumah adat Tongkonan dijelaskan secara mendalam dan santun.",
    comment: "Pendampingan pemandu lokal berlisensi sangat terasa manfaatnya saat kami mengunjungi desa adat Kete Kesu. Setiap sejarah dan filosofi rumah adat Tongkonan dijelaskan secara mendalam dan santun.",
    highlight: "Belajar ukiran kayu khas Toraja & pemandangan tebing kubur batu Lemo.",
    note: "Kaya wawasan budaya leluhur.",
    date: "Mei 2026",
    verified: true,
    helpfulCount: 27
  },
  {
    id: 9,
    name: "Claudia Wijaya",
    origin: "Jakarta Barat",
    packageTitle: "Lombok Tropical Escape & Gili",
    destination: "Lombok & Gili",
    rating: 5,
    tag: "Private Tour Pasangan",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    quote: "Snorkeling di perairan Gili Trawangan dan bersantai di Bukit Merese senja menjadi pengalaman liburan yang tak terlupakan. Fasilitas dan jadwal teratur membuat kami bisa berlibur dengan rileks.",
    comment: "Snorkeling di perairan Gili Trawangan dan bersantai di Bukit Merese senja menjadi pengalaman liburan yang tak terlupakan. Fasilitas dan jadwal teratur membuat kami bisa berlibur dengan rileks.",
    highlight: "Berenang berdekatan dengan penyu liar di Gili Meno & sunset bukit Merese.",
    note: "Resort tepi pantai sangat privat & tenang.",
    date: "April 2026",
    verified: true,
    helpfulCount: 31
  },
  {
    id: 10,
    name: "Dimas Aditya & Keluarga",
    origin: "Bekasi",
    packageTitle: "Danau Toba Heritage & Samosir",
    destination: "Danau Toba",
    rating: 5,
    tag: "Keluarga & Multi-Generasi",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
    quote: "Danau Toba menyuguhkan ketenangan yang luar biasa. Berlayar private boat di perairan Danau Toba dan menari Tor-tor di Tomok membuat seluruh keluarga besar merasa bahagia.",
    comment: "Danau Toba menyuguhkan ketenangan yang luar biasa. Berlayar private boat di perairan Danau Toba dan menari Tor-tor di Tomok membuat seluruh keluarga besar merasa bahagia.",
    highlight: "Udara sejuk hotel tepi danau di Tuk-tuk & panorama luas Bukit Holbung.",
    note: "Makanan halal terjamin & lezat!",
    date: "April 2026",
    verified: true,
    helpfulCount: 25
  },
  {
    id: 11,
    name: "Sarah Nadira",
    origin: "Jakarta Pusat",
    packageTitle: "Yogyakarta Cultural Odyssey",
    destination: "Yogyakarta",
    rating: 5,
    tag: "Healing & Budaya",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    quote: "Wisata budaya yang dikemas sangat elegan. Sunrise Borobudur dari bukit Dagi dan tur privat Candi Prambanan sore hari memberikan ketenangan batin yang langka di tengah kesibukan kerja.",
    comment: "Wisata budaya yang dikemas sangat elegan. Sunrise Borobudur dari bukit Dagi dan tur privat Candi Prambanan sore hari memberikan ketenangan batin yang langka di tengah kesibukan kerja.",
    highlight: "Sarapan piknik eksklusif di Dagi Abhirama dengan latar stupa Borobudur.",
    note: "Detail perjalanan sangat dipikirkan matang.",
    date: "Maret 2026",
    verified: true,
    helpfulCount: 33
  },
  {
    id: 12,
    name: "Dr. Irfan Hakim",
    origin: "Surabaya",
    packageTitle: "Derawan Marine Wonder & Kakaban",
    destination: "Derawan & Maratua",
    rating: 5,
    tag: "Eksplorasi Bahari",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80",
    quote: "Berenang bersama ribuan ubur-ubur tanpa sengat di Danau Kakaban adalah pengalaman magis. Tim pemandu laut sangat memperhatikan kelestarian alam dan keselamatan tamu.",
    comment: "Berenang bersama ribuan ubur-ubur tanpa sengat di Danau Kakaban adalah pengalaman magis. Tim pemandu laut sangat memperhatikan kelestarian alam dan keselamatan tamu.",
    highlight: "Melihat hiu paus raksasa di bagan Talisayan dan cottage terapung Maratua.",
    note: "Pengalaman bawah air paling berkesan di hidup saya.",
    date: "Maret 2026",
    verified: true,
    helpfulCount: 48
  },
  {
    id: 13,
    name: "Jessica Tanujaya",
    origin: "Surabaya",
    packageTitle: "Wakatobi Coral Paradise",
    destination: "Wakatobi",
    rating: 5,
    tag: "Eksplorasi Bahari",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
    quote: "Terumbu karang Wakatobi berada di level yang berbeda. Kejernihan air lautnya mencapai puluhan meter dan keanekaragaman ikannya sangat spektakuler. Terima kasih FADZA atas pengaturan yang prima.",
    comment: "Terumbu karang Wakatobi berada di level yang berbeda. Kejernihan air lautnya mencapai puluhan meter dan keanekaragaman ikannya sangat spektakuler. Terima kasih FADZA atas pengaturan yang prima.",
    highlight: "Diving di House Reef Tomia dan sunset di Puncak Kahyangan.",
    note: "Spot diving terbaik di Segitiga Karang Dunia.",
    date: "Februari 2026",
    verified: true,
    helpfulCount: 39
  },
  {
    id: 14,
    name: "Arya Danendra",
    origin: "Depok",
    packageTitle: "Bandung Parahyangan Retreat",
    destination: "Bandung Heritage",
    rating: 5,
    tag: "Healing & Budaya",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
    quote: "Liburan singkat akhir pekan yang sangat memuaskan. Kawah Putih di pagi hari saat masih berkabut terasa sangat damai, dilanjutkan santap siang nasi liwet Sunda di tengah kebun teh Rancabali.",
    comment: "Liburan singkat akhir pekan yang sangat memuaskan. Kawah Putih di pagi hari saat masih berkabut terasa sangat damai, dilanjutkan santap siang nasi liwet Sunda di tengah kebun teh Rancabali.",
    highlight: "Tea walk pagi di Rancabali dan menginap di glamping tepi danau Patenggang.",
    note: "Sangat cocok untuk recharge energi singkat.",
    date: "Februari 2026",
    verified: true,
    helpfulCount: 18
  },
  {
    id: 15,
    name: "Gilang & Priscillia",
    origin: "Tangerang Selatan",
    packageTitle: "Labuan Bajo Sunset Phinisi",
    destination: "Labuan Bajo",
    rating: 5,
    tag: "Private Tour Pasangan",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
    quote: "Bulan madu kami di Labuan Bajo bersama FADZA terasa seperti mimpi. Kamar kabin kapal Phinisi sangat bersih, makanan koki kapal sangat mewah, dan pemandu foto mengabadikan momen kami dengan luar biasa.",
    comment: "Bulan madu kami di Labuan Bajo bersama FADZA terasa seperti mimpi. Kamar kabin kapal Phinisi sangat bersih, makanan koki kapal sangat mewah, dan pemandu foto mengabadikan momen kami dengan luar biasa.",
    highlight: "Ribuan kelelawar terbang di langit senja Pulau Kalong saat kapal bersandar.",
    note: "Pilihan terbaik untuk bulan madu!",
    date: "Januari 2026",
    verified: true,
    helpfulCount: 60
  },
  {
    id: 16,
    name: "H. Sulaiman & Ibu Wahyuni",
    origin: "Pekanbaru",
    packageTitle: "Bali Harmony & Tanah Lot",
    destination: "Bali",
    rating: 5,
    tag: "Keluarga & Multi-Generasi",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    quote: "Kami berangkat bersama 8 anggota keluarga. Armada mobil Hiace selalu wangi dan bersih, sopir sangat berhati-hati, dan jadwal sholat serta restoran halal selalu diperhatikan dengan penuh hormat.",
    comment: "Kami berangkat bersama 8 anggota keluarga. Armada mobil Hiace selalu wangi dan bersih, sopir sangat berhati-hati, dan jadwal sholat serta restoran halal selalu diperhatikan dengan penuh hormat.",
    highlight: "Menikmati teh sore di Kintamani dengan pemandangan Danau dan Gunung Batur.",
    note: "Pelayanan sangat menghormati kebutuhan keluarga muslim.",
    date: "Januari 2026",
    verified: true,
    helpfulCount: 41
  },
  {
    id: 17,
    name: "Reza Fahlevi",
    origin: "Palembang",
    packageTitle: "Bromo Milky Way & Caldera",
    destination: "Bromo Semeru",
    rating: 5,
    tag: "Petualangan Kawan",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    quote: "Melihat gugusan bintang bima sakti (Milky Way) di atas kaldera Bromo pada jam 2 dini hari adalah pengalaman visual paling spektakuler. Jaket hangat dan pemandu siaga membuat trip tetap aman dan nyaman.",
    comment: "Melihat gugusan bintang bima sakti (Milky Way) di atas kaldera Bromo pada jam 2 dini hari adalah pengalaman visual paling spektakuler. Jaket hangat dan pemandu siaga membuat trip tetap aman dan nyaman.",
    highlight: "Foto Milky Way di Pasir Berbisik & mendaki anak tangga kawah aktif Bromo.",
    note: "Petualangan seru tanpa rasa khawatir.",
    date: "Desember 2025",
    verified: true,
    helpfulCount: 35
  },
  {
    id: 18,
    name: "Stella Christine",
    origin: "Jakarta Utara",
    packageTitle: "Raja Ampat Misool Secluded",
    destination: "Raja Ampat",
    rating: 5,
    tag: "Eksplorasi Bahari",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    quote: "Wilayah Misool Raja Ampat Selatan benar-benar magis. Laguna berbentuk hati di Karawapop dan goa keramat bawah air memberikan kenangan yang tak ternilai. Standar keamanan kapal cepat FADZA nomor satu.",
    comment: "Wilayah Misool Raja Ampat Selatan benar-benar magis. Laguna berbentuk hati di Karawapop dan goa keramat bawah air memberikan kenangan yang tak ternilai. Standar keamanan kapal cepat FADZA nomor satu.",
    highlight: "Berenang di Danau Cinta Karawapop & melihat lukisan dinding purba goa tebing.",
    note: "Ketenangan absolut di tengah alam perawan.",
    date: "Desember 2025",
    verified: true,
    helpfulCount: 47
  },
  {
    id: 19,
    name: "Naufal Syarif",
    origin: "Bogor",
    packageTitle: "Lombok Sembalun & Rinjani Foothill",
    destination: "Lombok & Gili",
    rating: 5,
    tag: "Petualangan Kawan",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
    quote: "Lanskap petak sawah warna-warni Sembalun di kaki Gunung Rinjani membuat kami terpesona. Trekking bukit Selong sangat ramah untuk pemula dan udaranya sangat sejuk dan segar.",
    comment: "Lanskap petak sawah warna-warni Sembalun di kaki Gunung Rinjani membuat kami terpesona. Trekking bukit Selong sangat ramah untuk pemula dan udaranya sangat sejuk dan segar.",
    highlight: "Pemandangan Lembah Sembalun pagi hari & mencicipi kopi khas Sembalun.",
    note: "Itinerary tepat, tidak terburu-buru.",
    date: "November 2025",
    verified: true,
    helpfulCount: 22
  },
  {
    id: 20,
    name: "Tiffany Kusuma",
    origin: "Malang",
    packageTitle: "Sumba Wairinding Savanna",
    destination: "Sumba",
    rating: 5,
    tag: "Healing & Budaya",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    quote: "Berdiri di hamparan perbukitan Bukit Wairinding saat angin sore berhembus adalah momen refleksi terbaik. Keramahan masyarakat Desa Adat Prai Ijing menyentuh hati saya secara mendalam.",
    comment: "Berdiri di hamparan perbukitan Bukit Wairinding saat angin sore berhembus adalah momen refleksi terbaik. Keramahan masyarakat Desa Adat Prai Ijing menyentuh hati saya secara mendalam.",
    highlight: "Sunset emas di Bukit Wairinding dan melihat kain tenun ikat asli Sumba.",
    note: "Terapi jiwa yang sesungguhnya.",
    date: "November 2025",
    verified: true,
    helpfulCount: 39
  },
  {
    id: 21,
    name: "Aditya Wardhana",
    origin: "Semarang",
    packageTitle: "Yogyakarta Heritage Trail",
    destination: "Yogyakarta",
    rating: 5,
    tag: "Petualangan Kawan",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
    quote: "Menyusuri jalanan Kotagede dengan sepeda onthel, mencicipi jamu tradisional, dan melihat arsitektur keraton bersama sejarawan lokal yang disediakan FADZA membuat liburan sarat makna.",
    comment: "Menyusuri jalanan Kotagede dengan sepeda onthel, mencicipi jamu tradisional, dan melihat arsitektur keraton bersama sejarawan lokal yang disediakan FADZA membuat liburan sarat makna.",
    highlight: "Tur lorong kuno Kotagede dan kuliner malam wedang ronde Malioboro.",
    note: "Bukan sekadar jalan-jalan, tapi kaya cerita.",
    date: "Oktober 2025",
    verified: true,
    helpfulCount: 26
  },
  {
    id: 22,
    name: "Meilani Harahap",
    origin: "Medan",
    packageTitle: "Danau Toba Romantic Samosir",
    destination: "Danau Toba",
    rating: 5,
    tag: "Private Tour Pasangan",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    quote: "Resort tepi danau yang dipilihkan sangat privat dengan pemandangan langsung ke perairan biru dan bukit hijau. Suasana tenang membuat kami bisa benar-benar beristirahat dari riuhnya kota.",
    comment: "Resort tepi danau yang dipilihkan sangat privat dengan pemandangan langsung ke perairan biru dan bukit hijau. Suasana tenang membuat kami bisa benar-benar beristirahat dari riuhnya kota.",
    highlight: "Melihat kemegahan Air Terjun Sipiso-piso dari gardu pandang atas.",
    note: "Sangat tenang, damai, dan romantis.",
    date: "Oktober 2025",
    verified: true,
    helpfulCount: 30
  },
  {
    id: 23,
    name: "Bagus Prasetyo",
    origin: "Solo",
    packageTitle: "Belitung Laskar Pelangi",
    destination: "Belitung",
    rating: 5,
    tag: "Private Tour Pasangan",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80",
    quote: "Air kelapa muda segar di tepi Pantai Tanjung Kelayang dan berenang di pulau pasir putih timbul saat surut adalah kenangan indah. Pemandu lokal sangat jujur dan menjaga kebersihan kapal.",
    comment: "Air kelapa muda segar di tepi Pantai Tanjung Kelayang dan berenang di pulau pasir putih timbul saat surut adalah kenangan indah. Pemandu lokal sangat jujur dan menjaga kebersihan kapal.",
    highlight: "Menyentuh bintang laut di Pulau Pasir & menikmati mie Belitung hangat.",
    note: "Sangat direkomendasikan untuk pasangan!",
    date: "September 2025",
    verified: true,
    helpfulCount: 28
  },
  {
    id: 24,
    name: "Cindy Nathania",
    origin: "Jakarta Barat",
    packageTitle: "Derawan Sangalaki Manta",
    destination: "Derawan & Maratua",
    rating: 5,
    tag: "Eksplorasi Bahari",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
    quote: "Melihat tukik penyu hijau dilepasliarkan ke laut lepas di Pulau Derawan saat senja membuat saya terharu. Ekosistem laut di sini masih sangat sehat dan terjaga dengan indah.",
    comment: "Melihat tukik penyu hijau dilepasliarkan ke laut lepas di Pulau Derawan saat senja membuat saya terharu. Ekosistem laut di sini masih sangat sehat dan terjaga dengan indah.",
    highlight: "Snorkeling di perairan Sangalaki melihat pari manta meluncur anggun.",
    note: "Momen pelepasan penyu tak terlupakan seumur hidup.",
    date: "September 2025",
    verified: true,
    helpfulCount: 42
  },
  {
    id: 25,
    name: "Faisal Akbar",
    origin: "Balikpapan",
    packageTitle: "Wakatobi Wangi-Wangi Marine",
    destination: "Wakatobi",
    rating: 5,
    tag: "Eksplorasi Bahari",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
    quote: "Diving di Wakatobi memberikan sensasi melayang di atas taman bunga karang bawah laut yang luas tak bertepi. Pelayanan concierge FADZA mengatur tiket perahu lokal dan akomodasi tanpa kendala.",
    comment: "Diving di Wakatobi memberikan sensasi melayang di atas taman bunga karang bawah laut yang luas tak bertepi. Pelayanan concierge FADZA mengatur tiket perahu lokal dan akomodasi tanpa kendala.",
    highlight: "Lumba-lumba melompat di samping kapal saat perjalanan menuju Pulau Hoga.",
    note: "Pengalaman diving kelas dunia di Indonesia.",
    date: "Agustus 2025",
    verified: true,
    helpfulCount: 37
  },
  {
    id: 26,
    name: "Devina Maharani",
    origin: "Bandung",
    packageTitle: "Dieng Heritage & Telaga Warna",
    destination: "Dieng Plateau",
    rating: 5,
    tag: "Healing & Budaya",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    quote: "Perpaduan warna air toska dan hijau di Telaga Warna yang dikelilingi hutan pinus terasa magis. Kompleks Candi Arjuna yang kuno menambah nuansa spiritual dan kesejukan dalam perjalanan ini.",
    comment: "Perpaduan warna air toska dan hijau di Telaga Warna yang dikelilingi hutan pinus terasa magis. Kompleks Candi Arjuna yang kuno menambah nuansa spiritual dan kesejukan dalam perjalanan ini.",
    highlight: "Melihat letupan kawah Sikidang dari jembatan kayu dan minum teh purwaceng hangat.",
    note: "Cocok sekali untuk melarikan diri dari kepenatan kerja.",
    date: "Agustus 2025",
    verified: true,
    helpfulCount: 24
  }
];

export const TRAVEL_CHECKLIST = [
  {
    category: "Dokumen & Identitas",
    items: [
      "KTP / Paspor aktif dan salinan digital di ponsel",
      "Tiket pesawat / moda transportasi konfirmasi PP",
      "Bukti konfirmasi pemesanan paket FADZA TRIP ADVENTURE",
      "Kartu asuransi kesehatan / BPJS"
    ]
  },
  {
    category: "Pakaian & Perlengkapan Lapangan",
    items: [
      "Pakaian berbahan katun ringan / breathable untuk iklim tropis",
      "Jaket hangat / windbreaker untuk destinasi gunung (Bromo & Dieng)",
      "Sepatu trekking / sneakers bertapak antiselip",
      "Sandal gunung atau alas kaki yang tahan air"
    ]
  },
  {
    category: "Outdoor, Perlindungan & Gadget",
    items: [
      "Tabir surya (sunscreen ramah terumbu karang / reef-safe)",
      "Kacamata hitam (UV protection) dan topi pelindung panas",
      "Power bank berkapasitas sesuai regulasi maskapai",
      "Tas kedap air (dry bag) untuk perjalanan bahari & pulau"
    ]
  },
  {
    category: "Kesehatan & Kebutuhan Personal",
    items: [
      "Obat-obatan pribadi rutin dan antialergi",
      "Obat antikebocoran / antimabuk perjalanan laut & darat",
      "Hand sanitizer dan perlengkapan higienitas pribadi",
      "Botol minum pakai ulang (tumbler) untuk menjaga hidrasi"
    ]
  }
];

export const TRAVEL_NOTES = [
  {
    title: "Etika Kunjungan Budaya",
    content: "Di kawasan sakral seperti pura Bali atau desa adat Toraja & Sumba, kenakan pakaian sopan dan hormati norma adat setempat."
  },
  {
    title: "Kelestarian Alam Nusantara",
    content: "Dilarang menginjak karang saat snorkeling di Raja Ampat, Labuan Bajo, atau Karimunjawa. Selalu bawa pulang sampah pribadi Anda."
  },
  {
    title: "Waktu Terbaik Kunjungan",
    content: "Sebagian besar lanskap laut dan pegunungan Indonesia paling cerah pada periode musim kemarau antara bulan April hingga Oktober."
  }
];

export const GALLERY_ITEMS = [
  {
    id: "g1",
    title: "Formasi Karst Piaynemo",
    destination: "Raja Ampat",
    destinationId: "raja-ampat",
    location: "Raja Ampat, Papua Barat Daya",
    category: "Bahari & Kepulauan",
    image: ASSET_IMAGES.destinations.rajaAmpat.primary,
    fallback: ASSET_IMAGES.destinations.rajaAmpat.fallback,
    shortDescription: "Gugusan pulau karang zamrud di atas air laut bening toska yang memukau dunia.",
    detailedDescription: "Piaynemo merupakan ikon mahakarya alam Raja Ampat. Dari puncaknya yang dicapai dengan menaiki anak tangga kayu terawat, tersaji panorama pulau-pulau karst kecil yang bertebaran di atas samudra toska sebening kaca.",
    travelInsight: "Waktu terbaik menikmati keheningan laguna adalah sebelum pukul 09.00 WIT sebelum perahu wisatawan reguler tiba.",
    bestMoment: "Pagi hari (06.30 – 08.30 WIT) saat cahaya matahari pagi menyinari celah laguna dengan kejernihan maksimal.",
    packageId: "raja-ampat-ultimate",
    packageName: "Raja Ampat Discovery"
  },
  {
    id: "g2",
    title: "Phinisi Berlayar di Perairan Komodo",
    destination: "Labuan Bajo",
    destinationId: "labuan-bajo",
    location: "Labuan Bajo, Nusa Tenggara Timur",
    category: "Bahari & Pelayaran",
    image: ASSET_IMAGES.destinations.labuanBajo.fallback,
    fallback: ASSET_IMAGES.destinations.labuanBajo.primary,
    shortDescription: "Kemegahan kapal phinisi kayu tradisional melintasi selat pulau-pulau purba Flores.",
    detailedDescription: "Perjalanan dengan phinisi menjadi salah satu cara terbaik untuk menikmati lanskap kepulauan Flores. Dari atas kapal, wisatawan dapat menikmati perubahan warna laut, gugusan pulau, dan suasana senja yang berbeda di setiap perjalanan.",
    travelInsight: "Pilihlah kabin haluan atas untuk mendapatkan ventilasi alami laut dan sudut pandang 180 derajat tanpa halangan.",
    bestMoment: "Golden hour senja (17.00 – 18.15 WITA) saat langit jingga memantul di permukaan laut tenang.",
    packageId: "labuan-bajo-phinisi",
    packageName: "Labuan Bajo Explorer & Phinisi"
  },
  {
    id: "g3",
    title: "Tebing Kelingking Nusa Penida",
    destination: "Bali",
    destinationId: "bali",
    location: "Nusa Penida, Bali",
    category: "Pesisir & Tebing Karang",
    image: ASSET_IMAGES.destinations.bali.gallery[1],
    fallback: ASSET_IMAGES.destinations.bali.primary,
    shortDescription: "Tebing kapur menjulang tinggi berbentuk dinosaurus dengan gradasi samudra biru safir.",
    detailedDescription: "Formasi tebing curam menjulang tinggi menyerupai punggung dinosaurus T-Rex yang memeluk pantai berpasir putih murni di bawahnya. Deburan ombak Samudra Hindia menciptakan pemandangan spektakuler tak terlupakan dari gardu pandang atas.",
    travelInsight: "Bila hendak menuruni jalur tebing ke pasir pantai, pastikan menggunakan alas kaki trekking yang memiliki cengkeraman kuat.",
    bestMoment: "Pukul 08.30 – 10.30 WITA ketika sinar mentari pagi menerangi lekukan tebing tanpa bayangan gelap.",
    packageId: "bali-escape",
    packageName: "Bali Escape & Nusa Penida"
  },
  {
    id: "g4",
    title: "Sunrise Kaldera Tengger & Bromo",
    destination: "Bromo & Malang",
    destinationId: "bromo",
    location: "Gunung Bromo, Jawa Timur",
    category: "Pegunungan & Vulkanik",
    image: ASSET_IMAGES.destinations.bromo.primary,
    fallback: ASSET_IMAGES.destinations.bromo.fallback,
    shortDescription: "Matahari terbit menyinari kawah aktif Bromo dan Gunung Batok dalam lautan kabut lembut.",
    detailedDescription: "Dari gardu pandang Penanjakan atau Bukit Kingkong, saksikan semburat cahaya pagi membelah lautan kabut yang menyelimuti kaldera Tengger purba dengan latar Gunung Semeru yang kokoh di kejauhan.",
    travelInsight: "Suhu udara subuh dapat menyentuh 5°C. Siapkan jaket termal tahan angin, kupluk, dan sarung tangan hangat.",
    bestMoment: "Subuh fajar (05.00 – 06.15 WIB) saat semburat jingga keemasan mulai menembus kabut kaldera.",
    packageId: "bromo-sunrise",
    packageName: "Bromo Golden Sunrise & Malang"
  },
  {
    id: "g5",
    title: "Stupa Borobudur Berkabut Pagi",
    destination: "Yogyakarta",
    destinationId: "yogyakarta",
    location: "Magelang & Yogyakarta",
    category: "Budaya & Warisan Luhur",
    image: ASSET_IMAGES.destinations.yogyakarta.primary,
    fallback: ASSET_IMAGES.destinations.yogyakarta.fallback,
    shortDescription: "Kedamaian spiritual di pelataran candi Buddha terbesar di dunia saat fajar menyingsing.",
    detailedDescription: "Kemegahan arsitektur abad ke-8 yang tersusun dari ribuan blok batu andesit berelief detail. Di antara deretan stupa berongga, pemandangan lembah Menoreh yang terselimuti kabut pagi menciptakan suasana hening yang sakral.",
    travelInsight: "Kunjungan pagi hari sesi pertama memberikan kesempatan mengamati detail relief batu dengan pencahayaan alami terbaik.",
    bestMoment: "Sunrise fajar (05.30 – 07.00 WIB) saat siluet stupa disinari mentari pagi berkabut tipis.",
    packageId: "yogyakarta-heritage",
    packageName: "Yogyakarta Cultural Journey"
  },
  {
    id: "g6",
    title: "Panorama Bukit Merese Senja",
    destination: "Lombok",
    destinationId: "lombok",
    location: "Lombok Selatan, NTB",
    category: "Pantai & Perbukitan",
    image: ASSET_IMAGES.destinations.lombok.primary,
    fallback: ASSET_IMAGES.destinations.lombok.fallback,
    shortDescription: "Hamparan bukit savana hijau menjorok ke samudra dengan semilir angin laut sejuk.",
    detailedDescription: "Trekking santai menyusuri bukit savana hijau yang berbatasan langsung dengan Samudra Hindia. Garis pantai berkelok dengan butiran pasir merica Tanjung Aan di kejauhan menjadikannya lokasi relaksasi alam terindah di Lombok Selatan.",
    travelInsight: "Waktu terbaik berjalan di punggung bukit adalah 1 jam sebelum matahari terbenam untuk menghindari terik siang.",
    bestMoment: "Sore hari (16.45 – 18.00 WITA) saat hembusan angin samudra bertiup tenang di puncak bukit.",
    packageId: "lombok-adventure",
    packageName: "Lombok Tropical Escape & Gili"
  },
  {
    id: "g7",
    title: "Siluet Dancing Trees Pantai Walakiri",
    destination: "Sumba",
    destinationId: "sumba",
    location: "Sumba Timur, NTT",
    category: "Pesisir & Siluet Senja",
    image: ASSET_IMAGES.destinations.sumba.fallback,
    fallback: ASSET_IMAGES.destinations.sumba.primary,
    shortDescription: "Pohon bakau kerdil membentuk siluet indah menyerupai penari saat matahari terbenam.",
    detailedDescription: "Pohon-pohon mangrove kerdil yang tumbuh alami di pasir putih pantai berair dangkal. Saat air laut surut di kala senja, batangnya yang meliuk-liuk membentuk siluet penari tradisional di atas permukaan air laut yang memantulkan langit keemasan.",
    travelInsight: "Periksa tabel pasang surut air laut harian lokal; siluet pohon tampak paling dramatis tepat saat surut terendah senja.",
    bestMoment: "Sunset pasang surut (17.15 – 18.15 WITA) saat warna langit bertransisi dari jingga ke nila.",
    packageId: "sumba-paradise",
    packageName: "Sumba Hidden Paradise"
  },
  {
    id: "g8",
    title: "Panorama Kaldera Danau Toba",
    destination: "Danau Toba",
    destinationId: "toba",
    location: "Sumatera Utara",
    category: "Danau Kaldera Vulkanik",
    image: ASSET_IMAGES.destinations.toba.primary,
    fallback: ASSET_IMAGES.destinations.toba.fallback,
    shortDescription: "Danau kaldera raksasa purba terbesar di Asia Tenggara dikelilingi perbukitan pinus hijau.",
    detailedDescription: "Kaldera raksasa hasil letusan supervulkan purba yang kini menjadi danau tenang berair biru jernih, dikelilingi tebing-tebing perbukitan pinus dan Pulau Samosir yang menyimpan kekayaan tradisi luhur suku Batak.",
    travelInsight: "Menikmati secangkir kopi arabika Lintong hangat di tepi tebing Tele atau Huta Ginjang memberi pengalaman multi-indra yang berkesan.",
    bestMoment: "Pagi hari (07.00 – 09.00 WIB) saat kabut tipis perlahan terangkat dari permukaan air danau.",
    packageId: "toba-highland",
    packageName: "Danau Toba Cultural Escape"
  },
  {
    id: "g9",
    title: "Danau Ubur-Ubur Kakaban",
    destination: "Derawan",
    destinationId: "derawan",
    location: "Kepulauan Derawan, Kalimantan Timur",
    category: "Bahari & Keajaiban Alam",
    image: ASSET_IMAGES.destinations.derawan.primary,
    fallback: ASSET_IMAGES.destinations.derawan.fallback,
    shortDescription: "Berenang di danau prasejarah bersama jutaan ubur-ubur tanpa sengat yang jinak.",
    detailedDescription: "Danau air payau terisolasi di Pulau Kakaban yang dihuni oleh 4 spesies ubur-ubur langka yang telah kehilangan kemampuan menyengat selama ribuan tahun evolusi aman. Menyelam di sini serasa memasuki dimensi dunia bawah air yang damai.",
    travelInsight: "Dilarang keras memakai fins/kaki katak dan sunscreen kimia demi menjaga keselamatan tubuh lunak ubur-ubur.",
    bestMoment: "Tengah hari (10.30 – 13.00 WITA) saat ubur-ubur berenang naik mendekati permukaan air hangat.",
    packageId: "derawan-adventure",
    packageName: "Derawan Island Adventure"
  },
  {
    id: "g10",
    title: "Batuan Granit Pantai Tanjung Tinggi",
    destination: "Belitung",
    destinationId: "belitung",
    location: "Belitung, Kepulauan Bangka Belitung",
    category: "Pantai & Fenomena Geologis",
    image: ASSET_IMAGES.destinations.belitung.primary,
    fallback: ASSET_IMAGES.destinations.belitung.fallback,
    shortDescription: "Formasi batuan granit raksasa berumur jutaan tahun berpadu laut toska sebening kristal.",
    detailedDescription: "Hamparan batuan granit raksasa purba yang tersebar artistik di sepanjang pantai berpasir sehalus tepung. Air laut yang tenang tanpa ombak besar menjadikannya teluk alami yang sangat aman untuk berenang santai.",
    travelInsight: "Jelajahi labirin celah di antara dua batu granit raksasa untuk menemukan laguna kecil privat yang teduh.",
    bestMoment: "Pagi cerah (08.00 – 10.00 WIB) saat kejernihan air laut terlihat tembus hingga ke dasar pasir.",
    packageId: "belitung-island",
    packageName: "Belitung Island Hopping Escape"
  },
  {
    id: "g11",
    title: "Golden Sunrise Puncak Sikunir",
    destination: "Dieng",
    destinationId: "dieng",
    location: "Wonosobo, Jawa Tengah",
    category: "Pegunungan & Fenomena Awan",
    image: ASSET_IMAGES.destinations.dieng.primary,
    fallback: ASSET_IMAGES.destinations.dieng.fallback,
    shortDescription: "Pemandangan fajar emas di atas samudra awan berlatar siluet megah Gunung Sindoro.",
    detailedDescription: "Bukit Sikunir di Desa Sembungan (desa tertinggi di Pulau Jawa) menawarkan fenomena golden sunrise terindah. Cahaya fajar keemasan membelah hamparan lautan awan putih dengan siluet kerucut sempurna gunung-gunung Jawa Tengah.",
    travelInsight: "Jalur tangga semen ramah pendaki pemula, dapat dicapai dengan trekking santai sekitar 25–35 menit dari area parkir Telaga Cebong.",
    bestMoment: "Fajar dini hari (05.15 – 05.50 WIB) tepat saat fajar menyingsing di cakrawala timur.",
    packageId: "dieng-explorer",
    packageName: "Dieng Cloud Plateau Explorer"
  },
  {
    id: "g12",
    title: "Kemegahan Rumah Adat Tongkonan",
    destination: "Toraja",
    destinationId: "toraja",
    location: "Tana Toraja, Sulawesi Selatan",
    category: "Budaya & Arsitektur Adat",
    image: ASSET_IMAGES.destinations.toraja.primary,
    fallback: ASSET_IMAGES.destinations.toraja.fallback,
    shortDescription: "Deretan atap lengkung perahu rumah adat Tongkonan di desa adat bersejarah Kete Kesu.",
    detailedDescription: "Kompleks perkampungan adat Kete Kesu yang dikelilingi persawahan asri dan tebing kapur pemakaman kuno. Arsitektur rumah panggung kayu berukir motif geometris khas Toraja dengan hiasan deretan tanduk kerbau mencerminkan falsafah hidup yang mendalam.",
    travelInsight: "Mintalah panduan pemandu lokal untuk memahami makna simbolik ukiran empat warna sakral: merah, kuning, putih, dan hitam.",
    bestMoment: "Pagi hari (08.30 – 10.30 WITA) saat sinar mentari menerangi ukiran pahat kayu mahoni dinding Tongkonan.",
    packageId: "toraja-heritage",
    packageName: "Tana Toraja Sacred Heritage"
  },
  {
    id: "g13",
    title: "Taman Bawah Laut Karang Wakatobi",
    destination: "Wakatobi",
    destinationId: "wakatobi",
    location: "Pulau Tomia, Wakatobi, Sulawesi Tenggara",
    category: "Bahari & Terumbu Karang",
    image: ASSET_IMAGES.destinations.wakatobi.primary,
    fallback: ASSET_IMAGES.destinations.wakatobi.fallback,
    shortDescription: "Keanekaragaman hayati terumbu karang penghalang terindah di pusat segitiga karang dunia.",
    detailedDescription: "Wakatobi diakui secara global sebagai episentrum keanekaragaman hayati laut dunia. Lebih dari 750 spesies terumbu karang hidup berdampingan dalam perairan bergradasi biru safir yang menawarkan visibilitas bawah air hingga 30 meter.",
    travelInsight: "Spot Mari Mabuk dan Roma Reef di Pulau Tomia adalah surga penyelaman dengan dinding karang vertikal spektakuler.",
    bestMoment: "Pagi hari (08.00 – 11.00 WITA) saat cahaya matahari menembus kedalaman karang dengan kejernihan maksimal.",
    packageId: "wakatobi-expedition",
    packageName: "Wakatobi Coral Reef Expedition"
  },
  {
    id: "g14",
    title: "Kawah Putih Ciwidey Berkabut",
    destination: "Bandung",
    destinationId: "bandung",
    location: "Ciwidey, Bandung, Jawa Barat",
    category: "Vulkanik & Danau Belerang",
    image: ASSET_IMAGES.destinations.bandung.primary,
    fallback: ASSET_IMAGES.destinations.bandung.fallback,
    shortDescription: "Danau kawah vulkanik berwarna toska keputihan berbalut kabut pegunungan Patuha.",
    detailedDescription: "Kawah vulkanik purba Gunung Patuha yang berada di ketinggian 2.434 mdpl. Air danau belerang yang dapat berubah warna dari putih kehijauan hingga toska cerah, berpadu dengan pepohonan cantigi kering dan kabut dingin pegunungan.",
    travelInsight: "Disarankan membawa masker dan jaket hangat karena aroma belerang alami dan suhu pagi yang sejuk sekitar 15°C.",
    bestMoment: "Pagi hari (07.30 – 09.30 WIB) saat kabut perlahan menipis diterpa hangatnya mentari pagi.",
    packageId: "bandung-retreat",
    packageName: "Bandung Highland & Tea Plantation"
  },
  {
    id: "g15",
    title: "Perairan Tropis & Karang Karimunjawa",
    destination: "Karimunjawa",
    destinationId: "karimunjawa",
    location: "Kepulauan Karimunjawa, Jawa Tengah",
    category: "Kepulauan & Snorkeling",
    image: ASSET_IMAGES.destinations.karimunjawa.primary,
    fallback: ASSET_IMAGES.destinations.karimunjawa.fallback,
    shortDescription: "Gugusan 27 pulau tropis dengan hamparan terumbu karang dangkal dan pasir putih halus.",
    detailedDescription: "Taman Nasional Kepulauan Karimunjawa di Laut Jawa menyajikan panorama bahari tenang tanpa gelombang besar. Wisatawan dapat snorkeling di Pulau Menjangan Kecil, mengunjungi penangkaran hiu jinak, dan menikmati sunset di Pantai Ujung Gelam.",
    travelInsight: "Waktu penyeberangan kapal cepat dari Jepara paling ideal dilakukan saat periode laut tenang musim timur.",
    bestMoment: "Sore hari (16.30 – 17.45 WIB) saat menikmati kelapa muda segar di Pantai Ujung Gelam berlatar pohon kelapa miring.",
    packageId: "karimunjawa-getaway",
    packageName: "Karimunjawa Island Getaway"
  },
  {
    id: "g16",
    title: "Pantai Pasir Merah Muda (Pink Beach)",
    destination: "Labuan Bajo",
    destinationId: "labuan-bajo",
    location: "Taman Nasional Komodo, NTT",
    category: "Pesisir & Pasir Berwarna",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Pink_Beach%2C_Padar_Island%2C_Komodo_National_Park.jpg/1280px-Pink_Beach%2C_Padar_Island%2C_Komodo_National_Park.jpg",
    fallback: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Padar_Island%2C_Komodo_National_Park%2C_Indonesia%2C_20250822_0911_2638.jpg/1280px-Padar_Island%2C_Komodo_National_Park%2C_Indonesia%2C_20250822_0911_2638.jpg",
    shortDescription: "Salah satu dari sedikit pantai berpasir merah muda di dunia hasil pecahan foraminifera karang merah.",
    detailedDescription: "Pantai unik dengan warna pasir merah muda merona alami yang tercipta dari pecahan cangkang mikroskopis foraminifera bercampur pasir putih bersih. Gradasi warna air laut toska berpadu pasir merah muda menciptakan kontras lanskap yang memukau mata.",
    travelInsight: "Warna merah muda pasir terlihat paling mencolok saat butiran pasir basah tersapu buih ombak tenang di siang hari.",
    bestMoment: "Siang hari cerah (10.00 – 13.00 WITA) saat posisi matahari tepat di atas kepala memberikan kontras warna terjelas.",
    packageId: "labuan-bajo-phinisi",
    packageName: "Labuan Bajo Explorer & Phinisi"
  },
  {
    id: "g17",
    title: "Lanskap Ngarai Sianok & Bukittinggi",
    destination: "Sumatera",
    destinationId: "toba",
    location: "Bukittinggi, Sumatera Barat",
    category: "Ngarai & Lembah Hijau",
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80",
    fallback: ASSET_IMAGES.destinations.toba.primary,
    shortDescription: "Lembah patahan geologis curam berbalut vegetasi hijau subur di dataran tinggi Minangkabau.",
    detailedDescription: "Ngarai Sianok adalah fenomena lembah patahan bumi sedalam 100 meter yang membentang anggun di jantung Bukittinggi. Udara sejuk pegunungan dan panorama latar Gunung Singgalang menghadirkan ketenangan alam khas bumi Minang.",
    travelInsight: "Taman Panorama Bukittinggi adalah titik terbaik untuk menyaksikan keseluruhan liukan dinding jurang Ngarai Sianok.",
    bestMoment: "Pagi hari berkabut (06.30 – 08.00 WIB) saat sinar matahari menyusup di antara celah jurang purba.",
    packageId: "toba-highland",
    packageName: "Danau Toba Heritage & Samosir"
  },
  {
    id: "g18",
    title: "Laguna Zamrud Kepulauan Wayag",
    destination: "Raja Ampat",
    destinationId: "raja-ampat",
    location: "Raja Ampat, Papua Barat Daya",
    category: "Bahari & Kepulauan",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    fallback: ASSET_IMAGES.destinations.rajaAmpat.primary,
    shortDescription: "Puncak keindahan gugusan atol karst paling legendaris di jantung belahan khatulistiwa Papua.",
    detailedDescription: "Kepulauan Wayag adalah ikon puncak petualangan Raja Ampat. Tebing-tebing bukit karang runcing menjulang dari atas air laut bergradasi zamrud toska pekat yang dihuni oleh baby shark dan penyu sisik di tepian teluknya.",
    travelInsight: "Trekking menuju puncak Wayag 2 memerlukan stamina prima menaiki batu karang terjal dengan bantuan tambang pengaman.",
    bestMoment: "Tengah hari (11.00 – 14.00 WIT) saat cahaya matahari tegak lurus menyinari palung laut di dasar laguna.",
    packageId: "raja-ampat-ultimate",
    packageName: "Raja Ampat Discovery"
  }
];

export const STORIES = [
  {
    id: "panduan-labuan-bajo",
    title: "Panduan Lengkap Sailing Trip Labuan Bajo: Waktu Terbaik & Tips Phinisi",
    excerpt: "Semua hal krusial yang perlu kamu ketahui sebelum memesan liveaboard di Flores: memilih tipe kabin, perlengkapan trekking Padar, hingga tips snorkeling bersama pari manta.",
    author: "Tim Ekspedisi FADZA",
    date: "14 Juni 2026",
    readTime: "6 Menit Baca",
    image: ASSET_IMAGES.destinations.labuanBajo.primary,
    fallbackImage: ASSET_IMAGES.destinations.labuanBajo.fallback,
    category: "Travel Guide"
  },
  {
    id: "hidden-gems-ubud",
    title: "7 Sudut Tersembunyi di Ubud untuk Liburan Tenang Tanpa Keramaian",
    excerpt: "Lepas dari hiruk pikuk pusat kota, temukan rute terasering sawah asri, air terjun alami, dan kedai kopi lokal yang menenangkan jiwa.",
    author: "Sarah Lestari",
    date: "28 Mei 2026",
    readTime: "5 Menit Baca",
    image: ASSET_IMAGES.destinations.bali.primary,
    fallbackImage: ASSET_IMAGES.destinations.bali.fallback,
    category: "Inspirasi"
  },
  {
    id: "tips-packing-trip-kepulauan",
    title: "Checklist Packing Trip Kepulauan Tropis: Praktis, Ringan, dan Aman",
    excerpt: "Jangan biarkan barang bawaan berlebihan membebani liburan baharimu. Simak daftar barang penting anti air dan tips menjaga kamera di perairan asin.",
    author: "Dimas Arya",
    date: "10 April 2026",
    readTime: "4 Menit Baca",
    image: ASSET_IMAGES.destinations.rajaAmpat.primary,
    fallbackImage: ASSET_IMAGES.destinations.rajaAmpat.fallback,
    category: "Tips & Trik"
  }
];

// Ensure every package in PACKAGES has both .image and .heroImage normalized
PACKAGES.forEach((pkg) => {
  if (!pkg.image) {
    pkg.image = pkg.heroImage || pkg.fallbackImage;
  }
  if (!pkg.heroImage) {
    pkg.heroImage = pkg.image || pkg.fallbackImage;
  }
});

