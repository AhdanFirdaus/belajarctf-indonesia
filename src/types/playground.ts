export interface PlatformItem {
  id: string;
  name: string;
  type: 'WARGAME' | 'JEOPARDY' | 'LABS' | 'KOMPETISI';
  difficulty: 'PEMULA' | 'MENENGAH' | 'LANJUTAN' | 'SEMUA LEVEL';
  description: string;
  highlight: string;
  url: string;
  tags: string[];
  free: boolean;
}
