const fs = require('fs');

// Read step_341.txt as base
const baseContent = fs.readFileSync('step_341.txt', 'utf8');

// 1. Destination knowledge dictionary for 12 base destinations
const destKnowledge = {
  bali: {
    galleryKey: 'bali',
    weatherDetails: "Suhu tropis rata-rata 26°C–31°C sepanjang tahun. Musim terbaik adalah Mei hingga September dengan langit cerah, kelembapan sejuk, dan sunset terindah.",
    localCuisine: [
      { name: "Ayam Betutu Gilimanuk", desc: "Ayam kampung berbumbu base genep rempah lengkap yang dimasak lambat hingga empuk meresap." },
      { name: "Sate Lilit Ikan Laut", desc: "Daging ikan segar cincang berpadu kelapa parut dan serai wangi, dibakar arang kelapa." },
      { name: "Nasi Campur Bali & Lawar", desc: "Kombinasi nasi hangat dengan aneka sayur lawar kelapa, kacang panjang, sambal matah, dan sate." }
    ],
    culturalEtiquette: [
      "Selalu kenakan sarung dan selendang saat memasuki area pura peribadatan suci.",
      "Jangan melangkahi atau menginjak sesajen canang sari yang diletakkan di tanah/trotoar.",
      "Gunakan tangan kanan saat memberi atau menerima sesuatu dari warga lokal."
    ],
    transportationGuide: "Penerbangan langsung ke Bandara Internasional I Gusti Ngurah Rai (DPS). Tersedia penjemputan privat FADZA TRAVEL dan fast boat resmi menuju Nusa Penida."
  },
  'labuan-bajo': {
    galleryKey: 'labuanBajo',
    weatherDetails: "Suhu tropis kering berkisar 26°C–32°C. Periode terbaik Mei hingga Oktober saat perairan tenang untuk sailing dan langit biru cerah.",
    localCuisine: [
      { name: "Seafood Bakar Ikan Kuah Asam", desc: "Ikan kakap karang segar kuah asam kunyit pedas khas pesisir Flores." },
      { name: "Kolo (Nasi Bambu)", desc: "Beras berpadu santan dan rempah yang dibakar perlahan dalam bilah bambu." },
      { name: "Jagung Bose", desc: "Bubur jagung manis khas NTT dengan kacang merah dan santan lembut gurih." }
    ],
    culturalEtiquette: [
      "Selalu ikuti instruksi ranger saat berada di area habitat Komodo.",
      "Gunakan tabir surya ramah terumbu karang (reef-safe).",
      "Jangan membuang sampah apa pun ke perairan Taman Nasional Komodo."
    ],
    transportationGuide: "Penerbangan langsung ke Bandara Komodo Labuan Bajo (LBJ). Dilanjutkan antar-jemput privat menuju dermaga Marina Labuan Bajo untuk naik kapal Phinisi."
  },
  'raja-ampat': {
    galleryKey: 'rajaAmpat',
    weatherDetails: "Suhu laut 28°C–30°C dengan visibilitas luar biasa hingga 30 meter. Periode terbaik Oktober hingga April saat laut sangat tenang dan pari manta berkumpul.",
    localCuisine: [
      { name: "Papeda & Ikan Kuah Kuning", desc: "Sagu kenyal khas Papua dinikmati dengan sup ikan kakap berkuah kunyit rempah asam segar." },
      { name: "Ikan Bungkus Daun Talas", desc: "Ikan laut berbumbu rempah daun kemangi yang dibakar dalam balutan daun talas." },
      { name: "Kelapa Muda Manokwari", desc: "Kesegaran kelapa muda murni di tepi gugusan pulau karst." }
    ],
    culturalEtiquette: [
      "Hormati kearifan adat Sasi laut tradisional setempat.",
      "Dilarang menyentuh atau mematahkan terumbu karang hidup saat snorkeling/diving.",
      "Bawa kembali sampah plastik pribadi ke daratan Sorong."
    ],
    transportationGuide: "Penerbangan ke Bandara DEO Sorong (SOQ), dilanjutkan kapal cepat Bahari Express (2 jam) atau speedboat privat FADZA menuju Waisai Raja Ampat."
  },
  lombok: {
    galleryKey: 'lombok',
    weatherDetails: "Suhu rata-rata 25°C–32°C. Periode terbaik Mei hingga Oktober saat ombak tenang dan pemandangan perbukitan savana menghijau.",
    localCuisine: [
      { name: "Ayam Taliwang Pedas", desc: "Ayam bakar bumbu cabai rawit merah pedas, terasi khas Lombok, dan perasan jeruk limau." },
      { name: "Plecing Kangkung", desc: "Kangkung air segar renyah disiram sambal tomat terasi dengan taburan kacang tanah sangrai." },
      { name: "Sate Bulayak", desc: "Sate daging sapi empuk berlumur bumbu kari santan kental dengan lontong daun aren." }
    ],
    culturalEtiquette: [
      "Gunakan pakaian sopan saat berkunjung ke Desa Adat Sade suku Sasak.",
      "Lepas alas kaki saat memasuki rumah adat tradisional berlantai tanah liat.",
      "Sapalah warga lokal dengan ramah dan senyuman."
    ],
    transportationGuide: "Penerbangan ke Bandara Internasional Lombok Praya (LOP) atau fast boat dari Padangbai Bali menuju Gili Trawangan dan Pelabuhan Bangsal."
  },
  yogyakarta: {
    galleryKey: 'yogyakarta',
    weatherDetails: "Suhu berkisar 24°C–32°C. Musim kemarau Mei hingga Oktober sangat ideal untuk mengeksplorasi candi, pantai selatan, dan perbukitan Menoreh.",
    localCuisine: [
      { name: "Gudeg Yu Djum", desc: "Nangka muda dimasak manis gurih dengan santan kental, krecek pedas, dan telur bebek bumbu bacem." },
      { name: "Bakpia Pathok Hangat", desc: "Kue kering tradisional isi kacang hijau manis legit yang baru matang dari pemanggang." },
      { name: "Sate Klathak Pak Pong", desc: "Sate kambing muda ditusuk jeruji besi berkuah gulai gurih khas Imogiri Bantul." }
    ],
    culturalEtiquette: [
      "Gunakan pakaian sopan dan tertutup saat memasuki area Keraton Yogyakarta dan Candi Borobudur.",
      "Bertutur kata santun dan hindari suara keras di area suci candi.",
      "Gunakan tangan kanan saat menunjuk atau menyerahkan sesuatu."
    ],
    transportationGuide: "Penerbangan ke Bandara Internasional Yogyakarta (YIA) di Kulon Progo dengan akses KA Bandara (39 menit) ke pusat kota, atau kereta eksekutif ke Stasiun Tugu."
  },
  bromo: {
    galleryKey: 'bromo',
    weatherDetails: "Suhu siang 15°C–20°C, sedangkan dini hari dapat mencapai 3°C–8°C. Musim terbaik Mei hingga Oktober untuk view sunrise langit bersih.",
    localCuisine: [
      { name: "Bakso Bakar & Bakso Malang", desc: "Bakso daging sapi kenyal kuah kaldu sumsum gurih dilengkapi pangsit renyah dan tahu bakso." },
      { name: "Nasi Aron Tengger", desc: "Nasi jagung pulen tradisional suku Tengger berpadu sambal terong dan ikan asin gurih." },
      { name: "Apel Manalagi Malang", desc: "Buah apel manis renyah yang dipetik langsung dari kebun agrowisata Batu." }
    ],
    culturalEtiquette: [
      "Gunakan jaket tebal berbulu, sarung tangan, syal, dan masker debu pasir.",
      "Hormati kesakralan Kawah Bromo bagi masyarakat adat suku Tengger.",
      "Gunakan jasa ojek kuda berlisensi resmi bila tidak kuat mendaki tangga kawah."
    ],
    transportationGuide: "Kereta api atau penerbangan ke Stasiun/Bandara Surabaya (SUB) atau Malang (MLG), dilanjutkan transfer mobil privat AC menuju hotel lereng Tengger."
  },
  bandung: {
    galleryKey: 'bandung',
    weatherDetails: "Suhu sejuk 18°C–26°C khas dataran tinggi Priangan. Cocok dikunjungi sepanjang tahun dengan rekomendasi hari kerja untuk ketenangan maksimal.",
    localCuisine: [
      { name: "Batagor & Siomay Kingsley", desc: "Olahan ikan tenggiri kenyal digoreng keemasan disiram saus kacang gurih pedas manis." },
      { name: "Nasi Timbel Komplit", desc: "Nasi pulen dibungkus daun pisang harum dengan ayam goreng lengkuas, tahu, tempe, dan sambal terasi." },
      { name: "Surabi Kinca Oncom", desc: "Kue surabi bakar tanah liat dengan varian kuah gula merah kinca atau taburan oncom pedas." }
    ],
    culturalEtiquette: [
      "Gunakan pakaian hangat berlapis saat mengunjungi kawah Tangkuban Parahu atau Kawah Putih Ciwidey.",
      "Patuhi rambu peringatan bau belerang aktif di dekat kawah.",
      "Gunakan masker dan kacamata saat kabut belerang menebal."
    ],
    transportationGuide: "Akses kereta cepat Whoosh Jakarta-Bandung hanya 30 menit ke Stasiun Padalarang/Tegalluar, atau perjalanan darat via Tol Cipularang (2-3 jam)."
  },
  toba: {
    galleryKey: 'toba',
    weatherDetails: "Suhu sejuk berkisar 19°C–27°C. Bulan Mei hingga September adalah waktu paling cerah menikmati lanskap danau kaldera terbesar di dunia.",
    localCuisine: [
      { name: "Ikan Mas Arsik", desc: "Ikan mas danau dimasak bumbu rempah kuning andaliman khas Batak dengan rasa getir asam segar." },
      { name: "Mie Gomak Kuah Santan", desc: "Mie lidi kenyal berkuah santan andaliman pedas harum serai yang menghangatkan tubuh." },
      { name: "Kopi Arabika Lintong", desc: "Kopi single origin aroma floral dan cokelat pekat dari dataran tinggi sekitar danau." }
    ],
    culturalEtiquette: [
      "Gunakan kain ulos dengan posisi yang benar saat menari Tor-Tor bersama tetua adat.",
      "Lepas alas kaki saat memasuki Rumah Bolon adat Batak.",
      "Hormati makam batu kuno para raja di Desa Tomok Samosir."
    ],
    transportationGuide: "Penerbangan langsung ke Bandara Internasional Silangit (DTB) di Siborong-borong (hanya 30 menit ke danau), atau Bandara Kualanamu Medan (KNO) via tol."
  },
  derawan: {
    galleryKey: 'derawan',
    weatherDetails: "Suhu laut 27°C–29°C dengan visibilitas snorkeling jernih. Periode terbaik April hingga Oktober saat angin tenang dan ubur-ubur Kakaban sangat aktif.",
    localCuisine: [
      { name: "Kepiting Kenari Saus Lada Hitam", desc: "Kepiting laut berdaging tebal gurih manis dengan limpahan rempah lada hitam pedas nikmat." },
      { name: "Kima & Kerang Laut Bakar", desc: "Kerang laut segar tangkapan nelayan lokal dibakar dengan perasan jeruk nipis dan sambal dabu." },
      { name: "Ikan Asin Teluk Sulaiman", desc: "Ikan asin renyah gurih khas pesisir Berau." }
    ],
    culturalEtiquette: [
      "Dilarang keras memakai fin / kaki katak saat berenang di Danau Ubur-Ubur Kakaban agar tidak menyakiti ubur-ubur tanpa sengat.",
      "Jangan melompat / diving di danau Kakaban.",
      "Dilarang memegang penyu yang sedang bertelur di Pulau Sangalaki."
    ],
    transportationGuide: "Penerbangan ke Bandara Kalimarau Berau (BEJ) atau Bandara Tarakan, dilanjutkan mobil 2 jam ke Pelabuhan Tanjung Batu dan speedboat 30 menit ke Derawan."
  },
  bunaken: {
    galleryKey: 'bunaken',
    weatherDetails: "Suhu tropis rata-rata 27°C–31°C. Periode terbaik Mei hingga Oktober dengan visibilitas bawah laut mencapai 30-40 meter di dinding karang vertical drop-off.",
    localCuisine: [
      { name: "Tinutuan (Bubur Manado)", desc: "Bubur beras kaya labu kuning, kangkung, kemangi wangi disajikan dengan sambal roa dan perkedel jagung." },
      { name: "Ikan Cakalang Fufu Saus Rica", desc: "Ikan cakalang asap harum disuwir berbalur cabai rica pedas menggugah selera." },
      { name: "Klappertaart Panggang", desc: "Kue lembut Belanda khas Manado isi daging kelapa muda, kismis, kayu manis, dan keju gurih." }
    ],
    culturalEtiquette: [
      "Gunakan tabir surya bersertifikasi reef-friendly.",
      "Jangan menginjak terumbu karang karpet di tepi pantai saat surut.",
      "Buang sampah di tempat tertutup agar tidak terbawa angin ke laut."
    ],
    transportationGuide: "Penerbangan langsung ke Bandara Sam Ratulangi Manado (MDC), dilanjutkan perjalanan mobil 20 menit ke Dermaga Marina Manado dan speedboat 35 menit ke Bunaken."
  },
  sumba: {
    galleryKey: 'sumba',
    weatherDetails: "Suhu berkisar 24°C–33°C. Musim terbaik Mei hingga Oktober saat bukit savana berubah warna dari hijau menjadi emas eksotis menyerupai Afrika.",
    localCuisine: [
      { name: "Se’i Daging Sapi Asap", desc: "Daging sapi diasap perlahan dengan kayu kosambi menghasilkan aroma smoky lembut khas NTT." },
      { name: "Ro’o Luwa (Sayur Daun Ubi)", desc: "Olahan daun ubi ditumbuk halus dimasak santan gurih dan beras jagung." },
      { name: "Kue Rambut Sumba", desc: "Camilan manis renyah dari tepung beras dan gula aren menyerupai helaian benang emas." }
    ],
    culturalEtiquette: [
      "Bawalah sirih pinang atau permen sebagai tanda salam persahabatan saat bertamu ke kampung adat Prai Ijing atau Ratenggaro.",
      "Minta izin sebelum memotret warga lokal atau kubur batu megalitikum.",
      "Gunakan pakaian sopan saat berada di pemukiman warga adat."
    ],
    transportationGuide: "Penerbangan ke Bandara Tambolaka (TMC) Sumba Barat Daya atau Bandara Umbu Mehang Kunda Waingapu (WGP) via Denpasar atau Kupang."
  },
  belitung: {
    galleryKey: 'belitung',
    weatherDetails: "Suhu tropis pesisir 26°C–31°C. Bulan Maret hingga Oktober adalah musim terbaik dengan ombak tenang untuk island hopping perahu tradisional.",
    localCuisine: [
      { name: "Mie Belitung Atep", desc: "Mie kuning kenyal kuah kaldu udang manis gurih dengan topping kentang rebus, tauge renyah, dan kerupuk emping." },
      { name: "Gangan Ikan Tenggiri Kuning", desc: "Sup ikan kuah kunyit asam segar berpadu irisan nanas muda yang membangkitkan selera." },
      { name: "Kopi Kong Djie", desc: "Kopi saring tubruk tradisional legendaris beraroma arang yang diseduh sejak tahun 1943." }
    ],
    culturalEtiquette: [
      "Hati-hati saat menaiki batuan granit besar yang basah di tepi pantai agar tidak terpeleset.",
      "Jaga kebersihan pulau-pulau kecil tak berpenghuni seperti Pulau Lengkuas dan Batu Berlayar.",
      "Patuhi aturan naik ke mercusuar bersejarah Pulau Lengkuas."
    ],
    transportationGuide: "Penerbangan langsung hanya 50 menit dari Bandara Soekarno-Hatta Jakarta (CGK) ke Bandara H.A.S. Hanandjoeddin Tanjung Pandan Belitung (TJQ)."
  }
};

let updated = baseContent;

// Update destination galleries and inject knowledge for each base destination
for (const [id, info] of Object.entries(destKnowledge)) {
  // Regex to find the destination block: id: "id" ... gallery: [ ... ],
  const galleryRegex = new RegExp('(id:\\s*\"' + id + '\"[\\s\\S]*?gallery:\\s*)\\[[\\s\\S]*?\\n\\s*\\],', 'm');
  updated = updated.replace(galleryRegex, '$1ASSET_IMAGES.destinations.' + info.galleryKey + '.gallery,');

  // Inject knowledge fields right after gallery line
  const injectRegex = new RegExp('(id:\\s*\"' + id + '\"[\\s\\S]*?gallery:\\s*ASSET_IMAGES\\.destinations\\.' + info.galleryKey + '\\.gallery,)', 'm');
  const knowledgeBlock = '$1\n    weatherDetails: ' + JSON.stringify(info.weatherDetails) + ',\n    localCuisine: ' + JSON.stringify(info.localCuisine) + ',\n    culturalEtiquette: ' + JSON.stringify(info.culturalEtiquette) + ',\n    transportationGuide: ' + JSON.stringify(info.transportationGuide) + ',';
  updated = updated.replace(injectRegex, knowledgeBlock);
}

// 4 New Destinations
const newDestinations = `  {
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
`;

// Insert new destinations before '];\n\nexport const PACKAGES = ['
const destEndIndex = updated.indexOf('];\n\nexport const PACKAGES = [');
if (destEndIndex === -1) throw new Error("Could not find PACKAGES split");
updated = updated.slice(0, destEndIndex) + ',\n' + newDestinations + updated.slice(destEndIndex);

// 4 New Packages
const newPackages = `  {
    id: "dieng-explorer",
    slug: "dieng-explorer-3d2n",
    name: "Dieng Highland & Golden Sunrise Sikunir",
    destinationId: "dieng",
    destination: "Dieng Plateau, Jawa Tengah",
    tagline: "Pesona Negeri di Atas Awan, Telaga Warna & Kawah Sikidang",
    category: "Pegunungan & Budaya",
    travelStyle: "Healing & Adventure",
    duration: "3 Hari 2 Malam",
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
    destination: "Tana Toraja, Sulawesi Selatan",
    tagline: "Maha Warisan Rumah Tongkonan, Kubur Batu Londa & Kopi Dataran Tinggi",
    category: "Budaya & Warisan Luhur",
    travelStyle: "Cultural Immersion",
    duration: "4 Hari 3 Malam",
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
          { time: "08:00 - 09:00", activity: "Penjemputan di Bandara Sultan Hasanuddin Makassar oleh tim FADZA TRAVEL" },
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
    destination: "Kepulauan Wakatobi, Sulawesi Tenggara",
    tagline: "Eksplorasi Jantung Terumbu Karang Dunia & Keajaiban Lumba-Lumba",
    category: "Bahari & Bawah Laut",
    travelStyle: "Marine Adventure & Luxury",
    duration: "4 Hari 3 Malam",
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
    destination: "Kepulauan Karimunjawa, Jawa Tengah",
    tagline: "Snorkeling Nemo, Berenang Bersama Hiu Jinak & Pantai Kelapa Melengkung",
    category: "Pantai & Relaksasi",
    travelStyle: "Island Hopping & Healing",
    duration: "3 Hari 2 Malam",
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
`;

// Insert new packages before 'export const WHY_FADZA'
const pkgEndMatch = updated.match(/(\s*\}\s*)\n(\];\s*\n+export const WHY_FADZA)/);
if (!pkgEndMatch) throw new Error("Could not find packages end split");
const pkgInsertPos = pkgEndMatch.index + pkgEndMatch[1].length;
updated = updated.slice(0, pkgInsertPos) + ',\n' + newPackages + '\n' + updated.slice(pkgInsertPos);

// Replace TESTIMONIALS with 12 rich testimonials
const richTestimonials = `export const TESTIMONIALS = [
  {
    id: 1,
    name: "Dr. Raditya Pratama & Istri",
    origin: "Jakarta Selatan",
    packageTitle: "Labuan Bajo Explorer & Phinisi",
    rating: 5,
    tag: "Honeymoon",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    quote: "Pengalaman liveaboard phinisi bersama FADZA luar biasa! Awak kapal sangat ramah, makanan koki bintang lima di tengah laut, dan pemandangan sunset Padar tak pernah kami lupakan seumur hidup.",
    date: "Mei 2026"
  },
  {
    id: 2,
    name: "Maya Anggraini",
    origin: "Surabaya",
    packageTitle: "Bali Escape & Nusa Penida",
    rating: 5,
    tag: "Keluarga",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
    quote: "Awalnya bingung pilih paket di Bali yang aman buat ajak orang tua. Tim FADZA sabar banget bantu atur itinerary yang santai tanpa buru-buru. Driver-nya sangat sopan dan mobilnya wangi!",
    date: "Juni 2026"
  },
  {
    id: 3,
    name: "Bramantyo & Tim Kantor (PT Sinergi)",
    origin: "Bandung",
    packageTitle: "Bromo Sunrise Escape",
    rating: 5,
    tag: "Rombongan Kantor",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    quote: "Jeep 4x4 tepat waktu, driver jago fotoin kami di Pasir Berbisik, dan sunrise Penanjakan bener-bener magis. Harga jujur tanpa ada pungutan aneh-aneh. Recommended banget!",
    date: "Juli 2026"
  },
  {
    id: 4,
    name: "Kevin Sanjaya & Farhan",
    origin: "Tangerang",
    packageTitle: "Raja Ampat Ultimate Karst",
    rating: 5,
    tag: "Penyelam & Petualang",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    quote: "Raja Ampat adalah bucket list saya selama 5 tahun. Bersama FADZA, speed boat privatnya aman banget, guide menguasai spot karang tak tersentuh di Wayag dan Piaynemo. Bener-bener sebanding dengan biayanya!",
    date: "Agustus 2026"
  },
  {
    id: 5,
    name: "Anindya Putri",
    origin: "Yogyakarta",
    packageTitle: "Dieng Highland & Golden Sunrise",
    rating: 5,
    tag: "Solo Explorer",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    quote: "Sunrise di Bukit Sikunir di atas lautan awan bikin takjub sampai merinding. Homestay yang dipilihkan bersih dan ada air panas yang kencang. Mie ongkloknya nagih parah!",
    date: "Agustus 2026"
  },
  {
    id: 6,
    name: "Hendrikus & Amanda",
    origin: "Medan",
    packageTitle: "Sumba Savanna & Cultural Paradise",
    rating: 5,
    tag: "Fotografi & Pasangan",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
    quote: "Sumba bener-bener eksotis! Pemandangan savana bukit Warinding dan siluet pohon menari di Pantai Walakiri saat senja seperti lukisan hidup. Dokumentasi fotonya juara.",
    date: "Juli 2026"
  },
  {
    id: 7,
    name: "Keluarga Gunawan (5 Peserta)",
    origin: "Semarang",
    packageTitle: "Belitung Island & Granite Paradise",
    rating: 5,
    tag: "Keluarga Santai",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    quote: "Pantai Tanjung Tinggi batu granitnya bikin anak-anak betah berenang. Airnya sangat tenang dan jernih. Mie Belitung Atep-nya lezat banget. Liburan keluarga paling rileks tahun ini.",
    date: "Juni 2026"
  },
  {
    id: 8,
    name: "Reza Fahlevi",
    origin: "Makassar",
    packageTitle: "Toraja Cultural & Mystical Highlands",
    rating: 5,
    tag: "Budaya & Sejarah",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
    quote: "Pemandu budaya Toraja FADZA berwawasan sangat luas. Menjelaskan filosofi rumah Tongkonan dan kubur batu dengan sangat hikmat. Sangat puas dengan layanannya!",
    date: "Juli 2026"
  },
  {
    id: 9,
    name: "Nadira & Sarah",
    origin: "Jakarta Barat",
    packageTitle: "Karimunjawa Turquoise Getaway",
    rating: 5,
    tag: "Sahabat & Healing",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
    quote: "Pelarian singkat yang sempurna dari penatnya Jakarta. Berenang bareng hiu di Menjangan bikin deg-degan tapi seru banget! Sunset di Tanjung Gelam cantik tiada tara.",
    date: "Agustus 2026"
  },
  {
    id: 10,
    name: "Captain Dimas & Tim Diver",
    origin: "Denpasar",
    packageTitle: "Wakatobi Coral Paradise & Bajo Tribe",
    rating: 5,
    tag: "Penyelam Profesional",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=300&q=80",
    quote: "Sebagai diver aktif, terumbu karang Pulau Hoga Wakatobi adalah salah satu yang tersehat di bumi. Visibilitas 30 meter lebih! Terima kasih FADZA atas kapal diving yang prima.",
    date: "September 2026"
  },
  {
    id: 11,
    name: "Bagus Wicaksono",
    origin: "Solo",
    packageTitle: "Yogyakarta Heritage Journey",
    rating: 5,
    tag: "Keluarga & Edukasi",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
    quote: "Ajak anak-anak keliling Borobudur dan Prambanan bersama tour guide FADZA sangat menyenangkan. Anak-anak belajar banyak cerita sejarah tanpa bosan. Mobilnya bersih dan nyaman.",
    date: "Juni 2026"
  },
  {
    id: 12,
    name: "Vania & Dennis",
    origin: "Jakarta Utara",
    packageTitle: "Lombok Tropical Escape & Gili",
    rating: 5,
    tag: "Pasangan & Anniversary",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80",
    quote: "Anniversary ke-3 kami dirayakan di Gili Trawangan dan Bukit Merese. Makan malam tepi pantai diatur sangat romantis oleh tim FADZA. Pasti kami akan pakai FADZA lagi!",
    date: "Agustus 2026"
  }
];`;

const testRegex = /export const TESTIMONIALS = \[[\s\S]*?\];/;
if (!testRegex.test(updated)) throw new Error("Could not find TESTIMONIALS block in base content");
updated = updated.replace(testRegex, richTestimonials);

// Map package fallbacks to their own unique package images
const pkgFallbackMap = {
  'bali-escape': 'baliEscape',
  'labuan-bajo-phinisi': 'labuanBajoPhinisi',
  'raja-ampat-ultimate': 'rajaAmpatUltimate',
  'lombok-adventure': 'lombokAdventure',
  'yogyakarta-heritage': 'yogyakartaHeritage',
  'bromo-sunrise': 'bromoSunrise',
  'bandung-retreat': 'bandungRetreat',
  'toba-highland': 'tobaHighland',
  'derawan-adventure': 'derawanAquatic',
  'bunaken-marine': 'bunakenMarine',
  'sumba-paradise': 'sumbaSavanna',
  'belitung-island': 'belitungIsland'
};

for (const [pkgId, pkgKey] of Object.entries(pkgFallbackMap)) {
  const fbRegex = new RegExp('(id:\\s*\"' + pkgId + '\"[\\s\\S]*?fallbackImage:\\s*)ASSET_IMAGES\\.destinations\\.[a-zA-Z]+\\.fallback', 'm');
  updated = updated.replace(fbRegex, '$1ASSET_IMAGES.packages.' + pkgKey + '.fallback');
}

// Replace GALLERY_ITEMS with unique gallery items
const galleryItemsBlock = `export const GALLERY_ITEMS = [
  {
    id: "g1",
    title: "Formasi Karst Piaynemo",
    location: "Raja Ampat, Papua Barat Daya",
    category: "nature",
    image: ASSET_IMAGES.gallery.g1,
    caption: "Gugusan pulau karang zamrud di atas air laut bening toska yang memukau dunia."
  },
  {
    id: "g2",
    title: "Phinisi Berlayar di Taman Komodo",
    location: "Labuan Bajo, NTT",
    category: "marine",
    image: ASSET_IMAGES.gallery.g2,
    caption: "Kemegahan kapal phinisi kayu tradisional melintasi selat pulau-pulau purba Flores."
  },
  {
    id: "g3",
    title: "Tebing Kelingking Nusa Penida",
    location: "Bali",
    category: "nature",
    image: ASSET_IMAGES.gallery.g3,
    caption: "Tebing kapur berbentuk T-Rex dengan gradasi air laut biru safir yang megah."
  },
  {
    id: "g4",
    title: "Sunrise Kaldera Tengger",
    location: "Bromo, Jawa Timur",
    category: "nature",
    image: ASSET_IMAGES.gallery.g4,
    caption: "Matahari terbit menyinari kawah aktif Bromo dan Gunung Batok dalam lautan kabut lembut."
  },
  {
    id: "g5",
    title: "Stupa Borobudur Berkabut Pagi",
    location: "Magelang, Jawa Tengah",
    category: "culture",
    image: ASSET_IMAGES.gallery.g5,
    caption: "Kedamaian spiritual di pelataran candi Buddha terbesar di dunia saat fajar menyingsing."
  },
  {
    id: "g6",
    title: "Bukit Merese Senja",
    location: "Lombok, NTB",
    category: "nature",
    image: ASSET_IMAGES.gallery.g6,
    caption: "Hamparan rumput hijau bukit Merese dengan deburan ombak pantai Tanjung Aan di kejauhan."
  },
  {
    id: "g7",
    title: "Dancing Trees Pantai Walakiri",
    location: "Sumba Timur, NTT",
    category: "nature",
    image: ASSET_IMAGES.gallery.g7,
    caption: "Pohon bakau kerdil membentuk siluet indah menyerupai penari saat matahari terbenam."
  },
  {
    id: "g8",
    title: "Megahnya Danau Toba",
    location: "Sumatera Utara",
    category: "nature",
    image: ASSET_IMAGES.gallery.g8,
    caption: "Panorama danau kaldera vulkanik terbesar di Asia Tenggara dari ketinggian perbukitan."
  }
];`;

const galleryRegex = /export const GALLERY_ITEMS = \[[\s\S]*?\];/;
updated = updated.replace(galleryRegex, galleryItemsBlock);

// Ensure ./images.js import
updated = updated.replace("import { ASSET_IMAGES } from './images';", "import { ASSET_IMAGES } from './images.js';");

// Write to src/data/travelData.js
fs.writeFileSync('src/data/travelData.js', updated, 'utf8');
console.log('src/data/travelData.js rebuilt successfully with 16 destinations, 16 packages, knowledge fields, and 12 rich testimonials!');
