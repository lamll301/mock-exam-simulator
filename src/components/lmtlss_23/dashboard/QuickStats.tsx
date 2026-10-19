import { useState, type ReactNode } from 'react'
import { Badge } from '../Badge'
import Dropdown, { DropdownItem } from '../Dropdown'
import Icon from '../Icon'
import SparkArea from '../charts/SparkArea'
import SparkBars from '../charts/SparkBars'
import SparkLine from '../charts/SparkLine'

// Dropdown bánh răng (Current server load)
function SettingsMenu() {
  return (
    <div className="list-icons ml-auto">
      <Dropdown
        align="right"
        closeOnClick
        triggerClassName="list-icons-item dropdown-toggle"
        trigger={<Icon name="cog3" />}
      >
        <DropdownItem icon={<Icon name="sync" />}>Update data</DropdownItem>
        <DropdownItem icon={<Icon name="list-unordered" />}>Detailed log</DropdownItem>
        <DropdownItem icon={<Icon name="pie5" />}>Statistics</DropdownItem>
        <DropdownItem icon={<Icon name="cross3" />}>Clear list</DropdownItem>
      </Dropdown>
    </div>
  )
}

// Nút reload (Today's revenue): bấm thì icon quay 1 giây, thay cho data-action="reload" của template
function ReloadButton() {
  const [spinning, setSpinning] = useState(false)

  return (
    <div className="list-icons ml-auto">
      <a
        href="#"
        className="list-icons-item"
        onClick={(e) => {
          e.preventDefault()
          if (spinning) return
          setSpinning(true)
          setTimeout(() => setSpinning(false), 1000)
        }}
      >
        <Icon name="sync" className={spinning ? 'spinner' : ''} />
      </a>
    </div>
  )
}

interface Box {
  value: string
  label: string
  sub: string
  bg: string
  badge?: string
  /** Phần tử bên phải số liệu (badge / bánh răng / reload) */
  action?: ReactNode
  chart: ReactNode
  /** Template bọc chart này trong .container-fluid */
  padded?: boolean
}

const boxes: Box[] = [
  {
    value: '3,450',
    label: 'Members online',
    sub: '489 avg',
    badge: '+53,6%',
    bg: 'bg-teal-400',
    chart: <SparkBars seed={5} />,
  },
  {
    value: '49.4%',
    label: 'Current server load',
    sub: '34.6% avg',
    bg: 'bg-pink-400',
    action: <SettingsMenu />,
    chart: <SparkArea seed={11} />,
  },
  {
    value: '$18,390',
    label: "Today's revenue",
    sub: '$37,578 avg',
    bg: 'bg-blue-400',
    action: <ReloadButton />,
    // #29B6F6 = blue-400, để ruột chấm tròn trùng màu nền card
    chart: <SparkLine seed={3} background="#29B6F6" />,
    padded: true,
  },
]

export default function QuickStats() {
  return (
    <div className="row">
      {boxes.map((b) => (
        <div key={b.label} className="col-lg-4">
          <div className={`card ${b.bg}`}>
            <div className="card-body">
              <div className="d-flex">
                <h3 className="font-weight-semibold mb-0">{b.value}</h3>
                {b.badge && (
                  <Badge color="teal-800" pill className="align-self-center ml-auto">
                    {b.badge}
                  </Badge>
                )}
                {b.action}
              </div>
              <div>
                {b.label}
                <div className="font-size-sm opacity-75">{b.sub}</div>
              </div>
            </div>

            {b.padded ? <div className="container-fluid">{b.chart}</div> : b.chart}
          </div>
        </div>
      ))}
    </div>
  )
}