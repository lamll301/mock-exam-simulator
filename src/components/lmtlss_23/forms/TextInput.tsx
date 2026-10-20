import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { controlClass, type ControlSize } from './controlClass'

interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Cỡ input: "lg" / "sm" (mặc định là cỡ thường) */
  inputSize?: ControlSize
}

/**
 * input.form-control. Nhận mọi thuộc tính của <input> (type, placeholder, readOnly, disabled, maxLength...).
 * className truyền thêm dùng cho class tiện ích của Limitless: border-success, rounded-round, text-center...
 */
export default function TextInput({ inputSize, className, type = 'text', ...rest }: TextInputProps) {
  return <input type={type} className={controlClass(inputSize, className)} {...rest} />
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  inputSize?: ControlSize
}

export function Textarea({ inputSize, className, rows = 3, ...rest }: TextareaProps) {
  return <textarea rows={rows} className={controlClass(inputSize, className)} {...rest} />
}
