import type { Product } from '../types';

export async function getProducts(): Promise<Product[]> {
  const res = await fetch('https://dummyjson.com/products');
  if (!res.ok) {
    throw new Error('Không thể kết nối đến máy chủ.');
  }
  const data = await res.json();
  return data.products || [];
}

export async function getProduct(id: number | string): Promise<Product> {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) {
    throw new Error('Không tìm thấy chi tiết sản phẩm.');
  }
  return await res.json();
}
