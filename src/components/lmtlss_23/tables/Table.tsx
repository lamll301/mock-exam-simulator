import type { ReactNode } from 'react'

/**
 * Lớp bọc ngoài của bảng:
 * - responsive: cuộn ngang khi bảng rộng hơn màn hình (mặc định)
 * - scrollable: cuộn dọc khi cao hơn 22.5rem
 * - framed: bảng đặt trong .card-body, có viền bao quanh
 */
export type TableWrapper = 'responsive' | 'scrollable' | 'framed'

const wrapperClass: Record<TableWrapper, string> = {
  responsive: 'table-responsive',
  scrollable: 'table-responsive table-scrollable',
  framed: 'card card-table table-responsive shadow-0 mb-0',
}

export interface TableProps {
  striped?: boolean
  bordered?: boolean
  hover?: boolean
  wrapper?: TableWrapper
  /** Class thêm cho <table> */
  className?: string
  children: ReactNode
}

/** Ghép class cho <table>: "table table-striped table-bordered ..." */
function tableClass({ striped, bordered, hover, className }: Pick<TableProps, 'striped' | 'bordered' | 'hover' | 'className'>) {
  return [
    'table',
    striped && 'table-striped',
    bordered && 'table-bordered',
    hover && 'table-hover',
    className,
  ]
    .filter(Boolean)
    .join(' ')
}

/** <table class="table"> kèm lớp bọc. Tự viết <thead>/<tbody> bên trong, hoặc dùng SimpleTable */
export default function Table({ striped, bordered, hover, wrapper = 'responsive', className, children }: TableProps) {
  return (
    <div className={wrapperClass[wrapper]}>
      <table className={tableClass({ striped, bordered, hover, className })}>{children}</table>
    </div>
  )
}
