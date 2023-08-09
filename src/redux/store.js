import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import cartReducer from "./cartSlide";
import authReducer from "./authSlide";
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

// Cấu hình Redux persist cho reducer cart
const cartPersistConfig = {
  key: "cart",
  storage: storage,
  blacklist: ["loading"],
};

const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

// Cấu hình Redux persist cho reducer auth
const authPersistConfig = {
  key: "auth",
  storage: storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);


// cho vô store

const store = configureStore({
  reducer: {
    cart: persistedCartReducer, 
    auth: persistedAuthReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
