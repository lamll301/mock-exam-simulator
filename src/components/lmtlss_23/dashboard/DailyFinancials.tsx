import { useState, type ReactNode } from 'react'
import Card from '../Card'
import Icon from '../Icon'
import FinancialBars from '../charts/FinancialBars'
import LiveSwitch from './LiveSwitch'

interface Activity {
  icon: string
  /** Class viền + màu chữ của nút tròn, ví dụ "border-pink text-pink" */
  color: string
  content: ReactNode
  time: string
}

const link = (text: string) => (
  <a href="#" onClick={(e) => e.preventDefault()}>
    {text}
  </a>
)

const activities: Activity[] = [
  {
    icon: 'statistics',
    color: 'border-pink text-pink',
    content: (
      <>
        Stats for July, 6: <span className="font-weight-semibold">1938</span> orders,{' '}
        <span className="font-weight-semibold text-danger">$4220</span> revenue
      </>
    ),
    time: '2 hours ago',
  },
  {
    icon: 'checkmark3',
    color: 'border-success text-success',
    content: (
      <>
        Invoices {link('#4732')} and {link('#4734')} have been paid
      </>
    ),
    time: 'Dec 18, 18:36',
  },
  {
    icon: 'alignment-unalign',
    color: 'border-primary text-primary',
    content: 'Affiliate commission for June has been paid',
    time: '36 minutes ago',
  },
  {
    icon: 'spinner11',
    color: 'border-warning-400 text-warning-400',
    content: <>Order {link('#37745')} from July, 1st has been refunded</>,
    time: '4 minutes ago',
  },
  {
    icon: 'redo2',
    color: 'border-teal text-teal',
    content: (
      <>
        Invoice {link('#4769')} has been sent to {link('Robert Smith')}
      </>
    ),
    time: 'Dec 12, 05:46',
  },
]

export default function DailyFinancials() {
  const [realtime, setRealtime] = useState(true)

  return (
    <Card
      title="Daily financials"
      actions={
        <>
          <LiveSwitch checked={realtime} onChange={setRealtime} label="Realtime" />
          <span className="badge bg-danger-400 badge-pill ml-2">+86</span>
        </>
      }
    >
      <div className="mb-3">
        <FinancialBars seed={12} live={realtime} />
      </div>

      <ul className="media-list">
        {activities.map((a, i) => (
          <li key={i} className="media">
            <div className="mr-3">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className={`btn bg-transparent ${a.color} rounded-round border-2 btn-icon`}
              >
                <Icon name={a.icon} />
              </a>
            </div>

            <div className="media-body">
              {a.content}
              <div className="text-muted">{a.time}</div>
            </div>

            <div className="ml-3 align-self-center">
              <a href="#" className="list-icons-item" onClick={(e) => e.preventDefault()}>
                <Icon name="more" />
              </a>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}
