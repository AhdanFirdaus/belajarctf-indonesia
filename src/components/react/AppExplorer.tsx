import React, { useState, useMemo, Suspense, lazy } from 'react';
import type { ResourceItem, RoleCategoryType } from '../../types/resource';
import { DynamicHeader } from './DynamicHeader';
import { SearchBar } from './SearchBar';
import { ResourceCard } from './ResourceCard';
import { TerminalListView } from './TerminalListView';
import { BottomDock, type ActiveTab } from './BottomDock';
import { LayoutGrid, List } from 'lucide-react';
import { playRetroClick } from '../../utils/sound';
import { useDebounce } from '../../utils/useDebounce';

// =========================================================================
// ON-DEMAND LAZY LOADED CHUNKS:
// =========================================================================
const LazyRoadmapTree = lazy(() =>
  import('./RoadmapTree').then((mod) => ({ default: mod.RoadmapTree }))
);
const LazyPlaygroundView = lazy(() =>
  import('./PlaygroundView').then((mod) => ({ default: mod.PlaygroundView }))
);
const LazyCommandPalette = lazy(() =>
  import('./CommandPalette').then((mod) => ({ default: mod.CommandPalette }))
);
const LazySurpriseModal = lazy(() =>
  import('./SurpriseModal').then((mod) => ({ default: mod.SurpriseModal }))
);

interface AppExplorerProps {
  initialResources: ResourceItem[];
}

export const AppExplorer: React.FC<AppExplorerProps> = ({ initialResources }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('all');
  const [selectedRole, setSelectedRole] = useState<RoleCategoryType | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const PAGE_SIZE = 24;
  const [displayLimit, setDisplayLimit] = useState(PAGE_SIZE);

  // Debounced query (180ms delay) for smooth and efficient filtering
  const debouncedQuery = useDebounce(searchQuery, 180);

  // Reset display limit when switching tabs or roles
  const handleTabSwitch = (tab: ActiveTab) => {
    setActiveTab(tab);
    setDisplayLimit(PAGE_SIZE);
    if (tab !== 'role') setSelectedRole(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Modals state
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isSurpriseOpen, setIsSurpriseOpen] = useState(false);
  const [randomItem, setRandomItem] = useState<ResourceItem | null>(null);

  // Global keydown listener for Ctrl+K
  React.useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Compute counts for dock indicators
  const itemCounts = useMemo(() => {
    const counts = {
      all: initialResources.length,
      roadmap: 9,
      playground: 13,
      'general-tools': 0,
      youtube: 0,
      webex: 0,
      forensic: 0,
      reverse: 0,
      crypto: 0,
      pwn: 0,
    };

    initialResources.forEach((res) => {
      if (res.category === 'general-tools') counts['general-tools']++;
      if (res.category === 'youtube') counts.youtube++;
      if (res.role === 'webex') counts.webex++;
      if (res.role === 'forensic') counts.forensic++;
      if (res.role === 'reverse') counts.reverse++;
      if (res.role === 'crypto') counts.crypto++;
      if (res.role === 'pwn') counts.pwn++;
    });

    return counts;
  }, [initialResources]);

  // Handle Role selection
  const handleSelectRole = (role: RoleCategoryType) => {
    setSelectedRole(role);
    setActiveTab('role');
    setDisplayLimit(PAGE_SIZE);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Surprise Me action
  const handleTriggerSurprise = () => {
    const pool = initialResources;
    const picked = pool[Math.floor(Math.random() * pool.length)];
    setRandomItem(picked);
    setIsSurpriseOpen(true);
  };

  // Handle clickable tag filter
  const handleSelectTag = (tag: string) => {
    playRetroClick();
    setActiveTab('all');
    setSelectedRole(null);
    setDisplayLimit(PAGE_SIZE);
    setSearchQuery(tag);
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  // Filter resources based on active tab, role, and debounced search query
  const filteredResources = useMemo(() => {
    return initialResources.filter((item) => {
      // Tab matching
      let matchesTab = true;
      if (activeTab === 'all') {
        matchesTab = true;
      } else if (activeTab === 'general-tools') {
        matchesTab = item.category === 'general-tools';
      } else if (activeTab === 'youtube') {
        matchesTab = item.category === 'youtube';
      } else if (activeTab === 'role') {
        matchesTab = item.role === selectedRole;
      }

      // Query matching using debounced query
      const query = debouncedQuery.toLowerCase().trim();
      if (!query) return matchesTab;

      const matchesSearch =
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        item.categoryLabel.toLowerCase().includes(query);

      return matchesTab && matchesSearch;
    });
  }, [initialResources, activeTab, selectedRole, debouncedQuery]);

  // Sliced resources for DOM optimization (reduces excessive DOM size)
  const displayedResources = useMemo(() => {
    if (debouncedQuery.trim() !== '') return filteredResources;
    return filteredResources.slice(0, displayLimit);
  }, [filteredResources, debouncedQuery, displayLimit]);

  const isBrowsingResources = activeTab !== 'roadmap' && activeTab !== 'playground';

  // Minimalist Fallback Skeleton during on-demand lazy chunk loading
  const LazyFallback = (
    <div className="w-full max-w-4xl mx-auto p-12 text-center text-xs font-mono text-neutral-500 uppercase tracking-widest border border-neutral-800 bg-[#0f0f0f] my-8 animate-pulse">
      [ MEMUAT DATA MODUL... ]
    </div>
  );

  return (
    <div className="w-full">
      {/* Dynamic Adaptive Header based on Active View */}
      <DynamicHeader activeTab={activeTab} selectedRole={selectedRole} />

      {/* Search Bar with Ctrl+K trigger */}
      {isBrowsingResources && (
        <div className="w-full max-w-2xl mx-auto mb-8 px-4">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={(q) => {
              setSearchQuery(q);
              setDisplayLimit(PAGE_SIZE);
            }}
            onClear={() => setSearchQuery('')}
            onOpenPalette={() => setIsPaletteOpen(true)}
            resultCount={filteredResources.length}
            totalCount={initialResources.length}
          />
        </div>
      )}

      {/* Main Content Area */}
      {activeTab === 'roadmap' ? (
        /* LAZY LOADED ROADMAP (RUTE BELAJAR) */
        <main className="w-full">
          <Suspense fallback={LazyFallback}>
            <LazyRoadmapTree />
          </Suspense>
        </main>
      ) : activeTab === 'playground' ? (
        /* LAZY LOADED PLAYGROUND (PLATFORM CTF) */
        <main className="w-full">
          <Suspense fallback={LazyFallback}>
            <LazyPlaygroundView />
          </Suspense>
        </main>
      ) : (
        /* KATALOG RESOURCE / ROLE / GENERAL TOOLS / YOUTUBE */
        <main className="w-full max-w-6xl mx-auto px-4 pb-36">
          {/* Active Filter Header & View Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-3 mb-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-neutral-500 uppercase">
                FILTER AKTIF:
              </span>
              <span className="text-xs font-mono text-white uppercase font-bold bg-[#121212] border border-neutral-700 px-2 py-0.5">
                {activeTab === 'all'
                  ? 'SEMUA RESOURCE'
                  : activeTab === 'general-tools'
                  ? 'TOOLS GENERAL'
                  : activeTab === 'youtube'
                  ? 'KANAL YOUTUBE'
                  : activeTab === 'role' && selectedRole
                  ? `ROLE: ${selectedRole.toUpperCase()}`
                  : 'RESOURCE'}
              </span>
              {debouncedQuery && (
                <span className="text-xs font-mono text-neutral-300 bg-[#141414] border border-neutral-800 px-2 py-0.5">
                  KATA KUNCI: "{debouncedQuery}"
                </span>
              )}
            </div>

            {/* Right Controls: View Switcher */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-neutral-500 hidden sm:inline">
                {filteredResources.length} ITEM DITEMUKAN
              </span>

              <div className="flex border border-neutral-800 bg-[#101010]">
                <button
                  onClick={() => {
                    playRetroClick();
                    setViewMode('grid');
                  }}
                  title="Tampilan Kartu Grid"
                  aria-label="Tampilan Kartu Grid"
                  className={`p-1.5 transition-colors cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-white text-black'
                      : 'text-neutral-500 hover:text-white'
                  }`}
                >
                  <LayoutGrid size={14} />
                </button>
                <button
                  onClick={() => {
                    playRetroClick();
                    setViewMode('list');
                  }}
                  title="Tampilan Tabel Terminal Ringkas"
                  aria-label="Tampilan Tabel Terminal Ringkas"
                  className={`p-1.5 transition-colors cursor-pointer ${
                    viewMode === 'list'
                      ? 'bg-white text-black'
                      : 'text-neutral-500 hover:text-white'
                  }`}
                >
                  <List size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Resources Grid / List or Empty State */}
          {filteredResources.length > 0 ? (
            <>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {displayedResources.map((item) => (
                    <ResourceCard
                      key={item.id}
                      item={item}
                      onSelectTag={handleSelectTag}
                    />
                  ))}
                </div>
              ) : (
                <TerminalListView
                  resources={displayedResources}
                  onSelectTag={handleSelectTag}
                />
              )}

              {/* Progressive DOM Loading Controls */}
              {filteredResources.length > displayedResources.length && (
                <div className="flex items-center justify-center mt-8 pt-6 border-t border-neutral-900">
                  <button
                    onClick={() => {
                      playRetroClick();
                      setDisplayLimit((prev) => prev + PAGE_SIZE);
                    }}
                    className="border border-neutral-700 bg-[#121212] text-white px-6 py-2.5 text-xs font-mono uppercase tracking-wider hover:border-white hover:bg-[#1a1a1a] transition-colors cursor-pointer"
                  >
                    + Muat Lebih Banyak ({filteredResources.length - displayedResources.length} item lagi)
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="border border-neutral-800 bg-[#121212] p-12 text-center my-8">
              <h3 className="text-xl font-pixel text-white mb-2">
                TIDAK ADA RESOURCE DITEMUKAN
              </h3>
              <p className="text-sm text-neutral-400 font-normal max-w-md mx-auto mb-6">
                Tidak ada materi atau tools yang cocok dengan kata kunci{' '}
                <span className="text-white font-mono">"{debouncedQuery}"</span> pada filter saat ini.
              </p>
              <button
                onClick={() => {
                  playRetroClick();
                  setSearchQuery('');
                  handleTabSwitch('all');
                }}
                className="border border-white bg-white text-black px-4 py-2 text-xs font-mono uppercase tracking-wider font-bold hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                Reset Semua Filter
              </button>
            </div>
          )}
        </main>
      )}

      {/* Floating Bottom Navigation Dock */}
      <BottomDock
        activeTab={activeTab}
        onSelectTab={handleTabSwitch}
        selectedRole={selectedRole}
        onSelectRole={handleSelectRole}
        onSurpriseMe={handleTriggerSurprise}
        itemCounts={itemCounts}
      />

      {/* LAZY LOADED Command Palette Modal (Ctrl + K) */}
      {isPaletteOpen && (
        <Suspense fallback={null}>
          <LazyCommandPalette
            isOpen={isPaletteOpen}
            onClose={() => setIsPaletteOpen(false)}
            resources={initialResources}
            onSelectResource={(r) => {
              window.open(r.url, '_blank');
            }}
            onNavigateToRoadmap={() => {
              setActiveTab('roadmap');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </Suspense>
      )}

      {/* LAZY LOADED Surprise Me Modal */}
      {isSurpriseOpen && (
        <Suspense fallback={null}>
          <LazySurpriseModal
            isOpen={isSurpriseOpen}
            onClose={() => setIsSurpriseOpen(false)}
            randomItem={randomItem}
            onPickAnother={handleTriggerSurprise}
          />
        </Suspense>
      )}
    </div>
  );
};
