import { useEffect, useMemo, useState } from 'react'
import * as d3 from 'd3'
import { mulberry32 } from './random'
import { useSize } from './useWidth'

const COLORS = ['#29B6F6', '#66BB6A', '#FF7043', '#5C6BC0', '#26A69A']
const LAYERS = COLORS.length
const POINTS = 40
const MIN_HEIGHT = 300
const PAD = 10
const LIVE_INTERVAL_MS = 2000

const clamp = (v: number) => Math.max(8, Math.min(70, v))
const drift = (v: number) => clamp(v + (Math.random() - 0.5) * 14)

function initialRows(): number[][] {
  const rand = mulberry32(42)
  let cur = Array.from({ length: LAYERS }, () => 20 + rand() * 30)
  return Array.from({ length: POINTS }, () => {
    cur = cur.map((v) => clamp(v + (rand() - 0.5) * 14))
    return cur
  })
}

const stack = d3
  .stack<number[], number>()
  .keys(d3.range(LAYERS))
  .value((row, k) => row[k])
  .offset(d3.stackOffsetWiggle)
  .order(d3.stackOrderInsideOut)

interface TrafficStreamProps {
  /** Bật thì cứ 2 giây đẩy thêm 1 điểm dữ liệu mới (giống "Live update" của template) */
  live?: boolean
}

export default function TrafficStream({ live = false }: TrafficStreamProps) {
  const [ref, { width, height }] = useSize<HTMLDivElement>()
  const [rows, setRows] = useState(initialRows)
  const [hover, setHover] = useState<number | null>(null)

  useEffect(() => {
    if (!live) return
    const id = setInterval(() => setRows((prev) => [...prev.slice(1), prev[prev.length - 1].map(drift)]), LIVE_INTERVAL_MS)
    return () => clearInterval(id)
  }, [live])

  const paths = useMemo(() => {
    if (!width || !height) return []
    const series = stack(rows)
    const x = d3.scaleLinear().domain([0, rows.length - 1]).range([0, width])
    const y = d3
      .scaleLinear()
      .domain([d3.min(series, (s) => d3.min(s, (p) => p[0]))!, d3.max(series, (s) => d3.max(s, (p) => p[1]))!])
      .range([height - PAD, PAD])
    const area = d3
      .area<d3.SeriesPoint<number[]>>()
      .x((_, i) => x(i))
      .y0((p) => y(p[0]))
      .y1((p) => y(p[1]))
      .curve(d3.curveBasis)

    return series.map((s) => ({ key: s.key, d: area(s) ?? '' }))
  }, [rows, width, height])

  return (
    // flex: 1 để lấp phần còn trống của card; svg absolute để không tự làm phình container
    <div ref={ref} className="position-relative" style={{ flex: '1 1 auto', minHeight: MIN_HEIGHT }}>
      {width > 0 && (
        <svg width={width} height={height} className="position-absolute" style={{ top: 0, left: 0 }}>
          {paths.map(({ key, d }) => (
            <path
              key={key}
              d={d}
              fill={COLORS[key]}
              fillOpacity={hover === null || hover === key ? 0.9 : 0.35}
              style={{ transition: 'fill-opacity .2s', cursor: 'pointer' }}
              onMouseEnter={() => setHover(key)}
              onMouseLeave={() => setHover(null)}
            />
          ))}
        </svg>
      )}
    </div>
  )
}