import { useMemo } from 'react'
import * as d3 from 'd3'

interface ProgressBarsProps {
  color: string
  /** Seed để mỗi card có dữ liệu khác nhau nhưng cố định giữa các lần render */
  seed?: number
  count?: number
  height?: number
}

// PRNG nhỏ, ổn định (template gốc dùng Math.random nên mỗi lần load một khác)
function mulberry32(a: number) {
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export default function ProgressBars({ color, seed = 1, count = 30, height = 50 }: ProgressBarsProps) {
  const width = 400

  const bars = useMemo(() => {
    const rand = mulberry32(seed)
    const data = Array.from({ length: count }, () => 15 + Math.round(rand() * 85))
    const x = d3.scaleBand<number>().domain(d3.range(count)).range([0, width]).paddingInner(0.3)
    const y = d3.scaleLinear().domain([0, 100]).range([0, height])
    return data.map((v, i) => ({ x: x(i)!, w: x.bandwidth(), h: y(v) }))
  }, [seed, count, height])

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      width="100%"
      height={height}
      className="d-block mt-3"
    >
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y={height - b.h} width={b.w} height={b.h} fill={color} />
      ))}
    </svg>
  )
}