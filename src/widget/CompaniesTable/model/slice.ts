import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Company } from '../../../shared/types/shared';
import { mockCompanies } from '../../../shared/mock/companies';

interface CompaniesState {
  companies: Company[];
}

const initialState: CompaniesState = {
  companies: mockCompanies.slice(0, 3),
};

export const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  selectors: {
    getAllCompanies: (store) => store.companies,
  },
  reducers: {
    deleteCompany: (state, action: PayloadAction<{ id: string }>) => {
      state.companies = state.companies.filter(
        ({ id }) => id !== action.payload.id,
      );
    },
    addCompany: (state, action: PayloadAction<Company>) => {
      state.companies.push(action.payload);
    },
  },
});

export const { addCompany, deleteCompany } = companiesSlice.actions;
export const { getAllCompanies } = companiesSlice.selectors;

export default companiesSlice.reducer;
