import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/views/home/home.component';

import {StoreModule} from '@ngrx/store'
import { UserReducer } from './core/service/_reducer/reducer';
import { ApiReducer } from './core/api.service/reducer/api.reducer';
import { CreateExamModule } from './pages/create-exam/create-exam.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlaygroundComponent } from './pages/views/playground/playground.component';
import { CameraRecordComponent } from './pages/views/camera-record/camera-record.component';
import { SocketService } from './core/socketApi';
import { SocketIoModule } from 'ngx-socket-io';
import { LoginComponent } from './pages/account/login/login.component';
import { RegisterComponent } from './pages/account/register/register.component';
import { UserProfileComponent } from './pages/account/user-profile/user-profile.component';
import { TakeExamComponent } from './pages/views/take-exam/take-exam.component';
import { AuthUser } from './core/guards/auth.guard';
import { ComponentsService } from './core/component.service';
import { CheckForUser } from './core/guards/checking.guard';
import { DialogRoomComponent } from './components/dialog-room/dialog-room.component';
import { DialogFollowersComponent } from './components/dialog-followers/dialog-followers.component';
import { PipeTimePipe } from './pipes/pipe-time.pipe';
import { CreateBlogComponent } from './pages/blogs-pages/create-blog/create-blog.component';
import { ListBlogsComponent } from './pages/blogs-pages/list-blogs/list-blogs.component';
import { BlogContentComponent } from './pages/blogs-pages/blog-content/blog-content.component';
import { environment } from 'src/environments/environment';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
AppComponent,
HomeComponent,
PlaygroundComponent,
CameraRecordComponent,
LoginComponent,
RegisterComponent,
UserProfileComponent,
TakeExamComponent,
DialogRoomComponent,
DialogFollowersComponent,
PipeTimePipe,
CreateBlogComponent,
ListBlogsComponent,
BlogContentComponent,
HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CreateExamModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot({infoUserAuth:ApiReducer}),
    SocketIoModule.forRoot({url:'https://examme.herokuapp.com',options:{}})
  ],
  providers: [SocketService , AuthUser ,ComponentsService ,CheckForUser],
  bootstrap: [AppComponent]
})
export class AppModule { }
