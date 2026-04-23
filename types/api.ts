export type PagedResponse<T> = {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
};

export type ApiError = {
  status: number;
  error: string;
  message: string;
};

export type SortOrder = "asc" | "desc";