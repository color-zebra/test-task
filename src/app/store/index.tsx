import { configureStore } from '@reduxjs/toolkit';
import companiesReducer from '../../widget/CompaniesTable/model/slice';

export const reducer = {
  companies: companiesReducer,
};

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
