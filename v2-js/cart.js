export function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

export function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(product) {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
            quantity: 1
        });
    }
    saveCart(cart);
    updateCartBadge();
}

export function removeFromCart(productId) {
    const cart = getCart().filter(item => item.id !== productId);
    saveCart(cart);
    updateCartBadge();
}

export function updateQty(productId, qty) {
    const cart = getCart();
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = qty;
        saveCart(cart);
    }
    updateCartBadge();
}

export function getCartCount() {
    return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

export function getCartTotal() {
    return getCart().reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

export function updateCartBadge() {
    const cartLink = document.querySelector('.cart a');
    if (cartLink) {
        cartLink.textContent = `Giỏ hàng (${getCartCount()})`;
    }
}
