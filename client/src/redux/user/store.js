import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
});

// Persist config
const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Create persistor
export const persistor = persistStore(store);
