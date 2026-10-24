import { BreadcrumbActions, Content, LimitlessLayout, PageHeader } from '@/components/lmtlss_23'
import {
  SimpleTable,
  TableCard,
  basicUsers,
  contextualClasses,
  customRowColors,
  paymentColumns,
  paymentRows,
  rowClassByPair,
  userColumns,
} from '@/components/lmtlss_23/tables'

const colorsLink = (
  <a href="#">
    hệ thống màu tùy chỉnh
  </a>
)

/** Tương ứng với table_styling.html của template (Tables - Styling) */
export default function TableStyling() {
  return (
    <LimitlessLayout>
      <PageHeader
        title="Bảng"
        subtitle="Định dạng"
        buttons={[
          { icon: 'bars-alt', label: 'Thống kê' },
          { icon: 'calculator', label: 'Hóa đơn' },
          { icon: 'calendar5', label: 'Lịch trình' },
        ]}
        breadcrumbs={[
          { label: 'Trang chủ', to: '/lmtlss_23/', icon: 'home2' },
          { label: 'Bảng', to: '/lmtlss_23/table-styling' },
          { label: 'Định dạng' },
        ]}
        breadcrumbActions={<BreadcrumbActions />}
      />

      <Content>
        <TableCard
          title="Định dạng mặc định"
          description={
            <>
              Ví dụ về bảng với kiểu định dạng mặc định. Theo mặc định, mọi bảng có lớp <code>.table</code> đều có màu nền <code>trong suốt</code> và đường viền màu xám. Phần đầu bảng và phần chân bảng có cùng kiểu định dạng: nền trong suốt, chữ đậm vừa, đường viền ngang đậm hơn và chiều cao bằng các ô của phần thân bảng.
            </>
          }
        >
          <SimpleTable footer columns={userColumns} rows={basicUsers} />
        </TableCard>

        <TableCard
          title="Định dạng phần đầu bảng"
          description={
            <>
              Ví dụ về kiểu định dạng tùy chỉnh cho phần <code>header</code> của bảng. Phần đầu bảng hỗ trợ các màu ngữ cảnh mặc định và các màu nền tùy chỉnh có trong {colorsLink}. Để dùng màu tùy chỉnh cho phần đầu bảng, hãy thêm lớp <code>.bg-*</code> vào hàng đầu bảng. Toàn bộ màu đường viền và màu chữ sẽ được tự động điều chỉnh.
            </>
          }
        >
          <SimpleTable headRowClassName="bg-blue" columns={userColumns} rows={basicUsers} />
        </TableCard>

        <TableCard
          title="Định dạng phần chân bảng"
          description={
            <>
              Ví dụ về kiểu định dạng tùy chỉnh cho phần <code>footer</code> của bảng. Phần chân bảng hỗ trợ các màu nền tùy chỉnh có trong {colorsLink}. Để dùng màu tùy chỉnh cho phần chân bảng, hãy thêm lớp <code>.bg-*</code> vào hàng chân bảng. Toàn bộ màu đường viền và màu chữ sẽ được tự động điều chỉnh.
            </>
          }
        >
          <SimpleTable hideHead footer footRowClassName="bg-teal-400" columns={userColumns} rows={basicUsers} />
        </TableCard>

        <TableCard
          title="Các lớp ngữ cảnh"
          description={
            <>
              Ví dụ về các lớp ngữ cảnh cho <code>hàng</code> của bảng. Các lớp ngữ cảnh dùng để tô màu cho hàng hoặc từng ô riêng lẻ. Những lớp này đi kèm sẵn với Bootstrap và có màu nhạt hơn nhiều so với các màu tùy chỉnh của template.
            </>
          }
        >
          <SimpleTable rowClassName={rowClassByPair(contextualClasses)} columns={paymentColumns} rows={paymentRows} />
        </TableCard>

        <TableCard
          title="Màu hàng tùy chỉnh"
          description={
            <>
              Ví dụ về <code>màu tùy chỉnh</code> cho hàng của bảng. Thêm một trong các màu tùy chỉnh của hệ thống màu template vào bất kỳ hàng nào để làm nổi bật thêm. Khác với các lớp ngữ cảnh, những màu này đậm hơn nhiều. Xem tất cả <a href="#">các màu có sẵn tại đây &rarr;</a>.
            </>
          }
        >
          <SimpleTable rowClassName={rowClassByPair(customRowColors)} columns={paymentColumns} rows={paymentRows} />
        </TableCard>

        <TableCard
          title="Màu bảng tùy chỉnh"
          description={
            <>
              Ví dụ về bảng có màu <code>nền</code> tùy chỉnh. Bất kỳ bảng nào cũng có thể dùng các màu nền khác nhau trong {colorsLink}. Để dùng một trong các màu này, hãy thêm lớp màu <code>.bg-*</code> vào bảng có lớp <code>.table</code>.
            </>
          }
        >
          <SimpleTable className="table-dark bg-slate-600" columns={userColumns} rows={basicUsers} />
        </TableCard>

        <TableCard
          title="Các tùy chọn bảng có màu"
          description={
            <>
              Bảng có màu nền tùy chỉnh hỗ trợ tất cả các bố cục và tùy chọn bảng mặc định. Trong ví dụ này, bảng hiển thị đầy đủ các loại đường viền, các hàng sọc xen kẽ và đổi màu nền hàng khi di chuột. Toàn bộ màu đường viền, màu hàng và màu chữ đều được điều chỉnh tự động.
            </>
          }
        >
          <SimpleTable bordered striped hover className="table-dark bg-info-700" columns={userColumns} rows={basicUsers} />
        </TableCard>

        <TableCard
          title="Kết hợp màu sắc"
          description={
            <>
              Ví dụ này minh họa việc <code>kết hợp</code> các màu được thêm vào bảng và phần đầu bảng. Ở đây có một màu chung được thêm vào thẻ <code>&lt;table&gt;</code> và phần đầu bảng được làm nổi bật bằng một màu khác thêm vào <code>hàng</code> đầu bảng. Các hàng của phần thân và phần chân bảng cũng hỗ trợ tùy chọn này.
            </>
          }
        >
          <SimpleTable
            className="table-dark bg-teal"
            headRowClassName="bg-teal-700"
            columns={userColumns}
            rows={basicUsers}
          />
        </TableCard>

        <TableCard
          cardClassName="bg-indigo-400"
          titleAs="h6"
          title="Bên trong card có màu"
          description={
            <>
              Ví dụ về một bảng cơ bản đặt bên trong card có màu nền tùy chỉnh. Card này không có lớp màu nào cho bảng và tự động kế thừa màu đường viền và màu chữ từ kiểu định dạng của card có màu. Việc kết hợp màu cũng được hỗ trợ.
            </>
          }
        >
          <SimpleTable
            className="table-dark bg-indigo-400"
            headRowClassName="bg-indigo-600"
            columns={userColumns}
            rows={basicUsers}
          />
        </TableCard>
      </Content>
    </LimitlessLayout>
  )
}
