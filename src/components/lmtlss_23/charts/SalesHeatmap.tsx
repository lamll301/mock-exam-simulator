import { useMemo } from 'react'
import * as d3 from 'd3'
import { randomSeries } from './random'
import { useWidth } from './useWidth'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const HOURS = 24
const PAD = { left: 30, right: 4, top: 4, bottom: 20 }
const GAP = 2

interface SalesHeatmapProps {
  seed?: number
  height?: number
}

/**
 * Heatmap doanh số theo ngày (hàng) x giờ (cột), thay cho #sales-heatmap của template.
 * Dữ liệu ngẫu nhiên nhưng cố định theo seed. Rê chuột vào ô để xem giá trị (title gốc của trình duyệt).
 */
export default function SalesHeatmap({ seed = 1, height = 200 }: SalesHeatmapProps) {
  const [ref, width] = useWidth<HTMLDivElement>()

  const { cells, cellW, cellH, ticks } = useMemo(() => {
    const values = randomSeries(seed, DAYS.length * HOURS, 0, 100)
    const x = d3
      .scaleBand<number>()
      .domain(d3.range(HOURS))
      .range([PAD.left, Math.max(width - PAD.right, PAD.left)])
    const y = d3
      .scaleBand<number>()
      .domain(d3.range(DAYS.length))
      .range([PAD.top, height - PAD.bottom])
    const color = d3.scaleLinear<string>().domain([0, 100]).range(['#E8F5E9', '#2E7D32'])

    return {
      cellW: Math.max(x.bandwidth() - GAP, 1),
      cellH: Math.max(y.bandwidth() - GAP, 1),
      ticks: [0, 6, 12, 18].map((h) => ({ h, x: x(h)! + x.bandwidth() / 2 })),
      cells: values.map((v, i) => {
        const day = Math.floor(i / HOURS)
        const hour = i % HOURS
        return { x: x(hour)!, y: y(day)!, fill: color(v), title: `${DAYS[day]}, ${hour}:00 - ${Math.round(v)}` }
      }),
    }
  }, [seed, height, width])

  return (
    <div ref={ref} style={{ height }}>
      {width > 0 && (
        <svg width={width} height={height} className="d-block">
          {DAYS.map((d, i) => (
            <text
              key={d}
              x={PAD.left - 6}
              y={PAD.top + (i + 0.5) * ((height - PAD.top - PAD.bottom) / DAYS.length)}
              dy="0.32em"
              textAnchor="end"
              fontSize={11}
              fill="#999"
            >
              {d}
            </text>
          ))}

          {ticks.map((t) => (
            <text key={t.h} x={t.x} y={height - 6} textAnchor="middle" fontSize={11} fill="#999">
              {t.h}h
            </text>
          ))}

          {cells.map((c, i) => (
            <rect key={i} x={c.x} y={c.y} width={cellW} height={cellH} rx={2} fill={c.fill}>
              <title>{c.title}</title>
            </rect>
          ))}
        </svg>
      )}
    </div>
  )
}
