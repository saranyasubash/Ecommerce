export interface Category {
  id?: number;       // optional (not needed while creating)
  name: string;
  status: number;    // 1 = Active, 0 = Inactive
  created_at?: string;
  updated_at?: string;
}
