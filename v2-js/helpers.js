export function filterByKeyword(list, q) {
    if (!q || typeof q !== 'string') {
        return [...list];
    }
    const keyword = q.trim().toLowerCase();
    return list.filter(item =>
        (item.title && item.title.toLowerCase().includes(keyword)) ||
        (item.category && item.category.toLowerCase().includes(keyword))
    );
}

export function sortByPrice(list, dir = 'asc') {
    const sortedList = [...list];
    return sortedList.sort((a, b) => {
        if (dir === 'desc') {
            return b.price - a.price;
        }
        return a.price - b.price;
    });
}
