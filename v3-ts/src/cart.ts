import type { Product, CartItem } from './types';

export function getCart(): CartItem[] {
    const raw = localStorage.getItem('cart');
    return raw ? JSON.parse(raw) as CartItem[] : [];
}

export function saveCart(cart: CartItem[]): void {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(product: Product): CartItem[] {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price,
            discountPercentage: product.discountPercentage,
            rating: product.rating,
            stock: product.stock,
            category: product.category,
            thumbnail: product.thumbnail,
            images: product.images,
            quantity: 1
        });
    }
    saveCart(cart);
    updateCartBadge();
    return cart;
}

export function removeFromCart(productId: number): CartItem[] {
    const cart = getCart().filter(item => item.id !== productId);
    saveCart(cart);
    updateCartBadge();
    return cart;
}

export function updateQty(productId: number, qty: number): CartItem[] {
    const cart = getCart();
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = qty;
        saveCart(cart);
    }
    updateCartBadge();
    return cart;
}

export function getCartCount(): number {
    return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

export function getCartTotal(): number {
    return getCart().reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

export function updateCartBadge(): void {
    const cartLink = document.querySelector('.cart a');
    if (cartLink) {
        cartLink.textContent = `Giỏ hàng (${getCartCount()})`;
    }
}
