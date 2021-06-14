import { Observable, of, Subject } from "rxjs";


export class ComponentsService{


message:any[]=[];

youGetMessage(val){

this.message.push(val);
}


IgetMessage(){

return this.message

}


}