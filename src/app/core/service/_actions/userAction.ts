

export enum actionType{

AddUser='add new user to array',
RemoveUser='remove user from array'


}


export class IncreaseUserAction{

readonly type:string=actionType.AddUser;
   
constructor(public payload:string){
    this.payload=payload
}
}

export class DecreaseUserAction{
 
readonly type:string=actionType.RemoveUser

constructor(public payload:string){
    this.payload=payload
}

}