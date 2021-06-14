import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BaseApi } from 'src/app/core/networks/baseApi.service';

@Component({
  selector: 'app-blog-content',
  templateUrl: './blog-content.component.html',
  styleUrls: ['./blog-content.component.scss']
})
export class BlogContentComponent implements OnInit {

blog;
loading:boolean=true;
  constructor(private httpService:BaseApi ,private activatedRouter:ActivatedRoute) { }


  ngOnInit(): void {
  }

ngAfterViewInit(): void {
this.activatedRouter.params.subscribe((pramas)=>{
this.httpService.getBlogContent(pramas.id).subscribe((val)=>{
this.blog=val;
this.loading=false;
},(err)=>{
  console.log(err)
})

})
  
}



}
