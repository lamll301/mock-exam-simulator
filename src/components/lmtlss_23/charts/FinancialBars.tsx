import { useEffect, useMemo, useState } from 'react'
import * as d3 from 'd3'
import { randomSeries } from './random'
import { useWidth } from './useWidth'

interface FinancialBarsProps {
  seed?: number
  count?: number
  height?: number
  color?: string
  /** Bật thì cứ 2 giây đẩy thêm 1 cột mới (giống "Realtime" của template) */
  live?: boolean
}

const LIVE_INTERVAL_MS = 2000
const clamp = (v: number) => Math.max(10, Math.min(100, v))

/** Biểu đồ cột của "Daily financials" (#bullets) */
export default function FinancialBars({ seed = 1, count = 40, height = 80, color = '#29B6F6', live = false }: FinancialBarsProps) {
  const [ref, width] = useWidth<HTMLDivElement>()
  const [data, setData] = useState(() => randomSeries(seed, count, 15, 100))

  useEffect(() => {
    if (!live) return
    const id = setInterval(
      () => setData((prev) => [...prev.slice(1), clamp(prev[prev.length - 1] + (Math.random() - 0.5) * 40)]),
      LIVE_INTERVAL_MS,
    )
    return () => clearInterval(id)
  }, [live])

  const bars = useMemo(() => {
    const x = d3.scaleBand<number>().domain(d3.range(data.length)).range([0, width]).paddingInner(0.3)
    const y = d3.scaleLinear().domain([0, 100]).range([0, height])
    return data.map((v, i) => ({ x: x(i) ?? 0, w: x.bandwidth(), h: y(v) }))
  }, [data, height, width])

  return (
    <div ref={ref} style={{ height }}>
      {width > 0 && (
        <svg width={width} height={height} className="d-block">
          {bars.map((b, i) => (
            <rect key={i} x={b.x} y={height - b.h} width={b.w} height={b.h} fill={color} />
          ))}
        </svg>
      )}
    </div>
  )
}
