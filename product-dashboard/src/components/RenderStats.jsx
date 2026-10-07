import { useRenderStats } from '../renderStats'

export default function RenderStats() {
  const lastRowRenders = useRenderStats((state) => state.lastRowRenders)

  return (
    <div className="stats">
      <span className="stats-label">Baris yang di-render pada update terakhir</span>
      <strong className="stats-value">
        {lastRowRenders === null ? '–' : lastRowRenders.toLocaleString('id-ID')}
      </strong>
    </div>
  )
}
