import { LucideIcon } from 'lucide-react';

export interface LocalProduct {
  id: string;
  name: string;
  slug: string;
  category: string;
  categoryName: string;
  description: string;
  specs: Record<string, string | string[]>;
  imageUrl?: string;
}

export interface Category {
  slug: string;
  name: string;
  icon: LucideIcon;
}
