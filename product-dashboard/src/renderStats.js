import { create } from 'zustand'

let rowRenders = 0

export const countRowRender = () => {
  rowRenders += 1
}

export const useRenderStats = create(() => ({ lastRowRenders: null }))

export function measure(update) {
  rowRenders = 0
  update()
  setTimeout(() => useRenderStats.setState({ lastRowRenders: rowRenders }), 100)
}
