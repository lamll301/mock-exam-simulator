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
import DailySales from './DailySales'
import DailyFinancials from './DailyFinancials'
import MyMessages from './MyMessages'
import SupportTickets from './SupportTickets'

// Phần bên phải thanh breadcrumb (Support + Settings), markup theo index.html
function SettingsMenu() {
  return (
    <>
      <a href="#" className="breadcrumb-elements-item" onClick={(e) => e.preventDefault()}>
        <Icon name="comment-discussion" className="mr-2" />
        Support
      </a>
      <Dropdown
        className="breadcrumb-elements-item p-0"
        align="right"
        closeOnClick
        triggerClassName="breadcrumb-elements-item dropdown-toggle"
        trigger={
          <>
            <Icon name="gear" className="mr-2" />
            Settings
          </>
        }
      >
        <DropdownItem icon={<Icon name="user-lock" />}>Account security</DropdownItem>
        <DropdownItem icon={<Icon name="statistics" />}>Analytics</DropdownItem>
        <DropdownItem icon={<Icon name="accessibility" />}>Accessibility</DropdownItem>
        <DropdownDivider />
        <DropdownItem icon={<Icon name="gear" />}>All settings</DropdownItem>
      </Dropdown>
    </>
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
        <div className="row">
          <div className="col-xl-7 d-flex flex-column">
            <TrafficSources />
          </div>
          <div className="col-xl-5 d-flex flex-column">
            <SalesStats />
          </div>
        </div>

        <div className="row">
          <div className="col-xl-8">
            <CampaignsTable />
            <QuickStats />
            <SupportTickets />
            <LatestPosts />
          </div>
          <div className="col-xl-4">
            <ProgressCards />
            <DailySales />
            <MyMessages />
            <DailyFinancials />
          </div>
        </div>
      </Content>
    </>
  )
}
