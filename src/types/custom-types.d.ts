export interface IBasicResponse<T> {
  error_code: string;
  message: string;
  data: T;
  success: boolean;
}

export interface IPaging {
  page_no: number;
  page_size: number;
  total: number;
}
export interface IPagingResponse<T> extends IBasicResponse<T> {
  data: {
    paging: IPaging;
    data: T[];
  };
}
