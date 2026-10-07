import { useDeferredValue, useState } from 'react'
import ProductTable from './components/ProductTable'
import NaiveTable from './components/NaiveTable'
import RenderStats from './components/RenderStats'
import { PRODUCT_COUNT } from './data'

export default function App() {
  const [mode, setMode] = useState('optimized')
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  return (
    <main className="page">
      <header className="page-header">
        <h1>Dashboard Produk</h1>
        <p>
          {PRODUCT_COUNT.toLocaleString('id-ID')} produk. Klik tombol − / + pada satu baris, lalu
          bandingkan jumlah baris yang di-render pada kedua mode.
        </p>
      </header>

      <section className="toolbar">
        <div className="mode-switch" role="group" aria-label="Mode tabel">
          <button
            className={mode === 'optimized' ? 'active' : ''}
            onClick={() => setMode('optimized')}
          >
            Optimized
          </button>
          <button className={mode === 'naive' ? 'active' : ''} onClick={() => setMode('naive')}>
            Naive (sebelum optimasi)
          </button>
        </div>

        <input
          type="search"
          placeholder="Cari nama produk…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Cari nama produk"
        />

        <RenderStats />
      </section>

      {mode === 'optimized' ? (
        <ProductTable query={deferredQuery} />
      ) : (
        <NaiveTable query={deferredQuery} />
      )}
    </main>
  )
}
