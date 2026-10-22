import { useState, type ReactNode } from 'react'
import Card from '../Card'
import Icon from '../Icon'
import FinancialBars from '../charts/FinancialBars'
import LiveSwitch from './LiveSwitch'

interface Activity {
  icon: string
  /** Class viền và màu chữ của nút tròn, ví dụ "border-pink text-pink" */
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
        Thống kê ngày 6/7: <span className="font-weight-semibold">1938</span> đơn hàng,{' '}
        doanh thu <span className="font-weight-semibold text-danger">$4220</span>
      </>
    ),
    time: '2 giờ trước',
  },
  {
    icon: 'checkmark3',
    color: 'border-success text-success',
    content: (
      <>
        Hóa đơn {link('#4732')} và {link('#4734')} đã được thanh toán
      </>
    ),
    time: '18/12, 18:36',
  },
  {
    icon: 'alignment-unalign',
    color: 'border-primary text-primary',
    content: 'Hoa hồng tiếp thị liên kết tháng 6 đã được thanh toán',
    time: '36 phút trước',
  },
  {
    icon: 'spinner11',
    color: 'border-warning-400 text-warning-400',
    content: <>Đơn hàng {link('#37745')} ngày 1/7 đã được hoàn tiền</>,
    time: '4 phút trước',
  },
  {
    icon: 'redo2',
    color: 'border-teal text-teal',
    content: (
      <>
        Hóa đơn {link('#4769')} đã được gửi đến {link('Robert Smith')}
      </>
    ),
    time: '12/12, 05:46',
  },
]

export default function DailyFinancials() {
  const [realtime, setRealtime] = useState(true)

  return (
    <Card
      title="Tài chính hằng ngày"
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