import Content from '../Content'
import Dropdown, { DropdownDivider, DropdownItem } from '../Dropdown'
import Icon from '../Icon'
import PageHeader from '../PageHeader'
import CampaignsTable from './CampaignsTable'
import LatestPosts from './LatestPosts'
import ProgressCards from './ProgressCards'
import QuickStats from './QuickStats'
import SalesStats from './SalesStats'
import TrafficSources from './TrafficSources'

function SettingsMenu() {
  return (
    <div className="flex items-center gap-5">
      <a href="#" className="text-lt-text hover:text-lt-primary">
        <Icon name="comment-discussion" className="mr-2" />
        Support
      </a>
      <Dropdown
        align="right"
        closeOnClick
        trigger={
          <>
            <Icon name="gear" className="mr-2" />
            Settings
          </>
        }
        triggerClassName="text-lt-text hover:text-lt-primary"
        panelClassName="min-w-48 py-1"
      >
        <DropdownItem icon={<Icon name="user-lock" />}>Account security</DropdownItem>
        <DropdownItem icon={<Icon name="statistics" />}>Analytics</DropdownItem>
        <DropdownItem icon={<Icon name="accessibility" />}>Accessibility</DropdownItem>
        <DropdownDivider />
        <DropdownItem icon={<Icon name="gear" />}>All settings</DropdownItem>
      </Dropdown>
    </div>
  )
}

/** Trang dashboard mẫu của template, dùng để kiểm tra layout đã tích hợp đúng chưa */
export default function DashboardDemo() {
  return (
    <>
      <PageHeader
        title="Home"
        subtitle="Dashboard"
        buttons={[
          { icon: 'bars-alt', label: 'Statistics' },
          { icon: 'calculator', label: 'Invoices' },
          { icon: 'calendar5', label: 'Schedule' },
        ]}
        breadcrumbs={[{ label: 'Home', to: '/', icon: 'home2' }, { label: 'Dashboard' }]}
        breadcrumbActions={<SettingsMenu />}
      />

      <Content>
        <div className="grid gap-5 xl:grid-cols-12">
          <div className="xl:col-span-7">
            <TrafficSources />
          </div>
          <div className="xl:col-span-5">
            <SalesStats />
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-12">
          <div className="xl:col-span-8">
            <CampaignsTable />
            <QuickStats />
            <LatestPosts />
          </div>
          <div className="xl:col-span-4">
            <ProgressCards />
          </div>
        </div>
      </Content>
    </>
  )
}
