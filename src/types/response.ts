export interface ApiResponse<T> {
  status: 'SUCCESS';
  timestamp: string;
  data: T;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
