const CATEGORIES = ['Elektronik', 'Fashion', 'Makanan', 'Minuman', 'Rumah Tangga', 'Olahraga']

export const PRODUCT_COUNT = 5000

export function generateProducts(count = PRODUCT_COUNT) {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Produk ${String(i + 1).padStart(4, '0')}`,
    category: CATEGORIES[i % CATEGORIES.length],
    price: 10000 + ((i * 7919) % 990) * 1000,
    stock: (i * 31) % 120,
  }))
}

export function stockStatus(stock) {
  if (stock === 0) return { label: 'Habis', className: 'badge badge-out' }
  if (stock < 10) return { label: 'Menipis', className: 'badge badge-low' }
  return { label: 'Tersedia', className: 'badge badge-ok' }
}

export const formatPrice = (price) => `Rp ${price.toLocaleString('id-ID')}`
