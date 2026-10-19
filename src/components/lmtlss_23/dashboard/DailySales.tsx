import Card from '../Card'
import Dropdown, { DropdownDivider, DropdownItem } from '../Dropdown'
import Icon from '../Icon'
import SalesHeatmap from '../charts/SalesHeatmap'
import { dailySales, type DailySale } from './data'

// Dropdown bánh răng ở header (markup theo index.html)
function HeaderMenu() {
  return (
    <div className="list-icons ml-3">
      <Dropdown
        align="right"
        closeOnClick
        triggerClassName="list-icons-item dropdown-toggle"
        trigger={<Icon name="cog3" />}
      >
        <DropdownItem icon={<Icon name="sync" />}>Update data</DropdownItem>
        <DropdownItem icon={<Icon name="list-unordered" />}>Detailed log</DropdownItem>
        <DropdownItem icon={<Icon name="pie5" />}>Statistics</DropdownItem>
        <DropdownDivider />
        <DropdownItem icon={<Icon name="cross3" />}>Clear list</DropdownItem>
      </Dropdown>
    </div>
  )
}

function SaleRow({ s }: { s: DailySale }) {
  return (
    <tr>
      <td>
        <div className="d-flex align-items-center">
          <div className="mr-3">
            <a
              href="#"
              className={`btn ${s.color} rounded-round btn-icon btn-sm`}
              onClick={(e) => e.preventDefault()}
            >
              <span className="letter-icon">{s.name.charAt(0)}</span>
            </a>
          </div>
          <div>
            <a
              href="#"
              className="text-default font-weight-semibold letter-icon-title"
              onClick={(e) => e.preventDefault()}
            >
              {s.name} application
            </a>
            <div className="text-muted font-size-sm">
              <Icon name={s.icon} className="font-size-sm mr-1" /> {s.type}
            </div>
          </div>
        </div>
      </td>
      <td>
        <span className="text-muted font-size-sm">{s.time}</span>
      </td>
      <td>
        <h6 className="font-weight-semibold mb-0">{s.price}</h6>
      </td>
    </tr>
  )
}

export default function DailySales() {
  return (
    <Card
      title="Daily sales stats"
      bodyClassName=""
      actions={
        <>
          <span className="font-weight-bold text-danger-600 ml-2">$4,378</span>
          <HeaderMenu />
        </>
      }
    >
      <div className="card-body">
        <SalesHeatmap seed={3} />
      </div>

      <div className="table-responsive">
        <table className="table text-nowrap">
          <thead>
            <tr>
              <th className="w-100">Application</th>
              <th>Time</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {dailySales.map((s, i) => (
              <SaleRow key={i} s={s} />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
