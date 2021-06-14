import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { BaseApi } from 'src/app/core/networks/baseApi.service';
@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.scss']
})
export class ExamFormComponent implements OnInit {


numberOfQuestions:number[];
duration:number=0;
flagForQuestionsExisting:boolean=false;
showPage:boolean=true;
type:string='';
num:number=0;
paramId:string;
questionsAnswer=[];
constructor(private httpService:BaseApi ,private Router:Router, private rout:ActivatedRoute) { }

ngOnInit():void {
this.getExamInfo();
console.log('ng init')
}


getExamInfo(){
this.rout.params.subscribe((val)=>{
this.questionsAnswer.length=0;  
this.httpService.getExamById(val.id).subscribe((resultApi)=>{  
let result=resultApi['exam']; 
this.checkingForQeustion(result);
this.num=result['Nquestions'];
this.paramId=val.id;
this.duration=result['duration'];
this.type=result['type'];
this.numberOfQuestions=this.GetArr(this.num)
},(err)=>{
this.Router.navigate(['/'])
})
})
}


GetArr(num:number):number[]{
let x :number[]=[];
for (let index = 0; index <num; index++) {
  x[index]=index;  
}
return x;
}



getQuestions(b,x:HTMLDivElement){

if(b.value.question==="" || b.value.answer===""||b.value.answerRight===""||b.value.answerWrong1===""){
  alert('pleas fill the input')
}else{
this.questionsAnswer.push(b.value)  
this.changeStyleDiv(b,x);
console.log(this.questionsAnswer)
}


}



changeStyleDiv(val,m:HTMLDivElement){
  m.textContent="Done !";
  let h5=document.createElement('h5')
  let para = document.createElement('p');
  if(this.type==='Complete'){
    para.textContent=val.value.answer;
    h5.textContent=val.value.question;
    }else{      
      h5.textContent=val.value.question;
      para.textContent=val.value.answerRight;
    }
      m.appendChild(h5);
      m.appendChild(para);
      m.style.backgroundColor='crimson';
      m.style.color='white';
      m.style.textAlign='center';
}



Senddate(){
if(this.num===this.questionsAnswer.length){
this.httpService.SendCreateQuestion(this.questionsAnswer,this.paramId).subscribe((res)=>{

console.log(res);
this.Router.navigate(['/']) 
},(err)=>{
alert('you created the questions of that Exam from')
})

}else{
  alert('please check out if eny empty input !')
}

}


checkingForQeustion(ob){
if(ob['questions_id']!==null){
this.flagForQuestionsExisting=true;
}else{
this.flagForQuestionsExisting=false;
}
}



}
