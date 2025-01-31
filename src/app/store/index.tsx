import { configureStore } from '@reduxjs/toolkit';
import companiesReducer from '../../widget/CompaniesTable/model/slice';
import { useDispatch, useSelector } from 'react-redux';

export const reducer = {
  companies: companiesReducer,
};

export const store = configureStore({
  reducer,
});

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
