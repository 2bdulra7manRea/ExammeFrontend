import { Component, DoCheck, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { BaseApi } from 'src/app/core/networks/baseApi.service';

@Component({
  selector: 'app-dialog-room',
  templateUrl: './dialog-room.component.html',
  styleUrls: ['./dialog-room.component.scss']
})
export class DialogRoomComponent implements OnInit ,OnChanges ,OnDestroy{


@Input() Display:string;
@ViewChild('formDialog') formDialog:ElementRef<HTMLDivElement>;
@Output() sendFormData=new EventEmitter<any>();
users;
loading:boolean=true;
  constructor(private httpService:BaseApi) { }

ngOnInit(): void {
  this.httpService.gettingusers().subscribe((val)=>{
    console.log(val);
    this.users=val['message']
    this.loading=false;
  })
}



ngOnChanges(){
console.log(this.Display)
}

close(){
this.formDialog.nativeElement.style.display='none';
}


  Create(myform){
     let flag=Object.values(myform.value).some((val)=>{
       return val===''
     })
     if(flag!==true){
      this.sendFormData.emit(myform.value)
    this.formDialog.nativeElement.style.display='none';
     }else{
      alert('fill out the form')
     }
    
  
  }

ngOnDestroy(){}




}




