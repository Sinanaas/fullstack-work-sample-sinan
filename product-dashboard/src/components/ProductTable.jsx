import { useMemo } from 'react'
import { FixedSizeList as List } from 'react-window'
import { useProductStore, initialProducts } from '../store'
import ProductRow from './ProductRow'
import TableHeader from './TableHeader'

const ROW_HEIGHT = 44
const LIST_HEIGHT = 528

const nameById = Object.fromEntries(initialProducts.map((p) => [p.id, p.name.toLowerCase()]))

function Row({ index, style, data }) {
  return <ProductRow id={data[index]} style={style} />
}

const itemKey = (index, data) => data[index]

export default function ProductTable({ query }) {
  const ids = useProductStore((state) => state.ids)

  const visibleIds = useMemo(() => {
    const keyword = query.trim().toLowerCase()
    if (!keyword) return ids
    return ids.filter((id) => nameById[id].includes(keyword))
  }, [ids, query])

  return (
    <div className="table">
      <TableHeader />
      <List
        height={LIST_HEIGHT}
        width="100%"
        itemCount={visibleIds.length}
        itemSize={ROW_HEIGHT}
        itemData={visibleIds}
        itemKey={itemKey}
      >
        {Row}
      </List>
      <p className="table-footer">{visibleIds.length.toLocaleString('id-ID')} produk</p>
    </div>
  )
}
