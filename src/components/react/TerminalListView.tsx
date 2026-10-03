import React from 'react';
import { ExternalLink } from 'lucide-react';
import type { ResourceItem } from '../../types/resource';
import { playRetroClick } from '../../utils/sound';

interface TerminalListViewProps {
  resources: ResourceItem[];
  onSelectTag?: (tag: string) => void;
}

export const TerminalListView: React.FC<TerminalListViewProps> = ({
  resources,
  onSelectTag,
}) => {
  return (
    <div className="w-full border border-neutral-800 bg-[#0f0f0f] overflow-x-auto">
      <table className="w-full text-left border-collapse text-xs font-mono">
        <thead>
          <tr className="border-b border-neutral-800 bg-[#141414] text-neutral-400 uppercase">
            <th className="py-3 px-4">Nama Resource</th>
            <th className="py-3 px-4 hidden sm:table-cell">Kategori</th>
            <th className="py-3 px-4 hidden md:table-cell">Deskripsi Singkat</th>
            <th className="py-3 px-4 hidden lg:table-cell">Tags</th>
            <th className="py-3 px-4 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-900">
          {resources.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-[#181818] transition-colors group"
            >
              <td className="py-3 px-4 text-white font-semibold whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <span>{item.title}</span>
                  {item.recommended && (
                    <span className="text-[9px] bg-white text-black px-1 font-bold">★</span>
                  )}
                </div>
              </td>
              <td className="py-3 px-4 text-neutral-400 whitespace-nowrap hidden sm:table-cell">
                <span className="border border-neutral-800 px-1.5 py-0.5 bg-[#0a0a0a]">
                  {item.categoryLabel}
                </span>
              </td>
              <td className="py-3 px-4 text-neutral-400 max-w-xs truncate hidden md:table-cell">
                {item.description}
              </td>
              <td className="py-3 px-4 hidden lg:table-cell">
                <div className="flex flex-wrap gap-1 max-w-xs">
                  {item.tags.map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        playRetroClick();
                        onSelectTag?.(t);
                      }}
                      className="text-[10px] text-neutral-500 hover:text-white cursor-pointer"
                    >
                      #{t}
                    </button>
                  ))}
                </div>
              </td>
              <td className="py-3 px-4 text-right whitespace-nowrap">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playRetroClick}
                  className="inline-flex items-center gap-1 border border-neutral-800 bg-[#0a0a0a] px-2.5 py-1 text-neutral-300 group-hover:border-white group-hover:text-white transition-colors"
                >
                  <span>BUKA</span>
                  <ExternalLink size={12} />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
