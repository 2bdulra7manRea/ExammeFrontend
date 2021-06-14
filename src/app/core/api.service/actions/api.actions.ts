
export interface CustamAction{

    type:string,
    payload:InfoType
    }
    
export enum actionApiTypes{

Auth='checking_for_user',
}


export interface InfoType{
userLogged:boolean
}

export class AuthCheckingUser implements CustamAction {
readonly type=actionApiTypes.Auth;
constructor(public payload:InfoType){
this.payload=payload 
}

}

