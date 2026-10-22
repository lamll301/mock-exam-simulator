import { Fragment, useState } from 'react'
import { BreadcrumbActions, Content, LimitlessLayout, PageHeader } from '@/components/lmtlss_23'
import {
  DataTable,
  TableCard,
  employees,
  rowReorderColumns,
  type EmployeeRow,
  type RowReorderEvent,
} from '@/components/lmtlss_23/tables'

const fullName = (e: EmployeeRow) => `${e.firstName} ${e.lastName}`
const rowKey = (e: EmployeeRow) => e.id

/** Tương ứng datatable_extension_row_reorder.html của template (Datatables - Row reorder) */
export default function DatatableExtensionRowReorder() {
  // Kết quả sự kiện row-reorder (thẻ "Sự kiện sắp xếp lại"); null = chưa kéo lần nào
  const [eventResult, setEventResult] = useState<string[] | null>(null)

  const handleReorder = ({ trigger, changes }: RowReorderEvent<EmployeeRow>) => {
    setEventResult([
      `Bắt đầu sắp xếp lại tại hàng: ${fullName(trigger)}`,
      ...changes.map((c) => `${fullName(c.row)} được chuyển đến vị trí ${c.newPosition} (vị trí cũ: ${c.oldPosition})`),
    ])
  }

  return (
    <LimitlessLayout>
      <PageHeader
        title="Bảng dữ liệu"
        subtitle="Sắp xếp lại hàng"
        buttons={[
          { icon: 'bars-alt', label: 'Thống kê' },
          { icon: 'calculator', label: 'Hóa đơn' },
          { icon: 'calendar5', label: 'Lịch trình' },
        ]}
        breadcrumbs={[
          { label: 'Trang chủ', to: '/lmtlss_23/', icon: 'home2' },
          { label: 'Bảng dữ liệu', to: '/lmtlss_23/datatable-extension-row-reorder' },
          { label: 'Sắp xếp lại hàng' },
        ]}
        breadcrumbActions={<BreadcrumbActions />}
      />

      <Content>
        <TableCard
          title="Khởi tạo cơ bản"
          description={
            <>
              Ví dụ đơn giản này minh họa cách sử dụng thuộc tính <code>rowReorder</code> để bật tính năng{' '}
              <strong>RowReorder</strong> trên DataTable. Cột đầu tiên chứa số thứ tự, được dùng làm cơ sở xác định
              thứ tự các hàng. Để thay đổi thứ tự, chỉ cần nhấn giữ ô đầu tiên rồi kéo hàng đến vị trí mong muốn.
              Lưu ý rằng trong ví dụ này, thao tác sắp xếp được bật trên tất cả các cột.
            </>
          }
        >
          <DataTable className="datatable-row-basic" columns={rowReorderColumns} rows={employees} rowKey={rowKey} rowReorder />
        </TableCard>

        <TableCard
          title="Chọn toàn bộ hàng"
          description={
            <>
              Tùy chọn <code>rowReorder.selector</code> cho phép xác định phần tử nào trong một hàng sẽ được dùng làm
              điểm kéo để sắp xếp lại hàng. Theo mặc định, chỉ ô đầu tiên trong hàng mới kích hoạt thao tác này.
              Ví dụ này cho phép bắt đầu sắp xếp bằng cách kéo bất kỳ vị trí nào trên <strong>toàn bộ hàng</strong>.
              Ngoài ra, cột xác định thứ tự hàng được ẩn theo mặc định, giúp bảng hiển thị như một danh sách có thể
              sắp xếp.
            </>
          }
        >
          <DataTable
            className="datatable-row-full"
            columns={rowReorderColumns}
            rows={employees}
            rowKey={rowKey}
            rowReorder={{ selector: 'row', hideOrderColumn: true }}
          />
        </TableCard>

        <TableCard
          title="Tích hợp giao diện đáp ứng"
          description={
            <>
              Ví dụ này minh họa cách sử dụng RowReorder cùng với tiện ích mở rộng <strong>Responsive</strong> của
              DataTables. Tính năng cũng hỗ trợ thao tác cảm ứng để sắp xếp lại hàng. Responsive đặc biệt hữu ích
              trên thiết bị di động, nhưng cũng phù hợp với máy tính để bàn khi DataTable hiển thị tập dữ liệu phức tạp.
              Lưu ý rằng trong ví dụ này, thao tác sắp xếp hàng được kích hoạt bằng cách kéo các ô ở cột thứ hai.
            </>
          }
        >
          <DataTable
            className="datatable-row-responsive"
            columns={rowReorderColumns}
            rows={employees}
            rowKey={rowKey}
            responsive
            rowReorder={{ selector: 1 }}
          />
        </TableCard>

        <TableCard
          title="Sự kiện sắp xếp lại"
          description={
            <>
              <p className="mb-3">
                Cung cấp giao diện cho phép người dùng sắp xếp lại bảng mới chỉ là một phần của công việc. Thông thường,
                bạn cũng cần lưu những thay đổi này vào cơ sở dữ liệu hoặc một nơi lưu trữ dữ liệu khác. Ví dụ này cho
                thấy cách lắng nghe sự kiện <code>row-reorder</code> và thực hiện hành động khi sự kiện được kích hoạt.
                Ở đây, thông tin về thay đổi được hiển thị ngay trên trang. Với trường hợp phức tạp hơn, bạn có thể
                dùng Ajax để thông báo thay đổi cho máy chủ.
              </p>

              <pre className="pre-scrollable" id="event-result">
                {eventResult ? (
                  <>
                    Kết quả sự kiện:
                    <br />
                    {eventResult.map((line, i) => (
                      <Fragment key={i}>
                        {line}
                        <br />
                      </Fragment>
                    ))}
                  </>
                ) : (
                  '// Kết quả sự kiện'
                )}
              </pre>
            </>
          }
        >
          <DataTable
            className="datatable-row-events"
            columns={rowReorderColumns}
            rows={employees}
            rowKey={rowKey}
            rowReorder={{ onReorder: handleReorder }}
          />
        </TableCard>
      </Content>
    </LimitlessLayout>
  )
}