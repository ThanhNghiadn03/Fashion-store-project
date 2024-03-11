import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


// First, create the thunk
export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (id) => {
        const response = await axios.get(`http://localhost:6969/carts/${id}`);
        return response.data;
    }
)

const initialState = {
    cart: [],
};


export const cartSlide = createSlice({
    name: 'cart',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        setActiveMenu: (state, action) => {
            state.activeMenu = action.payload;
        },
        setCart: (state, action) => {
            let isExist = false;
            let index = 0;
            for(let i=0; i<state.cart.length; i++) {
                if(state.cart[i].idProducts === action.payload.idProducts) {
                    isExist = true;
                    index = i;
                }
            }
            if (isExist) {
            state.cart[index].quantity += action.payload.quantity;
            } else {
            state.cart.push(action.payload);
            }
            console.log('action payload: ',action.payload);
        },

        startCart: (state, item) => {
           for(let i = 0; i<item.payload.length; i++) {
            // console.log(`item thứ ${i}`,item[i]);
            state.cart.push({
                idProducts: item.payload[i].idProduct,
                quantity: item.payload[i].items.quantity,
                price: item.payload[i].items.price,
                productName: item.payload[i].items.nameProduct,
                img: item.payload[i].items.imageProduct
            })
           }
        },

        reSetCart: (state) => {
            state.cart = []
        }

    }

});

export const {
    setActiveMenu, 
    setCart, 
    reSetCart, 
    startCart
} = cartSlide.actions;

export default cartSlide.reducer;
