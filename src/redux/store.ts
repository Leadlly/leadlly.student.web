import { combineReducers, configureStore } from "@reduxjs/toolkit";
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

import userReducer from "@/redux/slices/userSlice";
import weeklyReportReducer from "@/redux/slices/weeklyReportSlice";
import monthlyReportReducer from "@/redux/slices/monthlyReportSlice";
import overallReportReducer from "@/redux/slices/overallReportSlice";
import weeklyQuizReducer from "@/redux/slices/weeklyQuizSlice";

const persistConfig = {
  key: "leadlly_web_persist",
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  weeklyReport: weeklyReportReducer,
  monthlyReport: monthlyReportReducer,
  overallReport: overallReportReducer,
  weeklyQuizzes: weeklyQuizReducer,
});

const makeConfiguredStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

export const makeStore = () => {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return makeConfiguredStore();
  } else {
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    let store: any = configureStore({
      reducer: persistedReducer,
    });
    store.__persistor = persistStore(store);
    return store;
  }
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
