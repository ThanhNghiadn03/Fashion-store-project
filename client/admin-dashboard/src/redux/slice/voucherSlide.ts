import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { callFetchVoucher } from '@/config/api';
import { IVoucher } from '@/types/backend';

interface IState {
    isFetching: boolean;
    meta: {
        // current: number;
        // pageSize: number;
        // pages: number;
        // total: number;
    },
    result: IVoucher[]
}
// First, create the thunk
export const fetchVoucher = createAsyncThunk(
    'voucher/fetchVoucher',
    // async ({ query }: { query: string }) => {
    async () => {
        // const response = await callFetchUser(query);
        const response = await callFetchVoucher();
        return response;
    }
)


const initialState: IState = {
    isFetching: true,
    meta: {
        // current: 1,
        // pageSize: 10,
        // pages: 0,
        // total: 0
    },
    result: []
};


export const voucherSlide = createSlice({
    name: 'voucher',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        setActiveMenu: (state, action) => {
            // state.activeMenu = action.payload;
        },


    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchVoucher.pending, (state, action) => {
            state.isFetching = true;
            // Add user to the state array
            // state.courseOrder = action.payload;
        })

        builder.addCase(fetchVoucher.rejected, (state, action) => {
            state.isFetching = false;
            // Add user to the state array
            // state.courseOrder = action.payload;
        })

        builder.addCase(fetchVoucher.fulfilled, (state, action) => {
            if (action.payload && action.payload.data) {
                state.isFetching = false;
                // state.meta = action.payload.data.meta;
                state.result = action.payload.data.result;
            }
            // Add user to the state array

            // state.courseOrder = action.payload;
        })
    },

});

export const {
    setActiveMenu,
} = voucherSlide.actions;

export default voucherSlide.reducer;
