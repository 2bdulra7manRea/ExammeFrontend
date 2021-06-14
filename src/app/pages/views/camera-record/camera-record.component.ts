import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaStreamRecorder } from 'recordrtc';
import { of } from 'rxjs';
import { ComponentsService } from 'src/app/core/component.service';
import { BaseApi } from 'src/app/core/networks/baseApi.service';
import { SocketService } from 'src/app/core/socketApi';
import * as recorderRTC from "recordrtc";
import * as RecordRTC from 'recordrtc';
@Component({
  selector: 'app-camera-record',
  templateUrl: './camera-record.component.html',
  styleUrls: ['./camera-record.component.scss']
})
export class CameraRecordComponent implements OnInit ,OnDestroy {

Stream:MediaStream;
@ViewChild("screan") videoElement:ElementRef<HTMLVideoElement>;
@ViewChild('chat') inputElement:ElementRef<HTMLDivElement>
@ViewChild('boxChat') boxChat:ElementRef<HTMLDivElement>
@ViewChild('downloadLink') downloadLink:ElementRef<HTMLLinkElement> 
userName:string
roomDetails;
record;
people:any[]=[];
recording:boolean=false;
url;
ParamsId;
ISinvited:boolean=false;
isUser:boolean=false;
  constructor(private socket:SocketService,private router:Router,private httpService:BaseApi,private activateRouter:ActivatedRoute,public Cservice:ComponentsService) { }
  ngOnInit(): void {
  this.activateRouter.params.subscribe((params) => {
   this.httpService.getRoomById(params.id).subscribe((result)=>{
   const flag= this.checkForInvitation(result) 
   if(flag===true){
     this.roomDetails=result;
      this.ParamsId=params.id;
      this.socket.testing(params.id)
   }else{
     this.router.navigate(['/'])
   }
    })
  })


this.connectToSocket()
  this.socket.GettingMessages().subscribe((val) => {
      this.createDocment(val)
    })  

}

connectToSocket(){
this.userName=localStorage.getItem('userName');
   this.socket.connectTHEservers(this.userName);  
}

ngAfterViewInit(): void {
this.socket.peopleInRoom().subscribe((messageSocket)=>{
this.people.push(messageSocket)
})
}

checkForInvitation(result){
const myId=localStorage.getItem('userid');
const myName=localStorage.getItem('userName');
console.log(myId)
let flag=result.invitation.some(element => {
   return myId===element
  });
if(flag===false&&myName!==result.userName){

return false

}else{
  return true
}

}


Close(){
this.boxChat.nativeElement.style.width='0px';
}
Openchat(){
this.boxChat.nativeElement.style.width='400px';
}
sendMessage(event,v){
if(event.key==="Enter"){
this.socket.sendingMessages(v.value)
v.value='';
}

}





createDocment(val){
let para=document.createElement('p');
let div=document.createElement('div');
if(this.userName===val.person){
para.className='ME';
para.textContent="You:  "+val.message;
}else{
para.setAttribute('class','message-box')  
para.textContent=val.person+":  "+val.message;  
}
div.setAttribute('class','messageDiv')
div.appendChild(para);
this.inputElement.nativeElement.appendChild(div);
}





RecordVideo(){
let stero=RecordRTC.MediaStreamRecorder;
this.record=new stero(this.Stream,{MimeType:'video/mp4'});
this.record.record()
this.recording=true

this.record.ondataavailable=()=>{
  console.log('done......................')
}
}

async stopRecordVideo(){
await this.record.stop(this.processing.bind(this))

}


processing(blob){
this.url=URL.createObjectURL(blob);
console.log(this.url);
console.log(blob)
this.downloadLink.nativeElement.href=this.url
this.recording=false;
}

GoWebcam(){
navigator.mediaDevices.getUserMedia({audio:true, video:true}).then((CameraScrean)=>{
this.Stream=CameraScrean;
this.videoElement.nativeElement.muted=true;
this.videoElement.nativeElement.srcObject=CameraScrean;
this.videoElement.nativeElement.onloadedmetadata=()=>{
this.videoElement.nativeElement.play();
}

})
}


StopWebcam(){
const tracks=this.Stream.getTracks();
tracks.forEach(element => {
element.stop();
});
this.videoElement.nativeElement.srcObject=null;
}




ngOnDestroy(): void {
this.socket.userLeaveTheRoom(this.ParamsId)
  
}



}
