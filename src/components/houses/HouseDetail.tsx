import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";

import GotApi from "../../api/";
import { singleHouse, getHouseDetails } from "./houseDetailSlice";

const gotApi = new GotApi();

export function HouseDetail() {
  const dispatch = useDispatch();
  const [heirName, setHeirName] = useState("");
  const [currentLordName, setCurrentLord] = useState("");
  const [overlordName, setOverlordName] = useState("");
  const { houseDetails } = useSelector(singleHouse);
  const houseId = window.location.pathname.split("/houses/")[1];

  const {
    name,
    coatOfArms,
    currentLord,
    diedOut,
    founded,
    founder,
    heir,
    overlord,
    region,
    seats,
    swornMembers,
    titles,
    words,
  } = houseDetails;

  const getCharacterId = (url: string) => {
    return url?.split("/characters/")[1];
  };
  const gethouseId = (url: string) => {
    return url?.split("/houses/")[1];
  };
  const heirId = getCharacterId(heir);
  const lordId = getCharacterId(currentLord);
  const overlordId = gethouseId(overlord);

  useEffect(() => {
    dispatch(getHouseDetails(houseId));
  }, [dispatch, houseId]);

  useEffect(() => {
    async function getCurrentLord(id: string): Promise<any> {
      try {
        const overlord = await gotApi.fetchCharacterDetails(id);
        setCurrentLord(overlord.name);
      } catch {
        // TODO: handle error
      }
    }
    getCurrentLord(lordId);

    async function getHeir(id: string): Promise<any> {
      try {
        const heir = await gotApi.fetchCharacterDetails(id);
        setHeirName(heir.name);
      } catch {
        // TODO: handle error
      }
    }
    getHeir(heirId);

    async function getOverlord(id: string): Promise<any> {
      try {
        const overlord = await gotApi.fetchCharacterDetails(id);
        setOverlordName(overlord.name);
      } catch {
        // TODO: handle error
      }
    }
    getOverlord(overlordId);
  }, [heirId, lordId, overlordId]);

  return (
    <section>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item" aria-current="page">
            <a href="/houses">Houses</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {name}
          </li>
        </ol>
      </nav>
      <h1>{name}</h1>
      <dl>
        <dt>Coat of Arms</dt>
        <dd>{coatOfArms}</dd>
        <dt>Current Lord</dt>
        <dd>
          {lordId ? (
            <Link to={`/characters/${lordId}`}>{currentLordName}</Link>
          ) : (
            "none"
          )}
        </dd>
        <dt>Died Out</dt>
        <dd>{diedOut}</dd>
        <dt>Founded</dt>
        <dd>{founded}</dd>
        <dt>founder</dt>
        <dd>{founder}</dd>
        <dt>Heir</dt>
        <dd>
          {heirId ? (
            <Link to={`/characters/${heirId}`}>{heirName}</Link>
          ) : (
            "none"
          )}
        </dd>
        <dt>Overlord </dt>
        <dd>
          {overlordId ? (
            <Link to={`/characters/${overlordId}`}>{overlordName}</Link>
          ) : (
            "none"
          )}
        </dd>
        <dt>Sworn Members </dt>
        <dd>
          {!isEmpty(swornMembers) && (
            <Link to={`/members/${houseId}`}>View All</Link>
          )}
        </dd>
        <dt>Region</dt>
        <dd>{region}</dd>
        <dt>Seats</dt>
        <dd>{seats}</dd>
        <dt>Titles</dt>
        <dd>{titles}</dd>
        <dt>Words</dt>
        <dd>{words}</dd>
      </dl>
    </section>
  );
}
