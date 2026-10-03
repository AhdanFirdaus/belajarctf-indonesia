export type CategoryType =
  | 'all'
  | 'learning'
  | 'general-tools'
  | 'webex'
  | 'forensic'
  | 'reverse'
  | 'crypto'
  | 'pwn'
  | 'youtube';

export type RoleCategoryType = 'webex' | 'forensic' | 'reverse' | 'crypto' | 'pwn';

export interface ResourceItem {
  id: string;
  title: string;
  category: CategoryType;
  categoryLabel: string;
  role?: RoleCategoryType;
  description: string;
  url: string;
  tags: string[];
  recommended?: boolean;
}
