import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { callFetchProduct } from '@/config/api';
import { IProduct, IUser } from '@/types/backend';

interface IState {
    isFetching: boolean;
    meta: {
        // current: number;
        // pageSize: number;
        // pages: number;
        // total: number;
    },
    result: IProduct[]
}
// First, create the thunk
export const fetchProduct = createAsyncThunk(
    'product/fetchProduct',
    // async ({ query }: { query: string }) => {
    async () => {
        // const response = await callFetchUser(query);
        const response = await callFetchProduct();
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


export const productSlide = createSlice({
    name: 'product',
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
        builder.addCase(fetchProduct.pending, (state, action) => {
            state.isFetching = true;
            // Add product to the state array
            // state.courseOrder = action.payload;
        })

        builder.addCase(fetchProduct.rejected, (state, action) => {
            state.isFetching = false;
            // Add user to the state array
            // state.courseOrder = action.payload;
        })

        builder.addCase(fetchProduct.fulfilled, (state, action) => {
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
} = productSlide.actions;

export default productSlide.reducer;
