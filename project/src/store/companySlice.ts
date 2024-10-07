import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICompanyItem } from "../types/types";

interface companySliceState {
    companies: ICompanyItem[];
    checkedCompanyIds: string[];
    newCompanyId: string;
}

const initialState: companySliceState = {
    companies: [],
    checkedCompanyIds: [],
    newCompanyId: ''
}

const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        setCompany: (state, action: PayloadAction<ICompanyItem[]>) => {
            state.companies = action.payload;
        },
        deleteCompany: (state, action: PayloadAction<string[]>) => {
            state.companies = state.companies.filter(company => !action.payload.includes(company.id));
        },
        updateCompany: (state, action: PayloadAction<ICompanyItem>) => {
            const updatedCompany = action.payload;
            const companyId = action.payload.id;

            const companyIndex = state.companies.findIndex(
                (company) => company.id === companyId
            );

            if (companyIndex !== -1) {
                state.companies[companyIndex] = updatedCompany;
            }
        },
        toggleCompanyId: (state, action: PayloadAction<string[]>) => {
            action.payload.forEach((item) => {
                if (state.checkedCompanyIds.includes(item)) {
                    state.checkedCompanyIds = state.checkedCompanyIds.filter(id => id !== item);
                } else {
                    state.checkedCompanyIds.push(item);
                }
            });
        },
        deleteCompanyId: (state, action: PayloadAction<string>) => {
            if (state.checkedCompanyIds.includes(action.payload)) {
                state.checkedCompanyIds = state.checkedCompanyIds.filter(id => id !== action.payload);
            }
        },
        setNewCompanyId: (state, action: PayloadAction<string>) => {
            state.newCompanyId = action.payload;
        },
        clearNewCompanyId: (state) => {
            state.newCompanyId = '';
        },
        addCompanyIds: (state, action: PayloadAction<string[]>) => {
            state.checkedCompanyIds = action.payload;
        },
        clearCompanyIds: (state) => {
            state.checkedCompanyIds = [];
        },
    }
});

export const { setCompany, deleteCompany, updateCompany, toggleCompanyId, deleteCompanyId, setNewCompanyId, clearNewCompanyId, addCompanyIds, clearCompanyIds } = companySlice.actions;
export default companySlice.reducer;
