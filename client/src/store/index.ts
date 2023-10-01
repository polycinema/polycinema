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
      
      const persistConfig = {
        key: "root",
        storage,
        whitelist: ["carts"],
      };
      const rootReducer = combineReducers({
       
      });
      
      const persistedReducer = persistReducer(persistConfig, rootReducer);
      
      export const store = configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
            serializableCheck: {
              ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
          })
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
      