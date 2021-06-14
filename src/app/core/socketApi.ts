
import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { Observable } from "rxjs";


@Injectable()

export class SocketService{


name;


constructor(private SOCK:Socket) {}
connectTHEservers(userName:string){
this.name=userName;    
this.SOCK.connect();
console.log('socket connect::::::::::::::::::::::::::')
this.SOCK.emit('person',userName);
}


testing(id){
    console.log('socket join room :::::::::::::::::::;')
this.SOCK.emit('joinRoom',id);
}


peopleInRoom(){

let observe=new Observable((subscriber)=>{
this.SOCK.on('poepleInRoom',(Proom)=>{
subscriber.next(Proom)
})
})
return observe
}


userLeaveTheRoom(roomId){

this.SOCK.emit('userLeaveTheRoom',{name:this.name, id:roomId})

}

userOpendHisaAccount(){
this.SOCK.emit('userOpen',this.name)
}

userCloseAccount(){
    this.SOCK.emit('userClose',this.name);
}

sendingMessages(messages){
this.SOCK.emit('messages',messages);
}


disconnectSocket(){

    this.SOCK.disconnect();
}

GettingMessages(){
let observer=new Observable((data)=>{
this.SOCK.on('get-msg',(message)=>{
data.next(message)
})
})
return observer;
}





sendID(id){
this.SOCK.emit('theFirstVist',id)
}


GetPeopleFromOutSideTheRoom(){
let Ob=new Observable((sub)=>{
this.SOCK.on('OutsideView',(data)=>{
sub.next(data)
})
})
return Ob
}

UpdatePage(){
let Observer=new Observable((sub)=>{
this.SOCK.on('update',(info)=>{
    sub.next(info);
})
})
return Observer
}



deleteRoom(obj){
this.SOCK.emit('deleteRoom',obj)
}

createRoom(obj){
this.SOCK.emit('createRoom',obj)
}



getAllusersBySocket(){


let observer=new Observable((sub)=>{
this.SOCK.on("allusers",(allUsers)=>{
sub.next(allUsers)
})    
})    
return observer
}


}