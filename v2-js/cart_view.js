import { getCart, removeFromCart, updateQty, getCartTotal, updateCartBadge } from './cart.js';

const itemsList = document.getElementById('cart-items-list');
const subtotalEl = document.getElementById('summary-subtotal');
const shippingEl = document.getElementById('summary-shipping');
const totalEl = document.getElementById('summary-total');

const SHIPPING_FEE = 30000;

function renderCart() {
    if (!itemsList) return;

    updateCartBadge();

    const cart = getCart();

    if (cart.length === 0) {
        itemsList.innerHTML = '<p class="no-products">Giỏ hàng của bạn đang trống.</p>';
        if (subtotalEl) subtotalEl.textContent = '0đ';
        if (shippingEl) shippingEl.textContent = '0đ';
        if (totalEl) totalEl.textContent = '0đ';
        return;
    }

    itemsList.innerHTML = cart.map(item => `
        <article class="cart-item" data-id="${item.id}">
            <div class="cart-item-image">
                <img src="${item.thumbnail}" alt="${item.title}" style="max-width: 100%; max-height: 100%; object-fit: contain;">
            </div>
            <div class="cart-item-details">
                <div class="cart-item-info">
                    <h3><a href="product.html?id=${item.id}">${item.title}</a></h3>
                </div>
                <div class="cart-item-controls">
                    <input type="number" class="cart-item-qty" value="${item.quantity}" min="1" aria-label="Số lượng">
                    <span class="cart-item-price">${(item.price * item.quantity).toLocaleString('vi-VN')}đ</span>
                    <button type="button" class="btn-delete">Xóa</button>
                </div>
            </div>
        </article>
    `).join('');

    const subtotal = getCartTotal();
    const total = subtotal + SHIPPING_FEE;

    if (subtotalEl) subtotalEl.textContent = `${subtotal.toLocaleString('vi-VN')}đ`;
    if (shippingEl) shippingEl.textContent = `${SHIPPING_FEE.toLocaleString('vi-VN')}đ`;
    if (totalEl) totalEl.textContent = `${total.toLocaleString('vi-VN')}đ`;
}

if (itemsList) {
    itemsList.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-delete')) {
            const itemElement = event.target.closest('.cart-item');
            if (itemElement) {
                const productId = parseInt(itemElement.dataset.id, 10);
                removeFromCart(productId);
                renderCart();
            }
        }
    });

    itemsList.addEventListener('change', (event) => {
        if (event.target.classList.contains('cart-item-qty')) {
            const itemElement = event.target.closest('.cart-item');
            if (itemElement) {
                const productId = parseInt(itemElement.dataset.id, 10);
                const newQty = Math.max(1, parseInt(event.target.value, 10) || 1);

                event.target.value = newQty;

                updateQty(productId, newQty);
                renderCart();
            }
        }
    });
}

renderCart();
