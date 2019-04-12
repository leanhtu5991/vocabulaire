import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { LoginService } from './services/login.service';
import { MainPageUserComponent } from './components/main-page-user/main-page-user.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { NewWordComponent } from './components/functions/new-word/new-word.component';
import { QuizzComponent } from './components/functions/quizz/quizz.component';
import { NoteBookComponent } from './components/functions/note-book/note-book.component';
import { AddWordService } from './services/add-word.service';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    HeaderComponent,
    AboutUsComponent,
    MainPageUserComponent,
    UserInfoComponent,
    NewWordComponent,
    QuizzComponent,
    NoteBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    DatePipe,
    LoginService,
    AddWordService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }