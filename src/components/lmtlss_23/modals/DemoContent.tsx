import { ModalBody, ModalDismiss, ModalFooter } from './Modal'

export const lorem = {
  duis: 'Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.',
  cras: 'Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.',
  praesent:
    'Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.',
  aenean:
    'Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.',
}

/** Nội dung mẫu "Text in a modal / Another paragraph" dùng chung cho hầu hết modal demo */
export function DemoBody() {
  return (
    <ModalBody>
      <h6 className="font-weight-semibold">Text in a modal</h6>
      <p>{lorem.duis}</p>

      <hr />

      <h6 className="font-weight-semibold">Another paragraph</h6>
      <p>{lorem.cras}</p>
      <p>{lorem.praesent}</p>
    </ModalBody>
  )
}

/** Footer mẫu: Close + Save changes. `saveClassName` đổi màu nút lưu theo theme của modal */
export function DemoFooter({ saveClassName = 'bg-primary' }: { saveClassName?: string }) {
  return (
    <ModalFooter>
      <ModalDismiss>Close</ModalDismiss>
      <button type="button" className={`btn ${saveClassName}`}>
        Save changes
      </button>
    </ModalFooter>
  )
}
