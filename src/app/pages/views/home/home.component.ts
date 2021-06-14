import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store'
import { BaseApi } from 'src/app/core/networks/baseApi.service';
import { SocketService } from 'src/app/core/socketApi';
import { storeInterface } from '../../../core/service/_reducer/reducer'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  sidebar: boolean = false;
  Nquestions = '';
  userLogged: boolean = false;
  access = '';
  type = '';
  token: string = localStorage.getItem('token');
  userName: string = localStorage.getItem('userName');
  Exams: any[] = [];
  reExmas: any[] = [];
  users: any[] = [];
  displayDialog: string = 'none'
  rooms;
  @ViewChild("room") roomDiv: ElementRef<HTMLDivElement>
  @ViewChild("mobile") filterDiv: ElementRef<HTMLDivElement>
  constructor(private socket: SocketService, private STORE: Store<storeInterface>, private httpService: BaseApi) {
  }



  ngOnInit(): void {
    if (localStorage.getItem('token') !== '') {
      this.userLogged = true
    } else {
      this.userLogged = false;
    }
  }




  ngAfterViewInit(): void {

    if (this.userLogged===true) {
      this.socket.connectTHEservers(localStorage.getItem('userName')); 
      this.socket.userOpendHisaAccount();
    
    this.httpService.getExams().subscribe((exams) => {
      this.Exams = exams['exmas'];
      this.reExmas = this.Exams;
    })

    this.httpService.gettingusers().subscribe((user) => {
      this.users = user['message'];
    })
    this.httpService.getRooms().subscribe((room) => {
      this.rooms = room;
    })
    this.socket.GetPeopleFromOutSideTheRoom().subscribe((p) => {
      this.rooms = p['rooms'];
      console.log(p);
      
    })
    this.socket.getAllusersBySocket().subscribe((val) => {
      this.users = val['message'];
    })


    this.socket.UpdatePage().subscribe((val) => {
      console.log(val, 'form updateing')
      this.ngOnInit();
      this.ngAfterViewInit();
    })
}

  }








  ngOnDestroy(): void {
    console.log("home is destroed")
  }
  showFilter() {
    this.filterDiv.nativeElement.style.display = 'block';

  }
  CloseFilter() {
    this.filterDiv.nativeElement.style.display = 'none';
  }
  createRoom() {
    if (this.displayDialog === 'none') {
      this.displayDialog = 'block'
    } else {
      this.displayDialog = 'none';
    }


  }
  getFormData(bodyForm) {
    let userName = localStorage.getItem('userName');
    const body = {
      userName: userName,
      name: bodyForm.name,
      access: bodyForm.access,
      type: bodyForm.type,
      invitation: bodyForm.invite
    }
    this.socket.createRoom(body)
  }


  filter() {
    this.filterDiv.nativeElement.style.display = 'none';
    this.Exams = this.reExmas.filter((value) => {
      if (this.type !== '' && this.access !== '') {
        return value.access === this.access && value.type === this.type
      } else if (this.access !== '') {
        return value.access === this.access
      } else if (this.type !== '') {
        return value.type === this.type
      } else {
        return value;
      }
    })
  }




  deleteMyRoom(itemId, uName) {
    let bodyInfoDeletingRoom = {
      idRoom: itemId,
      userName: uName
    }
    this.socket.deleteRoom(bodyInfoDeletingRoom)
  }




}
