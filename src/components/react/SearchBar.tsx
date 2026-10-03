import React from 'react';
import { Search, X, Command } from 'lucide-react';
import { playRetroClick } from '../../utils/sound';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClear: () => void;
  onOpenPalette?: () => void;
  resultCount: number;
  totalCount: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  onClear,
  onOpenPalette,
  resultCount,
  totalCount,
}) => {
  return (
    <div className="w-full">
      <div className="relative flex items-center border border-neutral-800 bg-[#121212] transition-colors focus-within:border-white">
        <div className="pl-4 pr-2 text-neutral-500 flex items-center pointer-events-none">
          <Search size={18} strokeWidth={2} />
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari materi, tools, kanal, atau tag..."
          className="w-full py-3.5 px-2 bg-transparent text-white placeholder-neutral-600 text-sm md:text-base focus:outline-none font-mono"
        />

        {searchQuery && (
          <button
            onClick={() => {
              playRetroClick();
              onClear();
            }}
            className="px-2 text-neutral-500 hover:text-white transition-colors cursor-pointer"
            title="Hapus pencarian"
          >
            <X size={16} />
          </button>
        )}

        {/* Dedicated Ctrl + K Shortcut Badge Button */}
        <button
          type="button"
          onClick={() => {
            playRetroClick();
            onOpenPalette?.();
          }}
          title="Buka Command Palette (Ctrl + K)"
          className="hidden sm:flex items-center gap-1.5 border-l border-neutral-800 px-3 py-1 text-xs font-mono text-neutral-400 hover:text-white hover:bg-[#181818] transition-colors cursor-pointer shrink-0"
        >
          <kbd className="border border-neutral-700 bg-[#0a0a0a] px-1.5 py-0.5 text-[10px] text-neutral-300 font-mono">
            CTRL + K
          </kbd>
        </button>

        {/* Counter indicator */}
        <div className="hidden md:flex items-center pr-4 pl-3 text-xs font-mono text-neutral-500 border-l border-neutral-800 shrink-0">
          <span>{resultCount}/{totalCount} ITEM</span>
        </div>
      </div>
    </div>
  );
};
