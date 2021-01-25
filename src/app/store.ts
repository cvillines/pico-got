import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux'
import characterReducer from '../components/characters/characterDetailSlice';
import booksReducer from '../components/books/bookSlice';
import bookDetailReducer from '../components/books/bookDetailSlice';
import housesReducer from '../components/houses/houseSlice';
import houseDetailReducer from '../components/houses/houseDetailSlice';
import memberReducer from '../components/houses/memberSlice';

export const store = configureStore({
  reducer: {
    books: booksReducer,
    bookDetails: bookDetailReducer,
    characterDetails: characterReducer,
    houses: housesReducer,
    houseDetails: houseDetailReducer,
    houseMembers: memberReducer,
  },
});

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() // Export a hook that can be reused to resolve types

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
