import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

import GotApi from "../../api/";
import { ICharacter } from "../../types/";

const gotApi = new GotApi();

interface CharacterState {
  characterDetails: ICharacter;
}

const initialState: CharacterState = {
  characterDetails: {} as ICharacter,
};

export const getCharacterDetails = createAsyncThunk(
  "characters/getCharacterDetails",
  async (id: string) => {
    const characterDetails = await gotApi.fetchCharacterDetails(id);
    return characterDetails;
  }
);

export const characterDetailSlice = createSlice({
  name: "characterDetails",
  initialState,
  reducers: {},
  extraReducers: {
    [getCharacterDetails.pending as any]: () => {
    },
    [getCharacterDetails.fulfilled as any]: (state, action) => {
      state.characterDetails = action.payload;
    },
  },
});

export const character = (state: RootState) => state.characterDetails;

export default characterDetailSlice.reducer;
