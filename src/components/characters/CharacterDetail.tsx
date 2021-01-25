import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAll } from "../../util/dataUtils";

import { character, getCharacterDetails } from "./characterDetailSlice";

export function CharacterDetail() {
  const dispatch = useDispatch();

  const { characterDetails } = useSelector(character);
  const characterId = window.location.pathname.split("/characters/")[1];

  useEffect(() => {
    dispatch(getCharacterDetails(characterId));
  }, [characterId, dispatch]);

  const {
    aliases,
    born,
    culture,
    died,
    name,
    playedBy,
    titles,
    tvSeries,
  } = characterDetails;

  return (
    <section>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item" aria-current="page">
            <button onClick={() => window.history.back()}>
              House
            </button>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {name}
          </li>
        </ol>
      </nav>
      <h1>{name}</h1>
      <dl>
        <dt>Aliases</dt>
        <dd>{getAll(aliases)}</dd>
        <dt>Culture</dt>
        <dd>{culture}</dd>
        <dt>Born</dt>
        <dd>{born}</dd>
        <dt>Died</dt>
        <dd>{died}</dd>
        <dt>Played By</dt>
        <dd>{getAll(playedBy)}</dd>
        <dt>Titles</dt>
        <dd>{getAll(titles)}</dd>
        <dt>Seasons</dt>
        <dd>{getAll(tvSeries)}</dd>
      </dl>
    </section>
  );
}
