import { useMemo, useState } from 'react'
import * as d3 from 'd3'

export interface DonutSlice {
  name: string
  value: number
  color: string
  /** Số hiển thị ở dòng "Visits" của tooltip */
  visits?: number
}

interface DonutChartProps {
  data: DonutSlice[]
  size?: number
  /** Góc bắt đầu (rad). Template bắt đầu từ đáy vòng tròn (π) */
  startAngle?: number
}

/**
 * Donut nhỏ của "Marketing campaigns": bán kính trong = 1/2 bán kính ngoài,
 * viền trắng giữa các lát, hover hiện tooltip đen bên phải (thay cho d3_tooltip.js).
 */
export default function DonutChart({ data, size = 42, startAngle = Math.PI }: DonutChartProps) {
  const [hover, setHover] = useState<number | null>(null)
  const radius = size / 2

  const slices = useMemo(() => {
    const total = d3.sum(data, (d) => d.value)
    const pie = d3
      .pie<DonutSlice>()
      .sort(null)
      .value((d) => d.value)
      .startAngle(startAngle)
      .endAngle(startAngle + Math.PI * 2)
    const arc = d3.arc<d3.PieArcDatum<DonutSlice>>().innerRadius(radius / 2).outerRadius(radius)
    return pie(data).map((a) => ({
      d: arc(a) ?? '',
      color: a.data.color,
      share: total ? (a.data.value / total) * 100 : 0,
      item: a.data,
    }))
  }, [data, radius, startAngle])

  const active = hover === null ? null : slices[hover]

  return (
    <div className="position-relative d-inline-block" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="d-block">
        <g transform={`translate(${radius},${radius})`}>
          {slices.map((s, i) => (
            <path
              key={s.item.name}
              d={s.d}
              fill={s.color}
              stroke="#fff"
              strokeWidth={1}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            />
          ))}
        </g>
      </svg>

      {active && (
        <div
          role="tooltip"
          style={{
            position: 'absolute',
            left: size + 10,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1050,
            background: '#000',
            color: '#fff',
            padding: '10px 14px',
            borderRadius: 3,
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            minWidth: 150,
            lineHeight: 1.6,
          }}
        >
          <span
            style={{
              position: 'absolute',
              left: -5,
              top: '50%',
              marginTop: -5,
              borderTop: '5px solid transparent',
              borderBottom: '5px solid transparent',
              borderRight: '5px solid #000',
            }}
          />
          <div className="d-flex align-items-center mb-1">
            <span
              style={{ width: 10, height: 10, borderRadius: 2, background: active.color, marginRight: 8, flexShrink: 0 }}
            />
            {active.item.name}
          </div>
          {active.item.visits !== undefined && (
            <div className="d-flex justify-content-between">
              <span>Visits:</span>
              <span className="font-weight-semibold ml-4">{active.item.visits}</span>
            </div>
          )}
          <div className="d-flex justify-content-between">
            <span>Share:</span>
            <span className="font-weight-semibold ml-4">{active.share.toFixed(2)}%</span>
          </div>
        </div>
      )}
    </div>
  )
}
