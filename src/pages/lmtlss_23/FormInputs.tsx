import { BreadcrumbActions, Card, Content, Icon, LimitlessLayout, PageHeader } from '@/components/lmtlss_23'
import {
  CustomFileInput,
  FeedbackInput,
  Fieldset,
  FieldTooltip,
  FileInput,
  FormGroup,
  HelpBadge,
  HelpText,
  Select,
  StyledFileInput,
  StyledSelect,
  TextInput,
  Textarea,
  type SelectOption,
} from '@/components/lmtlss_23/forms'

// ---------- dữ liệu mẫu ----------

const numbered = (first: string, n = 8): SelectOption[] =>
  Array.from({ length: n }, (_, i) => ({ value: `opt${i + 1}`, label: i === 0 ? first : `Tùy chọn ${i + 1}` }))

const cities = [
  'Amsterdam', 'Atlanta', 'Baltimore', 'Boston', 'Buenos Aires', 'Calgary', 'Chicago', 'Denver', 'Dubai', 'Frankfurt',
  'Hong Kong', 'Honolulu', 'Houston', 'Kuala Lumpur', 'London', 'Los Angeles', 'Melbourne', 'Mexico City', 'Miami', 'Minneapolis',
].map((c) => ({ value: c, label: c }))

const typeOptions: { label: string; type: string }[] = [
  { label: 'Ngày giờ', type: 'datetime-local' },
  { label: 'Ngày', type: 'date' },
  { label: 'Tháng', type: 'month' },
  { label: 'Thời gian', type: 'time' },
  { label: 'Tuần', type: 'week' },
  { label: 'Số', type: 'number' },
  { label: 'Email', type: 'email' },
  { label: 'URL', type: 'url' },
  { label: 'Tìm kiếm', type: 'search' },
  { label: 'Điện thoại', type: 'tel' },
  { label: 'Màu sắc', type: 'color' },
  { label: 'Phạm vi', type: 'range' },
]

// ---------- trang ----------

/** Tương ứng form_inputs.html của template (Forms - Trường nhập liệu cơ bản) */
export default function FormInputs() {
  return (
    <LimitlessLayout>
      <PageHeader
        title="Biểu mẫu"
        subtitle="Trường nhập liệu cơ bản"
        buttons={[
          { icon: 'bars-alt', label: 'Thống kê' },
          { icon: 'calculator', label: 'Hóa đơn' },
          { icon: 'calendar5', label: 'Lịch trình' },
        ]}
        breadcrumbs={[
          { label: 'Trang chủ', to: '/lmtlss_23/', icon: 'home2' },
          { label: 'Biểu mẫu', to: '/lmtlss_23/form-inputs' },
          { label: 'Trường nhập liệu cơ bản' },
        ]}
        breadcrumbActions={<BreadcrumbActions />}
      />

      <Content>
        <Card title="Các trường nhập liệu cơ bản" titleAs="h5" tools={['collapse', 'reload', 'remove']}>
          <p className="mb-4">
            Ví dụ về các điều khiển biểu mẫu tiêu chuẩn trong bố cục biểu mẫu mẫu. Các điều khiển biểu mẫu riêng lẻ
            tự động được áp dụng một số kiểu định dạng toàn cục. Tất cả các phần tử văn bản <code>&lt;input&gt;</code>,{' '}
            <code>&lt;textarea&gt;</code> và <code>&lt;select&gt;</code> có lớp <code>.form-control</code> đều
            được đặt mặc định thành <code>width: 100%;</code>. Để có khoảng cách tối ưu, hãy bọc nhãn và điều khiển trong
            <code>.form-group</code>. Nhãn trong biểu mẫu ngang cần lớp <code>.col-form-label</code>.
          </p>

          <form onSubmit={(e) => e.preventDefault()}>
            {/* ---------- Trường nhập liệu cơ bản ---------- */}
            <Fieldset legend="Trường nhập liệu cơ bản">
              <FormGroup label="Trường nhập văn bản mặc định">
                <TextInput />
              </FormGroup>
              <FormGroup label="Mật khẩu">
                <TextInput type="password" />
              </FormGroup>
              <FormGroup label="Trường nhập có văn bản gợi ý">
                <TextInput placeholder="Nhập tên người dùng..." />
              </FormGroup>
              <FormGroup label="Trường chỉ đọc">
                <TextInput readOnly defaultValue="chỉ đọc" />
              </FormGroup>
              <FormGroup label="Trường bị vô hiệu hóa">
                <TextInput disabled defaultValue="đã vô hiệu hóa" />
              </FormGroup>
              <FormGroup label="Giá trị được xác định trước">
                <TextInput defaultValue="http://" />
              </FormGroup>
              <FormGroup label="Tắt tính năng tự động hoàn thành">
                <TextInput placeholder="Tự động hoàn thành đã tắt" autoComplete="off" />
              </FormGroup>
              <FormGroup label="Độ dài tối đa">
                <TextInput maxLength={4} placeholder="Tối đa 4 ký tự" />
              </FormGroup>
              <FormGroup label="Đưa con trỏ vào trường khi nhấp nhãn" htmlFor="clickable-label" labelClassName="cursor-pointer">
                <TextInput id="clickable-label" placeholder="Trường sẽ được focus khi nhấp vào nhãn" />
              </FormGroup>
              <FormGroup label="Văn bản tĩnh">
                <div className="form-control-plaintext">This is a static text</div>
              </FormGroup>
              <FormGroup label="Vùng nhập văn bản">
                <Textarea rows={3} cols={3} placeholder="Vùng nhập văn bản mặc định" />
              </FormGroup>
            </Fieldset>

            {/* ---------- Danh sách chọn cơ bản ---------- */}
            <Fieldset legend="Danh sách chọn cơ bản">
              <FormGroup label="Chọn một mục">
                <Select options={numbered('Hộp chọn mặc định')} />
              </FormGroup>
              <FormGroup label="Hộp chọn có kiểu định dạng">
                <StyledSelect options={numbered('Hộp chọn đã định dạng')} />
              </FormGroup>
              <FormGroup label="Hộp chọn Bootstrap tùy chỉnh">
                <Select variant="custom" options={numbered('Hộp chọn đã định dạng')} />
              </FormGroup>
              <FormGroup label="Chọn nhiều mục">
                <Select multiple options={cities} defaultValue={['Amsterdam', 'Atlanta', 'Chicago']} />
              </FormGroup>
            </Fieldset>

            {/* ---------- Trường chọn tệp cơ bản ---------- */}
            <Fieldset legend="Trường chọn tệp cơ bản">
              <FormGroup label="Trường chọn tệp mặc định">
                <FileInput />
              </FormGroup>
              <FormGroup label="Trường chọn tệp có kiểu định dạng">
                <StyledFileInput />
              </FormGroup>
              <FormGroup label="Trường chọn tệp Bootstrap tùy chỉnh">
                <CustomFileInput />
              </FormGroup>
            </Fieldset>

            {/* ---------- Thành phần trợ giúp biểu mẫu ---------- */}
            <Fieldset legend="Thành phần trợ giúp biểu mẫu">
              <FormGroup label="Văn bản trợ giúp biểu mẫu">
                <div className="row">
                  <div className="col-md-4">
                    <TextInput />
                    <HelpText>Văn bản trợ giúp căn trái</HelpText>
                  </div>
                  <div className="col-md-4">
                    <TextInput />
                    <HelpText align="center">Văn bản trợ giúp căn giữa</HelpText>
                  </div>
                  <div className="col-md-4">
                    <TextInput />
                    <HelpText align="right">Văn bản trợ giúp căn phải</HelpText>
                  </div>
                </div>
              </FormGroup>

              <FormGroup label="Nhãn trợ giúp toàn chiều rộng">
                <div className="row">
                  <div className="col-md-4">
                    <TextInput />
                    <HelpBadge color="primary" align="left" fullWidth>
                      Nhãn căn trái
                    </HelpBadge>
                  </div>
                  <div className="col-md-4">
                    <TextInput />
                    <HelpBadge color="danger" fullWidth>
                      Nhãn căn giữa
                    </HelpBadge>
                  </div>
                  <div className="col-md-4">
                    <TextInput />
                    <HelpBadge color="info" align="right" fullWidth>
                      Nhãn căn phải
                    </HelpBadge>
                  </div>
                </div>
              </FormGroup>

              <FormGroup label="Nhãn trợ giúp dạng khối">
                <div className="row">
                  <div className="col-md-4">
                    <TextInput />
                    <HelpBadge color="primary">Nhãn căn trái</HelpBadge>
                  </div>
                  <div className="col-md-4">
                    <TextInput />
                    <HelpBadge color="danger" align="center">
                      Nhãn căn giữa
                    </HelpBadge>
                  </div>
                  <div className="col-md-4">
                    <TextInput />
                    <HelpBadge color="info" align="right">
                      Nhãn căn phải
                    </HelpBadge>
                  </div>
                </div>
              </FormGroup>

              <FormGroup label="Văn bản trợ giúp cùng dòng">
                <div className="row">
                  <div className="col-lg-6">
                    <TextInput />
                  </div>
                  <div className="col-lg-6 mt-1 mt-lg-0 align-self-center">
                    <span className="text-muted">Văn bản trợ giúp cùng dòng</span>
                  </div>
                </div>
              </FormGroup>

              <FormGroup label="Nhãn trợ giúp cùng dòng">
                <div className="row">
                  <div className="col-lg-6">
                    <TextInput />
                  </div>
                  <div className="col-lg-6 mt-1 mt-lg-0 align-self-center">
                    <span className="badge bg-teal">Nhãn trợ giúp cùng dòng</span>
                  </div>
                </div>
              </FormGroup>
            </Fieldset>

            {/* ---------- Biểu tượng trong trường nhập ---------- */}
            <Fieldset legend="Biểu tượng trong trường nhập">
              <FormGroup label="Trường nhập có biểu tượng">
                <div className="row">
                  <div className="col-md-6">
                    <FeedbackInput grouped icon="make-group" iconPosition="left" inputSize="lg" placeholder="Biểu tượng trái, trường nhập lớn" />
                    <FeedbackInput grouped icon="droplets" iconPosition="left" placeholder="Biểu tượng trái, trường nhập mặc định" />
                    <FeedbackInput grouped icon="pin-alt" iconPosition="left" inputSize="sm" placeholder="Biểu tượng trái, trường nhập nhỏ" />
                  </div>
                  <div className="col-md-6">
                    <FeedbackInput grouped icon="make-group" iconPosition="right" inputSize="lg" placeholder="Biểu tượng phải, trường nhập lớn" />
                    <FeedbackInput grouped icon="droplets" iconPosition="right" placeholder="Biểu tượng phải, trường nhập mặc định" />
                    <FeedbackInput grouped icon="pin-alt" iconPosition="right" inputSize="sm" placeholder="Biểu tượng phải, trường nhập nhỏ" />
                  </div>
                </div>
              </FormGroup>

              <FormGroup label="Trường nhập có biểu tượng xoay">
                <div className="row">
                  <div className="col-md-6">
                    <FeedbackInput grouped icon="spinner2" spin iconPosition="left" placeholder="Biểu tượng xoay bên trái" />
                  </div>
                  <div className="col-md-6">
                    <FeedbackInput grouped icon="spinner2" spin iconPosition="right" placeholder="Biểu tượng xoay bên phải" />
                  </div>
                </div>
              </FormGroup>
            </Fieldset>

            {/* ---------- Trạng thái xác thực ---------- */}
            <Fieldset legend="Trạng thái xác thực">
              <FormGroup label="Trạng thái hợp lệ" labelClassName="font-weight-semibold text-success">
                <TextInput className="border-success" placeholder="Trạng thái hợp lệ" />
                <HelpText tone="success">Văn bản trợ giúp: trạng thái hợp lệ</HelpText>
              </FormGroup>
              <FormGroup label="Trạng thái hợp lệ có biểu tượng" labelClassName="font-weight-semibold text-success">
                <FeedbackInput
                  icon="checkmark-circle"
                  iconPosition="right"
                  feedbackClassName="text-success"
                  className="border-success"
                  placeholder="Trạng thái hợp lệ"
                />
                <HelpText tone="success">Văn bản trợ giúp: trạng thái hợp lệ</HelpText>
              </FormGroup>
              <FormGroup label="Trạng thái không hợp lệ" labelClassName="font-weight-semibold text-danger">
                <TextInput className="border-danger" placeholder="Trạng thái không hợp lệ" />
                <HelpText tone="danger">Văn bản trợ giúp: trạng thái không hợp lệ</HelpText>
              </FormGroup>
              <FormGroup label="Trạng thái không hợp lệ có biểu tượng" labelClassName="font-weight-semibold text-danger">
                <FeedbackInput
                  icon="cancel-circle2"
                  iconPosition="right"
                  feedbackClassName="text-danger"
                  className="border-danger"
                  placeholder="Trạng thái không hợp lệ"
                />
                <HelpText tone="danger">Văn bản trợ giúp: trạng thái không hợp lệ</HelpText>
              </FormGroup>
            </Fieldset>

            {/* ---------- Tùy chọn văn bản ---------- */}
            <Fieldset legend="Tùy chọn văn bản">
              <FormGroup breakpoint="md" label="Chữ nét mảnh">
                <TextInput className="font-weight-light" placeholder="Trường nhập có chữ nét mảnh" />
              </FormGroup>
              <FormGroup breakpoint="md" label="Chữ bán đậm">
                <TextInput className="font-weight-semibold" placeholder="Trường nhập có chữ bán đậm" />
              </FormGroup>
              <FormGroup breakpoint="md" label="Chữ đậm">
                <TextInput className="font-weight-bold" placeholder="Trường nhập có chữ đậm" />
              </FormGroup>
              <FormGroup breakpoint="md" label="Viết hoa chữ cái đầu">
                <TextInput className="text-capitalize" placeholder="Trường nhập viết hoa chữ cái đầu" />
              </FormGroup>
              <FormGroup breakpoint="md" label="Văn bản căn giữa">
                <TextInput className="text-center" placeholder="Trường nhập có văn bản căn giữa" />
              </FormGroup>
              <FormGroup breakpoint="md" label="Văn bản căn phải">
                <TextInput className="text-right" placeholder="Trường nhập có văn bản căn phải" />
              </FormGroup>
              <FormGroup breakpoint="md" label="Văn bản viết hoa">
                <TextInput className="text-uppercase" placeholder="Trường nhập có văn bản viết hoa" />
                <HelpText>Các tùy chọn văn bản khác cũng hoạt động</HelpText>
              </FormGroup>
            </Fieldset>

            {/* ---------- Tùy chọn trường nhập ---------- */}
            <Fieldset legend="Tùy chọn trường nhập">
              <FormGroup label="Chú giải khi focus">
                <FieldTooltip text="Chú giải khi focus" trigger="focus">
                  <TextInput placeholder="Nhấp vào trường nhập" />
                </FieldTooltip>
              </FormGroup>
              <FormGroup label="Chú giải khi di chuột">
                <FieldTooltip text="Chú giải khi di chuột">
                  <TextInput placeholder="Di chuột lên trường nhập" />
                </FieldTooltip>
              </FormGroup>
              <FormGroup breakpoint="md" label="Trường nhập bo tròn">
                <TextInput className="rounded-round" placeholder="Trường nhập bo tròn" />
              </FormGroup>
              <FormGroup breakpoint="md" label="Trường nhập không bo góc">
                <TextInput className="rounded-0" placeholder="Trường nhập không bo góc" />
              </FormGroup>
              <FormGroup label="Kích thước trường nhập cố định">
                <div className="row">
                  <div className="col-3">
                    <TextInput placeholder=".col-3" />
                  </div>
                  <div className="col-4">
                    <TextInput placeholder=".col-4" />
                  </div>
                  <div className="col-5">
                    <TextInput placeholder=".col-5" />
                  </div>
                </div>
                <HelpText>Có 12 kích thước cột vì bố cục dựa trên lưới 12 cột</HelpText>
              </FormGroup>
            </Fieldset>

            {/* ---------- Tùy chọn kích thước ---------- */}
            <Fieldset legend="Tùy chọn kích thước">
              <FormGroup label="Kích thước lớn" labelSize="lg">
                <TextInput inputSize="lg" placeholder=".col-form-label-lg .form-control-lg" />
              </FormGroup>
              <FormGroup label="Kích thước mặc định">
                <TextInput placeholder=".col-form-label .form-control" />
              </FormGroup>
              <FormGroup label="Kích thước nhỏ" labelSize="sm">
                <TextInput inputSize="sm" placeholder=".col-form-label-sm .form-control-sm" />
              </FormGroup>
              <FormGroup label="Chỉ trường nhập">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <TextInput inputSize="lg" placeholder="Chiều cao trường nhập lớn" />
                    </div>
                    <div className="form-group">
                      <TextInput placeholder="Chiều cao trường nhập mặc định" />
                    </div>
                    <div className="form-group">
                      <TextInput inputSize="sm" placeholder="Chiều cao trường nhập nhỏ" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <Select inputSize="lg" options={numbered('Chiều cao hộp chọn lớn')} />
                    </div>
                    <div className="form-group">
                      <Select options={numbered('Chiều cao hộp chọn mặc định')} />
                    </div>
                    <div className="form-group">
                      <Select inputSize="sm" options={numbered('Chiều cao hộp chọn nhỏ')} />
                    </div>
                  </div>
                </div>
              </FormGroup>
            </Fieldset>

            {/* ---------- Tùy chọn màu sắc ---------- */}
            <Fieldset legend="Tùy chọn màu sắc">
              <FormGroup label="Màu văn bản">
                <TextInput className="text-violet" defaultValue="Màu văn bản tùy chỉnh" />
              </FormGroup>
              <FormGroup label="Màu đường viền">
                <TextInput className="border-teal border-1" placeholder="Màu đường viền tùy chỉnh" />
              </FormGroup>
              <FormGroup label="Màu nền">
                <TextInput className="bg-slate-600 border-slate-600 border-1" placeholder="Màu nền tùy chỉnh" />
              </FormGroup>
              <FormGroup label="Màu hộp chọn">
                <Select className="bg-indigo-400 border-indigo-400" options={numbered('Màu hộp chọn tùy chỉnh')} />
              </FormGroup>
              <FormGroup label="Hộp chọn có kiểu định dạng">
                <StyledSelect
                  wrapperClassName="uniform-select bg-pink-400 border-pink-400"
                  options={numbered('Màu hộp chọn định dạng tùy chỉnh')}
                />
              </FormGroup>
              <FormGroup label="Màu trường chọn tệp">
                <StyledFileInput buttonClassName="action btn bg-blue" />
              </FormGroup>
            </Fieldset>

            {/* ---------- Tùy chọn kiểu dữ liệu ---------- */}
            <Fieldset legend="Tùy chọn kiểu dữ liệu">
              {typeOptions.map((t) => (
                <FormGroup key={t.type} breakpoint="md" label={t.label}>
                  <TextInput type={t.type} name={t.type} {...(t.type === 'range' ? { min: 0, max: 10 } : {})} />
                  <HelpText>
                    Sử dụng <code>input type="{t.type}"</code>
                  </HelpText>
                </FormGroup>
              ))}
            </Fieldset>

            <div className="text-right">
              <button type="submit" className="btn btn-primary">
                Gửi <Icon name="paperplane" className="ml-2" />
              </button>
            </div>
          </form>
        </Card>
      </Content>
    </LimitlessLayout>
  )
}
