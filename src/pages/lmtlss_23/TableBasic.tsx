import { BreadcrumbActions, Content, LimitlessLayout, PageHeader } from '@/components/lmtlss_23'
import {
  SectionTitle,
  SimpleTable,
  TableCard,
  basicUsers,
  scrollUsers,
  userColumns,
} from '@/components/lmtlss_23/tables'

/** Tương ứng với table_basic.html của template (Tables - Basic) */
export default function TableBasic() {
  return (
    <LimitlessLayout>
      <PageHeader
        title="Bảng"
        subtitle="Cơ bản"
        buttons={[
          { icon: 'bars-alt', label: 'Thống kê' },
          { icon: 'calculator', label: 'Hóa đơn' },
          { icon: 'calendar5', label: 'Lịch trình' },
        ]}
        breadcrumbs={[
          { label: 'Trang chủ', to: '/lmtlss_23/', icon: 'home2' },
          { label: 'Bảng', to: '/lmtlss_23/table-basic' },
          { label: 'Cơ bản' },
        ]}
        breadcrumbActions={<BreadcrumbActions />}
      />

      <Content>
        <SectionTitle
          title="Bảng cơ bản"
          subtitle={
            <>
              Bảng sử dụng kiểu định dạng mặc định của <code>Bootstrap</code>
            </>
          }
        />

        <TableCard
          title="Bảng cơ bản"
          description={
            <>
              Ví dụ về bảng <code>basic</code>. Để áp dụng kiểu định dạng cơ bản (khoảng đệm nhỏ và chỉ có đường phân cách ngang), hãy thêm lớp cơ sở <code>.table</code> vào bất kỳ phần tử <code>&lt;table&gt;</code> nào. Điều này có thể trông hơi dư thừa, nhưng do bảng được sử dụng rộng rãi trong các plugin khác như lịch và bộ chọn ngày, chúng tôi chọn cách tách riêng các kiểu định dạng bảng tùy chỉnh.
            </>
          }
        >
          <SimpleTable columns={userColumns} rows={basicUsers} />
        </TableCard>

        <TableCard
          title="Các hàng sọc xen kẽ"
          description={
            <>
              Ví dụ về bảng có các hàng <code>striped</code>. Thêm lớp <code>.table-striped</code> vào lớp cơ sở{' '}
              <code>.table</code> để tạo hiệu ứng sọc xen kẽ giữa các hàng lẻ trong phần <code>&lt;tbody&gt;</code>. Kiểu định dạng này không hoạt động trên IE8 trở xuống vì các phiên bản trình duyệt này không hỗ trợ bộ chọn CSS <code>:nth-child</code>. Có thể kết hợp bảng sọc xen kẽ với các kiểu định dạng bảng khác.
            </>
          }
        >
          <SimpleTable striped columns={userColumns} rows={basicUsers} />
        </TableCard>

        <TableCard
          title="Bảng có đường viền"
          description={
            <>
              Ví dụ về bảng có đường viền <code>bordered</code> bao quanh toàn bộ các ô. Thêm <code>.table-bordered</code> vào lớp cơ sở{' '}
              <code>.table</code> để tạo đường viền ở tất cả các cạnh của bảng và các ô. Đây là tùy chọn mặc định của Bootstrap dành cho bảng. Để tìm hiểu thêm về các tùy chọn đường viền nâng cao, hãy xem trang <a href="#">Đường viền bảng</a>. Có thể kết hợp bảng có đường viền với các kiểu định dạng bảng khác.
            </>
          }
        >
          <SimpleTable bordered columns={userColumns} rows={basicUsers} />
        </TableCard>

        <TableCard
          title="Bảng có đường viền và hàng sọc"
          description={
            <>
              Ví dụ về bảng có đường viền <code>bordered</code> và các hàng <code>stiped</code> xen kẽ. Thêm các lớp <code>.table-bordered</code>{' '}
              và <code>.table-striped</code> vào lớp cơ sở <code>.table</code> để tạo đường viền và hiệu ứng sọc xen kẽ cho các hàng. Phương pháp này hoạt động với tất cả các tùy chọn đường viền bảng.
            </>
          }
        >
          <SimpleTable bordered striped columns={userColumns} rows={basicUsers} />
        </TableCard>

        <TableCard
          title="Hiệu ứng di chuột trên hàng"
          description={
            <>
              Ví dụ về bảng có trạng thái <code>hover</code> trên các hàng. Thêm <code>.table-hover</code> để bật hiệu ứng khi di chuột qua các hàng trong phần <code>&lt;tbody&gt;</code>.
            </>
          }
        >
          <SimpleTable hover columns={userColumns} rows={basicUsers} />
        </TableCard>

        <TableCard
          title="Bảng có thể cuộn"
          description={
            <>
              Ví dụ về bảng <code>scrollable</code>. Để đặt chiều cao cố định và cho phép cuộn, hãy bọc bảng trong một thẻ div có lớp <code>.table-scrollable</code>. Chiều cao tối đa của vùng chứa bảng là{' '}
              <code>22.5rem</code>. Thanh cuộn dọc sẽ xuất hiện nếu chiều cao của bảng vượt quá giá trị này.
            </>
          }
        >
          <SimpleTable wrapper="scrollable" columns={userColumns} rows={scrollUsers} />
        </TableCard>

        <SectionTitle
          className="pt-2"
          title="Bảng trong phần thân thẻ"
          subtitle={
            <>
              Các bảng được đặt bên trong phần thân của <code>card body</code>.
            </>
          }
        />

        <TableCard
          inBody
          title="Bảng trong phần thân thẻ"
          description={
            <>
              Ví dụ về bảng được đặt bên trong phần thân của <code>card body</code>. Các bảng này luôn có thêm khoảng trắng xung quanh nhờ thuộc tính padding của phần tử <code>.card-body</code>.
            </>
          }
        >
          <SimpleTable columns={userColumns} rows={basicUsers} />
        </TableCard>

        <TableCard
          inBody
          title="Bảng có khung"
          description={
            <>
              Ví dụ về bảng <code>framed</code> bên trong phần thân thẻ. Theo mặc định, các bảng được đặt trong phần thân thẻ không có đường viền bao quanh. Lớp <code>.table-framed</code> sẽ thêm đường viền xung quanh bảng.
            </>
          }
        >
          <SimpleTable wrapper="framed" columns={userColumns} rows={basicUsers} />
        </TableCard>

        <TableCard
          inBody
          title="Bảng có khung và đường viền ô"
          description={
            <>
              Ví dụ về bảng <code>bordered framed</code> bên trong phần thân thẻ. Theo mặc định, bảng có đường viền ô cũng không có đường viền bao quanh toàn bộ bảng. Để thêm khung bên ngoài cho bảng có đường viền ô, hãy thêm lớp <code>.table-framed</code> vào{' '}
              <code>&lt;table&gt;</code>.
            </>
          }
        >
          <SimpleTable wrapper="framed" bordered columns={userColumns} rows={basicUsers} />
        </TableCard>
      </Content>
    </LimitlessLayout>
  )
}
