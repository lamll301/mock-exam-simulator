import { Card, Content, Dropdown, DropdownDivider, DropdownItem, Icon, LimitlessLayout, PageHeader } from '@/components/lmtlss_23'
import {
  CustomFileInput,
  FeedbackInput,
  Fieldset,
  FieldTooltip,
  FileInput,
  FormGroup,
  HelpBadge,
  HelpText,
  Select,
  StyledFileInput,
  StyledSelect,
  TextInput,
  Textarea,
  type SelectOption,
} from '@/components/lmtlss_23/forms'

// ---------- dữ liệu mẫu ----------

const numbered = (first: string, n = 8): SelectOption[] =>
  Array.from({ length: n }, (_, i) => ({ value: `opt${i + 1}`, label: i === 0 ? first : `Option ${i + 1}` }))

const cities = [
  'Amsterdam', 'Atlanta', 'Baltimore', 'Boston', 'Buenos Aires', 'Calgary', 'Chicago', 'Denver', 'Dubai', 'Frankfurt',
  'Hong Kong', 'Honolulu', 'Houston', 'Kuala Lumpur', 'London', 'Los Angeles', 'Melbourne', 'Mexico City', 'Miami', 'Minneapolis',
].map((c) => ({ value: c, label: c }))

const typeOptions: { label: string; type: string }[] = [
  { label: 'Datetime', type: 'datetime-local' },
  { label: 'Date', type: 'date' },
  { label: 'Month', type: 'month' },
  { label: 'Time', type: 'time' },
  { label: 'Week', type: 'week' },
  { label: 'Number', type: 'number' },
  { label: 'Email', type: 'email' },
  { label: 'URL', type: 'url' },
  { label: 'Search', type: 'search' },
  { label: 'Tel', type: 'tel' },
  { label: 'Color', type: 'color' },
  { label: 'Range', type: 'range' },
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

/** Tương ứng form_inputs.html của template (Forms - Basic inputs) */
export default function FormInputs() {
  return (
    <LimitlessLayout>
      <PageHeader
        title="Forms"
        subtitle="Basic Inputs"
        buttons={[
          { icon: 'bars-alt', label: 'Statistics' },
          { icon: 'calculator', label: 'Invoices' },
          { icon: 'calendar5', label: 'Schedule' },
        ]}
        breadcrumbs={[
          { label: 'Home', to: '/lmtlss_23/', icon: 'home2' },
          { label: 'Forms', to: '/lmtlss_23/form-inputs' },
          { label: 'Basic inputs' },
        ]}
        breadcrumbActions={<BreadcrumbActions />}
      />

      <Content>
        <Card title="Basic form inputs" titleAs="h5" tools={['collapse', 'reload', 'remove']}>
          <p className="mb-4">
            Examples of standard form controls supported in an example form layout. Individual form controls
            automatically receive some global styling. All textual <code>&lt;input&gt;</code>,{' '}
            <code>&lt;textarea&gt;</code>, and <code>&lt;select&gt;</code> elements with <code>.form-control</code> are
            set to <code>width: 100%;</code> by default. Wrap labels and controls in <code>.form-group</code> for
            optimum spacing. Labels in horizontal form require <code>.col-form-label</code> class.
          </p>

          <form onSubmit={(e) => e.preventDefault()}>
            {/* ---------- Basic inputs ---------- */}
            <Fieldset legend="Basic inputs">
              <FormGroup label="Default text input">
                <TextInput />
              </FormGroup>
              <FormGroup label="Password">
                <TextInput type="password" />
              </FormGroup>
              <FormGroup label="Input with placeholder">
                <TextInput placeholder="Enter your username..." />
              </FormGroup>
              <FormGroup label="Read only field">
                <TextInput readOnly defaultValue="read only" />
              </FormGroup>
              <FormGroup label="Disabled field">
                <TextInput disabled defaultValue="disabled" />
              </FormGroup>
              <FormGroup label="Predefined value">
                <TextInput defaultValue="http://" />
              </FormGroup>
              <FormGroup label="Disabled autocomplete">
                <TextInput placeholder="Autocomplete is off" autoComplete="off" />
              </FormGroup>
              <FormGroup label="Maximum value">
                <TextInput maxLength={4} placeholder="Maximum 4 characters" />
              </FormGroup>
              <FormGroup label="Focus on label click" htmlFor="clickable-label" labelClassName="cursor-pointer">
                <TextInput id="clickable-label" placeholder="Field focus on label click" />
              </FormGroup>
              <FormGroup label="Static text">
                <div className="form-control-plaintext">This is a static text</div>
              </FormGroup>
              <FormGroup label="Textarea">
                <Textarea rows={3} cols={3} placeholder="Default textarea" />
              </FormGroup>
            </Fieldset>

            {/* ---------- Basic selects ---------- */}
            <Fieldset legend="Basic selects">
              <FormGroup label="Single select">
                <Select options={numbered('Default select box')} />
              </FormGroup>
              <FormGroup label="Styled select">
                <StyledSelect options={numbered('Styled select box')} />
              </FormGroup>
              <FormGroup label="Custom BS select">
                <Select variant="custom" options={numbered('Styled select box')} />
              </FormGroup>
              <FormGroup label="Multiple select">
                <Select multiple options={cities} defaultValue={['Amsterdam', 'Atlanta', 'Chicago']} />
              </FormGroup>
            </Fieldset>

            {/* ---------- Basic file inputs ---------- */}
            <Fieldset legend="Basic file inputs">
              <FormGroup label="Default file input">
                <FileInput />
              </FormGroup>
              <FormGroup label="Styled file input">
                <StyledFileInput />
              </FormGroup>
              <FormGroup label="Custom BS file input">
                <CustomFileInput />
              </FormGroup>
            </Fieldset>

            {/* ---------- Form helpers ---------- */}
            <Fieldset legend="Form helpers">
              <FormGroup label="Text form helpers">
                <div className="row">
                  <div className="col-md-4">
                    <TextInput />
                    <HelpText>Left aligned helper</HelpText>
                  </div>
                  <div className="col-md-4">
                    <TextInput />
                    <HelpText align="center">Centered helper</HelpText>
                  </div>
                  <div className="col-md-4">
                    <TextInput />
                    <HelpText align="right">Right aligned helper</HelpText>
                  </div>
                </div>
              </FormGroup>

              <FormGroup label="Full width badge helpers">
                <div className="row">
                  <div className="col-md-4">
                    <TextInput />
                    <HelpBadge color="primary" align="left" fullWidth>
                      Left aligned badge
                    </HelpBadge>
                  </div>
                  <div className="col-md-4">
                    <TextInput />
                    <HelpBadge color="danger" fullWidth>
                      Centered badge
                    </HelpBadge>
                  </div>
                  <div className="col-md-4">
                    <TextInput />
                    <HelpBadge color="info" align="right" fullWidth>
                      Right aligned badge
                    </HelpBadge>
                  </div>
                </div>
              </FormGroup>

              <FormGroup label="Block badge helpers">
                <div className="row">
                  <div className="col-md-4">
                    <TextInput />
                    <HelpBadge color="primary">Left aligned badge</HelpBadge>
                  </div>
                  <div className="col-md-4">
                    <TextInput />
                    <HelpBadge color="danger" align="center">
                      Centered badge
                    </HelpBadge>
                  </div>
                  <div className="col-md-4">
                    <TextInput />
                    <HelpBadge color="info" align="right">
                      Right aligned badge
                    </HelpBadge>
                  </div>
                </div>
              </FormGroup>

              <FormGroup label="Inline text helper">
                <div className="row">
                  <div className="col-lg-6">
                    <TextInput />
                  </div>
                  <div className="col-lg-6 mt-1 mt-lg-0 align-self-center">
                    <span className="text-muted">Inline text helper</span>
                  </div>
                </div>
              </FormGroup>

              <FormGroup label="Inline badge helper">
                <div className="row">
                  <div className="col-lg-6">
                    <TextInput />
                  </div>
                  <div className="col-lg-6 mt-1 mt-lg-0 align-self-center">
                    <span className="badge bg-teal">Inline badge helper</span>
                  </div>
                </div>
              </FormGroup>
            </Fieldset>

            {/* ---------- Input icons ---------- */}
            <Fieldset legend="Input icons">
              <FormGroup label="Input with icons">
                <div className="row">
                  <div className="col-md-6">
                    <FeedbackInput grouped icon="make-group" iconPosition="left" inputSize="lg" placeholder="Left icon, input large" />
                    <FeedbackInput grouped icon="droplets" iconPosition="left" placeholder="Left icon, input default" />
                    <FeedbackInput grouped icon="pin-alt" iconPosition="left" inputSize="sm" placeholder="Left icon, input small" />
                  </div>
                  <div className="col-md-6">
                    <FeedbackInput grouped icon="make-group" iconPosition="right" inputSize="lg" placeholder="Right icon, input large" />
                    <FeedbackInput grouped icon="droplets" iconPosition="right" placeholder="Right icon, input default" />
                    <FeedbackInput grouped icon="pin-alt" iconPosition="right" inputSize="sm" placeholder="Right icon, input small" />
                  </div>
                </div>
              </FormGroup>

              <FormGroup label="Input with spinners">
                <div className="row">
                  <div className="col-md-6">
                    <FeedbackInput grouped icon="spinner2" spin iconPosition="left" placeholder="Left spinner" />
                  </div>
                  <div className="col-md-6">
                    <FeedbackInput grouped icon="spinner2" spin iconPosition="right" placeholder="Right spinner" />
                  </div>
                </div>
              </FormGroup>
            </Fieldset>

            {/* ---------- Validation states ---------- */}
            <Fieldset legend="Validation states">
              <FormGroup label="Valid state" labelClassName="font-weight-semibold text-success">
                <TextInput className="border-success" placeholder="Valid state" />
                <HelpText tone="success">Valid state helper</HelpText>
              </FormGroup>
              <FormGroup label="Valid state with icon" labelClassName="font-weight-semibold text-success">
                <FeedbackInput
                  icon="checkmark-circle"
                  iconPosition="right"
                  feedbackClassName="text-success"
                  className="border-success"
                  placeholder="Valid state"
                />
                <HelpText tone="success">Valid state helper</HelpText>
              </FormGroup>
              <FormGroup label="Invalid state" labelClassName="font-weight-semibold text-danger">
                <TextInput className="border-danger" placeholder="Invalid state" />
                <HelpText tone="danger">Invalid state helper</HelpText>
              </FormGroup>
              <FormGroup label="Invalid state with icon" labelClassName="font-weight-semibold text-danger">
                <FeedbackInput
                  icon="cancel-circle2"
                  iconPosition="right"
                  feedbackClassName="text-danger"
                  className="border-danger"
                  placeholder="Invalid state"
                />
                <HelpText tone="danger">Invalid state helper</HelpText>
              </FormGroup>
            </Fieldset>

            {/* ---------- Text options ---------- */}
            <Fieldset legend="Text options">
              <FormGroup breakpoint="md" label="Light text">
                <TextInput className="font-weight-light" placeholder="Input with light text" />
              </FormGroup>
              <FormGroup breakpoint="md" label="Semibold text">
                <TextInput className="font-weight-semibold" placeholder="Input with semibold text" />
              </FormGroup>
              <FormGroup breakpoint="md" label="Bold text">
                <TextInput className="font-weight-bold" placeholder="Input with bold text" />
              </FormGroup>
              <FormGroup breakpoint="md" label="Capitalized text">
                <TextInput className="text-capitalize" placeholder="Input with capitalized text" />
              </FormGroup>
              <FormGroup breakpoint="md" label="Centered text">
                <TextInput className="text-center" placeholder="Input with centered text" />
              </FormGroup>
              <FormGroup breakpoint="md" label="Right aligned text">
                <TextInput className="text-right" placeholder="Input with right aligned text" />
              </FormGroup>
              <FormGroup breakpoint="md" label="Uppercase text">
                <TextInput className="text-uppercase" placeholder="Input with uppercase text" />
                <HelpText>Other text options work as well</HelpText>
              </FormGroup>
            </Fieldset>

            {/* ---------- Field options ---------- */}
            <Fieldset legend="Field options">
              <FormGroup label="Tooltip on focus">
                <FieldTooltip text="Tooltip on focus" trigger="focus">
                  <TextInput placeholder="Click on input" />
                </FieldTooltip>
              </FormGroup>
              <FormGroup label="Tooltip on hover">
                <FieldTooltip text="Tooltip on hover">
                  <TextInput placeholder="Hover on input" />
                </FieldTooltip>
              </FormGroup>
              <FormGroup breakpoint="md" label="Rounded input">
                <TextInput className="rounded-round" placeholder="Rounded input" />
              </FormGroup>
              <FormGroup breakpoint="md" label="Roundless input">
                <TextInput className="rounded-0" placeholder="Roundless input" />
              </FormGroup>
              <FormGroup label="Fixed input sizing">
                <div className="row">
                  <div className="col-3">
                    <TextInput placeholder=".col-3" />
                  </div>
                  <div className="col-4">
                    <TextInput placeholder=".col-4" />
                  </div>
                  <div className="col-5">
                    <TextInput placeholder=".col-5" />
                  </div>
                </div>
                <HelpText>Available in 12 columns sizes since it's based on 12 columns grid</HelpText>
              </FormGroup>
            </Fieldset>

            {/* ---------- Sizing options ---------- */}
            <Fieldset legend="Sizing options">
              <FormGroup label="Large size" labelSize="lg">
                <TextInput inputSize="lg" placeholder=".col-form-label-lg .form-control-lg" />
              </FormGroup>
              <FormGroup label="Default size">
                <TextInput placeholder=".col-form-label .form-control" />
              </FormGroup>
              <FormGroup label="Small size" labelSize="sm">
                <TextInput inputSize="sm" placeholder=".col-form-label-sm .form-control-sm" />
              </FormGroup>
              <FormGroup label="Inputs only">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <TextInput inputSize="lg" placeholder="Large input height" />
                    </div>
                    <div className="form-group">
                      <TextInput placeholder="Default input height" />
                    </div>
                    <div className="form-group">
                      <TextInput inputSize="sm" placeholder="Small input height" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <Select inputSize="lg" options={numbered('Large select height')} />
                    </div>
                    <div className="form-group">
                      <Select options={numbered('Default select height')} />
                    </div>
                    <div className="form-group">
                      <Select inputSize="sm" options={numbered('Small select height')} />
                    </div>
                  </div>
                </div>
              </FormGroup>
            </Fieldset>

            {/* ---------- Color options ---------- */}
            <Fieldset legend="Color options">
              <FormGroup label="Text color">
                <TextInput className="text-violet" defaultValue="Custom text color" />
              </FormGroup>
              <FormGroup label="Border color">
                <TextInput className="border-teal border-1" placeholder="Custom border color" />
              </FormGroup>
              <FormGroup label="Background color">
                <TextInput className="bg-slate-600 border-slate-600 border-1" placeholder="Custom background color" />
              </FormGroup>
              <FormGroup label="Select color">
                <Select className="bg-indigo-400 border-indigo-400" options={numbered('Custom select color')} />
              </FormGroup>
              <FormGroup label="Styled select">
                <StyledSelect
                  wrapperClassName="uniform-select bg-pink-400 border-pink-400"
                  options={numbered('Custom styled select color')}
                />
              </FormGroup>
              <FormGroup label="File input color">
                <StyledFileInput buttonClassName="action btn bg-blue" />
              </FormGroup>
            </Fieldset>

            {/* ---------- Type options ---------- */}
            <Fieldset legend="Type options">
              {typeOptions.map((t) => (
                <FormGroup key={t.type} breakpoint="md" label={t.label}>
                  <TextInput type={t.type} name={t.type} {...(t.type === 'range' ? { min: 0, max: 10 } : {})} />
                  <HelpText>
                    Using <code>input type="{t.type}"</code>
                  </HelpText>
                </FormGroup>
              ))}
            </Fieldset>

            <div className="text-right">
              <button type="submit" className="btn btn-primary">
                Submit <Icon name="paperplane" className="ml-2" />
              </button>
            </div>
          </form>
        </Card>
      </Content>
    </LimitlessLayout>
  )
}
