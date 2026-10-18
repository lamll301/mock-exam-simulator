import Avatar from '../Avatar'
import { Badge, BadgeMark } from '../Badge'
import Card from '../Card'
import Dropdown, { DropdownDivider, DropdownItem } from '../Dropdown'
import Icon from '../Icon'
import { campaignGroups, type Campaign } from './data'

// ---------- helper ----------

function formatChange(change: number) {
  const sign = change < 0 ? '- ' : ''
  return `${sign}${Math.abs(change).toFixed(2)}%`
}

function RowMenu() {
  return (
    <Dropdown
      align="right"
      closeOnClick
      trigger={<Icon name="menu7" />}
      triggerClassName="text-lt-text hover:text-lt-primary"
      panelClassName="min-w-48 py-1 text-left"
    >
      <DropdownItem icon={<Icon name="file-stats" />}>View statement</DropdownItem>
      <DropdownItem icon={<Icon name="file-text2" />}>Edit campaign</DropdownItem>
      <DropdownItem icon={<Icon name="file-locked" />}>Disable campaign</DropdownItem>
      <DropdownDivider />
      <DropdownItem icon={<Icon name="gear" />}>Settings</DropdownItem>
    </Dropdown>
  )
}

// ---------- dòng dữ liệu ----------

function CampaignRow({ c }: { c: Campaign }) {
  const down = c.change < 0
  return (
    <tr className="border-t border-lt-border">
      <td className="px-5 py-3">
        <div className="flex items-center gap-3">
          <Avatar name={c.name} size={32} />
          <div>
            <a href="#" className="font-medium text-lt-text">
              {c.name}
            </a>
            <div className="text-xs text-lt-muted">
              <BadgeMark color={c.mark} className="mr-1" />
              {c.time}
            </div>
          </div>
        </div>
      </td>
      <td className="px-5 py-3 text-lt-muted">{c.client}</td>
      <td className={`px-5 py-3 ${down ? 'text-lt-danger' : 'text-lt-success-600'}`}>
        <Icon name={down ? 'stats-decline2' : 'stats-growth2'} className="mr-2" />
        {formatChange(c.change)}
      </td>
      <td className="px-5 py-3 font-medium">{c.budget}</td>
      <td className="px-5 py-3">
        <Badge color={c.statusColor}>{c.status}</Badge>
      </td>
      <td className="px-5 py-3 text-center">
        <RowMenu />
      </td>
    </tr>
  )
}

// ---------- component chính ----------

export default function CampaignsTable() {
  return (
    <Card
      title="Marketing campaigns"
      bodyClassName=""
      actions={
        <Badge color="success" pill>
          28 active
        </Badge>
      }
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left whitespace-nowrap">
          <thead>
            <tr className="font-medium">
              <th className="px-5 py-3">Campaign</th>
              <th className="px-5 py-3">Client</th>
              <th className="px-5 py-3">Changes</th>
              <th className="px-5 py-3">Budget</th>
              <th className="px-5 py-3">Status</th>
              <th className="w-5 px-5 py-3 text-center">
                <Icon name="arrow-down12" />
              </th>
            </tr>
          </thead>
          {campaignGroups.map((g) => (
            <tbody key={g.label}>
              <tr className="border-t-2 border-lt-border bg-black/[0.03]">
                <td colSpan={6} className="px-5 py-2.5">
                  {g.label}
                </td>
              </tr>
              {g.rows.map((c) => (
                <CampaignRow key={c.name} c={c} />
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </Card>
  )
}
