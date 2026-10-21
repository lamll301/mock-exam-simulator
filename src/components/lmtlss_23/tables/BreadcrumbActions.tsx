import Dropdown, { DropdownDivider, DropdownItem } from '../Dropdown'
import Icon from '../Icon'

/** Phần bên phải thanh breadcrumb: Support + dropdown Settings (dùng chung cho các trang ví dụ) */
export default function BreadcrumbActions() {
  return (
    <>
      <a href="#" className="breadcrumb-elements-item" onClick={(e) => e.preventDefault()}>
        <Icon name="comment-discussion" className="mr-2" />
        Support
      </a>

      <Dropdown
        align="right"
        closeOnClick
        className="breadcrumb-elements-item p-0"
        triggerClassName="breadcrumb-elements-item dropdown-toggle"
        trigger={
          <>
            <Icon name="gear" className="mr-2" />
            Settings
          </>
        }
      >
        <DropdownItem icon={<Icon name="user-lock" />}>Account security</DropdownItem>
        <DropdownItem icon={<Icon name="statistics" />}>Analytics</DropdownItem>
        <DropdownItem icon={<Icon name="accessibility" />}>Accessibility</DropdownItem>
        <DropdownDivider />
        <DropdownItem icon={<Icon name="gear" />}>All settings</DropdownItem>
      </Dropdown>
    </>
  )
}
