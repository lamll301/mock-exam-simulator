import { BreadcrumbActions, Content, LimitlessLayout, PageHeader } from '@/components/lmtlss_23'
import { SectionTitle, SimpleTable, TableCard, basicUsers, userColumns } from '@/components/lmtlss_23/tables'

/** Hàng 1 và 3 (chỉ số 0, 2) trong tbody dùng kiểu viền đặc / viền đôi */
const oddRow = (_: unknown, i: number) => (i % 2 === 0 ? 'table-border-solid' : undefined)
const oddRowDouble = (_: unknown, i: number) => (i % 2 === 0 ? 'table-border-double' : undefined)
/** Hàng 2 và 4 (chỉ số 1, 3) trong tbody dùng viền đứt nét */
const evenRowDashed = (_: unknown, i: number) => (i % 2 === 1 ? 'table-border-dashed' : undefined)

/** Màu viền phía trên của từng hàng ở ví dụ "Màu đường viền" */
const topBorderColor: Record<number, string> = {
  1: 'border-top-info',
  2: 'border-top-primary',
  3: 'border-top-success',
}

/** Tương ứng với table_borders.html của template (Tables - Borders) */
export default function TableBorders() {
  return (
    <LimitlessLayout>
      <PageHeader
        title="Bảng"
        subtitle="Đường viền"
        buttons={[
          { icon: 'bars-alt', label: 'Thống kê' },
          { icon: 'calculator', label: 'Hóa đơn' },
          { icon: 'calendar5', label: 'Lịch trình' },
        ]}
        breadcrumbs={[
          { label: 'Trang chủ', to: '/lmtlss_23/', icon: 'home2' },
          { label: 'Bảng', to: '/lmtlss_23/table-borders' },
          { label: 'Đường viền' },
        ]}
        breadcrumbActions={<BreadcrumbActions />}
      />

      <Content>
        <SectionTitle
          title="Các tùy chọn đường viền"
          subtitle={
            <>
              Ví dụ về đường viền của <code>&lt;tbody&gt;</code>
            </>
          }
        />

        <TableCard
          title="Đường viền ngang"
          description={
            <>
              Ví dụ về bảng có đường viền <code>horizontal</code> (ngang). Đây là kiểu đường viền mặc định gắn với lớp <code>.table</code>. Tất cả các đường viền có cùng màu xám và cùng kiểu, bản thân bảng không có đường viền bao quanh, nhưng bạn có thể thêm đường viền này bằng cách thêm lớp <code>.table-framed</code> vào bảng có lớp <code>.table</code>.
            </>
          }
        >
          <SimpleTable columns={userColumns} rows={basicUsers} />
        </TableCard>

        <TableCard
          title="Đường viền dọc"
          description={
            <>
              Ví dụ về bảng có đường viền <code>vertical</code> (dọc). Kiểu bố cục tùy chỉnh này chỉ hiển thị các đường viền dọc. Tuy nhiên, đường viền giữa phần <code>head</code> và phần <code>body</code> của bảng vẫn hiển thị để phân tách trực quan tốt hơn. Để dùng bố cục này, hãy thêm lớp <code>.table-columned</code> vào bảng có lớp <code>.table</code>.
            </>
          }
        >
          <SimpleTable columned columns={userColumns} rows={basicUsers} />
        </TableCard>

        <TableCard
          title="Đường viền cả hai chiều"
          description={
            <>
              Ví dụ về bảng có <code>bordered</code> đầy đủ. Ở đây hiển thị cả đường viền dọc và đường viền ngang. Tất cả các đường viền có cùng màu, phần <code>head</code> của bảng được phân tách trực quan với phần <code>body</code> bằng đường viền có màu đậm hơn một chút. Để dùng bố cục này, hãy thêm lớp <code>.table-bordered</code> vào bảng có lớp <code>.table</code>.
            </>
          }
        >
          <SimpleTable bordered columns={userColumns} rows={basicUsers} />
        </TableCard>

        <TableCard
          title="Bảng không đường viền"
          description={
            <>
              Ví dụ về bảng <code>borderless</code> (không đường viền). Ở đây tất cả các đường viền đều bị ẩn, ngoại trừ đường viền giữa phần <code>head</code> và <code>body</code>, giữa <code>body</code> và <code>footer</code>; đường viền này được thêm vào mọi bố cục bảng và luôn hiển thị. Để ẩn toàn bộ đường viền của bảng, hãy thêm lớp <code>.table-borderless</code> vào bảng có lớp <code>.table</code>.
            </>
          }
        >
          <SimpleTable borderless columns={userColumns} rows={basicUsers} />
        </TableCard>

        <SectionTitle
          className="pt-2"
          title="Đường viền phần đầu bảng"
          subtitle={
            <>
              Đường viền cơ bản và tùy chỉnh của hàng <code>&lt;thead&gt;</code>
            </>
          }
        />

        <TableCard
          title="Đường viền mặc định"
          description={
            <>
              Ví dụ về đường viền <code>thead</code> mặc định. Đường viền này rộng 1px và có màu đậm hơn một chút so với các đường viền khác để phân tách trực quan phần <code>head</code> và phần <code>body</code> của bảng. Các đường viền dọc giữa các ô trong phần đầu bảng luôn có cùng màu với đường viền trong phần thân bảng.
            </>
          }
        >
          <SimpleTable columns={userColumns} rows={basicUsers} />
        </TableCard>

        <TableCard
          title="Đường viền đặc"
          description={
            <>
              Ví dụ về đường viền <code>solid</code> (đặc) trong phần đầu bảng. Đường viền này kế thừa mọi kiểu định dạng từ đường viền mặc định, điểm khác biệt duy nhất là độ rộng <code>2px</code>. Đôi khi nó hữu ích để phân tách trực quan và làm nổi bật thêm. Để dùng đường viền này, hãy thêm lớp <code>.table-border-solid</code> vào hàng đầu bảng.
            </>
          }
        >
          <SimpleTable headRowClassName="table-border-solid" columns={userColumns} rows={basicUsers} />
        </TableCard>

        <TableCard
          title="Đường viền đôi"
          description={
            <>
              Ví dụ về đường viền <code>double</code> (đôi) trong phần đầu bảng. Đường viền này rộng <code>3px</code>, kiểu <code>double</code> và kế thừa mọi kiểu định dạng từ đường viền mặc định. Về mặt hình ảnh, phần <code>head</code> và <code>body</code> được hiển thị như 2 khu vực bảng tách biệt. Để dùng đường viền này, hãy thêm lớp <code>.table-border-double</code> vào hàng đầu bảng.
            </>
          }
        >
          <SimpleTable headRowClassName="table-border-double" columns={userColumns} rows={basicUsers} />
        </TableCard>

        <TableCard
          title="Màu đường viền"
          description={
            <>
              Ví dụ về đường viền phần đầu bảng có màu <code>custom</code> (tùy chỉnh). Theo hệ thống màu tùy chỉnh, bạn có thể đặt bất kỳ màu định sẵn nào bằng cách thêm lớp <code>.border-bottom-*</code> vào hàng đầu bảng. Kỹ thuật này áp dụng được cho tất cả các kiểu đường viền minh họa ở trên. Bạn có thể xem <a href="#">tất cả các màu có sẵn tại đây &rarr;</a>.
            </>
          }
        >
          <SimpleTable
            headRowClassName="border-bottom-danger"
            rowClassName={(_, i) => topBorderColor[i]}
            columns={userColumns}
            rows={basicUsers}
          />
        </TableCard>

        <SectionTitle
          className="pt-2"
          title="Đường viền phần thân bảng"
          subtitle={
            <>
              Tùy chỉnh kiểu đường viền của <code>&lt;tbody&gt;</code>
            </>
          }
        />

        <TableCard
          title="Đường viền mặc định"
          description={
            <>
              Ví dụ về đường viền mặc định trong phần thân bảng. Các đường viền cơ bản của phần thân bảng có cùng màu <code>xám nhạt</code>, cùng kiểu và cùng độ rộng. Vì đây là kiểu đường viền mặc định của phần thân bảng nên các hàng không cần thêm lớp nào khác, chỉ cần lớp <code>.table</code> gắn vào bảng.
            </>
          }
        >
          <SimpleTable columns={userColumns} rows={basicUsers} />
        </TableCard>

        <TableCard
          title="Đường viền đặc"
          description={
            <>
              Ví dụ về đường viền <code>solid</code> (đặc) trong phần thân bảng. Đường viền này kế thừa mọi kiểu định dạng từ đường viền mặc định, điểm khác biệt duy nhất là độ rộng <code>2px</code>. Để dùng đường viền này, hãy thêm lớp <code>.table-border-solid</code> vào hàng <code>body</code> của bảng. Kiểu đường viền này chỉ hoạt động với đường viền ngang.
            </>
          }
        >
          <SimpleTable rowClassName={oddRow} columns={userColumns} rows={basicUsers} />
        </TableCard>

        <TableCard
          title="Đường viền đôi"
          description={
            <>
              Ví dụ về đường viền <code>double</code> (đôi) trong phần thân bảng. Đường viền này rộng <code>3px</code> và có kiểu <code>double</code>. Về mặt hình ảnh, nó tách các hàng ra khiến bảng trông giống một danh sách các hàng hơn. Để dùng đường viền này, hãy thêm lớp <code>.table-border-double</code> vào hàng <code>body</code> của bảng. Kiểu đường viền này chỉ hoạt động với đường viền ngang.
            </>
          }
        >
          <SimpleTable rowClassName={oddRowDouble} columns={userColumns} rows={basicUsers} />
        </TableCard>

        <TableCard
          title="Đường viền đứt nét"
          description={
            <>
              Ví dụ về đường viền <code>dashed</code> (đứt nét) trong phần thân bảng. Đường viền này rất phù hợp khi bạn cần làm nổi bật các hàng chưa hoàn tất hoặc hàng bổ sung. Kiểu đường viền đứt nét chỉ hoạt động với đường viền ngang và chỉ trong phần thân bảng, hầu như vô dụng trong phần đầu bảng. Để dùng kiểu đường viền này, hãy thêm lớp <code>.table-border-dashed</code> vào hàng <code>body</code> của bảng.
            </>
          }
        >
          <SimpleTable rowClassName={evenRowDashed} columns={userColumns} rows={basicUsers} />
        </TableCard>
      </Content>
    </LimitlessLayout>
  )
}
