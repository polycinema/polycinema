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
      
      const persistConfig = {
        key: "root",
        storage,
        whitelist: ["carts"],
      };
      const rootReducer = combineReducers({
       [authApi.reducerPath]: authReducer
      });
      const middleware = [
        authApi.middleware
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
      