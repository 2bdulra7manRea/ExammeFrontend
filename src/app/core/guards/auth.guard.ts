import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, Subscriber } from "rxjs";



@Injectable()

export class AuthUser implements CanActivate{

constructor(private router:Router) {    
}


canActivate(rout:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<boolean>{
    let Observer = new Observable((subscribe:Subscriber<boolean>) => {
        const userToken = localStorage.getItem('token');
        if (userToken !== '') {
            subscribe.next(true);
        } else {
            subscribe.next(false)
            this.router.navigate(['/login'])
        }
    })
return Observer
}


}