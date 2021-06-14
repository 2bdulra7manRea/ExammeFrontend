import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BaseApi } from 'src/app/core/networks/baseApi.service';

@Component({
  selector: 'app-exam-dashboard',
  templateUrl: './exam-dashboard.component.html',
  styleUrls: ['./exam-dashboard.component.scss']
})
export class ExamDashboardComponent implements OnInit {

  exams: any;
  current: number = 0;
@ViewChild("nav") Nav:ElementRef<HTMLDivElement>
@ViewChild("btn1") btn:ElementRef<HTMLButtonElement>
  constructor(private httpService: BaseApi) { }
  async ngOnInit() {
    const userid = await localStorage.getItem('userid');
    this.httpService.getUserExams(userid).subscribe((v) => {
      if (v['exmas'].length !== 0) {
        this.exams = v['exmas'];
        console.log(v)
      }

    })

  }

  toggleNav(){
    if(this.btn.nativeElement.textContent==='open'){
    this.Nav.nativeElement.style.width='20%'
    this.btn.nativeElement.textContent='close'
    }else{
      this.Nav.nativeElement.style.width='0px'
    this.btn.nativeElement.textContent='open'
    }
    

  }

  display(index) {
    this.current = index;
  }

}
