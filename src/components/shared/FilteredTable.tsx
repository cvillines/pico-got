import React from "react";
import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useGroupBy,
  useExpanded,
  useRowSelect,
} from "react-table";

interface IDefaultColumnFilter {
  column: any;
  filterValue: any;
  preFilteredRows: any;
  setFilter: any;
}

function DefaultColumnFilter({
  column: { filterValue, setFilter },
}: IDefaultColumnFilter) {
  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      placeholder={`Search`}
    />
  );
}

interface ITable {
  columns: any;
  data: any;
}

function Table({ columns, data }: ITable) {
  const filterTypes = React.useMemo(
    () => ({
      text: (rows: any, id: any, filterValue: any) => {
        return rows.filter((row: any) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: {
      pageIndex,
      pageSize,
    },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      disableMultiSort: true,
    },
    useFilters,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );

  return (
    <>
      <table {...getTableProps()} className="table table-responsive">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  <div>
                    <span {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                      {column.isSorted
                        ? column.isSortedDesc
                          ? "\u25B2"
                          : "\u25BC"
                        : ""}
                    </span>
                  </div>
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>
                      {cell.isGrouped ? (
                        <>
                          <span {...row.getToggleRowExpandedProps()}>
                            {row.isExpanded ? "👇" : "👉"}
                          </span>{" "}
                          {cell.render("Cell", { editable: false })} (
                          {row.subRows.length})
                        </>
                      ) : cell.isAggregated ? (
                        cell.render("Aggregated")
                      ) : cell.isPlaceholder ? null : (
                        cell.render("Cell", { editable: true })
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="row mt-4">
        <div className="col-12">
          <ul className="pagination">
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                {"\u00AB"}
              </button>{" "}
            </li>{" "}
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                {"\u2039"}
              </button>{" "}
            </li>{" "}
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                {"\u203A"}
              </button>{" "}
            </li>{" "}
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                {"\u00BB"}
              </button>{" "}
            </li>{" "}
            <li className="page-item">
              <span>
                {pageIndex + 1}/{pageOptions.length}
              </span>
            </li>{" "}
            <li className="page-item">
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Table;
