import type { Product, SortDir } from './types';

export function filterByKeyword(list: Product[], q: string): Product[] {
    if (!q || typeof q !== 'string') {
        return [...list];
    }
    const keyword = q.trim().toLowerCase();
    return list.filter(item => 
        (item.title && item.title.toLowerCase().includes(keyword)) ||
        (item.category && item.category.toLowerCase().includes(keyword))
    );
}

export function sortByPrice(list: Product[], dir: SortDir = 'asc'): Product[] {
    const sortedList = [...list];
    return sortedList.sort((a, b) => {
        if (dir === 'desc') {
            return b.price - a.price;
        }
        return a.price - b.price;
    });
}
