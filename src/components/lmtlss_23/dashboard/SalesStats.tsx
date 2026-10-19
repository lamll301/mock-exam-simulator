import { useState } from 'react'
import Card from '../Card'
import MonthlyBars from '../charts/MonthlyBars'
import SalesLine from '../charts/SalesLine'

const stats = [
  { value: '5,689', label: 'new orders' },
  { value: '32,568', label: 'this month' },
  { value: '$23,464', label: 'expected profit' },
]

const weeks = ['June, 29 - July, 5', 'June, 22 - June 28', 'June, 15 - June, 21', 'June, 8 - June, 14']
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function DateSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="position-relative">
      <select
        className="form-control"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ appearance: 'none', WebkitAppearance: 'none', paddingRight: 36, cursor: 'pointer' }}
      >
        {weeks.map((w) => (
          <option key={w} value={w}>
            {w}
          </option>
        ))}
      </select>
      <svg
        width="10"
        height="14"
        viewBox="0 0 10 14"
        aria-hidden="true"
        style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
      >
        <path d="M5 1 9 5.5H1zM5 13 1 8.5h8z" fill="#333" />
      </svg>
    </div>
  )
}

export default function SalesStats() {
  const [week, setWeek] = useState(weeks[2])
  const seed = weeks.indexOf(week) + 1

  return (
    <Card title="Sales statistics" className="flex-fill" bodyClassName="" actions={<DateSelect value={week} onChange={setWeek} />}>
      <div className="card-body py-0">
        <div className="row text-center">
          {stats.map((s) => (
            <div key={s.label} className="col-4">
              <div className="mb-3">
                <h5 className="font-weight-semibold mb-0">{s.value}</h5>
                <span className="text-muted font-size-sm">{s.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-2">
        <SalesLine labels={days} seed={seed} />
      </div>
      <MonthlyBars seed={seed + 10} />
    </Card>
  )
}