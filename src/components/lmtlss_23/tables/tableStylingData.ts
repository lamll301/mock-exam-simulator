import type { TableColumn } from './SimpleTable'

// Dữ liệu mẫu của table_styling.html (ví dụ "Contextual classes" và "Custom row colors")

export interface PaymentRow {
  id: number
  product: string
  paymentTaken: string
  status: string
}

const base: PaymentRow[] = [
  { id: 1, product: 'TB - Monthly', paymentTaken: '01/04/2012', status: 'Approved' },
  { id: 2, product: 'TB - Monthly', paymentTaken: '02/04/2012', status: 'Declined' },
  { id: 3, product: 'TB - Monthly', paymentTaken: '03/04/2012', status: 'Pending' },
  { id: 4, product: 'TB - Monthly', paymentTaken: '04/04/2012', status: 'Call in to confirm' },
  { id: 4, product: 'TB - Monthly', paymentTaken: '05/04/2012', status: 'Information' },
]

/** Template lặp mỗi dòng 2 lần: dòng tô màu rồi tới dòng thường -> 10 dòng */
export const paymentRows: PaymentRow[] = base.flatMap((r) => [r, r])

export const paymentColumns: TableColumn<PaymentRow>[] = [
  { header: '#', cell: (r) => r.id },
  { header: 'Product', cell: (r) => r.product },
  { header: 'Payment Taken', cell: (r) => r.paymentTaken },
  { header: 'Status', cell: (r) => r.status },
]

/** Class màu ngữ cảnh của Bootstrap (nhạt) */
export const contextualClasses = ['table-success', 'table-danger', 'table-warning', 'table-active', 'table-info']

/** Class màu tùy chỉnh của template (đậm) */
export const customRowColors = ['bg-primary', 'bg-danger', 'bg-success', 'bg-warning', 'bg-info']

/** Dòng chẵn (0, 2, 4...) lấy class theo thứ tự, dòng lẻ giữ nguyên để so sánh */
export const rowClassByPair =
  (classes: string[]) =>
  (_: unknown, i: number): string | undefined =>
    i % 2 === 0 ? classes[i / 2] : undefined
