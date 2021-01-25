import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { isEmpty } from "lodash";

import { allBooks, getBooks } from "./bookSlice";
import Table from "../shared/Table";
import Loading from "../shared/Loading";

export function Books() {
  const { books } = useSelector(allBooks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Books",
        columns: [
          {
            Header: "Name",
            accessor: "name",
            Cell: (props: { row: any; value: string }) => {
              const { row, value } = props;
              const bookId = row.original.url.split("/books/")[1];

              return (
                <div>
                  <Link to={`/books/${bookId}`}>
                    <span className="number">{value}</span>
                  </Link>
                </div>
              );
            },
          },
          {
            Header: "Release Date",
            accessor: "released",
            Cell: (props) => dayjs(props.value).format("M/D/YYYY"),
          },
          {
            Header: "Pages",
            accessor: "numberOfPages",
          },
        ],
      },
    ],
    []
  );

  return (
    <section>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Books
          </li>
        </ol>
      </nav>
      {!isEmpty(books) ? <Table columns={columns} data={books} /> : <Loading />}
    </section>
  );
}
