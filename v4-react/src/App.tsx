import { Header } from './components/Header';
import { ProductList } from './components/ProductList';
import { products } from './data';

export function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      {/* Navigation Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            Sản phẩm
          </h1>

          {/* Product Grid */}
          <ProductList products={products} />
        </section>
      </main>

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
