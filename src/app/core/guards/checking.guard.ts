import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, Subscriber } from "rxjs";

@Injectable()
export class CheckForUser implements CanActivate {


constructor(protected router:Router){}

canActivate(rout:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<boolean>{

let observeChack=new Observable((sub:Subscriber<boolean>)=>{
let token=localStorage.getItem('token');
if(token){
    sub.next(false)
    this.router.navigate(['/'])
}else{
    sub.next(true)
}
})




return observeChack

}






}