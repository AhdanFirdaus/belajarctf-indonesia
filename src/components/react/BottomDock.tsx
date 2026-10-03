import React, { useState, useRef, useEffect } from 'react';
import type { RoleCategoryType } from '../../types/resource';
import { Dice5, ChevronUp, Gamepad2, Map } from 'lucide-react';
import { playRetroClick } from '../../utils/sound';

export type ActiveTab = 'all' | 'roadmap' | 'playground' | 'general-tools' | 'role' | 'youtube';

interface BottomDockProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  selectedRole: RoleCategoryType | null;
  onSelectRole: (role: RoleCategoryType) => void;
  onSurpriseMe: () => void;
  itemCounts: {
    all: number;
    roadmap: number;
    playground: number;
    'general-tools': number;
    youtube: number;
    webex: number;
    forensic: number;
    reverse: number;
    crypto: number;
    pwn: number;
  };
}

const roleOptions: { id: RoleCategoryType; label: string; countKey: keyof BottomDockProps['itemCounts'] }[] = [
  { id: 'webex', label: 'Web Exploitation (Webex)', countKey: 'webex' },
  { id: 'forensic', label: 'Forensics & Steganography', countKey: 'forensic' },
  { id: 'reverse', label: 'Reverse Engineering', countKey: 'reverse' },
  { id: 'crypto', label: 'Cryptography', countKey: 'crypto' },
  { id: 'pwn', label: 'Pwn / Binary Exploitation', countKey: 'pwn' },
];

export const BottomDock: React.FC<BottomDockProps> = ({
  activeTab,
  onSelectTab,
  selectedRole,
  onSelectRole,
  onSurpriseMe,
  itemCounts,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const dockRef = useRef<HTMLElement>(null);
  const roleMenuRef = useRef<HTMLDivElement>(null);

  // Close dock or role dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dockRef.current && !dockRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setRoleMenuOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (roleMenuOpen) {
          setRoleMenuOpen(false);
        } else {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [roleMenuOpen]);

  return (
    <aside
      ref={dockRef}
      aria-label="Navigasi Bawah"
      className="fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 w-[96%] sm:w-auto max-w-5xl pointer-events-auto"
    >
      {!isOpen ? (
        /* ==================== DEFAULT HIDE STATE: MINIMALIST "NAVIGASI" BUTTON ==================== */
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              playRetroClick();
              setIsOpen(true);
            }}
            className="group flex items-center justify-center gap-3 bg-[#0a0a0a]/95 border border-neutral-700 hover:border-white text-white shadow-2xl backdrop-blur-md px-6 py-2.5 transition-all cursor-pointer min-w-[200px]"
          >
            <span className="w-5 h-[1px] bg-neutral-700 group-hover:bg-white transition-colors"></span>
            <span className="text-xs font-mono uppercase tracking-widest font-bold text-neutral-300 group-hover:text-white">
              NAVIGASI
            </span>
            <span className="w-5 h-[1px] bg-neutral-700 group-hover:bg-white transition-colors"></span>
          </button>
        </div>
      ) : (
        /* ==================== EXPANDED STATE: ALL NAVIGATION TABS ==================== */
        <div className="relative flex flex-col items-center bg-[#0a0a0a]/95 border border-neutral-700 shadow-2xl backdrop-blur-md px-2.5 py-2 sm:px-3 sm:py-2.5 transition-all animate-in fade-in zoom-in-95 duration-150">
          {/* Role Select Dropdown Popup */}
          {roleMenuOpen && (
            <div
              ref={roleMenuRef}
              className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-72 border border-white bg-[#0f0f0f] shadow-2xl p-1.5 space-y-1 z-50"
            >
              <div className="flex items-center justify-between px-2 py-1 border-b border-neutral-800 text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                <span>PILIH ROLE CTF:</span>
                <button
                  type="button"
                  onClick={() => setRoleMenuOpen(false)}
                  className="text-neutral-500 hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>
              {roleOptions.map((role) => {
                const isSelected = activeTab === 'role' && selectedRole === role.id;
                const count = itemCounts[role.countKey] || 0;

                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      playRetroClick();
                      onSelectRole(role.id);
                      setRoleMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-mono uppercase text-left transition-colors cursor-pointer border ${
                      isSelected
                        ? 'bg-white text-black border-white font-bold'
                        : 'bg-[#141414] text-neutral-300 border-neutral-900 hover:border-neutral-700 hover:text-white'
                    }`}
                  >
                    <span className="truncate">{role.label}</span>
                    <span className="text-[10px] opacity-70">({count})</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Navigation Items in Dock */}
          <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 w-full">
            {/* SEMUA */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                playRetroClick();
                onSelectTab('all');
                setRoleMenuOpen(false);
              }}
              className={`px-2.5 py-1.5 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-mono uppercase tracking-wider transition-all cursor-pointer border ${
                activeTab === 'all'
                  ? 'bg-white text-black border-white font-bold shadow-sm'
                  : 'bg-[#121212] text-neutral-300 border-neutral-800 hover:border-neutral-500 hover:text-white'
              }`}
            >
              <span>SEMUA</span>
              <span className="ml-1 text-[10px] opacity-70">({itemCounts.all})</span>
            </button>

            {/* ROADMAP */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                playRetroClick();
                onSelectTab('roadmap');
                setRoleMenuOpen(false);
              }}
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-mono uppercase tracking-wider transition-all cursor-pointer border ${
                activeTab === 'roadmap'
                  ? 'bg-white text-black border-white font-bold shadow-sm'
                  : 'bg-[#121212] text-neutral-300 border-neutral-800 hover:border-neutral-500 hover:text-white'
              }`}
            >
              <Map size={12} />
              <span>ROADMAP</span>
              <span className="ml-1 text-[10px] opacity-70">({itemCounts.roadmap})</span>
            </button>

            {/* PLAYGROUND */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                playRetroClick();
                onSelectTab('playground');
                setRoleMenuOpen(false);
              }}
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-mono uppercase tracking-wider transition-all cursor-pointer border ${
                activeTab === 'playground'
                  ? 'bg-white text-black border-white font-bold shadow-sm'
                  : 'bg-[#121212] text-neutral-300 border-neutral-800 hover:border-neutral-500 hover:text-white'
              }`}
            >
              <Gamepad2 size={12} />
              <span>PLAYGROUND</span>
              <span className="ml-1 text-[10px] opacity-70">({itemCounts.playground})</span>
            </button>

            {/* TOOLS GENERAL */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                playRetroClick();
                onSelectTab('general-tools');
                setRoleMenuOpen(false);
              }}
              className={`px-2.5 py-1.5 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-mono uppercase tracking-wider transition-all cursor-pointer border ${
                activeTab === 'general-tools'
                  ? 'bg-white text-black border-white font-bold shadow-sm'
                  : 'bg-[#121212] text-neutral-300 border-neutral-800 hover:border-neutral-500 hover:text-white'
              }`}
            >
              <span>TOOLS GENERAL</span>
              <span className="ml-1 text-[10px] opacity-70">({itemCounts['general-tools']})</span>
            </button>

            {/* ROLE SELECT DROPDOWN */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                playRetroClick();
                setRoleMenuOpen((prev) => !prev);
              }}
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-mono uppercase tracking-wider transition-all cursor-pointer border ${
                activeTab === 'role'
                  ? 'bg-white text-black border-white font-bold shadow-sm'
                  : 'bg-[#121212] text-neutral-300 border-neutral-800 hover:border-neutral-500 hover:text-white'
              }`}
            >
              <span>
                {activeTab === 'role' && selectedRole
                  ? `ROLE: ${selectedRole.toUpperCase()}`
                  : 'ROLE'}
              </span>
              <ChevronUp size={12} className={`transition-transform duration-200 ${roleMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* YOUTUBE */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                playRetroClick();
                onSelectTab('youtube');
                setRoleMenuOpen(false);
              }}
              className={`px-2.5 py-1.5 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-mono uppercase tracking-wider transition-all cursor-pointer border ${
                activeTab === 'youtube'
                  ? 'bg-white text-black border-white font-bold shadow-sm'
                  : 'bg-[#121212] text-neutral-300 border-neutral-800 hover:border-neutral-500 hover:text-white'
              }`}
            >
              <span>YOUTUBE</span>
              <span className="ml-1 text-[10px] opacity-70">({itemCounts.youtube})</span>
            </button>

            {/* SURPRISE ME BUTTON */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                playRetroClick();
                onSurpriseMe();
              }}
              title="Acak Tool Hari Ini"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] sm:text-xs font-mono uppercase border border-neutral-800 bg-[#121212] text-neutral-400 hover:border-white hover:text-white transition-colors cursor-pointer"
            >
              <Dice5 size={13} />
              <span className="hidden md:inline">ACAK</span>
            </button>
          </div>

          {/* Maker Credit Line */}
          <div className="mt-2 pt-1.5 border-t border-neutral-900 w-full text-center">
            <a
              href="https://github.com/AhdanFirdaus"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playRetroClick}
              className="text-[10px] font-mono tracking-widest text-neutral-500 hover:text-white uppercase transition-colors inline-flex items-center gap-1"
            >
              <span>[ DIBUAT OLEH DADAN (@AhdanFirdaus) ]</span>
            </a>
          </div>
        </div>
      )}
    </aside>
  );
};
