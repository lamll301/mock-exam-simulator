import { useMemo } from 'react'
import * as d3 from 'd3'
import { randomSeries } from './random'
import { useWidth } from './useWidth'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const PAD = { top: 10, bottom: 24, side: 20 }

interface MonthlyBarsProps {
  seed?: number
  height?: number
}

export default function MonthlyBars({ seed = 1, height = 180 }: MonthlyBarsProps) {
  const [ref, width] = useWidth<HTMLDivElement>()

  const bars = useMemo(() => {
    const data = randomSeries(seed, MONTHS.length, 25, 100)
    const x = d3.scaleBand<number>().domain(d3.range(MONTHS.length)).range([PAD.side, Math.max(width - PAD.side, PAD.side)]).padding(0.35)
    const y = d3.scaleLinear().domain([0, 100]).range([0, height - PAD.top - PAD.bottom])
    return data.map((v, i) => ({ x: x(i)!, w: x.bandwidth(), h: y(v) }))
  }, [seed, height, width])

  const base = height - PAD.bottom

  return (
    <div ref={ref} style={{ height }}>
      {width > 0 && (
        <svg width={width} height={height} className="d-block">
          {bars.map((b, i) => (
            <g key={i}>
              <rect x={b.x} y={base - b.h} width={b.w} height={b.h} fill="#26A69A" />
              <text x={b.x + b.w / 2} y={height - 6} textAnchor="middle" fontSize={11} fill="#999">
                {MONTHS[i]}
              </text>
            </g>
          ))}
        </svg>
      )}
    </div>
  )
}