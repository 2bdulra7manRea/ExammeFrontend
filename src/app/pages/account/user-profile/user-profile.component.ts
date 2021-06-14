import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseApi } from 'src/app/core/networks/baseApi.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
MYID:string;
userInfo;
module:boolean=false;
followInfo;
moduleAction:string=''
exams;
followers:number=0;
following:number=0;
loadingTwo:boolean=true;
flagFollowing:boolean=false;
loading:boolean=true;
otherIdPerson:string;
examsFound:boolean=false;
otherPerson:boolean=false;
  constructor(private httpService:BaseApi , private activeRout:ActivatedRoute) { }

async  ngOnInit(){
this.Checking()

}



async Checking(){
  const myId = localStorage.getItem('userid');
  this.MYID = myId;
  await this.activeRout.params.subscribe(
    (params) => {
      this.module=false;
      this.moduleAction=''
      this.otherIdPerson = params.id;
      if (this.MYID === this.otherIdPerson) {
        this.otherPerson=false;
        this.httpService.getUserById(this.MYID).subscribe((val) => {
          this.userInfo = val;
          console.log(val)
          this.followers=val['followers'].length
          this.following=val['following'].length
          this.loading = false;
          this.httpService.getUserExams(this.MYID).subscribe((v) => {
            if (v['exmas'].length !== 0) {
              this.exams = v['exmas'];
              console.log(this.exams)
              this.examsFound = true;
            } else {
              this.examsFound = false;
            }
          })
        }, (err) => {
          console.log(err);
        })
      } else {
        this.otherPerson=true;
        this.loading=true;
        this.httpService.getUserById(this.otherIdPerson).subscribe((val) => {
          this.userInfo = val;
          this.followers=val['followers'].length;
          this.flagFollowing=this.HeFollowsMeOrNot(val)
          this.loadingTwo=false;
          console.log(val)
        })
      }
    }
  )
}


UserIsFollowing(){
const MYid=localStorage.getItem('userid');
let myFlag=this.userInfo.followers.some(element => { 
return element===MYid
});  
return myFlag
}


IWantFollow(btn:HTMLButtonElement){
if(this.UserIsFollowing()===false){
const body={
  follower:this.MYID,
  followed:this.otherIdPerson,
  followerName:localStorage.getItem('userName')
}
this.httpService.Follow(body).subscribe((val)=>{
console.log(val);
this.ngOnInit()
},(err)=>{
  console.log(err);
})  
}else{
this.IDontWantFollow()  
}




}



IDontWantFollow(){
  const body={
    follower:this.MYID,
    followed:this.otherIdPerson
  }
  this.httpService.UnFollow(body).subscribe((val)=>{
console.log(val)
this.ngOnInit()
  },(err)=>{
    console.log(err)
  })
}


HeFollowsMeOrNot(obj){
return obj.following.some((val)=>{
  return val===this.MYID
})

}


GetFollowers(){
this.httpService.getFollowers(this.userInfo._id).subscribe((val)=>{
  console.log(val)
  this.followInfo=val;
  this.moduleAction='Followers'
  this.module=true;
})

}
GetFollowing(){
  this.httpService.getFollowing(this.userInfo._id).subscribe((val)=>{
    this.followInfo=val;
    this.moduleAction='Following'
    this.module=true;
  })
}


closeModule(){
  this.module=false;
  this.moduleAction=''
  this.followInfo=''
}
}
