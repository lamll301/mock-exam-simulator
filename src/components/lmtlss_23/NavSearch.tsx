import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from './Icon'
import type { NavNode } from './navTypes'

interface SearchItem {
  label: string
  to: string
  icon?: string
  /** Đường dẫn menu cha, ví dụ "Form components › Inputs" */
  path: string
}

// Làm phẳng cây menu, bỏ qua link giữ chỗ ('#') và link disabled
function flatten(nodes: NavNode[], parents: string[] = [], inheritedIcon?: string, out: SearchItem[] = []) {
  for (const node of nodes) {
    if (node.type === 'group') {
      flatten(node.children, [...parents, node.label], node.icon ?? inheritedIcon, out)
    } else if (node.type === 'link' && !node.disabled && node.to !== '#') {
      out.push({
        label: node.label,
        to: node.to,
        icon: node.icon ?? inheritedIcon,
        path: parents.join(' › '),
      })
    }
  }
  return out
}

// Bỏ dấu + chữ thường để gõ "bang" vẫn tìm ra "Bảng"
const normalize = (s: string) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

export default function NavSearch({ navigation }: { navigation: NavNode[] }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const items = useMemo(() => flatten(navigation), [navigation])

  const results = useMemo(() => {
    const q = normalize(query.trim())
    if (!q) return []
    return items
      .filter((i) => normalize(`${i.label} ${i.path}`).includes(q))
      .slice(0, 10)
  }, [items, query])

  useEffect(() => setActive(0), [query])

  // Ctrl/Cmd + K để focus ô tìm kiếm
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Bấm ra ngoài thì đóng
  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [])

  const go = (item: SearchItem) => {
    navigate(item.to)
    setQuery('')
    setOpen(false)
    inputRef.current?.blur()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && results[active]) {
      e.preventDefault()
      go(results[active])
    } else if (e.key === 'Escape') {
      setOpen(false)
      inputRef.current?.blur()
    }
  }

  const showPanel = open && query.trim() !== ''

  return (
    <div
        ref={rootRef}
        className="position-relative mx-md-auto my-2 my-md-0"
        style={{ width: '100%', maxWidth: 480, flex: '0 1 480px' }}
        >
      <div className="form-group-feedback form-group-feedback-left mb-0">
        <input
          ref={inputRef}
          type="text"
          value={query}
          placeholder="Search menu… (Ctrl+K)"
          className="form-control form-control-sm"
          style={{ background: 'rgba(255,255,255,.1)', border: 0, color: '#fff' }}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
        />
        <div className="form-control-feedback form-control-feedback-sm">
          <Icon name="search4" className="text-white opacity-50" />
        </div>
      </div>

      {showPanel && (
        <div
          className="dropdown-menu show w-100"
          style={{ position: 'absolute', top: '100%', left: 0, maxHeight: 360, overflowY: 'auto' }}
        >
          {results.length === 0 ? (
            <span className="dropdown-item-text text-muted">No results</span>
          ) : (
            results.map((r, i) => (
              <a
                key={r.to + r.label}
                href={r.to}
                className={`dropdown-item ${i === active ? 'active' : ''}`.trim()}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => e.preventDefault()} // giữ focus để click không bị blur trước
                onClick={(e) => {
                  e.preventDefault()
                  go(r)
                }}
              >
                {r.icon && <Icon name={r.icon} />}
                <span>
                  {r.label}
                  {r.path && <span className="text-muted font-size-xs ml-2">{r.path}</span>}
                </span>
              </a>
            ))
          )}
        </div>
      )}
    </div>
  )
}