import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BaseApi } from 'src/app/core/networks/baseApi.service';
import { SocketService } from 'src/app/core/socketApi';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  auth: boolean = false;
  num: number = 0;
  idUser: string = '';
  Nmessage;
  numberOfNofications: number = 0;
  NameUser: string;
  IdTest: string;
  noifications;
  noificationsLoading: boolean = true;
  userLogged: boolean = false;
  @ViewChild("navbar") menuDiv: ElementRef<HTMLDivElement>;
  @ViewChild("MenuNotifications") MenuNotificationsDiv: ElementRef<HTMLDivElement>
  constructor(private Socket: SocketService,protected store:Store<boolean>, private Router: Router, private httpService: BaseApi) { }

  ngOnInit(): void {
console.log('ng header ::::::::::::::::::::::::::::::')

    if (localStorage.getItem('token') !== '') {
      this.userLogged = true;
      this.auth = true
      this.idUser = localStorage.getItem('userid');
      this.NameUser = localStorage.getItem('userName');
    } else {
      this.userLogged = false;
      this.auth = false
    }
  }


  ngAfterViewInit(): void {
    if (this.userLogged === true) {
      this.httpService.getNotifications(this.idUser).subscribe((notify) => {
        console.log(notify)
        this.noifications = notify
        this.noificationsLoading = false;
      }, (err) => {
        console.log(err)
      })
      this.Socket.connectTHEservers(this.NameUser);
      this.Socket.sendID(this.IdTest);
      this.Socket.userOpendHisaAccount();
      console.log('after view')
    }

  }






  ShowNotify() {
    if (this.MenuNotificationsDiv.nativeElement.style.height === '610px') {
      this.MenuNotificationsDiv.nativeElement.style.height = '0px'
    } else {
      if (localStorage.getItem('userid') !== '') {
        this.httpService.getNotifications(this.idUser).subscribe((notify) => {

          console.log(notify, 'nofitcationssssssss')
          this.noifications = notify
          this.noificationsLoading = false;
        }, (err) => {
          console.log(err)
        })
      }
      this.MenuNotificationsDiv.nativeElement.style.height = '610px'
    }
  }


  logOut() {
    this.Socket.connectTHEservers(this.NameUser);
    this.Socket.disconnectSocket();
    localStorage.setItem('token', '');
    localStorage.setItem('userName', '');
    localStorage.setItem('userid', '');
    this.ngOnInit();
    this.Router.navigate(['/login'])
  }



  menu(m: HTMLDivElement) {
    if (m.style.display === 'none') {
      m.style.display = 'block';
    } else {
      m.style.display = 'none';
    }
  }

















}
