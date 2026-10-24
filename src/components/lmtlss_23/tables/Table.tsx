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

/** Cỡ bảng: xl = 60px, lg = 53px, (mặc định) = 44px, sm = 40px, xs = 36px chiều cao dòng */
export type TableSize = 'xl' | 'lg' | 'sm' | 'xs'

export interface TableProps {
  /** Cỡ bảng (thêm class .table-xl / .table-lg / .table-sm / .table-xs); bỏ trống = cỡ mặc định */
  size?: TableSize
  striped?: boolean
  bordered?: boolean
  hover?: boolean
  /** Chỉ có đường viền dọc giữa các cột (.table-columned) */
  columned?: boolean
  /** Ẩn mọi đường viền, trừ đường giữa thead / tbody / tfoot (.table-borderless) */
  borderless?: boolean
  wrapper?: TableWrapper
  /** Class thêm cho <table> */
  className?: string
  children: ReactNode
}

/** Ghép class cho <table>: "table table-striped table-bordered ..." */
function tableClass({
  size,
  striped,
  bordered,
  hover,
  columned,
  borderless,
  className,
}: Pick<TableProps, 'size' | 'striped' | 'bordered' | 'hover' | 'columned' | 'borderless' | 'className'>) {
  return [
    'table',
    size && `table-${size}`,
    striped && 'table-striped',
    bordered && 'table-bordered',
    hover && 'table-hover',
    columned && 'table-columned',
    borderless && 'table-borderless',
    className,
  ]
    .filter(Boolean)
    .join(' ')
}

/** <table class="table"> kèm lớp bọc. Tự viết <thead>/<tbody> bên trong, hoặc dùng SimpleTable */
export default function Table({
  size,
  striped,
  bordered,
  hover,
  columned,
  borderless,
  wrapper = 'responsive',
  className,
  children,
}: TableProps) {
  return (
    <div className={wrapperClass[wrapper]}>
      <table className={tableClass({ size, striped, bordered, hover, columned, borderless, className })}>{children}</table>
    </div>
  )
}
