

export interface Article {
  id:string;
  title:string;
  content:string;
  excerpt?:string;
  cover_image?:string;
  author_id:string;
  category_id?:string;
  created_at:string;
  updated_at:string;
}


export interface CreateArticlePayload {
  title:string;
  content:string;
  excerpt?:string;
  cover_image?:string;
  category_id?:string;
}


export interface UpdateArticlePayload {
  title?:string;
  content?:string;
  excerpt?:string;
  cover_image?:string;
  category_id?:string;
}

