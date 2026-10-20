import { DemoBody, DemoFooter } from './DemoContent'
import Modal, { ModalHeader, type ModalSize } from './Modal'
import type { ModalGroupProps, SizeModalId } from './modalTypes'

// Default size dùng lại modal "default" ở BasicModals nên không lặp lại ở đây
const sizes: { id: SizeModalId; size: ModalSize; title: string }[] = [
  { id: 'mini', size: 'xs', title: 'Mini modal' },
  { id: 'small', size: 'sm', title: 'Small modal' },
  { id: 'large', size: 'lg', title: 'Large modal' },
  { id: 'full', size: 'full', title: 'Full width modal' },
]

/** Modal sizing: mini (300px), small (400px), large (900px), full (94%) */
export default function SizeModals({ active, onClose }: ModalGroupProps) {
  return (
    <>
      {sizes.map((s) => (
        <Modal key={s.id} open={active === s.id} onClose={onClose} size={s.size}>
          <ModalHeader title={s.title} />
          <DemoBody />
          <DemoFooter />
        </Modal>
      ))}
    </>
  )
}
