import { createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { type } from "os";
import { TProduct } from "./types";
import request from "./util/request";

export type TGenericState<T> = {
    data: T,
    loading?: boolean,
    erro?: string,
    [others: string]: any
}


export const fetchProduct = createAsyncThunk(
    'product/all',
    async () => {
      return await request.get<TProduct[]>('product');
    }
  )
  

type TNullable = null | undefined;
const productSlice = createSlice({
    name: 'product',
    initialState: {
        loading: false,
        erro: null as TNullable | string,
        data: [] as TProduct[]
    },
    reducers: {
        addList(state, action: PayloadAction<TProduct[]>){
            state.data = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchProduct.pending, (state) => {
            state.data = [];
            state.loading = true;
            state.erro = null;
        });
        
        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false,
            state.erro = null;
        });
        
        builder.addCase(fetchProduct.rejected, (state, action) => {
            state.data = [];
            state.loading = false;
            state.erro = action.error.message;
        });
    }
});



export default productSlice;