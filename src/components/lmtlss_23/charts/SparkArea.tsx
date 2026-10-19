import { useMemo } from 'react'
import * as d3 from 'd3'
import { randomSeries } from './random'
import { useWidth } from './useWidth'

interface SparkAreaProps {
  seed?: number
  count?: number
  height?: number
}

export default function SparkArea({ seed = 1, count = 30, height = 50 }: SparkAreaProps) {
  const [ref, width] = useWidth<HTMLDivElement>()

  const { area, line } = useMemo(() => {
    const data = randomSeries(seed, count, 25, 90)
    const x = d3.scaleLinear().domain([0, count - 1]).range([0, width])
    const y = d3.scaleLinear().domain([0, 100]).range([height, 0])
    return {
      area: d3.area<number>().x((_, i) => x(i)).y0(height).y1((d) => y(d)).curve(d3.curveBasis)(data) ?? '',
      line: d3.line<number>().x((_, i) => x(i)).y((d) => y(d)).curve(d3.curveBasis)(data) ?? '',
    }
  }, [seed, count, height, width])

  return (
    <div ref={ref} style={{ height }}>
      {width > 0 && (
        <svg width={width} height={height} className="d-block">
          <path d={area} fill="#fff" fillOpacity={0.25} />
          <path d={line} fill="none" stroke="#fff" strokeWidth={1.5} />
        </svg>
      )}
    </div>
  )
}