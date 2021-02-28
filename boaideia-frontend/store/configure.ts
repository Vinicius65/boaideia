import { combineReducers, configureStore } from '@reduxjs/toolkit'
import productSlice from './product';


export const AppReducer = combineReducers({
    product: productSlice.reducer
});

export const AppStore = configureStore({reducer: AppReducer});