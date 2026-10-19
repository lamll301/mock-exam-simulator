import Card from '../Card'
import ProgressBars from '../charts/ProgressBars'
import ProgressCircle from '../charts/ProgressCircle'

const items = [
  { title: 'Hours available', percent: 68, average: 64, icon: 'watch2', color: '#EC407A', seed: 7 },
  { title: 'Productivity goal', percent: 82, average: 87, icon: 'trophy3', color: '#5C6BC0', seed: 21 },
]

export default function ProgressCards() {
  return (
    <div className="row">
      {items.map((it) => (
        <div key={it.title} className="col-sm-6">
          <Card className="text-center">
            <ProgressCircle value={it.percent / 100} color={it.color} icon={it.icon} />
            <h2 className="mb-0 mt-3">{it.percent}%</h2>
            <div>{it.title}</div>
            <div className="font-size-sm text-muted">{it.average}% average</div>
            <ProgressBars color={it.color} seed={it.seed} />
          </Card>
        </div>
      ))}
    </div>
  )
}