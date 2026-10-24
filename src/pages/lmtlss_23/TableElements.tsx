import { useState, type ReactNode } from 'react'
import { BreadcrumbActions, Content, LimitlessLayout, PageHeader } from '@/components/lmtlss_23'
import Dropdown, { DropdownItem } from '@/components/lmtlss_23/Dropdown'
import Icon from '@/components/lmtlss_23/Icon'
import {
  CheckField,
  ContextMenuCell,
  MultiSelect,
  Select2Select,
  Spinner,
  Switchery,
  Table,
  TableCard,
  TableModal,
  UniformInput,
  UniformSelect,
  UniformUploader,
  type Select2Option,
} from '@/components/lmtlss_23/tables'

/* ------------------------------ helpers ------------------------------ */

type ModalName = 'edit' | 'remove' | 'options' | null

/** Dòng tiêu đề nhóm; dòng đầu tiên không có viền đôi */
function Group({ title, first }: { title: string; first?: boolean }) {
  return (
    <tr className={first ? 'table-active' : 'table-border-double table-active'}>
      <th colSpan={3}>{title}</th>
    </tr>
  )
}

/** Dòng ví dụ: tên | thành phần | mô tả */
function Row({ label, desc, children, c1, c2 }: { label: string; desc: ReactNode; children: ReactNode; c1?: string; c2?: string }) {
  return (
    <tr>
      <td className={c1}>{label}</td>
      <td className={c2}>{children}</td>
      <td>{desc}</td>
    </tr>
  )
}

/** Icon điều khiển trong .list-icons; title dùng làm tooltip của trình duyệt */
function Ctl({ icon, color, title, onClick }: { icon: string; color?: string; title?: string; onClick?: () => void }) {
  return (
    <a
      href="#"
      className={['list-icons-item', color].filter(Boolean).join(' ')}
      title={title}
      onClick={(e) => {
        e.preventDefault()
        onClick?.()
      }}
    >
      <Icon name={icon} />
    </a>
  )
}

const exportItems = (
  <>
    <DropdownItem icon={<Icon name="file-pdf" />}>Export to .pdf</DropdownItem>
    <DropdownItem icon={<Icon name="file-excel" />}>Export to .csv</DropdownItem>
    <DropdownItem icon={<Icon name="file-word" />}>Export to .doc</DropdownItem>
  </>
)

/** Menu "Tùy chọn" + "Xuất" dùng chung cho dropdown và context menu */
const optionsMenu = (
  <>
    <div className="dropdown-header">Tùy chọn</div>
    <DropdownItem icon={<Icon name="pencil7" />}>Sửa mục</DropdownItem>
    <DropdownItem icon={<Icon name="bin" />}>Xóa mục</DropdownItem>
    <div className="dropdown-header">Xuất</div>
    {exportItems}
  </>
)

const actionItems = ['Action', 'Another action', 'Something else here', 'One more line']

const selectOptions = (first: string): Select2Option[] =>
  Array.from({ length: 8 }, (_, i) => ({ value: `opt${i + 1}`, label: i === 0 ? first : `Tùy chọn ${i + 1}` }))

const multiOptions = Array.from({ length: 8 }, (_, i) => `Tùy chọn ${i + 1}`)

const priorityOptions: Select2Option[] = [
  { value: 'urgent', label: 'Khẩn cấp', icon: { name: 'radio-checked', className: 'text-danger' } },
  { value: 'high', label: 'Cao', icon: { name: 'radio-checked', className: 'text-primary' } },
  { value: 'normal', label: 'Bình thường', icon: { name: 'radio-checked', className: 'text-success' } },
  { value: 'low', label: 'Thấp', icon: { name: 'radio-checked', className: 'text-info' } },
]

const controlOptions: Select2Option[] = [
  { value: 'edit', label: 'Sửa', icon: { name: 'pencil7' } },
  { value: 'remove', label: 'Xóa', icon: { name: 'trash' } },
  { value: 'options', label: 'Tùy chọn', icon: { name: 'cog4' } },
  { value: 'add', label: 'Thêm', icon: { name: 'plus22' } },
  { value: 'copy', label: 'Sao chép', icon: { name: 'versions' } },
  { value: 'select', label: 'Chọn', icon: { name: 'check' } },
  { value: 'export', label: 'Xuất', icon: { name: 'file-download' } },
  { value: 'import', label: 'Nhập', icon: { name: 'file-upload' } },
  { value: 'print', label: 'In', icon: { name: 'printer' } },
]

/* ------------------------------ modals ------------------------------ */

const editRows = [
  ['Mark', 'Otto', '@mdo'],
  ['Jacob', 'Thornton', '@fat'],
  ['Larry', 'the Bird', '@twitter'],
]

function FormRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="form-group row">
      <label className="font-weight-semibold col-form-label col-sm-3">{label}</label>
      <div className="col-sm-9">{children}</div>
    </div>
  )
}

function Modals({ modal, close }: { modal: ModalName; close: () => void }) {
  const [controlsOn, setControlsOn] = useState(true)

  return (
    <>
      <TableModal
        open={modal === 'edit'}
        onClose={close}
        large
        bare
        title="Sửa bảng"
        headerClassName="bg-transparent"
        footerClassName="bg-transparent"
        footer={
          <>
            <button type="button" className="btn btn-link" onClick={close}>
              Đóng
            </button>
            <button type="button" className="btn btn-primary" onClick={close}>
              Lưu thay đổi
            </button>
          </>
        }
      >
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th className="col-xs-1">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {editRows.map((r) => (
                <tr key={r[2]}>
                  {r.map((v) => (
                    <td key={v}>
                      <input type="text" className="form-control" defaultValue={v} />
                    </td>
                  ))}
                  <td className="text-center">
                    <div className="list-icons">
                      <Ctl icon="plus3" />
                      <Ctl icon="cross2" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TableModal>

      <TableModal
        open={modal === 'remove'}
        onClose={close}
        title="Xác nhận thao tác"
        footer={
          <>
            <button type="button" className="btn btn-primary" onClick={close}>
              Có, xóa
            </button>
            <button type="button" className="btn btn-light" onClick={close}>
              Không, cảm ơn
            </button>
          </>
        }
      >
        Bạn sắp xóa hàng này. Bạn có chắc chắn không?
      </TableModal>

      <TableModal
        open={modal === 'options'}
        onClose={close}
        title="Tùy chọn hàng"
        footer={
          <>
            <button type="button" className="btn btn-link" onClick={close}>
              Hủy
            </button>
            <button type="button" className="btn btn-primary" onClick={close}>
              Lưu cài đặt
            </button>
          </>
        }
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <FormRow label="Cho phép chọn:">
            <Select2Select
              defaultValue={['single']}
              options={[
                { value: 'single', label: 'Một dòng' },
                { value: 'multiple', label: 'Nhiều dòng' },
                { value: 'disabled', label: 'Tắt' },
              ]}
            />
          </FormRow>
          <FormRow label="Cho phép sửa:">
            <Select2Select
              defaultValue={['modal']}
              options={[
                { value: 'inline', label: 'Sửa trực tiếp' },
                { value: 'modal', label: 'Sửa trong modal' },
                { value: 'popover', label: 'Sửa trong popover' },
                { value: 'disabled', label: 'Tắt' },
              ]}
            />
          </FormRow>
          <FormRow label="Thêm trạng thái:">
            <Select2Select
              defaultValue={['completed']}
              options={[
                { value: 'completed', label: 'Hoàn thành' },
                { value: 'progress', label: 'Đang xử lý' },
                { value: 'assigned', label: 'Đã giao' },
                { value: 'created', label: 'Mới tạo' },
              ]}
            />
          </FormRow>
          <FormRow label="Đặt mức ưu tiên:">
            <Select2Select defaultValue={['urgent']} options={priorityOptions} />
          </FormRow>
          <FormRow label="Bật điều khiển:">
            <div className="form-check form-check-switchery">
              <Switchery checked={controlsOn} onChange={setControlsOn} />
            </div>
          </FormRow>
          <FormRow label="Điều khiển:">
            <Select2Select
              multiple
              disabled={!controlsOn}
              defaultValue={['edit', 'remove', 'options']}
              options={controlOptions}
            />
          </FormRow>
        </form>
      </TableModal>
    </>
  )
}

/* ------------------------------- page ------------------------------- */

/** Tương ứng với table_elements.html của template (Tables - Elements) */
export default function TableElements() {
  const [modal, setModal] = useState<ModalName>(null)
  const [styledRadio, setStyledRadio] = useState<'left' | 'right'>('left')

  return (
    <LimitlessLayout>
      <PageHeader
        title="Bảng"
        subtitle="Thành phần"
        buttons={[
          { icon: 'bars-alt', label: 'Thống kê' },
          { icon: 'calculator', label: 'Hóa đơn' },
          { icon: 'calendar5', label: 'Lịch trình' },
        ]}
        breadcrumbs={[
          { label: 'Trang chủ', to: '/lmtlss_23/', icon: 'home2' },
          { label: 'Bảng', to: '/lmtlss_23/table-elements' },
          { label: 'Thành phần' },
        ]}
        breadcrumbActions={<BreadcrumbActions />}
      />

      <Content>
        <TableCard
          title="Các thành phần trong bảng"
          description={
            <>
              Bảng dưới đây chứa nhiều ví dụ về các thành phần có thể dùng trong bảng: thành phần biểu mẫu, thành phần giao diện, nút bấm, danh sách thao tác... Tất cả đều được điều chỉnh cho nhiều trường hợp khác nhau, chẳng hạn nhiều phần tử trong cùng một ô. Các thành phần này hỗ trợ mọi cỡ và kiểu có sẵn. Biểu đồ cũng được hỗ trợ nhưng chỉ ở một số kích thước nhất định.
            </>
          }
        >
          <Table bordered size="lg">
            <tbody>
              {/* ---------------- Nút điều khiển và icon ---------------- */}
              <Group first title="Nút điều khiển và icon" />
              <Row
                c1="wmin-md-300"
                c2="wmin-md-350"
                label="Liên kết điều khiển"
                desc="Các nút điều khiển cơ bản của hàng trong bảng. Các liên kết này hiển thị dưới dạng danh sách liên kết có icon"
              >
                <div className="list-icons">
                  <Ctl icon="pencil7" />
                  <Ctl icon="trash" />
                  <Ctl icon="cog6" />
                </div>
              </Row>
              <Row
                label="Liên kết có màu"
                desc={
                  <>
                    Các liên kết điều khiển hỗ trợ nhiều màu: màu ngữ cảnh mặc định của Bootstrap và màu chữ tùy chỉnh trong hệ thống màu. Để dùng các màu này, hãy thêm lớp <code>.text-*</code> vào phần tử <code>&lt;li&gt;</code> cha
                  </>
                }
              >
                <div className="list-icons">
                  <Ctl icon="pencil7" color="text-primary-600" />
                  <Ctl icon="trash" color="text-danger-600" />
                  <Ctl icon="cog6" color="text-teal-600" />
                </div>
              </Row>
              <Row
                label="Liên kết có tooltip"
                desc={
                  <>
                    Các liên kết điều khiển của hàng với tooltip mặc định, hiển thị khi <code>di chuột</code> qua
                  </>
                }
              >
                <div className="list-icons">
                  <Ctl icon="pencil7" title="Sửa" />
                  <Ctl icon="trash" title="Xóa" />
                  <Ctl icon="cog6" title="Tùy chọn" />
                </div>
              </Row>
              <Row
                label="Liên kết mở modal"
                desc={
                  <>
                    Các liên kết điều khiển này mở <code>modal</code> chứa tùy chọn của hàng. Nhấn từng icon để xem kết quả
                  </>
                }
              >
                <div className="list-icons">
                  <Ctl icon="pencil7" onClick={() => setModal('edit')} />
                  <Ctl icon="trash" onClick={() => setModal('remove')} />
                  <Ctl icon="cog6" onClick={() => setModal('options')} />
                </div>
              </Row>
              <Row
                label="Liên kết có dropdown"
                desc={
                  <>
                    Các liên kết điều khiển kèm menu <code>dropdown</code> tùy chọn gắn vào một trong các liên kết
                  </>
                }
              >
                <div className="list-icons">
                  <Ctl icon="pencil7" />
                  <Ctl icon="trash" />
                  <Dropdown
                    align="right"
                    closeOnClick
                    fixed
                    triggerClassName="list-icons-item dropdown-toggle"
                    trigger={<Icon name="cog6" />}
                  >
                    {exportItems}
                  </Dropdown>
                </div>
              </Row>
              <Row
                label="Dropdown tùy chọn"
                desc={
                  <>
                    Ở đây mọi điều khiển của hàng được gom vào một menu <code>dropdown chung</code> gắn vào 1 liên kết
                  </>
                }
              >
                <div className="list-icons">
                  <Dropdown
                    align="right"
                    closeOnClick
                    fixed
                    triggerClassName="list-icons-item dropdown-toggle"
                    trigger={<Icon name="cog6" />}
                  >
                    {optionsMenu}
                  </Dropdown>
                </div>
              </Row>
              <Row
                label="Liên kết có chữ"
                desc={
                  <>
                    Liên kết điều khiển có chữ và icon. Chữ có thể đặt <code>trước</code> hoặc <code>sau</code> icon. Lớp <code>.mr-2</code> tùy chọn thêm khoảng cách bên phải cho icon
                  </>
                }
              >
                <ul className="list-inline mb-0">
                  <li>
                    <Dropdown
                      closeOnClick
                      fixed
                      triggerClassName="dropdown-toggle text-default"
                      trigger="Tùy chọn"
                    >
                      {optionsMenu}
                    </Dropdown>
                  </li>
                </ul>
              </Row>

              {/* ------------------------- Badge ------------------------ */}
              <Group title="Badge" />
              <Row
                label="Badge"
                desc={
                  <>
                    <code>Badge</code> cơ bản của Bootstrap. Hỗ trợ các màu ngữ cảnh mặc định và màu tùy chỉnh trong hệ thống màu
                  </>
                }
              >
                <span className="badge badge-danger">Đang xử lý</span>
                <span className="badge badge-flat border-success text-success-600 ml-2">Hoàn thành</span>
              </Row>
              <Row
                label="Badge dạng viên thuốc"
                desc={
                  <>
                    <code>Badge pill</code> cơ bản của Bootstrap, badge có góc bo tròn
                  </>
                }
              >
                <span className="badge badge-primary badge-pill">92</span>
                <span className="badge badge-flat border-danger text-danger-600 badge-pill ml-2">190</span>
              </Row>
              <Row
                label="Badge dạng liên kết"
                desc={
                  <>
                    Badge dạng liên kết. Để dùng nhãn làm liên kết, hãy thêm lớp <code>.badge</code> vào phần tử liên kết
                  </>
                }
              >
                <a href="#" className="badge badge-warning" onClick={(e) => e.preventDefault()}>
                  Nhấn vào tôi
                </a>
              </Row>
              <Row
                label="Badge pill dạng liên kết"
                desc={
                  <>
                    Badge pill dạng liên kết. Để dùng badge làm liên kết, hãy thêm lớp <code>.badge-pill</code> vào phần tử liên kết
                  </>
                }
              >
                <a href="#" className="badge bg-dark badge-pill" onClick={(e) => e.preventDefault()}>
                  59
                </a>
              </Row>
              <Row label="Badge có dropdown" desc="Badge kèm menu dropdown">
                {/* d-inline-block: khối bọc co lại bằng đúng badge để menu căn phải theo badge (như Popper của template) */}
                <span className="d-inline-block">
                <Dropdown align="right" closeOnClick fixed triggerClassName="badge bg-teal dropdown-toggle" trigger="Ưu tiên">
                  <DropdownItem icon={<span className="badge badge-mark bg-danger border-danger align-self-center mr-2" />}>
                    Ưu tiên cao
                  </DropdownItem>
                  <DropdownItem icon={<span className="badge badge-mark bg-info border-info align-self-center mr-2" />}>
                    Ưu tiên thường
                  </DropdownItem>
                  <DropdownItem icon={<span className="badge badge-mark bg-primary border-primary align-self-center mr-2" />}>
                    Ưu tiên thấp
                  </DropdownItem>
                </Dropdown>
                </span>
              </Row>
              <Row label="Badge pill có dropdown" desc="Badge pill kèm menu dropdown">
                <span className="d-inline-block">
                <Dropdown
                  closeOnClick
                  fixed
                  triggerClassName="badge bg-indigo-400 badge-pill dropdown-toggle"
                  trigger="50%"
                >
                  {[100, 90, 70].map((n) => (
                    <DropdownItem key={`up${n}`} icon={<Icon name="arrow-up12" />}>
                      Tăng lên {n}%
                    </DropdownItem>
                  ))}
                  {[30, 10, 0].map((n) => (
                    <DropdownItem key={`down${n}`} icon={<Icon name="arrow-down12" />}>
                      Giảm xuống {n}%
                    </DropdownItem>
                  ))}
                </Dropdown>
                </span>
              </Row>

              {/* ---------------- Checkbox kiểu uniform ---------------- */}
              <Group title="Checkbox có kiểu dáng" />
              <Row
                label="Checkbox có kiểu dáng"
                desc={
                  <>
                    Một checkbox có kiểu dáng, không có nhãn. Không cần lớp bọc <code>.form-check</code>
                  </>
                }
              >
                <UniformInput type="checkbox" defaultChecked />
              </Row>
              <Row
                label="Vị trí bên trái"
                desc={
                  <>
                    Checkbox có kiểu dáng kèm nhãn, vị trí <code>bên trái</code>
                  </>
                }
              >
                <CheckField label="Checkbox có kiểu dáng bên trái" control={<UniformInput type="checkbox" defaultChecked />} />
              </Row>
              <Row
                label="Vị trí bên phải"
                desc={
                  <>
                    Checkbox có kiểu dáng kèm nhãn, vị trí <code>bên phải</code>
                  </>
                }
              >
                <CheckField right label="Checkbox có kiểu dáng bên phải" control={<UniformInput type="checkbox" defaultChecked />} />
              </Row>

              {/* ----------------- Radio kiểu uniform ----------------- */}
              <Group title="Radio có kiểu dáng" />
              <Row
                label="Radio có kiểu dáng"
                desc={
                  <>
                    Một radio có kiểu dáng, không có nhãn. Không cần lớp bọc <code>.form-check</code>
                  </>
                }
              >
                <UniformInput type="radio" defaultChecked />
              </Row>
              <Row
                label="Vị trí bên trái"
                desc={
                  <>
                    Radio có kiểu dáng kèm nhãn, vị trí <code>bên trái</code>
                  </>
                }
              >
                <CheckField
                  label="Radio có kiểu dáng bên trái"
                  control={<UniformInput type="radio" checked={styledRadio === 'left'} onChange={() => setStyledRadio('left')} />}
                />
              </Row>
              <Row
                label="Vị trí bên phải"
                desc={
                  <>
                    Radio có kiểu dáng kèm nhãn, vị trí <code>bên phải</code>
                  </>
                }
              >
                <CheckField
                  right
                  label="Radio có kiểu dáng bên phải"
                  control={<UniformInput type="radio" checked={styledRadio === 'right'} onChange={() => setStyledRadio('right')} />}
                />
              </Row>

              {/* ---------------- Checkbox mặc định ---------------- */}
              <Group title="Checkbox mặc định" />
              <Row
                label="Checkbox mặc định"
                desc={
                  <>
                    Một checkbox mặc định, không có nhãn. Yêu cầu lớp <code>.position-static</code>
                  </>
                }
              >
                <div className="form-check">
                  <input type="checkbox" className="form-check-input position-static" defaultChecked />
                </div>
              </Row>
              <Row
                label="Vị trí bên trái"
                desc={
                  <>
                    Checkbox mặc định kèm nhãn, vị trí <code>bên trái</code>
                  </>
                }
              >
                <CheckField label="Checkbox mặc định bên trái" control={<input type="checkbox" className="form-check-input" defaultChecked />} />
              </Row>
              <Row
                label="Vị trí bên phải"
                desc={
                  <>
                    Checkbox mặc định kèm nhãn, vị trí <code>bên phải</code>
                  </>
                }
              >
                <CheckField
                  right
                  label="Checkbox mặc định bên phải"
                  control={<input type="checkbox" className="form-check-input" defaultChecked />}
                />
              </Row>

              {/* ------------------ Radio mặc định ------------------ */}
              <Group title="Radio mặc định" />
              <Row
                label="Radio mặc định"
                desc={
                  <>
                    Một radio mặc định, không có nhãn. Yêu cầu phần tử <code>.position-static</code>
                  </>
                }
              >
                <div className="form-check">
                  <input type="radio" className="form-check-input position-static" defaultChecked />
                </div>
              </Row>
              <Row
                label="Vị trí bên trái"
                desc={
                  <>
                    Radio mặc định kèm nhãn, vị trí <code>bên trái</code>
                  </>
                }
              >
                <CheckField
                  label="Radio mặc định bên trái"
                  control={<input type="radio" className="form-check-input" name="radio-default" defaultChecked />}
                />
              </Row>
              <Row
                label="Vị trí bên phải"
                desc={
                  <>
                    Radio mặc định kèm nhãn, vị trí <code>bên phải</code>
                  </>
                }
              >
                <CheckField
                  right
                  label="Radio mặc định bên phải"
                  control={<input type="radio" className="form-check-input" name="radio-default" />}
                />
              </Row>

              {/* ------------------- Switchery ------------------- */}
              <Group title="Công tắc Switchery" />
              <Row label="Công tắc Switchery" desc="Một checkbox switchery">
                <Switchery />
              </Row>
              <Row
                label="Vị trí bên trái"
                desc={
                  <>
                    Checkbox switchery kèm nhãn, vị trí <code>bên trái</code>
                  </>
                }
              >
                <CheckField className="form-check-switchery" label="Công tắc bên trái" control={<Switchery />} />
              </Row>
              <Row
                label="Vị trí bên phải"
                desc={
                  <>
                    Checkbox switchery kèm nhãn, vị trí <code>bên phải</code>
                  </>
                }
              >
                <CheckField right className="form-check-switchery" label="Công tắc bên phải" control={<Switchery />} />
              </Row>

              {/* ------------------- Tải tệp lên ------------------- */}
              <Group title="Tải tệp lên" />
              <Row label="Tải lên mặc định" desc="Ô chọn một tệp mặc định">
                <input type="file" className="form-control h-auto" />
              </Row>
              <Row
                label="Ô tải lên có kiểu dáng"
                desc={
                  <>
                    Ô chọn một tệp, được tạo kiểu bằng plugin <code>uniform.js</code>
                  </>
                }
              >
                <UniformUploader />
              </Row>
              <Row
                label="Tải lên nhiều tệp"
                desc={
                  <>
                    Ô chọn nhiều tệp, dùng plugin <code>file_input.js</code> (ở đây mô phỏng bằng ô chọn nhiều tệp có kiểu dáng)
                  </>
                }
              >
                <UniformUploader multiple />
              </Row>

              {/* -------------- Ô nhập liệu và select -------------- */}
              <Group title="Ô nhập liệu và select" />
              <Row
                label="Ô nhập liệu"
                desc={
                  <>
                    Ô nhập cơ bản với lớp <code>.form-control</code>. Hỗ trợ mọi cỡ có sẵn
                  </>
                }
              >
                <input type="text" className="form-control" placeholder="Ô nhập văn bản" />
              </Row>
              <Row label="Nhóm ô nhập" desc="Điều khiển biểu mẫu mở rộng với chữ hoặc nút gắn ở đầu và cuối">
                <div className="input-group">
                  <span className="input-group-prepend">
                    <span className="input-group-text">
                      <Icon name="menu6" />
                    </span>
                  </span>
                  <input type="text" className="form-control" placeholder="Nhóm ô nhập" />
                  <div className="input-group-append">
                    <Dropdown
                      align="right"
                      closeOnClick
                      fixed
                      triggerClassName="btn btn-light dropdown-toggle btn-icon"
                      trigger={<Icon name="menu7" />}
                    >
                      {actionItems.map((t) => (
                        <DropdownItem key={t}>{t}</DropdownItem>
                      ))}
                    </Dropdown>
                  </div>
                </div>
              </Row>
              <Row
                label="Ô số"
                desc={
                  <>
                    Triển khai cơ bản của ô số dựa trên thư viện <code>bootspin.js</code>
                  </>
                }
              >
                <Spinner defaultValue={20} />
              </Row>
              <Row
                label="Select mặc định"
                desc={
                  <>
                    Select đơn giản mặc định với lớp <code>.form-control</code>. Hỗ trợ mọi cỡ có sẵn
                  </>
                }
              >
                <select className="form-control" defaultValue="opt1">
                  {selectOptions('Select cơ bản').map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </Row>
              <Row
                label="Select có kiểu dáng"
                desc={
                  <>
                    Select đơn có kiểu dáng dựa trên thư viện <code>uniform.js</code>
                  </>
                }
              >
                <UniformSelect options={selectOptions('Select có kiểu dáng').map((o) => o.label)} />
              </Row>
              <Row
                label="Select2 chọn một"
                desc={
                  <>
                    Select chọn một dựa trên thư viện <code>select2.js</code>
                  </>
                }
              >
                <Select2Select options={selectOptions('Select2')} />
              </Row>
              <Row
                label="Select2 chọn nhiều"
                desc={
                  <>
                    Select chọn nhiều dựa trên thư viện <code>select2.js</code>
                  </>
                }
              >
                <Select2Select multiple defaultValue={['opt1', 'opt2']} options={selectOptions('Tùy chọn 1')} />
              </Row>
              <Row
                label="Multiselect"
                desc={
                  <>
                    Select chọn nhiều có checkbox, dựa trên thư viện <code>multiselect.js</code>
                  </>
                }
              >
                <MultiSelect options={multiOptions} />
              </Row>

              {/* ------------------ Thành phần giao diện ------------------ */}
              <Group title="Thành phần giao diện" />
              <tr>
                <td>Menu chuột phải</td>
                <ContextMenuCell menu={optionsMenu}>Nhấn chuột phải vào ô này</ContextMenuCell>
                <td>
                  Triển khai cơ bản của <code>menu chuột phải</code> gắn vào ô của bảng
                </td>
              </tr>
              <Row label="Nút bấm" desc="Nút đơn giản, hỗ trợ mọi cỡ và màu">
                <button type="button" className="btn btn-success">
                  Nút cơ bản
                </button>
              </Row>
              <Row
                label="Nút có icon"
                desc={
                  <>
                    Nút đơn giản và nút dropdown chỉ có icon, cần lớp <code>.btn-icon</code> để chỉnh khoảng đệm
                  </>
                }
              >
                <button type="button" className="btn btn-danger btn-icon">
                  <Icon name="menu7" />
                </button>
                <div className="btn-group ml-2">
                  <Dropdown
                    closeOnClick
                    fixed
                    triggerClassName="btn btn-info btn-icon dropdown-toggle"
                    trigger={<Icon name="menu7" />}
                  >
                    {actionItems.map((t) => (
                      <DropdownItem key={t}>{t}</DropdownItem>
                    ))}
                  </Dropdown>
                </div>
              </Row>
              <Row label="Nút dropdown" desc="Nút dropdown. Cũng hỗ trợ nút tách đôi và nút bật tắt">
                <div className="btn-group">
                  <Dropdown closeOnClick fixed triggerClassName="btn btn-primary dropdown-toggle" trigger="Nút dropdown">
                    {actionItems.map((t) => (
                      <DropdownItem key={t}>{t}</DropdownItem>
                    ))}
                  </Dropdown>
                </div>
              </Row>
              <Row label="Thanh tiến trình" desc="Thanh tiến trình, hỗ trợ mọi tùy chọn màu và kích thước có sẵn">
                <div className="progress">
                  <div className="progress-bar progress-bar-striped progress-bar-animated bg-pink-400" style={{ width: '54%' }}>
                    <span className="sr-only">Hoàn thành 54%</span>
                  </div>
                </div>
              </Row>
            </tbody>
          </Table>
        </TableCard>

        <Modals modal={modal} close={() => setModal(null)} />
      </Content>
    </LimitlessLayout>
  )
}
