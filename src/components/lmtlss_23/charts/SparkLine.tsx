import { useMemo } from 'react'
import * as d3 from 'd3'
import { randomSeries } from './random'
import { useWidth } from './useWidth'

interface SparkLineProps {
  seed?: number
  count?: number
  height?: number
  /** Màu nền card, dùng để tô ruột chấm tròn */
  background: string
}

export default function SparkLine({ seed = 1, count = 30, height = 50, background }: SparkLineProps) {
  const [ref, width] = useWidth<HTMLDivElement>()

  const { path, points } = useMemo(() => {
    const data = randomSeries(seed, count, 10, 90)
    const pad = 6
    const x = d3.scaleLinear().domain([0, count - 1]).range([pad, Math.max(width - pad, pad)])
    const y = d3.scaleLinear().domain([0, 100]).range([height - pad, pad])
    const line = d3.line<number>().x((_, i) => x(i)).y((d) => y(d)).curve(d3.curveBasis)
    return { path: line(data) ?? '', points: data.map((d, i) => ({ cx: x(i), cy: y(d) })) }
  }, [seed, count, height, width])

  return (
    <div ref={ref} style={{ height }}>
      {width > 0 && (
        <svg width={width} height={height}>
          <path d={path} fill="none" stroke="#fff" strokeWidth={1.5} />
          {points.map((p, i) => (
            <circle key={i} cx={p.cx} cy={p.cy} r={2.5} fill={background} stroke="#fff" strokeWidth={1.5} />
          ))}
        </svg>
      )}
    </div>
  )
}