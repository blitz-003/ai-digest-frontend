export interface ApiError {
  detail: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
}