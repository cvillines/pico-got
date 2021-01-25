import React from "react";
import { usePagination, useTable, useSortBy } from "react-table";


interface ITable {
  columns: any;
  data: any;
}

function Table({ columns, data }: ITable) {
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
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      <div className="row">
        <div className="col-12">
          <table {...getTableProps()} className="table table-responsive">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? "\u25B2"
                            : "\u25BC"
                          : ""}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={i}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
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
