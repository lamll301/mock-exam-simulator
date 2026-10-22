import Dropdown, { DropdownDivider, DropdownItem } from './Dropdown'
import Icon from './Icon'

/** Phần bên phải thanh breadcrumb: Hỗ trợ + menu thả xuống Cài đặt (dùng chung cho các trang ví dụ) */
export default function BreadcrumbActions() {
  return (
    <>
      <a href="#" className="breadcrumb-elements-item" onClick={(e) => e.preventDefault()}>
        <Icon name="comment-discussion" className="mr-2" />
        Hỗ trợ
      </a>

      <Dropdown
        align="right"
        closeOnClick
        className="breadcrumb-elements-item p-0"
        triggerClassName="breadcrumb-elements-item dropdown-toggle"
        trigger={
          <>
            <Icon name="gear" className="mr-2" />
            Cài đặt
          </>
        }
      >
        <DropdownItem icon={<Icon name="user-lock" />}>Bảo mật tài khoản</DropdownItem>
        <DropdownItem icon={<Icon name="statistics" />}>Phân tích dữ liệu</DropdownItem>
        <DropdownItem icon={<Icon name="accessibility" />}>Trợ năng</DropdownItem>
        <DropdownDivider />
        <DropdownItem icon={<Icon name="gear" />}>Tất cả cài đặt</DropdownItem>
      </Dropdown>
    </>
  )
}