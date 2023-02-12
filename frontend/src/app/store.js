import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import { combineReducers } from '@reduxjs/toolkit'
import userReducer from '../features/users/userSlice'
import postReducer from '../features/posts/postSlice'

const reducers = combineReducers({
  user:userReducer,
  post:postReducer,
  devTools: process.env.NODE_ENV !== 'production',
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
})

export const persistor = persistStore(store)


