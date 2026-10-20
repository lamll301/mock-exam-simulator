import type { ReactNode } from 'react'
import { DemoBody, DemoFooter } from './DemoContent'
import Modal, { ModalHeader, type ModalTitleTag } from './Modal'
import type { HeadingModalId, ModalGroupProps } from './modalTypes'

const headings: { id: HeadingModalId; as: ModalTitleTag; title: ReactNode; titleClassName?: string }[] = [
  { id: 'h1', as: 'h1', title: 'H1 heading title' },
  { id: 'h2', as: 'h2', title: 'H2 heading title' },
  { id: 'h3', as: 'h3', title: 'H3 heading title' },
  { id: 'h4', as: 'h4', title: 'H4 heading title' },
  { id: 'h5', as: 'h5', title: 'H5 heading title' },
  { id: 'h6', as: 'h6', title: 'H6 heading title' },
  { id: 'title_basic', as: 'span', title: 'Basic heading title', titleClassName: 'font-weight-semibold' },
  {
    id: 'subtitle',
    as: 'h5',
    title: (
      <>
        This is a modal title <small className="d-block text-muted">And this is a subtitle</small>
      </>
    ),
  },
]

/** Heading options: tiêu đề h1–h6, tiêu đề cơ bản (span) và tiêu đề có subtitle */
export default function HeadingModals({ active, onClose }: ModalGroupProps) {
  return (
    <>
      {headings.map((h) => (
        <Modal key={h.id} open={active === h.id} onClose={onClose}>
          <ModalHeader as={h.as} title={h.title} titleClassName={h.titleClassName} />
          <DemoBody />
          <DemoFooter />
        </Modal>
      ))}
    </>
  )
}
