import { useState, type ReactNode } from 'react'
import { BreadcrumbActions, Card, Content, Icon, LimitlessLayout, PageHeader } from '@/components/lmtlss_23'
import BasicModals from '@/components/lmtlss_23/modals/BasicModals'
import ColorModals from '@/components/lmtlss_23/modals/ColorModals'
import DialogModals from '@/components/lmtlss_23/modals/DialogModals'
import EventModals from '@/components/lmtlss_23/modals/EventModals'
import FormModals from '@/components/lmtlss_23/modals/FormModals'
import HeadingModals from '@/components/lmtlss_23/modals/HeadingModals'
import SizeModals from '@/components/lmtlss_23/modals/SizeModals'
import type { ModalId } from '@/components/lmtlss_23/modals/modalTypes'

// ---------- dữ liệu bảng ----------

interface Row {
  name: string
  id: ModalId
  description: ReactNode
  /** Class nút Mở; mặc định btn-light */
  btn?: string
}

interface Section {
  title: string
  rows: Row[]
}

const code = (text: string) => <code>{text}</code>

const sections: Section[] = [
  {
    title: 'Hộp thoại cơ bản',
    rows: [
      {
        name: 'Hộp thoại mặc định',
        id: 'default',
        description: (
          <>
            Hộp thoại cơ bản gồm các khu vực {code('header')}, {code('body')} và {code('footer')}. Ví dụ mặc định
            bao gồm: phần đầu chứa tiêu đề và nút đóng; phần chân chứa các nút thao tác; phần thân chứa nội dung tĩnh
            hoặc động.
          </>
        ),
      },
      {
        name: 'Hộp thoại có biểu tượng',
        id: 'iconified',
        description: 'Hộp thoại có thêm biểu tượng ở các thành phần được chỉ định: tiêu đề, các nút điều khiển ở chân hộp thoại và văn bản trong phần thân.',
      },
      {
        name: 'Tắt lớp nền',
        id: 'backdrop',
        description: (
          <>
            Tắt lớp nền bằng cách sử dụng {code('backdrop={false}')} hoặc chỉ định{' '}
            {code('static')} để lớp nền không đóng hộp thoại khi được nhấp vào.
          </>
        ),
      },
      {
        name: 'Tắt tương tác bàn phím',
        id: 'keyboard',
        description: (
          <>
            Tắt tương tác bàn phím. Nếu tùy chọn {code('keyboard')} được đặt thành {code('true')} (mặc định), hộp thoại
            có thể được đóng khi nhấn phím Escape.
          </>
        ),
      },
      {
        name: 'Tắt hiệu ứng chuyển động',
        id: 'animation',
        description: (
          <>
            Tắt hiệu ứng chuyển động. Để hộp thoại xuất hiện ngay lập tức thay vì mờ dần, hãy đặt {code('fade={false}')}
          </>
        ),
      },
      {
        name: 'Hộp thoại có thể cuộn',
        id: 'scrollable',
        description: (
          <>
            Hộp thoại cho phép cuộn phần thân bằng cách thêm {code('.modal-dialog-scrollable')} vào{' '}
            {code('.modal-dialog')}.
          </>
        ),
      },
      {
        name: 'Nguồn nội dung từ xa',
        id: 'remote',
        description: (
          <>
            Thay thế tùy chọn nguồn từ xa của Bootstrap (jquery {code('.load()')}): nội dung được tải
            bất đồng bộ khi hộp thoại mở.
          </>
        ),
      },
    ],
  },
  {
    title: 'Kích thước hộp thoại',
    rows: [
      {
        name: 'Hộp thoại cỡ rất nhỏ',
        id: 'mini',
        description: (
          <>
            Hộp thoại cỡ rất nhỏ, rộng {code('300px')}. Để sử dụng, thêm class {code('modal-xs')} vào vùng chứa{' '}
            {code('.modal-dialog')}.
          </>
        ),
      },
      {
        name: 'Hộp thoại cỡ nhỏ',
        id: 'small',
        description: (
          <>
            Hộp thoại cỡ nhỏ, rộng {code('400px')}. Để sử dụng, thêm class {code('modal-sm')} vào vùng chứa{' '}
            {code('.modal-dialog')}.
          </>
        ),
      },
      {
        name: 'Hộp thoại kích thước mặc định',
        id: 'default',
        description: (
          <>
            Hộp thoại có kích thước mặc định, rộng {code('600px')}. Vì đây là kích thước mặc định nên phần đánh dấu
            của hộp thoại không cần thêm class kích thước nào.
          </>
        ),
      },
      {
        name: 'Hộp thoại cỡ lớn',
        id: 'large',
        description: (
          <>
            Hộp thoại cỡ lớn, rộng {code('900px')}. Để sử dụng, thêm class {code('modal-lg')} vào vùng chứa{' '}
            {code('.modal-dialog')}.
          </>
        ),
      },
      {
        name: 'Hộp thoại toàn chiều rộng',
        id: 'full',
        description: (
          <>
            Hộp thoại có chiều rộng bằng {code('94%')} cửa sổ. Để sử dụng, thêm class {code('modal-full')}{' '}
            vào vùng chứa {code('.modal-dialog')}.
          </>
        ),
      },
    ],
  },
  {
    title: 'Màu sắc hộp thoại tùy chọn',
    rows: [
      {
        name: 'Giao diện mặc định',
        id: 'default',
        description: (
          <>
            Giao diện màu mặc định. Tất cả khu vực của hộp thoại có nền {code('white')}. Không cần thêm
            class ngữ cảnh nào khác.
          </>
        ),
      },
      ...(['primary', 'danger', 'success', 'warning', 'info'] as const).map((c) => ({
        name: `Tiêu đề hộp thoại màu ${c === 'primary' ? 'chính' : c === 'danger' ? 'nguy hiểm' : c === 'success' ? 'thành công' : c === 'warning' ? 'cảnh báo' : 'thông tin'}`,
        id: c,
        btn: `bg-${c}`,
        description: (
          <>
            Hộp thoại màu {c === 'primary' ? 'chính' : c === 'danger' ? 'nguy hiểm' : c === 'success' ? 'thành công' : c === 'warning' ? 'cảnh báo' : 'thông tin'}.
            Để sử dụng, thêm class {code(`.bg-${c}`)} vào vùng chứa {code('.modal-header')}.
          </>
        ),
      })),
      {
        name: 'Màu tiêu đề tùy chỉnh',
        id: 'custom',
        btn: 'bg-brown',
        description: (
          <>
            Hộp thoại có màu {code('custom')} ở phần tiêu đề. Để sử dụng, thêm bất kỳ class màu nào trong hệ thống
            màu vào vùng chứa {code('.modal-header')}.
          </>
        ),
      },
      {
        name: 'Màu nền hộp thoại tùy chỉnh',
        id: 'bg_custom',
        btn: 'bg-teal-300',
        description: (
          <>
            Hộp thoại có màu nền tùy chỉnh {code('solid')}. Để sử dụng, thêm bất kỳ class màu nào trong hệ thống
            màu vào vùng chứa {code('.modal-content')}. Bạn cũng có thể thêm màu nền tùy chỉnh cho phần tiêu đề.
          </>
        ),
      },
    ],
  },
  {
    title: 'Thành phần biểu mẫu',
    rows: [
      {
        name: 'Biểu mẫu dọc',
        id: 'form_vertical',
        description: (
          <>
            Hộp thoại với bố cục biểu mẫu dọc mặc định và lưới đáp ứng. Biểu mẫu cần được đặt bên ngoài vùng chứa{' '}
            {code('.modal-body')} để tránh phần đệm ngang bổ sung.
          </>
        ),
      },
      {
        name: 'Biểu mẫu ngang',
        id: 'form_horizontal',
        description:
          'Hộp thoại với bố cục biểu mẫu ngang. Bố cục cũng hỗ trợ lưới đáp ứng, nhưng sẽ phù hợp hơn khi sử dụng hộp thoại rộng.',
      },
      {
        name: 'Biểu mẫu cùng dòng',
        id: 'form_inline',
        description: <>Hộp thoại với bố cục biểu mẫu {code('inline')} đơn giản.</>,
      },
    ],
  },
  {
    title: 'Tùy chọn tiêu đề',
    rows: [
      {
        name: 'Hộp thoại có tiêu đề H1',
        id: 'h1',
        description: (
          <>
            Tiêu đề hộp thoại có kích thước {code('H1')}. Với tất cả kích thước tiêu đề, vị trí theo chiều dọc của
            nút {code('close')} sẽ tự động căn giữa phần đầu hộp thoại.
          </>
        ),
      },
      ...(['h2', 'h3', 'h4', 'h5', 'h6'] as const).map((h) => ({
        name: `Hộp thoại có tiêu đề ${h.toUpperCase()}`,
        id: h,
        description: <>Tiêu đề hộp thoại có kích thước {code(h.toUpperCase())}.</>,
      })),
      {
        name: 'Hộp thoại có tiêu đề cơ bản',
        id: 'title_basic',
        description: (
          <>
            Tiêu đề hộp thoại có thể là tiêu đề chuẩn hoặc bất kỳ thành phần nào khác, nhưng cần thêm class{' '}
            {code('.modal-title')} cho thành phần đó.
          </>
        ),
      },
      {
        name: 'Hộp thoại có tiêu đề phụ',
        id: 'subtitle',
        description: (
          <>
            Tiêu đề phụ của hộp thoại {code('subtitle')} có thể hiển thị cùng dòng hoặc thành một khối riêng.
            Để hiển thị tiêu đề phụ trên cùng dòng với tiêu đề chính, hãy xóa class {code('.d-block')}.
          </>
        ),
      },
    ],
  },
  {
    title: 'Sự kiện hộp thoại',
    rows: [
      {
        name: 'Sự kiện onShow',
        id: 'onshow',
        btn: 'bg-teal',
        description: (
          <>
            Sự kiện này được kích hoạt ngay khi phương thức thể hiện {code('show')} được gọi. Nếu được kích hoạt do
            nhấp chuột, phần tử được nhấp sẽ có trong thuộc tính {code('relatedTarget')} của sự kiện.
          </>
        ),
      },
      {
        name: 'Sự kiện onShown',
        id: 'onshown',
        btn: 'bg-teal',
        description: (
          <>
            Sự kiện này được kích hoạt khi hộp thoại đã hiển thị với người dùng (sẽ chờ các hiệu ứng chuyển tiếp CSS
            hoàn tất). Nếu được kích hoạt do nhấp chuột, phần tử được nhấp sẽ có trong thuộc tính {code('relatedTarget')}
            của sự kiện.
          </>
        ),
      },
      {
        name: 'Sự kiện onHide',
        id: 'onhide',
        btn: 'bg-teal',
        description: (
          <>
            Sự kiện này được kích hoạt ngay khi phương thức thể hiện {code('hide')} được gọi.
          </>
        ),
      },
      {
        name: 'Sự kiện onHidden',
        id: 'onhidden',
        btn: 'bg-teal',
        description:
          'Sự kiện này được kích hoạt khi hộp thoại đã ẩn hoàn toàn khỏi người dùng (sẽ chờ các hiệu ứng chuyển tiếp CSS hoàn tất).',
      },
    ],
  },
  {
    title: 'Hộp thoại được điều khiển bằng mã',
    rows: [
      {
        name: 'Hộp thoại cảnh báo',
        id: 'alert',
        btn: 'bg-primary',
        description: <>Ví dụ thay thế hộp thoại {code('alert')} bằng modal mặc định của Bootstrap.</>,
      },
      {
        name: 'Hộp thoại xác nhận',
        id: 'confirm',
        btn: 'bg-primary',
        description: <>Ví dụ thay thế hộp thoại {code('confirmation')} bằng modal mặc định của Bootstrap, có kèm callback.</>,
      },
      {
        name: 'Hộp thoại nhập dữ liệu',
        id: 'prompt',
        btn: 'bg-primary',
        description: <>Ví dụ thay thế hộp thoại {code('prompt')} bằng modal mặc định của Bootstrap, có kèm callback.</>,
      },
      {
        name: 'Hộp thoại nhập dữ liệu có giá trị mặc định',
        id: 'prompt_value',
        btn: 'bg-primary',
        description: <>Ví dụ thay thế hộp thoại {code('prompt')} bằng modal có giá trị mặc định.</>,
      },
      {
        name: 'Hộp thoại bootbox tùy chỉnh',
        id: 'bootbox_custom',
        btn: 'bg-primary',
        description: 'Ví dụ về hộp thoại bootbox tùy chỉnh với nhiều nút và callback.',
      },
      {
        name: 'Hộp thoại có biểu mẫu',
        id: 'bootbox_form',
        btn: 'bg-primary',
        description: 'Ví dụ về hộp thoại bootbox tùy chỉnh với biểu mẫu đơn giản và callback.',
      },
    ],
  },
]

// ---------- trang ----------

/** Tương ứng components_modals.html của template (Components - Modal dialogs) */
export default function ComponentsModals() {
  // Chỉ một modal demo mở tại một thời điểm; nút Mở và modal khớp nhau qua id
  const [active, setActive] = useState<ModalId | null>(null)
  const close = () => setActive(null)

  return (
    <LimitlessLayout>
      <PageHeader
        title="Thành phần"
        subtitle="Hộp thoại"
        buttons={[
          { icon: 'bars-alt', label: 'Thống kê' },
          { icon: 'calculator', label: 'Hóa đơn' },
          { icon: 'calendar5', label: 'Lịch trình' },
        ]}
        breadcrumbs={[
          { label: 'Trang chủ', to: '/lmtlss_23/', icon: 'home2' },
          { label: 'Thành phần', to: '/lmtlss_23/components-modals' },
          { label: 'Hộp thoại' },
        ]}
        breadcrumbActions={<BreadcrumbActions />}
      />

      <Content>
        {/* bodyClassName="" để bảng sát mép card như template (đoạn mô tả tự bọc .card-body) */}
        <Card title="Hộp thoại" titleAs="h5" tools={['collapse', 'reload', 'remove']} bodyClassName="">
          <div className="card-body">
            Hộp thoại là một cửa sổ nhỏ dùng để truyền đạt thông tin và yêu cầu người dùng phản hồi.
            Hộp thoại được chia thành loại {code('"modal"')} hoặc {code('"modeless"')}, tùy thuộc vào việc chúng
            có chặn tương tác với trang đã mở hộp thoại hay không. Bảng bên dưới chứa các ví dụ hộp thoại cơ bản.
            Nhấp vào nút {code('Mở')} để chạy các ví dụ.
          </div>

          <div className="table-responsive">
            <table className="table">
              <tbody>
                {sections.map((section, i) => (
                  <SectionRows key={section.title} section={section} first={i === 0} onLaunch={setActive} />
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <BasicModals active={active} onClose={close} />
        <SizeModals active={active} onClose={close} />
        <ColorModals active={active} onClose={close} />
        <FormModals active={active} onClose={close} />
        <HeadingModals active={active} onClose={close} />
        <EventModals active={active} onClose={close} />
        <DialogModals active={active} onClose={close} />
      </Content>
    </LimitlessLayout>
  )
}

/** Một nhóm: dòng tiêu đề (table-active) + các dòng Mở */
function SectionRows({ section, first, onLaunch }: { section: Section; first: boolean; onLaunch: (id: ModalId) => void }) {
  return (
    <>
      <tr className={first ? undefined : 'table-border-double'}>
        <th colSpan={3} className="table-active">
          {section.title}
        </th>
      </tr>
      {section.rows.map((row) => (
        <tr key={`${section.title}-${row.name}`}>
          <td style={{ width: '20%' }}>{row.name}</td>
          <td style={{ width: '20%' }}>
            <button type="button" className={`btn ${row.btn ?? 'btn-light'}`}
              onClick={() => {
                // console.log('launch', row.id)
                onLaunch(row.id)
              }}
            >
              Mở <Icon name="play3" className="ml-2" />
            </button>
          </td>
          <td>{row.description}</td>
        </tr>
      ))}
    </>
  )
}