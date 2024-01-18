import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import weatherReducer from './features/weatherSlice'
export const store = configureStore({
  reducer: combineReducers({
    weatherReducer,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
