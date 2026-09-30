import { generateTravelResponse, classifyIntent, INTENTS } from './src/services/aiService.js';
import { getPackageById } from './src/services/travelTools.js';

async function runTests() {
  console.log('=== RUNNING FADZA AI CONVERSATIONAL UX TESTS (15 SCENARIOS) ===\n');
  let passed = 0;
  let failed = 0;

  const baliPkg = getPackageById('bali-escape');

  const tests = [
    {
      id: 'TEST 1',
      query: 'Halo',
      history: [],
      expectedIntent: INTENTS.GREETING,
      expectedCardCount: 0,
      checkFn: (res) => !res.text.includes('• Mengetahui') && !res.text.includes('1.') && res.text.includes('FADZA AI'),
      description: 'Natural greeting without menu bullets or package cards'
    },
    {
      id: 'TEST 2',
      query: 'Saya mau perjalanan santai.',
      history: [],
      expectedIntent: INTENTS.TRAVEL_STYLE_PREFERENCE,
      expectedCardCount: 0,
      checkFn: (res) => res.text.includes('Apakah Anda sudah memiliki destinasi yang ingin dikunjungi?') && !res.text.includes('•') && !res.text.includes('1.'),
      description: 'Travel style preference should ask ONE follow-up question without menu'
    },
    {
      id: 'TEST 3',
      query: 'Saya mau perjalanan santai ke Bali.',
      history: [],
      expectedIntent: INTENTS.TRAVEL_STYLE_PREFERENCE,
      expectedCardCount: 0,
      checkFn: (res) => res.text.includes('Berapa hari kira-kira Anda ingin bepergian?') && !res.text.includes('•') && res.text.includes('Bali'),
      description: 'Understands santai + Bali, asks duration without re-asking destination'
    },
    {
      id: 'TEST 4',
      query: 'Berapa harga paket Bali?',
      history: [],
      expectedIntent: INTENTS.PACKAGE_PRICE,
      expectedCardCount: 0,
      checkFn: (res) => res.text.includes('Rp 3.450.000') && !res.text.includes('Apakah Anda ingin:'),
      description: 'Direct price answer without menu'
    },
    {
      id: 'TEST 5',
      query: 'Kalau 2 orang?',
      history: [
        { sender: 'user', text: 'Berapa harga paket Bali?' },
        { sender: 'ai', text: 'Untuk paket Bali Escape tarifnya Rp 3.450.000 per orang', suggestedPackages: [baliPkg] }
      ],
      expectedIntent: INTENTS.PRICE_CALCULATION,
      expectedCardCount: 0,
      checkFn: (res) => res.calculation && res.calculation.totalPrice === 6900000 && res.text.includes('Rp 6.900.000'),
      description: 'Direct calculation for 2 pax without dumping cards or menu'
    },
    {
      id: 'TEST 6',
      query: 'Apa fasilitasnya?',
      history: [
        { sender: 'user', text: 'Berapa harga paket Bali?' },
        { sender: 'ai', text: 'Untuk paket Bali Escape tarifnya Rp 3.450.000 per orang', suggestedPackages: [baliPkg] }
      ],
      expectedIntent: INTENTS.FACILITY_QUESTION,
      expectedCardCount: 0,
      checkFn: (res) => res.text.includes('hotel bintang 4') && res.text.includes('armada') && !res.text.includes('Apakah Anda ingin:'),
      description: 'Direct facility explanation without dumping cards'
    },
    {
      id: 'TEST 7',
      query: 'Terima kasih.',
      history: [
        { sender: 'user', text: 'Berapa harga paket Bali?' },
        { sender: 'ai', text: 'Untuk paket Bali Escape tarifnya Rp 3.450.000 per orang', suggestedPackages: [baliPkg] }
      ],
      expectedIntent: INTENTS.THANKS,
      expectedCardCount: 0,
      checkFn: (res) => res.text.includes('Sama-sama') && !res.text.includes('Labuan Bajo'),
      description: 'Polite closing with ZERO cards and NO menu'
    },
    {
      id: 'TEST 8',
      query: 'Oke.',
      history: [
        { sender: 'user', text: 'Berapa harga paket Bali?' },
        { sender: 'ai', text: 'Untuk paket Bali Escape tarifnya Rp 3.450.000 per orang', suggestedPackages: [baliPkg] }
      ],
      expectedIntent: INTENTS.ACKNOWLEDGEMENT,
      expectedCardCount: 0,
      checkFn: (res) => res.text.includes('Baik') && !res.text.includes('Labuan Bajo') && !res.text.includes('•'),
      description: 'Short acknowledgement with ZERO cards and NO menu'
    },
    {
      id: 'TEST 9',
      query: 'Bandingkan Bali dan Lombok.',
      history: [],
      expectedIntent: INTENTS.COMPARISON,
      expectedCardCount: 2,
      checkFn: (res) => res.comparison !== null && res.text.includes('Bali') && res.text.includes('Lombok'),
      description: 'Comparison with comparative text + 2 cards'
    },
    {
      id: 'TEST 10',
      query: 'Saya mau booking yang tadi.',
      history: [
        { sender: 'user', text: 'Saya mau ke Bali berdua' },
        { sender: 'ai', text: 'Bali Escape 4D3N', suggestedPackages: [baliPkg] }
      ],
      expectedIntent: INTENTS.BOOKING,
      expectedCardCount: 1,
      checkFn: (res) => res.bookingInfo && res.bookingInfo.whatsappUrl.includes('wa.me'),
      description: 'Understands context package and provides WhatsApp booking link'
    },
    {
      id: 'TEST 11',
      query: 'Saya belum tahu mau ke mana.',
      history: [],
      expectedIntent: INTENTS.RECOMMENDATION,
      expectedCardCount: 0,
      checkFn: (res) => !res.text.includes('1.') && !res.text.includes('•') && res.text.includes('pantai eksotis, pegunungan yang sejuk'),
      description: 'Natural discovery question without long form menu or cards'
    },
    {
      id: 'TEST 12',
      query: 'Saya mau ke Bali, berdua, 4 hari, budget 7 juta.',
      history: [],
      expectedIntent: INTENTS.MULTI_TASK_SEARCH,
      expectedCardCount: 1,
      checkFn: (res) => res.calculation && res.calculation.totalPrice === 6900000 && res.text.includes('MASUK DALAM BUDGET'),
      description: 'Multi-task search: finds Bali Escape, calculates 2 pax, evaluates 7M budget, shows 1 card'
    },
    {
      id: 'TEST 13',
      query: 'Bagaimana cara booking?',
      history: [],
      expectedIntent: INTENTS.HOW_TO_BOOK,
      expectedCardCount: 0,
      checkFn: (res) => res.text.includes('WhatsApp') && res.text.includes('62 858-8815-9765') && !res.text.includes('•'),
      description: 'Direct explanation of booking process without menu'
    },
    {
      id: 'TEST 14',
      query: 'Enaknya liburan ke mana?',
      history: [],
      expectedIntent: INTENTS.RECOMMENDATION,
      expectedCardCount: 0,
      checkFn: (res) => res.text.includes('berapa lama kira-kira Anda ingin bepergian?') && !res.text.includes('•') && !res.text.includes('1.'),
      description: 'ONE single conversational question without menu bullets'
    },
    {
      id: 'TEST 15 (MULTI-TURN DIALOGUE)',
      query: '4 hari.',
      history: [
        { sender: 'user', text: 'Saya mau perjalanan santai.' },
        { sender: 'ai', text: 'Tentu. Saya akan menyesuaikan pencarian dengan gaya perjalanan yang lebih santai. Apakah Anda sudah memiliki destinasi yang ingin dikunjungi?' },
        { sender: 'user', text: 'Ke Bali.' },
        { sender: 'ai', text: 'Baik! Untuk perjalanan santai di Bali, berapa hari kira-kira Anda ingin bepergian?' }
      ],
      expectedIntent: INTENTS.DURATION_SEARCH,
      expectedCardCount: 1,
      checkFn: (res) => res.text.includes('Bali Escape & Nusa Penida') && (res.suggestedPackages || []).length === 1,
      description: 'Multi-turn context: remembers santai + Bali + 4 days, recommends Bali Escape 4D3N'
    },
    {
      id: 'TEST 16 (EXPLICIT DESTINATION: sumatera apakah ada??)',
      query: 'sumatera apakah ada??',
      history: [],
      expectedIntent: INTENTS.PACKAGE_SEARCH,
      expectedCardCount: 2,
      checkFn: (res) => res.text.includes('Danau Toba') && res.text.includes('Belitung') && !res.text.includes('destinasi impian'),
      description: 'Explicit entity detection: detects Sumatera, shows Danau Toba & Belitung cards, NEVER asks destinasi impian'
    },
    {
      id: 'TEST 17 (Ada paket ke Sumatera?)',
      query: 'Ada paket ke Sumatera?',
      history: [],
      expectedIntent: INTENTS.PACKAGE_SEARCH,
      expectedCardCount: 2,
      checkFn: (res) => res.text.includes('Sumatera') && (res.suggestedPackages || []).length === 2,
      description: 'Direct package search for Sumatera returns 2 packages with dedicated images'
    },
    {
      id: 'TEST 18 (Kalau Sumatera ada yang santai?)',
      query: 'Kalau Sumatera ada yang santai?',
      history: [],
      expectedIntent: INTENTS.TRAVEL_STYLE_PREFERENCE,
      expectedCardCount: 2,
      checkFn: (res) => res.text.includes('santai') && res.text.includes('Sumatera') && (res.suggestedPackages || []).length === 2,
      description: 'Destination + travel style: searches matching relaxed results in Sumatera'
    },
    {
      id: 'TEST 19 (Yang paling santai yang mana? - FOLLOW-UP)',
      query: 'Yang paling santai yang mana?',
      history: [
        { sender: 'user', text: 'sumatera apakah ada??' },
        { sender: 'ai', text: 'Tentu. FADZA TRIP ADVENTURE memiliki pilihan...', suggestedPackages: [
          getPackageById('toba-highland'),
          getPackageById('belitung-island')
        ]}
      ],
      expectedIntent: INTENTS.COMPARISON,
      expectedCardCount: 2,
      checkFn: (res) => res.text.includes('Belitung') && res.text.includes('Danau Toba') && res.text.includes('paling santai'),
      description: 'Follow-up compares relaxation between Belitung and Danau Toba in Sumatera context'
    },
    {
      id: 'TEST 20 (Ada yang 4 hari? - FOLLOW-UP SUMATERA)',
      query: 'Ada yang 4 hari?',
      history: [
        { sender: 'user', text: 'sumatera apakah ada??' },
        { sender: 'ai', text: 'Tentu. FADZA TRIP ADVENTURE memiliki pilihan...', suggestedPackages: [
          getPackageById('toba-highland'),
          getPackageById('belitung-island')
        ]}
      ],
      expectedIntent: INTENTS.DURATION_SEARCH,
      expectedCardCount: 2,
      checkFn: (res) => (res.text.includes('3 Hari 2 Malam') || res.text.includes('customized') || res.text.includes('disesuaikan')) && !res.text.includes('Bali'),
      description: 'Follow-up uses Sumatera context, filters 4 days, explains 3D2N + custom 4D, never reverts to Bali'
    },
    {
      id: 'TEST 21 (Kalau berdua? - FOLLOW-UP SUMATERA)',
      query: 'Kalau berdua?',
      history: [
        { sender: 'user', text: 'sumatera apakah ada??' },
        { sender: 'ai', text: 'Tentu. FADZA TRIP ADVENTURE memiliki pilihan...', suggestedPackages: [
          getPackageById('toba-highland'),
          getPackageById('belitung-island')
        ]}
      ],
      expectedIntent: INTENTS.PRICE_CALCULATION,
      expectedCardCount: 0,
      checkFn: (res) => (res.text.includes('Rp 6.400.000') || res.text.includes('Rp 5.700.000')) && !res.text.includes('Bali'),
      description: 'Follow-up calculates total for Sumatera packages without cards or generic menu'
    },
    {
      id: 'TEST 22 (CONTEXT OVERRIDE: Bali -> sumatera apakah ada??)',
      query: 'sumatera apakah ada??',
      history: [
        { sender: 'user', text: 'Ada paket Bali?' },
        { sender: 'ai', text: 'Tentu, paket Bali Escape...', suggestedPackages: [baliPkg] }
      ],
      expectedIntent: INTENTS.PACKAGE_SEARCH,
      expectedCardCount: 2,
      checkFn: (res) => res.text.includes('Danau Toba') && res.text.includes('Belitung') && !res.text.includes('Bali Escape'),
      description: 'Context override: switching to Sumatera clears previous Bali context completely'
    },
    {
      id: 'TEST 23 (INPUT NORMALIZATION: malammm)',
      query: 'malammm',
      history: [],
      expectedIntent: INTENTS.GREETING,
      expectedCardCount: 0,
      checkFn: (res) => res.text.includes('selamat malam') && res.text.includes('FADZA AI') && !res.text.includes('•'),
      description: 'Normalized input "malammm" properly routes to GREETING without fallback or cards'
    },
    {
      id: 'TEST 24 (STATE-AWARE AFFIRMATIVE: iya ada)',
      query: 'iya ada',
      history: [
        { sender: 'user', text: 'malammm' },
        { sender: 'ai', text: 'Halo, selamat malam di FADZA TRIP ADVENTURE. Saya FADZA AI, asisten perjalanan resmi Anda.\n\nAda yang dapat saya bantu rencanakan untuk liburan Anda?', awaitingResponseTo: 'DESTINATION_CONFIRMATION' }
      ],
      expectedIntent: INTENTS.ACKNOWLEDGEMENT,
      expectedCardCount: 0,
      checkFn: (res) => res.text.includes('Destinasi mana yang ingin Anda kunjungi') && !res.text.includes('• Mengetahui'),
      description: 'Affirmative response to destination confirmation asks which destination without repeating previous question'
    },
    {
      id: 'TEST 25 (STATE-AWARE UNDECIDED: belum ada)',
      query: 'belum ada',
      history: [
        { sender: 'user', text: 'malammm' },
        { sender: 'ai', text: 'Halo, selamat malam di FADZA TRIP ADVENTURE. Saya FADZA AI, asisten perjalanan resmi Anda.\n\nAda yang dapat saya bantu rencanakan untuk liburan Anda?', awaitingResponseTo: 'DESTINATION_CONFIRMATION' }
      ],
      expectedIntent: INTENTS.RECOMMENDATION,
      expectedCardCount: 0,
      checkFn: (res) => res.text.includes('pantai') && res.text.includes('pegunungan'),
      description: 'Undecided response asks travel style preferences with zero cards'
    },
    {
      id: 'TEST 26 (STYLE PREFERENCE: pantai)',
      query: 'pantai',
      history: [
        { sender: 'user', text: 'belum ada' },
        { sender: 'ai', text: 'Tidak masalah! Anda lebih menyukai suasana pantai, pegunungan yang sejuk, atau wisata budaya?', awaitingResponseTo: 'TRAVEL_STYLE' }
      ],
      expectedIntent: INTENTS.TRAVEL_STYLE_PREFERENCE,
      expectedCardCount: 0,
      checkFn: (res) => res.text.includes('pantai') && res.text.includes('Bali') && res.text.includes('Labuan Bajo'),
      description: 'Follow-up on pantai recommends beach options'
    },
    {
      id: 'TEST 27 (FLORES ALIAS: di flores ada trip apa?)',
      query: 'di flores ada trip apa?',
      history: [],
      expectedIntent: INTENTS.PACKAGE_SEARCH,
      expectedCardCount: 1,
      checkFn: (res) => res.text.includes('Labuan Bajo') && !res.text.includes('belum menyediakan'),
      description: 'Understands flores as Labuan Bajo & Komodo destination'
    },
    {
      id: 'TEST 28 (PRICE INQUIRY CONTEXT: berapa harga paket itu?)',
      query: 'berapa harga paket itu?',
      history: [
        { sender: 'user', text: 'Ada paket Bali?' },
        { sender: 'ai', text: 'Tentu, Bali Escape & Nusa Penida...', suggestedPackages: [baliPkg] }
      ],
      expectedIntent: INTENTS.PACKAGE_PRICE,
      expectedCardCount: 0,
      checkFn: (res) => res.text.includes('Rp 3.450.000') && res.text.includes('Bali Escape'),
      description: 'Inquires price of context package with zero cards'
    },
    {
      id: 'TEST 29 (THANKS: oke makasih)',
      query: 'oke makasih',
      history: [
        { sender: 'user', text: 'berapa harga paket itu?' },
        { sender: 'ai', text: 'Untuk paket Bali Escape tarif resminya Rp 3.450.000', suggestedPackages: [] }
      ],
      expectedIntent: INTENTS.THANKS,
      expectedCardCount: 0,
      checkFn: (res) => res.text.includes('Sama-sama') && !res.text.includes('Bali'),
      description: 'Warm thanks closing with zero cards'
    },
    {
      id: 'TEST 30 (INPUT NORMALIZATION: halooo)',
      query: 'halooo',
      history: [],
      expectedIntent: INTENTS.GREETING,
      expectedCardCount: 0,
      checkFn: (res) => res.text.includes('FADZA AI'),
      description: 'Normalized "halooo" routes to GREETING'
    }
  ];

  for (const t of tests) {
    const res = await generateTravelResponse({
      message: t.query,
      history: t.history
    });

    const intentMatch = res.intent === t.expectedIntent;
    const cardMatch = (res.suggestedPackages || []).length === t.expectedCardCount;
    const customPass = t.checkFn ? t.checkFn(res) : true;

    if (intentMatch && cardMatch && customPass) {
      console.log(`[PASS] ${t.id}: "${t.query}" -> Intent: ${res.intent} | Cards: ${(res.suggestedPackages || []).length}`);
      passed++;
    } else {
      console.error(`[FAIL] ${t.id}: "${t.query}"`);
      console.error(`  Expected Intent: ${t.expectedIntent}, Got: ${res.intent}`);
      console.error(`  Expected Cards: ${t.expectedCardCount}, Got: ${(res.suggestedPackages || []).length}`);
      if (t.checkFn && !customPass) {
        console.error(`  Custom check failed! Response Text:`);
        console.error(`  "${res.text}"`);
      }
      failed++;
    }
  }

  console.log(`\n=== RESULTS: ${passed} PASSED / ${failed} FAILED ===`);
  if (failed > 0) process.exit(1);
}

runTests();
