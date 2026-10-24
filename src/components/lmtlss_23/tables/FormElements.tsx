import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from 'react'
import Icon from '../Icon'

/* ------------------------------------------------------------------ */
/* Các thành phần form mô phỏng plugin của template (uniform, switchery, */
/* select2, multiselect, touchspin...) bằng đúng markup / class của chúng */
/* ------------------------------------------------------------------ */

/** Hộp "form-check" bọc nhãn; right = nhãn nằm bên trái, ô chọn nằm bên phải */
export function CheckField({
  label,
  control,
  right,
  className,
}: {
  label: ReactNode
  control: ReactNode
  right?: boolean
  className?: string
}) {
  return (
    <div className={['form-check form-check-inline', right && 'form-check-right', className].filter(Boolean).join(' ')}>
      <label className="form-check-label">
        {right ? (
          <>
            {label}
            {control}
          </>
        ) : (
          <>
            {control}
            {label}
          </>
        )}
      </label>
    </div>
  )
}

/** Checkbox / radio kiểu uniform.js (.uniform-checker / .uniform-choice). Truyền `checked` để điều khiển từ ngoài (nhóm radio) */
export function UniformInput({
  type,
  checked,
  defaultChecked = false,
  onChange,
}: {
  type: 'checkbox' | 'radio'
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
}) {
  const [inner, setInner] = useState(defaultChecked)
  const controlled = checked !== undefined
  const on = controlled ? checked : inner
  return (
    <div className={type === 'checkbox' ? 'uniform-checker' : 'uniform-choice'}>
      <span className={on ? 'checked' : undefined}>
        <input
          type={type}
          className="form-input-styled"
          checked={on}
          onChange={(e) => {
            if (!controlled) setInner(e.target.checked)
            onChange?.(e.target.checked)
          }}
        />
      </span>
    </div>
  )
}

/** Công tắc kiểu Switchery */
export function Switchery({
  checked,
  defaultChecked = true,
  color = '#64bd63',
  onChange,
}: {
  checked?: boolean
  defaultChecked?: boolean
  color?: string
  onChange?: (checked: boolean) => void
}) {
  const [inner, setInner] = useState(defaultChecked)
  const controlled = checked !== undefined
  const on = controlled ? checked : inner
  const trackRef = useRef<HTMLSpanElement>(null)
  const knobRef = useRef<HTMLElement>(null)
  const [left, setLeft] = useState(0)

  // vị trí núm gạt = bề rộng công tắc - bề rộng núm (giống cách plugin tính)
  useLayoutEffect(() => {
    const t = trackRef.current
    const k = knobRef.current
    setLeft(on && t && k ? t.offsetWidth - k.offsetWidth : 0)
  }, [on])

  const toggle = () => {
    if (!controlled) setInner(!on)
    onChange?.(!on)
  }

  const track: CSSProperties = {
    backgroundColor: on ? color : '#fff',
    borderColor: on ? color : '#dfdfdf',
    boxShadow: on ? `${color} 0 0 0 16px inset` : '#dfdfdf 0 0 0 0 inset',
    transition: 'border 0.4s, box-shadow 0.4s, background-color 1.2s',
    cursor: 'pointer',
  }

  return (
    <span
      ref={trackRef}
      className="switchery switchery-default"
      role="switch"
      aria-checked={on}
      tabIndex={0}
      style={track}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault()
          toggle()
        }
      }}
    >
      <small ref={knobRef} style={{ left, transition: 'left 0.2s' }} />
    </span>
  )
}

/** Select kiểu uniform.js (.uniform-select) */
export function UniformSelect({ options }: { options: string[] }) {
  const [value, setValue] = useState(0)
  return (
    <div className="uniform-select">
      <span>{options[value]}</span>
      <select className="form-control form-input-styled" value={value} onChange={(e) => setValue(Number(e.target.value))}>
        {options.map((o, i) => (
          <option key={i} value={i}>
            {o}
          </option>
        ))}
      </select>
    </div>
  )
}

/** Ô chọn file kiểu uniform.js (.uniform-uploader); multiple: dùng cho "Multiple uploader" */
export function UniformUploader({ multiple }: { multiple?: boolean }) {
  const [name, setName] = useState('')
  return (
    <div className="uniform-uploader">
      <input
        type="file"
        className="form-input-styled"
        multiple={multiple}
        onChange={(e) => {
          const files = Array.from(e.target.files ?? [])
          setName(files.length > 1 ? `${files.length} tệp đã chọn` : (files[0]?.name ?? ''))
        }}
      />
      <span className="filename" style={{ userSelect: 'none' }}>
        {name || 'Chưa chọn tệp'}
      </span>
      <span className="action btn bg-pink-400" style={{ userSelect: 'none' }}>
        Chọn tệp
      </span>
    </div>
  )
}

/** Ô số có nút +/- kiểu bootstrap-touchspin */
export function Spinner({ defaultValue = 20, min = 0, max = 100, step = 1 }: { defaultValue?: number; min?: number; max?: number; step?: number }) {
  const [v, setV] = useState(defaultValue)
  const clamp = (n: number) => Math.min(max, Math.max(min, n))
  return (
    <div className="bootstrap-touchspin input-group">
      <span className="input-group-prepend">
        <button type="button" className="btn btn-light bootstrap-touchspin-down" onClick={() => setV(clamp(v - step))}>
          <Icon name="minus3" />
        </button>
      </span>
      <input
        type="text"
        className="form-control form-control-touchspin"
        value={v}
        onChange={(e) => {
          const n = Number(e.target.value)
          if (!Number.isNaN(n)) setV(clamp(n))
        }}
      />
      <span className="input-group-append">
        <button type="button" className="btn btn-light bootstrap-touchspin-up" onClick={() => setV(clamp(v + step))}>
          <Icon name="plus3" />
        </button>
      </span>
    </div>
  )
}

/* ---------------------------- select2 ----------------------------- */

export interface Select2Option {
  value: string
  label: string
  /** Icon icomoon đứng trước nhãn: { name: 'radio-checked', className: 'text-danger' } */
  icon?: { name: string; className?: string }
}

/** Đóng khi click ra ngoài / nhấn Esc */
function useClose(open: boolean, close: () => void, ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!open) return
    const onDown = (e: globalThis.MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) close()
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, close, ref])
}

/** Vị trí fixed của dropdown ngay dưới phần tử gốc (không bị .table-responsive / .modal-body cắt) */
function fixedBelow(el: HTMLElement | null): CSSProperties {
  const r = el?.getBoundingClientRect()
  return r ? { position: 'fixed', top: r.bottom, left: r.left, minWidth: r.width, zIndex: 1060 } : {}
}

function OptionLabel({ o }: { o: Select2Option }) {
  return (
    <>
      {o.icon && (
        <span className={['mr-2', o.icon.className].filter(Boolean).join(' ')}>
          <Icon name={o.icon.name} />
        </span>
      )}
      {o.label}
    </>
  )
}

/** Select kiểu select2: chọn một (single) hoặc nhiều (multiple, hiện dạng thẻ có nút ×) */
export function Select2Select({
  options,
  multiple,
  defaultValue,
  disabled,
}: {
  options: Select2Option[]
  multiple?: boolean
  defaultValue?: string[]
  disabled?: boolean
}) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<string[]>(defaultValue ?? (multiple ? [] : [options[0]?.value]))
  const ref = useRef<HTMLSpanElement>(null)
  useClose(open, () => setOpen(false), ref)

  const byValue = (v: string) => options.find((o) => o.value === v)
  const pick = (v: string) => {
    if (multiple) setValue((cur) => (cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v]))
    else {
      setValue([v])
      setOpen(false)
    }
  }
  const isOpen = open && !disabled

  return (
    <span
      ref={ref}
      className={[
        'select2 select2-container select2-container--default',
        isOpen && 'select2-container--open',
        disabled && 'select2-container--disabled',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ width: '100%' }}
    >
      <span className="selection">
        <span
          className={`select2-selection select2-selection--${multiple ? 'multiple' : 'single'}`}
          role="combobox"
          aria-expanded={isOpen}
          tabIndex={disabled ? -1 : 0}
          onClick={() => !disabled && setOpen((o) => !o)}
        >
          {multiple ? (
            <ul className="select2-selection__rendered">
              {value.map((v) => {
                const o = byValue(v)
                return (
                  o && (
                    <li key={v} className="select2-selection__choice" title={o.label}>
                      <span
                        className="select2-selection__choice__remove"
                        role="presentation"
                        onClick={(e: MouseEvent) => {
                          e.stopPropagation()
                          if (!disabled) pick(v)
                        }}
                      >
                        ×
                      </span>
                      <OptionLabel o={o} />
                    </li>
                  )
                )
              })}
            </ul>
          ) : (
            <>
              <span className="select2-selection__rendered">{byValue(value[0]) && <OptionLabel o={byValue(value[0])!} />}</span>
              <span className="select2-selection__arrow" role="presentation">
                <b role="presentation" />
              </span>
            </>
          )}
        </span>
      </span>

      {isOpen && (
        <span className="select2-dropdown select2-dropdown--below" style={fixedBelow(ref.current)}>
          <span className="select2-results">
            <ul className="select2-results__options" role="listbox">
              {options.map((o, i) => {
                const selected = value.includes(o.value)
                return (
                  <li
                    key={`${o.value}-${i}`}
                    role="option"
                    aria-selected={selected}
                    className={`select2-results__option${selected ? ' select2-results__option--highlighted' : ''}`}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => pick(o.value)}
                  >
                    <OptionLabel o={o} />
                  </li>
                )
              })}
            </ul>
          </span>
        </span>
      )}
    </span>
  )
}

/* --------------------------- multiselect -------------------------- */

/** Select nhiều lựa chọn có checkbox, kiểu bootstrap-multiselect */
export function MultiSelect({ options }: { options: string[] }) {
  const [open, setOpen] = useState(false)
  const [checked, setChecked] = useState<number[]>([])
  const ref = useRef<HTMLDivElement>(null)
  useClose(open, () => setOpen(false), ref)

  const text =
    checked.length === 0
      ? 'Chưa chọn mục nào'
      : checked.length > 3
        ? `${checked.length} mục đã chọn`
        : checked.map((i) => options[i]).join(', ')

  return (
    <div ref={ref} className={`btn-group${open ? ' show' : ''}`}>
      <button type="button" className="multiselect dropdown-toggle btn btn-light" onClick={() => setOpen((o) => !o)}>
        <span className="multiselect-selected-text">{text}</span>
      </button>
      {open && (
        <div className="multiselect-container dropdown-menu show" style={fixedBelow(ref.current)}>
          {options.map((o, i) => (
            <div key={i} className="dropdown-item">
              <div className="form-check mb-0">
                <label className="form-check-label">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={checked.includes(i)}
                    onChange={() => setChecked((c) => (c.includes(i) ? c.filter((x) => x !== i) : [...c, i]))}
                  />
                  {o}
                </label>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* -------------------------- context menu -------------------------- */

/** Ô <td> mở menu chuột phải tại vị trí con trỏ */
export function ContextMenuCell({ children, menu }: { children: ReactNode; menu: ReactNode }) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)
  const close = () => setPos(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!pos) return
    const onDown = (e: globalThis.MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) close()
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    window.addEventListener('scroll', close, true)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', close, true)
    }
  }, [pos])

  return (
    <td
      onContextMenu={(e) => {
        e.preventDefault()
        setPos({ x: e.clientX, y: e.clientY })
      }}
    >
      {children}
      {pos && (
        <div
          ref={ref}
          className="dropdown-menu show"
          style={{ position: 'fixed', left: pos.x, top: pos.y, zIndex: 1060 }}
          onClick={close}
        >
          {menu}
        </div>
      )}
    </td>
  )
}
