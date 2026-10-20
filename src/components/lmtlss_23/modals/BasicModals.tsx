import { useEffect, useState, type ReactNode } from 'react'
import Icon from '../Icon'
import { DemoBody, DemoFooter, lorem } from './DemoContent'
import Modal, { ModalBody, ModalDismiss, ModalFooter, ModalHeader } from './Modal'
import type { ModalGroupProps } from './modalTypes'

/** Alert có nút đóng riêng (data-dismiss="alert"); state mất đi khi modal đóng nên mở lại sẽ hiện lại */
function ModalAlert() {
  const [visible, setVisible] = useState(true)
  if (!visible) return null
  return (
    <div className="alert alert-info alert-dismissible alert-styled-left border-top-0 border-bottom-0 border-right-0">
      <span className="font-weight-semibold">Here we go!</span> Example of an alert inside modal.
      <button type="button" className="close" onClick={() => setVisible(false)}>
        ×
      </button>
    </div>
  )
}

/** Thay cho `.load()` của jQuery: giả lập tải nội dung từ xa khi modal mở */
const loadDemoContent = () =>
  new Promise<ReactNode>((resolve) => {
    setTimeout(
      () =>
        resolve(
          <>
            <h6 className="font-weight-semibold">Remote content</h6>
            <p>{lorem.duis}</p>
            <hr />
            <p>{lorem.aenean}</p>
          </>,
        ),
      800,
    )
  })

interface RemoteModalProps {
  open: boolean
  onClose: () => void
  /** Hàm tải nội dung (vd: fetch một đoạn HTML/JSON rồi trả về JSX). Mặc định dùng nội dung giả lập */
  load?: () => Promise<ReactNode>
}

export function RemoteModal({ open, onClose, load = loadDemoContent }: RemoteModalProps) {
  const [content, setContent] = useState<ReactNode>(null)

  useEffect(() => {
    if (!open) return undefined
    let cancelled = false
    setContent(null)
    load().then((node) => {
      if (!cancelled) setContent(node)
    })
    return () => {
      cancelled = true
    }
  }, [open, load])

  return (
    <Modal open={open} onClose={onClose} size="full" fade={false}>
      <ModalHeader title="Remote source" />
      <ModalBody>
        {content ?? (
          <div className="text-center py-5">
            <Icon name="spinner2" className="spinner mr-2" /> Loading...
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <ModalDismiss>Close</ModalDismiss>
        <button type="button" className="btn bg-primary">
          Save changes
        </button>
      </ModalFooter>
    </Modal>
  )
}

/** Basic modals: default, icons, tắt backdrop / bàn phím / animation, scrollable, remote */
export default function BasicModals({ active, onClose }: ModalGroupProps) {
  return (
    <>
      <Modal open={active === 'default'} onClose={onClose}>
        <ModalHeader title="Basic modal" />
        <DemoBody />
        <DemoFooter />
      </Modal>

      <Modal open={active === 'iconified'} onClose={onClose}>
        <ModalHeader
          title={
            <>
              <Icon name="menu7" className="mr-2" /> &nbsp;Modal with icons
            </>
          }
        />
        <ModalBody>
          <ModalAlert />

          <h6 className="font-weight-semibold">
            <Icon name="law" className="mr-2" /> Sample heading with icon
          </h6>
          <p>{lorem.cras}</p>

          <hr />

          <p>
            <Icon name="mention" className="mr-2" /> {lorem.aenean}
          </p>
        </ModalBody>
        <ModalFooter>
          <ModalDismiss>
            <Icon name="cross2" className="font-size-base mr-1" /> Close
          </ModalDismiss>
          <button type="button" className="btn bg-primary">
            <Icon name="checkmark3" className="font-size-base mr-1" /> Save
          </button>
        </ModalFooter>
      </Modal>

      <Modal open={active === 'backdrop'} onClose={onClose} backdrop={false}>
        <ModalHeader title="Disable backdrop" />
        <DemoBody />
        <DemoFooter />
      </Modal>

      <Modal open={active === 'keyboard'} onClose={onClose} keyboard={false}>
        <ModalHeader title="Disable keyboard interaction" />
        <DemoBody />
        <DemoFooter />
      </Modal>

      <Modal open={active === 'animation'} onClose={onClose} fade={false}>
        <ModalHeader title="Disable animation" />
        <DemoBody />
        <DemoFooter />
      </Modal>

      <Modal open={active === 'scrollable'} onClose={onClose} scrollable>
        <ModalHeader title="Scrollable modal" className="pb-3" />
        <ModalBody className="py-0">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i}>
              <p>{lorem.cras}</p>
              <p>{lorem.praesent}</p>
              <p>{lorem.aenean}</p>
            </div>
          ))}
        </ModalBody>
        <ModalFooter className="pt-3">
          <ModalDismiss>Close</ModalDismiss>
          <button type="button" className="btn bg-primary">
            Save changes
          </button>
        </ModalFooter>
      </Modal>

      <RemoteModal open={active === 'remote'} onClose={onClose} />
    </>
  )
}
