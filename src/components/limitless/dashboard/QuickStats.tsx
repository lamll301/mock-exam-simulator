import { Badge } from '../Badge'
import ChartPlaceholder from './ChartPlaceholder'

const boxes = [
  { value: '3,450', label: 'Members online', sub: '489 avg', badge: '+53,6%', bg: 'bg-lt-teal-400' },
  { value: '49.4%', label: 'Current server load', sub: '34.6% avg', bg: 'bg-lt-pink-400' },
  { value: '$18,390', label: "Today's revenue", sub: '$37,578 avg', bg: 'bg-lt-blue-400' },
]

export default function QuickStats() {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {boxes.map((b) => (
        <div key={b.label} className={`mb-5 rounded text-white ${b.bg}`}>
          <div className="p-5">
            <div className="flex items-center">
              <h3 className="text-2xl font-medium">{b.value}</h3>
              {b.badge && (
                <Badge color="teal-800" pill className="ml-auto">
                  {b.badge}
                </Badge>
              )}
            </div>
            <div>{b.label}</div>
            <div className="text-xs opacity-75">{b.sub}</div>
          </div>
          <ChartPlaceholder height={50} className="border-white/30 text-white/70" label="" />
        </div>
      ))}
    </div>
  )
}
