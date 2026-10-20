import Icon from '../Icon'
import TextInput from './TextInput'
import type { ComponentProps } from 'react'

interface FeedbackInputProps extends ComponentProps<typeof TextInput> {
  /** Tên icon Icomoon (bỏ tiền tố "icon-") */
  icon: string
  iconPosition?: 'left' | 'right'
  /** true = icon quay (spinner) */
  spin?: boolean
  /** Class cho vùng chứa icon, ví dụ "text-success" (dùng ở trạng thái validation) */
  feedbackClassName?: string
  /** true = thêm .form-group để xếp chồng nhiều input có khoảng cách */
  grouped?: boolean
}

/** Input có icon bên trái / phải (.form-group-feedback), tự đổi cỡ icon theo cỡ input */
export default function FeedbackInput({
  icon,
  iconPosition = 'left',
  spin = false,
  feedbackClassName,
  grouped = false,
  inputSize,
  ...input
}: FeedbackInputProps) {
  const wrapperCls = [grouped && 'form-group', 'form-group-feedback', `form-group-feedback-${iconPosition}`]
    .filter(Boolean)
    .join(' ')
  const feedbackCls = ['form-control-feedback', inputSize && `form-control-feedback-${inputSize}`, feedbackClassName]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={wrapperCls}>
      <TextInput inputSize={inputSize} {...input} />
      <div className={feedbackCls}>
        <Icon name={icon} className={spin ? 'spinner' : ''} />
      </div>
    </div>
  )
}
