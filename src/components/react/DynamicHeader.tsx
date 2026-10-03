import React from 'react';
import type { ActiveTab } from './BottomDock';
import type { RoleCategoryType } from '../../types/resource';

interface DynamicHeaderProps {
  activeTab: ActiveTab;
  selectedRole: RoleCategoryType | null;
}

export const DynamicHeader: React.FC<DynamicHeaderProps> = ({ activeTab, selectedRole }) => {
  // Determine title and subtitle based on active view
  let title = 'PANDUAN BELAJAR CTF';
  let description =
    'Jalur belajar terstruktur dan kurasi perangkat penting untuk memulai kompetisi Capture The Flag (CTF) dalam Bahasa Indonesia — dirancang khusus dari nol untuk pemula.';

  if (activeTab === 'roadmap') {
    title = 'RUTE BELAJAR CTF';
    description =
      'Jalur terstruktur 9 tahapan dari nol pengalaman hingga siap bertanding di kompetisi CTF. Pantau dan centang pencapaian belajar Anda secara mandiri.';
  } else if (activeTab === 'playground') {
    title = 'CTF PLAYGROUND';
    description =
      'Koleksi arena latihan, wargame terminal, platform kompetisi, dan simulasi lab hacking untuk mengasah kemampuan praktik langsung.';
  } else if (activeTab === 'general-tools') {
    title = 'TOOLS GENERAL';
    description =
      'Kumpulan perangkat web esensial, decoder, pemecah hash, dan sandbox online untuk membantu memproses data secara cepat.';
  } else if (activeTab === 'youtube') {
    title = 'KANAL YOUTUBE';
    description =
      'Rekomendasi kreator dan kanal edukasi keamanan siber terbaik untuk menonton walkthrough tantangan CTF dan tutorial teknis.';
  } else if (activeTab === 'role' && selectedRole) {
    const roleTitles: Record<RoleCategoryType, { title: string; desc: string }> = {
      webex: {
        title: 'ROLE: WEB EXPLOITATION',
        desc: 'Kurasi materi dan perangkat untuk menemukan serta mengeksploitasi kerentanan aplikasi web (SQLi, XSS, CSRF, SSRF, dll).',
      },
      forensic: {
        title: 'ROLE: DIGITAL FORENSICS',
        desc: 'Perangkat steganografi dan analisis berkas untuk mengungkap pesan atau file rahasia yang disembunyikan di dalam gambar/audio.',
      },
      reverse: {
        title: 'ROLE: REVERSE ENGINEERING',
        desc: 'Framework dan disassembler untuk menganalisis kode mesin, logika software, dan struktur binary aplikasi.',
      },
      crypto: {
        title: 'ROLE: CRYPTOGRAPHY',
        desc: 'Platform dan decoder sandi untuk menganalisis algoritma enkripsi klasik hingga kriptografi matematika modern.',
      },
      pwn: {
        title: 'ROLE: PWN / BINARY EXPLOIT',
        desc: 'Toolkit exploit development untuk menguji kelemahan memori, buffer overflow, dan eksekusi payload pada level biner.',
      },
    };

    if (roleTitles[selectedRole]) {
      title = roleTitles[selectedRole].title;
      description = roleTitles[selectedRole].desc;
    }
  }

  // Only show creator badge in Header on 'SEMUA' (all) tab
  const showCreatorBadge = activeTab === 'all';

  return (
    <header className="w-full max-w-4xl mx-auto pt-16 pb-6 px-4 text-center">
      {/* Dynamic Pixel Heading */}
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-pixel text-white uppercase tracking-wider mb-4 leading-tight">
        {title}
      </h1>

      {/* Purpose / Mission Statement according to current page */}
      <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto font-normal leading-relaxed mb-6">
        {description}
      </p>

      {/* Unified Creator Badge: DIBUAT OLEH DADAN / @AHDANFIRDAUS / AHDANFIRDAUS.MY.ID */}
      {showCreatorBadge && (
        <div className="flex items-center justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2.5 border border-neutral-800 bg-[#121212] px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider text-neutral-400">
            <img
              src="https://github.com/AhdanFirdaus.png?size=48"
              alt="Dadan (@AhdanFirdaus)"
              width="20"
              height="20"
              decoding="async"
              className="w-5 h-5 border border-neutral-700 object-cover grayscale shrink-0"
              loading="lazy"
            />
            <span className="text-neutral-300 font-semibold">DIBUAT OLEH DADAN</span>
            <span className="text-neutral-600">/</span>
            <a
              href="https://github.com/AhdanFirdaus"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              @AHDANFIRDAUS
            </a>
            <span className="text-neutral-600">/</span>
            <a
              href="https://ahdanfirdaus.my.id"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              AHDANFIRDAUS.MY.ID
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
