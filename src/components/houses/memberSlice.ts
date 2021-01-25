import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

import GotApi from "../../api/";
import { ICharacter } from "../../types/";

const gotApi = new GotApi();

interface MemberState {
  houseMembers: ICharacter[];
}

const initialState: MemberState = {
  houseMembers: {} as ICharacter[],
};

export const getMembers = createAsyncThunk(
  "houses/getMembers",
  async (id: string) => {
    const { swornMembers } = await gotApi.fetchDetails(id);
    const getCharacterId = (url: string) => {
      return url?.split("/characters/")[1];
    };
    const members = swornMembers.map(async (m: string) => {
      const charId = getCharacterId(m);
      const member = await gotApi.fetchCharacterDetails(charId);

      const books = member.books.map(async (book: string) => {
        const bookId = book.split(
          "/books/"
        )[1];
        const bookDetails = await gotApi.fetchBookDetails(bookId);
        return bookDetails;
      });

      member.bookDetails = await Promise.all(books);

      return member;
    });

    return Promise.all(members);
  }
);

export const memberSlice = createSlice({
  name: "members",
  initialState,
  reducers: {},
  extraReducers: {
    [getMembers.pending as any]: () => {
    },
    [getMembers.fulfilled as any]: (state, action) => {
      state.houseMembers = action.payload;
    },
  },
});

export const memberDetails = (state: RootState) => state.houseMembers;

export default memberSlice.reducer;
