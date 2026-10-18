// Template dùng ảnh placeholder; ở đây dùng chữ cái đầu để không phụ thuộc file ảnh.
const palette = [
  'bg-lt-teal-400',
  'bg-lt-pink-400',
  'bg-lt-blue-400',
  'bg-lt-indigo-300',
  'bg-lt-warning-400',
  'bg-lt-success-400',
]

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
    <span
      style={{ width: size, height: size }}
      className={`inline-flex shrink-0 items-center justify-center rounded-full text-sm font-medium text-white ${pickColor(name)} ${className}`}
    >
      {name.charAt(0).toUpperCase()}
    </span>
  )
}
