import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthUser } from './core/guards/auth.guard';
import { CheckForUser } from './core/guards/checking.guard';
import { LoginComponent } from './pages/account/login/login.component';
import { RegisterComponent } from './pages/account/register/register.component';
import { UserProfileComponent } from './pages/account/user-profile/user-profile.component';
import { BlogContentComponent } from './pages/blogs-pages/blog-content/blog-content.component';
import { CreateBlogComponent } from './pages/blogs-pages/create-blog/create-blog.component';
import { ListBlogsComponent } from './pages/blogs-pages/list-blogs/list-blogs.component';
import { CameraRecordComponent } from './pages/views/camera-record/camera-record.component';
import { HomeComponent } from './pages/views/home/home.component';
import { PlaygroundComponent } from './pages/views/playground/playground.component';
import { TakeExamComponent } from './pages/views/take-exam/take-exam.component';



const routes: Routes = [
{path:'' , component:HomeComponent},
{path:'playground' ,canActivate:[AuthUser], component:PlaygroundComponent},
{path:"chat/:id",canActivate:[AuthUser] ,component:CameraRecordComponent},
{path:"take-exam/:id",canActivate:[AuthUser] ,component:TakeExamComponent},
{path:"list/blogs",canActivate:[AuthUser] ,component:ListBlogsComponent},
{path:'blog/:id',canActivate:[AuthUser],component:BlogContentComponent},
{path:"list/blog/create",canActivate:[AuthUser] ,component:CreateBlogComponent},
{path:"register",canActivate:[CheckForUser], component:RegisterComponent},
{path:"login",canActivate:[CheckForUser] ,component:LoginComponent},
{path:"myaccount/:id",canActivate:[AuthUser], component:UserProfileComponent},
{path:'exam' , canActivate:[AuthUser] , loadChildren:()=>import('./pages/create-exam/create-exam.module').then((m)=>m.CreateExamModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration:'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
