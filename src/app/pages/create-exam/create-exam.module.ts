import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamFormComponent } from './exam-form/exam-form.component';
import { ExamHomeComponent } from './exam-home/exam-home.component';
import { ExamStartComponent } from './exam-start/exam-start.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ExamDashboardComponent } from './exam-dashboard/exam-dashboard.component';
import {HttpClientModule}from '@angular/common/http'
import { BaseApi } from 'src/app/core/networks/baseApi.service';
import { ExamStudyComponent } from './exam-study/exam-study.component';
import { ExamInfoComponent } from './exam-info/exam-info.component';

const childs:Routes=[

{path:'' ,component:ExamDashboardComponent,children:[

{path:'form/:id', component:ExamFormComponent},
{path:'start/:id',component:ExamStartComponent},
{path:'info/:id',component:ExamInfoComponent},
{path:'study/:id',component:ExamStudyComponent},
{path:'create',component:ExamHomeComponent},

]},
]


@NgModule({
  declarations: [ExamFormComponent, ExamHomeComponent, ExamStartComponent, ExamDashboardComponent, ExamStudyComponent, ExamInfoComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(childs),
    HttpClientModule,    
  ],
  providers:[BaseApi],
  bootstrap:[ExamDashboardComponent]
})
export class CreateExamModule { }
