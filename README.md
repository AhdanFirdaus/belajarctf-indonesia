# 🚩 Panduan Belajar CTF Indonesia

> Jalur belajar terstruktur, kurasi perangkat esensial, dan direktori arena latihan untuk memulai kompetisi **Capture The Flag (CTF)** dalam Bahasa Indonesia — dirancang dari nol dengan pendekatan santai, modern, dan to-the-point.

<p align="center">
  <img src="/public/logo.png" alt="Panduan Belajar CTF" width="100" />
</p>

<p align="center">
  <a href="https://github.com/AhdanFirdaus/capture_the_flag"><img src="https://img.shields.io/badge/GitHub-capture__the__flag-white?style=flat-square&logo=github" alt="Repository" /></a>
  <a href="https://astro.build"><img src="https://img.shields.io/badge/Framework-Astro_5-orange?style=flat-square&logo=astro" alt="Astro" /></a>
  <a href="https://react.dev"><img src="https://img.shields.io/badge/UI-React_19-blue?style=flat-square&logo=react" alt="React" /></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Styling-Tailwind_CSS_v4-38bdf8?style=flat-square&logo=tailwindcss" alt="Tailwind CSS" /></a>
</p>

---

## ✨ Kenapa Website Ini Dibuat?

Belajar keamanan siber dan CTF sering kali terasa membingungkan karena materi yang tersebar di mana-mana dan istilah teknis yang rumit. Website ini merangkum seluruh fondasi, alur belajar langkah-demi-langkah, ratusan tools praktis, serta arena latihan dalam satu antarmuka terminal modern bernuansa monokrom.

---

## 🚀 Fitur Unggulan

### 1. 🗺️ Roadmap Interaktif 9 Tahapan
- Rute belajar berurutan: mulai dari *Mindset Dasar*, *Linux & CLI*, *Jaringan Komputer*, hingga *Spesialisasi Role* dan *Persiapan Bertanding*.
- **Interactive Checkpoints:** Pantau dan centang materi yang sudah Anda pelajari langsung di browser (otomatis tersimpan di `localStorage`).

### 2. 🛡️ Spesialisasi 5 Role CTF
Kurasi tools dan referensi belajar terfokus untuk setiap kategori:
- **🌐 Web Exploitation:** SQLi, XSS, CSRF, SSRF, IDOR, Request Smuggling.
- **🔍 Digital Forensics:** Steganografi gambar/audio, analisis PCAP jaringan, memory dump, berkas tersembunyi.
- **⚙️ Reverse Engineering:** Analisis biner, dekompilasi APK/Java, disassembly assembly x86/x64, debugging.
- **🔐 Cryptography:** Sandi klasik, RSA, AES, Diffie-Hellman, decoding Base64/Hex/Rot13.
- **💣 PWN / Binary Exploitation:** Buffer overflow, format string, ROP chain, shellcoding.

### 3. 🕹️ CTF Playground & Lab Praktik
Daftar arena latihan legal, wargames berbasis terminal, dan simulasi lab keamanan (*picoCTF, OverTheWire, CyberSecurityIPB, Hack The Box, TryHackMe, PortSwigger Web Security Academy*, dll).

### 4. 🛠️ General Tools & Kanal YouTube
- Perangkat instan: online decoder, cyberchef, pemecah hash, dan pemeriksa metadata.
- Rekomendasi kanal YouTube edukasi keamanan siber dan walkthrough CTF berbahasa Indonesia maupun internasional.

### 5. ⚡ Estetika Retro Modern & Fitur Terminal
- **3D Embossed Cursor Grid:** Efek interaktif kanvas 3D yang ringan saat kursor bergerak (otomatis dioptimalkan untuk mobile).
- **Audio Synthesizer 8-Bit:** Suara klik taktil dan efek RPG Game Over saat tersesat di halaman 404.
- **Shortcuts:**
  - `Ctrl + K` / `Cmd + K`: Buka **Command Palette** instan.  

---

## 🛠️ Tech Stack

- **Core Engine:** [Astro](https://astro.build/) (Static Site Generation & Island Architecture)
- **Interactive Islands:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (Strict Monochrome Aesthetic `#0a0a0a` / `#101011` / `#ffffff`)
- **Icons & Typography:** [Lucide React](https://lucide.dev/), Pixelify Sans, Inter, & JetBrains Mono
- **Audio:** Web Audio API Native Synthesizer (Zero external audio assets)

---

## 💻 Memulai di Komputer Lokal

Pastikan Anda telah menginstal **Node.js** (v18.17+ atau v20+ disarankan).

```bash
# 1. Clone repositori
git clone https://github.com/AhdanFirdaus/belajarctf-indonesia.git
cd belajarctf-indonesia

# 2. Instal dependensi
npm install

# 3. Jalankan server lokal (development)
npm run dev
```

Buka [http://localhost:4321](http://localhost:4321) di browser Anda.

---

## 📦 Perintah Script

| Perintah | Deskripsi |
| :--- | :--- |
| `npm run dev` | Menjalankan local development server dengan hot reload |
| `npm run build` | Melakukan kompilasi produksi ke direktori `./dist/` |
| `npm run preview` | Menjalankan preview lokal dari hasil build produksi |

---

## 🤝 Kontribusi & Feedback

Punya rekomendasi tools baru, arena latihan baru, atau ingin memperbaiki materi?
Silakan buka **Pull Request** atau buat **Issue** baru di [GitHub Repository](https://github.com/AhdanFirdaus/capture_the_flag).

---

## 👤 Dibuat Oleh

**Ahdan Firdaus (Dadan)**
- Website: [ahdanfirdaus.my.id](https://ahdanfirdaus.my.id)
- GitHub: [@AhdanFirdaus](https://github.com/AhdanFirdaus)

---

<p align="center">
  <i>"Happy Hacking, Flag Hunter! 🚩 Tetap etis dan terus asah skill."</i>
</p>
