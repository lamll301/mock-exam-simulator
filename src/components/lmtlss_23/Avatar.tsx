// Template dùng ảnh placeholder; ở đây dùng chữ cái đầu để không phụ thuộc file ảnh.
// Màu lấy từ colors.min.css của Limitless.
const palette = ['bg-teal-400', 'bg-pink-400', 'bg-blue-400', 'bg-indigo-300', 'bg-warning-400', 'bg-success-400']

function pickColor(name: string) {
  const sum = [...name].reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
  return palette[sum % palette.length]
}

interface AvatarProps {
  name: string
  size?: number
  className?: string
}

export default function Avatar({ name, size = 36, className = '' }: AvatarProps) {
  return (
    <div
      style={{ width: size, height: size, flexShrink: 0, lineHeight: 1, fontSize: Math.round(size * 0.42) }}
      className={`d-inline-flex align-items-center justify-content-center rounded-circle text-white font-weight-semibold ${pickColor(name)} ${className}`}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  )
}
