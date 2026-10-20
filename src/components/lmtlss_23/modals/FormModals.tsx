import { FormGroup, TextInput } from '@/components/lmtlss_23/forms'
import Icon from '../Icon'
import Modal, { ModalBody, ModalDismiss, ModalFooter, ModalHeader } from './Modal'
import type { ModalGroupProps } from './modalTypes'

const field = (label: string, placeholder: string, hint?: string) => ({ label, placeholder, hint })

/** Footer dùng chung cho 3 modal form: Close + Submit form (type="submit") */
function FormFooter() {
  return (
    <ModalFooter>
      <ModalDismiss>Close</ModalDismiss>
      <button type="submit" className="btn bg-primary">
        Submit form
      </button>
    </ModalFooter>
  )
}

/** Cột label + input theo grid dọc (.col-sm-*) */
function Col({ size, label, placeholder, hint }: { size: number; label: string; placeholder: string; hint?: string }) {
  return (
    <div className={`col-sm-${size}`}>
      <label>{label}</label>
      <TextInput placeholder={placeholder} />
      {hint && <span className="form-text text-muted">{hint}</span>}
    </div>
  )
}

const horizontalFields = [
  field('First name', 'Eugene'),
  field('Last name', 'Kopyov'),
  field('Email', 'eugene@kopyov.com', 'name@domain.com'),
  field('Phone #', '+99-99-9999-9999', '+99-99-9999-9999'),
  field('Address line 1', 'Ring street 12, building D, flat #67'),
  field('City', 'Munich'),
  field('State/Province', 'Bayern'),
  field('ZIP code', '1031'),
]

/**
 * Form modals: vertical, horizontal, inline.
 * Form phải nằm NGOÀI .modal-body (bọc luôn body + footer) để không bị padding ngang thừa.
 */
export default function FormModals({ active, onClose }: ModalGroupProps) {
  const prevent = (e: React.FormEvent) => {
    e.preventDefault()
    onClose()
  }

  return (
    <>
      <Modal open={active === 'form_vertical'} onClose={onClose}>
        <ModalHeader title="Vertical form" />
        <form onSubmit={prevent}>
          <ModalBody>
            <div className="form-group">
              <div className="row">
                <Col size={6} label="First name" placeholder="Eugene" />
                <Col size={6} label="Last name" placeholder="Kopyov" />
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <Col size={6} label="Address line 1" placeholder="Ring street 12" />
                <Col size={6} label="Address line 2" placeholder="building D, flat #67" />
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <Col size={4} label="City" placeholder="Munich" />
                <Col size={4} label="State/Province" placeholder="Bayern" />
                <Col size={4} label="ZIP code" placeholder="1031" />
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <Col size={6} label="Email" placeholder="eugene@kopyov.com" hint="name@domain.com" />
                <Col size={6} label="Phone #" placeholder="+99-99-9999-9999" hint="+99-99-9999-9999" />
              </div>
            </div>
          </ModalBody>
          <FormFooter />
        </form>
      </Modal>

      <Modal open={active === 'form_horizontal'} onClose={onClose} size="lg">
        <ModalHeader title="Horizontal form" />
        <form className="form-horizontal" onSubmit={prevent}>
          <ModalBody>
            {horizontalFields.map((f) => (
              <FormGroup key={f.label} label={f.label} breakpoint="sm">
                <TextInput placeholder={f.placeholder} />
                {f.hint && <span className="form-text text-muted">{f.hint}</span>}
              </FormGroup>
            ))}
          </ModalBody>
          <FormFooter />
        </form>
      </Modal>

      <Modal open={active === 'form_inline'} onClose={onClose} size="lg">
        <ModalHeader title="Inline form" />
        <form className="modal-body form-inline justify-content-center" onSubmit={prevent}>
          <label>Username:</label>
          <TextInput placeholder="Your username" className="mb-2 mr-sm-2 ml-sm-2 mb-sm-0" />

          <label className="ml-sm-2">Password:</label>
          <TextInput type="password" placeholder="Your password" className="mb-2 mr-sm-2 ml-sm-2 mb-sm-0" />

          <button type="submit" className="btn bg-primary ml-sm-2 mb-sm-0">
            Sign me in <Icon name="plus22" />
          </button>
        </form>
      </Modal>
    </>
  )
}
