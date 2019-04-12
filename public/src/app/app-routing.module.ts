import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { HeaderComponent } from './components/header/header.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { MainPageUserComponent } from './components/main-page-user/main-page-user.component';
import { NewWordComponent } from './components/functions/new-word/new-word.component';

const routes: Routes = [
  {path : '',                   component : HeaderComponent,          outlet : "header"},
  {path : '',                   component : MainPageComponent},
  {path : 'user',               component : MainPageUserComponent},
  {path : 'user/new-word',      component : NewWordComponent},
  {path : 'login',              component : LoginComponent},
  {path : 'signup',             component : SignupComponent},
  {path : 'aboutus',            component : AboutUsComponent},
  {path : 'userinfo',           component : UserInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
