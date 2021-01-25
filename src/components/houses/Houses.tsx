import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";

import { allHouses, getHouses } from "./houseSlice";
import Table from "../shared/Table";
import Loading from "../shared/Loading";

export function Houses() {
  const { houses } = useSelector(allHouses);
  const dispatch = useDispatch();

  const columns = React.useMemo(
    () => [
      {
        Header: "Houses",
        columns: [
          {
            Header: "Name",
            accessor: "name",
            canSort: false,
            Cell: (props: { row: any, value: string }) => {
              const { row, value } = props;
              const houseId = row.original.url.split("/houses/")[1];

              return (
                <div>
                  <Link to={`/houses/${houseId}`}>{value}</Link>
                </div>
              );
            },
          },
          {
            Header: "Region",
            accessor: "region",
          },
        ],
      },
    ],
    []
  );

  useEffect(() => {
    dispatch(getHouses());
  }, [dispatch]);

  return (
    <section>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Houses
          </li>
        </ol>
      </nav>
      {!isEmpty(houses) ? (
        <Table columns={columns} data={houses} />
      ) : (
        <Loading />
      )}
    </section>
  );
}
