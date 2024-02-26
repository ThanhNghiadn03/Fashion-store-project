import { configureStore } from "@reduxjs/toolkit";
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



const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, orebiReducer);
const statePersistedReducer = persistReducer(persistConfig, accountReducer);

export const store = configureStore({
  reducer: { 
    account: statePersistedReducer,
    orebiReducer: persistedReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export let persistor = persistStore(store);
