import {TypedUseSelectorHook, useDispatch, useSelector, useStore } from "react-redux";
import type { AppDispatch, RootState, AppStore } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch; 
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;