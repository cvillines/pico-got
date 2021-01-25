import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

import GotApi from "../../api/";
import { IHouse } from "../../types/";

const gotApi = new GotApi();

interface HouseState {
  houses: IHouse[];
}

const initialState: HouseState = {
  houses: [],
};

export const getHouses = createAsyncThunk(
  "houses/getHouses",
  async () => {
    const houses = await gotApi.fetchHouses();
    return houses;
  }
);

export const housesSlice = createSlice({
  name: "houses",
  initialState,
  reducers: {},
  extraReducers: {
    [getHouses.pending as any]: () => {
    },
    [getHouses.fulfilled as any]: (state, action) => {
      state.houses = action.payload;
    },
  },
});

export const allHouses = (state: RootState) => state.houses;

export default housesSlice.reducer;
