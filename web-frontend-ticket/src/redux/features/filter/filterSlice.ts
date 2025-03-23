// file filter
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Interface untuk state filter
export interface FilterState {
    availbility?: boolean;
    city?: string;
    // genre?: string;
    theaters?: string[];
}

// Interface untuk state data yang mencakup FilterState
interface DataState {
    data: FilterState;
}

// Inisialisasi state awal dengan nilai default (semua di-set sebagai undefined)
const initialState: DataState = {
    data: {
        availbility: undefined,
        city: undefined,
        genre: undefined,
        theaters: undefined,
    },
};

// Membuat slice Redux untuk filter dengan nama "filter"
export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
// Reducer untuk mengupdate data filter
        setFilter: (state, action: PayloadAction<DataState>) => {
// Melakukan merge antara state.data yang sudah ada dengan data baru yang dikirim melalui action.payload.data
            state.data = {
                ...state.data,
                ...action.payload.data,
            };
        },
    },
});

// Mengekspor action setFilter untuk dapat dipakai di komponen lainnya
export const { setFilter } = filterSlice.actions;

// Mengekspor reducer sebagai default export untuk digabungkan di store Redux
export default filterSlice.reducer