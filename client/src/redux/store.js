import {configureStore,combineReducers} from '@reduxjs/toolkit'
import navBarRedux from './NavBarRedux'
import userReducer from "./userRedux";
import otherUserReducer from "./otherUserRedux"

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

import storage from "redux-persist/lib/storage"

const persistConfig = {
    key: "root",
    version: 1,
    storage,
};
  
const rootReducer = combineReducers({user: userReducer, active: navBarRedux, otherUser: otherUserReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),/* 
    devTools: false, */
});

export let persistor = persistStore(store);
