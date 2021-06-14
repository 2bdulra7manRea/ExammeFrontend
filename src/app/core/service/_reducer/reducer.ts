import { Action } from "@ngrx/store";
import { actionType } from "../_actions/userAction";



export interface storeInterface{

USER:StateInterface
}

export interface StateInterface{


users:string[],


}


let initState={

users:[],
}


interface pay{
name:string,
price:number,
img:string
}


interface actionfType{

type:string,
payload:string

}



export function UserReducer(state=initState, action:actionfType){


switch (action.type) {
    case actionType.AddUser:
        return state={users:[...state.users ,action.payload]}
    case actionType.RemoveUser:
        return state={users:[...state.users, action.payload]}
    default:
        return state
}


}