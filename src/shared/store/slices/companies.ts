import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CompanyDTO } from '../../types/dto';
import { mockCompanies } from '../../mock/companies';

const ITEMS_IN_LOAD_AMOUNT = 10;

export type CompanyStoreData = CompanyDTO & { isSelected: boolean };

export type EditFieldPayload = {
  id: string;
  field: 'address' | 'name';
  value: string;
};

interface CompaniesState {
  /* 
    maybe i should use smthng like 

    companies: {
      key as companyId: {
        address: ...,
        name: ...,
      }
    }

    instead of array, to minimize O(n) iterations, but looks like overengineering there
  */
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
    getTotalCompaniesLength: (store) => store.companies.length,
  },
  reducers: {
    deleteSelectedCompanies: (state) => {
      state.companies = state.companies.filter(({ isSelected }) => !isSelected);
    },
    addCompany: (state, action: PayloadAction<CompanyDTO>) => {
      state.companies.push({ ...action.payload, isSelected: false });
    },
    editCompanyField: (state, action: PayloadAction<EditFieldPayload>) => {
      const { field, id, value } = action.payload;
      const company = state.companies.find((company) => company.id === id);

      if (company) {
        company[field] = value;
      }
    },
    loadMoreCompanies: (state) => {
      state.itemsToRender = state.itemsToRender + ITEMS_IN_LOAD_AMOUNT;
    },

    toggleSelectAll: (state) => {
      const isAllRenderedCompaniesSelected = state.companies
        .slice(0, state.itemsToRender)
        .every(({ isSelected }) => isSelected);

      const iterationLimit = Math.min(
        state.itemsToRender,
        state.companies.length,
      );

      for (let i = 0; i < iterationLimit; i++) {
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
  loadMoreCompanies,
  toggleSelectAll,
  toggleSelectCompany,
  editCompanyField,
} = companiesSlice.actions;
const { getAllCompanies, getItemsToRender, getTotalCompaniesLength } =
  companiesSlice.selectors;

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
  editCompanyField,
  getAllCompanies,
  getCompaniesToRender,
  loadMoreCompanies,
  toggleSelectAll,
  toggleSelectCompany,
  getTotalCompaniesLength,
};
export default companiesSlice.reducer;
