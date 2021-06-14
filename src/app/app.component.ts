import { Component, OnDestroy, OnInit} from '@angular/core';
import { SocketService } from './core/socketApi';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'app-project';
  userLogged: boolean = false;
  constructor(
    public Socket: SocketService
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {

  }



  ngOnDestroy() {
    if (this.userLogged === true) {
      //this.Socket.connectTHEservers(this.NameUser);
      this.Socket.disconnectSocket();
    }
  }


}


