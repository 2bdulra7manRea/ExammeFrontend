import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthCheckingUser } from 'src/app/core/api.service/actions/api.actions';
import { BaseApi } from 'src/app/core/networks/baseApi.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private apiService:BaseApi,private store :Store<boolean> ,private router:Router) { }
  error:boolean=false;
  message:string='';
  userId:string='';
  FileUpload;
  ngOnInit(): void {
    this.error=false;
    this.userId='';
  }
  UploadImg(event){
  this.FileUpload=event.target.files[0];
  }

  userRegister(myform){
  let validation=this.chekingForValidation(myform.value)
  if(validation===true){
    this.sendData(myform)
  }else{
    alert('please fill out the form')
  }

  }

sendData(myform){
  let formdata=new FormData();
  formdata.append('img',this.FileUpload);
  formdata.append('name',myform.value.name);
  formdata.append('password',myform.value.password);
  formdata.append('email',myform.value.email)
      this.apiService.userRegister(formdata).subscribe((val) => {
        this.userId = val['message']._id;
        const NameUser=val['message'].name;
        const token=val['message'].token;
        localStorage.setItem('userid', this.userId);
        localStorage.setItem('userName',NameUser);
        localStorage.setItem('token',token);
        this.store.dispatch(new AuthCheckingUser({userLogged:true}))
        this.error = false;
        this.router.navigate(['/']);
      }, (err) => {
        this.error = true;
        this.message = err.error.errorMessage;
      })
}

chekingForValidation(obj:Object){
let  x= Object.values(obj)
let flag= x.some((val)=>{ 
return val===''
})
if(this.FileUpload!==undefined &&flag===false){
return true  
}else{
  return false
}

}
}
