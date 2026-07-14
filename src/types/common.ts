export interface SelectOption {
  label: string;
  value: string;
}

export interface BaseEntity {
  id: string;
  created_at?: string;
  updated_at?: string;
}