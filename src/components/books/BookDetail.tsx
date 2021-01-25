import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";

import { singleBook, getBookDetails } from "./bookDetailSlice";
import { getAll } from "../../util/dataUtils";

export function BookDetail() {
  const dispatch = useDispatch();
  const { bookDetails } = useSelector(singleBook);
  const bookId = window.location.pathname.split("/books/")[1];

  useEffect(() => {
    dispatch(getBookDetails(bookId));
  }, [bookId, dispatch]);

  const {
    name,
    authors,
    country,
    isbn,
    mediaType,
    numberOfPages,
    publisher,
    released,
  } = bookDetails;

  return (
    <section>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item" aria-current="page">
            <a href="/books">Books</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {name}
          </li>
        </ol>
      </nav>
      <h1>{name}</h1>
      <dl>
        <dt>Authors</dt>
        <dd>{getAll(authors)}</dd>
        <dt>Country</dt>
        <dd>{country}</dd>
        <dt>ISBN</dt>
        <dd>{isbn}</dd>
        <dt>Media</dt>
        <dd>{mediaType}</dd>
        <dt>Pages</dt>
        <dd>{numberOfPages}</dd>
        <dt></dt>
        <dd>{}</dd>
        <dt>Publisher</dt>
        <dd>{publisher}</dd>
        <dt>Release Date</dt>
        <dd>{dayjs(released).format("M/D/YYYY")}</dd>
      </dl>
    </section>
  );
}
