import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseApi } from 'src/app/core/networks/baseApi.service';

@Component({
  selector: 'app-exam-study',
  templateUrl: './exam-study.component.html',
  styleUrls: ['./exam-study.component.scss']
})
export class ExamStudyComponent implements OnInit {
Questions:any;
loading:boolean=true;
  constructor(private httpService:BaseApi,private router:Router ,private activeRouter:ActivatedRoute) { }
  ngOnInit(): void {
this.activeRouter.params.subscribe((params)=>{
console.log(params.id)
this.getItem(params.id);

})



}

getItem(id){
this.Questions=null;
this.httpService.getExamById(id).subscribe((item)=>{
this.Questions=item['questions']
console.log(this.Questions)
this.loading=false;

},(err)=>{
this.router.navigate(['/'])
})



}





}
