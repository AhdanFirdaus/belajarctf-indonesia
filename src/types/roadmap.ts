export interface RoadmapStep {
  id: string;
  stepNumber: number;
  title: string;
  phase: string;
  level: 'PEMULA' | 'MENENGAH' | 'LANJUTAN';
  description: string;
  tasks: string[];
  recommendedResourceIds: string[];
  actionUrl: string;
  actionText: string;
}
