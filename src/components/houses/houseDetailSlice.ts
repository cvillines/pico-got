import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

import GotApi from "../../api/";
import { IHouse } from "../../types/";

const gotApi = new GotApi();

interface HouseState {
  houseDetails: IHouse;
}

const initialState: HouseState = {
  houseDetails: {} as IHouse,
};

export const getHouseDetails = createAsyncThunk(
  "houses/getHouseDetails",
  async (id: string) => {
    const houseDetails = await gotApi.fetchDetails(id);
    return houseDetails;
  }
);

export const houseDetailSlice = createSlice({
  name: "houseDetails",
  initialState,
  reducers: {},
  extraReducers: {
    [getHouseDetails.pending as any]: () => {},
    [getHouseDetails.fulfilled as any]: (state, action) => {
      state.houseDetails = action.payload;
    },
  },
});

export const singleHouse = (state: RootState) => state.houseDetails;

export default houseDetailSlice.reducer;
