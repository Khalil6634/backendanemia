//ini buat response model materi
export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  imageUrl?: string | null;
  author: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}