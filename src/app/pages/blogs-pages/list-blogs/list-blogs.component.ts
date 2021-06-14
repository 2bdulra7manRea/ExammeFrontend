import { Component, OnInit } from '@angular/core';
import { BaseApi } from 'src/app/core/networks/baseApi.service';

@Component({
  selector: 'app-list-blogs',
  templateUrl: './list-blogs.component.html',
  styleUrls: ['./list-blogs.component.scss']
})
export class ListBlogsComponent implements OnInit {

  constructor(private httpService:BaseApi) { }
blogs:any
loading:boolean=true;
  ngOnInit(): void {
    this.httpService.getBlogs().subscribe((val)=>{
      this.blogs=val;
      this.loading=false
    })
  }




}
