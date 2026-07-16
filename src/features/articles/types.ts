export interface Article {
  id: string;

  title: string;

  slug: string;

  summary: string;

  content: string;

  cover_image?: string | null;

  status: string;

  view_count: number;

  reading_time: number;

  is_featured: boolean;

  published_at?: string | null;

  created_at: string;

  updated_at: string;

  author_id: string;

  category_id: string;
}

export interface CreateArticlePayload {
  title: string;
  content: string;
  excerpt?: string;
  cover_image?: string;
  category_id?: string;
}

export interface UpdateArticlePayload {
  title?: string;
  content?: string;
  excerpt?: string;
  cover_image?: string;
  category_id?: string;
}
