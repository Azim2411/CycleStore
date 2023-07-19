import {configureStore,getDefaultMiddleware} from '@reduxjs/toolkit'
import userReducer from './UserReducer'
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
const persistConfig= {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2

  };

const persistedReducer=persistReducer(persistConfig,userReducer)
const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
  })
const store=configureStore({
    reducer:persistedReducer,
    middleware:customizedMiddleware
})
const persistor = persistStore(store);

export default store;