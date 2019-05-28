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
import { NoteBookComponent } from './components/functions/note-book/note-book.component';
import { QuizzComponent } from './components/functions/quizz/quizz.component';
import { QuizzDetailComponent } from './components/functions/quizz/quizz-detail/quizz-detail.component';

const routes: Routes = [
  {path : '',                   component : HeaderComponent,          outlet : "header"},
  {path : '',                   component : MainPageComponent},
  {path : 'user',               component : MainPageUserComponent},
  {path : 'addword',            component : NewWordComponent},
  {path : 'notebook',           component : NoteBookComponent},
  {path : 'login',              component : LoginComponent},
  {path : 'signup',             component : SignupComponent},
  {path : 'aboutus',            component : AboutUsComponent},
  {path : 'userinfo',           component : UserInfoComponent},
  {path : 'quizz',              component : QuizzComponent},
  { path: 'quizzDetail',        component : QuizzDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
