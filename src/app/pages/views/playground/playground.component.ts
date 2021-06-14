import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import * as recorderRTC from "recordrtc";
@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {
  snox:string=''
  record:any;
  url:any;
  recording:boolean=false;
  StreamVoice:MediaStream;
  @ViewChild('audio') audioView:ElementRef<HTMLAudioElement>
  @ViewChild('m') downloadBtn:ElementRef<HTMLLinkElement>
  constructor(private domSanitizer :DomSanitizer) { }

  ngOnInit(): void {
  }

async  recodingDone(record,stream) {
await record.record();
this.recording=true;
this.audioView.nativeElement.srcObject=stream;
this.audioView.nativeElement.muted=true

this.audioView.nativeElement.onloadeddata=()=>{
this.audioView.nativeElement.play();

}

}

 initRecord(){

// constraints  
let mediaConstraints={
video:false,
audio:true
}

 navigator.mediaDevices.getUserMedia(mediaConstraints).then((streem)=>{
this.StreamVoice=streem;
// options  
let options={
  mimeType:'audio/wav',
  numberOfAudioChannels:1,
}

// streem has data with from audio / camara


let stereoAudioRecorder=recorderRTC.StereoAudioRecorder;
this.record=new stereoAudioRecorder(streem,options);
this.recodingDone(this.record,streem)

}).catch((err)=>{
console.log(err);
})
}


async stopRecord(){
  this.recording=false;
await this.record.stop(this.processing.bind(this))
}






stopStreaming(){
this.StreamVoice.getTracks().forEach((element)=>{
element.stop();
})
}



processing(blob){
this.url=URL.createObjectURL(blob)
this.downloadBtn.nativeElement.href=this.url

this.stopStreaming();
this.audioView.nativeElement.srcObject=null;
}





}

