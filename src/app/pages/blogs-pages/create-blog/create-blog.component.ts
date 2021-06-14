import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseApi } from 'src/app/core/networks/baseApi.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss']
})
export class CreateBlogComponent implements OnInit {
blog:string='';
title:string='';
userid:string=localStorage.getItem('userid');
  constructor(private httpService:BaseApi,private router:Router) { }

  ngOnInit(): void {
  }


  CreateBlog(){
  let Info={
    title:this.title,
    content:this.blog,
    userId:this.userid,
  }
this.httpService.createBlog(Info).subscribe((val)=>{
  console.log(val);
  this.router.navigate(['/list/blogs'])
},(err)=>{
  console.log(err)
})
}

}
