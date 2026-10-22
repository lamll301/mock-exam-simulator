import { useState } from 'react'
import { BadgeMark } from '../Badge'
import Card from '../Card'
import Icon from '../Icon'
import LiveSwitch from './LiveSwitch'
import MiniLine from '../charts/MiniLine'
import TrafficStream from '../charts/TrafficStream'

const sources = [
  { icon: 'plus3', title: 'Khách truy cập mới', value: '2,349 avg', button: 'border-teal text-teal', line: '#009688', seed: 4 },
  { icon: 'watch2', title: 'Phiên truy cập mới', value: '08:20 avg', button: 'border-warning-400 text-warning-400', line: '#FF7043', seed: 9 },
  { icon: 'people', title: 'Tổng người online', value: '5,378 avg', button: 'border-indigo-400 text-indigo-400', line: '#5C6BC0', seed: 15, online: true },
]

export default function TrafficSources() {
  const [live, setLive] = useState(true)

  return (
    <Card title="Nguồn truy cập" className="flex-fill" bodyClassName="" actions={<LiveSwitch checked={live} onChange={setLive} />}>
      <div className="card-body py-0">
        <div className="row">
          {sources.map((s) => (
            <div key={s.title} className="col-sm-4">
              <div className="d-flex align-items-center justify-content-center mb-2">
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className={`btn bg-transparent ${s.button} rounded-round border-2 btn-icon mr-3`}
                >
                  <Icon name={s.icon} />
                </a>
                <div>
                  <div className="font-weight-semibold">{s.title}</div>
                  <span className="text-muted">
                    {s.online && <BadgeMark color="success" className="mr-2" />} {s.value}
                  </span>
                </div>
              </div>
              <div className="w-75 mx-auto mb-3">
                <MiniLine color={s.line} seed={s.seed} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <TrafficStream live={live} />
    </Card>
  )
}