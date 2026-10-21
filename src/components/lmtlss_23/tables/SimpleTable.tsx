import type { ReactNode } from 'react'
import Table, { type TableProps } from './Table'

export interface TableColumn<T> {
  header: ReactNode
  /** Nội dung ô của một dòng */
  cell: (row: T, index: number) => ReactNode
}

interface SimpleTableProps<T> extends Omit<TableProps, 'children'> {
  columns: TableColumn<T>[]
  rows: T[]
  /** Khoá của dòng; mặc định dùng số thứ tự */
  rowKey?: (row: T, index: number) => string | number
}

/** Bảng dựng từ danh sách cột + danh sách dòng (thead / tbody tự sinh) */
export default function SimpleTable<T>({ columns, rows, rowKey, ...tableProps }: SimpleTableProps<T>) {
  return (
    <Table {...tableProps}>
      <thead>
        <tr>
          {columns.map((c, i) => (
            <th key={i}>{c.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, r) => (
          <tr key={rowKey ? rowKey(row, r) : r}>
            {columns.map((c, i) => (
              <td key={i}>{c.cell(row, r)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
