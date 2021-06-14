import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseApi } from 'src/app/core/networks/baseApi.service';

@Component({
  selector: 'app-exam-start',
  templateUrl: './exam-start.component.html',
  styleUrls: ['./exam-start.component.scss']
})
export class ExamStartComponent implements OnInit {
myscore:number=0;
Exam:any; 
type:any;
progress:number=0;
loading:boolean=true;
message:string='Loading........';
  constructor(private httpService:BaseApi,private activeRout:ActivatedRoute) { }

  ngOnInit(): void {
    this.getExam();
  }


  getExam(){
this.activeRout.params.subscribe((parma)=>{
this.httpService.getExamById(parma.id).subscribe((res)=>{
if(res['questions']!==null){
this.myscore=0;
this.progress=0;
this.Exam=res;
this.type=res['exam']['type'];
this.loading=false;
this.message='';
console.log(this.Exam)
}else{
this.message='You must implement the questions first !'
this.loading=true;
}


},(err)=>{
console.log(err);
alert('Error')
})


})
  }

  submitAnswer(answer,question,myform,x:HTMLDivElement){

    console.log(answer)
    console.log(question)
    console.log(myform.value)
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


  SubmitMsq(msq,answerRight,h:HTMLDivElement){
    this.progress++;
if(msq.value.MSQ!==''){
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
