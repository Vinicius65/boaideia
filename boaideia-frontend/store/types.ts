import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { AppReducer, AppStore } from "./configure"


export type TAppReducer = ReturnType<typeof AppReducer>
export type TDispatch = typeof AppStore.dispatch

export const useTDispatch = () => useDispatch<TDispatch>()


export type TGenericState<T> = {
    loading: boolean,
    erro: string,
    data: T 
}

export const useTSelector: TypedUseSelectorHook<TAppReducer> = useSelector


export type TProduct = {
    id: number,
    name: string
}