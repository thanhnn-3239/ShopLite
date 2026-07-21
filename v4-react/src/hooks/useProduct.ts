import { useQuery } from '@tanstack/react-query';
import { getProduct } from '../api/productApi';

export function useProduct(id: number | string | null) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id!),
    enabled: !!id,
  });
}
