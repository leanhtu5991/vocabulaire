import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuUserComponent } from './components/menu-user/menu-user.component';
import { MenuAdminComponent } from './components/menu-admin/menu-admin.component';
import { HeaderComponent } from './components/header/header.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { LoginService } from './services/login.service';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    MenuUserComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    MenuAdminComponent,
    HeaderComponent,
    AboutUsComponent
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
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }