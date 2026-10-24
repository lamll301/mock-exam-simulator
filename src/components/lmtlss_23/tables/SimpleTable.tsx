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
  /** Class cho dòng tiêu đề trong <thead> (vd. "table-border-solid", "border-bottom-danger") */
  headRowClassName?: string
  /** Class cho từng dòng trong <tbody> (vd. "table-border-dashed", "border-top-info") */
  rowClassName?: (row: T, index: number) => string | undefined
  /** Ẩn <thead> (chỉ còn <tbody>, dùng khi muốn demo riêng phần <tfoot>) */
  hideHead?: boolean
  /** Thêm <tfoot> lặp lại các tiêu đề cột */
  footer?: boolean
  /** Class cho dòng trong <tfoot> (vd. "bg-teal-400") */
  footRowClassName?: string
}

/** Bảng dựng từ danh sách cột + danh sách dòng (thead / tbody tự sinh) */
export default function SimpleTable<T>({ columns, rows, rowKey, headRowClassName, rowClassName, hideHead, footer, footRowClassName, ...tableProps }: SimpleTableProps<T>) {
  return (
    <Table {...tableProps}>
      {!hideHead && (
        <thead>
          <tr className={headRowClassName}>
            {columns.map((c, i) => (
              <th key={i}>{c.header}</th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {rows.map((row, r) => (
          <tr key={rowKey ? rowKey(row, r) : r} className={rowClassName?.(row, r)}>
            {columns.map((c, i) => (
              <td key={i}>{c.cell(row, r)}</td>
            ))}
          </tr>
        ))}
      </tbody>
      {footer && (
        <tfoot>
          <tr className={footRowClassName}>
            {columns.map((c, i) => (
              <th key={i}>{c.header}</th>
            ))}
          </tr>
        </tfoot>
      )}
    </Table>
  )
}
