import React, { useState, useEffect, useRef } from 'react';
import { Search, Compass, Layers, X, CornerDownLeft } from 'lucide-react';
import type { ResourceItem } from '../../types/resource';
import { roadmapSteps } from '../../data/roadmap';
import { playRetroClick, playTerminalBeep } from '../../utils/sound';
import { useDebounce } from '../../utils/useDebounce';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  resources: ResourceItem[];
  onSelectResource: (resource: ResourceItem) => void;
  onNavigateToRoadmap: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  resources,
  onSelectResource,
  onNavigateToRoadmap,
}) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 120);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus on open
  useEffect(() => {
    if (isOpen) {
      playTerminalBeep();
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Combined search results using debounced query
  const filteredResults = React.useMemo(() => {
    const q = debouncedQuery.toLowerCase().trim();
    if (!q) {
      return [
        { type: 'action', id: 'goto-roadmap', title: 'Buka Rute Belajar (Skill Tree)', category: 'NAVIGASI' },
        ...resources.slice(0, 5).map((r) => ({ type: 'resource', ...r })),
      ];
    }

    const matchedResources = resources
      .filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.categoryLabel.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q))
      )
      .map((r) => ({ type: 'resource' as const, ...r }));

    const matchedSteps = roadmapSteps
      .filter((s) => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q))
      .map((s) => ({
        type: 'step' as const,
        id: s.id,
        title: `Tahap 0${s.stepNumber}: ${s.title}`,
        categoryLabel: 'ROADMAP',
        description: s.description,
        url: s.actionUrl,
      }));

    return [...matchedResources, ...matchedSteps];
  }, [debouncedQuery, resources]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        playRetroClick();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        playRetroClick();
        setSelectedIndex((prev) => (prev + 1) % (filteredResults.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        playRetroClick();
        setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % (filteredResults.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        playRetroClick();
        const selected = filteredResults[selectedIndex];
        if (selected) {
          if ('type' in selected && selected.type === 'action') {
            onNavigateToRoadmap();
            onClose();
          } else if ('type' in selected && selected.type === 'step') {
            onNavigateToRoadmap();
            onClose();
          } else if ('url' in selected) {
            window.open(selected.url, '_blank');
            onClose();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredResults, onClose, onNavigateToRoadmap]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl border border-neutral-700 bg-[#0c0c0c] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Input */}
        <div className="flex items-center border-b border-neutral-800 px-4 py-3.5 bg-[#121212]">
          <Search size={18} className="text-neutral-500 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Cari materi, tool, atau tahapan belajar..."
            className="w-full bg-transparent text-white text-sm md:text-base placeholder-neutral-600 focus:outline-none font-mono"
          />
          <button
            onClick={() => {
              playRetroClick();
              onClose();
            }}
            className="text-neutral-500 hover:text-white p-1 ml-2 cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
          {filteredResults.length > 0 ? (
            filteredResults.map((item, index) => {
              const isSelected = index === selectedIndex;

              return (
                <div
                  key={item.id || index}
                  onClick={() => {
                    playRetroClick();
                    if ('type' in item && item.type === 'action') {
                      onNavigateToRoadmap();
                      onClose();
                    } else if ('type' in item && item.type === 'step') {
                      onNavigateToRoadmap();
                      onClose();
                    } else if ('url' in item) {
                      window.open(item.url, '_blank');
                      onClose();
                    }
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between p-3 border transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-white text-black border-white'
                      : 'bg-[#101010] text-neutral-300 border-neutral-900 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    {'type' in item && item.type === 'step' ? (
                      <Compass size={16} className="shrink-0" />
                    ) : 'type' in item && item.type === 'action' ? (
                      <Layers size={16} className="shrink-0" />
                    ) : (
                      <span className="text-[10px] font-mono border px-1.5 py-0.5 uppercase shrink-0">
                        {'categoryLabel' in item ? item.categoryLabel : 'ITEM'}
                      </span>
                    )}
                    <div className="truncate">
                      <div className="text-xs sm:text-sm font-semibold truncate font-mono">
                        {item.title}
                      </div>
                      {'description' in item && (
                        <div
                          className={`text-[11px] truncate ${
                            isSelected ? 'text-neutral-700' : 'text-neutral-500'
                          }`}
                        >
                          {item.description}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0 ml-2">
                    <CornerDownLeft size={13} className={isSelected ? 'text-black' : 'text-neutral-600'} />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-xs font-mono text-neutral-500 uppercase">
              Tidak ada hasil yang cocok dengan "{debouncedQuery}"
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between border-t border-neutral-800 px-4 py-2 bg-[#080808] text-[11px] font-mono text-neutral-500">
          <div className="flex items-center gap-3">
            <span>[↑↓] NAVIGASI</span>
            <span>[ENTER] BUKA</span>
            <span>[ESC] TUTUP</span>
          </div>
          <span className="text-neutral-400">⚡ TERMINAL QUICK PALETTE</span>
        </div>
      </div>
    </div>
  );
};
