import { DemoBody, DemoFooter } from './DemoContent'
import Modal, { ModalBody, ModalDismiss, ModalFooter, ModalHeader } from './Modal'
import type { ColorModalId, ModalGroupProps } from './modalTypes'
import { lorem } from './DemoContent'

// Màu nằm ở .modal-header (và nút Save) theo class màu của Limitless
const themes: { id: ColorModalId; title: string; color: string }[] = [
  { id: 'primary', title: 'Primary header', color: 'primary' },
  { id: 'danger', title: 'Danger header', color: 'danger' },
  { id: 'success', title: 'Success header', color: 'success' },
  { id: 'warning', title: 'Warning header', color: 'warning' },
  { id: 'info', title: 'Info header', color: 'info' },
  { id: 'custom', title: 'Custom header color', color: 'brown' },
]

/** Optional modal colors: header màu theo ngữ cảnh, header tuỳ biến, nền tuỳ biến */
export default function ColorModals({ active, onClose }: ModalGroupProps) {
  return (
    <>
      {themes.map((t) => (
        <Modal key={t.id} open={active === t.id} onClose={onClose}>
          <ModalHeader as="h6" title={t.title} className={`bg-${t.color}`} />
          <DemoBody />
          <DemoFooter saveClassName={`bg-${t.color}`} />
        </Modal>
      ))}

      <Modal open={active === 'bg_custom'} onClose={onClose} contentClassName="bg-teal-300">
        <ModalHeader title="Custom background color" />
        <ModalBody>
          <h6 className="font-weight-semibold">Text in a modal</h6>
          <p>{lorem.duis}</p>

          <hr />

          <h6 className="font-weight-semibold">Another paragraph</h6>
          <p>{lorem.cras}</p>
          <p>{lorem.praesent}</p>
        </ModalBody>
        <ModalFooter>
          <ModalDismiss className="btn btn-link text-white">Close</ModalDismiss>
          <button type="button" className="btn bg-teal-600">
            Save changes
          </button>
        </ModalFooter>
      </Modal>
    </>
  )
}
