import { useState } from 'react';
import { Header } from './components/Header';
import { ProductList } from './components/ProductList';
import { ProductSkeleton } from './components/ProductSkeleton';
import { ProductDetailModal } from './components/ProductDetailModal';
import { LoginForm } from './components/LoginForm';
import { useProducts } from './hooks/useProducts';
import type { Product, CartItem } from './types';

export function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const { data: products = [], isLoading, isError, error, refetch } = useProducts();

  const filteredProducts = products.filter((product) => {
    if (!searchTerm.trim()) return true;
    const query = searchTerm.trim().toLowerCase();
    return (
      product.title.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
  });

  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      {/* Navigation Header */}
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        cartCount={totalCartCount}
        onOpenLogin={() => setIsLoginOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            Sản phẩm
          </h1>

          {/* Loading Skeletons */}
          {isLoading && <ProductSkeleton count={8} />}

          {/* Error Banner + Retry Button */}
          {isError && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg text-center my-4">
              <p className="font-semibold text-base mb-1">Không thể tải danh sách sản phẩm!</p>
              <p className="text-xs text-red-600 mb-4">
                {error instanceof Error ? error.message : 'Vui lòng kiểm tra kết nối mạng của bạn.'}
              </p>
              <button
                type="button"
                onClick={() => refetch()}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-md transition-colors cursor-pointer"
              >
                Thử lại
              </button>
            </div>
          )}

          {/* Product Grid */}
          {!isLoading && !isError && (
            <ProductList
              products={filteredProducts}
              onAddToCart={handleAddToCart}
              onSelectProduct={(id) => setSelectedProductId(id)}
            />
          )}
        </section>
      </main>

      {/* Product Detail Modal */}
      <ProductDetailModal
        productId={selectedProductId}
        onClose={() => setSelectedProductId(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Login Modal Form */}
      <LoginForm
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 mt-12 py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
          <p>© 2026 ShopLite Store. Tất cả các quyền được bảo lưu.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
