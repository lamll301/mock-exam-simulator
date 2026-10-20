export type ControlSize = 'sm' | 'lg'

/** Ghép class cho .form-control: "form-control form-control-lg <extra>" */
export function controlClass(size?: ControlSize, extra?: string) {
  return ['form-control', size && `form-control-${size}`, extra].filter(Boolean).join(' ')
}
