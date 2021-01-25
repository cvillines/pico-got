import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty } from "lodash";

import { singleHouse, getHouseDetails } from "./houseDetailSlice";
import { memberDetails, getMembers } from "./memberSlice";
import Table from "../shared/FilteredTable";
import Loading from "../shared/Loading";

export function Members() {
  const dispatch = useDispatch();
  const { houseDetails } = useSelector(singleHouse);
  const { houseMembers } = useSelector(memberDetails);
  const houseId = window.location.pathname.split("/members/")[1];
  const { name } = houseDetails;

  useEffect(() => {
    dispatch(getHouseDetails(houseId));
    dispatch(getMembers(houseId));
  }, [dispatch, houseId]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Sworn Members",
        columns: [
          {
            Header: "Name",
            accessor: "name",
          },
          {
            Header: "Culture",
            accessor: "culture",
          },
          {
            Header: "Gender",
            accessor: "gender",
          },
          {
            Header: "Books",
            accessor: "bookDetails",
            canFilter: false,
            Cell: (props: { row: any }) => {
              const { row } = props;
              return (
                row.original.bookDetails.map(
                  (b: { name: string; url: string }) => {
                    const bookId = b.url.split("/books/")[1];
                    return (
                      <p key={b.url}>
                        <a href={`/books/${bookId}`}>{b.name}</a>
                      </p>
                    );
                  }
                ) || ""
              );
            },
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
            <a href={`/houses/${houseId}`}>{name}</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Sworn Members
          </li>
        </ol>
      </nav>
      <h1>{name}</h1>
      {!isEmpty(houseMembers) ? (
        <Table columns={columns} data={houseMembers} />
      ) : (
        <Loading />
      )}
    </section>
  );
}
