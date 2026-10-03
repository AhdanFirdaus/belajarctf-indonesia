import React from 'react';
import { Dice5, ExternalLink, RefreshCw, X } from 'lucide-react';
import type { ResourceItem } from '../../types/resource';
import { playRetroClick } from '../../utils/sound';

interface SurpriseModalProps {
  isOpen: boolean;
  onClose: () => void;
  randomItem: ResourceItem | null;
  onPickAnother: () => void;
}

export const SurpriseModal: React.FC<SurpriseModalProps> = ({
  isOpen,
  onClose,
  randomItem,
  onPickAnother,
}) => {
  if (!isOpen || !randomItem) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg border border-white bg-[#0c0c0c] shadow-2xl p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-5">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-white">
            <Dice5 size={16} />
            <span>SURPRISE ME: REKOMENDASI HARI INI</span>
          </div>
          <button
            onClick={() => {
              playRetroClick();
              onClose();
            }}
            className="text-neutral-500 hover:text-white cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content Box */}
        <div className="border border-neutral-800 bg-[#121212] p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-mono border border-neutral-700 bg-[#0a0a0a] px-2 py-0.5 text-neutral-300 uppercase">
              {randomItem.categoryLabel}
            </span>
            {randomItem.recommended && (
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 bg-white text-black font-semibold">
                Rekomendasi
              </span>
            )}
          </div>

          <h3 className="text-xl sm:text-2xl font-pixel text-white mb-2 leading-tight">
            {randomItem.title}
          </h3>

          <p className="text-sm text-neutral-300 font-normal leading-relaxed mb-4">
            {randomItem.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {randomItem.tags.map((t) => (
              <span key={t} className="text-[10px] font-mono text-neutral-500 bg-[#0a0a0a] border border-neutral-800 px-1.5 py-0.5">
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          <a
            href={randomItem.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={playRetroClick}
            className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 border border-white bg-white text-black px-4 py-2.5 text-xs font-mono uppercase tracking-wider font-bold hover:bg-neutral-200 transition-colors"
          >
            <span>Buka Resource Sekarang</span>
            <ExternalLink size={14} />
          </a>

          <button
            onClick={() => {
              playRetroClick();
              onPickAnother();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 border border-neutral-700 bg-[#141414] px-4 py-2.5 text-xs font-mono uppercase tracking-wider text-neutral-300 hover:text-white hover:border-neutral-500 transition-colors cursor-pointer"
          >
            <RefreshCw size={13} />
            <span>Acak Lagi</span>
          </button>
        </div>
      </div>
    </div>
  );
};
