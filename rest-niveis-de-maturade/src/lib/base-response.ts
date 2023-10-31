export type BaseResponse<T> = {
  data: T;
  links?: {
    self: string;
    update: string;
    delete: string;
  };
};
