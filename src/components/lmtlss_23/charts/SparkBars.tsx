import { useMemo } from 'react'
import * as d3 from 'd3'
import { randomSeries } from './random'
import { useWidth } from './useWidth'

interface SparkBarsProps {
  seed?: number
  count?: number
  height?: number
}

export default function SparkBars({ seed = 1, count = 24, height = 50 }: SparkBarsProps) {
  const [ref, width] = useWidth<HTMLDivElement>()

  const bars = useMemo(() => {
    const data = randomSeries(seed, count, 15, 100)
    const x = d3.scaleBand<number>().domain(d3.range(count)).range([0, width]).paddingInner(0.3).paddingOuter(0.15)
    const y = d3.scaleLinear().domain([0, 100]).range([0, height])
    return data.map((d, i) => ({ x: x(i) ?? 0, w: x.bandwidth(), h: y(d) }))
  }, [seed, count, height, width])

  return (
    <div ref={ref} style={{ height }}>
      {width > 0 && (
        <svg width={width} height={height} className="d-block">
          {bars.map((b, i) => (
            <rect key={i} x={b.x} y={height - b.h} width={b.w} height={b.h} fill="#fff" fillOpacity={0.75} />
          ))}
        </svg>
      )}
    </div>
  )
}