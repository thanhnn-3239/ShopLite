import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (id: number) => void;
}

export function ProductCard({
  product,
  onAddToCart,
  onSelectProduct,
}: ProductCardProps) {
  return (
    <article className="flex flex-col bg-white border border-gray-200 rounded-lg p-4 shadow-xs hover:border-blue-500 hover:shadow-md transition-all">
      {/* Thumbnail */}
      <div
        onClick={() => onSelectProduct(product.id)}
        className="w-full h-40 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center mb-3 cursor-pointer group"
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
        />
      </div>

      {/* Title */}
      <h3
        onClick={() => onSelectProduct(product.id)}
        className="text-sm font-medium text-gray-900 line-clamp-2 mb-2 hover:text-blue-600 cursor-pointer"
      >
        {product.title}
      </h3>

      {/* Rating */}
      <div className="flex items-center gap-1 text-amber-500 text-xs mb-2">
        <span>★</span>
        <span className="font-semibold text-gray-700">{product.rating}</span>
      </div>

      {/* Price */}
      <p className="text-base font-bold text-red-600 mb-4">
        {product.price.toLocaleString('vi-VN')}đ
      </p>

      {/* Add to cart button */}
      <button
        type="button"
        onClick={() => onAddToCart(product)}
        className="mt-auto w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md transition-colors cursor-pointer active:bg-blue-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Thêm vào giỏ
      </button>
    </article>
  );
}
