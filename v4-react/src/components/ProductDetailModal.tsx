import { useProduct } from '../hooks/useProduct';
import { useCartStore } from '../store/useCartStore';

interface ProductDetailModalProps {
  productId: number | null;
  onClose: () => void;
}

export function ProductDetailModal({
  productId,
  onClose,
}: ProductDetailModalProps) {
  const { data: product, isLoading, isError, error, refetch } = useProduct(productId);
  const addToCart = useCartStore((s) => s.addToCart);

  if (!productId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors text-lg cursor-pointer"
          aria-label="Đóng"
        >
          ✕
        </button>

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-sm text-gray-500 font-medium">Đang tải chi tiết sản phẩm...</p>
          </div>
        )}

        {isError && (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-3 text-xl font-bold">
              !
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">Tải dữ liệu thất bại</h3>
            <p className="text-xs text-red-500 mb-4 max-w-xs">
              {error instanceof Error ? error.message : 'Không thể kết nối đến máy chủ.'}
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md transition-colors cursor-pointer"
            >
              Thử lại
            </button>
          </div>
        )}

        {product && !isLoading && !isError && (
          <div className="space-y-4">
            <div className="w-full h-56 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div>
              <span className="inline-block px-2 py-0.5 text-xs font-medium bg-blue-50 text-blue-700 rounded-xs mb-1 uppercase tracking-wider">
                {product.category}
              </span>
              <h2 className="text-xl font-bold text-gray-900">{product.title}</h2>
              <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                <span className="text-amber-500">★ {product.rating}</span>
                <span>•</span>
                <span>Tồn kho: <strong>{product.stock ?? 0}</strong> sản phẩm</span>
              </div>
            </div>

            <p className="text-xl font-bold text-red-600">
              {product.price.toLocaleString('vi-VN')}đ
            </p>

            <p className="text-sm text-gray-600 leading-relaxed">
              {product.description || 'Chưa có mô tả chi tiết cho sản phẩm này.'}
            </p>

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  addToCart(product);
                  onClose();
                }}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold rounded-md transition-colors cursor-pointer"
              >
                Thêm vào giỏ hàng
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-md transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
