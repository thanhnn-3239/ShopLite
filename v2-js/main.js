import { products } from './data.js';
import { filterByKeyword } from './helpers.js';

const productGrid = document.getElementById('product-grid');
const searchInput = document.getElementById('search-input');

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
            <h2><a href="product.html">${item.title}</a></h2>
            <p class="product-price">${item.price.toLocaleString('vi-VN')}đ</p>
            <button type="button" class="btn-add-cart">Thêm vào giỏ</button>
        </article>
    `).join('');
}

if (searchInput) {
    searchInput.addEventListener('input', (event) => {
        const query = event.target.value;
        const filteredList = filterByKeyword(products, query);
        renderProducts(filteredList);
    });
}

if (productGrid) {
    productGrid.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-add-cart')) {
            const card = event.target.closest('.product-card');
            if (card) {
                const productId = parseInt(card.dataset.id, 10);
                const product = products.find(p => p.id === productId);
                console.log("Đã click Thêm vào giỏ sản phẩm:", product);
            }
        }
    });
}

renderProducts(products);
