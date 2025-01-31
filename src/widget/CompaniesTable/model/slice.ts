import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CompanyDTO } from '../../../shared/types/shared';
import { mockCompanies } from '../../../shared/mock/companies';

type CompanyStoreData = CompanyDTO & { isSelected: boolean };

interface CompaniesState {
  companies: Array<CompanyStoreData>;
  itemsToRender: number;
}

const initialState: CompaniesState = {
  companies: mockCompanies.map((item) => ({ ...item, isSelected: false })),
  itemsToRender: 20,
};

export const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  selectors: {
    getAllCompanies: (store) => store.companies,
    getItemsToRender: (store) => store.itemsToRender,
  },
  reducers: {
    deleteSelectedCompanies: (state) => {
      state.companies = state.companies.filter(({ isSelected }) => !isSelected);
    },
    addCompany: (state, action: PayloadAction<CompanyDTO>) => {
      state.companies.push({ ...action.payload, isSelected: false });
    },
    setCompaniesToRender: (
      state,
      action: PayloadAction<Pick<CompaniesState, 'itemsToRender'>>,
    ) => {
      state.itemsToRender = action.payload.itemsToRender;
    },
    toggleSelectAll: (state) => {
      const isAllRenderedCompaniesSelected = state.companies
        .slice(0, state.itemsToRender)
        .every(({ isSelected }) => isSelected);
      for (
        let i = 0;
        i < Math.min(state.itemsToRender, state.companies.length);
        i++
      ) {
        state.companies[i].isSelected = !isAllRenderedCompaniesSelected;
      }
    },
    toggleSelectCompany: (
      state,
      action: PayloadAction<Pick<CompanyStoreData, 'id' | 'isSelected'>>,
    ) => {
      const company = state.companies.find(
        (company) => company.id === action.payload.id,
      );
      if (company) {
        company.isSelected = !action.payload.isSelected;
      }
    },
  },
});

const {
  addCompany,
  deleteSelectedCompanies,
  setCompaniesToRender,
  toggleSelectAll,
  toggleSelectCompany,
} = companiesSlice.actions;
const { getAllCompanies, getItemsToRender } = companiesSlice.selectors;

const getCompaniesToRender = createSelector(
  [getAllCompanies, getItemsToRender],
  (companies, itemsToRender) =>
    itemsToRender >= companies.length
      ? companies
      : companies.slice(0, itemsToRender),
);

export {
  addCompany,
  deleteSelectedCompanies,
  getAllCompanies,
  getCompaniesToRender,
  setCompaniesToRender,
  toggleSelectAll,
  toggleSelectCompany,
};
export default companiesSlice.reducer;
