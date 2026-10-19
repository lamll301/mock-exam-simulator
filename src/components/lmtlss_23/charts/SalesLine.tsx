import { useMemo } from 'react'
import * as d3 from 'd3'
import { randomSeries } from './random'
import { useWidth } from './useWidth'

interface SalesLineProps {
  labels: string[]
  seed?: number
  height?: number
}

const m = { top: 12, right: 20, bottom: 24, left: 38 }
const COLOR = '#FF7043'

export default function SalesLine({ labels, seed = 1, height = 200 }: SalesLineProps) {
  const [ref, width] = useWidth<HTMLDivElement>()
  const n = labels.length

  const { points, path, yTicks, y, x } = useMemo(() => {
    const data = randomSeries(seed, n, 30, 95)
    const x = d3.scalePoint<number>().domain(d3.range(n)).range([m.left, Math.max(width - m.right, m.left)]).padding(0.3)
    const y = d3.scaleLinear().domain([0, 100]).range([height - m.bottom, m.top])
    const line = d3.line<number>().x((_, i) => x(i)!).y((v) => y(v)).curve(d3.curveMonotoneX)
    return {
      points: data.map((v, i) => ({ cx: x(i)!, cy: y(v) })),
      path: line(data) ?? '',
      yTicks: y.ticks(4),
      y,
      x,
    }
  }, [seed, n, height, width])

  return (
    <div ref={ref} style={{ height }}>
      {width > 0 && (
        <svg width={width} height={height} className="d-block">
          {yTicks.map((t) => (
            <g key={t}>
              <line x1={m.left} x2={width - m.right} y1={y(t)} y2={y(t)} stroke="#ddd" strokeDasharray="3,3" />
              <text x={m.left - 8} y={y(t)} dy="0.32em" textAnchor="end" fontSize={11} fill="#999">
                {t}
              </text>
            </g>
          ))}
          {labels.map((l, i) => (
            <text key={l} x={x(i)} y={height - 6} textAnchor="middle" fontSize={11} fill="#999">
              {l}
            </text>
          ))}
          <path d={path} fill="none" stroke={COLOR} strokeWidth={2} />
          {points.map((p, i) => (
            <circle key={i} cx={p.cx} cy={p.cy} r={4} fill="#fff" stroke={COLOR} strokeWidth={2} />
          ))}
        </svg>
      )}
    </div>
  )
}