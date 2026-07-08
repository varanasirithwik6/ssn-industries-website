export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
}

export interface FilterTag {
  slug: string;
  name: string;
}
