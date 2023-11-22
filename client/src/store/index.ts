import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
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
import authApi, { authReducer } from "../redux/api/authApi";
import showtimeApi, { showtimeReducer } from "../redux/api/showTimeApi";
import movieApi, { movieReducer } from "../redux/api/movieApi";
import { authorizationReducer } from "../redux/slices/authorizationSlice";
import checkoutApi, { checkoutReducer } from "../redux/api/checkoutApi";
import { valueCheckoutReducer } from "../redux/slices/valueCheckoutSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["Authorization", "ValueCheckout"],
};
const rootReducer = combineReducers({
  [authApi.reducerPath]: authReducer,
  [showtimeApi.reducerPath]: showtimeReducer,
  [movieApi.reducerPath]: movieReducer,
  [checkoutApi.reducerPath]: checkoutReducer,
  ValueCheckout: valueCheckoutReducer,
  Authorization: authorizationReducer
});
const middleware = [
  showtimeApi.middleware,
  authApi.middleware,
  movieApi.middleware,
  checkoutApi.middleware,
]
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(...middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default persistStore(store);
