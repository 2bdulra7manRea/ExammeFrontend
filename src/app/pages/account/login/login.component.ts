import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthCheckingUser } from 'src/app/core/api.service/actions/api.actions';
import { BaseApi } from 'src/app/core/networks/baseApi.service';
import { SocketService } from 'src/app/core/socketApi';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

error:boolean=false;
message:string='';
userId:string='';
  constructor(private apiService:BaseApi,private store:Store<boolean>,private router:Router,private Socket:SocketService) { }

  ngOnInit(): void {
    this.error=false;
    this.userId='';
  }
loginUser(myform){
let validation=this.chekingForValidation(myform.value);
if(validation===true){
  this.sendData(myform)
}else{
alert('please fill out the form')
}

  }


sendData(myform){

this.apiService.userLogin(myform.value).subscribe((val)=>{
this.userId = val['message']._id;
const NameUser=val['message'].name;
const token=val['message'].token;
localStorage.setItem('userid', this.userId);
localStorage.setItem('userName',NameUser)
this.Socket.connectTHEservers(NameUser);
this.Socket.userOpendHisaAccount();
localStorage.setItem('token',token);
this.store.dispatch(new AuthCheckingUser({userLogged:true}))
this.router.navigate(['/']);
this.error=false;
},(err)=>{
this.error=true;
this.message=err.error.errorMessage;
})
}


  chekingForValidation(obj:Object){
    let  x= Object.values(obj)
    let flag= x.some((val)=>{ 
    return val===''
    })
    if(flag===false){
    return true  
    }else{
      return false
    }
    
    }

}
