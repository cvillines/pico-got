import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import heroImg from "./images/hero.jpg";
import logo from "./images/logo.jpg";
import { Books } from "./components/books/Books";
import { BookDetail } from "./components/books/BookDetail";
import { CharacterDetail } from "./components/characters/CharacterDetail";
import { Houses } from "./components/houses/Houses";
import { HouseDetail } from "./components/houses/HouseDetail";
import { Members } from "./components/houses/Members";
import NavImages from "./components/home/NavImages";
import "./App.css";

function App() {
  return (
    <Router>
      <header>
        <Link to="/">
        <div className="logo my-4">
        <img src={logo} alt="Game of Thrones Logo" />
        </div>
          <div className="hero-image mb-4">
            <img src={heroImg} alt="Game of Thrones" />
          </div>
        </Link>
      </header>{" "}
      <div className="container">
        <Switch>
          <Route path="/books/:id">
            <BookDetail />
          </Route>
          <Route path="/books" exact>
            <Books />
          </Route>
          <Route path="/houses/:id">
            <HouseDetail />
          </Route>
          <Route path="/houses" exact>
            <Houses />
          </Route>
          <Route path="/members/:houseId">
            <Members />
          </Route>
          <Route path="/characters/:id">
            <CharacterDetail />
          </Route>
          <Route path="/">
            <NavImages />
          </Route>
          <Route
            path="*"
            render={() => {
              return (
                <div>
                  <h3>404 Page Not Found</h3>
                </div>
              );
            }}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
