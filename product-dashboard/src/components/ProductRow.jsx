import { memo, useCallback } from 'react'
import { useProductStore } from '../store'
import { formatPrice, stockStatus } from '../data'
import { countRowRender, measure } from '../renderStats'

const ProductRow = memo(function ProductRow({ id, style }) {
  const product = useProductStore((state) => state.byId[id])
  const changeStock = useProductStore((state) => state.changeStock)

  const decrease = useCallback(() => measure(() => changeStock(id, -1)), [id, changeStock])
  const increase = useCallback(() => measure(() => changeStock(id, 1)), [id, changeStock])

  countRowRender()
  const status = stockStatus(product.stock)

  return (
    <div className="row" style={style}>
      <span className="col-name">{product.name}</span>
      <span className="col-category">{product.category}</span>
      <span className="col-price">{formatPrice(product.price)}</span>
      <span className="col-stock">{product.stock}</span>
      <span className="col-status">
        <span className={status.className}>{status.label}</span>
      </span>
      <span className="col-actions">
        <button onClick={decrease} aria-label={`Kurangi stok ${product.name}`}>−</button>
        <button onClick={increase} aria-label={`Tambah stok ${product.name}`}>+</button>
      </span>
    </div>
  )
})

export default ProductRow
