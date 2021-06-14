import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseApi } from 'src/app/core/networks/baseApi.service';

@Component({
  selector: 'app-take-exam',
  templateUrl: './take-exam.component.html',
  styleUrls: ['./take-exam.component.scss']
})
export class TakeExamComponent implements OnInit ,DoCheck  {

  constructor(private apiService:BaseApi,private activeRout:ActivatedRoute) {}
    
Exam;
myscore:number=0;
type:string;
questionFound:boolean=false;
loading:boolean=true;
access:boolean=false;
progress:number=0;
key:string='';
keyValue;
message:string;
  ngOnInit(): void {
    this.getExam();
  }
ngDoCheck(){
this.checkingAccessKey();

}

getExam(){
this.activeRout.params.subscribe((params)=>{
const id=params.id;
this.apiService.getExamById(id).subscribe(
(res)=>{
this.Exam=res;
if(res['exam']['access']==='key'){
this.access=false;
this.keyValue=res['exam'].key;
}else{
this.access=true;
this.initExam(this.Exam);
}
this.loading=false;
},(err)=>{
  console.log("problem::::::::::::::::")
  this.message='there is problem here !'
  this.loading=true;
})
})
}

checkingAccessKey(){ 
if(this.access===false){
if(this.key===this.keyValue){
this.access=true;
this.initExam(this.Exam);
}else{
  this.access=false;
}}


}



initExam(res){
  console.log(res);
  if(res['questions']!==null){
    this.myscore=0;
    this.progress=0;
    this.type=res['exam']['type'];
    this.message='';
    this.questionFound=true;
    console.log(this.Exam)
    }else{
    this.questionFound=false;
    this.message='There is not questions here !'
    }
}

submitAnswer(answer,question,myform,x:HTMLDivElement){

if(myform.value['answer']!==""){
  this.progress++;
  if(answer===myform.value['answer']){
    x.textContent='Perfect'
    x.style.color='rgb(132, 255, 183)';
    this.myscore++;
  }else{
    x.textContent='Wrong ! the Right answer => ' + answer;
    x.style.color='red';
    x.style.backgroundColor='white';
  }  
}


}



SubmitMsq(msq,answerRight,h:HTMLDivElement){ 
  if(msq.value.MSQ!==''){
  this.progress++;  
  if(msq.value.MSQ===answerRight){
    console.log('perfect')
  h.textContent='Perfect';
  h.style.backgroundColor='yellow';
  this.myscore++;
  }else{
    console.log('wrong')
    h.style.color='red';
    h.style.backgroundColor='white';
    h.textContent='Ohh.. it`s wrong please try again ! , the right answer is '+answerRight;
  }  
  }    
  }
  
  tryAgain(){
    this.ngOnInit();
  }


}