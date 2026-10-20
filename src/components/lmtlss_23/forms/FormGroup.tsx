import type { ReactNode } from 'react'

interface FormGroupProps {
  label?: ReactNode
  /** Điểm gãy của lưới: template dùng "lg" cho phần lớn, "md" cho nhóm Text options / Type options */
  breakpoint?: 'md' | 'lg'
  /** Cỡ label, đi cùng input cỡ lớn / nhỏ (.col-form-label-lg / -sm) */
  labelSize?: 'sm' | 'lg'
  /** Class thêm cho label, ví dụ "cursor-pointer" hoặc "font-weight-semibold text-success" */
  labelClassName?: string
  htmlFor?: string
  className?: string
  children: ReactNode
}

/** Một dòng form ngang: label bên trái (2 cột) + vùng nhập bên phải (10 cột) */
export function FormGroup({
  label,
  breakpoint = 'lg',
  labelSize,
  labelClassName,
  htmlFor,
  className,
  children,
}: FormGroupProps) {
  const labelCls = ['col-form-label', labelSize && `col-form-label-${labelSize}`, `col-${breakpoint}-2`, labelClassName]
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

/** Nhóm các dòng form có tiêu đề in hoa (fieldset.mb-3 > legend) */
export function Fieldset({ legend, children }: { legend: string; children: ReactNode }) {
  return (
    <fieldset className="mb-3">
      <legend className="text-uppercase font-size-sm font-weight-bold">{legend}</legend>
      {children}
    </fieldset>
  )
}
