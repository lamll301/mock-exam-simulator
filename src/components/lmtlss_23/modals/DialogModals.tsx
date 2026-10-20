import { useEffect, useState, type ReactNode } from 'react'
import Modal, { ModalBody, ModalDismiss, ModalFooter, ModalHeader } from './Modal'
import type { ModalGroupProps } from './modalTypes'

/**
 * Thay cho bootbox.js (alert / confirm / prompt / custom / form) bằng <Modal> của React.
 * Kết quả callback được hiện trong một modal nhỏ riêng (thay cho alert() trong demo gốc).
 */
export default function DialogModals({ active, onClose }: ModalGroupProps) {
  const [result, setResult] = useState<ReactNode>(null)
  const [promptValue, setPromptValue] = useState('')
  const [name, setName] = useState('')
  const [age, setAge] = useState('')

  // Reset giá trị input mỗi khi mở một dialog có input
  useEffect(() => {
    if (active === 'prompt') setPromptValue('')
    if (active === 'prompt_value') setPromptValue('Test')
    if (active === 'bootbox_form') {
      setName('')
      setAge('')
    }
  }, [active])

  /** Đóng dialog hiện tại rồi hiện kết quả */
  const finish = (text: ReactNode) => {
    onClose()
    setResult(text)
  }

  return (
    <>
      {/* Alert */}
      <Modal open={active === 'alert'} onClose={onClose} size="sm" centered>
        <ModalBody>Hello world!</ModalBody>
        <ModalFooter>
          <button type="button" className="btn bg-primary" onClick={onClose}>
            OK
          </button>
        </ModalFooter>
      </Modal>

      {/* Confirm */}
      <Modal open={active === 'confirm'} onClose={onClose} size="sm" centered backdrop="static">
        <ModalBody>Are you sure?</ModalBody>
        <ModalFooter>
          <button type="button" className="btn btn-link" onClick={() => finish('Confirm result: false')}>
            Cancel
          </button>
          <button type="button" className="btn bg-primary" onClick={() => finish('Confirm result: true')}>
            OK
          </button>
        </ModalFooter>
      </Modal>

      {/* Prompt (cả bản không và có giá trị mặc định) */}
      {(['prompt', 'prompt_value'] as const).map((id) => (
        <Modal key={id} open={active === id} onClose={onClose} size="sm" centered backdrop="static">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              finish(`Hi ${promptValue || '(no name)'}!`)
            }}
          >
            <ModalHeader title="What is your name?" as="h6" />
            <ModalBody>
              <input
                autoFocus
                type="text"
                className="form-control"
                value={promptValue}
                onChange={(e) => setPromptValue(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <ModalDismiss>Cancel</ModalDismiss>
              <button type="submit" className="btn bg-primary">
                OK
              </button>
            </ModalFooter>
          </form>
        </Modal>
      ))}

      {/* Custom dialog nhiều nút */}
      <Modal open={active === 'bootbox_custom'} onClose={onClose} size="sm" centered>
        <ModalHeader title="Custom title" />
        <ModalBody>This is a custom dialog with multiple buttons and callbacks.</ModalBody>
        <ModalFooter>
          <button type="button" className="btn bg-success" onClick={() => finish('Custom button Success clicked')}>
            Success!
          </button>
          <button type="button" className="btn bg-danger" onClick={() => finish('Custom button Danger clicked')}>
            Danger!
          </button>
          <button type="button" className="btn bg-info" onClick={() => finish('Custom button Info clicked')}>
            Info
          </button>
        </ModalFooter>
      </Modal>

      {/* Dialog có form */}
      <Modal open={active === 'bootbox_form'} onClose={onClose}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            finish(`Hello ${name || '(no name)'}, you are ${age || '?'} years old`)
          }}
        >
          <ModalHeader title="This is a form" />
          <ModalBody>
            <div className="form-group row">
              <label className="col-form-label col-sm-3">Name</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group row mb-0">
              <label className="col-form-label col-sm-3">Age</label>
              <div className="col-sm-9">
                <select className="form-control" value={age} onChange={(e) => setAge(e.target.value)}>
                  <option value="">Please select</option>
                  <option value="below 18">below 18</option>
                  <option value="18 - 30">18 - 30</option>
                  <option value="above 30">above 30</option>
                </select>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <ModalDismiss>Cancel</ModalDismiss>
            <button type="submit" className="btn bg-primary">
              Confirm
            </button>
          </ModalFooter>
        </form>
      </Modal>

      {/* Modal kết quả dùng chung */}
      <Modal open={result !== null} onClose={() => setResult(null)} size="xs" centered>
        <ModalBody>{result}</ModalBody>
        <ModalFooter>
          <button type="button" className="btn bg-primary" onClick={() => setResult(null)}>
            OK
          </button>
        </ModalFooter>
      </Modal>
    </>
  )
}
