import {configureStore} from '@reduxjs/toolkit'
import userLoginReducer from './Slices/userLoginSlice'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage,
  }

const rootReducer = combineReducers({
    allUserLoginReducer: userLoginReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    //providing the store with the root reducers
    reducer: persistedReducer,
})

