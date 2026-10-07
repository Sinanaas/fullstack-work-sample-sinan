import { create } from 'zustand'
import { generateProducts } from './data'

export const initialProducts = generateProducts()

export const useProductStore = create((set) => ({
  ids: initialProducts.map((p) => p.id),
  byId: Object.fromEntries(initialProducts.map((p) => [p.id, p])),

  changeStock: (id, delta) =>
    set((state) => {
      const product = state.byId[id]
      const stock = Math.max(0, product.stock + delta)
      if (stock === product.stock) return state
      return { byId: { ...state.byId, [id]: { ...product, stock } } }
    }),
}))
