import { Content, Dropdown, DropdownDivider, DropdownItem, Icon, LimitlessLayout, PageHeader } from '@/components/lmtlss_23'
import {
  SectionTitle,
  SimpleTable,
  TableCard,
  basicUsers,
  scrollUsers,
  userColumns,
} from '@/components/lmtlss_23/tables'

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

/** Tương ứng table_basic.html của template (Tables - Basic) */
export default function TableBasic() {
  return (
    <LimitlessLayout>
      <PageHeader
        title="Tables"
        subtitle="Basic"
        buttons={[
          { icon: 'bars-alt', label: 'Statistics' },
          { icon: 'calculator', label: 'Invoices' },
          { icon: 'calendar5', label: 'Schedule' },
        ]}
        breadcrumbs={[
          { label: 'Home', to: '/lmtlss_23/', icon: 'home2' },
          { label: 'Tables', to: '/lmtlss_23/table-basic' },
          { label: 'Basic' },
        ]}
        breadcrumbActions={<BreadcrumbActions />}
      />

      <Content>
        <SectionTitle
          title="Basic tables"
          subtitle={
            <>
              Tables with default <code>Bootstrap</code> styling
            </>
          }
        />

        <TableCard
          title="Basic table"
          description={
            <>
              Example of a <code>basic</code> table. For basic styling (light padding and only horizontal dividers) add
              the base class <code>.table</code> to any <code>&lt;table&gt;</code>. It may seem super redundant, but
              given the widespread use of tables for other plugins like calendars and date pickers, we've opted to
              isolate our custom table styles.
            </>
          }
        >
          <SimpleTable columns={userColumns} rows={basicUsers} />
        </TableCard>

        <TableCard
          title="Striped rows"
          description={
            <>
              Example of a table with <code>striped</code> rows. Use <code>.table-striped</code> added to the base{' '}
              <code>.table</code> class to add zebra-striping to any table odd row within the <code>&lt;tbody&gt;</code>.
              This styling doesn't work in IE8 and lower as <code>:nth-child</code> CSS selector isn't supported in these
              browser versions. Striped table can be combined with other table styles.
            </>
          }
        >
          <SimpleTable striped columns={userColumns} rows={basicUsers} />
        </TableCard>

        <TableCard
          title="Bordered table"
          description={
            <>
              Example of a table with fully <code>bordered</code> cells. Add <code>.table-bordered</code> to the base{' '}
              <code>.table</code> class for borders on all sides of the table and cells. This is a default Bootstrap
              option for the table, for more advanced border options check <a href="#">Table borders</a> page. Bordered
              table can be combined with other table styles.
            </>
          }
        >
          <SimpleTable bordered columns={userColumns} rows={basicUsers} />
        </TableCard>

        <TableCard
          title="Bordered striped"
          description={
            <>
              Example of a <code>bordered</code> table with <code>stiped</code> rows. Add <code>.table-bordered</code>{' '}
              and <code>.table-striped</code> classes to the base <code>.table</code> class for borders and row striping.
              This method works with all table border options.
            </>
          }
        >
          <SimpleTable bordered striped columns={userColumns} rows={basicUsers} />
        </TableCard>

        <TableCard
          title="Hover rows"
          description={
            <>
              Example of a table with <code>hover</code> rows state. Add <code>.table-hover</code> to enable a hover
              state on table rows within a <code>&lt;tbody&gt;</code>.
            </>
          }
        >
          <SimpleTable hover columns={userColumns} rows={basicUsers} />
        </TableCard>

        <TableCard
          title="Scrollable table"
          description={
            <>
              Example of a <code>scrollable</code> table. To use a fixed height with scrolling, wrap any table in a div
              with <code>.table-scrollable</code> class. Max height of the table container will be{' '}
              <code>22.5rem</code> and table will get a vertical scrollbar if its height exceeds this value.
            </>
          }
        >
          <SimpleTable wrapper="scrollable" columns={userColumns} rows={scrollUsers} />
        </TableCard>

        <SectionTitle
          className="pt-2"
          title="Card body tables"
          subtitle={
            <>
              Tables placed inside <code>card body</code>.
            </>
          }
        />

        <TableCard
          inBody
          title="Card body table"
          description={
            <>
              Example of a table placed inside <code>card body</code>. Such tables always have additional whitespace
              taken from <code>.card-body</code> element padding.
            </>
          }
        >
          <SimpleTable columns={userColumns} rows={basicUsers} />
        </TableCard>

        <TableCard
          inBody
          title="Framed table"
          description={
            <>
              Example of <code>framed</code> table inside card body. Tables that placed inside card body don't have
              border around them by default, <code>.table-framed</code> class adds border around the table.
            </>
          }
        >
          <SimpleTable wrapper="framed" columns={userColumns} rows={basicUsers} />
        </TableCard>

        <TableCard
          inBody
          title="Framed bordered"
          description={
            <>
              Example of <code>bordered framed</code> table inside card body. By default bordered table also doesn't
              have a border, to use border around the bordered table add <code>.table-framed</code> to the{' '}
              <code>&lt;table&gt;</code>.
            </>
          }
        >
          <SimpleTable wrapper="framed" bordered columns={userColumns} rows={basicUsers} />
        </TableCard>
      </Content>
    </LimitlessLayout>
  )
}
