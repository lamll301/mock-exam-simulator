import { BadgeMark } from '../Badge'
import Card from '../Card'
import Icon from '../Icon'
import ChartPlaceholder from './ChartPlaceholder'

// Class màu viết đầy đủ để Tailwind nhận diện
const items = [
  { icon: 'plus3', title: 'New visitors', value: '2,349 avg', color: 'border-lt-teal-400 text-lt-teal-400' },
  { icon: 'watch2', title: 'New sessions', value: '08:20 avg', color: 'border-lt-warning-400 text-lt-warning-400' },
  { icon: 'people', title: 'Total online', value: '5,378 avg', color: 'border-lt-indigo-400 text-lt-indigo-400', online: true },
]

export default function TrafficSources() {
  return (
    <Card title="Traffic sources" bodyClassName="">
      <div className="grid gap-4 px-5 pt-5 sm:grid-cols-3">
        {items.map((it) => (
          <div key={it.title}>
            <div className="mb-2 flex items-center justify-center gap-3">
              <span className={`flex size-9 items-center justify-center rounded-full border-2 ${it.color}`}>
                <Icon name={it.icon} />
              </span>
              <div>
                <div className="font-medium">{it.title}</div>
                <span className="text-lt-muted">
                  {it.online && <BadgeMark color="success" className="mr-2" />}
                  {it.value}
                </span>
              </div>
            </div>
            <ChartPlaceholder height={40} className="mx-auto mb-3 w-3/4" />
          </div>
        ))}
      </div>
      <ChartPlaceholder label="Traffic sources chart" height={220} className="border-x-0 border-b-0" />
    </Card>
  )
}
