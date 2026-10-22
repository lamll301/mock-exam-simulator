import { BreadcrumbActions, Content, LimitlessLayout, PageHeader } from '@/components/lmtlss_23'
import { DataTable, TableCard, employeeColumns, employees } from '@/components/lmtlss_23/tables'

/** Tương ứng datatable_extension_reorder.html của template (Datatables extensions - Columns reorder) */
export default function DatatableExtensionReorder() {
  return (
    <LimitlessLayout>
      <PageHeader
        title="Bảng dữ liệu"
        subtitle="Sắp xếp lại cột"
        buttons={[
          { icon: 'bars-alt', label: 'Thống kê' },
          { icon: 'calculator', label: 'Hóa đơn' },
          { icon: 'calendar5', label: 'Lịch trình' },
        ]}
        breadcrumbs={[
          { label: 'Trang chủ', to: '/lmtlss_23/', icon: 'home2' },
          { label: 'Bảng dữ liệu', to: '/lmtlss_23/datatable-extension-reorder' },
          { label: 'Sắp xếp lại cột' },
        ]}
        breadcrumbActions={<BreadcrumbActions />}
      />

      <Content>
        <TableCard
          title="Sắp xếp lại cột cơ bản"
          description={
            <>
              Ví dụ này minh họa cách sử dụng cơ bản của plugin <code>ColReorder</code>. Khi bật ColReorder cho bảng,
              người dùng có thể nhấn giữ và kéo bất kỳ ô tiêu đề cột nào đến vị trí mong muốn để chèn cột vào đó.
              Vị trí chèn được hiển thị trực quan và việc sắp xếp cột hoàn tất ngay khi thả chuột.
              ColReorder được thêm vào DataTable thông qua ký tự <code>R</code> được thêm vào <code>dom</code>.
            </>
          }
        >
          <DataTable
            className="datatable-reorder"
            columns={employeeColumns}
            rows={employees}
            rowKey={(r) => r.id}
            colReorder
          />
        </TableCard>

        <TableCard
          title="Cập nhật theo thời gian thực"
          description={
            <>
              Có thể tùy chỉnh kiểu hiển thị của dấu chỉ vị trí chèn cột trong ColReorder. Một cách khác để giúp người
              dùng xem trước hình dạng của bảng sau khi sắp xếp là thực hiện việc sắp xếp ngay trong lúc họ đang kéo
              tiêu đề cột bằng chuột. Ví dụ này sử dụng tham số <code>realtime</code> để điều khiển hành vi đó.
            </>
          }
        >
          <DataTable
            className="datatable-reorder-realtime"
            columns={employeeColumns}
            rows={employees}
            rowKey={(r) => r.id}
            colReorder={{ realtime: true }}
          />
        </TableCard>

        <TableCard
          title="Lưu trạng thái"
          description={
            <>
              Một cách tương tác hữu ích trong DataTables là <code>state saving</code>, giúp giữ lại trạng thái trước
              đó khi người dùng tải lại hoặc truy cập lại trang. ColReorder hoạt động liền mạch với tính năng lưu
              trạng thái của DataTables (<code>stateSave</code>), ghi nhớ và khôi phục vị trí các cột cũng như những
              trạng thái khác như sắp xếp và lọc dữ liệu.
            </>
          }
        >
          <DataTable
            className="datatable-reorder-state-saving"
            columns={employeeColumns}
            rows={employees}
            rowKey={(r) => r.id}
            colReorder
            stateSaveKey="datatable-reorder-state-saving"
          />
        </TableCard>

        <TableCard
          title="Sắp xếp cột theo thứ tự định trước"
          description={
            <>
              ColReorder cho phép chỉ định thứ tự cột khác với thứ tự trong HTML thông qua tham số{' '}
              <code>colReorder.order</code>. Đây là một mảng số nguyên xác định thứ tự cột mong muốn.
              Trong ví dụ này, các cột được sắp xếp khi khởi tạo theo thứ tự: <code>1, 3, 2, 4, 0, 5</code>.
              Người dùng vẫn có thể tiếp tục sắp xếp lại cột sau khi thứ tự định trước được áp dụng.
            </>
          }
        >
          <DataTable
            className="datatable-reorder-predefined"
            columns={employeeColumns}
            rows={employees}
            rowKey={(r) => r.id}
            colReorder={{ order: [1, 3, 2, 4, 0, 5] }}
          />
        </TableCard>
      </Content>
    </LimitlessLayout>
  )
}