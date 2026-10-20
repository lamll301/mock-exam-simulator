import { useState, type ReactNode } from 'react'
import { Card, Content, Dropdown, DropdownDivider, DropdownItem, Icon, LimitlessLayout, PageHeader } from '@/components/lmtlss_23'
import BasicModals from '@/components/lmtlss_23/modals/BasicModals'
import ColorModals from '@/components/lmtlss_23/modals/ColorModals'
import DialogModals from '@/components/lmtlss_23/modals/DialogModals'
import EventModals from '@/components/lmtlss_23/modals/EventModals'
import FormModals from '@/components/lmtlss_23/modals/FormModals'
import HeadingModals from '@/components/lmtlss_23/modals/HeadingModals'
import SizeModals from '@/components/lmtlss_23/modals/SizeModals'
import type { ModalId } from '@/components/lmtlss_23/modals/modalTypes'

// ---------- dữ liệu bảng ----------

interface Row {
  name: string
  id: ModalId
  description: ReactNode
  /** Class nút Launch; mặc định btn-light */
  btn?: string
}

interface Section {
  title: string
  rows: Row[]
}

const code = (text: string) => <code>{text}</code>

const sections: Section[] = [
  {
    title: 'Basic modals',
    rows: [
      {
        name: 'Default modal dialog',
        id: 'default',
        description: (
          <>
            Basic modal dialog with {code('header')}, {code('body')} and {code('footer')} areas. Default examples
            displays: header - contains a title and a close button; footer - contains buttons and body contains static
            or dynamic content
          </>
        ),
      },
      {
        name: 'Modal with icons',
        id: 'iconified',
        description: 'Modal with icons added to the specified elements: heading title, footer control buttons and text inside modal body',
      },
      {
        name: 'Disable backdrop',
        id: 'backdrop',
        description: (
          <>
            Disabled backdrop. Disable backdrop element using {code('backdrop={false}')} or alternatively, specify{' '}
            {code('static')} for a backdrop which doesn't close the modal on click
          </>
        ),
      },
      {
        name: 'Disable keyboard interaction',
        id: 'keyboard',
        description: (
          <>
            Disabled keyboard interaction. If {code('keyboard')} option is set to {code('true')} (default), the modal
            can be closed when escape key is pressed
          </>
        ),
      },
      {
        name: 'Disable animation',
        id: 'animation',
        description: (
          <>
            Disabled animation. For modals that simply appear rather than fade in to view, set {code('fade={false}')}
          </>
        ),
      },
      {
        name: 'Scrollable modal',
        id: 'scrollable',
        description: (
          <>
            Scrollable modal that allows scroll the modal body by adding {code('.modal-dialog-scrollable')} to{' '}
            {code('.modal-dialog')}
          </>
        ),
      },
      {
        name: 'Remote source',
        id: 'remote',
        description: (
          <>
            Replacement of Bootstrap's remote source option (jquery {code('.load()')}): content is loaded
            asynchronously when the modal opens
          </>
        ),
      },
    ],
  },
  {
    title: 'Modal sizing',
    rows: [
      {
        name: 'Mini size modal',
        id: 'mini',
        description: (
          <>
            Modal in mini size. Mini modal width is {code('300px')}. To use, add {code('modal-xs')} class to{' '}
            {code('.modal-dialog')} container
          </>
        ),
      },
      {
        name: 'Small size modal',
        id: 'small',
        description: (
          <>
            Modal in small size. Small modal width is {code('400px')}. To use, add {code('modal-sm')} class to{' '}
            {code('.modal-dialog')} container
          </>
        ),
      },
      {
        name: 'Default size modal',
        id: 'default',
        description: (
          <>
            Modal in default size. Default modal width is {code('600px')}. Since this is a default size, modal markup
            doesn't require any additional sizing classes
          </>
        ),
      },
      {
        name: 'Large size modal',
        id: 'large',
        description: (
          <>
            Modal in large size. Large modal width is {code('900px')}. To use, add {code('modal-lg')} class to{' '}
            {code('.modal-dialog')} container
          </>
        ),
      },
      {
        name: 'Full size modal',
        id: 'full',
        description: (
          <>
            Modal in full width size. This modal has {code('94%')} width of the window. To use, add {code('modal-full')}{' '}
            class to {code('.modal-dialog')} container
          </>
        ),
      },
    ],
  },
  {
    title: 'Optional modal colors',
    rows: [
      {
        name: 'Default modal theme',
        id: 'default',
        description: (
          <>
            Default color theme. All areas of this modal dialog have {code('white')} background color. Doesn't require
            any additional contextual classes
          </>
        ),
      },
      ...(['primary', 'danger', 'success', 'warning', 'info'] as const).map((c) => ({
        name: `${c[0].toUpperCase()}${c.slice(1)} modal header`,
        id: c,
        btn: `bg-${c}`,
        description: (
          <>
            {c[0].toUpperCase()}
            {c.slice(1)} modal. To use, add {code(`.bg-${c}`)} class to the {code('.modal-header')} container
          </>
        ),
      })),
      {
        name: 'Custom modal header color',
        id: 'custom',
        btn: 'bg-brown',
        description: (
          <>
            Modal with {code('custom')} color added to the modal header. To use, add any color class from the color
            system to the {code('.modal-header')} container
          </>
        ),
      },
      {
        name: 'Custom modal background color',
        id: 'bg_custom',
        btn: 'bg-teal-300',
        description: (
          <>
            Modal dialog with {code('solid')} custom background color. To use, add any color class from the color
            system to the {code('.modal-content')} container. Additionaly, you can also add a custom background color
            to the modal header
          </>
        ),
      },
    ],
  },
  {
    title: 'Form components',
    rows: [
      {
        name: 'Vertical form',
        id: 'form_vertical',
        description: (
          <>
            Modal with default vertical form layout and responsive grid. Forms must be placed outside of{' '}
            {code('.modal-body')} container to prevent extra horizontal padding
          </>
        ),
      },
      {
        name: 'Horizontal form',
        id: 'form_horizontal',
        description:
          'Modal with horizontal form layout. It does also support responsive grid, but in this case it will look best in wider modals',
      },
      {
        name: 'Inline form',
        id: 'form_inline',
        description: <>Modal with with a simple {code('inline')} form layout</>,
      },
    ],
  },
  {
    title: 'Heading options',
    rows: [
      {
        name: 'Modal with H1 heading',
        id: 'h1',
        description: (
          <>
            Modal title in {code('H1')} size. In all heading sizes, vertical position of a {code('close')} button will
            be automatically adjusted to the middle of the modal header
          </>
        ),
      },
      ...(['h2', 'h3', 'h4', 'h5', 'h6'] as const).map((h) => ({
        name: `Modal with ${h.toUpperCase()} heading`,
        id: h,
        description: <>Modal title in {code(h.toUpperCase())} size</>,
      })),
      {
        name: 'Modal with basic title',
        id: 'title_basic',
        description: (
          <>
            Modal title could be either a standard heading or any other component, but make sure you have included{' '}
            {code('.modal-title')} class to it
          </>
        ),
      },
      {
        name: 'Modal with subtitle',
        id: 'subtitle',
        description: (
          <>
            Modal title {code('subtitle')}. This can be either inline or block. To display a subtitle in one line with
            the title, remove {code('.d-block')} class from it
          </>
        ),
      },
    ],
  },
  {
    title: 'Modal events',
    rows: [
      {
        name: 'onShow event',
        id: 'onshow',
        btn: 'bg-teal',
        description: (
          <>
            This event fires immediately when the {code('show')} instance method is called. If caused by a click, the
            clicked element is available as the {code('relatedTarget')} property of the event
          </>
        ),
      },
      {
        name: 'onShown event',
        id: 'onshown',
        btn: 'bg-teal',
        description: (
          <>
            This event is fired when the modal has been made visible to the user (will wait for CSS transitions to
            complete). If caused by a click, the clicked element is available as the {code('relatedTarget')} property
            of the event
          </>
        ),
      },
      {
        name: 'onHide event',
        id: 'onhide',
        btn: 'bg-teal',
        description: (
          <>
            This event is fired immediately when the {code('hide')} instance method has been called
          </>
        ),
      },
      {
        name: 'onHidden event',
        id: 'onhidden',
        btn: 'bg-teal',
        description:
          'This event is fired when the modal has finished being hidden from the user (will wait for CSS transitions to complete)',
      },
    ],
  },
  {
    title: 'Programmatic dialog boxes',
    rows: [
      {
        name: 'Alert dialog',
        id: 'alert',
        btn: 'bg-primary',
        description: <>Example of an {code('alert')} dialog replacement with default Bootstrap modals</>,
      },
      {
        name: 'Confirm dialog',
        id: 'confirm',
        btn: 'bg-primary',
        description: <>Example of a {code('confirmation')} dialog replacement with default Bootstrap modals including callback</>,
      },
      {
        name: 'Prompt dialog',
        id: 'prompt',
        btn: 'bg-primary',
        description: <>Example of a {code('prompt')} dialog replacement with default Bootstrap modals including callback</>,
      },
      {
        name: 'Prompt with default value',
        id: 'prompt_value',
        btn: 'bg-primary',
        description: <>Example of a {code('prompt')} dialog replacement with default value</>,
      },
      {
        name: 'Custom bootbox dialog',
        id: 'bootbox_custom',
        btn: 'bg-primary',
        description: 'Example of a custom bootbox dialog with multiple buttons and callbacks',
      },
      {
        name: 'Dialog with form',
        id: 'bootbox_form',
        btn: 'bg-primary',
        description: 'Example of a custom bootbox dialog with simple form and callbacks',
      },
    ],
  },
]

/** Phần bên phải thanh breadcrumb: Support + dropdown Settings (như template) */
function BreadcrumbActions() {
  return (
    <>
      <a href="#" className="breadcrumb-elements-item" onClick={(e) => e.preventDefault()}>
        <Icon name="comment-discussion" className="mr-2" />
        Support
      </a>

      <Dropdown
        align="right"
        closeOnClick
        className="breadcrumb-elements-item p-0"
        triggerClassName="breadcrumb-elements-item dropdown-toggle"
        trigger={
          <>
            <Icon name="gear" className="mr-2" />
            Settings
          </>
        }
      >
        <DropdownItem icon={<Icon name="user-lock" />}>Account security</DropdownItem>
        <DropdownItem icon={<Icon name="statistics" />}>Analytics</DropdownItem>
        <DropdownItem icon={<Icon name="accessibility" />}>Accessibility</DropdownItem>
        <DropdownDivider />
        <DropdownItem icon={<Icon name="gear" />}>All settings</DropdownItem>
      </Dropdown>
    </>
  )
}

// ---------- trang ----------

/** Tương ứng components_modals.html của template (Components - Modal dialogs) */
export default function ComponentsModals() {
  // Chỉ một modal demo mở tại một thời điểm; nút Launch và modal khớp nhau qua id
  const [active, setActive] = useState<ModalId | null>(null)
  const close = () => setActive(null)

  return (
    <LimitlessLayout>
      <PageHeader
        title="Components"
        subtitle="Modal Dialogs"
        buttons={[
          { icon: 'bars-alt', label: 'Statistics' },
          { icon: 'calculator', label: 'Invoices' },
          { icon: 'calendar5', label: 'Schedule' },
        ]}
        breadcrumbs={[
          { label: 'Home', to: '/lmtlss_23/', icon: 'home2' },
          { label: 'Components', to: '/lmtlss_23/components-modals' },
          { label: 'Modal dialogs' },
        ]}
        breadcrumbActions={<BreadcrumbActions />}
      />

      <Content>
        {/* bodyClassName="" để bảng sát mép card như template (đoạn mô tả tự bọc .card-body) */}
        <Card title="Modal dialogs" titleAs="h5" tools={['collapse', 'reload', 'remove']} bodyClassName="">
          <div className="card-body">
            Modal dialog is a small window that communicates information to the user and prompt them for a response.
            Dialog boxes are classified as {code('"modal"')} or {code('"modeless"')}, depending on whether or not they
            block interaction with the page that initiated the dialog. Table below contains basic modal dialog
            examples. Click {code('Launch')} button to run modal examples.
          </div>

          <div className="table-responsive">
            <table className="table">
              <tbody>
                {sections.map((section, i) => (
                  <SectionRows key={section.title} section={section} first={i === 0} onLaunch={setActive} />
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <BasicModals active={active} onClose={close} />
        <SizeModals active={active} onClose={close} />
        <ColorModals active={active} onClose={close} />
        <FormModals active={active} onClose={close} />
        <HeadingModals active={active} onClose={close} />
        <EventModals active={active} onClose={close} />
        <DialogModals active={active} onClose={close} />
      </Content>
    </LimitlessLayout>
  )
}

/** Một nhóm: dòng tiêu đề (table-active) + các dòng Launch */
function SectionRows({ section, first, onLaunch }: { section: Section; first: boolean; onLaunch: (id: ModalId) => void }) {
  return (
    <>
      <tr className={first ? undefined : 'table-border-double'}>
        <th colSpan={3} className="table-active">
          {section.title}
        </th>
      </tr>
      {section.rows.map((row) => (
        <tr key={`${section.title}-${row.name}`}>
          <td style={{ width: '20%' }}>{row.name}</td>
          <td style={{ width: '20%' }}>
            <button type="button" className={`btn ${row.btn ?? 'btn-light'}`} 
              onClick={() => {
                // console.log('launch', row.id)
                onLaunch(row.id)
              }}
            >
              Launch <Icon name="play3" className="ml-2" />
            </button>
          </td>
          <td>{row.description}</td>
        </tr>
      ))}
    </>
  )
}
