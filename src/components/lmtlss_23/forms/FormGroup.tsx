
import type { ReactNode } from 'react'

type Breakpoint = 'sm' | 'md' | 'lg'

interface FormGroupProps {
  label?: ReactNode
  /** Breakpoint bắt đầu hiển thị label và input trên cùng một hàng */
  breakpoint?: Breakpoint
  /** Cỡ label, tương ứng .col-form-label-lg / .col-form-label-sm */
  labelSize?: 'sm' | 'lg'
  /** Class bổ sung cho label */
  labelClassName?: string
  htmlFor?: string
  className?: string
  children: ReactNode
}

/** Form ngang: label chiếm 2 cột, vùng nhập chiếm 10 cột */
export function FormGroup({
  label,
  breakpoint = 'lg',
  labelSize,
  labelClassName,
  htmlFor,
  className,
  children,
}: FormGroupProps) {
  const labelCls = [
    'col-form-label',
    labelSize && `col-form-label-${labelSize}`,
    `col-${breakpoint}-2`,
    labelClassName,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={['form-group row', className].filter(Boolean).join(' ')}>
      <label className={labelCls} htmlFor={htmlFor}>
        {label}
      </label>

      <div className={`col-${breakpoint}-10`}>{children}</div>
    </div>
  )
}

/** Nhóm các dòng form có tiêu đề in hoa */
export function Fieldset({
  legend,
  children,
}: {
  legend: string
  children: ReactNode
}) {
  return (
    <fieldset className="mb-3">
      <legend className="text-uppercase font-size-sm font-weight-bold">
        {legend}
      </legend>
      {children}
    </fieldset>
  )
}
