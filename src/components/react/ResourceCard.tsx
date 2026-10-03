import React from 'react';
import { ExternalLink } from 'lucide-react';
import type { ResourceItem } from '../../types/resource';

interface ResourceCardProps {
  item: ResourceItem;
  onSelectTag?: (tag: string) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ item, onSelectTag }) => {
  return (
    <div className="group relative flex flex-col justify-between border border-neutral-800 bg-[#121212] p-5 md:p-6 transition-all duration-150 hover:border-white hover:bg-[#161616]">
      <div>
        {/* Card Header: Category & Indicator */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-block border border-neutral-800 px-2 py-0.5 text-[11px] font-mono uppercase tracking-wider text-neutral-400 bg-[#0a0a0a] group-hover:border-neutral-600">
            {item.categoryLabel}
          </span>
          {item.recommended && (
            <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 bg-white text-black font-semibold">
              Rekomendasi
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg md:text-xl font-pixel text-white mb-2 leading-snug group-hover:text-white">
          {item.title}
        </h3>

        {/* Description in Indonesian */}
        <p className="text-sm text-neutral-400 font-normal leading-relaxed mb-6">
          {item.description}
        </p>
      </div>

      <div>
        {/* Clickable Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {item.tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => onSelectTag?.(tag)}
              title={`Filter berdasarkan tag #${tag}`}
              className="text-[11px] font-mono text-neutral-400 bg-[#0a0a0a] border border-neutral-800 px-1.5 py-0.5 hover:border-white hover:text-white transition-colors cursor-pointer"
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Direct Link Button */}
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-between w-full border border-neutral-800 bg-[#0a0a0a] px-3 py-2 text-xs font-mono uppercase tracking-wider text-neutral-300 group-hover:border-white group-hover:text-white transition-colors"
        >
          <span>Buka Resource</span>
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
};
