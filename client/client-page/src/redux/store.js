import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import { createStore } from 'redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import orebiReducer from "./orebiSlice";
import accountReducer from "./slice/accountSlice";
import cartReducer from "./slice/cartSlice"

const rootReducer = combineReducers({
  account: accountReducer,
  cart: cartReducer,
  // other reducers...
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, orebiReducer,rootReducer);
const statePersistedReducer = persistReducer(persistConfig, accountReducer);
const cartPersistedReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: { 
    account: statePersistedReducer,
    cartReducer: cartPersistedReducer,
    orebiReducer: persistedReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const combine = configureStore({
  reducer: {
    persisted: persistedReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
export let persistor = persistStore(store);
