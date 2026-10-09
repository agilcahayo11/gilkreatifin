# Personal Portfolio Website — Designer Landing Page

Website landing page portofolio profesional untuk designer modern berbasis web modern, minimalis, dan responsif. Dirancang dan dibangun sesuai dengan **Product Requirements Document (PRD) v1.0**.

---

## 🌟 Fitur Utama & Kepatuhan PRD

| Bagian / Fitur | Deskripsi | Status |
|---|---|:---:|
| **Navbar & Header** | Logo designer, navigasi anchor smooth, status ketersediaan, tombol CTA *"Let's Talk"*, dan Dark/Light Mode toggle. | ✅ Selesai |
| **Hero Section** | Headline editorial berkarakter, badge spesialisasi, metrik pencapaian (5+ thn, 45+ proyek, 98% kepuasan), CTA ganda, dan card visual floating micro-badges. | ✅ Selesai |
| **About Me** | Narasi filosofi & pengalaman profesional, kartu sorotan nilai (*User-Centered* & *Craftsmanship*), persentase keahlian, dan stack software (Figma, Photoshop, Illustrator, Premiere Pro, After Effects, Blender). | ✅ Selesai |
| **Portfolio / Selected Works** | 6 proyek desain komprehensif, filter kategori dinamis (*Branding*, *UI/UX*, *Motion & Social*, *Editorial & 3D*), thumbnail visual resolusi tinggi, dan modal dialog studi kasus detail (*Client*, *Year*, *Role*, *Tools*, *Challenge*, *Solution*, *Impact*). | ✅ Selesai |
| **Services** | 4 layanan utama (*Graphic Design*, *Branding & Visual Identity*, *Social Media Design*, *Video Editing & Reels*) lengkap dengan kartu deliverable. | ✅ Selesai |
| **Articles & Journal** | Halaman publikasi artikel desain dengan pencarian live, filter kategori, dan dialog modal baca artikel lengkap (*Reader Modal*). | ✅ Selesai |
| **CMS Admin Dashboard** | Panel manajemen konten terpadu untuk mengedit profil, foto profil, portofolio karya, artikel jurnal, layanan, serta fitur backup/restore JSON. Akses: PIN default `admin123`. | ✅ Selesai |
| **Workflow Process** | 4 tahapan kolaborasi transparan (*Discovery*, *Concept*, *Design*, *Handoff*). | ✅ Selesai |
| **Contact Section** | Alamat email profesional dengan tombol 1-klik salin (*Copy to clipboard*), tautan WhatsApp langsung dengan template pesan, tautan media sosial, serta formulir kontak interaktif dengan validasi real-time & notifikasi toast. | ✅ Selesai |
| **Footer** | Copyright dinamis 2026, navigasi menu cepat, tautan sosial, dan tombol kembali ke atas (*Back to Top*). | ✅ Selesai |

---

## 🎨 Spesifikasi Desain & Teknologi

- **Prinsip Estetika:** Minimalist, Modern, & Editorial dengan whitespace yang lega.
- **Palet Warna:** Obsidian & Charcoal (`#0a0b0e`, `#12141a`, `#1a1e27`), teks kontras tinggi, dan aksen warna *Warm Studio Vermilion* (`#ff5024`).
- **Tema:** Dukungan penuh Dark Mode & Light Mode dengan penyimpanan preferensi di `localStorage`.
- **Tipografi:** Google Fonts *Plus Jakarta Sans* (Body) & *Syne* (Display Headings).
- **Standar Web Modern:**
  - Native `<dialog closedby="any">` dengan fallback deteksi klik backdrop & `showModal()`
  - Native CSS `scroll-target-group: auto` & `:target-current` dengan fallback `IntersectionObserver`
  - Aksesibilitas WCAG (Semantic HTML, `aria-label`, `aria-current`, `skip-link`, `focus-visible`, `prefers-reduced-motion`)

---

## 📁 Struktur File

```text
vibecoding/
├── index.html       # Landing page utama Gilkreatifin (Home, About, Portfolio, Services, Contact)
├── articles.html    # Halaman direktori artikel & jurnal desain dengan Reader Modal
├── articles.css     # Styling khusus halaman artikel dan reader dialog
├── articles.js      # Filter topik artikel, pencarian live, dan interaksi reader modal
├── admin.html       # CMS Admin Dashboard (Profil, Portofolio, Artikel, Layanan, Backup)
├── admin.css        # Styling panel CMS Dashboard
├── admin.js         # Logika autentikasi CMS, editor proyek, editor artikel, dan import/export
├── store.js         # Centralized state manager & LocalStorage synchronization engine
├── styles.css       # Design tokens, tema gelap/terang, dan styles inti website
├── script.js        # Controller landing page utama dan data binding CMS
└── README.md        # Dokumentasi proyek & panduan deployment
```

---

## 🚀 Cara Menjalankan Secara Lokal

Website ini dibangun menggunakan standar web murni (Zero Build Step) sehingga dapat langsung dibuka:

### Cara 1: Buka Langsung di Browser
Cukup klik ganda berkas `index.html` atau buka melalui browser pilihan Anda.

### Cara 2: Menjalankan Local Server (Python)
```bash
# Buka terminal di folder proyek
python -m http.server 3000
```
Buka peramban di [http://localhost:3000](http://localhost:3000).

---

## 🌐 Panduan Deployment

### 1. Vercel
1. Pasang [Vercel CLI](https://vercel.com/cli) atau gunakan Dashboard Vercel.
2. Jalankan perintah:
   ```bash
   npx vercel
   ```
3. Ikuti petunjuk di terminal untuk langsung mempublikasikan ke URL publik.

### 2. Netlify
1. Tarik (drag-and-drop) folder proyek ke dashboard [Netlify Drop](https://app.netlify.com/drop), atau:
2. Menggunakan Netlify CLI:
   ```bash
   npx netlify deploy --prod
   ```

### 3. GitHub Pages
1. Inisialisasi repositori git dan unggah ke GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: initial landing page portfolio"
   git remote add origin <URL_REPO_GITHUB>
   git push -u origin main
   ```
2. Buka **Settings** > **Pages** di repositori GitHub Anda.
3. Pada bagian **Branch**, pilih `main` dan folder `/ (root)`, lalu klik **Save**.
4. Website akan aktif dalam beberapa menit.

---

## 👤 Kustomisasi Data Designer
Untuk mengganti nama, foto, atau studi kasus:
- Ubah teks dan tautan di [index.html](file:///c:/Users/ASUS/OneDrive/Pictures/vibecoding/index.html).
- Sesuaikan data proyek studi kasus pada objek `PROJECTS_DATA` di [script.js](file:///c:/Users/ASUS/OneDrive/Pictures/vibecoding/script.js).
- Sesuaikan warna aksen di `:root` (`--accent-primary`) pada [styles.css](file:///c:/Users/ASUS/OneDrive/Pictures/vibecoding/styles.css).

