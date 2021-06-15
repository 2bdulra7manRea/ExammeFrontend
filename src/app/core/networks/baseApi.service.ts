import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";




@Injectable()
export class BaseApi{

url:string='https://examme.herokuapp.com/';
protected idUser:string=localStorage.getItem('userid');


constructor(private api:HttpClient){}
 
protected Authrization():HttpHeaders{
let token;
if(localStorage.getItem('token')){
  token=localStorage.getItem('token');
  return new HttpHeaders().set('token',token); 
}else{
 return new HttpHeaders().set('token','');
}
}


userRegister(body){
return this.api.post(this.url+'account/register',body)
}


userLogin(body){
return this.api.post(this.url+'account/login',body)
}

getUserById(id:string){
return this.api.get(this.url+'account/user/'+id,{headers:this.Authrization()})
}

getUserExams(id:string){
return this.api.get(this.url+'account/myexams/user/'+id)
}
getExams(){
return this.api.get(this.url+'server/exams')
}
CreateExams(body){
return this.api.post(this.url+'server/exam',body,{headers:this.Authrization()})
}

getExamById(id:string){
return this.api.get(this.url+'server/exam/'+id)
}


SendCreateQuestion(body,id){
return this.api.patch(this.url+'server/exam/questions/'+id,body,{headers:this.Authrization()})
}

gettingusers(){

return this.api.get(this.url+'account/users')

}

CreateAroom(body){
  return this.api.post(this.url+'socket/room',body,{headers:this.Authrization()})
}

getRoomById(id){
return this.api.get(this.url+'socket/room/'+id,{headers:this.Authrization()})

}

getRooms(){
return this.api.get(this.url+'socket/room')

}

DeleteExam(id:string){
  return this.api.delete(this.url+'server/exam/'+id,{headers:this.Authrization()})
}

sendPictuers(body){
  console.log(body)
return this.api.post(this.url+'account/upload',body)
}

Follow(body){


return this.api.post(this.url+'account/user/follow',body,{headers:this.Authrization()})

}

UnFollow(body){


  return this.api.post(this.url+'account/user/unfollow',body,{headers:this.Authrization()})
  
  }

getNotifications(id:string){

return this.api.get(this.url+'account/user/noifications/'+id,{headers:this.Authrization()})

}


createBlog(body){
return this.api.post(this.url+'blog/create',body,{headers:this.Authrization()})
}

getBlogs(){
const id=localStorage.getItem('userid');
return this.api.get(this.url+'blog/all/'+id,{headers:this.Authrization()})
}


getBlogContent(id){
  return this.api.get(this.url+'blog/content/'+id,{headers:this.Authrization()})
}


deleteTheRoom(idRoom,userName){

return this.api.delete(this.url+'socket/room/'+idRoom+'/'+userName,{headers:this.Authrization()})

}


getFollowing(id){
  return this.api.get(this.url+'account/user/following/'+id,{headers:this.Authrization()})
}
getFollowers(id){
return this.api.get(this.url+'account/user/followers/'+id,{headers:this.Authrization()})

}



}