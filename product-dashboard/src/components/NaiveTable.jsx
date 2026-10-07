import { useState } from 'react'
import { initialProducts } from '../store'
import { formatPrice, stockStatus } from '../data'
import { countRowRender, measure } from '../renderStats'
import TableHeader from './TableHeader'

function NaiveRow({ product, onChange }) {
  countRowRender()
  const status = stockStatus(product.stock)

  return (
    <div className="row">
      <span className="col-name">{product.name}</span>
      <span className="col-category">{product.category}</span>
      <span className="col-price">{formatPrice(product.price)}</span>
      <span className="col-stock">{product.stock}</span>
      <span className="col-status">
        <span className={status.className}>{status.label}</span>
      </span>
      <span className="col-actions">
        <button onClick={() => onChange(product.id, -1)}>−</button>
        <button onClick={() => onChange(product.id, 1)}>+</button>
      </span>
    </div>
  )
}

export default function NaiveTable({ query }) {
  const [products, setProducts] = useState(initialProducts)

  const changeStock = (id, delta) =>
    measure(() =>
      setProducts((current) =>
        current.map((p) => (p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p)),
      ),
    )

  const keyword = query.trim().toLowerCase()
  const visible = products.filter((p) => p.name.toLowerCase().includes(keyword))

  return (
    <div className="table">
      <TableHeader />
      <div className="naive-list">
        {visible.map((product) => (
          <NaiveRow key={product.id} product={product} onChange={changeStock} />
        ))}
      </div>
      <p className="table-footer">{visible.length.toLocaleString('id-ID')} produk</p>
    </div>
  )
}
