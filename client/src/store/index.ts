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
import showtimeMovieApi, { showtimeMovieReducer } from "../redux/api/showtimeMovieApi";
import paymentApi,{paymentReducer} from "../redux/api/paymentApi";
import statisticApi, { statisticReducer } from "../redux/api/statisticApi";
import couponApi, { couponReducer } from "../redux/api/couponApi";
import directorApi, { directorReducer } from "../redux/api/directorApi";
import genresApi, { genresReducer } from "../redux/api/genresApi";
import seatApi, { seatReducer } from "../redux/api/seatApi";
import roomApi, { roomReducer } from "../redux/api/roomApi";
import acountApi, { acountReducer } from "../redux/api/acountApi";
import productApi, { productReducer } from "../redux/api/productApi";
import actorApi, { actorReducer } from "../redux/api/actorsApi";
import { accountReducer } from "../redux/slices/accountSlice";

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
  [showtimeMovieApi.reducerPath]: showtimeMovieReducer,
  [paymentApi.reducerPath]:paymentReducer,
  [statisticApi.reducerPath]:statisticReducer,
  [couponApi.reducerPath]:couponReducer,
  [directorApi.reducerPath]:directorReducer,
  [genresApi.reducerPath]:genresReducer,
  [seatApi.reducerPath]:seatReducer,
  [roomApi.reducerPath]:roomReducer,
  [acountApi.reducerPath]:acountReducer,
  [productApi.reducerPath]:productReducer,
  [actorApi.reducerPath]:actorReducer,
  ValueCheckout: valueCheckoutReducer,
  Authorization: authorizationReducer,
  Account: accountReducer
});
const middleware = [
  showtimeApi.middleware,
  authApi.middleware,
  movieApi.middleware,
  checkoutApi.middleware,
  showtimeMovieApi.middleware,
  paymentApi.middleware,
  statisticApi.middleware,
  couponApi.middleware,
  directorApi.middleware,
  genresApi.middleware,
  seatApi.middleware,
  roomApi.middleware,
  acountApi.middleware,
  productApi.middleware,
  actorApi.middleware
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
