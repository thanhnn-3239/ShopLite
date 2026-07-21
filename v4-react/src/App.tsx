import { useState } from 'react';
import { Header } from './components/Header';
import { ProductList } from './components/ProductList';
import { LoginForm } from './components/LoginForm';
import { products } from './data';
import type { Product, CartItem } from './types';

export function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

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

          {/* Product Grid */}
          <ProductList
            products={filteredProducts}
            onAddToCart={handleAddToCart}
          />
        </section>
      </main>

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
