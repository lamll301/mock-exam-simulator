import * as d3 from 'd3'
import Icon from '../Icon'

interface ProgressCircleProps {
  /** 0 - 1 */
  value: number
  color: string
  icon: string
  size?: number
  thickness?: number
}

export default function ProgressCircle({ value, color, icon, size = 96, thickness = 3 }: ProgressCircleProps) {
  const outer = size / 2 - 1
  const inner = outer - thickness
  const make = d3.arc<unknown>().innerRadius(inner).outerRadius(outer).startAngle(0)

  const trail = make.endAngle(Math.PI * 2)(null)!
  const bar = make.endAngle(Math.PI * 2 * value)(null)!

  return (
    <div className="position-relative d-inline-block" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <g transform={`translate(${size / 2},${size / 2})`}>
          <path d={trail} fill="#eee" />
          <path d={bar} fill={color} />
        </g>
      </svg>
      <div
    className="position-absolute d-flex align-items-center justify-content-center"
    style={{ inset: 0, color }}
    >
    <Icon name={icon} className="icon-2x" />
    </div>
    </div>
  )
}