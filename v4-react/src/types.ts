export interface Product {
  id: number;
  title: string;
  description?: string;
  price: number;
  discountPercentage?: number;
  rating: number;
  stock?: number;
  category: string;
  thumbnail: string;
  images?: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export type SortDir = 'asc' | 'desc';

export type FetchState<T> = {
  status: 'idle' | 'loading' | 'error' | 'success';
  data?: T;
  error?: string;
};
