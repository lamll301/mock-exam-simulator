import type { MouseEvent, ReactNode } from 'react'
import Dropdown, { DropdownItem } from '../Dropdown'
import Icon from '../Icon'
import type { DataTableColumn } from './DataTable'
import { formatDob, statusBadgeClass, type EmployeeRow } from './datatableData'

const noop = (e: MouseEvent) => e.preventDefault()

function MaybeLink({ link, children }: { link?: boolean; children: ReactNode }) {
  return link ? (
    <a href="#" onClick={noop}>
      {children}
    </a>
  ) : (
    <>{children}</>
  )
}

/** Nút "⋮" ở cột Actions: dropdown xuất file (dùng position: fixed để không bị bảng cắt) */
function RowActions() {
  return (
    <div className="list-icons">
      <Dropdown align="right" closeOnClick fixed triggerClassName="list-icons-item" trigger={<Icon name="menu9" />}>
        <DropdownItem icon={<Icon name="file-pdf" />}>Export to .pdf</DropdownItem>
        <DropdownItem icon={<Icon name="file-excel" />}>Export to .csv</DropdownItem>
        <DropdownItem icon={<Icon name="file-word" />}>Export to .doc</DropdownItem>
      </Dropdown>
    </div>
  )
}

export const employeeColumns: DataTableColumn<EmployeeRow>[] = [
  { header: 'First Name', cell: (r) => r.firstName, sortValue: (r) => r.firstName },
  {
    header: 'Last Name',
    cell: (r) => <MaybeLink link={r.lastNameIsLink}>{r.lastName}</MaybeLink>,
    sortValue: (r) => r.lastName,
  },
  {
    header: 'Job Title',
    cell: (r) => <MaybeLink link={r.jobTitleIsLink}>{r.jobTitle}</MaybeLink>,
    sortValue: (r) => r.jobTitle,
  },
  {
    header: 'DOB',
    cell: (r) => formatDob(r.dob),
    sortValue: (r) => r.dob, // YYYY-MM-DD nên so sánh chuỗi = so sánh thời gian
    searchValue: (r) => formatDob(r.dob), // tìm theo chuỗi đang hiển thị ("22 Jun 1972")
  },
  {
    header: 'Status',
    cell: (r) => <span className={`badge ${statusBadgeClass[r.status]}`}>{r.status}</span>,
    sortValue: (r) => r.status,
  },
  // Không có sortValue => không sắp xếp (columnDefs orderable: false, width: 100 của template)
  { header: 'Actions', className: 'text-center', width: 100, cell: () => <RowActions /> },
]
