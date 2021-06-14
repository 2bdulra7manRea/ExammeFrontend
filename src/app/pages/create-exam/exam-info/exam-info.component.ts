import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseApi } from 'src/app/core/networks/baseApi.service';

@Component({
  selector: 'app-exam-info',
  templateUrl: './exam-info.component.html',
  styleUrls: ['./exam-info.component.scss']
})
export class ExamInfoComponent implements OnInit {
exam:any;
loading:boolean=false;
IdExam:string;
  constructor(protected router:Router,private activeRout:ActivatedRoute,private httpService:BaseApi) { }

  ngOnInit(): void {
   this.getIdOfExam(); 
  }


  deleteExam(){
this.httpService.DeleteExam(this.IdExam).subscribe((val)=>{
this.router.navigate(['/'])
},(err)=>{
console.log(err);
alert('something Wrong ...')
})    
  }



getIdOfExam(){
this.activeRout.params.subscribe((value)=>{
if(value.id!==''){
this.IdExam=value.id;
this.httpService.getExamById(value.id).subscribe((info)=>{
  console.log(info)
this.exam=info['exam'];
this.loading=true;
})


}



  
})

}





}
