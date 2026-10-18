import Card from '../Card'

// Giá trị demo; template tính bằng JS (d3) nên không có sẵn trong HTML.
const items = [
  { title: 'Available hours', percent: 64, bar: 'bg-lt-teal-400' },
  { title: 'Productivity goal', percent: 87, bar: 'bg-lt-pink-400' },
]

export default function ProgressCards() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {items.map((it) => (
        <Card key={it.title} className="text-center">
          <div className="text-3xl font-medium">{it.percent}%</div>
          <div className="mb-3 text-lt-muted">{it.title}</div>
          <div className="h-1.5 overflow-hidden rounded-full bg-black/10">
            <div className={`h-full ${it.bar}`} style={{ width: `${it.percent}%` }} />
          </div>
        </Card>
      ))}
    </div>
  )
}
