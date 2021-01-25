import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

import GotApi from "../../api/";
import { IBook } from "../../types/";

const gotApi = new GotApi();

interface BookState {
  books: IBook[];
}

const initialState: BookState = {
  books: [],
};

export const getBooks = createAsyncThunk("books/fetchBooks", async () => {
  const allBooks = await gotApi.fetchBooks();
  return allBooks;
});

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: {
    [getBooks.pending as any]: () => {},
    [getBooks.fulfilled as any]: (state, action) => {
      state.books = action.payload;
    },
  },
});

export const allBooks = (state: RootState) => state.books;

export default booksSlice.reducer;
