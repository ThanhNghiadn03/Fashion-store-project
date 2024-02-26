import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


// First, create the thunk
export const fetchAccount = createAsyncThunk(
    'account/fetchAccount',
    async () => {
        const response = await axios.get('http://localhost:6969/customers/profile');
        return response.data;
    }
)

const initialState = {
    // isAuthenticated: false,
    isAuthenticated: false,
    isLoading: true,
    isRefreshToken: false,
    errorRefreshToken: "",
    user: {
        id: "",
        email: "",
        role: "",
    },
    // activeMenu: 'home'
};


export const accountSlide = createSlice({
    name: 'account',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        setActiveMenu: (state, action) => {
            state.activeMenu = action.payload;
        },
        setUserLoginInfo: (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user.id = action?.payload?.id;
            state.user.email = action?.payload?.email;
            state.user.role = action?.payload?.role;
            console.log(action.payload);
        },
        setLogoutAction: (state, action) => {
            localStorage.removeItem('access_token');
            state.isAuthenticated = false;
            state.user = {
                // email: "",
                // phone: "",
                // _id: "",
                // role: "",
                // name: ""
                id: "",
                email: "",
                role: "",

            }
        },
        setRefreshTokenAction: (state, action) => {
            state.isRefreshToken = action.payload?.status ?? false;
            state.errorRefreshToken = action.payload?.message ?? "";
        }

    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchAccount.pending, (state, action) => {
            if (action.payload) {
                state.isAuthenticated = false;
                state.isLoading = true;
            }
        })

        builder.addCase(fetchAccount.fulfilled, (state, action) => {
            if (action.payload) {
                state.isAuthenticated = true;
                state.isLoading = false;
                state.user = { ...state.user, ...action.payload.user }
            }
        })

        builder.addCase(fetchAccount.rejected, (state, action) => {
            if (action.payload) {
                state.isAuthenticated = false;
                state.isLoading = false;
            }
        })

    },

});

export const {
    setActiveMenu, setUserLoginInfo, setLogoutAction, setRefreshTokenAction
} = accountSlide.actions;

export default accountSlide.reducer;
