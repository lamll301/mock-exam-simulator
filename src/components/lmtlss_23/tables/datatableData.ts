// Dữ liệu mẫu của datatable_basic.html

export type EmployeeStatus = 'Active' | 'Inactive' | 'Suspended' | 'Pending'

export interface EmployeeRow {
  id: number
  firstName: string
  lastName: string
  jobTitle: string
  /** Ngày sinh dạng YYYY-MM-DD (để sắp xếp đúng thứ tự thời gian) */
  dob: string
  status: EmployeeStatus
  /** Template hiển thị một số họ / chức danh dưới dạng link */
  lastNameIsLink?: boolean
  jobTitleIsLink?: boolean
}

/** Class badge của Limitless theo trạng thái */
export const statusBadgeClass: Record<EmployeeStatus, string> = {
  Active: 'badge-success',
  Inactive: 'badge-secondary',
  Suspended: 'badge-danger',
  Pending: 'badge-info',
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** "1972-06-22" -> "22 Jun 1972" */
export function formatDob(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  return `${d} ${MONTHS[m - 1]} ${y}`
}

export const employees: EmployeeRow[] = [
  { id: 1, firstName: 'Marth', lastName: 'Enright', lastNameIsLink: true, jobTitle: 'Traffic Court Referee', dob: '1972-06-22', status: 'Active' },
  { id: 2, firstName: 'Jackelyn', lastName: 'Weible', jobTitle: 'Airline Transport Pilot', jobTitleIsLink: true, dob: '1981-10-03', status: 'Inactive' },
  { id: 3, firstName: 'Aura', lastName: 'Hard', jobTitle: 'Business Services Sales Representative', dob: '1969-04-19', status: 'Suspended' },
  { id: 4, firstName: 'Nathalie', lastName: 'Pretty', lastNameIsLink: true, jobTitle: 'Drywall Stripper', dob: '1977-12-13', status: 'Pending' },
  { id: 5, firstName: 'Sharan', lastName: 'Leland', jobTitle: 'Aviation Tactical Readiness Officer', dob: '1991-12-30', status: 'Inactive' },
  { id: 6, firstName: 'Maxine', lastName: 'Woldt', lastNameIsLink: true, jobTitle: 'Business Services Sales Representative', jobTitleIsLink: true, dob: '1987-10-17', status: 'Pending' },
  { id: 7, firstName: 'Sylvia', lastName: 'Mcgaughy', lastNameIsLink: true, jobTitle: 'Hemodialysis Technician', dob: '1983-11-11', status: 'Suspended' },
  { id: 8, firstName: 'Lizzee', lastName: 'Goodlow', lastNameIsLink: true, jobTitle: 'Technical Services Librarian', dob: '1961-11-01', status: 'Suspended' },
  { id: 9, firstName: 'Kennedy', lastName: 'Haley', jobTitle: 'Senior Marketing Designer', dob: '1960-12-18', status: 'Active' },
  { id: 10, firstName: 'Chantal', lastName: 'Nailor', lastNameIsLink: true, jobTitle: 'Technical Services Librarian', dob: '1980-01-10', status: 'Inactive' },
  { id: 11, firstName: 'Delma', lastName: 'Bonds', jobTitle: 'Lead Brand Manager', dob: '1968-12-21', status: 'Pending' },
  { id: 12, firstName: 'Roland', lastName: 'Salmos', jobTitle: 'Senior Program Developer', jobTitleIsLink: true, dob: '1986-06-05', status: 'Inactive' },
  { id: 13, firstName: 'Coy', lastName: 'Wollard', jobTitle: 'Customer Service Operator', dob: '1982-10-12', status: 'Active' },
  { id: 14, firstName: 'Maxwell', lastName: 'Maben', jobTitle: 'Regional Representative', dob: '1988-02-25', status: 'Suspended' },
  { id: 15, firstName: 'Cicely', lastName: 'Sigler', jobTitle: 'Senior Research Officer', jobTitleIsLink: true, dob: '1960-03-15', status: 'Pending' },
]
