import Modal, { ModalBody, ModalDismiss, ModalFooter, ModalHeader } from './Modal'
import type { ModalGroupProps } from './modalTypes'

const log = (name: string) => () => console.log(`[modal] ${name} event has been fired`)

function EventContent({ name }: { name: string }) {
  return (
    <>
      <ModalHeader title={`${name} event demo`} />
      <ModalBody>{name} event has been fired.</ModalBody>
      <ModalFooter>
        <ModalDismiss className="btn btn-light">Cool</ModalDismiss>
      </ModalFooter>
    </>
  )
}

/**
 * Modal events: onShow / onShown / onHide / onHidden của <Modal> tương ứng
 * show / shown / hide / hidden.bs.modal. Ở đây mỗi sự kiện ghi ra console khi chạy.
 */
export default function EventModals({ active, onClose }: ModalGroupProps) {
  return (
    <>
      <Modal open={active === 'onshow'} onClose={onClose} onShow={log('onShow')}>
        <EventContent name="onShow" />
      </Modal>
      <Modal open={active === 'onshown'} onClose={onClose} onShown={log('onShown')}>
        <EventContent name="onShown" />
      </Modal>
      <Modal open={active === 'onhide'} onClose={onClose} onHide={log('onHide')}>
        <EventContent name="onHide" />
      </Modal>
      <Modal open={active === 'onhidden'} onClose={onClose} onHidden={log('onHidden')}>
        <EventContent name="onHidden" />
      </Modal>
    </>
  )
}
