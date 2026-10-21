import type { TableColumn } from './SimpleTable'

// Dữ liệu mẫu của table_basic.html

export interface UserRow {
  id: number
  firstName: string
  lastName: string
  username: string
}

export const basicUsers: UserRow[] = [
  { id: 1, firstName: 'Eugene', lastName: 'Kopyov', username: '@Kopyov' },
  { id: 2, firstName: 'Victoria', lastName: 'Baker', username: '@Vicky' },
  { id: 3, firstName: 'James', lastName: 'Alexander', username: '@Alex' },
  { id: 4, firstName: 'Franklin', lastName: 'Morrison', username: '@Frank' },
]

/** Danh sách dài hơn để thấy thanh cuộn dọc */
export const scrollUsers: UserRow[] = [
  ...basicUsers.slice(0, 3),
  { id: 4, firstName: 'Stanley', lastName: 'Martins', username: '@Stan' },
  { id: 5, firstName: 'Winnie', lastName: 'the Pooh', username: '@Winnie' },
  { id: 6, firstName: 'Garry', lastName: 'Smith', username: '@Garry' },
  { id: 7, firstName: 'Ian', lastName: 'Berg', username: '@Ian' },
  { id: 8, firstName: 'John', lastName: 'Ryan', username: '@John' },
  { id: 9, firstName: 'Frank', lastName: 'Giggs', username: '@Frank' },
  { id: 10, firstName: 'Jack', lastName: 'Gram', username: '@Jack' },
  { id: 11, firstName: 'Patrick', lastName: 'Lawrence', username: '@Patrick' },
  { id: 12, firstName: 'Lucy', lastName: 'Gulf', username: '@Lucy' },
  { id: 13, firstName: 'Dave', lastName: 'Armstrong', username: '@Dave' },
  { id: 14, firstName: 'Sean', lastName: 'Lewis', username: '@Sean' },
]

export const userColumns: TableColumn<UserRow>[] = [
  { header: '#', cell: (u) => u.id },
  { header: 'First Name', cell: (u) => u.firstName },
  { header: 'Last Name', cell: (u) => u.lastName },
  { header: 'Username', cell: (u) => u.username },
]
