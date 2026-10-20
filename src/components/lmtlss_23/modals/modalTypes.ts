export type BasicModalId = 'default' | 'iconified' | 'backdrop' | 'keyboard' | 'animation' | 'scrollable' | 'remote'
export type SizeModalId = 'mini' | 'small' | 'large' | 'full'
export type ColorModalId = 'primary' | 'danger' | 'success' | 'warning' | 'info' | 'custom' | 'bg_custom'
export type FormModalId = 'form_vertical' | 'form_horizontal' | 'form_inline'
export type HeadingModalId = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'title_basic' | 'subtitle'
export type EventModalId = 'onshow' | 'onshown' | 'onhide' | 'onhidden'
export type DialogId = 'alert' | 'confirm' | 'prompt' | 'prompt_value' | 'bootbox_custom' | 'bootbox_form'

/** Id của mọi modal demo; nút Launch trong bảng và modal khớp nhau qua id này */
export type ModalId =
  | BasicModalId
  | SizeModalId
  | ColorModalId
  | FormModalId
  | HeadingModalId
  | EventModalId
  | DialogId

/** Props chung của các nhóm modal: modal nào có id trùng `active` thì mở */
export interface ModalGroupProps {
  active: ModalId | null
  onClose: () => void
}
