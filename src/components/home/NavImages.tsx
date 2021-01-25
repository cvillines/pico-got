import React from "react";
import { Link } from "react-router-dom";

import booksImg from "../../images/books.jpg";
import housesImg from "../../images/houses.jpg";

export default function NavImages() {
  return (
    <nav>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-6 mb-4">
          <div className="card">
            <Link to="/books">
              <img className="card-img-top" src={booksImg} alt="Books" />
              <div className="card-body">
                <button className="btn btn-primary">View Books</button>
              </div>
            </Link>
          </div>
        </div>
        <div className="col-12 col-lg-6 mb-4">
          <div className="card">
            <Link to="/houses">
              <img className="card-img-top" src={housesImg} alt="Houses" />
              <div className="card-body">
                <button className="btn btn-primary">View Houses</button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
