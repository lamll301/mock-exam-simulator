import { useState, type ChangeEvent, type ReactNode, type SelectHTMLAttributes } from 'react'
import { controlClass, type ControlSize } from './controlClass'

export interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  inputSize?: ControlSize
  /** "custom" = .custom-select của Bootstrap thay vì .form-control */
  variant?: 'default' | 'custom'
  options?: SelectOption[]
  children?: ReactNode
}

/** select gốc: .form-control (mặc định) hoặc .custom-select. Có thể truyền options hoặc <option> tự viết */
export default function Select({ inputSize, variant = 'default', options, className, children, ...rest }: SelectProps) {
  const cls =
    variant === 'custom'
      ? ['custom-select', inputSize && `custom-select-${inputSize}`, className].filter(Boolean).join(' ')
      : controlClass(inputSize, className)

  return (
    <select className={cls} {...rest}>
      {children ??
        options?.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
    </select>
  )
}

interface StyledSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'children' | 'defaultValue'> {
  options: SelectOption[]
  defaultValue?: string
  /**
   * Class của vỏ ngoài. Mặc định "uniform-select" (kiểu uniform của Limitless);
   * đổi màu bằng cách truyền thêm, ví dụ "uniform-select bg-pink-400 border-pink-400".
   */
  wrapperClassName?: string
}

/**
 * Select "styled" (thay cho plugin uniform.js của template): vỏ div hiển thị nhãn đang chọn,
 * <select> thật nằm đè lên, trong suốt, nên vẫn dùng bàn phím / trình chọn của trình duyệt bình thường.
 */
export function StyledSelect({
  options,
  defaultValue,
  wrapperClassName = 'uniform-select',
  onChange,
  style,
  ...rest
}: StyledSelectProps) {
  const initial = options.find((o) => o.value === defaultValue) ?? options[0]
  const [label, setLabel] = useState(initial?.label ?? '')

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLabel(e.target.selectedOptions[0]?.text ?? '')
    onChange?.(e)
  }

  return (
    <div className={wrapperClassName} style={{ position: 'relative' }}>
      <span>{label}</span>
      <select
        defaultValue={initial?.value}
        {...rest}
        onChange={handleChange}
        style={{ ...style, position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}
