import { useId, useState, type ChangeEvent, type InputHTMLAttributes } from 'react'

type FileProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'>

const firstName = (e: ChangeEvent<HTMLInputElement>) => e.target.files?.[0]?.name ?? ''

/** Input file mặc định của trình duyệt (.form-control.h-auto) */
export default function FileInput({ className, ...rest }: FileProps) {
  return <input type="file" className={['form-control h-auto', className].filter(Boolean).join(' ')} {...rest} />
}

interface StyledFileInputProps extends FileProps {
  /** Class của nút bên phải; đổi màu bằng cách truyền, ví dụ "action btn bg-pink-400" */
  buttonClassName?: string
  buttonText?: string
  emptyText?: string
}

/**
 * File input "styled" (thay cho uniform.js): ô hiện tên file + nút "Choose File",
 * <input> thật nằm đè lên, trong suốt, nên bấm vào đâu cũng mở trình chọn file.
 */
export function StyledFileInput({
  buttonClassName = 'action btn btn-light',
  buttonText = 'Choose File',
  emptyText = 'No file selected',
  onChange,
  style,
  ...rest
}: StyledFileInputProps) {
  const [name, setName] = useState('')

  return (
    <div className="uniform-uploader" style={{ position: 'relative' }}>
      <input
        type="file"
        {...rest}
        onChange={(e) => {
          setName(firstName(e))
          onChange?.(e)
        }}
        style={{ ...style, position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', zIndex: 2 }}
      />
      <span className="filename" style={{ userSelect: 'none' }}>
        {name || emptyText}
      </span>
      <span className={buttonClassName} style={{ userSelect: 'none' }}>
        {buttonText}
      </span>
    </div>
  )
}

interface CustomFileInputProps extends FileProps {
  placeholder?: string
}

/** .custom-file của Bootstrap; label hiện tên file đã chọn (Bootstrap JS làm việc này ở bản gốc) */
export function CustomFileInput({ placeholder = 'Choose file', id, onChange, ...rest }: CustomFileInputProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  const [name, setName] = useState('')

  return (
    <div className="custom-file">
      <input
        type="file"
        id={inputId}
        className="custom-file-input"
        onChange={(e) => {
          setName(firstName(e))
          onChange?.(e)
        }}
        {...rest}
      />
      <label className="custom-file-label" htmlFor={inputId}>
        {name || placeholder}
      </label>
    </div>
  )
}
