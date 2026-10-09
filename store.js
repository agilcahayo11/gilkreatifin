/**
 * CENTRAL DATA STORE & CMS STATE MANAGER
 * Gilkreatifin Portfolio & CMS
 */

export const STORAGE_KEY = 'gilkreatifin_cms_data';

export const DEFAULT_DATA = {
  profile: {
    name: 'Gilkreatifin',
    logoSymbol: 'GK',
    title: 'Senior Visual & Product Designer',
    headline: 'Menciptakan Identitas Visual yang Ikonik & Pengalaman Digital Bermakna.',
    bio: 'Halo! Saya Gilkreatifin, desainer multidisiplin dengan 5+ tahun pengalaman mentransformasi ide bisnis menjadi karya visual berkarakter tinggi — mulai dari brand identity, UI/UX modern, hingga motion design.',
    photo: 'assets/images/profile.png',
    email: 'gilkreatifin@gmail.com',
    whatsapp: '+62 851-5616-5296',
    whatsappMessage: 'Halo Gilkreatifin, saya tertarik untuk diskusi proyek desain.',
    location: 'Jakarta, Indonesia (GMT+7 / WIB)',
    availableStatus: 'Tersedia untuk proyek baru & freelance (Kuartal 2026)',
    experienceYears: '5+',
    completedProjects: '45+',
    clientSatisfaction: '98%',
    social: {
      linkedin: 'https://linkedin.com',
      dribbble: 'https://dribbble.com',
      behance: 'https://behance.net',
      instagram: 'https://instagram.com'
    }
  },
  projects: [
    {
      id: 'project-1',
      title: 'Aether Finance — Neobank Digital Experience',
      category: 'branding uiux',
      categoryLabel: 'Branding & UI/UX',
      client: 'Aether Capital Corp',
      year: '2026',
      role: 'Lead Product & Brand Designer',
      tools: 'Figma, Illustrator, After Effects',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85',
      clientUrl: 'https://instagram.com',
      desc: 'Desain identitas brand futuristik, mobile banking application, serta scalable design system untuk platform pengelolaan aset digital generasi baru.',
      challenge: 'Aether Capital membutuhkan identitas brand yang modern serta aplikasi mobile banking yang mampu menyederhanakan pengelolaan aset kripto dan mata uang konvensional dalam satu tampilan yang tidak membingungkan pengguna pemula.',
      solution: 'Merancang arsitektur informasi baru dengan antarmuka berbasis card visual kontras tinggi, visual token adaptif untuk dark/light mode, serta micro-interactions untuk transaksi finansial yang memberikan umpan balik kepastian instan.',
      impacts: [
        'Meningkatkan tingkat konversi registrasi pengguna baru sebesar +34% dalam 90 hari pertama peluncuran.',
        'Menerima rating 4.8/5 di App Store untuk kejelasan antarmuka dan kemudahan navigasi.',
        'Mempersingkat waktu rata-rata eksekusi transfer dari 45 detik menjadi hanya 12 detik.'
      ]
    },
    {
      id: 'project-2',
      title: 'Luminary Studio — High Fashion Editorial & Identity',
      category: 'editorial branding',
      categoryLabel: 'Editorial & Branding',
      client: 'Luminary Paris',
      year: '2025',
      role: 'Art Director & Visual Designer',
      tools: 'InDesign, Photoshop, Illustrator',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
      clientUrl: 'https://instagram.com',
      desc: 'Penyusunan tata letak tipografi editorial mewah, kemasan produk eksklusif, serta direktori lookbook digital bagi rumah mode Paris.',
      challenge: 'Menciptakan kembali citra visual rumah mode independen Paris agar mampu bersaing dengan label haute-couture ternama di ranah digital tanpa kehilangan esensi kemewahan cetak klasiknya.',
      solution: 'Mengembangkan sistem tipografi editorial modular dengan proporsi golden ratio, manual pedoman kemasan berbahan ramah lingkungan, serta katalog lookbook digital beranimasi subtle.',
      impacts: [
        'Meningkatkan engagement rate kampanye koleksi musim gugur hingga 210% di media sosial.',
        'Dipublikasikan sebagai Brand of the Month di DesignWeek International.',
        'Mendongkrak penjualan lini aksesori eksklusif sebesar 45%.'
      ]
    },
    {
      id: 'project-3',
      title: 'Kroma OS — Design System & Enterprise Dashboard',
      category: 'uiux',
      categoryLabel: 'UI/UX Design',
      client: 'Kroma Software AG',
      year: '2025',
      role: 'Design System Architect',
      tools: 'Figma Tokens, Storybook, GitHub',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=85',
      desc: 'Arsitektur komponen desain skala perusahaan dengan token multi-tema, 120+ varian atomik, dan peningkatan efisiensi kolaborasi developer hingga 40%.',
      challenge: 'Platform SaaS Kroma memiliki inkonsistensi antarmuka lintas 6 produk berbeda dan siklus handoff desain-ke-kode yang memakan waktu hingga beberapa minggu per fitur.',
      solution: 'Membangun design system multi-platform terpusat berisi 120+ komponen atomik, integrasi semantic design tokens ke repository frontend, dan dokumentasi guideline yang terhubung langsung.',
      impacts: [
        'Mempercepat sprint delivery tim engineering dan designer hingga 40%.',
        'Memangkas 85% bug styling antarmuka pada rilis kuartalan.',
        'Diadopsi secara penuh oleh 35+ engineer dan 8 desainer internal lintas benua.'
      ]
    },
    {
      id: 'project-4',
      title: 'Veloce Move — Social Campaign & Dynamic Reels',
      category: 'motion',
      categoryLabel: 'Motion & Video',
      client: 'Veloce Urban Mobility',
      year: '2025',
      role: 'Motion Designer & Video Editor',
      tools: 'Premiere Pro, After Effects, DaVinci',
      image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=85',
      desc: 'Kampanye peluncuran motor elektrik pintar: seri video motion graphics, video reels berirama cepat, dan aset visual iklan konversi tinggi.',
      challenge: 'Memperkenalkan kendaraan listrik pintar untuk kalangan urban muda dalam format video vertikal yang mampu menghentikan scroll (stop-the-scroll hook) dalam 3 detik pertama.',
      solution: 'Memproduksi 12 rangkaian reels dinamis dengan tempo musik uptempo, tipografi kinetik neon, transisi 3D camera-track, dan variasi hook copywriting provokatif.',
      impacts: [
        'Menghasilkan lebih dari 2.4 juta penayangan organik lintas platform Instagram & TikTok.',
        'Menurunkan Cost per Acquisition (CPA) iklan berbayar hingga 28%.',
        'Target pre-order 1.000 unit kendaraan tercapai 2 minggu lebih cepat dari target.'
      ]
    },
    {
      id: 'project-5',
      title: 'Natura Botanical — Packaging & Sustainable Identity',
      category: 'editorial branding',
      categoryLabel: 'Packaging & 3D',
      client: 'Natura Labs Bali',
      year: '2024',
      role: 'Packaging & 3D Visualizer',
      tools: 'Blender 3D, Illustrator, Photoshop',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85',
      desc: 'Konseptualisasi kemasan ramah lingkungan, visualisasi 3D fotorealistik untuk e-commerce, serta manual pedoman warna bahan organik daur ulang.',
      challenge: 'Merancang kemasan produk perawatan kulit alami yang harus terlihat mewah sekaligus secara transparan mengedukasi konsumen mengenai material botol kaca daur ulang.',
      solution: 'Membuat visualisasi 3D fotorealistik kemasan dengan tekstur timbul (emboss), palet warna earthy organik, dan QR code interaktif yang menceritakan asal usul bahan baku.',
      impacts: [
        'Memenangkan Silver Award di Indonesia Packaging Showcase 2024.',
        'Berhasil menembus listing di 45 jaringan gerai ritel premium nasional.',
        'Tingkat retensi pembeli berulang meningkat sebesar 19%.'
      ]
    },
    {
      id: 'project-6',
      title: 'Pulse Magazine — Social Feeds & Content Architecture',
      category: 'branding motion',
      categoryLabel: 'Social Media & Graphic',
      client: 'Pulse Creative Hub',
      year: '2024',
      role: 'Visual Content Strategist',
      tools: 'Photoshop, Figma, Illustrator',
      image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1200&q=85',
      desc: 'Sistem template visual media sosial berenergi tinggi, desain carousel interaktif edukatif, dan grafis motion feed untuk komunitas kreator muda.',
      challenge: 'Membangun identitas visual yang khas dan recognizable untuk platform media anak muda di tengah padatnya konten Instagram visual yang seragam.',
      solution: 'Menciptakan formula layout carousel kontras tinggi dengan tipografi bold, grid sistem modular 10-slide, serta ikon kustom yang menarik untuk disimpan (save) dan dibagikan (share).',
      impacts: [
        'Pertumbuhan pengikut Instagram organik dari 12K menjadi 85K dalam 6 bulan.',
        'Rata-rata 1.500+ likes dan 400+ shares per post carousel mingguan.',
        'Membuka 3 kontrak kolaborasi brand komersial bernilai tinggi.'
      ]
    }
  ],
  articles: [
    {
      id: 'article-1',
      title: 'Membangun Identitas Brand yang Abadi di Era Digital yang Cepat Berubah',
      category: 'Branding & Strategy',
      readTime: '6 min read',
      date: '08 Oktober 2026',
      author: 'Gilkreatifin',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
      excerpt: 'Mengapa tren visual sesaat seringkali membahayakan umur panjang sebuah brand, dan bagaimana prinsip estetika abadi dapat membuat bisnis Anda tetap relevan hingga puluhan tahun.',
      content: `
        <p>Dalam lanskap visual digital hari ini, tren estetika berganti hampir setiap beberapa minggu. Mulai dari kebangkitan estetika Y2K, neubrutalism, glassmorphism, hingga flat maximalism. Namun, pertanyaan mendasar bagi para perancang identitas dan pendiri brand adalah: <strong>apakah identitas visual Anda dirancang untuk bertahan lima tahun ke depan, atau sekadar terlihat keren di linimasa bulan ini?</strong></p>
        
        <h3>1. Temukan Inti Narasi (The Core Narrative)</h3>
        <p>Sebuah logo atau sistem visual yang kuat tidak pernah berawal dari pilihan font atau palet warna acak di Pinterest. Fondasi utama selalu terletak pada proposisi nilai inti dan cerita yang ingin disampaikan kepada audiens. Ketika narasi tersebut jelas dan tajam, keputusan visual menjadi konsekuensi logis dari pesan tersebut.</p>

        <h3>2. Kekuatan Simplicity dan Proporsi Matematis</h3>
        <p>Perhatikan identitas merek-merek legendaris seperti Braun, Apple, Nike, atau Sony. Mereka tidak membebani identitas mereka dengan ornamen yang rumit. Mereka menggunakan proporsi geometris yang seimbang, hierarki tipografi yang tegas, serta ruang negatif (whitespace) yang lega sehingga mudah diingat secara instan oleh otak manusia.</p>

        <h3>3. Scalability: Dari Favicon 16px hingga Billboard Raksasa</h3>
        <p>Di era multi-channel, sebuah visual identity harus mampu beradaptasi pada media mikroskopis seperti icon aplikasi mobile atau avatar smartwatch, hingga spanduk pameran dan materi cetak berukuran raksasa. Jika elemen visual Anda kehilangan keterbacaan ketika diperkecil, maka saatnya menyederhanakan arsitektur logo Anda.</p>

        <blockquote>"Good design is as little design as possible. Less, but better — because it concentrates on the essential aspects." — Dieter Rams</blockquote>

        <h3>Kesimpulan</h3>
        <p>Menciptakan brand yang abadi bukan berarti menolak modernitas, melainkan memfilter kebisingan tren demi menemukan esensi murni yang tidak akan usang dimakan zaman.</p>
      `
    },
    {
      id: 'article-2',
      title: 'Desain Sistem Skalabel: Menjembatani Visi Desainer dan Eksekusi Developer',
      category: 'UI/UX & Design Systems',
      readTime: '8 min read',
      date: '02 Oktober 2026',
      author: 'Gilkreatifin',
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80',
      excerpt: 'Panduan praktis menyusun design tokens, semantic color hierarchy, dan varian komponen atomik di Figma agar proses handoff ke tim rekayasa perangkat lunak berjalan mulus tanpa friksi.',
      content: `
        <p>Kesenjangan komunikasi antara tim desain produk dan engineer sering kali bermuara pada satu masalah: ketiadaan 'bahasa bersama'. Desainer berbicara dalam bahasa visual (shadows, spacing, pixel, layer), sedangkan engineer berbicara dalam kode (tokens, variables, classes, props).</p>

        <h3>Pentingnya Semantic Design Tokens</h3>
        <p>Alih-alih menamai token warna dengan nilai absolut seperti <code>gray-500</code> atau <code>#6B7280</code>, gunakan penamaan semantik seperti <code>color-surface-subtle</code> atau <code>color-text-secondary</code>. Dengan cara ini, ketika produk beralih antara tema gelap dan terang (dark/light mode), tim developer hanya perlu memetakan ulang satu token semantik tanpa harus mengubah ratusan komponen di codebase.</p>

        <h3>Aturan Spacing Skala 8-Point</h3>
        <p>Konsistensi spasial adalah kunci antarmuka yang rapi. Mengadopsi sistem grid berbasis kelipatan 8 (8px, 16px, 24px, 32px, 48px) memudahkan developer memprediksi tata letak dan memastikan ritme vertikal maupun horizontal selalu selaras di berbagai resolusi layar.</p>
      `
    },
    {
      id: 'article-3',
      title: 'Seni Tipografi Editorial: Memandu Mata Pengunjung Tanpa Disadari',
      category: 'Typography & Editorial',
      readTime: '5 min read',
      date: '24 September 2026',
      author: 'Gilkreatifin',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
      excerpt: 'Mempelajari cara memilih pasangan jenis huruf (font pairing), mengatur ritme vertikal teks, dan memanfaatkan kontras visual untuk menciptakan pengalaman membaca yang memikat.',
      content: `
        <p>Tipografi bukan sekadar memilih font yang indah; tipografi adalah arsitektur informasi tak terlihat yang menentukan apakah seorang pengunjung akan menyelesaikan membaca pesan Anda atau langsung menekan tombol kembali.</p>

        <h3>Harmoni Pasangan Font (Font Pairing)</h3>
        <p>Aturan emas dalam memadukan jenis huruf adalah kontras yang tegas namun serasi. Misalnya memadukan font display editorial yang berkarakter kuat untuk headline (seperti Syne atau serif dramatis) dengan sans-serif netral yang sangat terbaca pada ukuran teks paragraf (seperti Plus Jakarta Sans atau Inter).</p>

        <h3>Panjang Baris Ideal (Measure & Line Height)</h3>
        <p>Panjang baris kalimat yang ideal untuk kenyamanan membaca adalah antara 45 hingga 75 karakter per baris. Jika terlalu panjang, mata pembaca akan lelah mencari awal baris berikutnya. Jika terlalu pendek, ritme membaca akan terputus-putus.</p>
      `
    },
    {
      id: 'article-4',
      title: 'Strategi Visual Reels & Shorts yang Mampu Menghentikan Jari Penonton',
      category: 'Motion & Social',
      readTime: '7 min read',
      date: '15 September 2026',
      author: 'Gilkreatifin',
      image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80',
      excerpt: 'Analisis psikologi visual pada 3 detik pertama video pendek vertikal dan bagaimana transisi ritmis serta kinetic typography melipatgandakan retensi audiens.',
      content: `
        <p>Dalam pertarungan algoritma video pendek, 3 detik pertama (The Golden Hook) adalah penentu segalanya. Jika visual Anda tidak menawarkan stimulasi atau pertanyaan yang memancing rasa penasaran, pengguna akan melakukan *swipe* berikutnya tanpa ragu.</p>

        <h3>1. Pola Visual Disruption</h3>
        <p>Awali video dengan gerakan kamera yang dinamis atau teks kontras beranimasi tajam. Jangan biarkan layar statis lebih dari 1 detik di awal video.</p>

        <h3>2. Kinetic Typography yang Sinkron dengan Beat Audio</h3>
        <p>Subtitle bukan hanya untuk aksesibilitas, melainkan elemen desain grafis dinamis. Memberikan warna aksen pada kata kunci tertentu secara bergantian terbukti meningkatkan watch-time secara signifikan.</p>
      `
    }
  ],
  services: [
    {
      id: 'srv-1',
      title: 'Graphic Design',
      desc: 'Penciptaan materi grafis promosi, editorial majalah/e-book, kemasan produk, poster acara, hingga marketing collateral cetak dan digital beresolusi tinggi.',
      deliverables: ['Editorial & Publication Layout', 'Marketing Kits & Pitch Decks', 'Packaging & Label Design', 'Vector Art & Custom Icons']
    },
    {
      id: 'srv-2',
      title: 'Branding & Visual Identity',
      isFeatured: true,
      desc: 'Membangun fondasi identitas merek yang kohesif dari nol: mulai dari logo, palet warna berkarakter, hierarki tipografi, hingga panduan pedoman merek komprehensif.',
      deliverables: ['Logo & Brand Mark Architecture', 'Comprehensive Brand Guidelines (PDF)', 'Typography & Color Psychology System', 'Stationery & Brand Collateral Suite']
    },
    {
      id: 'srv-3',
      title: 'Social Media Design',
      desc: 'Desain feed, story, dan carousel interaktif yang siap meningkatkan engagement, membangun loyalitas komunitas, dan mengkonversi followers menjadi pelanggan.',
      deliverables: ['High-Conversion Carousel Posts', 'Instagram Grid & Story Templates', 'Ad Creatives (Meta & TikTok Ads)', 'Infographics & Educational Decks']
    },
    {
      id: 'srv-4',
      title: 'Video Editing & Reels',
      desc: 'Pengeditan video vertikal ritmis (Shorts, Reels, TikTok) dengan transisi mulus, kinetic typography, grading warna sinematik, serta sound design yang memikat perhatian.',
      deliverables: ['Short-Form Reels / TikTok Editing', 'Kinetic Typography & Subtitles', 'Color Grading & Sound Enhancements', 'Product Launch Micro-Videos']
    }
  ]
};

/**
 * Get Site Data from localStorage or fallback to DEFAULT_DATA
 */
export function getSiteData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveSiteData(DEFAULT_DATA);
      return DEFAULT_DATA;
    }
    const parsed = JSON.parse(raw);
    const loadedProfile = { ...DEFAULT_DATA.profile, ...(parsed.profile || {}) };

    // Migrate old dummy phone number if user never changed it manually
    if (!loadedProfile.whatsapp || loadedProfile.whatsapp.includes('812-3456-7890') || loadedProfile.whatsapp.includes('81234567890')) {
      loadedProfile.whatsapp = '+62 851-5616-5296';
      parsed.profile = loadedProfile;
      saveSiteData(parsed);
    }

    const loadedProjects = (parsed.projects && parsed.projects.length ? parsed.projects : DEFAULT_DATA.projects).map(p => {
      if (p.id === 'project-1' && !p.clientUrl) p.clientUrl = 'https://instagram.com';
      if (p.id === 'project-2' && !p.clientUrl) p.clientUrl = 'https://instagram.com';
      return p;
    });

    return {
      profile: loadedProfile,
      projects: loadedProjects,
      articles: parsed.articles && parsed.articles.length ? parsed.articles : DEFAULT_DATA.articles,
      services: parsed.services && parsed.services.length ? parsed.services : DEFAULT_DATA.services,
      inbox: parsed.inbox || []
    };
  } catch (err) {
    console.error('Error loading site data from localStorage:', err);
    return DEFAULT_DATA;
  }
}

/**
 * Add incoming contact inquiry to inbox
 */
export function addInboxMessage(msg) {
  const data = getSiteData();
  if (!data.inbox) data.inbox = [];
  data.inbox.unshift(msg);
  saveSiteData(data);
}

/**
 * Save Site Data to localStorage
 */
export function saveSiteData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('siteDataUpdated', { detail: data }));
    return true;
  } catch (err) {
    console.error('Error saving site data to localStorage:', err);
    return false;
  }
}

/**
 * Reset Site Data to Initial Default State
 */
export function resetSiteData() {
  localStorage.removeItem(STORAGE_KEY);
  saveSiteData(DEFAULT_DATA);
  return DEFAULT_DATA;
}

/**
 * Export current database as JSON string
 */
export function exportDataAsJSON() {
  const data = getSiteData();
  return JSON.stringify(data, null, 2);
}

/**
 * Import database from JSON string
 */
export function importDataFromJSON(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed || typeof parsed !== 'object') throw new Error('Format JSON tidak valid.');
    saveSiteData(parsed);
    return true;
  } catch (err) {
    throw new Error('Gagal mengimpor data: ' + err.message);
  }
}

