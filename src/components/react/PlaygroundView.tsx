import React from 'react';
import { ExternalLink } from 'lucide-react';
import { ctfPlatforms } from '../../data/playground';
import { playRetroClick } from '../../utils/sound';

export const PlaygroundView: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 pb-36">
      {/* Platforms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ctfPlatforms.map((platform) => (
          <div
            key={platform.id}
            className="group flex flex-col justify-between border border-neutral-800 bg-[#121212] p-5 md:p-6 hover:border-white hover:bg-[#161616] transition-all"
          >
            <div>
              {/* Top Badges */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono border border-neutral-700 bg-[#0a0a0a] px-2 py-0.5 text-neutral-300 uppercase">
                    {platform.type}
                  </span>
                  <span
                    className={`text-[10px] font-mono uppercase px-1.5 py-0.5 border ${
                      platform.difficulty === 'PEMULA'
                        ? 'border-white text-black bg-white font-bold'
                        : 'border-neutral-700 text-neutral-400 bg-[#0a0a0a]'
                    }`}
                  >
                    {platform.difficulty}
                  </span>
                </div>

                {platform.free && (
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                    GRATIS
                  </span>
                )}
              </div>

              {/* Platform Name */}
              <h3 className="text-lg sm:text-xl font-pixel text-white mb-2 group-hover:text-white leading-snug">
                {platform.name}
              </h3>

              {/* Description in Indonesian */}
              <p className="text-xs sm:text-sm text-neutral-400 font-normal leading-relaxed mb-4">
                {platform.description}
              </p>

              {/* Highlight / Rekomendasi Note */}
              <div className="border-l-2 border-neutral-600 pl-3 py-1 bg-[#0a0a0a] text-[11px] font-mono text-neutral-300 mb-5">
                <span className="text-neutral-500 uppercase">Tips: </span>
                <span>{platform.highlight}</span>
              </div>
            </div>

            <div>
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {platform.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono text-neutral-500 bg-[#0a0a0a] border border-neutral-900 px-1.5 py-0.5"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              {/* Direct Launch Button */}
              <a
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playRetroClick}
                className="inline-flex items-center justify-between w-full border border-neutral-800 bg-[#0a0a0a] px-3.5 py-2.5 text-xs font-mono uppercase tracking-wider text-neutral-300 group-hover:border-white group-hover:text-white transition-colors"
              >
                <span>Buka Platform Arena</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
