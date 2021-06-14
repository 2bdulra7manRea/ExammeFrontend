import { Action } from "@ngrx/store";
import { CustamAction, InfoType } from '../actions/api.actions';

import { actionApiTypes } from '../actions/api.actions';






let initState={

Info:false
}


export interface StateType{
Info:boolean
}


export function ApiReducer(state:StateType=initState, action:CustamAction) {
    
switch (action.type) {
    case actionApiTypes.Auth:
        return state={Info:action.payload.userLogged}
    default:
        return state
}

}