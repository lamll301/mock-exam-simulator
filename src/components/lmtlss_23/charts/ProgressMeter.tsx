import * as d3 from 'd3'

interface ProgressMeterProps {
  /** 0 - 100 */
  value: number
  color: string
  size?: number
}

/** Vòng tiến độ nhỏ (.progress-meter) ở cuối dòng nhóm Today / Yesterday: vành + nan quạt bên trong */
export default function ProgressMeter({ value, color, size = 20 }: ProgressMeterProps) {
  const r = size / 2
  const angle = (Math.PI * 2 * value) / 100
  const ringTrail = d3.arc().innerRadius(r - 2.5).outerRadius(r - 0.5).startAngle(0).endAngle(Math.PI * 2)(null as never)!
  const ring = d3.arc().innerRadius(r - 2.5).outerRadius(r - 0.5).startAngle(0).endAngle(angle)(null as never)!
  const pie = d3.arc().innerRadius(0).outerRadius(r - 4).startAngle(0).endAngle(angle)(null as never)!

  return (
    <svg width={size} height={size} className="d-inline-block align-middle">
      <g transform={`translate(${r},${r})`}>
        <path d={ringTrail} fill={color} fillOpacity={0.25} />
        <path d={ring} fill={color} />
        <path d={pie} fill={color} />
      </g>
    </svg>
  )
}
