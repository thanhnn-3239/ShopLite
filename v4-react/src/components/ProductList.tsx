import type { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onSelectProduct: (id: number) => void;
}

export function ProductList({
  products,
  onAddToCart,
  onSelectProduct,
}: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 text-sm">
        Không tìm thấy sản phẩm phù hợp.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onSelectProduct={onSelectProduct}
        />
      ))}
    </div>
  );
}
