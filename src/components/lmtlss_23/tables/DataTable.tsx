import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from 'react'
import LengthSelect from './LengthSelect'

export type SortDir = 'asc' | 'desc'

/** Kiểu phân trang của DataTables (tùy chọn pagingType) */
export type PagingType = 'simple' | 'simple_numbers' | 'full' | 'full_numbers'

export interface DataTableColumn<T> {
  header: ReactNode
  /** Nội dung ô của một dòng */
  cell: (row: T, index: number) => ReactNode
  /** Giá trị dùng để sắp xếp (và lọc nếu không có searchValue). Bỏ trống => cột không sắp xếp được (vd. cột Actions) */
  sortValue?: (row: T) => string | number
  /** Chuỗi dùng để tìm kiếm; mặc định lấy từ sortValue */
  searchValue?: (row: T) => string
  /** Class thêm cho <th> và <td>, ví dụ "text-center" */
  className?: string
  width?: number | string
}

export interface PaginateLabels {
  first: string
  previous: string
  next: string
  last: string
}

const defaultLabels: PaginateLabels = { first: 'First', previous: '←', next: '→', last: 'Last' }

interface DataTableProps<T> {
  columns: DataTableColumn<T>[]
  rows: T[]
  rowKey?: (row: T, index: number) => string | number
  /** Class thêm cho <table>, ví dụ "datatable-basic" */
  className?: string
  /** Số dòng mỗi trang ban đầu */
  pageLength?: number
  lengthMenu?: number[]
  /** false: hiện toàn bộ dòng, ẩn ô "Show" và nút phân trang */
  paging?: boolean
  pagingType?: PagingType
  paginateLabels?: Partial<PaginateLabels>
  /** Chiều cao tối đa (px) của phần thân bảng; vượt quá thì cuộn dọc, header dính trên cùng */
  scrollY?: number
  /** Sắp xếp ban đầu (DataTables mặc định: cột đầu, tăng dần) */
  order?: { column: number; dir: SortDir }
  /**
   * Có giá trị => lưu trạng thái (trang, tìm kiếm, sắp xếp, số dòng) vào localStorage
   * và khôi phục khi quay lại trang (tương đương stateSave). Giá trị là tên khoá lưu.
   */
  stateSaveKey?: string
  /** Thời gian trạng thái còn hiệu lực (giây). Mặc định 2 giờ như DataTables; 0 = mãi mãi */
  stateDuration?: number
}

interface SavedState {
  time: number
  search: string
  page: number
  length: number
  order: { column: number; dir: SortDir }
}

function loadState(key: string, duration: number): SavedState | null {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    const s = JSON.parse(raw) as SavedState
    if (duration > 0 && Date.now() - s.time > duration * 1000) return null
    return s
  } catch {
    return null
  }
}

/** Dãy nút số trang (tối đa 7 nút) giống thuật toán của DataTables */
function pageNumbers(page: number, pages: number): (number | 'ellipsis')[] {
  if (pages <= 7) return Array.from({ length: pages }, (_, i) => i)
  if (page <= 3) return [0, 1, 2, 3, 4, 'ellipsis', pages - 1]
  if (page >= pages - 4) return [0, 'ellipsis', pages - 5, pages - 4, pages - 3, pages - 2, pages - 1]
  return [0, 'ellipsis', page - 1, page, page + 1, 'ellipsis', pages - 1]
}

function PageButton({
  label,
  className = '',
  disabled,
  onClick,
}: {
  label: ReactNode
  className?: string
  disabled?: boolean
  onClick: () => void
}) {
  return (
    <a
      href="#"
      className={`paginate_button ${className} ${disabled ? 'disabled' : ''}`.trim()}
      aria-disabled={disabled}
      onClick={(e) => {
        e.preventDefault()
        if (!disabled) onClick()
      }}
    >
      {label}
    </a>
  )
}

/**
 * Bảng kiểu DataTables (markup + class của Limitless: .dataTables_wrapper, .datatable-header,
 * .datatable-scroll, .datatable-footer, .paginate_button...). Thay cho jQuery DataTables
 * vì plugin đó thao tác trực tiếp lên DOM, không dùng được trong React.
 * Hỗ trợ: lọc, sắp xếp, chọn số dòng, phân trang, cuộn dọc, lưu trạng thái.
 */
export default function DataTable<T>({
  columns,
  rows,
  rowKey,
  className = '',
  pageLength = 10,
  lengthMenu = [10, 25, 50, 75, 100],
  paging = true,
  pagingType = 'simple_numbers',
  paginateLabels,
  scrollY,
  order: defaultOrder = { column: 0, dir: 'asc' },
  stateSaveKey,
  stateDuration = 7200,
}: DataTableProps<T>) {
  const storageKey = stateSaveKey ? `DataTables_${stateSaveKey}_${window.location.pathname}` : null
  const [saved] = useState(() => (storageKey ? loadState(storageKey, stateDuration) : null))

  const [search, setSearch] = useState(saved?.search ?? '')
  const [page, setPage] = useState(saved?.page ?? 0)
  const [length, setLength] = useState(saved?.length ?? pageLength)
  const [order, setOrder] = useState(saved?.order ?? defaultOrder)

  useEffect(() => {
    if (!storageKey) return
    try {
      const state: SavedState = { time: Date.now(), search, page, length, order }
      localStorage.setItem(storageKey, JSON.stringify(state))
    } catch {
      /* bỏ qua nếu không ghi được */
    }
  }, [storageKey, search, page, length, order])

  const labels = { ...defaultLabels, ...paginateLabels }

  // 1) lọc: mọi từ khoá (cách nhau bằng khoảng trắng) đều phải xuất hiện ở đâu đó trong dòng
  const filtered = useMemo(() => {
    const terms = search.trim().toLowerCase().split(/\s+/).filter(Boolean)
    if (terms.length === 0) return rows
    return rows.filter((row) => {
      const haystack = columns
        .map((c) => {
          const fn = c.searchValue ?? c.sortValue
          return fn ? String(fn(row)) : ''
        })
        .join(' ')
        .toLowerCase()
      return terms.every((t) => haystack.includes(t))
    })
  }, [rows, columns, search])

  // 2) sắp xếp (ổn định: bằng nhau thì giữ thứ tự gốc)
  const sorted = useMemo(() => {
    const get = columns[order.column]?.sortValue
    if (!get) return filtered
    const dir = order.dir === 'asc' ? 1 : -1
    return filtered
      .map((row, i) => ({ row, i, v: get(row) }))
      .sort((a, b) => {
        const cmp =
          typeof a.v === 'number' && typeof b.v === 'number'
            ? a.v - b.v
            : String(a.v).localeCompare(String(b.v), undefined, { sensitivity: 'base' })
        return cmp * dir || a.i - b.i
      })
      .map((x) => x.row)
  }, [filtered, columns, order])

  // 3) phân trang
  const total = sorted.length
  const pages = paging ? Math.max(1, Math.ceil(total / length)) : 1
  const current = Math.min(page, pages - 1)
  const start = paging ? current * length : 0
  const visible = paging ? sorted.slice(start, start + length) : sorted

  const from = total === 0 ? 0 : start + 1
  const to = start + visible.length
  const info =
    `Showing ${from} to ${to} of ${total} entries` +
    (filtered.length !== rows.length ? ` (filtered from ${rows.length} total entries)` : '')

  const toggleSort = (i: number) => {
    setOrder((o) => ({ column: i, dir: o.column === i && o.dir === 'asc' ? 'desc' : 'asc' }))
    setPage(0)
  }

  const stickyStyle: CSSProperties | undefined = scrollY
    ? { position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#fff', boxShadow: 'inset 0 -1px 0 rgba(0,0,0,.125)' }
    : undefined

  const showFirstLast = pagingType === 'full' || pagingType === 'full_numbers'
  const showNumbers = pagingType === 'simple_numbers' || pagingType === 'full_numbers'

  const table = (
    <table className={`table dataTable no-footer ${className}`.trim()}>
      <thead>
        <tr>
          {columns.map((c, i) => {
            const sortable = !!c.sortValue
            const sortClass = !sortable ? 'sorting_disabled' : order.column === i ? `sorting_${order.dir}` : 'sorting'
            return (
              <th
                key={i}
                className={[c.className, sortClass].filter(Boolean).join(' ')}
                style={{ ...stickyStyle, ...(c.width !== undefined ? { width: c.width } : null) }}
                tabIndex={sortable ? 0 : undefined}
                aria-sort={
                  sortable && order.column === i ? (order.dir === 'asc' ? 'ascending' : 'descending') : undefined
                }
                onClick={sortable ? () => toggleSort(i) : undefined}
                onKeyDown={
                  sortable
                    ? (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          toggleSort(i)
                        }
                      }
                    : undefined
                }
              >
                {c.header}
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {visible.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className="dataTables_empty">
              No matching records found
            </td>
          </tr>
        ) : (
          visible.map((row, r) => (
            <tr key={rowKey ? rowKey(row, start + r) : start + r}>
              {columns.map((c, i) => (
                <td key={i} className={c.className}>
                  {c.cell(row, start + r)}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  )

  return (
    <div className="dataTables_wrapper no-footer">
      <div className="datatable-header">
        <div className="dataTables_filter">
          <label>
            <span>Filter:</span>{' '}
            <input
              type="search"
              placeholder="Type to filter..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(0)
              }}
            />
          </label>
        </div>

        {paging && (
          <div className="dataTables_length">
            <label>
              <span>Show:</span>{' '}
              <LengthSelect
                value={length}
                options={lengthMenu}
                onChange={(n) => {
                  setLength(n)
                  setPage(0)
                }}
              />
            </label>
          </div>
        )}
      </div>

      <div className="datatable-scroll">
        {scrollY ? (
          <div className="dataTables_scroll">
            <div style={{ maxHeight: scrollY, overflowY: 'auto', overflowX: 'auto' }}>{table}</div>
          </div>
        ) : (
          table
        )}
      </div>

      <div className="datatable-footer">
        <div className="dataTables_info" role="status" aria-live="polite">
          {info}
        </div>

        {paging && (
          <div className={`dataTables_paginate paging_${pagingType}`}>
            {showFirstLast && (
              <PageButton label={labels.first} className="first" disabled={current === 0} onClick={() => setPage(0)} />
            )}
            <PageButton
              label={labels.previous}
              className="previous"
              disabled={current === 0}
              onClick={() => setPage(current - 1)}
            />
            {showNumbers && (
              <span>
                {pageNumbers(current, pages).map((p, i) =>
                  p === 'ellipsis' ? (
                    <span key={`e${i}`} className="ellipsis">
                      …
                    </span>
                  ) : (
                    <PageButton
                      key={p}
                      label={p + 1}
                      className={p === current ? 'current' : ''}
                      onClick={() => setPage(p)}
                    />
                  ),
                )}
              </span>
            )}
            <PageButton
              label={labels.next}
              className="next"
              disabled={current >= pages - 1}
              onClick={() => setPage(current + 1)}
            />
            {showFirstLast && (
              <PageButton
                label={labels.last}
                className="last"
                disabled={current >= pages - 1}
                onClick={() => setPage(pages - 1)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
