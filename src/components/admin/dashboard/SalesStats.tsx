import Card from '../Card'
import ChartPlaceholder from './ChartPlaceholder'

const stats = [
  { value: '5,689', label: 'new orders' },
  { value: '32,568', label: 'this month' },
  { value: '$23,464', label: 'expected profit' },
]

const weeks = ['June, 29 - July, 5', 'June, 22 - June 28', 'June, 15 - June, 21', 'June, 8 - June, 14']

export default function SalesStats() {
  return (
    <Card
      title="Sales statistics"
      bodyClassName=""
      actions={
        <select defaultValue={weeks[2]} className="rounded border border-lt-border bg-white px-2 py-1.5">
          {weeks.map((w) => (
            <option key={w}>{w}</option>
          ))}
        </select>
      }
    >
      <div className="grid grid-cols-3 px-5 pt-5 text-center">
        {stats.map((s) => (
          <div key={s.label} className="mb-3">
            <h5 className="text-base font-medium">{s.value}</h5>
            <span className="text-xs text-lt-muted">{s.label}</span>
          </div>
        ))}
      </div>
      <ChartPlaceholder label="Sales chart" height={110} className="mb-2 border-x-0" />
      <ChartPlaceholder label="Monthly sales chart" height={110} className="border-x-0 border-b-0" />
    </Card>
  )
}
