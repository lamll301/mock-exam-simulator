import { useMemo } from 'react'
import * as d3 from 'd3'
import { randomSeries } from './random'
import { useWidth } from './useWidth'

interface MiniLineProps {
  color: string
  seed?: number
  count?: number
  height?: number
}

export default function MiniLine({ color, seed = 1, count = 40, height = 40 }: MiniLineProps) {
  const [ref, width] = useWidth<HTMLDivElement>()

  const path = useMemo(() => {
    const data = randomSeries(seed, count, 10, 90)
    const x = d3.scaleLinear().domain([0, count - 1]).range([2, Math.max(width - 2, 2)])
    const y = d3.scaleLinear().domain([0, 100]).range([height - 3, 3])
    return d3.line<number>().x((_, i) => x(i)).y((v) => y(v)).curve(d3.curveBasis)(data) ?? ''
  }, [seed, count, height, width])

  return (
    <div ref={ref} style={{ height }}>
      {width > 0 && (
        <svg width={width} height={height} className="d-block">
          <path d={path} fill="none" stroke={color} strokeWidth={1.5} />
        </svg>
      )}
    </div>
  )
}