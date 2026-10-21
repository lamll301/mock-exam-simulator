import { Content, LimitlessLayout, PageHeader } from '@/components/lmtlss_23'
import { BreadcrumbActions, DataTable, TableCard, employeeColumns, employees } from '@/components/lmtlss_23/tables'

/** Tương ứng datatable_basic.html của template (Datatables - Basic) */
export default function DatatableBasic() {
  return (
    <LimitlessLayout>
      <PageHeader
        title="Datatables"
        subtitle="Basic"
        buttons={[
          { icon: 'bars-alt', label: 'Statistics' },
          { icon: 'calculator', label: 'Invoices' },
          { icon: 'calendar5', label: 'Schedule' },
        ]}
        breadcrumbs={[
          { label: 'Home', to: '/lmtlss_23/', icon: 'home2' },
          { label: 'Datatables', to: '/lmtlss_23/datatable-basic' },
          { label: 'Basic' },
        ]}
        breadcrumbActions={<BreadcrumbActions />}
      />

      <Content>
        <TableCard
          title="Basic datatable"
          description={
            <>
              The <code>DataTables</code> is a highly flexible tool, based upon the foundations of progressive
              enhancement, and will add advanced interaction controls to any HTML table. DataTables has most features
              enabled by default, so all you need to do to use it with your own tables is to call the construction
              function. Searching, ordering, paging etc goodness will be immediately added to the table, as shown in
              this example. <strong>Datatables support all available table styling.</strong>
            </>
          }
        >
          <DataTable className="datatable-basic" columns={employeeColumns} rows={employees} rowKey={(r) => r.id} />
        </TableCard>

        <TableCard
          title="Pagination types"
          description={
            <>
              The default page control (forward and backward buttons with up to 7 page numbers in-between) is fine for
              most situations, but in some cases you may wish to customise the options presented to the end user. This
              is done through DataTables' extensible pagination mechanism, the <code>pagingType</code> option.
              Supported pagination types are: <code>simple</code>, <code>simple_numbers</code>, <code>full</code> and{' '}
              <code>full_numbers</code>. This example shows <code>simple</code> pagination type.
            </>
          }
        >
          <DataTable
            className="datatable-pagination"
            columns={employeeColumns}
            rows={employees}
            rowKey={(r) => r.id}
            pagingType="simple"
            paginateLabels={{ previous: '← Prev', next: 'Next →' }}
          />
        </TableCard>

        <TableCard
          title="State saving"
          description={
            <>
              DataTables has the option of being able to <code>save the state</code> of a table: its paging position,
              ordering state etc., so that is can be restored when the user reloads a page, or comes back to the page
              after visiting a sub-page. This state saving ability is enabled by the <code>stateSave</code> option. The{' '}
              <code>duration</code> for which the saved state is valid can be set using the{' '}
              <code>stateDuration</code> initialisation parameter (2 hours by default).
            </>
          }
        >
          <DataTable
            className="datatable-save-state"
            columns={employeeColumns}
            rows={employees}
            rowKey={(r) => r.id}
            stateSaveKey="datatable-save-state"
          />
        </TableCard>

        <TableCard
          title="Scrollable datatable"
          description={
            <>
              This example shows the DataTables table body <code>scrolling</code> in the <code>vertical</code>{' '}
              direction. This can generally be seen as an alternative method to pagination for displaying a large table
              in a fairly small vertical area, and as such pagination has been disabled here. Note that this is not
              mandatory, it will work just fine with pagination enabled as well!.
            </>
          }
        >
          <DataTable
            className="datatable-scroll-y"
            columns={employeeColumns}
            rows={employees}
            rowKey={(r) => r.id}
            scrollY={300}
          />
        </TableCard>
      </Content>
    </LimitlessLayout>
  )
}
