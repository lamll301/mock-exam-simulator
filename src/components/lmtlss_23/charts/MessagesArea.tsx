import { useMemo } from 'react'
import * as d3 from 'd3'
import { randomSeries } from './random'
import { useWidth } from './useWidth'

interface MessagesAreaProps {
  seed?: number
  count?: number
  height?: number
  /** Nên trùng màu thanh tab bên dưới (bg-indigo-400 = #5C6BC0) để vùng area liền với tab */
  color?: string
}

/** Area chart của "My messages" (#messages-stats): tô đặc cùng màu với thanh tab bên dưới */
export default function MessagesArea({ seed = 1, count = 30, height = 40, color = '#5C6BC0' }: MessagesAreaProps) {
  const [ref, width] = useWidth<HTMLDivElement>()

  const path = useMemo(() => {
    const data = randomSeries(seed, count, 20, 90)
    const x = d3.scaleLinear().domain([0, count - 1]).range([0, width])
    const y = d3.scaleLinear().domain([0, 100]).range([height, 0])
    return d3.area<number>().x((_, i) => x(i)).y0(height).y1((v) => y(v)).curve(d3.curveBasis)(data) ?? ''
  }, [seed, count, height, width])

  return (
    <div ref={ref} style={{ height }}>
      {width > 0 && (
        <svg width={width} height={height} className="d-block">
          <path d={path} fill={color} />
        </svg>
      )}
    </div>
  )
}
