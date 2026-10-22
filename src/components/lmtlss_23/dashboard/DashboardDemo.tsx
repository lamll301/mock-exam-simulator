import Content from '../Content'
import PageHeader from '../PageHeader'
import BreadcrumbActions from '../BreadcrumbActions'
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

/** Trang bảng điều khiển mẫu của template, dùng để kiểm tra bố cục đã tích hợp đúng chưa */
export default function DashboardDemo() {
  return (
    <>
      <PageHeader
        title="Trang chủ"
        subtitle="Bảng điều khiển"
        buttons={[
          { icon: 'bars-alt', label: 'Thống kê' },
          { icon: 'calculator', label: 'Hóa đơn' },
          { icon: 'calendar5', label: 'Lịch trình' },
        ]}
        breadcrumbs={[{ label: 'Trang chủ', to: '/', icon: 'home2' }, { label: 'Bảng điều khiển' }]}
        breadcrumbActions={<BreadcrumbActions />}
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