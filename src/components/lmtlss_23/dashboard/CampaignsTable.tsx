import Avatar from '../Avatar'
import { Badge, BadgeMark } from '../Badge'
import Card from '../Card'
import Dropdown, { DropdownDivider, DropdownItem } from '../Dropdown'
import Icon from '../Icon'
import DonutChart, { type DonutSlice } from '../charts/DonutChart'
import ProgressMeter from '../charts/ProgressMeter'
import { campaignGroups, type Campaign } from './data'

// ---------- dữ liệu biểu đồ donut ----------
// Lát 1 theo số liệu của template (xanh lá 13.24% / tím 37.30% / cam 49.46% = 3909 lượt truy cập)
const donutA: DonutSlice[] = [
  { name: 'Facebook', value: 1046, visits: 1046, color: '#66BB6A' },
  { name: 'Twitter', value: 2948, visits: 2948, color: '#9575CD' },
  { name: 'Video YouTube', value: 3909, visits: 3909, color: '#FF7043' },
]
const donutB: DonutSlice[] = [
  { name: 'Quảng cáo Google', value: 3120, visits: 3120, color: '#EF5350' },
  { name: 'Chiến dịch Bing', value: 2410, visits: 2410, color: '#29B6F6' },
  { name: 'Quảng cáo Amazon', value: 1870, visits: 1870, color: '#66BB6A' },
  { name: 'Quảng cáo Spotify', value: 1260, visits: 1260, color: '#BDBDBD' },
]

// ---------- hàm hỗ trợ ----------

function formatChange(change: number) {
  const sign = change < 0 ? '- ' : ''
  return `${sign}${Math.abs(change).toFixed(2)}%`
}

function RowMenu() {
  return (
    <div className="list-icons">
      <Dropdown
        fixed
        align="right"
        closeOnClick
        triggerClassName="list-icons-item dropdown-toggle caret-0"
        trigger={<Icon name="menu7" />}
      >
        <DropdownItem icon={<Icon name="file-stats" />}>Xem báo cáo</DropdownItem>
        <DropdownItem icon={<Icon name="file-text2" />}>Chỉnh sửa chiến dịch</DropdownItem>
        <DropdownItem icon={<Icon name="file-locked" />}>Tắt chiến dịch</DropdownItem>
        <DropdownDivider />
        <DropdownItem icon={<Icon name="gear" />}>Cài đặt</DropdownItem>
      </Dropdown>
    </div>
  )
}

function HeaderMenu() {
  return (
    <div className="list-icons ml-3">
      <Dropdown
        align="right"
        closeOnClick
        triggerClassName="list-icons-item dropdown-toggle"
        trigger={<Icon name="menu7" />}
      >
        <DropdownItem icon={<Icon name="sync" />}>Cập nhật dữ liệu</DropdownItem>
        <DropdownItem icon={<Icon name="list-unordered" />}>Nhật ký chi tiết</DropdownItem>
        <DropdownItem icon={<Icon name="pie5" />}>Thống kê</DropdownItem>
        <DropdownDivider />
        <DropdownItem icon={<Icon name="cross3" />}>Xóa danh sách</DropdownItem>
      </Dropdown>
    </div>
  )
}

// ---------- hàng dữ liệu ----------

function CampaignRow({ c }: { c: Campaign }) {
  const down = c.change < 0
  return (
    <tr>
      <td>
        <div className="d-flex align-items-center">
          <div className="mr-3">
            <a href="#" onClick={(e) => e.preventDefault()}>
              <Avatar name={c.name} size={32} />
            </a>
          </div>
          <div>
            <a href="#" className="text-default font-weight-semibold" onClick={(e) => e.preventDefault()}>
              {c.name}
            </a>
            <div className="text-muted font-size-sm">
              <BadgeMark color={c.mark} className="mr-1" />
              {c.time}
            </div>
          </div>
        </div>
      </td>
      <td>
        <span className="text-muted">{c.client}</span>
      </td>
      <td>
        <span className={down ? 'text-danger' : 'text-success-600'}>
          <Icon name={down ? 'stats-decline2' : 'stats-growth2'} className="mr-2" /> {formatChange(c.change)}
        </span>
      </td>
      <td>
        <h6 className="font-weight-semibold mb-0">{c.budget}</h6>
      </td>
      <td>
        <Badge color={c.statusColor}>{c.status}</Badge>
      </td>
      <td className="text-center">
        <RowMenu />
      </td>
    </tr>
  )
}

// ---------- component chính ----------

export default function CampaignsTable() {
  return (
    <Card
      title="Chiến dịch tiếp thị"
      headerClassName="header-elements-sm-inline"
      bodyClassName=""
      actions={
        <>
          <Badge color="success" pill>
            28 đang hoạt động
          </Badge>
          <HeaderMenu />
        </>
      }
    >
      <div className="card-body d-sm-flex align-items-sm-center justify-content-sm-between flex-sm-wrap">
        <div className="d-flex align-items-center mb-3 mb-sm-0">
          <DonutChart data={donutA} />
          <div className="ml-3">
            <h5 className="font-weight-semibold mb-0">
              38,289{' '}
              <span className="text-success font-size-sm font-weight-normal">
                <Icon name="arrow-up12" /> (+16.2%)
              </span>
            </h5>
            <BadgeMark color="success" className="mr-1" /> <span className="text-muted">12/05, 00:30</span>
          </div>
        </div>

        <div className="d-flex align-items-center mb-3 mb-sm-0">
          <DonutChart data={donutB} />
          <div className="ml-3">
            <h5 className="font-weight-semibold mb-0">
              2,458{' '}
              <span className="text-danger font-size-sm font-weight-normal">
                <Icon name="arrow-down12" /> (-4.9%)
              </span>
            </h5>
            <BadgeMark color="danger" className="mr-1" /> <span className="text-muted">04/06, 04:00</span>
          </div>
        </div>

        <div>
          <a href="#" className="btn bg-indigo-300" onClick={(e) => e.preventDefault()}>
            <Icon name="statistics" className="mr-2" /> Xem báo cáo
          </a>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table text-nowrap">
          <thead>
            <tr>
              <th>Chiến dịch</th>
              <th>Khách hàng</th>
              <th>Thay đổi</th>
              <th>Ngân sách</th>
              <th>Trạng thái</th>
              <th className="text-center" style={{ width: 20 }}>
                <Icon name="arrow-down12" />
              </th>
            </tr>
          </thead>
          <tbody>
            {campaignGroups.flatMap((g) => [
              <tr key={g.label} className="table-active table-border-double">
                <td colSpan={5}>{g.label}</td>
                <td className="text-right">
                  <ProgressMeter value={g.progress} color={g.progressColor} />
                </td>
              </tr>,
              ...g.rows.map((c) => <CampaignRow key={`${g.label}-${c.name}`} c={c} />),
            ])}
          </tbody>
        </table>
      </div>
    </Card>
  )
}