export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message: string | null;
  errors: string[] | null;
}