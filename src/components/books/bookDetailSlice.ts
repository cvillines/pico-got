import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

import GotApi from "../../api/";
import { IBook } from "../../types/";

const gotApi = new GotApi();

interface BookState {
  bookDetails: IBook;
}

const initialState: BookState = {
  bookDetails: {} as IBook,
};

export const getBookDetails = createAsyncThunk(
  "books/getBookDetails",
  async (id: string) => {
    const bookDetails = await gotApi.fetchBookDetails(id);

    return bookDetails;
  }
);

export const bookDetailSlice = createSlice({
  name: "bookDetails",
  initialState,
  reducers: {},
  extraReducers: {
    [getBookDetails.pending as any]: () => {},
    [getBookDetails.fulfilled as any]: (state, action) => {
      state.bookDetails = action.payload;
    },
  },
});

export const singleBook = (state: RootState) => state.bookDetails;

export default bookDetailSlice.reducer;
