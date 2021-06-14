import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseApi } from 'src/app/core/networks/baseApi.service';

@Component({
  selector: 'app-exam-home',
  templateUrl: './exam-home.component.html',
  styleUrls: ['./exam-home.component.scss']
})
export class ExamHomeComponent implements OnInit {
access:boolean=false;
  constructor(private rout:Router , private httpService:BaseApi) { }

  ngOnInit(): void {
  }

  accessValue(event){
console.log(event)
if(event==='key'){

  this.access=true
}else{
  this.access=false;
}


  }

save(formsvalue){  
let id=localStorage.getItem('userid');
let form=formsvalue.value;
const body={
title:form.title,
type:form.type,
access:form.access,
key:form.access==='key'&&form.key,
Nquestions:form.Nquestions,
duration:form.duration,
id:id,
}

this.httpService.CreateExams(body).subscribe((vl)=>{
console.log(vl)
this.rout.navigateByUrl('/')
})
}


}
