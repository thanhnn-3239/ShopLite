import { addToCart, updateCartBadge } from './cart.js';

const detailContainer = document.getElementById('product-detail-container');
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

function showStatus(msg) {
    if (detailContainer) {
        detailContainer.innerHTML = `<p class="no-products">${msg}</p>`;
    }
}

function fetchProductDetail(id) {
    if (!detailContainer) return;

    showStatus('Đang tải chi tiết sản phẩm...');

    fetch(`https://dummyjson.com/products/${id}`)
        .then(res => {
            if (!res.ok) throw new Error('Không tìm thấy sản phẩm.');
            return res.json();
        })
        .then(product => {
            detailContainer.innerHTML = `
                <div class="product-detail-image">
                    <img src="${product.thumbnail}" alt="${product.title}" style="max-width: 100%; max-height: 100%; object-fit: contain;">
                </div>

                <div class="product-detail-info">
                    <h2>${product.title}</h2>
                    <p class="product-detail-price">${product.price.toLocaleString('vi-VN')}đ</p>
                    <p class="product-description">${product.description}</p>
                    <p class="product-stock">Kho hàng: <strong>${product.stock}</strong> sản phẩm</p>
                    <button type="button" class="btn-large" id="btn-add-to-cart">Thêm vào giỏ hàng</button>
                </div>
            `;

            const addBtn = document.getElementById('btn-add-to-cart');
            if (addBtn) {
                addBtn.addEventListener('click', () => {
                    addToCart(product);
                    console.log("Đã thêm vào giỏ hàng từ trang chi tiết:", product.title);
                });
            }
        })
        .catch(err => {
            console.error(err);
            showStatus('Không thể tải chi tiết sản phẩm. Vui lòng quay lại trang chủ.');
        });
}

updateCartBadge();

if (productId) {
    fetchProductDetail(productId);
} else {
    showStatus('Sản phẩm không hợp lệ.');
}
