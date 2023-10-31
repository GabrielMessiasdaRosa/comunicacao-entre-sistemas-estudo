export type ListBaseResponse<T> = {
  data: T;
  links?: {
    first: string;
    last: string;
    next: string;
    previous: string;
  };
  meta?: {
    currentPage: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
  };
};
