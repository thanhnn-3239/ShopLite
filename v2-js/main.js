import { filterByKeyword } from './helpers.js';
import { addToCart, updateCartBadge } from './cart.js';

const productGrid = document.getElementById('product-grid');
const searchInput = document.getElementById('search-input');

let productsList = [];

function renderProducts(list) {
    if (!productGrid) return;

    if (list.length === 0) {
        productGrid.innerHTML = '<p class="no-products">Không tìm thấy sản phẩm phù hợp.</p>';
        return;
    }

    productGrid.innerHTML = list.map(item => `
        <article class="product-card" data-id="${item.id}">
            <div class="product-image">
                <img src="${item.thumbnail}" alt="${item.title}" style="max-width: 100%; max-height: 100%; object-fit: contain;">
            </div>
            <h2><a href="product.html?id=${item.id}">${item.title}</a></h2>
            <p class="product-price">${item.price.toLocaleString('vi-VN')}đ</p>
            <button type="button" class="btn-add-cart">Thêm vào giỏ</button>
        </article>
    `).join('');
}

function fetchProducts() {
    if (!productGrid) return;

    productGrid.innerHTML = '<p class="no-products">Đang tải sản phẩm...</p>';

    fetch('https://dummyjson.com/products')
        .then(res => {
            if (!res.ok) throw new Error('Không thể kết nối đến máy chủ.');
            return res.json();
        })
        .then(data => {
            productsList = data.products || [];
            renderProducts(productsList);
        })
        .catch(err => {
            console.error(err);
            productGrid.innerHTML = `
                <p class="no-products" style="color: var(--price-color);">
                    Không thể tải danh sách sản phẩm.
                    <button type="button" id="retry-btn" style="padding: 4px 8px; margin-left: 10px; cursor: pointer;">Thử lại</button>
                </p>
            `;
            const retryBtn = document.getElementById('retry-btn');
            if (retryBtn) {
                retryBtn.addEventListener('click', fetchProducts);
            }
        });
}

if (searchInput) {
    searchInput.addEventListener('input', (event) => {
        const query = event.target.value;
        const filtered = filterByKeyword(productsList, query);
        renderProducts(filtered);
    });
}

if (productGrid) {
    productGrid.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-add-cart')) {
            const card = event.target.closest('.product-card');
            if (card) {
                const productId = parseInt(card.dataset.id, 10);
                const product = productsList.find(p => p.id === productId);
                if (product) {
                    addToCart(product);
                    console.log("Đã thêm vào giỏ hàng:", product.title);
                }
            }
        }
    });
}

updateCartBadge();
fetchProducts();
