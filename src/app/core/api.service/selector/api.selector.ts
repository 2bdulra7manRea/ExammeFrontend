import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StateType } from "../reducer/api.reducer";





const ItemFb=createFeatureSelector<StateType>('Item');


/*
export const SelectorApi=createSelector(ItemFb,(v)=>{
    return v.item
})
*/