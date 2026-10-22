import { BreadcrumbActions, Content, LimitlessLayout, PageHeader } from '@/components/lmtlss_23'
import { SimpleTable, TableCard, sizingUsers, userColumns } from '@/components/lmtlss_23/tables'

/** Tương ứng table_sizing.html của template (Tables - Sizing) */
export default function TableSizing() {
  return (
    <LimitlessLayout>
      <PageHeader
        title="Bảng"
        subtitle="Kích thước"
        buttons={[
          { icon: 'bars-alt', label: 'Thống kê' },
          { icon: 'calculator', label: 'Hóa đơn' },
          { icon: 'calendar5', label: 'Lịch trình' },
        ]}
        breadcrumbs={[
          { label: 'Trang chủ', to: '/lmtlss_23/', icon: 'home2' },
          { label: 'Bảng', to: '/lmtlss_23/table-sizing' },
          { label: 'Kích thước' },
        ]}
        breadcrumbActions={<BreadcrumbActions />}
      />

      <Content>
        <TableCard
          title="Bảng cực lớn"
          description={
            <>
              Ví dụ về bảng có kích thước <code>extra large</code>, sử dụng class <code>.table-xl</code> được thêm vào{' '}
              <code>.table</code>. Tất cả các hàng trong bảng có chiều cao <code>60px</code> theo đơn vị REM.
            </>
          }
        >
          <SimpleTable size="xl" columns={userColumns} rows={sizingUsers} />
        </TableCard>

        <TableCard
          title="Bảng lớn"
          description={
            <>
              Ví dụ về bảng có kích thước <code>large</code>, sử dụng class <code>.table-lg</code> được thêm vào{' '}
              <code>.table</code>. Tất cả các hàng trong bảng có chiều cao <code>53px</code> theo đơn vị REM.
            </>
          }
        >
          <SimpleTable size="lg" columns={userColumns} rows={sizingUsers} />
        </TableCard>

        <TableCard
          title="Bảng mặc định"
          description={
            <>
              Ví dụ về bảng có kích thước <code>default</code>. Bảng này không cần thêm class nào vào vùng chứa{' '}
              <code>.table</code>. Tất cả các hàng trong bảng có chiều cao <code>44px</code> theo đơn vị REM.
            </>
          }
        >
          <SimpleTable columns={userColumns} rows={sizingUsers} />
        </TableCard>

        <TableCard
          title="Bảng nhỏ"
          description={
            <>
              Ví dụ về bảng có kích thước <code>small</code>, sử dụng class <code>.table-sm</code> được thêm vào{' '}
              <code>.table</code>. Tất cả các hàng trong bảng có chiều cao <code>40px</code> theo đơn vị REM.
            </>
          }
        >
          <SimpleTable size="sm" columns={userColumns} rows={sizingUsers} />
        </TableCard>

        <TableCard
          title="Bảng rất nhỏ"
          description={
            <>
              Ví dụ về bảng có kích thước <code>mini</code>, sử dụng class <code>.table-xs</code> được thêm vào{' '}
              <code>.table</code>. Tất cả các hàng trong bảng có chiều cao <code>36px</code> theo đơn vị REM.
            </>
          }
        >
          <SimpleTable size="xs" columns={userColumns} rows={sizingUsers} />
        </TableCard>
      </Content>
    </LimitlessLayout>
  )
}