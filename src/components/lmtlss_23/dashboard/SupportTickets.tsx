import { useState, type ReactNode } from 'react'
import Avatar from '../Avatar'
import { Badge, BadgeMark, type BadgeColor, type BadgeMarkColor } from '../Badge'
import Card from '../Card'
import Dropdown, { DropdownDivider, DropdownItem } from '../Dropdown'
import Icon from '../Icon'
import DonutChart, { type DonutSlice } from '../charts/DonutChart'

// ---------- dữ liệu ----------

type Status = 'active' | 'resolved' | 'closed'

interface Ticket {
  id: string
  title: string
  desc: ReactNode
  user: { name: string; /** Class nền nút chữ cái; bỏ trống thì dùng Avatar (template dùng ảnh placeholder) */ color?: string }
  /** Số giờ còn lại (chỉ ticket đang mở) */
  hours?: number
}

interface TicketGroup {
  status: Status
  label: string
  count: number
  badge: BadgeColor
  mark: BadgeMarkColor
  statusLabel: string
  tickets: Ticket[]
}

const groups: TicketGroup[] = [
  {
    status: 'active',
    label: 'Các ticket đang hoạt động',
    count: 24,
    badge: 'blue',
    mark: 'blue',
    statusLabel: 'Active',
    tickets: [
      { id: '#1183', title: 'Workaround for OS X selects printing bug', desc: 'Chrome fixed the bug several versions ago, thus rendering this...', user: { name: 'Annabelle Doney', color: 'bg-teal-400' }, hours: 12 },
      { id: '#1249', title: 'Vertically center carousel controls', desc: 'Try any carousel control and reduce the screen width below...', user: { name: 'Chris Macintyre' }, hours: 16 },
      { id: '#1254', title: 'Inaccurate small pagination height', desc: 'The height of pagination elements is not consistent with...', user: { name: 'Robert Hauber', color: 'bg-blue' }, hours: 20 },
      { id: '#1184', title: 'Round grid column gutter operations', desc: 'Left rounds up, right rounds down. should keep everything...', user: { name: 'Robert Hauber', color: 'bg-warning-400' }, hours: 40 },
    ],
  },
  {
    status: 'resolved',
    label: 'Các ticket đã giải quyết',
    count: 42,
    badge: 'success',
    mark: 'success',
    statusLabel: 'Resolved',
    tickets: [
      { id: '#1046', title: 'Avoid some unnecessary HTML string', desc: 'Rather than building a string of HTML and then parsing it...', user: { name: 'Alan Macedo', color: 'bg-success-400' } },
      {
        id: '#1038',
        title: 'Update json configuration',
        desc: (
          <>
            The <code>files</code> property is necessary to override the files property...
          </>
        ),
        user: { name: 'Brett Castellano', color: 'bg-pink-400' },
      },
      { id: '#1034', title: 'Tooltip multiple event', desc: 'Fix behavior when using tooltips and popovers that are...', user: { name: 'Roxanne Forbes' } },
    ],
  },
  {
    status: 'closed',
    label: 'Các ticket đã đóng',
    count: 37,
    badge: 'danger',
    mark: 'danger',
    statusLabel: 'Closed',
    tickets: [
      { id: '#1040', title: 'Account for static form controls in form group', desc: "Resizes control label's font-size and account for the standard...", user: { name: 'Mitchell Sitkin' } },
      { id: '#1038', title: 'Proper sizing of form control feedback', desc: 'Feedback icon sizing inside a larger/smaller form-group...', user: { name: 'Katleen Jensen', color: 'bg-brown-400' } },
    ],
  },
]

// Lát donut đo theo template: xanh dương 38.8% / xanh lá 24.8% / đỏ 36.4% (tổng 14,327)
const donut: DonutSlice[] = [
  { name: 'Active', value: 5560, visits: 5560, color: '#29B6F6' },
  { name: 'Resolved', value: 3552, visits: 3552, color: '#66BB6A' },
  { name: 'Closed', value: 5215, visits: 5215, color: '#EF5350' },
]

// daterangepicker của template là jQuery plugin nên thay bằng menu chọn nhanh
const ranges = [
  { label: '7 ngày qua', text: '13 tháng 10 - 19 tháng 10' },
  { label: '30 ngày qua', text: '20 tháng 9 - 19 tháng 10' },
  { label: 'Tháng này', text: '1 tháng 10 - 19 tháng 10' },
  { label: 'Tháng trước', text: '1 tháng 9 - 30 tháng 9' },
]

// ---------- thành phần nhỏ ----------

function DateRange() {
  const [selected, setSelected] = useState(ranges[1])

  return (
    <Dropdown
      align="right"
      closeOnClick
      triggerClassName="text-default font-weight-semibold dropdown-toggle"
      trigger={
        <>
          <Icon name="calendar3" className="mr-2" />
          <span>{selected.text}</span>
        </>
      }
    >
      {ranges.map((r) => (
        <a
          key={r.label}
          href="#"
          className={`dropdown-item ${r.label === selected.label ? 'active' : ''}`.trim()}
          onClick={(e) => {
            e.preventDefault()
            setSelected(r)
          }}
        >
          {r.label}
        </a>
      ))}
    </Dropdown>
  )
}

function TicketMenu({ status }: { status: Status }) {
  return (
    <div className="list-icons">
      <Dropdown
        fixed
        align="right"
        closeOnClick
        triggerClassName="list-icons-item dropdown-toggle caret-0"
        trigger={<Icon name="menu7" />}
      >
        <DropdownItem icon={<Icon name="undo" />}>Trả lời nhanh</DropdownItem>
        <DropdownItem icon={<Icon name="history" />}>Toàn bộ lịch sử</DropdownItem>
        <DropdownDivider />
        {status === 'active' ? (
          <DropdownItem icon={<Icon name="checkmark3" className="text-success" />}>Giải quyết vấn đề</DropdownItem>
        ) : (
          <DropdownItem icon={<Icon name="plus3" className="text-blue" />}>Hủy giải quyết</DropdownItem>
        )}
        {status === 'closed' ? (
          <DropdownItem icon={<Icon name="spinner11" className="text-grey" />}>Mở lại vấn đề</DropdownItem>
        ) : (
          <DropdownItem icon={<Icon name="cross2" className="text-danger" />}>Đóng vấn đề</DropdownItem>
        )}
      </Dropdown>
    </div>
  )
}

function DueCell({ status, hours }: { status: Status; hours?: number }) {
  if (status === 'active') {
    return (
      <>
        <h6 className="mb-0">{hours}</h6>
        <div className="font-size-sm text-muted line-height-1">giờ</div>
      </>
    )
  }
  return status === 'resolved' ? <Icon name="checkmark3" className="text-success" /> : <Icon name="cross2" className="text-danger" />
}

function TicketRow({ g, t }: { g: TicketGroup; t: Ticket }) {
  const active = g.status === 'active'

  return (
    <tr>
      <td className="text-center">
        <DueCell status={g.status} hours={t.hours} />
      </td>
      <td>
        <div className="d-flex align-items-center">
          <div className="mr-3">
            {t.user.color ? (
              <a href="#" className={`btn ${t.user.color} rounded-round btn-icon btn-sm`} onClick={(e) => e.preventDefault()}>
                <span className="letter-icon">{t.user.name.charAt(0)}</span>
              </a>
            ) : (
              <a href="#" onClick={(e) => e.preventDefault()}>
                <Avatar name={t.user.name} size={32} />
              </a>
            )}
          </div>
          <div>
            <a href="#" className="text-default font-weight-semibold" onClick={(e) => e.preventDefault()}>
              {t.user.name}
            </a>
            <div className="text-muted font-size-sm">
              <BadgeMark color={g.mark} className="mr-1" /> {g.statusLabel}
            </div>
          </div>
        </div>
      </td>
      <td>
        <a href="#" className="text-default" onClick={(e) => e.preventDefault()}>
          <div className={active ? 'font-weight-semibold' : undefined}>
            [{t.id}] {t.title}
          </div>
          <span className="text-muted">{t.desc}</span>
        </a>
      </td>
      <td className="text-center">
        <TicketMenu status={g.status} />
      </td>
    </tr>
  )
}

// ---------- component chính ----------

export default function SupportTickets() {
  return (
    <Card title="Ticket hỗ trợ" headerClassName="header-elements-sm-inline" bodyClassName="" actions={<DateRange />}>
      <div className="card-body d-md-flex align-items-md-center justify-content-md-between flex-md-wrap">
        <div className="d-flex align-items-center mb-3 mb-md-0">
          <DonutChart data={donut} size={42} />
          <div className="ml-3">
            <h5 className="font-weight-semibold mb-0">
              14,327{' '}
              <span className="text-success font-size-sm font-weight-normal">
                <Icon name="arrow-up12" /> (+2.9%)
              </span>
            </h5>
            <BadgeMark color="success" className="mr-1" /> <span className="text-muted">16 Th6, 10:00 sáng</span>
          </div>
        </div>

        <div className="d-flex align-items-center mb-3 mb-md-0">
          <a href="#" className="btn bg-transparent border-indigo-400 text-indigo-400 rounded-round border-2 btn-icon" onClick={(e) => e.preventDefault()}>
            <Icon name="alarm-add" />
          </a>
          <div className="ml-3">
            <h5 className="font-weight-semibold mb-0">1,132</h5>
            <span className="text-muted">tổng số ticket</span>
          </div>
        </div>

        <div className="d-flex align-items-center mb-3 mb-md-0">
          <a href="#" className="btn bg-transparent border-indigo-400 text-indigo-400 rounded-round border-2 btn-icon" onClick={(e) => e.preventDefault()}>
            <Icon name="spinner11" />
          </a>
          <div className="ml-3">
            <h5 className="font-weight-semibold mb-0">06:25:00</h5>
            <span className="text-muted">thời gian phản hồi</span>
          </div>
        </div>

        <div>
          <a href="#" className="btn bg-teal-400" onClick={(e) => e.preventDefault()}>
            <Icon name="statistics" className="mr-2" /> Báo cáo
          </a>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table text-nowrap">
          <thead>
            <tr>
              <th style={{ width: 50 }}>Thời hạn</th>
              <th style={{ width: 300 }}>Người dùng</th>
              <th>Mô tả</th>
              <th className="text-center" style={{ width: 20 }}>
                <Icon name="arrow-down12" />
              </th>
            </tr>
          </thead>
          <tbody>
            {groups.flatMap((g) => [
              <tr key={g.status} className="table-active table-border-double">
                <td colSpan={3}>{g.label}</td>
                <td className="text-right">
                  <Badge color={g.badge} pill>
                    {g.count}
                  </Badge>
                </td>
              </tr>,
              ...g.tickets.map((t) => <TicketRow key={`${g.status}-${t.id}-${t.user.name}`} g={g} t={t} />),
            ])}
          </tbody>
        </table>
      </div>
    </Card>
  )
}