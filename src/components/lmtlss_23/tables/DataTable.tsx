import {
  Fragment,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type DragEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react'
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
  /**
   * Kéo thả tiêu đề để đổi thứ tự cột (tương đương extension ColReorder).
   * - true: bật với mặc định
   * - { realtime: true }: đổi chỗ ngay khi đang kéo (thay vì chỉ hiện vạch chèn)
   * - { order: [1, 3, 2, 4, 0, 5] }: thứ tự cột ban đầu (chỉ số theo thứ tự gốc của `columns`)
   */
  colReorder?: boolean | ColReorderOptions
  /**
   * Kéo thả để đổi thứ tự DÒNG (tương đương extension RowReorder).
   * Cột `column` (mặc định cột đầu) là cột số thứ tự: DataTable tự hiển thị / sắp xếp / tìm kiếm theo
   * số thứ tự đó, sau khi kéo các dòng bị ảnh hưởng sẽ được gán lại số thứ tự (giống RowReorder).
   */
  rowReorder?: boolean | RowReorderOptions<T>
  /**
   * Tương đương extension Responsive: khi bảng không đủ chỗ, ẩn dần các cột từ phải sang trái
   * (luôn giữ 2 cột đầu) và hiện nút +/- ở ô đầu mỗi dòng để xem phần chi tiết của các cột đã ẩn.
   */
  responsive?: boolean
}

/** Một dòng bị đổi số thứ tự sau khi kéo thả */
export interface RowReorderChange<T> {
  row: T
  oldPosition: number
  newPosition: number
}

/** Dữ liệu của sự kiện row-reorder */
export interface RowReorderEvent<T> {
  /** Dòng mà người dùng đã kéo */
  trigger: T
  changes: RowReorderChange<T>[]
}

export interface RowReorderOptions<T = unknown> {
  /** Chỉ số (theo `columns`) của cột số thứ tự. Mặc định 0 */
  column?: number
  /**
   * Phần tử dùng làm tay nắm kéo:
   * - 'first' (mặc định): ô đầu tiên đang hiển thị của dòng
   * - 'row': cả dòng (tương đương selector: 'tr')
   * - số n: ô thứ n đang hiển thị (0 = ô đầu; tương đương 'td:nth-child(n+1)')
   */
  selector?: 'first' | 'row' | number
  /** Ẩn cột số thứ tự (columnDefs visible: false) => bảng thành danh sách kéo thả */
  hideOrderColumn?: boolean
  /** Gọi sau khi kéo thả xong (tương đương sự kiện row-reorder) */
  onReorder?: (event: RowReorderEvent<T>) => void
}

export interface ColReorderOptions {
  realtime?: boolean
  order?: number[]
}

interface SavedState {
  time: number
  search: string
  page: number
  length: number
  order: { column: number; dir: SortDir }
  /** Thứ tự cột đang hiển thị (chỉ số theo thứ tự gốc); chỉ có khi bật colReorder */
  colOrder?: number[]
}

/** Chuyển phần tử từ vị trí `from` sang vị trí `to` (không sửa mảng gốc) */
function moveItem<T>(arr: T[], from: number, to: number): T[] {
  const next = [...arr]
  const [item] = next.splice(from, 1)
  next.splice(to, 0, item)
  return next
}

/** Hợp lệ khi là hoán vị của 0..n-1 */
function isValidOrder(o: unknown, n: number): o is number[] {
  return (
    Array.isArray(o) &&
    o.length === n &&
    new Set(o).size === n &&
    o.every((i) => Number.isInteger(i) && i >= 0 && i < n)
  )
}

/** Thứ tự cột ban đầu: ưu tiên trạng thái đã lưu, sau đó `order` khai báo sẵn, cuối cùng là thứ tự gốc */
function initialColOrder(n: number, saved?: number[], predefined?: number[]): number[] {
  if (isValidOrder(saved, n)) return saved
  if (isValidOrder(predefined, n)) return predefined
  return Array.from({ length: n }, (_, i) => i)
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
  colReorder,
  rowReorder,
  responsive,
}: DataTableProps<T>) {
  const reorderEnabled = !!colReorder
  const reorderOptions: ColReorderOptions = typeof colReorder === 'object' ? colReorder : {}
  const realtime = !!reorderOptions.realtime

  const storageKey = stateSaveKey ? `DataTables_${stateSaveKey}_${window.location.pathname}` : null
  const [saved] = useState(() => (storageKey ? loadState(storageKey, stateDuration) : null))

  const [search, setSearch] = useState(saved?.search ?? '')
  const [page, setPage] = useState(saved?.page ?? 0)
  const [length, setLength] = useState(saved?.length ?? pageLength)
  const [order, setOrder] = useState(saved?.order ?? defaultOrder)
  // colOrder[vị trí hiển thị] = chỉ số cột gốc; order.column luôn là chỉ số cột gốc
  const [colOrder, setColOrder] = useState(() =>
    initialColOrder(columns.length, saved?.colOrder, reorderOptions.order),
  )
  // drag.from / drag.over: vị trí hiển thị của cột đang kéo / cột đang rê chuột qua
  const [drag, setDrag] = useState<{ from: number; over: number } | null>(null)

  // ---- RowReorder ----
  const reorderRows = !!rowReorder
  const rrOpts: RowReorderOptions<T> = typeof rowReorder === 'object' ? rowReorder : {}
  const orderCol = rrOpts.column ?? 0
  const selector = rrOpts.selector ?? 'first'
  // seqState[chỉ số dòng trong `rows`] = số thứ tự hiện tại; rỗng / sai độ dài => 1..n theo thứ tự gốc
  const [seqState, setSeqState] = useState<number[]>([])
  const seqs = useMemo(
    () => (seqState.length === rows.length ? seqState : rows.map((_, i) => i + 1)),
    [seqState, rows],
  )
  const rowIndex = useMemo(() => new Map(rows.map((r, i) => [r, i] as const)), [rows])
  const seqOf = (row: T) => seqs[rowIndex.get(row) ?? 0]
  const [rowDrag, setRowDrag] = useState<{ from: number; over: number } | null>(null)
  const rowDragRef = useRef<{ from: number; over: number; active: boolean; x: number; y: number } | null>(null)
  const tbodyRef = useRef<HTMLTableSectionElement>(null)
  const applyReorderRef = useRef<(from: number, over: number) => void>(() => {})

  // ---- Responsive ----
  const [hiddenCount, setHiddenCount] = useState(0)
  const [openRows, setOpenRows] = useState<Set<number>>(() => new Set())
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!storageKey) return
    try {
      const state: SavedState = {
        time: Date.now(),
        search,
        page,
        length,
        order,
        ...(reorderEnabled ? { colOrder } : null),
      }
      localStorage.setItem(storageKey, JSON.stringify(state))
    } catch {
      /* bỏ qua nếu không ghi được */
    }
  }, [storageKey, search, page, length, order, colOrder, reorderEnabled])

  // Cột số thứ tự (RowReorder): hiển thị / sắp xếp / tìm kiếm theo số thứ tự do DataTable giữ
  const cols = useMemo<DataTableColumn<T>[]>(() => {
    if (!reorderRows) return columns
    return columns.map((c, i) =>
      i !== orderCol
        ? c
        : {
            ...c,
            cell: (r: T) => seqs[rowIndex.get(r) ?? 0],
            sortValue: (r: T) => seqs[rowIndex.get(r) ?? 0],
            searchValue: (r: T) => String(seqs[rowIndex.get(r) ?? 0]),
          },
    )
  }, [columns, reorderRows, orderCol, seqs, rowIndex])

  // pos = vị trí trong colOrder (dùng cho kéo thả cột); cột số thứ tự có thể bị ẩn
  const displayColumns = useMemo(
    () =>
      colOrder
        .map((i, pos) => ({ c: cols[i], i, pos }))
        .filter(({ i }) => !(reorderRows && rrOpts.hideOrderColumn && i === orderCol)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [colOrder, cols, reorderRows, rrOpts.hideOrderColumn, orderCol],
  )

  const maxHidden = Math.max(0, displayColumns.length - 2)
  const hidden = responsive ? Math.min(hiddenCount, maxHidden) : 0
  const shown = hidden > 0 ? displayColumns.slice(0, displayColumns.length - hidden) : displayColumns
  const hiddenCols = hidden > 0 ? displayColumns.slice(displayColumns.length - hidden) : []
  const hasHidden = hiddenCols.length > 0

  // Responsive: sau mỗi lần render, nếu còn tràn ngang thì ẩn thêm một cột (chạy đồng bộ, chưa kịp vẽ)
  useLayoutEffect(() => {
    const el = scrollRef.current
    if (!responsive || !el) return
    if (el.scrollWidth > el.clientWidth + 1 && hiddenCount < maxHidden) setHiddenCount(hiddenCount + 1)
  })

  // Responsive: đổi bề rộng thì tính lại từ đầu (hiện lại tất cả rồi ẩn dần)
  useEffect(() => {
    const el = scrollRef.current
    if (!responsive || !el || typeof ResizeObserver === 'undefined') return
    let last = el.clientWidth
    const ro = new ResizeObserver(() => {
      if (el.clientWidth !== last) {
        last = el.clientWidth
        setHiddenCount(0)
      }
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [responsive])

  const onDragStart = (pos: number) => (e: DragEvent) => {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', String(pos)) // Firefox cần có dữ liệu mới cho kéo
    setDrag({ from: pos, over: pos })
  }

  const onDragEnter = (pos: number) => () => {
    if (!drag || drag.over === pos) return
    if (realtime) {
      // đổi chỗ ngay khi đang kéo; cột đang kéo giờ nằm ở vị trí pos
      setColOrder((o) => moveItem(o, drag.from, pos))
      setDrag({ from: pos, over: pos })
    } else {
      setDrag({ ...drag, over: pos })
    }
  }

  const onDrop = (e: DragEvent) => {
    e.preventDefault()
    if (drag && !realtime && drag.over !== drag.from) setColOrder((o) => moveItem(o, drag.from, drag.over))
    setDrag(null)
  }

  /** Vạch chèn (khi không realtime) và làm mờ cột đang kéo */
  const dragStyle = (pos: number): CSSProperties | undefined => {
    if (!drag || realtime) return undefined
    if (pos === drag.from) return { opacity: 0.5 }
    if (pos !== drag.over) return undefined
    return { boxShadow: `inset ${drag.over < drag.from ? '' : '-'}3px 0 0 #2196f3` }
  }

  const labels = { ...defaultLabels, ...paginateLabels }

  // 1) lọc: mọi từ khoá (cách nhau bằng khoảng trắng) đều phải xuất hiện ở đâu đó trong dòng
  const filtered = useMemo(() => {
    const terms = search.trim().toLowerCase().split(/\s+/).filter(Boolean)
    if (terms.length === 0) return rows
    return rows.filter((row) => {
      const haystack = cols
        .map((c) => {
          const fn = c.searchValue ?? c.sortValue
          return fn ? String(fn(row)) : ''
        })
        .join(' ')
        .toLowerCase()
      return terms.every((t) => haystack.includes(t))
    })
  }, [rows, cols, search])

  // 2) sắp xếp (ổn định: bằng nhau thì giữ thứ tự gốc)
  const sorted = useMemo(() => {
    const get = cols[order.column]?.sortValue
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
  }, [filtered, cols, order])

  // 3) phân trang
  const total = sorted.length
  const pages = paging ? Math.max(1, Math.ceil(total / length)) : 1
  const current = Math.min(page, pages - 1)
  const start = paging ? current * length : 0
  const visible = paging ? sorted.slice(start, start + length) : sorted

  /** Chuyển dòng hiển thị `from` tới vị trí hiển thị `over`; các dòng bị ảnh hưởng nhận lại số thứ tự của "ô" mới */
  applyReorderRef.current = (fromPos: number, overPos: number) => {
    const lo = Math.min(fromPos, overPos)
    const hi = Math.max(fromPos, overPos)
    const segment = visible.slice(lo, hi + 1)
    const slots = segment.map(seqOf)
    const moved = moveItem(segment, fromPos - lo, overPos - lo)
    const next = [...seqs]
    const changes: RowReorderChange<T>[] = []
    moved.forEach((row, k) => {
      const old = seqOf(row)
      if (old !== slots[k]) {
        next[rowIndex.get(row) ?? 0] = slots[k]
        changes.push({ row, oldPosition: old, newPosition: slots[k] })
      }
    })
    if (changes.length === 0) return
    setSeqState(next)
    rrOpts.onReorder?.({ trigger: segment[fromPos - lo], changes })
  }

  /** Nhấn chuột / chạm vào tay nắm: kéo đủ 4px mới bắt đầu, thả ra thì áp dụng (dùng pointer events nên chạy cả trên cảm ứng) */
  const startRowDrag = (r: number) => (e: ReactPointerEvent<HTMLTableRowElement>) => {
    if (!reorderRows || e.button !== 0 || !e.isPrimary) return
    const target = e.target as HTMLElement
    if (target.closest('button, input, select, textarea, .dropdown-menu')) return
    if (selector !== 'row') {
      const td = target.closest('td')
      if (!td || td.cellIndex !== (selector === 'first' ? 0 : selector)) return
    }

    rowDragRef.current = { from: r, over: r, active: false, x: e.clientX, y: e.clientY }

    const onMove = (ev: PointerEvent) => {
      const d = rowDragRef.current
      if (!d) return
      if (!d.active) {
        if (Math.hypot(ev.clientX - d.x, ev.clientY - d.y) < 4) return
        d.active = true
        setRowDrag({ from: d.from, over: d.from })
      }
      const el = document.elementFromPoint(ev.clientX, ev.clientY)?.closest<HTMLElement>('tr[data-row-index]')
      if (el && tbodyRef.current?.contains(el)) {
        const over = Number(el.dataset.rowIndex)
        if (over !== d.over) {
          d.over = over
          setRowDrag({ from: d.from, over })
        }
      }
    }
    const finish = (commit: boolean) => {
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerup', onUp)
      document.removeEventListener('pointercancel', onCancel)
      const d = rowDragRef.current
      rowDragRef.current = null
      setRowDrag(null)
      if (commit && d?.active && d.over !== d.from) applyReorderRef.current(d.from, d.over)
    }
    const onUp = () => finish(true)
    const onCancel = () => finish(false)
    document.addEventListener('pointermove', onMove)
    document.addEventListener('pointerup', onUp)
    document.addEventListener('pointercancel', onCancel)
  }

  /** Style của ô: con trỏ "move" ở tay nắm, làm mờ dòng đang kéo, vạch chèn ở dòng đích */
  const rowCellStyle = (r: number, p: number): CSSProperties | undefined => {
    if (!reorderRows) return undefined
    const s: CSSProperties = {}
    if (selector === 'row' || p === (selector === 'first' ? 0 : selector)) {
      s.cursor = 'move'
      s.userSelect = 'none'
      if (selector !== 'row') s.touchAction = 'none' // để kéo bằng cảm ứng không bị cuộn trang
    }
    if (rowDrag) {
      if (r === rowDrag.from) s.opacity = 0.5
      else if (r === rowDrag.over)
        s.boxShadow = `inset 0 ${rowDrag.over > rowDrag.from ? '-' : ''}2px 0 #2196f3`
    }
    return s
  }

  const toggleRow = (ri: number) =>
    setOpenRows((s) => {
      const n = new Set(s)
      if (!n.delete(ri)) n.add(ri)
      return n
    })

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
    <table
      className={`table dataTable no-footer${responsive ? ' dtr-inline' : ''}${hasHidden ? ' collapsed' : ''} ${className}`.trim()}
      style={responsive ? { whiteSpace: 'nowrap' } : undefined}
    >
      <thead>
        <tr>
          {shown.map(({ c, i, pos }) => {
            const sortable = !!c.sortValue
            const sortClass = !sortable ? 'sorting_disabled' : order.column === i ? `sorting_${order.dir}` : 'sorting'
            return (
              <th
                key={i}
                className={[c.className, sortClass].filter(Boolean).join(' ')}
                style={{
                  ...stickyStyle,
                  ...(c.width !== undefined ? { width: c.width } : null),
                  ...dragStyle(pos),
                }}
                {...(reorderEnabled
                  ? {
                      draggable: true,
                      onDragStart: onDragStart(pos),
                      onDragEnter: onDragEnter(pos),
                      onDragOver: (e: DragEvent) => e.preventDefault(),
                      onDrop,
                      onDragEnd: () => setDrag(null),
                    }
                  : null)}
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
      <tbody
        ref={tbodyRef}
        style={rowDrag ? { cursor: 'move', userSelect: 'none' } : undefined}
      >
        {visible.length === 0 ? (
          <tr>
            <td colSpan={shown.length} className="dataTables_empty">
              No matching records found
            </td>
          </tr>
        ) : (
          visible.map((row, r) => {
            const idx = start + r
            const ri = rowIndex.get(row) ?? idx
            const open = hasHidden && openRows.has(ri)
            return (
              <Fragment key={rowKey ? rowKey(row, idx) : idx}>
                <tr
                  role="row"
                  data-row-index={r}
                  className={open ? 'parent dtr-expanded' : undefined}
                  onPointerDown={reorderRows ? startRowDrag(r) : undefined}
                >
                  {shown.map(({ c, i }, p) => (
                    <td
                      key={i}
                      className={[c.className, hasHidden && p === 0 && 'dtr-control'].filter(Boolean).join(' ') || undefined}
                      style={rowCellStyle(r, p)}
                      onClick={hasHidden && p === 0 ? () => toggleRow(ri) : undefined}
                    >
                      {c.cell(row, idx)}
                    </td>
                  ))}
                </tr>
                {open && (
                  <tr className="child">
                    <td className="child" colSpan={shown.length}>
                      <ul className="dtr-details" style={{ whiteSpace: 'normal' }}>
                        {hiddenCols.map(({ c, i }) => (
                          <li key={i}>
                            <span className="dtr-title">{c.header}</span> <span className="dtr-data">{c.cell(row, idx)}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </Fragment>
            )
          })
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

      <div className="datatable-scroll" ref={scrollRef}>
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
