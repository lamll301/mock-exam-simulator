interface IconProps {
  /** Tên icon Icomoon bỏ tiền tố "icon-", ví dụ "home4" -> class "icon-home4" */
  name: string
  className?: string
}

/**
 * Cần import CSS của Icomoon (global_assets/css/icons/icomoon/styles.min.css),
 * xem hướng dẫn trong README.md cùng thư mục.
 */
export default function Icon({ name, className = '' }: IconProps) {
  return <i className={`icon-${name} ${className}`.trim()} aria-hidden="true" />
}
