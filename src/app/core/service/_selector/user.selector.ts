import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StateInterface } from "../_reducer/reducer";





let reducerFE=createFeatureSelector<StateInterface>('USER');


export let SelectorUser=createSelector(reducerFE,(st)=>st.users)

